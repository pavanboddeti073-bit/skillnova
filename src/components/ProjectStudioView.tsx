import React, { useState } from 'react';
import {
  FolderGit2,
  ShieldAlert,
  Layers,
  Code2,
  Sparkles,
  Bot
} from 'lucide-react';
import { useApp } from '../context/useApp';
import {
  portfolioProjects,
  type ProjectBlueprint
} from '../data/projectStudio';

export const ProjectStudioView: React.FC = () => {
  const { setActiveTab, showToast } = useApp();

  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<ProjectBlueprint>(portfolioProjects[0]);
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, number[]>>({});

  const filteredProjects = portfolioProjects.filter(p => {
    return selectedTier === 'all' || p.tier === selectedTier;
  });

  const toggleMilestone = (projectId: string, stepNum: number) => {
    setCompletedMilestones(prev => {
      const current = prev[projectId] || [];
      const updated = current.includes(stepNum)
        ? current.filter(s => s !== stepNum)
        : [...current, stepNum];
      return { ...prev, [projectId]: updated };
    });
    showToast(`Milestone ${stepNum} updated!`, 'success');
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'beginner':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'intermediate':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'advanced':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
      default:
        return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
    }
  };

  const getProgress = (projId: string, totalMilestones: number) => {
    const done = completedMilestones[projId]?.length || 0;
    return Math.round((done / totalMilestones) * 100);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/40 text-white shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Real-World Project Studio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Build Guided, Portfolio-Ready Engineering Projects
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Move beyond toy tutorials. Complete comprehensive, multi-service systems with architectural diagrams, folder blueprints, milestone checklists, and security audits.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('tutor')}
          className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer whitespace-nowrap"
        >
          <Bot className="w-4 h-4" />
          <span>Ask Nova AI for Architecture Review</span>
        </button>
      </div>

      {/* Main Grid: Projects List (4 cols) & Blueprint Workspace (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Project Catalog (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Tier Filters */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
            {(['all', 'beginner', 'intermediate', 'advanced'] as const).map(tier => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`flex-1 py-1.5 rounded-lg font-bold capitalize transition-all cursor-pointer text-center ${
                  selectedTier === tier
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>

          {/* Project Cards */}
          <div className="space-y-3">
            {filteredProjects.map(proj => {
              const isSelected = activeProject.id === proj.id;
              const progress = getProgress(proj.id, proj.milestones.length);
              return (
                <div
                  key={proj.id}
                  onClick={() => setActiveProject(proj)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500 dark:border-indigo-500 shadow-md ring-1 ring-indigo-500/20'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {proj.title}
                    </h4>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getTierBadge(proj.tier)}`}>
                      {proj.tier}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {proj.summary}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{proj.estimatedTotalHours} Hours</span>
                    <span className="font-mono text-indigo-500 font-bold">{progress}% done</span>
                  </div>

                  <div className="mt-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
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

        {/* Right Column: Active Blueprint Workspace (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Blueprint Header */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase border ${getTierBadge(activeProject.tier)}`}>
                  {activeProject.tier} Blueprint
                </span>
                <h2 className="mt-1.5 text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {activeProject.title}
                </h2>
              </div>

              <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                Duration: {activeProject.estimatedTotalHours} Hours
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeProject.problemSolved}
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-400 mr-1">Tech Stack:</span>
              {activeProject.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Architecture & Folder Structure */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-500" />
                System Architecture
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeProject.architectureOverview}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-indigo-500" />
                Recommended Folder Structure
              </h4>
              <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-emerald-400 overflow-x-auto max-h-36">
                <pre>{activeProject.folderStructure}</pre>
              </div>
            </div>
          </div>

          {/* Step-by-Step Milestones */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
              Implementation Milestones & Deliverables ({activeProject.milestones.length})
            </h3>

            <div className="space-y-3">
              {activeProject.milestones.map(m => {
                const isDone = (completedMilestones[activeProject.id] || []).includes(m.stepNumber);
                return (
                  <div
                    key={m.stepNumber}
                    className={`p-4 rounded-xl border transition-all space-y-2 text-xs ${
                      isDone
                        ? 'bg-emerald-500/5 border-emerald-500/20'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                          {m.stepNumber}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {m.title}
                        </h4>
                      </div>

                      <button
                        onClick={() => toggleMilestone(activeProject.id, m.stepNumber)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isDone
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-emerald-500'
                        }`}
                      >
                        {isDone ? 'Finished ✓' : 'Mark Done'}
                      </button>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed pl-8">
                      {m.objective}
                    </p>

                    <div className="pl-8 pt-1 text-[11px] text-slate-500">
                      <strong className="text-indigo-500">Deliverable:</strong> {m.deliverable}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Security Checklist & Interview Talking Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                Security & Hardening Checklist
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {activeProject.securityChecklist.map((sec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{sec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Portfolio & Interview Talking Points
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {activeProject.portfolioPresentationTips.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
