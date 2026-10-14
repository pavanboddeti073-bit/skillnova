import React, { useState } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Award, 
  Check,
  AlertCircle
} from 'lucide-react';
import { academyLessons } from '../data/lessons';
import { Lesson, SkillLevel } from '../types';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';

export const AcademyView: React.FC = () => {
  const { language, completedLessons, toggleLessonComplete, showToast } = useApp();

  const [selectedLevel, setSelectedLevel] = useState<SkillLevel | 'all'>('all');
  const [activeLesson, setActiveLesson] = useState<Lesson>(academyLessons[0]);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const filteredLessons = academyLessons.filter(
    lesson => selectedLevel === 'all' || lesson.level === selectedLevel
  );

  const isCompleted = completedLessons.includes(activeLesson.id);

  const handleSelectQuizOption = (questionIdx: number, optionIdx: number) => {
    if (quizSubmitted) return; // Locked once evaluated
    setQuizAnswers(prev => ({ ...prev, [questionIdx]: optionIdx }));
  };

  const handleEvaluateQuiz = () => {
    setQuizSubmitted(true);
    let allCorrect = true;
    activeLesson.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] !== q.correctIndex) {
        allCorrect = false;
      }
    });

    if (allCorrect) {
      confetti({ particleCount: 50, spread: 60 });
      showToast('100% Score! Quiz passed successfully! 🎉');
      if (!isCompleted) {
        toggleLessonComplete(activeLesson.id);
      }
    } else {
      showToast('Review the explanations below to correct mistaken concepts.');
    }
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  return (
    <div className="space-y-8 pb-20">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>{language === 'te' ? 'AI లెర్నింగ్ అకాడమీ' : 'AI Learning Academy'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {language === 'te' ? 'AI కాన్సెప్ట్స్ & నైపుణ్యాల పాఠశాల' : 'Student AI Foundations & Hands-On Mastery'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-3xl leading-relaxed">
          {language === 'te'
            ? 'సరళమైన తెలుగు మరియు ఇంగ్లీష్ వివరణలతో కూడిన నిర్మాణాత్మక పాఠాలు, కోడ్ ఉదాహరణలు మరియు ఇంటరాక్టివ్ క్విజ్‌లు.'
            : 'Structured lessons explaining tokens, prompting, responsible AI, and engineering workflows with interactive knowledge check quizzes and official citations.'}
        </p>
      </div>

      {/* Main 2-Column Academy Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Lesson Directory & Level Filter (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Level Filter Pills */}
          <div className="p-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-1 text-xs">
            {(['all', 'beginner', 'intermediate', 'advanced'] as Array<SkillLevel | 'all'>).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1.5 rounded-xl font-bold capitalize transition-all ${
                  selectedLevel === lvl
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Lessons List */}
          <div className="space-y-2">
            {filteredLessons.map((lesson) => {
              const isDone = completedLessons.includes(lesson.id);
              const isSelected = activeLesson.id === lesson.id;
              return (
                <div
                  key={lesson.id}
                  onClick={() => {
                    setActiveLesson(lesson);
                    setQuizAnswers({});
                    setQuizSubmitted(false);
                    window.scrollTo({ top: 150, behavior: 'smooth' });
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-500 shadow-xs'
                      : isDone
                      ? 'bg-emerald-50/40 border-emerald-200 hover:bg-emerald-50/60'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-700">
                        {lesson.level}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {lesson.durationMinutes}m
                      </span>
                    </div>
                    <h3 className={`text-xs font-bold leading-snug ${isSelected ? 'text-blue-700' : 'text-slate-900'}`}>
                      {language === 'te' && lesson.titleTe ? lesson.titleTe : lesson.title}
                    </h3>
                  </div>

                  {isDone && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Overall Completion Box */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span>Overall Academy Progress</span>
              <span className="text-blue-600">{completedLessons.length} of {academyLessons.length}</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.round((completedLessons.length / academyLessons.length) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Active Lesson Content & Interactive Quiz (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            
            {/* Lesson Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    {activeLesson.category}
                  </span>
                  <span className="text-xs text-slate-400">
                    {activeLesson.durationMinutes} minutes reading
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {language === 'te' && activeLesson.titleTe ? activeLesson.titleTe : activeLesson.title}
                </h2>
              </div>

              <button
                onClick={() => toggleLessonComplete(activeLesson.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 self-start sm:self-auto ${
                  isCompleted
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-slate-900 hover:bg-blue-600 text-white'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>{isCompleted ? 'Completed ✓' : 'Mark Lesson Complete'}</span>
              </button>
            </div>

            {/* Plain-Language Explanation */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Plain-Language Explanation
              </span>
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 text-slate-800 text-xs sm:text-sm leading-relaxed">
                {language === 'te' && activeLesson.plainExplanationTe 
                  ? activeLesson.plainExplanationTe 
                  : activeLesson.plainExplanation}
              </div>
            </div>

            {/* Core Concepts Breakdown */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Step-by-Step Concepts
              </span>
              <div className="space-y-2.5">
                {activeLesson.steps.map((st, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs">
                    <h3 className="font-bold text-slate-900 text-xs flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] shrink-0">
                        {i + 1}
                      </span>
                      <span>{st.title}</span>
                    </h3>
                    <p className="text-slate-600 leading-relaxed pl-7">{st.description}</p>
                    {st.codeOrPrompt && (
                      <div className="ml-7 mt-2 p-3 rounded-lg bg-slate-900 text-slate-200 font-mono text-[11px] whitespace-pre-wrap">
                        {st.codeOrPrompt}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Example & Hands-on Activity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-800 block">Real-World Example:</span>
                <p className="text-slate-600 leading-relaxed">{activeLesson.example}</p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1">
                <span className="font-bold text-emerald-950 block">Hands-on Practice Activity:</span>
                <p className="text-emerald-900 leading-relaxed">{activeLesson.practiceActivity}</p>
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 text-xs space-y-2">
              <span className="font-bold text-rose-900 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>Common Beginner Traps:</span>
              </span>
              <ul className="space-y-1 text-slate-700 pl-5 list-disc">
                {activeLesson.commonMistakes.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>

            {/* Interactive Knowledge Check Quiz */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Knowledge Check Quiz ({activeLesson.quiz.length} Questions)</span>
                </h3>
                {quizSubmitted && (
                  <button
                    onClick={handleResetQuiz}
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    Retake Quiz
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {activeLesson.quiz.map((q, qIdx) => {
                  const userAnswer = quizAnswers[qIdx];
                  const isCorrect = userAnswer === q.correctIndex;
                  return (
                    <div key={qIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                      <p className="font-bold text-slate-900">
                        Q{qIdx + 1}: {language === 'te' && q.questionTe ? q.questionTe : q.question}
                      </p>

                      <div className="space-y-1.5">
                        {q.options.map((opt, optIdx) => {
                          const isOptionSelected = userAnswer === optIdx;
                          let optionClasses = 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100';

                          if (quizSubmitted) {
                            if (optIdx === q.correctIndex) {
                              optionClasses = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                            } else if (isOptionSelected && !isCorrect) {
                              optionClasses = 'border-rose-400 bg-rose-50 text-rose-900';
                            }
                          } else if (isOptionSelected) {
                            optionClasses = 'border-blue-600 bg-blue-50 text-blue-900 font-semibold';
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={quizSubmitted}
                              onClick={() => handleSelectQuizOption(qIdx, optIdx)}
                              className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${optionClasses}`}
                            >
                              <span>{opt}</span>
                              {quizSubmitted && optIdx === q.correctIndex && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div className="p-3 rounded-xl bg-white border border-slate-200 text-slate-600 text-[11px] leading-relaxed">
                          <strong>Explanation:</strong> {language === 'te' && q.explanationTe ? q.explanationTe : q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {!quizSubmitted ? (
                <button
                  disabled={Object.keys(quizAnswers).length !== activeLesson.quiz.length}
                  onClick={handleEvaluateQuiz}
                  className={`w-full py-3 rounded-xl text-xs font-bold transition-all ${
                    Object.keys(quizAnswers).length === activeLesson.quiz.length
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Submit Answers & Evaluate
                </button>
              ) : null}
            </div>

            {/* Official References */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Official Primary Sources:</span>
              <div className="flex items-center gap-3">
                {activeLesson.references.map((ref, idx) => (
                  <a
                    key={idx}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    <span>{ref.title}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
