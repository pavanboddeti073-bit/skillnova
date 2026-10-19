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

export type TutorLearningMode =
  | 'explain_concept'
  | 'explain_beginner'
  | 'deep_dive'
  | 'step_by_step'
  | 'real_world_examples'
  | 'quiz_me'
  | 'practice_hints'
  | 'review_answer'
  | 'summarize'
  | 'study_notes'
  | 'explain_code'
  | 'learning_roadmap'
  | 'compare_concepts'
  | 'exam_prep'
  | 'analogies';

export async function askTutor(
  userQuery: string,
  language: 'en' | 'te' = 'en',
  level: string = 'beginner',
  mode: string = 'explain_concept',
  depth: string = 'standard',
  focus: string = 'practical'
): Promise<AIChatResult> {
  const queryClean = userQuery.trim();

  // Try live Gemini API if key is present
  if (GEMINI_KEY && !GEMINI_KEY.includes('your_') && GEMINI_KEY.length > 20) {
    try {
      const modeInstructions: Record<string, string> = {
        explain_concept: 'Explain the core concept clearly and thoroughly.',
        explain_beginner: 'Explain like I am a complete beginner using intuitive, simple everyday analogies.',
        deep_dive: 'Provide an exhaustive deep-dive with internal mechanics, tradeoffs, and edge cases.',
        step_by_step: 'Break down problem solving into numbered sequential steps with before/after code.',
        real_world_examples: 'Focus heavily on concrete production use cases and industry implementations.',
        quiz_me: 'Test the student with 3 thought-provoking questions, hiding answers until they attempt.',
        practice_hints: 'Provide progressive subtle hints without giving away the full solution immediately.',
        review_answer: 'Critique and review the provided code or answer, noting bugs, style, and optimizations.',
        summarize: 'Provide a concise, high-impact bulleted summary of this topic.',
        study_notes: 'Generate structured markdown study notes with definitions, key tables, and takeaways.',
        explain_code: 'Explain the provided code snippet line-by-line with diagrams where useful.',
        learning_roadmap: 'Create a milestone-based sequential learning roadmap from zero to production ready.',
        compare_concepts: 'Compare the two concepts in a structured comparison table with pros, cons, and recommendations.',
        exam_prep: 'Highlight high-frequency college exam questions, viva questions, and formulas.',
        analogies: 'Explain the entire technical topic through creative, memorable real-world metaphors.'
      };

      const selectedModeInstruction = modeInstructions[mode] || modeInstructions.explain_concept;

      const systemInstruction = `You are SkillNova Mega14 AI Tutor, a friendly, encouraging, and authoritative senior software architect and university professor.
Language: ${language === 'te' ? 'Telugu (తెలుగు)' : 'English'}.
Student Skill Level: ${level} (Beginner, Intermediate, Advanced).
Explanation Depth: ${depth} (Short, Standard, Detailed).
Focus Area: ${focus} (Theory, Practical Examples, Exam Preparation).
Learning Mode: ${mode} -> ${selectedModeInstruction}

Structure your response cleanly using GitHub-flavored markdown:
1. 🎯 **Topic Title & Summary**: 1 clear sentence overview.
2. 💡 **Simple Definition & Why It Matters**: Why the student should care.
3. 🪜 **Step-by-Step Breakdown**: Practical explanation or code blocks.
4. ⚙️ **Key Terminology**: Definitions of important jargon.
5. 🌍 **Real-World Engineering Application**: How leading teams (Google, Vercel, Meta) use this.
6. ⚠️ **Common Mistakes & Misconceptions**: Pitfalls to avoid.
7. 📝 **Key Takeaways & Quick Quiz**: 1-2 knowledge-check questions.

Never invent fake tools or inaccurate syntax. If Telugu is requested, write fluent, culturally natural Telugu.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: `${systemInstruction}\n\nStudent Query: ${queryClean}` }
                ]
              }
            ],
            generationConfig: {
              temperature: focus === 'theory' ? 0.2 : 0.6,
              maxOutputTokens: depth === 'detailed' ? 1800 : 1000
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const followUps = language === 'te'
            ? ['దీనికి ప్రాక్టికల్ కోడ్ ఉదాహరణ చూపించండి', 'దీనిలో సాధారణంగా చేసే తప్పులు ఏమిటి?', 'నన్ను ఈ టాపిక్‌పై క్విజ్ చేయండి']
            : ['Show me a minimal working code example', 'What are common pitfalls and debugging tips?', 'Quiz me on this concept with 3 questions'];
          return {
            content: text,
            source: 'gemini-api',
            suggestedFollowUps: followUps
          };
        }
      }
    } catch (err) {
      console.warn('Gemini cloud API unreachable, falling back to SkillNova Mega14 engine:', err);
    }
  }

  // Authoritative multi-domain knowledge engine
  const fallback = resolveIntelligentAnswer(queryClean, language, level);
  return {
    content: fallback.reply,
    source: 'skillnova-core',
    suggestedFollowUps: fallback.suggestedFollowUps
  };
}

export async function optimizePrompt(
  draftPrompt: string,
  targetTask: string,
  level: string = 'beginner'
): Promise<string> {
  return `[ROLE]: Senior Software Engineer & AI Mentor\n[CONTEXT]: Working on ${targetTask} (Target Level: ${level})\n[TASK]: ${draftPrompt}\n[CONSTRAINTS]: Follow modern clean code standards, provide before/after examples, explain time/space complexity.\n[OUTPUT FORMAT]: Step-by-step markdown with runnable code snippets.`;
}

export async function generateProjectPlan(
  topic: string,
  level: string = 'beginner'
): Promise<any> {
  return {
    title: `${topic} - Full-Stack Engineering Roadmap`,
    overview: `A complete, modular project implementation plan for ${topic} tailored for ${level} developers.`,
    milestones: [
      { step: 1, title: 'Architecture & Schema Design', duration: '2 Days', output: 'Data models & system diagram' },
      { step: 2, title: 'API & Business Logic Scaffolding', duration: '3 Days', output: 'REST/Serverless routes' },
      { step: 3, title: 'Responsive UI & State Integration', duration: '3 Days', output: 'React 19 UI with Tailwind' },
      { step: 4, title: 'Testing, Security Audit & Cloud Deploy', duration: '2 Days', output: 'Vercel / GitHub Actions CI/CD' }
    ]
  };
}
