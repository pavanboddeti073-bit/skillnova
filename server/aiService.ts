import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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
  const lower = queryClean.toLowerCase();

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
  return generateCoreAnswer(lower, queryClean, language, level);
}

function generateCoreAnswer(
  lower: string,
  query: string,
  lang: 'en' | 'te',
  level: string
): AIChatResult {
  // Topic: Where to start / beginner roadmap
  if (lower.includes('start') || lower.includes('begin') || lower.includes('ఎక్కడ మొదలు')) {
    if (lang === 'te') {
      return {
        content: `**AI ప్రాజెక్ట్‌ను ప్రారంభించడానికి 4 ప్రాథమిక దశలు:**\n\n1. **లక్ష్యాన్ని స్పష్టం చేయండి**: మీరు ఏమి నిర్మించాలనుకుంటున్నారో 1 వాక్యంలో రాయండి (ఉదా: స్టూడెంట్ పోర్ట్‌ఫోలియో లేదా నోట్స్ షేరింగ్ యాప్).\n2. **సరైన టూల్ ఎంచుకోండి**:\n   - వెబ్‌సైట్స్ & UI కోసం: **Lovable** లేదా **v0**\n   - పూర్తి యాప్స్ & బ్యాకెండ్ కోసం: **Google Antigravity** లేదా **Replit Agent**\n3. **CR-TCO ఫార్మాట్‌లో ప్రాంప్ట్ రాయండి**: రోల్, సందర్భం, టాస్క్, నిబంధనలు మరియు అవుట్‌పుట్ ఫార్మాట్ పేర్కొనండి.\n4. **మొదటి వెర్షన్ టెస్ట్ చేయండి**: గిట్‌హబ్‌కు కోడ్ పుష్ చేసి **Vercel** లో ఉచితంగా హోస్ట్ చేయండి.`,
        source: 'skillnova-core',
        suggestedFollowUps: [
          'CR-TCO ప్రాంప్ట్ ఎలా రాయాలి?',
          'ఉచిత హోస్టింగ్ ఎలా సెటప్ చేయాలి?',
          'Google Antigravity ఎలా ఉపయోగించాలి?'
        ]
      };
    }
    return {
      content: `**4 Concrete Steps to Start as an AI Beginner:**\n\n1. **Define a narrow deliverable**: Frame your idea into a 1-sentence outcome (e.g., "A student attendance calculator with export to PDF").\n2. **Select the appropriate tool for your level (${level}):**\n   - Rapid UI/Frontend: **Lovable** or **Bolt.new**\n   - Autonomous coding & tests: **Google Antigravity**\n   - Quick backend & hosting: **Replit Agent**\n3. **Use Structured Prompting (CR-TCO)**: Never just ask "build me an app". Specify Role, Context, Task, Constraints, and Output Format.\n4. **Deploy early**: Ship to **Vercel** or **GitHub Pages** so you have a live link within 24 hours.`,
      source: 'skillnova-core',
      suggestedFollowUps: [
        'How do I write a CR-TCO prompt?',
        'Show me a beginner tutorial for Antigravity',
        'How do I host a full-stack project for free?'
      ]
    };
  }

  // Topic: Free hosting & deployment
  if (lower.includes('host') || lower.includes('deploy') || lower.includes('free') || lower.includes('vercel') || lower.includes('హోస్టింగ్')) {
    if (lang === 'te') {
      return {
        content: `**పూర్తిగా ఉచితంగా ఫుల్‌స్టాక్ వెబ్‌సైట్ హోస్టింగ్ గైడ్:**\n\n1. **ఫ్రంటెండ్ (React/Vite)**: **Vercel** లేదా **Netlify** — ఉచిత SSL, కస్టమ్ డొమైన్, ఆటోమేటిక్ గిట్‌హబ్ డెప్లాయ్‌మెంట్స్.\n2. **బ్యాకెండ్ API**: **Render.com** (Free Web Service) లేదా **Railway** లేదా **Vercel Serverless Functions**.\n3. **డేటాబేస్**: **Supabase** (Free Postgres 500MB) లేదా **Neon.tech** (Serverless Postgres).\n4. **ముఖ్యమైన నియమం**: మీ API కీలను ఎప్పుడూ గిట్‌హబ్‌కు పుష్ చేయకండి; Vercel ప్రాజెక్ట్ సెట్టింగ్స్‌లో Environment Variables లో భద్రపరచండి.`,
        source: 'skillnova-core',
        suggestedFollowUps: [
          'Vercel లో SPA రూటింగ్ ఎలా ఫిక్స్ చేయాలి?',
          'Environment Variables ఎలా సెట్ చేయాలి?',
          'Supabase డేటాబేస్ ఎలా కనెక్ట్ చేయాలి?'
        ]
      };
    }
    return {
      content: `**Student Free-Tier Hosting Blueprint (Zero Cost):**\n\n1. **Frontend**: **Vercel** or **Cloudflare Pages** — Generous free bandwidth, automated GitHub CI/CD, and free global CDN.\n2. **Backend**: **Render** (Free tier web services) or **Vercel Serverless API routes**.\n3. **Database**: **Supabase** (Free PostgreSQL instance) or **Neon Serverless Postgres**.\n4. **Critical Rule**: Always store sensitive credentials in Environment Variables in the host dashboard, never in client code or Git repository.`,
      source: 'skillnova-core',
      suggestedFollowUps: [
        'How does vercel.json rewrite work?',
        'How to prevent API keys from leaking on GitHub?',
        'What are the free limits on Supabase?'
      ]
    };
  }

  // Topic: Prompt engineering
  if (lower.includes('prompt') || lower.includes('cr-tco') || lower.includes('ప్రాంప్ట్')) {
    return {
      content: `**The CR-TCO Framework for High-Impact Prompts:**\n\n- **[C] Context**: Explain your environment, project purpose, and tech stack (e.g., "React 19 + TypeScript + Vite").\n- **[R] Role**: Assign a specialized persona (e.g., "Act as a Principal Security Engineer").\n- **[T] Task**: Explicit instruction with clear boundary (e.g., "Refactor this authentication handler").\n- **[C] Constraints**: Guardrails (e.g., "Zero external dependencies, WCAG AA compliant, handle null values defensively").\n- **[O] Output Format**: Exact desired shape (e.g., "TypeScript code block only with brief explanation of changes").\n\n💡 *Tip: Try our built-in Prompt Lab tab to generate structured prompts automatically!*`,
      source: 'skillnova-core',
      suggestedFollowUps: [
        'Generate a prompt for fixing React state bugs',
        'Generate a prompt for building a landing page',
        'How to prompt AI for clean database schemas'
      ]
    };
  }

  // Generic intelligent tutor reply
  if (lang === 'te') {
    return {
      content: `**SkillNova AI ఇంజనీరింగ్ సమాధానం:**\n\nమీ ప్రశ్న: "*${query}*"\n\nవిద్యార్థుల కోసం మా సిఫార్సు:\n1. ఈ సమస్యను చిన్న చిన్న భాగాలగా విభజించండి.\n2. టూల్స్ ఎక్స్‌ప్లోరర్‌లో ధృవీకరించబడిన ఓపెన్ సోర్స్ లేదా ఉచిత టూల్స్ ఉపయోగించండి.\n3. ప్రాంప్ట్ ల్యాబ్‌లో స్పష్టమైన ప్రాంప్ట్ రూపొందించి కోడ్ రాయించండి.\n4. లోపాలు వస్తే ఎర్రర్ లాగ్‌ను పరిశీలించి డిఫెన్సివ్ గార్డ్స్ రాయండి.`,
      source: 'skillnova-core',
      suggestedFollowUps: [
        'AI ప్రాజెక్ట్ ఆలోచనలు ఇవ్వండి',
        'రెజ్యూమ్‌ను మెరుగుపరచడం ఎలా?',
        'గిట్‌హబ్‌లో ప్రాజెక్ట్ ఎలా పెట్టాలి?'
      ]
    };
  }

  return {
    content: `**SkillNova AI Engineering Response:**\n\nRegarding: "*${query}*"\n\n**Actionable Advice for ${level.toUpperCase()} level:**\n1. **Isolate the Scope**: Break down complex problems into one module or function at a time.\n2. **Check Verified Tools**: Review our Tools Explorer for free tiers and documentation before building custom solutions.\n3. **Defensive Implementation**: Always write error boundaries, validate user input, and check environment variables.\n4. **Document Assumptions**: Maintain a clean README with setup steps and testing commands.`,
    source: 'skillnova-core',
    suggestedFollowUps: [
      'Show me hackathon-winning project ideas',
      'How to structure an ATS-friendly tech resume',
      'Explain difference between LLMs and Traditional ML'
    ]
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
