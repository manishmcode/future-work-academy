import React from 'react';
import { Search, Play, Clock, ArrowRight, Calendar, Users, Sparkles, Video, MapPin, Download, BookOpen, MonitorPlay } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LiveSchedule = () => {
  const upcomingClasses = [
    { title: 'Mastering AI-Driven Workflows', date: 'Oct 15', time: '02:00 PM IST', plans: 'Premium', instructor: 'Dr. Sarah Chen', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150', isNext: true },
    { title: 'Enterprise Architecture 101', date: 'Oct 18', time: '10:00 AM IST', plans: 'Premium, Standard', instructor: 'Michael Ross', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150', isNext: false },
    { title: 'Advanced Cloud Security', date: 'Oct 22', time: '04:30 PM IST', plans: 'Premium', instructor: 'Elena Rodriguez', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150', isNext: false },
    { title: 'Data Engineering Fundamentals', date: 'Oct 25', time: '11:00 AM IST', plans: 'Standard, Basic', instructor: 'David Kim', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150', isNext: false },
  ];

  const pastClasses = [
    { title: 'Launch Your Consulting Business', plans: 'Premium', dateStr: '30 Sept 2026', duration: '45:20', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600' },
    { title: 'Deep Dive: AI Prompting', plans: 'Standard', dateStr: '12 Sept 2026', duration: '52:10', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600' },
    { title: 'Portfolio Review Session', plans: 'Premium', dateStr: '11 Sept 2026', duration: '60:00', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600' },
    { title: 'Tech Career Masterclass', plans: 'Premium', dateStr: '9 Sept 2026', duration: '1:15:30', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=600' },
  ];

  return (
    <main className="min-h-screen font-sans bg-slate-50 overflow-hidden pb-24 text-slate-900 relative">
      <div className="absolute inset-0 w-full h-full  pointer-events-none bg-right-bottom bg-no-repeat fixed" style={{ backgroundImage: "url('/images/card-bg.png')", backgroundAttachment: 'fixed' }}></div>

      {/* Hero Section */}
      <section className="pt-28 pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
          <div className="max-w-2xl">
            {/* Spacing to replace removed badge */}
            <div className="h-[28px] mb-6"></div>
            <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-extrabold leading-[1.1] tracking-tight text-slate-900">
              Your Live <br className="hidden sm:block" />
              <span className="text-slate-400 font-medium">Class Schedule.</span>
            </h1>
          </div>
          
          <div className="w-full md:w-80 relative group">
            <input 
              type="text" 
              placeholder="Search topics or instructors..." 
              className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition-all text-slate-900 font-medium placeholder:text-slate-400"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
          </div>
        </div>

        {/* Modern Segmented Control */}
        <div className="mb-4">
          <div className="inline-flex items-center p-1 bg-slate-200/60 rounded-xl">
            <Link
              to="/library"
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 text-slate-500 hover:text-slate-700"
            >
              <BookOpen className="w-4 h-4" /> Course Library
            </Link>
            <Link
              to="/schedule"
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 bg-white text-slate-900 shadow-sm"
            >
              <MonitorPlay className="w-4 h-4" /> Live Classes
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Upcoming Classes Section */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              Upcoming Sessions <span className="px-2.5 py-1 bg-pink-100 text-pink-700 text-xs rounded-lg font-bold">{upcomingClasses.length}</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingClasses.map((cls, i) => (
              <div key={i} className="bg-white border border-slate-200/80 rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:shadow-pink-900/5 hover:border-pink-200 transition-all duration-300 group flex flex-col relative overflow-hidden">
                
                {/* Optional glow for next class */}
                {cls.isNext && <div className="absolute top-0 right-0 w-64 h-64 bg-pink-400/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-pink-400/10 transition-colors"></div>}

                <div className="flex items-start justify-between mb-6 relative z-10">
                  {/* Date Badge */}
                  <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-pink-50 group-hover:border-pink-100 transition-colors shadow-sm">
                    <span className="text-[10px] font-bold text-slate-500 group-hover:text-pink-600 uppercase tracking-widest">{cls.date.split(' ')[0]}</span>
                    <span className="text-xl font-black text-slate-900 group-hover:text-pink-700 leading-none mt-1">{cls.date.split(' ')[1]}</span>
                  </div>

                  {cls.isNext && (
                    <span className="bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-red-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> Next Up
                    </span>
                  )}
                </div>

                <div className="relative z-10 flex-1">
                  <h3 className="text-[20px] font-extrabold text-slate-900 mb-4 group-hover:text-pink-600 transition-colors leading-snug pr-4">{cls.title}</h3>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-8">
                    <div className="flex items-center gap-3">
                      <img src={cls.avatar} alt={cls.instructor} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Instructor</p>
                        <p className="text-[13px] font-semibold text-slate-700">{cls.instructor}</p>
                      </div>
                    </div>
                    
                    <div className="hidden sm:block w-px h-8 bg-slate-200"></div>

                    <div>
                      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">Schedule</p>
                      <p className="text-[13px] font-semibold text-slate-700 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-pink-500" /> {cls.time}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-slate-100 relative z-10">
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">{cls.plans} Plan</span>
                  
                  <Link to="/live-room" className={`px-6 py-2.5 rounded-xl font-bold text-[13px] transition-all flex items-center gap-2 shadow-sm ${cls.isNext ? 'bg-pink-600 text-white hover:bg-pink-700 hover:shadow-md hover:shadow-pink-600/20' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
                    {cls.isNext ? 'Join Session' : 'RSVP Now'} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Past Classes Box */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              Previous Sessions
            </h2>
            <Link to="/library" className="text-sm font-bold text-pink-600 hover:text-pink-700 flex items-center gap-1.5">
              View full library <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pastClasses.map((cls, i) => (
              <div key={i} className="bg-white border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 rounded-[20px] p-2.5 flex flex-col group transition-all duration-300">
                
                {/* Details */}
                <div className="flex-1 p-4 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-pink-600 bg-pink-50 px-2 py-1 rounded-md">{cls.plans}</span>
                    <span className="text-[10px] font-semibold text-slate-400">{cls.dateStr}</span>
                  </div>
                  
                  <h4 className="text-[15px] font-bold text-slate-900 group-hover:text-pink-600 transition-colors leading-snug mb-4 line-clamp-2">{cls.title}</h4>
                  
                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <Link to="/live-room" className="text-[12px] font-bold text-slate-500 group-hover:text-pink-600 transition-colors flex items-center justify-between w-full">
                      Watch Recording <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </section>
    </main>
  );
};
