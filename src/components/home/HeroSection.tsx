import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const HeroSection = () => {
  const { hasLibraryAccess } = useAuth();
  const courseDestination = hasLibraryAccess ? '/library/' : '/pricing/';

  return (
    <section className="pt-28 pb-14 sm:pb-20 lg:pt-32 lg:pb-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid lg:grid-cols-[1.12fr_0.88fr] gap-8 lg:gap-10 items-end mb-10 sm:mb-14 lg:mb-16">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-[68px] font-semibold leading-[1.05] tracking-tight text-slate-900 max-w-4xl">
              Learn Smarter with AI, Productivity & Live Classes
            </h1>
          </div>

          <div className="lg:pt-14">
            <p className="text-[16px] sm:text-[17px] leading-relaxed text-slate-600 font-medium mb-7 max-w-xl lg:max-w-md">
              Explore practical video courses and instructor-led live classes designed to help you develop new skills, improve productivity, and learn from guided online sessions.
            </p>
            <Link
              to={courseDestination}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-12 px-7 rounded-xl bg-slate-900 text-white text-[13px] font-bold tracking-wide hover:bg-pink-600 transition-colors"
            >
              Explore Courses
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-5 lg:gap-6">
          <div className="lg:col-span-2 bg-[#F8F7F4] rounded-[1.5rem] sm:rounded-[2rem] aspect-[16/10] lg:aspect-auto lg:h-[450px] relative overflow-hidden shadow-sm border border-slate-200 group">
            <img
              src="/images/futurework-learning-hero-800.webp"
              srcSet="/images/futurework-learning-hero-480.webp 480w, /images/futurework-learning-hero-800.webp 800w, /images/futurework-learning-hero-1200.webp 1200w"
              sizes="(min-width: 1280px) 805px, (min-width: 1024px) 64vw, calc(100vw - 32px)"
              width={800}
              height={420}
              fetchPriority="high"
              decoding="async"
              alt="FutureWorkAcademy AI productivity and live class dashboard"
              className="absolute inset-0 w-full h-full object-cover rounded-[1.5rem] sm:rounded-[2rem]"
            />
          </div>

          <Link to={courseDestination} className="lg:col-span-1 block group">
            <div className="bg-[#0F0F0F] rounded-[1.5rem] sm:rounded-3xl p-6 sm:p-8 min-h-[260px] sm:min-h-[320px] lg:h-[450px] relative overflow-hidden text-white flex flex-col justify-end cursor-pointer border border-black/10">
              <div className="absolute top-5 right-5 sm:top-6 sm:right-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 z-20">
                <ArrowRight className="w-7 h-7 sm:w-8 sm:h-8 -rotate-45" />
              </div>

              <div className="absolute inset-0 w-full h-full">
                <img
                  src="/images/collaborative-learning-700.webp"
                  srcSet="/images/collaborative-learning-400.webp 400w, /images/collaborative-learning-700.webp 700w, /images/collaborative-learning-1000.webp 1000w"
                  sizes="(min-width: 1280px) 395px, (min-width: 1024px) 32vw, calc(100vw - 32px)"
                  width={700}
                  height={467}
                  decoding="async"
                  alt="Collaborative Learning"
                  className="w-full h-full object-cover opacity-60"
                />
              </div>

              <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#0F0F0F] to-transparent z-10"></div>

              <div className="relative z-20 mt-auto">
                <p className="text-[24px] sm:text-[26px] font-medium leading-[1.2] tracking-tight text-white/90">Practical skills<br />for everyday<br />work</p>
                <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold hover:bg-white/20 transition-colors">
                  Explore Courses
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
