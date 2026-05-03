// ═══════════════════════════════════════════════════════════════════════════
// FreeStack Video — FFmpeg Renderer
// Converts JSON timeline → MP4 via FFmpeg
// ═══════════════════════════════════════════════════════════════════════════

import { spawn }     from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import path           from 'node:path';
import os             from 'node:os';

// Font paths on Ubuntu (installed via Dockerfile)
const FONTS = {
  bold:    '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
  regular: '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
  mono:    '/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf',
};

// Resolution map
const RES = {
  '720p':  { w: 1280, h: 720  },
  '1080p': { w: 1920, h: 1080 },
  '480p':  { w: 854,  h: 480  },
  '9:16':  { w: 720,  h: 1280 }, // TikTok / Reels vertical
  '1:1':   { w: 720,  h: 720  }, // Instagram square
};

// Escape text for FFmpeg drawtext
function esc(s) {
  return String(s || '')
    .replace(/\\/g, '\\\\')
    .replace(/'/g,  "\\'")
    .replace(/:/g,  '\\:')
    .replace(/,/g,  '\\,')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .substring(0, 200);
}

// Hex color → FFmpeg 0xRRGGBB
function col(hex) {
  return '0x' + String(hex || '#0c0f1a').replace('#', '').padEnd(6, '0');
}

// Build FFmpeg drawtext filter string for one text element
function drawtext({ text, font, size, color, x, y, alpha, shadow, enable }) {
  const parts = [
    `fontfile=${font || FONTS.bold}`,
    `text='${esc(text)}'`,
    `fontcolor=${color || 'white'}`,
    `fontsize=${size || 48}`,
    `x=${x || '(w-text_w)/2'}`,
    `y=${y || '(h-text_h)/2'}`,
  ];
  if (alpha)  parts.push(`alpha=${alpha}`);
  if (shadow) parts.push(`shadowx=2:shadowy=2:shadowcolor=black@0.6`);
  if (enable) parts.push(`enable='${enable}'`);
  return `drawtext=${parts.join(':')}`;
}

// Build a complete filtergraph from scene array
function buildFiltergraph(scenes, W, H, FPS) {
  const inputs  = [];
  const filters = [];
  const n       = scenes.length;

  scenes.forEach((sc, i) => {
    const dur = Math.max(1, sc.duration || 3);
    const bg  = col(sc.background || '#0c0f1a');

    // Color background input for this scene
    inputs.push(
      '-f', 'lavfi',
      '-t', String(dur),
      '-i', `color=c=${bg}:s=${W}x${H}:r=${FPS}`
    );

    const inLabel  = `[${i}:v]`;
    const outLabel = `[sc${i}]`;
    const texts    = [];

    // ── Studio watermark (always shown) ──────────────────────────────────
    texts.push(drawtext({
      text:  'AffiliateMediaHub Studio',
      font:  FONTS.bold,
      size:  Math.round(W * 0.016),
      color: '#00d4aa',
      x:     '(w-text_w)/2',
      y:     String(Math.round(H * 0.03)),
      shadow: true,
    }));

    // ── Scene-type specific overlays ──────────────────────────────────────
    switch (sc.type) {

      case 'title-card': {
        if (sc.title) texts.push(drawtext({
          text:   sc.title,
          font:   FONTS.bold,
          size:   Math.round(W * 0.055),
          color:  sc.titleColor || 'white',
          x:      '(w-text_w)/2',
          y:      `(h-text_h)/2${sc.subtitle ? '-40' : ''}`,
          shadow: true,
        }));
        if (sc.subtitle) texts.push(drawtext({
          text:   sc.subtitle,
          font:   FONTS.regular,
          size:   Math.round(W * 0.028),
          color:  sc.subtitleColor || 'rgba(255,255,255,0.8)',
          x:      '(w-text_w)/2',
          y:      '(h-text_h)/2+50',
          shadow: true,
        }));
        break;
      }

      case 'lower-third': {
        // Dark bar at bottom
        const barH  = Math.round(H * 0.14);
        const barY  = H - barH - Math.round(H * 0.06);
        texts.push(
          `drawbox=x=50:y=${barY}:w=${Math.round(W * 0.55)}:h=${barH}:color=black@0.7:t=fill`
        );
        if (sc.name) texts.push(drawtext({
          text:  sc.name,
          font:  FONTS.bold,
          size:  Math.round(W * 0.032),
          color: 'white',
          x:     '70',
          y:     String(barY + Math.round(barH * 0.15)),
          shadow: true,
        }));
        if (sc.role) texts.push(drawtext({
          text:  sc.role,
          font:  FONTS.regular,
          size:  Math.round(W * 0.022),
          color: '#a78bfa',
          x:     '70',
          y:     String(barY + Math.round(barH * 0.58)),
        }));
        if (sc.text) texts.push(drawtext({
          text:  sc.text,
          font:  FONTS.regular,
          size:  Math.round(W * 0.03),
          color: 'white',
          x:     '(w-text_w)/2',
          y:     '(h-text_h)/2',
          shadow: true,
        }));
        break;
      }

      case 'cta': {
        if (sc.cta) texts.push(drawtext({
          text:  sc.cta,
          font:  FONTS.bold,
          size:  Math.round(W * 0.042),
          color: sc.ctaColor || '#f5c518',
          x:     '(w-text_w)/2',
          y:     '(h-text_h)/2',
          shadow: true,
        }));
        break;
      }

      case 'text':
      default: {
        if (sc.text) texts.push(drawtext({
          text:  sc.text,
          font:  FONTS.regular,
          size:  Math.round(W * 0.032),
          color: sc.textColor || 'white',
          x:     '(w-text_w)/2',
          y:     '(h-text_h)/2',
          shadow: true,
        }));
        if (sc.title) texts.push(drawtext({
          text:  sc.title,
          font:  FONTS.bold,
          size:  Math.round(W * 0.045),
          color: 'white',
          x:     '(w-text_w)/2',
          y:     '(h-text_h)/2-60',
          shadow: true,
        }));
        break;
      }
    }

    // Combine all drawtext/drawbox into one filter chain for this scene
    filters.push(`${inLabel}${texts.join(',')}${outLabel}`);
  });

  // Concatenate all scenes
  const concatIn = scenes.map((_, i) => `[sc${i}]`).join('');
  filters.push(`${concatIn}concat=n=${n}:v=1:a=0[outv]`);

  return { inputs, filterComplex: filters.join(';') };
}

// ── Main render function ───────────────────────────────────────────────────
export async function renderTimeline(timeline, options = {}, jobId, onProgress) {
  const res = RES[options.resolution] || RES['720p'];
  const W   = res.w;
  const H   = res.h;
  const FPS = options.fps || 30;

  const dir     = mkdtempSync(path.join(os.tmpdir(), 'fsv-'));
  const outFile = path.join(dir, `${jobId}.mp4`);

  const { inputs, filterComplex } = buildFiltergraph(timeline.scenes, W, H, FPS);

  const args = [
    // Inputs — one color source per scene
    ...inputs,

    // Filtergraph
    '-filter_complex', filterComplex,
    '-map', '[outv]',

    // Video encoding — ultrafast for free-tier CPU
    '-c:v',       'libx264',
    '-preset',    'ultrafast',
    '-crf',       '28',
    '-pix_fmt',   'yuv420p',
    '-movflags',  '+faststart',
    '-r',         String(FPS),

    // Output
    '-y', outFile,
  ];

  console.log(`[FreeStack] FFmpeg args: ${args.join(' ').substring(0, 300)}…`);

  await new Promise((resolve, reject) => {
    const proc = spawn('ffmpeg', args, { stdio: ['ignore', 'pipe', 'pipe'] });

    let totalDuration = timeline.scenes.reduce((s, sc) => s + (sc.duration || 3), 0);
    let stderr = '';

    proc.stderr.on('data', (chunk) => {
      const text = chunk.toString();
      stderr += text;

      // Parse progress from FFmpeg output
      const timeMatch = text.match(/time=(\d+):(\d+):(\d+\.\d+)/);
      if (timeMatch && onProgress) {
        const elapsed = parseInt(timeMatch[1]) * 3600
          + parseInt(timeMatch[2]) * 60
          + parseFloat(timeMatch[3]);
        const pct = Math.min(85, Math.round((elapsed / totalDuration) * 85));
        onProgress(pct);
      }
    });

    proc.on('close', (code) => {
      if (code === 0) {
        if (onProgress) onProgress(88);
        resolve(outFile);
      } else {
        reject(new Error(`FFmpeg exited with code ${code}. Stderr: ${stderr.slice(-500)}`));
      }
    });

    proc.on('error', (err) => reject(new Error(`Failed to spawn FFmpeg: ${err.message}`)));
  });

  return outFile;
}
