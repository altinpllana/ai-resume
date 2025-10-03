import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { requestImprovements, ResumePayload } from './openai.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
  })
);
app.use(express.json({ limit: '1mb' }));

type RateBucket = { count: number; reset: number };
const RATE_LIMIT = 30;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const rateMap = new Map<string, RateBucket>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const existing = rateMap.get(ip);
  if (!existing || now > existing.reset) {
    rateMap.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    return false;
  }
  existing.count += 1;
  if (existing.count > RATE_LIMIT) {
    return true;
  }
  return false;
}

app.post('/api/generate', async (req, res) => {
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'Missing OpenAI API key. Set OPENAI_API_KEY in server/.env.' });
  }

  const ip = req.ip || req.headers['x-forwarded-for']?.toString() || 'global';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
  }

  const payload = req.body as ResumePayload;

  try {
    const raw = await requestImprovements(payload);
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch (error) {
      console.error('Failed to parse OpenAI response', raw);
      return res.status(502).json({ error: 'Failed to parse AI response. Please retry.' });
    }

    if (
      !parsed ||
      typeof parsed !== 'object' ||
      Array.isArray(parsed) ||
      typeof (parsed as any).summary !== 'string' ||
      !Array.isArray((parsed as any).experience) ||
      !Array.isArray((parsed as any).skills)
    ) {
      return res.status(502).json({ error: 'AI response missing required fields.' });
    }

    const expValid = (parsed as any).experience.every((item: any) => Array.isArray(item?.descriptionBullets));
    if (!expValid) {
      return res.status(502).json({ error: 'AI experience data malformed.' });
    }

    return res.json(parsed);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to improve resume. Please try again.' });
  }
});

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Resume Builder API running on http://localhost:${PORT}`);
});
