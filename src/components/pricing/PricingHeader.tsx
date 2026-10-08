import React from 'react';
import { Sparkles } from 'lucide-react';

export const PricingHeader = ({ isAnnual, setIsAnnual }: { isAnnual: boolean; setIsAnnual: (val: boolean) => void }) => (
  <section className="pt-24 pb-16 lg:pt-32 lg:pb-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center sm:items-start text-center sm:text-left">
      
      {/* Spacing to replace removed badge */}
      <div className="h-[20px] mb-6"></div>
      
      <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-extrabold leading-[1.1] tracking-tight text-slate-900 mb-8">
        Invest in your <br/>
        <span className="text-slate-400 font-medium">Future Today.</span>
      </h1>
      
      <p className="max-w-2xl text-[17px] leading-relaxed text-slate-600 font-medium mb-12">
        Choose a learning path that fits your schedule and build practical skills with lessons, resources and live class support.
      </p>

      {/* Clean Toggle */}
      <div className="flex items-center justify-center gap-2 bg-white border border-slate-200 p-2 rounded-2xl shadow-sm relative">
        <button 
          onClick={() => setIsAnnual(false)}
          aria-pressed={!isAnnual}
          className={`h-12 px-6 rounded-xl text-[15px] font-bold transition-all duration-300 relative z-10 ${!isAnnual ? 'bg-slate-900 text-white shadow-md' : 'bg-transparent text-slate-600 hover:bg-slate-50'}`}
        >
          Monthly
        </button>
        <button 
          onClick={() => setIsAnnual(true)}
          aria-pressed={isAnnual}
          className={`h-12 px-6 flex items-center gap-2 rounded-xl text-[15px] font-bold transition-all duration-300 relative z-10 ${isAnnual ? 'bg-slate-900 text-white shadow-md' : 'bg-transparent text-slate-600 hover:bg-slate-50'}`}
        >
          Annually 
          <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md transition-colors ${isAnnual ? 'bg-white/20' : 'bg-pink-100 text-pink-600'}`}>
            Save 20%
          </span>
        </button>
      </div>

    </div>
  </section>
);
