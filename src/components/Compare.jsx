import { Check, Minus, ArrowRight } from 'lucide-react';
import { useUI } from '../context.js';
import { comparison, alternativesNote } from '../data/compare.js';
import { Wordmark } from './Navbar.jsx';
import FAQ from './FAQ.jsx';

// The UPSC ZONE AI column is drawn as one raised "clipping": ink border plus the
// same hard offset shadow as the sample quiz card, stitched across table cells.
const CLIP_SIDES = 'border-x-2 border-ink bg-white shadow-[6px_0_0_0_#1C1B19]';

function Answer({ ours, why, whyLabel }) {
  return (
    <div className="grid grid-cols-[1.25rem_1fr] gap-x-3 gap-y-2">
      <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-success text-white">
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

  return (
    <section id="compare" aria-labelledby="compare-title" className="edition py-20 lg:py-28">
      <div className="max-w-2xl">
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
            <tr>
              <th scope="col" className="double-rule pb-5 pr-8 pt-6 align-bottom font-serif text-base font-normal italic text-ink-muted">
                {t('compare.colQuestion')}
              </th>
              <th scope="col" className="double-rule pb-5 pr-8 pt-6 align-bottom font-serif text-base font-normal italic text-ink-muted">
                {t('compare.colOthers')}
              </th>
              <th
                scope="col"
                className="rounded-t-2xl border-x-2 border-t-2 border-ink bg-highlighter px-7 pb-5 pt-6 align-bottom shadow-[6px_0_0_0_#1C1B19]"
              >
                <span className="sr-only">UPSC ZONE AI</span>
                <span aria-hidden="true" className="flex items-end justify-between gap-4">
                  <Wordmark className="text-2xl [&>span:last-child]:bg-ink [&>span:last-child]:text-highlighter" />
                  <span className="hidden font-serif text-sm font-normal italic text-ink lg:inline">and why it matters</span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((row, i) => (
              <tr key={row.question} className="group">
                <th
                  scope="row"
                  className="border-t border-rule py-7 pr-8 align-top font-serif text-xl font-semibold leading-snug text-ink"
                >
                  {row.question}
                </th>
                <td className="border-t border-rule py-7 pr-8 align-top">
                  <Usual text={row.others} />
                </td>
                <td
                  className={`${CLIP_SIDES} px-7 py-7 align-top transition-colors group-hover:bg-paper ${
                    i === 0 ? 'border-t-2 border-t-ink' : 'border-t border-t-rule'
                  } ${i === last ? 'rounded-b-2xl border-b-2 shadow-[6px_0_0_0_#1C1B19,6px_6px_0_0_#1C1B19]' : ''}`}
                >
                  <Answer ours={row.ours} why={row.why} whyLabel={t('compare.why')} />
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={2} className="border-t border-rule pr-8 pt-8 align-top text-sm leading-relaxed text-ink-muted">
                {alternativesNote} Good teachers and mentors still matter; the edition is built to work alongside them.
              </td>
              <td className="pt-8 align-top">
                <button
                  type="button"
                  onClick={() => openSoon("Today's edition")}
                  className="btn-primary w-full py-3.5 text-base"
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
          <li key={row.question} className="double-rule pt-5">
            <h3 className="font-serif text-xl font-semibold leading-snug">{row.question}</h3>
            <p className="mt-4 font-serif text-sm italic text-ink-muted">{t('compare.colOthers')}</p>
            <div className="mt-2">
              <Usual text={row.others} />
            </div>
            <div className="mr-[6px] mt-5 overflow-hidden rounded-xl border-2 border-ink bg-white shadow-[6px_6px_0_0_#1C1B19]">
              <div className="bg-highlighter px-4 py-2.5">
                <Wordmark className="text-lg [&>span:last-child]:bg-ink [&>span:last-child]:text-highlighter" />
              </div>
              <div className="p-4">
                <Answer ours={row.ours} why={row.why} whyLabel={t('compare.why')} />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8 space-y-5 md:hidden">
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
