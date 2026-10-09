import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { API_URLS } from '../api';

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
  document.cookie = `futurework_auth_hint=1; ${authCookieOptions()}`;
  document.cookie = `futurework_auth_token=${encodeURIComponent(token)}; ${authCookieOptions()}`;
}

function clearAuthCookies() {
  document.cookie = `futurework_auth_hint=; Path=/; Max-Age=0; SameSite=Lax${window.location.protocol === 'https:' ? '; Secure' : ''}`;
  document.cookie = `futurework_auth_token=; Path=/; Max-Age=0; SameSite=Lax${window.location.protocol === 'https:' ? '; Secure' : ''}`;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasLibraryAccess, setHasLibraryAccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const clearAuth = useCallback(() => {
    clearAuthCookies();
    localStorage.removeItem('futurework_token');
    localStorage.removeItem('futurework_auth');
    localStorage.removeItem('futurework_user');
    localStorage.removeItem('futurework_is_admin');
    setIsLoggedIn(false);
    setHasLibraryAccess(false);
    setIsAdmin(false);
  }, []);

  const refreshLibraryAccess = useCallback(async (token: string) => {
    try {
      const response = await fetch(API_URLS.user.dashboard, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (response.status === 401 || response.status === 403) {
        clearAuth();
        return;
      }
      if (!response.ok || !result.success || !result.data) return;

      const storedUser = localStorage.getItem('futurework_user');
      const priorUser = storedUser ? JSON.parse(storedUser) : {};
      const user = { ...priorUser, ...result.data };
      localStorage.setItem('futurework_user', JSON.stringify(user));
      localStorage.setItem('futurework_auth', 'true');
      localStorage.setItem('futurework_is_admin', String(user.is_admin === true));
      setIsLoggedIn(true);
      setIsAdmin(user.is_admin === true);
      setHasLibraryAccess(hasActivePlan(user));
    } catch {
      // Keep the last known access state when the dashboard cannot be reached.
    }
  }, [clearAuth]);

  useEffect(() => {
    const initialiseAuth = async () => {
      const token = localStorage.getItem('futurework_token');
      if (token) {
        setAuthCookies(token);
        setIsLoggedIn(true);
        setIsAdmin(localStorage.getItem('futurework_is_admin') === 'true');
        const user = localStorage.getItem('futurework_user');
        if (user) {
          try {
            setHasLibraryAccess(hasActivePlan(JSON.parse(user)));
          } catch {
            localStorage.removeItem('futurework_user');
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

  const login = (token: string, user?: AuthUser) => {
    localStorage.setItem('futurework_token', token);
    localStorage.setItem('futurework_auth', 'true');
    setAuthCookies(token);
    if (user) {
      localStorage.setItem('futurework_user', JSON.stringify(user));
      localStorage.setItem('futurework_is_admin', String(user.is_admin === true));
    } else {
      localStorage.removeItem('futurework_user');
      localStorage.removeItem('futurework_is_admin');
    }
    setIsLoggedIn(true);
    setIsAdmin(user?.is_admin === true);
    setHasLibraryAccess(hasActivePlan(user));
    setIsAuthLoading(false);
    void refreshLibraryAccess(token);
  };

  const logout = () => {
    clearAuth();
    setIsAuthLoading(false);
  };

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
