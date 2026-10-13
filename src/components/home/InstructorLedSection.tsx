import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const highlights = [
  'Scheduled online teaching sessions with clear dates and times',
  'Direct instructor interaction during each live class',
  'Practical demonstrations and guided, step-by-step learning',
  'Time to ask questions and get answers in real time',
  'Your upcoming sessions available from your member account',
];

export const InstructorLedSection = () => (
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
              Instructor-Led Learning
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight mb-5">
              Join Scheduled Live AI Classes
            </h2>
            <p className="text-slate-300 text-[15px] leading-relaxed mb-8 max-w-lg">
              Learn directly from an instructor through scheduled online classes on Future Work Academy. Follow practical
              demonstrations, ask questions during the session, and get guidance that helps you apply AI and modern
              workflows with confidence.
            </p>
            <Link
              to="/pricing/"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-white text-slate-900 text-[13px] font-bold tracking-wide hover:bg-pink-50 hover:text-pink-700 transition-colors"
            >
              View Learning Plans
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
