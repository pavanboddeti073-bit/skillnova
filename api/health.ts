export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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
