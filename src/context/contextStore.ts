import { createContext, useContext } from 'react';
import type { SupportedLanguage, SkillLevel, Tool, GuidedTutorial, GeneratedProjectPlan } from '../types/index.ts';
import type { Course, CourseModuleLesson } from '../data/courses.ts';
import type { PracticeQuiz } from '../data/quizzes.ts';

export type TabType = 
  | 'welcome'
  | 'dashboard'
  | 'coding-practice'
  | 'playground'
  | 'tools-academy'
  | 'projects'
  | 'how-it-works'
  | 'learning-paths'
  | 'model-settings'
  | 'courses'
  | 'my-learning'
  | 'tutor'
  | 'quizzes'
  | 'notes'
  | 'progress'
  | 'achievements'
  | 'settings'
  | 'help'
  // Preserved legacy views
  | 'studio'
  | 'tools'
  | 'tutorials'
  | 'prompt-lab'
  | 'wizard'
  | 'academy'
  | 'career';

export interface SavedPrompt {
  id: string;
  title: string;
  prompt: string;
  createdAt: string;
}

export interface UserProfileData {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  bio?: string;
  learningInterests: string[];
  learningLevel: SkillLevel;
  explanationDepth: 'short' | 'standard' | 'detailed';
  dailyGoalMinutes: number;
  theme: 'light' | 'dark';
  streakDays: number;
  totalLearningMinutes: number;
  createdAt: string;
}

export interface NoteItem {
  id: string;
  title: string;
  content: string;
  tags: string[];
  courseId?: string;
  lessonId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookmarkItem {
  id: string;
  itemType: 'course' | 'lesson' | 'tutor_answer' | 'tool';
  itemId: string;
  title: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface AppContextType {
  // Locale & Core State
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  level: SkillLevel;
  setLevel: (level: SkillLevel) => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  serverOnline: boolean;
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Authentication State
  user: UserProfileData | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (fullName: string, email: string, password: string, interests?: string[], level?: SkillLevel) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfileData>) => Promise<boolean>;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  authModalMode: 'login' | 'signup' | 'forgot';
  setAuthModalMode: (mode: 'login' | 'signup' | 'forgot') => void;

  // Course & Lesson State
  enrolledCourseIds: string[];
  enrollInCourse: (courseId: string) => Promise<void>;
  selectedCourse: Course | null;
  openCourseDetail: (course: Course) => void;
  closeCourseDetail: () => void;
  selectedLesson: CourseModuleLesson | null;
  openLessonDetail: (lesson: CourseModuleLesson) => void;
  closeLessonDetail: () => void;

  // Quizzes State
  selectedQuiz: PracticeQuiz | null;
  openQuizDetail: (quiz: PracticeQuiz) => void;
  closeQuizDetail: () => void;

  // Notes & Bookmarks State
  notes: NoteItem[];
  saveNote: (title: string, content: string, tags?: string[], id?: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  bookmarks: BookmarkItem[];
  toggleBookmark: (itemType: 'course' | 'lesson' | 'tutor_answer' | 'tool', itemId: string, title: string, metadata?: any) => Promise<void>;
  isBookmarked: (itemType: string, itemId: string) => boolean;

  // Navigation helpers & Modals
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
  
  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  
  // Project Launcher Goal
  launcherGoal: string;
  setLauncherGoal: (goal: string) => void;
}

export const STORAGE_KEY = 'skillnova_user_data_v2';
export const AUTH_STORAGE_KEY = 'skillnova_auth_token_v2';

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
