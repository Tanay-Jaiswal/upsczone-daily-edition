import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useUI } from '../context.js';

export const NAV_LINKS = [
  { id: 'features', key: 'nav.features' },
  { id: 'syllabus', key: 'nav.syllabus' },
  { id: 'journey', key: 'nav.how' },
  { id: 'stories', key: 'nav.stories' },
  { id: 'compare', key: 'nav.compare' },
];

export function Wordmark({ className = '' }) {
  return (
    <span className={`inline-flex items-baseline gap-1.5 font-serif font-bold tracking-tight ${className}`}>
      <span>UPSC&nbsp;ZONE</span>
      <span className="rounded-sm bg-highlighter px-1.5 font-sans text-[0.7em] font-bold tracking-wider">
        AI
      </span>
    </span>
  );
}

function LangToggle({ className = '' }) {
  const { lang, setLang, t } = useUI();
  return (
    <div
      role="group"
      aria-label={t('nav.language')}
      className={`inline-flex rounded-full border border-rule bg-white/60 p-0.5 text-xs font-semibold ${className}`}
    >
      {[
        ['en', 'EN', 'English'],
        ['hi', 'हिं', 'हिन्दी'],
      ].map(([code, label, full]) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-pressed={lang === code}
          aria-label={`${label} (${full})`}
          onClick={() => setLang(code)}
          className={`min-w-[2.5rem] rounded-full px-2.5 py-1.5 transition ${
            lang === code ? 'bg-ink text-paper' : 'text-ink-muted hover:text-ink'
          } ${code === 'hi' ? 'font-hindi' : ''}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const { t, openSoon } = useUI();
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Highlight the section currently in the reading band of the viewport.
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    const onTop = () => {
      setScrolled(window.scrollY > 8);
      if (window.scrollY < 200) setActive('');
    };
    onTop();
    window.addEventListener('scroll', onTop, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onTop);
    };
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    closeButtonRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      menuButtonRef.current?.focus();
    };
  }, [open]);

  return (
    <>
    <header
      className={`sticky top-0 z-50 border-b bg-paper/90 backdrop-blur transition-colors ${
        scrolled ? 'border-rule' : 'border-transparent'
      }`}
    >
      <nav aria-label="Primary" className="edition flex h-16 items-center justify-between gap-4">
        <a href="#top" className="text-xl sm:text-2xl">
          <Wordmark />
          <span className="sr-only">, back to top</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? 'true' : undefined}
                className={`relative rounded-full px-3 py-2 text-sm font-medium transition ${
                  active === l.id ? 'text-inkblue' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {t(l.key)}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded bg-inkblue transition-transform ${
                    active === l.id ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <LangToggle className="hidden sm:inline-flex" />
          <button
            type="button"
            onClick={() => openSoon('Log in')}
            className="hidden rounded px-2 py-2 text-sm font-semibold text-ink hover:text-inkblue lg:inline-block"
          >
            {t('nav.login')}
          </button>
          <button
            type="button"
            onClick={() => openSoon('Free account')}
            className="btn-primary hidden px-4 py-2.5 sm:inline-flex"
          >
            {t('nav.start')}
          </button>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t('nav.menu')}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="rounded-full p-2 text-ink hover:bg-rule/50 lg:hidden"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
    </header>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] flex h-[100dvh] flex-col bg-paper lg:hidden"
        >
          <div className="edition flex h-16 items-center justify-between border-b border-rule">
            <Wordmark className="text-xl" />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t('nav.close')}
              className="rounded-full p-2 hover:bg-rule/50"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <ul className="edition mt-6 flex-1 overflow-y-auto">
            {NAV_LINKS.map((l, i) => (
              <li key={l.id} className="border-b border-rule">
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-4 font-serif text-3xl font-semibold"
                >
                  <span className="font-sans text-xs font-semibold text-ink-muted">0{i + 1}</span>
                  {t(l.key)}
                </a>
              </li>
            ))}
          </ul>
          <div className="edition flex flex-col gap-4 pb-8 pt-4">
            <LangToggle className="self-start" />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openSoon('Log in');
                }}
                className="btn-secondary flex-1"
              >
                {t('nav.login')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openSoon('Free account');
                }}
                className="btn-primary flex-1"
              >
                {t('nav.start')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
