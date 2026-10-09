import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { Logo } from './Logo';
import { useAuth } from '../context/AuthContext';
import { LanguageSelector } from './LanguageSelector';
import { COMPANY } from '../config/company';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isLoggedIn, hasLibraryAccess, isAdmin } = useAuth();

  // Add scroll detection for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (['/live-room'].includes(location.pathname)) return null;

  const navLinks = isAdmin
    ? [
      { name: 'Live Classes', path: '/schedule' },
      { name: 'Profile', path: '/account' },
    ]
    : [
      { name: 'Home', path: '/' },
      { name: 'Library', path: '/library' },
      ...(!hasLibraryAccess ? [{ name: 'Pricing', path: '/pricing' }] : []),
      { name: 'Unsubscribe', path: '/unsubscribe' },
    ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 w-full transition-all duration-300 ${isScrolled
          ? 'bg-white/80 backdrop-blur-lg py-3 shadow-sm border-b border-slate-200'
          : 'bg-transparent pt-6 pb-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="w-full flex justify-between items-center h-14">

          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" translate="no" className="notranslate flex items-center gap-2.5 group">
              <Logo className="w-10 h-10 transition-transform group-hover:scale-105" />
              <span className="text-[22px] font-black text-slate-900 tracking-tight group-hover:text-pink-600 transition-colors">
                {COMPANY.brandName}
              </span>
            </Link>
          </div>

          {/* Desktop Links (With Animated Underline) */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.name === 'Library' && location.pathname === '/schedule');
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative text-[14px] font-bold tracking-wide transition-all duration-300 py-2 group ${isActive ? 'text-pink-600' : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  {link.name}
                  {/* Hover Underline Animation */}
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-pink-600 transition-all duration-300 ease-out ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Side (Search & CTA) */}
          <div className="hidden md:flex items-center space-x-3">            <LanguageSelector />
            {isAdmin ? null : isLoggedIn ? (
              <Link
                to="/account"
                className="h-11 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 flex items-center justify-center text-white text-[15px] font-bold transition-all shadow-sm"
              >
                My Account
              </Link>
            ) : (
              <>
                
                <Link
                  to="/login"
                  className="h-11 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 flex items-center justify-center text-white text-[15px] font-bold transition-all shadow-sm"
                >
                  Log In
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center md:hidden gap-2">           <LanguageSelector />
            <button className="text-slate-500 hover:text-slate-900 p-2">
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="grid h-10 w-10 place-items-center rounded-lg bg-slate-50 border border-slate-200 text-slate-700 transition hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Dropdown (Glassmorphism & Slide animation) */}
      <div
        className={`md:hidden absolute top-full left-0 w-full transition-all duration-300 ease-in-out origin-top ${isOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-95 invisible'
          }`}
      >
        <div className="mx-4 mt-2 mb-4 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-xl overflow-hidden p-3 space-y-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.name === 'Library' && location.pathname === '/schedule');
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3.5 text-[15px] font-bold rounded-xl transition-colors ${isActive
                    ? 'bg-pink-50 text-pink-600 border border-pink-100'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2 pb-1 px-1 flex flex-col gap-2">
            {isAdmin ? null : isLoggedIn ? (
              <Link
                to="/account"
                onClick={() => setIsOpen(false)}
                className="w-full h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white text-[15px] font-bold shadow-sm"
              >
                My Account
              </Link>
            ) : (
              <>

                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full h-12 rounded-xl bg-slate-900 hover:bg-slate-800 transition-colors flex items-center justify-center text-white text-[15px] font-bold shadow-sm"
                >
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
