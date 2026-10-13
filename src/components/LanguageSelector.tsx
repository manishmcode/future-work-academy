import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Languages } from 'lucide-react';
import { applySiteLanguage, readGoogTransLanguageCode } from '../utils/googleTranslate';

const languages = [
  { label: 'English', short: 'EN', code: 'en' },
  { label: 'Svenska', short: 'SV', code: 'sv' },
  { label: 'Español', short: 'ES', code: 'es' },
  { label: 'Deutsch', short: 'DE', code: 'de' },
] as const;

type Language = (typeof languages)[number];

const languageFromCode = (code: string): Language =>
  languages.find((language) => language.code === code) ?? languages[0];

export const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Language>(languages[0]);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelected(languageFromCode(readGoogTransLanguageCode()));
    const closeMenu = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', closeMenu);
    return () => document.removeEventListener('mousedown', closeMenu);
  }, []);

  const changeLanguage = (language: Language) => {
    setIsOpen(false);
    if (language.code === selected.code) return;

    applySiteLanguage(language.code, () => {
      setSelected(language);
    });
  };

  return (
    <div ref={menuRef} className="relative notranslate" translate="no">
      <button
        type="button"
        aria-label="Change language"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="h-10 px-3 rounded-xl border border-slate-200 bg-white/70 hover:bg-white text-slate-700 flex items-center gap-1.5 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        <Languages className="w-4 h-4 text-pink-600" />
        <span className="hidden lg:inline">{selected.label}</span>
        <span className="lg:hidden">{selected.short}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-36 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"
        >
          {languages.map((language) => (
            <button
              key={language.code}
              type="button"
              role="menuitem"
              onClick={() => changeLanguage(language)}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors ${
                selected.code === language.code ? 'bg-pink-50 text-pink-600' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {language.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
