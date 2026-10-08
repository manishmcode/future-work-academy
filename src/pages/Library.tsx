import React, { useState, useRef } from 'react';
import { Search, Play, BookOpen, Video, Sparkles, Clock, ArrowRight, MonitorPlay, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Library = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const scrollRef = useRef<HTMLDivElement>(null);

  const categories = [
    { name: 'All Courses', id: 'All' },
    { name: 'Productivity & AI', id: 'Productivity' },
    { name: 'Business & Freelance', id: 'Business' },
    { name: 'Marketing & Events', id: 'Marketing' },
  ];

  const allVideos = [
    { title: 'AI for Productivity Video Upgrade', duration: '45:20', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600', module: 'Course', categoryId: 'Productivity', url: 'https://www.idplr.com/ai-for-productivity-video-upgrade' },
    { title: 'Work From Home Productivity Video Upgrade', duration: '52:10', image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=600', module: 'Course', categoryId: 'Productivity', url: 'https://www.idplr.com/89-videos/work-from-home-productivity-video-upgrade' },
    { title: 'Virtual Summit Secrets Video Upgrade', duration: '1:15:30', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600', module: 'Course', categoryId: 'Marketing', url: 'https://www.idplr.com/89-videos/virtual-summit-secrets-video-upgrade' },
    { title: 'Solopreneur Success Video Upgrade', duration: '35:10', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600', module: 'Course', categoryId: 'Business', url: 'https://www.idplr.com/89-videos/solopreneur-success-video-upgrade' },
    { title: 'How To Start a Freelance Business Video Upgrade', duration: '42:15', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600', module: 'Course', categoryId: 'Business', url: 'https://www.idplr.com/89-videos/how-to-start-a-freelance-business-video-upgrade' },
    { title: 'Simple Productivity Video Course', duration: '28:40', image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=600', module: 'Course', categoryId: 'Productivity', url: 'https://www.idplr.com/89-videos/simple-productivity-video-course' },
  ];

  const displayedVideos = activeCategory === 'All' 
    ? allVideos 
    : allVideos.filter(vid => vid.categoryId === activeCategory);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="min-h-screen font-sans bg-slate-50/50 overflow-hidden pb-24 text-slate-900 relative">
      <div className="absolute inset-0 w-full h-full pointer-events-none bg-right-bottom bg-no-repeat fixed" style={{ backgroundImage: "url('/images/card-bg.png')", backgroundAttachment: 'fixed' }}></div>
      
      {/* Header Section */}
      <section className="pt-20 pb-10 lg:pt-28 lg:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20">
        
        {/* Badge & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
          <div className="max-w-2xl">
            {/* Spacing to replace removed badge */}
            <div className="h-[28px] mb-6"></div>
            <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-extrabold leading-[1.1] tracking-tight text-slate-900">
              Explore the <br className="hidden sm:block" />
              <span className="text-slate-400 font-medium">Course Library.</span>
            </h1>
          </div>
          
          {/* Search Bar */}
          <div className="w-full md:w-80 relative group">
            <input 
              type="text" 
              placeholder="Search topics..." 
              className="w-full bg-white border border-slate-200/80 shadow-sm rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition-all text-slate-900 font-medium placeholder:text-slate-400"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
          </div>
        </div>

        {/* Modern Segmented Control */}
        <div className="mb-8">
          <div className="inline-flex items-center p-1 bg-slate-200/60 rounded-xl">
            <Link
              to="/library"
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 bg-white text-slate-900 shadow-sm"
            >
              <BookOpen className="w-4 h-4" /> Course Library
            </Link>
            <Link
              to="/schedule"
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 text-slate-500 hover:text-slate-700"
            >
              <MonitorPlay className="w-4 h-4" /> Live Classes
            </Link>
          </div>
        </div>
        
        {/* Categories Horizontal Scroll */}
        <div className="relative flex items-center group/tabs">
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 z-10 w-9 h-9 -ml-4 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-pink-600 transition-all opacity-0 group-hover/tabs:opacity-100 hidden md:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide w-full snap-x pt-1" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 snap-start border ${
                  activeCategory === cat.id 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                    : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200/80 shadow-sm hover:border-slate-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 z-10 w-9 h-9 -mr-4 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-pink-600 transition-all opacity-0 group-hover/tabs:opacity-100 hidden md:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedVideos.length > 0 ? (
            displayedVideos.map((vid, idx) => (
              <a 
                href={vid.url}
                target="_blank"
                rel="noopener noreferrer"
                key={idx} 
                className="bg-white border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 rounded-[24px] p-3 flex flex-col group transition-all duration-300 cursor-pointer"
              >
                {/* Image Container with inner radius */}
                <div className="relative w-full aspect-[16/10] rounded-[16px] overflow-hidden mb-4">
                  <img 
                    src={vid.image} 
                    alt={vid.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/20 transition-colors duration-300" />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg text-pink-600 transform scale-90 group-hover:scale-100 transition-all duration-300">
                      <Play className="w-5 h-5 ml-1" fill="currentColor" />
                    </div>
                  </div>

                  {/* Floating Duration Tag */}
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-pink-500" /> {vid.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col px-3 pb-2">
                  <div className="flex items-center gap-2 text-pink-600 text-xs font-bold uppercase tracking-wider mb-2">
                    <Video className="w-3.5 h-3.5" /> {vid.module}
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg leading-snug mb-4 group-hover:text-pink-600 transition-colors line-clamp-2">
                    {vid.title}
                  </h3>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                    <span className="text-sm font-semibold text-slate-500 group-hover:text-slate-900 transition-colors">
                      Start Lesson
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-pink-500 group-hover:text-white transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </a>
            ))
          ) : (
            <div className="col-span-full py-20 text-center flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-[24px]">
               <BookOpen className="w-12 h-12 text-slate-300 mb-4" />
               <h3 className="text-xl font-bold text-slate-700 mb-2">More Content Coming Soon</h3>
               <p className="text-slate-500 max-w-sm">We are currently recording new modules for this category. Check back later!</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};