import React, { useState, useEffect, useCallback } from 'react';
import type { SupportedLanguage, SkillLevel, Tool, GuidedTutorial, GeneratedProjectPlan } from '../types/index.ts';
import type { Course, CourseModuleLesson } from '../data/courses.ts';
import type { PracticeQuiz } from '../data/quizzes.ts';
import { siteConfig } from '../config/siteConfig';
import { AppContext, STORAGE_KEY, AUTH_STORAGE_KEY } from './contextStore';
import type { TabType, SavedPrompt, UserProfileData, NoteItem, BookmarkItem, AppContextType } from './contextStore';

export type { TabType, AppContextType, SavedPrompt, UserProfileData, NoteItem, BookmarkItem };

const VALID_TABS: TabType[] = [
  'welcome',
  'dashboard',
  'courses',
  'my-learning',
  'tutor',
  'quizzes',
  'notes',
  'progress',
  'achievements',
  'settings',
  'help',
  'studio',
  'tools',
  'tutorials',
  'prompt-lab',
  'wizard',
  'academy',
  'career'
];

interface StoredUserData {
  language?: SupportedLanguage;
  level?: SkillLevel;
  theme?: 'light' | 'dark';
  completedLessons?: string[];
  favoriteTools?: string[];
  completedStudioSteps?: Record<string, number[]>;
  savedPrompts?: SavedPrompt[];
  savedPlans?: GeneratedProjectPlan[];
  enrolledCourseIds?: string[];
  notes?: NoteItem[];
  bookmarks?: BookmarkItem[];
  hasSeenWelcome?: boolean;
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

const defaultInitialUser: UserProfileData = {
  id: 'usr-student-demo',
  email: 'learner@skillnova.dev',
  fullName: 'Pavan Manikanta',
  bio: 'Computer Science Scholar & AI Engineer',
  learningInterests: ['Artificial Intelligence', 'Programming & Web Dev', 'Cloud Computing'],
  learningLevel: 'beginner',
  explanationDepth: 'standard',
  dailyGoalMinutes: 30,
  theme: 'light',
  streakDays: 4,
  totalLearningMinutes: 120,
  createdAt: new Date().toISOString()
};

const getInitialTab = (savedData: StoredUserData | null): TabType => {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash.replace('#', '') as TabType;
    if (VALID_TABS.includes(hash)) return hash;
    try {
      const saved = localStorage.getItem('skillnova_active_tab') as TabType;
      if (VALID_TABS.includes(saved)) return saved;
    } catch {}
    // If first-time visitor who hasn't seen welcome, show welcome
    if (!savedData?.hasSeenWelcome) {
      return 'welcome';
    }
  }
  return 'dashboard';
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [initialData] = useState<StoredUserData | null>(getInitialSavedData);
  const [language, setLanguageState] = useState<SupportedLanguage>(() => initialData?.language || siteConfig.defaultLanguage);
  const [level, setLevelState] = useState<SkillLevel>(() => initialData?.level || 'beginner');
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => initialData?.theme || 'light');
  const [activeTab, setActiveTabState] = useState<TabType>(() => getInitialTab(initialData));

  // User and Auth State
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(AUTH_STORAGE_KEY) || 'demo-token';
    }
    return null;
  });
  const [user, setUser] = useState<UserProfileData | null>(defaultInitialUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | 'forgot'>('login');

  // Enrolled Courses & Progress
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>(() =>
    initialData?.enrolledCourseIds || ['course-ai-foundations', 'course-react-fullstack']
  );
  const [completedLessons, setCompletedLessons] = useState<string[]>(() =>
    initialData?.completedLessons || ['lesson-tokens-prediction', 'lesson-ai-fundamentals']
  );
  const [favoriteTools, setFavoriteTools] = useState<string[]>(() =>
    initialData?.favoriteTools || ['google-antigravity', 'replit', 'lovable']
  );
  const [completedStudioSteps, setCompletedStudioSteps] = useState<Record<string, number[]>>(() =>
    initialData?.completedStudioSteps || { presentation: [1, 2], website: [1] }
  );

  // Notes & Bookmarks
  const [notes, setNotes] = useState<NoteItem[]>(() =>
    initialData?.notes || [
      {
        id: 'note-1',
        title: 'LLM Temperature Rules of Thumb',
        content: 'For deterministic coding and math, set temperature between 0.0 and 0.2. For brainstorming and creative writing, set temperature between 0.7 and 1.0.',
        tags: ['AI', 'Prompting', 'BestPractices'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'note-2',
        title: 'React 19 Immutability Checklist',
        content: 'Never use arr.push() or obj.prop = val. Always use setArr(prev => [...prev, item]) and setObj(prev => ({...prev, prop: val})).',
        tags: ['React', 'TypeScript', 'Frontend'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
  );

  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() =>
    initialData?.bookmarks || [
      {
        id: 'bm-1',
        itemType: 'course',
        itemId: 'course-ai-foundations',
        title: 'Generative AI Foundations & LLM Architecture',
        createdAt: new Date().toISOString()
      },
      {
        id: 'bm-2',
        itemType: 'tool',
        itemId: 'google-antigravity',
        title: 'Google Antigravity IDE',
        createdAt: new Date().toISOString()
      }
    ]
  );

  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>(() =>
    initialData?.savedPrompts || [
      {
        id: 'sp-1',
        title: 'Full-Stack Bug Fixer (CR-TCO)',
        prompt: `[ROLE]: Senior Full-Stack Engineer\n[CONTEXT]: Debugging an API endpoint\n[TASK]: Identify root cause and provide fix\n[CONSTRAINTS]: No breaking changes\n[OUTPUT]: Unified diff + explanation`,
        createdAt: new Date().toISOString()
      }
    ]
  );

  const [savedPlans, setSavedPlans] = useState<GeneratedProjectPlan[]>(() => initialData?.savedPlans || []);
  const [activeRecipeSlug, setActiveRecipeSlug] = useState<'presentation' | 'documentation' | 'website' | 'creative-media' | 'learn-tool' | null>(null);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [selectedTutorial, setSelectedTutorial] = useState<GuidedTutorial | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<CourseModuleLesson | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<PracticeQuiz | null>(null);
  const [serverOnline] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [launcherGoal, setLauncherGoal] = useState<string>('');

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  }, []);

  // Theme synchronization with document class
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setThemeState(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      showToast(next === 'dark' ? 'Dark theme enabled 🌙' : 'Light theme enabled ☀️');
      return next;
    });
  }, [showToast]);

  // Persist State to LocalStorage
  useEffect(() => {
    try {
      const payload: StoredUserData = {
        language,
        level,
        theme,
        completedLessons,
        favoriteTools,
        completedStudioSteps,
        savedPrompts,
        savedPlans,
        enrolledCourseIds,
        notes,
        bookmarks,
        hasSeenWelcome: true
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }, [language, level, theme, completedLessons, favoriteTools, completedStudioSteps, savedPrompts, savedPlans, enrolledCourseIds, notes, bookmarks]);

  const setActiveTab = useCallback((tab: TabType) => {
    setActiveTabState(tab);
    if (typeof window !== 'undefined') {
      window.location.hash = tab;
      try {
        localStorage.setItem('skillnova_active_tab', tab);
      } catch {}
    }
  }, []);

  const setLanguage = useCallback((lang: SupportedLanguage) => {
    setLanguageState(lang);
    showToast(lang === 'te' ? 'భాష తెలుగులోకి మార్చబడింది' : 'Language switched to English');
  }, [showToast]);

  const setLevel = useCallback((lvl: SkillLevel) => {
    setLevelState(lvl);
    if (user) {
      setUser(prev => prev ? { ...prev, learningLevel: lvl } : null);
    }
    showToast(`Skill level updated to ${lvl.charAt(0).toUpperCase() + lvl.slice(1)}`);
  }, [showToast, user]);

  // Auth Methods
  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Login failed' };
      }
      setUser(data.user);
      setToken(data.token);
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem(AUTH_STORAGE_KEY, data.token);
      }
      showToast(`Welcome back, ${data.user.fullName}!`);
      setShowAuthModal(false);
      setActiveTab('dashboard');
      return { success: true };
    } catch {
      // Local fallback for offline/preview
      const fallbackUser: UserProfileData = {
        ...defaultInitialUser,
        email,
        fullName: email.split('@')[0] || 'Learner'
      };
      setUser(fallbackUser);
      setIsAuthenticated(true);
      showToast(`Welcome back, ${fallbackUser.fullName}!`);
      setShowAuthModal(false);
      setActiveTab('dashboard');
      return { success: true };
    }
  }, [setActiveTab, showToast]);

  const signup = useCallback(async (
    fullName: string,
    email: string,
    password: string,
    interests?: string[],
    lvl?: SkillLevel
  ) => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          password,
          learningInterests: interests,
          learningLevel: lvl || 'beginner'
        })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Signup failed' };
      }
      setUser(data.user);
      setToken(data.token);
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem(AUTH_STORAGE_KEY, data.token);
      }
      showToast(`Account created! Welcome to SkillNova Mega14, ${data.user.fullName}!`);
      setShowAuthModal(false);
      setActiveTab('dashboard');
      return { success: true };
    } catch {
      const fallbackUser: UserProfileData = {
        id: `usr-${Date.now().toString(36)}`,
        email,
        fullName,
        bio: 'SkillNova Mega14 Scholar',
        learningInterests: interests || ['Artificial Intelligence', 'Programming & Web Dev'],
        learningLevel: lvl || 'beginner',
        explanationDepth: 'standard',
        dailyGoalMinutes: 30,
        theme: 'light',
        streakDays: 1,
        totalLearningMinutes: 0,
        createdAt: new Date().toISOString()
      };
      setUser(fallbackUser);
      setIsAuthenticated(true);
      showToast(`Account created! Welcome, ${fullName}!`);
      setShowAuthModal(false);
      setActiveTab('dashboard');
      return { success: true };
    }
  }, [setActiveTab, showToast]);

  const logout = useCallback(() => {
    if (token) {
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      }).catch(() => {});
    }
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
    showToast('You have been signed out.');
    setActiveTab('welcome');
  }, [token, showToast, setActiveTab]);

  const updateProfile = useCallback(async (updates: Partial<UserProfileData>): Promise<boolean> => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
    try {
      await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });
    } catch {}
    showToast('Profile settings saved successfully.');
    return true;
  }, [token, showToast]);

  // Course & Lesson actions
  const enrollInCourse = useCallback(async (courseId: string) => {
    if (!enrolledCourseIds.includes(courseId)) {
      setEnrolledCourseIds(prev => [...prev, courseId]);
      showToast('Enrolled in course successfully! 🎉');
      try {
        await fetch(`/api/courses/${courseId}/enroll`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch {}
    } else {
      showToast('You are already enrolled in this course.');
    }
  }, [enrolledCourseIds, token, showToast]);

  const openCourseDetail = useCallback((course: Course) => setSelectedCourse(course), []);
  const closeCourseDetail = useCallback(() => setSelectedCourse(null), []);
  const openLessonDetail = useCallback((lesson: CourseModuleLesson) => setSelectedLesson(lesson), []);
  const closeLessonDetail = useCallback(() => setSelectedLesson(null), []);
  const openQuizDetail = useCallback((quiz: PracticeQuiz) => setSelectedQuiz(quiz), []);
  const closeQuizDetail = useCallback(() => setSelectedQuiz(null), []);

  // Notes & Bookmarks actions
  const saveNote = useCallback(async (title: string, content: string, tags: string[] = [], id?: string) => {
    const timeNow = new Date().toISOString();
    if (id) {
      setNotes(prev => prev.map(n => n.id === id ? { ...n, title, content, tags, updatedAt: timeNow } : n));
      showToast('Note updated.');
    } else {
      const newNote: NoteItem = {
        id: `note-${Date.now()}`,
        title,
        content,
        tags,
        createdAt: timeNow,
        updatedAt: timeNow
      };
      setNotes(prev => [newNote, ...prev]);
      showToast('New note saved.');
    }
    try {
      await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ id, title, content, tags })
      });
    } catch {}
  }, [token, showToast]);

  const deleteNote = useCallback(async (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    showToast('Note deleted.');
    try {
      await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch {}
  }, [token, showToast]);

  const toggleBookmark = useCallback(async (
    itemType: 'course' | 'lesson' | 'tutor_answer' | 'tool',
    itemId: string,
    title: string,
    metadata?: any
  ) => {
    const exists = bookmarks.some(b => b.itemId === itemId && b.itemType === itemType);
    if (exists) {
      setBookmarks(prev => prev.filter(b => !(b.itemId === itemId && b.itemType === itemType)));
      showToast('Bookmark removed.');
    } else {
      const newBm: BookmarkItem = {
        id: `bm-${Date.now()}`,
        itemType,
        itemId,
        title,
        metadata,
        createdAt: new Date().toISOString()
      };
      setBookmarks(prev => [newBm, ...prev]);
      showToast('Saved to bookmarks! 🔖');
    }
    try {
      await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ itemType, itemId, title, metadata })
      });
    } catch {}
  }, [bookmarks, token, showToast]);

  const isBookmarked = useCallback((itemType: string, itemId: string) => {
    return bookmarks.some(b => b.itemType === itemType && b.itemId === itemId);
  }, [bookmarks]);

  // Legacy Helpers
  const toggleLessonComplete = useCallback((lessonId: string) => {
    setCompletedLessons(prev => {
      const exists = prev.includes(lessonId);
      const next = exists ? prev.filter(id => id !== lessonId) : [...prev, lessonId];
      showToast(exists ? 'Lesson marked incomplete' : 'Lesson completed! Great progress! 🎉');
      return next;
    });
  }, [showToast]);

  const toggleFavoriteTool = useCallback((toolId: string) => {
    setFavoriteTools(prev => {
      const exists = prev.includes(toolId);
      const next = exists ? prev.filter(id => id !== toolId) : [...prev, toolId];
      showToast(exists ? 'Removed from favorites' : 'Saved to favorite tools');
      return next;
    });
  }, [showToast]);

  const toggleStudioStep = useCallback((recipeId: string, stepNumber: number) => {
    setCompletedStudioSteps(prev => {
      const current = prev[recipeId] || [];
      const next = current.includes(stepNumber)
        ? current.filter(s => s !== stepNumber)
        : [...current, stepNumber];
      return { ...prev, [recipeId]: next };
    });
  }, []);

  const savePrompt = useCallback((title: string, promptText: string) => {
    setSavedPrompts(prev => [{ id: `sp-${Date.now()}`, title, prompt: promptText, createdAt: new Date().toISOString() }, ...prev]);
    showToast('Prompt saved to your library!');
  }, [showToast]);

  const deletePrompt = useCallback((id: string) => {
    setSavedPrompts(prev => prev.filter(p => p.id !== id));
    showToast('Prompt deleted');
  }, [showToast]);

  const savePlan = useCallback((plan: GeneratedProjectPlan) => {
    setSavedPlans(prev => [plan, ...prev]);
    showToast('Project roadmap saved to your profile!');
  }, [showToast]);

  const deletePlan = useCallback((id: string) => {
    setSavedPlans(prev => prev.filter(p => p.id !== id));
    showToast('Project plan deleted');
  }, [showToast]);

  const clearAllUserData = useCallback(() => {
    setCompletedLessons([]);
    setFavoriteTools([]);
    setCompletedStudioSteps({});
    setSavedPrompts([]);
    setSavedPlans([]);
    setNotes([]);
    setBookmarks([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    showToast('All stored student data cleared successfully.');
  }, [showToast]);

  const openStudioRecipe = useCallback((slug: 'presentation' | 'documentation' | 'website' | 'creative-media' | 'learn-tool') => {
    setActiveRecipeSlug(slug);
    setActiveTab('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [setActiveTab]);

  const openToolDetail = useCallback((tool: Tool) => setSelectedTool(tool), []);
  const closeToolDetail = useCallback(() => setSelectedTool(null), []);
  const openTutorial = useCallback((tut: GuidedTutorial) => setSelectedTutorial(tut), []);
  const closeTutorial = useCallback(() => setSelectedTutorial(null), []);

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
        theme,
        toggleTheme,

        user,
        isAuthenticated,
        token,
        login,
        signup,
        logout,
        updateProfile,
        showAuthModal,
        setShowAuthModal,
        authModalMode,
        setAuthModalMode,

        enrolledCourseIds,
        enrollInCourse,
        selectedCourse,
        openCourseDetail,
        closeCourseDetail,
        selectedLesson,
        openLessonDetail,
        closeLessonDetail,
        selectedQuiz,
        openQuizDetail,
        closeQuizDetail,

        notes,
        saveNote,
        deleteNote,
        bookmarks,
        toggleBookmark,
        isBookmarked,

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
        toastMessage,
        showToast,
        launcherGoal,
        setLauncherGoal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
