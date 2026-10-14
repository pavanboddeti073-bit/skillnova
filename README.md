# SkillNova — Student-First AI Learning & Creation Platform

> **Hackathon MVP** — React 19 + Vite + Tailwind v4 + TypeScript

SkillNova helps students go from *"I have an idea but don't know how to start"* to a real, working result — step by step, with visual references, copyable prompts, and explanations in English or Telugu.

---

## Quick Start

### Prerequisites
- **Node.js** v18+ (tested on v24.20.0)
- **npm** v9+

### Install & Run (Development)

```bash
# 1. Navigate to the project folder
cd skillnova

# 2. Install dependencies
npm install
# On Windows PowerShell use: npm.cmd install

# 3. Copy environment template (optional — see Demo Mode below)
cp .env.example .env

# 4. Start dev server at http://localhost:5173
npm run dev
# On Windows PowerShell use: npm.cmd run dev
```

### Production Build

```bash
npm run build    # Outputs to dist/
npm run preview  # Preview the production build locally
```

---

## Environment Variables

Copy `.env.example` → `.env` and fill in:

| Variable | Required | Description |
|---|---|---|
| `VITE_GEMINI_API_KEY` | Optional | Google Gemini API key for live AI Tutor responses |

> **⚠️ Never commit a real API key.** The `.env` file is git-ignored. Only `.env.example` (with placeholder names) is committed.

### Getting a Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Click **Get API Key → Create API key**
3. Paste the key into `.env` as `VITE_GEMINI_API_KEY=your_key_here`

---

## Demo Mode

The AI Tutor works **without any API key** in Demo Mode:
- A `🎓 Demo Mode Active` badge is shown in the chat header
- Responses are curated educational content (English & Telugu)
- No API calls are made — fully offline

When a valid `VITE_GEMINI_API_KEY` is present, the tutor automatically switches to live Gemini API responses.

---

## Features

| Section | What It Does |
|---|---|
| 🏠 **Dashboard** | Welcome screen with quick-start cards and goal launcher |
| 🎨 **Visual Build Studio** | Guided recipes for PPTs, websites, documents, creative media |
| 🔭 **AI Tools Explorer** | 18+ verified tools with honest pricing labels and filters |
| 📚 **Guided School** | Deep tutorials for Antigravity, Replit, Lovable, GitHub, Vercel |
| 🧪 **Prompt Lab** | CR-TCO prompt builder with save/export and 6 templates |
| 🛠️ **Project Wizard** | 4-step wizard to turn an idea into a milestone plan |
| 🎓 **Academy** | 5 structured lessons (Beginner→Advanced) with interactive quizzes |
| 🤖 **AI Tutor** | Chat assistant in English & Telugu (live Gemini or Demo Mode) |
| 💼 **Career Hub** | Resume analyzer + 7 verified career programs + role roadmaps |
| 🔒 **Data & Privacy** | View or erase all locally stored data at any time |

---

## Project Structure

```
skillnova/
├── src/
│   ├── config/siteConfig.ts      ← Single config: name, tagline, colors, languages
│   ├── types/index.ts            ← All TypeScript interfaces
│   ├── context/AppContext.tsx    ← Global state + localStorage persistence
│   ├── data/
│   │   ├── tools.ts              ← 18 tools with verified pricing + dates
│   │   ├── tutorials.ts          ← 6 deep guided tutorials
│   │   ├── recipes.ts            ← 5 Build Studio recipes
│   │   ├── lessons.ts            ← 5 Academy lessons with quizzes
│   │   ├── projectTemplates.ts   ← 3 prebuilt project plans
│   │   ├── careerResources.ts    ← 7 verified career programs + roadmaps
│   │   └── promptTemplates.ts    ← 6 CR-TCO prompt templates
│   ├── services/
│   │   ├── aiTutor.ts            ← Gemini API adapter + demo fallback
│   │   └── resumeAnalyzer.ts     ← XYZ bullet reformatter + ATS tips
│   └── components/               ← One file per view/modal
├── .env.example                  ← Placeholder env vars (no real keys committed)
├── vercel.json                   ← SPA rewrite rule for client routing
└── vite.config.ts                ← Tailwind v4 via @tailwindcss/vite
```

### Tech Stack

| Layer | Technology |
|---|---|
| UI | React 19 |
| Build | Vite 6 |
| Styling | Tailwind CSS v4 (no config file needed) |
| Language | TypeScript |
| Confetti | canvas-confetti |
| AI (optional) | Google Gemini API |

---

## Branding & Configuration

All branding lives in one file: [`src/config/siteConfig.ts`](./src/config/siteConfig.ts)

```ts
export const siteConfig = {
  name: 'SkillNova',
  tagline: 'From idea to result — step by step.',
  primaryColor: 'blue',
  supportedLanguages: ['en', 'te'],
};
```

Change `name`, `tagline`, `primaryColor`, and `supportedLanguages` here. No other files need editing for basic rebranding.

---

## Deploying to Vercel

1. Push code to a **GitHub repository** (ensure `.env` stays in `.gitignore` ✅)
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo
3. Vercel auto-detects Vite — leave build settings as default
4. Add environment variable: `VITE_GEMINI_API_KEY` → your key (optional)
5. Click **Deploy**

The included `vercel.json` SPA rewrite ensures page reloads don't 404:
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

---

## Data & Privacy

- **No backend, no database** — all user data stays in your browser's `localStorage`
- Data stored: completed lessons, favorite tools, saved prompts, saved plans, language/level preferences
- Resume text is analyzed locally (client-side) and never uploaded
- AI Tutor queries are sent to Gemini only when a key is configured
- Users can erase all data at any time via **Data & Privacy → Erase All My Data**

---

## Known Limitations & Assumptions

| Area | Status | Notes |
|---|---|---|
| AI Tutor API key | Optional | Runs in Demo Mode without a key |
| Pricing data | Verified 2026-10-14 | Prices change — always check official links |
| Internship listings | No live listings | Official portal URLs only with `lastCheckedAt` dates |
| Telugu translations | Partial | Major UI + AI Tutor covered; some minor labels remain in English |
| OAuth / login | ❌ Not implemented | All features work without an account for demo purposes |
| Code splitting | Warning | Bundle is ~560 KB; acceptable for hackathon MVP |

---

## Hackathon Demo Script (90 seconds)

1. **(0–10s)** Open app → Dashboard → type "Build a portfolio website" → click the quick-start card
2. **(10–25s)** Visual Build Studio opens with the Website recipe → walk through Step 1 (plan), copy the prompt
3. **(25–40s)** Switch to AI Tools Explorer → search "free" → open Replit card for full pricing/setup detail
4. **(40–55s)** Open Prompt Lab → pick "Website Creation" template → fill fields → Generate → copy structured prompt
5. **(55–70s)** Open AI Tutor → ask "How do I deploy my website for free?" → show Demo or live Gemini response
6. **(70–80s)** Toggle language to **Telugu** → show localized UI text
7. **(80–90s)** Show Academy → open a lesson → complete a quiz → confetti fires ✅

---

## Lint & Build Status

```
TypeScript: 0 errors
Lint:       0 errors, ~20 warnings (false-positive react/purity from oxlint on event handlers)
Build:      ✓ dist/assets/index.js  560 KB (gzip 169 KB)
            ✓ dist/assets/index.css  54 KB  (gzip 9.6 KB)
```

---

## Team & Credits

Built for a hackathon by a student team.

Tool data verified against official sources as of **2026-10-14**. No "free forever" claims are made. Pricing labels (`Free Tier`, `Open Source`, `Free Trial`, `Paid`) reflect official documentation at time of verification and may change.

This project does not scrape websites or bypass any service terms of use. All content references official APIs, documentation, or manually curated educational guides.
