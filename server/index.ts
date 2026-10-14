import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { apiRouter } from './routes.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRouter);

// Serve static frontend files in production
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// Fallback to index.html for SPA routing
app.use((req, res, _next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found', path: req.path });
  }
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
          <head><title>SkillNova Server</title></head>
          <body style="font-family:sans-serif;padding:2rem;line-height:1.6;">
            <h2>🚀 SkillNova Full-Stack API Server</h2>
            <p>API is running smoothly on port <code>${PORT}</code>.</p>
            <p>Visit <a href="/api/health">/api/health</a> for system status.</p>
            <p>In development mode, view frontend at <a href="http://localhost:5173">http://localhost:5173</a>.</p>
          </body>
        </html>
      `);
    }
  });
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 SkillNova Full-Stack Server Running on Port ${PORT}`);
  console.log(`📡 API Endpoints: http://localhost:${PORT}/api/health`);
  console.log(`======================================================\n`);
});
