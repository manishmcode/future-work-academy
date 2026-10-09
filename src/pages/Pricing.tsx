import React, { useEffect, useState } from 'react';
import { PricingHeader } from '../components/pricing/PricingHeader';
import { Plan, PricingCards } from '../components/pricing/PricingCards';
import { API_URLS } from '../api';

export const Pricing = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const response = await fetch(API_URLS.plans.list);
        const result = await response.json();
        if (!response.ok || !result.success || !Array.isArray(result.data)) throw new Error(result.message || 'Unable to load plans.');
        setPlans(result.data.filter((plan: Plan) => plan.is_active));
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : 'Unable to load plans.');
      } finally {
        setIsLoading(false);
      }
    };
    loadPlans();
  }, []);

  return <main className="min-h-screen font-sans bg-[#FAF9F6] overflow-hidden pb-24 relative"><div className="absolute inset-0 w-full h-full pointer-events-none bg-right-bottom bg-no-repeat fixed" style={{ backgroundImage: "url('/images/card-bg.png')", backgroundAttachment: 'fixed' }} /><PricingHeader />{isLoading ? <p className="relative text-center text-slate-500 font-medium py-20">Loading plans...</p> : error ? <p className="relative text-center text-red-600 font-medium py-20">{error}</p> : plans.length ? <PricingCards plans={plans} /> : <p className="relative text-center text-slate-500 font-medium py-20">No plans are currently available.</p>}</main>;
};

export default Pricing;
