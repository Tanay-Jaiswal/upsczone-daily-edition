import { useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';

// Light/dark theme. The class on <html> is the source of truth (index.html sets
// it before first paint); this module reads it, changes it, remembers the choice
// and lets components subscribe. No provider or library needed.
const KEY = 'upsc-theme';
const root = document.documentElement;
const listeners = new Set();

const read = () => (root.classList.contains('dark') ? 'dark' : 'light');
const subscribe = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

function apply(theme) {
  root.classList.toggle('dark', theme === 'dark');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#181715' : '#FAF7F0');
  listeners.forEach((fn) => fn());
}

function remember(theme) {
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    // Storage can be blocked (private windows); the theme still switches for this visit.
  }
}

const hasSaved = () => {
  try {
    return localStorage.getItem(KEY) !== null;
  } catch {
    return false;
  }
};

// Follow the operating system until the visitor makes a choice of their own.
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!hasSaved()) apply(e.matches ? 'dark' : 'light');
});

export function useTheme() {
  return useSyncExternalStore(subscribe, read, () => 'light');
}

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Switch theme. With the View Transitions API (and motion allowed) the new theme
// is revealed as a circle growing from `origin`; otherwise it simply switches.
export function setTheme(next, origin) {
  if (next === read()) return;
  remember(next);
  const change = () => apply(next);

  if (!document.startViewTransition || reducedMotion()) {
    change();
    return;
  }

  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? 0;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  root.classList.add('theme-switching');
  const transition = document.startViewTransition(() => flushSync(change));
  transition.ready
    .then(() =>
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 700, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' }
      )
    )
    .catch(() => {});
  transition.finished.finally(() => root.classList.remove('theme-switching'));
}
