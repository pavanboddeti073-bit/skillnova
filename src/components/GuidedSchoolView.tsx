import React, { useState } from 'react';
import { 
  Terminal, 
  ExternalLink, 
  Copy, 
  Check, 
  Clock, 
  ShieldAlert, 
  DollarSign, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle, 
  AlertTriangle 
} from 'lucide-react';
import { guidedTutorials } from '../data/tutorials';
import { GuidedTutorial } from '../types';
import { useApp } from '../context/useApp';

export const GuidedSchoolView: React.FC = () => {
  const { language, selectedTutorial, showToast } = useApp();
  
  const [activeTutorial, setActiveTutorial] = useState<GuidedTutorial>(
    selectedTutorial || guidedTutorials[0]
  );
  const [copiedStep, setCopiedStep] = useState<number | null>(null);
  const [expandedStuckStep, setExpandedStuckStep] = useState<number | null>(null);

  const handleCopyPrompt = (prompt: string, stepNumber: number) => {
    navigator.clipboard.writeText(prompt);
    setCopiedStep(stepNumber);
    showToast('Prompt copied to clipboard!');
    setTimeout(() => setCopiedStep(null), 2500);
  };

  return (
    <div className="space-y-8 pb-20">
      
      {/* View Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
          <Terminal className="w-3.5 h-3.5" />
          <span>{language === 'te' ? 'గైడెడ్ టూల్ స్కూల్' : 'Guided Tool School (High Priority)'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {language === 'te' ? 'ప్రధాన టూల్స్ మాస్టరింగ్ ట్యుటోరియల్స్' : 'Master Core AI & Development Toolchains'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-3xl leading-relaxed">
          {language === 'te'
            ? 'గూగుల్ యాంటీగ్రావిటీ, రెప్లిట్, లవబుల్, గిట్‌హబ్ మరియు వెర్సెల్ యొక్క అధికారిక ప్రాక్టికల్ గైడ్స్.'
            : 'Deep, step-by-step interactive walk-throughs for Google Antigravity, Replit, Lovable, GitHub, Vercel, and the winning student hackathon workflow.'}
        </p>
      </div>

      {/* Tutorial Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {guidedTutorials.map((tut) => {
          const isSelected = tut.id === activeTutorial.id;
          return (
            <button
              key={tut.id}
              onClick={() => {
                setActiveTutorial(tut);
                setExpandedStuckStep(null);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{tut.toolName}</span>
              <span className="ml-1.5 opacity-80 font-normal">({tut.steps.length} steps)</span>
            </button>
          );
        })}
      </div>

      {/* Tutorial Master Container */}
      <div className="space-y-6">
        
        {/* Tutorial Orientation Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white shadow-xl border border-slate-700/60 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-wider mb-2 border border-blue-400/30">
                {activeTutorial.badge}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {language === 'te' && activeTutorial.titleTe ? activeTutorial.titleTe : activeTutorial.title}
              </h2>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-slate-300 flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                {activeTutorial.duration}
              </span>
              <a
                href={activeTutorial.officialDocsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-xs"
              >
                <span>Official Docs</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* What it is & When to use it */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700 space-y-1.5">
              <span className="font-bold text-blue-300 uppercase tracking-wider text-[10px]">What It Is:</span>
              <p className="text-slate-200 leading-relaxed">
                {language === 'te' && activeTutorial.whatItIsTe ? activeTutorial.whatItIsTe : activeTutorial.whatItIs}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700 space-y-1.5">
              <span className="font-bold text-emerald-300 uppercase tracking-wider text-[10px]">When To Use It:</span>
              <p className="text-slate-200 leading-relaxed">
                {language === 'te' && activeTutorial.whenToUseItTe ? activeTutorial.whenToUseItTe : activeTutorial.whenToUseIt}
              </p>
            </div>
          </div>

          {/* Safety & Cost Notes */}
          <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              <span><strong>Safety Notice:</strong> {activeTutorial.safetyNotes[0]}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>Cost & Tier:</strong> {activeTutorial.costNotes}</span>
            </div>
          </div>
        </div>

        {/* Step-by-Step Interactive Guide */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>Numbered Execution Steps</span>
            <span className="text-xs text-slate-500 font-normal">
              (Follow each step sequentially)
            </span>
          </h3>

          <div className="space-y-4">
            {activeTutorial.steps.map((step, _idx) => (
              <div 
                key={step.stepNumber}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
                      {step.stepNumber}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {step.title}
                    </h4>
                  </div>

                  <span className="text-xs font-semibold text-slate-400">
                    Step {step.stepNumber} of {activeTutorial.steps.length}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-10">
                  {language === 'te' && step.instructionTe ? step.instructionTe : step.instruction}
                </p>

                {/* Copyable Prompt Block if present */}
                {step.copyablePrompt && (
                  <div className="ml-10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-blue-600" />
                        <span>Recommended Prompt / Command</span>
                      </span>
                      <button
                        onClick={() => handleCopyPrompt(step.copyablePrompt!, step.stepNumber)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold transition-colors"
                      >
                        {copiedStep === step.stepNumber ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedStep === step.stepNumber ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs whitespace-pre-wrap border border-slate-800">
                      {step.copyablePrompt}
                    </div>
                  </div>
                )}

                {/* Expected Result & Checkpoint */}
                <div className="ml-10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-700 block">Expected Result:</span>
                    <p className="text-slate-600">{step.expectedResult}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                    <span className="font-bold text-emerald-900 block flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Self Checkpoint:
                    </span>
                    <p className="text-emerald-950 font-medium">{step.checkpointQuestion}</p>
                  </div>
                </div>

                {/* Stuck Tips Dropdown */}
                {step.stuckTips.length > 0 && (
                  <div className="ml-10 pt-1">
                    <button
                      onClick={() => setExpandedStuckStep(expandedStuckStep === step.stepNumber ? null : step.stepNumber)}
                      className="text-xs font-semibold text-slate-500 hover:text-amber-700 flex items-center gap-1"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                      <span>{expandedStuckStep === step.stepNumber ? 'Hide Troubleshooting' : 'Need help with this step?'}</span>
                    </button>

                    {expandedStuckStep === step.stepNumber && (
                      <div className="mt-2 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1.5 animate-in fade-in-50">
                        <span className="font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                          Troubleshooting Advice:
                        </span>
                        <ul className="space-y-1 pl-4 list-disc text-slate-700">
                          {step.stuckTips.map((tip, i) => (
                            <li key={i}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
