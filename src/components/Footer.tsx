import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';

export const Footer = () => {
  const location = useLocation();
  if (['/live-room'].includes(location.pathname)) return null;

  return (
    <footer className="bg-white border-t border-slate-200 pt-20 pb-8 text-slate-500 relative overflow-hidden font-sans">
      
      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-30 bg-[linear-gradient(rgba(200,200,200,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(200,200,200,0.4)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.7fr_0.7fr_1.05fr] mb-16">
          
          <div>
            <div className="flex items-center gap-2.5 text-2xl font-black text-slate-900 tracking-tight mb-6 group">
              <Logo className="w-10 h-10 group-hover:scale-105 transition-transform" />
              <span>FutureWork</span>
            </div>
            <p className="text-[14px] leading-relaxed text-slate-500 font-medium max-w-[310px] mb-8">
              Helping professionals build practical AI skills through self-paced courses and instructor-led live learning.
            </p>
          </div>
          
          <div>
            <h4 className="text-slate-900 font-bold text-[11px] uppercase tracking-wider mb-6">Quick links</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-[13px] font-bold text-slate-500 hover:text-pink-600 transition-colors">Home</Link></li>
              <li><Link to="/library" className="text-[13px] font-bold text-slate-500 hover:text-pink-600 transition-colors">Library</Link></li>
              <li><Link to="/pricing" className="text-[13px] font-bold text-slate-500 hover:text-pink-600 transition-colors">Pricing</Link></li>
              <li><Link to="/unsubscribe" className="text-[13px] font-bold text-slate-500 hover:text-pink-600 transition-colors">Unsubscribe</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-slate-900 font-bold text-[11px] uppercase tracking-wider mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><Link to="/privacy-policy" className="text-[13px] font-bold text-slate-500 hover:text-pink-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="text-[13px] font-bold text-slate-500 hover:text-pink-600 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/imprint" className="text-[13px] font-bold text-slate-500 hover:text-pink-600 transition-colors">Imprint</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-slate-900 font-bold text-[11px] uppercase tracking-wider mb-6">Company Details</h4>
            <div className="space-y-3 text-[13px] leading-relaxed text-slate-500 font-medium">
              <p><strong className="text-slate-700">Company Name:</strong> Zenaria Ltd</p>
              <p><strong className="text-slate-700">Company Address:</strong> Str A15 Stadiou, 2867 Oikos, Nicosia, Cyprus</p>
              <p><strong className="text-slate-700">Email:</strong> <a href="mailto:support@learntechlive.net" className="text-pink-600 hover:underline">support@learntechlive.net</a></p>
            </div>
          </div>
          
        </div>
        
        <div className="border-t border-slate-200 pt-6 text-[12px] font-bold text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} FutureWork. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-slate-900 transition-colors">Privacy</Link>
            <Link to="/terms-conditions" className="hover:text-slate-900 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
