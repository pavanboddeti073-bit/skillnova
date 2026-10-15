import type { ChatMessage, SupportedLanguage, SkillLevel } from '../types/index.ts';
import { apiClient } from './api.ts';

export interface TutorResponse {
  content: string;
  isDemo: boolean;
  source?: string;
  suggestedFollowUps: string[];
}

interface KnowledgeEntry {
  keywords: string[];
  en: string;
  te: string;
  followUpsEn: string[];
  followUpsTe: string[];
}

// ===========================================================================
// DIRECT GEMINI API CALL FROM BROWSER (Primary path on Vercel)
// ===========================================================================
async function callGeminiDirectly(
  userQuery: string,
  language: SupportedLanguage,
  level: SkillLevel
): Promise<string | null> {
  // Try VITE env variable (set in Vercel environment variables)
  const key = (import.meta as any).env?.VITE_GEMINI_API_KEY as string | undefined;
  if (!key || key.includes('your_') || key.length < 20) return null;

  try {
    const systemPrompt = `You are SkillNova AI Student Tutor — a friendly, encouraging senior software engineer and mentor for Indian engineering college students and beginners.
Language: ${language === 'te' ? 'Telugu (తెలుగు) — respond in clear, modern Telugu' : 'English — respond in friendly, practical English'}.
Student level: ${level}.
Rules:
- Provide structured, actionable guidance with step-by-step breakdown.
- Use markdown formatting (headers, bold, bullet points, code blocks).
- Reference real tools like Google Antigravity, Replit, Lovable, Vercel, GitHub, Supabase when relevant.
- Never say "I cannot help" — always provide at least a framework or next step.
- Keep responses under 600 words.
- End with 3 specific follow-up questions relevant to the topic.`;

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
// COMPREHENSIVE BUILT-IN KNOWLEDGE BASE (Works 100% offline/fallback)
// ===========================================================================
const knowledgeBase: KnowledgeEntry[] = [
  {
    keywords: ['start', 'begin', 'new', 'confused', 'idea', 'where', 'how to start', 'first project', 'ఎక్కడ మొదలు', 'ప్రారంభించు'],
    en: `### 🚀 Your Complete Beginner Launchpad

Feeling overwhelmed? That's completely normal. Here's your proven 3-step path:

**Step 1 — Pick ONE Tangible Goal**
Don't try to "learn all AI" at once. Choose one:
- Build a personal portfolio website
- Create an 8-slide seminar PPT  
- Write your mini-project documentation
- Build a simple task/attendance tracker

**Step 2 — Choose the Right Free Tool**
| Goal | Best Tool | Free? |
|------|-----------|-------|
| Website / Web App | **Google Antigravity** or **Lovable** | ✅ Free |
| Presentations | **Gamma App** or **Canva Magic** | ✅ Free |
| Code + Backend | **Replit** | ✅ Free |
| Hosting | **Vercel** | ✅ Free |

**Step 3 — Use the CR-TCO Prompt Formula**
Tell the AI your **C**ontext, **R**ole, **T**ask, **C**onstraints, and **O**utput format for 10x better results.

💡 **Your next action:** Click "Visual Studio" in the navbar to open a guided step-by-step recipe!`,
    te: `### 🚀 బిగినర్‌గా AI ప్రయాణాన్ని ప్రారంభించండి

మొదట్లో గందరగోళంగా అనిపించడం చాలా సహజం! ఈ 3 దశలు అనుసరించండి:

**దశ 1 — ఒక నిర్దిష్ట లక్ష్యాన్ని ఎంచుకోండి**
మొత్తం AI ను ఒకేసారి నేర్చుకోవాలని ప్రయత్నించకుండా, ఒక్క పనిని ఎంచుకోండి:
- వ్యక్తిగత పోర్ట్‌ఫోలియో వెబ్‌సైట్ నిర్మించడం
- 8 స్లైడ్ల సెమినార్ PPT తయారు చేయడం
- మీ మినీ-ప్రాజెక్ట్ డాక్యుమెంటేషన్ రాయడం

**దశ 2 — సరైన ఉచిత టూల్ ఎంచుకోండి**
| లక్ష్యం | ఉత్తమ టూల్ |
|---------|-----------|
| వెబ్‌సైట్ / యాప్ | **Google Antigravity** లేదా **Lovable** |
| ప్రెజెంటేషన్ | **Gamma App** లేదా **Canva** |
| కోడింగ్ + బ్యాకెండ్ | **Replit** |
| హోస్టింగ్ | **Vercel** (ఉచితం) |

**దశ 3 — CR-TCO ఫార్మాట్‌లో ప్రాంప్ట్ రాయండి**
సందర్భం, పాత్ర, పని, పరిమితులు, మరియు అవుట్‌పుట్ ఫార్మాట్ స్పష్టంగా చెప్పండి.

💡 **తదుపరి అడుగు:** నావిగేషన్‌లో "Visual Studio" తెరిచి గైడెడ్ రెసిపీ అనుసరించండి!`,
    followUpsEn: ['Show me how to build a portfolio website step-by-step', 'Explain the CR-TCO prompt formula with an example', 'How do I deploy to Vercel for free?'],
    followUpsTe: ['వెబ్‌సైట్ దశలవారీగా ఎలా తయారు చేయాలో చూపించండి', 'CR-TCO ఫార్ములా ఉదాహరణతో వివరించండి', 'Vercel లో ఉచితంగా హోస్ట్ ఎలా చేయాలి?']
  },
  {
    keywords: ['prompt', 'cr-tco', 'formula', 'structure', 'ప్రాంప్ట్', 'cr tco', 'better prompt'],
    en: `### 🎯 The CR-TCO Prompt Framework (Master-Level Guide)

Use these 5 elements to get 10x better AI output every time:

| Element | What It Means | Example |
|---------|--------------|---------|
| **C — Context** | Your situation, project, audience | *"I'm a 3rd-year CS student building a hackathon project"* |
| **R — Role** | Expert persona for the AI | *"Act as a senior full-stack engineer specializing in React"* |
| **T — Task** | Exact instruction with clear scope | *"Build a todo app with localStorage persistence"* |
| **C — Constraints** | Rules, limits, requirements | *"Under 100 lines, WCAG AA, no external libraries"* |
| **O — Output Format** | How you want the result | *"TypeScript code block with inline comments"* |

**❌ Bad Prompt:** "Build me an app"
**✅ Good Prompt:** "[R] As a senior React engineer, [C] for a beginner student project, [T] build a responsive task tracker with drag-to-reorder, [C] using only React hooks and localStorage, [O] return clean TSX with JSDoc comments."

💡 **Try it:** Open the **Prompt Lab** tab in the navbar to build and test your structured prompts!`,
    te: `### 🎯 CR-TCO ప్రాంప్ట్ ఫ్రేమ్‌వర్క్ (సంపూర్ణ గైడ్)

AI నుండి 10x ఉత్తమ ఫలితాలు పొందడానికి ఈ 5 అంశాలతో ప్రాంప్ట్ రాయండి:

| అంశం | వివరణ | ఉదాహరణ |
|------|-------|---------|
| **C — Context** | మీ పరిస్థితి | *"నేను హ్యాకథాన్ కోసం ప్రాజెక్ట్ చేస్తున్న 3వ సంవత్సరం విద్యార్థిని"* |
| **R — Role** | AI పాత్ర | *"సీనియర్ React ఇంజనీర్‌గా వ్యవహరించు"* |
| **T — Task** | ఖచ్చితమైన పని | *"localStorage తో task tracker తయారు చేయి"* |
| **C — Constraints** | పరిమితులు | *"100 లైన్ల లోపు, extra library వద్దు"* |
| **O — Output** | అవుట్‌పుట్ ఫార్మాట్ | *"TypeScript కోడ్ బ్లాక్ మరియు కామెంట్లు"* |

**❌ చెడు ప్రాంప్ట్:** "నాకు ఒక యాప్ చేయి"
**✅ మంచి ప్రాంప్ట్:** "[R] React ఇంజనీర్‌గా, [C] బిగినర్ విద్యార్థి ప్రాజెక్ట్ కోసం, [T] drag-to-reorder తో task tracker నిర్మించు, [C] localStorage మాత్రమే వాడి, [O] JSDoc కామెంట్లతో TSX కోడ్ ఇవ్వు."

💡 **ప్రయత్నించండి:** **Prompt Lab** ట్యాబ్ తెరిచి మీ స్వంత ప్రాంప్ట్ రూపొందించండి!`,
    followUpsEn: ['Generate a CR-TCO prompt for a React login page', 'How do I prompt AI for clean database schemas?', 'Show me a prompt for debugging TypeScript errors'],
    followUpsTe: ['React లాగిన్ పేజీ కోసం CR-TCO ప్రాంప్ట్ ఇవ్వండి', 'TypeScript ఎర్రర్స్ కోసం ప్రాంప్ట్ ఎలా రాయాలి?', 'డేటాబేస్ స్కీమా కోసం ఉత్తమ ప్రాంప్ట్ చెప్పండి']
  },
  {
    keywords: ['debug', 'error', 'bug', 'fix', 'typeerror', 'cannot read', 'undefined', 'null', 'failed', 'crash', 'ఎర్రర్', 'బగ్'],
    en: `### 🛠️ Systematic Debugging — 5-Step Triage

**Step 1: Read the Stack Trace**
Find the exact file and line number (e.g., \`UserCard.tsx:24\`). Don't guess — the answer is always in the error message.

**Step 2: Fix "Cannot read properties of undefined"**
This is the #1 JS/TS error. Solutions:
\`\`\`typescript
// ❌ Crashes if user is undefined
const name = user.profile.name;

// ✅ Safe with optional chaining + nullish coalescing
const name = user?.profile?.name ?? 'Guest';
const items = data?.items ?? [];
\`\`\`

**Step 3: Debug API / Network Failures**
- Check browser **Network tab** → look for red 4xx/5xx requests
- 401 = API key missing/invalid → check \`.env\` file
- 403 = Permission denied → check CORS headers
- 404 = Wrong URL → log the API base URL in console and verify the endpoint path

**Step 4: Isolate the Problem**
Test ONE function with hardcoded mock data. If it works in isolation, the problem is in the data flow, not the logic.

**Step 5: Use Binary Search**
Comment out half your code. Still broken? The bug is in the remaining half. Keep halving until you find it.

💡 **Paste your exact error message here and I'll diagnose it specifically!**`,
    te: `### 🛠️ కోడ్ బగ్స్ పరిష్కరించే 5 దశల పద్ధతి

**దశ 1: Stack Trace చదవండి**
ఫైల్ పేరు మరియు లైన్ నంబర్ (ఉదా: \`UserCard.tsx:24\`) చూడండి. ఎర్రర్ మెసేజ్‌లో సమాధానం ఉంటుంది.

**దశ 2: "Cannot read properties of undefined" పరిష్కారం**
\`\`\`typescript
// ❌ user undefined అయితే crash అవుతుంది
const name = user.profile.name;

// ✅ Optional chaining తో సురక్షితంగా
const name = user?.profile?.name ?? 'Guest';
const items = data?.items ?? [];
\`\`\`

**దశ 3: API / Network ఎర్రర్స్**
- Browser **Network tab** తెరవండి → ఎర్రర్ request చూడండి
- 401 = API కీ లేదు/తప్పు → \`.env\` ఫైల్ చెక్ చేయండి
- 403 = Permission లేదు → CORS headers చెక్ చేయండి
- 404 = తప్పు URL → URL ని console లో print చేసి చూడండి

**దశ 4: ఒక్క ఫంక్షన్‌ను వేరుగా టెస్ట్ చేయండి**
Mock data తో test చేయండి. అది పనిచేస్తే, సమస్య data flow లో ఉంది.

**దశ 5: Binary Search పద్ధతి**
సగం కోడ్ comment చేయండి. అప్పటికీ ఎర్రర్ వస్తే, bug మిగిలిన సగంలో ఉంది.

💡 **మీ ఖచ్చితమైన ఎర్రర్ మెసేజ్ ఇక్కడ పేస్ట్ చేయండి — నేను నిర్దిష్ట పరిష్కారం ఇస్తాను!**`,
    followUpsEn: ['Explain optional chaining with TypeScript examples', 'How to safely read VITE environment variables?', 'Debug a React useEffect running infinitely'],
    followUpsTe: ['TypeScript Optional Chaining ఉదాహరణతో వివరించండి', 'Vite లో environment variables ఎలా వాడాలి?', 'React useEffect అనంతంగా రన్ అవుతున్నప్పుడు ఏమి చేయాలి?']
  },
  {
    keywords: ['website', 'react', 'vite', 'tailwind', 'deploy', 'vercel', 'portfolio', 'వెబ్‌సైట్', 'హోస్ట్'],
    en: `### 🌐 Build & Deploy a React Website — Complete Workflow

**Tech Stack (All Free)**
- **React 19 + TypeScript + Vite** — Modern fast frontend
- **Tailwind CSS v4** — Utility-first styling
- **Vercel** — Instant free global hosting

**Step-by-Step:**

\`\`\`bash
# 1. Scaffold with Vite
npm create vite@latest my-portfolio -- --template react-ts
cd my-portfolio
npm install

# 2. Add Tailwind CSS
npm install -D tailwindcss@latest @tailwindcss/vite
# Add to vite.config.ts: plugins: [tailwindcss()]
# Add to index.css: @import "tailwindcss";

# 3. Build and verify
npm run build   # Must succeed with 0 TypeScript errors

# 4. Deploy to Vercel
npm install -g vercel
vercel --prod
\`\`\`

**For SPA routing** add \`vercel.json\`:
\`\`\`json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
\`\`\`

**Common Mistakes:**
- ❌ Pushing \`.env\` to GitHub → use \`.gitignore\`
- ❌ Forgetting \`npm run build\` before deploy → always build first
- ❌ TypeScript errors → run \`npx tsc -b\` to check`,
    te: `### 🌐 React వెబ్‌సైట్ నిర్మించి Vercel లో హోస్ట్ చేయడం

**టెక్ స్టాక్ (అన్నీ ఉచితం)**
- **React 19 + TypeScript + Vite** — ఆధునిక frontend
- **Tailwind CSS** — స్టైలింగ్
- **Vercel** — ఉచిత హోస్టింగ్

**దశలవారీ:**

\`\`\`bash
# 1. ప్రాజెక్ట్ సృష్టించండి
npm create vite@latest my-portfolio -- --template react-ts
cd my-portfolio && npm install

# 2. Tailwind CSS జోడించండి
npm install -D tailwindcss@latest @tailwindcss/vite
# index.css లో: @import "tailwindcss";

# 3. బిల్డ్ చెక్
npm run build

# 4. Vercel లో డెప్లాయ్
npm install -g vercel
vercel --prod
\`\`\`

**SPA routing కోసం** \`vercel.json\` జోడించండి:
\`\`\`json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
\`\`\`

**సాధారణ తప్పులు:**
- ❌ \`.env\` ని GitHub లో పుష్ చేయడం
- ❌ \`npm run build\` లేకుండా డెప్లాయ్ చేయడం
- ❌ TypeScript ఎర్రర్స్ ఉన్నప్పుడు డెప్లాయ్ చేయడం`,
    followUpsEn: ['How to fix SPA routing 404 on Vercel?', 'How to set environment variables in Vercel dashboard?', 'How to connect a custom domain to Vercel for free?'],
    followUpsTe: ['Vercel లో SPA routing 404 ఎలా పరిష్కరించాలి?', 'Vercel లో environment variables ఎలా సెట్ చేయాలి?', 'Vercel కి కస్టమ్ డొమైన్ ఎలా కనెక్ట్ చేయాలి?']
  },
  {
    keywords: ['presentation', 'ppt', 'slides', 'gamma', 'canva', 'seminar', 'ప్రెజెంటేషన్', 'స్లైడ్', 'సెమినార్'],
    en: `### 📊 High-Scoring Seminar Presentation Blueprint

**The 3 Core Rules**
1. **Max 3-4 bullets per slide** — Audience listens to you, not reads your slides
2. **12-word max per bullet** — Force yourself to distill complex ideas
3. **One main idea per slide** — Never cram two concepts together

**Standard 8-Slide Structure:**
| Slide | Content |
|-------|---------|
| 1 | Title, your name, department, date |
| 2 | Problem Statement — Why does this matter? |
| 3 | Limitations of existing solutions |
| 4 | Your proposed solution + architecture overview |
| 5 | System flowchart / working diagram |
| 6 | Results, accuracy metrics, or live demo screenshot |
| 7 | Challenges faced + future enhancements |
| 8 | Conclusion + references (IEEE/ACM format) |

**Best Free Tools:**
- **Gamma App** (gamma.app) — AI generates professional slides from a text prompt
- **Canva Magic Studio** — Custom templates + AI image generation
- Export as both \`.pptx\` AND \`.pdf\` for backup`,
    te: `### 📊 అద్భుతమైన సెమినార్ ప్రెజెంటేషన్ గైడ్

**3 ముఖ్యమైన నియమాలు**
1. **ప్రతి స్లైడ్‌పై గరిష్టంగా 3-4 బుల్లెట్లు** — పారాగ్రాఫ్లు వద్దు
2. **ప్రతి బుల్లెట్ 12 పదాల లోపు** — తక్కువ పదాలు, ఎక్కువ ప్రభావం
3. **ఒక స్లైడ్ = ఒక ఆలోచన** — రెండు అంశాలు ఒకే స్లైడ్‌లో వేయవద్దు

**8 స్లైడ్ల స్ట్రక్చర్:**
| స్లైడ్ | కంటెంట్ |
|--------|---------|
| 1 | టైటిల్, మీ పేరు, శాఖ, తేదీ |
| 2 | సమస్య వివరణ — ఇది ఎందుకు ముఖ్యమైనది? |
| 3 | ప్రస్తుత పరిష్కారాల పరిమితులు |
| 4 | మీ పరిష్కారం + ఆర్కిటెక్చర్ |
| 5 | సిస్టమ్ ఫ్లోచార్ట్ / వర్కింగ్ డయాగ్రమ్ |
| 6 | ఫలితాలు, మెట్రిక్స్ లేదా లైవ్ డెమో |
| 7 | సవాళ్లు + భవిష్యత్తు అభివృద్ధులు |
| 8 | ముగింపు + రెఫరెన్సులు |

**ఉత్తమ ఉచిత టూల్స్:**
- **Gamma App** — AI ప్రాంప్ట్ నుండి పూర్తి స్లైడ్‌లు తయారు చేస్తుంది
- **Canva Magic Studio** — కస్టమ్ టెంప్లేట్స్ + AI ఇమేజ్ జనరేషన్`,
    followUpsEn: ['Generate a Gamma App prompt for an AI seminar PPT', 'What fonts work best on classroom projectors?', 'How to create AI-generated speaker notes?'],
    followUpsTe: ['AI సెమినార్ PPT కోసం Gamma App ప్రాంప్ట్ ఇవ్వండి', 'ప్రొజెక్టర్ కోసం ఏ ఫాంట్ బాగుంటుంది?', 'స్పీకర్ నోట్స్ AI తో ఎలా రాయాలి?']
  },
  {
    keywords: ['resume', 'cv', 'job', 'placement', 'ats', 'రెజ్యూమ్', 'జాబ్', 'ప్లేస్‌మెంట్'],
    en: `### 📄 Student Resume That Beats ATS Scanners

**The Google XYZ Impact Formula:**
> "Accomplished [X] measured by [Y] by doing [Z]"

**❌ Weak bullets:**
- "Helped build a website"
- "Worked on machine learning project"

**✅ Strong bullets:**
- "Architected a student note portal using React + Tailwind CSS, reducing search time by 40% across 200+ batchmates"
- "Fine-tuned BERT model on Hugging Face achieving 88% accuracy on 5,000 college feedback records"

**ATS Safety Rules:**
1. Single-column layout — no tables, no text boxes
2. Standard headings: Education, Skills, Projects, Experience, Certifications
3. Include GitHub URL and 2+ live Vercel demo links
4. Save as standard text-selectable PDF (not image-based)
5. Keywords: Match exact terms from the job description

**Free Tools:**
- **Resume.io** or **Canva Resume** for formatting
- Upload to our **Career & Resume** tab for automated feedback!`,
    te: `### 📄 ATS-సురక్షితమైన విద్యార్థి రెజ్యూమ్ గైడ్

**Google XYZ ఇంపాక్ట్ ఫార్ములా:**
> "[X] సాధించాను, [Y] ద్వారా కొలవబడింది, [Z] చేయడం ద్వారా"

**❌ బలహీన బుల్లెట్లు:**
- "వెబ్‌సైట్ నిర్మించడంలో సహాయం చేశాను"

**✅ శక్తివంతమైన బుల్లెట్లు:**
- "React + Tailwind CSS తో స్టూడెంట్ నోట్ పోర్టల్ నిర్మించి 200+ విద్యార్థులకు 40% వేగంగా నోట్స్ శోధించే అవకాశం కల్పించాను"
- "Hugging Face లో BERT మోడల్‌ను ఫైన్-ట్యూన్ చేసి 5,000 feedback records పై 88% accuracy సాధించాను"

**ATS నియమాలు:**
1. ఒకే కాలమ్ layout — tables, text boxes వద్దు
2. స్టాండర్డ్ శీర్షికలు: Education, Skills, Projects
3. GitHub URL మరియు Vercel demo links చేర్చండి
4. Text-selectable PDF గా సేవ్ చేయండి

**మా Career & Resume ట్యాబ్‌లో మీ రెజ్యూమ్ అనాలిసిస్ పొందండి!**`,
    followUpsEn: ['Check my resume in the Career Hub tab', 'What skills should a CS fresher list in 2025?', 'How to describe open source contributions on a resume?'],
    followUpsTe: ['Career Hub లో నా రెజ్యూమ్ చెక్ చేయించాలి', '2025 లో CS fresher ఏ skills చేర్చాలి?', 'Open source contributions రెజ్యూమ్‌లో ఎలా చూపించాలి?']
  },
  {
    keywords: ['quiz', 'test', 'question', 'practice', 'assess', 'క్విజ్', 'ప్రశ్నలు', 'నేర్పండి'],
    en: `### 🧠 Quick AI Knowledge Assessment

**Question 1:**
What does \`temperature = 0.1\` do compared to \`temperature = 0.9\` in an LLM?
- **A)** Makes the model run 10x slower
- **B)** Makes responses deterministic, factual, and consistent ✅
- **C)** Makes the output more creative and poetic
- **D)** Charges fewer API tokens

**Question 2:**
If you accidentally push your \`.env\` file with private API keys to a public GitHub repo, what should you do IMMEDIATELY?
- **A)** Delete the commit history and hope no one saw it
- **B)** Revoke the API key in the provider dashboard and generate a new one ✅
- **C)** Rename the file and push again
- **D)** Make the repository private

**Question 3:**
Which prompting framework gives consistently better AI results?
- **A)** "Make me an app" ❌
- **B)** "[Role] As a React engineer, [Task] build X, [Constraints] Y, [Output] Z" ✅

*Reply with your understanding or a new topic to quiz on!*`,
    te: `### 🧠 శీఘ్ర AI నాలెడ్జ్ పరీక్ష

**ప్రశ్న 1:**
LLM లో \`temperature = 0.1\` vs \`temperature = 0.9\` తేడా ఏమిటి?
- **A)** మోడల్ 10x నెమ్మదిగా రన్ అవుతుంది
- **B)** ఖచ్చితమైన, factual సమాధానాలు వస్తాయి ✅
- **C)** ఎక్కువ creative output వస్తుంది
- **D)** తక్కువ API tokens ఖర్చవుతాయి

**ప్రశ్న 2:**
పొరపాటున \`.env\` ఫైల్ public GitHub కి push అయితే వెంటనే ఏమి చేయాలి?
- **A)** commit delete చేసి చూపించుకోకుండా ఉండాలి
- **B)** provider dashboard లో API key రద్దు చేసి కొత్త key తీసుకోవాలి ✅
- **C)** ఫైల్ పేరు మార్చి మళ్ళీ push చేయాలి
- **D)** repository private చేయాలి

**మీ సమాధానాలు లేదా మరొక అంశంపై క్విజ్ అడగండి!**`,
    followUpsEn: ['Quiz me on prompt engineering basics', 'Quiz me on React hooks', 'Explain why temperature matters in LLMs'],
    followUpsTe: ['Prompt engineering పై క్విజ్ ఇవ్వండి', 'React hooks పై పరీక్షించండి', 'Temperature LLMs లో ఎందుకు ముఖ్యమైనది?']
  },
  {
    keywords: ['api', 'backend', 'express', 'node', 'server', 'database', 'supabase', 'mongodb', 'బ్యాకెండ్', 'సర్వర్'],
    en: `### ⚙️ Backend API Development — Student-Friendly Stack

**Recommended Free Stack:**
\`\`\`
Frontend:  React 19 + TypeScript + Vite + Tailwind CSS
Backend:   Node.js + Express (or Hono for edge)
Database:  Supabase (Free PostgreSQL) or MongoDB Atlas (Free M0)
Hosting:   Vercel Serverless (frontend + API) 
\`\`\`

**Minimal Express API Pattern:**
\`\`\`typescript
import express from 'express';
const app = express();
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'online', timestamp: new Date().toISOString() });
});

app.post('/api/data', async (req, res) => {
  const { input } = req.body;
  if (!input) return res.status(400).json({ error: 'input required' });
  res.json({ result: input.toUpperCase() });
});

app.listen(3001, () => console.log('API running on :3001'));
\`\`\`

**Security Checklist:**
- ✅ Validate all inputs with type guards
- ✅ Use \`.env\` for API keys (never hardcode)
- ✅ Add CORS headers for production
- ✅ Return proper HTTP status codes (200, 400, 404, 500)`,
    te: `### ⚙️ Backend API డెవలప్‌మెంట్ — విద్యార్థి గైడ్

**ఉచిత Tech Stack:**
\`\`\`
Frontend:  React 19 + TypeScript + Vite + Tailwind CSS
Backend:   Node.js + Express
Database:  Supabase (ఉచిత PostgreSQL) లేదా MongoDB Atlas
Hosting:   Vercel Serverless
\`\`\`

**సులభమైన Express API:**
\`\`\`typescript
import express from 'express';
const app = express();
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'online' });
});

app.listen(3001, () => console.log('API ready on :3001'));
\`\`\`

**భద్రత నియమాలు:**
- ✅ అన్ని inputs validate చేయండి
- ✅ API కీలు \`.env\` లో పెట్టండి (hardcode చేయవద్దు)
- ✅ Production లో CORS headers జోడించండి
- ✅ సరైన HTTP status codes (200, 400, 404, 500) రిటర్న్ చేయండి`,
    followUpsEn: ['How to connect Supabase to a React app?', 'How to deploy an Express backend to Render for free?', 'How to add authentication to my API?'],
    followUpsTe: ['Supabase ని React app తో ఎలా కనెక్ట్ చేయాలి?', 'Express backend ని Render లో ఉచితంగా ఎలా deploy చేయాలి?', 'API కి authentication ఎలా జోడించాలి?']
  }
];

// ===========================================================================
// GENERIC INTELLIGENT FALLBACK RESPONSE
// ===========================================================================
function buildGenericResponse(query: string, language: SupportedLanguage, level: SkillLevel): TutorResponse {
  if (language === 'te') {
    return {
      content: `### 💡 SkillNova AI ట్యూటర్ — మీ ప్రశ్నకు సమాధానం

మీ ప్రశ్న: **"${query.slice(0, 100)}"**

**${level.toUpperCase()} స్థాయి విద్యార్థికి చర్య పణతి:**

1. **సమస్యను విభజించండి**: మీ లక్ష్యాన్ని 3 చిన్న భాగాలుగా విభజించండి — UI, logic, మరియు data.
2. **సరైన ఉచిత టూల్ ఎంచుకోండి**:
   - వెబ్ + UI కోసం: **Google Antigravity** లేదా **Lovable**
   - ఇంటరాక్టివ్ కోడింగ్: **Replit**
   - ప్రెజెంటేషన్: **Gamma** లేదా **Canva**
3. **CR-TCO ఫ్రేమ్‌వర్క్ వాడండి**: రోల్, సందర్భం, టాస్క్, పరిమితులు, అవుట్‌పుట్ ఫార్మాట్ స్పష్టంగా ఇవ్వండి.
4. **ఆచరణలో ప్రయత్నించండి**: **Build Studio** ట్యాబ్‌లో guided recipe అనుసరించండి!

మీరు మరింత నిర్దిష్టమైన ప్రశ్న అడిగితే, నేను వివరంగా సమాధానం ఇస్తాను!`,
      isDemo: false,
      source: 'skillnova-core',
      suggestedFollowUps: [
        'CR-TCO ఫార్ములా ఉదాహరణతో వివరించండి',
        'వెబ్‌సైట్ దశలవారీగా ఎలా నిర్మించాలి?',
        'Vercel లో ఉచితంగా ప్రాజెక్ట్ ఎలా హోస్ట్ చేయాలి?'
      ]
    };
  }

  return {
    content: `### 💡 SkillNova AI Tutor Response

Regarding: **"${query.slice(0, 100)}"**

**Actionable Plan for ${level.toUpperCase()} level:**

1. **Decompose the Problem**: Split your goal into 3 parts — UI layer, business logic, and data/API.
2. **Choose the Right Free Tool**:
   - Full-Stack coding: **Google Antigravity** or **Replit Agent**
   - Web UI scaffolding: **Lovable** or **Bolt.new**
   - Presentations: **Gamma App** or **Canva Magic Studio**
   - Hosting: **Vercel** (unlimited free personal projects)
3. **Apply CR-TCO Prompting**: Specify Role, Context, Task, Constraints, and Output Format in your prompts.
4. **Take Action Now**: Open the **Visual Build Studio** tab in the navbar for a guided recipe matching your goal!

Ask me a more specific question and I'll give you a detailed, targeted answer!`,
    isDemo: false,
    source: 'skillnova-core',
    suggestedFollowUps: [
      'Show me how to build a portfolio website step-by-step',
      'Explain the CR-TCO prompt formula with examples',
      'How do I debug TypeScript errors systematically?'
    ]
  };
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

  // ─── Path 3: Rich Client-Side Knowledge Base ──────────────────────────────
  const lower = sanitizedQuery.toLowerCase();
  for (const entry of knowledgeBase) {
    if (entry.keywords.some(k => lower.includes(k))) {
      return {
        content: language === 'te' ? entry.te : entry.en,
        isDemo: false,
        source: 'skillnova-core',
        suggestedFollowUps: language === 'te' ? entry.followUpsTe : entry.followUpsEn
      };
    }
  }

  // ─── Path 4: Intelligent Generic Response ────────────────────────────────
  return buildGenericResponse(sanitizedQuery, language, level);
}
