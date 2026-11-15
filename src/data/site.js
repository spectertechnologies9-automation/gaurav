/**
 * SITE CONFIG — edit this file to update identity, contact links and the portrait.
 *
 * Contact / social values are intentionally empty: fill them in and the UI
 * switches from a "pending" label to a working link automatically.
 */
const BASE = import.meta.env.BASE_URL;

export const site = {
  name: 'Gaurav Puttannachetty',
  shortName: 'GP',
  location: 'Bengaluru, India',
  status: 'Open to collaborations',
  headline: 'I build intelligent systems.',
  pillars: ['AI', 'Software', 'Automation', 'Products', 'Businesses'],
  description:
    'An independent technology builder exploring the intersection of artificial intelligence, software engineering, automation and entrepreneurship.',
  footerLine: 'Built with curiosity. Engineered with intent.',

  /**
   * Portrait slots. The hero is a real photograph presented in a layered
   * "player card" — swap `hero` for a rendered/suited portrait (ideally a
   * transparent PNG/WebP) whenever you have one. Keep the same 3:4 ratio.
   */
  portraits: {
    hero: {
      base: `${BASE}img/art-smile`,
      widths: [480, 800, 1086],
      fallback: `${BASE}img/art-smile-800.jpg`,
      alt: 'Illustrated portrait of Gaurav Puttannachetty smiling with a hand behind his head',
      width: 1086,
      height: 1448,
    },
    about: {
      base: `${BASE}img/art-founder`,
      widths: [480, 800, 1086],
      fallback: `${BASE}img/art-founder-800.jpg`,
      alt: 'Illustrated portrait of Gaurav Puttannachetty in a black suit and sunglasses, arms crossed',
      width: 1086,
      height: 1448,
    },
    contact: {
      base: `${BASE}img/art-smile`,
      widths: [480, 800, 1086],
      fallback: `${BASE}img/art-smile-800.jpg`,
      alt: 'Illustrated portrait of Gaurav Puttannachetty smiling with a hand behind his head',
      width: 1086,
      height: 1448,
    },
  },

  /** Verified contact details. GitHub is left empty on purpose (hidden until set). */
  contact: {
    email: 'gauravputtannachetty35@gmail.com',
    phone: '+91 9886647062',
    phoneHref: 'tel:+919886647062',
    linkedin: 'https://www.linkedin.com/in/gaurav-puttannachetty-a04a4726a/',
    github: '',
  },

  /** Company websites. Leave url '' if not public yet. */
  companySites: [
    { name: 'Specter Automations', url: 'https://specterautomations.in', host: 'specterautomations.in' },
    { name: 'Tachyon Intelligence', url: 'https://tachyonintelligence.in', host: 'tachyonintelligence.in' },
    { name: 'Polymath', url: '' },
    { name: 'Specter Gadgets', url: '' },
  ],
};
