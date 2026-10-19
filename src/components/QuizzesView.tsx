import React, { useState } from 'react';
import {
  CheckSquare,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/useApp';
import { practiceQuizzes, PracticeQuiz } from '../data/quizzes';
import confetti from 'canvas-confetti';

export const QuizzesView: React.FC = () => {
  const { language, showToast } = useApp();

  const [selectedQuiz, setSelectedQuiz] = useState<PracticeQuiz>(practiceQuizzes[0]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filteredQuizzes = practiceQuizzes.filter(q =>
    selectedDifficulty === 'all' || q.level === selectedDifficulty
  );

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleEvaluate = () => {
    setSubmitted(true);
    let correctCount = 0;
    selectedQuiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctIndex) correctCount += 1;
    });

    const percent = Math.round((correctCount / selectedQuiz.questions.length) * 100);
    const passed = percent >= selectedQuiz.passingScorePercent;

    if (passed) {
      confetti({ particleCount: 60, spread: 70 });
      showToast(`Quiz Passed! ${percent}% score achieved! 🎉`);
    } else {
      showToast(`Score: ${percent}%. Review explanations below and retry!`);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const calculateScore = () => {
    let score = 0;
    selectedQuiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctIndex) score += 1;
    });
    return score;
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <CheckSquare className="w-3.5 h-3.5" />
          <span>{language === 'te' ? 'ప్రాక్టీస్ & క్విజ్‌లు' : 'Practice & Quizzes'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          {language === 'te' ? 'సాంకేతిక నైపుణ్యాల మూల్యాంకనం' : 'Test Your Knowledge with Verified Quizzes'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
          Assess your understanding of Generative AI, React 19 architecture, and ATS Placement criteria with instant explanations.
        </p>
      </div>

      {/* 2-Column Layout: Quiz Selector & Active Quiz Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (4 cols): Quizzes List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
            <span>Available Quizzes</span>
            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px] text-slate-700 dark:text-slate-300 font-semibold focus:outline-hidden cursor-pointer"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
            </select>
          </div>

          <div className="space-y-3">
            {filteredQuizzes.map(quiz => {
              const active = selectedQuiz.id === quiz.id;
              return (
                <div
                  key={quiz.id}
                  onClick={() => {
                    setSelectedQuiz(quiz);
                    setAnswers({});
                    setSubmitted(false);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    active
                      ? 'bg-indigo-50/70 dark:bg-indigo-950/60 border-indigo-500 shadow-xs'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                      {quiz.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {quiz.questions.length} Qs • {quiz.durationMinutes}m
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    {language === 'te' && quiz.titleTe ? quiz.titleTe : quiz.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {quiz.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (8 cols): Interactive Quiz Card */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          
          {/* Active Quiz Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-750">
            <div>
              <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-1">
                <span>{selectedQuiz.category}</span>
                <span>•</span>
                <span className="capitalize">{selectedQuiz.level}</span>
              </div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                {language === 'te' && selectedQuiz.titleTe ? selectedQuiz.titleTe : selectedQuiz.title}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {submitted ? (
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-650 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retry Quiz</span>
                </button>
              ) : (
                <button
                  onClick={handleEvaluate}
                  disabled={Object.keys(answers).length === 0}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-40"
                >
                  Submit & Check Score
                </button>
              )}
            </div>
          </div>

          {/* Results Summary Banner (if submitted) */}
          {submitted && (
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Quiz Results
                </div>
                <div className="text-lg font-black text-indigo-900 dark:text-indigo-100">
                  You scored {calculateScore()} / {selectedQuiz.questions.length} (
                  {Math.round((calculateScore() / selectedQuiz.questions.length) * 100)}%)
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-xs flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-black">
                {calculateScore() === selectedQuiz.questions.length ? '🏆' : '🎯'}
              </div>
            </div>
          )}

          {/* Questions List */}
          <div className="space-y-6">
            {selectedQuiz.questions.map((q, qIdx) => {
              const selectedOpt = answers[qIdx];
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-3"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {qIdx + 1}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {language === 'te' && q.questionTe ? q.questionTe : q.question}
                    </h3>
                  </div>

                  <div className="space-y-2 pl-8">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedOpt === optIdx;
                      let btnStyle = 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 bg-white dark:bg-slate-800';

                      if (isSelected) {
                        btnStyle = 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 font-semibold text-indigo-900 dark:text-indigo-200';
                      }

                      if (submitted) {
                        if (optIdx === q.correctIndex) {
                          btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950 font-bold text-emerald-900 dark:text-emerald-200';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'border-red-500 bg-red-50 dark:bg-red-950 text-red-900 dark:text-red-200';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(qIdx, optIdx)}
                          className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${btnStyle}`}
                        >
                          <span className="font-mono text-slate-400 mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {/* Immediate Explanation */}
                  {submitted && (
                    <div
                      className={`pl-8 pt-2 text-xs space-y-1 ${
                        isCorrect
                          ? 'text-emerald-700 dark:text-emerald-400 font-medium'
                          : 'text-amber-700 dark:text-amber-400 font-medium'
                      }`}
                    >
                      <div className="font-bold">
                        {isCorrect ? '✓ Correct! Explanation:' : '💡 Diagnostic Review:'}
                      </div>
                      <p>{language === 'te' && q.explanationTe ? q.explanationTe : q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
};
