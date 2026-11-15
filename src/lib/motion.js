/** Shared motion helpers: Lenis instance, reduced-motion & pointer detection. */
let lenis = null;

export const mq = (q) => typeof window !== 'undefined' && window.matchMedia(q).matches;
export const prefersReducedMotion = () => mq('(prefers-reduced-motion: reduce)');
export const isFinePointer = () => mq('(hover: hover) and (pointer: fine)');
export const isSmallScreen = () => mq('(max-width: 760px)');

export function setLenis(instance) {
  lenis = instance;
}
export function getLenis() {
  return lenis;
}

/** Smooth-scroll to a selector or element, honouring the fixed header. */
export function scrollToTarget(target) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: -72, duration: 1.15 });
  } else {
    el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  }
}

let lockCount = 0;
/** Locks page scroll (modals / mobile menu). Reference-counted. */
export function lockScroll(lock) {
  lockCount = Math.max(0, lockCount + (lock ? 1 : -1));
  const locked = lockCount > 0;
  document.documentElement.classList.toggle('is-locked', locked);
  if (lenis) locked ? lenis.stop() : lenis.start();
}
