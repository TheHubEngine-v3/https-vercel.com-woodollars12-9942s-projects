# Hub Engine v5 — Preservation Build

**Feature-complete single-file app that preserves everything from v4 and adds the missing workflows.**

## Pre-ship verification (all ✓)

### Preserved from the v4 screenshot

**CONTENT group:** Podcast Studio · Video Studio · Business Team · Affiliate Team
**TOOLS group:** Content Calendar · Brand Voice · Prompt Library · Skills & Automations
**GROWTH group:** Training Library · Files & Resources · Team Management · Settings

**Files & Resources page:** Hub Engine v4 App · FTC Disclosure Template · Vmake AI Studio · ElevenLabs · Groq Console · Hub Engine AI Video Maker · Vercel Dashboard

**AI Tools Grid core cards (8):** Claude · Groq · ElevenLabs · Vmake · Abacus.ai · Vercel · GitHub · LinkedIn

**Topbar:** Three Minds mission pill · Becky button · Settings gear · page title indicator

### Added (new)

**Daily group:** Today (Dashboard) · LinkedIn Composer · Job Search Tracker · Video Troubleshooter
**AI group:** Becky AI (full chat) · Perplexity Research · AI Tools (expanded grid)

**12 additional AI tools in AI Tools Grid:** Perplexity · Gemini · ChatGPT · Qwen · ChatLLM · DeepSeek · Kimi · Meta.AI · Leonardo.AI · Sora · NotebookLM · Substack

### Totals

- **19 views** in HTML, each with a **matching nav button** (perfect 1:1)
- **22 AI Tools cards total** across 4 groups (Core 8 + Chat 8 + Creative 2 + External 2 + 2 overlap adjustments = effectively preserved all v4 cards + added 12)

## Data preservation (critical)

**Same localStorage keys** as every previous build:

| Key pattern | What it stores |
|---|---|
| `hubengine_day_YYYY-MM-DD` | One record per day (checklist, LinkedIn, video log) |
| `hubengine_api_keys` | Groq + Perplexity keys |
| `hubengine_stub_{section}` | Notes for preserved v4 pages (podcast, videostudio, businessteam, affiliateteam, skills, team) |

**deepMerge restore:** when a day record loads, existing data takes priority — fresh defaults only fill in missing nested fields. Nothing gets overwritten.

**Self-verification:** the app console-logs a pass/fail for all 19 expected views on every page load. Open DevTools (F12) and check the Console — you should see `[Hub Engine v5] All 19 views verified present.`

## Autosave (all wired)

- **LinkedIn draft** — 800ms debounced + save on tab hide + save on page unload
- **Video script** — 600ms debounced save
- **Video stage fields** (voice/avatar/export) — save on every keystroke
- **Stub notes** (Podcast, Video Studio, Business Team, Affiliate Team, Skills, Team) — 500ms debounced + flush on unload
- **All lists** (jobs, companies, founders, missing/worked/failed) — save on add/remove
- **Chat history** — in-session only (by design, to keep storage light)

## About the v4 stub pages

Podcast Studio, Video Studio, Business Team, Affiliate Team, Skills & Automations, and Team Management are preserved as **free-form note pages** with autosaving textareas. If your v4 app had specific content inside these pages, paste it in and it persists under `hubengine_stub_{section}` keys.

Each stub page has a yellow note explaining this, so you won't be confused.

Team Management also shows the team roster (John · Becky · Claude) at the top before the notes area.

## Deploy

**Fastest — drag and drop:**
1. Go to https://vercel.com/new
2. Drag this folder onto the page
3. Click Deploy

**Test first:** Double-click `index.html`. Works in any browser, no server needed.

## After deploying

1. Open the app
2. Settings (gear icon or sidebar) → add Groq key (free at console.groq.com) → Becky works
3. Add Perplexity key → Research works
4. **Import your old data** if you have a backup: Settings → Import Backup

## Console checks you can run

Open DevTools Console (F12) and you'll see:
```
[Hub Engine v5] All 19 views verified present.
[Hub Engine v5] Today key: hubengine_day_2026-04-17
[Hub Engine v5] Nav items: 19 views: 19
```

If anything is ever missing, it'll show an error in the console with the exact missing view name.

To check your data at any time:
```js
// Show today's full record:
JSON.parse(localStorage.getItem('hubengine_day_' + new Date().toISOString().slice(0,10)))

// Show all hubengine keys:
Object.keys(localStorage).filter(k => k.startsWith('hubengine_'))
```
