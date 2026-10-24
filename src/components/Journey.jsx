import { useEffect, useRef, useState } from 'react';
import { ListChecks, PenLine, MessagesSquare, Check } from 'lucide-react';
import { useUI } from '../context.js';

// Small CSS-only illustrations of what each stage looks like inside the product.
function PrelimsVisual() {
  const options = [
    { label: 'A', state: 'out' },
    { label: 'B', state: 'pick' },
    { label: 'C', state: 'out' },
    { label: 'D', state: 'open' },
  ];
  return (
    <div className="grid grid-cols-2 gap-2" aria-hidden="true">
      {options.map((o) => (
        <span
          key={o.label}
          className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold ${
            o.state === 'pick'
              ? 'border-success bg-success/10 text-ink'
              : o.state === 'out'
                ? 'border-rule text-ink-muted line-through'
                : 'border-rule bg-surface text-ink'
          }`}
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-current text-[10px] no-underline">
            {o.label}
          </span>
          {o.state === 'pick' ? <Check className="h-3.5 w-3.5 text-success" /> : <span className="h-1.5 w-10 rounded bg-current opacity-30" />}
        </span>
      ))}
    </div>
  );
}

function MainsVisual() {
  return (
    <div className="relative rounded-lg border border-rule bg-surface p-4 pr-24" aria-hidden="true">
      <div className="space-y-2.5">
        <span className="block h-1.5 w-full rounded bg-ink/15" />
        <span className="block h-1.5 w-11/12 rounded bg-highlighter" />
        <span className="block h-1.5 w-10/12 rounded bg-ink/15" />
        <span className="block h-1.5 w-7/12 rounded bg-ink/15" />
      </div>
      <span className="absolute right-3 top-3 w-20 border-l-2 border-inkblue pl-2 font-serif text-[11px] italic leading-snug text-link">
        Add one example here
      </span>
    </div>
  );
}

function InterviewVisual() {
  return (
    <div className="space-y-2" aria-hidden="true">
      <p className="max-w-[85%] rounded-2xl rounded-bl-sm bg-ink px-4 py-2.5 font-serif text-sm italic text-paper">
        Why does the monsoon matter to an economy?
      </p>
      <div className="ml-auto max-w-[75%] space-y-1.5 rounded-2xl rounded-br-sm border border-rule bg-surface px-4 py-3">
        <span className="block h-1.5 w-full rounded bg-ink/15" />
        <span className="block h-1.5 w-9/12 rounded bg-ink/15" />
      </div>
    </div>
  );
}

const STAGES = [
  {
    icon: ListChecks,
    stage: 'Prelims',
    title: 'Build breadth, fast',
    body: 'Daily mapped news, topic-wise PYQs and short adaptive MCQ sets that sharpen elimination.',
    tools: ['Current Affairs', 'PYQ Explorer', 'AI Mock Tests'],
    visual: PrelimsVisual,
  },
  {
    icon: PenLine,
    stage: 'Mains',
    title: 'Write with structure',
    body: 'Answer practice with AI feedback on structure and examples, plus notes organised by GS paper.',
    tools: ['Answer Evaluation', 'Smart Notes', 'Essay themes'],
    visual: MainsVisual,
  },
  {
    icon: MessagesSquare,
    stage: 'Interview',
    title: 'Think out loud',
    body: 'Revisit the issues you followed all year and practise explaining them clearly in your own words.',
    tools: ['Issue digests', 'Doubt Solver', 'Bilingual notes'],
    visual: InterviewVisual,
  },
];

// Tracks which stage sits in the middle band of the viewport. Plain observation:
// scrolling is never intercepted.
function useActiveStage(refs) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.stage));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [refs]);
  return active;
}

export default function Journey() {
  const { t } = useUI();
  const stageRefs = useRef([]);
  const active = useActiveStage(stageRefs);

  const goTo = (i) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    stageRefs.current[i]?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  };

  return (
    <section id="journey" aria-labelledby="journey-title" className="edition py-20 lg:py-28">
      <div className="lg:grid lg:grid-cols-12 lg:gap-16">
        {/* Desktop: this column stays pinned while the stages scroll past */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div data-reveal className="reveal max-w-2xl">
              <p className="kicker">{t('journey.kicker')}</p>
              <h2 id="journey-title" className="section-title mt-3">
                {t('journey.title')}
              </h2>
              <p className="mt-4 hidden text-lg leading-relaxed text-ink-muted lg:block">
                The edition changes shape as your preparation moves from one stage to the next.
              </p>
            </div>

            <nav aria-label="Journey stages" className="relative mt-10 hidden lg:block">
              <span aria-hidden="true" className="absolute bottom-5 left-[11px] top-5 w-0.5 bg-rule" />
              <span
                aria-hidden="true"
                className="absolute left-[11px] top-5 w-0.5 origin-top bg-inkblue transition-transform duration-700"
                style={{
                  bottom: '1.25rem',
                  transform: `scaleY(${active / (STAGES.length - 1)})`,
                  transitionTimingFunction: 'var(--ease-out)',
                }}
              />
              <ol className="space-y-2">
                {STAGES.map(({ stage, title }, i) => {
                  const on = i === active;
                  const done = i < active;
                  return (
                    <li key={stage}>
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        aria-current={on ? 'step' : undefined}
                        className="group relative flex w-full items-center gap-4 rounded-lg py-2 pr-3 text-left"
                      >
                        <span
                          className={`relative z-10 h-6 w-6 shrink-0 rounded-full border-2 transition-colors duration-500 ${
                            on || done ? 'border-inkblue bg-inkblue' : 'border-rule bg-paper group-hover:border-ink'
                          }`}
                        >
                          {on && <span className="absolute inset-1.5 rounded-full bg-paper" />}
                        </span>
                        <span>
                          <span
                            className={`block text-xs font-semibold transition-colors duration-500 ${
                              on ? 'text-link' : 'text-ink-muted'
                            }`}
                          >
                            Stage {i + 1} · {stage}
                          </span>
                          <span
                            className={`block font-serif text-xl font-semibold transition-colors duration-500 ${
                              on ? 'text-ink' : 'text-ink-muted group-hover:text-ink'
                            }`}
                          >
                            {title}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>
        </div>

        {/* Stages: vertical timeline on mobile/tablet, tall scrolling panels on desktop */}
        <ol data-reveal className="relative mt-12 space-y-10 lg:col-span-7 lg:mt-0 lg:space-y-0">
          <span aria-hidden="true" className="draw-y absolute bottom-6 left-6 top-6 w-px bg-rule lg:hidden" />
          {STAGES.map(({ icon: Icon, stage, title, body, tools, visual: Visual }, i) => (
            <li
              key={stage}
              ref={(el) => (stageRefs.current[i] = el)}
              data-stage={i}
              className="relative pl-20 lg:flex lg:min-h-[60vh] lg:items-center lg:pl-0"
            >
              <span className="absolute left-0 top-0 z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink bg-paper lg:hidden">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div
                data-reveal
                className={`reveal w-full lg:rounded-2xl lg:border lg:bg-surface lg:p-10 lg:transition-[border-color,box-shadow] lg:duration-500 ${
                  i === active ? 'lg:border-inkblue/50 lg:shadow-card' : 'lg:border-rule'
                }`}
              >
                <span className="hidden h-12 w-12 items-center justify-center rounded-full border-2 border-ink bg-paper lg:flex">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="kicker lg:mt-6">
                  Stage {i + 1} · {stage}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-semibold lg:text-3xl">{title}</h3>
                <p className="mt-2 max-w-prose leading-relaxed text-ink-muted lg:text-lg">{body}</p>
                <div className="mt-6 max-w-md">
                  <Visual />
                </div>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <li key={tool} className="rounded-full border border-rule px-3 py-1 text-xs font-medium">
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
