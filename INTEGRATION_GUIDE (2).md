# Hub Engine v3 — Becky Daily Workstation

## What this is

Becky is now John's in-app daily assistant. Open the app in the morning, work the day with Becky, close the app at night. Everything persists. Nothing gets lost.

## The daily flow (what John does each day)

1. Open app → land on **Daily Dashboard**
2. Becky greets John and points to the next action
3. Collect **5 job posts**, **5 company pages**, **5 founder posts** in the Job Tracker
4. Open **LinkedIn Composer**, pick a theme, write today's post
5. Attach Perplexity research to the post as backup
6. "Polish with Becky" → she rewrites in studio voice
7. Mark the post **ready**, copy, paste into LinkedIn
8. If working on video → open **Video Troubleshooter**, log script/voice/avatar/export status, ask Becky what to check
9. End of day → mark "Day Reviewed"

Progress bar fills as checklist items get done. Recent 7 days shown at the bottom for momentum tracking.

---

## The 12 files

| File | What it does |
|---|---|
| `dailyStore.js` | **The data layer.** Schema, localStorage ops, progress math |
| `useAutosave.js` | **The autosave hook.** Debounced continuous save + unmount/unload saves |
| `useDraft.js` | Lighter draft hook for simple inputs |
| `providers.js` | AI provider registry with Becky's full system prompt |
| `beckyService.js` | Becky's chat + rewrite functions |
| `perplexityService.js` | Perplexity research/drafting calls |
| `DailyDashboard.jsx` | **Home screen.** Checklist, progress, next action |
| `LinkedInComposer.jsx` | **Daily post writer.** Theme picker, autosave, research, polish |
| `JobSearchTracker.jsx` | **Daily collection.** 5 jobs, 5 companies, 5 founders |
| `VideoTroubleshooter.jsx` | **Stage-by-stage log.** Script → voice → avatar → export |
| `PerplexityTab.jsx` | Standalone research tab with Send-to-Becky |
| `AIDashboard.jsx` | AI picker showing tier hierarchy |

---

## The localStorage schema (exactly what gets saved)

### Key pattern
```
hubengine_day_2026-04-17      ← one per day
hubengine_day_2026-04-16
hubengine_days_index          ← sorted list of all days that have data
```

### Per-day record
```javascript
{
  date: "2026-04-17",
  createdAt: 1713340800000,
  updatedAt: 1713384000000,

  checklist: {
    jobPosts: [              // target: 5
      { title, company, url, notes, addedAt }
    ],
    companyPages: [          // target: 5
      { name, url, notes, addedAt }
    ],
    founderPosts: [          // target: 5
      { author, postUrl, takeaway, addedAt }
    ],
    linkedinDrafted: false,  // auto-sets when draft > 50 chars
    draftSaved: true,        // auto-sets after autosave
    researchAttached: false, // auto-sets when first research added
    dayReviewed: false       // manual toggle at day end
  },

  linkedinPost: {
    draft: "text of the post...",
    theme: "past-to-present" | "factory-background" | "learning-ai" | ...,
    attachedResearch: [
      { id, source, query, content, citations, addedAt }
    ],
    lastSaved: 1713384000000,
    status: "draft" | "ready" | "posted",
    wordCount: 127,
    beckyRewriteVersion: "Becky's polished version..."
  },

  videoLog: {
    host: "Susan" | "Alisha" | "Paul Baby Boss" | "Lisa",
    scheduledFor: "Monday",
    scriptText: "...",
    voiceGeneration: { status, voiceId, notes, errors },
    avatarGeneration: { status, platform, notes, errors },
    export: { status, format, notes, errors },
    missingSteps: [{ description, noticedAt }],
    whatWorked: [{ description, addedAt }],
    whatFailed: [{ description, addedAt }]
  },

  research: [],   // free-form research pool
  notes: ""       // end-of-day reflections
}
```

### Storage size math
Each day is roughly 5–20 KB depending on how much John writes. localStorage limit is ~5–10 MB per origin. That's years of daily records before hitting any ceiling.

---

## The autosave strategy (this is the heart of the requirement)

John's ask: *"save continuously while typing... restore automatically on page load... preserve the latest saved version after refresh or page change."*

Four save triggers, belt-and-suspenders:

**Trigger 1 — Debounced typing save** (800ms after last keystroke)
→ This is the primary "continuous" save. Catches every burst of typing.

**Trigger 2 — Component unmount**
→ When John clicks away from the Composer to another tab, `useAutosave` fires one final save on unmount.

**Trigger 3 — Tab visibility change**
→ When John switches to another browser tab (or puts phone to sleep), `visibilitychange` event fires a save.

**Trigger 4 — Page unload**
→ Closing tab, refresh, navigation away — `beforeunload` fires a save.

Result: **impossible to lose content.** Even if John force-quits his OnePlus browser mid-sentence, the last 800ms of typing is the worst-case loss.

### Restore logic

On mount, `useAutosave` calls `load()` which reads from localStorage. If a draft exists for today, it's pre-filled. If John's been gone for 3 days and comes back, he sees his last in-progress draft right where he left it.

### Separate drafts by date

Every day is its own localStorage record. Yesterday's draft doesn't overwrite today's. The `todayKey()` helper generates `YYYY-MM-DD` and every save/load goes through that. When midnight rolls over, John starts fresh automatically — but yesterday is still in `hubengine_day_2026-04-16` for reference.

---

## Integration into your existing Hub Engine v3 app

### Step 1 — File drop-in

Copy all files into your project's `src/` or `components/` folder (wherever your existing components live).

### Step 2 — Wire the main app router

Your existing tab navigation uses `display:none !important` / `display:flex !important`. Don't change that pattern. Just add the new tabs:

```jsx
import DailyDashboard from './DailyDashboard.jsx';
import LinkedInComposer from './LinkedInComposer.jsx';
import JobSearchTracker from './JobSearchTracker.jsx';
import VideoTroubleshooter from './VideoTroubleshooter.jsx';

// Add to tab nav
<button className="tab-btn" onClick={() => setActiveTab('dashboard')}>🏠 Today</button>
<button className="tab-btn" onClick={() => setActiveTab('linkedinComposer')}>✍️ Post</button>
<button className="tab-btn" onClick={() => setActiveTab('jobSearch')}>💼 Jobs</button>
<button className="tab-btn" onClick={() => setActiveTab('videoLog')}>🎬 Video</button>

// Add to tab content with same !important pattern
<div className="tab-content" style={{ display: activeTab === 'dashboard' ? 'flex' : 'none' }}>
  <DailyDashboard onNavigate={setActiveTab} />
</div>

<div className="tab-content" style={{ display: activeTab === 'linkedinComposer' ? 'flex' : 'none' }}>
  <LinkedInComposer
    perplexityKey={process.env.NEXT_PUBLIC_PERPLEXITY_API_KEY}
    groqKey={process.env.NEXT_PUBLIC_GROQ_API_KEY}
  />
</div>

<div className="tab-content" style={{ display: activeTab === 'jobSearch' ? 'flex' : 'none' }}>
  <JobSearchTracker />
</div>

<div className="tab-content" style={{ display: activeTab === 'videoLog' ? 'flex' : 'none' }}>
  <VideoTroubleshooter groqKey={process.env.NEXT_PUBLIC_GROQ_API_KEY} />
</div>
```

### Step 3 — Make "Today" the default tab

```jsx
const [activeTab, setActiveTab] = useState('dashboard');
```

So every time John opens the app, he lands on the daily checklist. No thinking required — Becky points to what's next.

### Step 4 — Environment variables (Vercel)

Already required: `NEXT_PUBLIC_GROQ_API_KEY`
New: `NEXT_PUBLIC_PERPLEXITY_API_KEY`

---

## How Becky "feels" like a daily assistant

Three touchpoints across the day:

**Morning greeting** on the Dashboard — warm, direct, points to next action.

**In-context help** inside the Composer — "Polish with Becky" button rewrites John's draft in studio voice without him leaving the page.

**Troubleshooting helper** in the Video Log — "Ask Becky what to check next" button reads the entire day's video log as context and gives practical next steps.

All three use the same system prompt (the one John specified: helpful, smart, warm, practical, confident, never robotic). Consistency across every interaction.

---

## What's intentionally NOT here

- **No automatic LinkedIn posting.** John manually copies and pastes. LinkedIn's API is restrictive and this keeps things simple.
- **No cloud sync yet.** All data is localStorage on whatever device John uses. If he wants his OnePlus data on his laptop, we add a Firebase/Supabase sync layer later.
- **No calendar integration.** Daily review is manual. Calendar sync is a Phase 2 idea.

---

## Quick tests before going live

1. Open Daily Dashboard — should greet John and show 0/7 progress
2. Add one job post — progress updates to 1/7 items
3. Open Composer — start typing → wait 1 sec → check DevTools → `localStorage.hubengine_day_2026-04-17` should contain the text
4. Refresh the page → type should still be there
5. Switch to Video tab, come back — still there
6. Add research via Perplexity input in Composer → citations appear
7. Click "Polish with Becky" → get a rewritten version
8. Mark post "Ready" → dashboard checklist shows that item done

---

## Adding future AI providers (Gemini, Claude, DeepSeek, etc.)

The daily workflow is provider-agnostic. When you activate a new secondary AI:

1. Flip its `status: 'planned'` to `'active'` in `providers.js`
2. Create `geminiService.js` etc. (~20 lines, copy Perplexity as template)
3. That AI auto-appears in the AI Dashboard
4. Add a "Polish with [AI]" button to Composer if useful (or just keep Becky as the final polisher — recommended)

---

## One real talk moment

This is a serious app now, John. You've gone from "build me a chat app" to "build me a daily workstation." That's a big jump and the data model needs to hold up. The schema in `dailyStore.js` is designed so every feature you add later — calendar, goals, metrics, Susan/Alisha/Paul/Lisa per-host analytics, cross-day trends — just extends the day record without breaking anything that exists.

If you decide you want cloud sync so the app works the same on your OnePlus and your laptop, that's a ~1 day job: wrap `saveDay` / `loadDay` with a Supabase or Firebase call and keep localStorage as the fast local cache. Say the word when you're ready.
