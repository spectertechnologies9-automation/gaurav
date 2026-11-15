import { companies, RELATION_LABEL } from '../data/companies.js';
import { projectById } from '../data/projects.js';
import { cx } from '../lib/cx.js';
import Modal from './Modal.jsx';
import ProjectArt from './ProjectArt.jsx';
import SectionHead from './SectionHead.jsx';

export default function Companies({ onOpen }) {
  return (
    <section id="companies" className="section companies" aria-labelledby="co-h">
      <div className="wrap">
        <SectionHead n="02" label="Ventures & ecosystems" id="co-h" color="white" text="The companies and product ecosystems I’m building. Each card is labelled for what it actually is — venture, product ecosystem or internal platform.">
          The companies <span className="hl pink">I’ve built</span>
        </SectionHead>
        <div className="co-grid">
          {companies.map((c) => (
            <article key={c.id} className={cx('co box reveal', `c-${c.color}`)} style={{ '--ca': `var(--${c.accent})` }}>
              <button className="co__main" onClick={() => onOpen(`venture/${c.id}`)} aria-label={`${c.name}. ${RELATION_LABEL[c.relation]}. Open company details`}>
                <div className="co__art">
                  <ProjectArt art={c.art} id={c.id} />
                </div>
                <div className="co__body">
                  <div className="co__chips">
                    <span className="tag dark">{RELATION_LABEL[c.relation]}</span>
                    {c.verified && <span className="tag" style={{ '--c': 'var(--mint)' }}>✓ Verified</span>}
                    {c.roles?.map((r) => (
                      <span key={r.title + r.period} className="tag" style={{ '--c': 'var(--white)' }}>{r.title} · {r.period}</span>
                    ))}
                  </div>
                  <h3 className="co__name">{c.name}</h3>
                  <p>{c.tagline}</p>
                  <div className="co__chips">
                    {c.focus.slice(0, 4).map((f) => (
                      <span key={f} className="tag" style={{ '--c': 'var(--white)' }}>{f}</span>
                    ))}
                  </div>
                </div>
              </button>
              <div className="co__go">
                <button onClick={() => onOpen(`venture/${c.id}`)} aria-label={`Open ${c.name} dossier`}>
                  Dossier · {c.projects.length} <b>→</b>
                </button>
                {c.url && (
                  <a href={c.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${c.host} (opens in a new tab)`}>
                    {c.host} ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
        <p className="co-note box reveal" style={{ '--c': 'var(--white)' }}>
          <span aria-hidden="true">ⓘ</span>
          <span>Roles are shown only where confirmed. Edit <code>roles</code> in <code>src/data/companies.js</code>.</span>
        </p>
      </div>
    </section>
  );
}

export function CompanyModal({ company: c, onClose, onOpen }) {
  const related = c.projects.map((id) => projectById[id]).filter(Boolean);
  return (
    <Modal label={`${c.name} — company details`} onClose={onClose} topLabel={RELATION_LABEL[c.relation]}>
      <header className={cx('m-hero', `c-${c.color}`)}>
        <div className="art">
          <ProjectArt art={c.art} id={c.id} />
        </div>
        <div className="m-tags">
          <span className="tag dark">{RELATION_LABEL[c.relation]}</span>
          {c.verified && <span className="tag" style={{ '--c': 'var(--mint)' }}>✓ Verified</span>}
        </div>
        <h2 style={c.color === 'blue' ? { color: '#fff' } : undefined}>{c.name}</h2>
        <p className="h-md" style={{ textTransform: 'none', fontFamily: 'var(--f-body)', fontWeight: 700, color: c.color === 'blue' ? '#fff' : undefined }}>{c.tagline}</p>
      </header>
      <div className="m-body">
        <div className="m-blk box wide" style={{ '--c': 'var(--white)' }}>
          <h3>What it is</h3>
          <p>{c.description}</p>
          {c.url && (
            <a className="btn" href={c.url} target="_blank" rel="noopener noreferrer" style={{ '--c': 'var(--yellow)', justifySelf: 'start' }}>
              Visit {c.host} ↗
            </a>
          )}
        </div>
        {c.roles && (
          <div className="m-blk box wide" style={{ '--c': 'var(--mint)' }}>
            <h3>My role</h3>
            <ul className="m-list">
              {c.roles.map((r) => (
                <li key={r.title + r.period}><b>{r.title}</b>&nbsp;· {r.period}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="m-blk box wide" style={{ '--c': `var(--${c.accent})` }}>
          <h3>Capabilities</h3>
          <div className="m-tags">
            {c.focus.map((f) => (
              <span key={f} className="tag" style={{ '--c': 'var(--white)' }}>{f}</span>
            ))}
          </div>
        </div>
        <div className="m-blk wide" style={{ gap: 12 }}>
          <h3>Ecosystem</h3>
          <div className="eco">
            {c.ecosystem.map((e) => (
              <div key={e.name}>
                <b>{e.name}</b>
                <span>{e.note}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="m-blk box wide" style={{ '--c': 'var(--paper)' }}>
          <h3>Related archive entries ({related.length})</h3>
          <div className="m-related">
            {related.map((p) => (
              <button key={p.id} className="btn sm" style={{ '--c': 'var(--white)' }} onClick={() => onOpen(`project/${p.id}`)}>
                {p.n} · {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
