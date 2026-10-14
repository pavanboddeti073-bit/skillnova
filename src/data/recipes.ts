import { BuildRecipe } from '../types';

export const buildRecipes: BuildRecipe[] = [
  {
    id: 'recipe-presentation',
    slug: 'presentation',
    title: 'Build a Winning Presentation (PPT)',
    titleTe: 'అద్భుతమైన పవర్ పాయింట్ ప్రెజెంటేషన్ (PPT) తయారు చేయండి',
    shortDescription: 'From a rough class topic or seminar idea to a coherent 8-slide deck with structured outline, speaker notes, and Canva/Gamma prompts.',
    shortDescriptionTe: 'ఏదైనా కాలేజ్ లేదా సెమినార్ టాపిక్ నుండి చక్కటి స్లైడ్స్, స్పీకర్ నోట్స్ మరియు సరైన విజువల్స్ ఎలా తయారు చేయాలో నేర్చుకోండి.',
    durationEstimate: '20-30 mins',
    targetAudience: 'College students, seminar presenters, hackathon pitch teams',
    targetDeliverable: 'An 8-slide presentation with clear narrative arc, concise bullets (max 4 per slide), visual suggestions, and verified citations.',
    visualReferenceNote: 'Reference slide wireframe showing recommended 16:9 layout hierarchy (Header, 3-card key takeaways, footer citation).',
    recommendedTools: [
      {
        name: 'Canva Magic Studio',
        why: 'Best for drag-and-drop customizable visual layouts and PDF/PPTX export.',
        freeTierNote: 'Free tier with thousands of templates; free Canva for Education for students.',
        url: 'https://canva.com'
      },
      {
        name: 'Gamma App',
        why: 'Fastest AI text-to-presentation generator that formats notes into slides in seconds.',
        freeTierNote: '400 free AI credits on sign up with watermark; exports to PDF & PPTX.',
        url: 'https://gamma.app'
      },
      {
        name: 'Microsoft PowerPoint / Google Slides',
        why: 'Industry standard for classroom projectors and final formatting control.',
        freeTierNote: 'Google Slides is 100% free; Microsoft 365 student license often free through university.',
        url: 'https://slides.google.com'
      }
    ],
    prerequisites: ['Presentation topic', 'Target audience/class name', 'Presentation time limit (e.g. 5-7 mins)'],
    steps: [
      {
        stepNumber: 1,
        title: 'Define the Objective & Outline Structure',
        titleTe: 'లక్ష్యం మరియు స్లైడ్ అవుట్‌లైన్ నిర్ణయించడం',
        whatWeAreDoing: 'Creating an 8-slide narrative outline so your presentation tells a compelling story instead of an overwhelming data dump.',
        actionInstruction: 'Copy the prompt below into the Prompt Lab, customize your topic and class, and generate your slide-by-slide outline.',
        actionInstructionTe: 'క్రింది ప్రాంప్ట్‌ను కాపీ చేసి మీ టాపిక్ వివరాలను భర్తీ చేసి ప్రెజెంటేషన్ అవుట్‌లైన్ రూపొందించండి.',
        visualType: 'slide-layout',
        visualData: {
          layout: 'outline-tree',
          title: '8-Slide Standard Academic Arc',
          slides: [
            '1. Title & Team',
            '2. The Core Problem / Motivation',
            '3. Current Limitations',
            '4. Proposed Solution / Concept',
            '5. Architecture & How it Works',
            '6. Key Benefits & Real Impact',
            '7. Future Scope & Limitations',
            '8. Conclusion & References'
          ]
        },
        copyablePrompt: 'Act as an expert academic presentation coach. I need to prepare an 8-slide presentation on "[INSERT TOPIC HERE]" for [INSERT TARGET AUDIENCE: e.g. 3rd-year engineering students and professor]. Time limit: 6 minutes.\n\nGenerate a structured outline for each of the 8 slides with:\n- Slide Title\n- Key Message (1 sentence)\n- 3 concise bullet points (under 12 words each)\n- Suggested visual or diagram\n- Speaker notes (2-3 sentences to say aloud)\n- Fact/source placeholder to verify',
        promptWhy: 'Forcing a 12-word bullet limit prevents cluttered slides that audiences cannot read.',
        promptPersonalize: 'Replace [INSERT TOPIC HERE] with your actual topic (e.g. "Edge AI in Healthcare Devices") and audience.',
        expectedResult: 'A clean 8-slide structured plan with clear bullet points and speaker talking points.',
        checkpoint: 'Do you have an 8-slide breakdown where each slide has a distinct purpose and concise bullets?',
        stuckTips: [
          {
            symptom: 'The outline gave too much technical jargon',
            fix: 'Add the constraint: "Explain using simple analogies suitable for first-year college students."'
          },
          {
            symptom: 'Too many slides generated',
            fix: 'Specify: "Strictly adhere to exactly 8 slides, no more, no less."'
          }
        ]
      },
      {
        stepNumber: 2,
        title: 'Generate Visual Deck in Gamma or Canva',
        titleTe: 'గామా లేదా కాన్వాలో స్లైడ్స్ జనరేట్ చేయడం',
        whatWeAreDoing: 'Transferring your refined outline into an AI presentation tool to create visual cards with high-contrast typography.',
        actionInstruction: 'Open gamma.app or canva.com. Choose "Presentation (16:9)" -> "Generate with AI" or paste the slide-by-slide text into individual cards.',
        actionInstructionTe: 'gamma.app లేదా canva.com ఓపెన్ చేసి, రూపొందించిన అవుట్‌లైన్‌ను పేస్ట్ చేయండి.',
        visualType: 'wireframe',
        visualData: {
          wireframeType: 'slide-card',
          title: 'Card Layout: 16:9 Ratio',
          components: ['Top Header (Bold 24pt)', 'Left: 3 Bullet Takeaways with Icons', 'Right: Visual Graphic or Diagram Box', 'Bottom: Source Reference (Small 10pt)']
        },
        copyablePrompt: 'Create a clean, modern presentation theme: Slate dark-blue background, crisp white headings, emerald green accent highlights. Use sans-serif typography, generous padding, and 3-card comparison grids.',
        promptWhy: 'High contrast and generous whitespace ensure text is legible from the back row of an auditorium or on low-contrast classroom projectors.',
        promptPersonalize: 'You can change the background color preference to "Clean White Minimalist" if your university prefers light themes.',
        expectedResult: 'Visual slides populated with your content, styled with clean cards and typography.',
        checkpoint: 'Are all text elements easy to read with high contrast against the background?',
        stuckTips: [
          {
            symptom: 'Gamma exhausted free AI credits',
            fix: 'Switch to Canva (free student tier) or Google Slides and paste the slides manually using standard templates.',
            docLink: 'https://canva.com'
          }
        ]
      },
      {
        stepNumber: 3,
        title: 'Fact-Check, Speaker Notes & Final Export',
        titleTe: 'నిజాలు సరిచూడటం, స్పీకర్ నోట్స్ మరియు ఎగుమతి (Export)',
        whatWeAreDoing: 'Verifying every metric, ensuring references exist, rehearsing speaker notes, and exporting to PPTX and PDF.',
        actionInstruction: 'Check each statistic or technical claim against official documentation. Click "Export" -> "Download as PowerPoint (.pptx)" and "Download as PDF" for backup.',
        actionInstructionTe: 'ప్రతి స్లైడ్‌లోని సమాచారాన్ని ధృవీకరించండి. చివరగా PPTX లేదా PDF ఫార్మాట్‌లో డౌన్‌లోడ్ చేసుకోండి.',
        visualType: 'table',
        visualData: {
          headers: ['Slide #', 'Key Concept', 'Speaker Time', 'Verified Status'],
          rows: [
            ['Slide 1', 'Title & Intro', '0:45 min', 'Self Verified'],
            ['Slide 2-3', 'Problem & Motivation', '1:30 min', 'Cited from Paper'],
            ['Slide 4-5', 'Proposed System', '2:00 min', 'Diagram Checked'],
            ['Slide 6-7', 'Impact & Future', '1:15 min', 'Verified'],
            ['Slide 8', 'Q&A / References', '0:30 min', 'Official Links Listed']
          ]
        },
        copyablePrompt: 'Review these 8 slides and identify any statistical claims, technical assertions, or dates that must be verified against academic or official primary sources.',
        promptWhy: 'Prevents embarrassing questions during academic seminar Q&A sessions.',
        promptPersonalize: 'Include any specific research paper citations you are basing your seminar on.',
        expectedResult: 'Two files saved locally: `.pptx` for editing and `.pdf` for guaranteed presentation rendering on any classroom computer.',
        checkpoint: 'Do you have both `.pptx` and `.pdf` files downloaded and opening properly?',
        stuckTips: [
          {
            symptom: 'Classroom computer doesn\'t have the custom fonts installed',
            fix: 'Always present using the exported PDF version in full-screen mode (Ctrl+L) to guarantee fonts never break.'
          }
        ]
      }
    ],
    finalChecklist: [
      'Every slide has a clear 1-line key takeaway.',
      'No slide has more than 4 bullet points.',
      'Fonts are legible (minimum 18pt for body, 28pt for titles).',
      'All statistics have source citations noted in small text.',
      'Speaker notes are written for each slide.',
      'PDF backup is saved on a USB drive and Google Drive.'
    ],
    exportTemplate: `# Presentation Outline: [Topic Title]\n\n## Slide 1: Title\n- Title: [Your Topic]\n- Subtitle: [One line summary]\n- Presenter: [Name, Roll No, Department]\n\n## Slide 2: Problem Statement\n- Key Message: [Core issue]\n- Bullets: 1... 2... 3...\n- Speaker Notes: [...]\n\n## Slide 3: Current Landscape\n- Limitation of existing tools...\n\n## Slide 4: Our Proposed Approach\n- Architectural overview...\n\n## Slide 5: System Flow\n- Process steps...\n\n## Slide 6: Results & Feasibility\n- Key advantages...\n\n## Slide 7: Challenges & Future Scope\n- Next steps...\n\n## Slide 8: Conclusion & References\n- Summary...\n- Official references: [...]`
  },
  {
    id: 'recipe-documentation',
    slug: 'documentation',
    title: 'Create Comprehensive Project Documentation & Report',
    titleTe: 'ప్రాజెక్ట్ డాక్యుమెంటేషన్ మరియు అకడమిక్ రిపోర్ట్ రాయండి',
    shortDescription: 'Transform your project code into an institutional-grade academic report with abstract, system architecture flowchart, methodology, test matrix, and Markdown export.',
    shortDescriptionTe: 'మీ ప్రాజెక్ట్ కోడ్ నుండి కాలేజ్ సమర్పణకు సరిపడా అకడమిక్ రిపోర్ట్, సిస్టమ్ ఆర్కిటెక్చర్ మరియు టెస్టింగ్ టేబుల్స్ సిద్ధం చేసుకోండి.',
    durationEstimate: '35-45 mins',
    targetAudience: 'Engineering & BCA/MCA students submitting mini-projects, capstone reports, or hackathon writeups',
    targetDeliverable: 'A structured academic project report following IEEE / university format with abstract, architecture diagram, methodology, and test results.',
    visualReferenceNote: 'Visual system flowchart showing User -> Frontend -> API Gateway -> Controller -> Database / Model Pipeline.',
    recommendedTools: [
      {
        name: 'Napkin AI',
        why: 'Instantly converts written software steps into clean architecture diagrams and flowcharts.',
        freeTierNote: 'Free tier during public beta; exports high-res PNG and SVG.',
        url: 'https://napkin.ai'
      },
      {
        name: 'Claude / Gemini',
        why: 'Best for structuring long-form technical paragraphs and polishing academic phrasing.',
        freeTierNote: 'Generous free tier web conversational access.',
        url: 'https://gemini.google.com'
      },
      {
        name: 'GitHub Markdown / Overleaf LaTeX',
        why: 'Clean formatting for technical repositories and formal academic submissions.',
        freeTierNote: '100% free for students.',
        url: 'https://github.com'
      }
    ],
    prerequisites: ['Working project idea or codebase', 'List of technologies used (e.g. React, Node, SQLite)', 'College report format guidelines'],
    steps: [
      {
        stepNumber: 1,
        title: 'Draft the Executive Abstract & Problem Statement',
        titleTe: 'అబ్‌స్ట్రాక్ట్ మరియు సమస్య ప్రకటన (Problem Statement) రాయడం',
        whatWeAreDoing: 'Formulating a clear 200-word abstract that explains: Context, Problem, Proposed Solution, Methodology, and Achieved Results.',
        actionInstruction: 'Fill out your core tech stack and problem in the prompt below, then run it in the Prompt Lab.',
        actionInstructionTe: 'మీ ప్రాజెక్ట్ సమస్య మరియు టెక్ స్టాక్ వివరాలను ప్రాంప్ట్‌లో చేర్చి అబ్‌స్ట్రాక్ట్ రూపొందించండి.',
        visualType: 'table',
        visualData: {
          headers: ['Section', 'Academic Purpose', 'Recommended Word Count'],
          rows: [
            ['Abstract', 'Summarize problem, method, and results', '150 - 250 words'],
            ['Problem Statement', 'Specific gap in existing solutions', '200 - 300 words'],
            ['Objectives', 'Clear bulleted deliverables', '4 - 6 specific bullets'],
            ['Scope & Limitations', 'What the system does and does not do', '150 words']
          ]
        },
        copyablePrompt: 'Act as an academic technical editor. Draft a formal academic abstract (approx 200 words) and problem statement for my student engineering project:\n\n- Project Title: [PROJECT TITLE]\n- Problem Addressed: [WHAT PROBLEM DOES IT SOLVE?]\n- Target Users: [WHO USES IT?]\n- Tech Stack: [E.G. REACT, TYPESCRIPT, GEMINI API, VERCEL]\n- Key Results/Features: [TOP 3 CAPABILITIES]\n\nEnsure active, objective academic phrasing without hyperbolic marketing claims. Provide 4 bulleted project objectives.',
        promptWhy: 'Academic rubrics deduct points for hype and marketing words (like "revolutionary" or "game-changing"). Objective phrasing earns higher marks.',
        promptPersonalize: 'Insert your exact project title and technology names.',
        expectedResult: 'A formal abstract ready for page 1 of your college project report.',
        checkpoint: 'Does the abstract clearly mention the problem, method, and result in under 250 words?',
        stuckTips: [
          {
            symptom: 'Abstract sounds like a sales pitch',
            fix: 'Add rule: "Rewrite using formal third-person academic voice suitable for an engineering viva panel."'
          }
        ]
      },
      {
        stepNumber: 2,
        title: 'Generate System Architecture Flowchart',
        titleTe: 'సిస్టమ్ ఆర్కిటెక్చర్ ఫ్లోచార్ట్ తయారు చేయడం',
        whatWeAreDoing: 'Creating a clean visual diagram showing how data moves from user interface to processing backend and storage.',
        actionInstruction: 'Use the text process below in Napkin AI or copy the Mermaid code into GitHub/Notion.',
        actionInstructionTe: 'Napkin AI లేదా Mermaid.js ఉపయోగించి ఆర్కిటెక్చర్ డయాగ్రమ్‌ను సిద్ధం చేయండి.',
        visualType: 'flowchart',
        visualData: {
          flowchartType: 'system-architecture',
          nodes: [
            'Client Browser (React SPA)',
            'Vercel Edge / API Gateway',
            'Service Controller (Validation & Rate Limit)',
            'AI Provider Adapter (Gemini / Claude)',
            'Local Storage / Client DB'
          ]
        },
        copyablePrompt: 'flowchart TD\n    User[Student User] -->|Inputs Prompt / Query| UI[React 19 + Tailwind Frontend]\n    UI -->|Validates Request| State[App Context / Local Storage]\n    UI -->|HTTPS API Call| Server[Serverless API / Provider Adapter]\n    Server -->|Sanitizes Input| LLM[Google Gemini / Local Ollama]\n    LLM -->|Structured Response| Server\n    Server -->|Clean JSON| UI\n    UI -->|Renders Visual Card| User',
        promptWhy: 'Viva examiners always inspect system architecture diagrams to verify students understand data flow.',
        promptPersonalize: 'Adjust node names to reflect your project components (e.g. SQLite, Firebase, Node.js).',
        expectedResult: 'An architecture diagram image (SVG/PNG) with clear labels and directional arrows.',
        checkpoint: 'Does your diagram show user interaction, processing layer, and data storage clearly?',
        stuckTips: [
          {
            symptom: 'Diagram looks cluttered',
            fix: 'Group into 3 distinct layers: Presentation Tier, Logic Tier, and Data Tier.'
          }
        ]
      },
      {
        stepNumber: 3,
        title: 'Build the Testing & Verification Matrix',
        titleTe: 'టెస్టింగ్ మరియు వెరిఫికేషన్ టేబుల్ సిద్ధం చేయడం',
        whatWeAreDoing: 'Creating a formal test cases table demonstrating that input validation, error handling, and core features were tested.',
        actionInstruction: 'Document 5 specific test cases (positive test, edge case, invalid input, offline fallback, and rate limit).',
        actionInstructionTe: 'కనీసం 5 రకాల టెస్ట్ కేస్‌లను (పాజిటివ్, ఎర్రర్ హ్యాండ్లింగ్, ఆఫ్‌లైన్ మోడ్) టేబుల్‌లో నమోదు చేయండి.',
        visualType: 'table',
        visualData: {
          headers: ['Test ID', 'Test Description', 'Expected Outcome', 'Observed Result', 'Status'],
          rows: [
            ['TC-01', 'Valid prompt submission in Prompt Lab', 'Structured markdown output rendered', 'Clean prompt generated in 250ms', 'PASSED'],
            ['TC-02', 'Empty input submitted in search bar', 'Friendly validation message shown', 'Validation banner displayed', 'PASSED'],
            ['TC-03', 'API key unavailable / offline test', 'Graceful fallback to demo mode', 'Demo banner with canned answer shown', 'PASSED'],
            ['TC-04', 'Toggle language to Telugu', 'Interface labels change to Telugu', 'Telugu labels displayed', 'PASSED'],
            ['TC-05', 'Clear My Data button clicked', 'LocalStorage reset safely', 'Data wiped and UI reset cleanly', 'PASSED']
          ]
        },
        copyablePrompt: 'Generate a formal Software Testing Matrix in Markdown table format for [PROJECT NAME]. Include columns: Test Case ID, Description, Preconditions, Test Steps, Expected Result, Actual Result, and Status (PASSED/FAILED). Include 6 realistic test scenarios covering input validation, error handling, and performance.',
        promptWhy: 'A test matrix proves to examiners that the application is reliable and verified.',
        promptPersonalize: 'Replace [PROJECT NAME] with your app name.',
        expectedResult: 'A completed test table that embeds seamlessly into Section 6 of your final report.',
        checkpoint: 'Are all test cases based on actual tests performed on your application?',
        stuckTips: [
          {
            symptom: 'Do not invent fake test results',
            fix: 'Run the actual test cases on your live app and record genuine observed behavior.'
          }
        ]
      }
    ],
    finalChecklist: [
      'Title page matches university font guidelines.',
      'Abstract is under 250 words with no marketing buzzwords.',
      'System Architecture diagram has high resolution (no blurry screenshots).',
      'Hardware and Software requirements are explicitly listed.',
      'Testing table contains at least 5 verified test cases.',
      'All citations in the References section use standard IEEE or APA format.',
      'Report is saved as both `.md` (Markdown) and `.pdf`.'
    ],
    exportTemplate: `# [PROJECT TITLE] - Final Project Report\n\n**Department of Computer Science & Engineering**\n\n- **Student Name:** [Your Name]\n- **Roll Number:** [Roll Number]\n- **Advisor / Guide:** [Guide Name]\n- **Date:** [Date]\n\n---\n\n## 1. Abstract\n[Paste your verified abstract here]\n\n## 2. Problem Statement & Objectives\n- Objective 1: ...\n- Objective 2: ...\n\n## 3. System Architecture\n\`\`\`\n[Insert system flowchart or Mermaid diagram]\n\`\`\`\n\n## 4. Methodology & Implementation\n- Frontend: React, Tailwind CSS\n- Architecture: ...\n\n## 5. Software Testing & Verification Matrix\n| Test ID | Test Scenario | Expected Outcome | Status |\n|---|---|---|---|\n| TC-01 | ... | ... | PASSED |\n\n## 6. Conclusion & Future Enhancements\n...\n\n## 7. References\n1. Google Gemini Documentation, https://ai.google.dev (Verified 2026)\n2. ...`
  },
  {
    id: 'recipe-website',
    slug: 'website',
    title: 'Build a Full-Stack Web Application',
    titleTe: 'పూర్తి-స్థాయి వెబ్ అప్లికేషన్‌ను రూపొందించండి',
    shortDescription: 'From vague idea to working React + Tailwind web application with milestone-by-milestone prompts, component wireframes, GitHub version control, and live Vercel deployment.',
    shortDescriptionTe: 'ఆలోచన నుండి ప్రారంభించి రియాక్ట్ వెబ్‌సైట్‌ను నిర్మించడం, గిట్‌హబ్‌కు అప్‌లోడ్ చేయడం మరియు వెర్సెల్‌లో ఉచితంగా హోస్ట్ చేయడం.',
    durationEstimate: '45-60 mins',
    targetAudience: 'Student developers, beginners building their first hackathon MVP or portfolio',
    targetDeliverable: 'A live, responsive web application hosted on HTTPS with GitHub repository, clean components, and zero broken links.',
    visualReferenceNote: 'Component wireframe preview showing Topbar Navigation, Hero Launcher, Feature Grid, and Details Drawer.',
    recommendedTools: [
      {
        name: 'Google Antigravity',
        why: 'Autonomous pair programming with terminal and browser tools directly in your workspace.',
        freeTierNote: 'Developer tier access via Google.',
        url: 'https://deepmind.google'
      },
      {
        name: 'Replit / Lovable',
        why: 'Instant cloud scaffolding without local environment friction.',
        freeTierNote: 'Free starter tier available on both.',
        url: 'https://lovable.dev'
      },
      {
        name: 'GitHub + Vercel',
        why: 'Gold standard pipeline for automated continuous deployment.',
        freeTierNote: 'Free forever for student projects.',
        url: 'https://vercel.com'
      }
    ],
    prerequisites: ['Basic familiarity with HTML/CSS', 'GitHub account', 'Node.js installed locally or Replit browser IDE'],
    steps: [
      {
        stepNumber: 1,
        title: 'Define MVP Scope & Visual Wireframe',
        titleTe: 'MVP పరిధి మరియు విజువల్ వైర్‌ఫ్రేమ్ నిర్ణయించడం',
        whatWeAreDoing: 'Restricting scope to exactly 1 primary problem and 3 core views: Dashboard, Tool/Feature View, and Settings/Data View.',
        actionInstruction: 'Review the visual component sketch below and customize your entity attributes in the prompt.',
        actionInstructionTe: 'క్రింది వైర్‌ఫ్రేమ్‌ను పరిశీలించి మీ ప్రాజెక్ట్ ఫీచర్లను మూడు ప్రధాన స్క్రీన్లుగా విభజించండి.',
        visualType: 'wireframe',
        visualData: {
          wireframeType: 'dashboard-layout',
          components: [
            '1. Topbar: Logo, Search, Language Switcher, Level Pill',
            '2. Hero Section: "What do you want to build?" + Goal Input Box',
            '3. Core Grid: 6 Actionable Cards with Status Badges',
            '4. Slide-Over Detail Drawer for deep inspection',
            '5. Bottom Footer: Verified timestamps and disclaimer'
          ]
        },
        copyablePrompt: 'I am building an MVP called [APP_NAME] for college students that solves [CORE_PROBLEM].\n\nHelp me define:\n1. The 3 must-have views/screens for the MVP\n2. The TypeScript interfaces for the main data model\n3. The layout wireframe in text format\n4. Recommended tech stack (React + TypeScript + Tailwind CSS)\n5. The exact step-by-step milestone plan for an AI coding agent.',
        promptWhy: 'Starting with a written schema prevents refactoring data structures halfway through development.',
        promptPersonalize: 'Replace [APP_NAME] and [CORE_PROBLEM] with your specific idea (e.g. "SmartCampus: Hostel Issue Tracker").',
        expectedResult: 'A concise architectural plan with defined data models and milestone list.',
        checkpoint: 'Do you have your TypeScript data interface written down before writing UI code?',
        stuckTips: [
          {
            symptom: 'Scope feels too big to finish in 24 hours',
            fix: 'Cut authentication and complex payment gateways; use client-side state / localStorage first for the MVP demo.'
          }
        ]
      },
      {
        stepNumber: 2,
        title: 'Scaffold & Milestone 1: Core Navigation & Layout',
        titleTe: 'మైల్‌స్టోన్ 1: లేఅవుట్ మరియు నావిగేషన్ నిర్మించడం',
        whatWeAreDoing: 'Creating a responsive, accessible layout with a navbar, mobile menu drawer, and container bounds.',
        actionInstruction: 'In Google Antigravity or Lovable, give the agent the focused layout prompt below.',
        actionInstructionTe: 'కోడింగ్ ఏజెంట్‌కు లేఅవుట్ ప్రాంప్ట్ ఇచ్చి నావిగేషన్ బార్ మరియు మొబైల్ మెనూ తయారు చేయించండి.',
        visualType: 'component-sketch',
        visualData: {
          sketchType: 'responsive-navbar',
          elements: ['Brand Logo', 'Desktop Nav Links', 'Mobile Hamburger Button', 'Theme/Language Toggle']
        },
        copyablePrompt: 'Create a responsive React component Header.tsx using Tailwind CSS with:\n- Brand logo and name with a tag indicating "Student Edition"\n- Navigation tabs for: Dashboard, Tools, Studio, Academy, and Tutor\n- Language toggle (English / Telugu)\n- Mobile hamburger menu that slides in on small screens\n- WCAG AA contrast colors and keyboard focus outlines',
        promptWhy: 'Building solid navigation first gives you a framework into which every other feature docks.',
        promptPersonalize: 'Customize tab names to match your project\'s main features.',
        expectedResult: 'A clean header component that collapses gracefully on mobile screens.',
        checkpoint: 'Does the mobile navigation toggle open and close smoothly without breaking page width?',
        stuckTips: [
          {
            symptom: 'Horizontal scrollbar appears on mobile',
            fix: 'Check for elements with fixed `w-[800px]` or unconstrained padding; replace with `max-w-full overflow-x-hidden`.'
          }
        ]
      },
      {
        stepNumber: 3,
        title: 'Milestone 2: Build the Core Feature Interaction',
        titleTe: 'మైల్‌స్టోన్ 2: ప్రధాన ఫీచర్ మరియు ఇంటరాక్షన్ నిర్మించడం',
        whatWeAreDoing: 'Implementing the primary interactive value of your app (e.g. search filter, prompt builder, or step progress tracker).',
        actionInstruction: 'Provide the agent with the component requirement, including empty states and loading feedback.',
        actionInstructionTe: 'యాప్ యొక్క ప్రధాన ఫంక్షనాలిటీ (సెర్చ్, ఫిల్టర్ లేదా ప్రాంప్ట్ బిల్డర్) కోడ్‌ను ఏజెంట్‌తో రాయించండి.',
        visualType: 'wireframe',
        visualData: {
          wireframeType: 'interactive-filter',
          components: ['Search input with clear button', 'Category pills (All, Free, Open Source)', 'Card grid with zero-results empty state']
        },
        copyablePrompt: 'Implement the main feature view with:\n1. A search input that filters items by title or category in real time\n2. Filter chips for quick category selection\n3. Responsive grid of cards (1 col mobile, 2 col tablet, 3 col desktop)\n4. Empty state illustration with "Reset filters" button if 0 results match\n5. Detail modal when a card is clicked',
        promptWhy: 'Empty states and fast client-side filters make a prototype feel mature and pleasant to judges.',
        promptPersonalize: 'Bind the card data to your specific project entity.',
        expectedResult: 'Instant filtering and detail view with zero console errors.',
        checkpoint: 'Can you search, click a card, view details, and close the modal without page reloads?',
        stuckTips: [
          {
            symptom: 'Search feels laggy on hundreds of items',
            fix: 'Use `useMemo` for filtering data arrays in React.'
          }
        ]
      },
      {
        stepNumber: 4,
        title: 'Milestone 3: Version Control & Live Vercel Launch',
        titleTe: 'మైల్‌స్టోన్ 3: గిట్‌హబ్ బ్యాకప్ మరియు లైవ్ హోస్టింగ్',
        whatWeAreDoing: 'Pushing clean code to GitHub and launching a production build on Vercel with HTTPS.',
        actionInstruction: 'Run `npm run build` locally to verify 0 errors, commit to git, and import to Vercel.',
        actionInstructionTe: 'లోకల్‌గా `npm run build` రన్ చేసి ఎర్రర్స్ లేవని చూసుకున్నాక గిట్‌హబ్‌కు పుష్ చేసి వెర్సెల్‌లో హోస్ట్ చేయండి.',
        visualType: 'flowchart',
        visualData: {
          flowchartType: 'cicd-pipeline',
          nodes: ['Local code (npm run build verified)', 'git push origin main', 'GitHub Repo', 'Vercel Auto-Build', 'Live HTTPS URL (Production)']
        },
        copyablePrompt: 'git status\ngit add .\ngit commit -m "feat: complete MVP dashboard and interactive studio"\ngit push origin main',
        promptWhy: 'Verifying `npm run build` before pushing guarantees Vercel will not fail on missing imports.',
        promptPersonalize: 'Use your own commit message describing your milestone.',
        expectedResult: 'A live public URL (e.g., `https://your-app.vercel.app`) that judges can immediately test.',
        checkpoint: 'Can you open your live Vercel URL on your mobile phone and interact with it?',
        stuckTips: [
          {
            symptom: 'Vercel build fails with TypeScript error',
            fix: 'Run `npx tsc --noEmit` locally to locate the exact line number of the type error, fix it, and re-push.'
          }
        ]
      }
    ],
    finalChecklist: [
      'App builds locally without errors (`npm run build`).',
      'Site is responsive and tested on 375px mobile viewport.',
      'No dead buttons or fake unclickable links.',
      'Empty state exists when search yields zero results.',
      'GitHub repository has an informative README.md and .gitignore.',
      'Vercel deployment is live on HTTPS and shared with judges.'
    ],
    exportTemplate: `# Project Architecture & Deployment Record: [APP_NAME]\n\n- **Live URL:** [Paste your Vercel URL]\n- **GitHub Repo:** [Paste your GitHub URL]\n- **Primary Tech Stack:** React 19, TypeScript, Tailwind CSS, Vite\n- **Core Features Verified:**\n  1. Search and instant filtering\n  2. Interactive step studio\n  3. Multi-language toggle (English / Telugu)\n  4. Local storage persistence with privacy data wipe`
  },
  {
    id: 'recipe-creative-media',
    slug: 'creative-media',
    title: 'Generate Creative Media (Images, Audio, Video)',
    titleTe: 'క్రియేటివ్ మీడియా (ఇమేజెస్, ఆడియో, వీడియో) రూపొందించండి',
    shortDescription: 'Master prompt engineering for visual art, background music, and video b-roll with style tags, aspect ratios, and licensing compliance.',
    shortDescriptionTe: 'హ్యాకథాన్ వీడియోలు మరియు డెమోల కోసం కాపీరైట్ లేని ఆడియో, చిత్రాలు మరియు వీడియోలను రూపొందించే పద్ధతి.',
    durationEstimate: '20-25 mins',
    targetAudience: 'Students needing demo video background music, presentation graphics, or UI assets',
    targetDeliverable: 'Custom generated visual assets and background audio for your project presentation without copyright infringement.',
    visualReferenceNote: 'Visual comparison of aspect ratios (16:9 for YouTube/slides, 1:1 for icons, 9:16 for Reels/Shorts).',
    recommendedTools: [
      {
        name: 'Suno AI',
        why: 'Generates original background music tracks and educational songs in any musical genre.',
        freeTierNote: '50 free daily credits (non-commercial use with attribution required on free plan).',
        url: 'https://suno.com'
      },
      {
        name: 'Google AI Studio / Imagen / Hugging Face',
        why: 'Access to open diffusion models with direct prompt control.',
        freeTierNote: 'Free demo spaces on Hugging Face; developer quota on Google AI Studio.',
        url: 'https://huggingface.co'
      },
      {
        name: 'Canva Magic Media',
        why: 'In-app AI image and graphic generator with instant cropping and layout integration.',
        freeTierNote: 'Free starter generation credits included.',
        url: 'https://canva.com'
      }
    ],
    prerequisites: ['Creative brief or theme', 'Desired aspect ratio (16:9 for slides or 1:1 for icons)'],
    steps: [
      {
        stepNumber: 1,
        title: 'Structure the Visual Image Prompt',
        titleTe: 'ఇమేజ్ ప్రాంప్ట్ నిర్మాణం',
        whatWeAreDoing: 'Crafting a 5-part prompt: Subject + Environment + Lighting/Mood + Art Medium + Aspect Ratio.',
        actionInstruction: 'Use the structured prompt template below in your image generation tool.',
        actionInstructionTe: 'సబ్జెక్ట్, లైటింగ్, స్టైల్ మరియు యాస్పెక్ట్ రేషియో కలిగిన ప్రాంప్ట్ రాయండి.',
        visualType: 'wireframe',
        visualData: {
          wireframeType: 'prompt-anatomy',
          components: ['1. Core Subject', '2. Supporting Environment', '3. Lighting & Palette', '4. Render Medium (3D render, vector, oil)', '5. Parameter Tags (--ar 16:9)']
        },
        copyablePrompt: 'Isometric 3D render of an Indian college student studying computer science with a laptop in a vibrant, sunlit modern library. Minimalist clay style, soft pastel lighting, clean geometry, 8k resolution, cinematic composition, no distorted text, --ar 16:9',
        promptWhy: 'Specifying "minimalist clay style" or "clean vector" avoids uncanny valley photo artifacts.',
        promptPersonalize: 'Change the subject from "computer science student" to your project theme (e.g. "solar powered smart agriculture robot in green farmland").',
        expectedResult: 'A cohesive visual graphic suitable for a slide header or landing page illustration.',
        checkpoint: 'Does the generated image avoid uncanny hands or distorted unreadable text?',
        stuckTips: [
          {
            symptom: 'Model generates mangled gibberish text inside the image',
            fix: 'Add the negative instruction: "no text, no letters, no words inside image" and add real text overlays manually in Canva.'
          }
        ]
      },
      {
        stepNumber: 2,
        title: 'Generate Demo Video Background Score in Suno',
        titleTe: 'డెమో వీడియో కోసం బ్యాక్‌గ్రౌండ్ మ్యూజిక్ రూపొందించడం',
        whatWeAreDoing: 'Creating a 60-second copyright-free instrumental track to make your hackathon video presentation feel energetic and professional.',
        actionInstruction: 'Open suno.com, toggle "Custom Mode", leave lyrics blank (or check Instrumental), and specify the genre.',
        actionInstructionTe: 'suno.com లో ఇన్‌స్ట్రుమెంటల్ మోడ్ ఎంచుకుని బ్యాక్‌గ్రౌండ్ మ్యూజిక్ ప్రాంప్ట్ ఇవ్వండి.',
        visualType: 'table',
        visualData: {
          headers: ['Genre Style', 'Video Mood', 'Ideal Prompt Keywords'],
          rows: [
            ['Lo-Fi Beats', 'Calm study app demo', 'Chill lo-fi hip hop, warm rhodes piano, vinyl crackle, 85 bpm, instrumental'],
            ['Uplifting Tech', 'Hackathon pitch video', 'Inspiring ambient electronic, energetic synth arpeggios, clean drums, 120 bpm'],
            ['Acoustic Indie', 'Campus lifestyle project', 'Warm acoustic guitar strumming, bright hand claps, optimistic, uplifting melody']
          ]
        },
        copyablePrompt: 'Style: Inspiring modern corporate tech, uplifting synthesizer arpeggio, subtle rhythmic percussion, optimistic tone, 115 bpm, clean mastering, purely instrumental, no vocals.',
        promptWhy: 'Specifying tempo (bpm) and "purely instrumental" ensures the music doesn\'t drown out your spoken voiceover.',
        promptPersonalize: 'Select the mood that fits your hackathon track (e.g. healthcare, gaming, fintech).',
        expectedResult: 'A high-energy, royalty-free audio file ready to import into CapCut, Premiere, or Canva.',
        checkpoint: 'Can you clearly hear your spoken narration over the background music?',
        stuckTips: [
          {
            symptom: 'Suno added singing voices despite wanting instrumental',
            fix: 'Ensure the "Instrumental" toggle switch is strictly checked before clicking Create.'
          }
        ]
      }
    ],
    finalChecklist: [
      'Visual images are exported in high resolution (minimum 1920x1080 for slides).',
      'No copyright-infringing trademark logos were used.',
      'Background music volume is mixed at 15-20% under spoken narration.',
      'Mandatory free-tier attribution is placed in project credits where required.'
    ],
    exportTemplate: `# Creative Media Asset Manifest\n\n- **Project:** [Project Name]\n- **Hero Banner:** [Image File / Description] (Generated via Canva Magic / Diffusion)\n- **Demo Audio Track:** [Audio File] (Generated via Suno AI - Free Tier, Attribution: "Music generated by Suno AI")\n- **License Compliance:** Non-commercial educational use verified.`
  },
  {
    id: 'recipe-learn-tool',
    slug: 'learn-tool',
    title: 'Learn Any Unfamiliar AI Tool in 15 Minutes',
    titleTe: 'ఏదైనా కొత్త AI టూల్‌ను 15 నిమిషాల్లో నేర్చుకోండి',
    shortDescription: 'A repeatable 4-step framework to orient yourself in any new AI developer tool, avoid configuration traps, run a safe hello-world test, and verify outputs.',
    shortDescriptionTe: 'కొత్త టూల్ చూసి భయపడకుండా 4 సులభమైన దశలలో దాన్ని ఎలా నేర్చుకోవాలో తెలిపే గైడ్.',
    durationEstimate: '15 mins',
    targetAudience: 'Any student encountering a new AI library, CLI tool, or web platform for the first time',
    targetDeliverable: 'A working "Hello World" execution of the new tool with documented setup commands, safe sandbox testing, and troubleshooting notes.',
    visualReferenceNote: '4-Quadrant Tool Mental Model: Inputs -> Core Engine -> Environment/Keys -> Outputs.',
    recommendedTools: [
      {
        name: 'Official Documentation & Quickstarts',
        why: 'Always the most up-to-date source of API parameters and pricing.',
        freeTierNote: 'Always check the docs for the current free tier limits.',
        url: 'https://skillnova.dev'
      },
      {
        name: 'SkillNova AI Tutor',
        why: 'Paste unfamiliar error codes for plain-language explanations in English or Telugu.',
        freeTierNote: 'Available 24/7 with local demo fallback.',
        url: '#tutor'
      }
    ],
    prerequisites: ['Name and official URL of the new tool', 'Basic terminal or web browser access'],
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: The 60-Second Mental Model Scan',
        titleTe: 'టూల్ యొక్క ప్రాథమిక భావనను అర్థం చేసుకోవడం',
        whatWeAreDoing: 'Answering 4 essential questions before touching code: What is the input? What is the output? Does it require an API key? What does it cost?',
        actionInstruction: 'Open the tool\'s official documentation homepage and locate the "Quickstart" or "Getting Started" guide.',
        actionInstructionTe: 'టూల్ యొక్క అఫీషియల్ డాక్యుమెంటేషన్‌లోని Quickstart పేజీని ఓపెన్ చేయండి.',
        visualType: 'table',
        visualData: {
          headers: ['Question', 'Why it Matters', 'Where to Find'],
          rows: [
            ['What is the input?', 'Text prompt, image file, code repository?', 'Landing page header / features'],
            ['What is the output?', 'JSON response, live URL, downloaded file?', 'Docs Quickstart section'],
            ['Is an API key required?', 'Must you sign up for Google/OpenAI key?', 'Pricing / Authentication page'],
            ['What is the free limit?', '100 requests/day, 14-day trial, or open-source?', 'Pricing tab / Terms']
          ]
        },
        copyablePrompt: 'Explain what [TOOL_NAME] does in 3 bullet points for a college beginner. State its primary input, expected output, whether it is free/open-source, and the single best use case for a student project.',
        promptWhy: 'Filters out vendor marketing fluff and isolates the core utility.',
        promptPersonalize: 'Replace [TOOL_NAME] with the tool you are studying (e.g. "Ollama", "Napkin AI", or "v0.dev").',
        expectedResult: 'Clear clarity on whether the tool is worth adopting for your current deadline.',
        checkpoint: 'Can you state the tool\'s primary input and output in 10 seconds?',
        stuckTips: [
          {
            symptom: 'Documentation is filled with dense jargon',
            fix: 'Paste the introductory paragraph into SkillNova Tutor and ask: "Explain this in simple everyday Telugu/English with a college library analogy."'
          }
        ]
      },
      {
        stepNumber: 2,
        title: 'Step 2: Run the Minimal "Hello World" Sandbox',
        titleTe: 'కనిష్ట "హలో వరల్డ్" టెస్ట్ రన్ చేయడం',
        whatWeAreDoing: 'Testing the tool on the simplest possible dummy input before attempting your complex capstone project.',
        actionInstruction: 'Create a clean, isolated scratch folder or test project. Do NOT integrate into your main repository yet.',
        actionInstructionTe: 'మెయిన్ ప్రాజెక్ట్‌లో కాకుండా ప్రత్యేక ఫోల్డర్‌లో చిన్న టెస్ట్ చేసి చూడండి.',
        visualType: 'flowchart',
        visualData: {
          flowchartType: 'sandbox-testing',
          nodes: ['Isolated scratch directory', 'Install / Sign in', 'Run single minimal command', 'Inspect raw output']
        },
        copyablePrompt: 'Show me the absolute minimal 10-line Hello World example to get started with [TOOL_NAME] in [LANGUAGE, e.g. TypeScript or Python]. Include setup commands and error handling.',
        promptWhy: 'A minimal script isolates environment issues from your application logic.',
        promptPersonalize: 'Specify your language (Node.js, Python, or Web cURL).',
        expectedResult: 'A verified working connection with zero clutter.',
        checkpoint: 'Did the minimal Hello World example succeed without errors?',
        stuckTips: [
          {
            symptom: 'Missing credentials or 401 Unauthorized error',
            fix: 'Verify the environment variable name matches the exact casing expected by the SDK (e.g. GEMINI_API_KEY vs API_KEY).'
          }
        ]
      }
    ],
    finalChecklist: [
      'Official documentation URL is bookmarked.',
      'Pricing tier and student quota are verified (not assumed).',
      'Minimal "Hello World" ran successfully in an isolated test.',
      'Secrets are stored in environment variables, not committed to git.'
    ],
    exportTemplate: `# Tool Assessment Log: [TOOL_NAME]\n\n- **Official Site:** [URL]\n- **Verified Pricing Tier:** [Open Source / Free Tier / Trial / Paid]\n- **Verification Date:** [Today\'s Date]\n- **Best Use Case:** [Why we are using it]\n- **Minimal Run Command:** [Command]\n- **Gotchas / Limitations:** [What to watch out for]`
  }
];
