import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { useApp } from '../context/AppContext';

const CURRENT_YEAR = new Date().getFullYear();

interface FooterProps {
  onOpenPrivacyModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacyModal }) => {
  const { language, setActiveTab } = useApp();

  return (
    <footer className="border-t border-slate-200 bg-white/60 text-slate-500 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-slate-900 text-sm">{siteConfig.name}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 font-semibold text-slate-700">
                v1.0 Hackathon Edition
              </span>
            </div>
            <p className="text-slate-500 max-w-md">
              {language === 'te' ? siteConfig.taglineTe : siteConfig.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
            <button onClick={() => setActiveTab('studio')} className="hover:text-blue-600">
              Visual Studio
            </button>
            <button onClick={() => setActiveTab('tools')} className="hover:text-blue-600">
              AI Tools
            </button>
            <button onClick={() => setActiveTab('tutorials')} className="hover:text-blue-600">
              Guided School
            </button>
            <button onClick={() => setActiveTab('prompt-lab')} className="hover:text-blue-600">
              Prompt Lab
            </button>
            <button onClick={() => setActiveTab('wizard')} className="hover:text-blue-600">
              Project Wizard
            </button>
            <button onClick={() => setActiveTab('academy')} className="hover:text-blue-600">
              Academy
            </button>
            <button onClick={() => setActiveTab('tutor')} className="hover:text-blue-600">
              AI Tutor
            </button>
            <button onClick={onOpenPrivacyModal} className="hover:text-blue-600 text-blue-700">
              Trust & Privacy
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>
            © {CURRENT_YEAR} {siteConfig.name}. Designed for college students, beginners & hackathon teams.
          </p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>WCAG AA & Zero Storage Privacy</span>
            </span>
            <button
              onClick={onOpenPrivacyModal}
              className="hover:underline text-slate-500"
            >
              Data Transparency Statement
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
