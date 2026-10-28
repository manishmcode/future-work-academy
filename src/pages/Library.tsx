import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Search, Play, BookOpen, Video, ArrowRight, ChevronRight, LibraryBig, Layers3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_URLS } from '../api';
import { authenticatedFetch } from '../utils/authenticatedFetch';
import { Loader } from '../components/Loader';
import { LearningResourceTabs } from '../components/LearningResourceTabs';

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
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const nextPageRef = useRef<() => void>(() => {});
  const collectionRef = useRef<HTMLElement>(null);

  const scrollToCollection = useCallback(() => {
    collectionRef.current?.scrollIntoView({
      block: 'start',
      behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ? 'auto' : 'smooth',
    });
  }, []);

  const selectCategory = (category: string) => {
    scrollToCollection();
    setActiveCategory(category);
  };

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

  const totalLessons = categories.reduce((total, category) => total + category.item_count, 0);
  const selectedCollection = categories.find((category) => category.title === activeCategory);
  const collectionTitle = activeCategory || 'All lessons';
  const collectionCount = activeCategory ? selectedCollection?.item_count : totalLessons;
  const tabs = [
    { title: 'All lessons', value: '', count: totalLessons },
    ...categories.map((category) => ({ title: category.title, value: category.title, count: category.item_count })),
  ];

  return (
    <main className="relative min-h-screen bg-slate-50/50 pb-24 font-sans text-slate-900">
      <div
        className="pointer-events-none absolute inset-0 bg-right-bottom bg-no-repeat opacity-60"
        style={{ backgroundImage: "url('/images/card-bg.webp')" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1440px] px-4 pt-28 sm:px-6 lg:px-8 lg:pt-36">
        <header className="mb-8 lg:mb-10">
          <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            <BookOpen className="h-4 w-4 text-pink-600" aria-hidden="true" />
            Your learning space
          </div>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-xl">
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                The course <span className="font-medium text-slate-400">library.</span>
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-500 sm:text-base">
                Make room for your next skill. Explore practical lessons and learn at your own pace.
              </p>
            </div>
            <div className="w-full lg:max-w-sm">
              <label htmlFor="library-search" className="mb-2 block text-xs font-semibold text-slate-500">Find your next lesson</label>
              <div className="group relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-600" aria-hidden="true" />
                <input
                  id="library-search"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search lessons..."
                  maxLength={200}
                  className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>
          <LearningResourceTabs />
        </header>

        <div className="grid items-start gap-8 lg:grid-cols-[240px_minmax(0,1fr)] xl:gap-10">
          <aside className="min-w-0 lg:sticky lg:top-28" aria-label="Library collections">
            <div className="hidden overflow-hidden rounded-2xl border border-slate-200/80 bg-white lg:block">
              <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-5">
                <Layers3 className="h-4 w-4 text-pink-600" aria-hidden="true" />
                <h2 className="text-sm font-bold text-slate-900">Browse collections</h2>
              </div>
              <nav aria-label="Collections" className="space-y-1 p-2">
                {tabs.map((tab) => (
                  <button
                    type="button"
                    key={tab.value}
                    aria-label={tab.value || 'ALL'}
                    aria-pressed={activeCategory === tab.value}
                    onClick={() => selectCategory(tab.value)}
                    className={`group flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 ${
                      activeCategory === tab.value
                        ? 'bg-slate-900 font-semibold text-white'
                        : 'font-medium text-slate-500 hover:bg-pink-50/60 hover:text-slate-900'
                    }`}
                  >
                    {!tab.value && <LibraryBig className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />}
                    <span className="min-w-0 flex-1 break-words leading-relaxed">{tab.title}</span>
                    <span className={`mt-0.5 min-w-[24px] rounded-md px-1.5 py-0.5 text-center text-[10px] ${activeCategory === tab.value ? 'bg-white/10 text-slate-200' : 'bg-slate-100 text-slate-400'}`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
            <div className="lg:hidden">
              <label htmlFor="library-collection" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">Browse collections</label>
              <select
                id="library-collection"
                value={activeCategory}
                onChange={(event) => selectCategory(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/10"
              >
                {tabs.map((tab) => <option key={tab.value} value={tab.value}>{tab.value ? tab.title : 'ALL - All lessons'}{tab.count ? ` (${tab.count})` : ''}</option>)}
              </select>
            </div>
          </aside>

          <section ref={collectionRef} className="min-w-0 scroll-mt-28" aria-labelledby="library-collection-heading">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-slate-400">
                  <span>Library</span><ChevronRight className="h-3 w-3" aria-hidden="true" /><span>{activeCategory ? 'Collection' : 'Explore'}</span>
                </div>
                <h2 id="library-collection-heading" className="break-words text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{collectionTitle}</h2>
                <p className="mt-2 text-sm text-slate-500">
                  {query ? <>Search results for <span className="font-semibold text-slate-700">&ldquo;{query}&rdquo;</span></> : activeCategory ? 'Explore the lessons in this collection.' : 'A new perspective is only a lesson away.'}
                </p>
              </div>
              {!query && collectionCount != null && collectionCount > 0 && (
                <span className="mt-6 shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-500">{collectionCount} {collectionCount === 1 ? 'lesson' : 'lessons'}</span>
              )}
            </div>

            {categoryError && <p role="alert" className="mb-4 text-sm text-red-700">{categoryError}</p>}
            {isLoading ? <Loader label="Loading your library..." /> : !cards.length && error ? (
              <PageMessage message={error} error />
            ) : cards.length ? (
              <div className="grid gap-x-5 gap-y-7 sm:grid-cols-2 xl:grid-cols-3">
                {cards.map((card) => (
                  <Link
                    to={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={card.link}
                    className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:border-pink-200 hover:shadow-lg hover:shadow-slate-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-4"
                  >
                    <div className="relative aspect-video w-full overflow-hidden border-b border-slate-100 bg-slate-100">
                      {card.image ? (
                        <img src={card.image} alt={card.title} loading="lazy" className="h-full w-full object-contain object-center" />
                      ) : (
                        <Video className="absolute inset-0 m-auto h-10 w-10 text-slate-300" aria-hidden="true" />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-900/0 transition group-hover:bg-slate-900/10 group-focus-visible:bg-slate-900/10">
                        <span className="grid h-11 w-11 place-items-center rounded-full bg-white/95 text-pink-600 opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-visible:opacity-100">
                          <Play className="ml-0.5 h-4 w-4" fill="currentColor" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="mb-2 line-clamp-2 text-[11px] font-semibold uppercase leading-relaxed tracking-wider text-pink-600">{card.category}</p>
                      <h3 className="mb-5 text-base font-bold leading-relaxed text-slate-900 transition group-hover:text-pink-600">{card.title}</h3>
                      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400"><Video className="h-3.5 w-3.5" aria-hidden="true" /> Video lesson</span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 transition group-hover:text-pink-600">Watch lesson <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : <PageMessage message={query ? 'No lessons match your search.' : 'No library content is available yet.'} />}
            {!isLoading && error && <div role="alert" className="py-6 text-center">
              {cards.length > 0 && <p className="mb-3 text-sm text-red-700">{error}</p>}
              <button type="button" onClick={() => nextPageRef.current()} className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold">Try again</button>
            </div>}
            <div ref={loadMoreRef} className="min-h-px" />
            {isLoadingMore && <div className="py-8 text-center"><Loader variant="inline" label="Loading more lessons..." /></div>}
            {hasMore && !isLoading && !isLoadingMore && !error && <div className="mt-10 flex justify-center border-t border-slate-200/70 pt-7">
              <button type="button" onClick={() => nextPageRef.current()} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-pink-200 hover:text-pink-600">Load more lessons <ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
            </div>}
          </section>
        </div>
      </div>
    </main>
  );
};

const PageMessage = ({ message, error = false }: { message: string; error?: boolean }) => (
  <div className={`rounded-2xl border bg-white px-6 py-20 text-center ${error ? 'border-red-200 text-red-700' : 'border-slate-200 text-slate-500'}`}>
    <BookOpen className="mx-auto mb-4 h-10 w-10 text-slate-300" aria-hidden="true" />
    <p className="text-sm font-medium">{message}</p>
  </div>
);
