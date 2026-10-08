import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    navigate('/account');
  };

  return (
    <main className="pt-32 pb-24 min-h-[calc(100vh-80px)] font-sans bg-[#F8F7F4] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-[1200px] w-full bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-slate-200 overflow-hidden flex flex-col lg:flex-row min-h-[600px] relative">
        
        {/* Left Side - Brand & Testimonial */}
        <div className="hidden lg:flex w-1/2 bg-[#050A24] relative overflow-hidden flex-col justify-center p-12 lg:p-20 text-white">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ea580c 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-pink-500/20 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="relative z-10 max-w-lg">
            <h2 className="text-4xl lg:text-5xl font-black leading-tight mb-8 tracking-tight">
              Welcome back to your <span className="text-pink-500">learning hub.</span>
            </h2>
            
            <div className="space-y-6">
              {[
                'Access 50+ premium video modules',
                'Join exclusive live cohort sessions',
                'Download proprietary templates'
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-4 text-slate-300 font-medium">
                  <CheckCircle2 className="w-6 h-6 text-pink-500 shrink-0" />
                  <span className="text-[17px]">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-20 relative">
          <div className="absolute inset-0 w-full h-full pointer-events-none opacity-40 bg-[linear-gradient(rgba(200,200,200,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(200,200,200,0.4)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
          <div className="w-full max-w-[420px] relative z-10">

            <div className="mb-10 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-900 mb-3">
                Log in to your account.
              </h1>
              <p className="text-slate-500 font-medium">
                Don't have an account? <Link to="/signup" className="text-pink-600 hover:text-pink-700 hover:underline">Sign up for free</Link>
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-700 tracking-wide uppercase">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-[15px] focus:outline-none focus:border-slate-900 focus:bg-white transition-all font-medium text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[13px] font-bold text-slate-700 tracking-wide uppercase">Password</label>
                  <Link to="#" className="text-[13px] font-bold text-pink-600 hover:text-pink-700 hover:underline">Forgot?</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-[15px] focus:outline-none focus:border-slate-900 focus:bg-white transition-all font-medium text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[15px] font-bold transition-all shadow-sm flex items-center justify-center gap-2 mt-8 group"
              >
                Log In <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};
