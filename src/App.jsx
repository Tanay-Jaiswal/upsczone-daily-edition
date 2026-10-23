import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { UIContext } from './context.js';
import { translate } from './i18n.js';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import SampleQuiz from './components/SampleQuiz.jsx';
import Features from './components/Features.jsx';
import SyllabusMap from './components/SyllabusMap.jsx';
import Journey from './components/Journey.jsx';
import Testimonials from './components/Testimonials.jsx';
import Compare from './components/Compare.jsx';
import CTABand from './components/CTABand.jsx';
import Footer from './components/Footer.jsx';
import ComingSoonModal from './components/ComingSoonModal.jsx';

export default function App() {
  const [lang, setLang] = useState('en');
  const [soon, setSoon] = useState(null);
  const lastTrigger = useRef(null);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const openSoon = useCallback((feature) => {
    lastTrigger.current = document.activeElement;
    setSoon(feature || 'This feature');
  }, []);

  const closeSoon = useCallback(() => {
    setSoon(null);
    lastTrigger.current?.focus?.();
  }, []);

  const value = useMemo(
    () => ({ lang, setLang, t: (key) => translate(lang, key), openSoon }),
    [lang, openSoon]
  );

  return (
    <UIContext.Provider value={value}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <SampleQuiz />
        <Features />
        <SyllabusMap />
        <Journey />
        <Testimonials />
        <Compare />
        <CTABand />
      </main>
      <Footer />
      <ComingSoonModal feature={soon} onClose={closeSoon} />
    </UIContext.Provider>
  );
}
