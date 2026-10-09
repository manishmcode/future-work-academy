import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Loader } from './components/Loader';
import { Home } from './pages/Home';
import { Library } from './pages/Library';
import { Courses } from './pages/Courses';
import { LiveSchedule } from './pages/LiveSchedule';
import { LiveClasses } from './pages/LiveClasses';
import { AdminLiveClasses } from './pages/AdminLiveClasses';
import { Pricing } from './pages/Pricing';
import { Unsubscribe } from './pages/Unsubscribe';
import { Legal } from './pages/Legal';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Account } from './pages/Account';
import { Checkout } from './pages/Checkout';
import { NotFound } from './pages/NotFound';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ScrollToTop } from './components/ScrollToTop';
import './App.css';

const MemberAccess = ({ children }: { children: React.ReactElement }) => {
  const { isLoggedIn, hasLibraryAccess, isAuthLoading } = useAuth();
  if (isAuthLoading) return <Loader variant="page" label="Checking your session..." />;
  return isLoggedIn && hasLibraryAccess ? children : <Navigate to="/pricing" replace />;
};

const LiveClassesAccess = () => {
  const { isLoggedIn, hasLibraryAccess, isAdmin, isAuthLoading } = useAuth();
  if (isAuthLoading) return <Loader variant="page" label="Checking your session..." />;
  if (isAdmin) return <AdminLiveClasses />;
  return isLoggedIn && hasLibraryAccess ? <LiveSchedule /> : <Navigate to="/pricing" replace />;
};
const PricingAccess = () => {
  const { isAdmin, isAuthLoading } = useAuth();
  if (isAuthLoading) return <Loader variant="page" label="Checking your session..." />;
  return isAdmin ? <Navigate to="/schedule" replace /> : <Pricing />;
};
function App() {
  return (
    <AuthProvider>
      <ToastProvider>
      <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/library" element={<MemberAccess><Library /></MemberAccess>} />
            <Route path="/schedule" element={<LiveClassesAccess />} />
            <Route path="/live-room" element={<MemberAccess><LiveClasses /></MemberAccess>} />
            <Route path="/pricing" element={<PricingAccess />} />
            <Route path="/unsubscribe" element={<Unsubscribe />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/privacy-policy" element={<Legal title="Privacy Policy" />} />
            <Route path="/terms-conditions" element={<Legal title="Terms & Conditions" />} />
            <Route path="/imprint" element={<Legal title="Imprint" />} />
            <Route path="/account" element={<Account />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </ToastProvider>
    </AuthProvider>
  );
}

export default App;
