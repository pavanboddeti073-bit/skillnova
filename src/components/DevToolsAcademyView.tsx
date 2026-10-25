import React, { useState } from 'react';
import {
  Wrench,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Copy,
  Check,
  AlertTriangle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/useApp';
import {
  developerToolCourses,
  type DeveloperToolCourse,
  type ToolCourseStage
} from '../data/developerToolsAcademy';

export const DevToolsAcademyView: React.FC = () => {
  const { setActiveTab, showToast } = useApp();

  const [activeCourse, setActiveCourse] = useState<DeveloperToolCourse>(developerToolCourses[0]);
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [completedStages, setCompletedStages] = useState<Record<string, number[]>>({});
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const activeStage: ToolCourseStage = activeCourse.stages[activeStageIndex];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(text);
    setTimeout(() => setCopiedCmd(null), 2000);
    showToast('Code copied to clipboard', 'info');
  };

  const toggleStageCompleted = (courseId: string, stageNum: number) => {
    setCompletedStages(prev => {
      const current = prev[courseId] || [];
      const updated = current.includes(stageNum)
        ? current.filter(s => s !== stageNum)
        : [...current, stageNum];
      return { ...prev, [courseId]: updated };
    });
    showToast(`Stage ${stageNum} updated!`, 'success');
  };

  const getProgressPercentage = (courseId: string) => {
    const completed = completedStages[courseId]?.length || 0;
    return Math.round((completed / 8) * 100);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/40 text-white shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Wrench className="w-3.5 h-3.5" />
            <span>Developer Tools Academy</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Master the Professional Developer Toolchain
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            10 essential developer tools taught through a mandatory 8-stage mastery framework: from installation and CLI workflows to production troubleshooting and portfolio deployment.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('projects')}
          className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer whitespace-nowrap"
        >
          <span>Explore Real-World Projects</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Grid: 10 Tool Course Selector (4 cols) & 8-Stage Interactive Guide (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: 10 Tool Courses (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Professional Tool Courses (10)
          </h3>

          <div className="space-y-2.5">
            {developerToolCourses.map(course => {
              const isSelected = activeCourse.id === course.id;
              const progress = getProgressPercentage(course.id);
              return (
                <div
                  key={course.id}
                  onClick={() => {
                    setActiveCourse(course);
                    setActiveStageIndex(0);
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500 dark:border-indigo-500 shadow-md ring-1 ring-indigo-500/20'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                      {course.name}
                    </h4>
                    <span className="text-[11px] font-mono text-indigo-500 font-bold">
                      {progress}%
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                    {course.tagline}
                  </p>

                  {/* Progress Bar */}
                  <div className="mt-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: 8-Stage Interactive Stage Viewer (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Active Course Banner */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  {activeCourse.difficulty} Track
                </span>
                <h2 className="mt-1.5 text-xl font-black text-slate-900 dark:text-white">
                  {activeCourse.name}
                </h2>
              </div>

              <a
                href={activeCourse.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
              >
                <span>Docs</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeCourse.tagline}
            </p>

            {/* Common Mistakes & Troubleshooting */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                ⚠️ Common Pitfalls Avoided in This Course
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                {activeCourse.commonMistakes.map((mistake, i) => (
                  <div
                    key={i}
                    className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-1.5"
                  >
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{mistake}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 8-Stage Horizontal Progression Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
            {activeCourse.stages.map((stage, idx) => {
              const isCompleted = (completedStages[activeCourse.id] || []).includes(stage.stageNumber);
              const isSelected = activeStageIndex === idx;
              return (
                <button
                  key={stage.stageNumber}
                  onClick={() => setActiveStageIndex(idx)}
                  className={`px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md'
                      : isCompleted
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <span>{stage.stageNumber}.</span>
                  )}
                  <span>{stage.stageName.split('—')[1]?.trim() || stage.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Content Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">
                  Stage {activeStage.stageNumber} of 8 • {activeStage.durationMinutes} Mins
                </span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1">
                  {activeStage.title}
                </h3>
              </div>

              <button
                onClick={() => toggleStageCompleted(activeCourse.id, activeStage.stageNumber)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  (completedStages[activeCourse.id] || []).includes(activeStage.stageNumber)
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {(completedStages[activeCourse.id] || []).includes(activeStage.stageNumber)
                    ? 'Completed ✓'
                    : 'Mark as Completed'}
                </span>
              </button>
            </div>

            {/* Stage Objective */}
            <div className="p-3.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 space-y-1">
              <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Stage Objective
              </span>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {activeStage.objective}
              </p>
            </div>

            {/* Stage Content */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Guided Instructions:
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {activeStage.content}
              </p>
            </div>

            {/* Code / Command Snippets */}
            {activeStage.codeSnippet && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span className="font-bold uppercase tracking-wider">Terminal Command / Code:</span>
                  <button
                    onClick={() => handleCopy(activeStage.codeSnippet || '')}
                    className="hover:text-indigo-500 font-semibold cursor-pointer flex items-center gap-1"
                  >
                    {copiedCmd === activeStage.codeSnippet ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto">
                  <pre>{activeStage.codeSnippet}</pre>
                </div>
              </div>
            )}

            {/* Verification Tip */}
            {activeStage.verificationTip && (
              <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Verification Checkpoint</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeStage.verificationTip}
                </p>
              </div>
            )}

            {/* Navigation between stages */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                disabled={activeStageIndex === 0}
                onClick={() => setActiveStageIndex(prev => prev - 1)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-40 cursor-pointer"
              >
                Previous Stage
              </button>

              <button
                disabled={activeStageIndex === activeCourse.stages.length - 1}
                onClick={() => setActiveStageIndex(prev => prev + 1)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-indigo-600 text-white disabled:opacity-40 cursor-pointer shadow-md"
              >
                <span>Next Stage</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
