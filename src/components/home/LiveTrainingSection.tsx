import React from 'react';
import { ArrowRight, Video, Monitor, FileText, Award } from 'lucide-react';

const liveTrainingFeatures = [
  { num: '01', title: 'Live Q&A Sessions', icon: <Video className="w-5 h-5 text-pink-600" /> },
  { num: '02', title: 'Screen Sharing', icon: <Monitor className="w-5 h-5 text-pink-600" /> },
  { num: '03', title: 'Project-Based Learning', icon: <FileText className="w-5 h-5 text-pink-600" /> },
  { num: '04', title: 'Certificate of Completion', icon: <Award className="w-5 h-5 text-pink-600" /> }
];

export const LiveTrainingSection = () => (
  <section className="py-24 border-y border-slate-200/50 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-end mb-16">
        <div>
          <p className="text-pink-600 font-bold text-[11px] tracking-widest uppercase mb-4 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-pink-600"></span> LIVE TRAINING
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
            Learn in Real Time <br /> with Skilled Instructors
          </h2>
        </div>
        <div className="lg:pl-10">
          <p className="text-slate-500 text-[15px] leading-relaxed mb-6">
            Take part in guided online sessions where you can ask questions, follow practical demonstrations and receive clear feedback as you learn.
          </p>
          <button className="h-11 px-8 rounded-lg bg-slate-900 text-[13px] font-bold text-white tracking-wide hover:bg-pink-600 transition-colors flex items-center gap-2">
            See Class Schedule <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="absolute inset-0 bg-pink-600 rounded-[2rem] transform -rotate-3 opacity-10"></div>
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
            <img src="/images/live-instructor.webp" alt="Live Instructor" className="w-full object-cover aspect-[4/3] border border-white rounded-[2rem]" />
            <div className="absolute top-6 left-6 bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg shadow-red-500/30">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div> LIVE
            </div>
          </div>
        </div>

        <div className="lg:pl-10 space-y-0">
          {liveTrainingFeatures.map((item, i) => (
            <div key={i} className="flex items-center gap-6 py-6 border-b border-slate-200 last:border-0 group hover:bg-white/50 transition-colors rounded-xl px-4 -mx-4">
              <div className="text-pink-300 font-bold text-lg opacity-80 w-6">{item.num}</div>
              <div className="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center shrink-0 group-hover:bg-pink-600 group-hover:text-white transition-colors [&>svg]:group-hover:text-white">
                {item.icon}
              </div>
              <h4 className="text-[17px] font-bold text-slate-800">{item.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
