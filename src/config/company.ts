export const COMPANY = {
  brandName: 'FutureWorkAcademy',
  siteUrl: 'https://futureworkacademy.net',
  /** Open Graph / Twitter card image (1200x630 WebP, 1.91:1) */
  ogImageUrl: 'https://futureworkacademy.net/images/og-image.webp',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  /** WebP logo for schema.org (deploy under public/images/) */
  logoUrl: 'https://futureworkacademy.net/images/logo.webp',
  /** WebP plan images for Offer schema (deploy under public/images/pricing/) */
  pricingPlanImages: {
    basic: 'https://futureworkacademy.net/images/pricing/basic-plan.webp',
    classic: 'https://futureworkacademy.net/images/pricing/classic-plan.webp',
    premium: 'https://futureworkacademy.net/images/pricing/premium-plan.webp',
  },
  name: 'Elqavora Ltd',
  address: 'Suite F, Ground Floor, Breakspear Park, Breakspear Way, Hemel Hempstead, Hertfordshire, HP2 4TZ, United Kingdom',
  supportEmail: 'support@futureworkacademy.net',
  director: 'Daniela Rios Domingues',
  registrationNumber: '16275312',
  vatNumber: '60397501D',
} as const;

export const companyEmailLink = `mailto:${COMPANY.supportEmail}`;
