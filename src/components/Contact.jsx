import { site } from '../data/site.js';
import { cx } from '../lib/cx.js';
import Picture from './Picture.jsx';

const ext = { target: '_blank', rel: 'noopener noreferrer' };

function Card({ href, external, color, icon, label, value, big, className }) {
  return (
    <a className={cx('ccard', `c-${color}`, big && 'ccard--big', className)} href={href} {...(external ? ext : {})}>
      <span className="ccard__icon" aria-hidden="true">{icon}</span>
      <span className="ccard__txt">
        <b>{label}</b>
        <span>{value}</span>
      </span>
      <i className="ccard__arrow" aria-hidden="true">{external ? '↗' : '→'}</i>
    </a>
  );
}

export default function Contact() {
  const { email, phone, phoneHref, linkedin, github } = site.contact;
  const sites = site.companySites;
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-h">
      <div className="wrap contact__grid">
        <div className="contact__main">
          <span className="tag reveal" style={{ '--c': 'var(--yellow)' }}>06 · Contact</span>
          <h2 id="contact-h" className="h-xl reveal" style={{ marginTop: 14 }}>
            Have an idea? <span className="hl">Let’s build</span> something.
          </h2>
          <p className="reveal" style={{ marginTop: 18, maxWidth: '52ch', fontWeight: 600, fontSize: '1.1rem' }}>
            Interested in AI, software, automation or building something ambitious? Let’s connect.
          </p>

          <div className="ccards reveal">
            <Card big href={`mailto:${email}`} color="yellow" icon="✉" label="Email me" value={email} />
            <Card href={phoneHref} color="white" icon="☏" label="Call" value={phone} className="ccard--pink" />
            <Card href={linkedin} external color="blue" icon="in" label="LinkedIn" value="gaurav-puttannachetty" />
            {github && <Card href={github} external color="mint" icon="⌘" label="GitHub" value={github.replace(/^https?:\/\//, '')} />}
          </div>

          <div className="cta-row reveal">
            <a className="btn" href={`mailto:${email}?subject=${encodeURIComponent('Let’s build something')}`} style={{ '--c': 'var(--yellow)' }}>
              Let’s build something. →
            </a>
            <a className="btn" href={linkedin} {...ext} style={{ '--c': 'var(--pink)' }}>
              Connect with me →
            </a>
          </div>

          <div className="sites reveal">
            <span className="eyebrow">Company sites</span>
            {sites.map((s) =>
              s.url ? (
                <a key={s.name} className="sitelink" href={s.url} {...ext}>
                  <b>{s.name}</b>
                  <span>{s.host} ↗</span>
                </a>
              ) : (
                <span key={s.name} className="tag off">{s.name} · soon</span>
              )
            )}
          </div>
        </div>

        <figure className="contact__photo reveal" style={{ margin: 0 }}>
          <div className="frame box">
            <Picture slot={site.portraits.contact} sizes="(max-width: 900px) 70vw, 360px" />
          </div>
          <span className="tag dark" style={{ position: 'absolute', left: -6, bottom: 10, transform: 'rotate(-4deg)' }}>Say hi 👋</span>
        </figure>
      </div>
    </section>
  );
}
