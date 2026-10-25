import React, { useState } from 'react';
import {
  Code2,
  Play,
  Send,
  HelpCircle,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Search,
  Bot
} from 'lucide-react';
import { useApp } from '../context/useApp';
import {
  practiceProblems,
  practiceCategories,
  type PracticeProblem,
  type DifficultyTier
} from '../data/practiceProblems';
import { executeCode, type ExecutionResult } from '../services/codeExecution';

export const CodingPracticeView: React.FC = () => {
  const { setActiveTab, showToast } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProblem, setActiveProblem] = useState<PracticeProblem>(practiceProblems[0]);

  // Code editor state
  const [userCode, setUserCode] = useState<string>(practiceProblems[0].starterCode);
  const [activeLanguage, setActiveLanguage] = useState<string>(practiceProblems[0].language);
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);

  // Progressive hints state
  const [revealedHintIndex, setRevealedHintIndex] = useState<number>(-1);
  const [showSolutionModal, setShowSolutionModal] = useState<boolean>(false);
  const [activeTabPanel, setActiveTabPanel] = useState<'tests' | 'console'>('tests');

  // Filtered problems
  const filteredProblems = practiceProblems.filter(p => {
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchDiff = selectedDifficulty === 'all' || p.difficulty === selectedDifficulty;
    const matchQuery =
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchDiff && matchQuery;
  });

  const handleSelectProblem = (problem: PracticeProblem) => {
    setActiveProblem(problem);
    setUserCode(problem.starterCode);
    setActiveLanguage(problem.language);
    setExecutionResult(null);
    setRevealedHintIndex(-1);
    setShowSolutionModal(false);
  };

  const handleRunSampleTests = async () => {
    setIsRunning(true);
    setActiveTabPanel('tests');
    try {
      const res = await executeCode({
        code: userCode,
        language: activeLanguage,
        visibleTests: activeProblem.visibleTests,
        hiddenTests: []
      });
      setExecutionResult(res);
      if (res.status === 'passed') {
        showToast('Sample tests passed! Ready to submit solution.', 'success');
      } else {
        showToast('Some sample tests failed. Review the output console.', 'error');
      }
    } catch (err: any) {
      showToast(err?.message || 'Code execution failed', 'error');
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmitSolution = async () => {
    setIsRunning(true);
    setActiveTabPanel('tests');
    try {
      const res = await executeCode({
        code: userCode,
        language: activeLanguage,
        visibleTests: activeProblem.visibleTests,
        hiddenTests: activeProblem.hiddenTests || []
      });
      setExecutionResult(res);
      if (res.status === 'passed') {
        showToast(`🎉 Challenge Solved! Passed all ${res.totalTests} tests in ${res.executionTimeMs}ms`, 'success');
      } else {
        showToast(`Submission failed (${res.testsPassed}/${res.totalTests} tests passed). Check hidden edge cases.`, 'error');
      }
    } catch (err: any) {
      showToast(err?.message || 'Submission evaluation error', 'error');
    } finally {
      setIsRunning(false);
    }
  };

  const handleRevealNextHint = () => {
    if (revealedHintIndex < activeProblem.hints.length - 1) {
      setRevealedHintIndex(prev => prev + 1);
    }
  };

  const getDifficultyBadge = (diff: DifficultyTier) => {
    switch (diff) {
      case 'beginner':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'easy':
        return 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20';
      case 'medium':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'hard':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
      case 'advanced':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/40 text-white shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Code2 className="w-3.5 h-3.5" />
            <span>Interactive Multi-Language Practice Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Coding Practice & Algorithmic Problem Solving
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            18 domain categories across 5 difficulty levels. Safely run sandboxed code with automatic test assertions, progressive hints, and step-by-step solutions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('playground')}
            className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all cursor-pointer"
          >
            Open Code Playground
          </button>
          <button
            onClick={() => setActiveTab('tutor')}
            className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <Bot className="w-4 h-4" />
            <span>Ask Nova AI Mentor</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Problem List / Right IDE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Problem List & Category Filter (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Search & Difficulty Filter */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search practice challenges..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              {(['all', 'beginner', 'easy', 'medium', 'hard', 'advanced'] as const).map(diff => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-2.5 py-1 rounded-md font-medium capitalize whitespace-nowrap cursor-pointer transition-colors ${
                    selectedDifficulty === diff
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* 18 Domain Categories Scrollable Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-indigo-400'
              }`}
            >
              All Categories ({practiceProblems.length})
            </button>
            {practiceCategories.map(cat => {
              const count = practiceProblems.filter(p => p.category === cat.id).length;
              if (count === 0) return null;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                  }`}
                >
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Problem Cards List */}
          <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
            {filteredProblems.length === 0 ? (
              <div className="p-8 text-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 text-xs">
                No practice problems found matching criteria.
              </div>
            ) : (
              filteredProblems.map(prob => {
                const isSelected = activeProblem.id === prob.id;
                return (
                  <div
                    key={prob.id}
                    onClick={() => handleSelectProblem(prob)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                      isSelected
                        ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-500 dark:border-indigo-500 shadow-md ring-1 ring-indigo-500/20'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                        {prob.title}
                      </h4>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getDifficultyBadge(prob.difficulty)}`}>
                        {prob.difficulty}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {prob.description}
                    </p>

                    <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                      <span className="capitalize font-medium text-slate-600 dark:text-slate-400">
                        {prob.category.replace(/_/g, ' ')}
                      </span>
                      <span className="font-mono text-indigo-500 font-semibold uppercase">
                        {prob.language}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Code Editor & Execution Console (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Problem Statement Header */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase border ${getDifficultyBadge(activeProblem.difficulty)}`}>
                    {activeProblem.difficulty}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    Category: {activeProblem.category.replace(/_/g, ' ')}
                  </span>
                </div>
                <h2 className="mt-1 text-xl font-black text-slate-900 dark:text-white">
                  {activeProblem.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRevealNextHint}
                  disabled={revealedHintIndex >= activeProblem.hints.length - 1}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>
                    Hint ({revealedHintIndex + 1}/{activeProblem.hints.length})
                  </span>
                </button>

                <button
                  onClick={() => setShowSolutionModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Reference Solution</span>
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {activeProblem.description}
            </p>

            {/* Constraints & Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="font-semibold text-slate-500">Constraints:</span>
              {activeProblem.constraints.map((c, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                  {c}
                </span>
              ))}
            </div>

            {/* Progressive Hints Accordion */}
            {revealedHintIndex >= 0 && (
              <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Progressive Hints Revealed</span>
                </div>
                {activeProblem.hints.slice(0, revealedHintIndex + 1).map((h, i) => (
                  <div key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                    <span className="font-mono text-amber-500 font-bold">H{i + 1}:</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Interactive Code Editor Area */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 shadow-xl overflow-hidden">
            {/* Editor Top Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="font-mono text-slate-400 font-semibold text-[11px]">
                  solution.{activeLanguage === 'python' ? 'py' : activeLanguage === 'sql' ? 'sql' : 'ts'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={activeLanguage}
                  onChange={e => setActiveLanguage(e.target.value)}
                  className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium focus:outline-none"
                >
                  <option value="javascript">JavaScript (Node.js VM)</option>
                  <option value="typescript">TypeScript</option>
                  <option value="python">Python 3 (Sandbox)</option>
                  <option value="sql">SQL (In-Memory Engine)</option>
                </select>

                <button
                  onClick={() => setUserCode(activeProblem.starterCode)}
                  className="px-2.5 py-1 text-[11px] font-medium text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Monospace Code Editor */}
            <div className="relative">
              <textarea
                value={userCode}
                onChange={e => setUserCode(e.target.value)}
                rows={14}
                spellCheck={false}
                className="w-full p-4 font-mono text-xs sm:text-sm !bg-slate-950 !text-emerald-300 placeholder:text-slate-600 focus:outline-none resize-none leading-relaxed selection:bg-indigo-600/60 !caret-emerald-400"
              />
            </div>

            {/* Action Buttons Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-950/80 border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Sandbox CPU Timeout: 3000ms</span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleRunSampleTests}
                  disabled={isRunning}
                  className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-all cursor-pointer disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                  <span>{isRunning ? 'Running...' : 'Run Visible Tests'}</span>
                </button>

                <button
                  onClick={handleSubmitSolution}
                  disabled={isRunning}
                  className="flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Solution</span>
                </button>
              </div>
            </div>
          </div>

          {/* Execution Results Console */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-4 text-xs font-bold">
                <button
                  onClick={() => setActiveTabPanel('tests')}
                  className={`pb-1 border-b-2 transition-colors cursor-pointer ${
                    activeTabPanel === 'tests'
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                  }`}
                >
                  Test Results ({executionResult?.testsPassed || 0}/{executionResult?.totalTests || activeProblem.visibleTests.length})
                </button>
                <button
                  onClick={() => setActiveTabPanel('console')}
                  className={`pb-1 border-b-2 transition-colors cursor-pointer ${
                    activeTabPanel === 'console'
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                  }`}
                >
                  Standard Output & Logs
                </button>
              </div>

              {executionResult && (
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-mono text-slate-400">
                    ⏱️ {executionResult.executionTimeMs}ms
                  </span>
                  <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                    executionResult.status === 'passed'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                  }`}>
                    {executionResult.status}
                  </span>
                </div>
              )}
            </div>

            {/* Test Case Cards */}
            {activeTabPanel === 'tests' ? (
              <div className="space-y-3">
                {executionResult ? (
                  executionResult.testResults.map((t, idx) => (
                    <div
                      key={t.id || idx}
                      className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                        t.passed
                          ? 'bg-emerald-500/5 border-emerald-500/20'
                          : 'bg-rose-500/5 border-rose-500/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-semibold">
                          {t.passed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-500" />
                          )}
                          <span className="text-slate-900 dark:text-white">
                            Test {idx + 1}: {t.description}
                          </span>
                          {t.isHidden && (
                            <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[10px] text-slate-600 dark:text-slate-300 font-bold uppercase">
                              Hidden
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-[11px] text-slate-400">
                          {t.executionTimeMs}ms
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
                        <div className="p-2 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Expected:</span>
                          {t.expectedOutput}
                        </div>
                        <div className="p-2 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Actual:</span>
                          {t.actualOutput || '(none)'}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="space-y-2">
                    <p className="text-xs text-slate-500">Sample test cases to be verified:</p>
                    {activeProblem.visibleTests.map((sample, idx) => (
                      <div key={sample.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1">
                        <div className="text-slate-500 text-[11px] font-sans font-medium">Sample {idx + 1}: {sample.description}</div>
                        <div className="text-slate-700 dark:text-slate-300"><span className="text-indigo-500 font-bold">Input:</span> {sample.input}</div>
                        <div className="text-slate-700 dark:text-slate-300"><span className="text-emerald-500 font-bold">Expected:</span> {sample.expectedOutput}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 space-y-2 min-h-[120px]">
                {executionResult?.stdout && (
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Stdout:</span>
                    <pre className="whitespace-pre-wrap">{executionResult.stdout}</pre>
                  </div>
                )}
                {executionResult?.stderr && (
                  <div>
                    <span className="text-rose-400 block text-[10px] uppercase font-bold">Stderr / Errors:</span>
                    <pre className="text-rose-400 whitespace-pre-wrap">{executionResult.stderr}</pre>
                  </div>
                )}
                {!executionResult?.stdout && !executionResult?.stderr && (
                  <p className="text-slate-500">Run code to see standard outputs and console traces.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reference Solution Modal */}
      {showSolutionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Reference Solution: {activeProblem.title}
                </h3>
              </div>
              <button
                onClick={() => setShowSolutionModal(false)}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                Close
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Optimal Implementation
              </h4>
              <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-emerald-400 overflow-x-auto">
                <pre>{activeProblem.referenceSolution}</pre>
              </div>

              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider pt-2">
                Step-by-Step Architectural Explanation
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                {activeProblem.explanation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
