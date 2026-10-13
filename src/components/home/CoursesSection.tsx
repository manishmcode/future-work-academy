import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const coursesList = [
  {
    title: '5 AI Tips and Tricks You Can Learn Right Now',
    cat: 'AI PRODUCTIVITY',
    desc: 'Quick wins you can apply today—automate repetitive tasks, draft smarter, and reclaim focus without needing a technical background.',
    tag: 'WORKFLOW & TOOLS',
    icon: '/images/icon1.webp',
    staggered: false,
  },
  {
    title: 'How to Write a Captivating Freelance Profile to Score Valuable Clients',
    cat: 'FREELANCE',
    desc: 'Craft a profile that highlights your niche, builds trust, and turns profile views into discovery calls with the clients you want.',
    tag: 'CLIENT ACQUISITION',
    icon: '/images/icon2.webp',
    staggered: true,
  },
  {
    title: 'Master Your Time at the Office with The Pomodoro Method',
    cat: 'PRODUCTIVITY',
    desc: 'Use focused work sprints and planned breaks to beat distraction, finish deep work faster, and keep energy steady through the day.',
    tag: 'TIME MANAGEMENT',
    icon: '/images/icon1.webp',
    staggered: false,
  },
  {
    title: '5 Tips for Using Social Media to Promote Your Solopreneur Business',
    cat: 'SOLOPRENEUR',
    desc: 'Build a consistent content rhythm, speak to your ideal buyer, and turn followers into leads without burning out on every platform.',
    tag: 'GROWTH & MARKETING',
    icon: '/images/icon2.webp',
    staggered: true,
  },
  {
    title: '7 Steps to Launching Your Virtual Summit',
    cat: 'VIRTUAL EVENTS',
    desc: 'Plan speakers, promotion, and delivery in a clear sequence so you can host a professional online event and grow your audience.',
    tag: 'EVENT STRATEGY',
    icon: '/images/icon1.webp',
    staggered: false,
  },
  {
    title: 'How to Create a Highly Productive Work Environment in Your Home Office',
    cat: 'REMOTE WORK',
    desc: 'Set up your space, boundaries, and daily habits so working from home feels structured, focused, and sustainable long term.',
    tag: 'HOME OFFICE',
    icon: '/images/icon2.webp',
    staggered: true,
  },
];

export const CoursesSection = () => {
  const { hasLibraryAccess } = useAuth();
  const courseDestination = hasLibraryAccess ? '/library/' : '/pricing/';

  return (
    <section className="py-24 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-pink-600 font-bold text-[11px] tracking-widest uppercase mb-4">Courses & Live Learning</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Learn AI & Tech Through Courses & Live Guidance
          </h2>
          <p className="text-slate-500 mt-6 max-w-2xl mx-auto text-[15px] leading-relaxed">
            Explore practical, beginner-friendly courses and strengthen your knowledge through scheduled live classes,
            hands-on demonstrations and direct instructor interaction.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {coursesList.map((course, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl p-8 hover:shadow-xl transition-all border border-slate-100 relative overflow-hidden group flex flex-col h-full ${course.staggered ? 'mt-0 md:mt-12' : ''}`}
              >
                <div
                  className="absolute inset-0 w-full h-full opacity-30 mix-blend-multiply pointer-events-none bg-right-bottom bg-no-repeat"
                  style={{ backgroundImage: "url('/images/card-bg.webp')" }}
                />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14">
                      <img
                        src={course.icon}
                        alt=""
                        className="w-full h-full object-contain filter sepia saturate-[3] hue-rotate-[-15deg] contrast-125"
                      />
                    </div>
                    <span className="px-3 py-1 bg-white border border-slate-200 text-slate-700 text-[10px] font-bold rounded-full uppercase tracking-wider max-w-[48%] text-right leading-tight">
                      {course.cat}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{course.title}</h3>
                  <p className="text-slate-500 text-[13px] leading-relaxed flex-grow mb-6">{course.desc}</p>
                  <div className="border-t border-slate-200 pt-6 flex justify-between items-center mt-auto">
                    <div className="flex items-center gap-2 text-slate-600 text-[11px] font-bold uppercase tracking-wider">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      {course.tag}
                    </div>
                    <Link
                      to={courseDestination}
                      aria-label={`View ${course.title}`}
                      className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 group-hover:bg-pink-600 group-hover:text-white group-hover:border-pink-600 transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
