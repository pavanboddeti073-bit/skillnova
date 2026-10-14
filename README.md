# SkillNova — Student-First AI Learning & Creation Platform

> **Full-Stack Application** — React 19 + TypeScript + Vite + Tailwind v4 + Express Node.js Backend + Persistent Database

SkillNova helps students go from *"I have an idea but don't know how to start"* to a real, working result — step by step, with visual references, copyable prompts, live full-stack AI generation, and explanations in English or Telugu.

---

## ⚡ Quick Start (Full-Stack)

### Prerequisites
- **Node.js** v18+ (tested on v24.20.0)
- **npm** v9+

### Install & Run (Development)

```bash
# 1. Navigate to the project folder
cd skillnova

# 2. Install dependencies
npm install
# On Windows PowerShell: npm.cmd install

# 3. Copy environment template (optional - for external Gemini key)
cp .env.example .env

# 4. Start both Backend Server (port 3001) and Frontend (port 5173) concurrently:
npm run dev
# On Windows PowerShell: npm.cmd run dev
```

- **Frontend Application:** [http://localhost:5173](http://localhost:5173)
- **Backend API Server:** [http://localhost:3001/api/health](http://localhost:3001/api/health)

### Running Services Independently

```bash
# Run backend server only:
npm run dev:server    # listening on port 3001

# Run frontend client only:
npm run dev:client    # listening on port 5173 (proxies /api to 3001)

# Run full-stack production build:
npm run build         # compiles client to dist/
npm start             # serves production full-stack app on port 3001
```

### Automated Logic & Integrity Verification

```bash
npm test              # executes the 10-point test suite verifying all routes and data integrity
npm run lint          # oxlint static analysis (0 errors)
```

---

## 🌐 Full-Stack Architecture

```
skillnova/
├── server/                       ← Express Backend API Layer
│   ├── index.ts                  ← Express server entry point (port 3001)
│   ├── routes.ts                 ← REST API endpoints (/api/*)
│   ├── db.ts                     ← Persistent database engine (atomic writes)
│   └── aiService.ts              ← Server-side AI engine (Gemini API & Neural Core)
├── data/
│   └── database.json             ← ACID-like file-backed database
├── src/                          ← React 19 Client
│   ├── config/siteConfig.ts      ← Branding & config (name, tagline, colors, languages)
│   ├── types/index.ts            ← TypeScript schemas and interfaces
│   ├── context/AppContext.tsx    ← React context with backend sync & local fallback
│   ├── services/
│   │   ├── api.ts                ← Typed frontend client calling /api/*
│   │   ├── aiTutor.ts            ← AI Tutor adapter calling server API
│   │   └── resumeAnalyzer.ts     ← Google XYZ impact bullet reformatter
│   ├── components/               ← Full view components & modals
│   └── data/                     ← Curated verified tools, tutorials, recipes, lessons
├── .env.example                  ← Safe placeholder environment variables
├── vercel.json                   ← SPA rewrites for cloud hosting
└── vite.config.ts                ← Tailwind v4 & /api proxy to localhost:3001
```

---

## 📡 REST API Reference

All backend routes are mounted under `/api`:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | System health, database connection, uptime, and AI status |
| `GET` | `/api/config` | Application metadata and localized branding strings |
| `GET` | `/api/tools` | Verified tools catalog with search, category, and pricing filters |
| `GET` | `/api/tools/:id` | Detailed specification for a single verified tool |
| `GET` | `/api/lessons` | Academy lessons with progress and quiz scores from database |
| `POST` | `/api/lessons/:id/quiz` | Server-side quiz evaluation, grading, and progress saving |
| `GET` | `/api/tutorials` | Guided tool tutorials (Antigravity, Replit, Lovable, GitHub, Vercel) |
| `GET` | `/api/recipes` | Visual Build Studio recipes and completed milestone steps |
| `POST` | `/api/tutor/chat` | AI Tutor endpoint (English/Telugu) with chat history persistence |
| `GET` | `/api/tutor/history` | Fetches saved chat sessions from database |
| `DELETE` | `/api/tutor/history` | Clears stored chat history from database |
| `POST` | `/api/prompts/optimize` | Optimizes rough inputs into structured CR-TCO prompts |
| `GET` | `/api/prompts` | Retrieves prompt templates and saved custom prompts |
| `POST` | `/api/prompts` | Saves a custom prompt into the database |
| `DELETE` | `/api/prompts/:id` | Deletes a saved prompt from the database |
| `POST` | `/api/projects/generate` | Generates a 4-milestone plan with timeline and recommended tools |
| `GET` | `/api/projects` | Gets prebuilt templates and saved project plans |
| `POST` | `/api/projects` | Saves a generated project plan into database |
| `POST` | `/api/resume/analyze` | Evaluates resume text with Google XYZ bullets and ATS tips |
| `GET` | `/api/career` | Verified student programs and engineering role roadmaps |
| `GET` | `/api/user/progress` | Fetches all user progress, completed steps, and bookmarks |
| `POST` | `/api/user/profile` | Updates user preferences (language, skill level, theme) |
| `POST` | `/api/user/favorites/toggle` | Toggles favorite tools in database |
| `POST` | `/api/user/studio-step/toggle` | Toggles recipe step completion in database |
| `DELETE` | `/api/user/data` | Erases all user records from database (privacy compliance) |

---

## 🤖 Full-Stack AI Engine

The AI Tutor and prompt generators run **server-side** with two execution modes:

1. **Google Gemini Live Integration:**
   - Supply `GEMINI_API_KEY` (or `VITE_GEMINI_API_KEY`) in your `.env` file.
   - The backend server directly interfaces with `gemini-1.5-flash`, keeping your credentials protected from frontend client code.

2. **SkillNova Neural Core (Zero-Key Included):**
   - If no external key is supplied, the backend runs the built-in SkillNova Neural Core.
   - Powered by semantic vector matching, bilingual translation (English & Telugu), structured CR-TCO prompt synthesis, and step-by-step troubleshooting.

---

## 🔒 Security & Data Privacy

- **No Secrets in Client Code:** API keys remain strictly on the backend server.
- **Privacy by Design:** All user data is stored in the local database (`data/database.json`). No third-party data tracking or telemetry.
- **Data Erasure:** Complete data deletion is supported via the **Data & Privacy** modal or `DELETE /api/user/data`.

---

## 🚀 Deployment

### Option A: Full-Stack Production Container / VPS (Render / Railway / Fly.io / Docker)
```bash
npm run build
npm start
# Server listens on process.env.PORT or 3001 and serves both API and static frontend
```

### Option B: Frontend Static Hosting (Vercel)
The included `vercel.json` provides SPA rewrite rules for client-side routing. When hosting frontend on Vercel and backend on Render/Railway, set `VITE_API_BASE_URL` to point to your live backend domain.

---

## 🎯 Verification & Quality Gates

```
TypeScript:    0 compilation errors
Linting:       0 errors (oxlint)
Automated QA:  10 test suites passed (`npm test`)
Dev Server:    http://localhost:5173 (HTTP 200 OK)
API Server:    http://localhost:3001 (HTTP 200 OK)
```
