import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = process.env.VERCEL
  ? path.join('/tmp', 'database.json')
  : path.join(__dirname, '..', 'data', 'database.json');

export interface UserProfile {
  id: string;
  email: string;
  passwordHash?: string;
  fullName: string;
  avatarUrl?: string;
  bio?: string;
  learningInterests: string[];
  learningLevel: 'beginner' | 'intermediate' | 'advanced';
  explanationDepth: 'short' | 'standard' | 'detailed';
  dailyGoalMinutes: number;
  theme: 'light' | 'dark';
  streakDays: number;
  totalLearningMinutes: number;
  createdAt: string;
  updatedAt?: string;
}

export interface UserSession {
  token: string;
  userId: string;
  expiresAt: string;
}

export interface EnrollmentRecord {
  id: string;
  userId: string;
  courseId: string;
  progressPercent: number;
  completed: boolean;
  enrolledAt: string;
  lastAccessedAt: string;
}

export interface LessonProgressRecord {
  id: string;
  userId: string;
  courseId: string;
  lessonId: string;
  completed: boolean;
  completedAt: string;
}

export interface QuizAttemptRecord {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  totalQuestions: number;
  passed: boolean;
  completedAt: string;
}

export interface UserNote {
  id: string;
  userId: string;
  title: string;
  content: string;
  tags: string[];
  courseId?: string;
  lessonId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserBookmark {
  id: string;
  userId: string;
  itemType: 'course' | 'lesson' | 'tutor_answer' | 'tool';
  itemId: string;
  title: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface UserAchievement {
  id: string;
  userId: string;
  badgeId: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

export interface TutorConversation {
  id: string;
  userId: string;
  title: string;
  mode: string;
  language: 'en' | 'te';
  messages: Array<{
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
    suggestedFollowUps?: string[];
    bookmarked?: boolean;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface UserDatabase {
  users: UserProfile[];
  sessions: UserSession[];
  enrollments: EnrollmentRecord[];
  lessonProgress: LessonProgressRecord[];
  quizAttempts: QuizAttemptRecord[];
  notes: UserNote[];
  bookmarks: UserBookmark[];
  achievements: UserAchievement[];
  conversations: TutorConversation[];
  // Legacy fields preserved for backward compatibility
  profile: {
    language: 'en' | 'te';
    level: 'beginner' | 'intermediate' | 'advanced';
    theme: 'light' | 'dark';
    updatedAt: string;
  };
  completedLessons: string[];
  quizScores: Record<string, { score: number; total: number; completedAt: string }>;
  favoriteTools: string[];
  completedStudioSteps: string[];
  savedPrompts: Array<{
    id: string;
    title: string;
    prompt: string;
    category: string;
    createdAt: string;
  }>;
  savedPlans: Array<{
    id: string;
    title: string;
    plan: any;
    createdAt: string;
  }>;
  chatHistory: Array<{
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
    suggestedFollowUps?: string[];
  }>;
  resumeHistory: Array<{
    id: string;
    score: number;
    summary: string;
    createdAt: string;
  }>;
}

const defaultUser: UserProfile = {
  id: 'usr-student-demo',
  email: 'learner@skillnova.dev',
  // SHA-256 hash for "SkillNova14!"
  passwordHash: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
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

const defaultDatabase: UserDatabase = {
  users: [defaultUser],
  sessions: [
    {
      token: 'session-demo-token-12345',
      userId: defaultUser.id,
      expiresAt: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString()
    }
  ],
  enrollments: [
    {
      id: 'enr-1',
      userId: defaultUser.id,
      courseId: 'course-ai-foundations',
      progressPercent: 35,
      completed: false,
      enrolledAt: new Date().toISOString(),
      lastAccessedAt: new Date().toISOString()
    },
    {
      id: 'enr-2',
      userId: defaultUser.id,
      courseId: 'course-react-fullstack',
      progressPercent: 20,
      completed: false,
      enrolledAt: new Date().toISOString(),
      lastAccessedAt: new Date().toISOString()
    }
  ],
  lessonProgress: [
    {
      id: 'prog-1',
      userId: defaultUser.id,
      courseId: 'course-ai-foundations',
      lessonId: 'lesson-tokens-prediction',
      completed: true,
      completedAt: new Date().toISOString()
    }
  ],
  quizAttempts: [
    {
      id: 'att-1',
      userId: defaultUser.id,
      quizId: 'quiz-ai-llm-basics',
      score: 4,
      totalQuestions: 4,
      passed: true,
      completedAt: new Date().toISOString()
    }
  ],
  notes: [
    {
      id: 'note-1',
      userId: defaultUser.id,
      title: 'LLM Temperature Rules of Thumb',
      content: 'For deterministic coding and math, set temperature between 0.0 and 0.2. For brainstorming and creative writing, set temperature between 0.7 and 1.0.',
      tags: ['AI', 'Prompting', 'BestPractices'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'note-2',
      userId: defaultUser.id,
      title: 'React 19 Immutability Checklist',
      content: 'Never use arr.push() or obj.prop = val. Always use setArr(prev => [...prev, item]) and setObj(prev => ({...prev, prop: val})).',
      tags: ['React', 'TypeScript', 'Frontend'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  bookmarks: [
    {
      id: 'bm-1',
      userId: defaultUser.id,
      itemType: 'course',
      itemId: 'course-ai-foundations',
      title: 'Generative AI Foundations & LLM Architecture',
      createdAt: new Date().toISOString()
    },
    {
      id: 'bm-2',
      userId: defaultUser.id,
      itemType: 'tool',
      itemId: 'google-antigravity',
      title: 'Google Antigravity IDE',
      createdAt: new Date().toISOString()
    }
  ],
  achievements: [
    {
      id: 'ach-1',
      userId: defaultUser.id,
      badgeId: 'first-lesson',
      title: 'First Step Taken',
      description: 'Completed your very first SkillNova Mega14 interactive lesson.',
      icon: 'Sparkles',
      unlockedAt: new Date().toISOString()
    },
    {
      id: 'ach-2',
      userId: defaultUser.id,
      badgeId: 'perfect-quiz',
      title: 'Knowledge Master',
      description: 'Achieved 100% on a SkillNova practice knowledge check quiz.',
      icon: 'Award',
      unlockedAt: new Date().toISOString()
    },
    {
      id: 'ach-3',
      userId: defaultUser.id,
      badgeId: 'streak-3',
      title: 'Consistency Champion',
      description: 'Maintained a 3-day consecutive learning streak.',
      icon: 'Flame',
      unlockedAt: new Date().toISOString()
    }
  ],
  conversations: [
    {
      id: 'conv-init-1',
      userId: defaultUser.id,
      title: 'Debugging TypeError: Cannot read properties of undefined',
      mode: 'step_by_step',
      language: 'en',
      messages: [
        {
          id: 'msg-c1',
          role: 'user',
          content: 'How do I fix: TypeError: Cannot read properties of undefined systematically?',
          timestamp: '10:30 AM'
        },
        {
          id: 'msg-c2',
          role: 'assistant',
          content: '### 🛠️ Systematic Fix for TypeError: Cannot read properties of undefined\n\n1. **Root Cause**: Attempting property access on null or undefined.\n2. **Solution**: Use Optional Chaining (`user?.profile?.name`) and Nullish Coalescing (`?? "Guest"`).',
          timestamp: '10:30 AM',
          suggestedFollowUps: ['Explain Nullish Coalescing vs OR', 'How to handle loading states in React']
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  // Legacy compatibility
  profile: {
    language: 'en',
    level: 'beginner',
    theme: 'light',
    updatedAt: new Date().toISOString()
  },
  completedLessons: ['lesson-ai-fundamentals'],
  quizScores: {
    'lesson-ai-fundamentals': { score: 3, total: 3, completedAt: new Date().toISOString() }
  },
  favoriteTools: ['google-antigravity', 'replit', 'lovable'],
  completedStudioSteps: ['recipe-website-step-1'],
  savedPrompts: [
    {
      id: 'sp-default-1',
      title: 'Full-Stack Bug Fixer (CR-TCO)',
      category: 'coding',
      prompt: `[ROLE]: Senior Full-Stack Engineer\n[CONTEXT]: Debugging an API endpoint\n[TASK]: Identify root cause and provide fix\n[CONSTRAINTS]: No breaking changes\n[OUTPUT]: Unified diff + explanation`,
      createdAt: new Date().toISOString()
    }
  ],
  savedPlans: [],
  chatHistory: [
    {
      id: 'msg-init-system',
      role: 'assistant',
      content: 'Hello! I am your SkillNova Mega14 AI Engineering Tutor. How can I assist you with your projects, coding, or learning today?',
      timestamp: 'Just now',
      suggestedFollowUps: [
        'How do I host a fullstack app for free?',
        'Teach me prompt engineering basics',
        'Help me choose between Antigravity and Replit'
      ]
    }
  ],
  resumeHistory: []
};

let memoryCache: UserDatabase = { ...defaultDatabase };

export function readDb(): UserDatabase {
  try {
    if (!fs.existsSync(DB_FILE)) {
      writeDb(defaultDatabase);
      return memoryCache;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    // Merge missing keys seamlessly
    memoryCache = {
      ...defaultDatabase,
      ...parsed,
      users: parsed.users?.length ? parsed.users : defaultDatabase.users,
      sessions: parsed.sessions?.length ? parsed.sessions : defaultDatabase.sessions,
      enrollments: parsed.enrollments ?? defaultDatabase.enrollments,
      lessonProgress: parsed.lessonProgress ?? defaultDatabase.lessonProgress,
      quizAttempts: parsed.quizAttempts ?? defaultDatabase.quizAttempts,
      notes: parsed.notes ?? defaultDatabase.notes,
      bookmarks: parsed.bookmarks ?? defaultDatabase.bookmarks,
      achievements: parsed.achievements ?? defaultDatabase.achievements,
      conversations: parsed.conversations ?? defaultDatabase.conversations
    };
    return memoryCache;
  } catch (err) {
    console.error('Error reading database, using fallback:', err);
    return memoryCache;
  }
}

export function writeDb(data: UserDatabase): void {
  memoryCache = data;
  try {
    const dataDir = path.dirname(DB_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.warn('Filesystem write failed, preserved in memory:', err);
  }
}

export function resetDb(): UserDatabase {
  writeDb(defaultDatabase);
  return defaultDatabase;
}
