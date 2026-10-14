import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const highlights = [
  '01 - Practical Video Lessons: Explore video-based learning resources focused on useful skills and ideas.',
  '02 - Flexible Learning Schedule: Choose when to learn and fit your learning time around your daily routine.',
  '03 - Skills for Everyday Work: Discover techniques for productivity, remote work, and online business development.',
  '04 - Learn at Your Own Pace: Revisit available lessons and progress according to your schedule.',
];

export const InstructorLedSection = () => {
  const { hasLibraryAccess } = useAuth();
  const courseDestination = hasLibraryAccess ? '/library/' : '/pricing/';

  return (
  <section className="pb-24 relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-5xl mx-auto rounded-[2rem] bg-slate-900 text-white overflow-hidden border border-slate-800 shadow-[0_24px_80px_rgba(15,23,42,0.35)]">
        <div
          className="absolute inset-0 opacity-[0.12] mix-blend-soft-light pointer-events-none bg-right-bottom bg-no-repeat bg-cover"
          style={{ backgroundImage: "url('/images/card-bg.webp')" }}
        />
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-16 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-14 p-8 sm:p-10 lg:p-14 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full border border-pink-500/60 text-pink-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              Self-Paced Learning
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight mb-5">
              Learn Practical Skills at Your Own Pace
            </h2>
            <p className="text-slate-300 text-[15px] leading-relaxed mb-8 max-w-lg">
              Explore video courses covering AI productivity, time management, working from home, freelancing, and online business. Learn at a pace that fits your schedule and discover practical ideas you can apply to your work.
            </p>
            <Link
              to={courseDestination}
              className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-white text-slate-900 text-[13px] font-bold tracking-wide hover:bg-pink-50 hover:text-pink-700 transition-colors"
            >
              Explore Courses
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <ul className="space-y-5 lg:pl-4">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-4 text-[15px] text-slate-200 leading-relaxed">
                <span className="mt-2 w-2 h-2 rounded-full bg-pink-500 shrink-0 shadow-[0_0_12px_rgba(236,72,153,0.6)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
  );
};
