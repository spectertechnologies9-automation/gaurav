import { useEffect, useState } from 'react';
import { site } from '../data/site.js';
import { cx } from '../lib/cx.js';
import { lockScroll, scrollToTarget } from '../lib/motion.js';

export const NAV = [
  { id: 'top', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'companies', label: 'Companies' },
  { id: 'archive', label: 'Projects' },
  { id: 'tech', label: 'Stack' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'contact', label: 'Contact' },
];

export default function Header({ active }) {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    lockScroll(true);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 980 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    // let the menu release the scroll lock before scrolling
    setTimeout(() => (id === 'top' ? scrollToTarget(document.body) : scrollToTarget(`#${id}`)), open ? 60 : 0);
    if (id === 'top') window.scrollTo({ top: 0 });
  };

  return (
    <>
      <header className={cx('header', (stuck || open) && 'is-stuck', open && 'is-open')}>
        <div className="header__bar">
          <a href="#top" className="brand" onClick={go('top')} aria-label={`${site.name} — home`}>
            <span className="brand__mark">{site.shortName}</span>
            <span className="brand__txt">{site.name}</span>
          </a>
          <nav className="nav" aria-label="Primary">
            {NAV.slice(1, -1).map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={go(n.id)} className={cx(active === n.id && 'is-active')} aria-current={active === n.id ? 'true' : undefined}>
                {n.label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="btn sm header__cta" onClick={go('contact')} style={{ '--c': 'var(--pink)' }}>
            Let’s talk →
          </a>
          <button className="burger" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
            <span />
          </button>
        </div>
      </header>

      <div id="mobile-menu" className={cx('menu', open && 'is-open')} aria-hidden={!open} {...(!open ? { inert: '' } : {})}>
        <nav aria-label="Mobile">
          <ol>
            {NAV.map((n, i) => (
              <li key={n.id}>
                <a href={`#${n.id}`} onClick={go(n.id)} className={cx(active === n.id && 'is-active')} aria-current={active === n.id ? 'true' : undefined} tabIndex={open ? 0 : -1}>
                  <span>{n.label}</span>
                  <small>{String(i + 1).padStart(2, '0')}</small>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="menu__foot">
          <span className="tag dark" style={{ alignSelf: 'start' }}>
            <span className="pulse" /> {site.status}
          </span>
          <span className="eyebrow">{site.location}</span>
        </div>
      </div>
    </>
  );
}
