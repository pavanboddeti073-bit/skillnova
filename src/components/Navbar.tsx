import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  Wrench, 
  GraduationCap, 
  Terminal, 
  Compass, 
  Bot, 
  Briefcase, 
  Menu, 
  X, 
  Award, 
  ShieldAlert
} from 'lucide-react';
import { useApp, TabType } from '../context/AppContext';
import { siteConfig } from '../config/siteConfig';

interface NavbarProps {
  onOpenPrivacyModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPrivacyModal }) => {
  const { 
    language, 
    setLanguage, 
    level, 
    setLevel, 
    activeTab, 
    setActiveTab, 
    completedLessons,
    favoriteTools
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: Array<{ id: TabType; labelEn: string; labelTe: string; icon: React.ReactNode; badge?: string }> = [
    { id: 'dashboard', labelEn: 'Home', labelTe: 'హోమ్', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'studio', labelEn: 'Visual Studio', labelTe: 'విజువల్ స్టూడియో', icon: <Layers className="w-4 h-4" />, badge: 'Core' },
    { id: 'wizard', labelEn: 'Project Wizard', labelTe: 'ప్రాజెక్ట్ విజార్డ్', icon: <Compass className="w-4 h-4" /> },
    { id: 'tools', labelEn: 'AI Tools', labelTe: 'AI టూల్స్', icon: <Wrench className="w-4 h-4" /> },
    { id: 'tutorials', labelEn: 'Guided School', labelTe: 'గైడెడ్ స్కూల్', icon: <Terminal className="w-4 h-4" /> },
    { id: 'prompt-lab', labelEn: 'Prompt Lab', labelTe: 'ప్రాంప్ట్ ల్యాబ్', icon: <Terminal className="w-4 h-4" /> },
    { id: 'academy', labelEn: 'Academy', labelTe: 'అకాడమీ', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'tutor', labelEn: 'AI Tutor', labelTe: 'AI ట్యూటర్', icon: <Bot className="w-4 h-4" /> },
    { id: 'career', labelEn: 'Career & Resume', labelTe: 'కెరీర్ & రెజ్యూమ్', icon: <Briefcase className="w-4 h-4" /> },
  ];

  const handleNavClick = (tab: TabType) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalProgressCount = completedLessons.length + favoriteTools.length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl text-slate-900 tracking-tight">{siteConfig.name}</span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  Student Edition
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                {language === 'te' ? 'ఆలోచన నుండి ఫలితం వరకు' : 'From Idea to Working Result'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all relative ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.icon}
                  <span>{language === 'te' ? item.labelTe : item.labelEn}</span>
                  {item.badge && (
                    <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Language, Level, Progress, Mobile Toggle */}
          <div className="flex items-center gap-2">
            
            {/* Progress Badge */}
            <div 
              title={`${completedLessons.length} lessons completed, ${favoriteTools.length} tools saved`}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200"
            >
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>{totalProgressCount} XP</span>
            </div>

            {/* Language Switcher */}
            <div className="relative inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
                  language === 'en'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('te')}
                className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
                  language === 'te'
                    ? 'bg-white text-blue-700 shadow-xs font-semibold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                aria-label="తెలుగు భాషకు మార్చండి"
              >
                తెలుగు
              </button>
            </div>

            {/* Level Selector */}
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as any)}
              className="hidden sm:block text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white text-slate-700 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              aria-label="Student Experience Level"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            {/* Privacy & Data Settings */}
            <button
              onClick={onOpenPrivacyModal}
              title="Privacy, Data & Transparency"
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Privacy & Data Transparency Settings"
            >
              <ShieldAlert className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-1 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
            <span className="text-xs font-semibold uppercase text-slate-400">Navigation</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600">Level:</span>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as any)}
                className="text-xs border border-slate-200 rounded px-2 py-0.5 bg-white text-slate-700 font-medium"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-lg text-xs font-medium text-left transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.icon}
                  <span className="truncate">{language === 'te' ? item.labelTe : item.labelEn}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Completed XP: {totalProgressCount}</span>
            <button
              onClick={() => {
                onOpenPrivacyModal();
                setMobileMenuOpen(false);
              }}
              className="text-blue-600 font-medium hover:underline"
            >
              Data Privacy & Reset
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
