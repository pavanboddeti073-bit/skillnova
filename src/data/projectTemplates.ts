import { GeneratedProjectPlan } from '../types';

export const prebuiltProjectPlans: GeneratedProjectPlan[] = [
  {
    id: 'plan-portfolio-website',
    goalSummary: 'Build and deploy a modern, responsive developer portfolio showcasing college projects, GitHub links, skills, and a contact form with 0 hosting costs.',
    goalSummaryTe: 'ఉచిత హోస్టింగ్‌తో కాలేజ్ ప్రాజెక్టులు, నైపుణ్యాలు మరియు గిట్‌హబ్ లింకులు ప్రదర్శించే ఆధునిక డెవలపర్ పోర్ట్‌ఫోలియోను నిర్మించండి.',
    prerequisites: ['Basic HTML/CSS concepts', 'Free GitHub account', 'Free Vercel account'],
    recommendedTools: [
      {
        name: 'Google Antigravity / Lovable',
        role: 'Primary UI Builder',
        reason: 'Fast component scaffolding with accessible Tailwind styling and instant preview.',
        pricingNote: 'Free tier available for students.',
        url: 'https://lovable.dev'
      },
      {
        name: 'GitHub',
        role: 'Version Control',
        reason: 'Backs up portfolio code and provides public project proof for recruiters.',
        pricingNote: '100% Free unlimited repositories.',
        url: 'https://github.com'
      },
      {
        name: 'Vercel',
        role: 'Global CDN Hosting',
        reason: 'Zero-config free hosting with HTTPS and automatic updates on git push.',
        pricingNote: 'Free Hobby tier forever for personal portfolios.',
        url: 'https://vercel.com'
      }
    ],
    milestones: [
      {
        milestoneNumber: 1,
        title: 'Wireframe & Hero Section',
        description: 'Scaffold the project and build the hero card with your name, degree, 1-line specialty, and social badges.',
        copyablePrompt: 'Create a clean, responsive developer portfolio hero component in React and Tailwind CSS. Include: student name, tag "Computer Science Undergrad", 3 key badges (React, AI, Python), and buttons for "View Projects" and "GitHub Profile".',
        checkpoint: 'The hero section looks crisp on both desktop and mobile viewports.',
        commonErrorAndFix: 'Error: Large uncompressed images slow down loading. Fix: Use modern WebP format or optimized SVGs.'
      },
      {
        milestoneNumber: 2,
        title: 'Projects Showcase Grid',
        description: 'Implement a 3-card project grid with live demo links, GitHub links, and tech stack tags.',
        copyablePrompt: 'Create a responsive 3-column project grid with cards containing: project title, 2-line summary, technology tags (e.g. Tailwind, Node.js), and two clickable buttons: "Live Demo" and "GitHub Code". Include subtle hover elevation.',
        checkpoint: 'All demo and code buttons open their destinations in new tabs with rel="noopener noreferrer".',
        commonErrorAndFix: 'Error: Missing rel="noopener noreferrer" on external target="_blank" links. Fix: Always include rel security attributes.'
      },
      {
        milestoneNumber: 3,
        title: 'Git Versioning & Vercel Deployment',
        description: 'Initialize Git, commit your components, push to GitHub, and deploy to Vercel.',
        copyablePrompt: 'git init\ngit add .\ngit commit -m "feat: complete developer portfolio with projects grid"\ngit branch -M main\ngit remote add origin https://github.com/YOUR_USERNAME/portfolio.git\ngit push -u origin main',
        checkpoint: 'Your live portfolio URL (e.g. `yourname.vercel.app`) loads flawlessly with an HTTPS security lock.',
        commonErrorAndFix: 'Error: Vercel build fails due to unused variable. Fix: Run `npm run build` locally to catch TypeScript warnings before pushing.'
      }
    ],
    testingChecklist: [
      'Tested responsiveness on 375px mobile screen.',
      'Verified all project links and social handles point to real URLs.',
      'Accessibility contrast checked with Lighthouse / DevTools.',
      'Lighthouse performance score > 90 on mobile.'
    ],
    officialReferences: [
      { label: 'Vercel Deployment Documentation', url: 'https://vercel.com/docs', lastVerified: '2026-10-14' },
      { label: 'Tailwind CSS Documentation', url: 'https://tailwindcss.com/docs', lastVerified: '2026-10-14' }
    ],
    createdAt: '2026-10-14'
  },
  {
    id: 'plan-seminar-presentation',
    goalSummary: 'Create an engaging 8-slide academic seminar deck on an emerging AI topic with speaker notes, visual wireframes, and Canva/Gamma prompts.',
    goalSummaryTe: 'ఆధునిక AI అంశంపై 8 స్లైడ్ల అకడమిక్ ప్రెజెంటేషన్, స్పీకర్ నోట్స్ మరియు విజువల్స్ సిద్ధం చేసుకోండి.',
    prerequisites: ['Approved seminar topic', 'Class duration requirements (5-8 minutes)'],
    recommendedTools: [
      {
        name: 'Gamma App',
        role: 'AI Slide Deck Generator',
        reason: 'Converts structured outlines into visually appealing slide cards in seconds.',
        pricingNote: 'Free tier with 400 credits upon signup.',
        url: 'https://gamma.app'
      },
      {
        name: 'Canva',
        role: 'Slide Customization & Export',
        reason: 'Drag-and-drop control to fine-tune diagrams and export to PPTX/PDF.',
        pricingNote: 'Free student access via Canva for Education.',
        url: 'https://canva.com'
      },
      {
        name: 'Google Gemini',
        role: 'Research & Fact-Checking',
        reason: 'Provides grounded search verification for academic citations.',
        pricingNote: 'Free conversational tier.',
        url: 'https://gemini.google.com'
      }
    ],
    milestones: [
      {
        milestoneNumber: 1,
        title: 'Create Coherent 8-Slide Arc',
        description: 'Generate a structured outline with title, 1-line key takeaway, 3 concise bullets, and speaker notes per slide.',
        copyablePrompt: 'Create an 8-slide presentation plan on "Retrieval-Augmented Generation (RAG) in Engineering" for a 3rd-year technical seminar. Provide for each slide: 1. Slide Title, 2. Core Takeaway, 3. Exactly 3 bullets (under 12 words each), 4. Recommended visual diagram, 5. Spoken speaker notes (under 40 words).',
        checkpoint: 'You have a slide-by-slide script that takes under 7 minutes to speak aloud.',
        commonErrorAndFix: 'Error: Slides packed with paragraphs of text. Fix: Limit to 3 bullets per slide with maximum 12 words per bullet.'
      },
      {
        milestoneNumber: 2,
        title: 'Generate Visuals in Gamma/Canva',
        description: 'Feed the outline into Gamma or Canva, applying high contrast typography.',
        copyablePrompt: 'Design a clean dark-slate theme presentation with emerald green accents. Clean sans-serif typography, generous margins, high-contrast readable text for classroom projectors.',
        checkpoint: 'All text is legible from 10 feet away on a monitor or projector.',
        commonErrorAndFix: 'Error: Low-contrast light grey text on white background. Fix: Use high-contrast dark text (#0f172a) on light backgrounds.'
      },
      {
        milestoneNumber: 3,
        title: 'Fact-Check & PDF Export',
        description: 'Verify all technical statements against official sources and export to both .pptx and .pdf format.',
        copyablePrompt: 'List all technical assertions in this presentation and indicate which ones require citation from research papers or official vendor documentation.',
        checkpoint: 'PDF backup file saved locally and tested on a secondary screen.',
        commonErrorAndFix: 'Error: Presentation crashes on college PC due to missing fonts. Fix: Present using the exported PDF in full-screen mode.'
      }
    ],
    testingChecklist: [
      'Rehearsed aloud with a stopwatch (target: 5-7 minutes).',
      'Checked slides for spelling and grammar errors.',
      'Verified citations on problem and architecture slides.',
      'Tested PDF presentation in full-screen mode (Ctrl+L).'
    ],
    officialReferences: [
      { label: 'Canva Presentation Help', url: 'https://www.canva.com/help', lastVerified: '2026-10-14' },
      { label: 'Google AI Studio RAG Guide', url: 'https://ai.google.dev', lastVerified: '2026-10-14' }
    ],
    createdAt: '2026-10-14'
  },
  {
    id: 'plan-productivity-app',
    goalSummary: 'Build a student study habit & exam revision tracker web application with local storage persistence, topic progress indicators, and clean cards.',
    goalSummaryTe: 'విద్యార్థుల పరీక్షల ప్రిపరేషన్ మరియు స్టడీ అలవాట్లను ట్రాక్ చేసే వెబ్ యాప్‌ను లోకల్ స్టోరేజ్‌తో నిర్మించండి.',
    prerequisites: ['Basic JavaScript / TypeScript', 'Node.js or Replit cloud IDE'],
    recommendedTools: [
      {
        name: 'Google Antigravity / Replit',
        role: 'Full-Stack Code Builder',
        reason: 'Instant preview and rapid component generation with zero setup friction.',
        pricingNote: 'Free starter tier available.',
        url: 'https://deepmind.google'
      },
      {
        name: 'Lucide Icons + Tailwind CSS',
        role: 'Design System',
        reason: 'Lightweight, modern icons and utility styles with zero runtime overhead.',
        pricingNote: '100% Open source MIT license.',
        url: 'https://lucide.dev'
      },
      {
        name: 'Vercel',
        role: 'Free Hosting',
        reason: 'Continuous deployment with global speed and SSL certification.',
        pricingNote: 'Free for student projects.',
        url: 'https://vercel.com'
      }
    ],
    milestones: [
      {
        milestoneNumber: 1,
        title: 'Data Model & LocalStorage Hook',
        description: 'Create the TypeScript schema for Subjects, Revision Sessions, and Progress metrics with localStorage sync.',
        copyablePrompt: 'Write a TypeScript interface for StudySession (id, subject, topic, durationMinutes, isCompleted, date) and a custom React hook useLocalStorage that syncs state to browser storage safely with defensive JSON parsing.',
        checkpoint: 'Adding and refreshing tasks in the browser maintains state without data loss.',
        commonErrorAndFix: 'Error: JSON.parse crashes on invalid local storage strings. Fix: Wrap JSON.parse in try/catch block with fallback initial state.'
      },
      {
        milestoneNumber: 2,
        title: 'Interactive Subject Cards & Progress Bar',
        description: 'Build the interactive cards with checkbox completion, subject color tags, and a summary progress bar.',
        copyablePrompt: 'Create a student study task list component with: 1. Subject filter pills, 2. Checkbox to toggle completed state with visual strike-through, 3. Progress bar showing % of topics completed today, 4. Empty state with "Add your first study topic" button.',
        checkpoint: 'Toggling tasks smoothly updates the percentage progress bar in real time.',
        commonErrorAndFix: 'Error: Dividing by zero when 0 tasks exist. Fix: Return 0% when tasks.length === 0.'
      },
      {
        milestoneNumber: 3,
        title: 'Export Study Plan & Vercel Launch',
        description: 'Add an export button to download the study schedule as Markdown or text and deploy to Vercel.',
        copyablePrompt: 'Add an "Export Schedule" button that generates a clean Markdown text summary of all pending study topics and copies it to clipboard with friendly toast notification.',
        checkpoint: 'Clicking Export copies formatted schedule and toast appears.',
        commonErrorAndFix: 'Error: Clipboard API fails on non-HTTPS sites. Fix: Vercel provides automatic HTTPS, resolving browser clipboard security restrictions.'
      }
    ],
    testingChecklist: [
      'Tested adding, editing, and deleting study items.',
      'Verified state persists across browser page reloads.',
      'Checked responsive layout on mobile screen (375px).',
      'Deployed live on Vercel with zero console errors.'
    ],
    officialReferences: [
      { label: 'React Documentation (State & Effects)', url: 'https://react.dev', lastVerified: '2026-10-14' },
      { label: 'MDN Web Docs: Web Storage API', url: 'https://developer.mozilla.org', lastVerified: '2026-10-14' }
    ],
    createdAt: '2026-10-14'
  }
];
