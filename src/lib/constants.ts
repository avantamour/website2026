export const BRAND = {
  name: 'Avant Amour',
  domain: 'avantamour.in',
  url: 'https://avantamour.in',
  email: 'connect@avantamour.in',
  phone: '+91-9831397530',
  whatsapp: 'https://wa.me/919831397530',
  locations: ['Delhi', 'Kolkata'] as const,

  /**
   * How quickly we promise to reply. Chosen by Arrpita on 12 Sep 2026.
   * Used on the contact page (before submitting) and the thank-you page (after),
   * which previously contradicted each other. Never hardcode this string.
   */
  replyWithin: 'one working day',

  /**
   * Canonical engagement facts, in Arrpita's own words (content worksheet, 26 May 2026).
   * Every page, FAQ answer and FAQPage JSON-LD block must derive from these — the site
   * previously gave two-to-three-times different answers depending on where you landed.
   */
  engagement: {
    typicalDuration: 'two to three weeks',
    typicalSample: 'around 30 participants',
    diaryLength: 'five to ten days',
    diarySample: '50 customers',
    multiCity: '100 in-home ethnographies across 13 cities over eight weeks',
  },

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

  /**
   * LinkedIn recommendations of Arrpita (supplied by the owner, 15 Sep 2026).
   * Verbatim except: "Arpita" → "Arrpita" (her name's correct spelling) and
   * "than" → "then". "…" marks where the recommendation continues on LinkedIn —
   * never complete a sentence we have not seen. Both may predate Avant Amour, so
   * `relationship` describes the tie to Arrpita, never to the firm.
   */
  testimonials: [
    {
      quote:
        'Arrpita was given a research project on ethnography and she has delivered the insights in the most scientific manner. Her ability to take the project to conclusion, understand the domain, understand behaviours and then connect the dots…',
      name: 'Farida Hussain',
      relationship: 'Client',
      year: 2025,
    },
    {
      quote:
        'Arrpita worked with us on contract on a couple of ethnography projects. She clearly knows her subject very well. She did her studies and brought out insights that were consistent with our understanding. It was therefore a good validation. She is a purist…',
      name: 'Kaushik Majumder',
      relationship: 'Managed Arrpita on contract ethnography projects',
      year: 2018,
    },
  ],

  audience: 'D2C and digital-first brands in India',
  methodSignature: 'Ethnography',

  // Kept under 155 characters so Google and LinkedIn never truncate it mid-word,
  // and ending with the locked tagline verbatim.
  defaultDescription:
    'Founder-led ethnographic research firm in Delhi and Kolkata, for D2C brands in India. What consumers actually do. Not just what they say.',

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

// Hrefs carry a trailing slash because Netlify 301-redirects the slash-less form.
// Without it every internal click costs a redirect hop and Google files the
// slash-less URL under "page with redirect" (45 of them as of Sep 2026).
export const NAV = [
  { label: 'Services', href: '/services/' },
  { label: 'For D2C Brands', href: '/for-d2c-brands/' },
  { label: 'Methodology', href: '/methodology/' },
  { label: 'Case Studies', href: '/case-studies/' },
  { label: 'Insights', href: '/insights/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
] as const;

export const FOOTER_LINKS = {
  explore: [
    { label: 'Services', href: '/services/' },
    { label: 'Case Studies', href: '/case-studies/' },
    { label: 'Methodology', href: '/methodology/' },
    { label: 'Glossary', href: '/glossary/' },
  ],
  company: [
    { label: 'About', href: '/about/' },
    { label: 'For D2C Brands', href: '/for-d2c-brands/' },
    { label: 'Insights', href: '/insights/' },
    { label: 'Contact', href: '/contact/' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy/' },
  ],
} as const;
