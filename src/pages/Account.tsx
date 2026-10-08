import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, User, Lock, LogOut, Sparkles, Receipt, ArrowUpRight, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type TabType = 'billing' | 'profile' | 'security';

export const Account = () => {
  const [activeTab, setActiveTab] = useState<TabType>('billing');
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'billing', label: 'Billing & Plans', icon: CreditCard },
    { id: 'profile', label: 'Personal Info', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
  ];

  return (
    <main className="min-h-screen bg-[#F8F7F4] font-sans pt-32 pb-24 relative overflow-hidden">

      {/* Subtle Grid Pattern Overlay ONLY - Removed blurs and glows */}
      <div className="absolute inset-0 z-0 opacity-40 bg-[linear-gradient(rgba(200,200,200,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(200,200,200,0.4)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">

        {/* Centralized Profile Header */}
        <div className="flex flex-col items-center text-center mb-10 w-full">
          <div className="relative mb-6">
            <div className="w-28 h-28 rounded-full bg-slate-900 text-white flex items-center justify-center text-5xl font-black shadow-lg">
              S
            </div>
           
          </div>

          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Sample User</h1>
          <div className="flex items-center gap-3">
            <span className="bg-pink-100 text-pink-600 text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full">
              Pro Member
            </span>
            <span className="text-slate-500 font-medium text-sm">sampleuser@gmail.com</span>
          </div>
        </div>

        {/* Floating Top Navigation Pill - Standard Buttons */}
        <div className="bg-white p-2 rounded-full shadow-sm border border-slate-200/60 flex items-center gap-2 mb-12 w-full max-w-[600px]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full transition-all duration-300 text-[13px] font-black uppercase tracking-widest ${
                  isActive 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="w-full relative min-h-[500px]">

          {activeTab === 'billing' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">

              {/* CLEAN Light Themed Premium Card */}
              <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-slate-200 w-full relative overflow-hidden group">
                <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8">
                  <div>
                    <div className="inline-block bg-slate-100 border border-slate-200 px-4 py-1.5 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">
                      Current Plan
                    </div>
                    <h3 className="text-5xl font-black mb-2 tracking-tight text-slate-900">Premium</h3>
                    <p className="text-slate-500 font-medium">Billed INR 97 monthly. Next charge on Oct 9, 2026.</p>
                  </div>

                  <button className="bg-slate-900 text-white h-12 px-6 rounded-xl text-[15px] font-bold hover:bg-slate-800 transition-colors flex items-center gap-2">
                    Manage Plan <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Bento Box Grid for Payment & History */}
              <div className="grid md:grid-cols-3 gap-8">

                {/* Payment Method - Col Span 1 */}
                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200 md:col-span-1 flex flex-col">
                  <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Payment Method</h3>

                  <div className="flex-1 flex flex-col justify-center items-center text-center mb-6">
                    <div className="w-16 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4 border border-slate-200">
                      <CreditCard className="w-6 h-6 text-slate-900" />
                    </div>
                    <div className="text-[17px] font-black text-slate-900 tracking-widest">•••• 4242</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Exp 12/28</div>
                  </div>

                  <button className="w-full h-12 rounded-xl bg-white border-2 border-slate-200 text-slate-900 text-[11px] font-black tracking-[0.2em] uppercase hover:border-slate-900 hover:bg-slate-50 transition-all">
                    Update
                  </button>
                </div>

                {/* Billing History - Col Span 2 */}
                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200 md:col-span-2">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Recent Invoices</h3>
                    <button className="text-[11px] font-black text-pink-600 uppercase tracking-widest hover:text-pink-700 flex items-center gap-1">
                      View All <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {[
                      { id: 'inv_938b7', date: 'Sep 9, 2026', amount: 'INR 97.00' },
                      { id: 'inv_442a1', date: 'Aug 9, 2026', amount: 'INR 97.00' },
                      { id: 'inv_773z9', date: 'Jul 9, 2026', amount: 'INR 97.00' },
                    ].map((inv, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-300 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-200">
                            <Receipt className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
                          </div>
                          <div>
                            <div className="text-[14px] font-bold text-slate-900">{inv.date}</div>
                            <div className="text-[11px] font-medium text-slate-500 font-mono mt-0.5">{inv.id}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[15px] font-black text-slate-900">{inv.amount}</div>
                          <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-1">Paid</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.04)] border border-slate-200 w-full">

                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Personal Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="space-y-3">
                    <label className="block text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">First Name</label>
                    <input type="text" defaultValue="Sample" className="w-full h-14 px-6 rounded-2xl border-2 border-slate-200 bg-slate-50 text-[15px] font-bold text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-all" />
                  </div>
                  <div className="space-y-3">
                    <label className="block text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Last Name</label>
                    <input type="text" defaultValue="User" className="w-full h-14 px-6 rounded-2xl border-2 border-slate-200 bg-slate-50 text-[15px] font-bold text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-all" />
                  </div>
                  <div className="space-y-3 md:col-span-2">
                    <label className="block text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Display Name</label>
                    <input type="text" defaultValue="Sample User" className="w-full h-14 px-6 rounded-2xl border-2 border-slate-200 bg-slate-50 text-[15px] font-bold text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-all" />
                  </div>
                  <div className="space-y-3 md:col-span-2">
                    <label className="block text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Email Address</label>
                    <div className="relative">
                      <input type="email" defaultValue="sampleuser@gmail.com" disabled className="w-full h-14 px-6 rounded-2xl border-2 border-slate-100 bg-slate-100 text-[15px] font-bold text-slate-400 cursor-not-allowed" />
                      <div className="absolute right-6 top-1/2 -translate-y-1/2">
                        <Lock className="w-5 h-5 text-slate-300" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-slate-100">
                  <button className="h-12 px-8 rounded-xl bg-slate-900 text-white text-[15px] font-bold hover:bg-slate-800 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.04)] border border-slate-200 w-full max-w-3xl mx-auto">

                <div className="flex items-center gap-4 mb-10">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center shadow-lg">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Security & Password</h2>
                    <p className="text-slate-500 font-medium">Keep your account safe by updating your password.</p>
                  </div>
                </div>

                <div className="space-y-8 bg-slate-50 p-8 sm:p-10 rounded-[2rem] border border-slate-200/50 mb-10">
                  <div className="space-y-3">
                    <label className="block text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Current Password</label>
                    <input type="password" defaultValue="password123" className="w-full h-14 px-6 rounded-2xl border-2 border-slate-200 bg-white text-[15px] font-bold text-slate-900 focus:outline-none focus:border-slate-900 transition-all" />
                  </div>

                  <div className="h-px w-full bg-slate-200 my-8"></div>

                  <div className="space-y-3">
                    <label className="block text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">New Password</label>
                    <input type="password" placeholder="Min 8 characters" className="w-full h-14 px-6 rounded-2xl border-2 border-slate-200 bg-white text-[15px] font-bold text-slate-900 focus:outline-none focus:border-slate-900 transition-all placeholder:text-slate-300" />
                  </div>
                  <div className="space-y-3">
                    <label className="block text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Confirm New Password</label>
                    <input type="password" placeholder="Confirm new password" className="w-full h-14 px-6 rounded-2xl border-2 border-slate-200 bg-white text-[15px] font-bold text-slate-900 focus:outline-none focus:border-slate-900 transition-all placeholder:text-slate-300" />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-100">
                  <button
                    onClick={handleLogout}
                    className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-white border-2 border-red-100 text-red-600 text-[13px] font-black tracking-[0.2em] uppercase hover:bg-red-50 hover:border-red-200 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                  <button className="w-full sm:w-auto h-12 px-8 rounded-xl bg-slate-900 text-white text-[15px] font-bold hover:bg-slate-800 transition-colors">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
};
