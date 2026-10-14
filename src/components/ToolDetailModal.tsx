import React from 'react';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  Terminal, 
  Bookmark, 
  ShieldCheck, 
  Calendar 
} from 'lucide-react';
import { Tool } from '../types';
import { useApp } from '../context/useApp';

interface ToolDetailModalProps {
  tool: Tool;
  onClose: () => void;
}

export const ToolDetailModal: React.FC<ToolDetailModalProps> = ({ tool, onClose }) => {
  const { language, favoriteTools, toggleFavoriteTool, savePrompt, showToast } = useApp();
  const [copiedPrompt, setCopiedPrompt] = React.useState(false);

  const isFavorited = favoriteTools.includes(tool.id);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(tool.samplePrompt);
    setCopiedPrompt(true);
    showToast('Sample prompt copied to clipboard!');
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tool-title"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 id="tool-title" className="text-xl font-bold text-slate-900">
                {tool.name}
              </h2>
              <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                tool.pricingLabel === 'Open Source' 
                  ? 'bg-emerald-100 text-emerald-800'
                  : tool.pricingLabel === 'Free Tier'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {tool.pricingLabel}
              </span>
              {tool.openSourceStatus && (
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  Open Source
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">
              {language === 'te' && tool.summaryTe ? tool.summaryTe : tool.summary}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavoriteTool(tool.id)}
              className={`p-2 rounded-xl border transition-colors ${
                isFavorited 
                  ? 'bg-blue-50 border-blue-200 text-blue-600' 
                  : 'border-slate-200 text-slate-400 hover:text-slate-700'
              }`}
              title={isFavorited ? 'Remove from favorites' : 'Save to favorites'}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 text-xs text-slate-700">
          
          {/* Verification & Official Links Banner */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold text-slate-800">Verification Status: Verified</span>
                <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3 h-3" />
                  <span>Last verified at official source: {tool.lastVerifiedAt}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={tool.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-xs"
              >
                <span>Official Website</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={tool.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold"
              >
                <span>Docs</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Pricing & Commercial Caveat */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Pricing & Free-Tier Specifications
            </h3>
            <p className="text-slate-600 leading-relaxed bg-blue-50/50 p-3 rounded-xl border border-blue-100">
              {tool.pricingDetails}
            </p>
            {tool.licenseNotes && (
              <p className="text-[11px] text-slate-500 italic">
                * License Notice: {tool.licenseNotes}
              </p>
            )}
          </div>

          {/* Ideal Use Cases */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Ideal Student Use Cases
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tool.useCases.map((useCase, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="font-medium text-slate-800">{useCase}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Beginner Setup Instructions */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Beginner Setup Instructions
            </h3>
            <div className="space-y-1.5">
              {tool.beginnerSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50/60">
                  <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-slate-700">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Prompt Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-blue-600" />
                <span>Ready-to-Use Sample Prompt</span>
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => savePrompt(`${tool.name} Prompt`, tool.samplePrompt)}
                  className="text-slate-500 hover:text-slate-900 text-[11px] font-semibold"
                >
                  Save Prompt
                </button>
                <button
                  onClick={handleCopyPrompt}
                  className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:underline"
                >
                  {copiedPrompt ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedPrompt ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs whitespace-pre-wrap border border-slate-800">
              {tool.samplePrompt}
            </div>
          </div>

          {/* Common Errors & Traps */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-rose-700 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Common Student Traps & Errors</span>
            </h3>
            <ul className="space-y-1.5 pl-1">
              {tool.commonErrors.map((err, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-600">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{err}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Alternatives */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Verified Alternatives: <strong>{tool.alternatives.join(', ')}</strong></span>
            <span>Skill Level: <strong className="capitalize">{tool.skillLevel}</strong></span>
          </div>

        </div>

      </div>
    </div>
  );
};
