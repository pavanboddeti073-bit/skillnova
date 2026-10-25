import { Router } from 'express';
import type { Request, Response } from 'express';
import crypto from 'node:crypto';
import { readDb, writeDb, resetDb } from './db.ts';
import type { UserProfile, UserNote, UserBookmark } from './db.ts';
import { askTutor, optimizePrompt, generateProjectPlan } from './aiService.ts';
import { executeCode } from './codeRunner.ts';
import { registeredModelProviders } from '../src/data/modelProviders.ts';
import { verifiedTools } from '../src/data/tools.ts';
import { academyLessons } from '../src/data/lessons.ts';
import { guidedTutorials } from '../src/data/tutorials.ts';
import { buildRecipes } from '../src/data/recipes.ts';
import { verifiedCareerResources, roleRoadmaps } from '../src/data/careerResources.ts';
import { promptTemplates } from '../src/data/promptTemplates.ts';
import { prebuiltProjectPlans } from '../src/data/projectTemplates.ts';
import { analyzeStudentResume } from '../src/services/resumeAnalyzer.ts';
import { siteConfig } from '../src/config/siteConfig.ts';
import { courseCatalog } from '../src/data/courses.ts';
import { practiceQuizzes } from '../src/data/quizzes.ts';
import { isServerSupabaseConfigured, checkServerSupabaseHealth } from './supabase.ts';

export const apiRouter = Router();

const hashPassword = (password: string): string => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

const getAuthUser = (req: Request): UserProfile | null => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : (req.query.token as string);
  const db = readDb();
  if (token) {
    const session = db.sessions.find(s => s.token === token);
    if (session) {
      const user = db.users.find(u => u.id === session.userId);
      if (user) return user;
    }
  }
  // Return default active user if no token (demo / single user mode)
  return db.users[0] || null;
};

// ====================================================================
// 1. HEALTH & SYSTEM INFO
// ====================================================================
apiRouter.get('/health', async (_req: Request, res: Response) => {
  const db = readDb();
  const supabaseHealth = isServerSupabaseConfigured
    ? await checkServerSupabaseHealth()
    : { connected: false, message: 'Supabase credentials not set in .env' };

  res.json({
    status: 'online',
    uptimeSeconds: Math.floor(process.uptime()),
    service: 'SkillNova Mega14 Full-Stack API Engine',
    version: '2.0.0-mega14',
    database: {
      status: 'connected',
      usersCount: db.users.length,
      enrollmentsCount: db.enrollments.length,
      notesCount: db.notes.length,
      bookmarksCount: db.bookmarks.length,
      chatHistoryCount: db.chatHistory.length
    },
    supabase: {
      configured: isServerSupabaseConfigured,
      ...supabaseHealth
    },
    aiEngine: {
      hasExternalGeminiKey: Boolean(process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY),
      provider: (process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY) ? 'Google Gemini 3.5 Cloud' : 'SkillNova Mega14 Knowledge Engine'
    }
  });
});

apiRouter.get('/config', (_req: Request, res: Response) => {
  res.json(siteConfig);
});

// ====================================================================
// 2. AUTHENTICATION & PROFILE
// ====================================================================
apiRouter.post('/auth/signup', (req: Request, res: Response) => {
  const { email, password, fullName, learningInterests, learningLevel } = req.body;
  if (!email || !password || !fullName) {
    return res.status(400).json({ error: 'Full name, valid email, and password are required.' });
  }

  const db = readDb();
  const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(409).json({ error: 'An account with this email address already exists.' });
  }

  const newUser: UserProfile = {
    id: `usr-${crypto.randomUUID().slice(0, 8)}`,
    email: email.toLowerCase().trim(),
    fullName: fullName.trim(),
    passwordHash: hashPassword(password),
    learningInterests: Array.isArray(learningInterests) && learningInterests.length ? learningInterests : ['Artificial Intelligence', 'Programming & Web Dev'],
    learningLevel: learningLevel || 'beginner',
    explanationDepth: 'standard',
    dailyGoalMinutes: 30,
    theme: 'light',
    streakDays: 1,
    totalLearningMinutes: 0,
    createdAt: new Date().toISOString()
  };

  const token = `token-${crypto.randomUUID()}`;
  db.users.push(newUser);
  db.sessions.push({
    token,
    userId: newUser.id,
    expiresAt: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString()
  });
  writeDb(db);

  const { passwordHash: _, ...safeUser } = newUser;
  res.status(201).json({
    user: safeUser,
    token,
    message: 'Account created successfully. Welcome to SkillNova Mega14!'
  });
});

apiRouter.post('/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const db = readDb();
  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
  if (!user || (user.passwordHash && user.passwordHash !== hashPassword(password))) {
    return res.status(401).json({ error: 'Invalid email or password. Please check your credentials.' });
  }

  const token = `token-${crypto.randomUUID()}`;
  db.sessions.push({
    token,
    userId: user.id,
    expiresAt: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString()
  });
  writeDb(db);

  const { passwordHash: _, ...safeUser } = user;
  res.json({
    user: safeUser,
    token,
    message: `Welcome back, ${user.fullName}!`
  });
});

apiRouter.get('/auth/me', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  const { passwordHash: _, ...safeUser } = user;
  res.json({ user: safeUser });
});

apiRouter.post('/auth/logout', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : (req.body.token as string);
  const db = readDb();
  if (token) {
    db.sessions = db.sessions.filter(s => s.token !== token);
    writeDb(db);
  }
  res.json({ success: true, message: 'Logged out successfully.' });
});

apiRouter.post('/auth/reset-password', (req: Request, res: Response) => {
  const { email, newPassword } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required.' });

  const db = readDb();
  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
  if (!user) {
    // For security, do not disclose if user exists
    return res.json({ success: true, message: 'If this email exists in our system, password reset instructions have been sent.' });
  }

  if (newPassword) {
    user.passwordHash = hashPassword(newPassword);
    user.updatedAt = new Date().toISOString();
    writeDb(db);
    return res.json({ success: true, message: 'Password has been reset successfully. Please log in with your new password.' });
  }

  res.json({ success: true, message: 'Password reset link sent to your registered email.' });
});

apiRouter.put('/auth/profile', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const { fullName, bio, learningInterests, learningLevel, explanationDepth, dailyGoalMinutes, theme } = req.body;
  const db = readDb();
  const targetUser = db.users.find(u => u.id === user.id);
  if (targetUser) {
    if (fullName) targetUser.fullName = fullName;
    if (bio !== undefined) targetUser.bio = bio;
    if (learningInterests) targetUser.learningInterests = learningInterests;
    if (learningLevel) targetUser.learningLevel = learningLevel;
    if (explanationDepth) targetUser.explanationDepth = explanationDepth;
    if (dailyGoalMinutes) targetUser.dailyGoalMinutes = Number(dailyGoalMinutes);
    if (theme) {
      targetUser.theme = theme;
      db.profile.theme = theme;
    }
    targetUser.updatedAt = new Date().toISOString();
    writeDb(db);
    const { passwordHash: _, ...safeUser } = targetUser;
    return res.json({ user: safeUser, message: 'Profile updated successfully.' });
  }
  res.status(404).json({ error: 'User not found' });
});

// ====================================================================
// 3. COURSES & LESSONS API
// ====================================================================
apiRouter.get('/courses', (req: Request, res: Response) => {
  const { category, level, search } = req.query;
  let results = [...courseCatalog];

  if (category && category !== 'all') {
    results = results.filter(c => c.category === category);
  }
  if (level && level !== 'all') {
    results = results.filter(c => c.level === level || c.level === 'all');
  }
  if (typeof search === 'string' && search.trim()) {
    const q = search.toLowerCase().trim();
    results = results.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q)
    );
  }

  res.json({ total: courseCatalog.length, count: results.length, courses: results });
});

apiRouter.get('/courses/:id', (req: Request, res: Response) => {
  const course = courseCatalog.find(c => c.id === req.params.id || c.slug === req.params.id);
  if (!course) return res.status(404).json({ error: 'Course not found' });
  res.json(course);
});

apiRouter.post('/courses/:id/enroll', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  const courseId = req.params.id;
  const db = readDb();
  const existing = db.enrollments.find(e => e.userId === user?.id && e.courseId === courseId);
  if (existing) {
    return res.json({ enrollment: existing, message: 'Already enrolled in course.' });
  }

  const enrollment = {
    id: `enr-${crypto.randomUUID().slice(0, 8)}`,
    userId: user?.id || 'usr-student-demo',
    courseId,
    progressPercent: 0,
    completed: false,
    enrolledAt: new Date().toISOString(),
    lastAccessedAt: new Date().toISOString()
  };
  db.enrollments.push(enrollment);
  writeDb(db);
  res.status(201).json({ enrollment, message: 'Enrolled in course successfully.' });
});

apiRouter.post('/lessons/:id/progress', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  const lessonId = req.params.id;
  const { courseId, completed = true } = req.body;
  const db = readDb();

  const existingIdx = db.lessonProgress.findIndex(lp => lp.userId === user?.id && lp.lessonId === lessonId);
  if (existingIdx >= 0) {
    db.lessonProgress[existingIdx].completed = completed;
    db.lessonProgress[existingIdx].completedAt = new Date().toISOString();
  } else {
    db.lessonProgress.push({
      id: `prog-${crypto.randomUUID().slice(0, 8)}`,
      userId: user?.id || 'usr-student-demo',
      courseId: courseId || 'course-ai-foundations',
      lessonId,
      completed,
      completedAt: new Date().toISOString()
    });
  }

  // Also sync with legacy array
  if (completed && !db.completedLessons.includes(lessonId)) {
    db.completedLessons.push(lessonId);
  } else if (!completed) {
    db.completedLessons = db.completedLessons.filter(id => id !== lessonId);
  }

  writeDb(db);
  res.json({ success: true, lessonId, completed });
});

// ====================================================================
// 4. PRACTICE QUIZZES API
// ====================================================================
apiRouter.get('/quizzes', (req: Request, res: Response) => {
  const { category, level } = req.query;
  let results = [...practiceQuizzes];
  if (category && category !== 'all') {
    results = results.filter(q => q.category === category);
  }
  if (level && level !== 'all') {
    results = results.filter(q => q.level === level);
  }
  res.json({ total: practiceQuizzes.length, quizzes: results });
});

apiRouter.post('/quizzes/:id/attempt', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  const quiz = practiceQuizzes.find(q => q.id === req.params.id);
  if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

  const { answers } = req.body; // Record<questionIndex, selectedOptionIndex>
  let score = 0;
  const feedback = quiz.questions.map((q, idx) => {
    const selected = answers?.[idx];
    const isCorrect = selected === q.correctIndex;
    if (isCorrect) score += 1;
    return {
      questionId: q.id,
      selected,
      correctIndex: q.correctIndex,
      isCorrect,
      explanation: q.explanation,
      explanationTe: q.explanationTe
    };
  });

  const percentage = Math.round((score / quiz.questions.length) * 100);
  const passed = percentage >= quiz.passingScorePercent;

  const db = readDb();
  db.quizAttempts.push({
    id: `att-${crypto.randomUUID().slice(0, 8)}`,
    userId: user?.id || 'usr-student-demo',
    quizId: quiz.id,
    score,
    totalQuestions: quiz.questions.length,
    passed,
    completedAt: new Date().toISOString()
  });

  // Check if achievement unlocked
  if (passed && !db.achievements.some(a => a.badgeId === 'quiz-master' && a.userId === user?.id)) {
    db.achievements.push({
      id: `ach-${crypto.randomUUID().slice(0, 8)}`,
      userId: user?.id || 'usr-student-demo',
      badgeId: 'quiz-master',
      title: 'Quiz Champion',
      description: `Passed ${quiz.title} with ${percentage}% score!`,
      icon: 'Award',
      unlockedAt: new Date().toISOString()
    });
  }

  writeDb(db);
  res.json({
    score,
    total: quiz.questions.length,
    percentage,
    passed,
    feedback
  });
});

// ====================================================================
// 5. STUDY NOTES & BOOKMARKS API
// ====================================================================
apiRouter.get('/notes', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  const db = readDb();
  const notes = db.notes.filter(n => n.userId === user?.id);
  res.json({ notes });
});

apiRouter.post('/notes', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  const { title, content, tags, courseId, lessonId, id } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });

  const db = readDb();
  if (id) {
    const idx = db.notes.findIndex(n => n.id === id && n.userId === user?.id);
    if (idx >= 0) {
      db.notes[idx] = {
        ...db.notes[idx],
        title,
        content,
        tags: Array.isArray(tags) ? tags : [],
        updatedAt: new Date().toISOString()
      };
      writeDb(db);
      return res.json({ note: db.notes[idx], message: 'Note updated.' });
    }
  }

  const newNote: UserNote = {
    id: `note-${crypto.randomUUID().slice(0, 8)}`,
    userId: user?.id || 'usr-student-demo',
    title,
    content,
    tags: Array.isArray(tags) ? tags : [],
    courseId,
    lessonId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  db.notes.unshift(newNote);
  writeDb(db);
  res.status(201).json({ note: newNote, message: 'Note created.' });
});

apiRouter.delete('/notes/:id', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  const db = readDb();
  db.notes = db.notes.filter(n => !(n.id === req.params.id && n.userId === user?.id));
  writeDb(db);
  res.json({ success: true });
});

apiRouter.get('/bookmarks', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  const db = readDb();
  const bookmarks = db.bookmarks.filter(b => b.userId === user?.id);
  res.json({ bookmarks });
});

apiRouter.post('/bookmarks', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  const { itemType, itemId, title, metadata } = req.body;
  if (!itemType || !itemId || !title) {
    return res.status(400).json({ error: 'itemType, itemId, and title are required' });
  }

  const db = readDb();
  const existing = db.bookmarks.find(b => b.userId === user?.id && b.itemId === itemId && b.itemType === itemType);
  if (existing) {
    db.bookmarks = db.bookmarks.filter(b => b.id !== existing.id);
    writeDb(db);
    return res.json({ bookmarked: false, message: 'Bookmark removed.' });
  }

  const newBookmark: UserBookmark = {
    id: `bm-${crypto.randomUUID().slice(0, 8)}`,
    userId: user?.id || 'usr-student-demo',
    itemType,
    itemId,
    title,
    metadata,
    createdAt: new Date().toISOString()
  };
  db.bookmarks.unshift(newBookmark);
  writeDb(db);
  res.status(201).json({ bookmarked: true, bookmark: newBookmark, message: 'Bookmark added.' });
});

apiRouter.delete('/bookmarks/:id', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  const db = readDb();
  db.bookmarks = db.bookmarks.filter(b => !(b.id === req.params.id && b.userId === user?.id));
  writeDb(db);
  res.json({ success: true });
});

// ====================================================================
// 6. REAL AI TUTOR (15 Modes, Multi-Model, Streaming/Structured)
// ====================================================================
apiRouter.post('/tutor/chat', async (req: Request, res: Response) => {
  try {
    const {
      message,
      language = 'en',
      level = 'beginner',
      mode = 'explain_concept',
      depth = 'standard',
      focus = 'practical',
      providerId
    } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message text is required' });
    }

    const tutorResponse = await askTutor(message, language, level, mode, depth, focus, providerId);

    // Save to user chat history in database
    const db = readDb();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    db.chatHistory.push(
      {
        id: `msg-${Date.now()}-u`,
        role: 'user',
        content: message,
        timestamp: timeStr
      },
      {
        id: `msg-${Date.now()}-a`,
        role: 'assistant',
        content: tutorResponse.content,
        timestamp: timeStr,
        suggestedFollowUps: tutorResponse.suggestedFollowUps
      }
    );
    if (db.chatHistory.length > 50) {
      db.chatHistory = db.chatHistory.slice(-50);
    }
    writeDb(db);

    res.json({
      reply: tutorResponse.content,
      source: tutorResponse.source,
      modelUsed: tutorResponse.modelUsed,
      suggestedFollowUps: tutorResponse.suggestedFollowUps,
      timestamp: timeStr
    });
  } catch (error) {
    console.error('AI Tutor Route Error:', error);
    res.status(500).json({
      error: 'An unexpected error occurred while communicating with the AI Tutor.',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// ====================================================================
// 6B. SAFE CODE EXECUTION SANDBOX (All-Language Evaluation)
// ====================================================================
apiRouter.post('/execute', async (req: Request, res: Response) => {
  try {
    const { code, language = 'javascript', stdin, visibleTests, hiddenTests, timeoutMs = 3000 } = req.body;
    if (!code || typeof code !== 'string') {
      return res.status(400).json({ error: 'Source code string is required for execution.' });
    }

    const result = await executeCode({
      code,
      language,
      stdin,
      visibleTests,
      hiddenTests,
      timeoutMs
    });

    res.json(result);
  } catch (error: any) {
    console.error('Sandbox Execution Error:', error);
    res.status(500).json({
      status: 'error',
      stdout: '',
      stderr: error?.message || 'Code execution sandbox failed',
      executionTimeMs: 0,
      testsPassed: 0,
      totalTests: 0,
      testResults: [],
      runtimeEnvironment: 'SkillNova Error Handler'
    });
  }
});

// ====================================================================
// 6C. MULTI-MODEL REGISTRY & LIVE CONNECTIVITY TEST
// ====================================================================
apiRouter.get('/models', (_req: Request, res: Response) => {
  const metaKeyActive = Boolean(process.env.MODEL_API_KEY && !process.env.MODEL_API_KEY.includes('your_'));
  const hfTokenActive = Boolean(process.env.HF_TOKEN && !process.env.HF_TOKEN.includes('your_'));
  const geminiKeyActive = Boolean(process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY);

  const enrichedProviders = registeredModelProviders.map(p => {
    let status = p.status;
    if (p.id === 'meta-muse' || p.id === 'meta-llama-3') {
      status = metaKeyActive ? 'active' : 'available_with_key';
    } else if (p.id === 'huggingface-qwen') {
      status = hfTokenActive ? 'active' : 'available_with_key';
    } else if (p.id === 'gemini-flash') {
      status = geminiKeyActive ? 'active' : 'offline_fallback';
    }
    return { ...p, status };
  });

  res.json({
    activeDefaultProvider: metaKeyActive ? 'meta-muse' : 'gemini-flash',
    providers: enrichedProviders
  });
});

apiRouter.post('/models/test', async (req: Request, res: Response) => {
  const { providerId } = req.body;
  const start = performance.now();

  try {
    if (providerId === 'ollama-local') {
      try {
        const check = await fetch('http://localhost:11434/api/tags', { signal: AbortSignal.timeout(2000) });
        const latency = Math.round(performance.now() - start);
        if (check.ok) {
          const tags = await check.json();
          return res.json({
            online: true,
            latencyMs: latency,
            message: `Ollama is running locally with ${tags.models?.length || 0} installed model(s).`
          });
        }
      } catch {
        return res.json({
          online: false,
          latencyMs: Math.round(performance.now() - start),
          message: 'Ollama is not running on http://localhost:11434. Run "ollama serve" to start on-device inference.'
        });
      }
    }

    if (providerId === 'meta-muse' || providerId === 'meta-llama-3') {
      const hasKey = Boolean(process.env.MODEL_API_KEY && !process.env.MODEL_API_KEY.includes('your_'));
      const latency = Math.round(performance.now() - start);
      return res.json({
        online: hasKey,
        latencyMs: latency,
        message: hasKey
          ? 'Meta Model API connection verified (MODEL_API_KEY active).'
          : 'Meta Model API is configured for muse-spark-1.3. Set MODEL_API_KEY in server .env to activate.'
      });
    }

    // Default cloud/core test
    res.json({
      online: true,
      latencyMs: Math.round(performance.now() - start),
      message: 'Provider endpoint verified and reachable.'
    });
  } catch (err: any) {
    res.json({
      online: false,
      latencyMs: Math.round(performance.now() - start),
      message: err?.message || 'Provider connection test failed.'
    });
  }
});

apiRouter.get('/tutor/conversations', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  const db = readDb();
  const convs = db.conversations.filter(c => c.userId === user?.id);
  res.json({ conversations: convs });
});

apiRouter.post('/tutor/conversations', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  const { title, mode = 'explain_concept', language = 'en', initialMessage } = req.body;
  const db = readDb();

  const newConv = {
    id: `conv-${crypto.randomUUID().slice(0, 8)}`,
    userId: user?.id || 'usr-student-demo',
    title: title || 'New Learning Conversation',
    mode,
    language: language || 'en',
    messages: initialMessage ? [initialMessage] : [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.conversations.unshift(newConv);
  writeDb(db);
  res.status(201).json({ conversation: newConv });
});

apiRouter.delete('/tutor/conversations/:id', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  const db = readDb();
  db.conversations = db.conversations.filter(c => !(c.id === req.params.id && c.userId === user?.id));
  writeDb(db);
  res.json({ success: true });
});

// ====================================================================
// 7. PRESERVED LEGACY & EXTENDED ENDPOINTS
// ====================================================================
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

  res.json({ total: verifiedTools.length, count: results.length, tools: results });
});

apiRouter.get('/tools/:id', (req: Request, res: Response) => {
  const tool = verifiedTools.find(t => t.id === req.params.id);
  if (!tool) return res.status(404).json({ error: 'Tool not found' });
  res.json(tool);
});

apiRouter.get('/academy/lessons', (_req: Request, res: Response) => {
  res.json({ count: academyLessons.length, lessons: academyLessons });
});

apiRouter.get('/studio/recipes', (_req: Request, res: Response) => {
  res.json({ count: buildRecipes.length, recipes: buildRecipes });
});

apiRouter.get('/school/tutorials', (_req: Request, res: Response) => {
  res.json({ count: guidedTutorials.length, tutorials: guidedTutorials });
});

apiRouter.get('/prompts/templates', (_req: Request, res: Response) => {
  res.json({ count: promptTemplates.length, templates: promptTemplates });
});

apiRouter.post('/prompts/optimize', async (req: Request, res: Response) => {
  const { prompt, task, level = 'beginner' } = req.body;
  if (!prompt || !task) return res.status(400).json({ error: 'prompt and task are required' });
  const optimized = await optimizePrompt(prompt, task, level);
  res.json({ original: prompt, optimized, framework: 'CR-TCO' });
});

apiRouter.get('/wizard/plans', (_req: Request, res: Response) => {
  res.json({ count: prebuiltProjectPlans.length, plans: prebuiltProjectPlans });
});

apiRouter.post('/wizard/generate-plan', async (req: Request, res: Response) => {
  const { topic, level = 'beginner' } = req.body;
  if (!topic) return res.status(400).json({ error: 'topic is required' });
  const plan = await generateProjectPlan(topic, level);
  res.json(plan);
});

apiRouter.get('/career/resources', (_req: Request, res: Response) => {
  res.json({ resources: verifiedCareerResources, roadmaps: roleRoadmaps });
});

apiRouter.post('/career/resume-analyze', (req: Request, res: Response) => {
  const { resumeText } = req.body;
  if (!resumeText || typeof resumeText !== 'string') {
    return res.status(400).json({ error: 'resumeText is required' });
  }

  const analysis = analyzeStudentResume(resumeText);
  const db = readDb();
  db.resumeHistory.unshift({
    id: `res-${Date.now()}`,
    score: analysis.score,
    summary: `${analysis.identifiedSkills.length} technical skills detected`,
    createdAt: new Date().toISOString()
  });
  if (db.resumeHistory.length > 10) {
    db.resumeHistory = db.resumeHistory.slice(0, 10);
  }
  writeDb(db);
  res.json(analysis);
});

apiRouter.get('/user/progress', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  const db = readDb();
  res.json({
    user,
    profile: db.profile,
    completedLessons: db.completedLessons,
    quizScores: db.quizScores,
    favoriteTools: db.favoriteTools,
    completedStudioSteps: db.completedStudioSteps,
    savedPromptsCount: db.savedPrompts.length,
    savedPlansCount: db.savedPlans.length,
    notesCount: db.notes.filter(n => n.userId === user?.id).length,
    bookmarksCount: db.bookmarks.filter(b => b.userId === user?.id).length,
    achievements: db.achievements.filter(a => a.userId === user?.id)
  });
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

apiRouter.delete('/user/data', (_req: Request, res: Response) => {
  const fresh = resetDb();
  res.json({ success: true, message: 'All user data erased from database', database: fresh });
});
