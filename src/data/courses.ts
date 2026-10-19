export interface CourseModuleLesson {
  id: string;
  lessonNumber: number;
  title: string;
  titleTe?: string;
  durationMinutes: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  plainExplanation: string;
  plainExplanationTe?: string;
  steps: Array<{
    title: string;
    description: string;
    codeOrPrompt?: string;
  }>;
  technicalTerms: Array<{ term: string; definition: string }>;
  example: string;
  practiceActivity: string;
  commonMistakes: string[];
  quiz: Array<{
    question: string;
    questionTe?: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    explanationTe?: string;
  }>;
  references: Array<{ title: string; url: string }>;
}

export interface CourseModule {
  id: string;
  moduleNumber: number;
  title: string;
  titleTe?: string;
  description: string;
  lessons: CourseModuleLesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  titleTe?: string;
  category: CourseCategory;
  level: 'beginner' | 'intermediate' | 'advanced' | 'all';
  durationHours: number;
  description: string;
  descriptionTe?: string;
  instructor: string;
  thumbnailGradient: string;
  prerequisites: string[];
  learningObjectives: string[];
  toolsRequired: string[];
  modules: CourseModule[];
  completionCriteria: string;
  featured?: boolean;
}

export type CourseCategory =
  | 'Artificial Intelligence'
  | 'Programming & Web Dev'
  | 'Data Science'
  | 'Mathematics'
  | 'Science & Technology'
  | 'Business & Entrepreneurship'
  | 'Communication Skills'
  | 'Career Development'
  | 'Digital Skills'
  | 'Design & Creativity';

export const COURSE_CATEGORIES: CourseCategory[] = [
  'Artificial Intelligence',
  'Programming & Web Dev',
  'Data Science',
  'Mathematics',
  'Science & Technology',
  'Business & Entrepreneurship',
  'Communication Skills',
  'Career Development',
  'Digital Skills',
  'Design & Creativity'
];

export const courseCatalog: Course[] = [
  {
    id: 'course-ai-foundations',
    slug: 'generative-ai-foundations-mastery',
    title: 'Generative AI Foundations & LLM Architecture',
    titleTe: 'జెనరేటివ్ AI ఫౌండేషన్స్ & LLM ఆర్కిటెక్చర్',
    category: 'Artificial Intelligence',
    level: 'beginner',
    durationHours: 3.5,
    instructor: 'Dr. Anita Roy, AI Research Fellow',
    thumbnailGradient: 'from-purple-600 via-indigo-600 to-cyan-500',
    description: 'Demystify modern Large Language Models: understand tokens, embeddings, context windows, transformers, and prompt engineering with hands-on practice.',
    descriptionTe: 'లార్జ్ లాంగ్వేజ్ మోడల్స్ (LLM) ఎలా పనిచేస్తాయో అర్థం చేసుకోండి: టోకెన్లు, వెక్టర్ ఎంబెడ్డింగ్స్, కాంటెక్స్ట్ విండో మరియు ప్రాంప్ట్ ఇంజనీరింగ్.',
    prerequisites: ['Basic computer literacy', 'No programming or math prerequisite required'],
    learningObjectives: [
      'Explain how LLMs predict subsequent tokens mathematically',
      'Optimize prompts using the CR-TCO structural framework',
      'Understand context windows, hallucinations, and grounded retrieval (RAG)',
      'Build your first AI-assisted prototype safely'
    ],
    toolsRequired: ['Google Antigravity / Gemini Web', 'Modern Web Browser'],
    completionCriteria: 'Finish 3 module lessons and score >= 80% on each knowledge check quiz.',
    featured: true,
    modules: [
      {
        id: 'mod-ai-1',
        moduleNumber: 1,
        title: 'Core Mechanics: Tokens, Predictions & Embeddings',
        titleTe: 'ప్రాథమిక సూత్రాలు: టోకెన్లు, అంచనాలు మరియు ఎంబెడ్డింగ్స్',
        description: 'How text turns into vectors and how models decide which word comes next.',
        lessons: [
          {
            id: 'lesson-tokens-prediction',
            lessonNumber: 1,
            title: 'How Tokens and Probabilistic Prediction Work',
            titleTe: 'టోకెన్లు మరియు ప్రాబబిలిటీ ఆధారిత అంచనా ఎలా పనిచేస్తుంది',
            durationMinutes: 15,
            level: 'beginner',
            plainExplanation: 'Think of an LLM like a supercharged autocomplete trained on billions of library books. When you ask it a question, it does not think like a human. Instead, it converts your words into numerical tokens and calculates what next token has the highest statistical probability of making sense in that context.',
            plainExplanationTe: 'లార్జ్ లాంగ్వేజ్ మోడల్ (LLM) అనేది మీ ఫోన్‌లోని ఆటో-కంప్లీట్ లాంటిది. ఇది కోట్లాది పుస్తకాలు, ఆర్టికల్స్‌పై శిక్షణ పొందింది. గణితం ప్రకారం తర్వాతి సరైన పదం ఏది రావాలో అంచనా వేస్తుంది.',
            steps: [
              {
                title: 'Tokenization',
                description: 'Words are split into sub-word tokens. 1 token equals roughly 4 characters or 0.75 words.',
                codeOrPrompt: 'Input: "AI for engineering"\nTokens: ["AI", " for", " engineering"] (3 tokens)'
              },
              {
                title: 'Context Window Limits',
                description: 'The context window is like desk space. Exceeding it forces the model to truncate earlier parts of the conversation.',
                codeOrPrompt: 'Gemini 1.5 Pro: Up to 2,000,000 tokens\nGPT-4o: 128,000 tokens'
              }
            ],
            technicalTerms: [
              { term: 'Token', definition: 'The basic semantic unit of text that an LLM ingests and predicts.' },
              { term: 'Context Window', definition: 'The maximum token limit a model can hold in working memory at once.' },
              { term: 'Temperature', definition: 'Hyperparameter controlling randomness (0.0 = deterministic, 1.0 = creative).' }
            ],
            example: 'Given "The capital of Telangana is...", the model picks " Hyderabad" with 99.8% statistical probability.',
            practiceActivity: 'Take a paragraph of 100 words and calculate its approximate token count (100 / 0.75 = ~133 tokens).',
            commonMistakes: [
              'Assuming the AI has human feelings or real intent.',
              'Assuming high confidence implies factual correctness without verification.'
            ],
            quiz: [
              {
                question: 'What is a "token" in Large Language Models?',
                questionTe: 'లార్జ్ లాంగ్వేజ్ మోడల్స్‌లో "టోకెన్" అంటే ఏమిటి?',
                options: [
                  'A physical coin used for cloud billing',
                  'A chunk of characters converted into numbers for the model to process',
                  'A secret password required for login',
                  'A database index table'
                ],
                correctIndex: 1,
                explanation: 'Tokens are the foundational units of text processed by language models.',
                explanationTe: 'టోకెన్ అనేది కంప్యూటర్ అర్థం చేసుకునే సంఖ్యలుగా మార్చే ప్రాథమిక భాగం.'
              }
            ],
            references: [
              { title: 'Google AI Language Model Guide', url: 'https://ai.google.dev' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'course-react-fullstack',
    slug: 'modern-react-fullstack-mastery',
    title: 'Modern Full-Stack Development with React 19 & TypeScript',
    titleTe: 'React 19 & TypeScript తో ఫుల్-స్టాక్ డెవలప్‌మెంట్',
    category: 'Programming & Web Dev',
    level: 'intermediate',
    durationHours: 4.5,
    instructor: 'Kiran Varma, Principal Full-Stack Architect',
    thumbnailGradient: 'from-blue-600 via-indigo-600 to-violet-500',
    description: 'Master component-driven frontend architecture, custom hooks, TypeScript types, serverless APIs, and Vercel cloud deployment.',
    descriptionTe: 'రియాక్ట్ 19 కాంపోనెంట్లు, కస్టమ్ హుక్స్, టైప్‌స్క్రిప్ట్, ఎక్స్‌ప్రెస్ సర్వర్‌లెస్ APIలు మరియు క్లౌడ్ డిప్లాయ్‌మెంట్ నేర్చుకోండి.',
    prerequisites: ['Basic HTML, CSS, and modern JavaScript (ES6)'],
    learningObjectives: [
      'Build responsive, production-ready React 19 web applications',
      'Enforce type safety across components and API responses with TypeScript',
      'Integrate frontend state with backend Express and serverless functions',
      'Automate builds and zero-config deployment to Vercel'
    ],
    toolsRequired: ['Node.js 18+', 'VS Code / Antigravity', 'GitHub Account'],
    completionCriteria: 'Build a working student portal with live API connectivity.',
    featured: true,
    modules: [
      {
        id: 'mod-react-1',
        moduleNumber: 1,
        title: 'Component State, Effects & Immutability',
        titleTe: 'కాంపోనెంట్ స్టేట్, ఎఫెక్ట్స్ మరియు ఇమ్యూటబిలిటీ',
        description: 'Deep dive into useState, useEffect, and immutable state updates.',
        lessons: [
          {
            id: 'lesson-react-hooks',
            lessonNumber: 1,
            title: 'React 19 Hooks: useState, useEffect & useMemo',
            titleTe: 'React 19 హుక్స్: useState, useEffect మరియు useMemo',
            durationMinutes: 20,
            level: 'intermediate',
            plainExplanation: 'In React, the UI is a pure reflection of state. When state changes, React re-executes the component function to generate the new virtual DOM. Understanding immutable updates prevents common bugs like infinite loops or missing re-renders.',
            plainExplanationTe: 'రియాక్ట్‌లో యూజర్ ఇంటర్‌ఫేస్ అనేది స్టేట్ యొక్క ప్రతిబింబం. స్టేట్ మారినప్పుడు స్క్రీన్ ఆటోమేటిక్‌గా అప్‌డేట్ అవుతుంది.',
            steps: [
              {
                title: 'Declare Clean State',
                description: 'Always initialize state with its correct type and avoid undefined values.',
                codeOrPrompt: 'const [items, setItems] = useState<string[]>([]);'
              },
              {
                title: 'Immutable Update Pattern',
                description: 'Never mutate state directly; always use the updater callback with spread operator.',
                codeOrPrompt: 'setItems(prev => [...prev, newItem]);'
              }
            ],
            technicalTerms: [
              { term: 'Virtual DOM', definition: 'In-memory representation of UI elements before syncing to browser DOM.' },
              { term: 'Immutability', definition: 'Creating new object references instead of modifying existing data directly.' }
            ],
            example: 'Updating an item in an array using .map() to return a new shallow copy.',
            practiceActivity: 'Create a simple counter and todo list with add and delete features.',
            commonMistakes: [
              'Mutating arrays directly with .push() instead of creating a new copy.',
              'Omitting dependency arrays in useEffect causing infinite loops.'
            ],
            quiz: [
              {
                question: 'Why should you never mutate React state directly with array.push()?',
                questionTe: 'రియాక్ట్ స్టేట్‌ను డైరెక్ట్‌గా .push() తో ఎందుకు మార్చకూడదు?',
                options: [
                  'Because TypeScript forbids array methods',
                  'Because React relies on reference changes to detect updates and trigger re-renders',
                  'Because push() deletes the array contents',
                  'Because browsers crash on push'
                ],
                correctIndex: 1,
                explanation: 'React compares object references; without a new reference, re-rendering will not trigger.',
                explanationTe: 'రియాక్ట్ కొత్త రిఫరెన్స్‌ను బట్టి మార్పులను గుర్తిస్తుంది.'
              }
            ],
            references: [
              { title: 'Official React Documentation', url: 'https://react.dev' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'course-data-science',
    slug: 'practical-data-science-python',
    title: 'Practical Data Science: Python, Pandas & Visualization',
    titleTe: 'ప్రాక్టికల్ డేటా సైన్స్: పైథాన్, పాండాస్ & విజువలైజేషన్',
    category: 'Data Science',
    level: 'beginner',
    durationHours: 3.0,
    instructor: 'Dr. Ramesh Sundaram, Senior Data Scientist',
    thumbnailGradient: 'from-emerald-600 via-teal-600 to-cyan-500',
    description: 'Transform raw data into meaningful insights. Learn tabular analysis with Pandas, statistical aggregation, and clean charting.',
    descriptionTe: 'డేటాను విశ్లేషించి అవసరమైన ఫలితాలను పొందండి: పైథాన్, పాండాస్ లైబ్రరీ మరియు చార్ట్‌లు.',
    prerequisites: ['Basic Python syntax'],
    learningObjectives: [
      'Load, clean, and filter CSV datasets with Pandas',
      'Calculate statistical measures (mean, median, standard deviation)',
      'Create publication-quality visualizations'
    ],
    toolsRequired: ['Python 3.10+', 'Jupyter Notebook / Google Colab'],
    completionCriteria: 'Submit a clean Exploratory Data Analysis (EDA) notebook.',
    modules: []
  },
  {
    id: 'course-mathematics-ml',
    slug: 'essential-math-for-machine-learning',
    title: 'Essential Mathematics for Machine Learning & Algorithms',
    titleTe: 'మెషిన్ లెర్నింగ్ & అల్గోరిథమ్స్ కోసం గణితం',
    category: 'Mathematics',
    level: 'intermediate',
    durationHours: 3.0,
    instructor: 'Prof. David Chen, Applied Mathematics',
    thumbnailGradient: 'from-amber-600 via-orange-600 to-yellow-500',
    description: 'Understand linear algebra, matrix multiplications, gradient descent, probability distributions, and eigenvalues powering modern AI.',
    descriptionTe: 'లీనియర్ ఆల్జీబ్రా, మ్యాట్రిక్స్ మల్టిప్లికేషన్ మరియు ప్రాబబిలిటీ కాన్సెప్ట్స్.',
    prerequisites: ['High school calculus and basic algebra'],
    learningObjectives: [
      'Understand dot products and matrix operations in vector spaces',
      'Visualize loss functions and gradient descent optimization',
      'Apply Bayes theorem and probability distributions'
    ],
    toolsRequired: ['Pen, Paper, NumPy'],
    completionCriteria: 'Solve the vector optimization practice problem set.',
    modules: []
  },
  {
    id: 'course-science-tech',
    slug: 'cloud-computing-and-distributed-systems',
    title: 'Cloud Computing, Docker & Distributed Systems',
    titleTe: 'క్లౌడ్ కంప్యూటింగ్, డాకర్ & డిస్ట్రిబ్యూటెడ్ సిస్టమ్స్',
    category: 'Science & Technology',
    level: 'intermediate',
    durationHours: 4.0,
    instructor: 'Sanjay Patel, Cloud Solutions Architect',
    thumbnailGradient: 'from-cyan-600 via-blue-600 to-indigo-500',
    description: 'Containerize microservices with Docker, design serverless architectures, configure auto-scaling, and secure cloud storage.',
    descriptionTe: 'డాకర్ కంటైనర్లు, సర్వర్‌లెస్ ఆర్కిటెక్చర్ మరియు క్లౌడ్ సెక్యూరిటీ.',
    prerequisites: ['Basic Linux terminal commands'],
    learningObjectives: [
      'Containerize full-stack apps with Dockerfile and Docker Compose',
      'Deploy serverless microservices on AWS/Vercel',
      'Implement REST and WebSocket APIs'
    ],
    toolsRequired: ['Docker Desktop', 'CLI Terminal'],
    completionCriteria: 'Containerize and deploy a full-stack project.',
    modules: []
  },
  {
    id: 'course-business-entrepreneurship',
    slug: 'tech-startup-from-idea-to-mvp',
    title: 'Tech Entrepreneurship: From College Idea to Launched MVP',
    titleTe: 'టెక్ స్టార్టప్: కాలేజ్ ఐడియా నుండి మార్కెట్ MVP వరకు',
    category: 'Business & Entrepreneurship',
    level: 'beginner',
    durationHours: 2.5,
    instructor: 'Meera Kapoor, Startup Founder & Angel Investor',
    thumbnailGradient: 'from-rose-600 via-pink-600 to-orange-500',
    description: 'How to validate student ideas with real users, define value propositions, calculate unit economics, and pitch to college incubation cells.',
    descriptionTe: 'మీ ఆలోచనను పరిశీలించి, మొదటి ప్రోటోటైప్ రూపొందించి పెట్టుబడిదారులకు ప్రెజెంట్ చేయడం.',
    prerequisites: ['An ambition to build something people want'],
    learningObjectives: [
      'Conduct customer discovery interviews without bias',
      'Define a lean Minimum Viable Product (MVP) in under 2 weeks',
      'Design a convincing 10-slide pitch deck'
    ],
    toolsRequired: ['Google Slides / Gamma', 'Notion'],
    completionCriteria: 'Draft an executive 1-page business brief.',
    modules: []
  },
  {
    id: 'course-communication-skills',
    slug: 'executive-communication-for-engineers',
    title: 'Technical Presentation & Executive Communication',
    titleTe: 'టెక్నికల్ ప్రెజెంటేషన్ & ప్రొఫెషనల్ కమ్యూనికేషన్',
    category: 'Communication Skills',
    level: 'all',
    durationHours: 2.0,
    instructor: 'Sarah Jenkins, Leadership Coach',
    thumbnailGradient: 'from-teal-600 via-emerald-600 to-green-500',
    description: 'Master the 8-slide academic seminar format, articulate technical trade-offs to non-technical stakeholders, and deliver compelling demos.',
    descriptionTe: 'సెమినార్లు, ప్రాజెక్ట్ వైవా మరియు ఇంటర్వ్యూలలో స్పష్టంగా మాట్లాడే నైపుణ్యాలు.',
    prerequisites: ['None'],
    learningObjectives: [
      'Structure technical decks with the 12-word bullet rule',
      'Speak confidently during college project viva and client reviews',
      'Handle difficult technical Q&A gracefully'
    ],
    toolsRequired: ['Slide presentation software'],
    completionCriteria: 'Record a 3-minute technical pitch.',
    modules: []
  },
  {
    id: 'course-career-development',
    slug: 'engineering-placements-and-ats-resume',
    title: 'High-Impact Resume, ATS Optimization & Placement Strategy',
    titleTe: 'హై-ఇంపాక్ట్ రెజ్యూమ్, ATS ఆప్టిమైజేషన్ & ప్లేస్‌మెంట్స్ గైడ్',
    category: 'Career Development',
    level: 'all',
    durationHours: 2.5,
    instructor: 'SkillNova Career Placement Cell',
    thumbnailGradient: 'from-indigo-600 via-purple-600 to-pink-500',
    description: 'Transform passive resumes into active Google XYZ achievement statements, beat ATS filters, and excel in technical behavioral interviews.',
    descriptionTe: 'గూగుల్ XYZ ఫార్ములాతో రెజ్యూమ్ తయారు చేయడం మరియు ఇంటర్వ్యూలు సాధించడం.',
    prerequisites: ['A draft of your college resume'],
    learningObjectives: [
      'Rewrite bullet points with Google XYZ formula (Accomplished X by doing Y measured by Z)',
      'Pass ATS keyword scanners with clean single-column formatting',
      'Showcase live project URLs and GitHub repositories'
    ],
    toolsRequired: ['PDF Reader', 'Text Editor'],
    completionCriteria: 'Analyze resume using SkillNova ATS Analyzer and score >= 85/100.',
    modules: []
  },
  {
    id: 'course-digital-skills',
    slug: 'git-github-collaboration-mastery',
    title: 'Git, GitHub & Open Source Collaboration for Students',
    titleTe: 'గిట్, గిట్‌హబ్ & ఓపెన్ సోర్స్ కాంట్రిబ్యూషన్స్',
    category: 'Digital Skills',
    level: 'beginner',
    durationHours: 2.5,
    instructor: 'Arjun Das, Open Source Maintainer',
    thumbnailGradient: 'from-slate-700 via-slate-800 to-slate-900',
    description: 'Branching strategies, atomic commits, pull requests, merge conflict resolution, GitHub Actions CI/CD, and landing your first open source pull request.',
    descriptionTe: 'గిట్ బ్రాంచింగ్, మెర్జ్ కాన్ఫ్లిక్ట్ పరిష్కారం మరియు ఓపెన్ సోర్స్ కాంట్రిబ్యూషన్స్.',
    prerequisites: ['Command line basics'],
    learningObjectives: [
      'Initialize repositories, make atomic commits, and push to GitHub',
      'Resolve merge conflicts systematically using VS Code diff tools',
      'Submit professional pull requests with issue linking'
    ],
    toolsRequired: ['Git CLI', 'GitHub Account'],
    completionCriteria: 'Open a verified Pull Request on a practice repo.',
    modules: []
  },
  {
    id: 'course-design-creativity',
    slug: 'ui-ux-design-systems-with-figma',
    title: 'UI/UX Design Systems, Figma & Tailwind Scaffolding',
    titleTe: 'UI/UX డిజైన్ సిస్టమ్స్, ఫిగ్మా & టైల్‌విండ్ డిజైన్',
    category: 'Design & Creativity',
    level: 'beginner',
    durationHours: 3.0,
    instructor: 'Elena Rostova, Product Designer',
    thumbnailGradient: 'from-fuchsia-600 via-pink-600 to-rose-500',
    description: 'Design beautiful, accessible student apps. Master color theory, typographic hierarchy, responsive autolayout, and translating Figma frames to Tailwind CSS.',
    descriptionTe: 'కలర్ థియరీ, టైపోగ్రఫీ మరియు ఫిగ్మా డిజైన్లను టైల్‌విండ్ CSS గా మార్చడం.',
    prerequisites: ['None'],
    learningObjectives: [
      'Create scalable design tokens (colors, typography, spacing)',
      'Use Figma Auto Layout to build responsive components',
      'Ensure WCAG AA contrast compliance'
    ],
    toolsRequired: ['Figma (Free Account)', 'Modern Browser'],
    completionCriteria: 'Design a 3-screen mobile-responsive app mockup.',
    modules: []
  }
];
