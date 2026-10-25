import React, { useState } from 'react';
import { 
  Layers, 
  CheckCircle2, 
  Copy, 
  Check, 
  HelpCircle, 
  Download, 
  ExternalLink, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  Bookmark,
  Eye
} from 'lucide-react';
import { useApp } from '../context/useApp';
import { buildRecipes } from '../data/recipes';
import { BuildRecipe, StudioStep } from '../types';
import confetti from 'canvas-confetti';

export const BuildStudioView: React.FC = () => {
  const { 
    language, 
    activeRecipeSlug, 
    setActiveRecipeSlug, 
    completedStudioSteps, 
    toggleStudioStep,
    savePrompt,
    showToast 
  } = useApp();

  const currentRecipe: BuildRecipe = buildRecipes.find(r => r.slug === activeRecipeSlug) || buildRecipes[0];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [copiedStepIndex, setCopiedStepIndex] = useState<number | null>(null);
  const [activeStuckMode, setActiveStuckMode] = useState<boolean>(false);
  const [customPromptEdits, setCustomPromptEdits] = useState<Record<number, string>>({});
  const [isEditingPrompt, setIsEditingPrompt] = useState<boolean>(false);

  const completedSteps = completedStudioSteps[currentRecipe.id] || [];
  const activeStep: StudioStep = currentRecipe.steps[currentStepIndex] || currentRecipe.steps[0];

  const handleCopyPrompt = (text: string, stepIndex: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStepIndex(stepIndex);
    showToast('Prompt copied to clipboard!');
    setTimeout(() => setCopiedStepIndex(null), 2500);
  };

  const handleToggleStepCompletion = (stepNumber: number) => {
    toggleStudioStep(currentRecipe.id, stepNumber);
    if (!completedSteps.includes(stepNumber)) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
      showToast('Step completed! Great job moving forward.');
    }
  };

  const handleExportMarkdown = () => {
    const mdContent = `# ${currentRecipe.title}\n\n${currentRecipe.shortDescription}\n\nTarget Deliverable: ${currentRecipe.targetDeliverable}\n\n${currentRecipe.exportTemplate}\n\n---\n*Generated via SkillNova Visual Build Studio*`;
    const blob = new Blob([mdContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentRecipe.slug}-build-recipe.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Downloaded recipe as Markdown file!');
  };

  const effectivePrompt = customPromptEdits[activeStep.stepNumber] !== undefined
    ? customPromptEdits[activeStep.stepNumber]
    : activeStep.copyablePrompt;

  return (
    <div className="space-y-8 pb-20">
      
      {/* Recipe Header & Selector Tabs */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>{language === 'te' ? 'విజువల్ బిల్డ్ స్టూడియో' : 'Visual Step-by-Step Studio'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {language === 'te' ? currentRecipe.titleTe : currentRecipe.title}
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              {language === 'te' ? currentRecipe.shortDescriptionTe : currentRecipe.shortDescription}
            </p>
          </div>

          {/* Export Action */}
          <button
            onClick={handleExportMarkdown}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all shadow-sm shrink-0 self-start md:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>{language === 'te' ? 'గైడ్‌ను డౌన్‌లోడ్ చేయండి (.md)' : 'Export Guide (.md)'}</span>
          </button>
        </div>

        {/* Recipe Selection Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {buildRecipes.map((recipe) => {
            const isSelected = recipe.slug === currentRecipe.slug;
            return (
              <button
                key={recipe.id}
                onClick={() => {
                  setActiveRecipeSlug(recipe.slug);
                  setCurrentStepIndex(0);
                  setActiveStuckMode(false);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {language === 'te' ? recipe.titleTe.split(' ')[0] + '...' : recipe.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Deliverable & Finished Result Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white shadow-md border border-slate-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
            <Eye className="w-4 h-4" />
            <span>{language === 'te' ? 'మేము ఏమి నిర్మిస్తున్నాము' : '1. What We Are Building'}</span>
          </div>
          <p className="text-base sm:text-lg font-medium text-slate-100">
            {currentRecipe.targetDeliverable}
          </p>
          <p className="text-xs text-slate-400">
            <strong>Target Audience:</strong> {currentRecipe.targetAudience} • <strong>Est. Time:</strong> {currentRecipe.durationEstimate}
          </p>
        </div>

        <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 shrink-0 self-stretch md:self-auto text-xs space-y-2">
          <span className="font-semibold text-slate-300 block">Recommended Tools:</span>
          <div className="space-y-1">
            {currentRecipe.recommendedTools.map((tool, idx) => (
              <a
                key={idx}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 text-blue-300 hover:text-blue-200"
              >
                <span className="font-medium">• {tool.name}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Two-Column Step Studio Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Step Navigation Sidebar (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {language === 'te' ? 'దశల జాబితా' : 'Numbered Steps'}
            </span>
            <span className="text-xs font-semibold text-blue-600">
              {completedSteps.length} of {currentRecipe.steps.length} {language === 'te' ? 'పూర్తయ్యాయి' : 'Completed'}
            </span>
          </div>

          <div className="space-y-2">
            {currentRecipe.steps.map((step, idx) => {
              const isActive = idx === currentStepIndex;
              const isDone = completedSteps.includes(step.stepNumber);
              return (
                <div
                  key={step.stepNumber}
                  onClick={() => {
                    setCurrentStepIndex(idx);
                    setActiveStuckMode(false);
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isActive
                      ? 'bg-blue-50/70 border-blue-400 shadow-xs'
                      : isDone
                      ? 'bg-emerald-50/40 border-emerald-200 hover:bg-emerald-50/70'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleStepCompletion(step.stepNumber);
                    }}
                    className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : 'border border-slate-300 text-transparent hover:border-blue-500'
                    }`}
                    aria-label={`Toggle completion for step ${step.stepNumber}`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </button>

                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase text-slate-400">
                      Step {step.stepNumber}
                    </span>
                    <h3 className={`text-xs font-bold leading-tight ${isActive ? 'text-blue-700' : 'text-slate-900'}`}>
                      {language === 'te' && step.titleTe ? step.titleTe : step.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Final Rubric Checklist */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Final Quality Checklist</span>
            </span>
            <ul className="space-y-1.5 text-slate-600 pl-1">
              {currentRecipe.finalChecklist.map((item, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Step Workspace (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Step Detail Container */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
            
            {/* Step Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Step {activeStep.stepNumber} of {currentRecipe.steps.length}
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                  {language === 'te' && activeStep.titleTe ? activeStep.titleTe : activeStep.title}
                </h2>
              </div>

              {/* Mark Completed Button */}
              <button
                onClick={() => handleToggleStepCompletion(activeStep.stepNumber)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  completedSteps.includes(activeStep.stepNumber)
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-slate-900 hover:bg-blue-600 text-white'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>
                  {completedSteps.includes(activeStep.stepNumber) 
                    ? (language === 'te' ? 'పూర్తయింది (Completed)' : 'Step Completed') 
                    : (language === 'te' ? 'పూర్తయినట్లు మార్క్ చేయండి' : 'Mark Step Complete')}
                </span>
              </button>
            </div>

            {/* Visual Sketch / Wireframe Display */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Visual Reference & Layout Sketch</span>
              </span>

              {/* Wireframe Mockup Container */}
              <div className="p-5 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px] text-slate-400">
                  <span>Layout Type: {activeStep.visualType.toUpperCase()}</span>
                  <span className="text-emerald-400">Interactive Blueprint</span>
                </div>

                {activeStep.visualData?.layout === 'outline-tree' && (
                  <div className="space-y-1.5">
                    <p className="text-amber-300 font-bold">{activeStep.visualData.title}:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-sans">
                      {activeStep.visualData.slides.map((s: string, i: number) => (
                        <div key={i} className="p-2 rounded bg-slate-800/80 border border-slate-700 text-slate-200 text-xs">
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeStep.visualData?.wireframeType === 'slide-card' && (
                  <div className="border border-dashed border-slate-700 p-4 rounded-lg bg-slate-800/50 space-y-2 font-sans">
                    <div className="h-6 bg-slate-700/80 rounded flex items-center px-3 font-bold text-white text-xs">
                      [Slide Header: Bold 24pt Takeaway]
                    </div>
                    <div className="grid grid-cols-2 gap-2 h-24">
                      <div className="p-2 rounded bg-slate-800 border border-slate-700 text-[11px] text-slate-300">
                        • Bullet 1 (Under 12 words)<br/>
                        • Bullet 2 (Under 12 words)<br/>
                        • Bullet 3 (Under 12 words)
                      </div>
                      <div className="p-2 rounded bg-slate-800/90 border border-slate-700 flex items-center justify-center text-center text-slate-400 text-[10px]">
                        [Visual Diagram / Chart Image]
                      </div>
                    </div>
                  </div>
                )}

                {activeStep.visualData?.headers && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-sans text-xs">
                      <thead>
                        <tr className="border-b border-slate-700 text-slate-400">
                          {activeStep.visualData.headers.map((h: string, i: number) => (
                            <th key={i} className="py-1.5 px-2 font-semibold">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-slate-300">
                        {activeStep.visualData.rows.map((row: string[], i: number) => (
                          <tr key={i}>
                            {row.map((cell: string, j: number) => (
                              <td key={j} className="py-1.5 px-2">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeStep.visualData?.nodes && (
                  <div className="flex flex-wrap items-center gap-2 font-sans py-2">
                    {activeStep.visualData.nodes.map((node: string, i: number) => (
                      <React.Fragment key={i}>
                        <div className="px-3 py-1.5 rounded-lg bg-blue-950/80 border border-blue-800 text-blue-200 text-xs font-semibold">
                          {node}
                        </div>
                        {i < activeStep.visualData.nodes.length - 1 && (
                          <span className="text-slate-500 font-bold">→</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}

                {activeStep.visualData?.components && !activeStep.visualData.headers && (
                  <div className="space-y-1.5 font-sans">
                    {activeStep.visualData.components.map((c: string, i: number) => (
                      <div key={i} className="p-2 rounded bg-slate-800/60 text-slate-300 text-xs">
                        {c}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Exact Action Instructions */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Action Instructions
              </span>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm leading-relaxed">
                {language === 'te' && activeStep.actionInstructionTe
                  ? activeStep.actionInstructionTe
                  : activeStep.actionInstruction}
              </div>
            </div>

            {/* Copyable Prompt Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Exact Copyable Prompt</span>
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsEditingPrompt(!isEditingPrompt)}
                    className="text-xs font-semibold text-blue-600 hover:underline px-2 py-1"
                  >
                    {isEditingPrompt ? 'Lock Prompt' : 'Edit Prompt'}
                  </button>
                  <button
                    onClick={() => savePrompt(`Step ${activeStep.stepNumber}: ${activeStep.title}`, effectivePrompt)}
                    className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
                    title="Save to Prompt Library"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleCopyPrompt(effectivePrompt, activeStep.stepNumber)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    {copiedStepIndex === activeStep.stepNumber ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {isEditingPrompt ? (
                <textarea
                  value={effectivePrompt}
                  onChange={(e) => setCustomPromptEdits({ ...customPromptEdits, [activeStep.stepNumber]: e.target.value })}
                  rows={6}
                  className="w-full p-4 font-mono text-xs !bg-slate-950 !text-emerald-300 rounded-xl border border-slate-700 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-hidden !caret-emerald-400"
                />
              ) : (
                <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs sm:text-xs leading-relaxed whitespace-pre-wrap border border-slate-800 selection:bg-blue-500 selection:text-white">
                  {effectivePrompt}
                </div>
              )}

              {/* Why Prompt Works & What to Personalize */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200/80 text-amber-900 space-y-1">
                  <span className="font-bold block flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-700" />
                    Why this prompt works:
                  </span>
                  <p className="text-slate-700">{activeStep.promptWhy}</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-200/80 text-blue-900 space-y-1">
                  <span className="font-bold block flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-blue-700" />
                    What to customize:
                  </span>
                  <p className="text-slate-700">{activeStep.promptPersonalize}</p>
                </div>
              </div>
            </div>

            {/* Checkpoint & Stuck Support */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold uppercase text-slate-400">Step Checkpoint</span>
                <p className="text-xs sm:text-sm font-semibold text-slate-800">
                  {activeStep.checkpoint}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveStuckMode(!activeStuckMode)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    activeStuckMode
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  <span>{language === 'te' ? 'సహాయం కావాలి (I\'m stuck)' : 'I\'m stuck'}</span>
                </button>
              </div>
            </div>

            {/* Stuck / Help Drawer */}
            {activeStuckMode && (
              <div className="p-5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs space-y-3 animate-in fade-in-50">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Stuck Troubleshooting & Safe Solutions</span>
                </div>
                <div className="space-y-2">
                  {activeStep.stuckTips.map((tip, i) => (
                    <div key={i} className="p-3 rounded-lg bg-white border border-amber-200/60 space-y-1">
                      <p className="font-semibold text-slate-900">Symptom: {tip.symptom}</p>
                      <p className="text-slate-600">Action: {tip.fix}</p>
                      {tip.docLink && (
                        <a 
                          href={tip.docLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:underline mt-1"
                        >
                          <span>Official Documentation Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Step Prev/Next Navigation */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                disabled={currentStepIndex === 0}
                onClick={() => {
                  setCurrentStepIndex(currentStepIndex - 1);
                  setActiveStuckMode(false);
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border ${
                  currentStepIndex === 0
                    ? 'opacity-40 cursor-not-allowed text-slate-400 border-slate-200'
                    : 'text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous Step</span>
              </button>

              <button
                disabled={currentStepIndex === currentRecipe.steps.length - 1}
                onClick={() => {
                  setCurrentStepIndex(currentStepIndex + 1);
                  setActiveStuckMode(false);
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold ${
                  currentStepIndex === currentRecipe.steps.length - 1
                    ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-400'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                }`}
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
