import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { TechnologySection } from '../components/home/TechnologySection';
import { CoursesSection } from '../components/home/CoursesSection';
import { LiveTrainingSection } from '../components/home/LiveTrainingSection';
import { GrowthPlanSection } from '../components/home/GrowthPlanSection';

export const Home = () => {
  return (
    <main className="flex flex-col min-h-screen font-sans bg-[#FAF9F6] overflow-hidden relative">
      <div className="absolute inset-0 w-full h-full pointer-events-none bg-right-bottom bg-no-repeat fixed" style={{ backgroundImage: "url('/images/card-bg.png')", backgroundAttachment: 'fixed' }}></div>
      <HeroSection />
      <TechnologySection />
      <CoursesSection />
      <LiveTrainingSection />
      <GrowthPlanSection />
    </main>
  );
};

export default Home;