import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveIntelligentAnswer } from '../src/services/knowledgeEngine.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const GEMINI_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';

export interface AIChatResult {
  content: string;
  source: 'gemini-api' | 'skillnova-core';
  suggestedFollowUps: string[];
}

export async function askTutor(
  userQuery: string,
  language: 'en' | 'te' = 'en',
  level: string = 'beginner'
): Promise<AIChatResult> {
  const queryClean = userQuery.trim();

  // Try live Gemini API if key is present
  if (GEMINI_KEY && !GEMINI_KEY.includes('your_') && GEMINI_KEY.length > 20) {
    try {
      const systemInstruction = `You are SkillNova AI Tutor, a friendly, encouraging senior software engineer and mentor for college students and beginners.
Language requested: ${language === 'te' ? 'Telugu (తెలుగు)' : 'English'}.
User level: ${level}.
Provide clear, structured, practical guidance with examples and actionable steps. Never invent tools or fake pricing. If asked in Telugu, answer fluently in Telugu.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: `${systemInstruction}\n\nStudent Question: ${queryClean}` }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1000
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const followUps = language === 'te'
            ? ['తదుపరి దశలు ఏమిటి?', 'దీనికి కోడ్ ఉదాహరణ ఇవ్వండి', 'ఇది ఎక్కడ డిప్లాయ్ చేయాలి?']
            : ['What are the next implementation steps?', 'Can you show a code snippet?', 'How do I test and deploy this?'];
          return {
            content: text,
            source: 'gemini-api',
            suggestedFollowUps: followUps
          };
        }
      }
    } catch (err) {
      console.warn('Gemini API request failed, falling back to SkillNova Core AI engine:', err);
    }
  }

  // Fallback to SkillNova Knowledge Engine
  const core = resolveIntelligentAnswer(queryClean, language, level);
  return {
    content: core.content,
    source: 'skillnova-core',
    suggestedFollowUps: core.suggestedFollowUps
  };
}

export function optimizePrompt(input: {
  role?: string;
  context: string;
  task: string;
  constraints?: string;
  outputFormat?: string;
  language?: string;
}): string {
  const role = input.role?.trim() || 'Senior Full-Stack Engineer and System Architect';
  const context = input.context.trim() || 'Building a modern student web application';
  const task = input.task.trim() || 'Implement this feature with complete error handling';
  const constraints = input.constraints?.trim() || 'Must use modern TypeScript, zero security leaks, accessible UI (WCAG AA)';
  const outputFormat = input.outputFormat?.trim() || 'Clean, formatted code with explanatory markdown notes and test cases';

  return `[ROLE]: ${role}

[CONTEXT]:
${context}

[TASK]:
${task}

[CONSTRAINTS & QUALITY CHECKS]:
- ${constraints}
- Handle edge cases, undefined inputs, and asynchronous rejections defensively.
- Maintain readability and clean code structure.

[OUTPUT FORMAT]:
${outputFormat}

[SUCCESS CRITERIA]:
The solution must compile cleanly with 0 type errors, run reliably, and include clear execution instructions.`;
}

export function generateProjectPlan(goal: string, skillLevel: string = 'beginner', hoursAvailable: number = 24) {
  const goalClean = goal.trim() || 'Student Web Application';
  
  return {
    id: `plan-${Date.now()}`,
    goalSummary: goalClean,
    skillLevel,
    estimatedHours: hoursAvailable,
    createdAt: new Date().toISOString(),
    recommendedStack: [
      { name: 'Google Antigravity / Replit', role: 'Autonomous AI Development & Editing' },
      { name: 'React 19 + TypeScript + Tailwind v4', role: 'Modern Responsive User Interface' },
      { name: 'Vercel / GitHub Pages', role: 'Zero-Cost Global Production Hosting' }
    ],
    milestones: [
      {
        step: 1,
        title: 'Project Architecture & Setup',
        duration: '1-2 hours',
        tasks: ['Initialize Git repository with .gitignore', 'Setup Vite + Tailwind CSS + TypeScript', 'Create site configuration and types'],
        prompt: `Create a clean Vite React TypeScript project for: "${goalClean}". Include responsive Tailwind styling and basic navigation.`
      },
      {
        step: 2,
        title: 'Core Business Logic & State',
        duration: '4-8 hours',
        tasks: ['Build primary user journeys', 'Connect persistent storage layer (API/localStorage)', 'Implement edge-case validation'],
        prompt: `Implement the primary feature for "${goalClean}". Ensure robust error handling, loading states, and accessible controls.`
      },
      {
        step: 3,
        title: 'Testing, Polishing & Multilingual Support',
        duration: '2-4 hours',
        tasks: ['Run automated verification suite', 'Audit contrast for WCAG AA', 'Verify mobile responsiveness'],
        prompt: `Review this codebase for "${goalClean}". Optimize contrast, fix layout overflow on mobile, and add test cases.`
      },
      {
        step: 4,
        title: 'Deployment & Hackathon Presentation',
        duration: '1-2 hours',
        tasks: ['Configure SPA rewrite in vercel.json', 'Deploy to Vercel and test live URL', 'Record 90-second working demo'],
        prompt: `Prepare deployment configuration for Vercel and generate a 90-second judge presentation script for "${goalClean}".`
      }
    ]
  };
}
