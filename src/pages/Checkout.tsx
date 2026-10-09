import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, Shield } from 'lucide-react';

export const Checkout = () => {
  return (
    <div className="min-h-screen bg-[#F8F7F4] pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Checkout</h1>
          <p className="text-slate-500">Please complete your details below to finalize your order.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Billing Details */}
          <div className="w-full lg:w-3/5">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
              
              <h2 className="text-2xl font-bold text-slate-900 mb-8 relative z-10">Billing Details</h2>
              
              <form className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-slate-700 mb-2">First name *</label>
                    <input type="text" id="firstName" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-colors" required />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-slate-700 mb-2">Last name *</label>
                    <input type="text" id="lastName" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-colors" required />
                  </div>
                </div>

                <div>
                  <label htmlFor="companyName" className="block text-sm font-semibold text-slate-700 mb-2">Company name (optional)</label>
                  <input type="text" id="companyName" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-colors" />
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-semibold text-slate-700 mb-2">Country / Region *</label>
                  <select id="country" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-colors bg-white" required>
                    <option value="US">United States (US)</option>
                    <option value="UK">United Kingdom (UK)</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="streetAddress" className="block text-sm font-semibold text-slate-700 mb-2">Street address *</label>
                  <input type="text" id="streetAddress" placeholder="House number and street name" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-colors mb-3" required />
                  <input type="text" placeholder="Apartment, suite, unit, etc. (optional)" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-colors" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-semibold text-slate-700 mb-2">Town / City *</label>
                    <input type="text" id="city" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-colors" required />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-semibold text-slate-700 mb-2">State / County *</label>
                    <input type="text" id="state" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-colors" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="zip" className="block text-sm font-semibold text-slate-700 mb-2">ZIP *</label>
                    <input type="text" id="zip" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-colors" required />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">Phone *</label>
                    <input type="tel" id="phone" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-colors" required />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email address *</label>
                  <input type="email" id="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-colors" required />
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Additional information</h3>
                  <label htmlFor="orderNotes" className="block text-sm font-semibold text-slate-700 mb-2">Order notes (optional)</label>
                  <textarea id="orderNotes" rows={4} placeholder="Notes about your order, e.g. special notes for delivery." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-colors resize-none"></textarea>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Your Order */}
          <div className="w-full lg:w-2/5">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-200 sticky top-24">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Your Order</h2>
              
              <div className="border-b border-slate-100 pb-4 mb-4">
                <div className="flex justify-between text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">
                  <span>Product</span>
                  <span>Subtotal</span>
                </div>
                <div className="flex justify-between items-center text-slate-600 mb-4">
                  <span>Pro Plan - Monthly Subscription × 1</span>
                  <span className="font-semibold text-slate-900">$29.00</span>
                </div>
              </div>

              <div className="border-b border-slate-100 pb-4 mb-4">
                <div className="flex justify-between items-center text-slate-600 mb-2">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">$29.00</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Tax (10%)</span>
                  <span className="font-semibold text-slate-900">$2.90</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-xl font-black text-slate-900 mb-8">
                <span>Total</span>
                <span className="text-slate-900">$31.90</span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center gap-3 mb-2">
                    <input type="radio" id="creditCard" name="paymentMethod" className="text-slate-900 focus:ring-slate-900 w-4 h-4" defaultChecked />
                    <label htmlFor="creditCard" className="font-bold text-slate-900 cursor-pointer">Credit Card</label>
                  </div>
                  <p className="text-sm text-slate-500 pl-7">Pay securely using your credit card.</p>
                </div>
                
                <div className="rounded-xl p-4 border border-transparent">
                  <div className="flex items-center gap-3 mb-2">
                    <input type="radio" id="paypal" name="paymentMethod" className="text-slate-900 focus:ring-slate-900 w-4 h-4" />
                    <label htmlFor="paypal" className="font-bold text-slate-900 cursor-pointer">PayPal</label>
                  </div>
                </div>
              </div>

              <div className="text-sm text-slate-500 mb-8">
                Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <Link to="/privacy-policy" className="text-slate-900 font-bold hover:underline">privacy policy</Link>.
              </div>

              <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-md transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                <Lock className="w-5 h-5" />
                Place Order
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
                <Shield className="w-4 h-4" />
                SSL Encrypted Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
