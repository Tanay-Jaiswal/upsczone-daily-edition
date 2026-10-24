import { useEffect } from 'react';
import { CalendarDays, Clock, PlayCircle, Radio, ArrowRight, VideoOff } from 'lucide-react';
import { useUI } from '../context.js';
import { todaysClasses } from '../data/learning.js';
import { RailArrows, RailTrack, useCarousel } from './CardRail.jsx';

const STATUS = {
  live: { label: 'Live now', className: 'bg-live text-white' },
  upcoming: { label: 'Upcoming', className: 'bg-inkblue/10 text-inkblue' },
  completed: { label: 'Completed', className: 'bg-ink/[0.06] text-ink-muted' },
};

// Dev-only switch to review the empty state: open the dev server with ?empty.
const showEmpty = import.meta.env.DEV && new URLSearchParams(window.location.search).has('empty');

function StatusBadge({ status }) {
  const s = STATUS[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 ${s.className}`}>
      {status === 'live' && (
        <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
          <span className="live-ping absolute inset-0 rounded-full bg-white" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-white" />
        </span>
      )}
      {s.label}
    </span>
  );
}

function ClassAction({ item }) {
  const { openSoon } = useUI();
  if (item.status === 'completed' && !item.recording) {
    return (
      <p className="flex h-11 items-center gap-2 text-sm font-medium text-ink-muted">
        <VideoOff className="h-4 w-4" aria-hidden="true" />
        No recording for this class
      </p>
    );
  }
  const action =
    item.status === 'live'
      ? { label: 'Join class', icon: Radio, className: 'btn-primary' }
      : item.status === 'upcoming'
        ? { label: 'View details', icon: ArrowRight, className: 'btn-secondary' }
        : { label: 'Watch recording', icon: PlayCircle, className: 'btn-secondary' };
  const Icon = action.icon;
  return (
    <button
      type="button"
      onClick={() => openSoon(`${action.label}: ${item.title}`)}
      className={`${action.className} w-full py-2.5`}
    >
      {action.label}
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only"> for {item.title} (preview only, opens a coming-soon note)</span>
    </button>
  );
}

function ClassCard({ item }) {
  const live = item.status === 'live';
  return (
    <article
      className={`flex h-full flex-col rounded-2xl border bg-white p-5 transition duration-200 hover:-translate-y-1 hover:shadow-lift sm:p-6 ${
        live ? 'border-ink shadow-[4px_4px_0_0_#1C1B19] hover:shadow-[4px_4px_0_0_#1C1B19]' : 'border-rule hover:border-ink/40'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="truncate text-xs font-semibold uppercase tracking-[0.14em] text-inkblue">{item.subject}</p>
        <StatusBadge status={item.status} />
      </div>
      <h3 className="mt-4 font-serif text-xl font-semibold leading-snug">{item.title}</h3>
      <dl className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-muted">
        <div className="flex items-center gap-1.5">
          <dt className="sr-only">Time</dt>
          <Clock className="h-4 w-4" aria-hidden="true" />
          <dd className="font-medium text-ink">{item.time}</dd>
        </div>
        <div>
          <dt className="sr-only">Duration</dt>
          <dd>{item.durationMin} min</dd>
        </div>
        <div>
          <dt className="sr-only">Level</dt>
          <dd className="rounded-full border border-rule px-2.5 py-0.5 text-xs font-medium text-ink">{item.level}</dd>
        </div>
      </dl>
      <div className="mt-5 flex items-center gap-3 border-t border-dashed border-rule pt-4">
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-highlighter font-serif text-sm font-bold"
        >
          {item.subject.charAt(0)}
        </span>
        <p className="min-w-0 flex-1 text-sm">
          <span className="block font-semibold">{item.faculty}</span>
          <span className="text-xs text-ink-muted">Faculty to be announced</span>
        </p>
      </div>
      <div className="mt-auto pt-5">
        <ClassAction item={item} />
        {item.status !== 'completed' || item.recording ? (
          <p className="mt-2 text-center text-[11px] text-ink-muted">Preview only: classes are not live yet</p>
        ) : (
          <p className="mt-2 text-center text-[11px] text-ink-muted">&nbsp;</p>
        )}
      </div>
    </article>
  );
}

export default function TodaysClasses() {
  const { t, lang } = useUI();
  const rail = useCarousel();
  const items = showEmpty ? [] : todaysClasses;

  const now = new Date();
  // "Saturday, 24 October", built from parts so every locale gets one comma.
  const parts = new Intl.DateTimeFormat(lang === 'hi' ? 'hi-IN' : 'en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).formatToParts(now);
  const part = (type) => parts.find((p) => p.type === type)?.value;
  const dateLabel = `${part('weekday')}, ${part('day')} ${part('month')}`;
  const isoDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  // Open the rail on the live class (or the next one), not on what already finished.
  useEffect(() => {
    const track = rail.trackRef.current;
    const first = items.findIndex((c) => c.status !== 'completed');
    if (!track || first <= 0) return;
    const card = track.children[first];
    track.scrollLeft = card.offsetLeft - track.firstElementChild.offsetLeft;
  }, [rail.trackRef, items]);

  return (
    <section
      id="classes"
      aria-labelledby="classes-title"
      className="border-t border-rule py-20 lg:py-24"
    >
      <div className="edition">
        <div data-reveal className="reveal flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-rule bg-white px-3 py-1 text-xs font-semibold">
              <CalendarDays className="h-3.5 w-3.5 text-inkblue" aria-hidden="true" />
              <time dateTime={isoDate}>{dateLabel}</time>
            </p>
            <h2 id="classes-title" className="section-title mt-4">
              {t('classes.title')}
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-ink-muted">{t('classes.sub')}</p>
          </div>
          <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
            <span className="label-sample">Demo schedule</span>
            {items.length > 0 && <RailArrows rail={rail} label="classes" />}
          </div>
        </div>

        <div data-reveal className="reveal mt-10">
          {items.length > 0 ? (
            <RailTrack rail={rail} label="Today's classes" itemClass="w-[86%] sm:w-[calc((100%-2.5rem)/2.2)] lg:w-[calc((100%-2.5rem)/2.6)] xl:w-[calc((100%-3.75rem)/3.2)]">
              {items.map((item) => (
                <ClassCard key={item.id} item={item} />
              ))}
            </RailTrack>
          ) : (
            <div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-rule px-6 py-14 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-rule bg-white">
                <CalendarDays className="h-5 w-5 text-ink-muted" aria-hidden="true" />
              </span>
              <p className="mt-4 font-serif text-xl font-semibold">No classes on today&rsquo;s plan</p>
              <p className="mt-1 max-w-sm text-sm text-ink-muted">
                Take the day for revision. New classes will show here as soon as they are scheduled.
              </p>
            </div>
          )}
          {items.length > 0 && (
            <p className="mt-4 text-xs text-ink-muted">
              Sample classes for this design preview. Times, faculty roles and recordings are illustrative; no class is
              running and buttons open a coming-soon note.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
