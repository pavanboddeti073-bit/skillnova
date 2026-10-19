import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Bot,
  Check,
  Copy,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/useApp';
import confetti from 'canvas-confetti';

export const LessonDetailView: React.FC = () => {
  const {
    selectedLesson,
    closeLessonDetail,
    completedLessons,
    toggleLessonComplete,
    setActiveTab,
    showToast,
    language
  } = useApp();

  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [copiedCodeIdx, setCopiedCodeIdx] = useState<number | null>(null);

  if (!selectedLesson) return null;

  const isCompleted = completedLessons.includes(selectedLesson.id);

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setSelectedQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleEvaluateQuiz = () => {
    setQuizSubmitted(true);
    let allCorrect = true;
    selectedLesson.quiz.forEach((q, idx) => {
      if (selectedQuizAnswers[idx] !== q.correctIndex) {
        allCorrect = false;
      }
    });

    if (allCorrect) {
      confetti({ particleCount: 50, spread: 60 });
      showToast('100% Score! Knowledge check verified! 🎉');
      if (!isCompleted) {
        toggleLessonComplete(selectedLesson.id);
      }
    } else {
      showToast('Review the explanations below to correct any misunderstood concepts.');
    }
  };

  const handleCopyCode = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeIdx(idx);
    showToast('Code copied to clipboard!');
    setTimeout(() => setCopiedCodeIdx(null), 2000);
  };

  const handleAskTutorAboutLesson = () => {
    closeLessonDetail();
    setActiveTab('tutor');
    showToast(`AI Tutor loaded for: ${selectedLesson.title}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white flex items-center justify-between shrink-0 border-b border-indigo-900/40">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                Lesson {selectedLesson.lessonNumber}
              </span>
              <span className="text-xs text-slate-400">• {selectedLesson.durationMinutes} mins read & practice</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">{selectedLesson.title}</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAskTutorAboutLesson}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Bot className="w-4 h-4" />
              <span>Ask AI Tutor</span>
            </button>
            <button
              onClick={closeLessonDetail}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              aria-label="Close lesson"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Lesson Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 text-slate-800 dark:text-slate-100">
          
          {/* Plain Language Explanation */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Plain Explanation & Core Concept
            </h3>
            <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/80 text-sm leading-relaxed space-y-2">
              <p>
                {language === 'te' && selectedLesson.plainExplanationTe
                  ? selectedLesson.plainExplanationTe
                  : selectedLesson.plainExplanation}
              </p>
              {selectedLesson.example && (
                <div className="pt-2 text-xs font-medium text-indigo-900 dark:text-indigo-200 border-t border-indigo-200/50 dark:border-indigo-800/50">
                  <span className="font-bold">Concrete Example: </span>
                  {selectedLesson.example}
                </div>
              )}
            </div>
          </div>

          {/* Technical Terminology Glossary */}
          {selectedLesson.technicalTerms && selectedLesson.technicalTerms.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Key Technical Terminology
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedLesson.technicalTerms.map((t, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                    <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">{t.term}</span>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{t.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step-by-Step Breakdown with Code / Prompts */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Step-by-Step Implementation
            </h3>
            <div className="space-y-3">
              {selectedLesson.steps.map((s, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{s.title}</h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 pl-8">{s.description}</p>
                  
                  {s.codeOrPrompt && (
                    <div className="relative pl-8 pt-1">
                      <pre className="p-3 rounded-xl bg-slate-900 text-cyan-300 text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                        {s.codeOrPrompt}
                      </pre>
                      <button
                        onClick={() => handleCopyCode(s.codeOrPrompt!, idx)}
                        className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1"
                      >
                        {copiedCodeIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCodeIdx === idx ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Common Mistakes & Misconceptions */}
          {selectedLesson.commonMistakes && selectedLesson.commonMistakes.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Common Student Mistakes & Pitfalls
              </h3>
              <div className="space-y-2">
                {selectedLesson.commonMistakes.map((mistake, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-xs text-amber-900 dark:text-amber-200">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{mistake}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Practice Activity */}
          {selectedLesson.practiceActivity && (
            <div className="p-5 rounded-2xl bg-cyan-50/60 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/80 space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-cyan-700 dark:text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Hands-On Practice Activity
              </span>
              <p className="text-xs text-cyan-950 dark:text-cyan-100 font-medium leading-relaxed">
                {selectedLesson.practiceActivity}
              </p>
            </div>
          )}

          {/* Interactive Knowledge-Check Quiz */}
          {selectedLesson.quiz && selectedLesson.quiz.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    Concept Verification
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Knowledge Check Quiz
                  </h3>
                </div>
                {!quizSubmitted && (
                  <button
                    onClick={handleEvaluateQuiz}
                    disabled={Object.keys(selectedQuizAnswers).length === 0}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-40"
                  >
                    Submit Answers
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {selectedLesson.quiz.map((q, qIdx) => {
                  const selectedOpt = selectedQuizAnswers[qIdx];
                  const isCorrect = selectedOpt === q.correctIndex;
                  return (
                    <div key={qIdx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-3">
                      <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                        {language === 'te' && q.questionTe ? q.questionTe : q.question}
                      </div>

                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = selectedOpt === optIdx;
                          let optStyle = 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800';
                          if (isSelected) {
                            optStyle = 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 font-semibold text-indigo-900 dark:text-indigo-200';
                          }
                          if (quizSubmitted) {
                            if (optIdx === q.correctIndex) {
                              optStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 font-semibold text-emerald-900 dark:text-emerald-200';
                            } else if (isSelected && !isCorrect) {
                              optStyle = 'border-red-500 bg-red-50 dark:bg-red-950/60 text-red-900 dark:text-red-200';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectOption(qIdx, optIdx)}
                              className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${optStyle}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div className={`p-3 rounded-xl text-xs space-y-1 ${
                          isCorrect
                            ? 'bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 text-emerald-800 dark:text-emerald-300'
                            : 'bg-amber-50 dark:bg-amber-950/50 border border-amber-200 text-amber-800 dark:text-amber-300'
                        }`}>
                          <div className="font-bold">
                            {isCorrect ? '✓ Correct Explanation:' : '💡 Concept Review:'}
                          </div>
                          <p>{language === 'te' && q.explanationTe ? q.explanationTe : q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <button
            onClick={() => toggleLessonComplete(selectedLesson.id)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isCompleted
                ? 'bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 text-emerald-700 dark:text-emerald-300'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'Marked Completed' : 'Mark Lesson Complete'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAskTutorAboutLesson}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-650 text-slate-800 dark:text-slate-100 text-xs font-bold transition-all cursor-pointer"
            >
              <Bot className="w-4 h-4 text-indigo-500" />
              <span>Ask Tutor Questions</span>
            </button>
            <button
              onClick={closeLessonDetail}
              className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-750 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-300 transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
