import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import { Calendar, Pencil, Trash2, X } from 'lucide-react';
import { API_URLS } from '../api';

type LiveClass = {
  id: number;
  name: string;
  url: string;
  recorded_class_link: string | null;
  class_date: string;
  end_time: string;
  end_date: string;
  timezone: string;
  is_active: boolean;
  plan_ids: number[];
};
type Plan = { id: number; name: string; is_active: boolean };
type ClassForm = Omit<LiveClass, 'id'>;

const blankForm = (): ClassForm => ({
  name: '', url: '', recorded_class_link: '', class_date: '', end_time: '', end_date: '',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC', is_active: true, plan_ids: [],
});
const toInputDate = (date: string) => {
  const value = new Date(date);
  const offset = value.getTimezoneOffset();
  return new Date(value.getTime() - offset * 60_000).toISOString().slice(0, 16);
};

export const AdminLiveClasses = () => {
  const [classes, setClasses] = useState<LiveClass[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [form, setForm] = useState<ClassForm>(blankForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const request = async (url: string, init?: RequestInit) => {
    const token = localStorage.getItem('futurework_token');
    if (!token) throw new Error('Please log in again.');
    const response = await fetch(url, {
      ...init,
      headers: { Authorization: `Bearer ${token}`, ...(init?.headers || {}) },
    });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.message || 'Request failed.');
    return result.data;
  };

  const load = async () => {
    try {
      setIsLoading(true); setError('');
      const [classData, planData] = await Promise.all([request(API_URLS.classes.list), fetch(API_URLS.plans.list).then((response) => response.json())]);
      setClasses(classData);
      if (planData.success) setPlans(planData.data.filter((plan: Plan) => plan.is_active));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load live classes.');
    } finally { setIsLoading(false); }
  };

  useEffect(() => { void load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const resetForm = () => { setForm(blankForm()); setEditingId(null); };
  const editClass = (item: LiveClass) => {
    setEditingId(item.id);
    setForm({ ...item, class_date: toInputDate(item.class_date), end_date: toInputDate(item.end_date), recorded_class_link: item.recorded_class_link || '', timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC' });
    setError(''); setSuccess('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const update = <K extends keyof ClassForm>(field: K, value: ClassForm[K]) => setForm((current) => ({ ...current, [field]: value }));
  const togglePlan = (planId: number) => update('plan_ids', form.plan_ids.includes(planId) ? form.plan_ids.filter((id) => id !== planId) : [...form.plan_ids, planId]);

  const save = async (event: FormEvent) => {
    event.preventDefault();
    if (!form.plan_ids.length) { setError('Select at least one plan.'); return; }
    try {
      setIsSaving(true); setError(''); setSuccess('');
      const payload = { ...form, end_time: form.end_date.slice(11, 16), class_date: new Date(form.class_date).toISOString(), end_date: new Date(form.end_date).toISOString() };
      await request(editingId ? API_URLS.classes.update(editingId) : API_URLS.classes.create, {
        method: editingId ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
      });
      setSuccess(editingId ? 'Live class updated.' : 'Live class created.');
      resetForm(); await load();
    } catch (saveError) { setError(saveError instanceof Error ? saveError.message : 'Unable to save live class.'); }
    finally { setIsSaving(false); }
  };

  const { upcomingClasses, pastClasses } = useMemo(() => {
    const now = Date.now();
    return {
      upcomingClasses: classes.filter((item) => new Date(item.end_date).getTime() >= now),
      pastClasses: classes.filter((item) => new Date(item.end_date).getTime() < now),
    };
  }, [classes]);
  const remove = async (item: LiveClass) => {
    if (!window.confirm(`Delete “${item.name}”? This cannot be undone.`)) return;
    try {
      setError(''); setSuccess('');
      await request(API_URLS.classes.remove(item.id), { method: 'DELETE' });
      setClasses((current) => current.filter((entry) => entry.id !== item.id));
      if (editingId === item.id) resetForm();
      setSuccess('Live class deleted.');
    } catch (deleteError) { setError(deleteError instanceof Error ? deleteError.message : 'Unable to delete live class.'); }
  };

  return <main className="min-h-screen bg-slate-50 pt-28 pb-24 px-4 sm:px-6"><div className="max-w-6xl mx-auto"><header className="mb-10"><p className="text-pink-600 font-black uppercase tracking-[0.2em] text-xs mb-3">Admin</p><h1 className="text-4xl font-black text-slate-900">Live Classes</h1><p className="mt-3 text-slate-500 font-medium">Create, update, and remove live-class sessions.</p></header>
    {error && <p role="alert" className="mb-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}
    {success && <p role="status" className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm font-medium text-emerald-700">{success}</p>}
    <form onSubmit={save} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm mb-10"><div className="flex items-center justify-between gap-4 mb-7"><h2 className="text-2xl font-black text-slate-900">{editingId ? 'Edit live class' : 'Create live class'}</h2>{editingId && <button type="button" onClick={resetForm} className="text-sm font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1"><X className="w-4 h-4" /> Cancel edit</button>}</div>
      <div className="grid md:grid-cols-2 gap-5"><Field label="Class name"><input required value={form.name} onChange={(e) => update('name', e.target.value)} className="input" /></Field><Field label="Live meeting URL"><input required type="url" value={form.url} onChange={(e) => update('url', e.target.value)} className="input" /></Field><Field label="Start date and time"><input required type="datetime-local" value={form.class_date} onChange={(e) => update('class_date', e.target.value)} className="input" /></Field><Field label="End date and time"><input required type="datetime-local" value={form.end_date} onChange={(e) => update('end_date', e.target.value)} className="input" /></Field><label className="flex items-end gap-3 pb-3 font-bold text-slate-700"><input type="checkbox" checked={form.is_active} onChange={(e) => update('is_active', e.target.checked)} className="w-4 h-4 accent-pink-600" /> Active and visible</label></div>
      <fieldset className="mt-6"><legend className="text-sm font-black text-slate-700 mb-3">Available to plans</legend><div className="flex flex-wrap gap-3">{plans.map((plan) => <label key={plan.id} className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 cursor-pointer"><input type="checkbox" checked={form.plan_ids.includes(plan.id)} onChange={() => togglePlan(plan.id)} className="accent-pink-600" />{plan.name}</label>)}{!plans.length && <span className="text-sm text-slate-500">No active plans found.</span>}</div></fieldset>
      <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end"><button disabled={isSaving} className="h-11 px-6 rounded-xl bg-slate-900 text-white font-bold disabled:opacity-60">{isSaving ? 'Saving...' : editingId ? 'Save changes' : 'Create class'}</button></div></form>
    <section className="space-y-10">{isLoading ? <p className="text-slate-500">Loading classes...</p> : <><ClassSection title="Upcoming classes" classes={upcomingClasses} onEdit={editClass} onDelete={remove} emptyMessage="No upcoming live classes." /><ClassSection title="Past classes" classes={pastClasses} onEdit={editClass} onDelete={remove} emptyMessage="No past live classes." /></>}</section>
  </div></main>;
};

const ClassSection = ({ title, classes, onEdit, onDelete, emptyMessage }: { title: string; classes: LiveClass[]; onEdit: (item: LiveClass) => void; onDelete: (item: LiveClass) => void; emptyMessage: string }) => <div><h2 className="text-2xl font-black text-slate-900 mb-5">{title} <span className="text-slate-400">({classes.length})</span></h2>{classes.length ? <div className="grid md:grid-cols-2 gap-5">{classes.map((item) => <article key={item.id} className="bg-white border border-slate-200 rounded-2xl p-6"><div className="flex justify-between gap-4"><div><span className={`text-xs font-black uppercase ${item.is_active ? 'text-emerald-600' : 'text-slate-400'}`}>{item.is_active ? 'Active' : 'Inactive'}</span><h3 className="text-xl font-black text-slate-900 mt-2">{item.name}</h3><p className="text-sm text-slate-500 mt-2 flex items-center gap-2"><Calendar className="w-4 h-4" />{new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short', timeZone: item.timezone }).format(new Date(item.class_date))}</p></div><div className="flex gap-2"><button onClick={() => onEdit(item)} aria-label={`Edit ${item.name}`} className="p-2 text-slate-500 hover:text-slate-900"><Pencil className="w-5 h-5" /></button><button onClick={() => void onDelete(item)} aria-label={`Delete ${item.name}`} className="p-2 text-red-500 hover:text-red-700"><Trash2 className="w-5 h-5" /></button></div></div></article>)}</div> : <p className="rounded-2xl border-2 border-dashed border-slate-200 py-10 text-center text-slate-500">{emptyMessage}</p>}</div>;
const Field = ({ label, children }: { label: string; children: React.ReactNode }) => <label className="block text-sm font-black text-slate-700">{label}<div className="mt-2 [&_.input]:w-full [&_.input]:h-11 [&_.input]:rounded-xl [&_.input]:border [&_.input]:border-slate-200 [&_.input]:bg-slate-50 [&_.input]:px-3 [&_.input]:font-medium [&_.input]:text-slate-900">{children}</div></label>;
