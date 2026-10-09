export const COMPANY = {
  brandName: 'FutureWork',
  name: 'TURTLE MEDIA LTD',
  address: 'Suite F, Ground Floor, Breakspear Park, Breakspear Way, Hemel Hempstead, Hertfordshire, HP2 4TZ, United Kingdom',
  supportEmail: 'support@futurework.net',
  director: 'Maria Lamprianidou',
  registrationNumber: 'HE 497690',
  vatNumber: '60397501D',
} as const;

export const companyEmailLink = `mailto:${COMPANY.supportEmail}`;
