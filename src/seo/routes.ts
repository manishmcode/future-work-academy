import { COMPANY } from '../config/company';

export type SeoConfig = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  ogImageAlt?: string;
  /** Breadcrumb label; omitted for the homepage. */
  breadcrumbName?: string;
};

export const DEFAULT_IMAGE_ALT =
  'FutureWorkAcademy AI productivity courses, video lessons, and live online classes';

export const canonicalUrl = (path: string) => `${COMPANY.siteUrl}${path === '/' ? '/' : `${path}/`}`;

export const publicRoutes: Record<string, SeoConfig> = {
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
    breadcrumbName: 'Pricing',
  },
  '/unsubscribe': {
    title: `Unsubscribe | ${COMPANY.brandName}`,
    description:
      'Manage your FutureWorkAcademy subscription and find information about cancelling your membership or unsubscribing from the service.',
    path: '/unsubscribe',
    ogImageAlt: 'FutureWorkAcademy subscription management',
    breadcrumbName: 'Unsubscribe',
  },
  '/login': {
    title: `Log In | ${COMPANY.brandName}`,
    description:
      'Log in to access your FutureWorkAcademy learning account, course library, and member resources.',
    path: '/login',
    noindex: true,
    ogImageAlt: 'FutureWorkAcademy member login for online learning resources',
    breadcrumbName: 'Log In',
  },
  '/signup': {
    title: 'Create an Account | FutureWorkAcademy',
    description:
      'Create your FutureWorkAcademy account to access practical video learning resources and begin your course membership.',
    path: '/signup',
    ogImageAlt: 'Create an account with FutureWorkAcademy to access learning resources',
    breadcrumbName: 'Create an Account',
  },
  '/privacy-policy': {
    title: `Privacy Policy | ${COMPANY.brandName}`,
    description:
      'Read FutureWorkAcademy privacy policy details about how personal information is collected, used, protected, and managed.',
    path: '/privacy-policy',
    ogImageAlt: 'FutureWorkAcademy privacy policy',
    breadcrumbName: 'Privacy Policy',
  },
  '/terms-conditions': {
    title: `Terms & Conditions | ${COMPANY.brandName}`,
    description:
      'Read FutureWorkAcademy terms and conditions for using the platform, course resources, memberships, and related services.',
    path: '/terms-conditions',
    ogImageAlt: 'FutureWorkAcademy terms and conditions',
    breadcrumbName: 'Terms & Conditions',
  },
  '/imprint': {
    title: `Imprint | ${COMPANY.brandName}`,
    description:
      'View the FutureWorkAcademy Imprint for company information, contact details, legal disclosures, and other required business information.',
    path: '/imprint',
    ogImageAlt: 'FutureWorkAcademy company information and legal disclosures',
    breadcrumbName: 'Imprint',
  },
  '/checkout': {
    title: `Checkout | ${COMPANY.brandName}`,
    description: 'Complete your FutureWorkAcademy course membership order securely.',
    path: '/checkout',
    noindex: true,
    ogImageAlt: 'FutureWorkAcademy secure checkout for course membership',
    breadcrumbName: 'Checkout',
  },
};

export const privateRoutes: Record<string, SeoConfig> = {
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

export const notFoundSeo: SeoConfig = {
  title: `404 Page Not Found | ${COMPANY.brandName}`,
  description: `The requested ${COMPANY.brandName} page could not be found.`,
  path: '/404',
  noindex: true,
  ogImageAlt: 'FutureWorkAcademy online learning platform',
};
