import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BookOpen, Calendar, Clock, MonitorPlay } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_BASE_URL, API_URLS } from '../api';

type LiveClass = { id: number; name: string; class_date: string; end_date: string; timezone: string; is_active: boolean };

const formatDate = (value: string) => new Intl.DateTimeFormat(undefined, { timeZone: 'UTC', day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value));
const formatTimeGmt = (value: string) => `${new Intl.DateTimeFormat(undefined, { timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(value))} GMT`;

export const LiveSchedule = () => {
  const [classes, setClasses] = useState<LiveClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [joiningId, setJoiningId] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(() => Date.now());

  useEffect(() => {
    const loadClasses = async () => {
      const token = localStorage.getItem('futurework_token');
      if (!token) { setError('Please log in to view live classes.'); setIsLoading(false); return; }
      try {
        const response = await fetch(API_URLS.classes.list, { headers: { Authorization: `Bearer ${token}` } });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message || 'Unable to load live classes.');
        setClasses(result.data);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load live classes.');
      } finally { setIsLoading(false); }
    };
    void loadClasses();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(Date.now()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const { upcoming, previous } = useMemo(() => {
    const now = currentTime;
    return { upcoming: classes.filter((item) => new Date(item.end_date).getTime() >= now), previous: classes.filter((item) => new Date(item.end_date).getTime() < now) };
  }, [classes, currentTime]);

  const joinClass = async (id: number) => {
    const token = localStorage.getItem('futurework_token');
    if (!token) return;
    try {
      setJoiningId(id); setError('');
      const response = await fetch(API_URLS.classes.join(id), { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
      const result = await response.json();
      if (!response.ok || !result.success || !result.data?.join_path) throw new Error(result.message || 'Unable to join this class.');
      window.location.assign(`${API_BASE_URL}${result.data.join_path}`);
    } catch (joinError) {
      setError(joinError instanceof Error ? joinError.message : 'Unable to join this class.');
    } finally { setJoiningId(null); }
  };

  return <main className="min-h-screen font-sans bg-slate-50 overflow-hidden pb-24 text-slate-900 relative"><div className="absolute inset-0 w-full h-full pointer-events-none bg-right-bottom bg-no-repeat fixed" style={{ backgroundImage: "url('/images/card-bg.png')", backgroundAttachment: 'fixed' }} /><section className="pt-28 pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20"><div className="max-w-2xl mb-10"><div className="h-[28px] mb-6" /><h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-extrabold leading-[1.1] tracking-tight text-slate-900">Your Live <br className="hidden sm:block" /><span className="text-slate-400 font-medium">Class Schedule.</span></h1></div><div className="inline-flex items-center p-1 bg-slate-200/60 rounded-xl"><Link to="/library" className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-slate-500 hover:text-slate-700"><BookOpen className="w-4 h-4" /> Course Library</Link><Link to="/schedule" className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-white text-slate-900 shadow-sm"><MonitorPlay className="w-4 h-4" /> Live Classes</Link></div></section><section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">{error && <p className="mb-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}{isLoading ? <ScheduleMessage message="Loading live classes..." /> : <><section className="mb-20"><h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3 mb-8">Upcoming Sessions <span className="px-2.5 py-1 bg-pink-100 text-pink-700 text-xs rounded-lg font-bold">{upcoming.length}</span></h2>{upcoming.length ? <div className="grid md:grid-cols-2 gap-6">{upcoming.map((item) => <ClassCard key={item.id} item={item} onJoin={joinClass} joining={joiningId === item.id} canJoin={new Date(item.class_date).getTime() <= currentTime && currentTime <= new Date(item.end_date).getTime()} />)}</div> : <ScheduleMessage message="No upcoming live classes." />}</section><section><div className="flex items-center justify-between mb-8"><h2 className="text-2xl font-bold text-slate-900 tracking-tight">Previous Sessions</h2><Link to="/library" className="text-sm font-bold text-pink-600 hover:text-pink-700 flex items-center gap-1.5">View full library <ArrowRight className="w-4 h-4" /></Link></div>{previous.length ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{previous.map((item) => <article key={item.id} className="bg-white border border-slate-200/60 shadow-sm rounded-[20px] p-6 flex flex-col"><h3 className="text-[17px] font-bold text-slate-900 leading-snug mt-4 mb-2">{item.name}</h3><p className="text-xs text-slate-500 mb-5">{formatTimeGmt(item.class_date)}</p></article>)}</div> : <ScheduleMessage message="No previous sessions." />}</section></>}</section></main>;
};

const ClassCard = ({ item, onJoin, joining, canJoin }: { item: LiveClass; onJoin: (id: number) => void; joining: boolean; canJoin: boolean }) => <article className="bg-white border border-slate-200/80 rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:shadow-pink-900/5 hover:border-pink-200 transition-all flex flex-col"><div className="flex items-start justify-between mb-6"><div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center"><Calendar className="w-6 h-6 text-pink-600" /></div><span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-pink-50 text-pink-600">Live class</span></div><h3 className="text-[20px] font-extrabold text-slate-900 mb-4 leading-snug">{item.name}</h3><div className="space-y-2 text-[13px] font-semibold text-slate-700 mb-8"><p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-pink-500" /> {formatDate(item.class_date)}</p><p className="flex items-center gap-2"><Clock className="w-4 h-4 text-pink-500" /> Start: {formatTimeGmt(item.class_date)}</p><p className="flex items-center gap-2"><Clock className="w-4 h-4 text-pink-500" /> End: {formatTimeGmt(item.end_date)}</p></div><div className="flex justify-end pt-5 border-t border-slate-100 mt-auto">{canJoin ? <button onClick={() => onJoin(item.id)} disabled={joining} className="px-6 py-2.5 rounded-xl font-bold text-[13px] bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-60">{joining ? 'Joining...' : 'Join Session'}</button> : <p className="text-xs font-semibold text-slate-500">Join available when the class starts.</p>}</div></article>;

const ScheduleMessage = ({ message }: { message: string }) => <div className="py-14 text-center border-2 border-dashed border-slate-200 rounded-[24px] text-slate-500"><Calendar className="w-10 h-10 mx-auto mb-3 text-slate-300" /><p className="font-medium">{message}</p></div>;