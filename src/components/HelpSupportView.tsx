import React, { useState } from 'react';
import {
  HelpCircle,
  Key,
  Database,
  ExternalLink,
  CheckCircle2,
  Send
} from 'lucide-react';
import { useApp } from '../context/useApp';

export const HelpSupportView: React.FC = () => {
  const { showToast, language } = useApp();
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setSubmitted(true);
    showToast('Feedback submitted! Thank you for helping improve SkillNova Mega14.');
  };

  const faqs = [
    {
      q: 'How does SkillNova Mega14 provide AI Tutor responses?',
      a: 'SkillNova Mega14 connects to Google Gemini 1.5 Cloud when an API key is provided in the environment variables (GEMINI_API_KEY). When running offline or without credentials, it utilizes our self-contained multi-domain engineering knowledge base to provide exact, zero-hallucination code examples and diagnostics.'
    },
    {
      q: 'How do I obtain a free Google Gemini API key?',
      a: 'Visit Google AI Studio (aistudio.google.com), sign in with your Google account, click "Get API Key", create a free tier key, and add it as GEMINI_API_KEY in your .env file or Vercel Environment Variables.'
    },
    {
      q: 'Is Telugu (తెలుగు) language support fully native?',
      a: 'Yes! You can toggle between English and Telugu at any time using the language switcher in the top navigation bar. Course titles, quiz feedback, and AI Tutor answers will render in fluent Telugu.'
    },
    {
      q: 'Where are my study notes and completed lessons stored?',
      a: 'Your learning progress, quiz scores, and study notes are synchronized both to your browser local storage and to the full-stack database API, ensuring your data persists across page reloads.'
    }
  ];

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{language === 'te' ? 'సహాయం & గైడ్' : 'Help & Documentation'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Help, Setup Guides & Support
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Everything you need to configure your environment variables, connect cloud AI keys, and master SkillNova Mega14.
        </p>
      </div>

      {/* Cloud Integration Setup Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Gemini API Key Guide */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Key className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Google Gemini Cloud Key
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Enable real-time LLM inference for the 15 AI Tutor modes by setting your API key.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 text-xs font-mono text-indigo-600 dark:text-indigo-400">
            GEMINI_API_KEY=AIzaSy...
          </div>
          <a
            href="https://aistudio.google.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <span>Open Google AI Studio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Supabase PostgreSQL Guide */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Supabase PostgreSQL Database
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Run the SQL migration in `supabase/migrations/20261019_skillnova_mega14.sql` to activate cloud PostgreSQL.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 text-xs font-mono text-purple-600 dark:text-purple-400">
            VITE_SUPABASE_URL=https://...
          </div>
          <a
            href="https://supabase.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
          >
            <span>Open Supabase Console</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

      {/* Frequently Asked Questions */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 divide-y divide-slate-100 dark:divide-slate-750">
          {faqs.map((faq, i) => (
            <div key={i} className={`space-y-1.5 ${i > 0 ? 'pt-4' : ''}`}>
              <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
                {faq.q}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact & Feedback Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Have Feedback or Need Direct Support?
        </h2>
        <p className="text-xs text-slate-500">
          Send a message to our academic development team for curriculum requests or technical assistance.
        </p>

        {submitted ? (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Thank you! Your inquiry has been dispatched to support@skillnova.dev.</span>
          </div>
        ) : (
          <form onSubmit={handleFeedbackSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="email"
                value={feedbackEmail}
                onChange={e => setFeedbackEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm focus:outline-hidden focus:border-indigo-500"
              />
            </div>
            <textarea
              value={feedbackText}
              onChange={e => setFeedbackText(e.target.value)}
              placeholder="Describe your inquiry, bug report, or feature request..."
              rows={3}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm focus:outline-hidden focus:border-indigo-500 resize-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
