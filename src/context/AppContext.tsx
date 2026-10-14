import React, { createContext, useContext, useState, useEffect } from 'react';
import type { SupportedLanguage, SkillLevel, Tool, GuidedTutorial, GeneratedProjectPlan } from '../types/index.ts';
import { siteConfig } from '../config/siteConfig';
import { apiClient } from '../services/api';

export type TabType = 
  | 'dashboard'
  | 'studio'
  | 'tools'
  | 'tutorials'
  | 'prompt-lab'
  | 'wizard'
  | 'academy'
  | 'tutor'
  | 'career';

interface SavedPrompt {
  id: string;
  title: string;
  prompt: string;
  createdAt: string;
}

interface AppContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  level: SkillLevel;
  setLevel: (level: SkillLevel) => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  serverOnline: boolean;
  
  // Navigation helpers
  openStudioRecipe: (slug: 'presentation' | 'documentation' | 'website' | 'creative-media' | 'learn-tool') => void;
  openToolDetail: (tool: Tool) => void;
  selectedTool: Tool | null;
  closeToolDetail: () => void;
  openTutorial: (tutorial: GuidedTutorial) => void;
  selectedTutorial: GuidedTutorial | null;
  closeTutorial: () => void;
  
  // Progress & persistence
  completedLessons: string[];
  toggleLessonComplete: (lessonId: string) => void;
  favoriteTools: string[];
  toggleFavoriteTool: (toolId: string) => void;
  completedStudioSteps: Record<string, number[]>;
  toggleStudioStep: (recipeId: string, stepNumber: number) => void;
  
  // Saved user data
  savedPrompts: SavedPrompt[];
  savePrompt: (title: string, prompt: string) => void;
  deletePrompt: (id: string) => void;
  savedPlans: GeneratedProjectPlan[];
  savePlan: (plan: GeneratedProjectPlan) => void;
  deletePlan: (id: string) => void;
  clearAllUserData: () => void;
  
  // Active recipe for Build Studio
  activeRecipeSlug: 'presentation' | 'documentation' | 'website' | 'creative-media' | 'learn-tool' | null;
  setActiveRecipeSlug: (slug: 'presentation' | 'documentation' | 'website' | 'creative-media' | 'learn-tool' | null) => void;
  
  // Quick launcher query from home
  launcherGoal: string;
  setLauncherGoal: (goal: string) => void;
  
  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const STORAGE_KEY = 'skillnova_user_data_v1';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(siteConfig.defaultLanguage);
  const [level, setLevelState] = useState<SkillLevel>('beginner');
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [selectedTutorial, setSelectedTutorial] = useState<GuidedTutorial | null>(null);
  const [activeRecipeSlug, setActiveRecipeSlug] = useState<'presentation' | 'documentation' | 'website' | 'creative-media' | 'learn-tool' | null>('presentation');
  const [launcherGoal, setLauncherGoal] = useState<string>('');
  
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [favoriteTools, setFavoriteTools] = useState<string[]>([]);
  const [completedStudioSteps, setCompletedStudioSteps] = useState<Record<string, number[]>>({});
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([]);
  const [savedPlans, setSavedPlans] = useState<GeneratedProjectPlan[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [serverOnline, setServerOnline] = useState<boolean>(true);

  // Load from local storage and backend API
  useEffect(() => {
    // 1. Initial localStorage load
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.language) setLanguageState(parsed.language);
        if (parsed.level) setLevelState(parsed.level);
        if (Array.isArray(parsed.completedLessons)) setCompletedLessons(parsed.completedLessons);
        if (Array.isArray(parsed.favoriteTools)) setFavoriteTools(parsed.favoriteTools);
        if (parsed.completedStudioSteps) setCompletedStudioSteps(parsed.completedStudioSteps);
        if (Array.isArray(parsed.savedPrompts)) setSavedPrompts(parsed.savedPrompts);
        if (Array.isArray(parsed.savedPlans)) setSavedPlans(parsed.savedPlans);
      }
    } catch (e) {
      console.warn('Failed to parse saved user data from localStorage', e);
    }

    // 2. Hydrate from Full-Stack Backend Database
    apiClient.getHealth().then(health => {
      if (health) {
        setServerOnline(true);
        apiClient.getUserProgress().then(progress => {
          if (progress) {
            if (progress.completedLessons.length > 0) {
              setCompletedLessons(prev => Array.from(new Set([...prev, ...progress.completedLessons])));
            }
            if (progress.favoriteTools.length > 0) {
              setFavoriteTools(prev => Array.from(new Set([...prev, ...progress.favoriteTools])));
            }
          }
        });
      } else {
        setServerOnline(false);
      }
    }).catch(() => setServerOnline(false));
  }, []);

  // Sync to local storage
  const syncStorage = (updates: any) => {
    try {
      const current = {
        language,
        level,
        completedLessons,
        favoriteTools,
        completedStudioSteps,
        savedPrompts,
        savedPlans,
        ...updates
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    } catch (e) {
      console.warn('Failed to sync user data to localStorage', e);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3500);
  };

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    syncStorage({ language: lang });
    showToast(lang === 'te' ? 'భాష తెలుగుకు మార్చబడింది' : 'Language set to English');
  };

  const setLevel = (newLevel: SkillLevel) => {
    setLevelState(newLevel);
    syncStorage({ level: newLevel });
    showToast(`Level updated: ${newLevel.toUpperCase()}`);
  };

  const toggleLessonComplete = (lessonId: string) => {
    setCompletedLessons(prev => {
      const next = prev.includes(lessonId) ? prev.filter(id => id !== lessonId) : [...prev, lessonId];
      syncStorage({ completedLessons: next });
      showToast(next.includes(lessonId) ? '🎉 Lesson marked as complete!' : 'Lesson marked incomplete');
      return next;
    });
  };

  const toggleFavoriteTool = (toolId: string) => {
    setFavoriteTools(prev => {
      const next = prev.includes(toolId) ? prev.filter(id => id !== toolId) : [...prev, toolId];
      syncStorage({ favoriteTools: next });
      showToast(next.includes(toolId) ? 'Added to favorite tools' : 'Removed from favorites');
      return next;
    });
    apiClient.toggleFavorite(toolId);
  };

  const toggleStudioStep = (recipeId: string, stepNumber: number) => {
    setCompletedStudioSteps(prev => {
      const currentSteps = prev[recipeId] || [];
      const updated = currentSteps.includes(stepNumber)
        ? currentSteps.filter(s => s !== stepNumber)
        : [...currentSteps, stepNumber];
      const next = { ...prev, [recipeId]: updated };
      syncStorage({ completedStudioSteps: next });
      return next;
    });
    apiClient.toggleStudioStep(`${recipeId}-step-${stepNumber}`);
  };

  const savePrompt = (title: string, prompt: string) => {
    const newEntry: SavedPrompt = {
      id: 'sp-' + Date.now(),
      title: title || 'Custom Prompt',
      prompt,
      createdAt: new Date().toLocaleDateString()
    };
    const next = [newEntry, ...savedPrompts];
    setSavedPrompts(next);
    syncStorage({ savedPrompts: next });
    showToast('Prompt saved to your library!');
    apiClient.savePrompt(newEntry.title, prompt);
  };

  const deletePrompt = (id: string) => {
    const next = savedPrompts.filter(p => p.id !== id);
    setSavedPrompts(next);
    syncStorage({ savedPrompts: next });
    showToast('Prompt removed');
    apiClient.deletePrompt(id);
  };

  const savePlan = (plan: GeneratedProjectPlan) => {
    const next = [plan, ...savedPlans.filter(p => p.id !== plan.id)];
    setSavedPlans(next);
    syncStorage({ savedPlans: next });
    showToast('Project plan saved to your dashboard!');
  };

  const deletePlan = (id: string) => {
    const next = savedPlans.filter(p => p.id !== id);
    setSavedPlans(next);
    syncStorage({ savedPlans: next });
    showToast('Project plan removed');
  };

  const clearAllUserData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCompletedLessons([]);
    setFavoriteTools([]);
    setCompletedStudioSteps({});
    setSavedPrompts([]);
    setSavedPlans([]);
    apiClient.eraseAllData();
    showToast('All student data has been completely erased.');
  };

  const openStudioRecipe = (slug: 'presentation' | 'documentation' | 'website' | 'creative-media' | 'learn-tool') => {
    setActiveRecipeSlug(slug);
    setActiveTab('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openToolDetail = (tool: Tool) => {
    setSelectedTool(tool);
  };

  const closeToolDetail = () => {
    setSelectedTool(null);
  };

  const openTutorial = (tutorial: GuidedTutorial) => {
    setSelectedTutorial(tutorial);
    setActiveTab('tutorials');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeTutorial = () => {
    setSelectedTutorial(null);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        level,
        setLevel,
        activeTab,
        setActiveTab,
        serverOnline,
        openStudioRecipe,
        openToolDetail,
        selectedTool,
        closeToolDetail,
        openTutorial,
        selectedTutorial,
        closeTutorial,
        completedLessons,
        toggleLessonComplete,
        favoriteTools,
        toggleFavoriteTool,
        completedStudioSteps,
        toggleStudioStep,
        savedPrompts,
        savePrompt,
        deletePrompt,
        savedPlans,
        savePlan,
        deletePlan,
        clearAllUserData,
        activeRecipeSlug,
        setActiveRecipeSlug,
        launcherGoal,
        setLauncherGoal,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
