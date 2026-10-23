import { ArrowRight } from 'lucide-react';
import { useUI } from '../context.js';

export default function CTABand() {
  const { t, openSoon } = useUI();
  return (
    <section aria-labelledby="cta-title" className="edition pb-20 lg:pb-28">
      <div className="relative overflow-hidden rounded-3xl bg-inkblue px-6 py-14 text-center text-white sm:px-12 lg:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, #fff 0 1px, transparent 1px 25%)',
          }}
        />
        <p className="kicker relative !text-highlighter">Tomorrow, 6:00 AM</p>
        <h2 id="cta-title" className="section-title relative mx-auto mt-4 max-w-3xl !text-white">
          {t('cta.title')}
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-lg text-white/80">{t('cta.sub')}</p>
        <button
          type="button"
          onClick={() => openSoon("Tomorrow's edition")}
          className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-highlighter px-7 py-4 text-base font-semibold text-ink transition hover:bg-white"
        >
          {t('cta.button')}
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
