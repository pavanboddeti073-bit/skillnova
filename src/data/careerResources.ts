import type { CareerResource } from '../types/index.ts';

export const verifiedCareerResources: CareerResource[] = [
  {
    id: 'google-summer-of-code',
    organization: 'Google Open Source',
    title: 'Google Summer of Code (GSoC)',
    category: 'student_program',
    officialUrl: 'https://summerofcode.withgoogle.com',
    location: 'Remote / Global',
    eligibility: 'Students & beginner contributors 18+ eligible to work in their country.',
    status: 'verified',
    notes: 'Official annual open-source stipend program. Applications open annually in spring; work under expert mentors on real open source software.',
    lastCheckedAt: '2026-10-14'
  },
  {
    id: 'github-student-pack',
    organization: 'GitHub Education',
    title: 'GitHub Student Developer Pack',
    category: 'student_program',
    officialUrl: 'https://education.github.com/pack',
    location: 'Global / Online',
    eligibility: 'Currently enrolled students with valid college ID / email.',
    status: 'verified',
    notes: 'Free access to GitHub Pro, free domain name, cloud credits, and developer software suites for students.',
    lastCheckedAt: '2026-10-14'
  },
  {
    id: 'microsoft-learn-ambassador',
    organization: 'Microsoft',
    title: 'Microsoft Learn Student Ambassadors',
    category: 'fellowship',
    officialUrl: 'https://studentambassadors.microsoft.com',
    location: 'Global Campus Communities',
    eligibility: 'College and university students passionate about technology and community mentoring.',
    status: 'verified',
    notes: 'Campus leadership program providing Microsoft Azure credits, certification vouchers, and mentorship.',
    lastCheckedAt: '2026-10-14'
  },
  {
    id: 'mlh-fellowship',
    organization: 'Major League Hacking',
    title: 'MLH Fellowship',
    category: 'fellowship',
    officialUrl: 'https://fellowship.mlh.io',
    location: 'Remote / Global',
    eligibility: 'Students and aspiring software engineers worldwide.',
    status: 'verified',
    notes: '12-week remote internship alternative collaborating on production open-source software with educational stipends.',
    lastCheckedAt: '2026-10-14'
  },
  {
    id: 'google-careers-students',
    organization: 'Google',
    title: 'Google Student & University Careers',
    category: 'career_portal',
    officialUrl: 'https://careers.google.com/students/',
    location: 'Global (Bangalore, Hyderabad, Remote, etc.)',
    eligibility: 'Undergraduate and graduate students pursuing Computer Science or related STEM disciplines.',
    status: 'verified',
    notes: 'Official Google career portal for STEP internships, Software Engineer student roles, and research opportunities.',
    lastCheckedAt: '2026-10-14'
  },
  {
    id: 'microsoft-university-careers',
    organization: 'Microsoft',
    title: 'Microsoft Student & Graduate Opportunities',
    category: 'career_portal',
    officialUrl: 'https://careers.microsoft.com/v2/global/en/students',
    location: 'Global (India, US, Remote)',
    eligibility: 'Current university students and recent graduates.',
    status: 'verified',
    notes: 'Official career portal for Microsoft Software Engineering internships and full-time university hires.',
    lastCheckedAt: '2026-10-14'
  },
  {
    id: 'amazon-student-careers',
    organization: 'Amazon',
    title: 'Amazon Student Programs',
    category: 'career_portal',
    officialUrl: 'https://www.amazon.jobs/en/business_categories/student-programs',
    location: 'Global (India, International)',
    eligibility: 'Enrolled BTech/MTech/BCA/MCA/MS students.',
    status: 'verified',
    notes: 'Official portal for Amazon SDE Internships and graduate campus recruiting drives.',
    lastCheckedAt: '2026-10-14'
  }
];

export interface RoleRoadmap {
  role: string;
  roleTe: string;
  description: string;
  mustHaveSkills: string[];
  recommendedProjects: string[];
  officialCertificationsOrDocs: string[];
}

export const roleRoadmaps: RoleRoadmap[] = [
  {
    role: 'Frontend & UI Engineer',
    roleTe: 'ఫ్రంట్-ఎండ్ డెవలపర్',
    description: 'Build responsive, accessible, interactive web applications that delight users.',
    mustHaveSkills: ['HTML5 & Semantic Markup', 'Modern CSS & Tailwind CSS', 'JavaScript (ES6+) & TypeScript', 'React / Next.js', 'Git & GitHub Workflow'],
    recommendedProjects: [
      'Interactive Student Dashboard with filterable cards and state persistence',
      'Accessibility-audited Component Design System with WCAG AA compliance',
      'Offline-capable Study Note App with Progressive Web App (PWA) support'
    ],
    officialCertificationsOrDocs: ['MDN Web Docs Front-End Path', 'React.dev Official Interactive Tutorials']
  },
  {
    role: 'AI / LLM Application Developer',
    roleTe: 'AI / LLM అప్లికేషన్ డెవలపర్',
    description: 'Integrate LLMs, retrieval pipelines, prompt engineering, and agentic workflows into software products.',
    mustHaveSkills: ['Python & TypeScript', 'REST APIs & Streaming Responses', 'Prompt Engineering (CR-TCO)', 'Vector Embeddings & RAG Basics', 'Responsible AI & Evaluation'],
    recommendedProjects: [
      'Retrieval-Augmented Study Assistant over university syllabus PDFs',
      'Multi-modal Image & Text Inspector using Google AI Studio Gemini API',
      'Agentic pair programming helper with local Ollama fallback'
    ],
    officialCertificationsOrDocs: ['Google Cloud Generative AI Learning Path', 'Hugging Face Deep Learning Course']
  },
  {
    role: 'Full-Stack Developer',
    roleTe: 'ఫుల్-స్టాక్ డెవలపర్',
    description: 'Bridge frontend interfaces with robust backend APIs, databases, authentication, and cloud deployments.',
    mustHaveSkills: ['React / TypeScript', 'Node.js / Express or Python FastAPI', 'SQL (PostgreSQL / SQLite)', 'REST & Serverless Functions', 'Vercel / Docker Hosting'],
    recommendedProjects: [
      'Hackathon Project Submission & Review Platform with real-time comments',
      'Campus Event Ticket Booking system with QR generation and database persistence',
      'Student Resume Reviewer with server-side AI processing and privacy wipes'
    ],
    officialCertificationsOrDocs: ['Full Stack Open (University of Helsinki)', 'Vercel Edge Functions Docs']
  }
];
