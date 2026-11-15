import { useRef } from 'react';
import { useInView } from '../hooks/useInView.js';
import { cx } from '../lib/cx.js';

export default function Marquee({ items, tone }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const row = items.map((t, i) => (
    <span key={i}>
      {t}
      <i>✦</i>
    </span>
  ));
  return (
    <div ref={ref} className={cx('marquee', tone, !inView && 'is-paused')} aria-hidden="true">
      <div className="marquee__track">
        {row}
        {row}
        {row}
        {row}
      </div>
    </div>
  );
}
