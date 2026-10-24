import { useId } from 'react';
import { useUI } from '../context.js';
import { setTheme, useTheme } from '../theme.js';

// A sun that closes into a moon. The disc shrinks and a cut-out circle slides in
// to carve the crescent; the rays retract. Everything is a CSS transform, so the
// icon animation costs nothing at rest and honours reduced motion.
function SunMoon({ dark }) {
  const maskId = useId();
  const ease = 'transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] [transform-box:fill-box] [transform-origin:center]';
  return (
    <svg viewBox="0 0 24 24" className="h-[1.15rem] w-[1.15rem]" fill="none" aria-hidden="true" focusable="false">
      <mask id={maskId}>
        <rect width="24" height="24" fill="white" />
        <circle cx="17.5" cy="6.5" r="7.6" fill="black" className={ease} style={{ transform: dark ? 'translate(0,0)' : 'translate(16px,-16px)' }} />
      </mask>
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="currentColor"
        mask={`url(#${maskId})`}
        className={ease}
        style={{ transform: dark ? 'rotate(-30deg) scale(0.92)' : 'scale(0.56)' }}
      />
      <g
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className={`${ease} transition-opacity duration-300`}
        style={{ transform: dark ? 'rotate(90deg) scale(0.4)' : 'rotate(0deg) scale(1)', opacity: dark ? 0 : 1 }}
      >
        <path d="M12 1.5v2.2M12 20.3v2.2M1.5 12h2.2M20.3 12h2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
      </g>
    </svg>
  );
}

export default function ThemeToggle({ className = '' }) {
  const { t } = useUI();
  const theme = useTheme();
  const dark = theme === 'dark';

  const toggle = (e) => {
    // The reveal starts from the middle of the button, also for keyboard activation.
    const r = e.currentTarget.getBoundingClientRect();
    setTheme(dark ? 'light' : 'dark', { x: r.left + r.width / 2, y: r.top + r.height / 2 });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? t('nav.toLight') : t('nav.toDark')}
      className={`group flex h-10 w-10 items-center justify-center rounded-full border border-rule bg-surface/60 text-ink transition duration-200 hover:border-ink hover:bg-ink hover:text-paper active:scale-90 ${className}`}
    >
      <span className="flex transition-transform duration-500 group-hover:rotate-12">
        <SunMoon dark={dark} />
      </span>
    </button>
  );
}
