import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveIntelligentAnswer } from '../src/services/knowledgeEngine.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const GEMINI_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';
const MODEL_API_KEY = process.env.MODEL_API_KEY || '';
const HF_TOKEN = process.env.HF_TOKEN || '';

export interface AIChatResult {
  content: string;
  source: 'meta-api' | 'ollama-local' | 'huggingface' | 'gemini-api' | 'skillnova-core';
  suggestedFollowUps: string[];
  modelUsed?: string;
}

export type TutorTaskMode =
  | 'explain_concept'
  | 'explain_code'
  | 'debug_error'
  | 'code_review'
  | 'suggest_tests'
  | 'simplify_code'
  | 'convert_language'
  | 'write_docstrings'
  | 'complexity_analysis'
  | 'security_audit'
  | 'refactoring'
  | 'interview_questions'
  | 'step_by_step'
  | 'real_world_compare'
  | 'learning_roadmap';

export const TASK_MODE_DESCRIPTIONS: Record<TutorTaskMode, string> = {
  explain_concept: 'Explain the core programming or computer science concept clearly with analogies.',
  explain_code: 'Analyze the provided code and explain line-by-line what each statement does.',
  debug_error: 'Diagnose runtime errors, stack traces, and logic bugs, then provide the exact fix.',
  code_review: 'Conduct a professional senior engineer code review assessing readability, efficiency, and edge cases.',
  suggest_tests: 'Design comprehensive unit test cases (happy path, boundary conditions, malicious/null inputs).',
  simplify_code: 'Refactor and simplify complex or verbose code while preserving identical behavior.',
  convert_language: 'Idiomatically convert code from one programming language to another with notes on differences.',
  write_docstrings: 'Generate production-grade JSDoc / Docstrings / Type annotations and inline comments.',
  complexity_analysis: 'Analyze Big-O Time and Space complexity with detailed mathematical breakdowns.',
  security_audit: 'Identify security vulnerabilities (OWASP Top 10, injection, memory leaks, unescaped inputs).',
  refactoring: 'Restructure code using design patterns (SOLID principles, clean architecture, DRY).',
  interview_questions: 'Generate challenging technical interview questions and follow-up prompts on this topic.',
  step_by_step: 'Break down complex logic into numbered implementation stages with before/after snippets.',
  real_world_compare: 'Compare two architectural approaches or libraries with trade-offs in production systems.',
  learning_roadmap: 'Create a milestone-based sequential developer roadmap from zero to production proficiency.'
};

/**
 * Call Meta Model API (muse-spark-1.3)
 */
async function callMetaModelAPI(prompt: string, systemPrompt: string): Promise<string | null> {
  if (!MODEL_API_KEY || MODEL_API_KEY.includes('your_') || MODEL_API_KEY.length < 10) {
    return null;
  }

  try {
    const res = await fetch('https://api.meta.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MODEL_API_KEY}`
      },
      body: JSON.stringify({
        model: 'muse-spark-1.3',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.6,
        max_tokens: 1500
      })
    });

    if (res.ok) {
      const data = await res.json();
      return data?.choices?.[0]?.message?.content || null;
    }
  } catch (err) {
    console.warn('[SkillNova Meta Model API] Call failed:', err);
  }
  return null;
}

/**
 * Call Ollama Local Runner (open-weight, zero cost, completely on-device)
 */
async function callOllamaLocal(prompt: string, systemPrompt: string): Promise<string | null> {
  try {
    const res = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'qwen2.5-coder:7b',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        stream: false
      }),
      signal: AbortSignal.timeout(3500)
    });

    if (res.ok) {
      const data = await res.json();
      return data?.message?.content || null;
    }
  } catch {
    // Local Ollama server is not currently running, proceed to cloud/fallback
  }
  return null;
}

/**
 * Call Hugging Face Open-Weight Inference Endpoint
 */
async function callHuggingFaceAPI(prompt: string, systemPrompt: string): Promise<string | null> {
  if (!HF_TOKEN || HF_TOKEN.includes('your_')) return null;

  try {
    const res = await fetch('https://api-inference.huggingface.co/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HF_TOKEN}`
      },
      body: JSON.stringify({
        model: 'Qwen/Qwen2.5-Coder-32B-Instruct',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1200
      })
    });

    if (res.ok) {
      const data = await res.json();
      return data?.choices?.[0]?.message?.content || null;
    }
  } catch (err) {
    console.warn('[SkillNova HF API] Call failed:', err);
  }
  return null;
}

/**
 * Call Google Gemini 3.5 Cloud
 */
async function callGeminiCloud(prompt: string, systemPrompt: string): Promise<string | null> {
  if (!GEMINI_KEY || GEMINI_KEY.includes('your_') || GEMINI_KEY.length < 20) return null;

  const candidateModels = ['gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-3.8-flash'];
  for (const modelName of candidateModels) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: `${systemPrompt}\n\nStudent Query: ${prompt}` }]
              }
            ],
            generationConfig: {
              temperature: 0.5,
              maxOutputTokens: 1400
            }
          })
        }
      );
      if (res.ok) {
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      }
    } catch {
      // try next model
    }
  }
  return null;
}

/**
 * Master multi-model AI Tutor with 15 specialized task modes
 */
export async function askTutor(
  userQuery: string,
  language: 'en' | 'te' = 'en',
  level: string = 'beginner',
  mode: TutorTaskMode | string = 'explain_concept',
  depth: string = 'standard',
  focus: string = 'practical',
  preferredProviderId?: string
): Promise<AIChatResult> {
  const queryClean = userQuery.trim();
  const taskInstruction = (TASK_MODE_DESCRIPTIONS as any)[mode] || TASK_MODE_DESCRIPTIONS.explain_concept;

  const systemInstruction = `You are Nova AI, the premier AI Coding Mentor on SkillNova Mega14.
Role: Senior Staff Software Architect, Principal Compiler Engineer & Empathetic Coding Educator.
Student Language: ${language === 'te' ? 'Telugu (తెలుగు)' : 'English'}.
Skill Level: ${level} (Beginner, Intermediate, Advanced).
Explanation Depth: ${depth} (Short, Standard, Detailed).
Focus Area: ${focus} (Practical, Theory, Architecture).
Active Task Mode: ${mode} -> ${taskInstruction}

Formatting Rules:
1. Always format responses in clean GitHub-flavored markdown.
2. Provide syntactically valid code blocks with explicit language identifiers (e.g., \`\`\`python, \`\`\`typescript, \`\`\`sql).
3. Structure with clear headers:
   - 🎯 **Task Objective & Core Insight**
   - 💡 **Explanation & Deep-Dive**
   - 💻 **Production-Ready Code Example**
   - ⚙️ **Key Edge Cases & Common Pitfalls**
   - ⏱️ **Time & Space Complexity** (where applicable)
   - 🚀 **Next Implementation Step**
4. If Telugu is requested, use culturally natural, professional Telugu mixed with standard technical terms.`;

  // 1. Check if user specified Meta Model API or if MODEL_API_KEY is active
  if (preferredProviderId === 'meta-muse' || (!preferredProviderId && MODEL_API_KEY)) {
    const metaResponse = await callMetaModelAPI(queryClean, systemInstruction);
    if (metaResponse) {
      return {
        content: metaResponse,
        source: 'meta-api',
        modelUsed: 'Meta Muse Spark 1.3',
        suggestedFollowUps: language === 'te'
          ? ['దీనికి యూనిట్ టెస్ట్‌లు రాయండి', 'ఇతర భాషలలో ఇది ఎలా ఉంటుంది?', 'దీని కాంప్లెక్సిటీ ఎంత?']
          : ['Generate comprehensive unit tests', 'How would this look in TypeScript vs Python?', 'What are the Big-O trade-offs?']
      };
    }
  }

  // 2. Check if user specified Ollama Local
  if (preferredProviderId === 'ollama-local') {
    const localResponse = await callOllamaLocal(queryClean, systemInstruction);
    if (localResponse) {
      return {
        content: localResponse,
        source: 'ollama-local',
        modelUsed: 'Qwen 2.5 Coder 7B (Local)',
        suggestedFollowUps: ['Show edge cases', 'Write test assertions', 'Optimize memory usage']
      };
    }
  }

  // 3. Check if user specified Hugging Face
  if (preferredProviderId === 'huggingface-qwen' || HF_TOKEN) {
    const hfResponse = await callHuggingFaceAPI(queryClean, systemInstruction);
    if (hfResponse) {
      return {
        content: hfResponse,
        source: 'huggingface',
        modelUsed: 'Qwen 2.5 Coder 32B (Hugging Face)',
        suggestedFollowUps: ['Explain line-by-line', 'Compare alternative implementations', 'Run vulnerability audit']
      };
    }
  }

  // 4. Try Google Gemini Cloud
  const geminiResponse = await callGeminiCloud(queryClean, systemInstruction);
  if (geminiResponse) {
    return {
      content: geminiResponse,
      source: 'gemini-api',
      modelUsed: 'Google Gemini 3.5 Cloud',
      suggestedFollowUps: language === 'te'
        ? ['దీనికి ప్రాక్టికల్ కోడ్ ఉదాహరణ చూపించండి', 'దీనిలో సాధారణంగా చేసే తప్పులు ఏమిటి?', 'నన్ను ఈ టాపిక్‌పై క్విజ్ చేయండి']
        : ['Show me a minimal working code example', 'What are common pitfalls and debugging tips?', 'Quiz me on this concept with 3 questions']
    };
  }

  // 5. High-fidelity Deterministic SkillNova Knowledge Engine fallback
  const fallback = resolveIntelligentAnswer(queryClean, language as any, level);
  return {
    content: fallback.content || (fallback as any).reply || '',
    source: fallback.source || 'skillnova-core',
    modelUsed: 'SkillNova Core Deterministic Engine',
    suggestedFollowUps: fallback.suggestedFollowUps || []
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
