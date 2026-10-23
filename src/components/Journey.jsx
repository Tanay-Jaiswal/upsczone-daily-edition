import { ListChecks, PenLine, MessagesSquare } from 'lucide-react';
import { useUI } from '../context.js';

const STAGES = [
  {
    icon: ListChecks,
    stage: 'Prelims',
    title: 'Build breadth, fast',
    body: 'Daily mapped news, topic-wise PYQs and short adaptive MCQ sets that sharpen elimination.',
    tools: ['Current Affairs', 'PYQ Explorer', 'AI Mock Tests'],
  },
  {
    icon: PenLine,
    stage: 'Mains',
    title: 'Write with structure',
    body: 'Answer practice with AI feedback on structure and examples, plus notes organised by GS paper.',
    tools: ['Answer Evaluation', 'Smart Notes', 'Essay themes'],
  },
  {
    icon: MessagesSquare,
    stage: 'Interview',
    title: 'Think out loud',
    body: 'Revisit the issues you followed all year and practise explaining them clearly in your own words.',
    tools: ['Issue digests', 'Doubt Solver', 'Bilingual notes'],
  },
];

export default function Journey() {
  const { t } = useUI();
  return (
    <section id="journey" aria-labelledby="journey-title" className="edition py-20 lg:py-28">
      <div className="max-w-2xl">
        <p className="kicker">{t('journey.kicker')}</p>
        <h2 id="journey-title" className="section-title mt-3">
          {t('journey.title')}
        </h2>
      </div>

      <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        {/* Connecting line: vertical on mobile, horizontal from tablet up */}
        <span aria-hidden="true" className="absolute bottom-6 left-6 top-6 w-px bg-rule md:hidden" />
        <span aria-hidden="true" className="absolute left-6 right-6 top-6 hidden h-px bg-rule md:block" />
        {STAGES.map(({ icon: Icon, stage, title, body, tools }, i) => (
          <li key={stage} className="relative pl-20 md:pl-0">
            <div className="absolute left-0 top-0 md:static">
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink bg-paper">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <p className="kicker md:mt-6">
              Stage {i + 1} · {stage}
            </p>
            <h3 className="mt-2 font-serif text-2xl font-semibold">{title}</h3>
            <p className="mt-2 leading-relaxed text-ink-muted">{body}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {tools.map((tool) => (
                <li key={tool} className="rounded-full border border-rule px-3 py-1 text-xs font-medium">
                  {tool}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
