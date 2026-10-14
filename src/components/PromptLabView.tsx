import React, { useState } from 'react';
import { 
  Terminal, 
  Sparkles, 
  Copy, 
  Check, 
  Bookmark, 
  Download, 
  RotateCcw, 
  Lightbulb, 
  Trash2,
  FileCheck
} from 'lucide-react';
import { promptTemplates } from '../data/promptTemplates';
import { PromptTemplate } from '../types';
import { useApp } from '../context/useApp';

export const PromptLabView: React.FC = () => {
  const { language, savePrompt, savedPrompts, deletePrompt, showToast } = useApp();

  const [role, setRole] = useState('Senior Staff Software Engineer specializing in clean React & TypeScript');
  const [context, setContext] = useState('I am a 3rd-year engineering student building my first hackathon MVP.');
  const [task, setTask] = useState('Build a responsive student study task tracker with local storage persistence.');
  const [constraints, setConstraints] = useState('Keep under 150 lines, WCAG AA accessible contrast, zero external heavy UI libraries.');
  const [outputFormat, setOutputFormat] = useState('Clean TypeScript React component code with inline comments and TypeScript interfaces.');
  const [qualityChecks, setQualityChecks] = useState('Does it handle empty task states? Are mobile touch targets at least 44px?');
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedSavedId, setCopiedSavedId] = useState<string | null>(null);

  // Generate the formatted CR-TCO prompt
  const generatedPrompt = `## Role
${role}

## Context
${context}

## Core Task
${task}

## Constraints & Rules
${constraints}

## Desired Output Format
${outputFormat}

## Quality Verification Checks
${qualityChecks}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopiedPrompt(true);
    showToast('Structured prompt copied to clipboard!');
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleSave = () => {
    savePrompt(task.slice(0, 40) + '...', generatedPrompt);
  };

  const handleExportMarkdown = () => {
    const blob = new Blob([generatedPrompt], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `structured-prompt-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Exported prompt as Markdown file!');
  };

  const handleLoadTemplate = (tpl: PromptTemplate) => {
    setRole(tpl.role);
    setContext(tpl.context);
    setTask(tpl.task);
    setConstraints(tpl.constraints);
    setOutputFormat(tpl.outputFormat);
    setQualityChecks(tpl.qualityChecks);
    showToast(`Loaded "${tpl.title}" template!`);
  };

  const handleReset = () => {
    setRole('');
    setContext('');
    setTask('');
    setConstraints('');
    setOutputFormat('');
    setQualityChecks('');
    showToast('Prompt builder cleared');
  };

  return (
    <div className="space-y-8 pb-20">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-semibold">
          <Terminal className="w-3.5 h-3.5" />
          <span>{language === 'te' ? 'ప్రాంప్ట్ ల్యాబ్' : 'Prompt Lab & Engineering Studio'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {language === 'te' ? 'CR-TCO స్ట్రక్చర్డ్ ప్రాంప్ట్ బిల్డర్' : 'The CR-TCO Structured Prompt Studio'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-3xl leading-relaxed">
          {language === 'te'
            ? 'పాత్ర, సందర్భం, పరిమితులు మరియు అవుట్‌పుట్ ఫార్మాట్‌తో కూడిన ప్రొఫెషనల్ ప్రాంప్ట్‌లను రూపొందించండి.'
            : 'Convert vague, single-line queries into structured prompts with Role, Context, Task, Constraints, and Output Format to get 10x better outputs from any LLM.'}
        </p>
      </div>

      {/* Prebuilt Templates Carousel */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Load Proven Student Prompt Templates</span>
          </span>
          <span className="text-xs text-slate-400">Click to autofill fields</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {promptTemplates.map((tpl) => (
            <div
              key={tpl.id}
              onClick={() => handleLoadTemplate(tpl)}
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-purple-400 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-purple-50 text-purple-700">
                    {tpl.category}
                  </span>
                  <span className="text-[11px] text-purple-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                    Autofill →
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-xs line-clamp-1">
                  {tpl.title}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {tpl.whyThisWorks}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Builder Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Fields (6 Cols) */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Prompt Specification Fields
            </h2>
            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Fields</span>
            </button>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                1. Role & Persona (Who is the model pretending to be?)
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Senior Staff Software Engineer / Presentation Coach"
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                2. Context & User Reality (What is your scenario?)
              </label>
              <input
                type="text"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="e.g. 3rd-year CS student preparing for tomorrow's hackathon demo"
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                3. Core Task (What exact thing must be created?)
              </label>
              <textarea
                rows={2}
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="e.g. Create an 8-slide presentation outline on Microservices Architecture"
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                4. Constraints & Guardrails (What must it NOT do?)
              </label>
              <input
                type="text"
                value={constraints}
                onChange={(e) => setConstraints(e.target.value)}
                placeholder="e.g. Under 200 words, no ungrounded jargon, max 3 bullets per slide"
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                5. Desired Output Format (What shape should the text take?)
              </label>
              <input
                type="text"
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
                placeholder="e.g. Markdown table followed by 3 actionable bullet points"
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                6. Quality Checks & Verification (How will you verify?)
              </label>
              <input
                type="text"
                value={qualityChecks}
                onChange={(e) => setQualityChecks(e.target.value)}
                placeholder="e.g. Are citations included? Does code compile without undefined variables?"
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Generated Structured Prompt (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-purple-600" />
                  <span>Synthesized Structured Prompt</span>
                </h2>
                <span className="text-[11px] text-slate-400">Ready to copy into any LLM or AI builder</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 border border-slate-200"
                  title="Save to My Prompts"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
                <button
                  onClick={handleExportMarkdown}
                  className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 border border-slate-200"
                  title="Export as Markdown (.md)"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-xs"
                >
                  {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPrompt ? 'Copied!' : 'Copy Prompt'}</span>
                </button>
              </div>
            </div>

            {/* Prompt Preview Codebox */}
            <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs whitespace-pre-wrap border border-slate-800 max-h-[380px] overflow-y-auto leading-relaxed selection:bg-purple-600 selection:text-white">
              {generatedPrompt}
            </div>

            {/* Why This Prompt Is Better Callout */}
            <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200/80 text-purple-950 text-xs space-y-1.5">
              <span className="font-bold flex items-center gap-1 text-purple-900">
                <Lightbulb className="w-4 h-4 text-purple-700" />
                Why this prompt gives vastly superior results:
              </span>
              <p className="text-slate-700 leading-relaxed">
                By bounding the search space with <strong>Role</strong> and <strong>Constraints</strong>, you prevent the LLM from outputting generic introductory filler. Specifying the <strong>Output Format</strong> forces structured responses that can be reviewed in seconds.
              </p>
              <p className="text-[11px] text-slate-500 italic pt-1">
                * Note: Prompts guide probability distributions; never assume an output is 100% bug-free without running it.
              </p>
            </div>
          </div>

          {/* Saved Prompts Section */}
          {savedPrompts.length > 0 && (
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                My Saved Prompts ({savedPrompts.length})
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {savedPrompts.map((sp) => (
                  <div key={sp.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs">
                    <div className="truncate">
                      <span className="font-semibold text-slate-800">{sp.title}</span>
                      <span className="text-[10px] text-slate-400 block">{sp.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(sp.prompt);
                          setCopiedSavedId(sp.id);
                          showToast('Prompt copied!');
                          setTimeout(() => setCopiedSavedId(null), 2000);
                        }}
                        className="p-1 text-slate-500 hover:text-purple-600"
                        title="Copy prompt"
                      >
                        {copiedSavedId === sp.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => deletePrompt(sp.id)}
                        className="p-1 text-slate-400 hover:text-rose-600"
                        title="Delete prompt"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
