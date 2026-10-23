import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Loader } from './components/Loader';
import { Home } from './pages/Home';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ScrollToTop } from './components/ScrollToTop';
import { Seo } from './components/Seo';
import './App.css';

const Library = lazy(() => import('./pages/Library').then((m) => ({ default: m.Library })));
const LiveSchedule = lazy(() => import('./pages/LiveSchedule').then((m) => ({ default: m.LiveSchedule })));
const LiveClasses = lazy(() => import('./pages/LiveClasses').then((m) => ({ default: m.LiveClasses })));
const AdminLiveClasses = lazy(() => import('./pages/AdminLiveClasses').then((m) => ({ default: m.AdminLiveClasses })));
const Pricing = lazy(() => import('./pages/Pricing').then((m) => ({ default: m.Pricing })));
const Unsubscribe = lazy(() => import('./pages/Unsubscribe').then((m) => ({ default: m.Unsubscribe })));
const Imprint = lazy(() => import('./pages/Legal').then((m) => ({ default: m.Imprint })));
const PrivacyPolicy = lazy(() => import('./pages/Legal').then((m) => ({ default: m.PrivacyPolicy })));
const TermsAndConditions = lazy(() => import('./pages/Legal').then((m) => ({ default: m.TermsAndConditions })));
const Login = lazy(() => import('./pages/Login').then((m) => ({ default: m.Login })));
const SignUp = lazy(() => import('./pages/SignUp').then((m) => ({ default: m.SignUp })));
const Account = lazy(() => import('./pages/Account').then((m) => ({ default: m.Account })));
const Checkout = lazy(() => import('./pages/Checkout').then((m) => ({ default: m.Checkout })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

const MemberAccess = ({ children }: { children: React.ReactElement }) => {
  const { isLoggedIn, hasLibraryAccess, isAuthLoading } = useAuth();
  if (isAuthLoading) return <Loader variant="page" label="Checking your session..." />;
  return isLoggedIn && hasLibraryAccess ? children : <Navigate to="/pricing/" replace />;
};

const AccountAccess = () => {
  const { isLoggedIn, isAuthLoading } = useAuth();
  if (isAuthLoading) return <Loader variant="page" label="Checking your session..." />;
  return isLoggedIn ? <Account /> : <Navigate to="/login/" replace />;
};

const ProfileRedirect = () => {
  const { isLoggedIn, isAuthLoading } = useAuth();
  if (isAuthLoading) return <Loader variant="page" label="Checking your session..." />;
  return <Navigate to={isLoggedIn ? '/account/' : '/login/'} replace />;
};

const CoursesRedirect = () => {
  const { hasLibraryAccess, isAuthLoading } = useAuth();
  if (isAuthLoading) return <Loader variant="page" label="Checking your session..." />;
  return <Navigate to={hasLibraryAccess ? '/library/' : '/pricing/'} replace />;
};

const LiveClassesAccess = () => {
  const { isLoggedIn, hasLibraryAccess, isAdmin, isAuthLoading } = useAuth();
  if (isAuthLoading) return <Loader variant="page" label="Checking your session..." />;
  if (isAdmin) return <AdminLiveClasses />;
  return isLoggedIn && hasLibraryAccess ? <LiveSchedule /> : <Navigate to="/pricing/" replace />;
};
const PricingAccess = () => {
  const { isAdmin, isAuthLoading } = useAuth();
  if (isAuthLoading) return <Loader variant="page" label="Checking your session..." />;
  return isAdmin ? <Navigate to="/schedule/" replace /> : <Pricing />;
};
function App() {
  return (
    <Router>
    <AuthProvider>
      <ToastProvider>
      <Seo />
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<Loader variant="page" label="Loading..." />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<CoursesRedirect />} />
            <Route path="/library" element={<MemberAccess><Library /></MemberAccess>} />
            <Route path="/schedule" element={<LiveClassesAccess />} />
            <Route path="/live-room" element={<MemberAccess><LiveClasses /></MemberAccess>} />
            <Route path="/pricing" element={<PricingAccess />} />
            <Route path="/unsubscribe" element={<Unsubscribe />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsAndConditions />} />
            <Route path="/imprint" element={<Imprint />} />
            <Route path="/account" element={<AccountAccess />} />
            <Route path="/profile" element={<ProfileRedirect />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </ToastProvider>
    </AuthProvider>
    </Router>
  );
}

export default App;
