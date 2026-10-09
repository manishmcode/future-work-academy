import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search, Play, BookOpen, Video, ArrowRight, MonitorPlay, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_URLS } from '../api';
import { Loader } from '../components/Loader';

type LibraryCard = { title: string; image: string; link: string; plan_ids: number[] };
type LibraryCourse = { title: string; cards: LibraryCard[] };

export const Library = () => {
  const [courses, setCourses] = useState<LibraryCourse[]>([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadLibrary = async () => {
      try {
        const response = await fetch(API_URLS.library.list);
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message || 'Unable to load the library.');
        const data = result.data as LibraryCourse[];
        setCourses(data);
        setActiveCategory(data[0]?.title || '');
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load the library.');
      } finally {
        setIsLoading(false);
      }
    };
    void loadLibrary();
  }, []);

  const scrollCategories = (direction: 'left' | 'right') => categoryScrollRef.current?.scrollBy({
    left: direction === 'left' ? -360 : 360,
    behavior: 'smooth',
  });
  const activeCourse = courses.find((course) => course.title === activeCategory);
  const displayedCards = useMemo(() => (activeCourse?.cards || []).filter((card) =>
    card.title.toLowerCase().includes(search.trim().toLowerCase()),
  ), [activeCourse, search]);


  return (
    <main className="min-h-screen font-sans bg-slate-50/50 overflow-hidden pb-24 text-slate-900 relative">
      <div className="absolute inset-0 w-full h-full pointer-events-none bg-right-bottom bg-no-repeat fixed" style={{ backgroundImage: "url('/images/card-bg.webp')", backgroundAttachment: 'fixed' }} />
      <section className="pt-20 pb-10 lg:pt-28 lg:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
          <div className="max-w-2xl"><div className="h-[28px] mb-6" /><h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-extrabold leading-[1.1] tracking-tight text-slate-900">Explore the <br className="hidden sm:block" /><span className="text-slate-400 font-medium">Course Library.</span></h1></div>
          <div className="w-full md:w-80 relative group"><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search lessons..." className="w-full bg-white border border-slate-200/80 shadow-sm rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition-all text-slate-900 font-medium placeholder:text-slate-400" /><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-pink-500 transition-colors" /></div>
        </div>
        <div className="mb-8"><div className="inline-flex items-center p-1 bg-slate-200/60 rounded-xl"><Link to="/library" className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-white text-slate-900 shadow-sm"><BookOpen className="w-4 h-4" /> Course Library</Link><Link to="/schedule" className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-slate-500 hover:text-slate-700"><MonitorPlay className="w-4 h-4" /> Live Classes</Link></div></div>
        {!isLoading && courses.length > 0 && <div className="flex items-center gap-3 py-2"><button type="button" aria-label="Show previous courses" onClick={() => scrollCategories('left')} className="shrink-0 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-pink-600 hover:border-pink-200 hover:scale-105 transition-all"><ChevronLeft className="w-5 h-5" /></button><div ref={categoryScrollRef} className="flex-1 min-w-0 flex gap-3 overflow-x-auto scroll-smooth py-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>{courses.map((course) => <button key={course.title} onClick={() => setActiveCategory(course.title)} className={`shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${activeCategory === course.title ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-600 hover:text-pink-600 hover:border-pink-200 hover:bg-pink-50/40 border-slate-200 shadow-sm'}`}>{course.title}</button>)}</div><button type="button" aria-label="Show more courses" onClick={() => scrollCategories('right')} className="shrink-0 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-pink-600 hover:border-pink-200 hover:scale-105 transition-all"><ChevronRight className="w-5 h-5" /></button></div>}
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {isLoading ? <Loader label="Loading your library..." /> : error ? <PageMessage message={error} error /> : displayedCards.length ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{displayedCards.map((card) => <Link to={card.link} target="_blank" rel="noopener noreferrer" key={card.link} className="bg-white border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 rounded-[24px] p-3 flex flex-col group transition-all duration-300"><div className="relative w-full aspect-[16/10] rounded-[16px] overflow-hidden mb-4 bg-slate-100">{card.image ? <img src={card.image} alt={card.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /> : <Video className="absolute inset-0 m-auto w-10 h-10 text-slate-300" />}<div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/20 transition-colors" /><div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg text-pink-600"><Play className="w-5 h-5 ml-1" fill="currentColor" /></div></div></div><div className="flex-1 flex flex-col px-3 pb-2"><div className="flex items-center gap-2 text-pink-600 text-xs font-bold uppercase tracking-wider mb-2"><Video className="w-3.5 h-3.5" /> {activeCourse?.title}</div><h3 className="font-bold text-slate-900 text-lg leading-snug mb-4 group-hover:text-pink-600 transition-colors line-clamp-2">{card.title}</h3><div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100"><span className="text-sm font-semibold text-slate-500 group-hover:text-slate-900">Start Lesson</span><div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-pink-500 group-hover:text-white"><ArrowRight className="w-4 h-4" /></div></div></div></Link>)}</div> : <PageMessage message={courses.length ? 'No lessons match your search.' : 'No library content is available yet.'} />}
      </section>
    </main>
  );
};

const PageMessage = ({ message, error = false }: { message: string; error?: boolean }) => <div className={`py-20 text-center border-2 border-dashed rounded-[24px] ${error ? 'border-red-200 text-red-700 bg-red-50/50' : 'border-slate-200 text-slate-500'}`}><BookOpen className="w-12 h-12 mx-auto mb-4 text-slate-300" /><p className="font-medium">{message}</p></div>;
