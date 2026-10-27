import React, { useEffect, useRef, useState } from 'react';
import { Search, Play, BookOpen, Video, ArrowRight, MonitorPlay, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_URLS } from '../api';
import { authenticatedFetch } from '../utils/authenticatedFetch';
import { Loader } from '../components/Loader';

type LibraryCard = {
  title: string; image: string; link: string; category: string;
  plan_ids: number[]; duration_seconds: number | null;
};
type LibraryCategory = { title: string; item_count: number };
type LibraryPage = {
  items: LibraryCard[];
  pagination: { has_more: boolean };
};
const PAGE_SIZE = 10;

export const Library = () => {
  const [categories, setCategories] = useState<LibraryCategory[]>([]);
  // An empty category means ALL and omits the category filter from the API.
  const [activeCategory, setActiveCategory] = useState('');
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [cards, setCards] = useState<LibraryCard[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const nextPageRef = useRef<() => void>(() => {});

  useEffect(() => {
    const controller = new AbortController();
    const loadCategories = async () => {
      try {
        const response = await authenticatedFetch(API_URLS.library.categories, { signal: controller.signal });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message || 'Unable to load categories.');
        if (!controller.signal.aborted) setCategories(result.data);
      } catch (loadError) {
        if (!controller.signal.aborted) setCategoryError(loadError instanceof Error ? loadError.message : 'Unable to load categories.');
      }
    };
    void loadCategories();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => setQuery(search.trim()), 250);
    return () => window.clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    const controller = new AbortController();
    let page = 1;
    let inFlight = false;
    let more = true;
    setCards([]);
    setError('');
    setHasMore(false);
    setIsLoading(true);
    setIsLoadingMore(false);

    const loadNextPage = async () => {
      if (inFlight || !more || controller.signal.aborted) return;
      inFlight = true;
      const firstPage = page === 1;
      setError('');
      if (firstPage) setIsLoading(true);
      else setIsLoadingMore(true);
      try {
        const params = new URLSearchParams({ page: String(page), limit: String(PAGE_SIZE) });
        if (activeCategory) params.set('category', activeCategory);
        if (query) params.set('search', query);
        const response = await authenticatedFetch(`${API_URLS.library.items}?${params}`, { signal: controller.signal });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message || 'Unable to load the library.');
        if (controller.signal.aborted) return;
        const data = result.data as LibraryPage;
        setCards((previous) => firstPage ? data.items : [...previous, ...data.items]);
        more = data.pagination.has_more;
        setHasMore(more);
        page += 1;
      } catch (loadError) {
        if (!controller.signal.aborted) setError(loadError instanceof Error ? loadError.message : 'Unable to load the library.');
      } finally {
        inFlight = false;
        if (!controller.signal.aborted) {
          setIsLoading(false);
          setIsLoadingMore(false);
        }
      }
    };
    nextPageRef.current = () => { void loadNextPage(); };
    void loadNextPage();
    return () => controller.abort();
  }, [activeCategory, query]);

  useEffect(() => {
    if (!hasMore || isLoading || isLoadingMore || error || !loadMoreRef.current || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) nextPageRef.current();
    }, { rootMargin: '200px' });
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore, isLoading, isLoadingMore, error, cards.length]);

  const scrollCategories = (direction: 'left' | 'right') => categoryScrollRef.current?.scrollBy({
    left: direction === 'left' ? -360 : 360,
    behavior: 'smooth',
  });
  const displayedCards = cards;
  const tabs = [{ title: 'ALL', value: '' }, ...categories.map((category) => ({ title: category.title, value: category.title }))];

  return (
    <main className="min-h-screen font-sans bg-slate-50/50 overflow-hidden pb-24 text-slate-900 relative">
      <div className="absolute inset-0 w-full h-full pointer-events-none bg-right-bottom bg-no-repeat fixed" style={{ backgroundImage: "url('/images/card-bg.webp')", backgroundAttachment: 'fixed' }} />
      <section className="pt-20 pb-10 lg:pt-28 lg:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
          <div className="max-w-2xl"><div className="h-[28px] mb-6" /><h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-extrabold leading-[1.1] tracking-tight text-slate-900">Explore the <br className="hidden sm:block" /><span className="text-slate-400 font-medium">Course Library.</span></h1></div>
          <div className="w-full md:w-80 relative group"><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search lessons..." className="w-full bg-white border border-slate-200/80 shadow-sm rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition-all text-slate-900 font-medium placeholder:text-slate-400" /><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-pink-500 transition-colors" /></div>
        </div>
        <div className="mb-8"><div className="inline-flex items-center p-1 bg-slate-200/60 rounded-xl"><Link to="/library/" className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-white text-slate-900 shadow-sm"><BookOpen className="w-4 h-4" /> Course Library</Link><Link to="/schedule/" className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-slate-500 hover:text-slate-700"><MonitorPlay className="w-4 h-4" /> Live Classes</Link></div></div>
        {<div className="flex items-center gap-3 py-2"><button type="button" aria-label="Show previous courses" onClick={() => scrollCategories('left')} className="shrink-0 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-pink-600 hover:border-pink-200 hover:scale-105 transition-all"><ChevronLeft className="w-5 h-5" /></button><div ref={categoryScrollRef} className="flex-1 min-w-0 flex gap-3 overflow-x-auto scroll-smooth py-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>{tabs.map((tab) => <button type="button" aria-pressed={activeCategory === tab.value} key={tab.value} onClick={() => setActiveCategory(tab.value)} className={`shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${activeCategory === tab.value ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-600 hover:text-pink-600 hover:border-pink-200 hover:bg-pink-50/40 border-slate-200 shadow-sm'}`}>{tab.title}</button>)}</div><button type="button" aria-label="Show more courses" onClick={() => scrollCategories('right')} className="shrink-0 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-pink-600 hover:border-pink-200 hover:scale-105 transition-all"><ChevronRight className="w-5 h-5" /></button></div>}
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {categoryError && <p role="alert" className="mb-4 text-sm text-red-700">{categoryError}</p>}
        {isLoading ? <Loader label="Loading your library..." /> : !displayedCards.length && error ? <PageMessage message={error} error /> : displayedCards.length ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{displayedCards.map((card) => <Link to={card.link} target="_blank" rel="noopener noreferrer" key={card.link} className="bg-white border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 rounded-[24px] p-3 flex flex-col group transition-all duration-300"><div className="relative w-full aspect-video rounded-[16px] overflow-hidden mb-4 bg-slate-100">{card.image ? <img src={card.image} alt={card.title} loading="lazy" className="w-full h-full object-contain object-center" /> : <Video className="absolute inset-0 m-auto w-10 h-10 text-slate-300" />}<div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/20 transition-colors" /><div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg text-pink-600"><Play className="w-5 h-5 ml-1" fill="currentColor" /></div></div></div><div className="flex-1 flex flex-col px-3 pb-2"><div className="flex items-center gap-2 text-pink-600 text-xs font-bold uppercase tracking-wider mb-2"><Video className="w-3.5 h-3.5" /> {card.category}</div><h3 className="font-bold text-slate-900 text-lg leading-snug mb-4 group-hover:text-pink-600 transition-colors line-clamp-2">{card.title}</h3><div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100"><span className="text-sm font-semibold text-slate-500 group-hover:text-slate-900">Start Lesson</span><div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-pink-500 group-hover:text-white"><ArrowRight className="w-4 h-4" /></div></div></div></Link>)}</div> : <PageMessage message={query ? 'No lessons match your search.' : 'No library content is available yet.'} />}
        {!isLoading && error && <div role="alert" className="py-6 text-center">
          {cards.length > 0 && <p className="mb-3 text-sm text-red-700">{error}</p>}
          <button type="button" onClick={() => nextPageRef.current()} className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold">Try again</button>
        </div>}
        <div ref={loadMoreRef} className="min-h-px" />
        {isLoadingMore && <div role="status" className="py-8"><Loader label="Loading more lessons..." /></div>}
        {hasMore && !isLoading && !isLoadingMore && !error && <div className="py-8 text-center">
          <button type="button" onClick={() => nextPageRef.current()} className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold">Load more lessons</button>
        </div>}
      </section>
    </main>
  );
};

const PageMessage = ({ message, error = false }: { message: string; error?: boolean }) => <div className={`py-20 text-center border-2 border-dashed rounded-[24px] ${error ? 'border-red-200 text-red-700 bg-red-50/50' : 'border-slate-200 text-slate-500'}`}><BookOpen className="w-12 h-12 mx-auto mb-4 text-slate-300" /><p className="font-medium">{message}</p></div>;
