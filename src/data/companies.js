/**
 * COMPANIES & VENTURES
 *
 * `relation` describes what the thing is — it never claims founding status.
 *   'venture'   → a business I run / am building
 *   'ecosystem' → a product ecosystem I am building
 *   'internal'  → an internal tool/platform, not sold externally
 * `role` is optional free text (e.g. 'Founder', 'Co-founder', 'Lead engineer').
 * It is left empty on purpose: set it only to what is accurate.
 *
 * `projects` lists project ids from projects.js that belong to this company.
 */
export const RELATION_LABEL = {
  venture: 'Venture',
  ecosystem: 'Product ecosystem',
  internal: 'Internal platform',
};

export const companies = [
  {
    id: 'specter-automations',
    url: 'https://specterautomations.in',
    host: 'specterautomations.in',
    verified: true,
    roles: [
      { title: 'CEO', period: 'Aug – Nov 2026' },
      { title: 'CTO', period: 'Jul – Aug 2026' },
    ],
    name: 'Specter Automations',
    short: 'SPECTER',
    relation: 'venture',
    role: '',
    color: 'yellow',
    accent: 'pink',
    art: 'gears',
    tagline: 'AI automation & technology solutions.',
    description:
      'An AI automation and technology solutions company helping businesses replace repetitive work with assistants, automated communication and custom software.',
    focus: [
      'Business automation',
      'AI assistants',
      'WhatsApp automation',
      'Website development',
      'NFC products',
      'CRM systems',
      'AI-powered applications',
      'Customer communication automation',
    ],
    ecosystem: [
      { name: 'WhatsApp bots', note: 'Bookings, FAQs and RAG-powered answers on WhatsApp.' },
      { name: 'NFC products', note: 'Tap-to-share business cards, loyalty and review flows.' },
      { name: 'Business software', note: 'CRM dashboards and billing for small businesses.' },
      { name: 'Web presence', note: 'Websites, redesigns and hosting for clients.' },
    ],
    projects: ['whatsapp-booking-bot', 'whatsapp-rag-assistant', 'nfc-business-card', 'whatsapp-business-automation', 'nfc-loyalty-review', 'local-crm', 'billing-software', 'specter-website', 'venture-specter-automations'],
  },
  {
    id: 'tachyon-intelligence',
    url: 'https://tachyonintelligence.in',
    host: 'tachyonintelligence.in',
    verified: true,
    roles: [{ title: 'CTO', period: 'Nov 2026 – Present' }],
    name: 'Tachyon Intelligence',
    short: 'TACHYON',
    relation: 'ecosystem',
    role: '',
    color: 'blue',
    accent: 'cyan',
    art: 'wave',
    tagline: 'Voice AI for dealerships.',
    description:
      'An AI-powered dealership technology and customer communication ecosystem — AI calling, WhatsApp management, CRM and inventory, designed to work across languages.',
    focus: [
      'AI calling',
      'Dealership automation',
      'Voice AI',
      'WhatsApp Manager',
      'CRM',
      'Customer communication',
      'Inventory integration',
      'Multilingual AI systems',
    ],
    ecosystem: [
      { name: 'AI Calling System', note: 'Outbound/inbound voice agents for dealership conversations.' },
      { name: 'WhatsApp Manager', note: 'Centralised customer messaging for sales teams.' },
      { name: 'Voice Lab', note: 'Testing ground for STT, TTS and multilingual voices.' },
      { name: 'Master HUD / CRM', note: 'One control surface for leads, calls and follow-ups.' },
    ],
    projects: ['tachyon', 'tachyon-calling', 'tachyon-whatsapp', 'tachyon-voice-lab', 'tachyon-hud', 'tachyon-cloud', 'tachyon-inventory', 'dealership-inventory', 'venture-tachyon'],
  },
  {
    id: 'genx',
    name: 'GENX',
    short: 'GENX',
    relation: 'internal',
    role: '',
    color: 'pink',
    accent: 'yellow',
    art: 'bars',
    tagline: 'Internal growth & sales intelligence.',
    description:
      'An internal AI-powered growth, marketing and sales intelligence platform used to find, qualify and manage leads for the ventures.',
    focus: ['Lead generation', 'Sales intelligence', 'Customer acquisition', 'Business development', 'Lead management', 'AI-powered workflows'],
    ecosystem: [
      { name: 'Lead discovery', note: 'Finding and enriching prospective customers.' },
      { name: 'Qualification', note: 'AI-assisted scoring and research on leads.' },
      { name: 'Pipeline', note: 'Tracking outreach and follow-ups in one place.' },
    ],
    projects: ['genx', 'venture-genx'],
  },
  {
    id: 'polymath',
    name: 'Polymath',
    short: 'POLYMATH',
    relation: 'ecosystem',
    role: '',
    color: 'lavender',
    accent: 'mint',
    art: 'nodes',
    tagline: 'AI infrastructure for universities.',
    description:
      'An AI-powered university learning ecosystem: an academic tutor grounded in each institution’s own material, with portals for students and professors.',
    focus: ['AI academic tutor', 'University knowledge bases', 'Student & professor portals', 'Academic RAG', 'Document intelligence', 'Question banks', 'Assessments', 'Institutional AI infrastructure'],
    ecosystem: [
      { name: 'AI Tutor', note: 'Answers grounded in course material via RAG.' },
      { name: 'Knowledge base', note: 'Ingests syllabi, notes and documents per institution.' },
      { name: 'Portals', note: 'Separate student and professor experiences.' },
      { name: 'Assessments', note: 'Question banks and evaluation tooling.' },
    ],
    projects: ['polymath'],
  },
  {
    id: 'specter-gadgets',
    name: 'Specter Gadgets',
    short: 'GADGETS',
    relation: 'venture',
    role: '',
    color: 'orange',
    accent: 'lavender',
    art: 'speaker',
    tagline: 'Wireless audio, sold online.',
    description:
      'A product and e-commerce venture focused on wireless speakers — sourcing, product marketing and a dropshipping model.',
    focus: ['Wireless speakers', 'Product marketing', 'Dropshipping', 'E-commerce'],
    ecosystem: [
      { name: 'Products', note: 'A curated line of wireless speakers.' },
      { name: 'Marketing', note: 'Product content and campaigns.' },
      { name: 'Fulfilment', note: 'Dropshipping-based operations.' },
    ],
    projects: ['venture-specter-gadgets'],
  },
];
