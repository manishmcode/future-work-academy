const GOOGTRANS = 'googtrans';

/** Remove all googtrans cookies Google may set (path/domain variants). */
export const clearGoogTransCookies = () => {
  const expire = 'Thu, 01 Jan 1970 00:00:00 UTC';
  const { hostname } = window.location;
  const domains: (string | undefined)[] = [undefined, hostname, `.${hostname}`];

  domains.forEach((domain) => {
    ['/', ''].forEach((path) => {
      let cookie = `${GOOGTRANS}=; expires=${expire}; path=${path || '/'}`;
      if (domain) cookie += `; domain=${domain}`;
      document.cookie = cookie;
    });
  });
};

export const setGoogTransCookie = (languageCode: string) => {
  if (languageCode === 'en') {
    clearGoogTransCookies();
    return;
  }
  document.cookie = `${GOOGTRANS}=/en/${languageCode}; path=/`;
};

const getTranslateSelect = () => document.querySelector<HTMLSelectElement>('select.goog-te-combo');

/** Drive the hidden Google Translate dropdown (same as manual widget change). */
export const syncGoogleTranslateSelect = (languageCode: string): boolean => {
  const select = getTranslateSelect();
  if (!select) return false;

  if (languageCode === 'en') {
    const original =
      Array.from(select.options).find(
        (option) =>
          option.value === '' ||
          option.value === 'en' ||
          /english|original|select language/i.test(option.textContent ?? ''),
      ) ?? select.options[0];

    if (original) select.value = original.value;
  } else {
    select.value = languageCode;
  }

  select.dispatchEvent(new Event('change', { bubbles: true }));
  return true;
};

/**
 * Apply site language via Google Translate.
 * English uses a full reload after reset — required for React SPAs so translated DOM is replaced.
 */
export const applySiteLanguage = (languageCode: string, onReady?: () => void) => {
  const finishEnglish = () => {
    clearGoogTransCookies();
    document.documentElement.lang = 'en';
    document.documentElement.classList.remove('translated-ltr', 'translated-rtl');
    onReady?.();
    const { pathname, search, hash } = window.location;
    window.location.assign(`${pathname}${search}${hash}`);
  };

  if (languageCode === 'en') {
    syncGoogleTranslateSelect('en');
    finishEnglish();
    return;
  }

  setGoogTransCookie(languageCode);

  const attempt = (tryCount: number) => {
    if (syncGoogleTranslateSelect(languageCode)) {
      document.documentElement.lang = languageCode;
      onReady?.();
      return;
    }
    if (tryCount < 15) {
      window.setTimeout(() => attempt(tryCount + 1), 250);
    }
  };

  attempt(0);
};

export const readGoogTransLanguageCode = (): string => {
  const raw = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${GOOGTRANS}=`))
    ?.split('=')
    .slice(1)
    .join('=');

  if (!raw) return 'en';

  const decoded = decodeURIComponent(raw);
  const code = decoded.split('/').filter(Boolean).pop() ?? 'en';
  return code === 'en' || decoded === '/en/en' ? 'en' : code;
};
