import React, { useState } from 'react';
import {
  Cpu,
  Network,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  BookOpen,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/useApp';
import {
  howAiWorksLessons,
  type HowAiWorksLesson
} from '../data/howAiWorks';

export const HowAiWorksView: React.FC = () => {
  const { setActiveTab, showToast } = useApp();

  const [activeLesson, setActiveLesson] = useState<HowAiWorksLesson>(howAiWorksLessons[0]);
  const [tokenInput, setTokenInput] = useState<string>(
    'Artificial intelligence transforms plain text into high-dimensional embedding vectors.'
  );
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Approximate token count (rule of thumb ~3.8 - 4 chars per token)
  const estimatedTokens = Math.max(1, Math.round(tokenInput.trim().length / 3.8));
  const estimatedWords = tokenInput.trim().split(/\s+/).filter(Boolean).length;

  const handleSelectQuizOption = (optIdx: number) => {
    if (quizSubmitted) return;
    setSelectedOption(optIdx);
  };

  const handleSubmitQuiz = () => {
    if (selectedOption === null) return;
    setQuizSubmitted(true);
    const isCorrect = selectedOption === activeLesson.quickQuiz.correctIndex;
    showToast(
      isCorrect ? 'Correct! Excellent comprehension.' : 'Not quite. Check the explanation below.',
      isCorrect ? 'success' : 'info'
    );
  };

  const handleResetQuiz = () => {
    setSelectedOption(null);
    setQuizSubmitted(false);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/40 text-white shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Systems & Architecture Academy</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            How AI & Modern Software Systems Actually Work
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Understand the internal mechanics of LLM inference, tokenization, context windows, distributed HTTP request lifecycles, and sandboxed code execution environments.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('model-settings')}
          className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer whitespace-nowrap"
        >
          <span>Model & AI Registry</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 4 Lessons Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {howAiWorksLessons.map(lesson => {
          const isSelected = activeLesson.id === lesson.id;
          return (
            <div
              key={lesson.id}
              onClick={() => {
                setActiveLesson(lesson);
                setSelectedOption(null);
                setQuizSubmitted(false);
              }}
              className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                isSelected
                  ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500 dark:border-indigo-500 shadow-md ring-1 ring-indigo-500/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                  {lesson.badge}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {lesson.durationMinutes} min read
                </span>
              </div>
              <h4 className="text-sm font-black text-slate-900 dark:text-white line-clamp-1">
                {lesson.title}
              </h4>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {lesson.summary}
              </p>
            </div>
          );
        })}
      </div>

      {/* Lesson Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Main Lesson Content (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{activeLesson.category.replace('_', ' ')}</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
                {activeLesson.title}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {activeLesson.summary}
              </p>
            </div>

            {/* Core Concepts Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {activeLesson.coreConcepts.map((concept, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium"
                >
                  #{concept}
                </span>
              ))}
            </div>

            {/* Plain Language Explanation */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-500" />
                Plain-Language Concept Breakdown
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeLesson.plainLanguageExplanation}
              </p>
            </div>

            {/* Real World Analogy */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider block text-amber-600 dark:text-amber-400">
                💡 Real-World Mental Model
              </span>
              <p className="text-xs sm:text-sm leading-relaxed">
                {activeLesson.realWorldAnalogy}
              </p>
            </div>

            {/* Architectural Diagram Box */}
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Network className="w-3.5 h-3.5 text-indigo-500" />
                Interactive Architectural Flow Diagram
              </h4>
              <div className="p-4 rounded-lg bg-slate-950 font-mono text-xs text-indigo-300 overflow-x-auto shadow-inner">
                <pre className="whitespace-pre">{activeLesson.interactiveDiagramMermaid}</pre>
              </div>
            </div>

            {/* Deep Dive Markdown Section */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Deep Dive: Engineering & Architecture Details
              </h3>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                {activeLesson.deepDiveMarkdown}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Widgets & Comprehension Quiz (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Interactive Token Calculator */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              Interactive Token & Cost Estimator
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Type or paste text to observe how modern LLM tokenizers chunk string bytes into tokens.
            </p>

            <textarea
              value={tokenInput}
              onChange={e => setTokenInput(e.target.value)}
              rows={4}
              className="w-full p-2.5 text-xs font-mono rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Tokens</span>
                <span className="text-base font-black text-indigo-500">{estimatedTokens}</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Words</span>
                <span className="text-base font-black text-slate-700 dark:text-slate-200">{estimatedWords}</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Chars</span>
                <span className="text-base font-black text-slate-700 dark:text-slate-200">{tokenInput.length}</span>
              </div>
            </div>
          </div>

          {/* Comprehension Quiz */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
                Lesson Comprehension Quiz
              </h4>
              {quizSubmitted && (
                <button
                  onClick={handleResetQuiz}
                  className="text-[11px] text-indigo-500 font-semibold hover:underline cursor-pointer"
                >
                  Retry
                </button>
              )}
            </div>

            <div className="space-y-3">
              <p className="font-semibold text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                {activeLesson.quickQuiz.question}
              </p>

              <div className="space-y-1.5">
                {activeLesson.quickQuiz.options.map((opt, optIdx) => {
                  const isChosen = selectedOption === optIdx;
                  const isCorrect = optIdx === activeLesson.quickQuiz.correctIndex;

                  let btnStyle = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300';
                  if (quizSubmitted) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold';
                    } else if (isChosen && !isCorrect) {
                      btnStyle = 'bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400';
                    }
                  } else if (isChosen) {
                    btnStyle = 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-600 dark:text-indigo-400 font-bold';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectQuizOption(optIdx)}
                      className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                    >
                      <span className="leading-snug">{opt}</span>
                      {quizSubmitted && isCorrect && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 ml-2" />
                      )}
                      {quizSubmitted && isChosen && !isCorrect && (
                        <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {quizSubmitted && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-1 leading-relaxed">
                  💡 {activeLesson.quickQuiz.explanation}
                </p>
              )}

              {!quizSubmitted && (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={selectedOption === null}
                  className="w-full mt-2 py-2.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all cursor-pointer disabled:opacity-40"
                >
                  Submit Answer
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
