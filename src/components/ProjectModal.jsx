import { CATEGORIES, STAGES, STATUS, projectById } from '../data/projects.js';
import { companies } from '../data/companies.js';
import { cx } from '../lib/cx.js';
import Modal from './Modal.jsx';
import ProjectArt from './ProjectArt.jsx';

const catById = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

export default function ProjectModal({ project: p, onClose, onOpen }) {
  const cat = catById[p.cat];
  const st = STATUS[p.status];
  const company = companies.find((c) => c.id === p.company);
  const siblings = company ? company.projects.filter((id) => id !== p.id && projectById[id]).slice(0, 8) : [];

  return (
    <Modal label={`${p.name} — project details`} onClose={onClose} topLabel={`Project ${p.n} / 37`}>
      <header className={cx('m-hero', `c-${cat.color}`)}>
        <div className="art">
          <ProjectArt art={p.art} id={p.id} />
        </div>
        <div className="m-tags">
          <span className="tag dark">№ {p.n}</span>
          <span className="tag" style={{ '--c': 'var(--white)' }}>{cat.short}</span>
          <span className="tag" style={{ '--c': `var(--${st.color})` }}>{st.label}</span>
        </div>
        <h2>{p.name}</h2>
        <p className="h-md" style={{ textTransform: 'none', fontFamily: 'var(--f-body)', fontWeight: 700 }}>{p.subtitle}</p>
      </header>

      <div className="m-body">
        <div className="m-blk box wide" style={{ '--c': 'var(--white)' }}>
          <h3>Overview</h3>
          <p>{p.overview}</p>
        </div>

        <div className="m-blk box" style={{ '--c': 'var(--yellow)' }}>
          <h3>Problem being solved</h3>
          <p>{p.problem}</p>
        </div>

        <div className="m-blk box" style={{ '--c': 'var(--white)' }}>
          <h3>Development progress</h3>
          <div className="stagebar" role="img" aria-label={`Stage: ${STAGES[p.stage]}`}>
            {STAGES.map((s, i) => (
              <div key={s} className={cx(i <= p.stage && 'on')} style={{ '--c': `var(--${st.color})` }}>
                <i />
                {s}
              </div>
            ))}
          </div>
          <p className="m-note">Status “{st.label}” is a self-assessed label. Not a launch announcement or customer claim.</p>
        </div>

        <div className="m-blk box" style={{ '--c': 'var(--paper)' }}>
          <h3>Technical architecture</h3>
          <ol className="arch" style={{ margin: 0, padding: 0 }}>
            {p.architecture.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ol>
        </div>

        <div className="m-blk box" style={{ '--c': 'var(--white)' }}>
          <h3>Features</h3>
          <ul className="m-list">
            {p.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>

        <div className="m-blk box wide" style={{ '--c': 'var(--mint)' }}>
          <h3>Technologies used</h3>
          <div className="m-tags">
            {p.stack.map((t) => (
              <span className="tag" key={t} style={{ '--c': 'var(--white)' }}>{t}</span>
            ))}
          </div>
        </div>

        <div className="m-blk box wide" style={{ '--c': 'var(--white)' }}>
          <h3>Visuals</h3>
          {p.media.length ? (
            p.media.map((m) => <img key={m.src} src={m.src} alt={m.alt} loading="lazy" style={{ border: '3px solid #111' }} />)
          ) : (
            <>
              <div className={cx('m-art', `c-${cat.color}`)}>
                <ProjectArt art={p.art} id={p.id} />
              </div>
              <p className="m-note">Generated technical artwork. No screenshots have been published for this project yet.</p>
            </>
          )}
        </div>

        {siblings.length > 0 && (
          <div className="m-blk box wide" style={{ '--c': 'var(--lavender)' }}>
            <h3>Part of {company.name}</h3>
            <div className="m-related">
              {siblings.map((id) => (
                <button key={id} className="btn sm" onClick={() => onOpen(`project/${id}`)}>
                  {projectById[id].name}
                </button>
              ))}
              <button className="btn sm" style={{ '--c': 'var(--yellow)' }} onClick={() => onOpen(`venture/${company.id}`)}>
                Open dossier →
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
