import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Clock, Lock, Shield } from 'lucide-react';
import { LocationFields } from '../components/checkout/LocationFields';
import type { Plan } from '../components/pricing/PricingCards';
import { Loader } from '../components/Loader';
import { API_URLS } from '../api';
import { COMPANY, companyEmailLink } from '../config/company';
import {
  CHECKOUT_PATH,
  CHECKOUT_PLAN_STORAGE_KEY,
  formatPlanPrice,
  rememberCheckoutPlan,
  type CheckoutLocationState,
} from '../utils/formatPlanPrice';

const inputClass =
  'w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 text-[15px] focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 focus:bg-white transition-all font-medium text-slate-900 placeholder:text-slate-400';

const labelClass = 'block text-[13px] font-bold text-slate-700 tracking-wide uppercase mb-2';

export const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const legacyQueryPlan = searchParams.get('plan');
  const statePlanId = (location.state as CheckoutLocationState | null)?.planId;
  const planId = Number(statePlanId ?? legacyQueryPlan ?? sessionStorage.getItem(CHECKOUT_PLAN_STORAGE_KEY));

  useEffect(() => {
    if (!legacyQueryPlan) return;
    const legacyId = Number(legacyQueryPlan);
    if (Number.isFinite(legacyId) && legacyId > 0) rememberCheckoutPlan(legacyId);
    navigate(CHECKOUT_PATH, { replace: true, state: { planId: legacyId } satisfies CheckoutLocationState });
  }, [legacyQueryPlan, navigate]);

  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [planError, setPlanError] = useState('');
  const [isPlanLoading, setIsPlanLoading] = useState(true);

  const [countryCode, setCountryCode] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [cityName, setCityName] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    if (!Number.isFinite(planId) || planId <= 0) {
      setPlanError('Please choose a membership plan before checkout.');
      setIsPlanLoading(false);
      return;
    }

    let cancelled = false;

    const loadPlan = async () => {
      setIsPlanLoading(true);
      setPlanError('');
      try {
        const response = await fetch(API_URLS.plans.list);
        const result = await response.json();
        if (!response.ok || !result.success || !Array.isArray(result.data)) {
          throw new Error(result.message || 'Unable to load plan details.');
        }
        const plan = result.data.find((item: Plan) => item.id === planId && item.is_active);
        if (!plan) {
          throw new Error('This plan is not available. Please select another option on the pricing page.');
        }
        if (!cancelled) setSelectedPlan(plan);
      } catch (error) {
        if (!cancelled) {
          setSelectedPlan(null);
          setPlanError(error instanceof Error ? error.message : 'Unable to load plan details.');
        }
      } finally {
        if (!cancelled) setIsPlanLoading(false);
      }
    };

    loadPlan();
    return () => {
      cancelled = true;
    };
  }, [planId]);

  const formattedPrice = selectedPlan ? formatPlanPrice(selectedPlan) : '';

  const handleCountryChange = (iso: string) => {
    setCountryCode(iso);
    setStateCode('');
    setCityName('');
  };

  const handleStateChange = (iso: string) => {
    setStateCode(iso);
    setCityName('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (isPlanLoading) {
    return (
      <main className="min-h-screen font-sans bg-[#FAF9F6] pt-32 pb-20 px-4">
        <Loader variant="page" label="Loading your selected plan..." />
      </main>
    );
  }

  if (!selectedPlan) {
    return (
      <main className="min-h-screen font-sans bg-[#FAF9F6] pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto text-center bg-white rounded-[2rem] border border-slate-100 shadow-sm p-10">
          <h1 className="text-2xl font-black text-slate-900 mb-3">No plan selected</h1>
          <p className="text-slate-600 font-medium mb-8">{planError}</p>
          <Link
            to="/pricing/"
            className="inline-flex h-12 items-center justify-center px-8 rounded-xl bg-slate-900 text-white font-bold hover:bg-pink-600 transition-colors"
          >
            View pricing plans
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen font-sans bg-[#FAF9F6] pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full pointer-events-none bg-right-bottom bg-no-repeat fixed opacity-40"
        style={{ backgroundImage: "url('/images/card-bg.webp')", backgroundAttachment: 'fixed' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-10 max-w-2xl">
          <p className="text-pink-600 font-bold text-sm tracking-widest uppercase mb-3">One step closer</p>
          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-4">
            Complete your {COMPANY.brandName} membership
          </h1>
          <p className="text-[17px] text-slate-600 font-medium leading-relaxed">
            Secure checkout for practical AI productivity and online business learning. Your access begins as soon as your order is
            confirmed.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-5 gap-8 lg:gap-10 items-start">
          <input type="hidden" name="plan_id" value={selectedPlan.id} />
          <div className="lg:col-span-3 space-y-6">
            <section className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 sm:p-10">
              <h2 className="text-xl font-black text-slate-900 mb-6">Your information</h2>
              <div className="space-y-5">
                <div>
                  <label htmlFor="checkout-email" className={labelClass}>
                    Email address <span className="text-pink-600">*</span>
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={inputClass}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="checkout-first-name" className={labelClass}>
                      First name <span className="text-pink-600">*</span>
                    </label>
                    <input
                      id="checkout-first-name"
                      type="text"
                      autoComplete="given-name"
                      placeholder="John"
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-last-name" className={labelClass}>
                      Last name <span className="text-pink-600">*</span>
                    </label>
                    <input
                      id="checkout-last-name"
                      type="text"
                      autoComplete="family-name"
                      placeholder="Doe"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="checkout-password" className={labelClass}>
                    Create a password <span className="text-pink-600">*</span>
                  </label>
                  <input
                    id="checkout-password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Choose a secure password"
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="checkout-phone" className={labelClass}>
                    Phone number <span className="text-pink-600">*</span>
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Your phone number"
                    className={inputClass}
                    required
                  />
                </div>
              </div>
            </section>

            <section className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 sm:p-10">
              <h2 className="text-xl font-black text-slate-900 mb-6">Billing details</h2>
              <div className="space-y-5">
                <div>
                  <label htmlFor="checkout-street" className={labelClass}>
                    Street address <span className="text-pink-600">*</span>
                  </label>
                  <input
                    id="checkout-street"
                    type="text"
                    autoComplete="street-address"
                    placeholder="Enter your street address"
                    className={inputClass}
                    required
                  />
                </div>

                <LocationFields
                  countryCode={countryCode}
                  stateCode={stateCode}
                  cityName={cityName}
                  onCountryChange={handleCountryChange}
                  onStateChange={handleStateChange}
                  onCityChange={setCityName}
                />

                <div className="sm:w-1/2">
                  <label htmlFor="checkout-postcode" className={labelClass}>
                    Postcode / ZIP <span className="text-pink-600">*</span>
                  </label>
                  <input
                    id="checkout-postcode"
                    type="text"
                    autoComplete="postal-code"
                    placeholder="Enter your postcode"
                    className={inputClass}
                    required
                  />
                </div>
              </div>
            </section>

            <section className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 sm:p-10">
              <h2 className="text-xl font-black text-slate-900 mb-2">SEPA Direct Debit Information</h2>
              <p className="text-sm text-slate-500 font-medium mb-6">
                Set up a secure SEPA Direct Debit for your {COMPANY.brandName} membership.
              </p>

              <div className="rounded-2xl border border-pink-100 bg-pink-50/80 p-6 sm:p-8">
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-pink-600 shrink-0 mt-0.5" aria-hidden />
                  <div>
                    <p className="font-bold text-slate-900">SEPA Direct Debit</p>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      By providing your IBAN, you authorize {COMPANY.name} to collect recurring subscription payments
                      from your account in accordance with your membership terms.
                    </p>
                  </div>
                </div>
                <div>
                  <label htmlFor="checkout-iban" className={labelClass}>
                    IBAN <span className="text-pink-600">*</span>
                  </label>
                  <input
                    id="checkout-iban"
                    type="text"
                    autoComplete="off"
                    placeholder="Enter your IBAN"
                    className={`${inputClass} bg-white`}
                    required
                  />
                </div>
                <p className="text-xs text-slate-500 font-medium mt-6 leading-relaxed">
                  <span className="font-bold text-slate-700">Payment information.</span> All transactions are secure
                  and encrypted.
                </p>
              </div>

              <label className="flex items-start gap-3 mt-8 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-slate-300 text-pink-600 focus:ring-pink-500"
                  required
                />
                <span className="text-sm text-slate-600 font-medium leading-relaxed">
                  I confirm that I have read and agree to the{' '}
                  <Link to="/terms-conditions/" className="text-pink-600 font-bold hover:underline">
                    Terms &amp; Conditions
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy-policy/" className="text-pink-600 font-bold hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              <button
                type="submit"
                disabled
                aria-disabled="true"
                title="Checkout is not available yet"
                className="mt-6 w-full h-14 rounded-2xl bg-slate-900 text-white text-[15px] font-bold transition-all shadow-lg shadow-slate-900/10 opacity-50 cursor-not-allowed"
              >
                Complete secure order
              </button>

              <div className="grid sm:grid-cols-2 gap-6 mt-8 pt-8 border-t border-slate-100">
                <div className="flex gap-3">
                  <Clock className="w-5 h-5 text-pink-600 shrink-0" aria-hidden />
                  <div>
                    <p className="text-sm font-bold text-slate-900">Cancel anytime</p>
                    <p className="text-xs text-slate-500 font-medium mt-1">Manage your subscription from your account.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Shield className="w-5 h-5 text-pink-600 shrink-0" aria-hidden />
                  <div>
                    <p className="text-sm font-bold text-slate-900">Secure processing</p>
                    <p className="text-xs text-slate-500 font-medium mt-1">Your information is protected.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-2 lg:sticky lg:top-28 space-y-4">
            <div className="bg-slate-900 text-white rounded-[2rem] p-8 shadow-xl shadow-slate-900/20">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-pink-400 mb-6">Your membership</p>

              <div className="flex justify-between items-start gap-4 mb-1">
                <p className="text-lg font-bold leading-snug">{selectedPlan.name}</p>
                <p className="text-2xl font-black shrink-0">{formattedPrice}</p>
              </div>
              <p className="text-sm text-slate-400 font-medium mb-8">Subscription</p>

              <div className="space-y-3 text-sm border-t border-slate-700 pt-6 mb-6">
                <div className="flex justify-between text-slate-300">
                  <span>Subscription</span>
                  <span className="font-semibold text-white">{formattedPrice}</span>
                </div>
                <div className="flex justify-between text-base font-black pt-2">
                  <span>Total today</span>
                  <span>{formattedPrice}</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5 text-pink-300" aria-hidden />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Protected checkout</p>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Your information is encrypted and secure.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 font-medium text-center px-2 leading-relaxed">
              Cancel anytime from your account. Questions before you subscribe?{' '}
              <a href={companyEmailLink} className="text-pink-600 font-bold hover:underline">
                Contact support
              </a>
              .
            </p>
          </aside>
        </form>
      </div>
    </main>
  );
};
