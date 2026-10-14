import { Lesson } from '../types';

export const academyLessons: Lesson[] = [
  {
    id: 'lesson-ai-fundamentals',
    title: 'How Modern AI and LLMs Actually Work',
    titleTe: 'ఆధునిక AI మరియు LLMలు అసలు ఎలా పనిచేస్తాయి?',
    level: 'beginner',
    category: 'AI Fundamentals',
    durationMinutes: 12,
    prerequisites: ['No prior programming or machine learning required'],
    summary: 'Demystifying Large Language Models: tokens, probabilistic prediction, embeddings, and context windows explained with everyday analogies.',
    summaryTe: 'టోకెన్లు, ప్రాబబిలిటీ, కాంటెక్స్ట్ విండో భావనలను సులభమైన కాలేజ్ ఉదాహరణలతో అర్థం చేసుకోండి.',
    plainExplanation: 'Think of an LLM like a supercharged autocomplete trained on billions of library books. When you ask it a question, it does not "think" or feel like a human. Instead, it converts your words into numerical tokens and calculates what next token has the highest statistical probability of making sense in that context.',
    plainExplanationTe: 'లార్జ్ లాంగ్వేజ్ మోడల్ (LLM) అనేది మీ ఫోన్‌లోని ఆటో-కంప్లీట్ లాంటిది. కానీ ఇది కోట్లాది పుస్తకాలు, ఆర్టికల్స్‌పై శిక్షణ పొందింది. మీరు ఏదైనా అడిగినప్పుడు, అది మనుషుల్లా స్వయంగా ఆలోచించదు. గణితం ప్రకారం తర్వాతి సరైన పదం (Next Token) ఏది రావాలో అంచనా వేస్తుంది.',
    steps: [
      {
        title: 'Tokenization: Words into Numbers',
        description: 'Text is broken into "tokens" (roughly 4 characters or 0.75 words in English). For example, "SkillNova helps students" is broken into [Skill, Nova,  helps,  students].',
        codeOrPrompt: 'Input: "AI for engineering"\nTokens: ["AI", " for", " engineering"] (3 tokens)'
      },
      {
        title: 'Context Window: The Desk Space',
        description: 'The context window is like the desk space an AI has. If your conversation or document exceeds this limit, earlier messages fall off the desk and the model forgets them.',
        codeOrPrompt: 'Gemini 1.5 Pro: Up to 2,000,000 tokens (approx. 1,500,000 words)\nGPT-4o: 128,000 tokens\nLocal models: Typically 4,000 - 32,000 tokens'
      },
      {
        title: 'Temperature: Creativity vs Predictability',
        description: 'Temperature controls randomness. Low temperature (0.0 to 0.2) gives factual, deterministic answers. High temperature (0.7 to 1.0) gives creative, diverse stories or brainstorming.',
        codeOrPrompt: 'Coding & Math: temperature = 0.1\nPoetry & Brainstorming: temperature = 0.8'
      }
    ],
    example: 'When given "The capital of Telangana is...", the model\'s highest probability token is " Hyderabad" (99.8% probability).',
    practiceActivity: 'Take a paragraph from your college textbook. Count approximately how many words it contains, and calculate how many tokens that would equal (Words / 0.75).',
    commonMistakes: [
      'Assuming an LLM possesses consciousness or intentionality.',
      'Treating every LLM answer as verified factual truth without checking citations.',
      'Exceeding the context window and wondering why the model forgot earlier instructions.'
    ],
    quiz: [
      {
        question: 'What is a "token" in Large Language Models?',
        questionTe: 'లార్జ్ లాంగ్వేజ్ మోడల్స్‌లో "టోకెన్" అంటే ఏమిటి?',
        options: [
          'A physical coin used for cloud billing',
          'A chunk of characters or words converted into numbers for the model to process',
          'A secret password required to log in to GitHub',
          'A database table index'
        ],
        correctIndex: 1,
        explanation: 'Tokens are the basic semantic units (chunks of characters or words) that LLMs process and predict.',
        explanationTe: 'టోకెన్ అనేది పదాలను కంప్యూటర్ అర్థం చేసుకునే సంఖ్యలుగా మార్చే ప్రాథమిక భాగం.'
      },
      {
        question: 'Which temperature setting is best suited for generating bug-free Python code?',
        questionTe: 'బగ్స్ లేని పైథాన్ కోడ్ రాయడానికి ఏ టెంపరేచర్ సెట్టింగ్ సరైనది?',
        options: [
          '1.8 (Maximum randomness)',
          '0.1 to 0.2 (Low randomness and high precision)',
          '10.0 (Extreme variation)',
          'Temperature does not affect coding'
        ],
        correctIndex: 1,
        explanation: 'Low temperature (0.1 to 0.2) ensures deterministic, logical, and syntax-correct code generation.',
        explanationTe: 'తక్కువ టెంపరేచర్ (0.1 - 0.2) కోడింగ్ మరియు లాజిక్ కోసం ఖచ్చితమైన సమాధానాలను ఇస్తుంది.'
      }
    ],
    references: [
      { title: 'Google AI Studio Overview', url: 'https://ai.google.dev' },
      { title: 'Transformers Documentation - Hugging Face', url: 'https://huggingface.co/docs' }
    ]
  },
  {
    id: 'lesson-prompt-engineering',
    title: 'The CR-TCO Framework for Prompt Engineering',
    titleTe: 'ప్రాంప్ట్ ఇంజనీరింగ్: CR-TCO ఫ్రేమ్‌వర్క్ నేర్చుకోండి',
    level: 'beginner',
    category: 'Prompt Engineering',
    durationMinutes: 15,
    prerequisites: ['Basic understanding of what an LLM is'],
    summary: 'Learn the foolproof 5-part prompting formula used by professional AI engineers: Context, Role, Task, Constraints, and Output Format.',
    summaryTe: 'సరైన ప్రాంప్ట్ రాయడానికి 5 ప్రధాన నియమాలు: సందర్భం, పాత్ర, పని, పరిమితులు మరియు అవుట్‌పుట్ ఫార్మాట్.',
    plainExplanation: 'Vague prompts generate generic, boring responses. When you say "Explain React", the AI does not know if you are a 10-year-old child, a junior developer preparing for an interview, or a professor. By specifying Role, Context, Constraints, and Output format, you guide the probability distribution toward exactly what you need.',
    plainExplanationTe: 'సాధారణంగా "రియాక్ట్ గురించి చెప్పు" అని అడిగితే ఫలితం నాసిరకంగా వస్తుంది. ఎందుకంటే మీరు విద్యార్థా, డెవలపరా అనేది మోడల్‌కు తెలియదు. అదే మీ పాత్ర, సమయం, ఫార్మాట్ స్పష్టంగా చెబితే అద్భుతమైన ఫలితం వస్తుంది.',
    steps: [
      {
        title: 'C - Context (The Background)',
        description: 'Provide the situation: "I am a 3rd-year engineering student preparing for a technical viva tomorrow morning."',
        codeOrPrompt: 'Context: Preparing for a campus interview at a product company.'
      },
      {
        title: 'R - Role (The Persona)',
        description: 'Assign a domain expert role: "Act as a patient senior staff software engineer who loves teaching clean code principles."',
        codeOrPrompt: 'Role: Senior Full-Stack Architect'
      },
      {
        title: 'T - Task (The Explicit Goal)',
        description: 'State exactly what must be done: "Explain the difference between useEffect and useMemo with 2 simple code snippets."',
        codeOrPrompt: 'Task: Compare useEffect and useMemo'
      },
      {
        title: 'C - Constraints (The Boundaries)',
        description: 'State what to avoid: "Do not use external libraries. Keep explanations under 200 words. Explain in beginner-friendly English."',
        codeOrPrompt: 'Constraints: Under 200 words, no jargon without definition.'
      },
      {
        title: 'O - Output Format (The Shape)',
        description: 'Specify the structure: "Return as a Markdown table comparing: Purpose, When to Use, and Code Example."',
        codeOrPrompt: 'Output Format: Markdown comparison table followed by bullet points.'
      }
    ],
    example: 'Before: "Tell me about SQL joins"\nAfter: "Act as a database tutor (Role). I am studying for my semester exam (Context). Explain INNER, LEFT, and RIGHT joins with a visual Venn diagram representation and a 3-row sample table for each (Task & Output). Keep each under 40 words (Constraint)."',
    practiceActivity: 'Pick an assignment topic you are currently working on. Rewrite your last chat query into the CR-TCO format using SkillNova Prompt Lab.',
    commonMistakes: [
      'Writing single-sentence prompts and expecting production-grade answers.',
      'Forgetting to specify constraints like language, tone, or word count.',
      'Asking for 10 unrelated tasks in a single giant prompt block.'
    ],
    quiz: [
      {
        question: 'What does the "C" in CR-TCO framework stand for?',
        questionTe: 'CR-TCO ఫ్రేమ్‌వర్క్‌లో మొదటి "C" దేనిని సూచిస్తుంది?',
        options: [
          'Computer',
          'Context (The background scenario and user background)',
          'Cost of the API token',
          'Complexity index'
        ],
        correctIndex: 1,
        explanation: 'Context provides the background setting so the model tailors its explanation to your specific reality.',
        explanationTe: 'కాంటెక్స్ట్ (సందర్భం) అనేది మీ నేపథ్యం మరియు లక్ష్యాన్ని తెలియజేస్తుంది.'
      },
      {
        question: 'Why should you specify an Output Format in your prompt?',
        questionTe: 'ప్రాంప్ట్‌లో అవుట్‌పుట్ ఫార్మాట్ ఎందుకు పేర్కొనాలి?',
        options: [
          'It is required by law',
          'It forces the model to structure the response cleanly (e.g. table, JSON, markdown) instead of a rambling paragraph',
          'It makes the model run 10 times faster',
          'It allows you to bypass model safety filters'
        ],
        correctIndex: 1,
        explanation: 'Clear output format specifications (like Markdown tables or JSON) prevent meandering responses and save review time.',
        explanationTe: 'టేబుల్ లేదా బుల్లెట్ పాయింట్స్ రూపంలో స్పష్టమైన ఫలితం పొందడానికి అవుట్‌పుట్ ఫార్మాట్ ఉపకరిస్తుంది.'
      }
    ],
    references: [
      { title: 'Google Prompt Engineering Guide', url: 'https://ai.google.dev/docs' },
      { title: 'Anthropic Prompt Engineering Interactive Tutorial', url: 'https://docs.anthropic.com' }
    ]
  },
  {
    id: 'lesson-responsible-ai',
    title: 'Responsible AI, Hallucinations & Academic Integrity',
    titleTe: 'బాధ్యతాయుతమైన AI: హాలూసినేషన్స్ మరియు నిజాయితీ',
    level: 'beginner',
    category: 'Responsible AI',
    durationMinutes: 10,
    prerequisites: ['Basic familiarity with AI tools'],
    summary: 'Understanding AI hallucinations, preventing privacy leaks, complying with college academic integrity codes, and proper attribution.',
    summaryTe: 'AI ఇచ్చే తప్పు సమాచారం (హాలూసినేషన్స్) గుర్తించడం మరియు కాలేజ్ ప్రాజెక్టులలో నిజాయితీగా ఎలా ఉపయోగించాలో తెలుసుకోండి.',
    plainExplanation: 'AI models can sound 100% confident while fabricating completely false scientific citations, fake API methods, or non-existent historical events. This phenomenon is called hallucination. As an engineering student, your job is not to trust AI blindly, but to treat it as a junior assistant whose work you must rigorously verify.',
    plainExplanationTe: 'AI మోడల్స్ కొన్నిసార్లు లేని రీసెర్చ్ పేపర్లు, తప్పు కొలతలు లేదా తప్పు కోడ్ లైబ్రరీలను చాలా నమ్మకంగా చెబుతాయి. దీనిని "హాలూసినేషన్" అంటారు. విద్యార్థులు AI ఇచ్చిన సమాచారాన్ని గుడ్డిగా నమ్మకుండా ఎల్లప్పుడూ ధృవీకరించుకోవాలి.',
    steps: [
      {
        title: 'Spotting Hallucinations',
        description: 'Watch out for: fake URLs, papers with real authors but invented titles, invented package versions (e.g. "import react-magic-super").',
        codeOrPrompt: 'Always test code imports locally before committing them.'
      },
      {
        title: 'Protecting Sensitive Data',
        description: 'Never paste: college database passwords, private API tokens, Aadhaar numbers, personal phone numbers, or proprietary company code.',
        codeOrPrompt: 'Keep keys in .env and use placeholder variables like "YOUR_API_KEY".'
      },
      {
        title: 'Academic Honesty & Attribution',
        description: 'When allowed to use AI in assignments, include an acknowledgment: "Assisted by Google Gemini for grammar and layout suggestions; all code and test results verified by author."',
        codeOrPrompt: 'Citation: "Drafting assisted by SkillNova Prompt Lab (Verified with official docs)."'
      }
    ],
    example: 'A model told a student that Python 3.12 has a built-in `json.super_parse()` function. The function did not exist. The student verified with `python -c "import json; help(json)"` and caught the bug immediately.',
    practiceActivity: 'Take a recent answer from an AI chat. Find 2 specific factual claims in it and locate the primary source or official documentation page confirming them.',
    commonMistakes: [
      'Copy-pasting generated papers directly into college portals without proofreading.',
      'Uploading confidential credentials or customer data into public web chatbots.',
      'Assuming that if a model sounds eloquent, it must be factually correct.'
    ],
    quiz: [
      {
        question: 'What is an AI "hallucination"?',
        questionTe: 'AI "హాలూసినేషన్" అంటే ఏమిటి?',
        options: [
          'When an AI model displays colorful graphics',
          'When an AI generates confident-sounding but factually incorrect or fabricated information',
          'When an AI server runs out of GPU memory',
          'When an AI model sleeps during night hours'
        ],
        correctIndex: 1,
        explanation: 'Hallucination refers to plausible-sounding but factually incorrect or invented outputs from an LLM.',
        explanationTe: 'నిజం కాని సమాచారాన్ని చాలా నమ్మకంగా తప్పుగా సృష్టించడాన్ని హాలూసినేషన్ అంటారు.'
      }
    ],
    references: [
      { title: 'Google AI Principles', url: 'https://ai.google/principles' },
      { title: 'ACM Code of Ethics in Computing', url: 'https://www.acm.org/code-of-ethics' }
    ]
  },
  {
    id: 'lesson-coding-with-ai',
    title: 'Pair-Programming with AI: The Red-Green-Refactor Loop',
    titleTe: 'AI తో కోడింగ్: ఎర్రర్స్ లేకుండా వేగంగా డెవలప్ చేసే పద్ధతి',
    level: 'intermediate',
    category: 'Coding & Builders',
    durationMinutes: 18,
    prerequisites: ['Basic HTML, CSS, JavaScript or Python knowledge'],
    summary: 'How to use AI pair programmers like Google Antigravity, Cursor, and Replit effectively without creating unmaintainable spaghetti code.',
    summaryTe: 'AI ని ఒక అసిస్టెంట్‌గా వాడుకుంటూ శుభ్రమైన కోడ్ రాయడం మరియు డీబగ్గింగ్ చేయడం.',
    plainExplanation: 'The biggest mistake beginners make with AI coding is asking for 500 lines of code at once. The code fails to run, and the student has no idea where the bug is. Instead, professional developers prompt in 20-50 line increments: define the interface, implement one function, write a test, verify, then repeat.',
    plainExplanationTe: 'ఒకేసారి 500 లైన్ల కోడ్ అడిగితే అందులో ఎక్కడ బగ్ ఉందో అర్థం కాదు. కాబట్టి చిన్న చిన్న భాగాలుగా (20-30 లైన్లు) కోడ్ రాయించి, వెంటనే టెస్ట్ చేసి సరిచూడాలి.',
    steps: [
      {
        title: 'Step 1: Define Types & Interfaces First',
        description: 'Before asking for UI or backend logic, define the data contract in TypeScript or Python dataclasses.',
        codeOrPrompt: 'interface StudentProfile {\n  id: string;\n  name: string;\n  college: string;\n  completedModules: number;\n}'
      },
      {
        title: 'Step 2: Implement Single Responsibility Functions',
        description: 'Ask the agent to write a single pure function with explicit inputs and outputs.',
        codeOrPrompt: 'Prompt: "Write a pure TypeScript function calculateProgressPercentage(completed: number, total: number): number that handles division by zero defensively."'
      },
      {
        title: 'Step 3: Test Before Committing',
        description: 'Run the function in node or your test runner. Never commit code you have not seen execute successfully.',
        codeOrPrompt: 'npm run test or node -e "console.log(calculateProgress(3, 10))"'
      }
    ],
    example: 'A developer asking for an authentication flow broken into: 1. Input schema, 2. Password validation regex, 3. Token helper, 4. UI form component. Result: Zero mystery bugs.',
    practiceActivity: 'Take a function you recently wrote. Ask an AI to write 3 edge-case unit tests for it (e.g., negative numbers, empty arrays, null inputs).',
    commonMistakes: [
      'Blindly accepting huge git diffs without reading the line additions.',
      'Allowing the AI to rewrite unrelated working functions during a bug fix.',
      'Not checking the terminal build logs after each AI code generation.'
    ],
    quiz: [
      {
        question: 'Why is it better to ask AI for small incremental code changes rather than entire applications in one prompt?',
        questionTe: 'మొత్తం అప్లికేషన్ ఒకేసారి కాకుండా చిన్న చిన్న భాగాలుగా AI ని అడగడం ఎందుకు మంచిది?',
        options: [
          'Because AI charges per letter',
          'Because small increments are easy to test, review in git diffs, and isolate bugs when something fails',
          'Because small code cannot have bugs',
          'Because AI models refuse to write more than 50 lines'
        ],
        correctIndex: 1,
        explanation: 'Incremental changes keep context clean, make git diffs reviewable, and prevent cascading logic errors.',
        explanationTe: 'చిన్న భాగాలుగా చేయడం వల్ల బగ్‌లను సులభంగా పసిగట్టవచ్చు మరియు కోడ్ సరిగ్గా పనిచేస్తుంది.'
      }
    ],
    references: [
      { title: 'Google Antigravity Developer Guide', url: 'https://deepmind.google' },
      { title: 'TypeScript Official Documentation', url: 'https://www.typescriptlang.org' }
    ]
  },
  {
    id: 'lesson-career-portfolio',
    title: 'Building a High-Impact Student Portfolio & GitHub Presence',
    titleTe: 'విద్యార్థి పోర్ట్‌ఫోలియో మరియు గిట్‌హబ్ ప్రొఫైల్ మెరుగుపరచడం',
    level: 'advanced',
    category: 'Career & Growth',
    durationMinutes: 15,
    prerequisites: ['At least 1 working project or hackathon MVP'],
    summary: 'Transform your GitHub from an empty repository list into a recruiter magnet with live demo links, architecture badges, and clean documentation.',
    summaryTe: 'మీ ప్రాజెక్టులను రిక్రూటర్లు మెచ్చే విధంగా లైవ్ లింకులు, స్క్రీన్‌షాట్లు మరియు స్పష్టమైన README తో ఎలా ప్రదర్శించాలో తెలుసుకోండి.',
    plainExplanation: 'Recruiters and engineering hiring managers spend an average of 45 seconds reviewing a student portfolio. If your GitHub repository has no live link, no screenshot, and says "my first react app", they move on. A high-impact repository has a 1-sentence value proposition, a live working HTTPS demo link, an architecture diagram, and simple setup commands.',
    plainExplanationTe: 'హైరింగ్ మేనేజర్లు మీ రెజ్యూమ్‌ను 45 సెకన్లలో చూస్తారు. మీ గిట్‌హబ్‌లో లైవ్ లింక్, ఆర్కిటెక్చర్ డయాగ్రమ్ మరియు స్పష్టమైన README ఉంటే ఉద్యోగ అవకాశాలు చాలా పెరుగుతాయి.',
    steps: [
      {
        title: 'The Golden Header: Value + Live Demo Link',
        description: 'Put your live Vercel/Netlify link at the top of the README and in the GitHub "About" website box.',
        codeOrPrompt: '# SkillNova 🎓\n> Student-first AI Learning & Visual Build Studio\n\n🔗 **Live Demo:** [skillnova.vercel.app](https://skillnova.vercel.app)\n\n![Build Status](https://img.shields.io/badge/status-active-success)'
      },
      {
        title: 'Visual Proof: Diagram or Video GIF',
        description: 'Include an architecture flowchart or 10-second GIF demonstrating the core workflow.',
        codeOrPrompt: 'Embed your Napkin AI or Mermaid architecture diagram in the README.'
      },
      {
        title: '3-Command Quickstart',
        description: 'Ensure any developer can clone and run your app in under 2 minutes.',
        codeOrPrompt: '```bash\ngit clone https://github.com/yourname/skillnova.git\ncd skillnova\nnpm install\nnpm run dev\n```'
      }
    ],
    example: 'Student A sent a zip file. Student B sent a GitHub repo with a live Vercel link, a clean README with a test matrix, and a 60-second video demo. Student B was hired on the spot.',
    practiceActivity: 'Audit your current pinned GitHub repositories. Add a 1-sentence description and a live demo URL to at least one project.',
    commonMistakes: [
      'Leaving the default Vite/CRA README.md unchanged in your project repository.',
      'Having a private repository or a broken live deployment link on your resume.',
      'Committing secrets or node_modules to the public repository.'
    ],
    quiz: [
      {
        question: 'What is the most critical element recruiters look for when opening a student\'s GitHub project repository?',
        questionTe: 'విద్యార్థి గిట్‌హబ్ రిపోజిటరీ చూసినప్పుడు రిక్రూటర్లు మొదట వెతికే ముఖ్యమైన అంశం ఏది?',
        options: [
          'How many commits you made in the last 2 hours',
          'A working live demo link and a clear README explaining what problem the project solves',
          'Complex 10,000-line single files',
          'Fancy animated emojis in every commit'
        ],
        correctIndex: 1,
        explanation: 'A live working demo link proves that the project actually functions in production.',
        explanationTe: 'పనిచేస్తున్న లైవ్ వెబ్‌సైట్ లింక్ మరియు స్పష్టమైన వివరణ ప్రాజెక్ట్ విలువను పెంచుతాయి.'
      }
    ],
    references: [
      { title: 'GitHub Profile README Documentation', url: 'https://docs.github.com' },
      { title: 'Google Careers Student Opportunities', url: 'https://careers.google.com/students/' }
    ]
  }
];
