import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { COMPANY } from '../config/company';
import { useAuth } from '../context/AuthContext';
import { buildStructuredData } from '../seo/structuredData';
import {
  canonicalUrl,
  DEFAULT_IMAGE_ALT,
  notFoundSeo,
  privateRoutes,
  publicRoutes,
  type SeoConfig,
} from '../seo/routes';

const OG_IMAGE = COMPANY.ogImageUrl;
const OG_IMAGE_WIDTH = String(COMPANY.ogImageWidth);
const OG_IMAGE_HEIGHT = String(COMPANY.ogImageHeight);

const canonicalPath = (path: string) => (path === '/' ? '/' : path.replace(/\/+$/, ''));

const upsertMeta = (selector: string, create: () => HTMLMetaElement, content: string) => {
  const element = document.head.querySelector<HTMLMetaElement>(selector) ?? create();
  element.setAttribute('content', content);
};

const ensureMetaName = (name: string, content: string) => {
  upsertMeta(
    `meta[name="${name}"]`,
    () => {
      const meta = document.createElement('meta');
      meta.setAttribute('name', name);
      document.head.appendChild(meta);
      return meta;
    },
    content,
  );
};

const ensureMetaProperty = (property: string, content: string) => {
  upsertMeta(
    `meta[property="${property}"]`,
    () => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
      return meta;
    },
    content,
  );
};

const ensureCanonical = (href: string) => {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
};

/** Reuses the prerendered script[data-route-schema] so there is only ever one JSON-LD block. */
const setStructuredData = (data: Record<string, unknown>) => {
  const existing = document.head.querySelector<HTMLScriptElement>('script[data-route-schema="true"]');
  const script = existing ?? document.createElement('script');
  script.type = 'application/ld+json';
  script.dataset.routeSchema = 'true';
  script.textContent = JSON.stringify(data);
  if (!existing) document.head.appendChild(script);
};

const applySocialMeta = (config: SeoConfig, url: string) => {
  const imageAlt = config.ogImageAlt ?? DEFAULT_IMAGE_ALT;

  ensureMetaProperty('og:title', config.title);
  ensureMetaProperty('og:description', config.description);
  ensureMetaProperty('og:url', url);
  ensureMetaProperty('og:type', 'website');
  ensureMetaProperty('og:site_name', COMPANY.brandName);
  ensureMetaProperty('og:image', OG_IMAGE);
  ensureMetaProperty('og:image:width', OG_IMAGE_WIDTH);
  ensureMetaProperty('og:image:height', OG_IMAGE_HEIGHT);
  ensureMetaProperty('og:image:alt', imageAlt);

  ensureMetaName('twitter:card', 'summary_large_image');
  ensureMetaName('twitter:title', config.title);
  ensureMetaName('twitter:description', config.description);
  ensureMetaName('twitter:image', OG_IMAGE);
  ensureMetaName('twitter:image:alt', imageAlt);
};

export const Seo = () => {
  const location = useLocation();
  const { isLoggedIn, hasLibraryAccess, isAuthLoading } = useAuth();

  useEffect(() => {
    const path = canonicalPath(location.pathname);
    const effectivePath = (() => {
      if (isAuthLoading) return path;
      if (['/library', '/schedule', '/live-room'].includes(path) && (!isLoggedIn || !hasLibraryAccess)) {
        return '/pricing';
      }
      if (['/account', '/profile'].includes(path) && !isLoggedIn) {
        return '/login';
      }
      if (path === '/profile') {
        return '/account';
      }
      if (path === '/courses') {
        return hasLibraryAccess ? '/library' : '/pricing';
      }
      return path;
    })();
    const config = publicRoutes[effectivePath] ?? privateRoutes[effectivePath] ?? notFoundSeo;
    const url = canonicalUrl(config.path);

    document.title = config.title;
    ensureMetaName('description', config.description);
    ensureMetaName('robots', config.noindex ? 'noindex, follow' : 'index, follow');
    ensureCanonical(url);
    applySocialMeta(config, url);
    setStructuredData(buildStructuredData(config));
  }, [hasLibraryAccess, isAuthLoading, isLoggedIn, location.pathname]);

  return null;
};
