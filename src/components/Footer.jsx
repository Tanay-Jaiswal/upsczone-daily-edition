import { Mail, Send, Rss, CirclePlay, MessageCircle } from 'lucide-react';
import { useUI } from '../context.js';
import { Wordmark } from './Navbar.jsx';

const COLUMNS = [
  { title: 'Product', links: ['AI Mock Tests', 'Current Affairs', 'Smart Notes', 'PYQ Explorer', 'Answer Evaluation'] },
  { title: 'Company', links: ['About', 'Careers', 'Press kit'] },
  { title: 'Resources', links: ['UPSC syllabus guide', 'Study planner', 'Blog'] },
];

const SOCIAL = [
  { icon: CirclePlay, label: 'Video channel' },
  { icon: Send, label: 'Messaging channel' },
  { icon: MessageCircle, label: 'Community' },
  { icon: Rss, label: 'Newsletter' },
];

export default function Footer() {
  const { openSoon } = useUI();
  const year = new Date().getFullYear();
  const linkClass = 'text-sm text-paper/70 transition hover:text-paper';

  return (
    <footer className="bg-ink text-paper">
      <div className="edition py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Wordmark className="text-2xl text-paper [&>span:last-child]:text-ink" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/70">
              The daily edition for UPSC Civil Services aspirants. News, syllabus, PYQs and practice, connected.
            </p>
            <ul className="mt-6 flex gap-2" aria-label="Social channels (placeholders)">
              {SOCIAL.map(({ icon: Icon, label }) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => openSoon(label)}
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/20 text-paper/80 transition hover:border-paper hover:text-paper"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title} className="lg:col-span-2">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-highlighter">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <button type="button" onClick={() => openSoon(l)} className={linkClass}>
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-highlighter">Contact</h2>
            <a href="mailto:info@upsczone.in" className={`mt-4 inline-flex items-center gap-2 ${linkClass}`}>
              <Mail className="h-4 w-4" aria-hidden="true" /> info@upsczone.in
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-paper/15 pt-6 text-xs text-paper/60 md:flex-row md:items-center md:justify-between">
          <p>© {year} UPSC ZONE AI · Concept design by Tanay Jaiswal</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {['Privacy policy', 'Terms of use', 'Refund policy'].map((l) => (
              <li key={l}>
                <button type="button" onClick={() => openSoon(l)} className="hover:text-paper">
                  {l}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
