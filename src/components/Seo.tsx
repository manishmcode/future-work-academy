import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { COMPANY } from '../config/company';
import { useAuth } from '../context/AuthContext';
import { buildStructuredDataGraph } from '../seo/structuredData';

type SeoConfig = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  ogImageAlt?: string;
};

const OG_IMAGE = `${COMPANY.siteUrl}/images/live-class-mockup.webp`;
const OG_IMAGE_WIDTH = '1200';
const OG_IMAGE_HEIGHT = '630';

const canonicalPath = (path: string) => (path === '/' ? '/' : path.replace(/\/+$/, ''));
const canonicalUrl = (path: string) => `${COMPANY.siteUrl}${path === '/' ? '/' : `${path}/`}`;

const publicRoutes: Record<string, SeoConfig> = {
  '/': {
    title: 'AI & Tech Courses with Live Training | FutureWorkAcademy',
    description:
      'Explore AI and technology courses with practical lessons, live instructor guidance, and structured learning paths to build real-world skills.',
    path: '/',
    ogImageAlt: 'FutureWorkAcademy AI and technology courses with live instructor training',
  },
  '/courses': {
    title: `Courses | ${COMPANY.brandName}`,
    description:
      'Explore practical FutureWorkAcademy courses for productivity, consulting, marketing, online business, and professional growth.',
    path: '/courses',
    ogImageAlt: 'FutureWorkAcademy AI and technology courses with live instructor training',
  },
  '/pricing': {
    title: 'AI & Tech Courses Pricing Plans | FutureWorkAcademy',
    description:
      'Compare FutureWorkAcademy pricing plans for AI and technology courses, practical learning resources, and live instructor guidance.',
    path: '/pricing',
    ogImageAlt: 'FutureWorkAcademy AI and technology course pricing plans',
  },
  '/unsubscribe': {
    title: `Unsubscribe | ${COMPANY.brandName}`,
    description:
      'Manage your FutureWorkAcademy subscription and find information about cancelling your membership or unsubscribing from the service.',
    path: '/unsubscribe',
    ogImageAlt: 'FutureWorkAcademy subscription management',
  },
  '/login': {
    title: `Log In | ${COMPANY.brandName}`,
    description: 'Log in to your FutureWorkAcademy account.',
    path: '/login',
    noindex: true,
    ogImageAlt: 'FutureWorkAcademy AI and technology courses with live instructor training',
  },
  '/signup': {
    title: 'Create an Account | FutureWorkAcademy',
    description:
      'Create your FutureWorkAcademy account to access your personal learning dashboard and get started with your learning journey.',
    path: '/signup',
    ogImageAlt: 'Create an account with FutureWorkAcademy to access learning resources',
  },
  '/privacy-policy': {
    title: `Privacy Policy | ${COMPANY.brandName}`,
    description:
      'Read FutureWorkAcademy’s privacy policy to learn how your personal information is collected, used, protected, and managed when using our platform.',
    path: '/privacy-policy',
    ogImageAlt: 'FutureWorkAcademy privacy policy',
  },
  '/terms-conditions': {
    title: `Terms & Conditions | ${COMPANY.brandName}`,
    description:
      'Read FutureWorkAcademy’s terms and conditions to understand the rules, policies, and terms governing the use of our platform and services.',
    path: '/terms-conditions',
    ogImageAlt: 'FutureWorkAcademy terms and conditions',
  },
  '/imprint': {
    title: `Imprint | ${COMPANY.brandName}`,
    description:
      'View the FutureWorkAcademy Imprint for company information, contact details, legal disclosures, and other required business information.',
    path: '/imprint',
    ogImageAlt: 'FutureWorkAcademy company information and legal disclosures',
  },
  '/checkout': {
    title: `Checkout | ${COMPANY.brandName}`,
    description: 'Complete your FutureWorkAcademy order securely.',
    path: '/checkout',
    noindex: true,
    ogImageAlt: 'FutureWorkAcademy AI and technology courses with live instructor training',
  },
};

const privateRoutes: Record<string, SeoConfig> = {
  '/library': {
    title: `Member Library | ${COMPANY.brandName}`,
    description: 'Access your private FutureWorkAcademy course library.',
    path: '/library',
    noindex: true,
    ogImageAlt: 'FutureWorkAcademy AI and technology courses with live instructor training',
  },
  '/schedule': {
    title: `Live Class Schedule | ${COMPANY.brandName}`,
    description: 'View your private FutureWorkAcademy live class schedule.',
    path: '/schedule',
    noindex: true,
    ogImageAlt: 'FutureWorkAcademy AI and technology courses with live instructor training',
  },
  '/live-room': {
    title: `Live Room | ${COMPANY.brandName}`,
    description: 'Join your private FutureWorkAcademy live class room.',
    path: '/live-room',
    noindex: true,
    ogImageAlt: 'FutureWorkAcademy AI and technology courses with live instructor training',
  },
  '/account': {
    title: `My Account | ${COMPANY.brandName}`,
    description: 'Manage your private FutureWorkAcademy account details.',
    path: '/account',
    noindex: true,
    ogImageAlt: 'FutureWorkAcademy AI and technology courses with live instructor training',
  },
  '/profile': {
    title: `My Account | ${COMPANY.brandName}`,
    description: 'Manage your private FutureWorkAcademy account details.',
    path: '/account',
    noindex: true,
    ogImageAlt: 'FutureWorkAcademy AI and technology courses with live instructor training',
  },
};

const notFoundSeo: SeoConfig = {
  title: `404 Page Not Found | ${COMPANY.brandName}`,
  description: `The requested ${COMPANY.brandName} page could not be found.`,
  path: '/404',
  noindex: true,
  ogImageAlt: 'FutureWorkAcademy AI and technology courses with live instructor training',
};

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

const setStructuredData = (graph: Record<string, unknown>) => {
  const existing = document.head.querySelector<HTMLScriptElement>('script[data-route-schema="true"]');
  const script = existing ?? document.createElement('script');
  script.type = 'application/ld+json';
  script.dataset.routeSchema = 'true';
  script.textContent = JSON.stringify(graph);
  if (!existing) document.head.appendChild(script);
};

const applySocialMeta = (config: SeoConfig, url: string) => {
  const imageAlt =
    config.ogImageAlt ?? 'FutureWorkAcademy AI and technology courses with live instructor training';

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
      return path;
    })();
    const config = publicRoutes[effectivePath] ?? privateRoutes[effectivePath] ?? notFoundSeo;
    const url = canonicalUrl(config.path);

    document.title = config.title;
    ensureMetaName('description', config.description);
    ensureMetaName('robots', config.noindex ? 'noindex, follow' : 'index, follow');
    ensureCanonical(url);
    applySocialMeta(config, url);

    setStructuredData(
      buildStructuredDataGraph({
        path: config.path,
        title: config.title,
        description: config.description,
      }),
    );
  }, [hasLibraryAccess, isAuthLoading, isLoggedIn, location.pathname]);

  return null;
};
