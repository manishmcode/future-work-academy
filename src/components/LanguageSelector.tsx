import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Languages } from 'lucide-react';

const languages = [
  { label: 'English', short: 'EN', code: 'en' },
  { label: 'Svenska', short: 'SV', code: 'sv' },
  { label: 'Espaol', short: 'ES', code: 'es' },
  { label: 'Deutsch', short: 'DE', code: 'de' },
];

const getLanguageFromCookie = () => {
  const value = document.cookie.split('; ').find((cookie) => cookie.startsWith('googtrans='))?.split('=')[1];
  const code = value ? decodeURIComponent(value).split('/').pop() : 'en';
  return languages.find((language) => language.code === code) || languages[0];
};

export const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(languages[0]);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelected(getLanguageFromCookie());
    const closeMenu = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', closeMenu);
    return () => document.removeEventListener('mousedown', closeMenu);
  }, []);

  const changeLanguage = (language: typeof languages[number]) => {
    setIsOpen(false);
    if (language.code === 'en') {
      document.cookie = 'googtrans=; Max-Age=0; path=/';
      setSelected(language);
      document.documentElement.lang = language.code;
      return;
    }

    document.cookie = `googtrans=/en/${language.code}; path=/`;
    const applyTranslation = (attempt = 0) => {
      const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
      if (select) {
        select.value = language.code;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        setSelected(language);
        document.documentElement.lang = language.code;
      } else if (attempt < 10) {
        window.setTimeout(() => applyTranslation(attempt + 1), 300);
      }
    };
    applyTranslation();
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
        <div role="menu" className="absolute right-0 top-full mt-2 w-36 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
          {languages.map((language) => (
            <button
              key={language.code}
              type="button"
              role="menuitem"
              onClick={() => changeLanguage(language)}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors ${selected.code === language.code ? 'bg-pink-50 text-pink-600' : 'text-slate-700 hover:bg-slate-50'}`}
            >
              {language.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
