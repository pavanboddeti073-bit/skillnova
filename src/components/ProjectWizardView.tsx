import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Copy, 
  Check, 
  Download, 
  RotateCcw, 
  Bookmark, 
  Laptop, 
  Smartphone, 
  Cloud, 
  Wrench,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { prebuiltProjectPlans } from '../data/projectTemplates';
import { GeneratedProjectPlan, ProjectWizardAnswer, SkillLevel } from '../types';
import confetti from 'canvas-confetti';

export const ProjectWizardView: React.FC = () => {
  const { language, level, launcherGoal, savePlan, showToast } = useApp();

  const [stepIndex, setStepIndex] = useState<number>(0);
  const [formData, setFormData] = useState<ProjectWizardAnswer>({
    goal: launcherGoal || 'Build a student study habit tracker with local storage',
    level: level,
    language: language,
    budget: 'zero_cost',
    device: 'basic_laptop',
    desiredOutput: 'A working web app with live URL and clean GitHub repository',
    deadline: '24 to 48 hours (Hackathon timeframe)'
  });

  const [activePlan, setActivePlan] = useState<GeneratedProjectPlan>(prebuiltProjectPlans[0]);
  const [completedMilestones, setCompletedMilestones] = useState<number[]>([]);
  const [copiedPromptMilestone, setCopiedPromptMilestone] = useState<number | null>(null);

  // Sync if launcherGoal changed
  useEffect(() => {
    if (launcherGoal) {
      setFormData(prev => ({ ...prev, goal: launcherGoal }));
    }
  }, [launcherGoal]);

  const handleNextStep = () => {
    if (stepIndex < 3) {
      setStepIndex(stepIndex + 1);
    } else {
      generateTailoredPlan();
    }
  };

  const handlePrevStep = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  };

  const generateTailoredPlan = () => {
    // Generate explainable tailored plan based on budget, device, and goal
    let recommendedToolName = 'Google Antigravity & Replit';
    let toolReason = 'Zero local compute required; perfect for basic laptops and fast prototyping.';
    if (formData.device === 'capable_pc') {
      recommendedToolName = 'Cursor / Antigravity + Local Node.js';
      toolReason = 'Leverages local hardware with full terminal control and fast build speeds.';
    } else if (formData.device === 'mobile_only' || formData.device === 'cloud_first') {
      recommendedToolName = 'Replit Cloud IDE';
      toolReason = 'Runs entirely in any web browser without needing any local dev tools.';
    }

    const newPlan: GeneratedProjectPlan = {
      id: 'plan-' + Date.now(),
      goalSummary: formData.goal,
      goalSummaryTe: language === 'te' ? `'${formData.goal}' కోసం అనుకూలీకరించిన ప్రాజెక్ట్ ప్రణాళిక` : undefined,
      prerequisites: [
        'Basic familiarity with web components',
        'Free GitHub account for version control',
        'Free Vercel account for instant live deployment'
      ],
      recommendedTools: [
        {
          name: recommendedToolName,
          role: 'Primary Builder',
          reason: toolReason,
          pricingNote: formData.budget === 'zero_cost' ? '100% Free Tier used exclusively' : 'Free tier / low-cost credits',
          url: 'https://skillnova.dev'
        },
        {
          name: 'GitHub',
          role: 'Version Control & Proof',
          reason: 'Protects your code against loss and provides public portfolio verification for recruiters.',
          pricingNote: 'Free unlimited repositories',
          url: 'https://github.com'
        },
        {
          name: 'Vercel',
          role: 'Cloud Deployment',
          reason: 'Instant automated deployments with HTTPS on every git push.',
          pricingNote: 'Free forever for student projects',
          url: 'https://vercel.com'
        }
      ],
      milestones: [
        {
          milestoneNumber: 1,
          title: 'Scaffold Core Layout & Architecture',
          description: `Initialize the project structure for: "${formData.goal}". Establish components, theme colors, and responsive boundaries.`,
          copyablePrompt: `I am building an MVP for: "${formData.goal}".\nCreate a clean, responsive layout in React with Tailwind CSS. Include a header, a main workspace card, and responsive mobile navigation. Keep components modular and self-contained with TypeScript types.`,
          checkpoint: 'The application runs with zero console errors and adapts to both mobile (375px) and desktop screens.',
          commonErrorAndFix: 'Common issue: Hardcoding absolute pixel widths (e.g. w-[1000px]) that break on mobile. Fix: Use max-w-7xl w-full mx-auto px-4.'
        },
        {
          milestoneNumber: 2,
          title: 'Implement Interactive Core Logic & State',
          description: 'Build the primary interactive value (data input, list rendering, filter, or calculation) with state persistence.',
          copyablePrompt: `Implement the core state logic for "${formData.goal}". Allow adding, editing, and deleting items with localStorage persistence. Include an empty state illustration when 0 items are present.`,
          checkpoint: 'State updates immediately in the UI and survives a full browser page refresh (F5).',
          commonErrorAndFix: 'Common issue: JSON.parse throwing exceptions on empty storage. Fix: Wrap in try/catch block with fallback empty array.'
        },
        {
          milestoneNumber: 3,
          title: 'Test Edge Cases, Push to GitHub & Deploy to Vercel',
          description: 'Run production build, initialize git, push clean code to GitHub, and deploy live on Vercel.',
          copyablePrompt: `git init\ngit add .\ngit commit -m "feat: complete MVP for ${formData.goal.slice(0, 30)}"\ngit push origin main`,
          checkpoint: 'Your live Vercel URL is running on HTTPS and ready to share with hackathon judges.',
          commonErrorAndFix: 'Common issue: Build breaks on Vercel due to TypeScript warning. Fix: Run "npm run build" locally first to verify.'
        }
      ],
      testingChecklist: [
        'Tested responsive layout on 375px mobile viewport.',
        'Verified localStorage persistence across page refreshes.',
        'Checked that all buttons and links perform real actions.',
        'Live Vercel URL verified on HTTPS with zero broken images.'
      ],
      officialReferences: [
        { label: 'Official Vercel Documentation', url: 'https://vercel.com/docs', lastVerified: '2026-10-14' },
        { label: 'GitHub Student Guide', url: 'https://docs.github.com', lastVerified: '2026-10-14' }
      ],
      createdAt: new Date().toLocaleDateString()
    };

    setActivePlan(newPlan);
    setCompletedMilestones([]);
    setStepIndex(4); // View Plan
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
    showToast('Your custom Project Build Kit is ready!');
  };

  const handleCopyPrompt = (prompt: string, idx: number) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPromptMilestone(idx);
    showToast('Prompt copied to clipboard!');
    setTimeout(() => setCopiedPromptMilestone(null), 2500);
  };

  const handleToggleMilestone = (milestoneNumber: number) => {
    setCompletedMilestones(prev => {
      const next = prev.includes(milestoneNumber)
        ? prev.filter(m => m !== milestoneNumber)
        : [...prev, milestoneNumber];
      if (next.includes(milestoneNumber)) {
        confetti({ particleCount: 30, spread: 50 });
      }
      return next;
    });
  };

  const handleExportPlanMarkdown = () => {
    const md = `# Project Plan: ${activePlan.goalSummary}\n\n**Generated via SkillNova Idea-to-Project Wizard**\n\n## Prerequisites\n${activePlan.prerequisites.map(p => `- ${p}`).join('\n')}\n\n## Recommended Tools\n${activePlan.recommendedTools.map(t => `- **${t.name}** (${t.role}): ${t.reason} [${t.pricingNote}]`).join('\n')}\n\n## Milestones & Prompts\n${activePlan.milestones.map(m => `### Milestone ${m.milestoneNumber}: ${m.title}\n${m.description}\n\n\`\`\`text\n${m.copyablePrompt}\n\`\`\`\n\n**Checkpoint:** ${m.checkpoint}\n**Troubleshooting:** ${m.commonErrorAndFix}\n`).join('\n')}\n\n## Final Testing Checklist\n${activePlan.testingChecklist.map(c => `- [ ] ${c}`).join('\n')}\n`;
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `project-plan-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Plan downloaded as Markdown!');
  };

  return (
    <div className="space-y-8 pb-20">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>{language === 'te' ? 'ప్రాజెక్ట్ పాత్ విజార్డ్' : 'Project Path / Idea-to-Project Wizard'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {language === 'te' ? 'ఆలోచనను ప్రాజెక్ట్ కిట్‌గా మార్చండి' : 'Turn Your Idea into a Working Project Kit'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-3xl leading-relaxed">
          {language === 'te'
            ? 'మీ ఆలోచన, బడ్జెట్ మరియు కంప్యూటర్ వివరాలను చెప్పండి. సరైన టూల్స్, మైల్‌స్టోన్స్ మరియు ప్రాంప్ట్‌లతో కూడిన పూర్తి రోడ్‌మ్యాప్ పొందండి.'
            : 'Answer 4 quick questions about your project idea, device, budget, and deadline to generate a tailored build kit with explainable tool recommendations and copyable milestone prompts.'}
        </p>
      </div>

      {/* Prebuilt Quick-Load Templates */}
      {stepIndex < 4 && (
        <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Or Start From a Prebuilt Hackathon Template:</span>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {prebuiltProjectPlans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => {
                  setActivePlan(plan);
                  setCompletedMilestones([]);
                  setStepIndex(4);
                  showToast('Loaded prebuilt project plan!');
                }}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer bg-slate-50/50 flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 text-xs line-clamp-1">{plan.goalSummary}</h3>
                  <span className="text-[10px] text-slate-500 block">{plan.milestones.length} structured milestones</span>
                </div>
                <span className="text-[11px] font-semibold text-blue-600 mt-2 block">
                  Load Template →
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Wizard Form Steps */}
      {stepIndex < 4 ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 max-w-2xl mx-auto">
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-xs">
            <span className="font-bold text-blue-600">Question {stepIndex + 1} of 4</span>
            <span className="text-slate-400">Step: {
              stepIndex === 0 ? 'Goal & Output' :
              stepIndex === 1 ? 'Skill Level & Language' :
              stepIndex === 2 ? 'Budget Profile' : 'Device & Specs'
            }</span>
          </div>

          {/* Step 0: Goal */}
          {stepIndex === 0 && (
            <div className="space-y-4 animate-in fade-in-50">
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-900 block">
                  What do you want to create?
                </label>
                <p className="text-xs text-slate-500">
                  Explain your project idea in everyday conversational language.
                </p>
              </div>

              <textarea
                rows={3}
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                placeholder="e.g. Build an AI-assisted campus lost & found board with image upload and instant search..."
                className="w-full p-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />

              <div className="space-y-1 pt-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Desired Output Deliverable:
                </label>
                <input
                  type="text"
                  value={formData.desiredOutput}
                  onChange={(e) => setFormData({ ...formData, desiredOutput: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>
          )}

          {/* Step 1: Level & Language */}
          {stepIndex === 1 && (
            <div className="space-y-4 animate-in fade-in-50">
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-900 block">
                  Current Experience Level:
                </label>
                <p className="text-xs text-slate-500">
                  We adapt prompt depth and technical jargon to your comfort level.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {(['beginner', 'intermediate', 'advanced'] as SkillLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setFormData({ ...formData, level: lvl })}
                    className={`p-3 rounded-xl border text-center text-xs font-bold capitalize transition-all ${
                      formData.level === lvl
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>

              <div className="space-y-1 pt-3 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-700 block">
                  Preferred Explanation Language:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, language: 'en' })}
                    className={`p-3 rounded-xl border text-center text-xs font-bold transition-all ${
                      formData.language === 'en'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, language: 'te' })}
                    className={`p-3 rounded-xl border text-center text-xs font-bold transition-all ${
                      formData.language === 'te'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    తెలుగు (Telugu)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Budget */}
          {stepIndex === 2 && (
            <div className="space-y-4 animate-in fade-in-50">
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-900 block">
                  What is your project budget?
                </label>
                <p className="text-xs text-slate-500">
                  We guarantee no surprise fees; zero-cost prioritizes genuine free tiers and open source.
                </p>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    id: 'zero_cost',
                    title: 'Zero Cost Priority (100% Free)',
                    desc: 'Prioritize free plans (Vercel Hobby, Google AI Studio free tier, GitHub free student pack).'
                  },
                  {
                    id: 'free_tier_ok',
                    title: 'Free Tiers & Free Trials Acceptable',
                    desc: 'Include tools with generous free starter credits (Lovable, Gamma, Replit).'
                  },
                  {
                    id: 'paid_ok',
                    title: 'Paid / Pro Tools Acceptable',
                    desc: 'Include premium tool options when commercial features are desired.'
                  }
                ].map((tier) => (
                  <div
                    key={tier.id}
                    onClick={() => setFormData({ ...formData, budget: tier.id as any })}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      formData.budget === tier.id
                        ? 'bg-blue-50/70 border-blue-500 shadow-xs'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      formData.budget === tier.id ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                    }`}>
                      {formData.budget === tier.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div className="space-y-0.5">
                      <span className="font-bold text-xs text-slate-900">{tier.title}</span>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{tier.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Device */}
          {stepIndex === 3 && (
            <div className="space-y-4 animate-in fade-in-50">
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-900 block">
                  What device are you building on?
                </label>
                <p className="text-xs text-slate-500">
                  Ensures we don't recommend heavy local tools that crash your computer.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'basic_laptop', title: 'Basic Laptop / College Lab PC', icon: <Laptop className="w-4 h-4 text-blue-600" /> },
                  { id: 'capable_pc', title: 'Modern Dev PC (16GB+ RAM)', icon: <Laptop className="w-4 h-4 text-indigo-600" /> },
                  { id: 'cloud_first', title: 'Cloud-First / Chromebook', icon: <Cloud className="w-4 h-4 text-sky-600" /> },
                  { id: 'mobile_only', title: 'Mobile / Tablet Only', icon: <Smartphone className="w-4 h-4 text-emerald-600" /> }
                ].map((dev) => (
                  <button
                    key={dev.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, device: dev.id as any })}
                    className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${
                      formData.device === dev.id
                        ? 'bg-blue-50 border-blue-500 shadow-xs'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {dev.icon}
                    <span className="text-xs font-bold text-slate-800">{dev.title}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-700 block">
                  Target Deadline:
                </label>
                <input
                  type="text"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              disabled={stepIndex === 0}
              onClick={handlePrevStep}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border ${
                stepIndex === 0
                  ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400'
                  : 'text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleNextStep}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs"
            >
              <span>{stepIndex === 3 ? 'Generate Build Kit' : 'Next Question'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      ) : (
        /* Generated Project Plan View (Step 4) */
        <div className="space-y-6">
          
          {/* Plan Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Custom Generated Build Kit
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                {activePlan.goalSummary}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Milestones completed: {completedMilestones.length} of {activePlan.milestones.length}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setStepIndex(0)}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart Wizard</span>
              </button>
              <button
                onClick={() => savePlan(activePlan)}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 text-xs font-semibold hover:bg-blue-100"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Save to Dashboard</span>
              </button>
              <button
                onClick={handleExportPlanMarkdown}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export (.md)</span>
              </button>
            </div>
          </div>

          {/* Explainable Tool Recommendations */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-blue-600" />
              <span>Recommended Toolchain & Rationale (Explainable)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activePlan.recommendedTools.map((tool, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{tool.name}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      {tool.role}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{tool.reason}</p>
                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="text-emerald-700 font-medium">{tool.pricingNote}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Numbered Build Milestones with Copyable Prompts */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Numbered Build Steps & Copyable Milestone Prompts
            </h3>

            <div className="space-y-4">
              {activePlan.milestones.map((m, idx) => {
                const isCompleted = completedMilestones.includes(m.milestoneNumber);
                return (
                  <div
                    key={m.milestoneNumber}
                    className={`p-6 rounded-2xl border transition-all ${
                      isCompleted
                        ? 'bg-emerald-50/30 border-emerald-300'
                        : 'bg-white border-slate-200 shadow-xs'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleToggleMilestone(m.milestoneNumber)}
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                            isCompleted
                              ? 'bg-emerald-600 text-white'
                              : 'border-2 border-slate-300 hover:border-blue-500'
                          }`}
                        >
                          {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                        <h4 className="font-bold text-slate-900 text-sm">
                          Milestone {m.milestoneNumber}: {m.title}
                        </h4>
                      </div>

                      <button
                        onClick={() => handleToggleMilestone(m.milestoneNumber)}
                        className={`text-xs font-semibold px-3 py-1 rounded-lg transition-colors self-start sm:self-auto ${
                          isCompleted
                            ? 'text-emerald-800 bg-emerald-100'
                            : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
                        }`}
                      >
                        {isCompleted ? 'Marked Complete ✓' : 'Mark Milestone Complete'}
                      </button>
                    </div>

                    <div className="pt-3 space-y-3 pl-9">
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {m.description}
                      </p>

                      {/* Prompt Block */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-blue-600" />
                            <span>Copyable Milestone Prompt</span>
                          </span>
                          <button
                            onClick={() => handleCopyPrompt(m.copyablePrompt, idx)}
                            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
                          >
                            {copiedPromptMilestone === idx ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedPromptMilestone === idx ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                        <div className="p-3.5 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs whitespace-pre-wrap border border-slate-800">
                          {m.copyablePrompt}
                        </div>
                      </div>

                      {/* Checkpoint & Error Handling */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-0.5">
                          <span className="font-bold text-slate-700 block">Expected Checkpoint:</span>
                          <p className="text-slate-600">{m.checkpoint}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200/80 space-y-0.5">
                          <span className="font-bold text-amber-900 block flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                            Common Trap & Fix:
                          </span>
                          <p className="text-amber-950">{m.commonErrorAndFix}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Testing and Final Checklist */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Final Quality & Testing Checklist</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {activePlan.testingChecklist.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-300">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
