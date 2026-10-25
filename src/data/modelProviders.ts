export interface AIModelProviderConfig {
  id: string;
  name: string;
  providerType: 'meta-api' | 'ollama-local' | 'huggingface' | 'gemini-cloud' | 'skillnova-core';
  modelId: string;
  endpointUrl: string;
  requiredEnvVar: string;
  deploymentType: 'Cloud Hosted API' | 'Local On-Device' | 'Edge Serverless' | 'Deterministic Engine';
  status: 'active' | 'configured' | 'available_with_key' | 'offline_fallback';
  streamingSupported: boolean;
  structuredOutputSupported: boolean;
  toolCallingSupported: boolean;
  capabilityTags: string[];
  latencyTier: 'Ultra Fast (<500ms)' | 'Fast (1-2s)' | 'Local Hardware Dependent';
  costNotes: string;
  license: string;
  description: string;
}

export const registeredModelProviders: AIModelProviderConfig[] = [
  // 1. PRIMARY: META MODEL API
  {
    id: 'meta-muse',
    name: 'Meta Model API — Muse Spark',
    providerType: 'meta-api',
    modelId: 'muse-spark-1.3',
    endpointUrl: 'https://api.meta.ai/v1',
    requiredEnvVar: 'MODEL_API_KEY',
    deploymentType: 'Cloud Hosted API',
    status: 'available_with_key',
    streamingSupported: true,
    structuredOutputSupported: true,
    toolCallingSupported: true,
    capabilityTags: ['Code Generation', 'Architectural Design', 'Code Review', 'Prompt Optimization'],
    latencyTier: 'Fast (1-2s)',
    costNotes: 'Meta Developer API tier rates apply. Requires MODEL_API_KEY in server .env.',
    license: 'Meta Model License & Terms',
    description: 'Meta\'s premier fast coding and instruction model engineered for developer tasks, precise code synthesis, and structured JSON schemas.'
  },

  // 2. META LLAMA ENDPOINT
  {
    id: 'meta-llama-3',
    name: 'Meta Model API — Llama 3.3 70B',
    providerType: 'meta-api',
    modelId: 'meta-llama/Llama-3.3-70B-Instruct',
    endpointUrl: 'https://api.meta.ai/v1',
    requiredEnvVar: 'MODEL_API_KEY',
    deploymentType: 'Cloud Hosted API',
    status: 'available_with_key',
    streamingSupported: true,
    structuredOutputSupported: true,
    toolCallingSupported: true,
    capabilityTags: ['Deep Algorithmic Reasoning', 'Multi-Language Synthesis', 'Complex Refactoring'],
    latencyTier: 'Fast (1-2s)',
    costNotes: 'Requires MODEL_API_KEY.',
    license: 'Llama 3 Community License',
    description: 'High-capacity 70-billion parameter reasoning model ideal for complex algorithms, system architecture design, and comprehensive code reviews.'
  },

  // 3. OLLAMA LOCAL RUNNER (OPEN-WEIGHT)
  {
    id: 'ollama-local',
    name: 'Ollama — Local Open-Weight Runner',
    providerType: 'ollama-local',
    modelId: 'qwen2.5-coder:7b',
    endpointUrl: 'http://localhost:11434',
    requiredEnvVar: 'None (Runs on local machine)',
    deploymentType: 'Local On-Device',
    status: 'available_with_key',
    streamingSupported: true,
    structuredOutputSupported: true,
    toolCallingSupported: false,
    capabilityTags: ['100% Private', 'Zero Cost', 'Offline Capable', 'Qwen2.5 Coder'],
    latencyTier: 'Local Hardware Dependent',
    costNotes: 'Completely free & private. Requires Ollama installed and running on your machine.',
    license: 'Apache 2.0 / Open-Weights',
    description: 'Runs directly on your computer’s CPU/GPU via Ollama. No code leaves your machine. Perfect for private codebases and offline coding practice.'
  },

  // 4. HUGGING FACE INFERENCE (OPEN-WEIGHT)
  {
    id: 'huggingface-qwen',
    name: 'Hugging Face — Qwen 2.5 Coder 32B',
    providerType: 'huggingface',
    modelId: 'Qwen/Qwen2.5-Coder-32B-Instruct',
    endpointUrl: 'https://api-inference.huggingface.co/v1',
    requiredEnvVar: 'HF_TOKEN',
    deploymentType: 'Cloud Hosted API',
    status: 'available_with_key',
    streamingSupported: true,
    structuredOutputSupported: true,
    toolCallingSupported: false,
    capabilityTags: ['Open-Weight State-of-the-Art', 'Polyglot Coding', 'Benchmark Leader'],
    latencyTier: 'Fast (1-2s)',
    costNotes: 'Free tier available via Hugging Face Access Token (HF_TOKEN).',
    license: 'Apache 2.0',
    description: 'One of the world’s top-performing open-weight coding models, highly proficient across 92 programming languages.'
  },

  // 5. GOOGLE GEMINI CLOUD FALLBACK
  {
    id: 'gemini-flash',
    name: 'Google Gemini 3.5 Cloud',
    providerType: 'gemini-cloud',
    modelId: 'gemini-3.5-flash',
    endpointUrl: 'https://generativelanguage.googleapis.com/v1beta',
    requiredEnvVar: 'GEMINI_API_KEY',
    deploymentType: 'Cloud Hosted API',
    status: 'active',
    streamingSupported: true,
    structuredOutputSupported: true,
    toolCallingSupported: true,
    capabilityTags: ['Fast Inference', 'Multilingual (English & Telugu)', 'Active Fallback'],
    latencyTier: 'Ultra Fast (<500ms)',
    costNotes: 'Pre-configured and active in SkillNova production server.',
    license: 'Google Gemini API Terms',
    description: 'Ultra-low latency Google Gemini cloud model active as a high-speed fallback with bilingual English and Telugu capabilities.'
  },

  // 6. SKILLNOVA CORE KNOWLEDGE ENGINE
  {
    id: 'skillnova-core',
    name: 'SkillNova Core Deterministic Engine',
    providerType: 'skillnova-core',
    modelId: 'skillnova-knowledge-v2',
    endpointUrl: 'Internal Memory Engine',
    requiredEnvVar: 'None',
    deploymentType: 'Deterministic Engine',
    status: 'active',
    streamingSupported: false,
    structuredOutputSupported: true,
    toolCallingSupported: false,
    capabilityTags: ['Zero Latency', 'Zero Hallucinations', 'Guaranteed Runnable Code', 'Always Online'],
    latencyTier: 'Ultra Fast (<500ms)',
    costNotes: '100% Free, built-in, and always available offline without internet.',
    license: 'MIT / SkillNova Proprietary',
    description: 'Deterministic, verified multi-domain engineering knowledge engine providing curated answers, debug steps, and code snippets with zero hallucinations.'
  }
];
