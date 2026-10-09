import React from 'react';
import { LoaderCircle } from 'lucide-react';

type LoaderProps = {
  label?: string;
  variant?: 'page' | 'section' | 'inline';
  className?: string;
};

export const Loader = ({ label = 'Loading...', variant = 'section', className = '' }: LoaderProps) => {
  if (variant === 'inline') {
    return (
      <span className={`inline-flex items-center justify-center gap-2 ${className}`}>
        <LoaderCircle className="h-4 w-4 animate-spin" />
        <span>{label}</span>
      </span>
    );
  }

  const isPage = variant === 'page';

  return (
    <div className={`${isPage ? 'min-h-screen' : 'min-h-[220px]'} flex items-center justify-center px-4 ${className}`}>
      <div role="status" aria-live="polite" className="flex flex-col items-center gap-4 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-2xl border border-pink-100 bg-white shadow-xl shadow-pink-900/5">
          <LoaderCircle className="h-7 w-7 animate-spin text-pink-600" />
        </div>
        <p className="text-sm font-bold text-slate-500">{label}</p>
      </div>
    </div>
  );
};
