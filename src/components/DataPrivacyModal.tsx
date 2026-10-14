import React from 'react';
import { 
  X, 
  ShieldAlert, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { siteConfig } from '../config/siteConfig';

interface DataPrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataPrivacyModal: React.FC<DataPrivacyModalProps> = ({ isOpen, onClose }) => {
  const { clearAllUserData } = useApp();

  if (!isOpen) return null;

  const handleEraseData = () => {
    if (window.confirm('Are you sure you want to erase all your locally saved lessons, prompts, and project plans?')) {
      clearAllUserData();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-modal-title"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-blue-600" />
            <h2 id="privacy-modal-title" className="text-lg font-bold text-slate-900">
              Data Privacy, Trust & Platform Mission
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 text-xs text-slate-700 leading-relaxed">
          
          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              1. Our Student-First Mission & Promise
            </h3>
            <p>
              <strong>{siteConfig.name}</strong> was built to transform student hesitation into tangible working results. Many students feel anxious about where to start with AI. We provide structured visual build kits, copyable prompts, and explanations in English and Telugu without fake marketing hype.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-blue-950 space-y-1.5">
            <span className="font-bold block flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Zero-Storage Local First Architecture</span>
            </span>
            <p className="text-slate-700">
              Your completed lessons, bookmarks, and saved prompts are stored <strong>strictly on your local device (in your browser's LocalStorage)</strong>. We do not transmit your resume text or prompts to our own analytics databases.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-rose-950 space-y-1.5">
            <span className="font-bold block flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Critical Security Guardrail for Students</span>
            </span>
            <p className="text-slate-700">
              Never paste credentials, API secrets, college database passwords, Aadhaar cards, or private customer records into public chatbots or client code.
            </p>
          </div>

          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              2. Transparent Data Verification
            </h3>
            <p>
              Tool pricing, model limits, and fellowship deadlines change continuously. We provide official documentation URLs and <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">lastVerifiedAt</code> timestamps for every listed tool. We never display fake "live" job counters without official sources.
            </p>
          </div>

          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              3. Accessibility & WCAG AA Commitment
            </h3>
            <p>
              SkillNova is built with semantic HTML landmarks, accessible focus visible outlines, responsive mobile viewport constraints, and high contrast typography.
            </p>
          </div>

          {/* Reset All Data Button */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] text-slate-500">
              Want to start completely fresh?
            </span>
            <button
              onClick={handleEraseData}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-colors w-full sm:w-auto justify-center"
            >
              <Trash2 className="w-4 h-4" />
              <span>Erase All My Local Data</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
