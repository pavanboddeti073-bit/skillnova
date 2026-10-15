import type { ChatMessage, SupportedLanguage, SkillLevel } from '../types/index.ts';
import { apiClient } from './api.ts';
import { resolveIntelligentAnswer } from './knowledgeEngine.ts';

export interface TutorResponse {
  content: string;
  isDemo: boolean;
  source?: string;
  suggestedFollowUps: string[];
}

// ===========================================================================
// DIRECT GEMINI API CALL FROM BROWSER (Primary path on Vercel)
// ===========================================================================
async function callGeminiDirectly(
  userQuery: string,
  language: SupportedLanguage,
  level: SkillLevel
): Promise<string | null> {
  const key = (import.meta as any).env?.VITE_GEMINI_API_KEY as string | undefined;
  if (!key || key.includes('your_') || key.length < 20) return null;

  try {
    const systemPrompt = `You are SkillNova AI Student Tutor — a friendly senior software engineer and mentor for students.
Language: ${language === 'te' ? 'Telugu (తెలుగు)' : 'English'}.
Level: ${level}.
Provide structured, practical guidance with examples and actionable steps. Never invent tools.`;

    const prompt = `${systemPrompt}\n\nStudent Question: ${userQuery}`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 900 }
        })
      }
    );

    if (res.ok) {
      const data = await res.json();
      const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text && text.trim().length > 20) return text.trim();
    }
  } catch (e) {
    console.warn('[SkillNova] Direct Gemini call failed:', e);
  }
  return null;
}

// ===========================================================================
// MAIN EXPORTED FUNCTION
// ===========================================================================
export async function askAiTutor(
  userQuery: string,
  language: SupportedLanguage = 'en',
  level: SkillLevel = 'beginner',
  _history: ChatMessage[] = []
): Promise<TutorResponse> {
  const sanitizedQuery = userQuery.trim().slice(0, 2000);
  if (!sanitizedQuery) {
    return {
      content: language === 'te'
        ? 'దయచేసి మీ ప్రశ్నను నమోదు చేయండి. నేను సహాయం చేయడానికి సిద్ధంగా ఉన్నాను!'
        : 'Please enter a valid question or topic. I\'m ready to help!',
      isDemo: false,
      source: 'skillnova-core',
      suggestedFollowUps: language === 'te'
        ? ['బిగినర్‌గా ఎక్కడ ప్రారంభించాలి?', 'CR-TCO ఫార్ములా వివరించండి']
        : ['Where do I start as a beginner?', 'Explain the CR-TCO prompt formula']
    };
  }

  // ─── Path 1: Direct Gemini API from browser (fastest, best quality) ───────
  try {
    const geminiReply = await callGeminiDirectly(sanitizedQuery, language, level);
    if (geminiReply) {
      return {
        content: geminiReply,
        isDemo: false,
        source: 'gemini-api',
        suggestedFollowUps: language === 'te'
          ? ['తదుపరి దశలు ఏమిటి?', 'కోడ్ ఉదాహరణ చూపించండి', 'ఇది ఎలా deploy చేయాలి?']
          : ['What are the next implementation steps?', 'Show me a code example', 'How do I test and deploy this?']
      };
    }
  } catch (err) {
    console.warn('[SkillNova] Direct Gemini failed, trying backend:', err);
  }

  // ─── Path 2: Full-Stack Backend API (local dev or Vercel serverless) ──────
  try {
    const backendRes = await apiClient.sendChatMessage(sanitizedQuery, language, level);
    if (backendRes && backendRes.reply && backendRes.reply.trim().length > 10) {
      return {
        content: backendRes.reply,
        isDemo: false,
        source: backendRes.source,
        suggestedFollowUps: backendRes.suggestedFollowUps ?? []
      };
    }
  } catch (err) {
    console.warn('[SkillNova] Backend API unavailable, using client engine:', err);
  }

  // ─── Path 3: Comprehensive Multi-Domain Engine Fallback ───────────────────
  const core = resolveIntelligentAnswer(sanitizedQuery, language, level);
  return {
    content: core.content,
    isDemo: false,
    source: 'skillnova-core',
    suggestedFollowUps: core.suggestedFollowUps
  };
}
