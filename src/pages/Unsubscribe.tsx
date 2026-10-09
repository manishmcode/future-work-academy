import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Mail,
  CreditCard,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export const Unsubscribe = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  return (
    <main className="min-h-screen font-sans bg-[#FAF9F6] flex flex-col justify-center py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full pointer-events-none bg-right-bottom bg-no-repeat fixed" style={{ backgroundImage: "url('/images/card-bg.webp')", backgroundAttachment: 'fixed' }}></div>
      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-pink-400/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="w-full max-w-2xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-12 text-center sm:text-left flex flex-col sm:items-start items-center">
          {/* Spacing to replace removed badge */}
          <div className="h-[32px] mb-6"></div>
          <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-extrabold leading-[1.1] tracking-tight text-slate-900 mb-6">
            Cancel <br className="hidden sm:block" />
            <span className="text-slate-400 font-medium">Subscription.</span>
          </h1>
          <p className="text-[17px] text-slate-600 font-medium max-w-lg leading-relaxed">
            We’re sorry to see you leave. To securely cancel your subscription and halt future billing, please confirm your details below.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white border border-slate-200/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[2rem] p-8 sm:p-12 relative overflow-hidden">
          
          {/* Subtle decorative background piece */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-slate-50 to-transparent rounded-bl-[4rem] pointer-events-none"></div>
          
          <form className="relative z-10 space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="space-y-2.5">
                <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
                  </div>
                  <input 
                    type="text" 
                    required
                    placeholder="John"
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-11 pr-5 py-3.5 text-[15px] focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition-all text-slate-900 font-medium placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className="space-y-2.5">
                <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
                  </div>
                  <input 
                    type="text" 
                    required
                    placeholder="Doe"
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-11 pr-5 py-3.5 text-[15px] focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition-all text-slate-900 font-medium placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2.5">
              <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
                </div>
                <input 
                  type="email" 
                  required
                  placeholder="john@example.com"
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-11 pr-5 py-3.5 text-[15px] focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition-all text-slate-900 font-medium placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* IBAN */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-end ml-1">
                <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">
                  Last 5 Digits of IBAN <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] text-slate-400 font-medium hidden sm:block">Used to verify payment profile</span>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <CreditCard className="h-5 w-5 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
                </div>
                <input 
                  type="text" 
                  inputMode="numeric" 
                  pattern="[0-9]{5}" 
                  maxLength={5}
                  required
                  placeholder="•••••"
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-11 pr-5 py-3.5 text-[16px] focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition-all text-slate-900 font-bold tracking-[0.25em] placeholder:text-slate-300 placeholder:font-normal placeholder:tracking-normal"
                />
              </div>
            </div>

            {/* Warning / Confirmation Box */}
            <div className="pt-4">
              <label className={`flex items-start gap-4 cursor-pointer group p-5 rounded-2xl border transition-all duration-300 ${isConfirmed ? 'bg-red-50/50 border-red-200' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}>
                <div className="relative flex items-center justify-center mt-1 shrink-0">
                  <input 
                    type="checkbox" 
                    required 
                    checked={isConfirmed}
                    onChange={(e) => setIsConfirmed(e.target.checked)}
                    className="peer appearance-none w-6 h-6 border-2 border-slate-300 rounded-md hover:border-red-500 checked:bg-red-500 checked:border-red-500 transition-all cursor-pointer bg-white shadow-sm" 
                  />
                  <div className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className={`w-4 h-4 ${isConfirmed ? 'text-red-500' : 'text-slate-400'}`} />
                    <span className={`text-[14px] font-bold ${isConfirmed ? 'text-red-700' : 'text-slate-700'}`}>Acknowledge Cancellation</span>
                  </div>
                  <span className="text-slate-500 text-[13.5px] font-medium leading-relaxed">
                    I understand that by proceeding, my subscription will be cancelled and I will lose access to all premium materials at the end of my current billing cycle.
                  </span>
                </div>
              </label>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col-reverse sm:flex-row items-center gap-3 pt-6 mt-4">
              <button 
                type="submit" 
                className="w-full sm:w-auto h-12 px-6 inline-flex items-center justify-center rounded-xl bg-white border border-slate-200 text-[14px] font-bold text-slate-600 transition-all hover:bg-red-50 hover:text-red-600 hover:border-red-200"
              >
                Cancel Subscription
              </button>
              
              <Link 
                to="/" 
                className="w-full sm:w-auto h-12 px-8 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-[14px] font-bold text-white transition-all hover:bg-pink-600 shadow-md hover:shadow-pink-600/20 sm:ml-auto"
              >
                Nevermind, keep access <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </form>
        </div>
      </div>
    </main>
  );
};

export default Unsubscribe;
