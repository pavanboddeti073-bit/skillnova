import React from 'react';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Bot,
  Brain,
  Award,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/useApp';

export const WelcomeExperience: React.FC = () => {
  const { language, setActiveTab, setShowAuthModal, setAuthModalMode } = useApp();

  const handleStartLearning = () => {
    setActiveTab('dashboard');
  };

  const handleExploreCourses = () => {
    setActiveTab('courses');
  };

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthModalMode(mode);
    setShowAuthModal(true);
  };

  return (
    <div className="relative overflow-hidden py-10 lg:py-16">
      {/* Background Decorative Mesh & Glows */}
      <div className="absolute inset-0 brand-mesh-gradient pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        
        {/* Top Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-semibold shadow-xs animate-float">
          <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
          <span>{language === 'te' ? 'SkillNova Mega14 కు స్వాగతం' : 'Welcome to SkillNova Mega14'}</span>
        </div>

        {/* Hero Branding & Headlines */}
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-0.5 shadow-xl shadow-indigo-500/25 animate-pulse-glow">
              <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[22px] flex items-center justify-center">
                <Brain className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-cyan-400 flex items-center justify-center text-[10px] font-black text-slate-900 border-2 border-white dark:border-slate-900">
                14
              </div>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Unlock Your Potential.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500">
              Learn Smarter with AI.
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {language === 'te'
              ? 'నైపుణ్యాలను నేర్చుకోవడానికి, క్లిష్టమైన భావనలను సులభంగా అర్థం చేసుకోవడానికి, ఆత్మవిశ్వాసంతో ప్రాక్టీస్ చేయడానికి మరియు మీ లక్ష్యాలను సాధించడానికి మీ వ్యక్తిగత AI సహచరుడు.'
              : 'Your personal AI learning companion for mastering skills, understanding complex concepts, practicing confidently, and achieving your goals.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={handleStartLearning}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>{language === 'te' ? 'నేర్చుకోవడం ప్రారంభించండి' : 'Start Learning'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleExploreCourses}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold text-sm sm:text-base border border-slate-200 dark:border-slate-700 shadow-xs hover:bg-slate-50 dark:hover:bg-slate-750 transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <span>{language === 'te' ? 'కోర్సులను చూడండి' : 'Explore Courses'}</span>
          </button>

          <button
            onClick={() => handleOpenAuth('signup')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-semibold text-sm sm:text-base border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-all cursor-pointer"
          >
            <span>{language === 'te' ? 'ఖాతా సృష్టించండి' : 'Create Free Account'}</span>
          </button>
        </div>

        {/* Value Proposition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 text-left">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-600 transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
              <Bot className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">15-Mode AI Tutor</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Tailored explanations from complete beginner to engineering deep dives with step-by-step code, analogies, and quizzes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-purple-300 dark:hover:border-purple-600 transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">10-Category Curriculum</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              From Generative AI, Full-Stack React 19, and Python Data Science to Career ATS Placement and Technical Communication.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-cyan-300 dark:hover:border-cyan-600 transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-950/70 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Interactive Verification</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Knowledge check quizzes with instant feedback, streak tracking, notes, bookmarks, and verifiable completion certificates.
            </p>
          </div>
        </div>

        {/* Platform Proof Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Full-Stack Verified Architecture</span>
            </div>
            <h2 className="text-xl font-bold">Ready to learn with zero boilerplate friction?</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Access guided tutorials, prompt engineering labs, and instant placement resume analysis.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleOpenAuth('login')}
              className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={handleStartLearning}
              className="px-5 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-sm transition-all shadow-md cursor-pointer"
            >
              Enter Dashboard
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
