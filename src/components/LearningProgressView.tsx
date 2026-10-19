import React from 'react';
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  Flame
} from 'lucide-react';
import { useApp } from '../context/useApp';

export const LearningProgressView: React.FC = () => {
  const { user, completedLessons, enrolledCourseIds, language } = useApp();

  const totalMinutes = user?.totalLearningMinutes || 120;
  const streak = user?.streakDays || 4;

  const categoryMastery = [
    { name: 'Artificial Intelligence', progress: 65, color: 'from-purple-600 to-indigo-600' },
    { name: 'Programming & Web Dev', progress: 50, color: 'from-blue-600 to-cyan-500' },
    { name: 'Career Development', progress: 80, color: 'from-emerald-600 to-teal-500' },
    { name: 'Data Science', progress: 25, color: 'from-amber-500 to-orange-500' },
    { name: 'Science & Technology', progress: 40, color: 'from-rose-500 to-pink-500' }
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{language === 'te' ? 'అభ్యాస ప్రగతి' : 'Learning Analytics'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Learning Progress & Skill Mastery
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
          Visual metrics tracking your study consistency, lesson completions, and domain-by-domain proficiency.
        </p>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Consistency Streak</span>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">{streak} Consecutive Days</div>
          <p className="text-xs text-slate-500">Keep learning daily to unlock the 7-day badge.</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Clock className="w-4 h-4 text-indigo-500" />
            <span>Total Study Time</span>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m
          </div>
          <p className="text-xs text-slate-500">Verified interactive reading and hands-on practice.</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Verified Lessons</span>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">{completedLessons.length} Finished</div>
          <p className="text-xs text-slate-500">Across {enrolledCourseIds.length} enrolled subjects.</p>
        </div>
      </div>

      {/* Domain Proficiency Bars */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Technical Domain Mastery
        </h3>

        <div className="space-y-5">
          {categoryMastery.map(cat => (
            <div key={cat.name} className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                <span>{cat.name}</span>
                <span className="text-indigo-600 dark:text-indigo-400">{cat.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${cat.color} rounded-full transition-all duration-700`}
                  style={{ width: `${cat.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
