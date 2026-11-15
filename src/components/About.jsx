import { useEffect, useRef, useState } from 'react';
import { site } from '../data/site.js';
import { projects } from '../data/projects.js';
import { companies } from '../data/companies.js';
import { techCount } from '../data/tech.js';
import { prefersReducedMotion } from '../lib/motion.js';
import { useInView } from '../hooks/useInView.js';
import { cx } from '../lib/cx.js';
import Picture from './Picture.jsx';
import SectionHead from './SectionHead.jsx';

const THEMES = [
  { t: 'Artificial intelligence', d: 'Intelligent systems built on LLMs, RAG, vector search and voice.', c: 'white' },
  { t: 'Full-stack development', d: 'React front ends, Python and Node back ends, real databases.', c: 'cyan' },
  { t: 'Product engineering', d: 'Taking an idea from rough prototype to something people can use.', c: 'yellow' },
  { t: 'Business automation', d: 'WhatsApp, CRM and workflow tools that remove repetitive work.', c: 'mint' },
  { t: 'Technical experimentation', d: 'Local GPU inference, NFC, speech models — testing what is possible.', c: 'orange' },
  { t: 'Entrepreneurship', d: 'Building ventures, not just features.', c: 'pink' },
];

// Self-assessed focus areas — a visual of where time goes, not a test score.
const SKILLS = [
  { k: 'AI & LLM engineering', v: 88, c: 'lavender' },
  { k: 'Voice AI', v: 78, c: 'pink' },
  { k: 'Full-stack web', v: 82, c: 'cyan' },
  { k: 'Automation & integrations', v: 85, c: 'mint' },
  { k: 'Product & business building', v: 80, c: 'yellow' },
];

function Count({ to, run }) {
  const [n, setN] = useState(prefersReducedMotion() ? to : 0);
  useEffect(() => {
    if (!run || prefersReducedMotion()) return undefined;
    const t0 = performance.now();
    let raf;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / 1100);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return <>{n}</>;
}

export default function About() {
  const statsRef = useRef(null);
  const skillsRef = useRef(null);
  const statsIn = useInView(statsRef, { once: true });
  const skillsIn = useInView(skillsRef, { once: true });

  const stats = [
    { n: projects.length, l: 'Archive entries', c: 'yellow' },
    { n: companies.length, l: 'Ventures & ecosystems', c: 'pink' },
    { n: techCount, l: 'Technologies', c: 'cyan' },
    { n: 3, l: 'Years building (2024→)', c: 'mint', approx: true },
  ];

  return (
    <section id="about" className="section about" aria-labelledby="about-h">
      <div className="wrap">
        <SectionHead n="01" label="The builder behind the systems" id="about-h" color="yellow">
          Not just writing code. <span className="hl">Building systems.</span>
        </SectionHead>

        <div className="about__grid">
          <figure className="about__photo reveal" style={{ margin: 0 }}>
            <div className="frame box">
              <Picture slot={site.portraits.about} sizes="(max-width: 900px) 90vw, 420px" />
            </div>
            <span className="tag" style={{ '--c': 'var(--pink)', left: -6, top: -14 }}>★ Profile</span>
            <span className="tag dark" style={{ right: -6, bottom: 8, transform: 'rotate(3deg)' }}>{site.location}</span>
          </figure>

          <div className="about__col">
            <p className="h-md reveal" style={{ textTransform: 'none', fontFamily: 'var(--f-body)', fontWeight: 600, lineHeight: 1.3 }}>
              I’m an independent technology builder in Bengaluru. I work where AI, software, automation and business meet — turning ideas into systems that actually run.
            </p>

            <div className="themes">
              {THEMES.map((t) => (
                <article key={t.t} className={cx('theme box reveal', `c-${t.c}`)}>
                  <h3>{t.t}</h3>
                  <p>{t.d}</p>
                </article>
              ))}
            </div>

            <div ref={statsRef} className="stats">
              {stats.map((s) => (
                <div key={s.l} className={cx('stat box reveal', `c-${s.c}`)}>
                  <b>
                    <Count to={s.n} run={statsIn} />
                    {s.approx ? '+' : ''}
                  </b>
                  <span>{s.l}</span>
                </div>
              ))}
            </div>

            <div className="philo box reveal" style={{ '--c': 'var(--white)' }}>
              <h3 className="h-md">Development philosophy</h3>
              <ul>
                <li>Ship a working version, then make it better.</li>
                <li>Run models locally when privacy and cost matter.</li>
                <li>Ground AI in real data — retrieval beats guessing.</li>
                <li>Build for the business owner, not just for the demo.</li>
              </ul>
            </div>

            <div ref={skillsRef} className="skills box reveal" style={{ '--c': 'var(--paper)' }}>
              <h3 className="h-md">Focus areas</h3>
              {SKILLS.map((s) => (
                <div key={s.k} className={`c-${s.c}`}>
                  <div className="skill__top">
                    <span>{s.k}</span>
                    <span>{s.v}%</span>
                  </div>
                  <div className="skill__bar" role="img" aria-label={`${s.k}: ${s.v} percent`}>
                    <i style={{ width: skillsIn ? `${s.v}%` : 0 }} />
                  </div>
                </div>
              ))}
              <span className="skill__note">Self-assessed visual indicators — not test scores.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
