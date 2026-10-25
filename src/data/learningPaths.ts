export interface LearningPathMilestone {
  id: string;
  order: number;
  title: string;
  description: string;
  type: 'concept' | 'practice_exercise' | 'tool_stage' | 'portfolio_project';
  targetSlug: string;
  estimatedHours: number;
  completed?: boolean;
}

export interface LearningPathway {
  id: string;
  slug: string;
  title: string;
  targetRole: string;
  level: 'Absolute Beginner' | 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  estimatedWeeks: number;
  badge: string;
  iconName: string;
  primaryLanguage: string;
  prerequisites: string[];
  skillsGained: string[];
  milestones: LearningPathMilestone[];
}

export const learningPathways: LearningPathway[] = [
  // 1. PYTHON FROM ZERO
  {
    id: 'path-python-zero',
    slug: 'python-from-zero',
    title: 'Python From Zero to Software Engineer',
    targetRole: 'Python Software Developer / Data Engineer',
    level: 'Absolute Beginner',
    summary: 'A complete step-by-step pathway for someone who has never written a line of code: from variables and loops to functions, modules, and API scripting.',
    estimatedWeeks: 6,
    badge: 'Most Popular for Beginners',
    iconName: 'Terminal',
    primaryLanguage: 'Python',
    prerequisites: ['No prior programming experience required'],
    skillsGained: [
      'Python 3 syntax, f-strings, and data structures',
      'Two-pointer algorithms and list comprehensions',
      'Debugging runtime and off-by-one errors',
      'Writing scripts that call REST APIs and parse JSON'
    ],
    milestones: [
      {
        id: 'm-py-1',
        order: 1,
        title: 'Computer Foundations & Your First Python Script',
        description: 'Understand how CPUs execute instructions and write a clean formatted greeting script.',
        type: 'practice_exercise',
        targetSlug: 'python-print-formatted-string',
        estimatedHours: 2
      },
      {
        id: 'm-py-2',
        order: 2,
        title: 'Control Flow, Modulo Arithmetic & Comprehensions',
        description: 'Filter and square lists using idiomatic Python list comprehensions.',
        type: 'practice_exercise',
        targetSlug: 'python-list-comprehension-filter',
        estimatedHours: 3
      },
      {
        id: 'm-py-3',
        order: 3,
        title: 'Two-Pointer Technique & Sorted Arrays',
        description: 'Solve the classic Two Sum algorithm in O(n) time and O(1) space.',
        type: 'practice_exercise',
        targetSlug: 'two-sum-sorted-array',
        estimatedHours: 4
      },
      {
        id: 'm-py-4',
        order: 4,
        title: 'Mastering VS Code for Python Development',
        description: 'Set up Python linting, formatting (Ruff/Black), and debugger breakpoints.',
        type: 'tool_stage',
        targetSlug: 'vs-code-mastery',
        estimatedHours: 3
      },
      {
        id: 'm-py-5',
        order: 5,
        title: 'Portfolio Milestone: Personal Portfolio & CLI Tool',
        description: 'Package your Python scripts into a clean GitHub repository with tests.',
        type: 'portfolio_project',
        targetSlug: 'portfolio-developer-showcase',
        estimatedHours: 6
      }
    ]
  },

  // 2. FULL-STACK WEB DEVELOPER
  {
    id: 'path-fullstack-dev',
    slug: 'fullstack-web-developer',
    title: 'Modern Full-Stack Web Engineering',
    targetRole: 'Full-Stack Developer (React + Node.js + SQL)',
    level: 'Beginner',
    summary: 'Master the end-to-end web stack: responsive React 19 frontends, secure Express REST APIs, PostgreSQL database migrations, and Vercel cloud deployment.',
    estimatedWeeks: 10,
    badge: 'Industry Standard',
    iconName: 'Layout',
    primaryLanguage: 'TypeScript',
    prerequisites: ['Basic HTML/CSS understanding'],
    skillsGained: [
      'React 19 state architecture and custom hooks',
      'Express REST API routing with JWT authentication',
      'Relational PostgreSQL schemas, joins, and aggregates',
      'Defensive input sanitization and XSS prevention'
    ],
    milestones: [
      {
        id: 'm-fs-1',
        order: 1,
        title: 'JavaScript Event Loop & Microtask Priority',
        description: 'Predict execution timing of synchronous code, Promises, and timers.',
        type: 'practice_exercise',
        targetSlug: 'js-event-loop-microtask-prediction',
        estimatedHours: 3
      },
      {
        id: 'm-fs-2',
        order: 2,
        title: 'SQL Relational Queries & Aggregations',
        description: 'Aggregate student enrollments with GROUP BY and HAVING clauses.',
        type: 'practice_exercise',
        targetSlug: 'sql-top-spending-students',
        estimatedHours: 4
      },
      {
        id: 'm-fs-3',
        order: 3,
        title: 'Git Version Control & Branch Collaboration',
        description: 'Master commits, feature branches, and pull request reviews.',
        type: 'tool_stage',
        targetSlug: 'git-github-workflows',
        estimatedHours: 4
      },
      {
        id: 'm-fs-4',
        order: 4,
        title: 'Defensive Security: XSS & Input Sanitization',
        description: 'Sanitize untrusted user-submitted text by escaping HTML entities.',
        type: 'practice_exercise',
        targetSlug: 'defensive-sanitize-user-input',
        estimatedHours: 3
      },
      {
        id: 'm-fs-5',
        order: 5,
        title: 'Portfolio Milestone: Full-Stack Task & Study Goal Tracker',
        description: 'Build and deploy a complete full-stack web application with Supabase PostgreSQL.',
        type: 'portfolio_project',
        targetSlug: 'fullstack-task-learning-manager',
        estimatedHours: 14
      }
    ]
  },

  // 3. AI APPLICATION DEVELOPER
  {
    id: 'path-ai-dev',
    slug: 'ai-application-developer',
    title: 'AI Systems & Cloud Model Engineering',
    targetRole: 'AI Application Engineer / LLM Systems Developer',
    level: 'Intermediate',
    summary: 'Build production-grade AI applications with Meta Model API (Muse Spark), local open-weight models (Ollama), structured JSON schemas, and exponential backoff retry.',
    estimatedWeeks: 8,
    badge: 'High Demand',
    iconName: 'Bot',
    primaryLanguage: 'TypeScript / Python',
    prerequisites: ['Basic JavaScript or Python', 'REST API fundamentals'],
    skillsGained: [
      'Meta Model API integration (muse-spark-1.3) & OpenAI compatibility',
      'Local model hosting with Ollama for zero-cost private inference',
      'Resilient exponential backoff retry logic for AI rate limits',
      'End-to-end request lifecycle and token cost management'
    ],
    milestones: [
      {
        id: 'm-ai-1',
        order: 1,
        title: 'Understand How AI Models Actually Work',
        description: 'Learn neural network weights, training vs inference, and tokenization.',
        type: 'concept',
        targetSlug: 'what-is-an-ai-model-weights-inference',
        estimatedHours: 2
      },
      {
        id: 'm-ai-2',
        order: 2,
        title: 'Resilient Asynchronous Programming with Exponential Backoff',
        description: 'Build an async fetch wrapper that retries failing requests with exponential delays.',
        type: 'practice_exercise',
        targetSlug: 'async-retry-with-backoff',
        estimatedHours: 4
      },
      {
        id: 'm-ai-3',
        order: 3,
        title: 'Developer Tools: Meta Model API, Muse Spark & Ollama',
        description: 'Connect to Meta Model API and run local open-weight coding models with Ollama.',
        type: 'tool_stage',
        targetSlug: 'meta-model-api-ai-tools',
        estimatedHours: 5
      },
      {
        id: 'm-ai-4',
        order: 4,
        title: 'Safe Code Execution & Sandbox Protections',
        description: 'Understand how isolated execution sandboxes run student code safely.',
        type: 'concept',
        targetSlug: 'sandboxed-code-execution-architecture',
        estimatedHours: 3
      },
      {
        id: 'm-ai-5',
        order: 5,
        title: 'Portfolio Milestone: Nova AI Multi-Provider Assistant',
        description: 'Build an enterprise-grade AI coding assistant supporting Meta, Ollama, and Gemini.',
        type: 'portfolio_project',
        targetSlug: 'multi-model-ai-coding-assistant',
        estimatedHours: 16
      }
    ]
  }
];

export const careerPaths = learningPathways;
export type CareerPathway = LearningPathway;
