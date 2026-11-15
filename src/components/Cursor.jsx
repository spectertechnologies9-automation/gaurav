import { useEffect, useRef } from 'react';
import { isFinePointer, prefersReducedMotion } from '../lib/motion.js';

/** Brutalist cursor: a square that grows into a pink diamond over interactive things. Fine pointers only. */
export default function Cursor() {
  const ref = useRef(null);

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return undefined;
    const el = ref.current;
    document.documentElement.classList.add('has-cursor');
    let x = -100;
    let y = -100;
    let cx = x;
    let cy = y;
    let raf = 0;
    let running = false;

    const tick = () => {
      cx += (x - cx) * 0.28;
      cy += (y - cy) * 0.28;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      if (Math.abs(x - cx) > 0.1 || Math.abs(y - cy) > 0.1) raf = requestAnimationFrame(tick);
      else running = false;
    };
    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    const over = (e) => {
      const hot = e.target.closest?.('a, button, [role="button"], select, summary, .pcard, .co');
      el.classList.toggle('is-link', !!hot && !e.target.closest('input'));
    };
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
    };
  }, []);

  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <div className="cursor__dot" />
    </div>
  );
}
