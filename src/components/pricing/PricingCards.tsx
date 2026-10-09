import React from 'react';
import { Check, Shield, Star, X, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export type Plan = { id: number; name: string; price: string | number; currency: string; is_active: boolean; description: string | null; features: { name: string; is_included: boolean }[] | string };
type PlanFeature = { name: string; is_included: boolean };
const icons = [Shield, Zap, Star];

const parseFeatures = (features: Plan['features']): PlanFeature[] => {
  if (Array.isArray(features)) return features;
  try { return JSON.parse(features); } catch { return []; }
};

export const PricingCards = ({ plans }: { plans: Plan[] }) => {
  const featuredPlan = plans.reduce<Plan | undefined>((current, plan) => {
    if (!current) return plan;
    return parseFeatures(plan.features).filter((feature) => feature.is_included).length > parseFeatures(current.features).filter((feature) => feature.is_included).length ? plan : current;
  }, undefined);
  const orderedPlans = plans.filter((plan) => plan.id !== featuredPlan?.id);
  if (featuredPlan) orderedPlans.splice(Math.min(1, orderedPlans.length), 0, featuredPlan);

  return <section className="pb-16 pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid gap-6 lg:grid-cols-3 items-stretch">
      {orderedPlans.map((plan, index) => {
        const Icon = icons[index % icons.length];
        const features = parseFeatures(plan.features);
        const featured = plan.id === featuredPlan?.id;
        const price = new Intl.NumberFormat(undefined, { style: 'currency', currency: plan.currency || 'EUR', maximumFractionDigits: 2 }).format(Number(plan.price));
        return <div key={plan.id} className={`relative rounded-3xl flex flex-col transition-all duration-300 ${featured ? 'bg-slate-900 text-white border border-pink-500/30 shadow-xl lg:-translate-y-2' : 'bg-white text-slate-900 border border-slate-200 shadow-sm hover:-translate-y-1'}`}>
          {featured && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-pink-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1 rounded-full whitespace-nowrap">Most Popular</div>}
          <div className="flex-grow p-6 sm:p-8">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 ${featured ? 'bg-pink-500/20' : 'bg-slate-50'}`}><Icon className={`w-5 h-5 ${featured ? 'text-pink-400' : 'text-slate-500'}`} /></div>
            <h3 className="text-xl font-black mb-5">{plan.name}</h3>
            <div className="mb-6"><span className="text-4xl font-black tracking-tighter">{price}</span><span className="text-sm font-bold ml-1 text-slate-400">/month</span></div>
            <ul className="space-y-3">
              {features.map((feature, featureIndex) => {
                const isFirstLiveFeature = featureIndex === features.findIndex((item) => /(live|class|instructor|demonstration|session)/i.test(item.name));
                return <React.Fragment key={featureIndex}>
                  {isFirstLiveFeature && <li className={`pt-5 mt-5 border-t text-[11px] font-black uppercase tracking-widest ${featured ? 'border-slate-700 text-lime-300' : 'border-slate-100 text-slate-900'}`}>Includes Live Classes</li>}
                  <li className={`flex items-start gap-2.5 ${feature.is_included ? '' : 'opacity-50'}`}>
                    {feature.is_included ? <Check className={`w-4 h-4 shrink-0 mt-0.5 ${featured ? 'text-pink-400' : 'text-green-600'}`} strokeWidth={3} /> : <X className="w-4 h-4 shrink-0 mt-0.5 text-red-400" strokeWidth={3} />}
                    <span className="text-sm font-semibold">{feature.name}</span>
                  </li>
                </React.Fragment>;
              })}
            </ul>
          </div>
          <div className={`p-6 sm:p-8 pt-4 border-t ${featured ? 'border-slate-800' : 'border-slate-100'}`}><Link to={`/signup?planId=${plan.id}`} className={`w-full h-11 rounded-xl text-sm font-bold flex items-center justify-center ${featured ? 'bg-pink-600 hover:bg-pink-500 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'}`}>Start Reading</Link></div>
        </div>;
      })}
    </div>
  </section>;
};
