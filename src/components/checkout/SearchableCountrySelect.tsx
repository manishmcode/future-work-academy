import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import type { ICountry } from 'country-state-city';

type SearchableCountrySelectProps = {
  id: string;
  countries: ICountry[];
  value: string;
  onChange: (isoCode: string) => void;
  required?: boolean;
};

export const SearchableCountrySelect = ({
  id,
  countries,
  value,
  onChange,
  required,
}: SearchableCountrySelectProps) => {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(0);

  const selected = useMemo(
    () => countries.find((c) => c.isoCode === value),
    [countries, value],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.isoCode.toLowerCase().includes(q),
    );
  }, [countries, query]);

  useEffect(() => {
    setHighlightIndex(0);
  }, [query, open]);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  const pick = (isoCode: string) => {
    onChange(isoCode);
    setOpen(false);
    setQuery('');
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter')) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;

    if (e.key === 'Escape') {
      setOpen(false);
      setQuery('');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && filtered[highlightIndex]) {
      e.preventDefault();
      pick(filtered[highlightIndex].isoCode);
    }
  };

  const displayValue = open ? query : (selected?.name ?? '');

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={id} value={value} required={required} />

      <div
        className={`relative flex items-center rounded-2xl border bg-slate-50 transition-all ${
          open
            ? 'border-pink-500 ring-4 ring-pink-500/10 bg-white'
            : 'border-slate-200 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-500/10 focus-within:bg-white'
        }`}
      >
        <Search className="w-5 h-5 text-slate-400 shrink-0 ml-4 pointer-events-none" aria-hidden />
        <input
          ref={inputRef}
          id={id}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          autoComplete="off"
          placeholder="Search or select your country"
          value={displayValue}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!open) setOpen(true);
          }}
          onFocus={() => {
            setOpen(true);
            setQuery('');
          }}
          onKeyDown={onKeyDown}
          className="w-full bg-transparent py-3.5 pl-3 pr-10 text-[15px] font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none disabled:placeholder:text-slate-400"
        />
        <button
          type="button"
          tabIndex={-1}
          aria-label={open ? 'Close country list' : 'Open country list'}
          onClick={() => {
            setOpen((o) => !o);
            if (!open) {
              setQuery('');
              inputRef.current?.focus();
            }
          }}
          className="absolute right-3 p-1 text-slate-400 hover:text-slate-600"
        >
          <ChevronDown className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-2xl border border-slate-200 bg-white py-2 shadow-xl shadow-slate-200/60"
        >
          {filtered.length === 0 ? (
            <li className="px-4 py-3 text-sm text-slate-500 font-medium">No countries match your search.</li>
          ) : (
            filtered.map((country, index) => (
              <li key={country.isoCode} role="option" aria-selected={country.isoCode === value}>
                <button
                  type="button"
                  className={`w-full text-left px-4 py-2.5 text-[15px] font-medium transition-colors ${
                    index === highlightIndex ? 'bg-pink-50 text-pink-700' : 'text-slate-800 hover:bg-slate-50'
                  } ${country.isoCode === value ? 'font-bold' : ''}`}
                  onMouseEnter={() => setHighlightIndex(index)}
                  onClick={() => pick(country.isoCode)}
                >
                  {country.name}
                  <span className="ml-2 text-xs text-slate-400 font-semibold">{country.isoCode}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};
