import React, { useState, useEffect } from 'react';
import {
  Cpu,
  CheckCircle2,
  XCircle,
  Sparkles,
  Zap,
  RefreshCw,
  Terminal,
  Bot
} from 'lucide-react';
import { useApp } from '../context/useApp';
import { registeredModelProviders, type AIModelProviderConfig } from '../data/modelProviders';
import { apiClient } from '../services/api';

export const ModelSettingsView: React.FC = () => {
  const { setActiveTab, showToast } = useApp();

  const [providers, setProviders] = useState<AIModelProviderConfig[]>(registeredModelProviders);
  const [selectedProviderId, setSelectedProviderId] = useState<string>('meta-muse');
  const [testingId, setTestingId] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, { online: boolean; latencyMs: number; message: string }>>({});

  useEffect(() => {
    // Fetch live provider status from backend if available
    apiClient.getModels().then(data => {
      if (data && data.providers) {
        setProviders(data.providers);
        if (data.activeDefaultProvider) {
          setSelectedProviderId(data.activeDefaultProvider);
        }
      }
    });
  }, []);

  const handleTestConnection = async (providerId: string) => {
    setTestingId(providerId);
    try {
      const res = await apiClient.testModelConnection(providerId);
      setTestResults(prev => ({ ...prev, [providerId]: res }));
      if (res.online) {
        showToast(`Provider verified! Latency: ${res.latencyMs}ms`, 'success');
      } else {
        showToast(res.message, 'info');
      }
    } catch (err: any) {
      showToast(err?.message || 'Connection test failed', 'error');
    } finally {
      setTestingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'available_with_key':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'configured':
        return 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20';
      default:
        return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/40 text-white shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Multi-Model AI Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            AI Model Registry & Provider Configuration
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Configure Meta Model API, local on-device Ollama open-weight runners, Hugging Face endpoints, and Google Gemini fallbacks. Inspect latency tiers and test live endpoint connectivity.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('tutor')}
          className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer whitespace-nowrap"
        >
          <Bot className="w-4 h-4" />
          <span>Launch Nova AI Mentor</span>
        </button>
      </div>

      {/* Meta Model API Setup Notice Card */}
      <div className="p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Meta Model API Integration Guide</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            To use the official <strong>Meta Model API (muse-spark-1.3)</strong>, provide your key via <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs">MODEL_API_KEY</code> in the project's root <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs">.env</code> file. Requests route to <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs">https://api.meta.ai/v1</code>.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleTestConnection('meta-muse')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Test Meta API</span>
          </button>
        </div>
      </div>

      {/* Providers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {providers.map(provider => {
          const isSelected = selectedProviderId === provider.id;
          const testStatus = testResults[provider.id];
          const isTesting = testingId === provider.id;

          return (
            <div
              key={provider.id}
              className={`p-5 rounded-2xl border transition-all space-y-4 flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-500 dark:border-indigo-500 shadow-md ring-1 ring-indigo-500/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getStatusBadge(provider.status)}`}>
                      {provider.status.replace(/_/g, ' ')}
                    </span>
                    <h3 className="text-base font-black text-slate-900 dark:text-white mt-1.5">
                      {provider.name}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    {provider.latencyTier}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {provider.description}
                </p>

                {/* Metadata details */}
                <div className="space-y-1.5 text-xs pt-2 border-t border-slate-100 dark:border-slate-800 font-mono">
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Model ID:</span>
                    <span className="text-slate-800 dark:text-slate-200 font-semibold">{provider.modelId}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Endpoint:</span>
                    <span className="text-slate-800 dark:text-slate-200 truncate max-w-[180px]">{provider.endpointUrl}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Key / Variable:</span>
                    <span className="text-indigo-500 font-semibold">{provider.requiredEnvVar}</span>
                  </div>
                </div>

                {/* Capability Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {provider.capabilityTags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-slate-600 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Live Test Status Feedback */}
                {testStatus && (
                  <div className={`p-2.5 rounded-lg border text-xs flex items-start gap-2 ${
                    testStatus.online
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                      : 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400'
                  }`}>
                    {testStatus.online ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" />
                    ) : (
                      <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                    )}
                    <div className="leading-tight">
                      <span className="font-bold block">
                        {testStatus.online ? `Online (${testStatus.latencyMs}ms)` : 'Offline / Unconfigured'}
                      </span>
                      <span className="text-[11px] opacity-90">{testStatus.message}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => {
                    setSelectedProviderId(provider.id);
                    showToast(`Default provider set to ${provider.name}`, 'success');
                  }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {isSelected ? 'Active Model ✓' : 'Select'}
                </button>

                <button
                  onClick={() => handleTestConnection(provider.id)}
                  disabled={isTesting}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer flex items-center gap-1"
                  title="Test live endpoint connection"
                >
                  <RefreshCw className={`w-3 h-3 ${isTesting ? 'animate-spin' : ''}`} />
                  <span>Test</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Local Ollama Guide */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
          <Terminal className="w-4 h-4 text-indigo-500" />
          Running 100% Private Open-Weight Models Locally via Ollama
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          For offline development or sensitive codebases where no data can leave your machine, install <a href="https://ollama.com" target="_blank" rel="noreferrer" className="text-indigo-500 font-semibold underline">Ollama</a> and pull the high-performing open-weight coding model:
        </p>
        <div className="p-3.5 rounded-xl bg-slate-950 font-mono text-xs text-emerald-400 space-y-1">
          <div># 1. Download and run Qwen 2.5 Coder locally:</div>
          <div className="font-bold text-white">ollama run qwen2.5-coder:7b</div>
          <div className="pt-2 text-slate-500"># 2. Ollama will start listening on http://localhost:11434. SkillNova automatically connects!</div>
        </div>
      </div>
    </div>
  );
};
