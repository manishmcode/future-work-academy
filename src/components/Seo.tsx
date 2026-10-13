import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { COMPANY } from '../config/company';
import { useAuth } from '../context/AuthContext';

type SeoConfig = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  structuredData?: Record<string, unknown>;
};

const canonicalPath = (path: string) => (path === '/' ? '/' : path.replace(/\/+$/, ''));
const canonicalUrl = (path: string) => `${COMPANY.siteUrl}${path === '/' ? '/' : `${path}/`}`;

const baseStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: COMPANY.name,
  url: `${COMPANY.siteUrl}/`,
  brand: COMPANY.brandName,
  email: COMPANY.supportEmail,
};

const publicRoutes: Record<string, SeoConfig> = {
  '/': {
    title: `${COMPANY.brandName} | Practical AI Skills and Live Learning`,
    description: 'Build practical AI and business skills with FutureWorkAcademy courses, learning resources, and instructor-led live classes.',
    path: '/',
    structuredData: {
      ...baseStructuredData,
      '@type': 'WebSite',
      name: COMPANY.brandName,
    },
  },
  '/courses': {
    title: `Courses | ${COMPANY.brandName}`,
    description: 'Explore practical FutureWorkAcademy courses for productivity, consulting, marketing, online business, and professional growth.',
    path: '/courses',
  },
  '/pricing': {
    title: `Pricing | ${COMPANY.brandName}`,
    description: 'Choose a FutureWorkAcademy plan and unlock access to practical learning resources and live training.',
    path: '/pricing',
  },
  '/unsubscribe': {
    title: `Unsubscribe | ${COMPANY.brandName}`,
    description: 'Manage your FutureWorkAcademy email preferences and unsubscribe requests.',
    path: '/unsubscribe',
    noindex: true,
  },
  '/login': {
    title: `Log In | ${COMPANY.brandName}`,
    description: 'Log in to your FutureWorkAcademy account.',
    path: '/login',
    noindex: true,
  },
  '/signup': {
    title: `Sign Up | ${COMPANY.brandName}`,
    description: 'Create your FutureWorkAcademy account.',
    path: '/signup',
    noindex: true,
  },
  '/privacy-policy': {
    title: `Privacy Policy | ${COMPANY.brandName}`,
    description: `Learn how ${COMPANY.name} collects, uses, and protects personal information on FutureWorkAcademy.`,
    path: '/privacy-policy',
  },
  '/terms-conditions': {
    title: `Terms & Conditions | ${COMPANY.brandName}`,
    description: `Review the terms and conditions for using ${COMPANY.brandName}.`,
    path: '/terms-conditions',
  },
  '/imprint': {
    title: `Imprint | ${COMPANY.brandName}`,
    description: `Official company and legal disclosure information for ${COMPANY.name}.`,
    path: '/imprint',
  },
  '/checkout': {
    title: `Checkout | ${COMPANY.brandName}`,
    description: 'Complete your FutureWorkAcademy order securely.',
    path: '/checkout',
    noindex: true,
  },
};

const privateRoutes: Record<string, SeoConfig> = {
  '/library': {
    title: `Member Library | ${COMPANY.brandName}`,
    description: 'Access your private FutureWorkAcademy course library.',
    path: '/library',
    noindex: true,
  },
  '/schedule': {
    title: `Live Class Schedule | ${COMPANY.brandName}`,
    description: 'View your private FutureWorkAcademy live class schedule.',
    path: '/schedule',
    noindex: true,
  },
  '/live-room': {
    title: `Live Room | ${COMPANY.brandName}`,
    description: 'Join your private FutureWorkAcademy live class room.',
    path: '/live-room',
    noindex: true,
  },
  '/account': {
    title: `My Account | ${COMPANY.brandName}`,
    description: 'Manage your private FutureWorkAcademy account details.',
    path: '/account',
    noindex: true,
  },
  '/profile': {
    title: `My Account | ${COMPANY.brandName}`,
    description: 'Manage your private FutureWorkAcademy account details.',
    path: '/account',
    noindex: true,
  },
};

const notFoundSeo: SeoConfig = {
  title: `404 Page Not Found | ${COMPANY.brandName}`,
  description: `The requested ${COMPANY.brandName} page could not be found.`,
  path: '/404',
  noindex: true,
};

const upsertMeta = (selector: string, create: () => HTMLMetaElement, content: string) => {
  const element = document.head.querySelector<HTMLMetaElement>(selector) ?? create();
  element.setAttribute('content', content);
};

const ensureMetaName = (name: string, content: string) => {
  upsertMeta(`meta[name="${name}"]`, () => {
    const meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
    return meta;
  }, content);
};

const ensureMetaProperty = (property: string, content: string) => {
  upsertMeta(`meta[property="${property}"]`, () => {
    const meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
    return meta;
  }, content);
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

const setStructuredData = (data?: Record<string, unknown>) => {
  const existing = document.head.querySelector<HTMLScriptElement>('script[data-route-schema="true"]');
  if (!data) {
    existing?.remove();
    return;
  }

  const script = existing ?? document.createElement('script');
  script.type = 'application/ld+json';
  script.dataset.routeSchema = 'true';
  script.textContent = JSON.stringify(data);
  if (!existing) document.head.appendChild(script);
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
      return path;
    })();
    const config = publicRoutes[effectivePath] ?? privateRoutes[effectivePath] ?? notFoundSeo;
    const url = canonicalUrl(config.path);

    document.title = config.title;
    ensureMetaName('description', config.description);
    ensureMetaName('robots', config.noindex ? 'noindex, follow' : 'index, follow');
    ensureCanonical(url);

    ensureMetaProperty('og:title', config.title);
    ensureMetaProperty('og:description', config.description);
    ensureMetaProperty('og:url', url);
    ensureMetaProperty('og:type', 'website');
    ensureMetaName('twitter:card', 'summary');

    setStructuredData(config.structuredData);
  }, [hasLibraryAccess, isAuthLoading, isLoggedIn, location.pathname]);

  return null;
};
