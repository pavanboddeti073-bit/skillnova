import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Bot,
  Send,
  Copy,
  Check,
  Bookmark,
  Trash2,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/useApp';
import { askAiTutor } from '../services/aiTutor';
import type { ChatMessage, SkillLevel } from '../types';

const getNowTimestamp = (): string =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

let msgCounter = 0;
const getUniqueMsgId = (prefix: string): string => {
  msgCounter += 1;
  return `${prefix}-${Date.now()}-${msgCounter}`;
};

const TUTOR_MODES = [
  { id: 'explain_concept', labelEn: '1. Explain Concept', labelTe: 'కాన్సెప్ట్ వివరణ', desc: 'Clear, structured explanation of core ideas' },
  { id: 'explain_beginner', labelEn: '2. Beginner Friendly', labelTe: 'సులభమైన వివరణ', desc: 'Everyday analogies and simple language' },
  { id: 'deep_dive', labelEn: '3. Deep-Dive Architecture', labelTe: 'లోతైన విశ్లేషణ', desc: 'Under-the-hood mechanics and tradeoffs' },
  { id: 'step_by_step', labelEn: '4. Step-by-Step Solution', labelTe: 'దశలవారీ పరిష్కారం', desc: 'Numbered sequence with before/after code' },
  { id: 'real_world_examples', labelEn: '5. Real-World Use Cases', labelTe: 'నిజ జీవిత ఉదాహరణలు', desc: 'Production examples from industry' },
  { id: 'quiz_me', labelEn: '6. Quiz Me', labelTe: 'నన్ను క్విజ్ చేయండి', desc: '3 interactive knowledge check questions' },
  { id: 'practice_hints', labelEn: '7. Progressive Hints', labelTe: 'సూచనలతో ప్రాక్టీస్', desc: 'Hints without giving away the full answer' },
  { id: 'review_answer', labelEn: '8. Code & Answer Review', labelTe: 'సమీక్ష & సలహాలు', desc: 'Critique style, bugs, and performance' },
  { id: 'summarize', labelEn: '9. Summary & Cheat Sheet', labelTe: 'సారాంశం', desc: 'Bulleted key takeaways and cheatsheet' },
  { id: 'study_notes', labelEn: '10. Generate Study Notes', labelTe: 'స్టడీ నోట్స్ తయారీ', desc: 'Structured notes with definitions & tables' },
  { id: 'explain_code', labelEn: '11. Explain Code Snippet', labelTe: 'కోడ్ వివరణ', desc: 'Line-by-line syntax & logic analysis' },
  { id: 'learning_roadmap', labelEn: '12. Learning Roadmap', labelTe: 'లెర్నింగ్ రోడ్‌మ్యాప్', desc: 'Milestone roadmap from 0 to master' },
  { id: 'compare_concepts', labelEn: '13. Compare Concepts', labelTe: 'భావనల పోలిక', desc: 'Head-to-head comparison table' },
  { id: 'exam_prep', labelEn: '14. College Exam & Viva', labelTe: 'పరీక్ష & వైవా ప్రిపరేషన్', desc: 'High-frequency exam questions' },
  { id: 'analogies', labelEn: '15. Creative Analogies', labelTe: 'పోలికలు & రూపకాలు', desc: 'Explain through memorable metaphors' }
];

export const AiTutorView: React.FC = () => {
  const {
    language,
    level,
    setLevel,
    showToast,
    toggleBookmark,
    isBookmarked,
    user
  } = useApp();

  const [conversation, setConversation] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [aiSource, setAiSource] = useState<string>('skillnova-core');
  
  // Tutor Settings
  const [selectedMode, setSelectedMode] = useState<string>('explain_concept');
  const [explanationDepth, setExplanationDepth] = useState<'short' | 'standard' | 'detailed'>('standard');
  const [learningFocus, setLearningFocus] = useState<'theory' | 'practical' | 'exam'>('practical');
  const [showClearModal, setShowClearModal] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialWelcome = React.useMemo<ChatMessage>(() => ({
    id: 'msg-welcome-mega14',
    role: 'assistant',
    content: language === 'te'
      ? `నమస్కారం! నేను మీ **SkillNova Mega14 AI ట్యూటర్**. 🎓\n\nమీరు 15 లెర్నింగ్ మోడ్‌లలో ఏదైనా ఎంచుకోవచ్చు:\n- సులభమైన వివరణలు\n- కోడింగ్ బగ్స్ డీబగ్గింగ్\n- స్టడీ నోట్స్ తయారీ\n- కాలేజ్ వైవా ప్రిపరేషన్\n\n**English లేదా తెలుగులో** ఏ సాంకేతిక ప్రశ్నైనా అడగండి!`
      : `Hello! I'm your **SkillNova Mega14 AI Learning Tutor**. 🎓\n\nI can assist you across 15 dedicated learning modes:\n- **Deep Concept Explanations**\n- **Systematic Bug Fixing & Code Analysis**\n- **Step-by-Step Problem Solving & Hints**\n- **Study Notes Generation & Exam Preparation**\n\nAsk me anything in **English or Telugu**!`,
    isDemo: false,
    timestamp: 'Just now',
    suggestedFollowUps: language === 'te'
      ? ['బిగినర్‌గా ఎక్కడ ప్రారంభించాలి?', 'React 19 Hooks ఎలా పనిచేస్తాయి?', 'TypeError: Cannot read properties of undefined ఎలా పరిష్కరించాలి?', 'ATS రెజ్యూమ్ స్కోర్ ఎలా పెంచాలి?']
      : ['Where do I start as a beginner?', 'How do React 19 Hooks work with TypeScript?', 'How do I fix: TypeError: Cannot read properties of undefined systematically?', 'How to optimize my resume for ATS scanners?']
  }), [language]);

  const allMessages = React.useMemo(() => [initialWelcome, ...conversation], [initialWelcome, conversation]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [allMessages, isLoading, scrollToBottom]);

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
      const result = await askAiTutor(
        text,
        language,
        level,
        allMessages,
        selectedMode,
        explanationDepth,
        learningFocus
      );

      if (result.source) setAiSource(result.source);

      const assistantMsg: ChatMessage = {
        id: getUniqueMsgId('msg-a'),
        role: 'assistant',
        content: result.content,
        isDemo: Boolean(result.isDemo),
        modelUsed: result.modelUsed || (result.source === 'meta-muse' ? 'Meta Muse Spark 1.3' : result.source === 'ollama' ? 'Ollama Local' : 'SkillNova AI Engine'),
        suggestedFollowUps: result.suggestedFollowUps,
        timestamp: getNowTimestamp()
      };

      setConversation(prev => [...prev, assistantMsg]);
    } catch {
      showToast('Network error contacting AI service. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopyMessage = (msgId: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedMessageId(msgId);
    showToast('Answer copied to clipboard!');
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleBookmarkAnswer = (msg: ChatMessage) => {
    const snippet = msg.content.slice(0, 40) + '...';
    toggleBookmark('tutor_answer', msg.id, snippet, { content: msg.content, timestamp: msg.timestamp });
  };

  const handleClearChat = () => {
    setConversation([]);
    setShowClearModal(false);
    showToast('Conversation cleared.');
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header & Controls Bar */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                <Bot className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                SkillNova Mega14 AI Tutor
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                {aiSource === 'gemini-api' ? 'Gemini 1.5 Cloud' : 'Multi-Domain Engine'}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Interactive 1-on-1 AI engineering mentor with 15 pedagogical modes and structured explanations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowClearModal(true)}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all cursor-pointer"
              title="Clear Conversation"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 15 Learning Modes Dropdown & Parameter Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-slate-100 dark:border-slate-750 text-xs">
          
          {/* Mode Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Learning Mode (15 Modes)
            </label>
            <select
              value={selectedMode}
              onChange={e => setSelectedMode(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold focus:outline-hidden cursor-pointer"
            >
              {TUTOR_MODES.map(m => (
                <option key={m.id} value={m.id}>
                  {language === 'te' ? m.labelTe : m.labelEn}
                </option>
              ))}
            </select>
          </div>

          {/* Level Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Skill Level
            </label>
            <select
              value={level}
              onChange={e => setLevel(e.target.value as SkillLevel)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold focus:outline-hidden cursor-pointer"
            >
              <option value="beginner">Beginner Friendly</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced Architecture</option>
            </select>
          </div>

          {/* Depth Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Explanation Depth
            </label>
            <select
              value={explanationDepth}
              onChange={e => setExplanationDepth(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold focus:outline-hidden cursor-pointer"
            >
              <option value="short">Short & Concise</option>
              <option value="standard">Standard Full Walkthrough</option>
              <option value="detailed">Detailed Deep Dive</option>
            </select>
          </div>

          {/* Focus Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Focus Area
            </label>
            <select
              value={learningFocus}
              onChange={e => setLearningFocus(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold focus:outline-hidden cursor-pointer"
            >
              <option value="practical">Practical Code & Implementation</option>
              <option value="theory">Conceptual & Mathematical Theory</option>
              <option value="exam">College Exam & Placement Viva</option>
            </select>
          </div>

        </div>
      </div>

      {/* Main Chat Conversation Container */}
      <div className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col h-[650px]">
        
        {/* Messages List Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {allMessages.map(msg => {
            const isUser = msg.role === 'user';
            const bookmarked = isBookmarked('tutor_answer', msg.id);

            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-4xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {/* Avatar Icon */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold shadow-xs ${
                    isUser
                      ? 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white'
                      : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'
                  }`}
                >
                  {isUser ? (user?.fullName?.charAt(0) || 'U') : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble Content */}
                <div
                  className={`space-y-2 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-750 text-slate-800 dark:text-slate-100 shadow-xs'
                  }`}
                >
                  {!isUser && (
                    <div className="flex items-center gap-2 pb-1 text-[11px] font-semibold">
                      {msg.isDemo ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                          Interactive Demo Mode
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
                          <Sparkles className="w-3 h-3 text-indigo-500" />
                          <span>{msg.modelUsed || 'Meta Muse Spark 1.3'}</span>
                        </span>
                      )}
                    </div>
                  )}

                  <div className="whitespace-pre-wrap font-sans">
                    {msg.content}
                  </div>

                  {/* Message Action Controls (Copy, Bookmark) */}
                  {!isUser && (
                    <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-slate-750 text-slate-400">
                      <div className="text-[10px]">{msg.timestamp}</div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleCopyMessage(msg.id, msg.content)}
                          className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-750 hover:text-slate-700 dark:hover:text-slate-200 transition-all cursor-pointer"
                          title="Copy Answer"
                        >
                          {copiedMessageId === msg.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleBookmarkAnswer(msg)}
                          className={`p-1 rounded-md transition-all cursor-pointer ${
                            bookmarked
                              ? 'text-indigo-600 dark:text-indigo-400'
                              : 'hover:bg-slate-200 dark:hover:bg-slate-750 hover:text-slate-700 dark:hover:text-slate-200'
                          }`}
                          title={bookmarked ? 'Bookmarked' : 'Bookmark this answer'}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-indigo-600' : ''}`} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Suggested Follow-Ups Pills */}
                  {!isUser && msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {msg.suggestedFollowUps.map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(prompt)}
                          disabled={isLoading}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-300 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all cursor-pointer text-left font-medium"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex gap-3 mr-auto items-center">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-bounce" />
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 text-xs text-slate-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
                <span>SkillNova Mega14 Tutor is thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar & Send Controls */}
        <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-700 shrink-0">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-end gap-2"
          >
            <div className="relative flex-1">
              <textarea
                value={inputQuery}
                onChange={e => setInputQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about coding, errors, algorithms, React, Python, or college seminars... (Shift+Enter for newline)"
                rows={2}
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs sm:text-sm focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 caret-indigo-600 dark:caret-indigo-400 resize-none transition-all shadow-inner"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="p-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-md shadow-indigo-500/25 transition-all cursor-pointer disabled:opacity-40 shrink-0"
              aria-label="Send query"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <div className="text-[10px] text-slate-400 mt-1.5 flex items-center justify-between">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <span>SkillNova Mega14 AI Engineering Core</span>
          </div>
        </div>

      </div>

      {/* Confirmation Modal to Clear Chat */}
      {showClearModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-sm p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Clear Conversation?</h3>
            <p className="text-xs text-slate-500">
              This will clear the current message history from your active window. Saved bookmarks will remain in your study hub.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowClearModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleClearChat}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Clear Messages
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
