// ═══════════════════════════════════════════════════════════════════════════
// FreeStack Video — Main Server
// AffiliateMediaHub Studio | John Lanter, CEO
// $0/month self-hosted video render API — replaces Shotstack entirely
// ═══════════════════════════════════════════════════════════════════════════

import express    from 'express';
import cors       from 'cors';
import os         from 'node:os';
import { randomUUID } from 'node:crypto';
import { unlink }     from 'node:fs/promises';
import { renderTimeline } from './renderer.js';
import { uploadRender, storageReady } from './storage.js';

const app  = express();
const PORT = process.env.PORT || 10000;

// ── Auth & CORS ────────────────────────────────────────────────────────────
const API_KEY = process.env.API_KEY;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['*'];

const auth = (req, res, next) => {
  if (!API_KEY) return next(); // No key set, allow all (dev mode)
  const key = req.headers['x-api-key'];
  if (key === API_KEY) return next();
  res.status(401).json({ error: 'Unauthorized: Invalid or missing x-api-key' });
};

// ── Middleware ─────────────────────────────────────────────────────────────
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes('*') || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json({ limit: '512kb' }));

// ── Local static serving (fallback only) ───────────────────────────────────
// We only serve a specific subdirectory, not the entire os.tmpdir() for security.
const LOCAL_RENDER_DIR = path.join(os.tmpdir(), 'freestack-renders');
import { mkdirSync } from 'node:fs';
try { mkdirSync(LOCAL_RENDER_DIR, { recursive: true }); } catch (e) {}
app.use('/local-renders', express.static(LOCAL_RENDER_DIR));

// ── In-memory job store ────────────────────────────────────────────────────
// Each job: { status, url?, error?, createdAt, progress? }
const jobs  = new Map();
const queue = [];
let   working = false;

// ── Job worker — serial (one render at a time on free-tier 0.1 vCPU) ──────
async function workLoop() {
  if (working) return;
  working = true;

  while (queue.length) {
    const { id, timeline, options } = queue.shift();
    jobs.set(id, { ...jobs.get(id), status: 'rendering', progress: 0 });
    console.log(`[FreeStack] Rendering job ${id}…`);

    try {
      const localFile = await renderTimeline(timeline, options, id, (pct) => {
        jobs.set(id, { ...jobs.get(id), progress: pct });
      });

      jobs.set(id, { ...jobs.get(id), progress: 90, status: 'uploading' });
      const url = await uploadRender(localFile, id);

      // Only delete if it was uploaded to R2 (url won't start with file:// or /local-renders)
      if (storageReady()) {
        await unlink(localFile).catch(() => {});
      }

      jobs.set(id, { status: 'done', url, progress: 100, createdAt: jobs.get(id).createdAt });
      console.log(`[FreeStack] Job ${id} done → ${url}`);

    } catch (err) {
      console.error(`[FreeStack] Job ${id} FAILED:`, err.message);
      jobs.set(id, { status: 'failed', error: err.message, progress: 0, createdAt: jobs.get(id).createdAt });
    }
  }

  working = false;
}

// ── Health check ───────────────────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.json({
    service:   'FreeStack Video',
    version:   '1.0.0',
    studio:    'AffiliateMediaHub Studio',
    status:    'running',
    queue:     queue.length,
    storage:   storageReady() ? 'Cloudflare R2' : 'Local /tmp (no R2 configured)',
    endpoints: {
      render:       'POST /render',
      renderStatus: 'GET  /render/:id',
      health:       'GET  /healthz',
    }
  });
});

app.get('/healthz', (_req, res) => res.json({ ok: true, queue: queue.length }));

// ── Protected routes ───────────────────────────────────────────────────────
app.use(['/render', '/renders'], auth);

// ── POST /render — Submit a video render job ───────────────────────────────
// Input format (Shotstack-compatible):
// {
//   timeline: {
//     background: '#0c0f1a',
//     scenes: [
//       { type: 'title-card',  duration: 3,  title: 'Hello', subtitle: 'World' },
//       { type: 'lower-third', duration: 5,  name: 'John', role: 'CEO', text: 'AI Tools' },
//       { type: 'cta',         duration: 4,  cta: 'Call 409-555-1234', background: '#00d4aa' },
//       { type: 'text',        duration: 5,  text: 'Your message here' },
//       { type: 'blank',       duration: 2,  background: '#000000' }
//     ],
//     soundtrack?: { src: 'https://...mp3', volume: 0.3 }
//   },
//   output?: { format: 'mp4', resolution: '720p', fps: 30 }
// }
app.post('/render', (req, res) => {
  const { timeline, output } = req.body || {};

  if (!timeline || !Array.isArray(timeline.scenes) || !timeline.scenes.length) {
    return res.status(400).json({ error: 'timeline.scenes array is required and must not be empty' });
  }

  const id = `fsv_${randomUUID().replace(/-/g,'').slice(0,16)}`;
  const options = {
    format:     output?.format     || 'mp4',
    resolution: output?.resolution || '720p',
    fps:        output?.fps        || 30,
  };

  jobs.set(id, { status: 'queued', progress: 0, createdAt: Date.now() });
  queue.push({ id, timeline, options });
  setImmediate(workLoop);

  return res.status(202).json({
    id,
    status:    'queued',
    message:   'Render job queued. Poll statusUrl for updates.',
    statusUrl: `/render/${id}`,
    estimatedWait: `${(timeline.scenes.reduce((s,sc) => s + (sc.duration||3), 0) * 0.3).toFixed(0)}–${(timeline.scenes.reduce((s,sc) => s + (sc.duration||3), 0) * 1.2).toFixed(0)} seconds`
  });
});

// ── GET /render/:id — Poll job status ──────────────────────────────────────
app.get('/render/:id', (req, res) => {
  const job = jobs.get(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json({ id: req.params.id, ...job });
});

// ── GET /render — List all jobs ────────────────────────────────────────────
app.get('/renders', (_req, res) => {
  const list = [];
  for (const [id, job] of jobs) list.push({ id, ...job });
  list.sort((a, b) => b.createdAt - a.createdAt);
  res.json({ total: list.length, jobs: list.slice(0, 50) });
});

// ── Start server ───────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════╗
║         FreeStack Video — AffiliateMediaHub          ║
║         Self-hosted · $0/month · No watermarks       ║
╚══════════════════════════════════════════════════════╝
  Port  : ${PORT}
  Storage: ${storageReady() ? 'Cloudflare R2 ✅' : 'Local /tmp (set R2 env vars for cloud storage)'}
  Queue  : Ready
`);
});
