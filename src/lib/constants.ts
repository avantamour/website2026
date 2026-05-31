export const BRAND = {
  name: 'Avant Amour',
  domain: 'avantamour.in',
  url: 'https://avantamour.in',
  email: 'connect@avantamour.in',
  phone: '+91-9831397530',
  whatsapp: 'https://wa.me/919831397530',
  locations: ['Delhi', 'Kolkata'] as const,

  h1: 'Ethnographic consumer research for D2C and digital-first brands',
  subLine:
    'Founder-led ethnography for Indian D2C brands. What consumers actually do — not just what they say.',
  tagline: 'What consumers actually do. Not just what they say.',

  founder: {
    fullName: 'Arrpita Ghosh Hajra',
    firstName: 'Arrpita',
    title: 'Founder & Lead Researcher',
    yearsExperience: 15,
    credentials: ['QRCA member'],
    priorWork: ['Zee5', 'Rapido', 'Adobe', 'USV'],
    linkedin: 'https://www.linkedin.com/in/arrpita-g-hajra-a5b37857/',
  },

  audience: 'D2C and digital-first brands in India',
  methodSignature: 'Ethnography',

  defaultDescription:
    'Avant Amour is a founder-led qualitative research firm in India. We help D2C and digital-first brands understand consumer behaviour through ethnographic research — in-home, mobile, and WhatsApp diary studies.',

  social: {
    linkedin: 'https://www.linkedin.com/company/avantamour/',
  },

  certifications: [
    {
      standard: 'ISO/IEC 27001:2022',
      scope: 'Information Security Management System',
      number: 'QCC/9724/0126',
      issuer: 'EAS (IAF-accredited)',
      validThrough: '2029-01-28',
    },
    {
      standard: 'ISO 9001:2015',
      scope: 'Quality Management System',
      number: 'QCC/8560/0126',
      issuer: 'EAS (IAF-accredited)',
      validThrough: '2029-01-28',
    },
  ],
} as const;

export const COLORS = {
  teal: '#1A9FA5',
  yellow: '#FBAA19',
  ink: '#0F1419',
  inkSoft: '#3A4348',
  cream: '#FBF8F3',
  paper: '#FFFFFF',
  border: '#E8E2D5',
} as const;

export const NAV = [
  { label: 'Services', href: '/services' },
  { label: 'For D2C Brands', href: '/for-d2c-brands' },
  { label: 'Methodology', href: '/methodology' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
] as const;

export const FOOTER_LINKS = {
  explore: [
    { label: 'Services', href: '/services' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Methodology', href: '/methodology' },
    { label: 'Glossary', href: '/glossary' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'For D2C Brands', href: '/for-d2c-brands' },
    { label: 'Insights', href: '/insights' },
    { label: 'Contact', href: '/contact' },
  ],
} as const;
