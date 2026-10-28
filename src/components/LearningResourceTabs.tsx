import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, MonitorPlay } from 'lucide-react';

export const LearningResourceTabs = () => (
  <nav aria-label="Learning resources" className="mt-8 flex gap-6 border-b border-slate-200/80 sm:gap-8">
    {[
      { to: '/library/', label: 'Course Library', Icon: BookOpen },
      { to: '/schedule/', label: 'Live Classes', Icon: MonitorPlay },
    ].map(({ to, label, Icon }) => (
      <NavLink
        key={to}
        to={to}
        end
        className={({ isActive }) => `-mb-px inline-flex h-12 shrink-0 items-center gap-2 whitespace-nowrap border-b-2 pb-4 text-sm font-semibold leading-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 ${
          isActive ? 'border-pink-600 text-slate-900' : 'border-transparent text-slate-500 hover:text-pink-600'
        }`}
      >
        {({ isActive }) => <>
          <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-pink-600' : ''}`} aria-hidden="true" />
          {label}
        </>}
      </NavLink>
    ))}
  </nav>
);
