import { COMPANY } from '../config/company';

const SITE = COMPANY.siteUrl;

const IDS = {
  organization: `${SITE}/#organization`,
  logo: `${SITE}/#logo`,
  website: `${SITE}/#website`,
  learningService: `${SITE}/#learning-service`,
} as const;

/** Full Organization node (nested under WebPage only — never a separate top-level entity). */
const organization = () => ({
  '@type': 'Organization',
  '@id': IDS.organization,
  name: COMPANY.brandName,
  legalName: COMPANY.name,
  url: `${SITE}/`,
  logo: {
    '@type': 'ImageObject',
    '@id': IDS.logo,
    url: COMPANY.logoUrl,
    contentUrl: COMPANY.logoUrl,
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
  name: `${COMPANY.brandName} Online Learning`,
  serviceType: 'Online education and live instructor-led training',
  provider: { '@id': IDS.organization },
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
  name: 'FutureWorkAcademy Course Plans',
  itemListElement: [
    pricingOffer(
      `${SITE}/pricing/#basic-plan-offer`,
      `${SITE}/pricing/#basic-plan`,
      'Basic Monthly Membership',
      'FutureWorkAcademy Basic Plan',
      '18.00',
      'Cancel anytime. Access lifestyle courses.',
      COMPANY.pricingPlanImages.basic,
    ),
    pricingOffer(
      `${SITE}/pricing/#classic-plan-offer`,
      `${SITE}/pricing/#classic-plan`,
      'Classic Monthly Membership',
      'FutureWorkAcademy Classic Plan',
      '48.00',
      'Cancel anytime. Access lifestyle courses and business courses.',
      COMPANY.pricingPlanImages.classic,
    ),
    pricingOffer(
      `${SITE}/pricing/#premium-plan-offer`,
      `${SITE}/pricing/#premium-plan`,
      'Premium Monthly Membership',
      'FutureWorkAcademy Premium Plan',
      '98.00',
      'Cancel anytime. Access lifestyle courses, business courses, unlimited access, scheduled instructor-led live classes, direct interaction with instructors, practical live demonstrations, questions during live sessions, upcoming and past classes through your account, and eligible classes at their scheduled time.',
      COMPANY.pricingPlanImages.premium,
      'Monthly online course membership with live instructor-led classes',
    ),
  ],
});

const pricingBreadcrumb = () => ({
  '@type': 'BreadcrumbList',
  '@id': `${SITE}/pricing/#breadcrumb`,
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
      name: 'Pricing',
      item: `${SITE}/pricing/`,
    },
  ],
});

type PageSchemaInput = {
  path: string;
  title: string;
  description: string;
};

/**
 * Single root WebPage JSON-LD object. Organization, WebSite, Service, offers, etc. are nested
 * under WebPage so validators show one detected item, not multiple top-level tabs.
 */
export const buildStructuredData = ({ path, title, description }: PageSchemaInput) => {
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

  switch (path) {
    case '/':
    case '/unsubscribe':
    case '/signup':
      page.about = learningServiceAbout();
      break;
    case '/pricing':
      page.about = learningServiceAbout();
      page.mainEntity = pricingMainEntity();
      page.breadcrumb = pricingBreadcrumb();
      break;
    case '/terms-conditions':
    case '/privacy-policy':
    case '/imprint':
      page.about = { '@id': IDS.organization };
      break;
    default:
      break;
  }

  return page;
};

/** @deprecated Alias for imports; returns nested WebPage root (not @graph). */
export const buildStructuredDataGraph = buildStructuredData;
