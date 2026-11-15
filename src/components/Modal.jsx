import { useEffect, useRef } from 'react';
import { lockScroll } from '../lib/motion.js';

/** Accessible modal / bottom-sheet: focus trap, Esc to close, scroll lock, restores focus. */
export default function Modal({ label, onClose, children, topLabel }) {
  const panel = useRef(null);

  useEffect(() => {
    const prev = document.activeElement;
    lockScroll(true);
    const el = panel.current;
    el.focus({ preventScroll: true });
    const onKey = (e) => {
      if (e.key === 'Escape') return onClose();
      if (e.key !== 'Tab') return;
      const f = [...el.querySelectorAll('a[href], button:not([disabled]), input, select, [tabindex="0"]')].filter((n) => n.offsetParent !== null);
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === el)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      lockScroll(false);
      prev?.focus?.({ preventScroll: true });
    };
  }, [onClose]);

  return (
    <div className="modal" role="presentation">
      <div className="modal__bg" onClick={onClose} />
      <div className="modal__panel" role="dialog" aria-modal="true" aria-label={label} tabIndex={-1} ref={panel} data-lenis-prevent>
        <div className="modal__top">
          <span>{topLabel}</span>
          <button className="modal__x" onClick={onClose} aria-label="Close details">
            Close ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
