export type ProjectTier = 'Beginner' | 'Intermediate' | 'Advanced';

export interface ProjectMilestone {
  stepNumber: number;
  title: string;
  duration: string;
  objective: string;
  deliverable: string;
  codeSnippet?: string;
  testingTip: string;
}

export interface RealWorldProject {
  id: string;
  slug: string;
  title: string;
  tier: ProjectTier;
  category: string;
  summary: string;
  problemSolved: string;
  targetBeneficiaries: string;
  expectedDeliverables: string[];
  prerequisites: string[];
  techStack: string[];
  folderStructure: string;
  architectureOverview: string;
  milestones: ProjectMilestone[];
  securityChecklist: string[];
  testingStrategy: string;
  debuggingTips: string[];
  deploymentPath: string;
  portfolioPresentationTips: string[];
  estimatedTotalHours: number;
}

export const realWorldProjectsCatalog: RealWorldProject[] = [
  // 1. BEGINNER: PERSONAL PORTFOLIO
  {
    id: 'proj-beg-01',
    slug: 'portfolio-developer-showcase',
    title: 'Modern Developer Portfolio & Blog',
    tier: 'Beginner',
    category: 'Frontend & Personal Brand',
    summary: 'A fast, responsive, dark-mode developer portfolio with interactive project showcases, resume preview, and contact form.',
    problemSolved: 'Junior developers often struggle to stand out because they lack a clean, live destination showing their real projects and code.',
    targetBeneficiaries: 'Hiring managers, recruiters, open-source maintainers, and developer peers.',
    expectedDeliverables: [
      'Responsive landing hero with high-contrast typography and theme toggle',
      'Filterable project cards with live demo links and GitHub repository links',
      'Interactive skills badge cloud showing proficiency levels',
      'Accessible contact form with client-side validation'
    ],
    prerequisites: ['HTML5 semantic elements', 'CSS Flexbox & Grid', 'Basic JavaScript / React'],
    techStack: ['React 19 / HTML5', 'Tailwind CSS', 'Lucide Icons', 'Vercel / GitHub Pages'],
    folderStructure: `my-portfolio/
├── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── SkillsGrid.tsx
│   │   └── ContactModal.tsx
│   ├── data/
│   │   └── projects.ts
│   ├── App.tsx
│   └── main.tsx
└── package.json`,
    architectureOverview: 'Single-page client application with localized component hierarchy and persistent theme storage in localStorage.',
    milestones: [
      {
        stepNumber: 1,
        title: 'Project Scaffold & Semantic Wireframe',
        duration: '2 Hours',
        objective: 'Create clean semantic structure with `<header>`, `<main>`, `<section>`, and `<footer>`.',
        deliverable: 'Running Vite development server with semantic HTML layout.',
        testingTip: 'Check accessibility with browser screen reader or Lighthouse audit.'
      },
      {
        stepNumber: 2,
        title: 'Responsive Project Card Grid',
        duration: '3 Hours',
        objective: 'Build responsive grid using CSS Grid / Tailwind `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`.',
        deliverable: 'Component dynamically mapping over an array of project objects with tags and action buttons.',
        testingTip: 'Verify layout at 375px (mobile), 768px (tablet), and 1440px (desktop).'
      },
      {
        stepNumber: 3,
        title: 'Dark / Light Theme Engine',
        duration: '2 Hours',
        objective: 'Implement theme toggle with localStorage persistence and system color preference detection.',
        deliverable: 'Persistent theme switcher modifying `document.documentElement.classList`.',
        testingTip: 'Verify that reloading the page preserves the selected theme without flash of unstyled theme.'
      },
      {
        stepNumber: 4,
        title: 'Form Validation & Cloud Deployment',
        duration: '2 Hours',
        objective: 'Validate email inputs and deploy live to Vercel or GitHub Pages.',
        deliverable: 'Live HTTPS URL with custom OpenGraph social sharing preview tags.',
        testingTip: 'Test OpenGraph preview using https://www.opengraph.xyz/.'
      }
    ],
    securityChecklist: [
      'Sanitize all user inputs before rendering to prevent XSS',
      'Add `rel="noopener noreferrer"` to all outbound external links',
      'Never put email API credentials or private tokens in frontend repository'
    ],
    testingStrategy: 'Run automated Lighthouse audits and cross-browser responsiveness checks in Chrome, Firefox, and Safari.',
    debuggingTips: [
      'If mobile menu causes horizontal scroll, check for elements with `width: 100vw` or missing `overflow-hidden`.',
      'Verify image aspect ratios with `aspect-video` to prevent Cumulative Layout Shift (CLS).'
    ],
    deploymentPath: 'Push to GitHub `main` branch -> Connect to Vercel for zero-config global CDN hosting.',
    portfolioPresentationTips: [
      'Record a 30-second Loom or GIF walkthrough demonstrating responsiveness and dark mode.',
      'Highlight specific technical decisions in the README (e.g. why Tailwind was chosen over raw CSS).'
    ],
    estimatedTotalHours: 9
  },

  // 2. INTERMEDIATE: FULL-STACK TASK & LEARNING MANAGER
  {
    id: 'proj-int-01',
    slug: 'fullstack-task-learning-manager',
    title: 'Full-Stack Task & Study Goal Tracker',
    tier: 'Intermediate',
    category: 'Full-Stack Web App',
    summary: 'A complete full-stack web application featuring user authentication, CRUD operations, PostgreSQL database persistence, and streak analytics.',
    problemSolved: 'Students need an integrated system to track daily coding study goals, record completed lessons, and measure consistency.',
    targetBeneficiaries: 'Self-taught developers, bootcamp students, and university CS learners.',
    expectedDeliverables: [
      'JWT/Session-based authentication with bcrypt password hashing',
      'REST API with full CRUD endpoints (`/api/tasks`, `/api/goals`)',
      'Relational database schema with foreign keys and cascade rules',
      'Real-time streak calculation and weekly completion chart'
    ],
    prerequisites: ['JavaScript/TypeScript', 'Node.js & Express', 'SQL & Relational Schemas', 'React Hooks'],
    techStack: ['Node.js & Express', 'React 19 & Tailwind', 'PostgreSQL / Supabase', 'TypeScript'],
    folderStructure: `fullstack-tracker/
├── server/
│   ├── index.ts
│   ├── routes.ts
│   ├── db.ts
│   └── middleware/
│       └── auth.ts
├── src/
│   ├── context/
│   ├── components/
│   └── services/
├── supabase/
│   └── migrations/
└── package.json`,
    architectureOverview: 'Client-server REST architecture with stateless bearer token authentication and isolated database transactions.',
    milestones: [
      {
        stepNumber: 1,
        title: 'Database Schema & Migration Scaffolding',
        duration: '3 Hours',
        objective: 'Define `users`, `tasks`, and `study_sessions` tables with indexes and foreign keys.',
        deliverable: 'Executable SQL migration file with Row-Level Security (RLS) policies.',
        testingTip: 'Test relational integrity by attempting to insert a task with a non-existent user_id.'
      },
      {
        stepNumber: 2,
        title: 'Authentication Middleware & REST Routing',
        duration: '4 Hours',
        objective: 'Implement signup, login, password hashing, and token verification middleware.',
        deliverable: 'Secured Express endpoints rejecting unauthorized requests with 401 status.',
        testingTip: 'Test protected endpoints in Postman without an Authorization header.'
      },
      {
        stepNumber: 3,
        title: 'Interactive Frontend UI & State Sync',
        duration: '4 Hours',
        objective: 'Build task board with status filters, inline edit, and optimistic UI updates.',
        deliverable: 'Responsive dashboard reflecting database state with instant local state updates.',
        testingTip: 'Simulate slow network in DevTools to ensure loading spinners render smoothly.'
      },
      {
        stepNumber: 4,
        title: 'Streak Analytics & Production Deploy',
        duration: '3 Hours',
        objective: 'Calculate consecutive daily streaks and deploy frontend to Vercel and backend to Railway/Vercel.',
        deliverable: 'Production full-stack deployment with zero CORS errors.',
        testingTip: 'Verify timezone edge cases when users complete tasks near midnight.'
      }
    ],
    securityChecklist: [
      'Hash passwords with bcrypt/argon2 or strong cryptographic salt before storage',
      'Validate request bodies on server using schemas (never trust client input)',
      'Enforce Row-Level Security so User A cannot read or edit User B tasks'
    ],
    testingStrategy: 'Unit tests for streak calculation algorithms and integration tests for auth routes.',
    debuggingTips: [
      'If CORS fails, ensure `cors()` middleware in Express precedes all route declarations.',
      'Check database logs for connection pool exhaustion when testing concurrent requests.'
    ],
    deploymentPath: 'Host frontend on Vercel; host database on Supabase PostgreSQL; host API on Vercel Serverless or Node container.',
    portfolioPresentationTips: [
      'Include an architecture diagram showing the request lifecycle from browser to PostgreSQL.',
      'Mention how optimistic UI updates improve perceived performance.'
    ],
    estimatedTotalHours: 14
  },

  // 3. ADVANCED: MULTI-MODEL AI CODING ASSISTANT
  {
    id: 'proj-adv-01',
    slug: 'multi-model-ai-coding-assistant',
    title: 'Nova AI: Multi-Provider Coding Assistant',
    tier: 'Advanced',
    category: 'AI Systems & Cloud Architecture',
    summary: 'A resilient, enterprise-grade AI coding assistant supporting Meta Model API (Muse Spark), local open-weight models with Ollama, and streaming execution.',
    problemSolved: 'Developers often face vendor lock-in or service outages when relying on a single AI provider, and need automatic failover to local open-weight models.',
    targetBeneficiaries: 'Professional engineering teams, privacy-conscious developers, and hackathon competitors.',
    expectedDeliverables: [
      'Centralized Provider Registry with capability tags and health diagnostics',
      'Meta Model API integration (`https://api.meta.ai/v1`, `muse-spark-1.3`)',
      'Local Ollama integration for offline, private model inference',
      'Markdown code block rendering with syntax highlighting and copy actions',
      'Automated rate-limit retry with exponential backoff and deterministic fallback'
    ],
    prerequisites: ['TypeScript', 'REST / Streaming APIs', 'LLM Prompt Engineering', 'Full-Stack Architecture'],
    techStack: ['React 19 & Tailwind', 'Node.js Express / Serverless', 'Meta Model API', 'Ollama (Open-Weight)', 'Gemini API'],
    folderStructure: `nova-ai-assistant/
├── server/
│   ├── aiService.ts       # Multi-model router
│   ├── modelRegistry.ts   # Provider metadata & adapters
│   └── routes.ts
├── src/
│   ├── components/
│   │   ├── AiMentorView.tsx
│   │   └── ModelSettingsModal.tsx
│   └── services/
└── .env.example`,
    architectureOverview: 'Provider Adapter design pattern decoupling user prompt requests from vendor-specific HTTP schemas, enabling hot-swapping between Meta, Ollama, and Gemini.',
    milestones: [
      {
        stepNumber: 1,
        title: 'Provider Abstraction Layer & Registry',
        duration: '4 Hours',
        objective: 'Build provider interface with methods: `chat(messages, options)` and `testConnection()`.',
        deliverable: 'Extensible registry supporting Meta Model API, Ollama, and Cloud fallbacks.',
        testingTip: 'Mock API failures to verify fallback mechanisms engage seamlessly.'
      },
      {
        stepNumber: 2,
        title: 'Meta Model API Integration (Muse Spark)',
        duration: '4 Hours',
        objective: 'Connect to `https://api.meta.ai/v1` with `MODEL_API_KEY` and test code generation.',
        deliverable: 'Server-side route passing structured coding prompts to Muse Spark.',
        testingTip: 'Check token limits and temperature settings for deterministic code output.'
      },
      {
        stepNumber: 3,
        title: 'Local Ollama Fallback Engine',
        duration: '3 Hours',
        objective: 'Connect to local Ollama instance on `http://localhost:11434` for zero-cost offline coding.',
        deliverable: 'Seamless local inference fallback when cloud API credentials are unconfigured.',
        testingTip: 'Test with network disabled to verify offline privacy mode works.'
      },
      {
        stepNumber: 4,
        title: 'Polished Coding Mentor Interface',
        duration: '5 Hours',
        objective: 'Build 15-mode task switcher, syntax-highlighted code viewer, and one-click copy.',
        deliverable: 'Fully responsive AI mentor chat with error handling and retry controls.',
        testingTip: 'Verify that mathematical expressions and indented code blocks render cleanly without breaking layout.'
      }
    ],
    securityChecklist: [
      'Keep all provider secrets strictly server-side (never expose `MODEL_API_KEY` in frontend bundles)',
      'Sanitize model output before rendering to prevent malicious HTML script injection',
      'Enforce request size limits (max 8KB user query) to prevent denial-of-service'
    ],
    testingStrategy: 'Integration tests verifying provider failover sequence, response schema validation, and rate-limit handling.',
    debuggingTips: [
      'If Meta Model API returns 401, check `MODEL_API_KEY` in server `.env`.',
      'If Ollama fails to connect, verify Ollama daemon is running with `ollama list`.'
    ],
    deploymentPath: 'Deploy backend to Vercel Serverless or Docker container; configure cloud API keys in hosting environment variables.',
    portfolioPresentationTips: [
      'Demonstrate the seamless hot-swap between Meta Cloud and Local Ollama in your project video.',
      'Explain your Provider Adapter design pattern as an example of clean software architecture.'
    ],
    estimatedTotalHours: 16
  }
];

export const portfolioProjects = realWorldProjectsCatalog;
export type ProjectBlueprint = RealWorldProject;

