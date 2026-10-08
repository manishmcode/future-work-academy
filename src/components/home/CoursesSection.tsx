import React from 'react';
import { ArrowRight } from 'lucide-react';

const coursesList = [
  { title: 'Launch Your Consulting Business', cat: 'Consulting', desc: 'Master proven client advisory frameworks, land high-ticket corporate retainers, and scale your consulting practice.', tag: 'Advisory & Strategy', icon: '/images/icon1.png', staggered: false },
  { title: 'Virtual Networking Success', cat: 'Networking', desc: 'Turn digital events and online networking into high-converting professional relationships and client pipelines.', tag: 'Client Pipelines', icon: '/images/icon2.png', staggered: true },
  { title: 'WordPress Master Kit', cat: 'Web Dev', desc: 'Design, build, and optimize high-speed WordPress sites, custom sales funnels, and secure architectures.', tag: 'Funnel Architecture', icon: '/images/icon1.png', staggered: false },
  { title: 'Video Marketing Profit Kit', cat: 'Marketing', desc: 'Produce high-converting video campaigns, optimize organic reach, and convert viewers into paying customers.', tag: 'Video Campaigns', icon: '/images/icon2.png', staggered: true },
  { title: 'Start Your Own Coaching Business', cat: 'Coaching', desc: 'Structure high-impact 1-on-1 and group coaching programs with scalable recurring revenue systems.', tag: 'Recurring Revenue', icon: '/images/icon1.png', staggered: false },
  { title: 'Mastering E-Commerce Sales', cat: 'E-Commerce', desc: 'Build and scale profitable online stores using proven conversion strategies, paid traffic, and automated fulfillment.', tag: 'Online Retail', icon: '/images/icon2.png', staggered: true }
];

export const CoursesSection = () => (
  <section className="py-24 border-b border-slate-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="text-pink-600 font-bold text-[11px] tracking-widest uppercase mb-4">Courses & Live Learning</p>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
          Learn AI & Tech Through Courses & Live Guidance
        </h2>
        <p className="text-slate-500 mt-6 max-w-2xl mx-auto text-[15px] leading-relaxed">
          Explore practical, beginner-friendly courses and strengthen your knowledge through scheduled live classes, hands-on demonstrations and direct instructor interaction.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {coursesList.map((card, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl p-8 hover:shadow-xl transition-all border border-slate-100 relative overflow-hidden group flex flex-col h-full ${card.staggered ? 'mt-0 md:mt-12' : ''}`}
            >
              <div className="absolute inset-0 w-full h-full opacity-30 mix-blend-multiply pointer-events-none bg-right-bottom bg-no-repeat" style={{ backgroundImage: "url('/images/card-bg.png')" }}></div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14">
                    <img src={card.icon} alt={card.title} className="w-full h-full object-contain filter sepia saturate-[3] hue-rotate-[-15deg] contrast-125" />
                  </div>
                  <span className="px-3 py-1 bg-white border border-slate-200 text-slate-700 text-[10px] font-bold rounded-full uppercase tracking-wider">{card.cat}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{card.title}</h3>
                <p className="text-slate-500 text-[13px] leading-relaxed flex-grow mb-6">
                  {card.desc}
                </p>
                <div className="border-t border-slate-200 pt-6 flex justify-between items-center mt-auto">
                  <div className="flex items-center gap-2 text-slate-600 text-[11px] font-bold uppercase tracking-wider">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> {card.tag}
                  </div>
                  <div className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 group-hover:bg-pink-600 group-hover:text-white group-hover:border-pink-600 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
