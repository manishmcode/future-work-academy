import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_URLS } from '../api';
import { COMPANY } from '../config/company';
import { useToast } from '../context/ToastContext';
import { Loader } from '../components/Loader';

export const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSigningUp) return;

    try {
      setIsSigningUp(true);
      const response = await fetch(API_URLS.auth.signup, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }) });
      const result = await response.json();
      if (!response.ok || !result.success || !result.data?.token) throw new Error(result.message || 'Unable to create your account.');

      showToast('success', result.message || 'Account created successfully.');
      login(result.data.token, result.data.user);
      navigate('/library');
    } catch (signupError) {
      showToast('error', signupError instanceof Error ? signupError.message : 'Unable to create your account.');
    } finally {
      setIsSigningUp(false);
    }
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
              Start your journey with <span className="text-pink-500">{COMPANY.brandName}.</span>
            </h2>
            
            <div className="space-y-6">
              {[
                'Join a community of 10,000+ learners',
                'Access cutting-edge curriculum',
                'Earn industry-recognized certificates'
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-4 text-slate-300 font-medium">
                  <CheckCircle2 className="w-6 h-6 text-pink-500 shrink-0" />
                  <span className="text-[17px]">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-20 relative">
          <div className="absolute inset-0 w-full h-full pointer-events-none opacity-40 bg-[linear-gradient(rgba(200,200,200,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(200,200,200,0.4)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
          <div className="w-full max-w-[420px] relative z-10">

            <div className="mb-10 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-900 mb-3">
                Create an account.
              </h1>
              <p className="text-slate-500 font-medium">
                Already have an account? <Link to="/login" className="text-pink-600 hover:text-pink-700 hover:underline">Log in</Link>
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSignUp}>
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-700 tracking-wide uppercase">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-[15px] focus:outline-none focus:border-slate-900 focus:bg-white transition-all font-medium text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

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
                <label className="text-[13px] font-bold text-slate-700 tracking-wide uppercase">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 8 characters"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-[15px] focus:outline-none focus:border-slate-900 focus:bg-white transition-all font-medium text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSigningUp}
                className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[15px] font-bold transition-all shadow-sm flex items-center justify-center gap-2 mt-8 group disabled:cursor-wait disabled:opacity-70"
              >
                {isSigningUp ? <Loader variant="inline" label="Creating account..." /> : <>Create Account <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};
