import { ArrowRight, Check, Compass } from 'lucide-react';
import { useUI } from '../context.js';
import { learningPaths } from '../data/learning.js';
import { RailArrows, RailTrack, useCarousel } from './CardRail.jsx';

// Dev-only switch to review the empty state: open the dev server with ?empty.
const showEmpty = import.meta.env.DEV && new URLSearchParams(window.location.search).has('empty');

// Small CSS-only pictures of what each path looks like inside the product.
// Purely decorative, so hidden from assistive tech; each reacts a little when
// the card is hovered or focused.
const bar = 'block rounded bg-ink/15';
const VISUALS = {
  prelims: () => (
    <div className="grid grid-cols-2 gap-1.5">
      {['A', 'B', 'C', 'D'].map((o) => (
        <span
          key={o}
          className={`flex items-center gap-1.5 rounded-md border px-2 py-1 text-[10px] font-semibold transition-colors duration-300 ${
            o === 'B' ? 'border-success bg-success/10 group-hover/card:bg-success/20' : 'border-rule bg-surface text-ink-muted'
          }`}
        >
          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-current text-[8px]">{o}</span>
          <span className={`${bar} h-1 w-6`} />
        </span>
      ))}
    </div>
  ),
  mains: () => (
    <div className="relative space-y-1.5 pr-14">
      <span className={`${bar} h-1 w-full`} />
      <span className="block h-1 w-11/12 rounded bg-highlighter transition-[width] duration-500 group-hover/card:w-full" />
      <span className={`${bar} h-1 w-8/12`} />
      <span className="absolute right-0 top-0 w-12 border-l-2 border-inkblue pl-1.5 font-serif text-[9px] italic leading-tight text-link">add an example</span>
    </div>
  ),
  'current-affairs': () => (
    <div className="space-y-1.5">
      <span className="block font-serif text-[11px] font-semibold leading-tight">Cold chains and post-harvest loss</span>
      <span className="inline-block rounded-full bg-highlighter px-2 py-0.5 text-[9px] font-semibold transition-transform duration-300 group-hover/card:translate-x-1">GS-III</span>
    </div>
  ),
  'answer-writing': () => (
    <div className="space-y-1.5">
      {[10, 8, 6].map((w, i) => (
        <span key={w} className="flex items-center gap-1.5">
          <Check className={`h-3 w-3 text-success transition-opacity duration-300 ${i === 2 ? 'opacity-30 group-hover/card:opacity-100' : ''}`} aria-hidden="true" />
          <span className={`${bar} h-1`} style={{ width: `${w * 8}%` }} />
        </span>
      ))}
    </div>
  ),
  csat: () => (
    <div className="flex h-9 items-end gap-1.5">
      {[40, 65, 50, 85, 60].map((h, i) => (
        <span
          key={i}
          className="w-3 rounded-t bg-inkblue/70 transition-[height] duration-500 group-hover/card:bg-inkblue"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  ),
  interview: () => (
    <div className="space-y-1.5">
      <span className="block w-4/5 rounded-xl rounded-bl-sm bg-ink px-2.5 py-1 font-serif text-[10px] italic text-paper">Why does the monsoon matter?</span>
      <span className="ml-auto block w-3/5 space-y-1 rounded-xl rounded-br-sm border border-rule bg-surface px-2.5 py-1.5">
        <span className={`${bar} block h-1`} />
        <span className={`${bar} block h-1 w-2/3`} />
      </span>
    </div>
  ),
};

function PathCard({ path }) {
  const { openSoon } = useUI();
  const Visual = VISUALS[path.id];
  return (
    <article className="group/card flex h-full flex-col rounded-2xl border border-rule bg-surface p-5 shadow-card transition duration-200 hover:-translate-y-1 hover:border-ink/40 hover:shadow-lift focus-within:border-ink/40">
      <div className="relative flex h-24 items-center rounded-xl border border-rule bg-paper px-4">
        <div aria-hidden="true" className="mr-auto w-full max-w-[7.25rem]">{Visual && <Visual />}</div>
        <span className="absolute right-2 top-2 rounded-full border border-rule bg-surface px-2 py-0.5 text-[11px] font-medium text-ink-muted">{path.category}</span>
      </div>
      <h3 className="mt-5 font-serif text-2xl font-semibold leading-tight">{path.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{path.blurb}</p>
      <ul className="mt-4 space-y-2 text-sm" aria-label={`${path.title} includes`}>
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
        className="link-slide mt-auto inline-flex items-center gap-1.5 self-start pt-5 text-sm font-semibold text-link [&>svg]:transition-transform hover:[&>svg]:translate-x-1"
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
    <section id="paths" aria-labelledby="paths-title" className="py-20 lg:py-28">
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
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-rule bg-surface">
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
