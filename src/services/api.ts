import type { ResumeAnalysis } from '../types/index.ts';

const BASE_URL = typeof window !== 'undefined' ? '/api' : 'http://localhost:3001/api';

export interface HealthStatus {
  status: string;
  uptimeSeconds: number;
  service: string;
  version: string;
  database: {
    status: string;
    completedLessonsCount: number;
    favoriteToolsCount: number;
    savedPromptsCount: number;
    chatHistoryCount: number;
  };
  aiEngine: {
    hasExternalGeminiKey: boolean;
    provider: string;
  };
}

export interface UserProgressData {
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
  savedPromptsCount: number;
  savedPlansCount: number;
}

export interface ChatResponse {
  reply: string;
  source: 'gemini-api' | 'skillnova-core';
  suggestedFollowUps: string[];
  timestamp: string;
}

export const apiClient = {
  async getHealth(): Promise<HealthStatus | null> {
    try {
      const res = await fetch(`${BASE_URL}/health`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  async getUserProgress(): Promise<UserProgressData | null> {
    try {
      const res = await fetch(`${BASE_URL}/user/progress`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  async updateUserProfile(profile: Partial<UserProgressData['profile']>): Promise<void> {
    try {
      await fetch(`${BASE_URL}/user/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
    } catch (err) {
      console.warn('Failed to sync profile to server:', err);
    }
  },

  async toggleFavorite(toolId: string): Promise<string[] | null> {
    try {
      const res = await fetch(`${BASE_URL}/user/favorites/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId })
      });
      if (res.ok) {
        const data = await res.json();
        return data.favoriteTools;
      }
    } catch (err) {
      console.warn('Failed to sync favorite:', err);
    }
    return null;
  },

  async toggleStudioStep(stepId: string): Promise<string[] | null> {
    try {
      const res = await fetch(`${BASE_URL}/user/studio-step/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stepId })
      });
      if (res.ok) {
        const data = await res.json();
        return data.completedStudioSteps;
      }
    } catch (err) {
      console.warn('Failed to sync studio step:', err);
    }
    return null;
  },

  async submitQuiz(lessonId: string, answers: Record<number, number>) {
    try {
      const res = await fetch(`${BASE_URL}/lessons/${lessonId}/quiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('Failed to submit quiz to server:', err);
    }
    return null;
  },

  async sendChatMessage(message: string, language: 'en' | 'te', level: string): Promise<ChatResponse | null> {
    try {
      const res = await fetch(`${BASE_URL}/tutor/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, language, level })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('Backend chat unreachable, seamlessly using local engine:', err);
    }

    return null;
  },

  async optimizePrompt(payload: {
    role?: string;
    context: string;
    task: string;
    constraints?: string;
    outputFormat?: string;
  }): Promise<string> {
    try {
      const res = await fetch(`${BASE_URL}/prompts/optimize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        return data.optimizedPrompt;
      }
    } catch (err) {
      console.warn('Failed to optimize prompt via API:', err);
    }
    return '';
  },

  async getSavedPrompts() {
    try {
      const res = await fetch(`${BASE_URL}/prompts`);
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('Failed to fetch prompts:', err);
    }
    return null;
  },

  async savePrompt(title: string, prompt: string, category: string = 'custom') {
    try {
      const res = await fetch(`${BASE_URL}/prompts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, prompt, category })
      });
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('Failed to save prompt to server:', err);
    }
    return null;
  },

  async deletePrompt(id: string) {
    try {
      await fetch(`${BASE_URL}/prompts/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('Failed to delete prompt:', err);
    }
  },

  async generateProjectPlan(goal: string, skillLevel: string, hoursAvailable: number = 24) {
    try {
      const res = await fetch(`${BASE_URL}/projects/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal, skillLevel, hoursAvailable })
      });
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('Failed to generate project plan on server:', err);
    }
    return null;
  },

  async analyzeResume(text: string): Promise<ResumeAnalysis | null> {
    try {
      const res = await fetch(`${BASE_URL}/resume/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('Failed to analyze resume on server:', err);
    }
    return null;
  },

  async eraseAllData(): Promise<void> {
    try {
      await fetch(`${BASE_URL}/user/data`, { method: 'DELETE' });
    } catch (err) {
      console.warn('Failed to delete user data on server:', err);
    }
  }
};
