import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { API_URLS } from '../api';
import { useNavigate } from 'react-router-dom';
import { authenticatedFetch, AUTH_EXPIRED_EVENT } from '../utils/authenticatedFetch';

type AuthUser = {
  is_admin?: boolean;
  plan_id?: number | null;
  user_meta?: {
    plan_id?: number | null;
    subscription_status?: string | null;
  };
  subscriptions?: Array<{
    status?: string | null;
    payment_status?: string | null;
  }>;
};

type AuthContextType = {
  isLoggedIn: boolean;
  hasLibraryAccess: boolean;
  isAdmin: boolean;
  isAuthLoading: boolean;
  login: (token: string, user?: AuthUser) => void;
  logout: () => void;
};

const hasActivePlan = (user?: AuthUser | null) => {
  const planId = user?.user_meta?.plan_id ?? user?.plan_id;
  const subscriptions = user?.subscriptions ?? [];
  const hasSubscriptionRecords = subscriptions.length > 0;
  const hasActiveSubscription = hasSubscriptionRecords
    ? subscriptions.some(
      (subscription) => subscription.status === 'active' && subscription.payment_status === 'active',
    )
    : user?.user_meta?.subscription_status
      ? user.user_meta.subscription_status === 'active'
      : true;

  return Boolean(planId) && hasActiveSubscription;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const authCookieOptions = () => `Path=/; SameSite=Lax${window.location.protocol === 'https:' ? '; Secure' : ''}`;

function setAuthCookies(token: string) {
  document.cookie = `futureworkacademy_auth_hint=1; ${authCookieOptions()}`;
  document.cookie = `futureworkacademy_auth_token=${encodeURIComponent(token)}; ${authCookieOptions()}`;
}

function clearAuthCookies() {
  document.cookie = `futureworkacademy_auth_hint=; Path=/; Max-Age=0; SameSite=Lax${window.location.protocol === 'https:' ? '; Secure' : ''}`;
  document.cookie = `futureworkacademy_auth_token=; Path=/; Max-Age=0; SameSite=Lax${window.location.protocol === 'https:' ? '; Secure' : ''}`;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasLibraryAccess, setHasLibraryAccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [shouldRedirectToLogin, setShouldRedirectToLogin] = useState(false);

  const clearAuth = useCallback(() => {
    clearAuthCookies();
    localStorage.removeItem('futureworkacademy_token');
    localStorage.removeItem('futureworkacademy_auth');
    localStorage.removeItem('futureworkacademy_user');
    localStorage.removeItem('futureworkacademy_is_admin');
    setIsLoggedIn(false);
    setHasLibraryAccess(false);
    setIsAdmin(false);
  }, []);

  useEffect(() => {
    const handleAuthExpired = () => {
      clearAuth();
      setIsAuthLoading(false);
      setShouldRedirectToLogin(true);
    };
    window.addEventListener(AUTH_EXPIRED_EVENT, handleAuthExpired);
    return () => window.removeEventListener(AUTH_EXPIRED_EVENT, handleAuthExpired);
  }, [clearAuth]);

  useEffect(() => {
    if (!shouldRedirectToLogin) return;
    navigate('/login/', { replace: true });
    setShouldRedirectToLogin(false);
  }, [shouldRedirectToLogin, navigate]);

  const refreshLibraryAccess = useCallback(async (token: string) => {
    try {
      const response = await authenticatedFetch(API_URLS.user.dashboard);
      const result = await response.json();
      if (localStorage.getItem('futureworkacademy_token') !== token) return;
      if (!response.ok || !result.success || !result.data) return;

      const storedUser = localStorage.getItem('futureworkacademy_user');
      const priorUser = storedUser ? JSON.parse(storedUser) : {};
      const user = { ...priorUser, ...result.data };
      localStorage.setItem('futureworkacademy_user', JSON.stringify(user));
      localStorage.setItem('futureworkacademy_auth', 'true');
      localStorage.setItem('futureworkacademy_is_admin', String(user.is_admin === true));
      setIsLoggedIn(true);
      setIsAdmin(user.is_admin === true);
      setHasLibraryAccess(hasActivePlan(user));
    } catch {
      // Keep the last known access state when the dashboard cannot be reached.
    }
  }, []);

  useEffect(() => {
    const initialiseAuth = async () => {
      const token = localStorage.getItem('futureworkacademy_token');
      if (token) {
        setAuthCookies(token);
        setIsLoggedIn(true);
        setIsAdmin(localStorage.getItem('futureworkacademy_is_admin') === 'true');
        const user = localStorage.getItem('futureworkacademy_user');
        if (user) {
          try {
            setHasLibraryAccess(hasActivePlan(JSON.parse(user)));
          } catch {
            localStorage.removeItem('futureworkacademy_user');
          }
        }
        await refreshLibraryAccess(token);
      } else {
        clearAuth();
      }
      setIsAuthLoading(false);
    };

    void initialiseAuth();
  }, [clearAuth, refreshLibraryAccess]);

  useEffect(() => {
    if (!isLoggedIn || isAuthLoading) return;
    let pending = false;
    const validateSession = async () => {
      const token = localStorage.getItem('futureworkacademy_token');
      if (pending) return;
      if (!token) {
        window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
        return;
      }
      pending = true;
      await refreshLibraryAccess(token);
      pending = false;
    };
    const timer = window.setInterval(() => { void validateSession(); }, 60_000);
    window.addEventListener('focus', validateSession);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('focus', validateSession);
    };
  }, [isLoggedIn, isAuthLoading, refreshLibraryAccess]);

  const login = (token: string, user?: AuthUser) => {
    localStorage.setItem('futureworkacademy_token', token);
    localStorage.setItem('futureworkacademy_auth', 'true');
    setAuthCookies(token);
    if (user) {
      localStorage.setItem('futureworkacademy_user', JSON.stringify(user));
      localStorage.setItem('futureworkacademy_is_admin', String(user.is_admin === true));
    } else {
      localStorage.removeItem('futureworkacademy_user');
      localStorage.removeItem('futureworkacademy_is_admin');
    }
    setIsLoggedIn(true);
    setIsAdmin(user?.is_admin === true);
    setHasLibraryAccess(hasActivePlan(user));
    setIsAuthLoading(false);
    void refreshLibraryAccess(token);
  };

  const logout = useCallback(() => {
    clearAuth();
    setIsAuthLoading(false);
  }, [clearAuth]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, hasLibraryAccess, isAdmin, isAuthLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
