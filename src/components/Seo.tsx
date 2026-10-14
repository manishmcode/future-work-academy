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

const OG_IMAGE = COMPANY.ogImageUrl;
const OG_IMAGE_WIDTH = String(COMPANY.ogImageWidth);
const OG_IMAGE_HEIGHT = String(COMPANY.ogImageHeight);
const DEFAULT_IMAGE_ALT =
  'FutureWorkAcademy AI productivity courses, video lessons, and live online classes';

const canonicalPath = (path: string) => (path === '/' ? '/' : path.replace(/\/+$/, ''));
const canonicalUrl = (path: string) => `${COMPANY.siteUrl}${path === '/' ? '/' : `${path}/`}`;

const publicRoutes: Record<string, SeoConfig> = {
  '/': {
    title: 'AI Productivity Courses & Live Classes | FutureWorkAcademy',
    description:
      'Video courses and live classes in AI productivity, remote work, freelancing, and online business. Start learning today.',
    path: '/',
    ogImageAlt:
      'Learn AI and productivity skills with FutureWorkAcademy video courses and live classes. Start learning today.',
  },
  '/pricing': {
    title: 'Course Membership Pricing | FutureWorkAcademy',
    description:
      'Compare FutureWorkAcademy membership plans for video courses, AI productivity learning resources, remote work skills, and live class access.',
    path: '/pricing',
    ogImageAlt: 'FutureWorkAcademy course membership pricing for video lessons and live classes',
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
    description:
      'Log in to access your FutureWorkAcademy learning account, course library, and member resources.',
    path: '/login',
    noindex: true,
    ogImageAlt: 'FutureWorkAcademy member login for online learning resources',
  },
  '/signup': {
    title: 'Create an Account | FutureWorkAcademy',
    description:
      'Create your FutureWorkAcademy account to access practical video learning resources and begin your course membership.',
    path: '/signup',
    ogImageAlt: 'Create an account with FutureWorkAcademy to access learning resources',
  },
  '/privacy-policy': {
    title: `Privacy Policy | ${COMPANY.brandName}`,
    description:
      'Read FutureWorkAcademy privacy policy details about how personal information is collected, used, protected, and managed.',
    path: '/privacy-policy',
    ogImageAlt: 'FutureWorkAcademy privacy policy',
  },
  '/terms-conditions': {
    title: `Terms & Conditions | ${COMPANY.brandName}`,
    description:
      'Read FutureWorkAcademy terms and conditions for using the platform, course resources, memberships, and related services.',
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
    description: 'Complete your FutureWorkAcademy course membership order securely.',
    path: '/checkout',
    noindex: true,
    ogImageAlt: 'FutureWorkAcademy secure checkout for course membership',
  },
};

const privateRoutes: Record<string, SeoConfig> = {
  '/library': {
    title: `Member Library | ${COMPANY.brandName}`,
    description:
      'Access your private FutureWorkAcademy library of video courses and practical learning resources.',
    path: '/library',
    noindex: true,
    ogImageAlt: 'FutureWorkAcademy member library for video courses',
  },
  '/schedule': {
    title: `Live Class Schedule | ${COMPANY.brandName}`,
    description:
      'View your private FutureWorkAcademy live class schedule and upcoming guided online sessions.',
    path: '/schedule',
    noindex: true,
    ogImageAlt: 'FutureWorkAcademy live class schedule for members',
  },
  '/live-room': {
    title: `Live Room | ${COMPANY.brandName}`,
    description:
      'Join your private FutureWorkAcademy live class room for guided online learning sessions.',
    path: '/live-room',
    noindex: true,
    ogImageAlt: 'FutureWorkAcademy private live class room',
  },
  '/account': {
    title: `My Account | ${COMPANY.brandName}`,
    description: 'Manage your private FutureWorkAcademy account details.',
    path: '/account',
    noindex: true,
    ogImageAlt: 'FutureWorkAcademy member account management',
  },
  '/profile': {
    title: `My Account | ${COMPANY.brandName}`,
    description: 'Manage your private FutureWorkAcademy account details.',
    path: '/account',
    noindex: true,
    ogImageAlt: 'FutureWorkAcademy member account management',
  },
};

const notFoundSeo: SeoConfig = {
  title: `404 Page Not Found | ${COMPANY.brandName}`,
  description: `The requested ${COMPANY.brandName} page could not be found.`,
  path: '/404',
  noindex: true,
  ogImageAlt: 'FutureWorkAcademy online learning platform',
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
    config.ogImageAlt ?? DEFAULT_IMAGE_ALT;

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
