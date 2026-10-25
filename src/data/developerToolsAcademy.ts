export interface ToolCourseStage {
  stageNumber: number;
  stageName: string; // Understand, Set up, First use, Guided practice, Real-world scenario, Troubleshooting, Independent challenge, Portfolio project
  title: string;
  durationMinutes: number;
  objective: string;
  content: string;
  codeSnippet?: string;
  verificationTip?: string;
}

export interface DeveloperToolCourse {
  id: string;
  slug: string;
  name: string;
  category:
    | 'editor_ide'
    | 'git_github'
    | 'terminal_cli'
    | 'browser_devtools'
    | 'api_tools'
    | 'databases'
    | 'docker_containers'
    | 'design_tools'
    | 'ai_dev_tools'
    | 'build_deploy';
  tagline: string;
  badge: string;
  iconName: string;
  officialUrl: string;
  docsVersion: string;
  lastVerifiedDate: string;
  prerequisites: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  stages: ToolCourseStage[];
  commonMistakes: string[];
  portfolioProjectDeliverable: string;
}

export const developerToolCourses: DeveloperToolCourse[] = [
  // 1. VS CODE & IDE
  {
    id: 'tool-vscode',
    slug: 'vs-code-mastery',
    name: 'VS Code & Professional IDEs',
    category: 'editor_ide',
    tagline: 'Supercharge your coding speed with modern editor navigation, debugger breakpoints, and linter pipelines.',
    badge: 'Essential',
    iconName: 'Code',
    officialUrl: 'https://code.visualstudio.com/docs',
    docsVersion: 'v1.94+',
    lastVerifiedDate: 'October 2026',
    prerequisites: ['Basic computer navigation'],
    difficulty: 'Beginner',
    commonMistakes: [
      'Manually editing files without formatting on save (Prettier)',
      'Ignoring terminal output errors inside the integrated shell',
      'Opening single files instead of root project folders'
    ],
    portfolioProjectDeliverable: 'A customized, keyboard-driven development environment with verified debugging configurations (`.vscode/launch.json`).',
    stages: [
      {
        stageNumber: 1,
        stageName: 'Stage 1 — Understand',
        title: 'What VS Code Is and Where It Fits',
        durationMinutes: 10,
        objective: 'Understand why professional developers use extensible code editors and how language servers work.',
        content: `Visual Studio Code is a lightweight, extensible source-code editor developed by Microsoft. Unlike heavyweight IDEs, it starts fast and uses the **Language Server Protocol (LSP)** to provide autocomplete, type checking, and jump-to-definition.

**Real-World Analogy:**
Think of VS Code as a chef's modular workstation. The core table is sleek and clean; you attach knife racks (extensions), timers (debuggers), and heat controls (integrated terminals) tailored exactly to what dish (project) you are cooking.`
      },
      {
        stageNumber: 2,
        stageName: 'Stage 2 — Set up',
        title: 'Installation & Verification Across Platforms',
        durationMinutes: 15,
        objective: 'Install VS Code, enable the `code` CLI shortcut, and verify workspace settings.',
        content: `Download the installer for your OS from https://code.visualstudio.com.

**Windows Installation:**
Check "Add to PATH" and "Register Code as an editor for supported file types".

**Verification Command:**
Open PowerShell or Terminal and run:
\`\`\`bash
code --version
\`\`\`
If configured correctly, it prints the version number and commit hash.`,
        codeSnippet: 'code --version'
      },
      {
        stageNumber: 3,
        stageName: 'Stage 3 — First use',
        title: 'Workspace Navigation & Essential Shortcuts',
        durationMinutes: 15,
        objective: 'Navigate files, command palette, and integrated terminal.',
        content: `The single most important shortcut in VS Code is the **Command Palette**:
- Windows/Linux: \`Ctrl + Shift + P\`
- macOS: \`Cmd + Shift + P\`

Use \`Ctrl + P\` (\`Cmd + P\`) to quickly open any file by typing its name without touching the file tree. Use \`Ctrl + \`\` to toggle the built-in terminal.`
      },
      {
        stageNumber: 4,
        stageName: 'Stage 4 — Guided practice',
        title: 'Configure Auto-Formatting & Linter Pipeline',
        durationMinutes: 20,
        objective: 'Install Prettier and ESLint, and enable format-on-save in settings.json.',
        content: `Create a \`.vscode/settings.json\` file in your project:
\`\`\`json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "files.autoSave": "onFocusChange"
}
\`\`\``,
        codeSnippet: '{\n  "editor.formatOnSave": true,\n  "editor.defaultFormatter": "esbenp.prettier-vscode"\n}'
      },
      {
        stageNumber: 5,
        stageName: 'Stage 5 — Real-world scenario',
        title: 'Debugging with Breakpoints vs console.log',
        durationMinutes: 25,
        objective: 'Step through application execution with breakpoints, watch expressions, and call stacks.',
        content: `Never rely solely on \`console.log\`! Breakpoints pause code execution right before a line runs, letting you inspect the live memory heap.
Click to the left of any line number to set a red breakpoint circle. Press \`F5\` to start debugging.`
      },
      {
        stageNumber: 6,
        stageName: 'Stage 6 — Troubleshooting',
        title: 'Common Diagnostic Steps',
        durationMinutes: 15,
        objective: 'Resolve "command code not found" and high CPU extensions.',
        content: `**Error:** \`code: command not found\`
**Fix:** In VS Code, press \`Ctrl+Shift+P\`, type \`Shell Command: Install 'code' command in PATH\`, and restart terminal.`
      },
      {
        stageNumber: 7,
        stageName: 'Stage 7 — Independent challenge',
        title: 'Multi-Cursor Editing & Snippets Challenge',
        durationMinutes: 20,
        objective: 'Refactor 10 object keys simultaneously using multi-cursor (`Alt + Click` or `Ctrl + D`).',
        content: 'Select the first instance of a variable and press `Ctrl + D` repeatedly to select subsequent instances and rename them all in unison.'
      },
      {
        stageNumber: 8,
        stageName: 'Stage 8 — Portfolio project',
        title: 'Production `.vscode` Team Workspace Kit',
        durationMinutes: 30,
        objective: 'Package a repeatable project development config for your GitHub portfolio repository.',
        content: 'Include `.vscode/extensions.json` listing recommended project plugins so any teammate cloning your repo gets the exact tooling prompt.'
      }
    ]
  },

  // 2. GIT & GITHUB
  {
    id: 'tool-git',
    slug: 'git-github-workflows',
    name: 'Git Version Control & GitHub',
    category: 'git_github',
    tagline: 'Track every code change, collaborate on branches, review Pull Requests, and resolve merge conflicts like a pro.',
    badge: 'Fundamental',
    iconName: 'GitBranch',
    officialUrl: 'https://git-scm.com/doc',
    docsVersion: 'v2.45+',
    lastVerifiedDate: 'October 2026',
    prerequisites: ['Basic Terminal Commands'],
    difficulty: 'Beginner',
    commonMistakes: [
      'Committing `.env` files with secret API keys',
      'Working directly on the `main` branch without feature branches',
      'Writing meaningless commit messages like "fix" or "update"'
    ],
    portfolioProjectDeliverable: 'A clean GitHub repository featuring conventional commits, feature branch pull requests, and automated review checks.',
    stages: [
      {
        stageNumber: 1,
        stageName: 'Stage 1 — Understand',
        title: 'What Version Control Means & The 3 Git States',
        durationMinutes: 15,
        objective: 'Understand Working Directory, Staging Area (Index), and Commit History (Repository).',
        content: `Git is a distributed version control system. Unlike Google Docs (which auto-saves every keystroke into an undifferentiated timeline), Git requires deliberate snapshots called **Commits**.

**The 3 Stages of Code:**
1. **Working Directory:** Files you are actively typing in.
2. **Staging Area:** Files you marked with \`git add\` ready to be photographed.
3. **Commit History:** Permanent cryptographic snapshot saved in the \`.git\` database.`
      },
      {
        stageNumber: 2,
        stageName: 'Stage 2 — Set up',
        title: 'Configure Your Developer Identity',
        durationMinutes: 10,
        objective: 'Set up global author name and email matching your GitHub profile.',
        content: `Run in your terminal:
\`\`\`bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
git config --global init.defaultBranch main
\`\`\``,
        codeSnippet: 'git config --global user.name "Your Name"'
      },
      {
        stageNumber: 3,
        stageName: 'Stage 3 — First use',
        title: 'Initialize, Stage & Commit',
        durationMinutes: 15,
        objective: 'Run the core 4-step Git loop.',
        content: `\`\`\`bash
git init
git add .
git commit -m "feat(init): initial project scaffold"
git log --oneline
\`\`\``,
        codeSnippet: 'git init && git add . && git commit -m "feat: initial commit"'
      },
      {
        stageNumber: 4,
        stageName: 'Stage 4 — Guided practice',
        title: 'Branches & Non-Destructive Development',
        durationMinutes: 20,
        objective: 'Create feature branches and merge them cleanly into main.',
        content: `Never write experimental code directly on \`main\`!
\`\`\`bash
git checkout -b feature/auth-system
# Make your edits...
git add -A
git commit -m "feat(auth): add login modal validation"
git checkout main
git merge feature/auth-system
\`\`\``
      },
      {
        stageNumber: 5,
        stageName: 'Stage 5 — Real-world scenario',
        title: 'Resolving Merge Conflicts Confidently',
        durationMinutes: 25,
        objective: 'Understand conflict markers (`<<<<<<< HEAD`, `=======`, `>>>>>>>`) and resolve divergent commits.',
        content: `When two developers edit the same line on different branches, Git cannot guess which change is correct. It pauses the merge and places conflict markers in your file. Open the file, keep the correct code, remove the markers, and commit.`
      },
      {
        stageNumber: 6,
        stageName: 'Stage 6 — Troubleshooting',
        title: 'Undoing Mistakes Safely',
        durationMinutes: 15,
        objective: 'Use `git restore`, `git stash`, and understand why `git reset --hard` must be used with caution.',
        content: `To unstage a file accidentally added: \`git restore --staged <file>\`.
To temporarily stash uncommitted work: \`git stash\` and later \`git stash pop\`.`
      },
      {
        stageNumber: 7,
        stageName: 'Stage 7 — Independent challenge',
        title: 'Pull Request Simulation Challenge',
        durationMinutes: 20,
        objective: 'Simulate a peer code review with branch protection and conventional commit messages.',
        content: 'Format commits following Conventional Commits standard: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`.'
      },
      {
        stageNumber: 8,
        stageName: 'Stage 8 — Portfolio project',
        title: 'Production GitHub Profile & Repository Showcase',
        durationMinutes: 30,
        objective: 'Deploy a public repository with an informative README.md, license, and issue templates.',
        content: 'Create a `.github/workflows` directory with automated lint checks on pull requests.'
      }
    ]
  },

  // 3. TERMINAL & CLI
  {
    id: 'tool-terminal',
    slug: 'command-line-mastery',
    name: 'Command Line & Terminal Mastery',
    category: 'terminal_cli',
    tagline: 'Master the developer engine room across Windows PowerShell, macOS zsh, and Linux bash.',
    badge: 'Core Skill',
    iconName: 'Terminal',
    officialUrl: 'https://learn.microsoft.com/en-us/powershell/',
    docsVersion: 'POSIX & PowerShell 7+',
    lastVerifiedDate: 'October 2026',
    prerequisites: ['None'],
    difficulty: 'Beginner',
    commonMistakes: [
      'Using spaces in file and folder names without quotes',
      'Running destructive recursive delete commands (`rm -rf`) without checking paths',
      'Confusing system environment variables with temporary terminal session variables'
    ],
    portfolioProjectDeliverable: 'A custom developer automation shell script for project bootstrapping and health diagnostics.',
    stages: [
      {
        stageNumber: 1,
        stageName: 'Stage 1 — Understand',
        title: 'What the Terminal Is and Why It Matters',
        durationMinutes: 15,
        objective: 'Understand how shells interpret commands, pipes, and environment variables.',
        content: `The terminal (Command Line Interface or CLI) is the direct text conduit to your operating system kernel. Unlike graphical interfaces (GUIs) which hide what is happening, the terminal lets you compose programs together using pipes and automate repetitive tasks.

**Core Concept:**
Every command has 3 standard streams:
1. **stdin:** Standard input (keyboard or piped data)
2. **stdout:** Standard output (terminal screen)
3. **stderr:** Standard error (error logs)`
      },
      {
        stageNumber: 2,
        stageName: 'Stage 2 — Set up',
        title: 'Terminal Setup across Windows, macOS & Linux',
        durationMinutes: 15,
        objective: 'Configure Windows Terminal with PowerShell, or iTerm2/Terminal with zsh.',
        content: `**Cross-Platform Command Equivalents:**
- Print working directory: \`pwd\` (macOS/Linux) | \`Get-Location\` or \`pwd\` (PowerShell)
- List files: \`ls -la\` (POSIX) | \`Get-ChildItem\` or \`ls\` (PowerShell)
- Change directory: \`cd <path>\``
      },
      {
        stageNumber: 3,
        stageName: 'Stage 3 — First use',
        title: 'File System Navigation & Creation',
        durationMinutes: 15,
        objective: 'Create folders, move files, and inspect directory trees.',
        content: `\`\`\`bash
mkdir my-project && cd my-project
touch index.js README.md
ls -la
\`\`\``
      },
      {
        stageNumber: 4,
        stageName: 'Stage 4 — Guided practice',
        title: 'Environment Variables & Node PATH',
        durationMinutes: 20,
        objective: 'Inspect and set environment variables securely in shell sessions.',
        content: `In Linux/macOS: \`export NODE_ENV=development\`
In PowerShell: \`$env:NODE_ENV="development"\`
To print an env variable: \`echo $NODE_ENV\` or \`echo $env:NODE_ENV\`.`
      },
      {
        stageNumber: 5,
        stageName: 'Stage 5 — Real-world scenario',
        title: 'Searching Logs with grep & ripgrep',
        durationMinutes: 20,
        objective: 'Search through thousands of lines of server logs to find crash signatures.',
        content: `\`\`\`bash
grep -i "error" server.log
# In PowerShell:
Get-Content server.log | Select-String "error"
\`\`\``
      },
      {
        stageNumber: 6,
        stageName: 'Stage 6 — Troubleshooting',
        title: 'Killing Rogue Port Processes (Port Already in Use)',
        durationMinutes: 15,
        objective: 'Fix "Error: listen EADDRINUSE: address already in use :::3000".',
        content: `**On Windows:**
\`\`\`powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
\`\`\`
**On macOS/Linux:**
\`\`\`bash
lsof -i :3000
kill -9 <PID>
\`\`\``
      },
      {
        stageNumber: 7,
        stageName: 'Stage 7 — Independent challenge',
        title: 'Pipes & Redirection Automation',
        durationMinutes: 20,
        objective: 'Redirect curl output to a file and count the lines matching a regex pattern.',
        content: 'Use `|` (pipe) to pass stdout from one program directly into the stdin of another program.'
      },
      {
        stageNumber: 8,
        stageName: 'Stage 8 — Portfolio project',
        title: 'Project Initializer Script (`setup.sh` / `setup.ps1`)',
        durationMinutes: 30,
        objective: 'Write an executable script that verifies Node.js, installs npm dependencies, and boots the project.',
        content: 'Verify exit codes (`$?`) to exit with an error code if any prerequisite fails.'
      }
    ]
  },

  // 4. BROWSER DEVTOOLS
  {
    id: 'tool-devtools',
    slug: 'browser-devtools-mastery',
    name: 'Browser DevTools & Web Debugging',
    category: 'browser_devtools',
    tagline: 'Inspect the live DOM, monitor HTTP network traffic, debug JavaScript in the Sources tab, and audit Core Web Vitals.',
    badge: 'Frontend',
    iconName: 'Layout',
    officialUrl: 'https://developer.chrome.com/docs/devtools',
    docsVersion: 'Chrome & Edge DevTools',
    lastVerifiedDate: 'October 2026',
    prerequisites: ['HTML', 'CSS', 'JavaScript Basics'],
    difficulty: 'Beginner',
    commonMistakes: [
      'Not checking the "Network -> Fetch/XHR" tab when API calls fail',
      'Forgetting to toggle "Disable cache" during frontend development',
      'Ignoring browser console CORS rejection errors'
    ],
    portfolioProjectDeliverable: 'A verified Core Web Vitals and accessibility audit report for your portfolio website.',
    stages: [
      {
        stageNumber: 1,
        stageName: 'Stage 1 — Understand',
        title: 'How DevTools Inspects the Living DOM',
        durationMinutes: 10,
        objective: 'Understand the difference between initial HTML response and the living Browser DOM tree.',
        content: 'Press `F12` or `Ctrl + Shift + I` (`Cmd + Option + I` on macOS) to open DevTools. The Elements panel shows what the browser currently rendered after JavaScript executed, not just the static HTML file on disk.'
      },
      {
        stageNumber: 2,
        stageName: 'Stage 2 — Set up',
        title: 'Docking & Device Emulation',
        durationMinutes: 15,
        objective: 'Emulate iPhone, Pixel, and tablet screen sizes to test responsive design.',
        content: 'Click the mobile device icon (`Ctrl + Shift + M`) to toggle responsive design mode. Test portrait, landscape, and touch interactions.'
      },
      {
        stageNumber: 3,
        stageName: 'Stage 3 — First use',
        title: 'The Console Panel & Error Stack Traces',
        durationMinutes: 15,
        objective: 'Read stack traces, expand objects, and use `$0` DOM shortcuts.',
        content: 'In the Elements tab, click any element. In Console, type `$0` — it refers to that exact element in memory!'
      },
      {
        stageNumber: 4,
        stageName: 'Stage 4 — Guided practice',
        title: 'Network Tab & Inspecting API Payloads',
        durationMinutes: 20,
        objective: 'Inspect HTTP status codes, headers, and JSON responses.',
        content: 'Filter by `Fetch/XHR`. Click on `/api/tutor/chat` -> click **Payload** to see what you sent, and **Response** to see what the server returned.'
      },
      {
        stageNumber: 5,
        stageName: 'Stage 5 — Real-world scenario',
        title: 'Diagnosing CORS Rejection & 404s',
        durationMinutes: 20,
        objective: 'Distinguish server crashes (500) from missing routes (404) and cross-origin blocks (CORS).',
        content: 'If the browser shows `Access to fetch has been blocked by CORS policy`, the problem is on the backend missing `Access-Control-Allow-Origin`, not your frontend code!'
      },
      {
        stageNumber: 6,
        stageName: 'Stage 6 — Troubleshooting',
        title: 'Memory Leaks & Detached DOM Nodes',
        durationMinutes: 15,
        objective: 'Inspect memory allocations and event listener leaks.',
        content: 'Use the Memory tab to take heap snapshots before and after unmounting complex components.'
      },
      {
        stageNumber: 7,
        stageName: 'Stage 7 — Independent challenge',
        title: 'Lighthouse Accessibility & Performance Audit',
        durationMinutes: 20,
        objective: 'Run a Lighthouse audit and achieve 95+ score on Performance and Accessibility.',
        content: 'Check color contrast, image dimensions, missing alt tags, and unused JavaScript chunks.'
      },
      {
        stageNumber: 8,
        stageName: 'Stage 8 — Portfolio project',
        title: 'Web Vitals Optimization Report',
        durationMinutes: 30,
        objective: 'Document Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS) improvements.',
        content: 'Include before/after metrics showing asset optimization and lazy loading.'
      }
    ]
  },

  // 5. API TOOLS: POSTMAN & HTTP CLIENTS
  {
    id: 'tool-postman',
    slug: 'api-tools-postman-curl',
    name: 'Postman, cURL & API Testing',
    category: 'api_tools',
    tagline: 'Test REST endpoints, construct JSON payloads, inspect headers, and automate API collection runs.',
    badge: 'Backend',
    iconName: 'Server',
    officialUrl: 'https://learning.postman.com/docs/',
    docsVersion: 'Postman v11+ & cURL',
    lastVerifiedDate: 'October 2026',
    prerequisites: ['HTTP Basics', 'JSON'],
    difficulty: 'Intermediate',
    commonMistakes: [
      'Forgetting to send `Content-Type: application/json` header in POST requests',
      'Hardcoding auth tokens instead of using environment variables',
      'Confusing query parameters (`?key=val`) with URL path parameters (`/items/:id`)'
    ],
    portfolioProjectDeliverable: 'An exported Postman Collection (`collection.json`) with automated pre-request scripts and assertions.',
    stages: [
      {
        stageNumber: 1,
        stageName: 'Stage 1 — Understand',
        title: 'How HTTP APIs Work (Request/Response Model)',
        durationMinutes: 10,
        objective: 'Understand HTTP verbs (GET, POST, PUT, DELETE, PATCH) and status codes (2xx, 4xx, 5xx).',
        content: `APIs (Application Programming Interfaces) allow applications to communicate.
- **GET:** Read data without side effects.
- **POST:** Create new resources or execute actions.
- **PUT/PATCH:** Update existing resources.
- **DELETE:** Remove resources.`
      },
      {
        stageNumber: 2,
        stageName: 'Stage 2 — Set up',
        title: 'Install Postman & Verify cURL',
        durationMinutes: 15,
        objective: 'Verify terminal cURL and set up Postman workspace.',
        content: 'Run `curl --version` in terminal. Both Windows and POSIX systems include curl out-of-the-box.'
      },
      {
        stageNumber: 3,
        stageName: 'Stage 3 — First use',
        title: 'Send Your First GET Request',
        durationMinutes: 15,
        objective: 'Query `/api/health` and verify 200 OK status.',
        content: 'In Postman, select GET -> enter `http://localhost:3001/api/health` -> click **Send**.'
      },
      {
        stageNumber: 4,
        stageName: 'Stage 4 — Guided practice',
        title: 'POST Requests with JSON Bodies',
        durationMinutes: 20,
        objective: 'Send a structured POST payload to `/api/tutor/chat`.',
        content: `Set method to POST -> Headers -> \`Content-Type: application/json\`.
Body -> raw -> JSON:
\`\`\`json
{
  "message": "Explain binary search",
  "level": "beginner",
  "mode": "explain_concept"
}
\`\`\``
      },
      {
        stageNumber: 5,
        stageName: 'Stage 5 — Real-world scenario',
        title: 'Bearer Token Authentication Flow',
        durationMinutes: 20,
        objective: 'Capture an auth token from `/api/auth/login` and inject it into protected requests.',
        content: 'Use Postman Tests tab: `pm.environment.set("jwt_token", pm.response.json().token);`'
      },
      {
        stageNumber: 6,
        stageName: 'Stage 6 — Troubleshooting',
        title: 'Debugging 400 Bad Request & 401 Unauthorized',
        durationMinutes: 15,
        objective: 'Diagnose malformed JSON strings and expired token headers.',
        content: 'Verify JSON syntax: valid keys must use double quotes `"key"`, trailing commas are illegal in standard JSON.'
      },
      {
        stageNumber: 7,
        stageName: 'Stage 7 — Independent challenge',
        title: 'Automated Postman Test Assertions',
        durationMinutes: 20,
        objective: 'Write JavaScript assertions checking `pm.response.to.have.status(200)` and response schema.',
        content: 'Verify response latency is under 500ms using `pm.expect(pm.response.responseTime).to.be.below(500);`'
      },
      {
        stageNumber: 8,
        stageName: 'Stage 8 — Portfolio project',
        title: 'Production API Test Suite Export',
        durationMinutes: 30,
        objective: 'Export a complete API collection covering all CRUD operations with positive and negative test cases.',
        content: 'Include tests for boundary conditions, invalid inputs, and authentication failures.'
      }
    ]
  },

  // 6. AI DEV TOOLS: META MODEL API & OLLAMA
  {
    id: 'tool-ai-dev',
    slug: 'meta-model-api-ai-tools',
    name: 'Meta Model API, Muse & AI SDKs',
    category: 'ai_dev_tools',
    tagline: 'Build real-world AI applications with Meta Model API (Muse Spark), local open-weight models with Ollama, and structured JSON schemas.',
    badge: 'AI Specialization',
    iconName: 'Bot',
    officialUrl: 'https://dev.meta.ai/docs/overview',
    docsVersion: 'Meta Model API v1 & Ollama',
    lastVerifiedDate: 'October 2026',
    prerequisites: ['HTTP APIs', 'JavaScript or Python'],
    difficulty: 'Advanced',
    commonMistakes: [
      'Exposing `MODEL_API_KEY` in frontend client code',
      'Treating raw LLM generated text as guaranteed runnable code without tests',
      'Ignoring token context limits and rate-limit retry headers'
    ],
    portfolioProjectDeliverable: 'A working full-stack AI coding assistant that generates structured JSON responses and unit tests via Meta Model API or local Ollama.',
    stages: [
      {
        stageNumber: 1,
        stageName: 'Stage 1 — Understand',
        title: 'How Modern Model APIs Work',
        durationMinutes: 15,
        objective: 'Understand the difference between local weights, inference endpoints, and prompt engineering.',
        content: `Meta's Model API provides high-efficiency inference endpoints for models like **Muse Spark** (\`muse-spark-1.3\`) and Meta Llama architectures.
Unlike training an LLM from scratch (which costs millions of dollars in GPU clusters), you interact with trained weights via an HTTP inference API using standardized message objects (\`role: system | user | assistant\`).`
      },
      {
        stageNumber: 2,
        stageName: 'Stage 2 — Set up',
        title: 'Configuring `MODEL_API_KEY` & Endpoint',
        durationMinutes: 15,
        objective: 'Configure environment variables and initialize the official or OpenAI-compatible client.',
        content: `Endpoint: \`https://api.meta.ai/v1\`
Environment variable: \`MODEL_API_KEY\`
Default model: \`muse-spark-1.3\`

In \`.env\`:
\`\`\`env
MODEL_API_KEY=your_meta_model_api_key_here
META_MODEL_BASE_URL=https://api.meta.ai/v1
\`\`\``
      },
      {
        stageNumber: 3,
        stageName: 'Stage 3 — First use',
        title: 'Making Your First Chat Completion Call',
        durationMinutes: 20,
        objective: 'Send a structured prompt with system instructions and parse generated code.',
        content: `\`\`\`javascript
const res = await fetch('https://api.meta.ai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${process.env.MODEL_API_KEY}\`
  },
  body: JSON.stringify({
    model: 'muse-spark-1.3',
    messages: [
      { role: 'system', content: 'You are an expert software tutor. Output clean TypeScript.' },
      { role: 'user', content: 'Write a binary search function.' }
    ],
    temperature: 0.2
  })
});
\`\`\``
      },
      {
        stageNumber: 4,
        stageName: 'Stage 4 — Guided practice',
        title: 'Structured Output with JSON Schema',
        durationMinutes: 25,
        objective: 'Enforce valid JSON output from models to eliminate formatting errors.',
        content: 'Instruct the model with a strict JSON contract, and parse with `JSON.parse()` inside a `try...catch` block.'
      },
      {
        stageNumber: 5,
        stageName: 'Stage 5 — Real-world scenario',
        title: 'Local AI with Ollama (Zero Cost & Private)',
        durationMinutes: 25,
        objective: 'Run local open-weight coding models on your own machine without sending data to third parties.',
        content: `Install Ollama from https://ollama.ai.
Run in terminal:
\`\`\`bash
ollama run qwen2.5-coder:7b
\`\`\`
Ollama exposes a local HTTP API on \`http://localhost:11434/api/chat\` that accepts standard JSON requests!`
      },
      {
        stageNumber: 6,
        stageName: 'Stage 6 — Troubleshooting',
        title: 'Handling 429 Rate Limits & Timeouts',
        durationMinutes: 15,
        objective: 'Implement exponential backoff and graceful fallback to offline knowledge bases.',
        content: 'When an AI provider returns 429 or 503, fail over smoothly to cached responses or deterministic fallback engines.'
      },
      {
        stageNumber: 7,
        stageName: 'Stage 7 — Independent challenge',
        title: 'Automated Code Review Agent',
        durationMinutes: 25,
        objective: 'Build a utility that reads a git diff and flags potential bugs, security vulnerabilities, and code smells.',
        content: 'Test the agent against sample pull request diffs.'
      },
      {
        stageNumber: 8,
        stageName: 'Stage 8 — Portfolio project',
        title: 'Full-Stack Multi-Model Assistant',
        durationMinutes: 40,
        objective: 'Integrate Meta Model API and Ollama into a production-grade web application with model switching.',
        content: 'Display model token metrics, latency, and provider attribution in the user interface.'
      }
    ]
  },

  // 7. DOCKER & CONTAINERS
  {
    id: 'tool-docker',
    slug: 'docker-container-fundamentals',
    name: 'Docker & Containerization',
    category: 'docker_containers',
    tagline: 'Package applications into reproducible, isolated containers that run identically anywhere.',
    badge: 'DevOps',
    iconName: 'Box',
    officialUrl: 'https://docs.docker.com/',
    docsVersion: 'Docker Engine v27+',
    lastVerifiedDate: 'October 2026',
    prerequisites: ['Terminal Basics', 'Git'],
    difficulty: 'Intermediate',
    commonMistakes: [
      'Copying `node_modules` into the Docker build context instead of using `.dockerignore`',
      'Running containers as root user instead of dedicated unprivileged users',
      'Creating monolithic images without multi-stage builds'
    ],
    portfolioProjectDeliverable: 'A multi-stage Dockerfile and `docker-compose.yml` deploying a full-stack Node.js + database application.',
    stages: [
      {
        stageNumber: 1,
        stageName: 'Stage 1 — Understand',
        title: 'What Containers Are vs Virtual Machines',
        durationMinutes: 15,
        objective: 'Understand how Linux namespaces, cgroups, and layer caching make containers fast.',
        content: `A container is a standard unit of software that packages up code and all its dependencies so the application runs quickly and reliably from one computing environment to another.
Unlike Virtual Machines (which package an entire heavy OS kernel), containers share the host OS kernel and run as lightweight isolated processes.`
      },
      {
        stageNumber: 2,
        stageName: 'Stage 2 — Set up',
        title: 'Install Docker Desktop & Verify Daemon',
        durationMinutes: 15,
        objective: 'Verify Docker daemon is active and run the hello-world container.',
        content: `Run in terminal:
\`\`\`bash
docker --version
docker run hello-world
\`\`\``
      },
      {
        stageNumber: 3,
        stageName: 'Stage 3 — First use',
        title: 'Writing a Multi-Stage Dockerfile',
        durationMinutes: 20,
        objective: 'Write a lean Node.js production Dockerfile.',
        content: `\`\`\`dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
USER node
EXPOSE 3000
CMD ["node", "dist/server/index.js"]
\`\`\``
      },
      {
        stageNumber: 4,
        stageName: 'Stage 4 — Guided practice',
        title: 'Build, Tag & Run Containers',
        durationMinutes: 20,
        objective: 'Map ports, mount environment variables, and inspect logs.',
        content: `\`\`\`bash
docker build -t skillnova-app .
docker run -d -p 3000:3000 --name skillnova-live skillnova-app
docker logs skillnova-live
docker ps
\`\`\``
      },
      {
        stageNumber: 5,
        stageName: 'Stage 5 — Real-world scenario',
        title: 'Multi-Service Orchestration with Docker Compose',
        durationMinutes: 25,
        objective: 'Spin up an application, Redis cache, and PostgreSQL database with one command.',
        content: 'Use `docker compose up -d` with health checks and network bridge isolation.'
      },
      {
        stageNumber: 6,
        stageName: 'Stage 6 — Troubleshooting',
        title: 'Fixing Container Exit Codes & OOM Kills',
        durationMinutes: 15,
        objective: 'Inspect `docker inspect` for exit code 137 (Out of Memory) and volume permission issues.',
        content: 'Set memory limits: `docker run --memory="512m" ...` to test container behavior under memory pressure.'
      },
      {
        stageNumber: 7,
        stageName: 'Stage 7 — Independent challenge',
        title: 'Minimize Docker Image Size Challenge',
        durationMinutes: 20,
        objective: 'Reduce an image from 1.2 GB to under 150 MB using Alpine base and multi-stage builds.',
        content: 'Inspect layer sizes using `docker history <image-id>`.'
      },
      {
        stageNumber: 8,
        stageName: 'Stage 8 — Portfolio project',
        title: 'Production Containerized Architecture Deployment',
        durationMinutes: 30,
        objective: 'Write automated GitHub Action that builds, tests, and publishes the container image to a registry.',
        content: 'Implement zero-downtime container rolling restart strategy.'
      }
    ]
  },

  // 8. BUILD & DEPLOY: VITE, VERCEL & CI/CD
  {
    id: 'tool-deploy',
    slug: 'build-deploy-vite-vercel',
    name: 'Build Tools, Vercel & CI/CD Workflows',
    category: 'build_deploy',
    tagline: 'Bundle production assets with Vite, configure serverless edge routes, and automate continuous delivery on Vercel.',
    badge: 'Deployment',
    iconName: 'Cloud',
    officialUrl: 'https://vercel.com/docs',
    docsVersion: 'Vercel CLI & Vite 8+',
    lastVerifiedDate: 'October 2026',
    prerequisites: ['Git & GitHub', 'Node.js'],
    difficulty: 'Intermediate',
    commonMistakes: [
      'Checking secret `.env` files into public GitHub repos',
      'Forgetting SPA rewrite routing rules in `vercel.json` (causing 404s on reload)',
      'Failing to run `npm run build` locally before pushing to production'
    ],
    portfolioProjectDeliverable: 'A live production deployment connected to a custom domain with automated GitHub Actions CI/CD checks.',
    stages: [
      {
        stageNumber: 1,
        stageName: 'Stage 1 — Understand',
        title: 'How Frontend Bundlers & Serverless Clouds Work',
        durationMinutes: 15,
        objective: 'Understand how Vite compiles TypeScript and JSX into static assets, and how Vercel serves edge functions.',
        content: `During development, **Vite** serves native ES modules over HTTP, providing instant Hot Module Replacement (HMR).
For production, it runs **Rollup/esbuild** to minify, tree-shake, and chunk your code into tiny bundles.
**Vercel** distributes static assets across a global CDN and compiles backend functions in the \`api/\` folder into auto-scaling serverless edge functions.`
      },
      {
        stageNumber: 2,
        stageName: 'Stage 2 — Set up',
        title: 'Install Vercel CLI & Verify Auth',
        durationMinutes: 10,
        objective: 'Log in to Vercel via CLI and link your project.',
        content: `\`\`\`bash
npm i -g vercel
vercel login
vercel link
\`\`\``
      },
      {
        stageNumber: 3,
        stageName: 'Stage 3 — First use',
        title: 'Configuring `vercel.json` for Full-Stack Parity',
        durationMinutes: 15,
        objective: 'Configure SPA fallbacks and API serverless routes.',
        content: `\`\`\`json
{
  "version": 2,
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
\`\`\``
      },
      {
        stageNumber: 4,
        stageName: 'Stage 4 — Guided practice',
        title: 'Testing Production Build Locally',
        durationMinutes: 15,
        objective: 'Catch TypeScript and bundling errors before pushing to git.',
        content: `Always run:
\`\`\`bash
npm run build
npm run preview
\`\`\`
This compiles TypeScript (\`tsc -b\`) and bundles assets into \`dist/\`, ensuring 0 build errors exist.`
      },
      {
        stageNumber: 5,
        stageName: 'Stage 5 — Real-world scenario',
        title: 'Zero-Downtime Auto-Deploy from GitHub',
        durationMinutes: 20,
        objective: 'Connect git commits on `main` to automatic cloud builds and preview URLs for pull requests.',
        content: 'Every pull request gets an isolated preview URL (`https://project-git-branch.vercel.app`) to test changes before merging to production.'
      },
      {
        stageNumber: 6,
        stageName: 'Stage 6 — Troubleshooting',
        title: 'Diagnosing Vercel Build Failures & Serverless Timeouts',
        durationMinutes: 15,
        objective: 'Read Vercel build logs, fix missing environment variables, and manage execution limits.',
        content: 'Check **Deployments** -> Click failed commit -> Read the build log. If an env variable is missing, add it in **Project Settings -> Environment Variables**.'
      },
      {
        stageNumber: 7,
        stageName: 'Stage 7 — Independent challenge',
        title: 'Automated GitHub Actions CI Pipeline',
        durationMinutes: 20,
        objective: 'Write a `.github/workflows/ci.yml` file that runs linter and unit tests on every commit.',
        content: 'Block pull request merging if `npm test` fails.'
      },
      {
        stageNumber: 8,
        stageName: 'Stage 8 — Portfolio project',
        title: 'Production Deployment Showcase',
        durationMinutes: 25,
        objective: 'Deploy a verified full-stack project with live `/api/health` monitoring and a custom domain.',
        content: 'Include deployment badges in your README.md showing build status and uptime.'
      }
    ]
  },

  // 9. DATABASES & SQL STUDIO (PostgreSQL & Supabase)
  {
    id: 'tool-databases',
    slug: 'databases-sql-supabase-mastery',
    name: 'Databases, PostgreSQL & Supabase Studio',
    category: 'databases',
    tagline: 'Design relational schemas, write ACID queries, execute migrations, and manage cloud PostgreSQL with Supabase.',
    badge: 'Backend Core',
    iconName: 'Database',
    officialUrl: 'https://supabase.com/docs',
    docsVersion: 'PostgreSQL 16 / Supabase 2.0',
    lastVerifiedDate: '2026-10-25',
    prerequisites: ['Basic CLI knowledge', 'Understanding of tables and primary keys'],
    difficulty: 'Intermediate',
    commonMistakes: [
      'Missing indexes on frequently joined foreign key columns causing O(N) table scans.',
      'Performing unindexed DELETE or UPDATE without a WHERE clause in production.'
    ],
    portfolioProjectDeliverable: 'Multi-table normalized database schema with migration scripts and Row Level Security policies.',
    stages: [
      {
        stageNumber: 1,
        stageName: 'Stage 1 — Understand the tool',
        title: 'Relational Database Architecture & SQL Concepts',
        durationMinutes: 15,
        objective: 'Understand tables, schemas, relations, transactions, and why PostgreSQL powers modern tech stacks.',
        content: 'Relational databases store structured records with mathematical integrity guarantees (ACID). SQL is the declarative lingua franca for querying.'
      },
      {
        stageNumber: 2,
        stageName: 'Stage 2 — Set up & install',
        title: 'Connecting to Cloud PostgreSQL on Supabase',
        durationMinutes: 15,
        objective: 'Configure your connection URI and initialize Supabase client with project keys.',
        content: 'Set `SUPABASE_URL` and `SUPABASE_ANON_KEY` in your environment. Run `npx supabase init` to scaffold local migrations.',
        codeSnippet: `npm install @supabase/supabase-js\n# Initialize local client\nexport SUPABASE_URL="https://mrkliptezsamhesupczo.supabase.co"`
      },
      {
        stageNumber: 3,
        stageName: 'Stage 3 — First hands-on use',
        title: 'DDL: Tables, Types, and Constraints',
        durationMinutes: 20,
        objective: 'Write clean schema definitions with foreign keys and cascade rules.',
        content: 'Define tables with UUID primary keys, timestamp tracking, and unique constraints.',
        codeSnippet: `CREATE TABLE profiles (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  email TEXT UNIQUE NOT NULL,\n  full_name TEXT NOT NULL,\n  created_at TIMESTAMPTZ DEFAULT now()\n);`
      },
      {
        stageNumber: 4,
        stageName: 'Stage 4 — Guided practice',
        title: 'DML Queries: Joins, Aggregations, and Grouping',
        durationMinutes: 25,
        objective: 'Write multi-table INNER JOIN, LEFT JOIN, and aggregation queries with GROUP BY and HAVING.',
        content: 'Query users along with their completed lessons count using indexed relational joins.',
        codeSnippet: `SELECT p.full_name, COUNT(e.id) as total_enrolled\nFROM profiles p\nLEFT JOIN enrollments e ON p.id = e.student_id\nGROUP BY p.id, p.full_name\nHAVING COUNT(e.id) > 0;`
      },
      {
        stageNumber: 5,
        stageName: 'Stage 5 — Real-world scenario',
        title: 'Database Transactions & Row-Level Security (RLS)',
        durationMinutes: 25,
        objective: 'Implement secure multi-tenant access policies using Supabase RLS.',
        content: 'Ensure users can only view and mutate their own profile data using Supabase `auth.uid()`.',
        codeSnippet: `ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;\nCREATE POLICY "Users can edit own profile"\nON profiles FOR UPDATE\nUSING (auth.uid() = id);`
      },
      {
        stageNumber: 6,
        stageName: 'Stage 6 — Troubleshooting',
        title: 'Query Plan Optimization & EXPLAIN ANALYZE',
        durationMinutes: 20,
        objective: 'Identify sequential table scans and create B-Tree indexes on foreign keys.',
        content: 'Run `EXPLAIN ANALYZE` on sluggish queries. If you spot `Seq Scan` on large tables, add an index.',
        codeSnippet: `CREATE INDEX idx_enrollments_student ON enrollments(student_id);\nEXPLAIN ANALYZE SELECT * FROM enrollments WHERE student_id = '123';`
      },
      {
        stageNumber: 7,
        stageName: 'Stage 7 — Independent challenge',
        title: 'Audit Logging Trigger Implementation',
        durationMinutes: 25,
        objective: 'Create a PostgreSQL trigger function that automatically updates `updated_at` timestamps on row mutation.',
        content: 'Write a PL/pgSQL function triggered `BEFORE UPDATE` on target tables.'
      },
      {
        stageNumber: 8,
        stageName: 'Stage 8 — Portfolio project',
        title: 'Production Migration Suite',
        durationMinutes: 30,
        objective: 'Export a verified migration directory with idempotent schemas, seed data, and RLS policies.',
        content: 'Check migrations into version control and automate execution during CI deployment.'
      }
    ]
  },

  // 10. FIGMA TO CODE & DESIGN SYSTEMS
  {
    id: 'tool-figma',
    slug: 'figma-to-production-code',
    name: 'Figma to Code & Design System Tokens',
    category: 'design_tools',
    tagline: 'Translate UI mockups into responsive, accessible Tailwind CSS components with design tokens and auto-layout precision.',
    badge: 'UI/UX Engineering',
    iconName: 'Layout',
    officialUrl: 'https://help.figma.com/hc/en-us/categories/360002051613-Dev-Mode',
    docsVersion: 'Figma Dev Mode 2026',
    lastVerifiedDate: '2026-10-25',
    prerequisites: ['HTML5 & Modern CSS', 'Tailwind CSS basics'],
    difficulty: 'Beginner',
    commonMistakes: [
      'Hardcoding fixed pixel widths instead of flexible percentage or clamp() layouts.',
      'Ignoring semantic HTML elements and WCAG 2.1 color contrast ratios.'
    ],
    portfolioProjectDeliverable: 'Pixel-perfect, responsive component library built with Tailwind CSS and CSS variable tokens.',
    stages: [
      {
        stageNumber: 1,
        stageName: 'Stage 1 — Understand the tool',
        title: 'Figma Dev Mode & Design-to-Code Fundamentals',
        durationMinutes: 15,
        objective: 'Navigate Figma frames, inspect CSS box-model properties, and understand Auto-Layout vs Flexbox.',
        content: 'Figma Auto-Layout maps directly to CSS Flexbox: direction (row/column), gap (space-between/fixed), and padding.'
      },
      {
        stageNumber: 2,
        stageName: 'Stage 2 — Set up & install',
        title: 'Design Token Extraction & Configuration',
        durationMinutes: 15,
        objective: 'Configure Tailwind CSS tokens matching brand color palettes, fonts, and spacing scales.',
        content: 'Export color hex codes and font families into Tailwind `@theme` or CSS root variables.'
      },
      {
        stageNumber: 3,
        stageName: 'Stage 3 — First hands-on use',
        title: 'Inspecting Typography & Spacing in Dev Mode',
        durationMinutes: 15,
        objective: 'Inspect line-height, letter-spacing, and element padding, translating values to Tailwind classes.',
        content: 'Map 16px font-size with 24px line-height to `text-base/relaxed`, and 8px border-radius to `rounded-lg`.'
      },
      {
        stageNumber: 4,
        stageName: 'Stage 4 — Guided practice',
        title: 'Building a Responsive Card with Auto-Layout Mapping',
        durationMinutes: 20,
        objective: 'Code an interactive learning card matching a Figma design spec with hover states.',
        content: 'Implement flex containers, badge chips, and call-to-action buttons with accessible contrast.'
      },
      {
        stageNumber: 5,
        stageName: 'Stage 5 — Real-world scenario',
        title: 'Dark Mode & Theme Token System',
        durationMinutes: 20,
        objective: 'Implement seamless light and dark mode variants using semantic CSS tokens.',
        content: 'Ensure all background surfaces and text colors adapt cleanly between light and dark themes.'
      },
      {
        stageNumber: 6,
        stageName: 'Stage 6 — Troubleshooting',
        title: 'Fixing Responsive Breakpoint Collapses',
        durationMinutes: 20,
        objective: 'Debug layout overflow and squished elements on mobile viewport widths.',
        content: 'Apply `flex-col sm:flex-row`, `min-w-0`, and `truncate` to prevent horizontal scrollbars on mobile screens.'
      },
      {
        stageNumber: 7,
        stageName: 'Stage 7 — Independent challenge',
        title: 'Interactive Modal Component Implementation',
        durationMinutes: 25,
        objective: 'Code a Figma dialog modal with focus trapping, backdrop blur, and smooth entrance animation.',
        content: 'Support keyboard navigation (Escape to close, Tab to cycle focusable elements).'
      },
      {
        stageNumber: 8,
        stageName: 'Stage 8 — Portfolio project',
        title: 'Design System Component Library Showcase',
        durationMinutes: 30,
        objective: 'Publish an accessible component showcase page with buttons, cards, inputs, and alerts.',
        content: 'Demonstrate strict fidelity to Figma design tokens with 100% responsive responsiveness.'
      }
    ]
  }
];

export const developerToolsCourses = developerToolCourses;
export type DevToolCourse = DeveloperToolCourse;
export type ToolLessonStage = ToolCourseStage;
