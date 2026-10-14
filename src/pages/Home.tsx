import React from 'react';
import {
  CoursesSection,
  GrowthPlanSection,
  HeroSection,
  InstructorLedSection,
  TechnologySection,
} from '../components/home';

export const Home = () => {
  return (
    <main className="flex flex-col min-h-screen font-sans bg-[#FAF9F6] overflow-hidden relative">
      <div className="absolute inset-0 w-full h-full pointer-events-none bg-right-bottom bg-no-repeat fixed" style={{ backgroundImage: "url('/images/card-bg.webp')", backgroundAttachment: 'fixed' }}></div>
      <HeroSection />
      <TechnologySection />
      <CoursesSection />
      <InstructorLedSection />
      <GrowthPlanSection />
    </main>
  );
};

export default Home;
