export interface KnowledgeResponse {
  content: string;
  source: 'gemini-api' | 'skillnova-core';
  suggestedFollowUps: string[];
}

export type SupportedLang = 'en' | 'te';

export function resolveIntelligentAnswer(
  query: string,
  lang: SupportedLang = 'en',
  _level: string = 'beginner'
): KnowledgeResponse {
  const clean = query.trim();
  const lower = clean.toLowerCase();

  // 1. SPECIFIC ERROR: TypeError / Cannot read properties of undefined / null / NaN
  if (
    lower.includes('typeerror') ||
    lower.includes('cannot read properties') ||
    lower.includes('cannot read property') ||
    lower.includes('undefined') ||
    lower.includes('null pointer') ||
    lower.includes('nan')
  ) {
    if (lang === 'te') {
      return {
        content: `### 🛠️ "TypeError: Cannot read properties of undefined" పరిష్కారం

జావాస్క్రిప్ట్ & టైప్‌స్క్రిప్ట్‌లో అత్యంత సాధారణ లోపం ఇది. డేటా సర్వర్ నుండి లోడ్ కాకముందే లేదా వేరియబుల్ ఖాళీగా ఉన్నప్పుడు ప్రాపర్టీని చదవడానికి ప్రయత్నించినప్పుడు ఇది సంభవిస్తుంది.

#### 1. అసలు సమస్య ఎక్కడ వస్తుంది?
\`\`\`typescript
// ❌ ఎర్రర్ వచ్చే కోడ్: user ఇంకా undefined ఉన్నప్పుడు
const userName = user.profile.name; // Uncaught TypeError!
const firstItem = response.data.items[0]; // response.data లేకపోతే క్రాష్!
\`\`\`

#### 2. సరైన 3 పరిష్కారాలు:

**పరిష్కారం A: Optional Chaining (?.) & Nullish Coalescing (??)**
\`\`\`typescript
// ✅ సురక్షితమైన కోడ్:
const userName = user?.profile?.name ?? 'Guest Student';
const firstItem = response?.data?.items?.[0] ?? null;
\`\`\`

**పరిష్కారం B: React లో Loading Guard వాడండి**
\`\`\`tsx
if (!user) {
  return <div className="p-4 text-slate-500">డేటా లోడ్ అవుతోంది...</div>;
}
return <h1>నమస్కారం, {user.name}</h1>;
\`\`\`

**పరిష్కారం C: డిఫాల్ట్ స్టేట్ విలువలు ఇవ్వండి**
\`\`\`typescript
const [items, setItems] = useState<string[]>([]); // undefined కాకుండా [] ఇవ్వండి
\`\`\`

#### 3. డీబగ్గింగ్ చెక్‌లిస్ట్:
1. బ్రౌజర్ కన్సోల్‌లో ఫైల్ పేరు & లైన్ నంబర్ చూడండి (ఉదా: \`UserCard.tsx:28\`).
2. డాట్ (\`.\`) కి ముందున్న వేరియబుల్ ఏంటో గమనించండి — అదే \`undefined\`.
3. లైన్ ముందు \`console.log('Value is:', variable)\` పెట్టి తనిఖీ చేయండి.`,
        source: 'skillnova-core',
        suggestedFollowUps: [
          'TypeScript లో Optional Chaining (?.) ఎలా పనిచేస్తుంది?',
          'React useEffect లో API డేటా లోడ్ అయ్యే వరకు ఎలా వేచి ఉండాలి?',
          'జావాస్క్రిప్ట్ లో null vs undefined తేడా ఏమిటి?'
        ]
      };
    }

    return {
      content: `### 🛠️ How to Fix: "TypeError: Cannot read properties of undefined"

This is the #1 most common error in JavaScript & TypeScript. It occurs when your code attempts to access a property (like \`.name\` or \`[0]\`) on a variable that evaluates to \`undefined\` or \`null\` (usually before an API response has arrived).

#### 1. The Root Cause
\`\`\`typescript
// ❌ Crashes when 'user' is null or undefined (e.g. initial render)
const userName = user.profile.name; // Uncaught TypeError!
const firstItem = response.data.items[0]; // Crashes if 'data' is missing!
\`\`\`

#### 2. The 3 Bulletproof Fixes

**Fix A: Optional Chaining (\`?.\`) + Nullish Coalescing (\`??\`)**
\`\`\`typescript
// ✅ Safely returns 'Guest' if user or profile is undefined
const userName = user?.profile?.name ?? 'Guest';
const firstItem = response?.data?.items?.[0] ?? null;
\`\`\`

**Fix B: React Early Return / Guard Clause**
\`\`\`tsx
export const UserProfile = ({ user }: { user?: UserData }) => {
  // Prevent rendering child properties until data exists
  if (!user) {
    return <div className="animate-pulse">Loading profile data...</div>;
  }
  return <h2>Welcome, {user.name}</h2>;
};
\`\`\`

**Fix C: Initialize State with Empty Defaults (Never undefined)**
\`\`\`typescript
// ❌ Risky: useState() leaves it undefined initially
const [items, setItems] = useState<string[]>();

// ✅ Safe: initialized to empty array, .map() won't crash
const [items, setItems] = useState<string[]>([]);
\`\`\`

#### 3. Systematic 3-Step Debug Process:
1. **Find the culprit:** In \`objectA.objectB.propertyC\`, the undefined item is whatever is immediately to the *left* of the failing dot.
2. **Inspect the call stack:** Look at browser dev tools (F12 → Console) to find the exact line number.
3. **Verify API payload:** Open Network tab → Fetch/XHR → click request → Preview to verify key names match your frontend types.`,
      source: 'skillnova-core',
      suggestedFollowUps: [
        'How to handle async data loading in React without crashes?',
        'Explain Optional Chaining (?.) and Nullish Coalescing (??)',
        'How to write TypeScript types for API responses?'
      ]
    };
  }

  // 2. GENERAL DEBUGGING & ERRORS
  if (
    lower.includes('debug') ||
    lower.includes('error') ||
    lower.includes('bug') ||
    lower.includes('syntaxerror') ||
    lower.includes('crashed') ||
    lower.includes('exception') ||
    lower.includes('failed to fetch') ||
    lower.includes('cors') ||
    lower.includes('rejection') ||
    lower.includes('404') ||
    lower.includes('500')
  ) {
    if (lang === 'te') {
      return {
        content: `### 🔍 సిస్టమాటిక్ డీబగ్గింగ్ గైడ్ (5 దశల సూత్రం)

కోడింగ్ చేసేటప్పుడు బగ్స్ రావడం సహజం. వాటిని వేగంగా సరిదిద్దే పద్ధతి:

1. **కన్సోల్ స్టాక్ ట్రేస్ చదవండి:**
   - బ్రౌజర్‌లో \`F12\` నొక్కి Console చూడండి.
   - ఎరుపు రంగులో ఫైల్ పేరు, లైన్ నంబర్ కనిపిస్తుంది.
2. **CORS / Failed to Fetch అయితే:**
   - బ్యాకెండ్‌లో \`cors()\` మిడిల్‌వేర్ ఉందో లేదో చూడండి.
   - \`fetch('http://localhost:3001/api/...')\` URL పోర్ట్ సరిగ్గా ఉందో లేదో నిర్ధారించుకోండి.
3. **404 Not Found అయితే:**
   - ఎండ్‌పాయింట్ రూట్ పేరు (\`/api/user\` vs \`/api/users\`) తనిఖీ చేయండి.
4. **స్టేట్ లాగ్ చేయడం:**
   - అనుమానం ఉన్న చోట \`console.log('State at step 1:', data)\` పెట్టండి.
5. **బైనరీ ఐసోలేషన్:**
   - సగం కోడ్‌ను కామెంట్ చేసి, మిగిలిన సగం నడుస్తుందో లేదో చూడండి.`,
        source: 'skillnova-core',
        suggestedFollowUps: [
          'CORS ఎర్రర్లను Node.js Express లో ఎలా పరిష్కరించాలి?',
          'Vite ప్రాజెక్ట్‌లో Environment Variables ఎలా చదవాలి?',
          'React లో అపరిమిత useEffect రీ-రెండర్స్ ఎలా ఆపాలి?'
        ]
      };
    }

    return {
      content: `### 🔍 Systematic Debugging Framework

When facing errors, follow this verified 5-stage triage to identify and fix the issue within minutes:

#### 1. Pinpoint with DevTools
- Press \`F12\` → **Console** for JavaScript stack traces with exact file and line numbers.
- Switch to **Network tab** (filter by \`Fetch/XHR\`) to inspect failed HTTP statuses (400, 401, 404, 500).

#### 2. Common Error Patterns & Quick Fixes
| Error Type | Likely Cause | Solution |
| :--- | :--- | :--- |
| **Failed to fetch / CORS** | Backend not running or missing CORS | Add \`app.use(cors())\` in Express server |
| **404 Not Found** | URL typo or missing route prefix | Check API route definition & base URL |
| **401 Unauthorized** | Missing/invalid API token | Verify \`.env\` file has correct credentials |
| **Hydration mismatch** | Server/client HTML difference | Ensure dates/random values render only in \`useEffect\` |

#### 3. Defensive Programming Habits
- Always wrap async network calls in \`try/catch\` blocks.
- Provide sensible defaults for arrays and objects: \`const list = data ?? []\`.
- Add an \`ErrorBoundary\` component around complex React UI sections.`,
      source: 'skillnova-core',
      suggestedFollowUps: [
        'How to fix CORS errors between React and Express?',
        'How to debug infinite loop re-renders in React useEffect?',
        'How to create an Error Boundary in React?'
      ]
    };
  }

  // 3. REACT & FRONTEND (Hooks, Components, Props, State)
  if (
    lower.includes('react') ||
    lower.includes('usestate') ||
    lower.includes('useeffect') ||
    lower.includes('usememo') ||
    lower.includes('usecallback') ||
    lower.includes('component') ||
    lower.includes('props') ||
    lower.includes('tailwind') ||
    lower.includes('vite') ||
    lower.includes('jsx') ||
    lower.includes('tsx')
  ) {
    if (lang === 'te') {
      return {
        content: `### ⚛️ React 19 & మోడరన్ ఫ్రంటెండ్ గైడ్

React లో అప్లికేషన్ నిర్మించడానికి ముఖ్యమైన కాన్సెప్ట్‌లు:

#### 1. useState vs useEffect
- **\`useState\`**: UI లో మారే డేటాను నిల్వ చేయడానికి.
- **\`useEffect\`**: API కాల్స్, టైమర్లు, లేదా విండో ఈవెంట్లు లాంటి సైడ్-ఎఫెక్ట్స్ కోసం.

\`\`\`tsx
import { useState, useEffect } from 'react';

export function StudentCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`క్లిక్స్: \${count}\`;
  }, [count]); // count మారినప్పుడే రన్ అవుతుంది

  return (
    <button onClick={() => setCount(c => c + 1)} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
      క్లిక్ చేయండి: {count}
    </button>
  );
}
\`\`\`

#### 2. ముఖ్యమైన చిట్కాలు:
- **స్టేట్‌ను నేరుగా మార్చవద్దు**: \`state.push()\` తప్పు; \`setState([...prev, item])\` సరైనది.
- **Key ప్రాపర్టీ తప్పనిసరి**: \`.map()\` వాడేటప్పుడు ప్రతి ఐటెమ్‌కి ప్రత్యేకమైన \`key={item.id}\` ఇవ్వాలి.`,
        source: 'skillnova-core',
        suggestedFollowUps: [
          'React లో Props డ్రిల్లింగ్ నివారించడం ఎలా (Context API)?',
          'Vite + Tailwind CSS ప్రాజెక్ట్ సెటప్ ఎలా చేయాలి?',
          'useCallback మరియు useMemo ఎప్పుడు వాడాలి?'
        ]
      };
    }

    return {
      content: `### ⚛️ React 19 Modern Architecture & Hooks Guide

React is declarative and component-based. Here is the modern approach using React 19 + TypeScript:

#### 1. Core Hooks Architecture
- **\`useState\`**: Reactive component memory. Always treat state as immutable!
- **\`useEffect\`**: Synchronization with external systems (APIs, subscriptions). Never use it to derive simple state.
- **\`useMemo\` & \`useCallback\`**: Performance optimizations to prevent expensive re-computations and unstable references.

\`\`\`tsx
import React, { useState, useEffect, useMemo } from 'react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'active'>('all');

  // Derive filtered tasks without unnecessary re-renders
  const visibleTasks = useMemo(() => {
    return filter === 'active' ? tasks.filter(t => !t.completed) : tasks;
  }, [tasks, filter]);

  const addTask = (title: string) => {
    setTasks(prev => [...prev, { id: crypto.randomUUID(), title, completed: false }]);
  };

  return (
    <div className="p-4 space-y-3">
      <h3 className="font-bold text-lg">Active Tasks: {visibleTasks.length}</h3>
      {visibleTasks.map(task => (
        <div key={task.id} className="p-2 border rounded-lg bg-white shadow-xs">
          {task.title}
        </div>
      ))}
    </div>
  );
};
\`\`\`

#### 2. Golden Rules for Production React:
1. **Never mutate state directly:** Use functional updates \`setItems(prev => [...prev, newItem])\`.
2. **Stable keys in lists:** Always use unique IDs (\`task.id\`), never array index (\`index\`), to prevent UI rendering glitches.
3. **Lift state up** to the lowest common ancestor when sibling components need to share data, or use React Context.`,
      source: 'skillnova-core',
      suggestedFollowUps: [
        'How does React Context API work with TypeScript?',
        'How to fetch data cleanly using React hooks without race conditions?',
        'What is new in React 19 for student developers?'
      ]
    };
  }

  // 4. PRESENTATIONS / PPT / SLIDES
  if (
    lower.includes('ppt') ||
    lower.includes('presentation') ||
    lower.includes('slide') ||
    lower.includes('gamma') ||
    lower.includes('canva') ||
    lower.includes('seminar')
  ) {
    if (lang === 'te') {
      return {
        content: `### 📊 కాలేజ్ సెమినార్ ప్రెజెంటేషన్ (PPT) పూర్తి గైడ్

సెమినార్లలో గరిష్ట మార్కులు సాధించడానికి నిరూపితమైన 8-స్లైడ్ల నిర్మాణం:

#### 1. ప్రామాణిక 8 స్లైడ్ల స్ట్రక్చర్:
- **స్లైడ్ 1:** ప్రాజెక్ట్ టైటిల్, మీ పేరు, బ్రాంచ్, రోల్ నంబర్.
- **స్లైడ్ 2 (సమస్య):** అసలు సమస్య ఏమిటి? ఇది ఎందుకు పరిష్కరించాలి?
- **స్లైడ్ 3 (పరిమితులు):** ప్రస్తుతం మార్కెట్లో ఉన్న లోపాలు.
- **స్లైడ్ 4 (పరిష్కారం):** మీ ప్రాజెక్ట్ ఆర్కిటెక్చర్ & ప్రత్యేకత.
- **స్లైడ్ 5 (వర్క్‌ఫ్లో):** సిస్టమ్ ఫ్లోచార్ట్ లేదా బ్లాక్ డయాగ్రమ్.
- **స్లైడ్ 6 (డెమో/ఫలితాలు):** లైవ్ స్క్రీన్‌షాట్లు, పనితీరు గ్రాఫ్.
- **స్లైడ్ 7 (భవిష్యత్ ప్రణాళిక):** తదుపరి ఫీచర్లు & సవాళ్లు.
- **స్లైడ్ 8:** ముగింపు & అధికారిక రిఫరెన్స్ లింకులు.

#### 2. ప్రెజెంటేషన్ గోల్డెన్ రూల్స్:
- **3-బుల్లెట్ రూల్:** ఒక్క స్లైడ్‌పై 3-4 బుల్లెట్ల కంటే ఎక్కువ ఉండకూడదు.
- **12-పదాల పరిమితి:** ప్రతి బుల్లెట్ 12 పదాల లోపే ఉండాలి.
- **టూల్స్:** **Gamma App** లేదా **Canva Magic Studio** వాడి ఆధునిక డిజైన్లు రూపొందించండి.`,
        source: 'skillnova-core',
        suggestedFollowUps: [
          'Gamma App కోసం పూర్తి ప్రాంప్ట్ ఎలా రాయాలి?',
          'ప్రొజెక్టర్ కోసం ఏ కలర్ కాంట్రాస్ట్ ఉత్తమమైనది?',
          'సెమినార్ వైవా (Viva) ప్రశ్నలను ఎలా ఎదుర్కోవాలి?'
        ]
      };
    }

    return {
      content: `### 📊 High-Impact Academic Seminar Presentation Blueprint

Faculty and judges evaluate presentations on clarity, structure, and pacing. Here is the verified 8-slide architecture:

#### 1. The Standard 8-Slide Narrative Arc:
1. **Slide 1 — Title & Credentials:** Project Title, Student Names, Roll Numbers, Department, Guide/Mentor Name.
2. **Slide 2 — Problem Statement:** The exact real-world pain point quantified with 1-2 reliable statistics.
3. **Slide 3 — Prior Art & Limitations:** Why existing solutions or manual methods fail or fall short.
4. **Slide 4 — Proposed System & Architecture:** Core concept, high-level technology stack, and unique value proposition.
5. **Slide 5 — Methodology / Data Flow:** Clean sequence flowchart or system block diagram.
6. **Slide 6 — Results & Demonstration:** Working screenshots, latency/accuracy metrics, or live deployment URL.
7. **Slide 7 — Challenges & Future Scope:** Technical hurdles overcome and logical next milestones.
8. **Slide 8 — Conclusion & Citations:** Summary takeaways and 2-3 standard academic references.

#### 2. The 3 Presentation Laws:
- **The 3-Bullet Rule:** Never exceed 3-4 bullet points per slide.
- **The 12-Word Maximum:** Keep each bullet under 12 words so the audience listens to your voice rather than reading walls of text.
- **Export Redundancy:** Always export both \`.pptx\` and \`.pdf\` onto a USB drive and Google Drive.`,
      source: 'skillnova-core',
      suggestedFollowUps: [
        'How to write a prompt for Gamma App to generate full slides?',
        'What are the most common viva questions asked in project presentations?',
        'How to design a clean system architecture diagram for PPT?'
      ]
    };
  }

  // 5. RESUME & CAREER
  if (
    lower.includes('resume') ||
    lower.includes('cv') ||
    lower.includes('ats') ||
    lower.includes('placement') ||
    lower.includes('interview') ||
    lower.includes('internship') ||
    lower.includes('fresher')
  ) {
    if (lang === 'te') {
      return {
        content: `### 📄 ATS-సురక్షితమైన ఇంజనీరింగ్ రెజ్యూమ్ గైడ్

కంపెనీలలో ATS (Applicant Tracking System) సాఫ్ట్‌వేర్ ఫిల్టర్ దాటడానికి నిబంధనలు:

#### 1. Google XYZ ఇంపాక్ట్ ఫార్ములా:
> **"సాధించిన పని [X], కొలవగల ఫలితం [Y], ఉపయోగించిన పద్ధతి [Z]"**

- ❌ **బలహీనమైన పాయింట్:** "కాలేజ్ నోట్స్ కోసం వెబ్‌సైట్ నిర్మించాను."
- ✅ **బలమైన ఇంపాక్ట్ పాయింట్:** "React & Tailwind CSS ఉపయోగించి విద్యార్థుల నోట్స్ పోర్టల్‌ను రూపొందించాను, దీనివల్ల 200+ బ్యాచ్‌మేట్స్‌కు ఫైల్ శోధన సమయం 40% తగ్గింది."

#### 2. ముఖ్యమైన నియమాలు:
1. **సింగిల్ కాలమ్ లేఅవుట్:** టేబుల్స్, ఐకాన్లు, గ్రాఫిక్స్ వాడవద్దు — ATS వాటిని తప్పుగా చదువుతుంది.
2. **లైవ్ లింకులు తప్పనిసరి:** GitHub ప్రొఫైల్ మరియు ప్రాజెక్ట్ Vercel లైవ్ లింకులు జోడించండి.
3. **PDF ఫార్మాట్:** ఇమేజ్ స్కాన్ కాకుండా, టెక్స్ట్ సెలెక్ట్ అయ్యే స్టాండర్డ్ PDF ఎగుమతి చేయండి.`,
        source: 'skillnova-core',
        suggestedFollowUps: [
          'మా Career Hub లో రెజ్యూమ్ అనలైజర్ ఎలా ఉపయోగించాలి?',
          'CS Fresher రెజ్యూమ్‌లో ఏ సాంకేతిక నైపుణ్యాలు ఉండాలి?',
          'ఓపెన్ సోర్స్ కాంట్రిబ్యూషన్స్ రెజ్యూమ్‌లో ఎలా చూపించాలి?'
        ]
      };
    }

    return {
      content: `### 📄 Engineering Student Resume & ATS Optimization Blueprint

Most corporate recruiters and hiring portals use ATS software. Here is how to format your technical resume to pass screening:

#### 1. The Google XYZ Impact Formula:
> **"Accomplished [X] as measured by [Y], by doing [Z]"**

- ❌ **Weak Bullet:** "Helped build a React website for student study notes."
- ✅ **Impact Bullet:** "Architected responsive student study portal using React and Tailwind CSS, reducing resource discovery time by 40% across 200+ active peers."
- ❌ **Weak Bullet:** "Worked on machine learning model for sentiment analysis."
- ✅ **Impact Bullet:** "Fine-tuned BERT-based NLP model on Hugging Face, achieving 88% classification accuracy across 5,000 student feedback submissions."

#### 2. Crucial ATS Safety Rules:
1. **Single-Column Layout:** Dual columns, tables, text boxes, and complex graphics break ATS parsers.
2. **Standard Headers Only:** "Education", "Technical Skills", "Projects", "Experience", "Certifications".
3. **Live Working Hyperlinks:** Always include clean URLs to your public GitHub profile and live deployed projects (e.g. Vercel).
4. **Machine-Readable PDF:** Never submit an image-based scan; ensure text can be highlighted and copied.`,
      source: 'skillnova-core',
      suggestedFollowUps: [
        'How to describe hackathon projects with quantifiable metrics?',
        'What skills should a 2025 CS graduate feature on page 1?',
        'How to write a compelling GitHub README for placement recruiters?'
      ]
    };
  }

  // 6. SQL & DATABASES
  if (
    lower.includes('sql') ||
    lower.includes('database') ||
    lower.includes('postgres') ||
    lower.includes('mongodb') ||
    lower.includes('supabase') ||
    lower.includes('query') ||
    lower.includes('prisma') ||
    lower.includes('schema')
  ) {
    if (lang === 'te') {
      return {
        content: `### 🗄️ డేటాబేస్ & SQL ఆర్కిటెక్చర్ గైడ్

వెబ్ అప్లికేషన్లలో డేటాను సురక్షితంగా మరియు వేగంగా నిల్వ చేయడానికి మార్గదర్శకాలు:

#### 1. SQL vs NoSQL:
- **PostgreSQL / MySQL (SQL):** క్రమబద్ధమైన డేటా, యూజర్ ఖాతాలు, లావాదేవీలకు ఉత్తమమైనది.
- **MongoDB (NoSQL):** డాక్యుమెంట్ ఆధారిత, తరచుగా మారే స్కీమాలకు అనుకూలం.

#### 2. విద్యార్థుల కోసం ఉచిత క్లౌడ్ డేటాబేస్‌లు:
- **Supabase:** ఉచిత 500MB PostgreSQL డేటాబేస్, Auth మరియు REST API ఆటోమేటిక్‌గా వస్తుంది.
- **Neon.tech:** Serverless PostgreSQL, క్షణాల్లో బ్రాంచింగ్ చేయవచ్చు.`,
        source: 'skillnova-core',
        suggestedFollowUps: [
          'React యాప్‌కు Supabase డేటాబేస్ ఎలా కనెక్ట్ చేయాలి?',
          'SQL Injection దాడుల నుండి డేటాబేస్‌ను ఎలా కాపాడాలి?',
          'డేటాబేస్ ఇండెక్సింగ్ (B-Trees) ఎలా పనిచేస్తుంది?'
        ]
      };
    }

    return {
      content: `### 🗄️ Full-Stack Database Architecture Guide

For student projects, selecting and structuring the right database layer is critical:

#### 1. SQL (Relational) vs NoSQL (Document)
- **PostgreSQL (Recommended):** ACID compliant, structured schemas, relational foreign keys, supported by Supabase and Neon.
- **MongoDB:** Flexible JSON documents, rapid prototyping, supported by MongoDB Atlas Free Tier.

#### 2. Safe Querying & Protection:
\`\`\`typescript
// ❌ HIGH RISK: SQL Injection vulnerable
const query = \`SELECT * FROM users WHERE email = '\${userEmail}'\`;

// ✅ SECURE: Parameterized Query
const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [userEmail]);
\`\`\`

#### 3. Best Free Student Cloud Databases:
1. **Supabase (supabase.com):** Generous free tier with hosted PostgreSQL, authentication, and instant REST API.
2. **Neon (neon.tech):** Serverless PostgreSQL with instantaneous branch creation for testing.`,
      source: 'skillnova-core',
      suggestedFollowUps: [
        'How to connect Supabase to a React application safely?',
        'What is an ORM (like Prisma) and when should you use one?',
        'How does database indexing boost query speed?'
      ]
    };
  }

  // 7. GIT & GITHUB
  if (
    lower.includes('git') ||
    lower.includes('github') ||
    lower.includes('merge') ||
    lower.includes('commit') ||
    lower.includes('branch') ||
    lower.includes('conflict') ||
    lower.includes('push')
  ) {
    if (lang === 'te') {
      return {
        content: `### 🐙 Git & GitHub ప్రాథమిక కమాండ్ల గైడ్

ప్రాజెక్ట్ కోడ్‌ను భద్రపరచడానికి మరియు టీమ్‌తో కలిసి పనిచేయడానికి ముఖ్యమైన కమాండ్లు:

\`\`\`bash
# 1. రిపోజిటరీ ప్రారంభించడం
git init

# 2. ఫైళ్లను స్టేజ్ చేయడం & కమిట్
git add .
git commit -m "feat: మొదటి వెర్షన్ సిద్ధం"

# 3. గిట్‌హబ్ రిమోట్ లింక్ చేయడం
git branch -M main
git remote add origin https://github.com/username/project.git
git push -u origin main
\`\`\`

⚠️ **ముఖ్య హెచ్చరిక:** మీ \`.env\` ఫైల్‌ను ఎప్పుడూ గిట్‌హబ్‌కు పుష్ చేయవద్దు. \`.gitignore\` లో చేర్చండి!`,
        source: 'skillnova-core',
        suggestedFollowUps: [
          'Git Merge Conflict వచ్చినప్పుడు ఎలా పరిష్కరించాలి?',
          'గిట్‌హబ్‌కు పొరపాటున వెళ్ళిన సీక్రెట్స్ ఎలా తొలగించాలి?',
          'Git బ్రాంచ్‌లు (Feature Branches) ఎలా ఉపయోగించాలి?'
        ]
      };
    }

    return {
      content: `### 🐙 Essential Git & GitHub Workflow for Engineers

Version control is mandatory for every serious software project. Here is the verified standard workflow:

\`\`\`bash
# 1. Initialize local repository
git init

# 2. Stage and commit changes cleanly
git add .
git commit -m "feat: scaffold authentication and initial dashboard"

# 3. Connect to GitHub remote and push
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
\`\`\`

#### 💡 Critical Safety Rules:
1. **Never commit secrets:** Always add \`.env\` and \`node_modules\` to \`.gitignore\` before the first commit.
2. **Conventional Commits:** Use prefixes like \`feat:\`, \`fix:\`, \`docs:\`, \`refactor:\`, and \`test:\`.
3. **Branching:** Never push experimental, half-tested code straight to \`main\`. Use \`git checkout -b feature/xyz\`.`,
      source: 'skillnova-core',
      suggestedFollowUps: [
        'How to resolve Git merge conflicts cleanly?',
        'How to remove an accidentally committed .env file from Git history?',
        'How to write a professional GitHub portfolio profile README?'
      ]
    };
  }

  // 8. DATA STRUCTURES & ALGORITHMS (DSA, Searching, Sorting, Trees, Graphs)
  if (
    lower.includes('algorithm') ||
    lower.includes('dsa') ||
    lower.includes('binary search') ||
    lower.includes('sorting') ||
    lower.includes('recursion') ||
    lower.includes('linked list') ||
    lower.includes('tree') ||
    lower.includes('graph') ||
    lower.includes('leetcode') ||
    lower.includes('dynamic programming') ||
    lower.includes('time complexity')
  ) {
    if (lang === 'te') {
      return {
        content: `### 🧠 డేటా స్ట్రక్చర్స్ & అల్గారిథమ్స్ (DSA) గైడ్

సాఫ్ట్‌వేర్ ఇంటర్వ్యూలు మరియు కాంపిటీటివ్ ప్రోగ్రామింగ్ కోసం ముఖ్యమైన సూత్రాలు:

#### 1. టైమ్ & స్పేస్ కాంప్లెక్సిటీ (Big-O):
- **O(1):** హ్యాష్ టేబుల్ లుకప్ (HashMap/Set) — అత్యంత వేగవంతమైనది.
- **O(log N):** బైనరీ సెర్చ్ — సార్టెడ్ అరేలో సగం ఎలిమెంట్లను తొలగిస్తూ వెతకడం.
- **O(N):** లీనియర్ సెర్చ్, సింగిల్ లూప్.
- **O(N log N):** క్విక్ సార్ట్, మెర్జ్ సార్ట్.
- **O(N²):** నెస్టెడ్ లూప్స్ (బబుల్ సార్ట్) — పెద్ద డేటాకు నెమ్మదిగా నడుస్తుంది.

#### 2. ప్రాక్టీస్ పద్ధతి:
1. **మొదట బ్రూట్ ఫోర్స్ రాయండి:** పరిష్కారం సరిగ్గా పనిచేసేలా నిర్ధారించుకోండి.
2. **ఆప్టిమైజ్ చేయండి:** అనవసరపు లూప్‌లను నివారించి Two Pointers లేదా HashMap వాడండి.
3. **ఎడ్జ్ కేసెస్:** ఖాళీ అరే (\`[]\`), ఒకే ఎలిమెంట్, డూప్లికేట్స్ చెక్ చేయండి.`,
        source: 'skillnova-core',
        suggestedFollowUps: [
          'Binary Search కోడ్ ఉదాహరణ చూపించండి',
          'Two Pointer టెక్నిక్ ఎప్పుడు వాడాలి?',
          'Dynamic Programming ప్రాబ్లమ్స్ ఎలా గుర్తించాలి?'
        ]
      };
    }

    return {
      content: `### 🧠 Data Structures & Algorithms (DSA) Mastery Blueprint

Technical interviews and competitive programming test algorithmic problem-solving. Here is the structured mental model:

#### 1. Big-O Complexity Hierarchy (Fastest to Slowest)
- **O(1) Constant:** Hash map/set lookups, array index access.
- **O(log N) Logarithmic:** Binary search on sorted structures.
- **O(N) Linear:** Single loop, prefix sums, two pointers.
- **O(N log N) Linearithmic:** Merge Sort, Quick Sort, heap operations.
- **O(N²) Quadratic:** Nested loops — avoid in production if $N > 10,000$.

#### 2. The 3-Step LeetCode Framework
1. **Understand & Clarify:** Verify constraints (N <= 10^5 implies an O(N) or O(N log N) algorithm).
2. **Brute Force First:** Write the naive solution to guarantee understanding of the state transitions.
3. **Pattern Match Optimization:**
   - Sorted array / contiguous subarray? -> Two Pointers or Sliding Window.
   - Frequency count / fast lookups? $\rightarrow$ Hash Map / Set.
   - Shortest path in unweighted graph? $\rightarrow$ Breadth-First Search (BFS).
   - Overlapping subproblems? $\rightarrow$ Dynamic Programming (Memoization).`,
      source: 'skillnova-core',
      suggestedFollowUps: [
        'How does Binary Search work with a clean code example?',
        'When should I use Sliding Window vs Two Pointers?',
        'How to identify Dynamic Programming patterns in coding questions?'
      ]
    };
  }

  // 9. PYTHON, AI & MACHINE LEARNING
  if (
    lower.includes('python') ||
    lower.includes('machine learning') ||
    lower.includes('deep learning') ||
    lower.includes('pandas') ||
    lower.includes('numpy') ||
    lower.includes('pytorch') ||
    lower.includes('tensorflow') ||
    lower.includes('nlp') ||
    lower.includes('bert') ||
    lower.includes('llm') ||
    lower.includes('rag')
  ) {
    if (lang === 'te') {
      return {
        content: `### 🐍 పైథాన్ & మెషిన్ లెర్నింగ్ (AI/ML) గైడ్

AI అప్లికేషన్లు మరియు డేటా సైన్స్ కోసం పైథాన్ ఎకోసిస్టమ్:

#### 1. ముఖ్యమైన లైబ్రరీలు:
- **NumPy & Pandas:** సంఖ్యా విశ్లేషణ మరియు డేటాఫ్రేమ్ మానిప్యులేషన్.
- **Scikit-Learn:** సాంప్రదాయ ML అల్గారిథమ్స్ (రిసర్చన్, క్లాసిఫికేషన్, క్లస్టరింగ్).
- **PyTorch / Hugging Face:** డీప్ లెర్నింగ్ మరియు ట్రాన్స్‌ఫార్మర్ మోడల్స్ (BERT, GPT, Llama).

#### 2. AI ఇంజనీరింగ్ వర్క్‌ఫ్లో:
1. **డేటా ప్రిపరేషన్:** Missing values సరిచేయడం, ఫీచర్ స్కేలింగ్.
2. **ట్రైనింగ్ & వాలిడేషన్:** Train-Test Split (80/20) చేసి ఓవర్‌ఫిట్టింగ్ నివారించడం.
3. **మోడల్ డిప్లాయ్‌మెంట్:** FastAPI లేదా Flask తో REST API గా మార్చడం.`,
        source: 'skillnova-core',
        suggestedFollowUps: [
          'Hugging Face మోడల్స్ ను పైథాన్‌లో ఎలా వాడాలి?',
          'Pandas లో డేటా క్లీనింగ్ ముఖ్యమైన కమాండ్లు ఏమిటి?',
          'RAG (Retrieval Augmented Generation) అంటే ఏమిటి?'
        ]
      };
    }

    return {
      content: `### 🐍 Python & Machine Learning (AI/ML) Architecture

Modern AI applications leverage Python's robust scientific computing ecosystem:

#### 1. The Core Stack:
- **Data Wrangling:** \`pandas\` (DataFrames) and \`numpy\` (vectorized multidimensional arrays).
- **Classical ML:** \`scikit-learn\` for regression, random forests, and SVMs.
- **Deep Learning & Transformers:** \`PyTorch\` and \`Hugging Face Transformers\` for pretrained LLMs and embeddings.
- **Model Serving:** \`FastAPI\` for asynchronous, lightweight REST model serving.

#### 2. Avoiding Student Pitfalls:
- **Data Leakage:** Always fit your scalers (\`StandardScaler\`) on training data only, never on the full dataset before splitting.
- **Overfitting:** Monitor validation loss alongside training loss. If validation loss climbs while training loss drops, introduce dropout or regularization.
- **Reproducibility:** Always set random seeds: \`torch.manual_seed(42)\` and \`np.random.seed(42)\`.`,
      source: 'skillnova-core',
      suggestedFollowUps: [
        'How to fine-tune a Hugging Face transformer model?',
        'How does Retrieval Augmented Generation (RAG) work?',
        'How to serve a Python ML model with FastAPI?'
      ]
    };
  }

  // 10. WHERE TO START / ROADMAP / BEGINNER (Only if explicitly asking where to start)
  if (
    lower.includes('where to start') ||
    lower.includes('where do i start') ||
    lower.includes('how to start') ||
    lower.includes('new to ai') ||
    lower.includes('roadmap') ||
    lower.includes('ఎక్కడ మొదలు') ||
    lower.includes('ప్రారంభం')
  ) {
    if (lang === 'te') {
      return {
        content: `### 🚀 బిగినర్స్ AI రోడ్‌మ్యాప్ — ఎక్కడ ప్రారంభించాలి?

మీరు మొదటిసారి AI ప్రాజెక్ట్ ప్రారంభిస్తుంటే, గందరగోళం లేకుండా ఈ 3 దశలు అనుసరించండి:

1. **స్పష్టమైన చిన్న లక్ష్యం ఎంచుకోండి:**
   - కాలేజ్ సెమినార్ కోసం 8-స్లైడ్ల ప్రెజెంటేషన్
   - లేదా మీ పర్సనల్ పోర్ట్‌ఫోలియో వెబ్‌సైట్
2. **సరైన ఉచిత టూల్ ఉపయోగించండి:**
   - వెబ్‌సైట్ & UI కోసం: **Lovable** లేదా **Google Antigravity**
   - ఆన్‌లైన్ కోడింగ్ & టెస్టింగ్: **Replit**
   - ప్రెజెంటేషన్లు: **Gamma App**
3. **CR-TCO ఫ్రేమ్‌వర్క్ వాడండి:**
   రోల్, సందర్భం, టాస్క్ మరియు నిబంధనలు స్పష్టంగా వివరించి అవుట్‌పుట్ పొందండి.`,
        source: 'skillnova-core',
        suggestedFollowUps: [
          'CR-TCO ప్రాంప్ట్ ఫార్ములా ఉదాహరణతో చూపించండి',
          'వెబ్‌సైట్ బిల్డ్ స్టూడియో రెసిపీ తెరవండి',
          'Vercel లో ఉచిత హోస్టింగ్ ఎలా సెటప్ చేయాలి?'
        ]
      };
    }

    return {
      content: `### 🚀 The Complete Student AI Launch Roadmap

If you are just starting out with AI, here is the direct, no-fluff 3-step path:

1. **Pick One Tangible Deliverable:**
   Avoid vague goals like "learn all of AI". Pick a concrete project:
   - Personal Portfolio Website (React + Tailwind)
   - Academic Seminar Deck (8-Slide structured PPT)
   - Project Architecture Report (System Flowchart + SRS)
2. **Leverage Verified Low-Barrier Tools:**
   - Web development: **Google Antigravity** or **Lovable**
   - Interactive zero-config playground: **Replit**
   - Professional slide creation: **Gamma App**
3. **Apply the CR-TCO Prompting Formula:**
   Frame your requirements with Context, Role, Task, Constraints, and Output Format to generate accurate results.`,
      source: 'skillnova-core',
      suggestedFollowUps: [
        'How to build a personal portfolio website step-by-step?',
        'Explain the CR-TCO prompt formula with an example',
        'Open the Visual Build Studio to follow a guided recipe'
      ]
    };
  }

  // 9. DYNAMIC TECHNICAL RESOLVER FOR ANY OTHER QUESTION
  // Breaks down the question dynamically instead of repeating a static boilerplate!
  const words = clean.split(/\s+/).filter(w => w.length > 2);
  const keywords = words.slice(0, 5).join(' ');

  if (lang === 'te') {
    return {
      content: `### 💡 SkillNova AI ట్యూటర్ విశ్లేషణ

మీ ప్రశ్న: **"${clean}"**

#### 1. ముఖ్యమైన కాన్సెప్ట్ విశ్లేషణ:
ఈ అంశం (${keywords}) విద్యార్థి ప్రాజెక్ట్‌లకు చాలా కీలకం. సంక్లిష్టమైన సమస్యను ఎదుర్కొన్నప్పుడు:
1. **సమస్య పరిధిని గుర్తించండి:** సమస్య UI లో ఉందా, లాజిక్ లో ఉందా లేదా డేటా నెట్‌వర్క్‌లో ఉందా అని విభజించండి.
2. **చిన్న ఉదాహరణతో పరీక్షించండి:** పూర్తి కోడ్‌ను కాకుండా, సమస్య ఉన్న ఒక చిన్న భాగాన్ని ప్రత్యేకంగా రన్ చేసి చూడండి.
3. **డిఫెన్సివ్ కోడింగ్ పాటించండి:** ఊహించని ఖాళీ విలువలు (null/undefined) రాకుండా రక్షణ గార్డులు రాయండి.

#### 2. ఆచరణాత్మక చర్య:
మీకు నిర్దిష్టమైన కోడ్ బ్లాక్ లేదా లైన్ ఎర్రర్ ఉంటే, దాన్ని ఇక్కడ పేస్ట్ చేయండి — నేను ఖచ్చితమైన పరిష్కారాన్ని వివరిస్తాను!`,
      source: 'skillnova-core',
      suggestedFollowUps: [
        `దీనికి సంబంధించిన కోడ్ ఉదాహరణ ఇవ్వండి`,
        `ఈ అంశంలో సాధారణంగా వచ్చే బగ్స్ ఏమిటి?`,
        `బిగినర్ స్థాయిలో దీనిని ఎలా అర్థం చేసుకోవాలి?`
      ]
    };
  }

  return {
    content: `### 💡 SkillNova AI Engineering Guidance

Regarding your topic: **"${clean}"**

#### 1. Conceptual Breakdown
When working through **${keywords}**, apply this technical architecture mindset:
1. **Isolate the Scope:** Separate concerns into three clean layers: Presentation (UI), Business Logic (handlers/utilities), and Data Persistence (API/state).
2. **Validate Input Boundaries:** Never assume incoming parameters or props are fully defined. Add defensive type checks and default fallbacks.
3. **Test with Minimal Reproduction:** Isolate the specific logic into a clean test snippet before integrating into your main application.

#### 2. Actionable Implementation Steps:
- **If building a feature:** Define your TypeScript interfaces first, then build the state machine, and finally bind to the UI.
- **If troubleshooting an issue:** Inspect browser dev tools (\`F12\`), check network payloads, and trace variable state before point of failure.

*Paste your specific code snippet, terminal output, or error trace below for targeted line-by-line review!*`,
    source: 'skillnova-core',
    suggestedFollowUps: [
      `Show me a minimal working code example for this`,
      `What are the most common pitfalls with this topic?`,
      `How do I structure unit tests for this scenario?`
    ]
  };
}



export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname.replace(/^\/api/, '');

  // 1. Health check
  if (pathname === '/health' || pathname === '' || pathname === '/') {
    return res.status(200).json({
      status: 'online',
      uptimeSeconds: Math.floor(process.uptime()),
      service: 'SkillNova Mega14 Full-Stack API Engine',
      version: '2.0.0-mega14',
      database: {
        status: 'connected',
        usersCount: 1,
        coursesCount: 10,
        quizzesCount: 3
      },
      aiEngine: {
        hasExternalGeminiKey: Boolean(process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY),
        provider: (process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY) ? 'Google Gemini 1.5 Cloud' : 'SkillNova Mega14 Knowledge Engine'
      }
    });
  }

  // 2. Auth: Signup
  if (pathname === '/auth/signup' && req.method === 'POST') {
    const { email, fullName, learningInterests, learningLevel } = req.body || {};
    const safeUser = {
      id: `usr-${Date.now().toString(36)}`,
      email: email || 'learner@skillnova.dev',
      fullName: fullName || 'SkillNova Learner',
      learningInterests: learningInterests || ['Artificial Intelligence', 'Programming & Web Dev'],
      learningLevel: learningLevel || 'beginner',
      explanationDepth: 'standard',
      dailyGoalMinutes: 30,
      theme: 'light',
      streakDays: 1,
      totalLearningMinutes: 0,
      createdAt: new Date().toISOString()
    };
    return res.status(201).json({
      user: safeUser,
      token: `token-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      message: 'Account created successfully. Welcome to SkillNova Mega14!'
    });
  }

  // 3. Auth: Login
  if (pathname === '/auth/login' && req.method === 'POST') {
    const { email } = req.body || {};
    const safeUser = {
      id: 'usr-student-demo',
      email: email || 'learner@skillnova.dev',
      fullName: 'Pavan Manikanta',
      learningInterests: ['Artificial Intelligence', 'Programming & Web Dev'],
      learningLevel: 'beginner',
      explanationDepth: 'standard',
      dailyGoalMinutes: 30,
      theme: 'light',
      streakDays: 4,
      totalLearningMinutes: 120,
      createdAt: new Date().toISOString()
    };
    return res.status(200).json({
      user: safeUser,
      token: `token-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      message: `Welcome back, ${safeUser.fullName}!`
    });
  }

  // 4. Auth: Me
  if (pathname === '/auth/me') {
    return res.status(200).json({
      user: {
        id: 'usr-student-demo',
        email: 'learner@skillnova.dev',
        fullName: 'Pavan Manikanta',
        learningInterests: ['Artificial Intelligence', 'Programming & Web Dev'],
        learningLevel: 'beginner',
        explanationDepth: 'standard',
        dailyGoalMinutes: 30,
        theme: 'light',
        streakDays: 4,
        totalLearningMinutes: 120,
        createdAt: new Date().toISOString()
      }
    });
  }

  // 5. Auth: Logout
  if (pathname === '/auth/logout' && req.method === 'POST') {
    return res.status(200).json({ success: true, message: 'Logged out successfully.' });
  }

  // 6. User Progress
  if (pathname === '/user/progress') {
    return res.status(200).json({
      profile: {
        language: 'en',
        level: 'beginner',
        theme: 'light',
        updatedAt: new Date().toISOString()
      },
      completedLessons: ['lesson-tokens-prediction', 'lesson-ai-fundamentals'],
      quizScores: {
        'lesson-tokens-prediction': { score: 1, total: 1, completedAt: new Date().toISOString() },
        'quiz-ai-llm-basics': { score: 4, total: 4, completedAt: new Date().toISOString() }
      },
      favoriteTools: ['google-antigravity', 'replit', 'lovable'],
      completedStudioSteps: ['recipe-website-step-1'],
      savedPromptsCount: 2,
      savedPlansCount: 1,
      notesCount: 2,
      bookmarksCount: 2,
      achievements: [
        { id: 'ach-1', badgeId: 'first-lesson', title: 'First Step Taken', description: 'Completed your first lesson.', icon: 'Sparkles' },
        { id: 'ach-2', badgeId: 'streak-3', title: 'Consistency Champion', description: 'Maintained a 3-day learning streak.', icon: 'Flame' }
      ]
    });
  }

  // 7. User Profile Update
  if (pathname === '/user/profile' && req.method === 'POST') {
    return res.status(200).json({ success: true });
  }

  // 8. Toggle Favorite
  if (pathname === '/user/favorites/toggle' && req.method === 'POST') {
    const { toolId } = req.body || {};
    return res.status(200).json({
      success: true,
      favoriteTools: ['google-antigravity', 'replit', 'lovable', toolId].filter(Boolean)
    });
  }

  // 9. AI Tutor Chat
  if (pathname === '/tutor/chat' && req.method === 'POST') {
    const { message, language = 'en', level = 'beginner', mode = 'explain_concept', depth = 'standard', focus = 'practical' } = req.body || {};
    const GEMINI_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

    if (GEMINI_KEY && !GEMINI_KEY.includes('your_') && GEMINI_KEY.length > 20) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                role: 'user',
                parts: [{
                  text: `You are SkillNova Mega14 AI Tutor. Mode: ${mode}, Level: ${level}, Depth: ${depth}, Focus: ${focus}, Language: ${language === 'te' ? 'Telugu' : 'English'}.\nQuestion: ${message}\nFormat with clean markdown: Title, Definition, Steps, Key Terms, Examples, Common Mistakes, Quick Quiz.`
                }]
              }],
              generationConfig: {
                temperature: focus === 'theory' ? 0.2 : 0.6,
                maxOutputTokens: depth === 'detailed' ? 1800 : 1000
              }
            })
          }
        );
        if (geminiRes.ok) {
          const gemData = await geminiRes.json();
          const reply = gemData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            return res.status(200).json({
              reply,
              source: 'gemini-api',
              suggestedFollowUps: language === 'te'
                ? ['దీనికి ప్రాక్టికల్ కోడ్ ఉదాహరణ చూపించండి', 'దీనిలో సాధారణంగా చేసే తప్పులు ఏమిటి?', 'నన్ను ఈ టాపిక్‌పై క్విజ్ చేయండి']
                : ['Show me a minimal working code example', 'What are common pitfalls and debugging tips?', 'Quiz me on this concept with 3 questions'],
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
          }
        }
      } catch (e) {
        console.warn('Vercel Gemini call failed, using core fallback', e);
      }
    }

    // Core Intelligent Multi-Domain Response
    const coreResult = resolveIntelligentAnswer(message || '', language as any, level);

    return res.status(200).json({
      reply: coreResult.content,
      source: 'skillnova-core',
      suggestedFollowUps: coreResult.suggestedFollowUps,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  }

  // 10. Default fallback
  return res.status(200).json({ success: true, message: 'SkillNova Mega14 API Serverless Handler' });
}
