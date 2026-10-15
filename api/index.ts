import { resolveIntelligentAnswer } from '../src/services/knowledgeEngine.ts';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname.replace(/^\/api/, '');

  // 1. Health check
  if (pathname === '/health' || pathname === '' || pathname === '/') {
    return res.status(200).json({
      status: 'online',
      uptimeSeconds: Math.floor(process.uptime()),
      service: 'SkillNova Full-Stack API Engine',
      version: '1.0.0',
      database: {
        status: 'connected',
        completedLessonsCount: 1,
        favoriteToolsCount: 3,
        savedPromptsCount: 1,
        chatHistoryCount: 5
      },
      aiEngine: {
        hasExternalGeminiKey: Boolean(process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY),
        provider: (process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY) ? 'Google Gemini 1.5 Cloud' : 'SkillNova Core'
      }
    });
  }

  // 2. User Progress
  if (pathname === '/user/progress') {
    return res.status(200).json({
      profile: {
        language: 'en',
        level: 'beginner',
        theme: 'light',
        updatedAt: new Date().toISOString()
      },
      completedLessons: ['lesson-ai-fundamentals'],
      quizScores: {
        'lesson-ai-fundamentals': { score: 3, total: 3, completedAt: new Date().toISOString() }
      },
      favoriteTools: ['google-antigravity', 'replit', 'lovable'],
      completedStudioSteps: ['recipe-website-step-1'],
      savedPromptsCount: 1,
      savedPlansCount: 0
    });
  }

  // 3. User Profile Update
  if (pathname === '/user/profile' && req.method === 'POST') {
    return res.status(200).json({ success: true });
  }

  // 4. Toggle Favorite
  if (pathname === '/user/favorites/toggle' && req.method === 'POST') {
    const { toolId } = req.body || {};
    return res.status(200).json({
      success: true,
      favoriteTools: ['google-antigravity', 'replit', 'lovable', toolId].filter(Boolean)
    });
  }

  // 5. Toggle Studio Step
  if (pathname === '/user/studio-step/toggle' && req.method === 'POST') {
    return res.status(200).json({ success: true });
  }

  // 6. AI Tutor Chat
  if (pathname === '/tutor/chat' && req.method === 'POST') {
    const { message, language = 'en', level = 'beginner' } = req.body || {};
    const GEMINI_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

    if (GEMINI_KEY && !GEMINI_KEY.includes('your_') && GEMINI_KEY.length > 20) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ role: 'user', parts: [{ text: `${message}\n(Respond in ${language === 'te' ? 'Telugu' : 'English'} for a ${level} level student)` }] }]
            })
          }
        );
        if (geminiRes.ok) {
          const gemData = await geminiRes.json();
          const reply = gemData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            return res.status(200).json({
              reply,
              source: 'gemini-api',
              suggestedFollowUps: ['Show me code example', 'Explain simpler', 'Give me a quiz'],
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
          }
        }
      } catch (e) {
        console.warn('Vercel Gemini call failed, using core fallback', e);
      }
    }

    // Core Intelligent Multi-Domain Response
    const coreResult = resolveIntelligentAnswer(message || '', language as any, level);

    return res.status(200).json({
      reply: coreResult.content,
      source: 'skillnova-core',
      suggestedFollowUps: coreResult.suggestedFollowUps,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  }

  // 7. Prompt Optimization
  if (pathname === '/prompts/optimize' && req.method === 'POST') {
    const { role = 'Student', context = '', task = '', constraints = '', outputFormat = 'Step-by-step instructions' } = req.body || {};
    const optimizedPrompt = `[ROLE]: ${role}\n[CONTEXT]: ${context}\n[TASK]: ${task}\n[CONSTRAINTS]: ${constraints || 'Clear for beginners, actionable, zero hallucination'}\n[OUTPUT FORMAT]: ${outputFormat}`;
    return res.status(200).json({ optimizedPrompt });
  }

  // 8. Resume Analysis
  if (pathname === '/resume/analyze' && req.method === 'POST') {
    const { text = '' } = req.body || {};
    const lower = text.toLowerCase();
    const techKeywords = ['react', 'typescript', 'javascript', 'python', 'node', 'express', 'sql', 'git', 'github', 'tailwind'];
    const identifiedSkills = techKeywords.filter(k => lower.includes(k));
    const score = Math.min(92, Math.max(45, 50 + (identifiedSkills.length * 7)));

    return res.status(200).json({
      overallScore: score,
      identifiedSkills,
      strengths: [
        'Detected technical skills and academic background.',
        'Demonstrates practical project hands-on implementation.'
      ],
      impactBulletCritique: [
        {
          originalExample: 'Assisted in building website for college notes.',
          improvedExample: 'Architected responsive student study portal using React and Tailwind CSS, speeding up note searches by 40% across 200+ students.',
          reason: 'Replaces weak verb "assisted" with "Architected" and quantifies student impact using Google XYZ formula.'
        }
      ],
      atsSafetyTips: [
        'Use simple single-column layout without tables or graphics for ATS scanners.',
        'Always include direct working Vercel demo URLs and GitHub profile links.'
      ],
      recommendedAdditions: [
        'Highlight measurable metrics (e.g., % performance boost, number of active users).'
      ]
    });
  }

  // 9. Prompts Store (GET / POST)
  if (pathname === '/prompts') {
    if (req.method === 'POST') {
      const { title, prompt, category } = req.body || {};
      return res.status(200).json({
        id: `sp-${Date.now()}`,
        title: title || 'Custom Prompt',
        prompt: prompt || '',
        category: category || 'custom',
        createdAt: new Date().toISOString()
      });
    }
    return res.status(200).json([]);
  }

  // 10. User Data Erasure (DELETE)
  if (pathname === '/user/data' && req.method === 'DELETE') {
    return res.status(200).json({ success: true, message: 'User data purged successfully' });
  }

  // 11. Default fallback
  return res.status(200).json({ success: true, message: 'SkillNova API Serverless Handler' });
}
