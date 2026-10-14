import { PromptTemplate } from '../types';

export const promptTemplates: PromptTemplate[] = [
  {
    id: 'pt-coding-debug',
    title: 'Defensive Code Debugger & Explainer',
    category: 'coding',
    role: 'Senior Staff Software Engineer specializing in clean architecture and error resilience',
    context: 'I am a computer science student debugging a web application. The code fails to execute as expected.',
    task: 'Analyze the provided code and error stack trace. Explain: 1. The exact root cause of the bug, 2. The corrected code snippet, and 3. How to write a defensive guard to prevent this class of bugs from recurring.',
    constraints: 'Do not introduce unneeded external dependencies. Preserve all existing comments and variable names unless they cause the bug. Format code cleanly with TypeScript types.',
    steps: '1. Identify the bug line\n2. Explain why it fails\n3. Provide the minimal drop-in replacement\n4. Provide a defensive unit test check',
    outputFormat: '1. Root Cause Summary (2 sentences)\n2. Corrected Code Block\n3. Defensive Best Practice Tip',
    qualityChecks: 'Does the solution handle null/undefined inputs? Are TypeScript types preserved?',
    whyThisWorks: 'Forces the model to explain the mental model behind the bug rather than merely spitting out code without explanation.',
    sampleInput: 'Error: Cannot read properties of undefined (reading "filter") at renderList (StudentList.tsx:42)'
  },
  {
    id: 'pt-presentation-builder',
    title: 'Academic Seminar Presentation Outline (Canva / Gamma)',
    category: 'presentation',
    role: 'University Presentation Coach and Technical Seminar Guide',
    context: 'Preparing a 6-minute college seminar presentation for classmates and professors.',
    task: 'Create an 8-slide structured presentation outline on the given topic with clear visual recommendations and speaker talking points.',
    constraints: 'Maximum 4 bullets per slide. Each bullet must be under 14 words. Include 1 visual recommendation and spoken notes for each slide.',
    steps: '1. Title & hook\n2. Problem & background\n3. Limitations of status quo\n4. Proposed architecture\n5. Workflow steps\n6. Real-world impact & data\n7. Challenges & future scope\n8. Conclusion & citations',
    outputFormat: 'Markdown with Slide Number, Slide Title, Key Takeaway, 3-4 Bullets, Visual Suggestion, and Speaker Notes.',
    qualityChecks: 'Are the bullets short enough to read quickly on a projector? Do they avoid walls of dense text?',
    whyThisWorks: 'Enforcing word limits stops AI from creating text-heavy slides that professors criticize.',
    sampleInput: 'Topic: Edge Computing in Smart Traffic Management Systems'
  },
  {
    id: 'pt-doc-academic',
    title: 'Project Report Section (Methodology / Architecture)',
    category: 'documentation',
    role: 'Academic Technical Writer and Engineering Faculty Advisor',
    context: 'Writing Chapter 3 (System Architecture & Methodology) for an undergraduate engineering mini-project or capstone.',
    task: 'Draft a formal academic explanation of the system architecture, component interactions, and data lifecycle.',
    constraints: 'Use formal third-person academic voice. Avoid marketing buzzwords like "revolutionary" or "cutting-edge". Include placeholders for student-verified benchmark numbers.',
    steps: '1. Architectural overview paragraph\n2. Component breakdown table\n3. Step-by-step dataflow walkthrough\n4. Hardware/Software constraints list',
    outputFormat: 'IEEE standard academic report subheadings with Markdown tables and bulleted lists.',
    qualityChecks: 'Does it avoid unsubstantiated claims? Are all performance metrics marked as placeholders for student experimental verification?',
    whyThisWorks: 'Conforms to formal college evaluation rubrics while strictly preventing invented experimental claims.',
    sampleInput: 'Project: Decentralized Student Certificate Verification using SHA-256 Hashes'
  },
  {
    id: 'pt-website-milestone',
    title: 'Frontend Component Scaffolder with Tailwind',
    category: 'website',
    role: 'Principal Frontend UX Engineer with expertise in React, Tailwind CSS, and WCAG AA accessibility',
    context: 'Scaffolding a student-facing web application with clean component boundaries.',
    task: 'Create a responsive, self-contained React TypeScript component with loading states, empty state handling, and accessible keyboard focus states.',
    constraints: 'Use Tailwind CSS utility classes. Ensure WCAG AA color contrast. Do not use complex external animation libraries that bloat bundles.',
    steps: '1. Define TypeScript interface\n2. Implement component with responsive grid\n3. Add empty state\n4. Add keyboard accessibility attributes (aria-labels, focus-visible)',
    outputFormat: 'Single complete TSX file with clean comments and TypeScript types.',
    qualityChecks: 'Does it support mobile viewports (375px) without horizontal scrolling?',
    whyThisWorks: 'Prevents incomplete code snippets by specifying TypeScript interfaces and empty states upfront.',
    sampleInput: 'A student course progress card displaying title, instructor, % complete progress bar, and "Resume Lesson" button.'
  },
  {
    id: 'pt-resume-impact',
    title: 'Transform Resume Bullets into Google XYZ Format',
    category: 'resume',
    role: 'Senior Tech Recruiter and Student Career Mentor',
    context: 'Reviewing a student\'s engineering resume for campus placement and internship applications.',
    task: 'Rewrite passive project descriptions into high-impact Google XYZ bullets: "Accomplished [X] as measured by [Y], by doing [Z]".',
    constraints: 'Do not invent fake metrics or exaggerate roles. If a metric is unknown, use [X%] as an explicit prompt for the student to measure.',
    steps: '1. Identify the core action and tool used\n2. Highlight the problem solved\n3. Formulate the XYZ statement\n4. Flag ATS-unfriendly formatting',
    outputFormat: 'Table comparing: Original Bullet -> Improved XYZ Bullet -> Why it stands out to recruiters.',
    qualityChecks: 'Does each bullet start with a strong action verb? Are technical tools contextualized?',
    whyThisWorks: 'Hiring managers look for measurable impact rather than passive lists of duties.',
    sampleInput: 'Worked on a website that helped students find notes using React and Firebase.'
  },
  {
    id: 'pt-study-feynman',
    title: 'Feynman Technique Topic Breakdown & Self-Quiz',
    category: 'study',
    role: 'Empathetic University Tutor using the Feynman Technique',
    context: 'A student is struggling to understand a complex computer science or engineering concept before an exam.',
    task: 'Explain the concept using an intuitive everyday analogy. Break it into 3 progressive tiers: 1. Plain language summary, 2. Technical mechanics, 3. 3-question self-test with explanations.',
    constraints: 'Available in English or Telugu. Avoid ungrounded jargon. Define every acronym on first use.',
    steps: '1. Everyday college analogy\n2. Deep dive into mechanics\n3. Visual mental model\n4. 3 interactive multiple-choice quiz questions with answer key',
    outputFormat: 'Tier 1 Analogy -> Tier 2 Technical Mechanics -> Tier 3 Mini Self-Quiz.',
    qualityChecks: 'Could a first-year student understand Tier 1 without searching Wikipedia?',
    whyThisWorks: 'Analogies anchor abstract memory, while immediate testing cements retention.',
    sampleInput: 'Explain: Asynchronous JavaScript, Event Loop, and Microtasks.'
  }
];
