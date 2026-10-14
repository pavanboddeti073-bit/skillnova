import React, { useState, useEffect } from 'react';
import type { SupportedLanguage, SkillLevel, Tool, GuidedTutorial, GeneratedProjectPlan } from '../types/index.ts';
import { siteConfig } from '../config/siteConfig';
import { apiClient } from '../services/api';
import { AppContext, STORAGE_KEY } from './contextStore';
import type { TabType, SavedPrompt, AppContextType } from './contextStore';

export type { TabType, AppContextType, SavedPrompt };

const VALID_TABS: TabType[] = [
  'dashboard',
  'studio',
  'tools',
  'tutorials',
  'prompt-lab',
  'wizard',
  'academy',
  'tutor',
  'career'
];

const getInitialTab = (): TabType => {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash.replace('#', '') as TabType;
    if (VALID_TABS.includes(hash)) return hash;
    try {
      const saved = localStorage.getItem('skillnova_active_tab') as TabType;
      if (VALID_TABS.includes(saved)) return saved;
    } catch {}
  }
  return 'dashboard';
};

interface StoredUserData {
  language?: SupportedLanguage;
  level?: SkillLevel;
  completedLessons?: string[];
  favoriteTools?: string[];
  completedStudioSteps?: Record<string, number[]>;
  savedPrompts?: SavedPrompt[];
  savedPlans?: GeneratedProjectPlan[];
}

const getInitialSavedData = (): StoredUserData | null => {
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as StoredUserData;
    } catch (e) {
      console.warn('Failed to parse saved user data from localStorage', e);
    }
  }
  return null;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [initialData] = useState<StoredUserData | null>(getInitialSavedData);
  const [language, setLanguageState] = useState<SupportedLanguage>(() => initialData?.language || siteConfig.defaultLanguage);
  const [level, setLevelState] = useState<SkillLevel>(() => initialData?.level || 'beginner');
  const [activeTab, setActiveTabState] = useState<TabType>(getInitialTab);

  const setActiveTab = (tab: TabType) => {
    setActiveTabState(tab);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('skillnova_active_tab', tab);
        if (window.location.hash !== `#${tab}`) {
          window.history.pushState(null, '', `#${tab}`);
        }
      } catch {}
    }
  };
  
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [selectedTutorial, setSelectedTutorial] = useState<GuidedTutorial | null>(null);
  const [activeRecipeSlug, setActiveRecipeSlug] = useState<'presentation' | 'documentation' | 'website' | 'creative-media' | 'learn-tool' | null>('presentation');
  const [launcherGoal, setLauncherGoal] = useState<string>('');
  
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => Array.isArray(initialData?.completedLessons) ? initialData.completedLessons : []);
  const [favoriteTools, setFavoriteTools] = useState<string[]>(() => Array.isArray(initialData?.favoriteTools) ? initialData.favoriteTools : []);
  const [completedStudioSteps, setCompletedStudioSteps] = useState<Record<string, number[]>>(() => initialData?.completedStudioSteps || {});
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>(() => Array.isArray(initialData?.savedPrompts) ? initialData.savedPrompts : []);
  const [savedPlans, setSavedPlans] = useState<GeneratedProjectPlan[]>(() => Array.isArray(initialData?.savedPlans) ? initialData.savedPlans : []);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [serverOnline, setServerOnline] = useState<boolean>(true);

  // Hydrate from Full-Stack Backend Database
  useEffect(() => {
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

  // Listen to browser navigation / hashchange events
  useEffect(() => {
    const handleHashChange = () => {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash.replace('#', '') as TabType;
        if (VALID_TABS.includes(hash)) {
          setActiveTabState(hash);
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
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
