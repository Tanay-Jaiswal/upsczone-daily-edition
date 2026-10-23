import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useUI } from '../context.js';
import { faq } from '../data/faq.js';

export default function FAQ() {
  const { t } = useUI();
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" aria-labelledby="faq-title" className="edition py-20 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="kicker">{t('faq.kicker')}</p>
          <h2 id="faq-title" className="section-title mt-3">
            {t('faq.title')}
          </h2>
          <p className="mt-4 text-ink-muted">
            Still unsure? Write to{' '}
            <a href="mailto:info@upsczone.in" className="font-semibold text-inkblue underline underline-offset-4">
              info@upsczone.in
            </a>
            .
          </p>
        </div>
        <div className="double-rule lg:col-span-8">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-rule">
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left font-serif text-lg font-semibold sm:text-xl"
                  >
                    {item.q}
                    <Plus
                      className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? 'rotate-45' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  hidden={!isOpen}
                  className="pb-6 pr-10 leading-relaxed text-ink-muted"
                >
                  {item.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
