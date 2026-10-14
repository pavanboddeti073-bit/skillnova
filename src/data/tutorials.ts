import type { GuidedTutorial } from '../types/index.ts';

export const guidedTutorials: GuidedTutorial[] = [
  {
    id: 'antigravity-deep-guide',
    toolId: 'google-antigravity',
    toolName: 'Google Antigravity',
    title: 'Mastering Google Antigravity: Agentic Development from Scratch',
    titleTe: 'గూగుల్ యాంటీగ్రావిటీ గైడ్: ఏజెంట్ ద్వారా పూర్తి ప్రాజెక్ట్ డెవలప్‌మెంట్',
    badge: 'Core Tool Guide',
    duration: '25 min practice',
    prerequisites: ['Basic understanding of files and folders', 'Familiarity with standard web concepts (HTML/JS)'],
    whatItIs: 'Google Antigravity is an agentic development environment where an AI pair-programmer can inspect your workspace, plan tasks, create and edit files with diff previews, run terminal commands, and view browser outputs directly.',
    whatItIsTe: 'గూగుల్ యాంటీగ్రావిటీ అనేది శక్తివంతమైన AI డెవలప్‌మెంట్ ఎన్విరాన్‌మెంట్. ఇది మీ ప్రాజెక్ట్ ఫైళ్ళను పరిశీలించి, కోడ్ రాసి, టెర్మినల్ కమాండ్స్ రన్ చేసి టెస్ట్ చేస్తుంది.',
    whenToUseIt: 'When building full-stack web applications, refactoring complex code, automating multi-step coding chores, or pairing with an autonomous coding agent.',
    whenToUseItTe: 'పూర్తి-స్థాయి వెబ్ అప్లికేషన్లు నిర్మించడానికి, బగ్‌లను పరిష్కరించడానికి లేదా కోడింగ్ ఏజెంట్‌తో కలిసి పనిచేయడానికి ఇది ఉత్తమం.',
    safetyNotes: [
      'Always review file diffs before accepting code edits.',
      'Never paste private API keys or database passwords into agent prompts or public files.',
      'Antigravity tools execute actual commands on your machine or cloud sandbox—inspect commands for safety.'
    ],
    costNotes: 'Integrated with Google Developer ecosystem. Always check your developer quota limits in Google Cloud / AI Studio.',
    officialDocsUrl: 'https://deepmind.google',
    lastVerifiedAt: '2026-10-14',
    steps: [
      {
        stepNumber: 1,
        title: 'Workspace Setup & Orientation',
        instruction: 'Open your project folder in Google Antigravity. Check the three main zones: the File Explorer on the left, the Agent Chat & Task panel in the center/right, and the Integrated Terminal / Diff review tray below.',
        instructionTe: 'గూగుల్ యాంటీగ్రావిటీలో ప్రాజెక్ట్ ఫోల్డర్‌ను తెరవండి. ఎడమవైపు ఫైల్ ఎక్స్‌ప్లోరర్, కుడివైపు ఏజెంట్ చాట్, క్రింద టెర్మినల్ మరియు డిఫ్ ప్రివ్యూ ఉంటాయి.',
        expectedResult: 'You see the current directory files and an active terminal prompt.',
        checkpointQuestion: 'Can you see your project workspace directory and the agent prompt input?',
        stuckTips: [
          'If the terminal is unresponsive, press Enter or reopen the terminal tab.',
          'Verify your working directory matches your intended project folder.'
        ]
      },
      {
        stepNumber: 2,
        title: 'Formulating a Clear Agent Task',
        instruction: 'Instead of saying "Build me an entire Instagram clone", break down your project into a discrete milestone: "Scaffold a student dashboard layout with a top navigation bar, a search input, and a 3-card stats summary in React with Tailwind CSS."',
        instructionTe: 'మొత్తం పెద్ద ప్రాజెక్ట్‌ను ఒకేసారి అడగకుండా, చిన్న మైల్‌స్టోన్‌గా అడగండి. ఉదాహరణకు నావిగేషన్ బార్ మరియు 3 కార్డ్స్ లేఅవుట్ తయారు చేయమని ప్రాంప్ట్ ఇవ్వండి.',
        copyablePrompt: 'Please inspect the current project. Create a responsive Header component with a logo, navigation links, and a theme switcher using React and Tailwind CSS. Ensure accessible keyboard navigation and clean TypeScript types.',
        expectedResult: 'The agent analyzes your repository, lists the planned changes, and writes or edits the component file.',
        checkpointQuestion: 'Did the agent provide a clear task plan before modifying files?',
        stuckTips: [
          'If the agent makes assumptions you dislike, send a quick clarification: "Use TypeScript and avoid external icon libraries for now."'
        ]
      },
      {
        stepNumber: 3,
        title: 'Reviewing Diffs & File Edits',
        instruction: 'When Antigravity edits files, examine the green (additions) and red (deletions) highlighted diff. Verify that existing logic and comments are preserved and that no unwanted dependencies were injected.',
        instructionTe: 'ఏజెంట్ మార్చిన ఫైళ్లలో గ్రీన్ (కొత్త కోడ్) మరియు రెడ్ (తొలగించిన కోడ్) సరిచూడండి. మునుపటి కోడ్ అనుకోకుండా తొలగించబడలేదని నిర్ధారించుకోండి.',
        expectedResult: 'You understand every changed line in the diff preview.',
        checkpointQuestion: 'Are there any broken imports or overwritten custom functions in the diff?',
        stuckTips: [
          'If an edit removed needed code, ask the agent: "Revert the deletion of calculateScore function and only append the new UI modal."'
        ]
      },
      {
        stepNumber: 4,
        title: 'Running Tests & Console Verification',
        instruction: 'Ask the agent to run the build or test suite via the terminal. Watch the terminal output for TypeScript compile errors, lint warnings, or missing dependencies.',
        instructionTe: 'ప్రాజెక్ట్ సరిగ్గా కంపైల్ అవుతుందో లేదో తనిఖీ చేయడానికి `npm run build` లేదా టెస్ట్‌లను టెర్మినల్‌లో రన్ చేయమని ఏజెంట్‌ను అడగండి.',
        copyablePrompt: 'Run the project build and test commands in the terminal. If any TypeScript or lint errors occur, fix them and show the clean test output.',
        expectedResult: 'Build succeeds with zero errors, producing production bundle artifacts.',
        checkpointQuestion: 'Did the build finish with exit code 0 and no TypeScript errors?',
        stuckTips: [
          'If a package is missing, the agent will run `npm install <package>` automatically.',
          'On Windows, if PowerShell execution policy blocks scripts, run commands via cmd.exe or check execution policy.'
        ]
      },
      {
        stepNumber: 5,
        title: 'Debugging with the Browser & Terminal Tools',
        instruction: 'Use the preview browser tool to inspect live elements and test mobile responsiveness. If an issue occurs, capture the console error message and instruct the agent to diagnose the root cause.',
        instructionTe: 'లైవ్ ప్రివ్యూలో బ్రౌజర్ ఎర్రర్స్ ఏమైనా ఉంటే వాటిని కాపీ చేసి ఏజెంట్‌కు ఇచ్చి పరిష్కరించమని చెప్పండి.',
        copyablePrompt: 'In mobile viewport (375px), the navigation dropdown is cut off on the right. Fix the CSS positioning so it stays within the screen bounds.',
        expectedResult: 'The layout adjusts smoothly on both mobile and desktop screens.',
        checkpointQuestion: 'Does the application work smoothly when resizing the browser window?',
        stuckTips: [
          'Always test responsive breakpoints at 375px (mobile), 768px (tablet), and 1280px (desktop).'
        ]
      }
    ]
  },
  {
    id: 'replit-deep-guide',
    toolId: 'replit',
    toolName: 'Replit & Replit Agent',
    title: 'Building & Deploying with Replit in the Cloud',
    titleTe: 'రెప్లిట్ గైడ్: బ్రౌజర్‌లోనే ప్రాజెక్ట్ నిర్మించి క్లౌడ్‌లో హోస్ట్ చేయడం',
    badge: 'Cloud Sandbox Guide',
    duration: '20 min practice',
    prerequisites: ['A free Replit account', 'Modern web browser'],
    whatItIs: 'Replit is an instant cloud-based IDE that lets you build, test, and host applications in over 50 languages with zero local installation required.',
    whatItIsTe: 'రెప్లిట్ అనేది ఎలాంటి ఇన్‌స్టాలేషన్ లేకుండా బ్రౌజర్‌లోనే కోడింగ్, టెస్టింగ్ మరియు లైవ్ హోస్టింగ్ చేసుకునే క్లౌడ్ ప్లాట్‌ఫారమ్.',
    whenToUseIt: 'When you are on a low-end laptop, Chromebook, or college computer where installing local development tools is restricted.',
    whenToUseItTe: 'మీ వద్ద తక్కువ ర్యామ్ ఉన్న ల్యాప్‌టాప్ ఉన్నప్పుడు లేదా కాలేజీ ల్యాబ్‌లలో సాఫ్ట్‌వేర్ ఇన్‌స్టాల్ చేసే వీలు లేనప్పుడు ఇది ఉత్తమం.',
    safetyNotes: [
      'Never put API keys in code files; use the Replit Secrets tool (Tools -> Secrets).',
      'Free repls sleep after inactivity. Configure a health check or use Replit Deployments for persistent uptime.'
    ],
    costNotes: 'Basic repls are free. Replit Agent credits and custom-domain cloud hosting require credits or Replit Core.',
    officialDocsUrl: 'https://docs.replit.com',
    lastVerifiedAt: '2026-10-14',
    steps: [
      {
        stepNumber: 1,
        title: 'Create Your Repl with Clear Environment',
        instruction: 'Go to replit.com, click "+ Create Repl", and choose a template such as "Node.js" or "HTML/CSS/JS". Give it a clear name such as "student-exam-helper".',
        instructionTe: 'replit.com లో లాగిన్ అయి "+ Create Repl" క్లిక్ చేసి Node.js లేదా HTML టెంప్లేట్ ఎంచుకోండి.',
        expectedResult: 'A fresh cloud workspace opens with Files, Editor, and Webview / Console tabs.',
        checkpointQuestion: 'Do you see the main code editor and the green "Run" button?',
        stuckTips: ['If the workspace fails to boot, refresh the page or choose another region in settings.']
      },
      {
        stepNumber: 2,
        title: 'Store API Keys Securely in Secrets',
        instruction: 'Click "Tools" in the left sidebar and select "Secrets" (padlock icon). Add a key called `GEMINI_API_KEY` and paste your key. In Node.js, access it via `process.env.GEMINI_API_KEY`.',
        instructionTe: 'ఎడమవైపు Tools లో "Secrets" ఎంచుకుని మీ API కీలను భద్రపరచండి. కోడ్‌లో డైరెక్ట్‌గా రాయకండి.',
        expectedResult: 'The secret is securely stored in environment variables without appearing in git or public files.',
        checkpointQuestion: 'Is your secret saved under the Secrets panel rather than in a visible .js file?',
        stuckTips: ['Never commit a .env file to public Replit repositories.']
      },
      {
        stepNumber: 3,
        title: 'Describing Requirements to Replit Agent',
        instruction: 'If using Replit Agent, specify the architecture, user flow, and design constraints in your opening prompt.',
        instructionTe: 'రెప్లిట్ ఏజెంట్‌కు మీ అవసరాలు, డిజైన్ మరియు ఏయే పేజీలు కావాలో స్పష్టంగా వివరించండి.',
        copyablePrompt: 'Create a student study schedule web app using Express.js and clean vanilla CSS. Store tasks in memory with a REST API for adding, toggling, and deleting study sessions. Provide a clean mobile-friendly frontend.',
        expectedResult: 'Agent installs dependencies, sets up package.json, and launches the dev server.',
        checkpointQuestion: 'Does the preview pane show the working study schedule UI?',
        stuckTips: ['If the port fails to bind, ensure your server listens on `0.0.0.0:3000` or `process.env.PORT`.']
      },
      {
        stepNumber: 4,
        title: 'Deploying Live to the Web',
        instruction: 'Click the "Deploy" button in the top right corner. Choose "Autoscale" or "Static" depending on your project type. Click Deploy.',
        instructionTe: 'కుడివైపు పైభాగంలో ఉన్న "Deploy" బటన్ క్లిక్ చేసి మీ యాప్‌ను ఇంటర్నెట్‌లో లైవ్ చేయండి.',
        expectedResult: 'Replit generates a live public URL (e.g. `your-app.replit.app`) accessible to judges.',
        checkpointQuestion: 'Can you open your live URL from your smartphone or another tab?',
        stuckTips: ['Check Deployment build logs if the deployment fails during initial start.']
      }
    ]
  },
  {
    id: 'lovable-deep-guide',
    toolId: 'lovable',
    toolName: 'Lovable',
    title: 'Rapid UI Prototyping & GitHub Sync with Lovable',
    titleTe: 'లవబుల్ గైడ్: ప్రాంప్ట్‌తో రియాక్ట్ UI నిర్మించి గిట్‌హబ్‌కు సింక్ చేయడం',
    badge: 'Frontend Builder Guide',
    duration: '20 min practice',
    prerequisites: ['Free Lovable account', 'GitHub account for syncing'],
    whatItIs: 'Lovable is an AI-first web builder that generates production-grade React + Tailwind CSS codebases from prompts, allowing visual tweaking and seamless GitHub repository synchronization.',
    whatItIsTe: 'లవబుల్ అనేది సహజ భాష ప్రాంప్ట్స్ ద్వారా రియాక్ట్ వెబ్‌సైట్లను సృష్టించి, సులభంగా గిట్‌హబ్‌కు కోడ్ పంపగల ఆధునిక టూల్.',
    whenToUseIt: 'When you need to deliver an impressive, high-polish frontend prototype with modern components in hours rather than days.',
    whenToUseItTe: 'హ్యాకథాన్‌లలో కొన్ని గంటల్లోనే అందమైన మరియు ప్రొఫెషనల్ వెబ్ ఇంటర్‌ఫేస్ తయారు చేయాలనుకున్నప్పుడు ఇది గొప్ప ఎంపిక.',
    safetyNotes: [
      'Prompt in small iterations; large single prompts often overwrite unintended UI components.',
      'Sync to GitHub frequently to maintain commit history and revert when needed.'
    ],
    costNotes: 'Includes starter credits for new accounts; heavy multi-turn iterations consume credits.',
    officialDocsUrl: 'https://docs.lovable.dev',
    lastVerifiedAt: '2026-10-14',
    steps: [
      {
        stepNumber: 1,
        title: 'Crafting the Foundation Prompt',
        instruction: 'Begin at lovable.dev with a focused paragraph describing the core student user experience, color theme, and layout.',
        instructionTe: 'లవబుల్‌లో మీ ప్రాజెక్ట్ ప్రధాన లక్ష్యం, రంగులు మరియు లేఅవుట్ గురించి ప్రాంప్ట్ రాయండి.',
        copyablePrompt: 'Create a modern AI learning dashboard for college students named SkillNova. Use an accessible clean color palette (slate neutral background, deep blue primary, emerald success indicators). Include a top navigation bar, a "Start Learning" hero CTA, a grid of 6 topic cards, and a prompt tester box.',
        expectedResult: 'Lovable scaffolds the React codebase and renders an interactive preview in seconds.',
        checkpointQuestion: 'Does the preview match your desired layout and color tone?',
        stuckTips: ['If the design is too busy, ask: "Simplify the layout, reduce shadow blur, and increase whitespace between cards."']
      },
      {
        stepNumber: 2,
        title: 'Iterative Refinement',
        instruction: 'Select specific elements in the visual canvas or type targeted follow-up prompts to polish single components.',
        instructionTe: 'ఒక్కొక్క విభాగాన్ని ఎంచుకుని చిన్న మార్పులతో మెరుగుపరచండి.',
        copyablePrompt: 'Add a search bar above the card grid with instant client-side filtering by topic title and difficulty tag.',
        expectedResult: 'The search bar updates the visible cards in real time as the user types.',
        checkpointQuestion: 'Does typing into the search bar filter the cards properly?',
        stuckTips: ['Keep prompts focused on one component per turn to avoid regressions.']
      },
      {
        stepNumber: 3,
        title: 'Connecting to GitHub',
        instruction: 'Click the "GitHub" button in the top bar. Authenticate with GitHub and authorize Lovable to create a new repository (e.g. `skillnova-app`).',
        instructionTe: 'పైనున్న GitHub బటన్ క్లిక్ చేసి మీ గిట్‌హబ్ అకౌంట్‌తో కనెక్ట్ చేయండి మరియు కొత్త రిపోజిటరీ క్రియేట్ చేయండి.',
        expectedResult: 'A fresh, well-structured Vite + React + Tailwind repository is pushed to your GitHub profile.',
        checkpointQuestion: 'Can you see the new repository on your GitHub profile with valid package.json and src folders?',
        stuckTips: ['Ensure GitHub permissions allow repository creation.']
      }
    ]
  },
  {
    id: 'github-deep-guide',
    toolId: 'github',
    toolName: 'GitHub',
    title: 'Version Control, Git Safety & Team Collaboration',
    titleTe: 'గిట్‌హబ్ గైడ్: కోడ్ భద్రత, బ్రాంచ్‌లు మరియు టీమ్ వర్క్',
    badge: 'Essential Developer Skill',
    duration: '25 min practice',
    prerequisites: ['Git installed on your system or GitHub Desktop', 'GitHub account'],
    whatItIs: 'GitHub is the standard cloud platform for hosting Git repositories, tracking issues, reviewing pull requests, and automating deployments.',
    whatItIsTe: 'గిట్‌హబ్ అనేది ప్రపంచంలో అత్యంత ప్రాచుర్యం పొందిన కోడ్ హోస్టింగ్ ప్లాట్‌ఫారమ్. ప్రాజెక్ట్ భద్రతకు ఇది తప్పనిసరి.',
    whenToUseIt: 'On EVERY hackathon and software project to prevent code loss, collaborate with teammates, and deploy to cloud hosts.',
    whenToUseItTe: 'ప్రతి ప్రాజెక్ట్‌లో కోడ్ పోకుండా ఉండటానికి మరియు టీమ్‌తో కలిసి పనిచేయడానికి ఇది తప్పనిసరి.',
    safetyNotes: [
      'CRITICAL: Always configure a `.gitignore` before making your first commit.',
      'Never commit files named `.env`, `.env.local`, `credentials.json`, or private SSH keys.',
      'If you accidentally push a secret, revoke it immediately at the provider dashboard.'
    ],
    costNotes: 'Free for public and private repositories. GitHub Student Developer Pack grants extensive free pro tools.',
    officialDocsUrl: 'https://docs.github.com',
    lastVerifiedAt: '2026-10-14',
    steps: [
      {
        stepNumber: 1,
        title: 'Creating .gitignore Before Committing',
        instruction: 'In your project root, verify a `.gitignore` file exists containing node_modules, dist, .env, and local logs.',
        instructionTe: 'ప్రాజెక్ట్ ఫోల్డర్‌లో `.gitignore` ఫైల్ ఉందో లేదో తనిఖీ చేసి, అందులో node_modules మరియు .env చేర్చండి.',
        copyablePrompt: `# Dependencies\nnode_modules/\n\n# Build outputs\ndist/\nbuild/\n\n# Environment & Secrets\n.env\n.env.*\n!.env.example\n\n# Logs\n*.log\n\n# OS metadata\n.DS_Store\nThumbs.db`,
        expectedResult: 'Git ignores bulky dependency folders and secret configuration files.',
        checkpointQuestion: 'Does `git status` show that node_modules and .env are untracked/ignored?',
        stuckTips: ['If .env is already tracked, run `git rm --cached .env` then commit.']
      },
      {
        stepNumber: 2,
        title: 'Making Meaningful Atomic Commits',
        instruction: 'Commit working milestones with descriptive messages rather than generic labels.',
        instructionTe: 'చిన్న చిన్న మార్పులను స్పష్టమైన మెసేజ్‌తో కమిట్ చేయండి (ఉదా: git commit -m "feat: add user login form").',
        copyablePrompt: 'git add .\ngit commit -m "feat: implement prompt lab with markdown export and copy feature"\ngit push origin main',
        expectedResult: 'Your commit history is readable and every milestone is restorable.',
        checkpointQuestion: 'Can you see your new commit on the GitHub repository web page?',
        stuckTips: ['Avoid waiting until 10 minutes before submission to make your first commit.']
      },
      {
        stepNumber: 3,
        title: 'Branching for Team Work',
        instruction: 'Have each teammate work on a separate branch (e.g. `feature/prompt-lab` or `feature/resume-review`) to avoid merge conflicts.',
        instructionTe: 'టీమ్‌మేట్స్ కలిసి పనిచేసేటప్పుడు వేర్వేరు బ్రాంచ్‌లను ఉపయోగించండి: `git checkout -b feature/my-feature`.',
        copyablePrompt: 'git checkout -b feature/tutor-telugu-support\n# Make your changes\ngit add .\ngit commit -m "feat: add Telugu canned responses for demo mode"\ngit push -u origin feature/tutor-telugu-support',
        expectedResult: 'A new branch is created on GitHub and ready for Pull Request review.',
        checkpointQuestion: 'Did GitHub prompt you to "Compare & pull request" upon pushing?',
        stuckTips: ['Pull the latest main branch (`git pull origin main`) before starting your work.']
      }
    ]
  },
  {
    id: 'vercel-deep-guide',
    toolId: 'vercel',
    toolName: 'Vercel',
    title: 'Zero-Downtime Deployments & Production Config on Vercel',
    titleTe: 'వెర్సెల్ గైడ్: ఉచిత హోస్టింగ్, ఎన్విరాన్‌మెంట్ వేరియబుల్స్ మరియు లైవ్ డిప్లాయ్',
    badge: 'Deployment & Hosting Guide',
    duration: '15 min practice',
    prerequisites: ['A GitHub repository containing your frontend project', 'A free Vercel account'],
    whatItIs: 'Vercel is the premier frontend cloud platform that automatically builds and deploys your website on every git push with free SSL and worldwide CDN speed.',
    whatItIsTe: 'వెర్సెల్ అనేది మీరు గిట్‌హబ్‌కు పుష్ చేసిన ప్రతిసారీ ఆటోమేటిక్‌గా వెబ్‌సైట్‌ను లైవ్ చేసే ఉచిత హోస్టింగ్ ప్లాట్‌ఫారమ్.',
    whenToUseIt: 'To give judges, professors, and users a fast, public HTTPS link to your hackathon project.',
    whenToUseItTe: 'హ్యాకథాన్ జడ్జిలకు మీ ప్రాజెక్ట్ లైవ్ లింక్ ఇవ్వడానికి ఇది అత్యంత వేగవంతమైన మార్గం.',
    safetyNotes: [
      'Never put actual production secrets in frontend `VITE_` variables if they shouldn\'t be visible in browser bundles.',
      'Use Vercel Serverless Functions (`/api/*`) to call private third-party APIs securely.'
    ],
    costNotes: 'The Hobby plan is free forever for personal, educational, and student projects.',
    officialDocsUrl: 'https://vercel.com/docs',
    lastVerifiedAt: '2026-10-14',
    steps: [
      {
        stepNumber: 1,
        title: 'Importing Your GitHub Repo',
        instruction: 'Log in to vercel.com with GitHub. Click "Add New..." -> "Project". Find your repo from the list and click "Import".',
        instructionTe: 'vercel.com లో గిట్‌హబ్‌తో లాగిన్ అయి మీ ప్రాజెక్ట్ రిపోజిటరీని సెలెక్ట్ చేయండి.',
        expectedResult: 'Vercel automatically detects the framework (e.g. Vite or Next.js) and sets build command to `npm run build` and output to `dist`.',
        checkpointQuestion: 'Did Vercel correctly identify your framework preset as Vite?',
        stuckTips: ['If your project is inside a subfolder, configure the "Root Directory" setting before deploying.']
      },
      {
        stepNumber: 2,
        title: 'Configuring Environment Variables',
        instruction: 'Under "Environment Variables", enter any required server keys (e.g., `GEMINI_API_KEY`). Ensure you select "Production", "Preview", and "Development".',
        instructionTe: 'ప్రాజెక్ట్ సెట్టింగ్స్‌లో "Environment Variables" సెక్షన్ వద్ద API కీలను భద్రంగా పేస్ట్ చేయండి.',
        expectedResult: 'Secrets are encrypted and available at runtime without ever being committed to Git.',
        checkpointQuestion: 'Are all required variable names matching what your application code expects?',
        stuckTips: ['Remember to redeploy your project after updating environment variables.']
      },
      {
        stepNumber: 3,
        title: 'Configuring SPA Client Routing (vercel.json)',
        instruction: 'For Single Page Applications (React/Vite), add a `vercel.json` file in your root folder so direct page reloads don\'t throw a 404 error.',
        instructionTe: 'వెబ్‌సైట్ రీఫ్రెష్ చేసినప్పుడు 404 రాకుండా `vercel.json` ఫైల్‌ను ప్రాజెక్ట్ రూట్‌లో ఉంచండి.',
        copyablePrompt: '{\n  "rewrites": [\n    { "source": "/(.*)", "destination": "/index.html" }\n  ]\n}',
        expectedResult: 'Deep links and browser reloads resolve cleanly to the index page.',
        checkpointQuestion: 'Does reloading any subpage in production load smoothly without a 404?',
        stuckTips: ['Keep vercel.json strictly formatted JSON without trailing commas.']
      },
      {
        stepNumber: 4,
        title: 'Verifying Build Logs & Inspection',
        instruction: 'Click "Deploy". Watch the real-time build log streaming. When complete, celebrate with confetti and click the live link.',
        instructionTe: 'డిప్లాయ్ క్లిక్ చేసి బిల్డ్ లాగ్స్ చూడండి. పూర్తయ్యాక లైవ్ వెబ్‌సైట్ లింక్ ఓపెన్ చేయండి.',
        expectedResult: 'A green "Ready" badge with your live domain (e.g. `https://skillnova.vercel.app`).',
        checkpointQuestion: 'Is the live URL running with a secure HTTPS lock icon in the address bar?',
        stuckTips: ['If build fails, read the specific line in the build log: usually an unresolved import or TypeScript error.']
      }
    ]
  },
  {
    id: 'full-workflow-guide',
    toolId: 'full-workflow',
    toolName: 'The Winning Student Workflow',
    title: 'The Complete Hackathon Lifecycle: Idea -> Build -> Version -> Deploy',
    titleTe: 'హ్యాకథాన్ సక్సెస్ వర్క్‌ఫ్లో: ఆలోచన నుండి లైవ్ డిప్లాయ్‌మెంట్ వరకు',
    badge: 'End-to-End Pipeline',
    duration: '30 min masterclass',
    prerequisites: ['Basic familiarity with Git and modern web concepts'],
    whatItIs: 'A battle-tested, zero-confusion engineering workflow designed specifically for student hackathon teams to avoid getting stuck or shipping half-finished projects.',
    whatItIsTe: 'విద్యార్థులు గందరగోళం లేకుండా కొన్ని గంటల్లో పూర్తి ప్రాజెక్ట్ సిద్ధం చేయడానికి అనుసరించాల్సిన ప్రణాళిక.',
    whenToUseIt: 'Use this every time you embark on a hackathon, final-year capstone, or personal portfolio project.',
    whenToUseItTe: 'హ్యాకథాన్లు లేదా ప్రాజెక్ట్ సమర్పణల సమయాల్లో ఇది అనుసరించాలి.',
    safetyNotes: [
      'Do not switch frameworks halfway through a 24-hour hackathon.',
      'Ship an MVP with 2 polished core features rather than 10 broken buttons.'
    ],
    costNotes: 'All tools in this pipeline have generous free tiers suitable for students.',
    officialDocsUrl: 'https://skillnova.dev',
    lastVerifiedAt: '2026-10-14',
    steps: [
      {
        stepNumber: 1,
        title: 'Milestone 1: Scope the MVP & Sketch Architecture',
        instruction: 'Write down: 1 core problem, 1 primary user type, and exactly 3 must-have features. Eliminate nice-to-haves from the initial build.',
        instructionTe: 'ముందుగా 1 ముఖ్య సమస్య, 3 ముఖ్యమైన ఫీచర్లు రాసుకోండి. అదనపు ఫీచర్లను తర్వాతకు వాయిదా వేయండి.',
        copyablePrompt: 'We are building SkillNova: an AI learning platform for BTech students. Core features: 1. Searchable tool directory with honest pricing labels, 2. Visual Step-by-Step build studio, 3. Prompt Lab with markdown export.',
        expectedResult: 'Your team agrees on the exact MVP boundaries.',
        checkpointQuestion: 'Can you describe your project in one sentence to a judge?',
        stuckTips: ['If teammates disagree, choose the feature that can be demoed visually in 60 seconds.']
      },
      {
        stepNumber: 2,
        title: 'Milestone 2: Scaffold with Primary Builder',
        instruction: 'Use Google Antigravity, Replit, or Lovable to scaffold the basic directory structure, UI theme, and routing.',
        instructionTe: 'యాంటీగ్రావిటీ లేదా లవబుల్ ఉపయోగించి ప్రాజెక్ట్ బేస్ స్ట్రక్చర్ మరియు లేఅవుట్ తయారు చేయండి.',
        expectedResult: 'A clean, runnable baseline application with responsive navigation.',
        checkpointQuestion: 'Does `npm run dev` start without any errors?',
        stuckTips: ['Test responsiveness on mobile viewport early before adding complex layouts.']
      },
      {
        stepNumber: 3,
        title: 'Milestone 3: Sync to GitHub & Set Branch Protection',
        instruction: 'Initialize git, push the clean scaffold to GitHub, and share repository access with your teammates.',
        instructionTe: 'కోడ్‌ను గిట్‌హబ్‌కు పుష్ చేసి టీమ్‌మేట్స్‌కు షేర్ చేయండి.',
        expectedResult: 'Repository is backed up safely in the cloud.',
        checkpointQuestion: 'Are all team members added as collaborators?',
        stuckTips: ['Verify `.gitignore` is active before pushing.']
      },
      {
        stepNumber: 4,
        title: 'Milestone 4: Continuous Deployment to Vercel',
        instruction: 'Connect Vercel to your GitHub repo on hour 2 of the hackathon—not hour 23. This guarantees deployment pipeline is tested.',
        instructionTe: 'ప్రాజెక్ట్ ప్రారంభంలోనే వెర్సెల్‌కు కనెక్ట్ చేయండి, తద్వారా చివరి నిమిషంలో డిప్లాయ్‌మెంట్ టెన్షన్ ఉండదు.',
        expectedResult: 'Every git push immediately updates the live URL for judges to test.',
        checkpointQuestion: 'Does pushing a commit trigger a successful build on Vercel?',
        stuckTips: ['Check build output logs if Vercel deployment fails.']
      }
    ]
  }
];
