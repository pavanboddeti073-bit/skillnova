import React, { useMemo } from 'react';
import {
  Award,
  Sparkles,
  Flame,
  CheckCircle2,
  Lock,
  Share2,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../context/useApp';

export const AchievementsView: React.FC = () => {
  const { user, completedLessons, showToast, language } = useApp();

  const credentialId = useMemo(() => {
    const seed = user?.id || 'demo-learner';
    return `SKILLNOVA-MEGA14-${seed.toUpperCase().slice(0, 8)}`;
  }, [user?.id]);

  const achievements = [
    {
      id: 'first-lesson',
      title: 'First Step Taken',
      description: 'Completed your very first interactive lesson on SkillNova Mega14.',
      icon: <Sparkles className="w-6 h-6 text-indigo-500" />,
      unlocked: completedLessons.length >= 1,
      date: 'Earned'
    },
    {
      id: 'quiz-master',
      title: 'Knowledge Master',
      description: 'Achieved a passing score on a verified knowledge check quiz.',
      icon: <Award className="w-6 h-6 text-purple-500" />,
      unlocked: true,
      date: 'Earned'
    },
    {
      id: 'streak-3',
      title: 'Consistency Champion',
      description: 'Maintained a 3-day consecutive learning streak.',
      icon: <Flame className="w-6 h-6 text-amber-500" />,
      unlocked: (user?.streakDays || 0) >= 3,
      date: 'Earned'
    },
    {
      id: 'prompt-architect',
      title: 'Prompt Architect',
      description: 'Optimized prompts using the CR-TCO structural framework.',
      icon: <GraduationCap className="w-6 h-6 text-cyan-500" />,
      unlocked: true,
      date: 'Earned'
    },
    {
      id: 'fullstack-explorer',
      title: 'Full-Stack Explorer',
      description: 'Completed 5 lessons across Web Development & AI.',
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-500" />,
      unlocked: completedLessons.length >= 5,
      date: completedLessons.length >= 5 ? 'Earned' : 'Locked (Complete 5 lessons)'
    }
  ];

  const handleShareCertificate = () => {
    navigator.clipboard.writeText(`https://skillnova-lyart.vercel.app - Certified Learner: ${user?.fullName || 'Scholar'}`);
    showToast('Certificate link copied to clipboard!');
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <Award className="w-3.5 h-3.5" />
          <span>{language === 'te' ? 'విజయాలు & సర్టిఫికెట్లు' : 'Badges & Certificates'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Achievements & Recognition
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
          Earn verified skill badges and certificates as you progress through courses, quizzes, and projects.
        </p>
      </div>

      {/* Badges Grid */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Earned Skill Badges
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map(ach => (
            <div
              key={ach.id}
              className={`p-5 rounded-3xl border transition-all flex items-start gap-4 ${
                ach.unlocked
                  ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-850/60 border-slate-200 dark:border-slate-800 opacity-60'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                ach.unlocked
                  ? 'bg-indigo-50 dark:bg-indigo-950/70 shadow-xs'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
              }`}>
                {ach.unlocked ? ach.icon : <Lock className="w-5 h-5 text-slate-400" />}
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {ach.title}
                  </h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    ach.unlocked
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                  }`}>
                    {ach.unlocked ? 'Unlocked' : 'Locked'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {ach.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Certificate Showcase Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">
              Verified Course Credential
            </span>
            <h2 className="text-xl font-bold">Generative AI Foundations Certificate of Completion</h2>
            <p className="text-xs text-slate-300">
              Issued to <span className="font-bold text-white">{user?.fullName || 'Pavan Manikanta'}</span> by SkillNova Mega14 Academic Faculty.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareCertificate}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Credential</span>
            </button>
          </div>
        </div>

        {/* Certificate Frame Preview */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center space-y-3">
          <GraduationCap className="w-12 h-12 mx-auto text-indigo-400" />
          <div className="font-serif text-lg tracking-wide">SkillNova Mega14 Academic Certification</div>
          <div className="text-xs text-slate-300 max-w-md mx-auto">
            This certifies mastery of LLM tokenization, prompt architectures (CR-TCO), context windows, and modern AI engineering workflows.
          </div>
          <div className="text-[11px] font-mono text-cyan-400">
            Credential ID: {credentialId}
          </div>
        </div>
      </div>

    </div>
  );
};
