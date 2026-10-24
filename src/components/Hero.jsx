import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useUI } from '../context.js';
import { news } from '../data/news.js';

// Engraving-style illustration for the lead story: reeds, water and a low sun.
// Drawn in the theme tokens, so it follows light and dark mode.
function WetlandPlate() {
  const reeds = Array.from({ length: 34 }, (_, i) => {
    const x = 18 + i * 17.5 + ((i * 37) % 9);
    const h = 70 + ((i * 53) % 60);
    return { x, h, lean: ((i * 29) % 13) - 6 };
  });
  return (
    <svg viewBox="0 0 640 360" className="h-full w-full" role="img" aria-label="Illustration: reeds standing in still wetland water at dawn">
      <rect width="640" height="360" className="fill-surface" />
      <circle cx="458" cy="150" r="62" className="fill-highlighter" />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`h${i}`} x1="0" x2="640" y1={226 + i * 15} y2={226 + i * 15} className="stroke-inkblue" strokeWidth={0.8 + i * 0.25} opacity={0.35 + i * 0.07} />
      ))}
      {Array.from({ length: 5 }, (_, i) => (
        <line key={`r${i}`} x1={392 + i * 6} x2={524 - i * 6} y1={238 + i * 12} y2={238 + i * 12} className="stroke-highlighter" strokeWidth="3" />
      ))}
      <path d="M0 214 C120 196 220 206 320 200 S520 190 640 206 L640 222 L0 222 Z" className="fill-ink" opacity="0.88" />
      {reeds.map((r, i) => (
        <path key={i} d={`M${r.x} 222 Q${r.x + r.lean / 2} ${222 - r.h / 2} ${r.x + r.lean} ${222 - r.h}`} className="stroke-ink" strokeWidth="1.6" fill="none" />
      ))}
      {reeds.filter((_, i) => i % 4 === 1).map((r, i) => (
        <ellipse key={`c${i}`} cx={r.x + r.lean} cy={222 - r.h - 7} rx="3.2" ry="10" className="fill-ink" />
      ))}
    </svg>
  );
}

export default function Hero() {
  const { t, lang, openSoon } = useUI();
  const now = new Date();
  const today = new Intl.DateTimeFormat(lang === 'hi' ? 'hi-IN' : 'en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(now);
  const isoDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const [lead, ...rest] = news;

  const goToQuiz = (e) => {
    e.preventDefault();
    const target = document.getElementById('sample-quiz');
    target?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    target?.focus({ preventScroll: true });
  };

  return (
    <section id="top" aria-labelledby="hero-title" className="edition pb-16 pt-5 sm:pt-8 lg:pb-24">
      {/* Folio line, as on a printed front page */}
      <div className="flex items-center justify-between gap-4 border-y border-ink py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink sm:text-xs">
        <time dateTime={isoDate}>{today}</time>
        <span className="hidden font-serif text-sm normal-case italic tracking-normal text-ink-muted md:inline">For UPSC Civil Services aspirants</span>
        <span className="text-ink-muted">Concept edition</span>
      </div>

      {/* Opening statement */}
      <div className="grid gap-8 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-10 lg:pt-16">
        <h1
          id="hero-title"
          style={{ '--i': 1 }}
          className="hero-in hero-title font-serif text-[2.75rem] font-medium leading-[0.98] tracking-[-0.025em] [font-variation-settings:'opsz'_144] sm:text-7xl lg:col-span-8 lg:text-[6.25rem]"
        >
          {t('hero.titleBefore')}
          <span className="marker">{t('hero.titleMark')}</span>
          {t('hero.titleAfter')}
        </h1>
        <div className="hero-in flex flex-col justify-end lg:col-span-4 lg:border-l lg:border-rule lg:pl-8" style={{ '--i': 2 }}>
          <p className="font-serif text-xl leading-snug text-ink-muted sm:text-2xl">{t('hero.sub')}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col">
            <button type="button" onClick={() => openSoon("Today's edition")} className="btn-primary px-6 py-3.5 text-base">
              {t('hero.cta')}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <a href="#sample-quiz" onClick={goToQuiz} className="btn-secondary px-6 py-3.5 text-base">
              {t('hero.try')}
              <ArrowDown className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Front page */}
      <div className="mt-14 border-t-[3px] border-double border-ink pt-3 lg:mt-20">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-serif text-lg font-semibold italic">{t('hero.frontPage')}</h2>
          <span className="label-sample">Sample stories</span>
        </div>

        <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-0">
          <article className="hero-in group lg:col-span-7 lg:pr-10" style={{ '--i': 3 }}>
            <figure>
              <div className="aspect-[16/9] overflow-hidden border border-ink">
                <WetlandPlate />
              </div>
              <figcaption className="mt-2 text-xs italic text-ink-muted">Illustration for the sample lead story</figcaption>
            </figure>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-link">
              {lead.paper} <span className="text-ink-muted">/</span> {lead.topic}
            </p>
            <h3 className="mt-2 font-serif text-3xl font-semibold leading-[1.1] tracking-tight sm:text-[2.6rem]">{lead.headline}</h3>
            <p className="mt-4 max-w-xl font-serif text-lg leading-relaxed text-ink-muted first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-[3.4rem] first-letter:font-semibold first-letter:leading-[0.85] first-letter:text-ink">
              {lead.summary}
            </p>
            <StoryFoot item={lead} openSoon={openSoon} />
          </article>

          <div className="lg:col-span-5 lg:border-l lg:border-rule lg:pl-10">
            {rest.map((item, i) => (
              <article
                key={item.id}
                style={{ '--i': i + 4 }}
                className={`hero-in-side ${i > 0 ? 'mt-8 border-t border-rule pt-8' : 'border-t border-rule pt-8 lg:border-t-0 lg:pt-0'}`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-link">
                  {item.paper} <span className="text-ink-muted">/</span> {item.topic}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-semibold leading-tight tracking-tight">{item.headline}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{item.summary}</p>
                <StoryFoot item={item} openSoon={openSoon} />
              </article>
            ))}

            {/* How one story connects */}
            <div className="mt-10 bg-ink/[0.04] p-5 dark:bg-surface">
              <p className="font-serif text-base font-semibold italic">How every story is filed</p>
              <ol className="mt-4 grid grid-cols-4 gap-2 text-center text-xs font-semibold" aria-label="How a story connects">
                {['News', 'GS syllabus', 'PYQs', 'Practice'].map((step, i) => (
                  <li key={step} className="border-t-2 border-inkblue pt-2">
                    <span className="block font-serif text-lg text-link">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <p className="mt-3 text-xs italic text-ink-muted">{t('hero.caption')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryFoot({ item, openSoon }) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm">
      <span className="text-xs text-ink-muted">{item.meta}</span>
      <button
        type="button"
        onClick={() => openSoon(`Practice set: ${item.topic}`)}
        className="link-slide inline-flex items-center gap-1 font-semibold text-link"
      >
        Practise related questions
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
