import React from 'react';
import {
  Sparkles,
  LayoutDashboard,
  Compass,
  GraduationCap,
  Bot,
  CheckSquare,
  Bookmark,
  TrendingUp,
  Award,
  Settings,
  HelpCircle,
  Layers,
  Wrench,
  Terminal,
  Briefcase,
  ChevronRight,
  LogOut,
  Flame,
  Sun,
  Moon
} from 'lucide-react';
import { useApp } from '../context/useApp';
import type { TabType } from '../context/contextStore';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const {
    activeTab,
    setActiveTab,
    user,
    isAuthenticated,
    logout,
    setShowAuthModal,
    setAuthModalMode,
    theme,
    toggleTheme,
    language
  } = useApp();

  const primaryNavItems: Array<{ id: TabType; labelEn: string; labelTe: string; icon: React.ReactNode; badge?: string }> = [
    { id: 'dashboard', labelEn: 'Dashboard', labelTe: 'డ్యాష్‌బోర్డ్', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'courses', labelEn: 'Explore Courses', labelTe: 'కోర్సులను అన్వేషించండి', icon: <Compass className="w-4 h-4" />, badge: '10 Cats' },
    { id: 'my-learning', labelEn: 'My Learning', labelTe: 'నా కోర్సులు', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'tutor', labelEn: 'AI Tutor', labelTe: 'AI ట్యూటర్', icon: <Bot className="w-4 h-4" />, badge: '15 Modes' },
    { id: 'quizzes', labelEn: 'Practice & Quizzes', labelTe: 'ప్రాక్టీస్ & క్విజ్‌లు', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'notes', labelEn: 'Notes & Bookmarks', labelTe: 'నోట్స్ & బుక్‌మార్క్స్', icon: <Bookmark className="w-4 h-4" /> },
    { id: 'progress', labelEn: 'Learning Progress', labelTe: 'నేర్చుకున్న ప్రగతి', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'achievements', labelEn: 'Achievements', labelTe: 'విజయాలు & బ్యాడ్జీలు', icon: <Award className="w-4 h-4" /> },
    { id: 'settings', labelEn: 'Settings', labelTe: 'సెట్టింగ్‌లు', icon: <Settings className="w-4 h-4" /> },
    { id: 'help', labelEn: 'Help & Support', labelTe: 'సహాయం & గైడ్', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  const toolsNavItems: Array<{ id: TabType; labelEn: string; labelTe: string; icon: React.ReactNode }> = [
    { id: 'studio', labelEn: 'Build Studio', labelTe: 'బిల్డ్ స్టూడియో', icon: <Layers className="w-4 h-4" /> },
    { id: 'tools', labelEn: 'AI Tools Catalog', labelTe: 'AI టూల్స్', icon: <Wrench className="w-4 h-4" /> },
    { id: 'tutorials', labelEn: 'Guided School', labelTe: 'గైడెడ్ స్కూల్', icon: <Terminal className="w-4 h-4" /> },
    { id: 'prompt-lab', labelEn: 'Prompt Lab', labelTe: 'ప్రాంప్ట్ ల్యాబ్', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'wizard', labelEn: 'Project Wizard', labelTe: 'ప్రాజెక్ట్ విజార్డ్', icon: <Compass className="w-4 h-4" /> },
    { id: 'career', labelEn: 'Resume & Career Hub', labelTe: 'కెరీర్ & రెజ్యూమ్', icon: <Briefcase className="w-4 h-4" /> },
  ];

  const handleNav = (tab: TabType) => {
    setActiveTab(tab);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* User Mini Profile Banner */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850">
          {isAuthenticated && user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                  {user.fullName.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <h2 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {user.fullName}
                  </h2>
                  <div className="flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                    <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>{user.streakDays}-Day Streak</span>
                  </div>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer"
                title="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Guest Visitor</span>
              <button
                onClick={() => { setShowAuthModal(true); setAuthModalMode('login'); }}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </div>
          )}
        </div>

        {/* Navigation Links Scroll Container */}
        <div className="flex-1 overflow-y-auto p-3 space-y-6">
          
          {/* Main 10 Navigation Items */}
          <div className="space-y-1">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Core Platform
            </div>
            {primaryNavItems.map(item => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={active ? 'text-white' : 'text-slate-500 dark:text-slate-400'}>
                      {item.icon}
                    </span>
                    <span>{language === 'te' ? item.labelTe : item.labelEn}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        active
                          ? 'bg-white/20 text-white'
                          : 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Creation Studio & Tools Section */}
          <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Creation Labs & Tools
            </div>
            {toolsNavItems.map(item => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    active
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{language === 'te' ? item.labelTe : item.labelEn}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                </button>
              );
            })}
          </div>

        </div>

        {/* Sidebar Footer Logout */}
        {isAuthenticated && (
          <div className="p-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={logout}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>{language === 'te' ? 'లాగ్ అవుట్' : 'Sign Out'}</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
};
