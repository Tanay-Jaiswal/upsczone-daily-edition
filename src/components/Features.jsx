import { BookOpenCheck, Newspaper, NotebookPen, History, PenLine, MessageCircleQuestion, Languages, ArrowRight } from 'lucide-react';
import { useUI } from '../context.js';

function ScorePreview() {
  return (
    <div className="rounded-lg border border-rule bg-white p-3 text-xs">
      <div className="flex justify-between font-semibold">
        <span>Mock 07 · GS-III</span>
        <span className="text-inkblue">68%</span>
      </div>
      <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-rule" aria-hidden="true">
        <span className="w-[68%] bg-success" />
        <span className="w-[20%] bg-error" />
      </div>
      <p className="mt-2 text-ink-muted">Revise next: Biodiversity</p>
    </div>
  );
}

function NewsPreview() {
  return (
    <div className="rounded-lg border border-rule bg-white p-3 text-xs">
      <p className="font-serif text-sm font-semibold leading-snug">Cold chains and post-harvest loss</p>
      <div className="mt-2 flex items-center gap-1.5 text-ink-muted">
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="chip">GS-III · Agriculture</span>
      </div>
    </div>
  );
}

function NotesPreview() {
  return (
    <div className="rounded-lg border border-rule bg-white p-3 text-xs leading-relaxed">
      <p>
        Article 280 sets up a <span className="bg-highlighter px-0.5">Finance Commission every five years</span>.
      </p>
      <p className="mt-1.5 border-l-2 border-inkblue pl-2 italic text-ink-muted">Linked: GS-II · Fiscal federalism</p>
    </div>
  );
}

function PyqPreview() {
  const asked = [2015, 2017, 2018, 2020, 2022, 2023];
  return (
    <div className="flex flex-wrap gap-1.5 rounded-lg border border-rule bg-white p-3" aria-label="Sample: years a topic was asked">
      {Array.from({ length: 10 }, (_, i) => 2015 + i).map((y) => (
        <span
          key={y}
          className={`rounded px-1.5 py-0.5 text-[11px] font-semibold ${
            asked.includes(y) ? 'bg-inkblue text-white' : 'bg-rule/60 text-ink-muted'
          }`}
        >
          {y}
        </span>
      ))}
    </div>
  );
}

const MAIN = [
  {
    letter: 'A',
    icon: BookOpenCheck,
    title: 'AI Mock Tests',
    body: 'Timed tests that adapt to what you got wrong last time, so each attempt targets a real gap.',
    preview: ScorePreview,
  },
  {
    letter: 'B',
    icon: Newspaper,
    title: 'Current Affairs',
    body: 'Short daily explainers, each tagged to the GS paper and topic it belongs to.',
    preview: NewsPreview,
  },
  {
    letter: 'C',
    icon: NotebookPen,
    title: 'Smart Notes',
    body: 'Concise notes that link back to the news and questions they came from.',
    preview: NotesPreview,
  },
  {
    letter: 'D',
    icon: History,
    title: 'PYQ Explorer',
    body: 'See which years a topic was asked and how the question style changed.',
    preview: PyqPreview,
  },
];

// Broadsheet column rules: 2 columns on tablet, 4 on desktop.
const COLUMN_RULES = [
  'sm:pr-6',
  'sm:border-l sm:pl-6 lg:pr-6',
  'sm:pr-6 lg:border-l lg:pl-6',
  'sm:border-l sm:pl-6',
];

const MORE = [
  { icon: PenLine, title: 'AI Answer Evaluation', body: 'Feedback on structure, examples and word limit for Mains answers.' },
  { icon: MessageCircleQuestion, title: 'AI Doubt Solver', body: 'Ask a concept question in plain words and get a clear, sourced explanation.' },
  { icon: Languages, title: 'Hindi + English', body: 'Study in either medium and switch without losing your place.' },
];

export default function Features() {
  const { t, openSoon } = useUI();
  return (
    <section id="features" aria-labelledby="features-title" className="edition py-20 lg:py-28">
      <div className="max-w-2xl">
        <p className="kicker">{t('features.kicker')}</p>
        <h2 id="features-title" className="section-title mt-3">
          {t('features.title')}
        </h2>
      </div>

      <div className="double-rule mt-12 grid sm:grid-cols-2 lg:grid-cols-4">
        {MAIN.map(({ letter, icon: Icon, title, body, preview: Preview }, i) => (
          <article
            key={title}
            className={`flex flex-col border-b border-rule py-8 lg:border-b-0 ${COLUMN_RULES[i]}`}
          >
            <p className="kicker">Section {letter}</p>
            <div className="mt-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-paper">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="font-serif text-2xl font-semibold">{title}</h3>
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{body}</p>
            <div className="mt-5">
              <Preview />
            </div>
            <button
              type="button"
              onClick={() => openSoon(title)}
              className="mt-4 inline-flex items-center gap-1 self-start text-sm font-semibold text-inkblue underline-offset-4 hover:underline"
            >
              Open {title} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </article>
        ))}
      </div>

      <div className="mt-10 border-t border-ink pt-8">
        <h3 className="kicker">{t('features.more')}</h3>
        <ul className="mt-5 grid gap-4 md:grid-cols-3">
          {MORE.map(({ icon: Icon, title, body }) => (
            <li key={title} className="card-lift flex gap-4 rounded-xl border border-rule bg-white/60 p-5">
              <Icon className="mt-0.5 h-6 w-6 shrink-0 text-inkblue" aria-hidden="true" />
              <div>
                <p className="font-semibold">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
