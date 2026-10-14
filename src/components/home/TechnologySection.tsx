import React from 'react';
import { Check } from 'lucide-react';

const categoryHighlights = [
  'AI tools for task management, planning, content creation, and everyday workflows.',
  'Better routines, stronger time management, fewer distractions, and more focused work.',
  'Strategies for productive home offices, remote motivation, and effective work from home habits.',
];

const categories = [
  {
    title: 'AI for Productivity',
    desc: 'Discover ways to use AI tools for task management, planning, content creation, and everyday workflows.',
    icon: '/images/icon1.webp',
    alt: 'AI for Productivity',
    className: 'mt-0 sm:mt-12',
  },
  {
    title: 'Personal Productivity',
    desc: 'Build better routines, manage your time, reduce distractions, and accomplish more with a focused approach.',
    icon: '/images/icon2.webp',
    alt: 'Personal Productivity',
    className: '',
  },
  {
    title: 'Work From Home',
    desc: 'Learn strategies for creating a productive home office, maintaining motivation, and managing remote work effectively.',
    icon: '/images/icon1.webp',
    alt: 'Work From Home',
    className: 'sm:col-span-2',
  },
];

export const TechnologySection = () => (
  <section className="py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-pink-600 font-bold text-sm tracking-widest uppercase mb-4">Learning Categories</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.15] mb-8">
            Skills That Make Your Workday Better
          </h2>
          <div className="w-12 h-1 bg-pink-600 mb-8 rounded-full"></div>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Explore practical learning resources designed around everyday productivity, modern AI tools, and online business development.
          </p>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Explore practical learning resources focused on everyday productivity, modern AI tools, and professional skills for remote work and online business development.
          </p>
          <ul className="space-y-4 mb-10">
            {categoryHighlights.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-pink-600" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {categories.map((category) => (
            <div key={category.title} className={`bg-white rounded-2xl p-8 hover:shadow-xl transition-all border border-slate-100 relative overflow-hidden group ${category.className}`}>
              <div className="absolute inset-0 w-full h-full opacity-30 mix-blend-multiply pointer-events-none bg-right-bottom bg-no-repeat" style={{ backgroundImage: "url('/images/card-bg.webp')" }}></div>
              <div className="relative z-10">
                <div className="mb-6">
                  <img src={category.icon} alt={category.alt} className="w-16 h-16 object-contain filter sepia saturate-[3] hue-rotate-[-15deg] contrast-125" />
                </div>
                <p className="text-xl font-bold text-slate-900 mb-3">{category.title}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{category.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
