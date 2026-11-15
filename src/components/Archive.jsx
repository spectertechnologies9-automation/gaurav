import { memo, useDeferredValue, useMemo, useState } from 'react';
import { CATEGORIES, STATUS, projects } from '../data/projects.js';
import { cx } from '../lib/cx.js';
import ProjectArt from './ProjectArt.jsx';
import SectionHead from './SectionHead.jsx';

const catById = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));
const PAGE = 12;

const Card = memo(function Card({ p, onOpen }) {
  const cat = catById[p.cat];
  const st = STATUS[p.status];
  return (
    <button className={cx('pcard box', `c-${cat.color}`)} onClick={() => onOpen(`project/${p.id}`)} aria-label={`${p.name}. ${cat.label}. View project details`}>
      <div className="pcard__art">
        <ProjectArt art={p.art} id={p.id} />
        <span className="pcard__n">{p.n}</span>
        <span className="pcard__status tag" style={{ '--c': `var(--${st.color})` }}>{st.label}</span>
      </div>
      <div className="pcard__body">
        <span className="pcard__cat">{cat.label}</span>
        <h3 className="pcard__name">{p.name}</h3>
        <p className="pcard__desc">{p.short}</p>
        <div className="pcard__stack">
          {p.stack.slice(0, 4).map((t) => (
            <span className="tag" key={t}>{t}</span>
          ))}
          {p.stack.length > 4 && <span className="tag dark">+{p.stack.length - 4}</span>}
        </div>
      </div>
      <div className="pcard__peek" aria-hidden="true">
        &gt; stage: {p.stage + 1}/4 · {p.stack.length} techs
      </div>
      <div className="pcard__foot">
        <span>View project</span>
        <b>→</b>
      </div>
    </button>
  );
});

export default function Archive({ onOpen }) {
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('num');
  const [limit, setLimit] = useState(PAGE);
  const dq = useDeferredValue(q);

  const counts = useMemo(() => {
    const c = { all: projects.length };
    projects.forEach((p) => (c[p.cat] = (c[p.cat] || 0) + 1));
    return c;
  }, []);

  const list = useMemo(() => {
    const term = dq.trim().toLowerCase();
    let out = projects.filter((p) => (cat === 'all' || p.cat === cat) && (!term || [p.name, p.subtitle, p.short, catById[p.cat].label, STATUS[p.status].label, ...p.stack].join(' ').toLowerCase().includes(term)));
    if (sort === 'az') out = [...out].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'stage') out = [...out].sort((a, b) => b.stage - a.stage);
    return out;
  }, [cat, dq, sort]);

  const filtering = cat !== 'all' || dq.trim() !== '';
  const shown = filtering ? list : list.slice(0, limit);
  const reset = () => {
    setCat('all');
    setQ('');
  };

  return (
    <section id="archive" className="section archive" aria-labelledby="archive-h">
      <div className="wrap">
        <SectionHead n="03" label="Master archive" id="archive-h" color="yellow" text="All 37 portfolio entries — products, modules, experiments and ventures. Some are parts of larger systems; each shows its honest development status.">
          The complete <span className="hl pink">project</span> archive
        </SectionHead>

        <div className="toolbar reveal" role="search">
          <label className="search">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" aria-hidden="true"><circle cx="10" cy="10" r="6.5" /><path d="M15 15l6 6" strokeLinecap="square" /></svg>
            <span className="sr">Search projects</span>
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, tech, status…" enterKeyHint="search" autoComplete="off" />
            {q && (
              <button type="button" onClick={() => setQ('')} aria-label="Clear search">✕</button>
            )}
          </label>
          <div className="filters" role="group" aria-label="Filter by category">
            <button className="fbtn" aria-pressed={cat === 'all'} onClick={() => setCat('all')} style={{ '--c': 'var(--yellow)' }}>
              All <em>{counts.all}</em>
            </button>
            {CATEGORIES.map((c) => (
              <button key={c.id} className="fbtn" aria-pressed={cat === c.id} onClick={() => setCat(c.id)} style={{ '--c': `var(--${c.color})` }}>
                {c.n} {c.short} <em>{counts[c.id]}</em>
              </button>
            ))}
          </div>
          <div className="toolbar__row">
            <span aria-live="polite">
              Showing {shown.length} of {list.length}
              {filtering ? ` (filtered from ${projects.length})` : ''}
            </span>
            <label className="sel">
              Sort
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="num">Archive order</option>
                <option value="az">A → Z</option>
                <option value="stage">Most advanced</option>
              </select>
            </label>
          </div>
        </div>

        {list.length === 0 ? (
          <div className="empty box">
            <h3 className="h-md">No matches</h3>
            <p>Nothing matches “{q}”. Try “WhatsApp”, “RAG” or “voice”.</p>
            <button className="btn" onClick={reset}>Reset filters</button>
          </div>
        ) : (
          <div className="p-grid" key={`${cat}-${sort}`}>
            {shown.map((p) => (
              <Card key={p.id} p={p} onOpen={onOpen} />
            ))}
          </div>
        )}

        {!filtering && limit < list.length && (
          <div className="more">
            <button className="btn" onClick={() => setLimit((l) => l + PAGE)} style={{ '--c': 'var(--pink)' }}>
              Load more ({list.length - limit} left)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
