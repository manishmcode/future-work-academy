import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const coursesList = [
  {
    title: 'AI for Productivity Video Upgrade',
    cat: 'AI PRODUCTIVITY',
    desc: 'Discover practical ways to apply AI to everyday tasks, support content creation, improve planning, and streamline your workflow.',
    tag: 'WORKFLOW & TOOLS',
    icon: '/images/icon1.webp',
  },
  {
    title: 'Simple Productivity Video Course',
    cat: 'PRODUCTIVITY',
    desc: 'Learn practical approaches to building productive habits, managing distractions, planning your day, and making better use of your time.',
    tag: 'TIME MANAGEMENT',
    icon: '/images/icon2.webp',
  },
  {
    title: 'Work From Home Productivity Video Upgrade',
    cat: 'REMOTE WORK',
    desc: 'Explore strategies for creating a productive home office, establishing routines, staying focused, and managing the challenges of remote work.',
    tag: 'HOME OFFICE',
    icon: '/images/icon1.webp',
  },
  {
    title: 'How To Start a Freelance Business Video Upgrade',
    cat: 'FREELANCE',
    desc: 'Explore key aspects of freelancing, from identifying your niche and building a portfolio to finding clients and discovering freelance opportunities.',
    tag: 'CLIENT ACQUISITION',
    icon: '/images/icon2.webp',
  },
  {
    title: 'Solopreneur Success Video Upgrade',
    cat: 'SOLOPRENEUR',
    desc: 'Discover ideas for managing your time, staying motivated, building professional connections, and developing your one-person business.',
    tag: 'GROWTH & MARKETING',
    icon: '/images/icon1.webp',
  },
  {
    title: 'Virtual Summit Secrets Video Upgrade',
    cat: 'VIRTUAL EVENTS',
    desc: 'Explore the essentials of virtual summit planning, including speaker selection, event promotion, audience engagement, and monetization strategies.',
    tag: 'EVENT STRATEGY',
    icon: '/images/icon2.webp',
  },
];

export const CoursesSection = () => {
  const { hasLibraryAccess } = useAuth();
  const courseDestination = hasLibraryAccess ? '/library/' : '/pricing/';

  return (
    <section className="py-16 sm:py-20 lg:py-24 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-pink-600 font-bold text-[11px] tracking-widest uppercase mb-4">Featured Courses</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Learn Skills You Can Put Into Practice
          </h2>
          <p className="text-slate-500 mt-6 max-w-2xl mx-auto text-[15px] leading-relaxed">
            Explore video courses covering AI productivity, time management, freelancing, remote work, and virtual events. Choose a topic that matches your interests and learn at your own pace.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {coursesList.map((course, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all border border-slate-100 relative overflow-hidden group flex flex-col h-full"
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
                    <span className="px-3 py-1 bg-white border border-slate-200 text-slate-700 text-[10px] font-bold rounded-full uppercase tracking-wider max-w-[56%] text-right leading-tight">
                      {course.cat}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{course.title}</h3>
                  <p className="text-slate-500 text-[13px] leading-relaxed flex-grow mb-6">{course.desc}</p>
                  <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center mt-auto">
                    <div className="flex items-center gap-2 text-slate-600 text-[11px] font-bold uppercase tracking-wider">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      {course.tag}
                    </div>
                    <Link
                      to={courseDestination}
                      aria-label={`Explore ${course.title}`}
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-9 px-4 rounded-full border border-slate-300 text-slate-500 text-[11px] font-bold uppercase tracking-wider group-hover:bg-pink-600 group-hover:text-white group-hover:border-pink-600 transition-colors"
                    >
                      Explore Course
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-14">
          <Link
            to={courseDestination}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-12 px-8 rounded-xl bg-slate-900 text-white text-[13px] font-bold tracking-wide hover:bg-pink-600 transition-colors"
          >
            Browse All Courses
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
