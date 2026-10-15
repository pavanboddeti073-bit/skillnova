import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Bot,
  Send,
  RotateCcw,
  Copy,
  Check,
  Zap
} from 'lucide-react';
import { useApp } from '../context/useApp';
import { askAiTutor } from '../services/aiTutor';
import type { ChatMessage } from '../types';

const getNowTimestamp = (): string =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

let msgCounter = 0;
const getUniqueMsgId = (prefix: string): string => {
  msgCounter += 1;
  return `${prefix}-${Date.now()}-${msgCounter}`;
};

const buildWelcomeMessage = (language: 'en' | 'te'): ChatMessage => ({
  id: 'msg-welcome',
  role: 'assistant',
  content: language === 'te'
    ? `నమస్కారం! నేను మీ **SkillNova AI ట్యూటర్**. 🎓

మీరు కొత్తగా AI నేర్చుకుంటున్నా, హ్యాకథాన్ ప్రాజెక్ట్ ప్రారంభించాలనుకుంటున్నా, లేదా కోడింగ్ ఎర్రర్ పరిష్కరించాలనుకుంటున్నా — నేను మీకు దశలవారీగా సహాయం చేస్తాను.

**English లేదా తెలుగులో** ఏ ప్రశ్నైనా అడగండి!`
    : `Hello! I'm your **SkillNova AI Student Tutor**. 🎓

Whether you're starting your first AI project, picking the right tool, debugging a tricky error, or preparing for placements — I'm here to guide you **step-by-step**.

Ask me anything in **English or Telugu**!`,
  isDemo: false,
  timestamp: 'Just now',
  suggestedFollowUps: language === 'te'
    ? ['బిగినర్‌గా ఎక్కడ ప్రారంభించాలి?', 'CR-TCO ప్రాంప్ట్ ఫార్ములా వివరించండి', 'React వెబ్‌సైట్ ఎలా తయారు చేయాలి?', 'కోడింగ్ బగ్ ఎలా పరిష్కరించాలి?']
    : ['Where do I start as a beginner?', 'Explain the CR-TCO prompt formula', 'How to build and deploy a React website?', 'How do I debug code errors systematically?']
});

export const AiTutorView: React.FC = () => {
  const { language, setLanguage, level, setLevel, showToast } = useApp();

  const [conversation, setConversation] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [aiSource, setAiSource] = useState<string>('skillnova-core');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = React.useMemo(() => [buildWelcomeMessage(language), ...conversation], [language, conversation]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const handleSendMessage = async (queryToSend?: string) => {
    const text = (queryToSend || inputQuery).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: getUniqueMsgId('msg-u'),
      role: 'user',
      content: text,
      timestamp: getNowTimestamp()
    };

    setConversation(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const result = await askAiTutor(text, language, level, messages);
      if (result.source) setAiSource(result.source);

      const assistantMsg: ChatMessage = {
        id: getUniqueMsgId('msg-a'),
        role: 'assistant',
        content: result.content,
        isDemo: false,
        suggestedFollowUps: result.suggestedFollowUps,
        timestamp: getNowTimestamp()
      };
      setConversation(prev => [...prev, assistantMsg]);
    } catch (e) {
      console.error('[SkillNova] Tutor error:', e);
      setConversation(prev => [
        ...prev,
        {
          id: getUniqueMsgId('msg-err'),
          role: 'assistant',
          content: language === 'te'
            ? 'క్షణం ఆగండి — తిరిగి ప్రయత్నిస్తున్నాను. మీ ప్రశ్నను మళ్ళీ అడగండి!'
            : 'I had a brief hiccup — please rephrase your question and I\'ll answer right away!',
          isDemo: false,
          timestamp: getNowTimestamp()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    showToast('Copied tutor answer to clipboard!');
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleClearChat = () => {
    setConversation([]);
    setAiSource('skillnova-core');
    showToast(language === 'te' ? 'చాట్ క్లియర్ చేయబడింది' : 'Chat cleared');
  };

  const quickActionChips = [
    {
      label: language === 'te' ? '🚀 ప్రారంభం ఎలా?' : '🚀 How do I start?',
      query: language === 'te' ? 'బిగినర్‌గా AI ప్రాజెక్ట్ ఎక్కడ ప్రారంభించాలి?' : 'Where do I start as a complete beginner with my first AI project?'
    },
    {
      label: language === 'te' ? '🎯 CR-TCO ఫార్ములా' : '🎯 CR-TCO Formula',
      query: language === 'te' ? 'CR-TCO ప్రాంప్ట్ ఫ్రేమ్‌వర్క్ ఉదాహరణతో వివరించండి' : 'Explain the CR-TCO prompt framework with a real coding example'
    },
    {
      label: language === 'te' ? '🌐 వెబ్‌సైట్ నిర్మించండి' : '🌐 Build Website',
      query: language === 'te' ? 'React + Vercel తో వెబ్‌సైట్ ఎలా నిర్మించి deploy చేయాలి?' : 'How do I build and deploy a React website to Vercel for free?'
    },
    {
      label: language === 'te' ? '🛠️ బగ్ పరిష్కరించు' : '🛠️ Debug an Error',
      query: language === 'te' ? 'TypeError: Cannot read properties of undefined ఎలా పరిష్కరించాలి?' : 'How do I fix: TypeError: Cannot read properties of undefined systematically?'
    },
    {
      label: language === 'te' ? '📄 రెజ్యూమ్ చిట్కాలు' : '📄 Resume Tips',
      query: language === 'te' ? 'ATS-సురక్షితమైన రెజ్యూమ్ ఎలా రాయాలి?' : 'How do I write an ATS-safe resume with strong impact bullets?'
    },
    {
      label: language === 'te' ? '🧠 క్విజ్ ఇవ్వండి' : '🧠 Quiz Me',
      query: language === 'te' ? 'AI fundamentals పై నన్ను పరీక్షించండి' : 'Quiz me on AI fundamentals and prompt engineering basics'
    },
  ];

  const getSourceBadge = () => {
    if (aiSource === 'gemini-api') {
      return { label: '✨ Google Gemini 1.5', color: 'bg-purple-50 text-purple-700 border-purple-200' };
    }
    return { label: '🟢 Full-Stack Engine', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
  };

  const badge = getSourceBadge();

  return (
    <div className="space-y-5 pb-20 max-w-4xl mx-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">
              {language === 'te' ? 'SkillNova AI ట్యూటర్' : 'SkillNova AI Student Tutor'}
            </h1>
            <p className="text-xs text-slate-500">
              {language === 'te' ? 'ద్విభాషా AI మెంటర్ — English & తెలుగు' : 'Bilingual AI Mentor — English & Telugu'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* AI Source Badge */}
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${badge.color}`}>
            <Zap className="w-3 h-3" />
            {badge.label}
          </span>

          {/* Language Toggle */}
          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${language === 'en' ? 'bg-white shadow-sm font-bold text-slate-900' : 'text-slate-500 hover:text-slate-800'}`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('te')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${language === 'te' ? 'bg-white shadow-sm font-bold text-blue-700' : 'text-slate-500 hover:text-slate-800'}`}
            >
              తెలుగు
            </button>
          </div>

          {/* Level Selector */}
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as any)}
            className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white font-medium text-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm min-h-[440px] max-h-[580px] overflow-y-auto space-y-5">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
            >
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 px-1">
                <span>{isUser
                  ? (language === 'te' ? 'మీరు (విద్యార్థి)' : 'You (Student)')
                  : (language === 'te' ? 'SkillNova AI ట్యూటర్' : 'SkillNova AI Tutor')
                }</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
                {!isUser && (
                  <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-1.5 py-0.5 rounded font-medium">
                    Live
                  </span>
                )}
              </div>

              <div
                className={`p-4 sm:p-5 rounded-2xl max-w-[88%] text-xs sm:text-sm leading-relaxed whitespace-pre-wrap transition-all ${
                  isUser
                    ? 'bg-blue-600 text-white rounded-br-none shadow-sm'
                    : 'bg-slate-50 text-slate-800 rounded-bl-none border border-slate-200/80 shadow-sm'
                }`}
              >
                {msg.content}
              </div>

              {!isUser && (
                <div className="flex items-center gap-2 pt-0.5 px-1">
                  <button
                    type="button"
                    onClick={() => handleCopyMessage(msg.id, msg.content)}
                    className="text-[11px] text-slate-400 hover:text-slate-700 flex items-center gap-1 transition-colors"
                  >
                    {copiedMessageId === msg.id
                      ? <Check className="w-3 h-3 text-emerald-600" />
                      : <Copy className="w-3 h-3" />
                    }
                    <span>{copiedMessageId === msg.id ? 'Copied!' : 'Copy answer'}</span>
                  </button>
                </div>
              )}

              {/* Suggested Follow-Ups */}
              {!isUser && msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                <div className="pt-2 flex flex-wrap gap-1.5 max-w-[88%]">
                  {msg.suggestedFollowUps.map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(chip)}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-colors"
                    >
                      💡 {chip}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-3 text-xs text-slate-500 p-2">
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span>
              {language === 'te'
                ? 'AI ట్యూటర్ సమాధానం సిద్ధం చేస్తున్నారు...'
                : 'AI Tutor is formulating a response...'}
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Action Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider w-full sm:w-auto">
          {language === 'te' ? 'త్వరిత అడుగులు:' : 'Quick Actions:'}
        </span>
        {quickActionChips.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(chip.query)}
            disabled={isLoading}
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-slate-700 text-xs font-medium transition-all disabled:opacity-50"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-2 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-2"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder={
            language === 'te'
              ? 'ఏదైనా అడగండి: వెబ్‌సైట్, కోడింగ్ బగ్, PPT, రెజ్యూమ్...'
              : 'Ask anything: website, code bug, presentation, resume, deployment...'
          }
          disabled={isLoading}
          className="flex-1 px-4 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || isLoading}
          className={`p-2.5 rounded-xl transition-all ${
            inputQuery.trim() && !isLoading
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Footer Info */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-[11px] flex items-start sm:items-center justify-between gap-2 flex-col sm:flex-row">
        <span>
          🚀 <strong>Full-Stack AI Engine:</strong> Powered by Google Gemini 1.5 (when <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-700">VITE_GEMINI_API_KEY</code> is set) → Vercel API → SkillNova Core Engine. Zero demo mode.
        </span>
        <button
          type="button"
          onClick={handleClearChat}
          className="shrink-0 text-slate-400 hover:text-slate-700 hover:underline flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>{language === 'te' ? 'క్లియర్ చేయి' : 'Clear chat'}</span>
        </button>
      </div>

    </div>
  );
};
