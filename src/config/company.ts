export const COMPANY = {
  brandName: 'FutureWorkAcademy',
  name: 'Elqavora Ltd',
  address: 'Suite F, Ground Floor, Breakspear Park, Breakspear Way, Hemel Hempstead, Hertfordshire, HP2 4TZ, United Kingdom',
  supportEmail: 'support@futureworkacademy.net',
  director: 'Daniela Rios Domingues',
  registrationNumber: '16275312',
  vatNumber: '60397501D',
} as const;

export const companyEmailLink = `mailto:${COMPANY.supportEmail}`;
