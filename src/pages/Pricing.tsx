import React, { useState } from 'react';
import { PricingHeader } from '../components/pricing/PricingHeader';
import { PricingCards } from '../components/pricing/PricingCards';
import { ComparisonTable } from '../components/pricing/ComparisonTable';

// --- Main Page Component ---

export const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <main className="min-h-screen font-sans bg-[#FAF9F6] overflow-hidden pb-24 relative">
      <div className="absolute inset-0 w-full h-full pointer-events-none bg-right-bottom bg-no-repeat fixed" style={{ backgroundImage: "url('/images/card-bg.png')", backgroundAttachment: 'fixed' }}></div>
      <PricingHeader isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
      <PricingCards isAnnual={isAnnual} />
      <ComparisonTable />
    </main>
  );
};

export default Pricing;