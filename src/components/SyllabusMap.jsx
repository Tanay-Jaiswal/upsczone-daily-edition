import { useRef, useState } from 'react';
import { Newspaper, NotebookPen, History, Target, ArrowRight, ChevronRight } from 'lucide-react';
import { useUI } from '../context.js';
import { papers } from '../data/syllabus.js';

function Node({ icon: Icon, label, children, last }) {
  return (
    <li className="relative flex flex-1 flex-col rounded-xl border border-rule bg-white p-4">
      <p className="kicker flex items-center gap-2">
        <Icon className="h-4 w-4 text-inkblue" aria-hidden="true" />
        {label}
      </p>
      <div className="mt-2 flex-1 text-sm leading-relaxed">{children}</div>
      {!last && (
        <span
          aria-hidden="true"
          className="absolute -bottom-4 left-1/2 z-10 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full border border-rule bg-paper lg:-right-4 lg:bottom-auto lg:left-auto lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0"
        >
          <ChevronRight className="h-4 w-4 rotate-90 text-ink-muted lg:rotate-0" />
        </span>
      )}
    </li>
  );
}

export default function SyllabusMap() {
  const { t, openSoon } = useUI();
  const [paperIndex, setPaperIndex] = useState(0);
  const [topicId, setTopicId] = useState(papers[0].topics[0].id);
  const tabRefs = useRef([]);

  const paper = papers[paperIndex];
  const topic = paper.topics.find((tp) => tp.id === topicId) ?? paper.topics[0];

  const selectPaper = (i, focus = false) => {
    setPaperIndex(i);
    setTopicId(papers[i].topics[0].id);
    if (focus) tabRefs.current[i]?.focus();
  };

  // ARIA tabs keyboard pattern: arrows move and activate, Home/End jump.
  const onTabKey = (e) => {
    const last = papers.length - 1;
    const map = {
      ArrowRight: paperIndex === last ? 0 : paperIndex + 1,
      ArrowLeft: paperIndex === 0 ? last : paperIndex - 1,
      Home: 0,
      End: last,
    };
    if (e.key in map) {
      e.preventDefault();
      selectPaper(map[e.key], true);
    }
  };

  return (
    <section id="syllabus" aria-labelledby="syllabus-title" className="bg-ink py-20 text-paper lg:py-28">
      <div className="edition">
        <div data-reveal className="reveal flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="kicker !text-highlighter">{t('syllabus.kicker')}</p>
            <h2 id="syllabus-title" className="section-title mt-3 !text-paper">
              {t('syllabus.title')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-paper/75">{t('syllabus.sub')}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 self-start rounded border border-dashed border-paper/50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-paper/80 lg:self-auto">
            Illustrative data
          </span>
        </div>

        <div data-reveal className="reveal mt-10 rounded-2xl bg-paper p-4 text-ink sm:p-6 lg:p-8">
          <div
            role="tablist"
            aria-label="Syllabus papers"
            className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto border-b border-rule px-4 sm:mx-0 sm:px-0"
          >
            {papers.map((p, i) => (
              <button
                key={p.id}
                ref={(el) => (tabRefs.current[i] = el)}
                role="tab"
                type="button"
                id={`tab-${p.id}`}
                aria-selected={i === paperIndex}
                aria-controls={`panel-${p.id}`}
                tabIndex={i === paperIndex ? 0 : -1}
                onClick={() => selectPaper(i)}
                onKeyDown={onTabKey}
                className={`relative shrink-0 whitespace-nowrap px-4 py-3 text-sm font-semibold transition ${
                  i === paperIndex ? 'text-inkblue' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {p.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-2 -bottom-px h-[3px] rounded-t bg-inkblue transition-transform ${
                    i === paperIndex ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            ))}
          </div>

          <div
            role="tabpanel"
            id={`panel-${paper.id}`}
            aria-labelledby={`tab-${paper.id}`}
            tabIndex={0}
            className="pt-6"
          >
            <p className="text-sm font-medium text-ink-muted">{paper.full}</p>
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Topics">
              {paper.topics.map((tp) => {
                const on = tp.id === topic.id;
                return (
                  <button
                    key={tp.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setTopicId(tp.id)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                      on ? 'border-ink bg-highlighter text-ink' : 'border-rule bg-white hover:border-ink'
                    }`}
                  >
                    {tp.name}
                  </button>
                );
              })}
            </div>

            <div aria-live="polite" className="mt-8">
              <div key={topic.id} className="swap-in">
              <h3 className="font-serif text-2xl font-semibold">
                {topic.name}
                <span className="ml-2 align-middle font-sans text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  {paper.label}
                </span>
              </h3>
              <ol className="mt-5 flex flex-col gap-6 lg:flex-row lg:gap-6">
                <Node icon={Newspaper} label="In today's news">
                  <p className="font-serif text-base font-semibold leading-snug">{topic.news}</p>
                </Node>
                <Node icon={NotebookPen} label="Your notes">
                  <p>
                    <span className="bg-highlighter/70 px-0.5">{topic.note}</span>
                  </p>
                </Node>
                <Node icon={History} label="PYQs">
                  <ul className="flex flex-wrap gap-1.5">
                    {topic.pyqs.map((y) => (
                      <li key={y.year} className="rounded bg-inkblue px-2 py-0.5 text-xs font-semibold text-white">
                        {y.year} <span className="opacity-75">×{y.count}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs text-ink-muted">Sample counts per year</p>
                </Node>
                <Node icon={Target} label="Practice" last>
                  <p className="text-ink-muted">A 10-question drill built from this topic.</p>
                  <button
                    type="button"
                    onClick={() => openSoon(`Practice drill: ${topic.name}`)}
                    className="btn-primary mt-3 px-4 py-2"
                  >
                    Start drill <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </Node>
              </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
