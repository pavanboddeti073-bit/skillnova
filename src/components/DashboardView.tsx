import React, { useState } from 'react';
import {
  Sparkles,
  Flame,
  Clock,
  BookOpen,
  CheckCircle2,
  Bot,
  Play,
  Layers,
  Layout,
  Target,
  ChevronRight,
  Code2
} from 'lucide-react';
import { useApp } from '../context/useApp';
import { courseCatalog } from '../data/courses';

export const DashboardView: React.FC = () => {
  const {
    user,
    language,
    setActiveTab,
    enrolledCourseIds,
    completedLessons,
    openStudioRecipe,
    setLauncherGoal,
    openCourseDetail,
    notes,
    bookmarks
  } = useApp();

  const [inputIdea, setInputIdea] = useState('');

  const firstName = user?.fullName ? user.fullName.split(' ')[0] : 'Learner';
  const streak = user?.streakDays || 4;
  const learningMinutes = user?.totalLearningMinutes || 120;
  const dailyGoal = user?.dailyGoalMinutes || 30;
  const todayMinutes = 25;
  const dailyGoalPercent = Math.min(100, Math.round((todayMinutes / dailyGoal) * 100));

  const enrolledCourses = courseCatalog.filter(c => enrolledCourseIds.includes(c.id));
  const activeCourse = enrolledCourses[0] || courseCatalog[0];

  const handleLaunchIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputIdea.trim()) return;
    setLauncherGoal(inputIdea.trim());
    setActiveTab('wizard');
  };

  // Weekly study activity data (Mon - Sun)
  const weeklyActivity = [
    { day: 'Mon', minutes: 35, height: '70%' },
    { day: 'Tue', minutes: 45, height: '90%' },
    { day: 'Wed', minutes: 20, height: '40%' },
    { day: 'Thu', minutes: 50, height: '100%' },
    { day: 'Fri', minutes: 30, height: '60%' },
    { day: 'Sat', minutes: 15, height: '30%' },
    { day: 'Sun', minutes: 25, height: '50%' }
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* 1. Personalized Header Banner */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-purple-950 text-white shadow-xl border border-indigo-800/40">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>SkillNova Mega14 Learning Companion</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              {language === 'te' ? `స్వాగతం, ${firstName}!` : `Welcome back, ${firstName}!`}
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200 max-w-2xl leading-relaxed">
              {language === 'te'
                ? 'మీరు మీ రోజువారీ అభ్యాస లక్ష్యానికి 83% చేరుకున్నారు. నేటి కాన్సెప్ట్‌లను రివ్యూ చేసి ప్రాక్టీస్ పూర్తి చేయండి!'
                : `You are on a ${streak}-day learning streak and 83% toward today's goal. Master your active modules or ask AI Tutor.`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('coding-practice')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <Code2 className="w-4 h-4" />
              <span>{language === 'te' ? 'కోడింగ్ ప్రాక్టీస్' : 'Coding Practice (18 Cats)'}</span>
            </button>
            <button
              onClick={() => setActiveTab('tutor')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
            >
              <Bot className="w-4 h-4" />
              <span>{language === 'te' ? 'AI ట్యూటర్' : 'Nova AI Mentor'}</span>
            </button>
            <button
              onClick={() => setActiveTab('tools-academy')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4 text-cyan-300" />
              <span>{language === 'te' ? 'డెవలపర్ టూల్స్' : 'Dev Tools Academy'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Grid (Streak, Total Time, Enrolled, Lessons, Daily Goal) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Streak */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6 fill-amber-500" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {streak} <span className="text-xs font-semibold text-slate-500">Days</span>
            </div>
            <div className="text-[11px] font-medium text-slate-500">Learning Streak</div>
          </div>
        </div>

        {/* Total Time */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {Math.floor(learningMinutes / 60)}h {learningMinutes % 60}m
            </div>
            <div className="text-[11px] font-medium text-slate-500">Total Study Time</div>
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-500 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {enrolledCourseIds.length}
            </div>
            <div className="text-[11px] font-medium text-slate-500">Courses Enrolled</div>
          </div>
        </div>

        {/* Lessons Completed */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {completedLessons.length}
            </div>
            <div className="text-[11px] font-medium text-slate-500">Lessons Finished</div>
          </div>
        </div>

        {/* Daily Goal Ring / Bar */}
        <div className="col-span-2 lg:col-span-1 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-cyan-500" />
              Daily Goal
            </span>
            <span className="font-bold text-indigo-600 dark:text-indigo-400">
              {todayMinutes}/{dailyGoal}m
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden mt-2">
            <div
              className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${dailyGoalPercent}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-400 mt-1 text-right">
            {dailyGoalPercent}% Complete
          </div>
        </div>

      </div>

      {/* 3. Main 2-Column Section: Continue Learning + Weekly Activity Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (8 cols): Continue Learning & Idea Launcher */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Continue Learning Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Continue Learning</span>
              </div>
              <button
                onClick={() => setActiveTab('my-learning')}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>View My Courses</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/70 dark:border-slate-750">
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                  {activeCourse.category}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {activeCourse.title}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Next: Module 1 — How Tokens and Probabilistic Prediction Work (15 mins)
                </p>
                
                {/* Progress bar */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-36 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: '45%' }} />
                  </div>
                  <span className="text-xs font-semibold text-slate-500">45% Completed</span>
                </div>
              </div>

              <button
                onClick={() => openCourseDetail(activeCourse)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer shrink-0"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Resume Lesson</span>
              </button>
            </div>
          </div>

          {/* Turn Your Idea Into a Working Project Launcher */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Project Launchpad</span>
            </div>
            <div>
              <h2 className="text-xl font-black">Turn Your Idea Into a Working Full-Stack Project</h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Tell us what you want to build (e.g. "Student Attendance Tracker" or "Telugu AI Notes App") — our Wizard generates complete specs, prompts, and architecture.
              </p>
            </div>

            <form onSubmit={handleLaunchIdea} className="flex gap-2">
              <input
                type="text"
                value={inputIdea}
                onChange={e => setInputIdea(e.target.value)}
                placeholder="What project do you want to build today?"
                className="flex-1 px-4 py-3 rounded-xl !bg-slate-900/70 border border-white/20 !text-white placeholder:text-slate-400 text-sm focus:outline-hidden focus:border-cyan-400 focus:!bg-slate-900/90 caret-cyan-400 transition-all shadow-inner"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold text-sm hover:opacity-90 shadow-lg transition-all cursor-pointer shrink-0"
              >
                Generate Kit
              </button>
            </form>
          </div>

          {/* Quick Start Visual Studio Recipes */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Guided Build Recipes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => openStudioRecipe('website')}
                className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Layout className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Build a Web App</h3>
                    <p className="text-xs text-slate-500">React 19 + Tailwind + Vercel</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              <div
                onClick={() => openStudioRecipe('presentation')}
                className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Academic Seminar PPT</h3>
                    <p className="text-xs text-slate-500">8-Slide formula + Gamma prompts</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Learning Activity Chart & Goals Checklist */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Weekly Learning Activity Chart */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Weekly Activity</span>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">220 mins total</span>
            </div>

            {/* Bar Chart Visualization */}
            <div className="h-32 flex items-end justify-between gap-2 pt-4 px-2 border-b border-slate-100 dark:border-slate-700">
              {weeklyActivity.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <div className="relative w-full flex justify-center">
                    <div
                      className="w-full max-w-[24px] bg-gradient-to-t from-indigo-600 to-cyan-400 rounded-t-md transition-all group-hover:brightness-110"
                      style={{ height: d.height }}
                    />
                    {/* Tooltip on hover */}
                    <div className="absolute -top-7 hidden group-hover:block px-1.5 py-0.5 rounded-md bg-slate-900 text-white text-[10px] whitespace-nowrap z-20">
                      {d.minutes}m
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">{d.day}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>Best Day: Thursday (50m)</span>
              <span className="text-emerald-600 font-semibold">+18% vs last week</span>
            </div>
          </div>

          {/* Upcoming Learning Goals Checklist */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Target Milestones</span>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">2 of 4</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-850">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="line-through text-slate-400">Master LLM Token Prediction</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-850">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="line-through text-slate-400">Score 100% on Generative AI Quiz</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                <div className="w-4 h-4 rounded-full border-2 border-indigo-500 shrink-0" />
                <span className="font-semibold text-indigo-900 dark:text-indigo-200">
                  Complete React 19 State Immutability
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-850">
                <div className="w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-600 shrink-0" />
                <span className="text-slate-600 dark:text-slate-400">Analyze Placement Resume with ATS Hub</span>
              </div>
            </div>
          </div>

          {/* Quick Notes & Bookmarks Snapshot */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Study Saved Items</span>
              <button
                onClick={() => setActiveTab('notes')}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              >
                Open Notes
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div
                onClick={() => setActiveTab('notes')}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all cursor-pointer"
              >
                <div className="text-lg font-black text-slate-900 dark:text-white">{notes.length}</div>
                <div className="text-[11px] text-slate-500">Study Notes</div>
              </div>
              <div
                onClick={() => setActiveTab('notes')}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all cursor-pointer"
              >
                <div className="text-lg font-black text-slate-900 dark:text-white">{bookmarks.length}</div>
                <div className="text-[11px] text-slate-500">Bookmarks</div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
