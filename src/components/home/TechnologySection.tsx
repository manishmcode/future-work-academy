import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const techFeatures = [
  'Idea of denouncing pleasure & praising',
  'Ever undertakes laborious physical',
  'Avoids a pain that produces no resultant'
];

export const TechnologySection = () => (
  <section className="py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-pink-600 font-bold text-sm tracking-widest uppercase mb-4">Technology</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.15] mb-8">
            Any sufficiently advanced technology is indistinguishable from magic.
          </h2>
          <div className="w-12 h-1 bg-pink-600 mb-8 rounded-full"></div>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Must explain to you how all this mistaken idea of pleasure and praising pain was born and will give you a complete account of the system, and expound the actual teachings.
          </p>
          <ul className="space-y-4 mb-10">
            {techFeatures.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                <div className="w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center">
                  <Check className="w-3 h-3 text-pink-600" />
                </div>
                {item}
              </li>
            ))}
          </ul>
          <Link to="/services" className="h-12 px-8 inline-flex items-center justify-center rounded-lg bg-pink-600 text-[14px] font-bold text-white shadow-lg shadow-pink-600/30 hover:bg-pink-700 transition-all">
            More Services
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all border border-slate-100 mt-0 sm:mt-12 relative overflow-hidden group">
            <div className="absolute inset-0 w-full h-full opacity-30 mix-blend-multiply pointer-events-none bg-right-bottom bg-no-repeat" style={{ backgroundImage: "url('/images/card-bg.png')" }}></div>
            <div className="relative z-10">
              <div className="mb-6">
                <img src="/images/icon1.png" alt="Video Vision" className="w-16 h-16 object-contain filter sepia saturate-[3] hue-rotate-[-15deg] contrast-125" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Video Vision</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Simple easy distinguish when our power right.</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all border border-slate-100 relative overflow-hidden group">
            <div className="absolute inset-0 w-full h-full opacity-30 mix-blend-multiply pointer-events-none bg-right-bottom bg-no-repeat" style={{ backgroundImage: "url('/images/card-bg.png')" }}></div>
            <div className="relative z-10">
              <div className="mb-6">
                <img src="/images/icon2.png" alt="Computer Vision" className="w-16 h-16 object-contain filter sepia saturate-[3] hue-rotate-[-15deg] contrast-125" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Computer Vision</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Claims duty the obligations of business it will occur.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
