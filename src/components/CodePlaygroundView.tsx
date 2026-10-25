import React, { useState } from 'react';
import {
  Terminal,
  Play,
  RotateCcw,
  Copy,
  Check,
  Code2,
  Clock,
  Sparkles,
  Bot,
  Layers,
  FileCode
} from 'lucide-react';
import { useApp } from '../context/useApp';
import { executeCode, type ExecutionResult } from '../services/codeExecution';

interface PlaygroundTemplate {
  name: string;
  language: string;
  code: string;
}

const TEMPLATES: PlaygroundTemplate[] = [
  {
    name: 'JavaScript: Async Fetch & Data Pipeline',
    language: 'javascript',
    code: `// SkillNova Playground: JavaScript Data Processing
const students = [
  { name: 'Pavan', score: 94, track: 'AI Systems' },
  { name: 'Aarav', score: 88, track: 'Full-Stack' },
  { name: 'Diya', score: 96, track: 'AI Systems' },
  { name: 'Rohan', score: 78, track: 'DevOps' }
];

console.log("Analyzing student cohort performance...");

const aiSpecialists = students
  .filter(s => s.track === 'AI Systems')
  .map(s => ({ ...s, grade: s.score >= 90 ? 'A+' : 'A' }));

console.log("AI Specialists:", JSON.stringify(aiSpecialists, null, 2));

const averageScore = students.reduce((acc, s) => acc + s.score, 0) / students.length;
console.log("Cohort Average Score:", averageScore.toFixed(1));`
  },
  {
    name: 'Python: Frequency Counter & Clean Algorithms',
    language: 'python',
    code: `# SkillNova Playground: Python Algorithm Sandbox
from collections import Counter

def analyze_tech_stack(mentions):
    counts = Counter(mentions)
    print("Most popular skills:")
    for skill, freq in counts.most_common(4):
        print(f"  • {skill}: {freq} mentions")
    return counts

skills = [
    "Python", "TypeScript", "React", "Python", 
    "PyTorch", "Docker", "Python", "React", "TypeScript"
]

analyze_tech_stack(skills)`
  },
  {
    name: 'SQL: Relational Query & Aggregate Groups',
    language: 'sql',
    code: `-- SkillNova In-Memory SQL Playground
CREATE TABLE students (
  id INT,
  name VARCHAR(50),
  course VARCHAR(50),
  rating FLOAT
);

INSERT INTO students VALUES 
  (1, 'Alice Chen', 'AI Systems', 4.9),
  (2, 'Bob Kumar', 'Full-Stack Web', 4.7),
  (3, 'Carla Gomez', 'AI Systems', 4.8);

SELECT course, AVG(rating) as avg_rating, COUNT(*) as student_count
FROM students
GROUP BY course
ORDER BY avg_rating DESC;`
  },
  {
    name: 'HTML/CSS/JS: Live Interactive Card Widget',
    language: 'html',
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: #0f172a;
      color: #f8fafc;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .card {
      background: #1e293b;
      padding: 24px;
      border-radius: 16px;
      border: 1px solid #334155;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
      text-align: center;
      max-width: 300px;
    }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      background: rgba(99, 102, 241, 0.2);
      color: #818cf8;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 700;
      margin-bottom: 12px;
    }
    button {
      background: #6366f1;
      color: white;
      border: none;
      padding: 10px 18px;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.1s;
    }
    button:active { transform: scale(0.96); }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">SkillNova Mega14 Live DOM</div>
    <h3 style="margin: 0 0 8px 0;">Interactive Sandbox</h3>
    <p style="font-size: 13px; color: #94a3b8; margin-bottom: 16px;">
      Clicks recorded: <strong id="counter" style="color: #6366f1;">0</strong>
    </p>
    <button onclick="increment()">Click Me</button>
  </div>
  <script>
    let count = 0;
    function increment() {
      count++;
      document.getElementById('counter').innerText = count;
    }
  </script>
</body>
</html>`
  }
];

export const CodePlaygroundView: React.FC = () => {
  const { setActiveTab, showToast } = useApp();

  const [languageChoice, setLanguageChoice] = useState<string>('javascript');
  const [code, setCode] = useState<string>(TEMPLATES[0].code);
  const [stdin, setStdin] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleApplyTemplate = (tmpl: PlaygroundTemplate) => {
    setLanguageChoice(tmpl.language);
    setCode(tmpl.code);
    setResult(null);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    try {
      const res = await executeCode({
        code,
        language: languageChoice,
        stdin
      });
      setResult(res);
      if (res.status === 'passed') {
        showToast('Code executed successfully', 'success');
      } else {
        showToast('Execution error or output warning', 'info');
      }
    } catch (err: any) {
      showToast(err?.message || 'Execution error', 'error');
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast('Code copied to clipboard', 'info');
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/40 text-white shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Terminal className="w-3.5 h-3.5" />
            <span>Isolated Multi-Language Sandbox</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Code Playground & Experimentation Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Write, execute, and experiment freely across JavaScript, TypeScript, Python, SQL, and HTML/CSS. Test APIs, run algorithm benchmarks, or render live browser widgets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('coding-practice')}
            className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all cursor-pointer"
          >
            Practice Challenges
          </button>
          <button
            onClick={() => setActiveTab('tutor')}
            className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <Bot className="w-4 h-4" />
            <span>Explain with Nova AI</span>
          </button>
        </div>
      </div>

      {/* Templates Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Presets:
        </span>
        {TEMPLATES.map((t, idx) => (
          <button
            key={idx}
            onClick={() => handleApplyTemplate(t)}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-400 font-medium whitespace-nowrap cursor-pointer transition-all shadow-sm"
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* Playground Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Code Editor Pane (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 shadow-xl overflow-hidden">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="font-mono text-slate-400 font-semibold text-[11px] flex items-center gap-1">
                <FileCode className="w-3.5 h-3.5 text-indigo-400" />
                main.{languageChoice === 'python' ? 'py' : languageChoice === 'sql' ? 'sql' : languageChoice === 'html' ? 'html' : 'ts'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={languageChoice}
                onChange={e => setLanguageChoice(e.target.value)}
                className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium focus:outline-none"
              >
                <option value="javascript">JavaScript (ES2024)</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python 3</option>
                <option value="sql">SQL Relational</option>
                <option value="html">HTML / CSS / JS Preview</option>
              </select>

              <button
                onClick={handleCopyCode}
                className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Copy code"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => setCode('')}
                className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Clear editor"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Textarea Code Editor */}
          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            rows={18}
            spellCheck={false}
            className="w-full p-4 font-mono text-xs sm:text-sm bg-slate-900 text-slate-100 placeholder:text-slate-600 focus:outline-none resize-none leading-relaxed selection:bg-indigo-600/60"
            placeholder="Write your code here..."
          />

          {/* Stdin Drawer */}
          {languageChoice !== 'html' && (
            <div className="px-4 py-2 bg-slate-950 border-t border-slate-800">
              <label className="text-[11px] font-bold text-slate-400 block mb-1">
                Standard Input (stdin):
              </label>
              <input
                type="text"
                value={stdin}
                onChange={e => setStdin(e.target.value)}
                placeholder="Optional input parameters..."
                className="w-full px-3 py-1.5 text-xs font-mono rounded bg-slate-900 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          )}

          {/* Bottom Run Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-t border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Max Runtime Limit: 3000ms</span>
            </div>

            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="flex items-center gap-2 px-6 py-2 text-xs sm:text-sm font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 transition-all cursor-pointer disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{isRunning ? 'Running...' : 'Run Code'}</span>
            </button>
          </div>
        </div>

        {/* Output & Preview Pane (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* If HTML preview mode, show live iframe */}
          {languageChoice === 'html' ? (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                <Layers className="w-4 h-4 text-indigo-500" />
                <span>Live Browser DOM Preview</span>
              </div>
              <div className="h-[440px] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950">
                <iframe
                  title="Live Preview"
                  srcDoc={code}
                  sandbox="allow-scripts"
                  className="w-full h-full border-none"
                />
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                  <Terminal className="w-4 h-4 text-indigo-500" />
                  <span>Execution Output Console</span>
                </div>

                {result && (
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-slate-400">⏱️ {result.executionTimeMs}ms</span>
                    <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                      result.status === 'passed'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                    }`}>
                      {result.status}
                    </span>
                  </div>
                )}
              </div>

              {/* Console terminal window */}
              <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-200 min-h-[380px] max-h-[480px] overflow-y-auto space-y-3">
                {result ? (
                  <>
                    <div className="text-[11px] text-slate-500 border-b border-slate-800/80 pb-2">
                      Environment: {result.runtimeEnvironment}
                    </div>

                    {result.stdout && (
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">
                          Standard Output:
                        </span>
                        <pre className="whitespace-pre-wrap text-emerald-400 font-mono leading-relaxed">
                          {result.stdout}
                        </pre>
                      </div>
                    )}

                    {result.stderr && (
                      <div>
                        <span className="text-rose-400 block text-[10px] uppercase font-bold mb-1">
                          Errors / Stderr:
                        </span>
                        <pre className="whitespace-pre-wrap text-rose-400 font-mono leading-relaxed">
                          {result.stderr}
                        </pre>
                      </div>
                    )}

                    {!result.stdout && !result.stderr && (
                      <div className="text-slate-500 italic">
                        (Process finished with code 0 and produced no terminal output)
                      </div>
                    )}
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 p-8 space-y-2">
                    <Code2 className="w-8 h-8 text-slate-700" />
                    <p className="text-xs">Click "Run Code" above to execute and view stdout/stderr.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
