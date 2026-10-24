import { ArrowRight, Check, Target, PenLine, Newspaper, NotebookPen, Calculator, MessagesSquare, Compass } from 'lucide-react';
import { useUI } from '../context.js';
import { learningPaths } from '../data/learning.js';
import { RailArrows, RailTrack, useCarousel } from './CardRail.jsx';

const ICONS = {
  target: Target,
  pen: PenLine,
  news: Newspaper,
  notebook: NotebookPen,
  calculator: Calculator,
  chat: MessagesSquare,
};

// Dev-only switch to review the empty state: open the dev server with ?empty.
const showEmpty = import.meta.env.DEV && new URLSearchParams(window.location.search).has('empty');

function PathCard({ path }) {
  const { openSoon } = useUI();
  const Icon = ICONS[path.icon] ?? Compass;
  return (
    <article className="group/card flex h-full flex-col rounded-2xl border border-rule bg-paper p-6 transition duration-200 hover:-translate-y-1 hover:border-ink/40 hover:shadow-lift">
      <div className="flex items-center justify-between gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink bg-white transition-colors duration-200 group-hover/card:bg-highlighter">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="rounded-full border border-rule bg-white px-2.5 py-0.5 text-xs font-medium text-ink-muted">{path.category}</span>
      </div>
      <h3 className="mt-5 font-serif text-2xl font-semibold leading-tight">{path.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{path.blurb}</p>
      <ul className="mt-5 space-y-2 text-sm" aria-label={`${path.title} includes`}>
        {path.includes.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <Check className="h-4 w-4 shrink-0 text-success" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => openSoon(`Learning path: ${path.title}`)}
        className="mt-auto inline-flex items-center gap-1.5 self-start pt-6 text-sm font-semibold text-inkblue hover:underline [&>svg]:transition-transform hover:[&>svg]:translate-x-1"
      >
        Explore path
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">: {path.title} (opens a coming-soon note)</span>
      </button>
    </article>
  );
}

export default function LearningPaths() {
  const { t } = useUI();
  const rail = useCarousel();
  const items = showEmpty ? [] : learningPaths;

  return (
    <section
      id="paths"
      aria-labelledby="paths-title"
      className="border-y border-rule bg-white/60 py-20 lg:py-24"
    >
      <div className="edition">
        <div data-reveal className="reveal flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="kicker">{t('paths.kicker')}</p>
            <h2 id="paths-title" className="section-title mt-3">
              {t('paths.title')}
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-ink-muted">{t('paths.sub')}</p>
          </div>
          <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
            <span className="label-sample">Concept paths</span>
            {items.length > 0 && <RailArrows rail={rail} label="learning paths" />}
          </div>
        </div>

        <div data-reveal className="reveal mt-10">
          {items.length > 0 ? (
            <RailTrack
              rail={rail}
              label="Learning paths"
              itemClass="w-[82%] sm:w-[calc((100%-2.5rem)/2.2)] lg:w-[calc((100%-3.75rem)/3.2)] xl:w-[calc((100%-5rem)/4.2)]"
            >
              {items.map((path) => (
                <PathCard key={path.id} path={path} />
              ))}
            </RailTrack>
          ) : (
            <div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-rule px-6 py-14 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-rule bg-white">
                <Compass className="h-5 w-5 text-ink-muted" aria-hidden="true" />
              </span>
              <p className="mt-4 font-serif text-xl font-semibold">Learning paths are on their way</p>
              <p className="mt-1 max-w-sm text-sm text-ink-muted">
                Until then, the daily edition and the Syllabus Map below are the best place to start.
              </p>
            </div>
          )}
          {items.length > 0 && (
            <p className="mt-4 text-xs text-ink-muted">
              Paths describe how the concept&rsquo;s tools fit together. They are not yet available to join, and no
              duration, lesson count or price is promised.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
