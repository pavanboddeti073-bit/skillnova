import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  RotateCcw, 
  Copy,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { askAiTutor } from '../services/aiTutor';
import { ChatMessage } from '../types';

export const AiTutorView: React.FC = () => {
  const { language, setLanguage, level, setLevel, showToast } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      role: 'assistant',
      content: language === 'te' 
        ? `నమస్కారం! నేను మీ **SkillNova AI ట్యూటర్**.

మీరు కొత్తగా AI నేర్చుకుంటున్నా లేదా హ్యాకథాన్ ప్రాజెక్ట్ ప్రారంభించాలనుకుంటున్నా, నేను మీకు సహాయం చేస్తాను. 

క్రింది సలహా ప్రశ్నలలో ఒకదాన్ని క్లిక్ చేయండి లేదా మీ ప్రశ్నను టైప్ చేయండి!`
        : `Hello! I am your **SkillNova AI Student Tutor**.

Whether you're starting your very first AI project, confused about which tool to pick, or debugging a tricky error, I'm here to guide you step-by-step.

Click one of the suggested topics below or type your question in English or Telugu!`,
      isDemo: false,
      timestamp: 'Just now',
      suggestedFollowUps: language === 'te' 
        ? ['బిగినర్‌గా ఎక్కడ ప్రారంభించాలి?', 'CR-TCO ప్రాంప్ట్ ఫార్ములా వివరించండి', 'కోడింగ్ ఎర్రర్స్ ఎలా పరిష్కరించాలి?']
        : ['Where do I start as a beginner?', 'Explain the CR-TCO prompt formula', 'How do I debug code errors systematically?']
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (queryToSend?: string) => {
    const text = (queryToSend || inputQuery).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const result = await askAiTutor(text, language, level, messages);
      const assistantMsg: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        role: 'assistant',
        content: result.content,
        isDemo: result.isDemo,
        suggestedFollowUps: result.suggestedFollowUps,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [
        ...prev,
        {
          id: 'msg-err-' + Date.now(),
          role: 'assistant',
          content: 'An unexpected connection issue occurred. Please try asking again.',
          isDemo: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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

  const quickActionChips = [
    { label: language === 'te' ? '🔍 సరళమైన వివరణ ఇవ్వండి' : '🔍 Make explanation simpler', query: 'Can you explain this more simply with an everyday college analogy?' },
    { label: language === 'te' ? '💻 కోడ్ ఉదాహరణ ఇవ్వండి' : '💻 Show a code example', query: 'Can you provide a minimal clean code example with TypeScript types?' },
    { label: language === 'te' ? '🧠 క్విజ్ అడగండి' : '🧠 Quiz me on this', query: 'Give me 2 multiple-choice quiz questions on this topic to test my understanding.' },
    { label: language === 'te' ? '🛠️ బగ్ పరిష్కరించండి' : '🛠️ Debug an error', query: 'I have a bug: "TypeError: Cannot read properties of undefined". How do I fix it defensively?' },
  ];

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                {language === 'te' ? 'SkillNova AI ట్యూటర్' : 'SkillNova AI Student Tutor'}
              </h1>
              <span className="text-xs text-slate-500">
                {language === 'te' ? 'ద్విభాషా సహాయకుడు (English & తెలుగు)' : 'Bilingual AI Pair Programmer & Mentor'}
              </span>
            </div>
          </div>
        </div>

        {/* Controls: Language & Level & Demo Status */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Full-Stack AI Engine</span>
          </span>

          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-md font-medium ${language === 'en' ? 'bg-white shadow-xs font-bold text-slate-900' : 'text-slate-500'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('te')}
              className={`px-2 py-1 rounded-md font-medium ${language === 'te' ? 'bg-white shadow-xs font-bold text-blue-700' : 'text-slate-500'}`}
            >
              తెలుగు
            </button>
          </div>

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as any)}
            className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white font-medium text-slate-700"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm min-h-[480px] max-h-[600px] overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
            >
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 px-1">
                <span>{isUser ? 'You (Student)' : 'SkillNova AI Tutor'}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
                {!isUser && (
                  <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-1.5 py-0.2 rounded font-medium">
                    Live Response
                  </span>
                )}
              </div>

              <div
                className={`p-4 sm:p-5 rounded-2xl max-w-[85%] text-xs sm:text-sm leading-relaxed whitespace-pre-wrap transition-all ${
                  isUser
                    ? 'bg-blue-600 text-white rounded-br-none shadow-xs'
                    : 'bg-slate-50 text-slate-800 rounded-bl-none border border-slate-200/80 shadow-xs'
                }`}
              >
                {msg.content}
              </div>

              {!isUser && (
                <div className="flex items-center gap-2 pt-0.5 px-1">
                  <button
                    onClick={() => handleCopyMessage(msg.id, msg.content)}
                    className="text-[11px] text-slate-400 hover:text-slate-700 flex items-center gap-1"
                  >
                    {copiedMessageId === msg.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedMessageId === msg.id ? 'Copied' : 'Copy answer'}</span>
                  </button>
                </div>
              )}

              {/* Suggested Follow-Ups */}
              {!isUser && msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                <div className="pt-2 flex flex-wrap gap-1.5 max-w-[85%]">
                  {msg.suggestedFollowUps.map((chip, idx) => (
                    <button
                      key={idx}
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
          <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            <span>Tutor is formulating response in {language === 'te' ? 'Telugu' : 'English'}...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Action Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Quick Actions:
        </span>
        {quickActionChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(chip.query)}
            className="px-3 py-1 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-slate-700 text-xs font-medium transition-all"
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
              ? "ఏదైనా అడగండి: కాన్సెప్ట్ వివరణ, కోడింగ్ బగ్, లేదా ప్రాజెక్ట్ సలహా..."
              : "Ask anything: Explain an AI concept, debug code, or request a quiz..."
          }
          className="flex-1 px-4 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || isLoading}
          className={`p-2.5 rounded-xl transition-all ${
            inputQuery.trim() && !isLoading
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
          aria-label="Send message to AI Tutor"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Transparency & Disclaimer Footer */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-[11px] flex items-center justify-between">
        <span>
          🛡️ <strong>Demo Mode:</strong> Pre-programmed with verified student responses. Add <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">VITE_GEMINI_API_KEY</code> for live cloud model execution.
        </span>
        <button
          onClick={() => setMessages(messages.slice(0, 1))}
          className="text-slate-400 hover:text-slate-700 hover:underline flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Clear chat</span>
        </button>
      </div>

    </div>
  );
};
