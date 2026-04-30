// ═══════════════════════════════════════════════════════════════════════════
// FreeStack Video — Storage Module
// Primary: Cloudflare R2 (free, zero egress)
// Fallback: Local /tmp with base64 data URL (dev only)
// ═══════════════════════════════════════════════════════════════════════════

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { readFile } from 'node:fs/promises';

const R2_ENDPOINT   = process.env.R2_ENDPOINT;         // https://<acct>.r2.cloudflarestorage.com
const R2_ACCESS_KEY = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET     = process.env.R2_BUCKET     || 'freestack-video';
const R2_PUBLIC_URL = process.env.R2_PUBLIC_BASE;       // https://your-domain.com or r2.dev URL

let r2Client = null;

if (R2_ENDPOINT && R2_ACCESS_KEY && R2_SECRET_KEY) {
  r2Client = new S3Client({
    region:      'auto',
    endpoint:    R2_ENDPOINT,
    credentials: {
      accessKeyId:     R2_ACCESS_KEY,
      secretAccessKey: R2_SECRET_KEY,
    },
  });
  console.log('[FreeStack] Storage: Cloudflare R2 ready ✅');
} else {
  console.log('[FreeStack] Storage: No R2 configured — using local /tmp fallback');
}

export function storageReady() {
  return !!r2Client;
}

export async function uploadRender(localPath, jobId) {
  const key = `renders/${jobId}.mp4`;

  if (r2Client) {
    // Upload to Cloudflare R2
    const body = await readFile(localPath);
    await r2Client.send(new PutObjectCommand({
      Bucket:       R2_BUCKET,
      Key:          key,
      Body:         body,
      ContentType:  'video/mp4',
      CacheControl: 'public, max-age=86400',
    }));

    const publicBase = R2_PUBLIC_URL || `${R2_ENDPOINT}/${R2_BUCKET}`;
    const url = `${publicBase}/${key}`;
    console.log(`[FreeStack] Uploaded to R2: ${url}`);
    return url;

  } else {
    // Dev fallback — return the local file path as a "URL"
    // In production always configure R2
    console.warn('[FreeStack] WARNING: Returning local file path (no R2 configured)');
    return `file://${localPath}`;
  }
}
