# Hub Engine v5 — AffiliateMediaHub Studio

Complete single-file app. No build step. No npm install. Drag to Vercel and it works.

## What's inside

- **Dashboard** — Today's checklist, progress bar, Becky's next action
- **LinkedIn Composer** — 6 themes, autosave, research attach, Becky polish
- **Job Tracker** — 5 jobs + 5 companies + 5 founders
- **Video Troubleshooter** — 4-stage log + ask Becky for advice
- **Becky Chat** — Full chat with Becky as Creative Director
- **AI Tools Grid** — 12 external tools (Perplexity, Gemini, ChatGPT, Qwen, ChatLLM, DeepSeek, Kimi, Meta, Leonardo, Sora, NotebookLM, Substack)
- **Settings** — API key management + data export

## Deploy to Vercel (2 minutes)

### Option 1: Drag and drop (easiest)

1. Go to https://vercel.com/new
2. Click "Browse" or drag this folder onto the page
3. Click Deploy
4. Done — your app is live

### Option 2: Vercel CLI

```bash
npm i -g vercel
cd hub-engine-v5
vercel
```

### Option 3: GitHub

1. Create new GitHub repo
2. Upload `index.html` and `vercel.json` to it
3. In Vercel, "Import Project" from that repo
4. Deploy

## First-time setup

When the app loads:

1. Click the ⚙️ gear icon (top right) or go to Settings in the sidebar
2. Add your **Groq API key** — free at https://console.groq.com (required for Becky)
3. Add your **Perplexity API key** — at https://perplexity.ai/settings/api (needed for research attachments)

Keys are saved in your browser's localStorage. They never leave your device.

## Daily use

1. Open the app → land on **Today** dashboard
2. Follow Becky's next-action card
3. Collect 5 jobs / 5 companies / 5 founders in **Job Tracker**
4. Write your **LinkedIn post** (autosave runs as you type)
5. Attach Perplexity research, polish with Becky, copy to LinkedIn
6. If a video breaks, log it in **Video Troubleshooter** and ask Becky what to check
7. Mark day as reviewed at the end

All data lives in this browser. Use Settings → Export All Data to back it up.

## Data notes

- Everything keyed by date: `hubengine_day_YYYY-MM-DD`
- Full history preserved — yesterday's data stays when today starts
- Reset today's data via Settings without touching past days
- Export creates a JSON backup of everything

## Troubleshooting

**Becky not responding?** Settings → check Groq key is saved
**Research fails?** Settings → check Perplexity key, or the free tier is rate-limited
**Lost a draft?** Check browser console: `localStorage.getItem('hubengine_day_' + new Date().toISOString().slice(0,10))`
**Want to start over?** Settings → Reset Today (or Clear Browser Data for a full wipe)

## What's next (when you're ready)

- Cloud sync (so OnePlus and laptop share data)
- More theme templates
- Auto-posting to LinkedIn
- Weekly / monthly rollup views

Say the word.
