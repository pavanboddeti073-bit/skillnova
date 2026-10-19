# SkillNova Mega14 — Complete AI Learning Platform

> **Unlock Your Potential. Learn Smarter with AI.**  
> *Your personal AI learning companion for mastering skills, understanding complex concepts, practicing confidently, and achieving your goals.*

---

## 🚀 Overview of SkillNova Mega14

**SkillNova Mega14** is a modern, responsive, full-stack AI learning platform built with:
- **Frontend:** React 19, TypeScript, Tailwind CSS, Lucide Icons, Canvas Confetti
- **Backend:** Express 5 / Node.js + Vercel Serverless Function architecture (`/api`)
- **Database:** PostgreSQL (with Supabase RLS migrations) + Local JSON/In-Memory database engine
- **AI Engine:** Google Gemini 1.5 Cloud Integration with 15 pedagogical learning modes + Multi-Domain Fallback Knowledge Engine
- **Languages Supported:** Native English & Telugu (తెలుగు)

---

## 🌟 Core Feature Modules

### 1. Brand Identity & Welcome Experience
- Animated logo reveal with purple, deep blue, cyan, and tasteful pink gradients.
- Session-aware routing: first-time visitors see the welcoming platform brief and call-to-action buttons (*"Start Learning"* & *"Explore Courses"*), while returning authenticated users proceed straight to their dashboard.

### 2. Authentication & Account Security (Phase 4)
- **Signup Page:** Full name, email, password, confirm password, show/hide password, live password strength meter, terms agreement, optional learning interests, and skill level selector.
- **Login Page:** Email, password, show/hide password, forgot-password flow.
- **Backend Security:** SHA-256 hashed password storage (never plain-text), token-based session persistence, user data isolation, and user-initiated data purge.

### 3. Personalized Learning Dashboard (Phase 5)
- Personalized welcome greeting: *"Welcome back, [First Name]!"*
- Real-time learning streak counter (days) with flame badge.
- Weekly study activity bar chart (Mon - Sun).
- Daily learning goal tracker (e.g. 25/30 mins).
- Enrolled courses progress and *"Continue Learning"* quick action.
- Quick launchers for AI Tutor and practice quizzes.

### 4. 15-Mode Real AI Tutor (Phase 6)
- **15 Pedagogical Modes:**
  1. Explain a concept
  2. Explain like I'm a beginner
  3. Deep-dive explanation
  4. Step-by-step problem solving
  5. Give real-world examples
  6. Quiz me
  7. Practice with hints
  8. Review my answer
  9. Summarize a topic
  10. Generate study notes
  11. Explain code
  12. Create a learning roadmap
  13. Compare two concepts
  14. Prepare for an exam
  15. Explain using analogies
- Level selector (Beginner, Intermediate, Advanced)
- Depth selector (Short, Standard, Detailed)
- Focus selector (Theory, Practical Examples, Exam Preparation)
- Formatted structured output: Definition, Steps, Technical Terms, Examples, Common Mistakes, Quick Quiz
- Save or bookmark answers, copy code blocks, clear chat confirmation, enter-to-send support (Shift+Enter for newline).

### 5. 10-Category Course Catalog & Interactive Lessons (Phase 7)
- 10 Technical Domains:
  1. Artificial Intelligence
  2. Programming and Web Development
  3. Data Science
  4. Mathematics
  5. Science and Technology
  6. Business and Entrepreneurship
  7. Communication Skills
  8. Career Development
  9. Digital Skills
  10. Design and Creativity
- **Course Detail Page:** Overview, prerequisites, tools required, learning objectives, and module-by-module syllabus.
- **Interactive Lesson View:** Step-by-step breakdowns, code snippets, visual explanations, technical terms glossary, common mistakes, practice activity, knowledge-check quiz with instant scoring, mark-as-completed, and *"Ask AI Tutor about this lesson"* deep link.

### 6. Practice & Quizzes (Phase 8)
- Multiple-choice and True/False questions across AI, React, and Placement topics.
- Immediate feedback with thorough explanations for correct and incorrect answers.
- Score calculation, confetti on passing score, attempt tracking, and retry functionality.

### 7. Notes, Bookmarks & Study Tools (Phase 9)
- Create, edit, and delete personal notes with tags.
- Search and filter notes.
- Export all study notes as Markdown (`.md`).
- Bookmark courses, lessons, and AI Tutor answers.

### 8. User Settings & Account Management (Phase 11)
- Edit profile name, bio, and learning level.
- Adjust daily learning target slider (15 to 90 minutes).
- Persistent light and dark theme toggle.
- Password change and delete-account data purge flow.

---

## ⚡ Quick Start & Local Development

### Prerequisites
- Node.js v18+ (tested on v24)
- npm v9+

### Installation & Execution

```bash
# 1. Install dependencies
npm install

# 2. Start both local backend (port 3001) and Vite frontend (port 5173) concurrently:
npm run dev
```

- **Frontend Client:** [http://localhost:5173](http://localhost:5173)
- **Backend API Server:** [http://localhost:3001/api/health](http://localhost:3001/api/health)

### Running Automated Checks

```bash
# Run oxlint static analysis (0 warnings, 0 errors):
npm run lint

# Run automated logic verification suite (10/10 passed):
npm test

# Build production bundle with TypeScript check:
npm run build
```

---

## 🗄️ Database & Cloud Deployment

### Supabase PostgreSQL Setup
A production-grade PostgreSQL migration is available at:
`supabase/migrations/20261019_skillnova_mega14.sql`

Includes:
- Tables for `profiles`, `courses`, `course_modules`, `lessons`, `enrollments`, `lesson_progress`, `quizzes`, `quiz_attempts`, `ai_conversations`, `ai_messages`, `notes`, `bookmarks`, `achievements`.
- Row-Level Security (RLS) policies isolating user records while keeping course content public.

### Vercel Serverless Deployment
The repository includes a clean `vercel.json` routing all `/api/*` requests to `api/index.ts`.
Push to the `main` branch to trigger auto-deployment:
[https://skillnova-lyart.vercel.app](https://skillnova-lyart.vercel.app)
