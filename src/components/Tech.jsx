import { useMemo, useState } from 'react';
import { techGroups, techCount } from '../data/tech.js';
import { projects } from '../data/projects.js';
import SectionHead from './SectionHead.jsx';

export default function Tech({ onOpen }) {
  const [gid, setGid] = useState(techGroups[0].id);
  const [pick, setPick] = useState(null);
  const group = techGroups.find((g) => g.id === gid);

  const uses = useMemo(() => (pick ? projects.filter((p) => p.stack.includes(pick)) : []), [pick]);

  const choose = (id) => {
    setGid(id);
    setPick(null);
  };

  return (
    <section id="tech" className="section tech" aria-labelledby="tech-h">
      <div className="wrap">
        <SectionHead n="04" label="Command centre" id="tech-h" color="cyan" text="Pick a module, then tap any technology to see which archive entries use it.">
          What I <span className="hl cyan" style={{ color: '#111' }}>build</span> with
        </SectionHead>

        <div className="term reveal">
          <div className="term__bar">
            <i /><i /><i />
            <span>gaurav@stack:~</span>
          </div>
          <div className="tabs" role="tablist" aria-label="Technology groups">
            {techGroups.map((g) => (
              <button key={g.id} role="tab" id={`tab-${g.id}`} aria-selected={gid === g.id} aria-controls="tech-panel" className="tab" style={{ '--c': `var(--${g.color})` }} onClick={() => choose(g.id)}>
                {g.label}
              </button>
            ))}
          </div>
          <div className="term__out" id="tech-panel" role="tabpanel" aria-labelledby={`tab-${gid}`}>
            <p className="term__prompt">
              <b>$</b> stack --{group.cmd} --list ({group.items.length}) <span className="caret" />
            </p>
            <div className="badges" key={gid}>
              {group.items.map((t, i) => (
                <button key={t} className="badge" style={{ '--c': `var(--${group.color})`, '--i': i }} aria-pressed={pick === t} onClick={() => setPick(pick === t ? null : t)}>
                  {t}
                </button>
              ))}
            </div>
            {pick && (
              <div className="uses">
                <span>
                  <b style={{ color: 'var(--yellow)' }}>&gt;</b> {pick} is used in {uses.length || 'no'} archive {uses.length === 1 ? 'entry' : 'entries'}
                  {uses.length === 0 ? ' (yet — listed as a capability)' : ':'}
                </span>
                <div className="uses__list">
                  {uses.map((p) => (
                    <button key={p.id} onClick={() => onOpen(`project/${p.id}`)}>
                      {p.n} {p.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="tech__stats">
          <div className="box c-yellow"><b>{techCount}</b><span>Technologies</span></div>
          <div className="box c-pink"><b>{techGroups.length}</b><span>Stack layers</span></div>
          <div className="box c-mint"><b>{projects.length}</b><span>Archive entries</span></div>
          <div className="box c-lavender"><b>GPU</b><span>Local inference</span></div>
        </div>
      </div>
    </section>
  );
}
