import { Router } from 'express';
import type { Request, Response } from 'express';
import { readDb, writeDb, resetDb } from './db.ts';
import { askTutor, optimizePrompt, generateProjectPlan } from './aiService.ts';
import { verifiedTools } from '../src/data/tools.ts';
import { academyLessons } from '../src/data/lessons.ts';
import { guidedTutorials } from '../src/data/tutorials.ts';
import { buildRecipes } from '../src/data/recipes.ts';
import { verifiedCareerResources, roleRoadmaps } from '../src/data/careerResources.ts';
import { promptTemplates } from '../src/data/promptTemplates.ts';
import { prebuiltProjectPlans } from '../src/data/projectTemplates.ts';
import { analyzeStudentResume } from '../src/services/resumeAnalyzer.ts';
import { siteConfig } from '../src/config/siteConfig.ts';

export const apiRouter = Router();

// 1. Health check & System Info
apiRouter.get('/health', (_req: Request, res: Response) => {
  const db = readDb();
  res.json({
    status: 'online',
    uptimeSeconds: Math.floor(process.uptime()),
    service: 'SkillNova Full-Stack API Engine',
    version: '1.0.0',
    database: {
      status: 'connected',
      completedLessonsCount: db.completedLessons.length,
      favoriteToolsCount: db.favoriteTools.length,
      savedPromptsCount: db.savedPrompts.length,
      chatHistoryCount: db.chatHistory.length
    },
    aiEngine: {
      hasExternalGeminiKey: Boolean(process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY),
      provider: (process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY) ? 'Google Gemini 1.5' : 'SkillNova Core'
    }
  });
});

// 2. Site Configuration
apiRouter.get('/config', (_req: Request, res: Response) => {
  res.json(siteConfig);
});

// 3. Tools API
apiRouter.get('/tools', (req: Request, res: Response) => {
  const { category, pricing, search, opensource, beginner } = req.query;
  let results = [...verifiedTools];

  if (category && category !== 'all') {
    results = results.filter(t => t.category === category);
  }
  if (pricing && pricing !== 'all') {
    results = results.filter(t => t.pricingLabel === pricing);
  }
  if (opensource === 'true') {
    results = results.filter(t => t.openSourceStatus);
  }
  if (beginner === 'true') {
    results = results.filter(t => t.skillLevel === 'beginner' || t.skillLevel === 'all');
  }
  if (typeof search === 'string' && search.trim()) {
    const q = search.toLowerCase().trim();
    results = results.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.summary.toLowerCase().includes(q) ||
      t.useCases.some(u => u.toLowerCase().includes(q))
    );
  }

  res.json({
    total: verifiedTools.length,
    count: results.length,
    tools: results
  });
});

apiRouter.get('/tools/:id', (req: Request, res: Response) => {
  const tool = verifiedTools.find(t => t.id === req.params.id);
  if (!tool) {
    return res.status(404).json({ error: 'Tool not found' });
  }
  res.json(tool);
});

// 4. Academy Lessons & Interactive Quizzes
apiRouter.get('/lessons', (_req: Request, res: Response) => {
  const db = readDb();
  res.json({
    lessons: academyLessons,
    userCompletedLessonIds: db.completedLessons,
    quizScores: db.quizScores
  });
});

apiRouter.post('/lessons/:id/quiz', (req: Request, res: Response) => {
  const lesson = academyLessons.find(l => l.id === req.params.id);
  if (!lesson) {
    return res.status(404).json({ error: 'Lesson not found' });
  }

  const { answers } = req.body as { answers: Record<number, number> };
  if (!answers) {
    return res.status(400).json({ error: 'Answers payload missing' });
  }

  let correctCount = 0;
  const evaluations = lesson.quiz.map((q, idx) => {
    const isCorrect = answers[idx] === q.correctIndex;
    if (isCorrect) correctCount++;
    return {
      questionIndex: idx,
      userAnswer: answers[idx],
      correctAnswer: q.correctIndex,
      isCorrect,
      explanation: q.explanation
    };
  });

  const passed = correctCount === lesson.quiz.length;
  const db = readDb();

  // Save to database
  db.quizScores[lesson.id] = {
    score: correctCount,
    total: lesson.quiz.length,
    completedAt: new Date().toISOString()
  };

  if (passed && !db.completedLessons.includes(lesson.id)) {
    db.completedLessons.push(lesson.id);
  }
  writeDb(db);

  res.json({
    passed,
    score: correctCount,
    total: lesson.quiz.length,
    evaluations,
    completedLessons: db.completedLessons
  });
});

// 5. Guided School Tutorials & Build Recipes
apiRouter.get('/tutorials', (_req: Request, res: Response) => {
  res.json(guidedTutorials);
});

apiRouter.get('/recipes', (_req: Request, res: Response) => {
  const db = readDb();
  res.json({
    recipes: buildRecipes,
    completedSteps: db.completedStudioSteps
  });
});

// 6. AI Tutor Chat
apiRouter.post('/tutor/chat', async (req: Request, res: Response) => {
  const { message, language = 'en', level = 'beginner' } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const result = await askTutor(message, language as 'en' | 'te', level);

  const db = readDb();
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Record user message
  db.chatHistory.push({
    id: `msg-${Date.now()}-u`,
    role: 'user',
    content: message,
    timestamp
  });

  // Record assistant response
  db.chatHistory.push({
    id: `msg-${Date.now()}-a`,
    role: 'assistant',
    content: result.content,
    timestamp,
    suggestedFollowUps: result.suggestedFollowUps
  });

  // Keep chat history manageable
  if (db.chatHistory.length > 50) {
    db.chatHistory = db.chatHistory.slice(-50);
  }
  writeDb(db);

  res.json({
    reply: result.content,
    source: result.source,
    suggestedFollowUps: result.suggestedFollowUps,
    timestamp
  });
});

apiRouter.get('/tutor/history', (_req: Request, res: Response) => {
  const db = readDb();
  res.json(db.chatHistory);
});

apiRouter.delete('/tutor/history', (_req: Request, res: Response) => {
  const db = readDb();
  db.chatHistory = [];
  writeDb(db);
  res.json({ success: true, message: 'Chat history cleared' });
});

// 7. Prompt Lab Optimizer & Storage
apiRouter.post('/prompts/optimize', (req: Request, res: Response) => {
  const optimized = optimizePrompt(req.body);
  res.json({ optimizedPrompt: optimized });
});

apiRouter.get('/prompts', (_req: Request, res: Response) => {
  const db = readDb();
  res.json({
    templates: promptTemplates,
    savedPrompts: db.savedPrompts
  });
});

apiRouter.post('/prompts', (req: Request, res: Response) => {
  const { title, prompt, category = 'custom' } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt content is required' });
  }

  const db = readDb();
  const newPrompt = {
    id: `pr-${Date.now()}`,
    title: title?.trim() || 'Untitled Prompt',
    prompt: prompt.trim(),
    category,
    createdAt: new Date().toISOString()
  };

  db.savedPrompts.unshift(newPrompt);
  writeDb(db);
  res.json(newPrompt);
});

apiRouter.delete('/prompts/:id', (req: Request, res: Response) => {
  const db = readDb();
  db.savedPrompts = db.savedPrompts.filter(p => p.id !== req.params.id);
  writeDb(db);
  res.json({ success: true, remaining: db.savedPrompts });
});

// 8. Project Wizard Generator & Storage
apiRouter.post('/projects/generate', (req: Request, res: Response) => {
  const { goal, skillLevel, hoursAvailable } = req.body;
  const plan = generateProjectPlan(goal, skillLevel, hoursAvailable);
  res.json(plan);
});

apiRouter.get('/projects', (_req: Request, res: Response) => {
  const db = readDb();
  res.json({
    prebuiltTemplates: prebuiltProjectPlans,
    savedPlans: db.savedPlans
  });
});

apiRouter.post('/projects', (req: Request, res: Response) => {
  const { title, plan } = req.body;
  const db = readDb();
  const entry = {
    id: `plan-${Date.now()}`,
    title: title || 'Saved Project Plan',
    plan,
    createdAt: new Date().toISOString()
  };
  db.savedPlans.unshift(entry);
  writeDb(db);
  res.json(entry);
});

// 9. Career Hub & Resume Impact Analyzer
apiRouter.get('/career', (_req: Request, res: Response) => {
  res.json({
    programs: verifiedCareerResources,
    roadmaps: roleRoadmaps
  });
});

apiRouter.post('/resume/analyze', (req: Request, res: Response) => {
  const { text } = req.body;
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Resume text is required' });
  }

  const analysis = analyzeStudentResume(text);
  const db = readDb();
  db.resumeHistory.unshift({
    id: `res-${Date.now()}`,
    score: analysis.clarityScore,
    summary: `${analysis.identifiedSkills.length} technical skills detected`,
    createdAt: new Date().toISOString()
  });
  if (db.resumeHistory.length > 10) {
    db.resumeHistory = db.resumeHistory.slice(0, 10);
  }
  writeDb(db);

  res.json(analysis);
});

// 10. User Profile, Progress & Privacy
apiRouter.get('/user/progress', (_req: Request, res: Response) => {
  const db = readDb();
  res.json({
    profile: db.profile,
    completedLessons: db.completedLessons,
    quizScores: db.quizScores,
    favoriteTools: db.favoriteTools,
    completedStudioSteps: db.completedStudioSteps,
    savedPromptsCount: db.savedPrompts.length,
    savedPlansCount: db.savedPlans.length
  });
});

apiRouter.post('/user/profile', (req: Request, res: Response) => {
  const { language, level, theme } = req.body;
  const db = readDb();
  if (language) db.profile.language = language;
  if (level) db.profile.level = level;
  if (theme) db.profile.theme = theme;
  db.profile.updatedAt = new Date().toISOString();
  writeDb(db);
  res.json(db.profile);
});

apiRouter.post('/user/favorites/toggle', (req: Request, res: Response) => {
  const { toolId } = req.body;
  if (!toolId) return res.status(400).json({ error: 'toolId required' });

  const db = readDb();
  const idx = db.favoriteTools.indexOf(toolId);
  if (idx >= 0) {
    db.favoriteTools.splice(idx, 1);
  } else {
    db.favoriteTools.push(toolId);
  }
  writeDb(db);
  res.json({ favoriteTools: db.favoriteTools });
});

apiRouter.post('/user/studio-step/toggle', (req: Request, res: Response) => {
  const { stepId } = req.body;
  if (!stepId) return res.status(400).json({ error: 'stepId required' });

  const db = readDb();
  const idx = db.completedStudioSteps.indexOf(stepId);
  if (idx >= 0) {
    db.completedStudioSteps.splice(idx, 1);
  } else {
    db.completedStudioSteps.push(stepId);
  }
  writeDb(db);
  res.json({ completedStudioSteps: db.completedStudioSteps });
});

apiRouter.delete('/user/data', (_req: Request, res: Response) => {
  const fresh = resetDb();
  res.json({ success: true, message: 'All user data erased from database', database: fresh });
});
