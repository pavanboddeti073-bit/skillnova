import { createContext, useContext } from 'react';
import type { SupportedLanguage, SkillLevel, Tool, GuidedTutorial, GeneratedProjectPlan } from '../types/index.ts';

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

export interface SavedPrompt {
  id: string;
  title: string;
  prompt: string;
  createdAt: string;
}

export interface AppContextType {
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

export const STORAGE_KEY = 'skillnova_user_data_v1';

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
