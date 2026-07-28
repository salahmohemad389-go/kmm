import 'dotenv/config';
import express, { type Request, type Response, type NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sanitizeString(value: unknown, maxLen = 200): string {
  return String(value || '')
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, maxLen);
}

function sanitizeNumber(value: unknown, fallback: number, min?: number, max?: number): number {
  const n = Number(value);
  if (isNaN(n)) return fallback;
  let result = n;
  if (min !== undefined && result < min) result = min;
  if (max !== undefined && result > max) result = max;
  return result;
}

/** Ensure a field is present and a non-empty string. */
function requireString(body: Record<string, unknown>, field: string, maxLen = 200): string | null {
  const val = body[field];
  if (val == null || typeof val !== 'string' || val.trim() === '') return null;
  return val.trim().slice(0, maxLen);
}

// ─── Server ───────────────────────────────────────────────────────────────────

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // ── Global Middleware ───────────────────────────────────────────────────────

  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }));

  app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
    maxAge: 86400,
  }));

  app.use(express.json({ limit: '16kb' }));

  // Request ID + timestamp
  app.use((req: Request, _res: Response, next: NextFunction) => {
    req.headers['x-request-id'] = req.headers['x-request-id'] as string || crypto.randomUUID();
    (req as Request & { _startTime: number })._startTime = Date.now();
    next();
  });

  // ── Rate Limiters ──────────────────────────────────────────────────────────

  const aiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many AI requests, please try again later.' },
  });

  const globalLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 120,
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => req.url === '/api/health',
  });

  app.use('/api', globalLimiter);

  // ── Gemini AI Client ───────────────────────────────────────────────────────

  const getAi = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({ apiKey });
  };

  // ── Health Check ───────────────────────────────────────────────────────────

  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      app: process.env.APP_NAME || 'ELITE KINETIC',
      version: process.env.npm_package_version || '0.0.0',
      timestamp: new Date().toISOString(),
    });
  });

  // ── AI Alternative Exercise Generator ───────────────────────────────────────

  app.post('/api/ai-alternative-exercise', aiLimiter, async (req: Request, res: Response) => {
    try {
      const exerciseName = requireString(req.body, 'exerciseName', 100);
      if (!exerciseName) {
        res.status(400).json({ error: 'exerciseName is required and must be a non-empty string.' });
        return;
      }

      const targetMuscle = sanitizeString(req.body.targetMuscle, 100);

      const ai = getAi();

      if (!ai) {
        res.json({
          exerciseName,
          alternatives: [
            {
              name: exerciseName.includes('Bench') ? 'Dumbbell Flat Bench Press' : 'Incline Hammer Strength Press',
              reason: 'Identical biomechanical force vector with freer shoulder rotation.',
              recommendedSetsReps: '4 Sets × 8-10 Reps',
            },
            {
              name: exerciseName.includes('Bench') ? 'Weighted Push-Ups (Weighted Vest)' : 'Cable Chest Flyes',
              reason: 'Enables maximum scapular movement and core engagement.',
              recommendedSetsReps: '3 Sets × 12-15 Reps',
            },
          ],
        });
        return;
      }

      const prompt = `You are an elite master strength and conditioning coach for ELITE KINETIC.
An athlete is currently performing "${exerciseName}" targeting "${targetMuscle}".
Provide 2 high-performance alternative exercises that target the exact same muscle group with equal hypertrophy efficiency.
Return ONLY raw valid JSON with format:
{
  "exerciseName": "${exerciseName}",
  "alternatives": [
    {
      "name": "Alternative Exercise Name",
      "reason": "Scientific reason why it works well",
      "recommendedSetsReps": "4 Sets × 8-10 Reps"
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' },
      });

      const text = response.text || '';
      const cleanJson = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      res.json(parsed);
    } catch (err: unknown) {
      console.error('[AI] Alternative exercise error:', err);
      res.status(500).json({ error: 'Failed to generate alternative exercises.' });
    }
  });

  // ── AI Smart Quiz Recommendation ───────────────────────────────────────────

  app.post('/api/ai-quiz-recommendation', aiLimiter, async (req: Request, res: Response) => {
    try {
      const focus = sanitizeString(req.body.focus, 100) || 'General Fitness';
      const experienceLevel = sanitizeString(req.body.experienceLevel, 50) || 'Advanced';
      const daysPerWeek = sanitizeNumber(req.body.daysPerWeek, 5, 1, 7);

      const ai = getAi();

      if (!ai) {
        res.json({
          programTitle: `${focus} Master Protocol`,
          summary: 'Engineered 12-week progressive overload protocol calibrated for maximal kinetic output and lean mass acquisition.',
          weeklySplit: [
            'Push (Chest/Shoulders/Triceps)',
            'Pull (Back/Biceps)',
            'Legs (Quads/Hams/Calves)',
            'Upper Body Power',
            'Lower Body Hypertrophy',
          ],
          estimatedCalorieTarget: 2650,
          dailyProteinTarget: 185,
        });
        return;
      }

      const prompt = `As an elite strength coach at ELITE KINETIC, create a custom high-performance protocol for an athlete with:
Focus: ${focus}
Experience Level: ${experienceLevel}
Days/Week: ${daysPerWeek}

Return ONLY raw JSON with format:
{
  "programTitle": "Creative High-Tech Program Name",
  "summary": "1-2 concise punchy sentences describing the protocol",
  "weeklySplit": ["Day 1 name", "Day 2 name", "Day 3 name", "Day 4 name", "Day 5 name"],
  "estimatedCalorieTarget": 2700,
  "dailyProteinTarget": 180
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' },
      });

      const text = response.text || '';
      const cleanJson = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      res.json(parsed);
    } catch (err: unknown) {
      console.error('[AI] Quiz recommendation error:', err);
      res.status(500).json({ error: 'Failed to calculate custom protocol.' });
    }
  });

  // ── Global Error Handler ───────────────────────────────────────────────────

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('[Server] Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  });

  // ── Vite / Static Serving ──────────────────────────────────────────────────

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath, {
      maxAge: '1y',
      etag: true,
      lastModified: true,
    }));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // ── Start ──────────────────────────────────────────────────────────────────

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Running on http://localhost:${PORT} (${process.env.NODE_ENV || 'development'})`);
  });
}

startServer();
