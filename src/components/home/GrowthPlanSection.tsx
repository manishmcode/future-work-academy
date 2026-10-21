import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Briefcase, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const growthSteps = [
  { num: '01', title: 'Choose Your Course', desc: 'Explore the available courses and select a topic that aligns with your interests and goals.', icon: <GraduationCap className="w-6 h-6" /> },
  { num: '02', title: 'Learn at Your Own Pace', desc: 'Work through the available video lessons and learning materials at a pace that suits your schedule.', icon: <Briefcase className="w-6 h-6" /> },
  { num: '03', title: 'Put Your Knowledge Into Practice', desc: 'Apply the ideas and techniques you learn to your everyday work, personal productivity, or online business projects.', icon: <CheckCircle className="w-6 h-6" /> }
];

export const GrowthPlanSection = () => {
  const { hasLibraryAccess } = useAuth();
  const courseDestination = hasLibraryAccess ? '/library/' : '/pricing/';

  return (
  <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-transparent">

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
        <p className="text-pink-600 font-bold text-[12px] tracking-[0.2em] uppercase mb-4">
          How It Works
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-[1.1] tracking-tight">
          Three Simple Steps to Get Started
        </h2>
        <p className="text-slate-500 text-[15px] sm:text-[16px] leading-relaxed max-w-2xl mx-auto font-medium">
          Choose a practical learning topic, move through the course at your own pace, and apply new ideas to your work.
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Connecting Line (Desktop) */}
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[1px] bg-slate-200 -translate-y-1/2 z-0"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10">
          {growthSteps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-[2rem] p-6 sm:p-8 lg:p-10 border border-slate-200 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] hover:border-slate-300 hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col h-full"
            >
              <div className="absolute inset-0 w-full h-full opacity-[0.03] group-hover:opacity-[0.08] mix-blend-multiply transition-opacity bg-right-bottom bg-no-repeat pointer-events-none" style={{ backgroundImage: "url('/images/card-bg.webp')" }}></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6 sm:mb-8">
                  <span className="text-5xl sm:text-6xl font-black text-slate-200 group-hover:text-pink-100 transition-colors duration-500 tracking-tighter">
                    {step.num}
                  </span>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-pink-600 group-hover:text-white group-hover:border-pink-600 group-hover:shadow-[0_10px_30px_rgba(234,88,12,0.3)] transition-all duration-500 transform group-hover:scale-110 group-hover:-rotate-3 shrink-0">
                    {React.cloneElement(step.icon, { className: 'w-6 h-6 transition-colors' })}
                  </div>
                </div>
                <h3 className="text-[19px] font-bold text-slate-900 mb-3 group-hover:text-pink-600 transition-colors duration-300 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[14px] text-slate-500 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-14">
          <Link
            to={courseDestination}
            className="inline-flex w-full sm:w-auto items-center justify-center min-h-12 px-8 rounded-xl bg-slate-900 text-white text-[13px] font-bold tracking-wide hover:bg-pink-600 transition-colors"
          >
            Explore Courses
          </Link>
        </div>
      </div>
    </div>
  </section>
  );
};
