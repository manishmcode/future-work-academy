import { COMPANY } from '../config/company';

const SITE = COMPANY.siteUrl;

const IDS = {
  organization: `${SITE}/#organization`,
  logo: `${SITE}/#logo`,
  website: `${SITE}/#website`,
  learningService: `${SITE}/#learning-service`,
} as const;

const featuredCourses = [
  {
    name: 'AI for Productivity Video Upgrade',
    description:
      'Practical ways to apply AI to everyday tasks, content creation, planning, and workflow improvement.',
  },
  {
    name: 'Simple Productivity Video Course',
    description:
      'Practical approaches for productive habits, distraction management, daily planning, and better time use.',
  },
  {
    name: 'Work From Home Productivity Video Upgrade',
    description:
      'Strategies for creating a productive home office, building routines, staying focused, and managing remote work.',
  },
  {
    name: 'How To Start a Freelance Business Video Upgrade',
    description:
      'Freelancing fundamentals including niche selection, portfolio building, client discovery, and freelance opportunities.',
  },
  {
    name: 'Solopreneur Success Video Upgrade',
    description:
      'Ideas for time management, motivation, professional connections, and building a one-person business.',
  },
  {
    name: 'Virtual Summit Secrets Video Upgrade',
    description:
      'Virtual summit planning essentials including speakers, promotion, audience engagement, and monetization.',
  },
];

/** Full Organization node (nested under WebPage only — never a separate top-level entity). */
const organization = () => ({
  '@type': 'EducationalOrganization',
  '@id': IDS.organization,
  name: COMPANY.brandName,
  legalName: COMPANY.name,
  url: `${SITE}/`,
  logo: {
    '@type': 'ImageObject',
    '@id': IDS.logo,
    url: COMPANY.logoUrl,
    contentUrl: COMPANY.logoUrl,
    width: 1408,
    height: 320,
  },
  email: COMPANY.supportEmail,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Suite F, Ground Floor, Breakspear Park, Breakspear Way',
    postalCode: 'HP2 4TZ',
    addressLocality: 'Hemel Hempstead',
    addressRegion: 'Hertfordshire',
    addressCountry: 'United Kingdom',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: COMPANY.supportEmail,
  },
});

const learningServiceAbout = () => ({
  '@type': 'Service',
  '@id': IDS.learningService,
  name: `${COMPANY.brandName} Practical Online Learning`,
  serviceType: 'Video courses and instructor-led online classes',
  description:
    'Video learning resources and guided online classes focused on AI productivity, personal productivity, remote work, freelancing, and online business development.',
  audience: {
    '@type': 'Audience',
    audienceType: 'Professionals, remote workers, freelancers, solopreneurs, and online business learners',
  },
  areaServed: 'Worldwide',
  provider: { '@id': IDS.organization },
});

const featuredCourseList = () => ({
  '@type': 'ItemList',
  '@id': `${SITE}/#featured-courses`,
  name: `${COMPANY.brandName} Featured Courses`,
  itemListElement: featuredCourses.map((course, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Course',
      '@id': `${SITE}/#course-${index + 1}`,
      name: course.name,
      description: course.description,
      provider: { '@id': IDS.organization },
      offers: {
        '@type': 'Offer',
        url: `${SITE}/pricing/`,
        category: 'Membership',
        availability: 'https://schema.org/InStock',
      },
    },
  })),
});

const pricingOffer = (
  offerId: string,
  serviceId: string,
  offerName: string,
  serviceName: string,
  price: string,
  description: string,
  image: string,
  serviceType = 'Monthly online course membership',
) => ({
  '@type': 'Offer',
  '@id': offerId,
  name: offerName,
  url: `${SITE}/pricing/`,
  price,
  priceCurrency: 'EUR',
  seller: { '@id': IDS.organization },
  itemOffered: {
    '@type': 'Service',
    '@id': serviceId,
    name: serviceName,
    image,
    serviceType,
    description,
    provider: { '@id': IDS.organization },
  },
  priceSpecification: {
    '@type': 'UnitPriceSpecification',
    price,
    priceCurrency: 'EUR',
    unitText: 'month',
    billingDuration: 'P1M',
  },
});

const pricingMainEntity = () => ({
  '@type': 'OfferCatalog',
  '@id': `${SITE}/pricing/#membership-plans`,
  name: 'FutureWorkAcademy Course Membership Plans',
  itemListElement: [
    pricingOffer(
      `${SITE}/pricing/#basic-plan-offer`,
      `${SITE}/pricing/#basic-plan`,
      'Basic Monthly Membership',
      'FutureWorkAcademy Basic Plan',
      '18.00',
      'Cancel anytime. Access selected video learning resources for practical personal and professional development.',
      COMPANY.pricingPlanImages.basic,
    ),
    pricingOffer(
      `${SITE}/pricing/#classic-plan-offer`,
      `${SITE}/pricing/#classic-plan`,
      'Classic Monthly Membership',
      'FutureWorkAcademy Classic Plan',
      '48.00',
      'Cancel anytime. Access video courses for productivity, remote work, freelancing, and online business skills.',
      COMPANY.pricingPlanImages.classic,
    ),
    pricingOffer(
      `${SITE}/pricing/#premium-plan-offer`,
      `${SITE}/pricing/#premium-plan`,
      'Premium Monthly Membership',
      'FutureWorkAcademy Premium Plan',
      '98.00',
      'Cancel anytime. Access video courses, practical learning resources, scheduled instructor-led live classes, direct interaction with instructors, demonstrations, questions during live sessions, and member class access through your account.',
      COMPANY.pricingPlanImages.premium,
      'Monthly online course membership with live instructor-led classes',
    ),
  ],
});

const pageBreadcrumb = (path: string, name: string) => ({
  '@type': 'BreadcrumbList',
  '@id': `${SITE}${path}/#breadcrumb`,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${SITE}/`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name,
      item: `${SITE}${path}/`,
    },
  ],
});

type PageSchemaInput = {
  path: string;
  title: string;
  description: string;
  breadcrumbName?: string;
};

/**
 * Single root WebPage JSON-LD object. Organization, WebSite, Service, offers, etc. are nested
 * under WebPage so validators show one detected item, not multiple top-level tabs.
 */
export const buildStructuredData = ({ path, title, description, breadcrumbName }: PageSchemaInput) => {
  const org = organization();

  const pageId = (() => {
    if (path === '/') return `${SITE}/#webpage`;
    return `${SITE}${path}/#webpage`;
  })();

  const pageUrl = path === '/' ? `${SITE}/` : `${SITE}${path}/`;

  const page: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': pageId,
    url: pageUrl,
    name: title,
    description,
    isPartOf: {
      '@type': 'WebSite',
      '@id': IDS.website,
      url: `${SITE}/`,
      name: COMPANY.brandName,
      publisher: org,
    },
    publisher: org,
  };

  if (path !== '/' && breadcrumbName) {
    page.breadcrumb = pageBreadcrumb(path, breadcrumbName);
  }

  switch (path) {
    case '/':
      page.about = learningServiceAbout();
      page.mainEntity = featuredCourseList();
      break;
    case '/unsubscribe':
    case '/signup':
      page.about = learningServiceAbout();
      break;
    case '/pricing':
      page.about = learningServiceAbout();
      page.mainEntity = pricingMainEntity();
      break;
    case '/terms-conditions':
    case '/privacy-policy':
    case '/imprint':
      page.about = { '@id': IDS.organization };
      break;    default:
      break;
  }

  return page;
};

/** @deprecated Alias for imports; returns nested WebPage root (not @graph). */
export const buildStructuredDataGraph = buildStructuredData;
