import React from 'react';
import { Sparkles } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { useApp } from '../context/useApp';

const CURRENT_YEAR = new Date().getFullYear();

interface FooterProps {
  onOpenPrivacyModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacyModal }) => {
  const { language, setActiveTab } = useApp();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-slate-500 dark:text-slate-400 text-xs py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-slate-900 dark:text-white text-sm">{siteConfig.name}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 font-bold text-indigo-600 dark:text-indigo-400">
                v2.0 Mega14 Edition
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-md">
              {language === 'te' ? siteConfig.taglineTe : siteConfig.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <button onClick={() => setActiveTab('courses')} className="hover:text-indigo-600 cursor-pointer">
              Explore Courses
            </button>
            <button onClick={() => setActiveTab('tutor')} className="hover:text-indigo-600 cursor-pointer">
              AI Tutor
            </button>
            <button onClick={() => setActiveTab('quizzes')} className="hover:text-indigo-600 cursor-pointer">
              Practice Quizzes
            </button>
            <button onClick={() => setActiveTab('studio')} className="hover:text-indigo-600 cursor-pointer">
              Visual Studio
            </button>
            <button onClick={() => setActiveTab('help')} className="hover:text-indigo-600 cursor-pointer">
              Help & Support
            </button>
            <button onClick={onOpenPrivacyModal} className="hover:text-indigo-600 text-indigo-600 dark:text-indigo-400 cursor-pointer">
              Trust & Privacy
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 dark:text-slate-500 text-[11px]">
          <div>
            © {CURRENT_YEAR} {siteConfig.name}. Empowering engineering scholars with zero boilerplate friction.
          </div>
          <div className="flex items-center gap-2">
            <span>Built with precision for students across AP & Telangana</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
