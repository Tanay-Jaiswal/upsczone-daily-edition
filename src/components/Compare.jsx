import { useEffect, useRef } from 'react';
import { Check, Minus, ArrowRight } from 'lucide-react';
import { useUI } from '../context.js';
import { comparison, alternativesNote } from '../data/compare.js';
import { Wordmark } from './Navbar.jsx';
import FAQ from './FAQ.jsx';

// The UPSC ZONE AI column is drawn as one raised "clipping": ink border plus the
// same hard offset shadow as the sample quiz card, stitched across table cells
// (shadow lives in .cmp-clip so it can animate in).
const CLIP_SIDES = 'border-x-2 border-ink bg-surface';
// Thin reading-progress rule pinned under the navbar while the section is on screen.
function useSectionProgress(rootRef, barRef) {
  useEffect(() => {
    const root = rootRef.current;
    const bar = barRef.current;
    if (!root || !bar) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const span = rect.height - window.innerHeight + 64;
      const progress = Math.min(1, Math.max(0, (64 - rect.top) / Math.max(span, 1)));
      bar.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [rootRef, barRef]);
}

function Answer({ ours, why, whyLabel }) {
  return (
    <div className="grid grid-cols-[1.25rem_1fr] gap-x-3 gap-y-2">
      <span className="pop-in mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-success text-on-success">
        <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
      </span>
      <p className="text-[0.95rem] font-medium leading-relaxed text-ink">{ours}</p>
      <p className="col-start-2 font-serif text-[0.95rem] italic leading-relaxed text-ink">
        <span className="sr-only">{whyLabel}: </span>
        <span className="marker-static">{why}</span>
      </p>
    </div>
  );
}

function Usual({ text }) {
  return (
    <div className="grid grid-cols-[1.25rem_1fr] gap-x-3">
      <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-ink-muted/40 text-ink-muted">
        <Minus className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
      </span>
      <p className="text-[0.95rem] leading-relaxed text-ink-muted">{text}</p>
    </div>
  );
}

export default function Compare() {
  const { t, openSoon } = useUI();
  const last = comparison.length - 1;
  const sectionRef = useRef(null);
  const barRef = useRef(null);
  useSectionProgress(sectionRef, barRef);

  return (
    <section
      id="compare"
      ref={sectionRef}
      aria-labelledby="compare-title"
      className="edition relative pb-20 lg:pb-28"
    >
      <div aria-hidden="true" className="sticky top-16 z-10 h-[3px] bg-rule/60">
        <div ref={barRef} className="h-full origin-left scale-x-0 bg-inkblue" />
      </div>

      <div data-reveal className="reveal max-w-2xl pt-20 lg:pt-[6.75rem]">
        <p className="kicker">{t('compare.kicker')}</p>
        <h2 id="compare-title" className="section-title mt-3">
          {t('compare.title')}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">{t('compare.sub')}</p>
        <span className="label-sample mt-5">Illustrative comparison</span>
      </div>

      {/* Tablet and desktop: three aligned columns, answers in a raised clipping */}
      <div className="mt-14 hidden pr-[6px] md:block">
        <table className="w-full table-fixed border-separate border-spacing-0 text-left">
          <caption className="sr-only">
            Illustrative comparison of UPSC ZONE AI with typical alternatives, by common aspirant questions.
          </caption>
          <colgroup>
            <col className="w-[27%]" />
            <col className="w-[31%]" />
            <col className="w-[42%]" />
          </colgroup>
          <thead>
            <tr data-reveal>
              <th scope="col" className="double-rule pb-5 pr-8 pt-6 align-bottom font-serif text-base font-normal italic text-ink-muted">
                <span className="reveal-child block">{t('compare.colQuestion')}</span>
              </th>
              <th scope="col" className="double-rule pb-5 pr-8 pt-6 align-bottom font-serif text-base font-normal italic text-ink-muted">
                <span className="reveal-child block">{t('compare.colOthers')}</span>
              </th>
              <th
                scope="col"
                className="cmp-head cmp-clip rounded-t-2xl border-x-2 border-t-2 border-ink px-7 pb-5 pt-6 align-bottom"
              >
                <span className="sr-only">UPSC ZONE AI</span>
                <span aria-hidden="true" className="flex items-end justify-between gap-4">
                  <Wordmark className="text-2xl [&>span:last-child]:bg-band [&>span:last-child]:text-highlighter" />
                  <span className="hidden font-serif text-sm font-normal italic text-ink lg:inline">and why it matters</span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((row, i) => (
              <tr key={row.question} data-reveal className="group">
                <th
                  scope="row"
                  className="border-t border-rule py-7 pr-8 align-top font-serif text-xl font-semibold leading-snug text-ink transition-colors group-hover:text-link"
                >
                  <span className="reveal-child block">{row.question}</span>
                </th>
                <td className="border-t border-rule py-7 pr-8 align-top">
                  <div className="reveal-child">
                    <Usual text={row.others} />
                  </div>
                </td>
                <td
                  className={`${CLIP_SIDES} px-7 py-7 align-top group-hover:bg-highlighter/15 ${
                    i === 0 ? 'border-t-2 border-t-ink' : 'border-t border-t-rule'
                  } ${i === last ? 'cmp-clip-last rounded-b-2xl border-b-2' : 'cmp-clip'}`}
                >
                  <div className="reveal-child">
                    <Answer ours={row.ours} why={row.why} whyLabel={t('compare.why')} />
                  </div>
                </td>
              </tr>
            ))}
            <tr data-reveal>
              <td colSpan={2} className="border-t border-rule pr-8 pt-8 align-top text-sm leading-relaxed text-ink-muted">
                <span className="reveal-child block">
                  {alternativesNote} Good teachers and mentors still matter; the edition is built to work alongside them.
                </span>
              </td>
              <td className="pt-8 align-top">
                <button
                  type="button"
                  onClick={() => openSoon("Today's edition")}
                  className="reveal-child btn-primary w-full py-3.5 text-base"
                >
                  {t('hero.cta')}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile: one card per question, same visual language */}
      <ul className="mt-10 space-y-6 md:hidden">
        {comparison.map((row) => (
          <li key={row.question} data-reveal className="reveal double-rule pt-5">
            <h3 className="font-serif text-xl font-semibold leading-snug">{row.question}</h3>
            <p className="mt-4 font-serif text-sm italic text-ink-muted">{t('compare.colOthers')}</p>
            <div className="mt-2">
              <Usual text={row.others} />
            </div>
            <div className="cmp-clip-last mr-[6px] mt-5 overflow-hidden rounded-xl border-2 border-ink bg-surface">
              <div className="cmp-head px-4 py-2.5">
                <Wordmark className="text-lg [&>span:last-child]:bg-band [&>span:last-child]:text-highlighter" />
              </div>
              <div className="p-4">
                <Answer ours={row.ours} why={row.why} whyLabel={t('compare.why')} />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div data-reveal className="reveal mt-8 space-y-5 md:hidden">
        <p className="text-sm leading-relaxed text-ink-muted">
          {alternativesNote} Good teachers and mentors still matter; the edition is built to work alongside them.
        </p>
        <button type="button" onClick={() => openSoon("Today's edition")} className="btn-primary w-full py-3.5 text-base">
          {t('hero.cta')}
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <FAQ />
    </section>
  );
}
