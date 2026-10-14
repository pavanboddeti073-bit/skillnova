import type { Tool } from '../types/index.ts';

export const verifiedTools: Tool[] = [
  {
    id: 'google-antigravity',
    name: 'Google Antigravity',
    category: 'coding',
    summary: 'Google\'s advanced agentic pair-programming environment with terminal, browser tools, and multi-file code editing.',
    summaryTe: 'టెర్మినల్, బ్రౌజర్ టూల్స్ మరియు మల్టీ-ఫైల్ ఎడిటింగ్ సదుపాయం ఉన్న గూగుల్ అడ్వాన్స్‌డ్ AI కోడింగ్ ఎన్విరాన్‌మెంట్.',
    useCases: ['Autonomous full-stack development', 'Refactoring codebases', 'Running & debugging test suites', 'Interactive visual pair-programming'],
    skillLevel: 'all',
    officialUrl: 'https://deepmind.google',
    docsUrl: 'https://deepmind.google/technologies/gemini',
    pricingLabel: 'Free Tier',
    pricingDetails: 'Integrated within Google developer toolchains. Quotas and access subject to Google developer program tier.',
    openSourceStatus: false,
    licenseNotes: 'Proprietary Google platform with open workspace access.',
    supportedOutputs: ['Full-stack codebases', 'Terminal scripts', 'Interactive artifacts', 'Test reports'],
    beginnerSteps: [
      'Open the workspace and verify terminal and editor panes are active.',
      'Provide a single clear requirement in the prompt box rather than 10 mixed requests.',
      'Review agent-suggested diffs carefully before accepting changes.',
      'Check the preview or run tests directly in the integrated console.'
    ],
    samplePrompt: 'Create a clean student dashboard component in React with TypeScript that displays lesson progress and a search input for tools.',
    commonErrors: [
      'Prompting 15 unrelated features at once causing context overflow.',
      'Not reviewing diffs before running build scripts.',
      'Accidentally committing credentials to public git history.'
    ],
    alternatives: ['Cursor', 'Bolt.new', 'Replit'],
    lastVerifiedAt: '2026-10-14',
    verificationStatus: 'verified',
    badge: 'Featured'
  },
  {
    id: 'replit',
    name: 'Replit',
    category: 'coding',
    summary: 'Cloud-based IDE and deployment environment with Replit Agent for building and hosting applications directly in the browser.',
    summaryTe: 'బ్రౌజర్‌లోనే అప్లికేషన్‌లను రూపొందించడానికి మరియు హోస్ట్ చేయడానికి క్లౌడ్ ఆధారిత IDE మరియు Replit ఏజెంట్.',
    useCases: ['Zero-setup student web apps', 'Python & Node.js backend learning', 'Instant cloud hosting', 'Collaborative coding'],
    skillLevel: 'beginner',
    officialUrl: 'https://replit.com',
    docsUrl: 'https://docs.replit.com',
    pricingLabel: 'Free Tier',
    pricingDetails: 'Free Starter tier available with basic workspace specs; Replit Core / Agent usage requires subscription or credits.',
    openSourceStatus: false,
    licenseNotes: 'Proprietary cloud platform. User code is owned by the user.',
    supportedOutputs: ['Live web apps', 'Node/Python APIs', 'Database-backed projects'],
    beginnerSteps: [
      'Sign up at Replit and click "+ Create Repl".',
      'Select a template (e.g. Node.js or HTML/CSS/JS) or use Replit Agent.',
      'Use the Secrets (Lock icon) tool in Tools sidebar to safely store API keys.',
      'Click the green "Run" button and preview the webview.'
    ],
    samplePrompt: 'Build a lightweight student study tracker with localStorage persistence, dark mode toggle, and clean cards.',
    commonErrors: [
      'Hardcoding API keys in index.js instead of using the Replit Secrets tool.',
      'Letting the repl sleep on free tier when persistent background servers are needed.'
    ],
    alternatives: ['Google Antigravity', 'Bolt.new', 'GitHub Codespaces'],
    lastVerifiedAt: '2026-10-14',
    verificationStatus: 'verified'
  },
  {
    id: 'lovable',
    name: 'Lovable',
    category: 'coding',
    summary: 'AI-first full-stack web application builder that scaffolds and refines React + Tailwind apps from natural language prompts.',
    summaryTe: 'సహజమైన భాష ప్రాంప్ట్‌ల నుండి రియాక్ట్ మరియు టెయిల్‌విండ్ యాప్‌లను సులభంగా నిర్మించే AI వెబ్ బిల్డర్.',
    useCases: ['Rapid frontend prototyping', 'SaaS MVPs', 'Interactive UI design', 'Syncing clean code to GitHub'],
    skillLevel: 'beginner',
    officialUrl: 'https://lovable.dev',
    docsUrl: 'https://docs.lovable.dev',
    pricingLabel: 'Free Trial',
    pricingDetails: 'Free message credits upon sign-up; paid plans for higher edit quotas and custom domain hosting.',
    openSourceStatus: false,
    licenseNotes: 'Proprietary platform; generated code exports to standard Vite/React repository under user ownership.',
    supportedOutputs: ['React TypeScript web applications', 'Tailwind CSS designs', 'GitHub repositories'],
    beginnerSteps: [
      'Describe your app concept in one concise paragraph on Lovable.',
      'Iterate one screen or component at a time rather than asking for 10 screens at once.',
      'Connect GitHub repository integration to back up code regularly.',
      'Export and deploy to Vercel or Netlify.'
    ],
    samplePrompt: 'Create a student hackathon team finder UI with filter tags for skills (React, AI, Design) and a card grid.',
    commonErrors: [
      'Over-prompting huge multi-page changes in a single prompt.',
      'Not syncing with GitHub before making major structural redesigns.'
    ],
    alternatives: ['v0', 'Bolt.new', 'Google Antigravity'],
    lastVerifiedAt: '2026-10-14',
    verificationStatus: 'verified'
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'productivity',
    summary: 'The world\'s leading version control and code collaboration platform, offering free student benefits and automated CI/CD.',
    summaryTe: 'కోడ్ సంస్కరణ నియంత్రణ (Version Control), ఉచిత విద్యార్థి ప్రయోజనాలు మరియు సహకారం కోసం ప్రపంచ ప్రఖ్యాత ప్లాట్‌ఫారమ్.',
    useCases: ['Code versioning and backups', 'Open source collaboration', 'GitHub Pages free static hosting', 'Student Developer Pack perks'],
    skillLevel: 'all',
    officialUrl: 'https://github.com',
    docsUrl: 'https://docs.github.com',
    pricingLabel: 'Free Tier',
    pricingDetails: 'Free unlimited public and private repositories; generous free GitHub Actions minutes. Free Student Pack with university email.',
    openSourceStatus: false,
    licenseNotes: 'Proprietary platform hosting open-source and private repositories.',
    supportedOutputs: ['Git repositories', 'Static websites (GitHub Pages)', 'Release packages'],
    beginnerSteps: [
      'Create a GitHub account and configure git credentials locally.',
      'Initialize a repository with a clean README.md and appropriate .gitignore.',
      'Commit working changes in small, meaningful commits.',
      'Push your branch and open Pull Requests for peer reviews.'
    ],
    samplePrompt: 'Generate a professional README.md with project badges, setup commands, architecture diagram, and license details.',
    commonErrors: [
      'Committing `.env` files containing real API tokens or secrets.',
      'Making one huge single commit named "finished project" at the end of a hackathon.'
    ],
    alternatives: ['GitLab', 'Bitbucket'],
    lastVerifiedAt: '2026-10-14',
    verificationStatus: 'verified'
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'productivity',
    summary: 'Frontend cloud platform providing seamless automatic git deployments, serverless functions, and global CDN delivery.',
    summaryTe: 'గిట్‌హబ్ నుండి నేరుగా ఆటోమేటిక్ డిప్లాయ్‌మెంట్స్ మరియు ఉచిత హోస్టింగ్ అందించే ప్రముఖ క్లౌడ్ ప్లాట్‌ఫారమ్.',
    useCases: ['Next.js and Vite React deployments', 'Instant preview URLs per pull request', 'Serverless API endpoints', 'Custom domain mapping'],
    skillLevel: 'beginner',
    officialUrl: 'https://vercel.com',
    docsUrl: 'https://vercel.com/docs',
    pricingLabel: 'Free Tier',
    pricingDetails: 'Hobby plan is free forever for non-commercial personal and student projects. Pro plan for commercial teams.',
    openSourceStatus: false,
    licenseNotes: 'Proprietary hosting infrastructure; maintains open-source Next.js.',
    supportedOutputs: ['Public HTTPS websites', 'Preview deployment URLs', 'Serverless APIs'],
    beginnerSteps: [
      'Sign in to Vercel using your GitHub account.',
      'Click "Add New..." -> "Project" and select your repository.',
      'Under "Environment Variables", paste any required secret keys.',
      'Click "Deploy" and wait for the live `.vercel.app` URL.'
    ],
    samplePrompt: 'Provide a minimal vercel.json file to handle single-page application client-side routing rewrites.',
    commonErrors: [
      'Missing client routing rewrites in vercel.json causing 404 on page refresh.',
      'Forgetting to configure environment variables in Vercel project settings.'
    ],
    alternatives: ['Netlify', 'Cloudflare Pages', 'Render'],
    lastVerifiedAt: '2026-10-14',
    verificationStatus: 'verified'
  },
  {
    id: 'bolt-new',
    name: 'Bolt.new',
    category: 'coding',
    summary: 'In-browser AI development environment powered by WebContainers that runs full-stack Node.js environments directly in WebAssembly.',
    summaryTe: 'వెబ్‌కంటైనర్ల ద్వారా బ్రౌజర్‌లోనే ఫుల్-స్టాక్ నోడ్ యాప్‌లను రన్ చేసే AI డెవలప్‌మెంట్ ఎన్విరాన్‌మెంట్.',
    useCases: ['Instant fullstack prototyping', 'Node.js browser dev', 'Quick package testing'],
    skillLevel: 'intermediate',
    officialUrl: 'https://bolt.new',
    docsUrl: 'https://stackblitz.com/docs',
    pricingLabel: 'Free Tier',
    pricingDetails: 'Free tier with daily token allowances; subscription tiers for heavy compute and advanced models.',
    openSourceStatus: false,
    licenseNotes: 'Proprietary platform built on StackBlitz WebContainers.',
    supportedOutputs: ['Full-stack web apps', 'Node server backends', 'Interactive code sandboxes'],
    beginnerSteps: [
      'Open bolt.new in a modern desktop browser (Chrome/Edge/Firefox).',
      'Enter an application prompt and observe the file tree and terminal in real-time.',
      'Use the code editor tab to inspect changes.',
      'Deploy directly to Netlify/Stackblitz or export code.'
    ],
    samplePrompt: 'Build an offline-first student timetable planner with drag-and-drop and local storage.',
    commonErrors: [
      'Running heavy native binaries that cannot compile in WebAssembly.',
      'Exceeding free daily token limits with endless multi-turn loops.'
    ],
    alternatives: ['Google Antigravity', 'Replit', 'Lovable'],
    lastVerifiedAt: '2026-10-14',
    verificationStatus: 'verified'
  },
  {
    id: 'cursor',
    name: 'Cursor',
    category: 'coding',
    summary: 'AI-first code editor forked from VS Code with codebase indexing, multi-file edits, and inline code generation.',
    summaryTe: 'కోడ్‌బేస్ ఇండెక్సింగ్ మరియు మల్టీ-ఫైల్ ఎడిటింగ్‌తో రూపొందించబడిన ఆధునిక AI కోడ్ ఎడిటర్.',
    useCases: ['Local development with full repository context', 'Refactoring complex codebases', 'Terminal debugging'],
    skillLevel: 'intermediate',
    officialUrl: 'https://cursor.com',
    docsUrl: 'https://docs.cursor.com',
    pricingLabel: 'Free Tier',
    pricingDetails: 'Hobby plan includes two-week Pro trial, then limited slow premium requests and unlimited basic models.',
    openSourceStatus: false,
    licenseNotes: 'Proprietary editor built upon open-source VS Code core.',
    supportedOutputs: ['Local source code files', 'Git patches', 'Terminal executions'],
    beginnerSteps: [
      'Download and install Cursor; import your existing VS Code extensions in one click.',
      'Press Ctrl+K (or Cmd+K) to edit inline code.',
      'Press Ctrl+L to open the AI chat with @codebase indexing.',
      'Use Ctrl+I (Composer) for multi-file generation.'
    ],
    samplePrompt: 'Refactor this API service to handle network timeouts and add TypeScript error handling types.',
    commonErrors: [
      'Blindly accepting multi-file diffs without reading the changed lines.',
      'Index lag on massive repositories without .cursorignore.'
    ],
    alternatives: ['Google Antigravity', 'VS Code Copilot'],
    lastVerifiedAt: '2026-10-14',
    verificationStatus: 'verified'
  },
  {
    id: 'v0-dev',
    name: 'v0 by Vercel',
    category: 'coding',
    summary: 'Generative UI system by Vercel that converts natural language prompts into clean React components using Tailwind CSS and shadcn/ui.',
    summaryTe: 'రియాక్ట్ మరియు టెయిల్‌విండ్ కాంపోనెంట్‌లను తక్షణమే రూపొందించే వెర్సెల్ AI జనరేటివ్ UI సిస్టమ్.',
    useCases: ['Copy-paste UI components', 'Landing page sections', 'Dashboard widgets', 'Accessible form design'],
    skillLevel: 'beginner',
    officialUrl: 'https://v0.dev',
    docsUrl: 'https://v0.dev/docs',
    pricingLabel: 'Free Tier',
    pricingDetails: 'Free credits refreshed monthly. Premium subscriptions available for higher credit quotas.',
    openSourceStatus: false,
    licenseNotes: 'Proprietary service; output components use open-source MIT-compatible React & Tailwind patterns.',
    supportedOutputs: ['React JSX/TSX components', 'Tailwind markup', 'shadcn/ui compatible code'],
    beginnerSteps: [
      'Visit v0.dev and enter a UI request (e.g., "Student grade calculator card").',
      'Select component variations and inspect the interactive preview.',
      'Click the copy code button or copy the npx v0 add CLI command.',
      'Paste into your local project components folder.'
    ],
    samplePrompt: 'Create a clean student flashcard quiz component with flip animation, score counter, and progress bar.',
    commonErrors: [
      'Expecting backend databases and APIs from a frontend component generator.',
      'Missing prerequisite Tailwind configuration in local project.'
    ],
    alternatives: ['Lovable', 'Bolt.new'],
    lastVerifiedAt: '2026-10-14',
    verificationStatus: 'verified'
  },
  {
    id: 'google-ai-studio',
    name: 'Google AI Studio',
    category: 'chat_research',
    summary: 'Fastest way for developers to prototype with Gemini models, experiment with system prompts, and get free-tier API keys.',
    summaryTe: 'జెమిని మోడల్స్‌తో ఉచిత API కీలను పొందడానికి మరియు ప్రోటోటైప్ చేయడానికి గూగుల్ డెవలపర్ వేదిక.',
    useCases: ['Prototyping LLM prompts', 'Obtaining Gemini API keys', 'Testing multimodal inputs (images, audio, video)', 'Code export in Python/JS'],
    skillLevel: 'all',
    officialUrl: 'https://aistudio.google.com',
    docsUrl: 'https://ai.google.dev/docs',
    pricingLabel: 'Free Tier',
    pricingDetails: 'Generous free tier with rate limits (e.g. 15 RPM on Gemini 1.5/2.0 Flash) for developer experimentation. Pay-as-you-go optional.',
    openSourceStatus: false,
    licenseNotes: 'Proprietary platform; API usage subject to Google Generative AI terms.',
    supportedOutputs: ['JSON schema responses', 'Prompt prototypes', 'Executable cURL / Python / JS code'],
    beginnerSteps: [
      'Go to aistudio.google.com and sign in with a Google account.',
      'Click "Get API Key" to generate a secret key for your hackathon projects.',
      'Test prompts in the web playground with temperature and system instructions.',
      'Click "Get Code" to copy the ready-to-use client library code.'
    ],
    samplePrompt: 'Extract structured study topics, key formulas, and 3 practice questions from the provided textbook text in strict JSON format.',
    commonErrors: [
      'Exposing the Google AI Studio API key directly in client-side frontend code.',
      'Exceeding free-tier rate limits with tight parallel loops.'
    ],
    alternatives: ['Hugging Face', 'Ollama'],
    lastVerifiedAt: '2026-10-14',
    verificationStatus: 'verified',
    badge: 'Essential'
  },
  {
    id: 'gemini',
    name: 'Gemini (Web)',
    category: 'chat_research',
    summary: 'Google\'s conversational AI assistant with deep web search grounding, multimodal document analysis, and Google Workspace integration.',
    summaryTe: 'గూగుల్ యొక్క వెబ్ సెర్చ్, డాక్యుమెంట్ విశ్లేషణ మరియు తెలుగు సహా బహుభాషా సదుపాయం గల AI అసిస్టెంట్.',
    useCases: ['Research & paper summarization', 'Brainstorming project outlines', 'Telugu/English multi-lingual translation', 'Explaining difficult math and coding concepts'],
    skillLevel: 'all',
    officialUrl: 'https://gemini.google.com',
    docsUrl: 'https://support.google.com/gemini',
    pricingLabel: 'Free Tier',
    pricingDetails: 'Standard Gemini model is completely free; Gemini Advanced requires Google One AI Premium subscription.',
    openSourceStatus: false,
    licenseNotes: 'Proprietary Google conversational service.',
    supportedOutputs: ['Text summaries', 'Code snippets', 'Tables', 'Multilingual translations'],
    beginnerSteps: [
      'Visit gemini.google.com on web or mobile app.',
      'Attach your lecture notes or PDF syllabus for analysis.',
      'Ask specific, numbered questions rather than vague queries.',
      'Verify citations and factual statements using the "Double-check with Google" button.'
    ],
    samplePrompt: 'Explain the difference between supervised and unsupervised machine learning in simple Telugu and English, using an everyday college analogy.',
    commonErrors: [
      'Treating AI citations as infallible without verifying at official sources.',
      'Sharing confidential college credentials or exam answer keys.'
    ],
    alternatives: ['ChatGPT', 'Claude'],
    lastVerifiedAt: '2026-10-14',
    verificationStatus: 'verified'
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'chat_research',
    summary: 'OpenAI\'s general-purpose conversational assistant featuring GPT-4o mini, web browsing, data analysis, and voice capabilities.',
    summaryTe: 'ఓపెన్ AI యొక్క పాపులర్ AI అసిస్టెంట్ - డేటా విశ్లేషణ మరియు ప్రాజెక్ట్ గైడెన్స్ కోసం ఉపయోగపడుతుంది.',
    useCases: ['Coding assistance & debugging', 'Writing essays and emails', 'Data analysis on uploaded spreadsheets', 'Brainstorming'],
    skillLevel: 'all',
    officialUrl: 'https://chatgpt.com',
    docsUrl: 'https://help.openai.com',
    pricingLabel: 'Free Tier',
    pricingDetails: 'Free tier includes GPT-4o mini and limited access to GPT-4o; ChatGPT Plus subscription gives higher limits and advanced voice.',
    openSourceStatus: false,
    licenseNotes: 'Proprietary OpenAI service.',
    supportedOutputs: ['Text explanations', 'Python code executions', 'Data charts', 'Structured outlines'],
    beginnerSteps: [
      'Create a free OpenAI account at chatgpt.com.',
      'Use role-based prompts (e.g. "Act as a patient senior computer science tutor").',
      'Provide your specific error message along with the code snippet.',
      'Ask for step-by-step reasoning rather than just the final answer.'
    ],
    samplePrompt: 'I got a "TypeError: Cannot read properties of undefined (reading map)" in my React component. Here is my code: [paste]. Walk me through what causes this and how to fix it defensively.',
    commonErrors: [
      'Copy-pasting solutions without understanding why the bug happened.',
      'Hitting free-tier limits during peak hours.'
    ],
    alternatives: ['Gemini', 'Claude'],
    lastVerifiedAt: '2026-10-14',
    verificationStatus: 'verified'
  },
  {
    id: 'claude',
    name: 'Claude by Anthropic',
    category: 'chat_research',
    summary: 'Anthropic\'s conversational AI known for nuanced writing, long context comprehension, and Claude Artifacts for live code/diagram rendering.',
    summaryTe: 'దీర్ఘమైన డాక్యుమెంట్ల విశ్లేషణ, చక్కని రచన మరియు లైవ్ ఆర్టిఫ్యాక్ట్స్ సదుపాయం ఉన్న AI మోడల్.',
    useCases: ['Academic paper analysis', 'Long-form documentation writing', 'Claude Artifacts UI rendering', 'Code refactoring'],
    skillLevel: 'all',
    officialUrl: 'https://claude.ai',
    docsUrl: 'https://docs.anthropic.com',
    pricingLabel: 'Free Tier',
    pricingDetails: 'Free tier with message rate limits; Claude Pro subscription for 5x usage limits and priority access.',
    openSourceStatus: false,
    licenseNotes: 'Proprietary Anthropic model family.',
    supportedOutputs: ['Claude Artifacts (React, SVG, HTML)', 'Long-form academic reports', 'Refactored code'],
    beginnerSteps: [
      'Visit claude.ai and log in.',
      'Upload lengthy PDF reports, assignments, or research papers.',
      'Watch Claude render live UI components or diagrams in the Artifacts side panel.',
      'Copy the generated SVG or Markdown cleanly.'
    ],
    samplePrompt: 'Review this project report introduction. Identify passive voice, suggest sharper academic phrasing, and format as Markdown.',
    commonErrors: [
      'Exceeding message limits quickly by sending dozens of small fragmented messages.',
      'Uploading private institution documents without checking confidentiality rules.'
    ],
    alternatives: ['Gemini', 'ChatGPT'],
    lastVerifiedAt: '2026-10-14',
    verificationStatus: 'verified'
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    category: 'local_models',
    summary: 'The central open-source machine learning hub hosting over 500,000 models, datasets, and interactive demos (Spaces).',
    summaryTe: 'ఓపెన్ సోర్స్ మెషీన్ లెర్నింగ్ మోడల్స్, డేటాసెట్లు మరియు ఉచిత స్పేసెస్ కలిగిన అతిపెద్ద AI కమ్యూనిటీ.',
    useCases: ['Discovering open-source LLMs & diffusion models', 'Hosting free Gradio/Streamlit apps on HF Spaces', 'Downloading model weights for local execution', 'Accessing open datasets'],
    skillLevel: 'intermediate',
    officialUrl: 'https://huggingface.co',
    docsUrl: 'https://huggingface.co/docs',
    pricingLabel: 'Open Source',
    pricingDetails: 'Free access to open-source model weights, public datasets, and basic CPU Spaces. Paid options for dedicated GPUs and inference endpoints.',
    openSourceStatus: true,
    licenseNotes: 'Models use varied open licenses (Apache 2.0, MIT, Llama Community, OpenRAIL). Always check each model\'s specific license tab.',
    supportedOutputs: ['PyTorch / ONNX / GGUF model files', 'Gradio web demos', 'Datasets'],
    beginnerSteps: [
      'Create a free Hugging Face account.',
      'Explore the "Spaces" tab to test AI demos without installing anything locally.',
      'Check model cards to read license terms, training data, and hardware requirements.',
      'Use the transformers Python library or Hugging Face Inference API.'
    ],
    samplePrompt: 'Show me Python code using the Hugging Face `transformers` pipeline to run sentiment analysis on student project feedback.',
    commonErrors: [
      'Assuming all models on Hugging Face allow commercial use without checking the specific license tag.',
      'Attempting to load a 70B parameter model locally on a standard 8GB RAM laptop.'
    ],
    alternatives: ['Ollama', 'Replicate'],
    lastVerifiedAt: '2026-10-14',
    verificationStatus: 'verified',
    badge: '100% Open Source Hub'
  },
  {
    id: 'ollama',
    name: 'Ollama',
    category: 'local_models',
    summary: 'Lightweight tool to run open-source large language models (Llama 3, Mistral, Gemma, Phi) locally on macOS, Linux, and Windows.',
    summaryTe: 'మీ స్వంత కంప్యూటర్‌లోనే ఇంటర్నెట్ లేకుండా స్థానికంగా (Local) AI మోడల్స్‌ను రన్ చేసే అద్భుతమైన టూల్.',
    useCases: ['100% private offline AI coding', 'Zero API cost development', 'Testing open-source models', 'Local RAG and embeddings'],
    skillLevel: 'intermediate',
    officialUrl: 'https://ollama.com',
    docsUrl: 'https://github.com/ollama/ollama',
    pricingLabel: 'Open Source',
    pricingDetails: 'Completely free and open-source software (MIT License). Runs entirely on your own local hardware with zero subscription fees.',
    openSourceStatus: true,
    licenseNotes: 'Ollama software is MIT licensed. Model weights (e.g. Llama 3, Gemma) are subject to their respective creators\' license agreements.',
    supportedOutputs: ['Local REST API (localhost:11434)', 'Terminal CLI chat', 'OpenAI-compatible endpoints'],
    beginnerSteps: [
      'Download and install Ollama from ollama.com for Windows/Mac/Linux.',
      'Open your terminal and type `ollama run gemma:2b` or `ollama run llama3:8b`.',
      'The model downloads and starts an interactive command-line chat session.',
      'Connect local tools or VS Code extensions to http://localhost:11434/v1.'
    ],
    samplePrompt: 'Run `ollama run gemma:2b` in PowerShell and ask: "Explain recursion in C language with a factorial diagram."',
    commonErrors: [
      'Downloading 70B models on laptops with less than 16GB unified memory causing heavy system freezes.',
      'Forgetting that Ollama runs in background eating battery if not stopped.'
    ],
    alternatives: ['LM Studio', 'Hugging Face'],
    lastVerifiedAt: '2026-10-14',
    verificationStatus: 'verified',
    badge: 'Privacy & Offline'
  },
  {
    id: 'canva',
    name: 'Canva Magic Studio',
    category: 'presentations',
    summary: 'Popular graphic design platform with built-in AI tools for instant slide generation, image editing, and student presentations.',
    summaryTe: 'విద్యార్థుల ప్రెజెంటేషన్లు, పోస్టర్లు మరియు డిజైన్ల కోసం AI టూల్స్ కలిగిన పాపులర్ డిజైన్ ప్లాట్‌ఫారమ్.',
    useCases: ['College seminar presentations', 'Project poster designs', 'Infographics & diagrams', 'Exporting to PPTX and PDF'],
    skillLevel: 'beginner',
    officialUrl: 'https://canva.com',
    docsUrl: 'https://www.canva.com/help',
    pricingLabel: 'Free Tier',
    pricingDetails: 'Generous free tier with thousands of templates; Canva for Education provides free Pro features to eligible students & teachers.',
    openSourceStatus: false,
    licenseNotes: 'Proprietary design platform. Exported designs subject to Canva content license agreement.',
    supportedOutputs: ['PPTX slide decks', 'PDF documents', 'PNG/JPEG graphics', 'MP4 videos'],
    beginnerSteps: [
      'Sign up at canva.com using your student email.',
      'Search for "Presentation (16:9)" or use Magic Design for Presentations.',
      'Paste a structured slide-by-slide outline generated from SkillNova Prompt Lab.',
      'Customize fonts, colors, and layout; export as PDF or PowerPoint (.pptx).'
    ],
    samplePrompt: 'Outline for a 7-slide presentation on "Renewable Energy in Smart Cities" with title, 3 key bullet points, and visual suggestion per slide.',
    commonErrors: [
      'Putting walls of text on slides instead of 3 concise bullet points with strong visual hierarchy.',
      'Using copyrighted watermarked images in academic submissions.'
    ],
    alternatives: ['Gamma', 'Napkin'],
    lastVerifiedAt: '2026-10-14',
    verificationStatus: 'verified'
  },
  {
    id: 'gamma',
    name: 'Gamma App',
    category: 'presentations',
    summary: 'AI-powered medium for generating polished presentations, webpages, and document decks from plain text or bulleted notes.',
    summaryTe: 'సాధారణ నోట్స్ నుండి నిమిషాల్లో ప్రొఫెషనల్ స్లైడ్స్ మరియు డాక్యుమెంట్లను రూపొందించే AI టూల్.',
    useCases: ['Instant slide deck generation', 'Project pitch decks', 'Interactive lecture summaries', 'Responsive web-friendly decks'],
    skillLevel: 'beginner',
    officialUrl: 'https://gamma.app',
    docsUrl: 'https://help.gamma.app',
    pricingLabel: 'Free Tier',
    pricingDetails: 'Free plan includes 400 AI creation credits upon signup with Gamma watermark. Paid Plus/Pro plans remove watermark and increase AI limits.',
    openSourceStatus: false,
    licenseNotes: 'Proprietary SaaS platform.',
    supportedOutputs: ['Interactive web presentations', 'Export to PDF', 'Export to PPTX'],
    beginnerSteps: [
      'Sign up at gamma.app.',
      'Choose "Generate" -> "Presentation" and paste your structured outline.',
      'Select a theme (dark, light, or pastel) with good contrast.',
      'Edit cards directly in the visual editor; export to PDF or PPTX.'
    ],
    samplePrompt: 'Create an 8-card presentation on "Microservices vs Monolith Architecture" for 3rd-year engineering students with pros, cons, and diagrams.',
    commonErrors: [
      'Accepting generated slide content without fact-checking technical accuracy.',
      'Exhausting 400 signup credits by regenerating whole decks repeatedly.'
    ],
    alternatives: ['Canva', 'Napkin'],
    lastVerifiedAt: '2026-10-14',
    verificationStatus: 'verified'
  },
  {
    id: 'napkin-ai',
    name: 'Napkin AI',
    category: 'presentations',
    summary: 'Transforms written text and documentation into visual diagrams, flowcharts, timelines, and infographics automatically.',
    summaryTe: 'మీ టెక్స్ట్ లేదా డాక్యుమెంటేషన్‌ను ఆటోమేటిక్‌గా ఫ్లోచార్ట్‌లు మరియు డయాగ్రమ్‌లుగా మార్చే టూల్.',
    useCases: ['Project documentation diagrams', 'Software architecture flowcharts', 'Timeline graphics for reports', 'Study notes visualization'],
    skillLevel: 'beginner',
    officialUrl: 'https://napkin.ai',
    docsUrl: 'https://napkin.ai',
    pricingLabel: 'Free Tier',
    pricingDetails: 'Free plan available during public beta / starter tier with PNG, SVG, and PDF diagram exports.',
    openSourceStatus: false,
    licenseNotes: 'Proprietary platform.',
    supportedOutputs: ['SVG vector graphics', 'PNG diagrams', 'PDF visual summaries'],
    beginnerSteps: [
      'Paste paragraph text or process steps into Napkin\'s editor.',
      'Click the spark icon next to any paragraph to generate visual diagram options.',
      'Select your preferred visual style (flowchart, mindmap, comparison grid).',
      'Download as SVG or PNG and embed in your project report.'
    ],
    samplePrompt: 'Process steps: 1. User inputs query -> 2. Controller validates input -> 3. Service queries vector database -> 4. Model synthesizes answer -> 5. Response rendered in UI.',
    commonErrors: [
      'Pasting unstructured jargon that confuses the auto-diagram engine.',
      'Exporting low-resolution raster images for high-DPI print reports instead of SVG.'
    ],
    alternatives: ['Canva', 'Mermaid.js'],
    lastVerifiedAt: '2026-10-14',
    verificationStatus: 'verified'
  },
  {
    id: 'suno',
    name: 'Suno AI',
    category: 'audio_music',
    summary: 'Generative AI music platform that turns lyrics and genre descriptions into full songs with vocals and instrumentation.',
    summaryTe: 'పాటల సాహిత్యం మరియు జానర్ వివరణల నుండి సంగీతాన్ని మరియు వోకల్స్‌ను రూపొందించే AI మ్యూజిక్ టూల్.',
    useCases: ['Original background scores for hackathon video demos', 'Educational mnemonics / study songs', 'Podcast intro audio'],
    skillLevel: 'beginner',
    officialUrl: 'https://suno.com',
    docsUrl: 'https://suno.com/faq',
    pricingLabel: 'Free Tier',
    pricingDetails: 'Basic free tier provides 50 daily credits (approx. 10 songs per day). Free tier songs require attribution and are for non-commercial use only.',
    openSourceStatus: false,
    licenseNotes: 'Non-commercial license on Free plan with mandatory attribution. Pro/Premier subscription grants commercial rights to generated tracks.',
    supportedOutputs: ['MP3 audio files', 'MP4 video cards with scrolling lyrics'],
    beginnerSteps: [
      'Go to suno.com and sign up with Discord/Google.',
      'Click "Create" and toggle "Custom Mode".',
      'Paste educational lyrics or topic summary into the lyrics box.',
      'Set musical style (e.g. "Upbeat acoustic folk pop with crisp guitar") and click Create.'
    ],
    samplePrompt: 'Style: Upbeat lo-fi study beat. Lyrics: [Verse] Functions and loops in a binary tree / searching for keys in O(log n) degree...',
    commonErrors: [
      'Claiming commercial monetization on YouTube or Spotify using tracks generated on Suno\'s free non-commercial plan.',
      'Using protected artist names directly in the style prompt.'
    ],
    alternatives: ['Udio'],
    lastVerifiedAt: '2026-10-14',
    verificationStatus: 'verified'
  }
];
