import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, '..', 'data', 'database.json');

export interface UserDatabase {
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

const defaultDatabase: UserDatabase = {
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
      content: 'Hello! I am your SkillNova AI Engineering Tutor. How can I assist you with your projects, coding, or learning today?',
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

// Ensure data folder exists
const dataDir = path.dirname(DB_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize database if not present
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify(defaultDatabase, null, 2), 'utf-8');
}

export function readDb(): UserDatabase {
  try {
    if (!fs.existsSync(DB_FILE)) {
      writeDb(defaultDatabase);
      return defaultDatabase;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw) as UserDatabase;
  } catch (err) {
    console.error('Error reading database, resetting to default:', err);
    return defaultDatabase;
  }
}

export function writeDb(data: UserDatabase): void {
  try {
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error('Error writing database:', err);
  }
}

export function resetDb(): UserDatabase {
  writeDb(defaultDatabase);
  return defaultDatabase;
}
