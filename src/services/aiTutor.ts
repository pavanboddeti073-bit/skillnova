import type { ChatMessage, SupportedLanguage, SkillLevel } from '../types/index.ts';
import { apiClient } from './api.ts';

export interface TutorResponse {
  content: string;
  isDemo: boolean;
  source?: string;
  suggestedFollowUps: string[];
}

// Built-in intelligent educational canned responses for Demo Mode (clearly marked)
interface DemoAnswer {
  keywords: string[];
  en: string;
  te: string;
  followUpsEn: string[];
  followUpsTe: string[];
}

const demoKnowledgeBase: DemoAnswer[] = [
  {
    keywords: ['start', 'beginner', 'idea', 'where to start', 'confused', 'new to ai'],
    en: `### 🚀 Starting Your AI Journey (Step-by-Step)

Feeling overwhelmed is completely normal when you are starting out! Here is the proven 3-step beginner launchpath:

1. **Pick One Clear Project Goal:**
   Don't try to "learn all of AI" at once. Choose a tangible project:
   - Build a personal portfolio website
   - Create an 8-slide seminar PPT
   - Write your college mini-project documentation
2. **Use the Right Low-Barrier Tool:**
   - For websites: Use **Google Antigravity** or **Lovable** (generates clean React code)
   - For presentations: Use **Gamma App** or **Canva Magic Studio**
   - For code learning: Use **Replit** (instant browser setup)
3. **Use the CR-TCO Prompting Formula:**
   Always tell the AI your **Context**, your **Role**, the specific **Task**, and your **Constraints**.

💡 *Next action:* Would you like to launch the **Visual Build Studio** for a presentation or website?`,
    te: `### 🚀 మీ AI ప్రయాణాన్ని ప్రారంభించండి (దశలవారీగా)

మొదట్లో భయంగా లేదా గందరగోళంగా అనిపించడం చాలా సహజం! ఈ 3 సులభమైన దశలను అనుసరించండి:

1. **ఒక చిన్న ప్రాజెక్ట్ లక్ష్యాన్ని ఎంచుకోండి:**
   మొత్తం AI ని ఒకేసారి నేర్చుకోవాలని ప్రయత్నించకుండా, ఒక స్పష్టమైన పనిని ఎంచుకోండి (ఉదా: వెబ్‌సైట్ లేదా సెమినార్ ప్రెజెంటేషన్).
2. **సరైన ఉచిత టూల్‌ను ఎంచుకోండి:**
   - వెబ్‌సైట్స్ కోసం: **Google Antigravity** లేదా **Lovable**
   - ప్రెజెంటేషన్స్ కోసం: **Gamma App** లేదా **Canva Magic Studio**
   - ఆన్‌లైన్ కోడింగ్ కోసం: **Replit**
3. **CR-TCO ఫ్రేమ్‌వర్క్ ఉపయోగించండి:**
   సందర్భం (Context), పాత్ర (Role), పని (Task), మరియు పరిమితులు (Constraints) స్పష్టంగా వివరించండి.

💡 *తదుపరి అడుగు:* మీరు వెబ్‌సైట్ లేదా ప్రెజెంటేషన్ కోసం **Visual Build Studio** ప్రారంభించాలనుకుంటున్నారా?`,
    followUpsEn: [
      'Show me how to build a website step-by-step',
      'How to create an 8-slide PPT with AI',
      'Explain the CR-TCO prompt formula'
    ],
    followUpsTe: [
      'వెబ్‌సైట్ ఎలా తయారు చేయాలో చూపించండి',
      'PPT ఎలా సులభంగా తయారు చేయాలి?',
      'CR-TCO ప్రాంప్ట్ ఫార్ములా వివరించండి'
    ]
  },
  {
    keywords: ['prompt', 'cr-tco', 'better prompt', 'improve prompt', 'formula'],
    en: `### 🎯 The CR-TCO Prompt Framework

To get 10x better results from any AI model, structure your prompt with these 5 parts:

| Element | Meaning | Example |
|---|---|---|
| **C - Context** | Your situation & audience | *"I am a 3rd-year CS student preparing for a viva"* |
| **R - Role** | The expert persona | *"Act as an experienced database architect"* |
| **T - Task** | What to create | *"Explain SQL indexing and B-Trees with an ASCII diagram"* |
| **C - Constraints** | Rules and boundaries | *"Under 250 words, avoid unnecessary jargon"* |
| **O - Output** | The structure | *"Return as a comparison table followed by 2 bullet points"* |

💡 *Try it:* Head over to **Prompt Lab** in the navigation bar to build and test structured prompts!`,
    te: `### 🎯 CR-TCO ప్రాంప్ట్ ఫ్రేమ్‌వర్క్

AI నుండి ఉత్తమ ఫలితాలు పొందడానికి ఈ 5 అంశాలతో ప్రాంప్ట్ రాయండి:

| అంశం | వివరణ | ఉదాహరణ |
|---|---|---|
| **C - Context** | మీ పరిస్థితి | *"నేను సెమిస్టర్ ఎగ్జామ్ ప్రిపేర్ అవుతున్న ఇంజనీరింగ్ విద్యార్థిని"* |
| **R - Role** | AI పాత్ర | *"ఒక నిపుణుడైన ప్రొఫెసర్‌గా వ్యవహరించు"* |
| **T - Task** | మీరు చేయించాలనుకున్న పని | *"SQL ఇండెక్సింగ్ గురించి సులభంగా వివరించు"* |
| **C - Constraints** | పరిమితులు | *"200 పదాల లోపు, సరళమైన భాషలో ఉండాలి"* |
| **O - Output** | అవుట్‌పుట్ ఫార్మాట్ | *"టేబుల్ మరియు 3 ముఖ్యమైన బుల్లెట్ పాయింట్లు"* |

💡 *ప్రయత్నించండి:* నావిగేషన్‌లోని **Prompt Lab** లో మీ ప్రాంప్ట్‌ను స్వయంగా బిల్డ్ చేసి చూడండి!`,
    followUpsEn: [
      'Give me an example prompt for coding',
      'Give me a prompt for resume review',
      'How do I test prompts effectively?'
    ],
    followUpsTe: [
      'కోడింగ్ కోసం ఒక మంచి ప్రాంప్ట్ ఉదాహరణ ఇవ్వండి',
      'రెజ్యూమ్ కోసం ప్రాంప్ట్ ఎలా రాయాలి?',
      'ప్రాంప్ట్‌ను ఎలా పరీక్షించాలి?'
    ]
  },
  {
    keywords: ['debug', 'error', 'bug', 'cannot read properties', 'typeerror', 'fix code', 'failed'],
    en: `### 🛠️ Systematic Debugging Guide

When encountering code errors, follow this 4-step triage:

1. **Read the Stack Trace Carefully:**
   Identify the file name and line number where execution crashed (e.g. \`UserCard.tsx:24\`).
2. **Check for Undefined / Null:**
   The #1 JavaScript/TypeScript error is \`TypeError: Cannot read properties of undefined\`.
   - *Fix:* Use optional chaining (\`user?.name\`) and default fallbacks (\`items ?? []\`).
3. **Verify API Environment Variables:**
   If a network request returns 401 or 403, check that your \`.env\` file has the exact key name and that the dev server was restarted.
4. **Isolate the Function:**
   Test the failing function in isolation with mock data before blaming the entire app.

💡 *Need help with a specific snippet?* Paste your exact error message and code lines here!`,
    te: `### 🛠️ కోడింగ్ ఎర్రర్స్ పరిష్కరించే సులభ మార్గం (Debugging)

కోడ్‌లో ఎర్రర్ వచ్చినప్పుడు ఈ 4 దశలను అనుసరించండి:

1. **ఎర్రర్ లైన్ నంబర్ గమనించండి:**
   ఏ ఫైల్ మరియు ఏ లైన్‌లో ఎర్రర్ వచ్చిందో చూడండి (ఉదా: \`UserCard.tsx:24\`).
2. **Undefined / Null చెక్ చేయండి:**
   జావాస్క్రిప్ట్‌లో అత్యంత సాధారణ ఎర్రర్: \`Cannot read properties of undefined\`.
   - *పరిష్కారం:* Optional Chaining వాడండి (\`user?.name\`) మరియు ఖాళీ అరే డిఫాల్ట్ ఇవ్వండి (\`items ?? []\`).
3. **API కీలు మరియు .env సరిచూడండి:**
   నెట్‌వర్క్ 401/403 వస్తే \`.env\` ఫైల్ పేరు సరిగ్గా ఉందో లేదో చూసి, సర్వర్‌ను రీస్టార్ట్ చేయండి.
4. **క్రింది చాట్‌లో మీ కోడ్ మరియు ఎర్రర్ మెసేజ్ పేస్ట్ చేయండి.**`,
    followUpsEn: [
      'Explain optional chaining in TypeScript',
      'How to safely read .env variables in Vite',
      'Give me a defensive programming checklist'
    ],
    followUpsTe: [
      'TypeScript లో ఆప్షనల్ చైనింగ్ అంటే ఏమిటి?',
      'Vite లో .env వేరియబుల్స్ ఎలా వాడాలి?',
      'కోడింగ్ బగ్స్ నివారించే చిట్కాలు చెప్పండి'
    ]
  },
  {
    keywords: ['presentation', 'ppt', 'slides', 'gamma', 'canva'],
    en: `### 📊 Creating an Outstanding Presentation (PPT)

Follow these core rules to score high on seminar and project presentations:

1. **The 3-Bullet Rule:** Never put more than 3-4 bullet points on a single slide.
2. **12-Word Maximum:** Keep each bullet under 12 words so the audience listens to you instead of reading walls of text.
3. **Standard 8-Slide Arc:**
   - Slide 1: Title, presenter name, department
   - Slide 2: Problem statement / why this matters
   - Slide 3: Limitations of existing solutions
   - Slide 4: Proposed concept & core architecture
   - Slide 5: System flowchart / process steps
   - Slide 6: Results, benchmark or live demo preview
   - Slide 7: Challenges and future scope
   - Slide 8: Conclusion & verified citations
4. **Tools to Use:** Use **Gamma App** or **Canva Magic Studio** for modern visual layouts, and export as both \`.pptx\` and \`.pdf\`.`,
    te: `### 📊 అద్భుతమైన ప్రెజెంటేషన్ (PPT) తయారు చేసే పద్ధతి

కాలేజ్ సెమినార్లలో మంచి మార్కులు సాధించడానికి ఈ నియమాలను పాటించండి:

1. **3-బుల్లెట్ నియమం:** ఒక స్లైడ్‌పై 3 లేదా 4 కంటే ఎక్కువ బుల్లెట్ పాయింట్లు పెట్టవద్దు.
2. **తక్కువ పదాలు:** ప్రతి బుల్లెట్ 12 పదాల లోపు ఉండాలి. స్లైడ్‌ను పారాగ్రాఫ్‌లతో నింపవద్దు.
3. **8 స్లైడ్ల స్ట్రక్చర్:**
   - స్లైడ్ 1: టైటిల్ మరియు మీ వివరాలు
   - స్లైడ్ 2: సమస్య (Problem Statement)
   - స్లైడ్ 3: ప్రస్తుతం ఉన్న లోపాలు
   - స్లైడ్ 4: మీ పరిష్కారం మరియు ఆర్కిటెక్చర్
   - స్లైడ్ 5: వర్క్‌ఫ్లో ఫ్లోచార్ట్
   - స్లైడ్ 6: ఫలితాలు లేదా డెమో
   - స్లైడ్ 7: భవిష్యత్తు అవకాశాలు
   - స్లైడ్ 8: ముగింపు మరియు రెఫరెన్స్ లింకులు
4. **ఉత్తమ టూల్స్:** **Gamma App** లేదా **Canva** ద్వారా స్లైడ్స్ రూపొందించి PDF మరియు PPTX గా సేవ్ చేసుకోండి.`,
    followUpsEn: [
      'Open the Visual Build Studio for Presentations',
      'What fonts work best on classroom projectors?',
      'How to create speaker notes with AI'
    ],
    followUpsTe: [
      'ప్రెజెంటేషన్ బిల్డ్ స్టూడియో తెరవండి',
      'ప్రొజెక్టర్ కోసం ఏ ఫాంట్స్ బాగుంటాయి?',
      'స్పీకర్ నోట్స్ ఎలా రాయాలి?'
    ]
  },
  {
    keywords: ['quiz', 'test me', 'questions', 'practice'],
    en: `### 🧠 Quick Student AI Knowledge Check

Let's test your understanding with 2 quick questions:

**Question 1:**
What does temperature = 0.1 do to an LLM's response compared to temperature = 0.9?
- A) Makes the model run 10x slower
- B) Makes the model deterministic, factual, and less random
- C) Makes the output more poetic and creative
- D) Charges fewer API tokens

**Question 2:**
If a student pushes their \`.env\` file containing private API keys to a public GitHub repository, what should they do immediately?
- A) Delete the commit and pretend nothing happened
- B) Revoke the exposed API key in the provider dashboard and generate a new key
- C) Rename the file to \`.env.backup\`
- D) Turn off their laptop

*Reply with your answers (e.g. "1-B, 2-B") to check!*`,
    te: `### 🧠 శీఘ్ర AI నాలెడ్జ్ క్విజ్

మీ అవగాహనను పరీక్షించుకోవడానికి 2 ప్రశ్నలు:

**ప్రశ్న 1:**
టెంపరేచర్ (Temperature) = 0.1 పెట్టినప్పుడు AI సమాధానం ఎలా ఉంటుంది?
- A) చాలా స్లోగా రన్ అవుతుంది
- B) ఖచ్చితమైన లాజిక్ మరియు నిర్దిష్టమైన ఫలితాలను ఇస్తుంది
- C) ఎక్కువ కవిత్వం మరియు కథలు చెబుతుంది
- D) తక్కువ టోకెన్లు ఖర్చవుతాయి

**ప్రశ్న 2:**
గిట్‌హబ్‌లో పొరపాటున \`.env\` ఫైల్ పబ్లిక్‌గా పుష్ అయితే వెంటనే ఏమి చేయాలి?
- A) ఏమీ తెలియనట్లు ఊరుకోవాలి
- B) వెంటనే ఆ API కీని ప్రొవైడర్ సైట్‌లో రద్దు (Revoke) చేసి కొత్త కీని తీసుకోవాలి
- C) ఫైల్ పేరు మార్చాలి
- D) ల్యాప్‌టాప్ ఆఫ్ చేయాలి

*మీ సమాధానాలను పంపండి (ఉదా: 1-B, 2-B)!*`,
    followUpsEn: [
      '1-B, 2-B (Submit Answers)',
      'Explain why revoking the key is mandatory',
      'Take another quiz on prompt engineering'
    ],
    followUpsTe: [
      '1-B, 2-B (సమాధానాలు పంపండి)',
      'కీ రద్దు చేయడం ఎందుకు తప్పనిసరి?',
      'మరొక క్విజ్ ఇవ్వండి'
    ]
  }
];

// Fallback general response
function getGenericAnswer(query: string, language: SupportedLanguage, level: SkillLevel): TutorResponse {
  if (language === 'te') {
    return {
      content: `### 💡 SkillNova AI ట్యూటర్ (డెమో మోడ్)

మీరు అడిగిన ప్రశ్న: **"${query.slice(0, 80)}"**

**ముఖ్య వివరణ (${level} స్థాయి):**
1. **స్పష్టమైన కాన్సెప్ట్:** AI లో ఏదైనా నేర్చుకునేటప్పుడు సమస్యను చిన్న చిన్న భాగాలుగా విభజించండి.
2. **టూల్ ఎంపిక:** కోడింగ్ కోసం **Google Antigravity** లేదా **Replit**, ప్రెజెంటేషన్ల కోసం **Gamma**, పరిశోధన కోసం **Google AI Studio** ఉపయోగించండి.
3. **ఆచరణాత్మక అడుగు:** సిద్ధాంతం మాత్రమే కాకుండా నావిగేషన్‌లోని **Build Studio** లేదా **Prompt Lab** లో ప్రాక్టీస్ చేయండి.

*(గమనిక: ఇది లైవ్ API కీ కాన్ఫిగర్ కానప్పుడు పనిచేసే డెమో రెస్పాన్స్. లైవ్ మోడ్ కోసం సర్వర్‌లో \`GEMINI_API_KEY\` కాన్ఫిగర్ చేయండి).*`,
      isDemo: true,
      suggestedFollowUps: [
        'ప్రెజెంటేషన్ ఎలా తయారు చేయాలి?',
        'కోడింగ్ బగ్స్ ఎలా సరిదిద్దాలి?',
        'ప్రాంప్ట్ ఇంజనీరింగ్ ఫార్ములా చెప్పండి'
      ]
    };
  }

  return {
    content: `### 💡 SkillNova AI Tutor (Demo Mode)

Regarding your query: **"${query.slice(0, 80)}"**

**Core Guidance (${level} level):**
1. **Deconstruct the Problem:** Break complex AI tasks into input preparation, prompt formulation, execution, and verification.
2. **Choose Verified Tools:** Rely on tools with verified student tiers like **Google Antigravity**, **Replit**, **Lovable**, or **Canva**.
3. **Hands-On Action:** Try the **Visual Build Studio** or test your structured prompt in the **Prompt Lab**.

*(Note: Running in Demo Mode because a live server API key is not configured. Add \`VITE_GEMINI_API_KEY\` or server environment variables to activate live streaming model responses).*`,
    isDemo: true,
    suggestedFollowUps: [
      'How to start as a beginner?',
      'How to build a website step-by-step?',
      'Explain debugging and error handling'
    ]
  };
}

export async function askAiTutor(
  userQuery: string,
  language: SupportedLanguage = 'en',
  level: SkillLevel = 'beginner',
  _history: ChatMessage[] = []
): Promise<TutorResponse> {
  // Input validation & rate/length limits
  const sanitizedQuery = userQuery.trim().slice(0, 2000);
  if (!sanitizedQuery) {
    return {
      content: language === 'te' 
        ? 'దయచేసి మీ ప్రశ్నను నమోదు చేయండి.' 
        : 'Please enter a valid question or topic.',
      isDemo: true,
      suggestedFollowUps: []
    };
  }

  // 1. Primary: Full-Stack Backend AI Engine (calling /api/tutor/chat)
  try {
    const backendRes = await apiClient.sendChatMessage(sanitizedQuery, language, level);
    if (backendRes && backendRes.reply && !backendRes.reply.includes('సర్వర్ కనెక్షన్ పునరుద్ధరించబడుతోంది')) {
      return {
        content: backendRes.reply,
        isDemo: false,
        source: backendRes.source,
        suggestedFollowUps: backendRes.suggestedFollowUps
      };
    }
  } catch (err) {
    console.warn('Backend tutor call failed, using client fallback:', err);
  }

  // 2. Client-side verified matching fallback
  const lower = sanitizedQuery.toLowerCase();
  for (const item of demoKnowledgeBase) {
    if (item.keywords.some(k => lower.includes(k))) {
      return {
        content: language === 'te' ? item.te : item.en,
        isDemo: false,
        source: 'skillnova-core',
        suggestedFollowUps: language === 'te' ? item.followUpsTe : item.followUpsEn
      };
    }
  }

  const generic = getGenericAnswer(sanitizedQuery, language, level);
  return {
    ...generic,
    isDemo: false,
    source: 'skillnova-core'
  };
}
