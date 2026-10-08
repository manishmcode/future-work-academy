import React from 'react';
import { Check, Info, Zap, Shield, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const plansData = [
  {
    name: "Basic",
    icon: <Shield className="w-6 h-6 text-slate-400" />,
    monthlyPrice: "29",
    annualPrice: "24",
    description: "Perfect for getting started with core lifestyle courses.",
    features: [
      "Access to lifestyle courses",
      "Community forum access",
      "Downloadable resources",
      "Cancel anytime",
    ],
    missingFeatures: [
      "Business courses",
      "Live instructor-led classes",
      "1-on-1 mentorship",
    ],
    highlight: false
  },
  {
    name: "Premium",
    icon: <Star className="w-6 h-6 text-pink-600" />,
    monthlyPrice: "97",
    annualPrice: "79",
    description: "The complete learning experience with direct instructor guidance.",
    features: [
      "Everything in Standard",
      "Live instructor-led classes",
      "Direct interaction with instructors",
      "Practical live demonstrations",
      "Access to past & upcoming classes",
      "Unlimited platform access",
      "1-on-1 mentorship calls",
      "Cancel anytime",
    ],
    missingFeatures: [],
    highlight: true
  },
  {
    name: "Standard",
    icon: <Zap className="w-6 h-6 text-slate-400" />,
    monthlyPrice: "59",
    annualPrice: "49",
    description: "Ideal for professionals looking to build practical business skills.",
    features: [
      "Access to lifestyle courses",
      "Access to business courses",
      "Community forum access",
      "Downloadable resources",
      "Priority email support",
      "Cancel anytime",
    ],
    missingFeatures: [
      "Live instructor-led classes",
      "1-on-1 mentorship",
    ],
    highlight: false
  }
];

export const PricingCards = ({ isAnnual }: { isAnnual: boolean }) => (
  <section className="pb-16 pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid gap-6 lg:grid-cols-3 items-center">
      {plansData.map((plan, i) => (
        <div
          key={i}
          className={`relative rounded-3xl flex flex-col group transition-all duration-500 ${plan.highlight
              ? 'bg-gradient-to-b from-slate-900 to-[#0B0F19] text-white border border-pink-500/30 shadow-[0_30px_100px_-15px_rgba(234,88,12,0.25)] lg:-translate-y-2 lg:scale-[1.03] z-10'
              : 'bg-white text-slate-900 border border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1 z-0'
            }`}
        >
          {plan.highlight && (
            <>
              
              {/* Overlapping Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1 rounded-full shadow-[0_10px_30px_-5px_rgba(234,88,12,0.6)] whitespace-nowrap">
                  Most Popular
                </div>
              </div>

              {/* Ambient Glow Inside Card */}
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-500/10 via-transparent to-transparent rounded-3xl pointer-events-none"></div>
            </>
          )}

          <div className={`relative z-10 flex-grow ${plan.highlight ? 'p-6 sm:p-8 pt-8' : 'p-5 sm:p-6 lg:p-7'}`}>
            <div className="flex justify-between items-center mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${plan.highlight ? 'bg-pink-500/10 border border-pink-500/20' : 'bg-slate-50 border border-slate-100'}`}>
                {React.cloneElement(plan.icon, { className: `w-5 h-5 ${plan.highlight ? 'text-pink-500' : 'text-slate-500'}` })}
              </div>
            </div>

            <h3 className="text-xl font-black mb-1.5 tracking-tight">{plan.name}</h3>
            <p className={`text-[13px] font-medium leading-relaxed mb-4 ${plan.highlight ? 'text-slate-400' : 'text-slate-500'}`}>
              {plan.description}
            </p>

            <div className="mb-5 flex items-end gap-1">
              <span className={`text-xl font-black mb-1 ${plan.highlight ? 'text-pink-500' : 'text-slate-400'}`}>€</span>
              <span className="text-4xl font-black leading-none tracking-tighter">
                {isAnnual ? plan.annualPrice : plan.monthlyPrice}
              </span>
              <span className={`text-[13px] font-bold pb-1 pl-0.5 ${plan.highlight ? 'text-slate-500' : 'text-slate-400'}`}>/month</span>
            </div>

            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, j) => (
                <li key={j} className="flex items-start gap-2.5">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${plan.highlight ? 'bg-pink-500/20' : 'bg-green-50'}`}>
                    <Check className={`w-2.5 h-2.5 ${plan.highlight ? 'text-pink-500' : 'text-green-600'}`} strokeWidth={3} />
                  </div>
                  <span className={`text-[13px] font-bold ${plan.highlight ? 'text-slate-200' : 'text-slate-700'}`}>{feature}</span>
                </li>
              ))}
              {plan.missingFeatures.map((feature, j) => (
                <li key={`missing-${j}`} className="flex items-start gap-2.5 opacity-40">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${plan.highlight ? 'bg-white/5' : 'bg-slate-100'}`}>
                    <div className={`w-2 h-[2px] rounded-full ${plan.highlight ? 'bg-slate-500' : 'bg-slate-400'}`}></div>
                  </div>
                  <span className={`text-[13px] font-medium ${plan.highlight ? 'text-slate-400' : 'text-slate-500'}`}>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`relative z-10 mt-auto pt-4 border-t ${plan.highlight ? 'p-6 sm:p-8 pt-4 border-slate-800' : 'p-5 sm:p-6 lg:p-7 pt-4 border-slate-100'}`}>
            <Link to="/checkout" className={`w-full h-11 rounded-xl text-[14px] font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn ${plan.highlight
                ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-400 hover:to-pink-500 shadow-[0_8px_20px_-8px_rgba(249,115,22,0.6)] hover:shadow-[0_12px_25px_-8px_rgba(249,115,22,0.8)]'
                : 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-md'
              }`}>
              Get Started
            </Link>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-16 text-center flex items-center justify-center gap-2 text-[14px] font-bold text-slate-500 bg-white border border-slate-200 px-6 py-3 rounded-xl w-fit mx-auto shadow-sm">
      <Info className="w-4 h-4 text-slate-400" /> All plans are billed securely and include a 14-day money-back guarantee.
    </div>
  </section>
);
