import { ArrowDown, ArrowRight } from 'lucide-react';
import { useUI } from '../context.js';
import { news } from '../data/news.js';
import NewsCard from './NewsCard.jsx';

export default function Hero() {
  const { t, lang, openSoon } = useUI();
  const today = new Intl.DateTimeFormat(lang === 'hi' ? 'hi-IN' : 'en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());
  const now = new Date();
  const isoDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  const goToQuiz = (e) => {
    e.preventDefault();
    const target = document.getElementById('sample-quiz');
    target?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    target?.focus({ preventScroll: true });
  };

  return (
    <section id="top" aria-labelledby="hero-title" className="edition pb-16 pt-6 sm:pt-10 lg:pb-24">
      {/* Masthead strip */}
      <div className="double-rule flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-rule py-2 text-xs text-ink-muted">
        <span className="font-semibold uppercase tracking-[0.18em]">Vol. I · Concept edition</span>
        <span className="hidden font-serif italic sm:inline">For UPSC Civil Services aspirants</span>
        <span>Current affairs · PYQs · Notes · Mocks</span>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-0">
        <div className="lg:col-span-7 lg:pr-12">
          <p className="kicker">
            {t('hero.edition')} · <time dateTime={isoDate}>{today}</time>
          </p>
          <h1
            id="hero-title"
            className="hero-title mt-4 font-serif text-[2.6rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {t('hero.titleBefore')}
            <span className="marker whitespace-nowrap">{t('hero.titleMark')}</span>
            {t('hero.titleAfter')}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted sm:text-xl">{t('hero.sub')}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button type="button" onClick={() => openSoon("Today's edition")} className="btn-primary px-6 py-3.5 text-base">
              {t('hero.cta')}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <a href="#sample-quiz" onClick={goToQuiz} className="btn-secondary px-6 py-3.5 text-base">
              {t('hero.try')}
              <ArrowDown className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>

          {/* How one story connects, in one line */}
          <ol className="mt-10 flex flex-wrap items-center gap-2 text-sm text-ink-muted" aria-label="How a story connects">
            {['News', 'GS syllabus', 'PYQs', 'Practice'].map((step, i, arr) => (
              <li key={step} className="flex items-center gap-2">
                <span className="rounded-full border border-rule bg-white/70 px-3 py-1 font-medium text-ink">{step}</span>
                {i < arr.length - 1 && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-5 lg:border-l lg:border-rule lg:pl-12">
          <div className="flex items-baseline justify-between">
            <h2 className="kicker">{t('hero.frontPage')}</h2>
            <span className="label-sample">Sample</span>
          </div>
          <div
            className="no-scrollbar -mx-4 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
            tabIndex={0}
            role="region"
            aria-label="Sample news stories"
          >
            {news.map((item, i) => (
              <NewsCard key={item.id} item={item} index={i} />
            ))}
          </div>
          <p className="mt-3 text-xs italic text-ink-muted">{t('hero.caption')}</p>
        </div>
      </div>
    </section>
  );
}
