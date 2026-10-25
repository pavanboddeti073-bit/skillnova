import React, { useState } from 'react';
import {
  Route,
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/useApp';
import {
  careerPaths,
  type CareerPathway,
  type LearningPathMilestone
} from '../data/learningPaths';

export const LearningPathsView: React.FC = () => {
  const { setActiveTab, showToast } = useApp();

  const [activePath, setActivePath] = useState<CareerPathway>(careerPaths[0]);
  const [completedSteps, setCompletedSteps] = useState<Record<string, number[]>>({});

  const toggleStep = (pathId: string, orderNum: number) => {
    setCompletedSteps(prev => {
      const current = prev[pathId] || [];
      const updated = current.includes(orderNum)
        ? current.filter(s => s !== orderNum)
        : [...current, orderNum];
      return { ...prev, [pathId]: updated };
    });
    showToast(`Milestone ${orderNum} updated!`, 'success');
  };

  const getProgress = (pathId: string, totalSteps: number) => {
    const done = completedSteps[pathId]?.length || 0;
    return Math.round((done / totalSteps) * 100);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/40 text-white shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Route className="w-3.5 h-3.5" />
            <span>Structured Career Pathways</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Personalized Engineering Learning Paths
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Curated end-to-end curriculums designed to take you from a curious beginner to a job-ready software engineer through structured sequential milestones.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('coding-practice')}
          className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer whitespace-nowrap"
        >
          <span>Start Practice Exercises</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Path Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {careerPaths.map((path: CareerPathway) => {
          const isSelected = activePath.id === path.id;
          const progress = getProgress(path.id, path.milestones.length);
          return (
            <div
              key={path.id}
              onClick={() => setActivePath(path)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer text-left space-y-3 ${
                isSelected
                  ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500 dark:border-indigo-500 shadow-md ring-1 ring-indigo-500/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">
                  {path.level}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {path.estimatedWeeks} Weeks
                </span>
              </div>

              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {path.title}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {path.summary}
              </p>

              {/* Progress Bar */}
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Progress</span>
                  <span className="font-bold text-indigo-500">{progress}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Pathway Details */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-500">
              Active Pathway Curriculum
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {activePath.title}
            </h2>
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
              <span>Target Role: <strong className="text-slate-800 dark:text-slate-200">{activePath.targetRole}</strong></span>
              <span>•</span>
              <span>Duration: <strong className="text-slate-800 dark:text-slate-200">{activePath.estimatedWeeks} Weeks</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('tools-academy')}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 cursor-pointer transition-colors"
            >
              Developer Tools
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shadow-md transition-colors"
            >
              Related Projects
            </button>
          </div>
        </div>

        {/* Pathway Skills Gained */}
        <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/50 dark:border-indigo-800/40 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Core Skills Gained in this Pathway
          </span>
          <div className="flex flex-wrap gap-2">
            {activePath.skillsGained.map((skill: string, i: number) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300"
              >
                ✓ {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Milestone Steps Timeline */}
        <div className="space-y-4">
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
            Sequential Milestones ({activePath.milestones.length})
          </h3>

          <div className="space-y-3">
            {activePath.milestones.map((m: LearningPathMilestone) => {
              const isDone = (completedSteps[activePath.id] || []).includes(m.order);
              return (
                <div
                  key={m.order}
                  className={`p-4 rounded-xl border transition-all space-y-3 ${
                    isDone
                      ? 'bg-emerald-500/5 border-emerald-500/20'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                        {m.order}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {m.title}
                        </h4>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          Estimated duration: {m.estimatedHours} hours • Type: {m.type.replace('_', ' ')}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleStep(activePath.id, m.order)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isDone
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-emerald-500'
                      }`}
                    >
                      {isDone ? 'Completed ✓' : 'Mark Complete'}
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-10">
                    {m.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
