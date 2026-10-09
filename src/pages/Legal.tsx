import React from 'react';
import { Sparkles } from 'lucide-react';
import { PrivacyContent, TermsContent, ImprintContent } from './LegalContent';
import { COMPANY } from '../config/company';

export const Legal = ({ title }: { title: string }) => {
  return (
    <main className="min-h-screen font-sans bg-[#FAF9F6] pb-24 overflow-hidden">
      
      {/* Home-style Header */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        <div className="flex items-center gap-2 text-pink-600 font-bold text-sm mb-6">
          <Sparkles className="w-4 h-4" />
          <span className="uppercase tracking-wider">Legal & Compliance</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-extrabold leading-[1.1] tracking-tight text-slate-900 mb-6">
          {title}
        </h1>
        
        <p className="max-w-2xl text-[17px] leading-relaxed text-slate-600 font-medium">
          Please review the detailed terms and information regarding your use of the FutureWork platform and services.
        </p>

      </section>

      {/* Content Container (Widget Style) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 w-full">
          {title === "Imprint" && <ImprintContent />}
          {title === "Privacy Policy" && <PrivacyContent />}
          {title === "Terms & Conditions" && <TermsContent />}
          
          <div className="mt-12 pt-8 border-t border-slate-200 flex items-center justify-between text-[13px] text-slate-400 font-bold uppercase tracking-widest px-4">
            <span>{COMPANY.name}</span>
            <span>Last updated: September 2026</span>
          </div>
        </div>
      </section>

    </main>
  );
};
