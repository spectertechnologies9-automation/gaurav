import { useState } from 'react';
import { site } from '../data/site.js';

const NAME = 'Gaurav Puttannachetty (Tachyon)';

const esc = (v) => String(v).replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');

/** Builds a vCard 3.0 so the phone offers to add the contact. */
function buildVCard() {
  const { phone, email, linkedin } = site.contact;
  const tel = phone.replace(/[^\d+]/g, '');
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Puttannachetty (Tachyon);Gaurav;;;',
    `FN:${esc(NAME)}`,
    'ORG:Tachyon Intelligence',
    'TITLE:CTO',
    `TEL;TYPE=CELL,VOICE:${tel}`,
    `EMAIL;TYPE=INTERNET:${email}`,
    'URL:https://tachyonintelligence.in',
    `URL;TYPE=LinkedIn:${linkedin}`,
    'END:VCARD',
    '',
  ].join('\r\n');
}

export default function ContactDock() {
  const [saved, setSaved] = useState(false);

  const save = () => {
    const blob = new Blob([buildVCard()], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Gaurav-Puttannachetty-Tachyon.vcf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    setSaved(true);
    setTimeout(() => setSaved(false), 2600);
  };

  return (
    <div className="dock" role="group" aria-label="Quick contact">
      <button className="dock__btn dock__save" onClick={save} aria-label={`Save ${NAME} to your contacts`}>
        <span className="dock__ico" aria-hidden="true">{saved ? '✓' : '＋'}</span>
        <span className="dock__txt">{saved ? 'Saved!' : 'Save contact'}</span>
      </button>
      <a className="dock__btn dock__call" href={site.contact.phoneHref} aria-label={`Call ${site.contact.phone}`}>
        <span className="dock__ico" aria-hidden="true">☏</span>
        <span className="dock__txt">Call</span>
      </a>
      <span className="sr" role="status">{saved ? 'Contact file downloaded. Open it to add Gaurav to your contacts.' : ''}</span>
    </div>
  );
}
