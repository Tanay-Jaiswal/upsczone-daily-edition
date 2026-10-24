import { useState } from 'react';
import { Check, RotateCcw, X, ArrowRight } from 'lucide-react';
import { useUI } from '../context.js';
import { quiz } from '../data/quiz.js';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function SampleQuiz() {
  const { t, openSoon } = useUI();
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const finished = step >= quiz.length;
  const q = quiz[step];

  const choose = (i) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    setPicked(null);
    setStep((s) => s + 1);
  };

  const restart = () => {
    setStep(0);
    setPicked(null);
    setScore(0);
  };

  return (
    <section
      id="sample-quiz"
      tabIndex={-1}
      aria-labelledby="quiz-title"
      className="border-y border-rule bg-surface/50 py-16 outline-none lg:py-20"
    >
      <div className="edition grid gap-10 lg:grid-cols-12">
        <div data-reveal className="reveal lg:col-span-4">
          <p className="kicker">{t('quiz.kicker')}</p>
          <h2 id="quiz-title" className="section-title mt-3">
            {t('quiz.title')}
          </h2>
          <p className="mt-4 text-ink-muted">
            Original practice questions in the UPSC style. Pick an option to see the answer and a
            one-line explanation, just like the daily set inside the product.
          </p>
          <span className="label-sample mt-5">Sample questions</span>
        </div>

        <div data-reveal className="reveal lg:col-span-8">
          <div className="rounded-2xl border border-ink bg-paper p-5 shadow-[6px_6px_0_0_rgb(var(--shadow-ink))] sm:p-8">
            {!finished ? (
              <>
                <div className="flex items-center justify-between gap-4">
                  <span className="chip">{q.tag}</span>
                  <span className="text-sm font-medium text-ink-muted">
                    Question {step + 1} of {quiz.length}
                  </span>
                </div>
                <div className="mt-3 flex gap-1.5" aria-hidden="true">
                  {quiz.map((item, i) => (
                    <span key={item.id} className={`h-1 flex-1 rounded ${i <= step ? 'bg-inkblue' : 'bg-rule'}`} />
                  ))}
                </div>
                <fieldset className="mt-6">
                  <legend className="font-serif text-xl font-semibold leading-snug sm:text-2xl">{q.question}</legend>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {q.options.map((opt, i) => {
                      const isAnswer = i === q.answer;
                      const isPicked = i === picked;
                      let style = 'border-rule bg-surface hover:border-ink';
                      if (picked !== null) {
                        if (isAnswer) style = 'border-success bg-success/10';
                        else if (isPicked) style = 'border-error bg-error/10';
                        else style = 'border-rule bg-surface opacity-60';
                      }
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => choose(i)}
                          aria-disabled={picked !== null}
                          aria-pressed={isPicked}
                          className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left font-medium transition ${style}`}
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">
                            {LETTERS[i]}
                          </span>
                          <span className="flex-1">{opt}</span>
                          {picked !== null && isAnswer && <Check className="h-5 w-5 text-success" aria-label="Correct answer" />}
                          {picked !== null && isPicked && !isAnswer && <X className="h-5 w-5 text-error" aria-label="Your answer, incorrect" />}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div aria-live="polite" className="min-h-[1.5rem]">
                  {picked !== null && (
                    <div className="mt-6 flex flex-col gap-4 border-t border-rule pt-5 sm:flex-row sm:items-end sm:justify-between">
                      <p className="max-w-xl text-sm leading-relaxed">
                        <strong className={picked === q.answer ? 'text-success' : 'text-error'}>
                          {picked === q.answer ? 'Correct. ' : `Not quite. The answer is ${LETTERS[q.answer]}. `}
                        </strong>
                        {q.explanation}
                      </p>
                      <button type="button" onClick={next} className="btn-primary shrink-0">
                        {step === quiz.length - 1 ? 'See my score' : 'Next question'}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center" aria-live="polite">
                <p className="kicker">Your score</p>
                <p className="mt-2 font-serif text-6xl font-semibold">
                  {score}
                  <span className="text-ink-muted">/{quiz.length}</span>
                </p>
                <p className="mx-auto mt-3 max-w-md text-ink-muted">
                  {score === quiz.length
                    ? 'A clean sweep. A full mock would now find the topics that are less comfortable.'
                    : 'Every miss is a topic worth revising. A full mock would map these to your weak areas.'}
                </p>
                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  <button type="button" onClick={() => openSoon('Full AI mock test')} className="btn-primary">
                    {t('quiz.cta')}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button type="button" onClick={restart} className="btn-secondary">
                    <RotateCcw className="h-4 w-4" aria-hidden="true" /> Try again
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
