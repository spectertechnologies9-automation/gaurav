import { useState } from 'react';
import { timeline, timelineNote } from '../data/timeline.js';
import { cx } from '../lib/cx.js';
import SectionHead from './SectionHead.jsx';

export default function Timeline({ onOpen }) {
  const [open, setOpen] = useState('2026');
  return (
    <section id="timeline" className="section tl" aria-labelledby="tl-h">
      <div className="wrap">
        <SectionHead n="05" label="Development timeline" id="tl-h" color="white" text="Tap a year to expand it. Linked milestones open the related archive entry.">
          How it <span className="hl pink">unfolded</span>
        </SectionHead>
        <div className="tl__list">
          {timeline.map((y) => {
            const isOpen = open === y.year;
            return (
              <div key={y.year} className={cx('tl__item reveal', `c-${y.color}`)}>
                <div className="box" style={{ '--c': `var(--${y.color})` }}>
                  <button className="tl__head" aria-expanded={isOpen} aria-controls={`tl-${y.year}`} onClick={() => setOpen(isOpen ? null : y.year)}>
                    <span className="tl__year">{y.year}</span>
                    <span className="tl__ttl">
                      <b>{y.title}</b>
                      <small>{y.summary}</small>
                    </span>
                    <span className="tl__plus" aria-hidden="true">+</span>
                  </button>
                  <div id={`tl-${y.year}`} className={cx('tl__panel', isOpen && 'is-open')} role="region" aria-label={`${y.year} milestones`} {...(!isOpen ? { inert: '' } : {})}>
                    <div style={{ padding: isOpen ? '0 16px 18px' : '0 16px' }}>
                      <ul className="tl__items">
                        {y.items.map((it) => (
                          <li key={it.label}>
                            {it.project ? (
                              <button className="tl__chip" onClick={() => onOpen(`project/${it.project}`)}>{it.label}</button>
                            ) : (
                              <span className="tl__chip">
                                {it.label}
                                {it.note && <small>{it.note}</small>}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="tl__note tag" style={{ '--c': 'var(--white)', marginTop: 24, whiteSpace: 'normal' }}>⚠ {timelineNote}</p>
      </div>
    </section>
  );
}
