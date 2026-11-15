import { useRef } from 'react';
import { site } from '../data/site.js';
import { cx } from '../lib/cx.js';
import { useInView } from '../hooks/useInView.js';
import { scrollToTarget } from '../lib/motion.js';

export default function Footer() {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true });
  return (
    <footer className="footer" ref={ref}>
      <div className="wrap">
        <p className="footer__big">
          Gaurav
          <br />
          <span>Puttannachetty</span>
        </p>
        <nav className="footer__contact" aria-label="Contact and links">
          <a className="hot" href={`mailto:${site.contact.email}`}>✉ {site.contact.email}</a>
          <a href={site.contact.phoneHref}>☏ {site.contact.phone}</a>
          <a href={site.contact.linkedin} target="_blank" rel="noopener noreferrer">in LinkedIn ↗</a>
          {site.companySites.filter((c) => c.url).map((c) => (
            <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer">{c.host} ↗</a>
          ))}
        </nav>
        <div className="footer__row">
          <p style={{ margin: 0, maxWidth: '34ch' }}>{site.footerLine}</p>
          <svg className={cx('sig', seen && 'is-in')} viewBox="0 0 220 70" role="img" aria-label="Animated signature">
            <path d="M30 14 C6 12 2 52 30 50 C46 50 48 36 40 34 L24 34" />
            <path d="M62 52 C70 20 78 18 86 30 C92 40 84 52 96 40 C108 28 112 28 108 42 C120 26 140 24 134 40" />
            <path d="M150 52 C176 56 196 48 214 26" />
          </svg>
          <button className="totop" onClick={() => (window.scrollTo({ top: 0 }), scrollToTarget(document.body))}>
            ↑ Back to top
          </button>
        </div>
        <p style={{ margin: '22px 0 0', opacity: 0.6, fontFamily: 'var(--f-mono)', fontSize: '.72rem' }}>
          © {new Date().getFullYear()} {site.name} · {site.location}
        </p>
      </div>
    </footer>
  );
}
