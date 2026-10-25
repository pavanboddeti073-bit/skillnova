export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';
export type SupportedLanguage = 'en' | 'te';
export type ToolCategory =
  | 'coding'
  | 'chat_research'
  | 'local_models'
  | 'images'
  | 'video'
  | 'audio_music'
  | 'voice'
  | 'presentations'
  | 'documents'
  | 'productivity'
  | 'career';

export type PricingTier =
  | 'Open Source'
  | 'Free Tier'
  | 'Free Trial'
  | 'Paid'
  | 'Pricing Not Verified';

export type VerificationStatus = 'verified' | 'unverified' | 'needs_recheck';

export interface Tool {
  id: string;
  name: string;
  category: ToolCategory;
  summary: string;
  summaryTe?: string;
  useCases: string[];
  skillLevel: SkillLevel | 'all';
  officialUrl: string;
  docsUrl: string;
  pricingLabel: PricingTier;
  pricingDetails: string;
  openSourceStatus: boolean;
  licenseNotes?: string;
  supportedOutputs: string[];
  beginnerSteps: string[];
  samplePrompt: string;
  commonErrors: string[];
  alternatives: string[];
  lastVerifiedAt: string;
  verificationStatus: VerificationStatus;
  badge?: string;
}

export interface QuizQuestion {
  question: string;
  questionTe?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  explanationTe?: string;
}

export interface Lesson {
  id: string;
  title: string;
  titleTe?: string;
  level: SkillLevel;
  category: string;
  durationMinutes: number;
  prerequisites: string[];
  summary: string;
  summaryTe?: string;
  plainExplanation: string;
  plainExplanationTe?: string;
  steps: Array<{
    title: string;
    description: string;
    codeOrPrompt?: string;
  }>;
  example: string;
  practiceActivity: string;
  commonMistakes: string[];
  quiz: QuizQuestion[];
  references: Array<{ title: string; url: string }>;
}

export interface TutorialStep {
  stepNumber: number;
  title: string;
  instruction: string;
  instructionTe?: string;
  copyablePrompt?: string;
  expectedResult: string;
  checkpointQuestion: string;
  stuckTips: string[];
  screenshotNote?: string;
}

export interface GuidedTutorial {
  id: string;
  toolId: string;
  toolName: string;
  title: string;
  titleTe?: string;
  badge: string;
  duration: string;
  prerequisites: string[];
  whatItIs: string;
  whatItIsTe?: string;
  whenToUseIt: string;
  whenToUseItTe?: string;
  steps: TutorialStep[];
  safetyNotes: string[];
  costNotes: string;
  officialDocsUrl: string;
  lastVerifiedAt: string;
}

export interface StudioStep {
  stepNumber: number;
  title: string;
  titleTe?: string;
  whatWeAreDoing: string;
  actionInstruction: string;
  actionInstructionTe?: string;
  visualType: 'wireframe' | 'flowchart' | 'slide-layout' | 'component-sketch' | 'table';
  visualData?: any;
  copyablePrompt: string;
  promptWhy: string;
  promptPersonalize: string;
  expectedResult: string;
  checkpoint: string;
  stuckTips: Array<{
    symptom: string;
    fix: string;
    docLink?: string;
  }>;
}

export interface BuildRecipe {
  id: string;
  slug: 'presentation' | 'documentation' | 'website' | 'creative-media' | 'learn-tool';
  title: string;
  titleTe: string;
  shortDescription: string;
  shortDescriptionTe: string;
  durationEstimate: string;
  targetAudience: string;
  targetDeliverable: string;
  visualReferenceNote: string;
  recommendedTools: Array<{
    name: string;
    why: string;
    freeTierNote: string;
    url: string;
  }>;
  prerequisites: string[];
  steps: StudioStep[];
  finalChecklist: string[];
  exportTemplate: string;
}

export interface ProjectWizardAnswer {
  goal: string;
  level: SkillLevel;
  language: SupportedLanguage;
  budget: 'zero_cost' | 'free_tier_ok' | 'paid_ok';
  device: 'basic_laptop' | 'capable_pc' | 'mobile_only' | 'cloud_first';
  desiredOutput: string;
  deadline: string;
}

export interface GeneratedProjectPlan {
  id: string;
  goalSummary: string;
  goalSummaryTe?: string;
  prerequisites: string[];
  recommendedTools: Array<{
    name: string;
    role: string;
    reason: string;
    pricingNote: string;
    url: string;
  }>;
  milestones: Array<{
    milestoneNumber: number;
    title: string;
    description: string;
    copyablePrompt: string;
    checkpoint: string;
    commonErrorAndFix: string;
  }>;
  testingChecklist: string[];
  officialReferences: Array<{ label: string; url: string; lastVerified: string }>;
  createdAt: string;
}

export interface CareerResource {
  id: string;
  organization: string;
  title: string;
  category: 'student_program' | 'fellowship' | 'open_source' | 'career_portal';
  officialUrl: string;
  location: string;
  eligibility: string;
  status: 'verified' | 'unverified' | 'needs_recheck';
  notes: string;
  lastCheckedAt: string;
}

export interface PromptTemplate {
  id: string;
  title: string;
  category: 'coding' | 'website' | 'media' | 'presentation' | 'documentation' | 'study' | 'resume' | 'research';
  role: string;
  context: string;
  task: string;
  constraints: string;
  steps: string;
  outputFormat: string;
  qualityChecks: string;
  whyThisWorks: string;
  sampleInput: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  language?: SupportedLanguage;
  isDemo?: boolean;
  modelUsed?: string;
  timestamp: string;
  suggestedFollowUps?: string[];
}

export interface ResumeAnalysis {
  clarityScore: number; // 0-100 indicator (educational feedback only)
  structureRating: 'Good' | 'Needs Improvement' | 'Formatting Risk';
  strengths: string[];
  impactBulletCritique: Array<{
    originalExample?: string;
    improvedExample: string;
    reason: string;
  }>;
  atsSafetyTips: string[];
  identifiedSkills: string[];
  recommendedAdditions: string[];
  disclaimer: string;
}

export interface UserProgress {
  completedLessons: string[];
  completedTutorialSteps: Record<string, number[]>;
  completedStudioSteps: Record<string, number[]>;
  savedPrompts: Array<{
    id: string;
    title: string;
    prompt: string;
    createdAt: string;
  }>;
  favoriteTools: string[];
  savedPlans: GeneratedProjectPlan[];
  preferredLanguage: SupportedLanguage;
  preferredLevel: SkillLevel;
}
