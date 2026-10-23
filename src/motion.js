import { useEffect } from 'react';

const STAGGER_MS = 80;
const MAX_STAGGER_STEPS = 5;

export const motionEnabled = typeof window !== 'undefined' && 'IntersectionObserver' in window;

// Reveals every [data-reveal] element once it scrolls into view. Elements that
// arrive in the same observer batch get a small stagger. State is written to a
// data attribute React does not manage, so re-renders never hide revealed content.
export function useScrollReveal() {
  useEffect(() => {
    if (!motionEnabled) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .forEach((entry, i) => {
            const el = entry.target;
            el.style.setProperty('--delay', `${Math.min(i, MAX_STAGGER_STEPS) * STAGGER_MS}ms`);
            el.setAttribute('data-in', '');
            observer.unobserve(el);
          });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
