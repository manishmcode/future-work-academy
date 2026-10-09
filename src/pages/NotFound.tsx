import React from 'react';
import { ArrowLeft, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NotFound = () => (
  <section className="relative isolate flex min-h-[60vh] items-center justify-center overflow-hidden bg-slate-50 px-4 py-20 text-center sm:px-6">
    <div aria-hidden="true" className="absolute -left-28 top-10 h-72 w-72 rounded-full bg-pink-200/35 blur-3xl" />
    <div aria-hidden="true" className="absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl" />
    <div className="relative max-w-xl">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-100 text-pink-600 shadow-sm">
        <Compass className="h-8 w-8" aria-hidden="true" />
      </div>
      <p className="text-sm font-bold uppercase tracking-[0.24em] text-pink-600">Error 404</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">This page doesn’t exist.</h1>
      <p className="mx-auto mt-5 max-w-md text-base leading-7 text-slate-600">The link may be incorrect, or the page may have moved. Let’s get you back on track.</p>
      <Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/15 transition hover:bg-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-200">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to home
      </Link>
    </div>
  </section>
);
