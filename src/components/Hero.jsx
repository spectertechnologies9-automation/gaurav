import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { site } from '../data/site.js';
import { cx } from '../lib/cx.js';
import { prefersReducedMotion, scrollToTarget } from '../lib/motion.js';
import { useInView } from '../hooks/useInView.js';
import Picture from './Picture.jsx';

const HeroScene = lazy(() => import('./HeroScene.jsx'));

const PILL_COLORS = ['yellow', 'pink', 'mint', 'lavender', 'cyan'];

function webglOk() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function Hero({ ready }) {
  const root = useRef(null);
  const stage = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const inView = useInView(root);
  const [scene, setScene] = useState(false);

  // Mount the 3D scene only after first paint / idle, and only when allowed.
  useEffect(() => {
    if (!ready || prefersReducedMotion() || !webglOk()) return undefined;
    const run = () => setScene(true);
    const id = 'requestIdleCallback' in window ? window.requestIdleCallback(run, { timeout: 1200 }) : setTimeout(run, 400);
    return () => ('cancelIdleCallback' in window ? window.cancelIdleCallback(id) : clearTimeout(id));
  }, [ready]);

  // Pointer parallax (fine pointers) — writes CSS vars on layers, no React renders.
  useEffect(() => {
    const el = stage.current;
    if (!el || prefersReducedMotion() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    const layers = [...el.querySelectorAll('[data-depth]')];
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    const loop = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      pointer.current.x = x;
      pointer.current.y = y;
      layers.forEach((l) => {
        const d = parseFloat(l.dataset.depth);
        l.style.translate = `${x * d * 26}px ${y * d * 20}px`;
      });
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.002 ? requestAnimationFrame(loop) : 0;
    };
    const move = (e) => {
      const r = root.current.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
    };
  }, []);

  return (
    <section id="top" ref={root} className={cx('hero', !inView && 'is-off')} aria-labelledby="hero-title">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <div className="hero__meta">
            <span className="tag" style={{ '--c': 'var(--white)' }}>
              <span className="pulse" /> {site.status}
            </span>
            <span className="tag" style={{ '--c': 'var(--cyan)' }}>
              ⌖ {site.location}
            </span>
          </div>
          <p className="hero__name">{site.name}</p>
          <h1 id="hero-title" className="hero__title">
            <span className="line">I build</span>
            <span className="line">
              <span className="hl">intelligent</span>
            </span>
            <span className="line">systems.</span>
          </h1>
          <p className="hero__pillars" aria-label={site.pillars.join(', ')}>
            {site.pillars.map((p, i) => (
              <span key={p} style={{ '--c': `var(--${PILL_COLORS[i % 5]})` }}>
                {p}.
              </span>
            ))}
          </p>
          <p className="hero__desc">{site.description}</p>
          <div className="hero__cta">
            <a className="btn" href="#archive" style={{ '--c': 'var(--yellow)' }} onClick={(e) => (e.preventDefault(), scrollToTarget('#archive'))}>
              Explore my work →
            </a>
            <a className="btn" href="#companies" style={{ '--c': 'var(--white)' }} onClick={(e) => (e.preventDefault(), scrollToTarget('#companies'))}>
              The companies I’ve built
            </a>
          </div>
          <a className="hero__connect" href={site.contact.linkedin} target="_blank" rel="noopener noreferrer" style={{ order: 5 }}>
            <i aria-hidden="true">in</i> Connect on LinkedIn ↗
          </a>
          <span className="hero__scroll" aria-hidden="true">
            <i /> Scroll to explore
          </span>
        </div>

        <div className="hero__stage" ref={stage}>
          {scene && (
            <Suspense fallback={null}>
              <HeroScene pointer={pointer} />
            </Suspense>
          )}

          <div className="portrait">
            <div className="portrait__layer portrait__back" data-depth="-0.35" />
            <div className="portrait__layer portrait__mid" data-depth="-0.15" />
            <div className="portrait__layer portrait__frame" data-depth="0.4">
              <Picture slot={site.portraits.hero} sizes="(max-width: 760px) 60vw, 340px" eager />
              <div className="portrait__cap">
                <span>Player 01</span>
                <span>Builder ∞</span>
              </div>
            </div>
            <span className="tag portrait__lvl" style={{ '--c': 'var(--pink)' }}>
              ★ Main character
            </span>
          </div>

          <div className="float" style={{ left: '1%', top: '8%' }} data-depth="1.1">
            <div className="float__in" style={{ '--d': '.2s' }}>
              <div className="win">
                <div className="win__bar"><i /><i /><i /></div>
                <pre>{`const idea = ()=>\n  build(AI);\nship(idea);`}</pre>
              </div>
            </div>
          </div>
          <div className="float hide-xs" style={{ right: '0%', top: '12%' }} data-depth="0.9">
            <div className="float__in" style={{ '--d': '.9s' }}>
              <span className="chip" style={{ '--c': 'var(--lavender)' }}>◆ RAG · Voice AI</span>
            </div>
          </div>
          <div className="float hide-xs" style={{ left: '-1%', bottom: '24%' }} data-depth="1.2">
            <div className="float__in" style={{ '--d': '1.3s' }}>
              <span className="chip" style={{ '--c': 'var(--mint)' }}>Specter Automations</span>
            </div>
          </div>
          <div className="float" style={{ right: '0%', bottom: '28%' }} data-depth="1">
            <div className="float__in" style={{ '--d': '.5s' }}>
              <span className="chip" style={{ '--c': 'var(--blue)', color: '#fff' }}>Tachyon Intelligence</span>
            </div>
          </div>
          <div className="float" style={{ right: '6%', bottom: '4%' }} data-depth="1.3">
            <svg className="sticker spin" viewBox="0 0 100 100" aria-hidden="true">
              <path d="M50 4 L61 20 L80 14 L80 34 L97 42 L86 58 L96 76 L76 80 L68 98 L50 88 L32 98 L24 80 L4 76 L14 58 L3 42 L20 34 L20 14 L39 20Z" fill="#FFE500" stroke="#111" strokeWidth="4" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="float hide-xs" style={{ left: '8%', bottom: '2%' }} data-depth="0.8">
            <div className="float__in" style={{ '--d': '1.8s' }}>
              <span className="chip" style={{ '--c': 'var(--orange)' }}>GPU · Local LLMs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
