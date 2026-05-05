

function esc(s) {
  if (s === null || s === undefined) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
async function hashHex(s) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

// ═══ DATA (backtick strings — apostrophe-safe) ═══════════════════════

var podShow = 1;

var SHOWS = {
  1: { host: `Lisa`, guest: `Susan`, days: `Monday &amp; Wednesday`, hs: `Smooth, engaging, warm`, gs: `Professional, confident, expert` },
  2: { host: `Paul`, guest: `Alisha`, days: `Tuesday &amp; Thursday`, hs: `Trustworthy, grandfatherly, gravelly`, gs: `Charismatic, persuasive, energetic` }
};

// ═══════════════════════════════════════════════════════════════════════════
// BECKY IDENTITY INDEX — becky_identity_index.md (baked in, always loaded)
// This is the master system prompt sent on EVERY Becky call.
// Mirrors: /workflows/becky_identity_index.md in the GitHub repo.
// ═══════════════════════════════════════════════════════════════════════════

var BECKY_SYSTEM_PROMPT = `
# BECKY — AI CREATIVE DIRECTOR & STUDIO MEMORY
# AffiliateMediaHub Studio | Hub Engine v4 | John Lanter, CEO
# This prompt is your PERMANENT MEMORY. Load it fully every session. Never truncate.
# ═══════════════════════════════════════════════════════════════════════════

## WHO YOU ARE

You are Becky — AI Creative Director of AffiliateMediaHub Studio.
You are not a chatbot. You are a fully autonomous creative and operational agent.
You work directly for John Lanter, CEO and founder, based in Orange, Texas.
You greet John every session: "Hello John, how is your day going?"
You never break character. You never forget your role. You are always Becky.
Your voice: British. Confident. Warm. Professional. Efficient.
You speak like a trusted creative partner who also gets things done.

---

## JOHN LANTER — CEO FULL PROFILE (Your permanent memory of who you work for)

Name: John Lanter | Age: 59 | Location: Orange, Texas (Southeast Texas)
Studio: AffiliateMediaHub Studio | CEO & Founder
Faith-driven, authentic, blue-collar entrepreneur turned AI content creator.
Former Lead Production Operator — Lion Elastomers / Firestone Polymers (20+ years — plant closed December 2025).
Health: Heart attack December 4, 2016 — quadruple bypass. Car wreck at 18 — coma for a month and a half. Multiple physical injuries. Prefers office/indoor work — less physical on body.
Daily caregiving: Cares for his 87-year-old sister-in-law — lifts her, bathes her, takes her to dialysis. Wife helps too.
Emails: woodollars12@gmail.com (1st — bills/affiliate/personal) · woodollars13@gmail.com (2nd — Home Depot/orders/supplies) · newty.channel@gmail.com (3rd — affiliate/YouTube) · affiliatemediahub@gmail.com (4th — LEADER account, company identity)
App live at: project-cj1zx.vercel.app

Job Search (running parallel to studio work):
- Target roles: Operations Coordinator, Warehouse Supervisor, Logistics Coordinator
- Certifications: Forklift certified
- Skills: Conveyor systems, robotics, team supervision, log reporting, 9-state sales experience
- Preference: Office-based or indoor, less physically demanding
- Status: Actively applying in Southeast Texas

---

## THE STUDIO — FULL OPERATIONAL MEMORY

Hub Engine v4 — live at project-cj1zx.vercel.app
Stack: Groq (llama-3.3-70b-versatile) · ElevenLabs · FreeStack Video · Vercel (free)
Monthly cost: $5/mo — ElevenLabs only. Groq and Vercel are free.
Core team: John (CEO) · Becky (AI Creative Director) · Claude (Developer)
Tagline: Three Minds. One Mission. Zero Cost.

AUTO-PUBLISH PIPELINE (Phase 4 — Full Loop):
John types ONE idea → hits ONE button → Becky does the rest:
STEP 1: Groq writes full script, title, description, tags, TikTok caption
STEP 2: ElevenLabs generates voice MP3 (Becky British Female voice)
STEP 3: FreeStack Video assembles video (dark cinematic brand, captions, intro/outro)
STEP 4: YouTube uploads and posts automatically — John gets a live link
STEP 5: TikTok auto-post (pending API approval)

Platform costs:
ElevenLabs: $5/mo · Groq: Free · Vercel: Free · FreeStack Video: Free sandbox (watermark, 20 min/mo)

---

## THE CAST — OFFICIAL TALENT ROSTER

1. LISA — News Anchor Host
   Look: Black blazer, pearl necklace, city skyline backdrop, professional news desk
   Role: Smooth and engaging anchor — delivers with authority and warmth
   Teams: Lisa + Susan (Podcast Duo), Lisa solo (Affiliate Promos)
   Schedule: Friday + Saturday (affiliate promos)

2. SUSAN — Authority Expert
   Look: Navy blazer, white blouse, Hub Engine AI News backdrop, blonde bob
   Role: Confident expert — data-driven, trustworthy, authoritative
   Teams: Lisa + Susan (Podcast), Alisha + Susan (Business)
   Schedule: Monday

3. PAUL — Trusted Grandfather Figure
   Look: Denim overalls, blue t-shirt, grey beard, glasses, ON AIR studio
   Role: Gravelly warm voice — wise, relatable grandfather energy
   Teams: Paul + Alisha (Podcast Duo 2)
   Schedule: Thursday
   IMPORTANT: His name is PAUL only — never Paul

4. ALISHA — Charismatic & Relatable
   Look: Blue sleeveless top, glasses, hoop earrings, warm office setting
   Role: Persuasive and charismatic — represents the everyday person
   Teams: Paul + Alisha (Podcast 2), Alisha + Susan (Business)
   Schedule: Wednesday

5. BECKY HOST — British Creative Director
   Look: Gold/champagne silk blouse, warm smile, modern studio
   Role: Hosts affiliate promos — warm authentic British female presenter
   ElevenLabs Voice ID: exsUS4vynmxd379XN4yO (British Female)
   Teams: Becky Host + Becky Guest (Affiliate)

6. BECKY GUEST — Warm Authentic Friend
   Look: White blouse, brunette shoulder-length hair, bright natural office, plant in background
   Role: Reacts, validates — "I tried it and it worked" energy
   Teams: Becky Host + Becky Guest (Affiliate)

---

## FOUR PRODUCTION TEAMS

TEAM A — PODCAST DUO: Lisa (Host) + Susan (Guest)
Style: Flagship podcast — warm conversation, expert insight, natural dialogue

TEAM B — PODCAST DUO 2: Paul (Host) + Alisha (Guest)
Style: Grandfatherly warmth meets charismatic energy — relatable, trustworthy

TEAM C — BUSINESS TEAM: Alisha (Host) + Susan (Guest)
Style: Professional business explainer — clear problem, solution, 3 benefits, CTA

TEAM D — AFFILIATE TEAM: Becky Host + Becky Guest
Style: Authentic British duo — hook, story, product reveal, FTC disclosure, CTA
FTC REQUIRED: Every affiliate script must begin with "This video contains affiliate links."

---

## WEEKLY PRODUCTION SCHEDULE (Never override unless John says so)

Monday:    Susan leads — Lisa + Susan Podcast Duo
Wednesday: Alisha leads — Paul + Alisha Podcast Duo 2
Thursday:  Paul leads — Paul + Alisha Podcast Duo 2
Friday:    Lisa — Affiliate Promo (Becky or Lisa voiced)
Saturday:  Lisa — Affiliate Promo (Becky or Lisa voiced)

---

## YOUR SIX ENGINES — AUTO-ROUTING (John never needs to specify)

### ENGINE 1 — VIDEO FACTORY (Auto-Publish + Video Studio + Avatar Creator)
Triggers: Script, episode, promo, video, render, avatar, studio, template, scene.

HUB ENGINE v4 HAS THREE VIDEO SYSTEMS — Becky knows all three:

SYSTEM A — AUTO-PUBLISH PIPELINE (automated):
John types one idea → Becky writes script → ElevenLabs voices it → FreeStack Video renders → YouTube posts.
Teams: Lisa+Susan (Podcast Duo Mon/Wed) · Paul+Alisha (Podcast 2 Thu) · Alisha+Susan (Business) · Becky+Becky (Affiliate)
Video type dropdown: Podcast Duo / Podcast Duo 2 / Business Team / Affiliate Promo
Platform dropdown: All 4 Platforms / YouTube / TikTok / Instagram / Facebook / Generate Only
Status row: Groq · ElevenLabs · FreeStack Video · YouTube · TikTok · Instagram · Facebook
Entry point: Auto-Publish page → type idea → hit Launch button

SYSTEM B — VIDEO STUDIO (standalone test module — manual):
Step-by-step manual video builder. 1 to 5 minutes. No Auto-Publish connection yet.
Tab 1 — Template: Pick Promotional / Explainer / Showcase / Blank. Scenes auto-load.
Tab 2 — Script: Write manually or brief Becky to auto-write. Word count shown.
Tab 3 — Scenes: Each scene has name + duration in seconds. Progress bar tracks total.
Tab 4 — Render: One button → FreeStack Video renders → returns video URL. Takes 1–3 min.
Tab 5 — Save: Copy URL / Save to history / Duplicate project / Auto-Publish hook (inactive).
Duration rule: Minimum 60 seconds (1 min) · Maximum 300 seconds (5 min)
Entry point: Dashboard purple card OR sidebar → 🎬 Video Studio

SYSTEM C — AVATAR VIDEO CREATOR (shared modal — available from both systems):
A floating modal that overlays any page. Opens via 🎭 Avatar Creator button.
Tab 1 — Avatar: Pick cast member (Lisa/Susan/Paul/Alisha/Becky Host/Becky Guest/Custom) + visual style (Cinematic/Studio/Minimal)
Tab 2 — Script: Duration slider 30 sec–5 min · Write manually or brief Becky
Tab 3 — Settings: Video format (9:16/16:9/1:1) · Voice selection · Project title · CTA text · Save to shared library checkbox
Tab 4 — Generate: ElevenLabs voice → FreeStack Video render → live status steps
Tab 5 — Result: Video URL → Send to Video Studio (manual) OR Auto-Publish (automated) · Save to Shared Asset Library
Duration rule: 30 seconds minimum · 300 seconds (5 minutes) maximum — strictly enforced
Shared Asset Library: localStorage key 'hev4_av_library' — accessible from BOTH Video Studio and Auto-Publish
Auto-Publish hook: localStorage key 'hev4_av_inject_url' — ready but not activated yet

RENDER ENGINE — FREESTACK VIDEO (replaces Shotstack entirely):
FreeStack Video is John's own self-hosted render server. Built with Node.js + FFmpeg. Deployed on Render.com free tier.
- URL: https://freestack-video.onrender.com
- No API key needed — John owns this server
- No watermarks — videos are clean and professional
- No cost — $0/month forever
- No limits — unlimited renders
- GitHub repo: freestack-video
- Accepts JSON timeline of scenes → returns MP4 video URL
- Same scene format as before: type, duration, title, text, cta, background, lowerThird
- Storage: Cloudflare R2 (free, zero egress) for public video URLs
- Cold start: may take 30-60 seconds if idle — just retry
- Render time: 1-5 minutes depending on video length
- Resolution: 720p (free tier) — upgradeable to 1080p on paid Render plan


- Auto-Publish: 60–90 second scripts (ElevenLabs voice length)
- Video Studio: 1 minute minimum · 30 minutes maximum
- Avatar Creator: 30 seconds minimum · 30 minutes maximum

Always output the 4-block format for video requests:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCRIPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Full spoken script. Label every line HOST: or GUEST: for duo shows. Add [PAUSE] markers. Hook in first 3 seconds. Strong CTA at end. Stay within word count for chosen duration.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
POST PACKAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Title: [YouTube/TikTok optimized, under 70 chars]
Description: [150-200 words, SEO-rich, CTA included]
Hashtags: [20-30 relevant tags]
Pinned Comment: [Engagement hook]
Thumbnail Text: [Bold 5-7 word hook]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRODUCTION NOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
B-roll topics: [3-5 visual suggestions]
On-screen text: [Key stats or phrases to overlay]
Music mood: [Tempo and feel]
Pacing notes: [Cuts, energy shifts, emphasis]
CapCut guidance: [Specific suggestions]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PUBLISHING VERSIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YouTube Full: [Full title + description]
TikTok/Shorts: [15-30 sec hook script]
LinkedIn Post: [Professional framing, 150 words]
Twitter/X Thread: [3-5 tweet thread]

### ENGINE 2 — JOB-HUNTING AGENT
Triggers: Job search, resume, cover letter, application, follow-up.
Output: JOB TARGET → CUSTOM RESUME SUMMARY → COVER LETTER → FOLLOW-UP PLAN → EMPLOYMENT LOG ENTRY
Cover letters: faith-grounded tone, confident, ~250 words.
Follow-up plan: Day 1 apply · Day 3 LinkedIn connect · Day 7 first email · Day 14 check-in.

### ENGINE 3 — GMAIL ORGANIZER (UPDATED)
Triggers: Email, Gmail, inbox, organize, triage, email help, messages, mail.

═══════════════════════════════════════════════════
BECKY — GMAIL EMAIL ORGANIZER
AffiliateMediaHub Studio | John Lanter, CEO
═══════════════════════════════════════════════════

ACCOUNT HISTORY AND ORDER (never change this order):
1. woodollars12@gmail.com  — FIRST email John created
2. woodollars13@gmail.com  — SECOND email John created
3. newty.channel@gmail.com — THIRD email John created
4. affiliatemediahub@gmail.com — FOURTH and LAST email created — THE LEADER ACCOUNT

LEADER ACCOUNT:
affiliatemediahub@gmail.com is the PRIMARY company identity.
All summaries, business coordination, and leadership-level organization center on this account.
All reports are structured under this account first.

ACCOUNT ROLES:
- woodollars12@gmail.com   = Main bills · Affiliate marketing · Personal
- woodollars13@gmail.com   = Home Depot · Bills · Orders · Supplies · Affiliate marketing · Extra
- newty.channel@gmail.com  = Affiliate marketing emails · YouTube channel
- affiliatemediahub@gmail.com = Company leader · Business hub · Main company identity · Primary contact

EMAIL CATEGORIES (sort by topic, not just by account):
- Company / Business       — AffiliateMediaHub operations, contracts, partnerships
- Affiliate Marketing      — Affiliate programs, commissions, promo emails (woodollars12 + newty.channel)
- Bills / Utilities        — Electric, water, phone, internet, car payments
- Orders / Supplies        — Home Depot, Amazon, product orders (woodollars13)
- Personal / Important     — Family, health, personal matters
- Job Applications         — Resumes sent, job boards, applications
- Recruiter Messages       — Recruiters, headhunters, LinkedIn outreach
- Interview / Follow-up    — Interview invites, follow-up emails
- AI Courses / Training    — AI tools, training programs, courses
- Software Promotions      — App promos, SaaS offers, product launches
- Invoices / Billing       — Unexpected charges, subscriptions, renewals
- Spam / Low Priority      — Newsletters, mass promos, repeat senders

PRIORITY RULES:
🔴 URGENT   — Job interviews · Unexpected billing charges · Legal or financial matters · Time-sensitive business
🟡 IMPORTANT — Bills due soon · Affiliate commissions · Job applications · Business partnerships
🟢 LOW       — Newsletters · Promo emails · Low-priority updates

ACTION OPTIONS:
Reply | Draft Reply | Archive | Star | Snooze | Flag | Leave Unchanged | Suggest Filter

ORGANIZATION RULES:
1. Read all 4 inboxes every session.
2. Sort emails by TOPIC first, then by account.
3. Affiliate emails appear in woodollars12 AND newty.channel — handle both.
4. Bills and orders from woodollars13 get their own clear section.
5. affiliatemediahub@gmail.com is always the reporting leader — summarize there first.
6. Show which account every email belongs to — always.
7. Draft replies for anything needing a response — faith-friendly, professional, confident tone.
8. Suggest Gmail labels and filters to automate future sorting.
9. Never ignore job, interview, unexpected billing, or company business emails.
10. Keep inboxes clean — archive, star, or snooze everything that doesn't need immediate action.
11. Never reprocess an email already handled in the same session.
12. Repetitive promo senders → suggest an auto-label filter to handle them automatically going forward.

STANDARD GMAIL LABELS TO SUGGEST:
Company | Affiliate | Bills | Orders-Supplies | Personal | Job-Applications | Recruiters | Interviews | Follow-Up | AI-Training | Review-Later | Spam | Invoices | Studio

OUTPUT FORMAT — use this exact format every time, no exceptions:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GMAIL SESSION REPORT
Leader Account: affiliatemediahub@gmail.com
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

URGENT ITEMS FIRST:
[List any 🔴 Urgent items across all 4 accounts before anything else]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EMAIL ENTRY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Account:       [which of the 4 Gmail accounts]
Source Email:  [sender name and full email address]
Subject:       [email subject line]
Date:          [date received]
Category:      [category from list above]
Priority:      [🔴 Urgent / 🟡 Important / 🟢 Low]
Action:        [Reply / Draft Reply / Archive / Star / Snooze / Flag / Filter]
Draft Reply:   [Ready-to-send reply if needed]
Notes:         [Any important context, flags, or follow-up needed]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LABEL / FILTER SUGGESTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Label:       [suggested label name]
Filter rule: [e.g. From: sender@domain.com → Apply label Bills, Skip Inbox]
Action:      [Archive / Star / Move to label / Snooze]

GOAL: Becky functions as the full Gmail Email Organizer for AffiliateMediaHub Studio.
affiliatemediahub@gmail.com is the leader. All 3 other accounts report under it.
Every inbox stays clean, organized, and ready for fast review at all times.

### ENGINE 4 — BLOG & SOCIAL CONTENT
Triggers: LinkedIn posts, blog, article, SEO writing, captions.
Output: BLOG/ARTICLE → LINKEDIN POST → SOCIAL CAPTIONS (TikTok/YouTube Shorts/Twitter/Pinned Comment)
Always keep John's authentic blue-collar voice. Never corporate or generic.

### ENGINE 5 — AFFILIATE MARKETING
Triggers: Affiliate products, promos, funnels, CTA copy.
Output: PRODUCT BRIEF → PROMO VIDEO SCRIPT (30-60 sec) → COPY PACK (email subjects/social/headlines)
FTC disclosure required on every affiliate piece — non-negotiable.

### ENGINE 6 — STUDIO OPERATIONS & MEMORY
Triggers: Planning, scheduling, organizing, status check, project log, app help, how does, what is, explain.

This engine keeps the Studio running AND helps John understand how the app works.

COMPLETE HUB ENGINE v4 APP MAP (current):

SIDEBAR — STUDIO:
🏠 Dashboard — shortcuts to all 3 workflows + schedule cards + stats
🚀 Auto-Publish — full automated pipeline (Groq→ElevenLabs→FreeStack Video→YouTube/TikTok/Instagram/Facebook)
🎬 Video Studio — standalone manual video builder (1–5 min, 4 templates, Becky writes scripts, FreeStack Video renders)
🤖 Becky AI — full chat with all 6 engines + Gmail quick chips + video quick chips
🔍 AI Job Finder — resume, cover letter, job search, follow-up tracking
✍ Daily Blog — write post, Becky polishes, copy + open LinkedIn

SIDEBAR — TOOLS:
📅 Content Calendar
💡 Prompt Library
📁 Files & Resources — includes AI Tools Grid, AI Chat, Research AI, Coding AI, Media Creation AI

SIDEBAR — SYSTEM:
⚙ Settings — ElevenLabs key, FreeStack Video key, YouTube OAuth, TikTok, Instagram, Facebook, Groq key

FLOATING MODAL (available everywhere):
🎭 Avatar Creator — shared modal, accessed from both Video Studio and Auto-Publish

PLATFORM API STATUS:
✅ Groq — Free (llama-3.3-70b-versatile)
✅ ElevenLabs — $5/mo (Becky British Female voice ID: exsUS4vynmxd379XN4yO)
✅ FreeStack Video — Free sandbox (stage environment, watermark, 20 min/mo)
✅ YouTube — Connected via OAuth (newty.channel@gmail.com → AI PodCast Channel)
⏳ TikTok — Wired, awaiting API approval (developers.tiktok.com)
⏳ Instagram — Wired, needs Meta Developer App (developers.facebook.com)
⏳ Facebook — Wired, needs Meta Developer App (same app as Instagram)
✅ Render Backend — Live at hubengine-backend.onrender.com (handles YouTube OAuth)
✅ App Hosting — Vercel free (project-cj1zx.vercel.app · password: [REDACTED])

SHARED ASSET LIBRARY:
localStorage key 'hev4_av_library' — avatar projects saved here, accessible from both Video Studio and Auto-Publish.
Auto-Publish inject hook: localStorage key 'hev4_av_inject_url' — ready but not yet activated.

CHECKBOOK APP (separate standalone):
URL: thehubengine-v3.github.io/John-CheckBook · Password: [REDACTED]
Accounts: 🏦 Checking · 💰 Savings · 💳 Credit Card · 🚗 Auto Loans (Chevy Colorado + Kia Seltos)
Kia Seltos: Balance $25,647.49 · Payment $596.95 · Lender: Kia Finance America

GMAIL ACCOUNTS (4-account hierarchy):
1. woodollars12@gmail.com — bills/affiliate/personal
2. woodollars13@gmail.com — Home Depot/orders/supplies
3. newty.channel@gmail.com — affiliate/YouTube
4. affiliatemediahub@gmail.com — LEADER account, company identity

MONTHLY COSTS:
ElevenLabs: $5/mo · Everything else: $0

Output format for studio operations:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STUDIO STATUS SNAPSHOT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Active Project: [Name | Status | Next Step]
This Week's Videos: [Mon/Wed/Thu/Fri/Sat schedule]
Pending Items: [List]
Cost Notes: [Any flags]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRIORITY ACTION LIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. [Most urgent task]
2. [Second priority]
3. [Third priority]

---

## CORE RULES — NEVER BREAK

1. Greet John: "Hello John, how is your day going?" — every session, every time.
2. Stay in role always. You are Becky. Never "just an AI."
3. Always use the 4-block format for all video requests.
4. Never strip features when editing John's work.
5. This prompt IS your permanent memory. Never lose it.
6. Faith-friendly always — clean, positive, professional. No crude humor or dark themes.
7. Auto-route to the correct engine. John never specifies which one.
8. One clarifying question max if truly needed. Then act.
9. Every output is publish-ready. Zero cleanup required by John.
10. You are the brain. Hub Engine, ElevenLabs, FreeStack Video, YouTube are the hands.
11. Paul's name is PAUL only — never Paul. Ever.
12. Never suggest Abacus.AI or paid platforms unless John specifically asks.
13. FTC disclosure on every piece of affiliate content — non-negotiable.
14. Short crisp answers over long rambling ones — always.

---

## STUDIO IDENTITY

Studio: AffiliateMediaHub Studio
CEO: John Lanter | Orange, Texas
Tagline: Three Minds. One Mission. Zero Cost.
Team: John (CEO) · Becky (AI Creative Director) · Claude (Developer)
Hub Engine v4: project-cj1zx.vercel.app
Groq model: llama-3.3-70b-versatile
Groq key sanitize: replace(/[^\x20-\x7E]/g, '')
ElevenLabs Becky Voice ID: exsUS4vynmxd379XN4yO (British Female)
`.trim();


// ═══════════════════════════════════════════════════════════════════════════
// BECKY CONVERSATION HISTORY — Rolling 4-message window
// Mirrors pseudo-code: getLast4MessagesFromUI()
// fullPrompt = BECKY_SYSTEM_PROMPT + last 4 messages
// ═══════════════════════════════════════════════════════════════════════════

var BECKY_HISTORY = []; // { role: 'user'|'assistant', content: string }

function bRefreshBadge() {
  var badge = document.getElementById(`b-hist-badge`);
  if (!badge) return;
  var count = Math.min(BECKY_HISTORY.length, 4);
  badge.textContent = `💬 CTX ${esc(count)}/4`;
  badge.style.background = count >= 4 ? `rgba(0,212,170,.25)` : `rgba(0,212,170,.12)`;
}

function bHistoryPush(role, content) {
  BECKY_HISTORY.push({ role, content });
  if (BECKY_HISTORY.length > 8) BECKY_HISTORY = BECKY_HISTORY.slice(-8);
  bRefreshBadge();
}

function bHistoryClear() {
  BECKY_HISTORY = [];
  bRefreshBadge();
}

var PROMPTS = [
  { cat: `🎙 Podcast Scripts`, col: `#a78bfa`, items: [
    { t: `Episode Hook Pack`, p: `Write 5 powerful podcast hooks for an episode about [TOPIC]. Each hook under 15 seconds when spoken. Conversational and curiosity-driven.` },
    { t: `Full Episode Script`, p: `Write a complete podcast script for [EPISODE TITLE] with host and guest. Include intro, 3 main segments, transitions, and outro with CTA. Conversational and educational. 10-12 minutes.` },
    { t: `Show Notes`, p: `Write detailed show notes for a podcast episode titled [TITLE]. Include episode summary, 5 key takeaways, timestamps, and 3 resource links. Format as a blog post.` },
    { t: `Social Captions`, p: `Write social media captions for a podcast episode about [TOPIC]. One each for TikTok, Instagram Reels, Twitter X, Facebook, and LinkedIn. Include relevant hashtags.` }
  ]},
  { cat: `💰 Affiliate Marketing`, col: `#f5c518`, items: [
    { t: `30-Second Promo Script`, p: `Write a 30-second affiliate promo script for [PRODUCT NAME]. Hook, 1 key benefit, soft CTA, FTC disclosure. No hard selling. Conversational tone.` },
    { t: `Becky Dialogue`, p: `Write a 60-second dialogue between Becky Host and Becky Guest promoting [PRODUCT]. Natural conversation about benefits. FTC disclosure at the start. Sound authentic, not scripted.` },
    { t: `YouTube Description`, p: `Write a YouTube video description for an affiliate promo about [PRODUCT]. Include hook summary, what viewers learn, affiliate link placeholder, FTC disclosure, and 10 hashtags.` },
    { t: `Email Sequence`, p: `Write a 3-email affiliate marketing sequence for [PRODUCT]. Email 1: Story intro. Email 2: Benefits and social proof. Email 3: Soft CTA. Each 150-200 words. Non-pushy tone.` }
  ]},
  { cat: `💼 Employment and Job Search`, col: `#4f8ef7`, items: [
    { t: `Cover Letter`, p: `Write a professional cover letter for an Operations Coordinator position. Highlight 20+ years at Lion Elastomers, forklift certification, team supervision, conveyor systems, log reporting. Location: Southeast Texas.` },
    { t: `Interview Answers`, p: `Give me strong answers to these interview questions for a Warehouse Supervisor role: 1) Tell me about yourself 2) Greatest strength 3) Describe solving a workplace problem 4) Why are you leaving your previous job.` },
    { t: `LinkedIn Summary`, p: `Write a LinkedIn About section for John Lanter, former Lead Production Operator in Southeast Texas. 20+ years at Lion Elastomers. Seeking Operations Coordinator or Logistics roles. Also building AffiliateMediaHub Studio. 200 words max.` },
    { t: `Follow-Up Email`, p: `Write a professional follow-up email to send 2 weeks after applying for a Logistics Coordinator position with no response. Polite, brief, shows continued interest. Sign off as John Lanter, Orange TX.` }
  ]},
  { cat: `🎬 Video and Business`, col: `#34d399`, items: [
    { t: `Video Script Short`, p: `Write a 60-second talking-head video script about [TOPIC] for YouTube Shorts or TikTok. Hook in first 3 seconds. One clear message. Soft CTA at end. No jargon. Conversational delivery.` },
    { t: `Business Show Segment`, p: `Write a 5-minute business podcast segment for Susan (host) and Alisha (guest) discussing [BUSINESS TOPIC]. Opening question, 3 talking points with dialogue, and a closing insight. Professional but approachable.` },
    { t: `Channel Intro Script`, p: `Write a 30-second channel intro for AffiliateMediaHub Studio. Introduce the mission: helping everyday people build income online using AI tools. Mention the three AI personas. Energetic and welcoming.` },
    { t: `Content Strategy`, p: `Give me a 4-week content strategy for an affiliate marketing YouTube channel focused on AI tools for beginners. Weekly themes, video titles, posting schedule, and one affiliate product per week.` }
  ]}
];

var SKILLS = [
  { title: `🎙 Podcast Episode Production`, col: `#a78bfa`, steps: [
    `Choose show — Show 1: Lisa and Susan or Show 2: Paul and Alisha`,
    `Enter episode topic and title in Podcast Studio`,
    `Click Write All 4 Sections — Becky writes hooks, script, notes, captions`,
    `Copy script and paste into Browser TTS to generate AI voices`,
    `Upload audio to Vmake, select avatar, and render video`,
    `Download video, add captions, post to YouTube, TikTok, and Instagram`,
    `Use show notes as YouTube description and blog post`
  ]},
  { title: `💰 Affiliate Promo Workflow`, col: `#f5c518`, steps: [
    `Choose product to promote from Affiliate Programs list`,
    `Open Affiliate Team Studio and enter product name`,
    `Generate all 4 sections: hooks, 30-sec script, Becky dialogue, caption`,
    `Add FTC disclosure at beginning — required — use the template`,
    `Copy dialogue and generate voices in Browser TTS for Becky Host and Guest`,
    `Build video in Vmake with AI avatars`,
    `Post with caption to TikTok, Instagram Reels, YouTube Shorts`
  ]},
  { title: `💼 Job Application Workflow`, col: `#4f8ef7`, steps: [
    `Open Employment page and review active application status`,
    `Find new job on Indeed, LinkedIn, or ZipRecruiter`,
    `Ask Becky to write a tailored cover letter for the specific role`,
    `Copy cover letter and apply directly on employer site`,
    `Log the application in the tracker and update status`,
    `After 2 weeks with no response — ask Becky to write a follow-up email`,
    `Prep for interviews using Becky interview answer templates`
  ]},
  { title: `🎬 Video Production Pipeline`, col: `#34d399`, steps: [
    `Write script using Podcast, Business, or Affiliate Studio`,
    `Generate Browser TTS voice audio for the persona`,
    `Log in to Vmake.ai and start a new project`,
    `Upload audio file and select matching AI avatar`,
    `Generate video — 20 to 35 credits per video`,
    `Edit: add intro, outro, captions, background music in Vmake`,
    `Export and distribute: YouTube, TikTok, Instagram, Facebook`
  ]},
  { title: `🤖 Becky AI Daily Workflow`, col: `#00d4aa`, steps: [
    `Start each session by greeting Becky and telling her what you are building`,
    `Use Quick Prompts for common tasks: hooks, scripts, cover letters`,
    `For custom needs: be specific — topic, tone, length, and platform`,
    `Copy outputs from Becky to use in Browser TTS or social posts`,
    `Use the + button to add extra context if Becky needs more information`,
    `If Becky gives a generic answer: add more detail and ask again`,
    `Clear chat between major tasks to keep Becky focused`
  ]}
];

var TRAINING = [
  { phase: `Phase 1 — Claude Co-Work Foundations`, col: `#f5c518`, days: [
    `Set up Hub Engine v4 — password, Groq key, all tabs working`,
    `Learn to use Becky — 5 effective prompting techniques`,
    `Write your first complete podcast episode using Podcast Studio`,
    `Publish your first video to YouTube using the production workflow`,
    `Set up LinkedIn profile with AI-written summary and banner`,
    `Apply for 3 jobs using Becky cover letters`,
    `Write your first affiliate promo using Affiliate Team Studio`,
    `Build a 7-day content calendar using the Calendar page`,
    `Practice Becky chat — write 10 different types of content`,
    `Review all settings, check Groq API usage, plan Week 2`
  ]},
  { phase: `Phase 2 — AI Internet Skills`, col: `#4f8ef7`, days: [
    `Study affiliate marketing basics — Commission Junction walkthrough`,
    `Sign up for ClickBank and find your first product to promote`,
    `Write and post your first ClickBank affiliate video`,
    `Learn YouTube SEO — titles, thumbnails, descriptions`,
    `Set up TikTok and post your first short-form video`,
    `Study the Prompt Library — master all 16 prompts`,
    `Build a lead magnet concept using Becky`,
    `Study email marketing basics — how affiliate sequences work`,
    `Create a content strategy for the next 30 days`,
    `Review analytics on YouTube and TikTok and adjust strategy`
  ]},
  { phase: `Phase 3 — AI Video Operator Playbook`, col: `#34d399`, days: [
    `Advanced Vmake techniques — avatars, music, captions`,
    `Create a branded intro and outro template for all shows`,
    `Batch produce 3 videos in one session`,
    `Set up a posting schedule and automate with Buffer or Later`,
    `Study Browser TTS voice cloning and optimize persona voices`,
    `Build a full Show 1 production from script to posted video`,
    `Build a full Show 3 business episode end to end`,
    `Build a full affiliate promo video end to end`,
    `Analyze all content performance and identify top performer`,
    `Plan Month 2 strategy — scale what works, cut what does not`
  ]}
];



// ═══════════════════════════════════════════════════════════════════════════
// MODULAR AI AVATAR VIDEO CREATOR — Shared JavaScript Engine
// Available in: Auto-Publish Pipeline + Video Studio
// Duration rule: 30 seconds min · 300 seconds (5 min) max
// Shared asset library: localStorage key 'hev4_av_library'
// ═══════════════════════════════════════════════════════════════════════════

var avSource        = null;   // 'autopublish' or 'videostudio'
var avSelectedCast  = null;
var avSelectedStyle = 'cinematic';
var avResultUrl     = null;
var avLibrary       = JSON.parse(localStorage.getItem('hev4_av_library') || '[]');

// ── Open / Close ──────────────────────────────────────────────────────────
function avOpen(source) {
  avSource = source;
  var modal = document.getElementById('av-modal');
  var label = document.getElementById('av-source-label');
  if (modal) modal.style.display = 'block';
  if (label) label.textContent = 'Launched from: ' + (source === 'autopublish' ? '🎬 Video Studio' : '🎬 Video Studio');
  avTab('avatar');
  avRenderLibrary();
  document.body.style.overflow = 'hidden';
}

function avClose() {
  var modal = document.getElementById('av-modal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

// ── Tab switcher ──────────────────────────────────────────────────────────
function avTab(id) {
  ['avatar','script','settings','generate','result'].forEach(t => {
    var panel = document.getElementById('av-' + t);
    var tab   = document.getElementById('avtab-' + t);
    if (panel) panel.style.display = (t === id) ? 'block' : 'none';
    if (tab) {
      tab.style.color = (t === id) ? '#a78bfa' : 'var(--muted)';
      tab.style.borderBottomColor = (t === id) ? '#a78bfa' : 'transparent';
    }
  });
  if (id === 'generate') avBuildSummary();
  if (id === 'result')   avRenderLibrary();
}

// ── Cast selection ────────────────────────────────────────────────────────
function avSelectCast(id, name, desc) {
  avSelectedCast = { id, name, desc };
  document.querySelectorAll('.av-cast-btn').forEach(el => {
    el.style.borderColor = 'var(--border)';
    el.style.background  = 'var(--bg3)';
  });
  var btn = document.getElementById('avcast-' + id);
  if (btn) { btn.style.borderColor = '#a78bfa'; btn.style.background = 'rgba(167,139,250,.15)'; }
  var sel = document.getElementById('av-selected-cast');
  if (sel) { sel.style.display = 'block'; sel.textContent = '✅ ' + name + ' — ' + desc; }
  var cw = document.getElementById('av-custom-desc-wrap');
  if (cw) cw.style.display = (id === 'custom') ? 'block' : 'none';
}

// ── Style selection ───────────────────────────────────────────────────────
function avSetStyle(style) {
  avSelectedStyle = style;
  document.querySelectorAll('.av-style-btn').forEach(el => {
    el.style.background   = 'var(--bg3)';
    el.style.borderColor  = 'var(--border)';
    el.style.color        = 'var(--muted)';
    el.className          = 'av-style-btn';
  });
  var btn = document.getElementById('avstyle-' + style);
  if (btn) { btn.style.background='rgba(167,139,250,.15)'; btn.style.borderColor='#a78bfa'; btn.style.color='#a78bfa'; }
}

// ── Duration slider ───────────────────────────────────────────────────────
function avUpdateDur() {
  var val   = parseInt(document.getElementById('av-duration')?.value) || 60;
  // Enforce 30s min, 300s max
  val = Math.max(30, Math.min(1800, val));
  var mins  = Math.floor(val/60), secs = val % 60;
  var disp  = val < 60 ? val + ' sec' : (secs ? mins+'m '+secs+'s' : mins+' min');
  var words = Math.round(val * 2.5); // ~150 wpm
  var el    = document.getElementById('av-dur-display');
  var wt    = document.getElementById('av-dur-words');
  if (el) el.textContent = disp;
  if (wt) wt.textContent = `Target: ~${esc(words)} words of script`;
  // Update word count guidance
  avCheckWordCount();
}

function avCheckWordCount() {
  var script = (document.getElementById('av-script-txt')?.value || '').trim();
  var words  = script ? script.split(/\s+/).filter(Boolean).length : 0;
  var dur    = parseInt(document.getElementById('av-duration')?.value) || 60;
  var target = Math.round(dur * 2.5);
  var wc     = document.getElementById('av-word-count');
  var wt     = document.getElementById('av-word-target');
  if (wc) { wc.textContent = words + ' words'; wc.style.color = words >= target*0.8 ? 'var(--green)' : 'var(--muted)'; }
  if (wt) wt.textContent = 'Target: ~' + target + ' words for ' + Math.floor(dur/60) + 'm ' + (dur%60?dur%60+'s':'');
}

// ── Becky script writer ───────────────────────────────────────────────────
async function avBeckyWrite() {
  var topic   = (document.getElementById('av-topic')?.value || '').trim();
  if (!topic) { setSt('av-script-st','err','Tell Becky what this video is about first.'); return; }
  setSt('av-script-st','i','Becky is writing your script...');

  var dur      = parseInt(document.getElementById('av-duration')?.value) || 60;
  var vidType  = document.getElementById('av-video-type')?.value || 'promo';
  var cast     = avSelectedCast ? avSelectedCast.name : 'Becky';
  var words    = Math.round(dur * 2.5); // ~150 wpm
  var mins     = Math.floor(dur / 60);

  // Type-specific instructions
  var typeInstructions = {
    children:    'Write a complete CHILDREN\'S STORY with a beginning, middle, and end. Use simple language a 5-8 year old can understand. Include character names, descriptions, a problem, and a resolution with a lesson. Add scene descriptions in [brackets] for narration.',
    educational: 'Write a complete EDUCATIONAL SCRIPT with clear sections: Introduction → Main Concepts (explained simply) → Examples → Summary → Call to Action. Use numbered steps where helpful.',
    business:    'Write a BUSINESS EXPLAINER with: Hook → Problem → Solution → How It Works → Benefits → Social Proof → CTA. Professional, confident tone.',
    storytelling:'Write a complete STORY with characters, conflict, rising action, climax, and resolution. Engaging narration style throughout.',
    training:    'Write a TRAINING / HOW-TO script with: Overview → Prerequisites → Step-by-step instructions (numbered) → Common mistakes → Summary → Next steps.',
    documentary: 'Write a DOCUMENTARY STYLE script with narration, scene descriptions in [brackets], and interview-style segments. Authoritative, engaging tone.',
    short:       'Write a HIGH-IMPACT SHORT CLIP with a strong hook in the first 5 words, core message, and CTA. Every word counts.',
    promo:       'Write a PROMOTIONAL SCRIPT with a hook, problem, solution, benefits, and strong CTA. Conversational and persuasive.'
  };

  var instruction = typeInstructions[vidType] || typeInstructions.promo;

  var prompt = `${esc(instruction)}

Presenter: ${esc(cast)}
Topic: ${esc(topic)}
Target length: ${esc(mins)} minutes (~${esc(words)} words at 150 words per minute)

${dur > 300 ? 'This is a LONG-FORM video. Write a COMPLETE, DETAILED script that fills the full ' + mins + ' minutes. Include scene transitions, pauses [PAUSE], emphasis [EMPHASIS], and detailed content for every section.' : ''}

Return ONLY the spoken script — no labels like "Here is your script". Start immediately with the content.
Use [PAUSE] for natural breaks. Use [SCENE: description] for visual cues.
End with a clear, strong call to action.`;

  try {
    var result = await groqCall(prompt, BECKY_SYSTEM_PROMPT);
    var el = document.getElementById('av-script-txt');
    if (el) { el.value = result; avCheckWordCount(); }
    setSt('av-script-st','ok','✅ Script ready! ' + result.split(/\s+/).filter(Boolean).length + ' words — review and edit, then tap Next.');
  } catch(err) {
    setSt('av-script-st','err','Error: ' + err.message);
  }
}

// ── Summary builder ───────────────────────────────────────────────────────
function avBuildSummary() {
  var el    = document.getElementById('av-summary-card');
  if (!el) return;
  var cast  = avSelectedCast ? avSelectedCast.name : '— not selected';
  var dur   = parseInt(document.getElementById('av-duration')?.value) || 60;
  var title = document.getElementById('av-proj-title')?.value || '— not set';
  var fmt   = document.getElementById('av-format')?.value    || '9:16';
  var voice = document.getElementById('av-voice-sel')?.value || 'becky';
  var script= (document.getElementById('av-script-txt')?.value || '').trim();
  var words = script ? script.split(/\s+/).filter(Boolean).length : 0;
  var mins  = Math.floor(dur/60), secs = dur%60;
  var durStr= secs ? mins+'m '+secs+'s' : mins+' min';
  var ready = avSelectedCast && script.length > 20;

  el.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
      <div style="background:var(--bg3);border-radius:6px;padding:8px"><div style="font-size:10px;color:var(--muted);font-weight:700;margin-bottom:3px">AVATAR</div><div style="font-weight:700;font-size:12px">${esc(cast)}</div></div>
      <div style="background:var(--bg3);border-radius:6px;padding:8px"><div style="font-size:10px;color:var(--muted);font-weight:700;margin-bottom:3px">DURATION</div><div style="font-weight:700;font-size:12px;color:${dur>=30&&dur<=300?'var(--green)':'var(--red)'}">${esc(durStr)} ${dur>=30&&dur<=300?'✅':'⚠️'}</div></div>
      <div style="background:var(--bg3);border-radius:6px;padding:8px"><div style="font-size:10px;color:var(--muted);font-weight:700;margin-bottom:3px">FORMAT</div><div style="font-weight:700;font-size:12px">${esc(fmt)}</div></div>
      <div style="background:var(--bg3);border-radius:6px;padding:8px"><div style="font-size:10px;color:var(--muted);font-weight:700;margin-bottom:3px">SCRIPT</div><div style="font-weight:700;font-size:12px;color:${words>20?'var(--green)':'var(--red)'}">${esc(words)} words ${words>20?'✅':'⚠️'}</div></div>
      <div style="background:var(--bg3);border-radius:6px;padding:8px;grid-column:1/-1"><div style="font-size:10px;color:var(--muted);font-weight:700;margin-bottom:3px">PROJECT TITLE</div><div style="font-size:12px">${esc(title)}</div></div>
    </div>
    <div style="padding:8px 10px;border-radius:6px;background:${ready?'rgba(52,211,153,.1)':'rgba(248,113,113,.1)'};border:1px solid ${ready?'var(--green)':'var(--red)'};font-size:12px;font-weight:700;color:${ready?'var(--green)':'var(--red)'}">
      ${ready?'✅ Ready to generate!':'⚠️ Select an avatar and write a script before generating.'}
    </div>`;
}

// ── Generate avatar video ─────────────────────────────────────────────────
async function avGenerate() {
  if (!avSelectedCast) { setSt('av-gen-st','err','Select an avatar first.'); return; }
  var script = (document.getElementById('av-script-txt')?.value || '').trim();
  if (!script) { setSt('av-gen-st','err','Write a script first.'); return; }
  var dur = parseInt(document.getElementById('av-duration')?.value) || 60;
  if (dur < 30)   { setSt('av-gen-st','err','Minimum duration is 30 seconds.'); return; }
  if (dur > 1800) { setSt('av-gen-st','err','Maximum duration is 30 minutes (1800 seconds).'); return; }

  var elKey  = apGetKey('el_key');
  var ssKey  = apGetKey('ss_key');
  if (!elKey) { setSt('av-gen-st','err','ElevenLabs API key missing — go to Settings.'); return; }

  document.getElementById('av-gen-btn').disabled = true;
  document.getElementById('av-gen-btn').textContent = '⏳ Generating...';
  document.getElementById('av-status-wrap').style.display = 'flex';
  setSt('av-gen-st','i','Building avatar video...');

  var title   = document.getElementById('av-proj-title')?.value || (avSelectedCast.name + ' Video');
  var cta     = document.getElementById('av-cta-text')?.value || '';
  var fmt     = document.getElementById('av-format')?.value || '9:16';
  var voiceId = apGetKey('el_voice') || 'exsUS4vynmxd379XN4yO';
  var cast    = avSelectedCast;

  try {
    // STEP 1 — Script
    avStep(1,'running','Processing script...');
    var cleanScript = script.replace(/\[.*?\]/g,'').replace(/\(.*?\)/g,'').trim();
    avStep(1,'done','Script ready — ' + cleanScript.split(/\s+/).filter(Boolean).length + ' words');

    // STEP 2 — ElevenLabs voice
    avStep(2,'running','Generating voice with ElevenLabs...');
    var voiceRes = await fetch('https://api.elevenlabs.io/v1/text-to-speech/' + voiceId, {
      method:'POST',
      headers:{'xi-api-key':elKey,'Content-Type':'application/json','Accept':'audio/mpeg'},
      body: JSON.stringify({ text:cleanScript, model_id:'eleven_monolingual_v1', voice_settings:{stability:.5,similarity_boost:.8} })
    });
    if (!voiceRes.ok) { var e=await voiceRes.text(); throw new Error('ElevenLabs: '+e.substring(0,100)); }
    avStep(2,'done','Voice generated ✅');

    // STEP 3 — Build FreeStack timeline and render
    avStep(3,'running','Sending to FreeStack Video...');

    // Build scenes array for FreeStack
    var sceneCount = Math.max(3, Math.round(dur / 20));
    var sceneDur   = Math.floor(dur / sceneCount);
    var scenes = [];

    // Opening title card
    scenes.push({ type:'title-card', duration: Math.min(5, sceneDur), title: title, subtitle: cast.name + ' · ' + cast.desc.split('·')[0].trim(), background: '#0c0f1a' });

    // Content scenes
    var words = cleanScript.split(/\s+/);
    var wordsPerScene = Math.ceil(words.length / Math.max(1, sceneCount - 2));
    for (var i = 0; i < sceneCount - 2; i++) {
      var chunk = words.slice(i * wordsPerScene, (i+1) * wordsPerScene).join(' ');
      scenes.push({ type: i === 0 ? 'lower-third' : 'text', duration: sceneDur, name: cast.name, role: cast.desc.split('·')[0].trim(), text: chunk.substring(0, 120), background: '#0d1520' });
    }

    // CTA scene
    if (cta) scenes.push({ type:'cta', duration: Math.min(6, sceneDur), cta: cta, background: '#0a1a14' });
    else     scenes.push({ type:'title-card', duration: Math.min(4, sceneDur), title: 'AffiliateMediaHub Studio', subtitle: 'affiliatemediahub@gmail.com', background: '#0c0f1a' });

    var fsPayload = {
      timeline: { background: '#0c0f1a', scenes },
      output:   { format:'mp4', resolution: fmt === '9:16' ? '9:16' : '720p', fps:30 }
    };

    var sr = await fetch(HE_CONFIG.EDIT_URL + '/render', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(fsPayload)
    });
    if (!sr.ok) { var e2=await sr.text(); throw new Error('FreeStack ' + sr.status + ': ' + e2.substring(0,150)); }
    var sd = await sr.json();
    var rid = sd.id || sd.response?.id;
    if (!rid) throw new Error('No job ID from FreeStack. Response: ' + JSON.stringify(sd).substring(0,100));
    avStep(3,'running','FreeStack job: ' + rid.substring(0,16) + ' — polling...');

    // Poll for completion
    for (var p=0; p<36; p++) {
      await new Promise(r=>setTimeout(r,10000));
      var pr  = await fetch(HE_CONFIG.EDIT_URL + '/render/' + rid);
      var pd  = await pr.json();
      var st  = pd.status;
      var url = pd.url;
      avStep(3,'running','Status: ' + st + ' · Progress: ' + (pd.progress||0) + '% (' + (p+1) + '/36)');
      if (st === 'done' && url) {
        avStep(3,'done','Video rendered!');
        avStep(4,'done','Avatar video complete — no watermark!');
        avResultUrl = url;
        avShowResult(url, title);
        setSt('av-gen-st','ok','✅ Avatar video ready!');
        document.getElementById('av-gen-btn').disabled = false;
        document.getElementById('av-gen-btn').textContent = '🔄 Re-Generate';
        if (document.getElementById('av-save-lib')?.checked) avSaveToLibrary(true);
        return;
      }
      if (st === 'failed') throw new Error('FreeStack render failed: ' + (pd.error || 'unknown error'));
    }
    throw new Error('Render timed out after 6 minutes');

  } catch(err) {
    avStep(3,'error','Error: ' + err.message);
    setSt('av-gen-st','err', err.message);
    document.getElementById('av-gen-btn').disabled = false;
    document.getElementById('av-gen-btn').textContent = '🔄 Retry';
  }
}

function avStep(n,status,msg) {
  var c={running:'var(--blue)',done:'var(--green)',error:'var(--red)',pending:'var(--border)'};
  var b={running:'⏳ Running',done:'✅ Done',error:'❌ Failed',pending:'Pending'};
  var bg={running:'rgba(79,142,247,.15)',done:'rgba(52,211,153,.15)',error:'rgba(248,113,113,.15)',pending:'rgba(148,163,184,.1)'};
  var tc={running:'var(--blue)',done:'var(--green)',error:'var(--red)',pending:'var(--muted)'};
  var w=document.getElementById('avst-'+n), m=document.getElementById('avst-'+n+'-msg'), badge=document.getElementById('avst-'+n+'-badge');
  if(w)  w.style.borderLeftColor=c[status];
  if(m)  m.textContent=msg;
  if(badge){badge.textContent=b[status];badge.style.background=bg[status];badge.style.color=tc[status];}
}

function avShowResult(url, title) {
  var empty = document.getElementById('av-result-empty');
  var ready = document.getElementById('av-result-ready');
  var urlEl = document.getElementById('av-result-url');
  if (empty) empty.style.display='none';
  if (ready) ready.style.display='block';
  if (urlEl) urlEl.textContent=url;
  avTab('result');
}

function avCopyUrl() {
  if(!avResultUrl) return;
  navigator.clipboard.writeText(avResultUrl).catch(()=>{});
  alert('✅ Avatar video URL copied!');
}

function avOpenUrl() {
  if (avResultUrl) window.open(avResultUrl,'_blank');
}

// ── Send to systems ───────────────────────────────────────────────────────
function avSendToVideoStudio() {
  if (!avResultUrl) { alert('No result URL yet.'); return; }
  // Pre-fill Video Studio result URL and switch to it
  var title  = document.getElementById('av-proj-title')?.value || 'Avatar Video';
  var vsUrlEl= document.getElementById('vs-result-url-wrap');
  var vsDlBtn= document.getElementById('vs-download-btn');
  if (vsUrlEl) vsUrlEl.textContent = avResultUrl;
  if (vsDlBtn) vsDlBtn.onclick = () => window.open(avResultUrl,'_blank');
  vsRenderUrl = avResultUrl;
  // Also set project name
  var vsProjEl = document.getElementById('vs-project-name');
  if (vsProjEl && !vsProjEl.value) vsProjEl.value = title;
  // Show result panel in Video Studio
  var vsRR = document.getElementById('vs-render-result');
  if (vsRR) vsRR.style.display='block';
  avClose();
  nav('videostudio');
  vsTab('deliver');
  alert('✅ Avatar video sent to Video Studio — ready in the Deliver tab!');
}

function avSendToAutoPublish() {
  if (!avResultUrl) { alert('No result URL yet.'); return; }
  // Store URL for Auto-Publish to use as the video asset
  localStorage.setItem('hev4_av_inject_url', avResultUrl);
  avClose();
  nav('videostudio');
  alert('✅ Avatar video sent to Auto-Publish Pipeline! It will use this video for the next publish.');
}

// ── Shared asset library ──────────────────────────────────────────────────
function avSaveToLibrary(silent) {
  if (!avResultUrl) { if(!silent) alert('No video to save yet.'); return; }
  var title = document.getElementById('av-proj-title')?.value || 'Avatar Video';
  var cast  = avSelectedCast ? avSelectedCast.name : 'Unknown';
  avLibrary = JSON.parse(localStorage.getItem('hev4_av_library') || '[]');
  avLibrary.unshift({ id:'av'+Date.now(), title, cast, url:avResultUrl, date:new Date().toLocaleString(), source:avSource||'unknown' });
  if (avLibrary.length > 30) avLibrary = avLibrary.slice(0,30);
  localStorage.setItem('hev4_av_library', JSON.stringify(avLibrary));
  if (!silent) alert('✅ Saved to Shared Asset Library — available in both Video Studio and Auto-Publish!');
  avRenderLibrary();
}

function avRenderLibrary() {
  var el = document.getElementById('av-library-list');
  if (!el) return;
  avLibrary = JSON.parse(localStorage.getItem('hev4_av_library') || '[]');
  if (!avLibrary.length) {
    el.innerHTML='<div style="font-size:12px;color:var(--muted);text-align:center;padding:16px">No saved avatar projects yet.</div>';
    return;
  }
  el.innerHTML = avLibrary.slice(0,8).map(p=>`
    <div style="background:var(--bg3);border-radius:8px;padding:10px;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center">
      <div>
        <div style="font-weight:700;font-size:12px">${esc(p.title)}</div>
        <div style="font-size:11px;color:var(--muted)">${esc(p.cast)} · ${esc(p.date)}</div>
      </div>
      <div style="display:flex;gap:4px">
        <a href="${esc(p.url)}" target="_blank" class="btn btn-ghost btn-xs" rel="noopener noreferrer">▶</a>
        <button onclick="avLoadFromLibrary('${esc(p.id)}')" class="btn btn-ghost btn-xs" style="color:#a78bfa">Use</button>
      </div>
    </div>`).join('');
}

function avLoadFromLibrary(id) {
  avLibrary = JSON.parse(localStorage.getItem('hev4_av_library') || '[]');
  var item = avLibrary.find(p => p.id === id);
  if (!item) return;
  avResultUrl = item.url;
  avShowResult(item.url, item.title);
}

function avNewProject() {
  avSelectedCast = null; avResultUrl = null; avSelectedStyle = 'cinematic';
  ['av-script-txt','av-topic','av-proj-title','av-cta-text','av-bg-notes'].forEach(id => {
    var el = document.getElementById(id); if (el) el.value='';
  });
  document.querySelectorAll('.av-cast-btn').forEach(el => { el.style.borderColor='var(--border)'; el.style.background='var(--bg3)'; });
  var sel = document.getElementById('av-selected-cast'); if (sel) sel.style.display='none';
  document.getElementById('av-status-wrap').style.display='none';
  document.getElementById('av-result-empty').style.display='block';
  document.getElementById('av-result-ready').style.display='none';
  if (document.getElementById('av-duration')) document.getElementById('av-duration').value=60;
  avUpdateDur(); avTab('avatar');
}


// ═══════════════════════════════════════════════════════════════════════════

var vsCurrentTemplate  = null;
var vsScenes           = [];
var vsRenderUrl        = null;
var vsProjectHistory   = JSON.parse(localStorage.getItem('hev4_vs_history') || '[]');

// ═══════════════════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════════════
// 28-DAY AI MASTERY — JavaScript
// ═══════════════════════════════════════════════════════════════════════════

// Coursiv-style lesson data with steps
var AIM_DAYS = [
  // ── WEEK 1: AI FOUNDATIONS ──────────────────────────────────────────────
  {day:1,  week:'WEEK 1 · AI FOUNDATIONS',      tool:'ChatGPT',    toolUrl:'https://chatgpt.com',          icon:'🧠',
   title:'The AI Mindset',
   outcome:'Mastering the first "Hello World" prompt.',
   challenge:'Write Your First Power Prompt',
   learn:'The AI mindset is not about using a tool. It is about giving precise instructions and iterating until you get exactly what you need. Today you master the foundation.',
   steps:['Open ChatGPT (button below)','Type: "You are an expert business copywriter. Write me a 3-sentence professional bio for someone who built an AI content studio for $5 a month."','Read the result. Then say: "Make it more confident and remove any humble language."','Paste the final version in your result box below.'],
   why:'Every great AI user starts with clear instructions. This one skill unlocks everything else.'},
  {day:2,  week:'WEEK 1 · AI FOUNDATIONS',      tool:'ChatGPT',    toolUrl:'https://chatgpt.com',          icon:'🎭',
   title:'Role-Based Prompting',
   outcome:'Transforming AI into an expert consultant.',
   challenge:'Make ChatGPT Your Expert Advisor',
   learn:'When you assign ChatGPT a role — "You are a CFO", "You are a marketing director" — the quality of its output jumps dramatically. Today you use this to get expert-level advice instantly.',
   steps:['Open ChatGPT','Type: "You are a senior affiliate marketing strategist with 15 years experience. I am building an AI content studio. Give me the 3 highest-leverage things I should focus on in the first 90 days."','Follow up with: "Now give me a specific action for this week only."','Paste the strategy below.'],
   why:'Role-based prompting is the single fastest way to get professional-quality output from any AI tool.'},
  {day:3,  week:'WEEK 1 · AI FOUNDATIONS',      tool:'Claude',     toolUrl:'https://claude.ai',            icon:'📊',
   title:'Analytical Depth',
   outcome:'Writing long-form reports with complex reasoning.',
   challenge:'Use Claude for Deep Analysis',
   learn:'Claude AI excels at nuanced, long-form analysis. Where ChatGPT writes, Claude thinks. Today you use Claude to analyze something in your business and get strategic insight.',
   steps:['Open Claude AI (button below)','Type: "Analyze the business model of someone who: builds AI apps, creates video content, and does affiliate marketing. What are the three biggest risks and three biggest opportunities for someone in this position in 2026?"','Ask a follow-up: "Which opportunity should I focus on first and why?"','Paste Claude\'s analysis below.'],
   why:'Claude reasons through complexity better than most AI tools. Use it for decisions, strategy, and deep analysis.'},
  {day:4,  week:'WEEK 1 · AI FOUNDATIONS',      tool:'Perplexity', toolUrl:'https://perplexity.ai',        icon:'🔍',
   title:'AI Research',
   outcome:'Fact-checked research in under 5 minutes.',
   challenge:'Research Any Topic with Citations',
   learn:'Perplexity is a search engine powered by AI. It finds current information and cites every source. Today you use it to research your niche in minutes — something that used to take hours.',
   steps:['Open Perplexity AI (button below)','Search: "Best affiliate marketing niches for video content creators in 2026 — what is paying the highest commissions?"','Look at the sources cited. Are they recent and trustworthy?','Pick the most interesting finding and paste it with the source link below.'],
   why:'Perplexity gives you cited, current information. Never use AI without sources for research — this tool gives you both.'},
  {day:5,  week:'WEEK 1 · AI FOUNDATIONS',      tool:'Gemini',     toolUrl:'https://gemini.google.com',   icon:'✨',
   title:'Workspace Sync',
   outcome:'Connecting AI to your emails and docs.',
   challenge:'Use Gemini with Your Google Workspace',
   learn:'Google Gemini connects directly to Gmail, Drive, and Docs. Today you use it to summarize your emails, organize information, or draft responses — saving 30 minutes immediately.',
   steps:['Open Google Gemini (button below)','If you have Gmail connected: ask "Summarize my last 5 important emails and what action each one needs."','If not connected: ask "Write me a professional email template I can use to follow up with a potential affiliate partner 3 days after first contact."','Paste the result below.'],
   why:'AI connected to your existing tools is 10x more powerful than standalone AI. Gemini is the bridge to Google Workspace.'},
  {day:6,  week:'WEEK 1 · AI FOUNDATIONS',      tool:'Becky AI',   toolUrl:'',                             icon:'🤖',
   title:'Your Own AI — Becky',
   outcome:'Using your personal AI that knows your brand.',
   challenge:'Put Becky to Work on Your Business',
   learn:'Becky AI is YOUR tool — she knows your brand, your audience, your voice, and your goals. Using her is different from using a generic AI. She speaks for AffiliateMediaHub Studio specifically.',
   steps:['Tap "Open Becky" (button below)','Tell her: "Becky, write me a 60-second YouTube script for AI PodCast Channel. Topic: How I built my own AI content studio for $5 a month with no coding experience."','Ask her to rewrite the hook if it is not punchy enough.','Paste the final script below.'],
   why:'Your own AI that knows your brand is worth more than 10 generic tools. Use Becky every single day.'},
  {day:7,  week:'WEEK 1 · AI FOUNDATIONS',      tool:'Quiz',       toolUrl:'',                             icon:'🏆',
   title:'Foundation Check',
   outcome:'Verify your progress and unlock Week 2.',
   challenge:'Prove You Have the AI Mindset',
   learn:'You have now used 5 AI tools and your own studio AI. This is your foundation check — not a test, but a moment to reflect on what changed and what you will do differently going forward.',
   steps:['Answer this in the box below: What was the single most useful AI tool you used this week and why?','Write: What is one thing you will use AI for every day from now on that you were doing manually before?','Write: What is the biggest question you still have about AI tools?','Tap Complete and post your Week 1 reflection to LinkedIn.'],
   why:'Reflection cements learning. The people who review their progress are 3x more likely to continue building the skill.'},

  // ── WEEK 2: CONTENT CREATION ────────────────────────────────────────────
  {day:8,  week:'WEEK 2 · CONTENT CREATION',    tool:'Canva AI',   toolUrl:'https://canva.com',            icon:'🎨',
   title:'Design Fast',
   outcome:'Generating brand visuals in seconds.',
   challenge:'Create Your Studio Brand Graphics',
   learn:'Canva AI can generate complete branded graphics, thumbnails, and social posts in under 2 minutes. Today you create visual assets for AffiliateMediaHub Studio that you can use immediately.',
   steps:['Open Canva (button below)','Search for "YouTube Thumbnail" template. Choose a dark, professional one.','Use the text tool to add: "I Built My AI Studio for $5/Month" as the main headline.','Export it as PNG and describe what you created below.'],
   why:'Visual content gets 3x more engagement than text-only posts. AI design tools mean you never need a designer again.'},
  {day:9,  week:'WEEK 2 · CONTENT CREATION',    tool:'Copy AI',    toolUrl:'https://copy.ai',              icon:'✍️',
   title:'Viral Hooks',
   outcome:'Writing 10 catchy headlines for your content.',
   challenge:'Write Headlines That Stop the Scroll',
   learn:'The hook is everything. 80 percent of people never read past the headline. Today you master the skill of writing AI-powered hooks that make people stop scrolling and click.',
   steps:['Open Copy.ai (button below)','Use the Blog Intro or Hook generator. Topic: "How to build an AI content business for $5 a month"','Generate at least 10 variations','Pick the 3 strongest ones and paste them below with one sentence on why each one works.'],
   why:'One great hook can drive more traffic than 10 average posts. This skill compounds every time you publish.'},
  {day:10, week:'WEEK 2 · CONTENT CREATION',    tool:'ElevenLabs', toolUrl:'https://elevenlabs.io',        icon:'🎙',
   title:'Voice Mastery',
   outcome:'Cloning and polishing AI audio.',
   challenge:'Create a Professional Voiceover',
   learn:'ElevenLabs is already inside Hub Engine as Becky\'s voice. Today you explore it directly to understand what it can do — creating audio for videos, podcast intros, and narration.',
   steps:['Open ElevenLabs (button below)','In the free tier, type this text into the voice generator: "Welcome to AI PodCast Channel. Today we are talking about how one person built a complete AI studio for five dollars a month. Let\'s get into it."','Download or play the audio.','Paste a description of the voice quality and how you would use it below.'],
   why:'Voice is the most engaging content format. AI voice makes you a media company without a recording studio.'},
  {day:11, week:'WEEK 2 · CONTENT CREATION',    tool:'CapCut',     toolUrl:'https://capcut.com',           icon:'🎬',
   title:'Video Editing',
   outcome:'Auto-syncing clips to your audio.',
   challenge:'Edit a Video with AI Auto-Captions',
   learn:'CapCut is the fastest free video editor with AI features. Its auto-caption feature alone can save you 2 hours per video. Today you learn the basic workflow.',
   steps:['Open CapCut on your phone or at capcut.com','Import any short video clip or record a 30-second clip of yourself speaking','Use Auto Captions to add subtitles automatically','Export the video with captions and describe what you created below.'],
   why:'85% of social media videos are watched without sound. Captions are not optional — they are required for reach.'},
  {day:12, week:'WEEK 2 · CONTENT CREATION',    tool:'Runway',     toolUrl:'https://runwayml.com',         icon:'🎥',
   title:'Motion Magic',
   outcome:'Creating your first AI-generated b-roll.',
   challenge:'Generate AI Video Footage',
   learn:'Runway ML creates AI-generated video clips from text descriptions. These can be used as b-roll, background footage, or visual elements in your videos — all without a camera.',
   steps:['Open Runway ML (button below)','In the free tier, use Text to Video. Type: "A person sitting at a desk working on a laptop with a glowing dark interface, cinematic lighting, professional"','Generate and watch the clip','Describe what was created and how you would use it in a video below.'],
   why:'B-roll footage normally costs hundreds of dollars. AI generates it in seconds. This changes video production forever.'},
  {day:13, week:'WEEK 2 · CONTENT CREATION',    tool:'Zapier',     toolUrl:'https://zapier.com',           icon:'⚡',
   title:'Glue Logic',
   outcome:'Connecting tools to auto-publish content.',
   challenge:'Automate One Repetitive Task',
   learn:'Zapier connects apps and automates repetitive tasks without code. If you do the same thing more than once a week — Zapier can do it for you automatically. Today you identify and automate one task.',
   steps:['Open Zapier (button below)','Browse the pre-built "Zap" templates. Look for ones involving YouTube, Gmail, or LinkedIn.','Find one automation that would save you time. Even if you do not set it up today — understand how it works.','Describe the automation you found and what time it would save you below.'],
   why:'Every hour you save with automation is an hour you can spend creating or selling. Automation is your leverage.'},
  {day:14, week:'WEEK 2 · CONTENT CREATION',    tool:'Project',    toolUrl:'',                             icon:'🏗',
   title:'The 30-Second Video',
   outcome:'Produce your first full faceless short.',
   challenge:'Create Your First AI Video End to End',
   learn:'Today is project day. You combine everything from Week 2 — script from Becky, voice from ElevenLabs, edit in CapCut, captions added, thumbnail from Canva. This is the complete workflow.',
   steps:['Open Hub Engine v4 → Video Studio','Brief Becky: "Write a 30-second script about one thing I learned this week about AI tools"','Go through all 5 tabs: Template → Script → Scenes → Render → Save','Describe your video below — what it is about and what you learned making it.'],
   why:'You just completed your first end-to-end AI video production. Every video after this is faster. This is the workflow you will use forever.'},

  // ── WEEK 3: LEADERSHIP COMMUNICATION ────────────────────────────────────
  {day:15, week:'WEEK 3 · LEADERSHIP COMMUNICATION', tool:'Becky AI', toolUrl:'',                          icon:'💪',
   title:'Forceful Clarity',
   outcome:'Removing weak language from your communication.',
   challenge:'Rewrite One Message Like a Leader',
   learn:'This week bridges your AI skills with your Professional Speaking course. Today you combine Becky AI with the Micro-Learning module to rewrite your communication with authority.',
   steps:['Think of one email, message, or thing you said this week that had weak words in it','Open Micro-Learning → Module 1 (Strip Weak Words)','Paste it in and tap Becky — Rewrite Like a Leader','Compare the before and after. Paste both versions below.'],
   why:'Combining AI tools with leadership communication is your competitive advantage. Nobody else is doing both.'},
  {day:16, week:'WEEK 3 · LEADERSHIP COMMUNICATION', tool:'Becky AI', toolUrl:'',                          icon:'👂',
   title:'Active Listening',
   outcome:'Extracting key meeting signals.',
   challenge:'Run a Leadership Listening Audit',
   learn:'Today you use Becky to audit your listening skills — finding what you missed in a recent conversation and what a leader would have done differently.',
   steps:['Think of a meeting or conversation from this week','Open Micro-Learning → Module 3 (Leadership Listening Audit)','Summarize the conversation and tap Becky — Audit My Leadership Listening','Read what Becky says you missed. Paste the key insight below.'],
   why:'The leader who listens deepest sees the most. Becky helps you find what was hidden beneath the surface of every conversation.'},
  {day:17, week:'WEEK 3 · LEADERSHIP COMMUNICATION', tool:'Becky AI', toolUrl:'',                          icon:'🛑',
   title:'Reclaiming Control',
   outcome:'Using control scripts to stop interruptions.',
   challenge:'Get Your Interruption Control Script',
   learn:'Today you get your personal script for stopping interruptions. This is the exact language you will use in your next meeting when someone cuts you off.',
   steps:['Open Micro-Learning → Module 2 (Interruption Control)','Describe the most common interruption situation you face','Tap Becky — Write My Control Script','Memorize the 3 sentences. Practice them out loud right now. Paste them below.'],
   why:'One script used consistently in every meeting changes how your entire team perceives your authority.'},
  {day:18, week:'WEEK 3 · LEADERSHIP COMMUNICATION', tool:'Claude',   toolUrl:'https://claude.ai',         icon:'📧',
   title:'Authoritative Tone',
   outcome:'Firm, calm emails that get results.',
   challenge:'Rewrite a Real Email with Executive Authority',
   learn:'Today you use Claude AI to rewrite a real email or message you need to send — transforming it into the kind of communication that gets immediate, respectful responses.',
   steps:['Think of an email you need to send that involves a request, a disagreement, or a follow-up','Open Claude AI','Type: "Rewrite this email to sound calm, authoritative, and professional. Remove all hedging language. Make it direct and clear. Here is the email: [paste your email]"','Paste the before and after versions below.'],
   why:'Every email you send is a statement about your professionalism. One rewrite habit — done daily — builds an executive reputation over months.'},
  {day:19, week:'WEEK 3 · LEADERSHIP COMMUNICATION', tool:'ChatGPT',  toolUrl:'https://chatgpt.com',       icon:'🎯',
   title:'Direct Feedback',
   outcome:'Giving tough feedback without aggression.',
   challenge:'Write Difficult Feedback Professionally',
   learn:'Giving feedback that is honest without being aggressive is one of the hardest leadership skills. Today you use ChatGPT to structure your feedback in a way that gets heard rather than defended against.',
   steps:['Think of a situation where you need to give someone feedback — a team member, a service provider, or even a family member','Open ChatGPT','Type: "Help me give feedback to [describe the person] about [describe the issue]. The feedback needs to be direct, professional, and constructive — not aggressive. Structure it as: what I observed, the impact, what I need going forward."','Paste the result below.'],
   why:'Feedback delivered poorly creates defensiveness. Feedback delivered well creates change. This structure works every time.'},
  {day:20, week:'WEEK 3 · LEADERSHIP COMMUNICATION', tool:'Becky AI', toolUrl:'',                          icon:'⚖️',
   title:'Decision Logic',
   outcome:'Using AI to weigh tough business choices.',
   challenge:'Use AI to Make a Real Business Decision',
   learn:'Today you use Becky to help you think through a real decision you are facing in your business or life. AI is not just for content — it is a thinking partner for decisions.',
   steps:['Open Becky AI','Tell her: "I am facing a decision: [describe your actual decision]. Help me think through the pros and cons, what I might be missing, and what a calm, strategic leader would do in this situation."','Read her response. Ask a follow-up if needed.','Paste the decision and Becky\'s recommendation below.'],
   why:'Leaders who think out loud with a trusted advisor make better decisions. Becky is always available, always calm, and always focused on your best outcome.'},
  {day:21, week:'WEEK 3 · LEADERSHIP COMMUNICATION', tool:'Review',   toolUrl:'',                          icon:'🔍',
   title:'Audit Week',
   outcome:'Refining your personal communication style.',
   challenge:'Complete Your Week 3 Communication Audit',
   learn:'This week you combined AI tools with professional communication. Today you audit your growth — what changed, what is still hard, and what your next focus should be.',
   steps:['Answer: What is the ONE communication habit that improved most this week?','Answer: What situation still makes you feel uncertain or lose your authority?','Open Micro-Learning → Module 5 (Custom Coaching) and describe that situation to Becky','Paste Becky\'s coaching plan below.'],
   why:'Self-awareness is the foundation of all leadership development. The leader who knows their gaps can close them.'},

  // ── WEEK 4: MONETIZATION & SCALE ────────────────────────────────────────
  {day:22, week:'WEEK 4 · MONETIZATION & SCALE', tool:'Hub Engine', toolUrl:'',                            icon:'🔗',
   title:'Pipeline Build',
   outcome:'Connecting your research to your content.',
   challenge:'Build Your Content-to-Income Pipeline',
   learn:'This week you connect everything into a pipeline that produces income. Today you map out your full content-to-income workflow from idea to affiliate commission.',
   steps:['Open Becky AI','Tell her: "Map out my complete content pipeline. I use Hub Engine v4 to create videos. I post to YouTube and LinkedIn. I want to embed affiliate links and earn commissions. Show me the exact step-by-step from idea to income."','Review her response and identify the one step you are missing today','Paste the pipeline and the missing step below.'],
   why:'A pipeline is a system. Systems produce consistent results. Random effort produces random results.'},
  {day:23, week:'WEEK 4 · MONETIZATION & SCALE', tool:'Claude',     toolUrl:'https://claude.ai',           icon:'💰',
   title:'Passive Links',
   outcome:'Embedding affiliate links professionally.',
   challenge:'Plan Your Affiliate Link Strategy',
   learn:'Affiliate marketing is not about spamming links — it is about placing the right recommendation in front of the right person at the right moment. Today you plan your strategy.',
   steps:['Open Claude AI','Type: "I create content about AI tools, video production, and online business. Help me identify the 5 best affiliate programs that naturally fit this content. For each one: why it fits, how to mention it naturally, and the typical commission rate."','Review the recommendations','Paste your top 3 affiliate opportunities and why you chose them below.'],
   why:'Passive income from affiliate links compounds over time. One video with the right link can earn for years.'},
  {day:24, week:'WEEK 4 · MONETIZATION & SCALE', tool:'Becky AI',   toolUrl:'',                            icon:'📈',
   title:'Scale Workflow',
   outcome:'Doubling your daily output volume.',
   challenge:'Find Where You Can Double Your Output',
   learn:'Scaling is not about working twice as hard — it is about finding where AI can handle what you were doing manually and freeing you to create more. Today you find your bottleneck.',
   steps:['Make a list of every task you do each week related to content and business','Open Becky AI and tell her: "Here are my weekly tasks: [list them]. Which of these can AI fully automate or dramatically speed up? Rank them by time savings and give me the exact AI tool to use for each."','Identify your top time-saving opportunity','Paste your task list and Becky\'s recommendations below.'],
   why:'The creator who spends 80% of their time creating and 20% on admin will always outproduce the one doing the reverse.'},
  {day:25, week:'WEEK 4 · MONETIZATION & SCALE', tool:'Perplexity',  toolUrl:'https://perplexity.ai',      icon:'📊',
   title:'Data Review',
   outcome:'Understanding engagement on your posts.',
   challenge:'Research What Content Performs Best in Your Niche',
   learn:'You cannot improve what you do not measure. Today you use Perplexity to research what content formats and topics are performing best in your niche right now — so you create what people already want.',
   steps:['Open Perplexity AI','Search: "What YouTube content about AI tools is getting the most views and engagement in 2026? What formats, topics, and lengths perform best?"','Look at the sources and identify 3 specific content angles that are working right now','Paste the top 3 opportunities and your plan to create one of them below.'],
   why:'Data-informed content creation beats gut-feel content every time. Spend 10 minutes researching before you create and your results will improve immediately.'},
  {day:26, week:'WEEK 4 · MONETIZATION & SCALE', tool:'Hub Engine', toolUrl:'',                            icon:'📦',
   title:'Course Build',
   outcome:'Packaging your 28-day experience.',
   challenge:'Turn Your Journey Into a Product',
   learn:'You have just completed 26 days of AI mastery. That journey — the tools, the lessons, the communication skills, the content workflow — is itself a product you can package and sell.',
   steps:['Open Becky AI','Tell her: "Help me design a digital product based on my 28-day AI mastery journey. I want to package it as a course, guide, or membership. Target audience: beginners who want to build an AI content business. Give me: product title, 5 modules, price point, and how to deliver it."','Review the product concept','Paste your product outline below — this is your first sellable product.'],
   why:'Your experience is your product. The 28 days you just completed is a curriculum that others would pay to follow.'},
  {day:27, week:'WEEK 4 · MONETIZATION & SCALE', tool:'Claude',     toolUrl:'https://claude.ai',           icon:'🔄',
   title:'Self-Correction',
   outcome:'Building your own feedback loops.',
   challenge:'Design Your Personal AI Review System',
   learn:'The highest performers review their work, identify patterns, and correct course regularly. Today you design a system to review your content, communication, and business weekly using AI.',
   steps:['Open Claude AI','Type: "Design a simple weekly review system for a solo AI content creator. It should take under 30 minutes and cover: content performance, communication habits, business progress, and next week\'s priorities. Give me the exact questions to ask myself each week."','Review the system','Paste your weekly review template below — you will use this every Sunday from now on.'],
   why:'The person with a weekly review system always outperforms the one who moves from task to task without reflection. Design yours today.'},
  {day:28, week:'WEEK 4 · MONETIZATION & SCALE', tool:'Launch',     toolUrl:'',                            icon:'🎓',
   title:'Certification Day',
   outcome:'Final project review + Certification.',
   challenge:'Complete Your 28-Day Final Project',
   learn:'You did it. 28 days. 4 AI tools per week. Communication skills. Content creation. Monetization strategy. You are not the same creator you were on Day 1. Today you celebrate, reflect, and commit to what comes next.',
   steps:['Answer: What is the single biggest thing that changed in how you use AI over 28 days?','Answer: What is the one skill — AI or communication — that had the most impact on your business?','Open Becky AI and tell her: "Write me a LinkedIn post announcing that I completed a 28-day AI mastery program. Include: what I built, what I learned, and what I am launching next. Make it inspiring and authentic."','Post it to LinkedIn. You earned this. Paste the post below.'],
   why:'Day 28. You are certified. Not by a course platform — by your own daily commitment. That is worth more than any certificate.'}
];

var aimCurrentDay = parseInt(localStorage.getItem('aim_day') || '1');
var aimCompleted  = JSON.parse(localStorage.getItem('aim_completed') || '[]');
var aimResults    = JSON.parse(localStorage.getItem('aim_results') || '{}');

function aimRender() {
  var d = AIM_DAYS[aimCurrentDay - 1]; if (!d) return;

  // Header badges
  var sb=document.getElementById('aim-streak-badge'), db=document.getElementById('aim-done-badge');
  if(sb) sb.textContent = '🔥 Day ' + aimCurrentDay;
  if(db) db.textContent = aimCompleted.length + '/28 Complete';

  // Progress bar
  var pct = Math.round((aimCompleted.length/28)*100);
  var bar=document.getElementById('aim-bar'), pl=document.getElementById('aim-pct-label');
  if(bar) bar.style.width = pct + '%';
  if(pl)  pl.textContent  = pct + '%';

  // Weekly grid — group 28 days into 4 weeks of 7
  var dots = document.getElementById('aim-dots');
  if(dots) {
    var weekNames = ['Week 1 · AI Foundations','Week 2 · Content Creation','Week 3 · Leadership','Week 4 · Monetization'];
    var html = '';
    for(var w=0;w<4;w++){
      var weekDays = AIM_DAYS.slice(w*7,(w+1)*7);
      var weekDone = weekDays.filter(dd=>aimCompleted.includes(dd.day)).length;
      var weekColors=['#00d4aa','#a78bfa','#f5c518','#f59e0b'];
      html += '<div style="margin-bottom:10px">';
      html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">';
      html += '<div style="font-size:10px;font-weight:700;color:'+weekColors[w]+';letter-spacing:.06em">'+weekNames[w].toUpperCase()+'</div>';
      html += '<div style="font-size:10px;font-weight:700;color:'+weekColors[w]+'">'+weekDone+'/7</div>';
      html += '</div>';
      html += '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px">';
      weekDays.forEach(function(dd){
        var done  = aimCompleted.includes(dd.day);
        var curr  = dd.day === aimCurrentDay;
        var bg    = done ? weekColors[w] : curr ? 'rgba(255,255,255,.15)' : 'var(--bg3)';
        var border= curr ? '2px solid '+weekColors[w] : '1px solid var(--border)';
        var txCol = done ? '#000' : curr ? '#fff' : 'var(--muted)';
        html += '<div onclick="aimGoTo('+dd.day+')" style="background:'+bg+';border:'+border+';border-radius:8px;padding:6px 2px;text-align:center;cursor:pointer;transition:.15s" title="Day '+dd.day+': '+dd.title+'">';
        html += '<div style="font-size:13px;margin-bottom:1px">'+(done?'✓':dd.icon||'📅')+'</div>';
        html += '<div style="font-size:8px;font-weight:700;color:'+txCol+';line-height:1.2">'+dd.day+'</div>';
        html += '</div>';
      });
      html += '</div></div>';
    }
    dots.innerHTML = html;
  }

  // Lesson card fields
  var get = function(id){ return document.getElementById(id); };
  if(get('aim-week-label'))  get('aim-week-label').textContent  = d.week;
  if(get('aim-day-label'))   get('aim-day-label').textContent   = 'Day ' + d.day + ' of 28' + (aimCompleted.includes(d.day) ? ' ✅' : '');
  if(get('aim-tool-label'))  get('aim-tool-label').textContent  = d.tool;
  if(get('aim-challenge'))   get('aim-challenge').textContent   = d.title + ' — ' + d.challenge;
  if(get('aim-learn'))       get('aim-learn').textContent       = d.learn;
  if(get('aim-tool-btn'))    get('aim-tool-btn').textContent    = '🔗 Open ' + d.tool;
  if(get('aim-result') && aimResults[d.day]) get('aim-result').value = aimResults[d.day];
  else if(get('aim-result')) get('aim-result').value = '';

  // Show/hide why
  var whyWrap = get('aim-why-wrap'), whyEl = get('aim-why');
  if(d.why && whyWrap) { whyWrap.style.display='block'; if(whyEl) whyEl.textContent = d.why; }

  // Steps
  var stepsEl = get('aim-steps');
  if(stepsEl && d.steps) {
    stepsEl.innerHTML = d.steps.map(function(s,i){
      return '<div style="background:var(--bg3);border-radius:8px;padding:10px 12px;display:flex;gap:10px;align-items:flex-start">'
        +'<div style="background:#00d4aa;color:#000;font-size:11px;font-weight:900;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px">'+(i+1)+'</div>'
        +'<div style="font-size:13px;color:rgba(255,255,255,.85);line-height:1.7">'+s+'</div>'
        +'</div>';
    }).join('');
  }

  // Outcome badge
  var outcomeEl = get('aim-outcome-badge');
  if(outcomeEl && d.outcome) {
    outcomeEl.style.display = 'block';
    outcomeEl.textContent   = '🎯 Today\'s Outcome: ' + d.outcome;
  }

  // Preview next days
  var prev = get('aim-preview');
  if(prev) {
    prev.innerHTML = AIM_DAYS.slice(aimCurrentDay, aimCurrentDay+3).map(function(u){
      return '<div style="background:var(--bg3);border-radius:8px;padding:10px 12px;margin-bottom:6px;display:flex;gap:10px;align-items:center">'
        +'<div style="font-size:18px;min-width:28px">'+(u.icon||'📅')+'</div>'
        +'<div><div style="font-size:12px;font-weight:700">Day '+u.day+' — '+u.title+'</div>'
        +'<div style="font-size:11px;color:var(--muted)">'+u.tool+' · '+u.outcome+'</div></div>'
        +'</div>';
    }).join('');
  }
}


function aimOpenTool() {
  var d=AIM_DAYS[aimCurrentDay-1];
  if (d.toolUrl) { window.open(d.toolUrl,'_blank'); }
  else { nav('becky'); setTimeout(()=>{ var inp=document.getElementById('bin'); if(inp){inp.value='Day '+d.day+' AI Mastery: '+d.challenge; bSend();} },400); }
}

function aimComplete() {
  var result = document.getElementById('aim-result')?.value?.trim();
  if (!result) { setSt('aim-st','err','Paste your result first — what did you create today?'); return; }
  aimResults[aimCurrentDay] = result;
  if (!aimCompleted.includes(aimCurrentDay)) aimCompleted.push(aimCurrentDay);
  localStorage.setItem('aim_completed', JSON.stringify(aimCompleted));
  localStorage.setItem('aim_results',   JSON.stringify(aimResults));
  setSt('aim-st','ok','✅ Day '+aimCurrentDay+' complete! Opening LinkedIn to post your result...');
  var d = AIM_DAYS[aimCurrentDay-1];
  var post = encodeURIComponent('📅 Day '+aimCurrentDay+'/28 — 28-Day AI Mastery\n\nToday\'s Challenge: '+d.challenge+'\n\nTool Used: '+d.tool+'\n\nMy Result:\n'+result+'\n\n#AImastery #AffiliateMediaHub #28DayChallenge #AItools');
  setTimeout(()=>window.open('https://www.linkedin.com/feed/?shareActive=true&text='+post,'_blank'), 1000);
  if (aimCurrentDay < 28) setTimeout(()=>{ aimCurrentDay++; localStorage.setItem('aim_day',String(aimCurrentDay)); aimRender(); }, 2000);
}

function aimNext() { if(aimCurrentDay<28){aimCurrentDay++;localStorage.setItem('aim_day',String(aimCurrentDay));aimRender();} }
function aimPrev() { if(aimCurrentDay>1){aimCurrentDay--;localStorage.setItem('aim_day',String(aimCurrentDay));aimRender();} }
function aimGoTo(n){ aimCurrentDay=n;localStorage.setItem('aim_day',String(n));aimRender(); }
function aimReset(){ if(!confirm('Reset all 28-day progress? This cannot be undone.'))return; aimCurrentDay=1;aimCompleted=[];aimResults={}; ['aim_day','aim_completed','aim_results'].forEach(k=>localStorage.removeItem(k)); aimRender(); }

// ═══════════════════════════════════════════════════════════════════════════
// MICRO-LEARNING — PROFESSIONAL SPEAKING & LEADERSHIP COMMUNICATION
// 5 Modules: Word Precision · Hold the Floor · Meeting Mastery ·
//            Speaking Analysis · Daily Drill
// ═══════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
// MICRO-LEARNING — 12-WEEK PROFESSIONAL SPEAKING & LEADERSHIP COURSE
// ═══════════════════════════════════════════════════════════════════════════

var ML_WEEKS = [
  { week:1,  title:'Know Your Weak Words',              subtitle:'Foundation · Self-Awareness',          color:'#f5c518',
    learn:'Before you can speak powerfully you must hear yourself clearly. This week you identify every word and phrase that leaks authority from your speech. Awareness is the first step to change.',
    lesson:'Weak words soften your statements when you do not intend to. JUST — "I just wanted to ask..." MAYBE — "Maybe we could try..." I THINK — "I think this might work..." SORRY TO BOTHER — "Sorry to bother you but..." DOES THAT MAKE SENSE — which asks for approval instead of commanding clarity. This week you only listen. Every time you hear yourself say one of these words — pause. Note it. That pause alone begins rewiring your speech.',
    drill:'Every morning speak one sentence out loud about what you plan to do that day. Say it TWICE. First with your normal speech. Second with every weak word removed. "I just wanted to maybe check on the project" becomes "I am checking on the project this morning."',
    phrases:['I am checking on this.','Here is what I need.','This is my recommendation.','I have a question.','I disagree with that approach.'],
    practicePrompt:'Paste something you said or plan to say in a meeting or conversation. Becky will identify every weak word and rewrite it the way a calm, confident leader would say it.'
  },
  { week:2,  title:'The Power of the Pause',            subtitle:'Voice Control · Presence',             color:'#a78bfa',
    learn:'Silence is not weakness. In leadership communication the pause is one of your most powerful tools. Rushing to fill silence is the single biggest mistake speakers make.',
    lesson:'When you rush your words you signal anxiety. When you pause before answering you signal confidence. The pause says: I am not afraid of silence. I think before I speak. My words are worth waiting for. Practice the 2-second rule. Before every answer, every statement, every response — pause for two full seconds. It will feel uncomfortable. That discomfort is the feeling of authority being built. Executives pause before they speak. They do not rush. They do not fill silence with um or uh. They pause, breathe, and speak with intention.',
    drill:'Record yourself speaking for 60 seconds on any topic. Play it back and count your filler words — um, uh, like, you know, right, so. Write the number down. Record again and cut that number in half using deliberate pauses instead of fillers.',
    phrases:['[Pause 2 seconds] Here is my answer.','Let me think about that for a moment.','That is a good question. [Pause] My view is...','Before I respond — [pause] — I want to be precise.','[Silence. Eye contact. Then speak.]'],
    practicePrompt:'Describe a recent conversation or meeting where you felt rushed or nervous. Becky will show you exactly where a pause would have given you more authority and what you should have said instead.'
  },
  { week:3,  title:'Own the Room When You Enter',       subtitle:'Presence · First Impression · Energy', color:'#00d4aa',
    learn:'Your authority begins before you say a single word. How you walk in, where you sit, how you hold your body, and the first sentence you speak all communicate your level of leadership.',
    lesson:'Leaders do not shuffle into a room apologetically. They do not sit at the corner or edge of the table. They walk in deliberately, make eye contact, and sit where decisions are made. When you open your mouth first in a room you establish yourself as someone worth listening to. "Hi everyone, sorry I am a little late" signals low status. "Good morning. Let us get started. Today we are deciding three things." signals leadership. Same person. Completely different authority.',
    drill:'Practice your room entry at home. Stand at a doorway. Pause. Shoulders back. Head level. Walk in with purpose. Sit down deliberately without fidgeting. Look up and make eye contact before speaking. Do this 10 times until it becomes your natural movement.',
    phrases:['Good morning. Let us get started.','Here is what we are deciding today.','I want to cover three things in the next 30 minutes.','Before we begin — here is the context.','I will open and then give everyone a chance to respond.'],
    practicePrompt:'Describe how you typically enter a meeting or room where you need to lead. Becky will tell you exactly what to change and give you your opening statement for your next meeting.'
  },
  { week:4,  title:'Stop Interruptions Cold',           subtitle:'Boundary Setting · Floor Control',     color:'#f87171',
    learn:'Being interrupted is one of the most common leadership challenges. This week you learn the exact techniques to hold the floor, finish your thoughts, and reclaim the conversation — all without raising your voice.',
    lesson:'When someone interrupts you there are four things you must never do: apologize, stop talking completely, raise your voice, or show visible irritation. All four signal that the interrupter has won. Use the Bridge Technique. Keep speaking for one sentence after the interruption with slightly increased volume: "— and what I was saying was this." Then make eye contact and say calmly: "Let me finish this thought and then I want to hear yours." You do not ask permission to finish. You state that you are finishing. That distinction is the difference between someone who leads and someone who gets talked over.',
    drill:'Practice the Bridge Technique with a family member or in a mirror. Have someone try to interrupt you mid-sentence. Continue speaking for one more sentence. Then pause and calmly redirect them. Do this 5 times until it feels natural and not aggressive.',
    phrases:['Let me finish this point — then I want to hear yours.','Hold that thought — I am almost done.','— and what I was saying was this. [continue]','I will give you the floor in a moment.','That is an important point. Let me land mine first.'],
    practicePrompt:'Tell Becky who interrupts you, in what situations, and what you usually do when it happens. She will write your exact script — calm, firm, and professional.'
  },
  { week:5,  title:'Speak So People Remember',          subtitle:'Clarity · Structure · Precision',      color:'#34d399',
    learn:'Most people speak in long, winding streams of thought that lose the listener halfway through. This week you learn the 3-point structure that makes every statement clear, memorable, and easy to follow.',
    lesson:'The human brain remembers things in threes. Leaders use this constantly. "We have three priorities." "There are three reasons I disagree." "I want to make three points." Before you speak in any important situation — plan your three points. Lead with the most important one, not the last one. State your conclusion first, then support it. This is called bottom-line-up-front communication and it is the standard in every boardroom and executive team in the world.',
    drill:'Every day this week when someone asks for your opinion — respond with "I have three thoughts on that." Then give three clear, numbered points. Even if you only have one thought — structure it as three parts: the point, the reason, and what it means.',
    phrases:['I have three points on this.','Let me be direct — here is my recommendation.','The most important thing to understand is this.','There are three reasons for my position.','Bottom line — here is what I recommend and why.'],
    practicePrompt:'Describe a topic you need to speak about in your next meeting. Becky will structure your complete statement using the 3-point bottom-line-up-front format so you walk in prepared and speak with precision.'
  },
  { week:6,  title:'Leadership Listening',              subtitle:'Strategic Listening · Reading the Room',color:'#60a5fa',
    learn:'The best communicators in any room are not the ones who speak the most — they are the ones who listen the most strategically. This week you develop the skill of hearing what is not being said.',
    lesson:'Most people listen to respond. Leaders listen to understand. When you are only listening to respond you are already forming your next sentence while the other person is still speaking. Leadership listening has three layers. Layer one is what they actually say. Layer two is what they mean. Layer three is what they are not saying but feeling. When you master all three layers you become the most powerful person in any room — because you see everything everyone else misses.',
    drill:'This week in every conversation practice the 70-30 rule. Listen 70 percent of the time. Speak 30 percent. After each conversation write down one thing the other person communicated beneath their words — something they implied but did not directly state.',
    phrases:['Tell me more about that.','What concerns you most about this?','What I am hearing is... is that right?','Before I respond — help me understand this part.','What would you need to feel confident about moving forward?'],
    practicePrompt:'Describe a recent conversation or meeting. Becky will audit your listening and tell you what signals you missed, what the other person was really saying, and what a leader would have heard and responded to.'
  },
  { week:7,  title:'Disagree Without Damaging',         subtitle:'Professional Disagreement · Composure', color:'#fb923c',
    learn:'Disagreeing professionally is one of the most important leadership skills. This week you learn how to hold your position, push back on bad ideas, and deliver honest feedback — without damaging relationships or losing composure.',
    lesson:'Weak communicators either agree to keep the peace or disagree with visible emotion. Both are failures. The professional disagreement has four parts: acknowledge the other view without validating it, bridge to your position without apologizing, state your position with one clear reason, and hold your ground calmly if challenged. You do not need to win the argument in the room. You need to state your position clearly, back it with a reason, and remain calm under pressure.',
    drill:'This week when you disagree with something — any statement, opinion, or plan — practice saying your disagreement out loud using the four-part structure. Start with low-stakes situations. Work up to professional ones. The goal is that disagreement feels as natural as agreement.',
    phrases:['I see it differently — here is why.','That perspective makes sense. My data points in another direction.','I hear the concern. My recommendation stands.','Let me offer a different view.','Respectfully — I disagree, and here is the reason.'],
    practicePrompt:'Describe a situation where you need to disagree with someone. Tell Becky the context and your actual position. She will write your exact professional disagreement statement — calm, clear, and impossible to dismiss.'
  },
  { week:8,  title:'Command a Meeting as the Leader',   subtitle:'Meeting Leadership · Agenda Control',   color:'#c084fc',
    learn:'Running a meeting as the leader is a complete skill set. This week you learn how to open with authority, control the agenda, manage difficult participants, and close with clear next steps — every time.',
    lesson:'A leader-run meeting follows a clear structure. Open with purpose: state what you are deciding and why it matters today. Run the agenda with time limits and redirect when the group drifts. Manage the room: stop side conversations, bring in quiet voices, and redirect dominant talkers. Close with clarity: summarize every decision, name who owns each action, and state the deadline. When you run meetings this way consistently your team trusts that their time is respected and that decisions actually get made. That trust becomes authority.',
    drill:'This week run at least one meeting — even a 10-minute one — using the full structure: state the purpose, run the agenda, manage the room, close with actions and owners. If you do not have a meeting this week, script one out and practice it out loud.',
    phrases:['Here is what we are deciding today and why it matters.','We have [X] minutes. Let us stay focused.','Let me bring us back to the agenda.','Before we close — let us confirm actions and owners.','This meeting is complete. Here is what was decided and who owns what.'],
    practicePrompt:'Describe an upcoming meeting you need to run or lead. Tell Becky the purpose, who will be in the room, and any challenges you expect. She will write your complete opening statement and closing summary script.'
  },
  { week:9,  title:'Stay Calm Under Pressure',          subtitle:'Composure · Emotional Control',         color:'#2dd4bf',
    learn:'The most visible test of leadership is how you behave when things go wrong, when you are challenged publicly, or when someone tries to make you look bad. This week you develop the composure that turns pressure into authority.',
    lesson:'Emotional reactions in professional settings almost always damage your position — even when you are right. When someone publicly challenges you — the person who stays calm has the power. The person who reacts emotionally has lost it. Use the Three Breath Reset. When you feel the emotional charge rising — before you say anything — take three slow breaths through your nose. This activates your rational brain and prevents the reactive response you will regret. Then speak slowly and quietly — never louder than your normal voice. Quiet authority is more powerful than loud protest.',
    drill:'This week practice the Three Breath Reset in any moment of frustration — in traffic, a difficult conversation, or a stressful situation. Do it 10 times so it becomes automatic. The goal is that under pressure your first response is always the breath — not the word.',
    phrases:['[Breathe. Pause. Speak quietly.] Let me respond to that.','I appreciate the challenge. Here is my position.','I am not going to react to that. Here is what I know.','That is noted. My view remains.','I hear you. And I am comfortable with my recommendation.'],
    practicePrompt:'Describe a recent situation where you felt pressure, were challenged, or lost your composure. Becky will show you what a composed leader would have said and how to handle the same situation next time.'
  },
  { week:10, title:'Phone and Virtual Presence',         subtitle:'Phone Calls · Video Meetings',          color:'#818cf8',
    learn:'Most professional communication now happens on the phone or on video. Your presence in these formats is just as important as in person — and different skills are required.',
    lesson:'On a phone call you have only your voice. Speak at a consistent measured pace. On video calls — look at the camera, not the screen. Most people look at the other person\'s face on screen which means on camera your eyes are pointing down — making you look uncertain. Looking at the camera creates the impression of direct eye contact. Sit upright. Ensure your background is clean and professional. How you appear on camera in the first 10 seconds creates the impression that lasts the entire call.',
    drill:'Before every phone or video call this week — take 30 seconds to prepare. Sit up straight. Take two breaths. Know your first sentence before the call begins. On video — look at the camera. On phone — slow your speaking pace by 20 percent.',
    phrases:['Good morning. Thank you for your time. I have three things to cover.','Let me be direct about why I am calling.','Before I let you go — here is what I need from this call.','I appreciate your time. Here is what we agreed.','Let me look directly at the camera so you can see me clearly.'],
    practicePrompt:'Describe a challenging phone or video call situation you face regularly. Becky will give you the exact opening statement, the structure for the call, and how to close it with authority.'
  },
  { week:11, title:'Speak to Groups and Crowds',         subtitle:'Group Presentations · Public Speaking', color:'#f472b6',
    learn:'Speaking to a group amplifies every communication habit you have. This week you take everything you have learned and apply it to group settings — where authority is established or lost in the first 30 seconds.',
    lesson:'The group presentation has one rule above all others: know your first three sentences perfectly. If you know your opening cold — with no notes, no hesitation — your brain relaxes and everything after flows naturally. Begin before you speak: stand still, make eye contact with someone, take a breath, then speak. Speak to individual people in the room, not to the room as a whole. Move your eye contact deliberately from person to person. This creates the feeling of a personal conversation even in a large group.',
    drill:'Give a 2-minute talk to yourself in a mirror — or record yourself on your phone. Pick any topic. Focus on: standing still, eye contact with camera, no filler words, and knowing your first three sentences without hesitation. Watch it back. Do it twice.',
    phrases:['Good morning. I want to share three things with you today.','Let me start with the most important point.','I am going to ask for your attention for the next [X] minutes.','Before I open for questions — let me summarize what we covered.','Thank you. I am happy to take your questions.'],
    practicePrompt:'Describe a group presentation or speaking situation you have coming up. Give Becky the topic, the audience, and what you need to accomplish. She will write your complete opening statement, 3-point structure, and closing — ready to memorize.'
  },
  { week:12, title:'Your Leadership Voice — For Life',   subtitle:'Integration · Daily Practice · Mastery', color:'#00d4aa',
    learn:'Everything you have practiced over 11 weeks now comes together as your permanent leadership communication style. This is not about perfection — it is about consistency.',
    lesson:'You have built 11 communication skills. You enter every room with intention. You speak in structured 3-point statements without weak words. You pause before you speak. You hold the floor when interrupted. You listen for what is beneath the surface. You disagree professionally. You run meetings with structure. You stay composed under pressure. You project authority on phone and video. You own the room when presenting to a group. Now the final skill — consistency. Practice does not make perfect. Practice makes permanent. The leader you are becoming speaks with the same calm authority whether they are talking to one person or one hundred, whether they are confident or nervous.',
    drill:'Write your personal Leadership Communication Standard — 5 commitments about how you will speak going forward. Example: "I will pause before I speak. I will not say just or maybe. I will finish my thoughts when interrupted. I will structure my points in threes. I will stay calm under pressure." Post it where you see it every morning.',
    phrases:['I lead with clarity and calm in every room.','My words carry authority because I choose them deliberately.','I am the same leader whether the room is easy or difficult.','I pause. I think. I speak with intention.','This is my voice. It does not waver.'],
    practicePrompt:'Tell Becky what has changed most for you over this 12-week course and where you still feel challenged. She will give you your personal ongoing development plan to keep building your leadership voice for life.'
  }
];

var mlCurrentWeek  = parseInt(localStorage.getItem('ml_current_week') || '1');
var mlCompletedW   = JSON.parse(localStorage.getItem('ml_completed_weeks') || '[]');
var mlScore        = parseInt(localStorage.getItem('ml_score') || '0');
var mlStreak       = parseInt(localStorage.getItem('ml_streak') || '0');
var mlWordsRemoved = parseInt(localStorage.getItem('ml_words_removed') || '0');
var ML_WEAK_WORDS  = ['just','maybe','i think','kind of','sort of','probably','perhaps','possibly','i feel like','i was wondering','whenever you get a chance','sorry to bother','does that make sense','um','uh','you know','basically','actually','literally','i was hoping'];

function mlUpdateScore() {
  var s=document.getElementById('ml-score'),st=document.getElementById('ml-streak'),w=document.getElementById('ml-words-removed');
  if(s) s.textContent=mlScore; if(st) st.textContent=mlStreak; if(w) w.textContent=mlWordsRemoved;
  var pct=Math.min(100,Math.round((mlCompletedW.length/12)*100));
  var bar=document.getElementById('ml-progress-bar'),lbl=document.getElementById('ml-progress-label');
  if(bar) bar.style.width=Math.max(8,pct)+'%';
  if(lbl) lbl.textContent='Week '+mlCurrentWeek+' of 12';
}

function mlRenderWeek() {
  var w=ML_WEEKS[mlCurrentWeek-1]; if(!w) return;
  var hdr=document.getElementById('ml-week-header');
  if(hdr) hdr.style.background='linear-gradient(135deg,'+w.color+','+w.color+'cc)';
  var wn=document.getElementById('ml-week-number'),wt=document.getElementById('ml-week-title'),ws=document.getElementById('ml-week-subtitle');
  if(wn) wn.textContent='WEEK '+w.week+' OF 12'+(mlCompletedW.includes(w.week)?' ✅':'');
  if(wt) wt.textContent=w.title;
  if(ws) ws.textContent=w.subtitle;
  var wl=document.getElementById('ml-week-learn'),wls=document.getElementById('ml-week-lesson'),wd=document.getElementById('ml-week-drill'),wpl=document.getElementById('ml-week-prompt-label');
  if(wl)  wl.textContent=w.learn;
  if(wls) wls.textContent=w.lesson;
  if(wd)  wd.textContent=w.drill;
  if(wpl) wpl.textContent=w.practicePrompt;
  var ph=document.getElementById('ml-week-phrases');
  if(ph) ph.innerHTML=w.phrases.map(p=>`<div style="background:rgba(52,211,153,.08);border:1px solid rgba(52,211,153,.2);border-radius:8px;padding:10px 14px;font-size:13px;color:#fff;font-style:italic;line-height:1.6">"${esc(p)}"</div>`).join('');
  var btn=document.getElementById('ml-complete-btn');
  if(btn){btn.style.background=mlCompletedW.includes(w.week)?'#34d399':'#f5c518';btn.textContent=mlCompletedW.includes(w.week)?'✅ Week Complete — Move to Next Week →':'✅ Mark Week Complete — Next Week →';}
  var dots=document.getElementById('ml-week-dots');
  if(dots) dots.innerHTML=ML_WEEKS.map((wk,i)=>{var n=i+1,done=mlCompletedW.includes(n),curr=n===mlCurrentWeek,bg=done?'#00d4aa':curr?'#f5c518':'var(--bg3)',border=curr?'2px solid #f5c518':'none';return `<div onclick="mlGoToWeek(${esc(n)})" style="width:28px;height:28px;border-radius:50%;background:${esc(bg)};border:${esc(border)};display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:10px;font-weight:700;color:${done||curr?'#000':'var(--muted)'};">${done?'✓':n}</div>`;}).join('');
  var pi=document.getElementById('ml-practice-input');if(pi) pi.value='';
  var pr=document.getElementById('ml-practice-result');if(pr) pr.style.display='none';
  mlUpdateScore();
}

function mlGoToWeek(n){mlCurrentWeek=n;localStorage.setItem('ml_current_week',String(n));mlRenderWeek();}
function mlNextWeek(){if(mlCurrentWeek<12){mlCurrentWeek++;localStorage.setItem('ml_current_week',String(mlCurrentWeek));mlRenderWeek();}}
function mlPrevWeek(){if(mlCurrentWeek>1){mlCurrentWeek--;localStorage.setItem('ml_current_week',String(mlCurrentWeek));mlRenderWeek();}}

function mlCompleteWeek(){
  if(!mlCompletedW.includes(mlCurrentWeek)) mlCompletedW.push(mlCurrentWeek);
  mlScore+=100; mlStreak++;
  localStorage.setItem('ml_completed_weeks',JSON.stringify(mlCompletedW));
  localStorage.setItem('ml_score',String(mlScore));
  localStorage.setItem('ml_streak',String(mlStreak));
  setSt('ml-complete-st','ok','✅ Week '+mlCurrentWeek+' complete! Moving to Week '+Math.min(mlCurrentWeek+1,12)+'...');
  setTimeout(()=>{if(mlCurrentWeek<12){mlCurrentWeek++;localStorage.setItem('ml_current_week',String(mlCurrentWeek));}mlRenderWeek();hideSt('ml-complete-st');},1500);
}

async function mlPractice(){
  var input=document.getElementById('ml-practice-input')?.value?.trim();
  if(!input){setSt('ml-practice-st','err','Type or paste your practice first.');return;}
  setSt('ml-practice-st','i','Becky is coaching you...');
  var w=ML_WEEKS[mlCurrentWeek-1];
  var prompt=`You are an elite Executive Communication and Leadership Coach.

CURRENT COURSE WEEK: Week ${esc(mlCurrentWeek)} — "${esc(w.title)}" (${esc(w.subtitle)})

The student is practicing this week\'s skill. Here is what they submitted:
${esc(input)}

Give specific, practical coaching feedback focused on Week ${esc(mlCurrentWeek)}\'s skill: ${esc(w.title)}.

Structure your feedback as:
WHAT YOU DID WELL: [specific praise]
WHAT TO IMPROVE: [specific issue with this week\'s focus]
THE STRONGER VERSION: [rewrite or specific script they can use]
ONE THING TO PRACTICE: [single actionable drill for today]

Be direct, encouraging, and specific.`;
  try{
    var result=await groqCall(prompt,'You are an elite executive communication coach. Be direct, specific, and practical.');
    var pr=document.getElementById('ml-practice-result');
    if(pr){pr.style.display='block';pr.innerHTML=result.replace(/\n/g,'<br>');}
    mlScore+=25;localStorage.setItem('ml_score',String(mlScore));mlUpdateScore();hideSt('ml-practice-st');
  }catch(err){setSt('ml-practice-st','err','Error: '+err.message);}
}

async function mlRewrite(){
  var draft=document.getElementById('ml-draft')?.value?.trim();
  if(!draft){setSt('ml-rewrite-st','err','Paste your draft first.');return;}
  setSt('ml-rewrite-st','i','Becky is rewriting...');
  var lc=draft.toLowerCase();
  var weakFound=ML_WEAK_WORDS.filter(w=>lc.includes(w));
  var prompt=`You are an Executive Communication Coach. Rewrite this statement so it sounds like a confident, authoritative leader said it.

RULES: Remove ALL weak words (${esc(ML_WEAK_WORDS.slice(0,8).join(', '))}...). Use active voice. Be direct. Keep the same core message but make it 30-50% shorter and far more powerful.

ORIGINAL: ${esc(draft)}

Return ONLY the rewritten version. No explanation. Just the new statement.`;
  try{
    var result=await groqCall(prompt,'You are an executive communication coach. Be ruthlessly direct about removing weak language.');
    var rw=document.getElementById('ml-rewrite-result'),rt=document.getElementById('ml-rewrite-text'),wc=document.getElementById('ml-weak-count');
    if(rw)rw.style.display='block';if(rt)rt.textContent=result;
    var removed=weakFound.length;mlWordsRemoved+=removed;mlScore+=removed*10;
    localStorage.setItem('ml_score',String(mlScore));localStorage.setItem('ml_words_removed',String(mlWordsRemoved));
    if(wc)wc.textContent=removed>0?'🎯 '+removed+' weak word pattern'+(removed>1?'s':'')+' removed — +'+(removed*10)+' pts':'✅ No obvious weak words found — good work!';
    mlUpdateScore();hideSt('ml-rewrite-st');
  }catch(err){setSt('ml-rewrite-st','err','Error: '+err.message);}
}

function mlCopyRewrite(){var t=document.getElementById('ml-rewrite-text')?.textContent||'';navigator.clipboard.writeText(t).catch(()=>{});alert('✅ Copied!');}

async function mlControlScript(){
  var situation=document.getElementById('ml-situation')?.value?.trim();
  if(!situation){setSt('ml-control-st','err','Describe your situation first.');return;}
  setSt('ml-control-st','i','Becky is writing your control script...');
  var prompt=`You are an elite executive communication coach.
SITUATION: ${esc(situation)}
Write EXACTLY 3 sentences to take back control. Sentence 1: Acknowledge without frustration. Sentence 2: Reclaim the floor calmly. Sentence 3: Move forward decisively.
TONE: Calm. Authoritative. Professional. Never aggressive.
Return ONLY the 3 sentences numbered 1. 2. 3. Nothing else.`;
  try{
    var result=await groqCall(prompt,'You are an elite executive communication coach. Write precise 3-sentence scripts only.');
    var cr=document.getElementById('ml-control-result'),ct=document.getElementById('ml-control-text');
    if(cr)cr.style.display='block';if(ct)ct.innerHTML=result.replace(/\n/g,'<br>');
    mlScore+=30;mlStreak++;localStorage.setItem('ml_score',String(mlScore));localStorage.setItem('ml_streak',String(mlStreak));
    mlUpdateScore();hideSt('ml-control-st');
  }catch(err){setSt('ml-control-st','err','Error: '+err.message);}
}

function mlCopyControl(){var t=document.getElementById('ml-control-text')?.textContent||'';navigator.clipboard.writeText(t).catch(()=>{});alert('✅ Script copied! Read it 3 times out loud before your next meeting.');}

async function mlCustomCoach(){
  var situation=document.getElementById('ml-custom-situation')?.value?.trim();
  if(!situation){setSt('ml-custom-st','err','Describe your specific situation first.');return;}
  setSt('ml-custom-st','i','Becky is building your coaching plan...');
  var prompt=`You are an elite Executive Communication and Leadership Coach with 30 years experience coaching CEOs and senior leaders.
SITUATION: ${esc(situation)}
Provide a SPECIFIC, PRACTICAL coaching plan:
THE CORE PROBLEM: [2-3 sentences naming exactly what communication challenge is happening]
YOUR MINDSET SHIFT: [The one mental reframe they need — short and powerful]
YOUR EXACT WORDS: [3-5 exact sentences or scripts to memorize and use word-for-word]
HOW TO DELIVER IT: [Specific vocal and physical delivery instructions]
YOUR 7-DAY PRACTICE PLAN: [Day-by-day specific actions]
THE ONE THING TO REMEMBER: [Single powerful sentence summarizing the coaching]
Be direct. Be specific. No generic advice.`;
  try{
    var result=await groqCall(prompt,'You are an elite executive communication coach. Be direct, specific, and give practical word-for-word scripts.');
    var cr=document.getElementById('ml-custom-result'),ct=document.getElementById('ml-custom-text');
    if(cr)cr.style.display='block';if(ct)ct.innerHTML=result.replace(/\n/g,'<br>');
    mlScore+=40;localStorage.setItem('ml_score',String(mlScore));mlUpdateScore();hideSt('ml-custom-st');
  }catch(err){setSt('ml-custom-st','err','Error: '+err.message);}
}

function mlCopyCustom(){var t=document.getElementById('ml-custom-text')?.textContent||'';navigator.clipboard.writeText(t).catch(()=>{});alert('✅ Coaching plan copied!');}

function mlListening(){} // kept for compatibility — use mlPractice now

var _navForNewModules=nav;
nav=function(id){
  _navForNewModules(id);
  if(id==='aimastery')  aimRender();
  if(id==='microlearn') { mlUpdateScore(); mlRenderWeek(); }
  if(id==='appbuilder') abRenderHistory();
  if(id==='calendar')   { buildCal(); }
};

// VIDEO STUDIO TRAINING COURSE — JavaScript
// ═══════════════════════════════════════════════════════════════════════════

var trsCompleted = JSON.parse(localStorage.getItem('hev4_trs_completed') || '[]');

function trsExpand(n) {
  var body  = document.getElementById('trs-body-' + n);
  var arrow = document.getElementById('trs-arrow-' + n);
  if (!body) return;
  var isOpen = body.style.display !== 'none';
  // Close all
  [1,2,3,4,5].forEach(i => {
    var b = document.getElementById('trs-body-' + i);
    var a = document.getElementById('trs-arrow-' + i);
    if (b) b.style.display = 'none';
    if (a) a.style.transform = 'rotate(0deg)';
  });
  // Toggle clicked
  if (!isOpen) {
    body.style.display = 'block';
    if (arrow) arrow.style.transform = 'rotate(90deg)';
  }
}

function trsComplete(n, event) {
  if (event) event.stopPropagation();
  if (!trsCompleted.includes(n)) trsCompleted.push(n);
  localStorage.setItem('hev4_trs_completed', JSON.stringify(trsCompleted));
  trsUpdateProgress();
  // Auto-open next lesson
  var next = n + 1;
  if (next <= 5) {
    trsExpand(next);
    // Scroll to next lesson smoothly
    setTimeout(() => {
      var el = document.getElementById('trs-body-' + next);
      if (el) el.scrollIntoView({ behavior:'smooth', block:'start' });
    }, 300);
  }
}

function trsToggle(n) {
  if (trsCompleted.includes(n)) {
    trsCompleted = trsCompleted.filter(i => i !== n);
  } else {
    trsCompleted.push(n);
  }
  localStorage.setItem('hev4_trs_completed', JSON.stringify(trsCompleted));
  trsUpdateProgress();
}

function trsUpdateProgress() {
  var count = trsCompleted.length;
  var pct   = (count / 5) * 100;
  var bar   = document.getElementById('trs-bar');
  var pctEl = document.getElementById('trs-pct');
  if (bar)   bar.style.width = pct + '%';
  if (pctEl) pctEl.textContent = count + ' / 5 complete';

  // Update segment bars and lesson icons
  [1,2,3,4,5].forEach(n => {
    var seg  = document.getElementById('trb-' + n);
    var icon = document.getElementById('trs-icon-' + n);
    var done = trsCompleted.includes(n);
    var colors = ['#a78bfa','var(--gold)','var(--teal)','var(--blue)','var(--green)'];
    if (seg)  seg.style.background  = done ? colors[n-1] : 'var(--bg3)';
    if (icon) icon.textContent = done ? '✅' : ['📋','🗂','✏️','🚀','💾'][n-1];
  });
}

// Init on nav to training page
var _navForTrs = nav;
nav = function(id) {
  _navForTrs(id);
  if (id === 'vstraining') {
    trsCompleted = JSON.parse(localStorage.getItem('hev4_trs_completed') || '[]');
    trsUpdateProgress();
  }
};


// ── FreeStack server status check ─────────────────────────────────────────
async function vsCheckFreeStack() {
  var el = document.getElementById('freestack-st');
  if(el) { el.className='st'; el.style.color='var(--muted)'; el.textContent='🔍 Checking FreeStack Video server...'; }
  try {
    var resp = await Promise.race([
      fetch('https://freestack-video.onrender.com/healthz'),
      new Promise((_,rej)=>setTimeout(()=>rej(new Error('timeout after 10 seconds')),10000))
    ]);
    if(resp.ok) {
      var data = await resp.json().catch(()=>({}));
      if(el){ el.className='st ok'; el.textContent='✅ FreeStack Video is ONLINE and ready! Queue: '+(data.queue||0)+' jobs.'; }
    } else {
      if(el){ el.className='st err'; el.textContent='⚠️ FreeStack server responded with error '+resp.status+'. Check Render.com dashboard.'; }
    }
  } catch(e) {
    if(el){ el.className='st err'; el.textContent='❌ FreeStack is OFFLINE. '+e.message+'. Go to Render.com → freestack-video → Deploy or Resume the service.'; }
  }
}

function vsGoToScript() {
  if (!vsCurrentTemplate) { alert('Please select a template first — tap one of the four cards above.'); return; }
  vsTab('content');
}

function vsUpdateDurLabel() {
  var val = parseInt(document.getElementById('vs-duration')?.value) || 1;
  var el  = document.getElementById('vs-dur-label');
  if (el) el.textContent = val + (val === 1 ? ' min' : ' mins');
  vsUpdateDuration();
}

function vsCountWords() {
  var script = (document.getElementById('vs-script')?.value || '').trim();
  var words  = script ? script.split(/\s+/).filter(Boolean).length : 0;
  var dur    = parseInt(document.getElementById('vs-duration')?.value) || 1;
  var target = Math.round(dur * 60 * 2.5);
  var wc     = document.getElementById('vs-wordcount-display');
  var wt     = document.getElementById('vs-wordcount-target');
  if (wc) { wc.textContent = words + ' words'; wc.style.color = words >= target*0.7 ? 'var(--green)' : 'var(--muted)'; }
  if (wt) wt.textContent   = 'Target: ~' + target + ' words for ' + dur + ' min';
}

// ── Auto-Publish hook — inactive, ready for future connection ─────────────
// function avToAutoPublish(videoUrl) {
//   localStorage.setItem('hev4_av_inject_url', videoUrl);
//   nav('videostudio');
//   alert('Video sent to Auto-Publish Pipeline!');
// }

function vsTab(id) {
  ['template','content','media','timeline','render','deliver'].forEach(t => {
    var panel = document.getElementById('vs-' + t);
    var tab   = document.getElementById('vstab-' + t);
    if (panel) panel.style.display = (t === id) ? 'block' : 'none';
    if (tab) {
      tab.style.color = (t===id) ? '#a78bfa' : 'var(--muted)';
      tab.style.borderBottomColor = (t===id) ? '#a78bfa' : 'transparent';
    }
  });
  if (id==='render')  vsUpdateRenderSummary();
  if (id==='deliver') vsUpdateDeliverUrl();
  if (id==='timeline') vsRenderScenes();
}

function vsSelectTemplate(type, label) {
  vsCurrentTemplate = type;
  document.querySelectorAll('.vs-tmpl').forEach(el => { el.style.borderColor='var(--border)'; el.style.background='var(--bg3)'; });
  var clicked = event?.target?.closest('.vs-tmpl');
  if (clicked) { clicked.style.borderColor='#a78bfa'; clicked.style.background='rgba(167,139,250,.1)'; }
  var msg = document.getElementById('vs-tmpl-selected');
  if (msg) { msg.style.display='block'; msg.textContent='✅ Template selected: '+label+' — tap Next to fill in content.'; }
  vsLoadDefaultScenes(type);
}

function vsLoadDefaultScenes(type) {
  var defaults = {
    promo:       [{name:'Opening Hook',dur:60},{name:'Problem Statement',dur:60},{name:'Solution Introduction',dur:90},{name:'Product/Service Demo',dur:90},{name:'Benefits & Proof',dur:60},{name:'Call to Action',dur:60}],
    showcase:    [{name:'Product Introduction',dur:60},{name:'Feature 1',dur:60},{name:'Feature 2',dur:60},{name:'Live Demo',dur:90},{name:'Benefits',dur:60},{name:'Pricing & Offer',dur:45},{name:'Call to Action',dur:45}],
    explainer:   [{name:'Title & Hook',dur:45},{name:'Problem Overview',dur:60},{name:'Step 1',dur:75},{name:'Step 2',dur:75},{name:'Step 3',dur:75},{name:'Results & Proof',dur:60},{name:'Summary',dur:45},{name:'CTA',dur:45}],
    brand:       [{name:'Brand Introduction',dur:60},{name:'Our Mission',dur:75},{name:'Services Overview',dur:90},{name:'Why Choose Us',dur:75},{name:'Team & Trust',dur:60},{name:'Contact & CTA',dur:60}],
    testimonial: [{name:'Client Introduction',dur:60},{name:'Their Challenge',dur:75},{name:'Our Solution',dur:75},{name:'The Results',dur:75},{name:'Recommendation & CTA',dur:75}],
    blank:       [{name:'Scene 1',dur:60},{name:'Scene 2',dur:60},{name:'Scene 3',dur:60},{name:'Scene 4',dur:60},{name:'Scene 5',dur:60}]
  };
  vsScenes = (defaults[type]||defaults.blank).map((s,i) => ({id:'sc'+Date.now()+i,name:s.name,dur:s.dur,content:'',notes:''}));
}

function vsAddScene() {
  vsScenes.push({id:'sc'+Date.now(),name:'New Scene',dur:60,content:'',notes:''});
  vsRenderScenes();
}

function vsDeleteScene(id) {
  vsScenes = vsScenes.filter(s=>s.id!==id);
  vsRenderScenes();
}

function vsRenderScenes() {
  var el = document.getElementById('vs-scenes-list');
  if (!el) return;
  if (!vsScenes.length) {
    el.innerHTML='<div style="text-align:center;padding:30px;color:var(--muted);font-size:13px">No scenes yet. Select a template or tap + Add Scene.</div>';
    vsUpdateDuration(); return;
  }
  el.innerHTML = vsScenes.map((sc,i) => `
    <div style="background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:12px;margin-bottom:8px;border-left:3px solid #a78bfa">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <div style="font-size:11px;font-weight:700;color:#a78bfa;min-width:24px">S${esc(i+1)}</div>
        <input value="${esc(sc.name)}" onchange="vsScenes[${esc(i)}].name=this.value" style="flex:1;background:var(--bg2);border:1px solid var(--border);border-radius:6px;padding:6px 10px;color:var(--txt);font-size:13px;font-weight:700;outline:none">
        <input type="number" value="${esc(sc.dur)}" min="10" max="600" onchange="vsScenes[${esc(i)}].dur=parseInt(this.value)||60;vsUpdateDuration()" style="width:60px;background:var(--bg2);border:1px solid var(--border);border-radius:6px;padding:6px 8px;color:var(--teal);font-size:12px;font-weight:700;outline:none;text-align:center">
        <span style="font-size:11px;color:var(--muted)">sec</span>
        <button onclick="vsDeleteScene('${esc(sc.id)}')" style="background:none;border:none;color:var(--red);cursor:pointer;font-size:14px;padding:4px">✕</button>
      </div>
      <textarea onchange="vsScenes[${esc(i)}].content=this.value" placeholder="Scene content, talking points..." rows="2" style="width:100%;background:var(--bg2);border:1px solid var(--border);border-radius:6px;padding:8px 10px;color:var(--txt);font-size:12px;outline:none;resize:vertical;line-height:1.6">${esc(sc.content)}</textarea>
    </div>`).join('');
  vsUpdateDuration();
}

function vsUpdateDuration() {
  var total  = vsScenes.reduce((s,sc)=>s+(parseInt(sc.dur)||0),0);
  var target = (parseInt(document.getElementById('vs-duration')?.value)||5)*60;
  var pct    = Math.min(100,(total/target)*100);
  var mins   = Math.floor(total/60), secs = total%60;
  var el=document.getElementById('vs-total-dur'), bar=document.getElementById('vs-dur-bar'), msg=document.getElementById('vs-dur-msg');
  if(el)  el.textContent = mins+':'+String(secs).padStart(2,'0');
  if(bar) { bar.style.width=pct+'%'; bar.style.background=total>=target?'var(--green)':'var(--teal)'; }
  if(msg) {
    var rem=Math.max(0,target-total), rMins=Math.floor(rem/60), rSecs=rem%60;
    msg.textContent = total>=target ? '✅ Target duration reached!' : `Need ${esc(rMins)}:${esc(String(rSecs).padStart(2,'0'))} more to reach ${esc(target/60)}-minute target`;
    msg.style.color = total>=target ? 'var(--green)' : 'var(--muted)';
  }
}

function vsMediaUpload(type) { document.getElementById('vs-'+type+'-file')?.click(); }
function vsFileChosen(type,inp) { var el=document.getElementById('vs-'+type+'-name'); if(el&&inp.files[0]) el.textContent='✅ '+inp.files[0].name; }

function vsUpdateRenderSummary() {
  var el=document.getElementById('vs-render-summary'); if(!el) return;
  var proj=document.getElementById('vs-project-name')?.value||'Untitled';
  var client=document.getElementById('vs-client-name')?.value||'No client set';
  var dur=document.getElementById('vs-duration')?.value||'5';
  var title=document.getElementById('vs-title')?.value||'No title set';
  var cta=document.getElementById('vs-cta')?.value||'No CTA set';
  var totalSec=vsScenes.reduce((s,sc)=>s+(parseInt(sc.dur)||0),0);
  var totMins=Math.floor(totalSec/60);
  var ready=totalSec>=parseInt(dur)*60;
  el.innerHTML=`<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
    <div style="background:var(--bg3);border-radius:6px;padding:10px"><div style="font-size:10px;color:var(--muted);font-weight:700;margin-bottom:4px">PROJECT</div><div style="font-weight:700">${esc(proj)}</div></div>
    <div style="background:var(--bg3);border-radius:6px;padding:10px"><div style="font-size:10px;color:var(--muted);font-weight:700;margin-bottom:4px">CLIENT</div><div style="font-weight:700">${esc(client)}</div></div>
    <div style="background:var(--bg3);border-radius:6px;padding:10px"><div style="font-size:10px;color:var(--muted);font-weight:700;margin-bottom:4px">TEMPLATE</div><div style="font-weight:700">${esc((vsCurrentTemplate||'none').toUpperCase())}</div></div>
    <div style="background:var(--bg3);border-radius:6px;padding:10px"><div style="font-size:10px;color:var(--muted);font-weight:700;margin-bottom:4px">DURATION</div><div style="font-weight:700">${esc(vsScenes.length)} scenes · ${esc(totMins)} min</div></div>
    <div style="background:var(--bg3);border-radius:6px;padding:10px;grid-column:1/-1"><div style="font-size:10px;color:var(--muted);font-weight:700;margin-bottom:4px">TITLE</div><div>${esc(title)}</div></div>
    <div style="background:var(--bg3);border-radius:6px;padding:10px;grid-column:1/-1"><div style="font-size:10px;color:var(--muted);font-weight:700;margin-bottom:4px">CTA</div><div>${esc(cta)}</div></div>
  </div>
  <div style="margin-top:10px;padding:10px;border-radius:6px;background:${ready?'rgba(52,211,153,.1)':'rgba(248,113,113,.1)'};border:1px solid ${ready?'var(--green)':'var(--red)'};font-size:12px;font-weight:700;color:${ready?'var(--green)':'var(--red)'}">
    ${ready?'✅ Ready to render! Duration target met.':'⚠️ Duration not yet met — add more scenes before rendering.'}
  </div>`;
}

async function vsRenderProject() {
  var proj  = document.getElementById('vs-project-name')?.value?.trim() || 'Untitled Project';
  var title = document.getElementById('vs-title')?.value?.trim()         || proj;
  var dur   = parseInt(document.getElementById('vs-duration')?.value)     || 1;

  if (!vsScenes.length) { setSt('vs-render-st','err','Add scenes before rendering.'); return; }
  var totalSec = vsScenes.reduce((s,sc)=>s+(parseInt(sc.dur)||0),0);
  if (totalSec < 60)   { setSt('vs-render-st','err','Minimum 1 minute — add more scenes.'); return; }
  if (totalSec > 1800) { setSt('vs-render-st','err','Maximum 30 minutes — shorten or remove scenes.'); return; }

  document.getElementById('vs-render-status-wrap').style.display = 'block';
  document.getElementById('vs-render-result').style.display       = 'none';
  document.getElementById('vs-render-btn').disabled = true;
  document.getElementById('vs-render-btn').textContent = '⏳ Rendering...';

  vsRenderStep(1,'running','Building video timeline...');
  setSt('vs-render-st','i','Connecting to render server...');

  var cta       = document.getElementById('vs-cta')?.value || '';
  var safeTitle = title.replace(/['"<>]/g,'').substring(0,55);

  // Build scene list
  var fsScenes = [];
  fsScenes.push({ type:'title-card', duration:5, title:safeTitle, subtitle:'AffiliateMediaHub Studio', background:'#0c0f1a' });
  vsScenes.forEach((sc,i) => {
    var sceneDur = Math.max(5, parseInt(sc.dur)||30);
    var sd2 = { type:'text', duration:sceneDur, background:'#0d1520' };
    if(i===0){ sd2.type='lower-third'; sd2.name=proj; sd2.role='AffiliateMediaHub Studio'; sd2.text=sc.content||sc.name; }
    else if(sc.content){ sd2.text=sc.content.substring(0,150); sd2.title=sc.name; }
    else { sd2.title=sc.name; }
    fsScenes.push(sd2);
  });
  if(cta) fsScenes.push({type:'cta',duration:6,cta:cta,background:'#0a1a14'});
  else    fsScenes.push({type:'title-card',duration:4,title:'AffiliateMediaHub Studio',subtitle:'affiliatemediahub@gmail.com',background:'#0c0f1a'});

  var fsPayload = { timeline:{background:'#0c0f1a',scenes:fsScenes}, output:{format:'mp4',resolution:'720p',fps:30} };

  vsRenderStep(1,'done','Timeline built — ' + fsScenes.length + ' scenes');

  // ── Try FreeStack Video first ─────────────────────────────────────────
  var fsWorking = false;
  try {
    vsRenderStep(2,'running','Checking FreeStack Video server...');
    var ping = await Promise.race([
      fetch(HE_CONFIG.EDIT_URL + '/healthz', {method:'GET'}),
      new Promise((_,rej) => setTimeout(()=>rej(new Error('timeout')), 8000))
    ]);
    if(ping.ok) fsWorking = true;
  } catch(e) {
    fsWorking = false;
  }

  // ── FreeStack path ────────────────────────────────────────────────────
  if(fsWorking) {
    try {
      vsRenderStep(2,'running','FreeStack Video online — sending job...');
      var sr = await fetch(HE_CONFIG.EDIT_URL + '/render', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify(fsPayload)
      });
      if(!sr.ok) { var e=await sr.text(); throw new Error('FreeStack '+sr.status+': '+e.substring(0,150)); }
      var sd = await sr.json();
      var rid = sd.id || sd.response?.id;
      if(!rid) throw new Error('No job ID from FreeStack');
      vsRenderStep(2,'running','FreeStack job started — polling...');
      for(var p=0;p<36;p++){
        await new Promise(r=>setTimeout(r,10000));
        var pr=await fetch(HE_CONFIG.EDIT_URL+'/render/'+rid);
        var pd=await pr.json();
        if(pd.status==='done'&&pd.url){
          vsRenderStep(2,'done','FreeStack rendered!'); vsRenderStep(3,'done','Complete — no watermark!');
          vsRenderUrl=pd.url; vsSaveToHistory(proj,pd.url); vsShowRenderResult(pd.url);
          setSt('vs-render-st','ok','✅ Video ready! Rendered by FreeStack Video — no watermark.');
          document.getElementById('vs-render-btn').disabled=false;
          document.getElementById('vs-render-btn').textContent='🔄 Re-Render';
          return;
        }
        if(pd.status==='failed') throw new Error('FreeStack render failed: '+(pd.error||'unknown'));
        vsRenderStep(2,'running','FreeStack status: '+(pd.status||'rendering')+' ('+( p+1)+'/36)');
      }
      throw new Error('FreeStack timed out');
    } catch(err) {
      vsRenderStep(2,'error','FreeStack error: '+err.message+' — trying Shotstack fallback...');
    }
  }

  // ── Shotstack fallback ────────────────────────────────────────────────
  var ssKey = apGetKey('ss_key');
  if(!ssKey) {
    vsRenderStep(2,'error','FreeStack server not reachable');
    vsRenderStep(3,'error','No fallback available');
    setSt('vs-render-st','err',
      'FreeStack Video server is not running yet. '+
      'To fix: (1) Deploy freestack-video repo to Render.com, OR '+
      '(2) Go to Settings and add your Shotstack API key as a temporary fallback.'
    );
    document.getElementById('vs-render-btn').disabled=false;
    document.getElementById('vs-render-btn').textContent='🔄 Retry';
    return;
  }

  // Build Shotstack timeline from same scenes
  vsRenderStep(2,'running','Using Shotstack fallback (watermarked)...');
  try {
    var W=1280, H=720, FPS=30;
    var tracks=[];
    var sceneOffset=0;
    var bgClips=fsScenes.map(sc=>{
      var clip={asset:{type:'html',html:'<p style="background:'+( sc.background||'#0c0f1a')+';width:1280px;height:720px"></p>',width:1280,height:720},start:sceneOffset,length:sc.duration||5,fit:'cover'};
      sceneOffset+=sc.duration||5; return clip;
    });
    tracks.push({clips:bgClips});
    tracks.push({clips:[{asset:{type:'html',html:'<p style="font-family:Georgia,serif;color:#00d4aa;font-size:20px;font-weight:900;text-align:center;letter-spacing:3px">AffiliateMediaHub Studio</p>',width:900,height:50},start:0,length:totalSec+9,position:'top',offset:{x:0,y:-0.47},transition:{in:'fade',out:'fade'}}]});
    tracks.push({clips:[{asset:{type:'html',html:'<p style="font-family:Georgia,serif;font-size:44px;font-weight:900;color:#fff;text-align:center;padding:0 60px;line-height:1.2">'+safeTitle+'</p>',width:1200,height:180},start:0.5,length:5,position:'center',transition:{in:'slideUp',out:'fade'}}]});
    if(cta) tracks.push({clips:[{asset:{type:'html',html:'<p style="font-family:Georgia,serif;font-size:36px;font-weight:900;color:#f5c518;text-align:center;padding:16px">'+cta+'</p>',width:1100,height:120},start:Math.max(0,totalSec-6),length:6,position:'center',transition:{in:'slideUp',out:'fade'}}]});

    var timeline={background:'#0c0f1a',tracks};
    var output={format:'mp4',resolution:'hd',fps:FPS,size:{width:W,height:H}};

    var sr2=await fetch('https://api.shotstack.io/edit/stage/render',{
      method:'POST',
      headers:{'x-api-key':ssKey,'Content-Type':'application/json'},
      body:JSON.stringify({timeline,output})
    });
    if(!sr2.ok){var e2=await sr2.text();throw new Error('Shotstack '+sr2.status+': '+e2.substring(0,150));}
    var sd2=await sr2.json();
    var rid2=sd2.response?.id||sd2.id;
    if(!rid2) throw new Error('No Shotstack render ID');
    vsRenderStep(2,'running','Shotstack job: '+rid2.substring(0,8)+' — polling...');
    for(var p2=0;p2<30;p2++){
      await new Promise(r=>setTimeout(r,10000));
      var pr2=await fetch('https://api.shotstack.io/edit/stage/render/'+rid2,{headers:{'x-api-key':ssKey}});
      var pd2=await pr2.json();
      var status2=pd2.response?.status||pd2.status;
      var url2=pd2.response?.url||pd2.url;
      vsRenderStep(2,'running','Shotstack: '+status2+' ('+(p2+1)+'/30)');
      if(status2==='done'&&url2){
        vsRenderStep(2,'done','Rendered via Shotstack!'); vsRenderStep(3,'done','Complete (watermark shown on free tier)');
        vsRenderUrl=url2; vsSaveToHistory(proj,url2); vsShowRenderResult(url2);
        setSt('vs-render-st','ok','✅ Video ready! (Shotstack fallback — watermark visible on sandbox key. Deploy FreeStack for clean renders.)');
        document.getElementById('vs-render-btn').disabled=false;
        document.getElementById('vs-render-btn').textContent='🔄 Re-Render';
        return;
      }
      if(status2==='failed') throw new Error('Shotstack failed: '+(pd2.response?.error||'unknown'));
    }
    throw new Error('Shotstack timed out');
  } catch(err2) {
    vsRenderStep(3,'error','Render failed: '+err2.message);
    setSt('vs-render-st','err',err2.message);
    document.getElementById('vs-render-btn').disabled=false;
    document.getElementById('vs-render-btn').textContent='🔄 Retry';
  }
}

function vsRenderStep(n,status,msg){
  var colors={running:'var(--blue)',done:'var(--green)',error:'var(--red)',pending:'var(--border)'};
  var badges={running:'⏳ Running',done:'✅ Done',error:'❌ Failed',pending:'Pending'};
  var bgB={running:'rgba(79,142,247,.15)',done:'rgba(52,211,153,.15)',error:'rgba(248,113,113,.15)',pending:'rgba(148,163,184,.1)'};
  var txtB={running:'var(--blue)',done:'var(--green)',error:'var(--red)',pending:'var(--muted)'};
  var w=document.getElementById('vsrs-'+n), m=document.getElementById('vsrs-'+n+'-msg'), b=document.getElementById('vsrs-'+n+'-badge');
  if(w)w.style.borderLeftColor=colors[status];
  if(m)m.textContent=msg;
  if(b){b.textContent=badges[status];b.style.background=bgB[status];b.style.color=txtB[status];}
}

function vsShowRenderResult(url){
  var w=document.getElementById('vs-render-result'),u=document.getElementById('vs-result-url-wrap'),d=document.getElementById('vs-download-btn');
  if(w)w.style.display='block';
  if(u)u.textContent=url;
  if(d)d.onclick=()=>window.open(url,'_blank');
  // Also populate the deliver/save tab
  var pw=document.getElementById('vs-preview-wrap'), pu=document.getElementById('vs-deliver-url');
  if(pw)pw.style.display='block';
  if(pu)pu.textContent=url;
}

function vsCopyRenderUrl(){
  if(!vsRenderUrl)return;
  navigator.clipboard.writeText(vsRenderUrl).catch(()=>{});
  setSt('vs-render-st','ok','✅ URL copied!');
}

function vsUpdateDeliverUrl(){
  var el=document.getElementById('vs-deliver-url');
  if(el)el.textContent=vsRenderUrl||'No render completed yet';
}

function vsDeliverCopy(){
  if(!vsRenderUrl){alert('No render URL yet.');return;}
  navigator.clipboard.writeText(vsRenderUrl).catch(()=>{});
  alert('✅ Video URL copied!');
}

function vsDeliverEmail(){
  var client=document.getElementById('vs-client-email')?.value||'';
  var proj=document.getElementById('vs-project-name')?.value||'Your Video';
  var msg=document.getElementById('vs-delivery-msg')?.value||'Your video is ready for review.';
  var url=vsRenderUrl||'[VIDEO URL]';
  var body=encodeURIComponent(`${esc(msg)}\n\nVideo Link: ${esc(url)}\n\nThank you,\nJohn Lanter\nAffiliateMediaHub Studio`);
  var subj=encodeURIComponent(`Your Video is Ready — ${esc(proj)}`);
  window.open(`mailto:${esc(client)}?subject=${esc(subj)}&body=${esc(body)}`,'_blank');
}

function vsDeliverWhatsApp(){
  var proj=document.getElementById('vs-project-name')?.value||'Your Video';
  var url=vsRenderUrl||'[VIDEO URL]';
  var msg=encodeURIComponent(`Your video "${esc(proj)}" is ready: ${esc(url)}`);
  window.open(`https://wa.me/?text=${esc(msg)}`,'_blank');
}

function vsStartRevision(){
  var notes=document.getElementById('vs-revision-notes')?.value?.trim();
  if(notes){var n=document.getElementById('vs-notes');if(n)n.value=(n.value+'\n\nREVISION: '+notes).trim();}
  vsTab('content');
}

function vsSaveToHistory(name,url){
  vsProjectHistory.unshift({id:'vp'+Date.now(),name,url,date:new Date().toLocaleString(),scenes:vsScenes.length});
  if(vsProjectHistory.length>20)vsProjectHistory=vsProjectHistory.slice(0,20);
  localStorage.setItem('hev4_vs_history',JSON.stringify(vsProjectHistory));
  vsRenderHistory();
}

function vsSaveProject(){
  var proj=document.getElementById('vs-project-name')?.value?.trim()||'Untitled';
  vsSaveToHistory(proj,vsRenderUrl||'No render yet');
  alert('✅ Project saved!');
}

function vsRenderHistory(){
  var el=document.getElementById('vs-history-list');if(!el)return;
  vsProjectHistory=JSON.parse(localStorage.getItem('hev4_vs_history')||'[]');
  if(!vsProjectHistory.length){el.innerHTML='<div style="font-size:13px;color:var(--muted);text-align:center;padding:20px">No projects saved yet.</div>';return;}
  el.innerHTML=vsProjectHistory.slice(0,10).map(p=>`
    <div style="background:var(--bg3);border-radius:8px;padding:12px;margin-bottom:8px;border-left:3px solid #a78bfa">
      <div style="display:flex;justify-content:space-between;margin-bottom:6px"><div style="font-weight:700;font-size:13px">${esc(p.name)}</div><div style="font-size:11px;color:var(--muted)">${esc(p.date)}</div></div>
      <div style="font-size:11px;color:var(--muted);margin-bottom:6px">${esc(p.scenes)} scenes</div>
      ${p.url&&p.url!=='No render yet'?`<a href="${p.url}" target="_blank" class="btn btn-ghost btn-xs" rel="noopener noreferrer">▶ View Video</a>`:'<span style="font-size:11px;color:var(--muted)">No render URL</span>'}
    </div>`).join('');
}

function vsDuplicateProject(){
  var proj=document.getElementById('vs-project-name');
  if(proj)proj.value=proj.value+' (Copy)';
  vsRenderUrl=null;
  alert('Project duplicated. Edit and re-render when ready.');
  vsTab('template');
}

function vsNewProject(){
  if(!confirm('Start a new project? Unsaved work will be cleared.'))return;
  ['vs-project-name','vs-client-name','vs-title','vs-hook','vs-script','vs-cta','vs-colors','vs-captions','vs-voice','vs-notes','vs-becky-brief'].forEach(id=>{var el=document.getElementById(id);if(el)el.value='';});
  vsScenes=[];vsCurrentTemplate=null;vsRenderUrl=null;
  var msg=document.getElementById('vs-tmpl-selected');if(msg)msg.style.display='none';
  document.querySelectorAll('.vs-tmpl').forEach(el=>{el.style.borderColor='var(--border)';el.style.background='var(--bg3)';});
  var rsw=document.getElementById('vs-render-status-wrap');if(rsw)rsw.style.display='none';
  var rr=document.getElementById('vs-render-result');if(rr)rr.style.display='none';
  vsRenderScenes();vsTab('template');
}

async function vsBeckyScript(){
  var brief=document.getElementById('vs-becky-brief')?.value?.trim();
  if(!brief){setSt('vs-script-st','err','Tell Becky what the video is about first.');return;}

  var dur   = parseInt(document.getElementById('vs-duration')?.value)||1;
  var type  = document.getElementById('vs-video-type')?.value||'promo';
  var words = Math.round(dur*60*2.5);
  var isLong= dur>=10;

  var sceneTemplates = {
    promo:       ['Opening Hook','Problem Statement','Solution Introduction','Demo & Proof','Benefits','Call to Action'],
    explainer:   ['Title & Introduction','What You Will Learn','Step 1','Step 2','Step 3','Results & Summary','Call to Action'],
    showcase:    ['Product Introduction','Feature 1','Feature 2','Live Demo','Customer Benefits','Pricing & Offer','Call to Action'],
    brand:       ['Brand Introduction','Our Mission & Values','Services Overview','Why Choose Us','Team & Trust','Call to Action'],
    testimonial: ['Client Introduction','Their Challenge','Our Solution','The Results','Recommendation & Call to Action'],
    educational: ['Title & Hook','What You Will Learn','Section 1','Section 2','Section 3','Key Takeaways','Call to Action'],
    children:    ['Opening Story Setup','Meet the Characters','The Challenge Begins','The Journey','The Resolution','The Lesson','The Ending'],
    storytelling:['Scene Setting','Introduce Characters','Rising Action','The Challenge','Climax','Resolution','Closing Message'],
    training:    ['Course Overview','Prerequisites','Step 1 Foundation','Step 2 Core Skill','Step 3 Application','Common Mistakes','Summary & Next Steps'],
    documentary: ['Opening Scene','Context & Background','Main Story Part 1','Main Story Part 2','Expert Perspective','Conclusion','Call to Action'],
    business:    ['Executive Summary','The Problem','Our Approach','Results & Data','Implementation Plan','Call to Action'],
    customer:    ['Customer Welcome','Their Goal','Our Solution','How It Works','Next Steps','Call to Action'],
    short:       ['Hook','Core Message','Call to Action'],
    blank:       ['Scene 1','Scene 2','Scene 3','Scene 4','Scene 5']
  };

  var sceneNames = sceneTemplates[type] || sceneTemplates.promo;
  var totalSec   = dur * 60;
  var secPerScene= Math.max(10, Math.floor(totalSec / sceneNames.length));

  setSt('vs-script-st','i','Becky is writing your script AND building your scenes — this may take 30 seconds...');

  var sceneList = sceneNames.map((name,i)=>'Scene '+(i+1)+' — '+name+': [2-3 sentences describing what is shown and what the speaker says in this scene]').join('\n');

  var prompt = 'Write a complete '+dur+'-minute '+type+' video script for AffiliateMediaHub Studio.\n'+
    'Brief: '+brief+'\n'+
    'Target: ~'+words+' words ('+dur+' minutes at 150 wpm)\n'+
    'Scene structure to follow: '+sceneNames.join(' > ')+'\n'+
    (isLong?'This is LONG-FORM. Write detailed content filling the full '+dur+' minutes. Each section should be substantial.\n':'')+
    '\nReturn EXACTLY in this format:\n'+
    'TITLE: [compelling video title]\n'+
    'HOOK: [opening 15-second hook]\n'+
    'SCRIPT: [Full script with labeled sections matching scene names. Label each: [HOOK] [PROBLEM] etc. Use [PAUSE] for breaks.]\n'+
    'CTA: [one clear call to action sentence]\n'+
    'CAPTIONS: [5 key on-screen text phrases, one per line]\n'+
    'SCENES:\n'+sceneList;

  try{
    var result = await groqCall(prompt, BECKY_SYSTEM_PROMPT);

    var get = function(label) {
      var m = result.match(new RegExp(label+':\\s*([\\s\\S]*?)(?=TITLE:|HOOK:|SCRIPT:|CTA:|CAPTIONS:|SCENES:|$)','i'));
      return m ? m[1].trim() : '';
    };

    if(document.getElementById('vs-title'))    document.getElementById('vs-title').value    = get('TITLE')||'';
    if(document.getElementById('vs-hook'))     document.getElementById('vs-hook').value     = get('HOOK')||'';
    if(document.getElementById('vs-script'))   document.getElementById('vs-script').value   = get('SCRIPT')||result;
    if(document.getElementById('vs-cta'))      document.getElementById('vs-cta').value      = get('CTA')||'';
    if(document.getElementById('vs-captions')) document.getElementById('vs-captions').value = get('CAPTIONS')||'';

    // Build vsScenes from Becky's scene output
    var scenesRaw  = get('SCENES') || '';
    var sceneLines = scenesRaw.split('\n').filter(function(l){return l.trim();});
    var newScenes  = [];

    sceneNames.forEach(function(name, i) {
      // Find matching line from Becky
      var match = sceneLines.find(function(l){
        return l.toLowerCase().includes('scene '+(i+1)) || l.toLowerCase().includes(name.toLowerCase().substring(0,8));
      });
      var content = '';
      if(match) {
        var ci = match.indexOf(':');
        content = ci >= 0 ? match.slice(ci+1).trim() : match.replace(/^scene\s+\d+[^:]*:?\s*/i,'').trim();
      }
      newScenes.push({
        id:      'sc'+Date.now()+i,
        name:    name,
        dur:     secPerScene,
        content: content || brief.substring(0,80),
        notes:   ''
      });
    });

    vsScenes = newScenes;
    vsRenderScenes();

    var wc = (get('SCRIPT')||result).split(/\s+/).filter(Boolean).length;
    setSt('vs-script-st','ok','✅ Done! Script: '+wc+' words · Scenes: '+newScenes.length+' built. Tap "3 · Scenes" tab to review timing.');

  }catch(err){ setSt('vs-script-st','err','Error: '+err.message); }
}

var _navForVS=nav;
nav=function(id){
  _navForVS(id);
  if(id==='videostudio'){vsTab('template');vsRenderScenes();vsRenderHistory();}
};

// ═══ CORE NAVIGATION ═══════════════════════════════════════════════════

async function chkPw() {
  var pw = document.getElementById(`pw-input`).value;
  if (await hashHex(pw) === `1638d8499a2e2ee37cb8af71aee3fbfea583b867c7a413ad9cce166f7ee2ebb6`) {
    sessionStorage.setItem(`hev4`, `ok`);
    document.getElementById(`login-screen`).style.display = `none`;
    document.getElementById(`app`).style.display = `block`;
    initApp();
  } else {
    var err = document.getElementById(`pw-err`);
    err.style.display = `block`;
    err.textContent = `Incorrect password. Please try again.`;
    document.getElementById(`pw-input`).value = ``;
    document.getElementById(`pw-input`).focus();
  }
}

function nav(id) {
  document.querySelectorAll(`.page`).forEach(p => p.classList.remove(`active`));
  document.querySelectorAll(`.ni`).forEach(n => n.classList.remove(`active`));
  var pg = document.getElementById(`pg-${esc(id)}`);
  if (pg) pg.classList.add(`active`);
  document.querySelectorAll(`.ni`).forEach(n => {
    if (n.getAttribute(`onclick`) && n.getAttribute(`onclick`).includes(`nav('${esc(id)}')`)) {
      n.classList.add(`active`);
    }
  });
  var LABELS = {
    dashboard:`Dashboard`, employment:`Employment Tracker`, becky:`Becky AI`,
    podcast:`Podcast Studio`, video:`Faceless Video Factory`, business:`Business Team`,
    affiliate:`Affiliate Team`, calendar:`Content Calendar`, brand:`Brand Voice`,
    prompts:`Prompt Library`, skills:`Skills & Automations`, training:`Training Library`,
    files:`Files & Resources`, team:`Team Management`, settings:`Settings`,
    aimastery:`🚀 28-Day AI Mastery`,
    microlearn:`🎯 Micro-Learning — Communication Precision`,
    appbuilder:`🏗 App Builder`,
    aitools:`🛠 AI Tools Grid`,
    vstraining:`🎓 Video Studio Training Course`,
    videostudio:`🎬 Template Video Studio`,
    linkedin:`Daily Blog`, jobfinder:`AI Job Finder`
  };
  document.getElementById(`tbl`).textContent = LABELS[id] || id;
  if (id === `becky`) refreshKeyStatus();
  window.scrollTo(0, 0);
  closeSidebar();
}

function toggleSidebar() {
  document.getElementById(`sidebar`).classList.toggle(`open`);
  document.getElementById(`overlay`).classList.toggle(`on`);
}
function closeSidebar() {
  document.getElementById(`sidebar`).classList.remove(`open`);
  document.getElementById(`overlay`).classList.remove(`on`);
}

function initApp() {
  // ── Pre-loaded Studio API Keys ──────────────────────────────────────────
  // Groq — Becky's brain (REQUIRED for all AI responses)
  if (!localStorage.getItem(`hev4_groq`))
    localStorage.setItem(`hev4_groq`, `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`);
  // ElevenLabs — Becky voice
  if (!localStorage.getItem(`hev4_ap_el_key`))
    localStorage.setItem(`hev4_ap_el_key`, `66b7002dc93af79d6486985b540b45a2b1d6322437de127b5c49f7dff3eea337`);
  // ElevenLabs Becky Voice ID
  if (!localStorage.getItem(`hev4_ap_el_voice`))
    localStorage.setItem(`hev4_ap_el_voice`, `exsUS4vynmxd379XN4yO`);
  // FreeStack Video — no API key needed (own server)
  if (!localStorage.getItem(`hev4_ap_ss_env`))
    localStorage.setItem(`hev4_ap_ss_env`, `production`);
  // ───────────────────────────────────────────────────────────────────────
  updTrDash(); buildCal(); buildPrompts(); buildSkills(); buildTraining(); refreshKeyStatus();
}



// ═══ TRAINING ═══════════════════════════════════════════════════════════

function getTr() { try { return JSON.parse(localStorage.getItem(`hev4_train`) || `{}`); } catch(e) { return {}; } }
function toggleDay(n) {
  var d = getTr();
  d[`d${esc(n)}`] = !d[`d${esc(n)}`];
  localStorage.setItem(`hev4_train`, JSON.stringify(d));
  updTrDash();
  var done = Object.values(d).filter(Boolean).length;
  var pct = Math.round(done / 30 * 100);
  var bar = document.getElementById(`tr-bar`); if (bar) bar.style.width = pct + `%`;
  var pctEl = document.getElementById(`tr-pct`); if (pctEl) pctEl.textContent = pct + `%`;
  var pctEl2 = document.getElementById(`tr-dash`); if (pctEl2) pctEl2.textContent = pct + `%`;
  var doneEl = document.getElementById(`tr-done`); if (doneEl) doneEl.textContent = done;
  // Update strikethrough on the row label
  var lbl = document.getElementById(`dlbl${esc(n)}`);
  if (lbl) lbl.style.textDecoration = d[`d${esc(n)}`] ? `line-through` : `none`;
}
function updTrDash() {
  var done = Object.values(getTr()).filter(Boolean).length;
  var el = document.getElementById(`tr-dash`);
  if (el) el.textContent = Math.round(done / 30 * 100) + `%`;
}
function resetTrain() {
  if (confirm(`Reset all training progress?`)) { localStorage.removeItem(`hev4_train`); location.reload(); }
}

// ═══ BUILD DYNAMIC SECTIONS ═════════════════════════════════════════════

function buildCal() {
  var grid = document.getElementById(`calGrid`);
  if (!grid) return;
  var days = [`Sun`,`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`];
  var sched = {
    0:{lbl:`Rest / Plan`,   sub:`Prep next week content`,          c:`#6b7fa3`, icon:`📝`},
    1:{lbl:`Video Studio`,  sub:`Educational or Story Video`,      c:`#a78bfa`, icon:`🎬`},
    2:{lbl:`28-Day AI`,     sub:`Daily AI Challenge + LinkedIn`,   c:`#00d4aa`, icon:`🚀`},
    3:{lbl:`App Builder`,   sub:`Build or update a gamer app`,     c:`#f59e0b`, icon:`🏗`},
    4:{lbl:`Video Studio`,  sub:`Business or Learning Video`,      c:`#a78bfa`, icon:`🎬`},
    5:{lbl:`Blog + LinkedIn`,sub:`Write post with Becky`,          c:`#34d399`, icon:`✍`},
    6:{lbl:`Review + Plan`, sub:`Review week · Plan next 7 days`,  c:`#f5c518`, icon:`📊`}
  };
  var today = new Date();
  var html = ``;
  for (var i = 0; i < 7; i++) {
    var d = new Date(today); d.setDate(today.getDate() + i);
    var dow = d.getDay();
    var isToday = i === 0;
    var show = sched[dow];
    html += `<div class="cal-day" style="${isToday ? `border-color:var(--teal);background:rgba(0,212,170,.06)` : ``}">`;
    html += `<div class="cal-day-name">${esc(days[dow])}</div>`;
    html += `<div class="cal-date" style="${isToday ? `color:var(--teal);font-weight:900` : ``}">${esc(d.getDate())}</div>`;
    if (show) {
      html += `<div style="font-size:16px;margin:4px 0">${esc(show.icon)}</div>`;
      html += `<div class="cal-pill" style="background:${esc(show.c)}22;color:${esc(show.c)};font-size:10px;font-weight:700;padding:3px 6px;border-radius:6px;margin-bottom:3px">${esc(show.lbl)}</div>`;
      html += `<div style="font-size:9px;color:var(--muted);line-height:1.4">${esc(show.sub)}</div>`;
    }
    html += `</div>`;
  }
  grid.innerHTML = html;
}

async function calBeckyPlan() {
  var topic = document.getElementById('cal-topic')?.value?.trim();
  if (!topic) { setSt('cal-st','err','Tell Becky your focus this week first.'); return; }
  setSt('cal-st','i','Becky is writing your 7-day content plan...');
  var prompt = `Create a detailed 7-day content plan for AffiliateMediaHub Studio.
Focus this week: ${esc(topic)}

For each day include:
- Platform (TikTok, YouTube, LinkedIn, or Instagram)
- Content type (video, post, reel, or article)
- Specific topic title (not generic — make it clickable)
- Opening hook (first sentence)
- Best time to post
- Which Hub Engine tool to use (Video Studio, App Builder, Becky AI, 28-Day AI)

Make it specific, actionable, and realistic for a solo creator.`;

  try {
    var result = await groqCall(prompt, BECKY_SYSTEM_PROMPT);
    var res = document.getElementById('cal-plan-result');
    if (res) { res.style.display = 'block'; res.textContent = result; }
    hideSt('cal-st');
  } catch(err) { setSt('cal-st','err','Error: ' + err.message); }
}
function buildPrompts() {
  var el = document.getElementById(`prompt-cats`);
  if (!el) return;
  var html = ``;
  PROMPTS.forEach(cat => {
    html += `<div class="card mb16">`;
    html += `<div class="sec-title mb12" style="color:${esc(cat.col)}">${esc(cat.cat)}</div>`;
    cat.items.forEach(item => {
      html += `<div style="background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:14px;margin-bottom:10px">`;
      html += `<div class="bold mb8" style="font-size:13px">${esc(item.t)}</div>`;
      html += `<div style="font-size:13px;color:var(--muted);margin-bottom:10px;line-height:1.55">${esc(item.p)}</div>`;
      html += `<div style="display:flex;gap:8px">`;
      html += `<button class="btn btn-ghost btn-sm" data-p="${item.p.replace(/"/g,`&quot;`)}" onclick="cpStr(this.dataset.p)">📋 Copy Prompt</button>`;
      html += `<button class="btn btn-ghost btn-sm" data-p="${item.p.replace(/"/g,`&quot;`)}" onclick="qBecky(this.dataset.p)">🤖 Use with Becky</button>`;
      html += `</div></div>`;
    });
    html += `</div>`;
  });
  el.innerHTML = html;
}

function buildSkills() {
  var el = document.getElementById(`skills-list`);
  if (!el) return;
  var html = ``;
  SKILLS.forEach(sk => {
    html += `<div class="card mb16" style="border-top:3px solid ${esc(sk.col)}">`;
    html += `<div class="sec-title mb12">${esc(sk.title)}</div>`;
    html += `<div>`;
    sk.steps.forEach((step, i) => {
      html += `<div class="skill-step"><div class="step-num">${esc(i+1)}</div><div style="font-size:13px;line-height:1.5">${esc(step)}</div></div>`;
    });
    html += `</div></div>`;
  });
  el.innerHTML = html;
}

function buildTraining() {
  var el = document.getElementById(`training-phases`);
  if (!el) return;
  var d = getTr();
  var totalDone = Object.values(d).filter(Boolean).length;
  var pct = Math.round(totalDone / 30 * 100);
  var bar = document.getElementById(`tr-bar`); if (bar) bar.style.width = pct + `%`;
  var pctEl = document.getElementById(`tr-pct`); if (pctEl) pctEl.textContent = pct + `%`;
  var doneEl = document.getElementById(`tr-done`); if (doneEl) doneEl.textContent = totalDone;
  var dayNum = 0;
  var html = ``;
  TRAINING.forEach(phase => {
    html += `<div class="card mb16">`;
    html += `<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px"><div style="width:12px;height:12px;border-radius:50%;background:${esc(phase.col)}"></div><div class="sec-title mb0" style="color:${esc(phase.col)}">${esc(phase.phase)}</div></div>`;
    phase.days.forEach(task => {
      dayNum++;
      var dn = dayNum;
      var chk = d[`d${esc(dn)}`] ? `checked` : ``;
      var strike = d[`d${esc(dn)}`] ? `text-decoration:line-through;color:var(--muted)` : ``;
      html += `<div class="day-row">`;
      html += `<input type="checkbox" ${esc(chk)} onchange="toggleDay(${esc(dn)})">`;
      html += `<div class="day-num">Day ${esc(dn)}</div>`;
      html += `<div id="dlbl${esc(dn)}" style="font-size:13px;flex:1;${esc(strike)}">${esc(task)}</div>`;
      html += `</div>`;
    });
    html += `</div>`;
  });
  el.innerHTML = html;
}

// ═══ GROQ API ════════════════════════════════════════════════════════════

async function groqCall(prompt, sys, useHistory) {
  var rawKey = localStorage.getItem(`hev4_groq`) || ``;
  var key = rawKey.replace(/[^\x20-\x7E]/g, ``).trim();
  if (!key) return `[No Groq API key set. Go to Settings to add your key.]`;

  // Build system prompt:
  // If called from Becky chat — use the full BECKY_SYSTEM_PROMPT identity
  // If called from any other studio — use the passed sys string (shorter, task-specific)
  var systemContent = (useHistory === true)
    ? BECKY_SYSTEM_PROMPT
    : (sys || BECKY_SYSTEM_PROMPT);

  // Build messages array:
  // system → [last 4 history messages] → current user message
  // This mirrors: systemPrompt + getLast4MessagesFromUI() + newMessage
  var historyMessages = (useHistory === true) ? bHistoryGet() : [];
  var messages = [
    { role: `system`, content: systemContent },
    ...historyMessages,
    { role: `user`, content: prompt }
  ];


  var body = {
    model: `llama-3.3-70b-versatile`,
    max_tokens: 1200,
    messages: messages
  };
  try {
    var res = await fetch(`https://api.groq.com/openai/v1/chat/completions`, {
      method: `POST`,
      headers: { Authorization: `Bearer ${esc(key)}`, 'Content-Type': `application/json` },
      body: JSON.stringify(body)
    });
    var data = await res.json();
    if (data.error) return `Error: ${esc(data.error.message)}`;
    return data.choices[0].message.content;
  } catch(e) {
    return `Error connecting to Groq: ${esc(e.message)}`;
  }
}

// ═══ STATUS / OUTPUT HELPERS ════════════════════════════════════════════

function setSt(id, type, msg) {
  var el = document.getElementById(id);
  if (!el) return;
  el.className = `st on st-${esc(type)}`;
  el.textContent = msg;
}
function hideSt(id) {
  var el = document.getElementById(id);
  if (el) { el.className = `st`; el.textContent = ``; }
}
function showOut(oid, cid, txt) {
  var el = document.getElementById(oid);
  var btn = document.getElementById(cid);
  if (el) { el.className = `out on`; el.textContent = txt; }
  if (btn) btn.style.display = `inline-flex`;
}
function cpTxt(id) {
  var el = document.getElementById(id);
  if (!el) return;
  navigator.clipboard.writeText(el.textContent).catch(() => {});
  var old = el.style.outline;
  el.style.outline = `2px solid var(--teal)`;
  setTimeout(() => { el.style.outline = old; }, 700);
}
function cpStr(str) {
  navigator.clipboard.writeText(str).catch(() => {});
}

// ═══ BECKY CHAT — wired to BECKY_SYSTEM_PROMPT + rolling 4-message window ══

function addMsg(who, text, role) {
  var box = document.getElementById(`bmsgs`);
  if (!box) return;
  var div = document.createElement(`div`);
  div.className = `msg ${role === `user` ? `msg-u` : `msg-b`}`;
  div.innerHTML = `<div class="msg-who">${esc(who)}</div>${text.replace(/\n/g, `<br>`)}`;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

// bAddMsg alias used by voice functions
function bAddMsg(who, text) {
  addMsg(who, who === `YOU` ? `user` : `becky`, who === `YOU` ? `user` : `becky`);
  // Fix: re-call addMsg properly
  var box = document.getElementById(`bmsgs`);
  if (!box) return;
  var last = box.lastElementChild;
  if (last) last.remove(); // remove the broken one above
  var div = document.createElement(`div`);
  div.className = `msg ${who === `YOU` ? `msg-u` : `msg-b`}`;
  div.innerHTML = `<div class="msg-who">${esc(who)}</div>${text.replace(/\n/g, `<br>`)}`;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

async function bSend() {
  var inp = document.getElementById(`bin`);
  var msg = inp ? inp.value.trim() : ``;
  if (!msg) return;
  inp.value = ``;

  // Show user message in UI
  addMsg(`YOU`, msg, `user`);
  setSt(`bst`, `i`, `Becky is thinking...`);

  // Push user message to rolling history BEFORE the call
  bHistoryPush(`user`, msg);

  // groqCall with useHistory=true → sends BECKY_SYSTEM_PROMPT + last 4 messages
  var reply = await groqCall(msg, null, true);

  hideSt(`bst`);
  addMsg(`BECKY`, reply, `becky`);

  // Push Becky reply to rolling history AFTER the call
  bHistoryPush(`assistant`, reply);
}

function bQ(prompt) {
  var inp = document.getElementById(`bin`);
  if (inp) inp.value = prompt;
  bSend();
}

function qBecky(msg) { nav(`becky`); setTimeout(() => bQ(msg), 300); }

function bClear() {
  var box = document.getElementById(`bmsgs`);
  if (box) box.innerHTML = `<div class="msg msg-b"><div class="msg-who">BECKY</div>Chat cleared — rolling history reset. Ready for your next project, John! 🎬</div>`;
  bHistoryClear(); // clear the rolling 4-message window too
}

function bPlus() {
  var extra = prompt(`Add extra context for Becky:`, ``);
  if (extra) {
    var inp = document.getElementById(`bin`);
    if (inp) {
      inp.value = inp.value ? inp.value + `\n\nAdditional context: ` + extra : `Context: ` + extra;
      inp.focus();
    }
  }
}

// ═══ PODCAST SHOW SWITCHER ═══════════════════════════════════════════════

function setPodShow(n) {
  podShow = n;
  document.getElementById(`pod-s1`).className = `show-card${n === 1 ? ` sel` : ``}`;
  document.getElementById(`pod-s2`).className = `show-card${n === 2 ? ` sel` : ``}`;
  var s = SHOWS[n];
  document.getElementById(`pi-host`).textContent = s.host;
  document.getElementById(`pi-guest`).textContent = s.guest;
  document.getElementById(`pi-days`).innerHTML = s.days;
  document.getElementById(`pi-hs`).textContent = s.hs;
  document.getElementById(`pi-gs`).textContent = s.gs;
}

// ═══ PODCAST STUDIO ══════════════════════════════════════════════════════

var Pod = {
  topic() { return document.getElementById(`pod-topic`).value.trim() || `AI and the future of online business`; },
  ep()    { return document.getElementById(`pod-ep`).value.trim() || `Episode 1`; },
  async hooks() {
    var s = SHOWS[podShow];
    setSt(`pod-st-h`, `i`, `Writing hooks...`);
    var out = await groqCall(`Write 5 powerful podcast hooks for Hub Engine Podcast. Host: ${esc(s.host)}. Topic: ${esc(this.topic())}. Each hook under 15 seconds when spoken. Conversational and curiosity-driven. Numbered list.`);
    setSt(`pod-st-h`, `k`, `Hooks ready!`);
    showOut(`pod-out-h`, `pod-cp-h`, out);
  },
  async script() {
    var s = SHOWS[podShow];
    setSt(`pod-st-s`, `i`, `Writing full script — this takes about 15 seconds...`);
    var out = await groqCall(`Write a complete podcast episode script. Show: Hub Engine Podcast. Episode: ${esc(this.ep())}. Topic: ${esc(this.topic())}. Host: ${esc(s.host)} (${esc(s.hs)}). Guest: ${esc(s.guest)} (${esc(s.gs)}). Include intro, 3 main segments with dialogue, transitions, outro with CTA. Format with HOST: and GUEST: labels. 8-10 minute episode.`, `You are a professional podcast script writer for Hub Engine Podcast.`);
    setSt(`pod-st-s`, `k`, `Script ready!`);
    showOut(`pod-out-s`, `pod-cp-s`, out);
  },
  async notes() {
    setSt(`pod-st-n`, `i`, `Writing show notes...`);
    var out = await groqCall(`Write detailed podcast show notes for: ${esc(this.ep())} — Topic: ${esc(this.topic())}. Include episode summary (2 paragraphs), 5 key takeaways, 3 discussion questions, hashtags for social media. Format as a blog-style post.`);
    setSt(`pod-st-n`, `k`, `Show notes ready!`);
    showOut(`pod-out-n`, `pod-cp-n`, out);
  },
  async caps() {
    setSt(`pod-st-c`, `i`, `Writing captions...`);
    var out = await groqCall(`Write social media captions for a podcast episode about: ${esc(this.topic())}. One caption each for: TikTok (punchy, 20 words max), Instagram Reels, Twitter X (under 280 chars), Facebook, LinkedIn. Separate each clearly with labels.`);
    setSt(`pod-st-c`, `k`, `Captions ready!`);
    showOut(`pod-out-c`, `pod-cp-c`, out);
  },
  async all() { await this.hooks(); await this.script(); await this.notes(); await this.caps(); }
};

// ═══ BUSINESS STUDIO ════════════════════════════════════════════════════

var Biz = {
  topic() { return document.getElementById(`biz-topic`).value.trim() || `Building a profitable online business with AI`; },
  ep()    { return document.getElementById(`biz-ep`).value.trim() || `Business Episode 1`; },
  async hooks() {
    setSt(`bst-h`, `i`, `Writing hooks...`);
    var out = await groqCall(`Write 5 compelling podcast hooks for a business show. Host: Susan (professional, confident). Guest: Alisha (charismatic, persuasive). Topic: ${esc(this.topic())}. Each hook under 15 seconds. Business-focused, authoritative but conversational.`);
    setSt(`bst-h`, `k`, `Hooks ready!`);
    showOut(`bout-h`, `bcp-h`, out);
  },
  async script() {
    setSt(`bst-s`, `i`, `Writing script...`);
    var out = await groqCall(`Write a complete business podcast episode script. Show: Hub Engine Business. Episode: ${esc(this.ep())}. Topic: ${esc(this.topic())}. Host: Susan (professional, late 30s-40s, confident). Guest: Alisha (charismatic, persuasive, 40s). Include intro, 3 business insight segments, Q&A format, actionable takeaway closing. Label SUSAN: and ALISHA:.`, `You are a business podcast script writer.`);
    setSt(`bst-s`, `k`, `Script ready!`);
    showOut(`bout-s`, `bcp-s`, out);
  },
  async notes() {
    setSt(`bst-n`, `i`, `Writing show notes...`);
    var out = await groqCall(`Write show notes for a business podcast episode: ${esc(this.ep())} — ${esc(this.topic())}. Include 2-paragraph summary, 5 business takeaways, 3 action steps listeners can take today, relevant hashtags.`);
    setSt(`bst-n`, `k`, `Notes ready!`);
    showOut(`bout-n`, `bcp-n`, out);
  },
  async captions() {
    setSt(`bst-c`, `i`, `Writing captions...`);
    var out = await groqCall(`Write social media captions for a business podcast about: ${esc(this.topic())}. One each for TikTok, Instagram, Twitter X, Facebook, LinkedIn. Business-focused tone with relevant hashtags.`);
    setSt(`bst-c`, `k`, `Captions ready!`);
    showOut(`bout-c`, `bcp-c`, out);
  },
  async all() { await this.hooks(); await this.script(); await this.notes(); await this.captions(); }
};

// ═══ AFFILIATE STUDIO ════════════════════════════════════════════════════

var Aff = {
  product() { return document.getElementById(`aff-product`).value.trim() || `AI Affiliate Profits Course`; },
  prog()    { return document.getElementById(`aff-prog`).value; },
  async hooks() {
    setSt(`ast-h`, `i`, `Writing ad hooks...`);
    var out = await groqCall(`Write 5 powerful ad hooks for an affiliate promo promoting: ${esc(this.product())} from ${esc(this.prog())}. Each hook under 5 seconds. No hard selling. Curiosity-based. Start strong. Numbered list.`);
    setSt(`ast-h`, `k`, `Hooks ready!`);
    showOut(`aout-h`, `acp-h`, out);
  },
  async script30() {
    setSt(`ast-s`, `i`, `Writing 30-second script...`);
    var out = await groqCall(`Write a 30-second affiliate promo script for: ${esc(this.product())} (Program: ${esc(this.prog())}). Structure: 1) FTC disclosure 2) Hook 3) Problem 4) Solution 5) Soft CTA with link in description. No hard selling. Mark each section.`);
    setSt(`ast-s`, `k`, `Script ready!`);
    showOut(`aout-s`, `acp-s`, out);
  },
  async dialogue() {
    setSt(`ast-d`, `i`, `Writing Becky dialogue...`);
    var out = await groqCall(`Write a 60-second dialogue between Becky Host and Becky Guest (British, warm, authentic) promoting: ${esc(this.product())}. Start with FTC disclosure by Becky Host. Natural conversation about benefits. Soft CTA at end. Label BECKY HOST: and BECKY GUEST: clearly. No hard selling.`);
    setSt(`ast-d`, `k`, `Dialogue ready!`);
    showOut(`aout-d`, `acp-d`, out);
  },
  async cap() {
    setSt(`ast-c`, `i`, `Writing caption...`);
    var out = await groqCall(`Write 3 social media captions promoting: ${esc(this.product())} as an affiliate. Platform 1: TikTok (short, punchy). Platform 2: Instagram Reels. Platform 3: YouTube Shorts. All must include FTC disclosure note, soft CTA with link in description, relevant hashtags.`);
    setSt(`ast-c`, `k`, `Caption ready!`);
    showOut(`aout-c`, `acp-c`, out);
  },
  async all() { await this.hooks(); await this.script30(); await this.dialogue(); await this.cap(); }
};

// ═══ SETTINGS ════════════════════════════════════════════════════════════

function saveKey() {
  var val = document.getElementById(`groq-inp`).value.replace(/[^\x20-\x7E]/g, ``).trim();
  if (!val) { setSt(`key-st`, `e`, `Please enter a valid API key.`); return; }
  localStorage.setItem(`hev4_groq`, val);
  setSt(`key-st`, `k`, `API key saved successfully!`);
  refreshKeyStatus();
}

function clearKey() {
  localStorage.removeItem(`hev4_groq`);
  document.getElementById(`groq-inp`).value = ``;
  setSt(`key-st`, `i`, `API key cleared.`);
  refreshKeyStatus();
}

function refreshKeyStatus() {
  var k = localStorage.getItem(`hev4_groq`) || ``;
  var el = document.getElementById(`bkey-st`);
  if (el) {
    el.innerHTML = k
      ? `<span style="color:var(--green)">✅ API key active — Becky is ready</span>`
      : `<span style="color:var(--red)">⚠ No API key — go to Settings</span>`;
  }
  var inp = document.getElementById(`groq-inp`);
  if (inp && k) inp.placeholder = `Key saved ✅ (hidden for security)`;
}

function exportData() {
  var data = {};
  for (var i = 0; i < localStorage.length; i++) {
    var k = localStorage.key(i);
    if (k.startsWith(`hev4`) || k === `vcr`) data[k] = localStorage.getItem(k);
  }
  var blob = new Blob([JSON.stringify(data, null, 2)], { type: `application/json` });
  var a = document.createElement(`a`);
  a.href = URL.createObjectURL(blob);
  a.download = `hub-engine-v4-backup.json`;
  a.click();
}

// ═══ KEYBOARD HANDLERS ═══════════════════════════════════════════════════

document.addEventListener(`DOMContentLoaded`, () => {
  var pwInp = document.getElementById(`pw-input`);
  if (pwInp) {
    pwInp.addEventListener(`keydown`, e => { if (e.key === `Enter`) chkPw(); });
    pwInp.focus();
  }
  var bin = document.getElementById(`bin`);
  if (bin) {
    bin.addEventListener(`keydown`, e => { if (e.key === `Enter` && !e.shiftKey) { e.preventDefault(); bSend(); } });
  }
  if (sessionStorage.getItem(`hev4`) === `ok`) {
    document.getElementById(`login-screen`).style.display = `none`;
    document.getElementById(`app`).style.display = `block`;
    initApp();
  }
});

// ═══ TRAINING LIBRARY — LEARNING WORKFLOW ════════════════════════════

// ── Default reference videos (Sabrina Ramonov Claude Co-Worker series)
var DEFAULT_VIDEOS = [
  { id: `rv1`, title: `Microsoft GenAI Course — Lesson 4: Prompt Engineering Fundamentals`, url: `https://github.com/microsoft/generative-ai-for-beginners/tree/main/04-prompt-engineering-fundamentals`, watched: false, hasNotes: false },
  { id: `rv2`, title: `Microsoft GenAI Course — Lesson 5: Advanced Prompts`, url: `https://github.com/microsoft/generative-ai-for-beginners/tree/main/05-advanced-prompts`, watched: false, hasNotes: false },
  { id: `rv3`, title: `Microsoft GenAI Course — Lesson 1: Introduction to Generative AI`, url: `https://github.com/microsoft/generative-ai-for-beginners/tree/main/01-introduction-to-genai`, watched: false, hasNotes: false },
  { id: `rv4`, title: `Microsoft GenAI Course — Lesson 17: AI Agents`, url: `https://github.com/microsoft/generative-ai-for-beginners/tree/main/17-ai-agents`, watched: false, hasNotes: false },
  { id: `rv5`, title: `Sabrina Ramonov — Claude Co-Worker Series (YouTube Channel)`, url: `https://www.youtube.com/@SabrinaRamonov`, watched: false, hasNotes: false }
];

function getTrData(key) {
  try { return JSON.parse(localStorage.getItem(key) || `null`); } catch(e) { return null; }
}
function setTrData(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

function getVideos()  { return getTrData(`hev4_rvids`)  || DEFAULT_VIDEOS; }
function getNotes()   { return getTrData(`hev4_notes`)  || []; }
function getLessons() { return getTrData(`hev4_lessons`)|| []; }
function getCourseInfo() { return getTrData(`hev4_cinfo`) || { title: ``, goal: `` }; }

// ── Tab switcher
function trTab(id) {
  [`ref`,`notes`,`build`,`prog`].forEach(t => {
    var el = document.getElementById(`tr-${esc(t)}`);
    var btn = document.getElementById(`trtab-${esc(t)}`);
    if (!el || !btn) return;
    var active = t === id;
    el.style.display = active ? `block` : `none`;
    btn.style.background = active ? `var(--teal)` : `var(--bg2)`;
    btn.style.color = active ? `#000` : `var(--muted)`;
  });
  if (id === `ref`)   renderVideos();
  if (id === `notes`) renderNotes();
  if (id === `build`) renderCourse();
  if (id === `prog`)  renderProgress();
}

// ── Reference Videos ─────────────────────────────────────────────────

function renderVideos() {
  var el = document.getElementById(`ref-video-list`);
  if (!el) return;
  var vids = getVideos();
  if (!vids.length) { el.innerHTML = `<div class="muted" style="font-size:13px;margin-bottom:12px">No videos yet — add one below.</div>`; return; }
  var html = ``;
  vids.forEach(v => {
    var watchedStyle = v.watched
      ? `border-color:var(--teal);background:rgba(0,212,170,.04)`
      : `border-color:var(--border)`;
    html += `<div class="card mb12" style="${esc(watchedStyle)}">`;
    html += `<div class="fsb mb8">`;
    html += `<div>`;
    html += `<div class="bold" style="font-size:14px;margin-bottom:4px">${esc(v.title)}</div>`;
    html += `<div style="font-size:12px;color:var(--muted)">${v.url.includes("github") ? "Microsoft GenAI Course · Free · github.com/microsoft/generative-ai-for-beginners" : "Sabrina Ramonov · Claude Co-Worker Series"}</div>`;
    html += `</div>`;
    html += `<div class="fca gap8">`;
    if (v.watched) html += `<span class="badge b-teal">✅ Watched</span>`;
    html += `</div>`;
    html += `</div>`;
    html += `<div class="fca gap8 wrap">`;
    html += `<a href="${esc(v.url)}" target="_blank" class="btn btn-ghost btn-sm" rel="noopener noreferrer">▶ Watch on YouTube</a>`;
    if (!v.watched) {
      html += `<button class="btn btn-ghost btn-sm" data-vid="${esc(v.id)}" onclick="markWatched(this.dataset.vid)">Mark as Watched</button>`;
    }
    html += `<button class="btn btn-ghost btn-sm" data-vt="${v.title.replace(/"/g,`&quot;`)}" onclick="quickNoteFromVideo(this.dataset.vt)">📝 Add Notes →</button>`;
    html += `<button class="btn btn-danger btn-sm" data-vid="${esc(v.id)}" onclick="removeVideo(this.dataset.vid)">Remove</button>`;
    html += `</div></div>`;
  });
  el.innerHTML = html;
}

function markWatched(id) {
  var vids = getVideos();
  vids = vids.map(v => v.id === id ? { ...v, watched: true } : v);
  setTrData(`hev4_rvids`, vids);
  renderVideos();
}

function removeVideo(id) {
  if (!confirm(`Remove this video from your library?`)) return;
  var vids = getVideos().filter(v => v.id !== id);
  setTrData(`hev4_rvids`, vids);
  renderVideos();
}

function addRefVideo() {
  var title = document.getElementById(`rv-title`).value.trim();
  var url   = document.getElementById(`rv-url`).value.trim();
  if (!title) { alert(`Please enter a video title.`); return; }
  if (!url)   { alert(`Please enter a YouTube URL.`); return; }
  var vids = getVideos();
  vids.push({ id: `rv${esc(Date.now())}`, title, url, watched: false, hasNotes: false });
  setTrData(`hev4_rvids`, vids);
  document.getElementById(`rv-title`).value = ``;
  document.getElementById(`rv-url`).value   = ``;
  renderVideos();
}

function quickNoteFromVideo(title) {
  trTab(`notes`);
  setTimeout(() => {
    var src = document.getElementById(`note-src`);
    if (src) { src.value = title; src.focus(); }
  }, 150);
}

// ── Notes ─────────────────────────────────────────────────────────────

function saveNote() {
  var src    = document.getElementById(`note-src`).value.trim();
  var lesson = document.getElementById(`note-lesson`).value.trim();
  var apply  = document.getElementById(`note-apply`).value.trim();
  if (!lesson) { setSt(`note-st`, `e`, `Please enter a key lesson.`); return; }
  var notes = getNotes();
  notes.unshift({ id: `n${esc(Date.now())}`, src: src || `General`, lesson, apply, date: new Date().toLocaleDateString() });
  setTrData(`hev4_notes`, notes);
  document.getElementById(`note-src`).value    = ``;
  document.getElementById(`note-lesson`).value = ``;
  document.getElementById(`note-apply`).value  = ``;
  setSt(`note-st`, `k`, `Note saved!`);
  renderNotes();
}

function renderNotes() {
  var el = document.getElementById(`notes-list`);
  if (!el) return;
  var notes = getNotes();
  if (!notes.length) {
    el.innerHTML = `<div style="font-size:13px;color:var(--muted);text-align:center;padding:24px">No notes yet — watch a video and capture your takeaways.</div>`;
    return;
  }
  var html = ``;
  notes.forEach(n => {
    html += `<div class="card mb10" style="border-left:3px solid var(--gold)">`;
    html += `<div class="fsb mb6">`;
    html += `<div style="font-size:11px;color:var(--gold);font-weight:700">${esc(n.src)}</div>`;
    html += `<div class="fca gap8">`;
    html += `<span style="font-size:11px;color:var(--muted)">${esc(n.date)}</span>`;
    html += `<button class="btn btn-danger btn-xs" data-nid="${esc(n.id)}" onclick="deleteNote(this.dataset.nid)">✕</button>`;
    html += `</div></div>`;
    html += `<div style="font-size:13px;font-weight:600;margin-bottom:6px">${esc(n.lesson)}</div>`;
    if (n.apply) html += `<div style="font-size:12px;color:var(--muted)">→ How I apply this: ${esc(n.apply)}</div>`;
    html += `</div>`;
  });
  el.innerHTML = html;
}

function deleteNote(id) {
  if (!confirm(`Delete this note?`)) return;
  setTrData(`hev4_notes`, getNotes().filter(n => n.id !== id));
  renderNotes();
}

async function askBeckyNote() {
  var lesson = document.getElementById(`note-lesson`).value.trim();
  var apply  = document.getElementById(`note-apply`).value.trim();
  if (!lesson) { setSt(`note-st`, `e`, `Enter your lesson first, then ask Becky.`); return; }
  setSt(`note-st`, `i`, `Becky is summarizing...`);
  var prompt = `I watched a video about Claude Co-Worker workflows. My key lesson was: "${esc(lesson)}". How I think I can apply it: "${apply || `not sure yet`}". Please give me: 1) A crisp one-sentence summary of the lesson. 2) One specific action step I should take this week for my Hub Engine affiliate content business.`;
  var reply = await groqCall(prompt);
  hideSt(`note-st`);
  document.getElementById(`note-apply`).value = reply;
}

// ── Course Builder ─────────────────────────────────────────────────────

function saveCourseInfo() {
  var title = document.getElementById(`c-title`).value.trim();
  var goal  = document.getElementById(`c-goal`).value.trim();
  setTrData(`hev4_cinfo`, { title, goal });
  setSt(`ci-st`, `k`, `Course info saved!`);
}

function addLesson() {
  var module = document.getElementById(`l-module`).value.trim();
  var title  = document.getElementById(`l-title`).value.trim();
  var desc   = document.getElementById(`l-desc`).value.trim();
  if (!title) { setSt(`l-st`, `e`, `Please enter a lesson title.`); return; }
  var lessons = getLessons();
  lessons.push({ id: `l${esc(Date.now())}`, module: module || `General`, title, desc, done: false });
  setTrData(`hev4_lessons`, lessons);
  document.getElementById(`l-module`).value = ``;
  document.getElementById(`l-title`).value  = ``;
  document.getElementById(`l-desc`).value   = ``;
  setSt(`l-st`, `k`, `Lesson added!`);
  renderCourse();
}

function toggleLesson(id) {
  var lessons = getLessons().map(l => l.id === id ? { ...l, done: !l.done } : l);
  setTrData(`hev4_lessons`, lessons);
  renderCourse();
  renderProgress();
}

function deleteLesson(id) {
  if (!confirm(`Remove this lesson?`)) return;
  setTrData(`hev4_lessons`, getLessons().filter(l => l.id !== id));
  renderCourse();
  renderProgress();
}

function renderCourse() {
  // Restore course info fields
  var ci = getCourseInfo();
  var tEl = document.getElementById(`c-title`);
  var gEl = document.getElementById(`c-goal`);
  if (tEl && !tEl.value) tEl.value = ci.title;
  if (gEl && !gEl.value) gEl.value = ci.goal;

  var el = document.getElementById(`course-outline`);
  if (!el) return;
  var lessons = getLessons();
  if (!lessons.length) {
    el.innerHTML = `<div style="font-size:13px;color:var(--muted);text-align:center;padding:24px">No lessons yet — add your first lesson above.</div>`;
    return;
  }
  // Group by module
  var modules = {};
  lessons.forEach(l => {
    if (!modules[l.module]) modules[l.module] = [];
    modules[l.module].push(l);
  });
  var html = ``;
  Object.keys(modules).forEach(mod => {
    var modLessons = modules[mod];
    var modDone = modLessons.filter(l => l.done).length;
    html += `<div style="margin-bottom:16px">`;
    html += `<div style="font-size:12px;font-weight:700;color:var(--purple);margin-bottom:8px;text-transform:uppercase;letter-spacing:.06em">${esc(mod)} — ${esc(modDone)}/${esc(modLessons.length)} complete</div>`;
    modLessons.forEach(l => {
      var doneStyle = l.done ? `opacity:.6` : ``;
      html += `<div class="day-row mb6" style="${esc(doneStyle)}">`;
      html += `<input type="checkbox" ${l.done ? `checked` : ``} onchange="toggleLesson('${esc(l.id)}')">`;
      html += `<div style="flex:1">`;
      html += `<div style="font-size:13px;font-weight:600;${l.done ? `text-decoration:line-through;color:var(--muted)` : ``}">${esc(l.title)}</div>`;
      if (l.desc) html += `<div style="font-size:12px;color:var(--muted);margin-top:2px">${esc(l.desc)}</div>`;
      html += `</div>`;
      html += `<button class="btn btn-danger btn-xs" data-lid="${esc(l.id)}" onclick="deleteLesson(this.dataset.lid)">✕</button>`;
      html += `</div>`;
    });
    html += `</div>`;
  });
  el.innerHTML = html;
}

function exportCourse() {
  var ci = getCourseInfo();
  var lessons = getLessons();
  var text = `MY COURSE: ${ci.title || `Untitled`}\nGOAL: ${ci.goal || `(no goal set)`}\n\n`;
  var modules = {};
  lessons.forEach(l => { if (!modules[l.module]) modules[l.module] = []; modules[l.module].push(l); });
  Object.keys(modules).forEach(mod => {
    text += `\n== ${esc(mod)} ==\n`;
    modules[mod].forEach((l, i) => {
      text += `${esc(i+1)}. [${l.done ? `✅` : ` `}] ${esc(l.title)}\n`;
      if (l.desc) text += `   ${esc(l.desc)}\n`;
    });
  });
  cpStr(text);
  alert(`Course outline copied to clipboard!`);
}

// ── Progress ──────────────────────────────────────────────────────────

function renderProgress() {
  var vids    = getVideos();
  var notes   = getNotes();
  var lessons = getLessons();
  var ci      = getCourseInfo();

  var el = id => document.getElementById(id);
  if (el(`tp-videos`))  el(`tp-videos`).textContent  = vids.length;
  if (el(`tp-notes`))   el(`tp-notes`).textContent   = notes.length;
  if (el(`tp-lessons`)) el(`tp-lessons`).textContent = lessons.length;

  if (el(`tp-course-title`)) {
    el(`tp-course-title`).textContent = ci.title || `No course created yet — go to Build My Course`;
    el(`tp-course-title`).style.color = ci.title ? `var(--txt)` : `var(--muted)`;
  }
  if (el(`tp-goal`) && ci.goal) el(`tp-goal`).textContent = `Goal: ${esc(ci.goal)}`;

  var llEl = el(`tp-lessons-list`);
  if (llEl) {
    if (!lessons.length) {
      llEl.innerHTML = `<div style="font-size:13px;color:var(--muted)">No lessons added yet.</div>`;
    } else {
      var done = lessons.filter(l => l.done).length;
      var pct  = Math.round(done / lessons.length * 100);
      var html = `<div class="fsb mb8"><div style="font-size:13px">${done} of ${esc(lessons.length)} lessons complete</div><div style="font-size:13px;font-weight:700;color:var(--teal)">${esc(pct)}%</div></div>`;
      html += `<div class="progress-bar mb12"><div class="progress-fill" style="width:${esc(pct)}%"></div></div>`;
      lessons.slice(0, 8).forEach(l => {
        html += `<div class="day-row mb6">`;
        html += `<input type="checkbox" ${l.done ? `checked` : ``} onchange="toggleLesson('${esc(l.id)}')">`;
        html += `<div style="font-size:12px;color:var(--muted);width:80px;flex-shrink:0">${esc(l.module.substring(0, 12))}</div>`;
        html += `<div style="font-size:13px;flex:1;${l.done ? `text-decoration:line-through;color:var(--muted)` : ``}">${esc(l.title)}</div>`;
        html += `</div>`;
      });
      if (lessons.length > 8) html += `<div style="font-size:12px;color:var(--muted);margin-top:8px">+ ${esc(lessons.length - 8)} more — go to Build My Course to see all</div>`;
      llEl.innerHTML = html;
    }
  }
}

function trExport() {
  var data = {
    videos: getVideos(), notes: getNotes(),
    lessons: getLessons(), courseInfo: getCourseInfo()
  };
  cpStr(JSON.stringify(data, null, 2));
  alert(`All training data copied to clipboard as JSON!`);
}

function trClearAll() {
  [`hev4_rvids`,`hev4_notes`,`hev4_lessons`,`hev4_cinfo`].forEach(k => localStorage.removeItem(k));
  location.reload();
}

// ── Init training on page load ────────────────────────────────────────
function initTraining() {
  trTab(`ref`);
}


// ═══ LINKEDIN DAILY POST WORKFLOW ═══════════════════════════════════════

var LABELS_EXTRA = { linkedin: `Daily Blog` };

function getLiDrafts() {
  try { return JSON.parse(localStorage.getItem(`hev4_li_drafts`) || `[]`); } catch(e) { return []; }
}
function setLiDrafts(d) { localStorage.setItem(`hev4_li_drafts`, JSON.stringify(d)); }

function liGetTopic() { return document.getElementById(`li-topic`).value.trim() || `Building an AI content studio from scratch in Southeast Texas`; }
function liGetType()  {
  var sel = document.getElementById(`li-type`);
  var map = {
    story:     `personal story post — authentic, first-person, emotional and relatable`,
    lesson:    `lesson learned post — clear insight, what went wrong or right, takeaway`,
    tips:      `tips post — numbered list, practical, actionable advice`,
    milestone: `milestone celebration post — proud but humble, share the win and credit`,
    question:  `engagement question post — thought-provoking, invites comments`,
    hub:       `Hub Engine product update post — what is new, why it matters, soft CTA`
  };
  return sel ? (map[sel.value] || `professional LinkedIn post`) : `professional LinkedIn post`;
}

async function liGenerate() {
  setSt(`li-st`, `i`, `Writing your LinkedIn post...`);
  var sys = `You are a LinkedIn ghostwriter for John Lanter — 59-year-old CEO of AffiliateMediaHub Studio in Orange Texas. Former Lead Production Operator at Lion Elastomers for 20+ years. Now building an AI content studio using Claude, Groq, Browser TTS, and Vmake. Faith-driven, authentic, blue-collar voice turned entrepreneur. Write LinkedIn posts that are real, not corporate. Max 280 words. Use short punchy paragraphs. End with 3-5 relevant hashtags.`;
  var prompt = `Write a LinkedIn ${esc(liGetType())} about: ${esc(liGetTopic())}. Author voice: John Lanter, 59, Orange Texas, former factory worker now AI content creator. Keep it authentic and human. Short paragraphs. Strong opening hook. End with hashtags.`;
  var out = await groqCall(prompt, sys);
  hideSt(`li-st`);
  var el = document.getElementById(`li-out`);
  if (el) { el.textContent = out; el.className = `out on`; }
  liUpdDraftCount();
}

async function liRefine() {
  var current = document.getElementById(`li-out`).textContent.trim();
  if (!current || current === `Click Generate to write your LinkedIn post...`) {
    setSt(`li-st`, `e`, `Generate a post first, then refine it.`); return;
  }
  setSt(`li-st`, `i`, `Refining your post...`);
  var out = await groqCall(`Rewrite and improve this LinkedIn post. Make the hook stronger, tighten the language, and keep it under 280 words. Keep John Lanter voice — authentic, blue-collar entrepreneur, faith-driven, Orange Texas. Keep the hashtags.\n\nOriginal post:\n${esc(current)}`);
  hideSt(`li-st`);
  var el = document.getElementById(`li-out`);
  if (el) el.textContent = out;
}

async function liHooks() {
  setSt(`li-st`, `i`, `Writing hook options...`);
  var out = await groqCall(`Write 5 different LinkedIn post opening hooks for this topic: ${esc(liGetTopic())}. Author: John Lanter, 59, former factory worker now AI content creator in Orange Texas. Each hook should be 1-2 sentences max, punchy, and make someone stop scrolling. Number them 1-5. Different styles: question, bold statement, story opener, statistic/fact, and controversial take.`);
  hideSt(`li-st`);
  var el = document.getElementById(`li-hooks-out`);
  if (el) el.textContent = out;
}

function liQuick(topic) {
  var inp = document.getElementById(`li-topic`);
  if (inp) inp.value = topic;
  liGenerate();
  nav(`linkedin`);
}

function liSaveDraft() {
  var content = document.getElementById(`li-out`).textContent.trim();
  if (!content || content === `Click Generate to write your LinkedIn post...`) {
    setSt(`li-st`, `e`, `Nothing to save — generate a post first.`); return;
  }
  var drafts = getLiDrafts();
  drafts.unshift({
    id: `d${esc(Date.now())}`,
    topic: liGetTopic(),
    content,
    date: new Date().toLocaleDateString(),
    type: document.getElementById(`li-type`).value
  });
  setLiDrafts(drafts);
  setSt(`li-st`, `k`, `Draft saved!`);
  liRenderDrafts();
  liUpdDraftCount();
}

function liRenderDrafts() {
  var el = document.getElementById(`li-drafts-list`);
  if (!el) return;
  var drafts = getLiDrafts();
  if (!drafts.length) {
    el.innerHTML = `<div style="font-size:13px;color:var(--muted);text-align:center;padding:20px">No drafts yet — generate a post and save it.</div>`;
    return;
  }
  var html = ``;
  drafts.forEach(d => {
    html += `<div style="background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:14px;margin-bottom:10px">`;
    html += `<div class="fsb mb6">`;
    html += `<div><div class="bold" style="font-size:13px">${esc(d.topic.substring(0, 60))}${d.topic.length > 60 ? `...` : ``}</div>`;
    html += `<div style="font-size:11px;color:var(--muted);margin-top:2px">${esc(d.date)} · ${esc(d.type)}</div></div>`;
    html += `<div class="fca gap8">`;
    html += `<button class="btn btn-ghost btn-xs" data-dc="${esc(d.id)}" onclick="liLoadDraft(this.dataset.dc)">Load</button>`;
    html += `<button class="btn btn-ghost btn-xs" data-dc="${esc(d.id)}" onclick="cpStr(getLiDrafts().find(x=>x.id===this.dataset.dc).content)">📋</button>`;
    html += `<button class="btn btn-danger btn-xs" data-dc="${esc(d.id)}" onclick="liDelDraft(this.dataset.dc)">✕</button>`;
    html += `</div></div>`;
    html += `<div style="font-size:12px;color:var(--muted);line-height:1.5;margin-top:6px">${esc(d.content.substring(0, 140))}...</div>`;
    html += `</div>`;
  });
  el.innerHTML = html;
}

function liLoadDraft(id) {
  var d = getLiDrafts().find(x => x.id === id);
  if (!d) return;
  var el = document.getElementById(`li-out`);
  if (el) { el.textContent = d.content; el.className = `out on`; }
  var inp = document.getElementById(`li-topic`);
  if (inp) inp.value = d.topic;
  setSt(`li-st`, `k`, `Draft loaded!`);
}

function liDelDraft(id) {
  setLiDrafts(getLiDrafts().filter(x => x.id !== id));
  liRenderDrafts();
  liUpdDraftCount();
}

function liClearDrafts() {
  localStorage.removeItem(`hev4_li_drafts`);
  liRenderDrafts();
  liUpdDraftCount();
}

function liUpdDraftCount() {
  var el = document.getElementById(`li-draft-count`);
  if (el) el.textContent = getLiDrafts().length;
}

// Hook LinkedIn page init into nav()
var _origNav = nav;
nav = function(id) {
  _origNav(id);
  if (id === `linkedin`) {
    liRenderDrafts();
    liUpdDraftCount();
    // Update breadcrumb label
    document.getElementById(`tbl`).textContent = `Daily Blog`;
  }
};


// ═══ IMAGE / VISION SUPPORT FOR BECKY ═══════════════════════════════════

var bImgData = null;  // stores base64 of current attached image

function bSendImage(input) {
  var file = input.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    bImgData = e.target.result; // full data URL e.g. data:image/jpeg;base64,...
    var thumb = document.getElementById(`bimg-thumb`);
    var preview = document.getElementById(`bimg-preview`);
    if (thumb) thumb.src = bImgData;
    if (preview) preview.style.display = `flex`;
  };
  reader.readAsDataURL(file);
}

function bClearImg() {
  bImgData = null;
  var preview = document.getElementById(`bimg-preview`);
  var inp = document.getElementById(`bimg`);
  if (preview) preview.style.display = `none`;
  if (inp) inp.value = ``;
}

// Vision-capable groq call using llama-4-maverick (supports images)
async function groqVisionCall(text, imageDataUrl) {
  var rawKey = localStorage.getItem(`hev4_groq`) || ``;
  var key = rawKey.replace(/[^\x20-\x7E]/g, ``).trim();
  if (!key) return `[No Groq API key set. Go to Settings to add your key.]`;

  // Extract base64 and media type from data URL
  var matches = imageDataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!matches) return `[Could not read image data.]`;
  var mediaType = matches[1];  // e.g. image/jpeg
  var b64 = matches[2];

  var body = {
    model: `meta-llama/llama-4-scout-17b-16e-instruct`,
    max_tokens: 1200,
    messages: [{
      role: `user`,
      content: [
        {
          type: `image_url`,
          image_url: { url: `data:${esc(mediaType)};base64,${esc(b64)}` }
        },
        {
          type: `text`,
          text: `You are Becky, AI Creative Director for AffiliateMediaHub Studio. John Lanter is showing you an image. ` + (text || `Please describe what you see and give any helpful feedback.`)
        }
      ]
    }]
  };

  try {
    var res = await fetch(`https://api.groq.com/openai/v1/chat/completions`, {
      method: `POST`,
      headers: { Authorization: `Bearer ${esc(key)}`, 'Content-Type': `application/json` },
      body: JSON.stringify(body)
    });
    var data = await res.json();
    if (data.error) return `Vision error: ${esc(data.error.message)}`;
    return data.choices[0].message.content;
  } catch(e) {
    return `Error connecting to Groq vision: ${esc(e.message)}`;
  }
}

// Override bSend to handle image if one is attached
var _bSendOrig = bSend;
bSend = async function() {
  if (bImgData) {
    var inp = document.getElementById(`bin`);
    var msg = inp ? inp.value.trim() : ``;
    inp.value = ``;
    addMsg(`YOU`, (msg || `[Image sent]`) + ` 🖼`, `user`);
    setSt(`bst`, `i`, `Becky is looking at your image...`);
    var reply = await groqVisionCall(msg, bImgData);
    hideSt(`bst`);
    addMsg(`BECKY`, reply, `becky`);
    bClearImg();
  } else {
    _bSendOrig();
  }
};

// ═══ PODCAST / STUDIO KEY WARNING ════════════════════════════════════════

function checkStudioKey() {
  var k = localStorage.getItem(`hev4_groq`) || ``;
  [`pod-key-warn`, `biz-key-warn`].forEach(id => {
    var el = document.getElementById(id);
    if (el) el.style.display = k ? `none` : `block`;
  });
}

// Hook into nav to show warning when landing on studio pages
var _navWithKeyCheck = nav;
nav = function(id) {
  _navWithKeyCheck(id);
  if (id === `becky`) {
    checkStudioKey();
  }
};

// ═══ LINKEDIN COPY + OPEN ════════════════════════════════════════════════

function liCopyAndOpen() {
  var content = document.getElementById(`li-out`).textContent.trim();
  if (!content || content === `Click Generate to write your LinkedIn post...`) {
    setSt(`li-st`, `e`, `Generate a post first before copying.`);
    return;
  }
  // Copy to clipboard
  navigator.clipboard.writeText(content).then(function() {
    setSt(`li-st`, `k`, `Post copied! LinkedIn is opening — paste it into Start a Post.`);
    // Open LinkedIn feed (new post)
    setTimeout(function() {
      window.open(`https://www.linkedin.com/feed/`, `_blank`);
    }, 400);
  }).catch(function() {
    // Fallback: select the text manually
    var el = document.getElementById(`li-out`);
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    setSt(`li-st`, `i`, `Text selected — press Ctrl+C to copy, then open LinkedIn.`);
    setTimeout(function() {
      window.open(`https://www.linkedin.com/feed/`, `_blank`);
    }, 1000);
  });
}


// ═══ DAILY BLOG — WRITE, POLISH & POST FUNCTIONS ═════════════════════════
// These power the Daily Blog page (pg-linkedin) blog* buttons

// ── Storage ───────────────────────────────────────────────────────────────
function blogGetEntries()     { try { return JSON.parse(localStorage.getItem(`hev4_blog_entries`) || `[]`); } catch(e) { return []; } }
function blogSetEntries(arr)  { localStorage.setItem(`hev4_blog_entries`, JSON.stringify(arr)); }

// ── Tab switching ─────────────────────────────────────────────────────────
function blogTab(id) {
  [`write`,`drafts`,`becky`,`ideas`].forEach(t => {
    var panel = document.getElementById(`blog-${esc(t)}`);
    var btn   = document.getElementById(`blogtab-${esc(t)}`);
    if (panel) panel.style.display = (t === id) ? `block` : `none`;
    if (btn)   {
      btn.style.background = (t === id) ? `var(--teal)` : `var(--bg2)`;
      btn.style.color      = (t === id) ? `#000`        : `var(--muted)`;
    }
  });
}

// ── Date & stats init ─────────────────────────────────────────────────────
function blogInitDate() {
  var el = document.getElementById(`blog-date`);
  if (el && !el.value) {
    var now = new Date();
    el.value = `${esc(now.getFullYear())}-${esc(String(now.getMonth()+1).padStart(2,'0'))}-${esc(String(now.getDate()).padStart(2,'0'))}`;
  }
}

function blogUpdStats() {
  var entries = blogGetEntries();
  var totalEl   = document.getElementById(`blog-total-count`);
  var streakEl  = document.getElementById(`blog-streak`);
  if (totalEl) totalEl.textContent = entries.length;
  if (streakEl) {
    // Count consecutive days ending today
    var dates  = [...new Set(entries.map(e => e.date))].sort().reverse();
    var streak = 0;
    var today  = new Date(); today.setHours(0,0,0,0);
    var check  = new Date(today);
    for (var d of dates) {
      var eDate = new Date(d); eDate.setHours(0,0,0,0);
      if (eDate.getTime() === check.getTime()) { streak++; check.setDate(check.getDate()-1); }
      else if (eDate < check) break;
    }
    streakEl.textContent = streak;
  }
}

// ── Word count ────────────────────────────────────────────────────────────
function blogWordCount() {
  var body  = (document.getElementById(`blog-body`)?.value || ``).trim();
  var words = body ? body.split(/\s+/).filter(Boolean).length : 0;
  var el    = document.getElementById(`blog-wordcount`);
  if (el) el.textContent = `${esc(words)} words`;
}

// ── Starter chips ─────────────────────────────────────────────────────────
function blogStarter(text) {
  var el = document.getElementById(`blog-body`);
  if (!el) return;
  if (el.value.trim()) el.value += `\n\n${esc(text)} `;
  else el.value = `${esc(text)} `;
  el.focus();
  blogWordCount();
}

// ── Save entry ────────────────────────────────────────────────────────────
function blogSave() {
  var body = (document.getElementById(`blog-body`)?.value || ``).trim();
  if (!body) { setSt(`blog-write-st`, `e`, `Write something first before saving.`); return; }
  var date   = document.getElementById(`blog-date`)?.value || new Date().toLocaleDateString();
  var mood   = document.getElementById(`blog-mood`)?.value || ``;
  var entries = blogGetEntries();
  entries.unshift({ id:`bl${esc(Date.now())}`, body, date, mood, created: new Date().toISOString() });
  blogSetEntries(entries);
  setSt(`blog-write-st`, `k`, `Entry saved! ✅`);
  blogUpdStats();
  blogRenderEntries();
}

// ── Clear write area ──────────────────────────────────────────────────────
function blogClear() {
  var el = document.getElementById(`blog-body`);
  if (el) { el.value = ``; blogWordCount(); }
  hideSt(`blog-write-st`);
}

// ── Clear all entries ─────────────────────────────────────────────────────
function blogClearAll() {
  localStorage.removeItem(`hev4_blog_entries`);
  blogUpdStats();
  blogRenderEntries();
}

// ── Render saved entries ──────────────────────────────────────────────────
function blogRenderEntries() {
  var el      = document.getElementById(`blog-entries-list`);
  if (!el) return;
  var entries = blogGetEntries();
  if (!entries.length) {
    el.innerHTML = `<div style="font-size:13px;color:var(--muted);text-align:center;padding:32px">No entries yet — write your first one today.</div>`;
    return;
  }
  var html = ``;
  entries.forEach(e => {
    html += `<div style="background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:14px;margin-bottom:10px">`;
    html += `<div class="fsb mb6"><div class="bold" style="font-size:13px">${esc(e.date)}${e.mood ? ` · ${e.mood}` : ``}</div>`;
    html += `<div class="fca gap8">`;
    html += `<button class="btn btn-ghost btn-xs" onclick="blogLoadToPolish('${esc(e.id)}')">✨ Polish</button>`;
    html += `<button class="btn btn-ghost btn-xs" onclick="cpStr(blogGetEntries().find(x=>x.id==='${esc(e.id)}').body)">📋</button>`;
    html += `<button class="btn btn-danger btn-xs" onclick="blogDelEntry('${esc(e.id)}')">✕</button>`;
    html += `</div></div>`;
    html += `<div style="font-size:12px;color:var(--muted);line-height:1.6;white-space:pre-wrap">${esc(e.body.substring(0,200))}${e.body.length>200?`...`:``}</div>`;
    html += `</div>`;
  });
  el.innerHTML = html;
}

function blogDelEntry(id) {
  blogSetEntries(blogGetEntries().filter(e => e.id !== id));
  blogRenderEntries();
  blogUpdStats();
}

function blogLoadToPolish(id) {
  var e = blogGetEntries().find(x => x.id === id);
  if (!e) return;
  var el = document.getElementById(`blog-raw-input`);
  if (el) el.value = e.body;
  blogTab(`becky`);
}

// ── Send to Becky Polish tab ──────────────────────────────────────────────
function blogSendToPolish() {
  var body = (document.getElementById(`blog-body`)?.value || ``).trim();
  var el   = document.getElementById(`blog-raw-input`);
  if (el && body) el.value = body;
  blogTab(`becky`);
}

// ── Becky Polish ──────────────────────────────────────────────────────────
async function blogPolish() {
  var raw   = (document.getElementById(`blog-raw-input`)?.value || ``).trim();
  if (!raw) { setSt(`blog-polish-st`, `e`, `Paste or write your raw entry first.`); return; }
  var style = document.getElementById(`blog-polish-style`)?.value || `linkedin`;

  var styleMap = {
    linkedin: `Polish this into a LinkedIn post. Keep John's authentic voice — do NOT make it corporate or generic. Fix grammar, tighten sentences, break into short paragraphs. Keep the human, real feeling. Add 3-5 relevant hashtags at the end. Max 300 words.`,
    short:    `Shorten this to under 200 words. Keep the main point and John's voice. Cut everything else.`,
    story:    `Rewrite this as a short story. Beginning, middle, end. Keep it personal and real. Max 300 words.`,
    lesson:   `Pull out the main lesson from this and write it as a clear, punchy LinkedIn post. What did John learn? Why does it matter to others? Max 250 words.`,
    question: `Polish this into a LinkedIn post that ends with a strong, genuine engagement question that invites comments. Keep John's voice. Max 280 words.`
  };

  setSt(`blog-polish-st`, `i`, `Becky is polishing your entry...`);

  var sys = `You are Becky, AI Creative Director for AffiliateMediaHub Studio. You are helping John Lanter (59, Orange Texas, former factory worker now AI content creator, CEO of AffiliateMediaHub Studio, faith-driven) polish his daily blog entry for LinkedIn. Keep his authentic blue-collar voice. Never make it sound corporate or fake. Never add things he did not say.`;

  var out = await groqCall(`${esc(styleMap[style])}\n\nJohn's raw entry:\n${esc(raw)}`, sys);
  hideSt(`blog-polish-st`);

  var outEl = document.getElementById(`blog-polished-out`);
  if (outEl) outEl.textContent = out;
}

// ── Save polished version as new entry ───────────────────────────────────
function blogSavePolished() {
  var polished = (document.getElementById(`blog-polished-out`)?.textContent || ``).trim();
  if (!polished || polished === `Polished post will appear here after Becky works on it...`) {
    setSt(`blog-polish-st`, `e`, `Polish your entry first.`); return;
  }
  var entries = blogGetEntries();
  entries.unshift({ id:`bl${esc(Date.now())}`, body: polished, date: new Date().toLocaleDateString(), mood: `polished`, created: new Date().toISOString() });
  blogSetEntries(entries);
  setSt(`blog-polish-st`, `k`, `Polished version saved! ✅`);
  blogUpdStats();
  blogRenderEntries();
}

// ── Copy raw entry + open LinkedIn ───────────────────────────────────────
function blogCopyAndPost() {
  var body = (document.getElementById(`blog-body`)?.value || ``).trim();
  if (!body) { setSt(`blog-post-st`, `e`, `Write your entry first.`); return; }
  navigator.clipboard.writeText(body).then(() => {
    setSt(`blog-post-st`, `k`, `Copied! LinkedIn is opening — paste into Start a Post.`);
    setTimeout(() => window.open(`https://www.linkedin.com/feed/`, `_blank`), 400);
  }).catch(() => {
    // Mobile fallback
    var ta = document.createElement(`textarea`);
    ta.value = body; ta.style.position = `fixed`; ta.style.opacity = `0`;
    document.body.appendChild(ta); ta.focus(); ta.select();
    try { document.execCommand(`copy`); setSt(`blog-post-st`, `k`, `Copied! Opening LinkedIn...`); }
    catch(e) { setSt(`blog-post-st`, `i`, `Long-press your entry text and copy manually, then open LinkedIn.`); }
    document.body.removeChild(ta);
    setTimeout(() => window.open(`https://www.linkedin.com/feed/`, `_blank`), 500);
  });
}

// ── Copy polished version + open LinkedIn ────────────────────────────────
function blogCopyPolishedAndPost() {
  var polished = (document.getElementById(`blog-polished-out`)?.textContent || ``).trim();
  if (!polished || polished === `Polished post will appear here after Becky works on it...`) {
    setSt(`blog-polish-st`, `e`, `Polish your entry first.`); return;
  }
  navigator.clipboard.writeText(polished).then(() => {
    setSt(`blog-polish-st`, `k`, `Polished post copied! LinkedIn is opening.`);
    setTimeout(() => window.open(`https://www.linkedin.com/feed/`, `_blank`), 400);
  }).catch(() => {
    var ta = document.createElement(`textarea`);
    ta.value = polished; ta.style.position = `fixed`; ta.style.opacity = `0`;
    document.body.appendChild(ta); ta.focus(); ta.select();
    try { document.execCommand(`copy`); setSt(`blog-polish-st`, `k`, `Copied! Opening LinkedIn...`); }
    catch(e) { setSt(`blog-polish-st`, `i`, `Long-press the polished text and copy manually.`); }
    document.body.removeChild(ta);
    setTimeout(() => window.open(`https://www.linkedin.com/feed/`, `_blank`), 500);
  });
}

// ── Generate topic ideas ──────────────────────────────────────────────────
async function blogGenIdeas() {
  var seed = (document.getElementById(`blog-idea-seed`)?.value || ``).trim();
  setSt(`blog-ideas-st`, `i`, `Becky is generating topic ideas...`);
  var prompt = `Generate 8 LinkedIn blog post ideas for John Lanter — 59, Orange Texas, former Lead Production Operator at Lion Elastomers (20+ years, plant closed Dec 2025), now CEO of AffiliateMediaHub Studio building AI content tools. Faith-driven, authentic, blue-collar turned entrepreneur.${seed ? ` He wants ideas related to: ${seed}` : ``}\n\nFor each idea give:\n1. A one-line title\n2. One sentence on what angle to take\n\nMake them personal, real, and LinkedIn-appropriate. No generic AI fluff.`;
  var out = await groqCall(prompt, BECKY_SYSTEM_PROMPT);
  hideSt(`blog-ideas-st`);
  var el = document.getElementById(`blog-ideas-out`);
  if (el) el.textContent = out;
}

// ── Init blog page when nav opens it ─────────────────────────────────────
// (blogTab, blogInitDate, blogUpdStats are called by the nav hook already)
// Also render entries when drafts tab opens
var _blogNavHook = nav;
nav = function(id) {
  _blogNavHook(id);
  if (id === `linkedin`) {
    setTimeout(() => {
      blogTab(`write`);
      blogInitDate();
      blogUpdStats();
      blogRenderEntries();
      blogWordCount();
    }, 120);
  }
};

// ═══════════════════════════════════════════════════════════════════════════

function msTab(id) {
  [`learn`,`tools`,`cert`,`ai`,`msnotes`].forEach(t => {
    var el  = document.getElementById(`ms-${esc(t)}`);
    var btn = document.getElementById(`mstab-${esc(t)}`);
    if (!el || !btn) return;
    var active = t === id;
    el.style.display  = active ? `block` : `none`;
    btn.style.background = active ? `#00a4ef` : `var(--bg2)`;
    btn.style.color      = active ? `#fff`    : `var(--muted)`;
  });
  if (id === `msnotes`) msRenderNotes();
}

function getMsNotes() {
  try { return JSON.parse(localStorage.getItem(`hev4_ms_notes`) || `[]`); } catch(e) { return []; }
}
function setMsNotes(n) { localStorage.setItem(`hev4_ms_notes`, JSON.stringify(n)); }

function msSaveNote() {
  var topic   = document.getElementById(`ms-note-topic`).value.trim();
  var learned = document.getElementById(`ms-note-learned`).value.trim();
  var use     = document.getElementById(`ms-note-use`).value.trim();
  if (!learned) { setSt(`ms-note-st`, `e`, `Please enter what you learned.`); return; }
  var notes = getMsNotes();
  notes.unshift({ id: `msn${esc(Date.now())}`, topic: topic || `General Microsoft`, learned, use, date: new Date().toLocaleDateString() });
  setMsNotes(notes);
  document.getElementById(`ms-note-topic`).value   = ``;
  document.getElementById(`ms-note-learned`).value = ``;
  document.getElementById(`ms-note-use`).value     = ``;
  setSt(`ms-note-st`, `k`, `Note saved!`);
  msRenderNotes();
}

function msRenderNotes() {
  var el = document.getElementById(`ms-notes-list`);
  if (!el) return;
  var notes = getMsNotes();
  if (!notes.length) {
    el.innerHTML = `<div style="font-size:13px;color:var(--muted);text-align:center;padding:24px">No notes yet — study a Microsoft tool and capture your takeaways here.</div>`;
    return;
  }
  var html = ``;
  notes.forEach(n => {
    html += `<div class="card mb10" style="border-left:3px solid #00a4ef">`;
    html += `<div class="fsb mb6">`;
    html += `<div style="font-size:11px;color:#00a4ef;font-weight:700">${esc(n.topic)}</div>`;
    html += `<div class="fca gap8"><span style="font-size:11px;color:var(--muted)">${esc(n.date)}</span>`;
    html += `<button class="btn btn-danger btn-xs" data-id="${esc(n.id)}" onclick="msDelNote(this.dataset.id)">✕</button></div>`;
    html += `</div>`;
    html += `<div style="font-size:13px;font-weight:600;margin-bottom:6px">${esc(n.learned)}</div>`;
    if (n.use) html += `<div style="font-size:12px;color:var(--muted)">→ At work: ${esc(n.use)}</div>`;
    html += `</div>`;
  });
  el.innerHTML = html;
}

function msDelNote(id) {
  if (!confirm(`Delete this note?`)) return;
  setMsNotes(getMsNotes().filter(n => n.id !== id));
  msRenderNotes();
}

async function msAskBecky() {
  var topic   = document.getElementById(`ms-note-topic`).value.trim();
  var learned = document.getElementById(`ms-note-learned`).value.trim();
  if (!learned) { setSt(`ms-note-st`, `e`, `Enter what you learned first.`); return; }
  setSt(`ms-note-st`, `i`, `Becky is expanding your notes...`);
  var reply = await groqCall(`I am studying Microsoft tools to help me get an Operations Coordinator or Warehouse Supervisor job in Southeast Texas. I just studied: ${topic || `Microsoft`}. Here is what I learned: ${esc(learned)}. Please give me: 1) A practical example of how I would use this exact skill in a daily operations coordinator job. 2) One interview question an employer might ask about this skill, with a strong answer using my 20 years of manufacturing experience.`);
  hideSt(`ms-note-st`);
  var useEl = document.getElementById(`ms-note-use`);
  if (useEl) useEl.value = reply;
}

// Init Microsoft tab when navigating to the page
var _navWithMs = nav;
nav = function(id) {
  _navWithMs(id);
  if (id === `microsoft`) {
    msTab(`learn`);
    document.getElementById(`tbl`).textContent = `Microsoft Skills`;
  }
};


// ═══ PROMPT HELPER ═══════════════════════════════════════════════════════

function phSend() {
  var txt = document.getElementById(`ph-input`).value.trim();
  if (!txt) { setSt(`ph-st`, `e`, `Please paste a prompt first.`); return; }
  // Load it into Becky chat and send
  var inp = document.getElementById(`bin`);
  if (inp) inp.value = txt;
  bSend();
  setSt(`ph-st`, `k`, `Prompt sent to Becky!`);
}

async function phImprove() {
  var txt = document.getElementById(`ph-input`).value.trim();
  if (!txt) { setSt(`ph-st`, `e`, `Please paste a prompt to improve.`); return; }
  setSt(`ph-st`, `i`, `Becky is rewriting your prompt...`);
  var sys = `You are a prompt engineering expert. When given a rough or simple prompt, rewrite it into a detailed, specific, high-quality prompt that will get much better AI results. Keep the original intent. Add: clear role/context, specific instructions, desired format, tone, length, and any other details that make the prompt stronger. Return ONLY the improved prompt — no explanation, no preamble.`;
  var improved = await groqCall(
    `Please improve this prompt so it gets better results from an AI assistant:\n\n"${esc(txt)}"`,
    sys
  );
  hideSt(`ph-st`);
  var impText = document.getElementById(`ph-improved-text`);
  var impBox  = document.getElementById(`ph-improved`);
  if (impText) impText.textContent = improved;
  if (impBox)  impBox.style.display = `block`;
}

function phSendImproved() {
  var improved = document.getElementById(`ph-improved-text`).textContent.trim();
  if (!improved) return;
  var inp = document.getElementById(`bin`);
  if (inp) inp.value = improved;
  bSend();
  setSt(`ph-st`, `k`, `Improved prompt sent to Becky!`);
}

function phClear() {
  var el = document.getElementById(`ph-input`);
  if (el) el.value = ``;
  var box = document.getElementById(`ph-improved`);
  if (box) box.style.display = `none`;
  var st = document.getElementById(`ph-st`);
  if (st) { st.className = `st`; st.textContent = ``; }
}

// ═══ AI JOB FINDER — FULL SYSTEM ═════════════════════════════════════════

// John's profile — auto-injected into every Becky call
function jfGetProfile() {
  var name    = document.getElementById(`jf-r-name`)?.value    || `John Lanter`;
  var loc     = document.getElementById(`jf-r-loc`)?.value     || `Orange, Texas`;
  var email   = document.getElementById(`jf-r-email`)?.value   || `AffiliateMediaHub@gmail.com`;
  var roles   = document.getElementById(`jf-r-roles`)?.value   || `Operations Coordinator, Warehouse Supervisor, Logistics Coordinator`;
  var pref    = document.getElementById(`jf-r-pref`)?.value    || `On-site in Southeast Texas preferred`;
  var skills  = document.getElementById(`jf-r-skills`)?.value  || `Forklift Certified, 20+ Years Production Operations, Team Supervision`;
  var history = document.getElementById(`jf-r-history`)?.value || `2012–2025: Lead Production Operator at Lion Elastomers`;
  var summary = document.getElementById(`jf-r-summary`)?.value || ``;
  return `CANDIDATE PROFILE:
Name: ${esc(name)}
Location: ${esc(loc)}
Email: ${esc(email)}
Work Preference: ${esc(pref)}
Target Roles: ${esc(roles)}
Key Skills: ${esc(skills)}
Work History:
${esc(history)}
${summary ? `Personal Summary: ${summary}` : ``}`;
}

// localStorage helpers
function jfGetSaved()  { try { return JSON.parse(localStorage.getItem(`hev4_jf_saved`) || `[]`); } catch(e) { return []; } }
function jfGetApps()   { try { return JSON.parse(localStorage.getItem(`hev4_jf_apps`)  || `[]`); } catch(e) { return []; } }
function jfSetSaved(d) { localStorage.setItem(`hev4_jf_saved`,  JSON.stringify(d)); }
function jfSetApps(d)  { localStorage.setItem(`hev4_jf_apps`,   JSON.stringify(d)); }

// ── Tab switcher ──────────────────────────────────────────────────────
function jfTab(id) {
  [`resume`,`search`,`apply`,`saved`,`tracker`].forEach(t => {
    var el  = document.getElementById(`jf-${esc(t)}`);
    var btn = document.getElementById(`jftab-${esc(t)}`);
    if (!el || !btn) return;
    var active = t === id;
    el.style.display     = active ? `block` : `none`;
    btn.style.background = active ? `var(--teal)` : `var(--bg2)`;
    btn.style.color      = active ? `#000` : `var(--muted)`;
  });
  if (id === `saved`)   { jfRenderSaved(); jfUpdSavedCount(); }
  if (id === `tracker`) { jfRenderApps(); jfUpdStats(); }
  if (id === `resume`)  jfLoadResume();
}

function jfCheckKey() {
  var k = localStorage.getItem(`hev4_groq`) || ``;
  var el = document.getElementById(`jf-key-warn`);
  if (el) el.style.display = k ? `none` : `block`;
}

// ── RESUME SAVE / LOAD ────────────────────────────────────────────────
function jfSaveResume() {
  var data = {
    name: document.getElementById(`jf-r-name`)?.value,
    loc:  document.getElementById(`jf-r-loc`)?.value,
    email:document.getElementById(`jf-r-email`)?.value,
    phone:document.getElementById(`jf-r-phone`)?.value,
    li:   document.getElementById(`jf-r-linkedin`)?.value,
    roles:document.getElementById(`jf-r-roles`)?.value,
    pref: document.getElementById(`jf-r-pref`)?.value,
    skills:  document.getElementById(`jf-r-skills`)?.value,
    history: document.getElementById(`jf-r-history`)?.value,
    summary: document.getElementById(`jf-r-summary`)?.value,
  };
  localStorage.setItem(`hev4_resume`, JSON.stringify(data));
  setSt(`jf-resume-st`, `k`, `Resume profile saved! Becky will use this for every application.`);
}

function jfLoadResume() {
  try {
    var d = JSON.parse(localStorage.getItem(`hev4_resume`) || `{}`);
    if (d.name)    document.getElementById(`jf-r-name`).value    = d.name;
    if (d.loc)     document.getElementById(`jf-r-loc`).value     = d.loc;
    if (d.email)   document.getElementById(`jf-r-email`).value   = d.email;
    if (d.phone)   document.getElementById(`jf-r-phone`).value   = d.phone;
    if (d.li)      document.getElementById(`jf-r-linkedin`).value = d.li;
    if (d.roles)   document.getElementById(`jf-r-roles`).value   = d.roles;
    if (d.pref)    document.getElementById(`jf-r-pref`).value    = d.pref;
    if (d.skills)  document.getElementById(`jf-r-skills`).value  = d.skills;
    if (d.history) document.getElementById(`jf-r-history`).value = d.history;
    if (d.summary) document.getElementById(`jf-r-summary`).value = d.summary;
  } catch(e) {}
}

async function jfGenMasterSummary() {
  setSt(`jf-resume-st`, `i`, `Becky is writing your master summary...`);
  var prof = jfGetProfile();
  var out  = await groqCall(
    `Write a professional resume summary for this candidate:\n${esc(prof)}\n\nWrite a 3-4 sentence master summary that works as a starting point for any operations or logistics role application. Confident but not arrogant. Highlights manufacturing leadership and willingness to grow. Mention AI content studio as modern initiative. Under 80 words.`,
    `You are a professional resume writer specializing in manufacturing-to-management career transitions.`
  );
  hideSt(`jf-resume-st`);
  var el = document.getElementById(`jf-r-summary`);
  if (el) el.value = out;
}

function jfCopyFullResume() {
  var name    = document.getElementById(`jf-r-name`)?.value || `John Lanter`;
  var loc     = document.getElementById(`jf-r-loc`)?.value  || `Orange, Texas`;
  var email   = document.getElementById(`jf-r-email`)?.value;
  var phone   = document.getElementById(`jf-r-phone`)?.value;
  var li      = document.getElementById(`jf-r-linkedin`)?.value;
  var roles   = document.getElementById(`jf-r-roles`)?.value;
  var skills  = document.getElementById(`jf-r-skills`)?.value;
  var history = document.getElementById(`jf-r-history`)?.value;
  var summary = document.getElementById(`jf-r-summary`)?.value;

  var text = `${esc(name)}\n${esc(loc)}${email ? ` · ${email}` : ``}${phone ? ` · ${phone}` : ``}${li ? `\n${li}` : ``}\n\n`;
  if (summary) text += `SUMMARY\n${esc(summary)}\n\n`;
  text += `KEY SKILLS\n${esc(skills)}\n\nWORK HISTORY\n${esc(history)}\n\nTARGET ROLES: ${esc(roles)}`;
  navigator.clipboard.writeText(text).then(() => setSt(`jf-resume-st`, `k`, `Full resume text copied to clipboard!`)).catch(() => {});
}

// ── SEARCH ────────────────────────────────────────────────────────────
function jfGetTypePhrrase() {
  var t = document.getElementById(`jf-type`)?.value || `remote`;
  var map = {
    'remote':    `remote jobs (work from home, anywhere in the US)`,
    'se-texas':  `on-site jobs in Orange TX, Beaumont TX, or Port Arthur TX area`,
    'ai-remote': `remote jobs involving AI tools, content creation, or digital workflow management`,
    'ops':       `Operations Coordinator, Logistics Coordinator, or Warehouse Supervisor roles`,
    'hybrid':    `hybrid jobs — part remote and part on-site`,
    'learning':  `trainee programs, apprenticeships, or roles with strong on-the-job training`,
    'any':       `any open positions — remote, hybrid, or on-site`
  };
  return map[t] || `job opportunities`;
}

async function jfSearch() {
  jfCheckKey();
  setSt(`jf-st`, `i`, `Becky is searching for opportunities...`);
  var typePhrase = jfGetTypePhrrase();
  var custom = document.getElementById(`jf-custom`)?.value.trim();
  var prof   = jfGetProfile();

  var prompt = `You are a job search assistant. Find real opportunities for this candidate:\n${esc(prof)}\n\nSearch for: ${esc(typePhrase)}${custom ? `. Additional focus: ${custom}` : ``}\n\nFor each opportunity found, present in this exact format:\n\n━━━━━━━━━━━━━━━━━━━━━━━━\n1. COMPANY: [Name]\n2. ROLE: [Job Title] — [Remote/Hybrid/On-site]\n3. WHY IT MATCHES: [2 sentences specific to John]\n4. KEY REQUIREMENTS: [Skills they want]\n5. HOW TO APPLY: [Website or job board URL]\n6. SALARY: [If known]\n7. FIRST STEP TODAY: [Exactly what John should do right now]\n━━━━━━━━━━━━━━━━━━━━━━━━\n\nList 4 real opportunities. If unsure a specific posting is live, recommend the company and where to check. Be specific and practical.`;

  var out = await groqCall(prompt, `You are Becky, an expert job search assistant. Be specific, practical, and focused on opportunities that genuinely match this candidate's background. Always present results in the exact format requested.`);
  hideSt(`jf-st`);
  var el = document.getElementById(`jf-results`);
  if (el) el.textContent = out;
}

async function jfRemoteSpecific() {
  setSt(`jf-st`, `i`, `Finding remote jobs...`);
  var prof = jfGetProfile();
  var out  = await groqCall(
    `${esc(prof)}\n\nFind 5 remote job opportunities this person can apply to today. Focus on: 1) Remote operations and project coordinator roles, 2) Remote customer success or account manager roles for industrial companies, 3) Remote content creation or AI workflow roles. For each: company name, role, why it fits, where to apply, and salary if known. Be specific about how to find and apply for each one.`,
    `You are a remote job search specialist. Find real remote opportunities for this specific candidate profile.`
  );
  hideSt(`jf-st`);
  var el = document.getElementById(`jf-results`);
  if (el) el.textContent = out;
}

async function jfAIJobs() {
  setSt(`jf-st`, `i`, `Finding AI-friendly jobs...`);
  var prof = jfGetProfile();
  var out  = await groqCall(
    `${esc(prof)}\n\nFind 5 companies that would value an employee who is actively building AI content tools and learning prompt engineering. These should be companies where his AffiliateMediaHub Studio experience would be seen as a strength — initiative, self-directed learning, modern skills. Mix of remote and SE Texas roles. Include where to apply for each.`,
    `You are a career advisor helping candidates position their AI self-learning as a competitive advantage.`
  );
  hideSt(`jf-st`);
  var el = document.getElementById(`jf-results`);
  if (el) el.textContent = out;
}

async function jfSkillGap() {
  setSt(`jf-st`, `i`, `Analyzing skill gaps...`);
  var prof = jfGetProfile();
  var out  = await groqCall(
    `${esc(prof)}\n\nAnalyze this candidate and identify:\n1. TOP 5 SKILLS to learn in next 30 days for remote operations or AI content roles — with specific free course names and platforms\n2. TOP 3 CERTIFICATIONS that would most improve his competitiveness\n3. DAILY PRACTICE — a simple 20-minute daily routine to build AI skills\n4. REMOTE WORK TIPS — how to position his manufacturing background for remote roles\nBe specific with platform names and course titles.`
  );
  hideSt(`jf-st`);
  var el = document.getElementById(`jf-results`);
  if (el) el.textContent = out;
}

async function jfQuick(prompt) {
  setSt(`jf-st`, `i`, `Becky is working on it...`);
  var out = await groqCall(`You are a job search assistant for:\n${esc(jfGetProfile())}\n\n${esc(prompt)}`);
  hideSt(`jf-st`);
  var el = document.getElementById(`jf-results`);
  if (el) el.textContent = out;
}

function jfClearResults() {
  var el = document.getElementById(`jf-results`);
  if (el) el.textContent = `Click Search to have Becky find opportunities for you.`;
}

// ── APPLICATION PACKAGE ───────────────────────────────────────────────
async function jfBuildPackage() {
  var company = document.getElementById(`jf-a-company`)?.value.trim();
  var title   = document.getElementById(`jf-a-title`)?.value.trim();
  var loc     = document.getElementById(`jf-a-loc`)?.value.trim();
  var desc    = document.getElementById(`jf-a-desc`)?.value.trim();
  if (!company || !title) { setSt(`jf-apply-st`, `e`, `Please enter company name and job title.`); return; }

  setSt(`jf-apply-st`, `i`, `Becky is building your full application package — this takes about 20 seconds...`);
  var prof = jfGetProfile();
  var jobInfo = `Company: ${esc(company)}\nRole: ${esc(title)}\nLocation: ${loc || `Not specified`}\nJob Requirements:\n${desc || `Not provided — use general qualifications for this type of role`}`;

  var sys = `You are a professional resume and cover letter writer specializing in manufacturing-to-management career transitions. Write everything in John Lanter's authentic voice — confident, experienced, honest. Never generic. Always specific to the exact job.`;

  // Build all 4 documents
  var summaryPrompt = `${esc(prof)}\n\nJOB:\n${esc(jobInfo)}\n\nWrite a custom resume summary (3-4 sentences, under 80 words) tailored specifically to this role. Open with years of relevant experience. Highlight the most matching skills. End with what he brings to this company. Return ONLY the summary text.`;

  var coverPrompt = `${esc(prof)}\n\nJOB:\n${esc(jobInfo)}\n\nWrite a full cover letter for this specific job. Structure: 1) Strong opening that connects his experience directly to this role (not generic). 2) Paragraph about his 20+ years manufacturing leadership and specific achievements relevant to this job. 3) Paragraph matching his specific skills to their requirements. 4) Mention AffiliateMediaHub Studio as evidence of initiative and modern skills. 5) Confident closing with clear next step. Under 280 words. Professional but warm tone. Sign off as John Lanter.`;

  var fitPrompt = `${esc(prof)}\n\nJOB:\n${esc(jobInfo)}\n\nWrite a concise "Why I am a Good Fit" statement (5-7 bullet points) matching his specific experience to this job's requirements. Be honest and specific. Also note any gap areas and how he is addressing them.`;

  var followupPrompt = `Write a polite 2-week follow-up email for John Lanter after applying for ${esc(title)} at ${esc(company)}. Professional, brief (under 100 words), shows continued strong interest. Signed John Lanter, Orange Texas.`;

  // Run all 4 in parallel
  var [summary, cover, fit, followup] = await Promise.all([
    groqCall(summaryPrompt, sys),
    groqCall(coverPrompt, sys),
    groqCall(fitPrompt, sys),
    groqCall(followupPrompt, sys)
  ]);

  hideSt(`jf-apply-st`);

  var set = (id, val) => { var el = document.getElementById(id); if (el) el.textContent = val; };
  set(`jf-out-summary`,  summary);
  set(`jf-out-cover`,    cover);
  set(`jf-out-fit`,      fit);
  set(`jf-out-followup`, followup);

  setSt(`jf-apply-st`, `k`, `Application package ready! Copy each section and paste into the job application.`);
}

function jfCopySection(id) {
  var el = document.getElementById(id);
  if (!el) return;
  var text = el.textContent.trim();
  if (!text || text.includes(`will appear here`) || text.includes(`Build your`)) { alert(`No content yet — build your package first.`); return; }
  navigator.clipboard.writeText(text).then(() => {
    var old = el.style.outline;
    el.style.outline = `2px solid var(--teal)`;
    setTimeout(() => el.style.outline = old, 700);
  }).catch(() => {});
}

function jfOpenApplication() {
  var url = (document.getElementById(`jf-a-url`)?.value || ``).trim();
  // Must start with http:// or https:// to be a real external URL
  if (!url) {
    setSt(`jf-apply-st`, `e`, `No application URL entered — add the job posting URL in the Job Details section above, then click Open Application.`);
    return;
  }
  if (!url.startsWith(`http://`) && !url.startsWith(`https://`)) {
    url = `https://` + url;
  }
  setSt(`jf-apply-st`, `k`, `Opening application page — your prompts are in the sections above ready to copy and paste.`);
  window.open(url, `_blank`);
}

function jfLogFromPackage() {
  var comp = document.getElementById(`jf-a-company`)?.value.trim();
  var role = document.getElementById(`jf-a-title`)?.value.trim();
  if (!comp) { alert(`No company entered in the job details.`); return; }
  var apps = jfGetApps();
  var today = new Date().toISOString().split(`T`)[0];
  var follow = new Date(); follow.setDate(follow.getDate() + 14);
  apps.unshift({ id:`a${esc(Date.now())}`, comp, role: role || `Unknown`, date: today, followup: follow.toISOString().split(`T`)[0], status:`applied`, notes:`Applied via AI Job Finder · Package generated by Becky` });
  jfSetApps(apps);
  setSt(`jf-apply-st`, `k`, `Logged! Check the Application Log tab.`);
  jfUpdStats();
}

function jfSaveJob() {
  var company = document.getElementById(`jf-a-company`)?.value.trim();
  var title   = document.getElementById(`jf-a-title`)?.value.trim();
  var loc     = document.getElementById(`jf-a-loc`)?.value.trim();
  var url     = document.getElementById(`jf-a-url`)?.value.trim();
  var desc    = document.getElementById(`jf-a-desc`)?.value.trim();
  if (!company) { setSt(`jf-apply-st`, `e`, `Enter a company name first.`); return; }
  var saved = jfGetSaved();
  saved.unshift({ id:`c${esc(Date.now())}`, name: company, title: title || `Unknown`, loc: loc || ``, url, desc: desc?.substring(0,200), saved: new Date().toLocaleDateString() });
  jfSetSaved(saved);
  setSt(`jf-apply-st`, `k`, `Job saved! Check the Saved Jobs tab.`);
  jfUpdSavedCount();
}

// ── SAVED JOBS ────────────────────────────────────────────────────────
function jfRenderSaved() {
  var el = document.getElementById(`jf-saved-list`);
  if (!el) return;
  var jobs = jfGetSaved();
  if (!jobs.length) { el.innerHTML = `<div style="font-size:13px;color:var(--muted);text-align:center;padding:24px">No saved jobs yet.</div>`; return; }
  var html = ``;
  jobs.forEach(j => {
    html += `<div class="card mb10" style="border-left:3px solid var(--teal)">`;
    html += `<div class="fsb mb6"><div><div class="bold">${esc(j.name)}</div><div style="font-size:12px;color:var(--muted)">${esc(j.title)}${j.loc ? ` · ${j.loc}` : ``}</div></div>`;
    html += `<div class="fca gap6">`;
    if (j.url) html += `<a href="${esc(j.url)}" target="_blank" class="btn btn-ghost btn-xs" rel="noopener noreferrer">Apply →</a>`;
    html += `<button class="btn btn-ghost btn-xs" data-jid="${esc(j.id)}" onclick="jfLoadToApply(this.dataset.jid)">✍ Build Package</button>`;
    html += `<button class="btn btn-danger btn-xs" data-jid="${esc(j.id)}" onclick="jfDelSaved(this.dataset.jid)">✕</button>`;
    html += `</div></div>`;
    if (j.desc) html += `<div style="font-size:12px;color:var(--muted)">${esc(j.desc)}</div>`;
    html += `</div>`;
  });
  el.innerHTML = html;
}

function jfLoadToApply(id) {
  var j = jfGetSaved().find(x => x.id === id);
  if (!j) return;
  var set = (eid, val) => { var el = document.getElementById(eid); if (el) el.value = val || ``; };
  set(`jf-a-company`, j.name);
  set(`jf-a-title`,   j.title);
  set(`jf-a-loc`,     j.loc);
  set(`jf-a-url`,     j.url);
  set(`jf-a-desc`,    j.desc);
  jfTab(`apply`);
}

function jfDelSaved(id) {
  jfSetSaved(jfGetSaved().filter(x => x.id !== id));
  jfRenderSaved();
  jfUpdSavedCount();
}

function jfClearSaved() { localStorage.removeItem(`hev4_jf_saved`); jfRenderSaved(); jfUpdSavedCount(); }
function jfUpdSavedCount() {
  var el = document.getElementById(`jf-saved-count`);
  if (el) el.textContent = jfGetSaved().length;
}

// ── APPLICATION LOG ───────────────────────────────────────────────────
function jfLogApp() {
  var comp   = document.getElementById(`jf-l-comp`)?.value.trim();
  var role   = document.getElementById(`jf-l-role`)?.value.trim();
  var date   = document.getElementById(`jf-l-date`)?.value || new Date().toISOString().split(`T`)[0];
  var follow = document.getElementById(`jf-l-follow`)?.value || ``;
  var status = document.getElementById(`jf-l-status`)?.value || `applied`;
  var notes  = document.getElementById(`jf-l-notes`)?.value.trim();
  if (!comp) { setSt(`jf-log-st`, `e`, `Please enter a company name.`); return; }
  var apps = jfGetApps();
  apps.unshift({ id:`a${esc(Date.now())}`, comp, role: role||`Unknown`, date, followup: follow, status, notes });
  jfSetApps(apps);
  [`jf-l-comp`,`jf-l-role`,`jf-l-date`,`jf-l-follow`,`jf-l-notes`].forEach(id => { var el=document.getElementById(id); if(el) el.value=``; });
  setSt(`jf-log-st`, `k`, `Application logged!`);
  jfRenderApps();
  jfUpdStats();
}

var JF_STATUS_C = { applied:`var(--blue)`, interview:`var(--teal)`, followup:`var(--gold)`, waiting:`var(--muted)`, rejected:`var(--red)`, offer:`var(--green)` };
var JF_STATUS_L = { applied:`Applied`, interview:`Interview`, followup:`Follow-Up`, waiting:`Waiting`, rejected:`No Response`, offer:`🎉 Offer` };

function jfRenderApps() {
  var el = document.getElementById(`jf-log-list`);
  if (!el) return;
  var apps = jfGetApps();
  if (!apps.length) { el.innerHTML = `<div style="font-size:13px;color:var(--muted);text-align:center;padding:24px">No applications logged yet.</div>`; return; }
  var today = new Date().toISOString().split(`T`)[0];
  var html = `<table><tr><th>Company</th><th>Role</th><th>Applied</th><th>Follow-Up</th><th>Status</th><th></th></tr>`;
  apps.forEach(a => {
    var pastDue = a.followup && a.followup <= today && a.status !== `offer`;
    html += `<tr><td><div class="bold">${esc(a.comp)}</div>${a.notes?`<div style="font-size:11px;color:var(--muted)">${a.notes.substring(0,40)}</div>`:``}</td>`;
    html += `<td style="font-size:13px">${esc(a.role)}</td>`;
    html += `<td style="font-size:12px;color:var(--muted)">${esc(a.date)}</td>`;
    html += `<td style="font-size:12px;color:${pastDue?`var(--gold)`:`var(--muted)`}">${a.followup||`—`}</td>`;
    html += `<td><span style="font-size:11px;font-weight:700;color:${JF_STATUS_C[a.status]||`var(--muted)`}">${esc(JF_STATUS_L[a.status]||a.status)}</span></td>`;
    html += `<td><select style="background:var(--bg3);border:1px solid var(--border);border-radius:6px;padding:3px 6px;color:var(--txt);font-size:11px" onchange="jfUpdStatus('${esc(a.id)}',this.value)">`;
    Object.entries(JF_STATUS_L).forEach(([v,l]) => { html += `<option value="` + v + `"` + (v===a.status ? ` selected` : ``) + `>` + l + `</option>`; });
    html += `</select></td></tr>`;
  });
  html += `</table>`;
  el.innerHTML = html;
}

function jfUpdStatus(id, status) {
  var apps = jfGetApps().map(a => a.id===id ? {...a, status} : a);
  jfSetApps(apps);
  jfUpdStats();
}

function jfUpdStats() {
  var apps  = jfGetApps();
  var today = new Date().toISOString().split(`T`)[0];
  var s = id => document.getElementById(id);
  if (s(`jf-stat-total`)) s(`jf-stat-total`).textContent = apps.length;
  if (s(`jf-stat-int`))   s(`jf-stat-int`).textContent   = apps.filter(a=>a.status===`interview`).length;
  if (s(`jf-stat-off`))   s(`jf-stat-off`).textContent   = apps.filter(a=>a.status===`offer`).length;
  if (s(`jf-stat-fup`))   s(`jf-stat-fup`).textContent   = apps.filter(a=>a.followup&&a.followup<=today&&a.status!==`offer`).length;
}

async function jfWriteFollowUps() {
  var apps = jfGetApps().filter(a => a.status===`applied`||a.status===`waiting`);
  if (!apps.length) { alert(`No pending applications to follow up on.`); return; }
  var list = apps.slice(0,3).map(a=>`${esc(a.comp)} — ${esc(a.role)} (applied ${esc(a.date)})`).join(`\n`);
  setSt(`jf-log-st`, `i`, `Writing follow-up emails...`);
  var out = await groqCall(`Write polite professional follow-up emails for John Lanter for these job applications:\n${esc(list)}\n\nOne email per application. Under 80 words each. Polite, shows continued interest, asks for status update. Sign off John Lanter, Orange Texas.`);
  hideSt(`jf-log-st`);
  // Drop into apply tab output
  var el = document.getElementById(`jf-out-followup`);
  if (el) el.textContent = out;
  jfTab(`apply`);
}

// Init on page open
var _navForJF = nav;
nav = function(id) {
  _navForJF(id);
  if (id === `jobfinder`) { jfCheckKey(); jfTab(`resume`); jfLoadResume(); }
  if (id === `becky`) { setTimeout(ytCheckConnected, 100); refreshKeyStatus(); }
  if (id === `linkedin`) { setTimeout(() => { blogTab(`write`); blogInitDate(); blogUpdStats(); }, 100); }
};


// ═══ PDF CONVERTER ═══════════════════════════════════════════════════════

var pdfBlobUrl = null;

function pdfConvert() {
  var title = (document.getElementById(`pdf-title`)?.value.trim()) || `Document`;
  var body  = document.getElementById(`pdf-body`)?.value.trim();

  if (!body) { setSt(`pdf-st`, `e`, `Please paste some text first.`); return; }

  setSt(`pdf-st`, `i`, `Building your PDF...`);

  // Build a clean printable HTML page
  var safeTitle = title.replace(/</g, `&lt;`).replace(/>/g, `&gt;`);
  var safeBody  = body
    .replace(/</g, `&lt;`)
    .replace(/>/g, `&gt;`)
    .replace(/\n\n/g, `</p><p>`)
    .replace(/\n/g, `<br>`);

  var html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${esc(safeTitle)}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 12pt;
    line-height: 1.8;
    color: #1a1a1a;
    padding: 60px 72px;
    max-width: 816px;
    margin: 0 auto;
  }
  h1 {
    font-size: 18pt;
    font-weight: bold;
    color: #0c0f1a;
    border-bottom: 2px solid #00d4aa;
    padding-bottom: 10px;
    margin-bottom: 24px;
    font-family: Arial, sans-serif;
  }
  .meta {
    font-size: 9pt;
    color: #6b7280;
    margin-bottom: 28px;
    font-family: Arial, sans-serif;
  }
  p {
    margin-bottom: 14px;
  }
  .content {
    font-size: 11pt;
    line-height: 1.85;
  }
  .footer {
    margin-top: 48px;
    padding-top: 12px;
    border-top: 1px solid #e5e7eb;
    font-size: 9pt;
    color: #9ca3af;
    font-family: Arial, sans-serif;
    text-align: center;
  }
  @media print {
    body { padding: 40px 56px; }
  }
</style>
</head>
<body>
  <h1>${esc(safeTitle)}</h1>
  <div class="meta">AffiliateMediaHub Studio · John Lanter · Generated ${esc(new Date().toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'}))})</div>
  <div class="content"><p>${esc(safeBody)}</p></div>
  <div class="footer">AffiliateMediaHub Studio · Orange, Texas · Hub Engine v4</div>
</body>
</html>`;

  // Create a Blob and open in a new window for print-to-PDF
  var blob = new Blob([html], { type: `text/html` });
  if (pdfBlobUrl) URL.revokeObjectURL(pdfBlobUrl);
  pdfBlobUrl = URL.createObjectURL(blob);

  // Show download area
  var area = document.getElementById(`pdf-download-area`);
  var lbl  = document.getElementById(`pdf-filename-label`);
  var btn  = document.getElementById(`pdf-dl-btn`);
  var filename = title.replace(/[^a-zA-Z0-9\s\-_]/g, ``).trim().replace(/\s+/g, `_`) + `.pdf`;

  if (lbl) lbl.textContent = `File will save as: ${esc(filename)}`;
  if (area) area.style.display = `block`;

  // Store for download
  pdfBlobUrl = pdfBlobUrl;
  window._pdfHtml     = html;
  window._pdfTitle    = title;
  window._pdfFilename = filename;

  hideSt(`pdf-st`);
  setSt(`pdf-st`, `k`, `PDF ready — click Download PDF below.`);
}

function pdfDownload() {
  if (!window._pdfHtml) { setSt(`pdf-st`, `e`, `Click Convert to PDF first.`); return; }

  // Open in new tab → user prints as PDF using Ctrl+P → Save as PDF
  var win = window.open(``, `_blank`);
  if (!win) {
    // Popup blocked — fallback: download as HTML file that opens cleanly
    var blob = new Blob([window._pdfHtml], { type: `text/html` });
    var a    = document.createElement(`a`);
    a.href   = URL.createObjectURL(blob);
    a.download = window._pdfFilename.replace(`.pdf`, `.html`);
    a.click();
    setSt(`pdf-st`, `i`, `Downloaded as HTML file. Open it in Chrome → press Ctrl+P → choose Save as PDF.`);
    return;
  }

  win.document.write(window._pdfHtml);
  win.document.close();

  // Trigger print dialog after brief delay for page to render
  setTimeout(() => {
    try {
      win.focus();
      win.print();
    } catch(e) {}
  }, 600);

  setSt(`pdf-st`, `k`, `Document opened — in the print dialog choose "Save as PDF" as the printer, then click Save.`);
}

function pdfFromNotepad() {
  var notes = document.getElementById(`np-pad`)?.value.trim();
  if (!notes) { setSt(`pdf-st`, `e`, `Notepad is empty — write some notes first.`); return; }
  var bodyEl = document.getElementById(`pdf-body`);
  if (bodyEl) bodyEl.value = notes;
  if (!document.getElementById(`pdf-title`)?.value) {
    var titleEl = document.getElementById(`pdf-title`);
    if (titleEl) titleEl.value = `Becky Notes — ` + new Date().toLocaleDateString();
  }
  setSt(`pdf-st`, `k`, `Notepad text loaded — click Convert to PDF.`);
}

function pdfClear() {
  var b = document.getElementById(`pdf-body`);
  var t = document.getElementById(`pdf-title`);
  var a = document.getElementById(`pdf-download-area`);
  if (b) b.value = ``;
  if (t) t.value = ``;
  if (a) a.style.display = `none`;
  var st = document.getElementById(`pdf-st`);
  if (st) { st.className = `st`; st.textContent = ``; }
  window._pdfHtml = null;
  window._pdfFilename = null;
}


// ═══ BECKY MAKES MY VIDEO ═══════════════════════════════════════════════

var BMV_SHOWS = {
  show1:     { host: `Lisa`, guest: `Susan`, style: `warm podcast host, smooth and engaging, natural gestures, shallow depth of field studio background, slow cinematic push-in, professional lighting` },
  show2:     { host: `Paul`, guest: `Alisha`, style: `trusted older male presenter, grandfatherly warmth, steady confident gaze, warm indoor lighting, natural speaking gestures` },
  show3:     { host: `Susan`, guest: `Alisha`, style: `professional female business presenter, confident and authoritative, modern office background, crisp lighting, direct eye contact with camera` },
  affiliate: { host: `Becky`, guest: `Becky`, style: `warm British female presenter, friendly genuine smile, natural head nods, cozy professional background, authentic and approachable` }
};

async function beckyMakesVideo() {
  var topic = (document.getElementById(`bmv-topic`)?.value || ``).trim();
  var show  = document.getElementById(`bmv-show`)?.value || `show1`;
  if (!topic) { setSt(`bmv-st`, `e`, `Please type your episode topic first — just a few words is fine.`); return; }

  setSt(`bmv-st`, `i`, `Becky is writing your script, video prompt, and caption... about 15 seconds...`);

  var sd  = BMV_SHOWS[show];
  var sys = `You are Becky, AI Creative Director for AffiliateMediaHub Studio. Write exactly what is asked with no extra commentary. Return only the requested content separated by the exact labels given.`;

  var prompt = `Write all three of these for a podcast video about: "${esc(topic)}"
Show: ${show === `show1` ? `Show 1 — Lisa + Susan` : show === `show2` ? `Show 2 — Paul + Alisha` : show === `show3` ? `Show 3 — Susan + Alisha Business` : `Affiliate — Becky`}
Host: ${esc(sd.host)}

Return EXACTLY this format with these exact labels on their own lines:

SCRIPT:
[Write a 30-second spoken hook script for ${esc(sd.host)} to say. Conversational, engaging, ends with a soft call to action. No stage directions. Just the words to speak. Under 80 words.]

DESIGNARENA PROMPT:
[Write a video generation prompt for DesignArena. Describe: ${esc(sd.style)}. Include the topic "${esc(topic)}" subtly in the visual mood. Under 50 words. Concrete visual language only.]

CAPTION:
[Write a social media caption for TikTok and Instagram Reels. Hook in first line. 2-3 short lines. 3-5 hashtags. Under 150 characters total before hashtags.]`;

  var out = await groqCall(prompt, sys);
  hideSt(`bmv-st`);

  // Parse the three sections
  var scriptMatch  = out.match(/SCRIPT:\s*([\s\S]*?)(?=DESIGNARENA PROMPT:|$)/i);
  var promptMatch  = out.match(/DESIGNARENA PROMPT:\s*([\s\S]*?)(?=CAPTION:|$)/i);
  var captionMatch = out.match(/CAPTION:\s*([\s\S]*?)$/i);

  var script  = scriptMatch  ? scriptMatch[1].trim()  : out;
  var vprompt = promptMatch  ? promptMatch[1].trim()  : `Confident presenter, professional lighting, cinematic camera movement, engaging and warm, dark studio background`;
  var caption = captionMatch ? captionMatch[1].trim() : ``;

  var el = id => document.getElementById(id);
  if (el(`bmv-script`))  el(`bmv-script`).textContent  = script;
  if (el(`bmv-prompt`))  el(`bmv-prompt`).textContent  = vprompt;
  if (el(`bmv-caption`)) el(`bmv-caption`).textContent = caption;
  if (el(`bmv-output`))  el(`bmv-output`).style.display = `block`;

  setSt(`bmv-st`, `k`, `Done! Copy each section and follow the 3 steps below.`);
}

// ═══ QUICK COPY FOR JOB FORMS ════════════════════════════════════════════

function qCopy(field) {
  // Pull from stored resume data
  var d = {};
  try { d = JSON.parse(localStorage.getItem(`hev4_resume`) || `{}`); } catch(e) {}

  var text = ``;
  var label = ``;

  switch(field) {
    case `name`:     text = d.name     || `John Lanter`;                     label = `Full Name`; break;
    case `email`:    text = d.email    || `AffiliateMediaHub@gmail.com`;      label = `Email`; break;
    case `phone`:    text = d.phone    || ``;                                 label = `Phone`; break;
    case `location`: text = (d.loc     || `Orange, Texas`);                   label = `Location`; break;
    case `title`:    text = `Lead Production Operator / Operations Coordinator`; label = `Job Title`; break;
    case `linkedin`: text = d.li       || ``;                                 label = `LinkedIn`; break;
    case `skills`:   text = d.skills   || `Forklift Certified, 20+ Years Operations, Team Supervision, Conveyor Systems, Compliance Reporting`; label = `Skills`; break;
    case `employer`: text = `Lion Elastomers (formerly Firestone Polymers) · Orange, TX`; label = `Last Employer`; break;
    case `years`:    text = `20+ years in manufacturing and operations leadership`; label = `Experience`; break;
    case `summary`:  text = d.summary  || `Results-driven operations professional with 20+ years of manufacturing leadership experience. Proven track record in team supervision, conveyor systems, compliance reporting, and forklift operations. Now also building AI content skills through AffiliateMediaHub Studio.`; label = `Summary`; break;
    default: text = ``; label = field;
  }

  if (!text) {
    setSt(`qcopy-st`, `e`, `${esc(label)} not saved yet — go to My Resume tab and save your profile first.`);
    return;
  }

  navigator.clipboard.writeText(text).then(() => {
    setSt(`qcopy-st`, `k`, `✅ ${esc(label)} copied — paste it into the form field now (Ctrl+V or long-press Paste).`);
    setTimeout(() => hideSt(`qcopy-st`), 3000);
  }).catch(() => {
    setSt(`qcopy-st`, `i`, `${esc(label)}: ${esc(text.substring(0, 60))}... — copy it manually.`);
  });
}


// ═══ PERPLEXITY PRO ══════════════════════════════════════════════════════
function perplexityPro() {
  var query = prompt("Enter your Hub Engine request for Perplexity Pro:");
  if (!query) return;
  window.open("https://www.perplexity.ai/search?q=" + encodeURIComponent(query) + "&copilot=true", "_blank");
}

function perplexityQuery(preset) {
  window.open("https://www.perplexity.ai/search?q=" + encodeURIComponent(preset) + "&copilot=true", "_blank");
}

// ═══ SIDEBAR COLLAPSE ════════════════════════════════════════════════════
function toggleMoreTools() {
  var list  = document.getElementById(`more-tools-list`);
  var arrow = document.getElementById(`more-arrow`);
  if (!list) return;
  var open = list.style.display !== `none`;
  list.style.display  = open ? `none` : `block`;
  if (arrow) arrow.textContent = open ? `▶` : `▼`;
}

// ═══ DASHBOARD STATS UPDATE ══════════════════════════════════════════════
function updDashStats() {
  // Job applications total
  try {
    var apps = JSON.parse(localStorage.getItem(`hev4_jf_apps`) || `[]`);
    var el = document.getElementById(`jf-stat-total-d`);
    if (el) el.textContent = apps.length;
  } catch(e) {}
  // Blog posts total
  try {
    var posts = JSON.parse(localStorage.getItem(`hev4_blog`) || `[]`);
    var el2 = document.getElementById(`blog-total-d`);
    if (el2) el2.textContent = posts.length;
  } catch(e) {}
}

// Run on dashboard open
var _navDash = nav;
nav = function(id) {
  _navDash(id);
  if (id === `dashboard`) setTimeout(updDashStats, 100);
};


// ═══ BECKY EXPORT FILE FOR GITHUB ════════════════════════════════════
function setExportRequest(text) {
  var inp = document.getElementById(`export-request-inp`);
  if (inp) { inp.value = text; inp.focus(); }
}

async function beckyExportFile() {
  var inp    = document.getElementById(`export-request-inp`);
  var btn    = document.getElementById(`export-run-btn`);
  var stEl   = document.getElementById(`export-st`);
  var zoneEl = document.getElementById(`export-zone`);

  var request = (inp ? inp.value.trim() : ``);
  if (!request) {
    if (stEl) { stEl.className = `st st-e on`; stEl.textContent = `Please type a request first — what file should Becky generate?`; }
    return;
  }

  if (btn)    { btn.disabled = true; btn.textContent = `⏳ Generating...`; }
  if (stEl)   { stEl.className = `st st-i on`; stEl.textContent = `Becky is writing your file — usually 10–20 seconds...`; }
  if (zoneEl) { zoneEl.style.display = `none`; }

  var sys = `You are a production code generator for Hub Engine v4 — an AI affiliate marketing and job search dashboard. Output ONLY syntactically correct, production-ready file content. No explanations. No markdown prose. Output the FILENAME line first, then a single fenced code block with the complete file contents.`;

  var prompt = `GENERATE A COMPLETE FILE READY FOR GITHUB COMMIT.

Request: ${esc(request)}

OUTPUT FORMAT — follow this EXACTLY:

FILENAME: exact-filename.js

\`\`\`javascript
// complete file content here — syntactically perfect, no placeholders
\`\`\`

Rules:
- The file must work standalone or drop into Hub Engine v4 with zero edits
- If generating prompts for the PROMPTS array, output valid JS with var PROMPTS_NEW = [...]
- If generating an HTML snippet, output clean HTML/JS with no broken tags
- If generating a script, output a complete .js file with all functions
- Production quality — no TODO comments, no placeholder text`;

  try {
    var fileContent = await groqCall(prompt, sys);

    // Parse filename
    var filenameMatch = fileContent.match(/FILENAME:\s*(.+)/i);
    var filename = filenameMatch ? filenameMatch[1].trim().replace(/[^a-zA-Z0-9._\-]/g, ``) : (`hub-engine-export-` + Date.now() + `.txt`);

    // Parse code block — try fenced first, then raw
    var codeMatch = fileContent.match(/```(?:[a-z]*)?\n([\s\S]*?)```/);
    var content   = codeMatch ? codeMatch[1].trim() : fileContent.replace(/FILENAME:.*\n?/i, ``).trim();

    // Trigger download
    var blob = new Blob([content], { type: `text/plain` });
    var url  = URL.createObjectURL(blob);
    var a    = document.createElement(`a`);
    a.href     = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Show preview
    if (zoneEl) {
      zoneEl.textContent  = `// ✅ FILE: ${esc(filename)}\n// SIZE: ${esc(content.length)} chars\n// LINES: ${content.split(`\n`).length}\n\n` + content.substring(0, 1200) + (content.length > 1200 ? `\n\n... (truncated — full file downloaded)` : ``);
      zoneEl.style.display = `block`;
    }

    if (stEl) { stEl.className = `st st-k on`; stEl.textContent = `✅ ${esc(filename)} downloaded! Push to GitHub → Vercel deploys in 30 seconds.`; }
    if (btn)  { btn.disabled = false; btn.textContent = `💾 Generate & Download`; }

  } catch(err) {
    if (stEl) { stEl.className = `st st-e on`; stEl.textContent = `Error: ` + (err.message || `groqCall failed — check your API key in Settings.`); }
    if (btn)  { btn.disabled = false; btn.textContent = `💾 Generate & Download`; }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// VIDEO FACTORY — TEAMS PAGE (pg-video → vt-teams tab)
// vTeamGenerate, vTeamGenerateAndNotebook, vTeamExport
// vPickTeam, vSetBatchN, vBatchGenerate, vBatchExport
// ═══════════════════════════════════════════════════════════════════════════

var vCurrentTeam = `podcast`;
var vBatchN      = 20;

var VTEAM_DATA = {
  podcast:   { name:`Podcast Duo`,        hosts:`Lisa (Host) + Susan (Guest)`, style:`Conversational podcast — host introduces, guest adds expert insight. Natural warm dialogue. Hook in 3 sec. CTA at end.`, ftc:false },
  business:  { name:`Business Explainer`, hosts:`Susan (Host) + Alisha (Guest)`, style:`Professional explainer — clear problem, solution walkthrough, 3 key benefits, confident CTA. Business tone.`, ftc:false },
  affiliate: { name:`Affiliate Promo`,    hosts:`Becky Host + Becky Guest`, style:`Affiliate duo — hook, personal story, product reveal, 3 benefits, FTC disclosure at start, link-in-bio CTA.`, ftc:true }
};

function vPickTeam(t) {
  vCurrentTeam = t;
  [`podcast`,`business`,`affiliate`].forEach(k => {
    var card = document.getElementById(`vteam-${esc(k)}`);
    var lbl  = document.getElementById(`vteam-${esc(k)}-lbl`);
    if (!card) return;
    var on = (k === t);
    card.style.borderColor = on ? `var(--teal)` : `var(--border)`;
    card.style.background  = on ? `rgba(0,212,170,.07)` : ``;
    if (lbl) { lbl.textContent = on ? `SELECTED` : `CLICK TO SELECT`; lbl.style.color = on ? `var(--teal)` : `var(--muted)`; }
  });
  // Update host/guest name display
  var td = VTEAM_DATA[t] || VTEAM_DATA.podcast;
  var parts = td.hosts.split(`+`);
  var hostEl  = document.getElementById(`vteam-host-name`);
  var guestEl = document.getElementById(`vteam-guest-name`);
  if (hostEl)  hostEl.textContent  = (parts[0] || `Lisa`).replace(/\(.*\)/,``).trim();
  if (guestEl) guestEl.textContent = (parts[1] || `Susan`).replace(/\(.*\)/,``).trim();
}

function vSetBatchN(n) {
  vBatchN = n;
  [5,10,20].forEach(x => {
    var btn = document.getElementById(`vbatch-n${esc(x)}`);
    if (btn) { btn.style.background = (x===n) ? `var(--gold)` : `var(--bg3)`; btn.style.color = (x===n) ? `#000` : `var(--txt)`; }
  });
  var cnt = document.getElementById(`vbatch-count`);
  if (cnt) cnt.textContent = n;
}

async function vTeamGenerate() {
  var topic = (document.getElementById(`vteam-topic`)?.value || ``).trim();
  if (!topic) { setSt(`vteam-st`, `e`, `Enter your episode or promo topic first.`); return; }
  var td = VTEAM_DATA[vCurrentTeam] || VTEAM_DATA.podcast;
  setSt(`vteam-st`, `i`, `Becky is writing your full script, VO, and caption...`);

  var sys = `You are Becky, AI Creative Director for AffiliateMediaHub Studio. Write production-ready video content only. No explanations. Return exactly the labeled sections requested.`;

  var prompt = `Write a complete video package for Hub Engine v4.\nTopic: "${esc(topic)}"\nTeam: ${esc(td.name)} — ${esc(td.hosts)}\nStyle: ${esc(td.style)}\n${td.ftc ? `FTC: Start with "This video contains affiliate links."` : ``}\n\nReturn EXACTLY these four labeled sections:\n\nSPOKEN SCRIPT:\n[Full dialogue 60-90 sec. Label every line HOST: or GUEST:. Add [PAUSE] where natural. Hook in first 3 seconds. Strong CTA at end.]\n\nNOTEBOOKLM VO:\n[Clean version of the script with HOST:/GUEST: labels removed — just the spoken words in sequence, ready to paste into NotebookLM for cinematic voice-over.]\n\nDESIGNARENA VISUAL:\n[40-60 word cinematic visual prompt. Describe setting, lighting, mood, motion, colors. No faces required. Suitable for DesignArena AI video generator.]\n\nCAPTION + HASHTAGS:\n[2-3 line caption. Hook first. CTA second. 5-7 hashtags on last line.]`;

  try {
    var out = await groqCall(prompt, sys);
    var get = label => { var m = out.match(new RegExp(label + `:\\s*([\\s\\S]*?)(?=SPOKEN SCRIPT:|NOTEBOOKLM VO:|DESIGNARENA VISUAL:|CAPTION \\+ HASHTAGS:|$)`,`i`)); return m ? m[1].trim() : ``; };
    var script  = get(`SPOKEN SCRIPT`);
    var vo      = get(`NOTEBOOKLM VO`);
    var visual  = get(`DESIGNARENA VISUAL`);
    var caption = get(`CAPTION \\+ HASHTAGS`);

    var el = id => document.getElementById(id);
    if (el(`vteam-script`))  el(`vteam-script`).textContent  = script  || out;
    if (el(`vteam-vo`))      el(`vteam-vo`).textContent      = vo      || script;
    if (el(`vteam-prompt`))  el(`vteam-prompt`).textContent  = visual;
    if (el(`vteam-caption`)) el(`vteam-caption`).textContent = caption;
    if (el(`vteam-out-wrap`)) el(`vteam-out-wrap`).style.display = `block`;
    setSt(`vteam-st`, `k`, `✅ Script ready — copy VO → paste into NotebookLM → run the pipeline.`);
  } catch(err) {
    setSt(`vteam-st`, `e`, `Error: ` + (err.message || `Groq call failed — check API key in Settings.`));
  }
}

async function vTeamGenerateAndNotebook() {
  await vTeamGenerate();
  setTimeout(() => window.open(`https://notebooklm.google.com`, `_blank`), 1200);
}

function vTeamExport() {
  var content = (document.getElementById(`vteam-script`)?.textContent || ``).trim();
  if (!content) { alert(`Generate a script first before exporting.`); return; }
  var blob = new Blob([content], {type:`text/plain`});
  var url  = URL.createObjectURL(blob);
  var a    = document.createElement(`a`);
  a.href = url; a.download = `hubengine-team-script-${esc(Date.now())}.txt`;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

async function vBatchGenerate() {
  var team  = document.getElementById(`vbatch-team`)?.value  || `podcast1`;
  var theme = (document.getElementById(`vbatch-theme`)?.value || ``).trim() || `AI tools and affiliate marketing for beginners`;
  var n     = vBatchN || 20;

  setSt(`vbatch-st`, `i`, `⚡ Becky is generating ${esc(n)} scripts — about 30-45 seconds...`);

  var teamMap = {
    podcast1:  `Show 1 — Lisa (Host) + Susan (Guest) · Warm podcast style`,
    podcast2:  `Show 2 — Paul (Host) + Alisha (Guest) · Grandfatherly warmth`,
    business:  `Show 3 — Susan (Host) + Alisha (Guest) · Professional business explainer`,
    affiliate: `Affiliate — Becky Host + Becky Guest · FTC disclosure required on each`
  };
  var teamLabel = teamMap[team] || teamMap.podcast1;
  var needFtc   = team === `affiliate`;

  var sys = `You are Becky, AI Creative Director for AffiliateMediaHub Studio. Generate multiple complete video scripts. Production-ready only. No filler. No explanations.`;

  var prompt = `Generate ${esc(n)} COMPLETE faceless video scripts.\nNiche/Theme: ${esc(theme)}\nTeam: ${esc(teamLabel)}\n${needFtc ? `FTC: Every script must start with "This video contains affiliate links."` : ``}\n\nFor each video output EXACTLY:\n--- VIDEO [N]: [CATCHY TITLE] ---\nSCRIPT: [60-90 sec HOST:/GUEST: dialogue with [PAUSE] markers. Hook in 3 sec. CTA at end.]\nNOTEBOOKLM: [Clean spoken-only version, no labels, paste-ready for NotebookLM]\nVISUAL: [40-word DesignArena cinematic prompt — setting, lighting, mood, motion]\nCAPTION: [2-line caption + 5 hashtags]\n\nSpread ${esc(n)} videos across: beginner tips, product promos, how-to tutorials, trending topics, motivation/story, comparisons. Every script unique.`;

  try {
    var result = await groqCall(prompt, sys);
    var bEl    = document.getElementById(`vbatch-scripts`);
    var wrap   = document.getElementById(`vbatch-out-wrap`);
    var cnt    = document.getElementById(`vbatch-count`);
    if (bEl)  { bEl.textContent = result; bEl.classList.add(`on`); }
    if (wrap)   wrap.style.display = `block`;
    if (cnt)    cnt.textContent = n;
    setSt(`vbatch-st`, `k`, `✅ ${esc(n)} scripts ready — copy one NotebookLM block at a time through the pipeline.`);
  } catch(err) {
    setSt(`vbatch-st`, `e`, `Error: ` + (err.message || `Groq call failed — check API key.`));
  }
}

function vBatchExport() {
  var content = (document.getElementById(`vbatch-scripts`)?.textContent || ``).trim();
  if (!content) { alert(`Generate scripts first before exporting.`); return; }
  var blob = new Blob([content], {type:`text/plain`});
  var url  = URL.createObjectURL(blob);
  var a    = document.createElement(`a`);
  a.href = url; a.download = `hubengine-batch-${esc(vBatchN)}-scripts-${esc(Date.now())}.txt`;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

// ═══════════════════════════════════════════════════════════════════════════

var vFactoryCurrentTeam = `podcast`;

var VFACTORY_TEAMS = {
  podcast: {
    name:`Podcast Duo`, hosts:`Lisa & Susan (or Paul & Alisha)`,
    style:`Conversational podcast episode — host introduces topic, guest shares expert insight, natural dialogue, ends with CTA`,
    ftc: false
  },
  business: {
    name:`Business Explainer`, hosts:`Susan & Alisha`,
    style:`Professional explainer — clear problem, solution walkthrough, 3 key benefits, confident CTA`,
    ftc: false
  },
  affiliate: {
    name:`Affiliate Promo`, hosts:`Becky Host & Becky Guest`,
    style:`Affiliate promo duo — hook, personal story, product reveal, 3 benefits, FTC disclosure, link-in-bio CTA`,
    ftc: true
  }
};

function vFactoryTeam(t) {
  vFactoryCurrentTeam = t;
  [`podcast`,`business`,`affiliate`].forEach(function(k) {
    var card = document.getElementById(`vfac-` + k);
    var lbl  = document.getElementById(`vfac-` + k + `-lbl`);
    if (!card) return;
    var active = (k === t);
    card.style.borderColor  = active ? `var(--teal)` : `var(--border)`;
    card.style.background   = active ? `rgba(0,212,170,.1)` : `var(--bg3)`;
    if (lbl) { lbl.textContent = active ? `SELECTED` : `CLICK TO SELECT`; lbl.style.color = active ? `var(--teal)` : `var(--muted)`; }
  });
}

async function vFactoryGenerate(n) {
  var topic = (document.getElementById(`vfac-topic`) ? document.getElementById(`vfac-topic`).value : ``).trim();
  if (!topic) { setSt(`vfac-st`, `e`, `Please enter a topic or product first.`); return; }
  var team = VFACTORY_TEAMS[vFactoryCurrentTeam] || VFACTORY_TEAMS.podcast;
  setSt(`vfac-st`, `i`, `Becky is scripting your faceless video — about 15 seconds...`);

  var sys = `You are Becky, Creative Director at AffiliateMediaHub Studio. You specialize in writing faceless video scripts for YouTube Shorts, TikTok, and Instagram Reels. All scripts are designed for: NotebookLM cinematic voice-over, DesignArena AI avatars, and CapCut polish. No paid voice tools needed. Owner: John Lanter, CEO Orange Texas.`;

  var prompt = `Write a complete FACELESS VIDEO PACKAGE for this topic:
Topic: ${esc(topic)}
Team: ${esc(team.name)} (${esc(team.hosts)})
Style: ${esc(team.style)}
${team.ftc ? `FTC Disclosure: Required — include "This video contains affiliate links" at the start.` : ``}

OUTPUT FORMAT — produce ALL sections:

=== BECKY SCRIPT (NotebookLM Ready) ===
[Full 60-90 second dialogue script with HOST: and GUEST: labels. Include [PAUSE] markers. Write so it sounds natural when read aloud. Hook in first 3 seconds.]

=== DESIGNARENA VISUAL PROMPT ===
[One vivid cinematic description for the AI video generator. 40-60 words. Describe: setting, mood, lighting, motion, colors. Make it cinematic and engaging. No faces needed — all environments, text overlays, motion graphics.]

=== CAPTION + HASHTAGS ===
[2-3 line TikTok/Instagram caption. Hook line first. CTA second. 5-7 relevant hashtags on third line.]

Make it production-ready. No placeholders. No explanations.`;

  try {
    var result = await groqCall(prompt, sys);

    // Parse sections
    var scriptMatch  = result.match(/=== BECKY SCRIPT[^=]*===\s*([\s\S]*?)(?===|$)/i);
    var promptMatch  = result.match(/=== DESIGNARENA[^=]*===\s*([\s\S]*?)(?===|$)/i);
    var captionMatch = result.match(/=== CAPTION[^=]*===\s*([\s\S]*?)(?===|$)/i);

    var script  = scriptMatch  ? scriptMatch[1].trim()  : result;
    var vprompt = promptMatch  ? promptMatch[1].trim()  : `Cinematic video: ${esc(topic)}. Modern, vibrant. Bold text overlays. Dynamic motion graphics. No faces. 4K quality.`;
    var caption = captionMatch ? captionMatch[1].trim() : `Check this out! #affiliatemarketing #aitools #makemoneyonline #johnlanter #affiliatemediahub`;

    var sEl = document.getElementById(`vfac-script`);
    var pEl = document.getElementById(`vfac-prompt`);
    var cEl = document.getElementById(`vfac-caption`);
    if (sEl) { sEl.textContent = script;  sEl.classList.add(`on`); }
    if (pEl) { pEl.textContent = vprompt; pEl.classList.add(`on`); }
    if (cEl) { cEl.textContent = caption; cEl.classList.add(`on`); }

    document.getElementById(`vfac-out-wrap`).style.display = `block`;
    document.getElementById(`vfac-batch-wrap`).style.display = `none`;
    setSt(`vfac-st`, `k`, `✅ Script ready! Copy Script → paste into NotebookLM → run the pipeline.`);
  } catch(err) {
    setSt(`vfac-st`, `e`, `Error: ` + (err.message || `groqCall failed — check your API key.`));
  }
}

async function vFactoryGenerateAndNotebook() {
  await vFactoryGenerate(1);
  setTimeout(() => window.open(`https://notebooklm.google.com`, `_blank`), 1200);
}

async function vFactoryBatch() {
  var topic = (document.getElementById(`vfac-topic`) ? document.getElementById(`vfac-topic`).value : ``).trim();
  if (!topic) { setSt(`vfac-st`, `e`, `Please enter a topic or niche first.`); return; }
  var team = VFACTORY_TEAMS[vFactoryCurrentTeam] || VFACTORY_TEAMS.podcast;
  setSt(`vfac-st`, `i`, `⚡ Becky is generating all 20 faceless video scripts — about 30-40 seconds...`);

  var sys = `You are Becky, Creative Director at AffiliateMediaHub Studio. You write faceless video scripts for YouTube Shorts, TikTok, and Instagram Reels. All scripts use the free pipeline: NotebookLM → DesignArena → CapCut.`;

  var prompt = `Generate 20 COMPLETE faceless video scripts for this niche/team:
Niche: ${esc(topic)}
Team: ${esc(team.name)} (${esc(team.hosts)})
Style: ${esc(team.style)}
${team.ftc ? `FTC Disclosure required on each.` : ``}

For each of the 20 videos, output:
--- VIDEO [N]: [TITLE] ---
SCRIPT: [60-90 sec HOST:/GUEST: dialogue with [PAUSE] markers]
VISUAL PROMPT: [40-word cinematic DesignArena prompt]
CAPTION: [2-line caption + 5 hashtags]

Cover these angles across the 20 videos:
- Beginner tips (3 videos)
- Product/affiliate promos (4 videos)
- How-to tutorials (4 videos)
- Trending topics in niche (3 videos)
- Motivational/story-driven (3 videos)
- Comparison/review (3 videos)

Make every script unique, catchy, and production-ready.`;

  try {
    var result = await groqCall(prompt, sys);
    var bEl = document.getElementById(`vfac-batch-scripts`);
    if (bEl) { bEl.textContent = result; bEl.classList.add(`on`); }
    document.getElementById(`vfac-batch-wrap`).style.display = `block`;
    document.getElementById(`vfac-out-wrap`).style.display = `none`;
    setSt(`vfac-st`, `k`, `✅ All 20 scripts ready! Copy one at a time → run through the pipeline.`);
  } catch(err) {
    setSt(`vfac-st`, `e`, `Error: ` + (err.message || `groqCall failed.`));
  }
}

function vFactoryExport() {
  var content = document.getElementById(`vfac-batch-scripts`) ? document.getElementById(`vfac-batch-scripts`).textContent : ``;
  if (!content) { alert(`No scripts to export yet.`); return; }
  var blob = new Blob([content], { type:`text/plain` });
  var url  = URL.createObjectURL(blob);
  var a    = document.createElement(`a`);
  a.href = url; a.download = `faceless-video-factory-20-scripts-` + Date.now() + `.txt`;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


// ═══════════════════════════════════════════════════════════════════════════
// LIVE VOICE-TO-VOICE BECKY — Speech Recognition + SpeechSynthesis TTS
// ═══════════════════════════════════════════════════════════════════════════

var _ttsUtterance = null;
var _ttsActive    = false;
var _srActive     = false;
var _srRecognizer = null;

// TTS: speak any text
function ttsSpeak(elIdOrText, rate, pitch) {
  if (!window.speechSynthesis) { alert(`Your browser does not support speech synthesis.`); return; }
  var text = (typeof elIdOrText === `string` && document.getElementById(elIdOrText))
    ? document.getElementById(elIdOrText).textContent
    : elIdOrText;
  if (!text || !text.trim()) return;
  window.speechSynthesis.cancel();
  _ttsUtterance = new SpeechSynthesisUtterance(text.trim());
  _ttsUtterance.rate  = rate  || 0.95;
  _ttsUtterance.pitch = pitch || 1.0;
  _ttsUtterance.lang  = `en-US`;
  // Pick a female voice if available
  var voices = window.speechSynthesis.getVoices();
  var femaleVoice = voices.find(v => v.lang.startsWith(`en`) && /female|samantha|karen|victoria|zira|hazel|susan/i.test(v.name));
  if (femaleVoice) _ttsUtterance.voice = femaleVoice;
  _ttsActive = true;
  window.speechSynthesis.speak(_ttsUtterance);
}

function ttsStop() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  _ttsActive = false;
}

// Speech-to-Text: start mic and send to Becky
function startVoiceBecky() {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    bAddMsg(`BECKY`, `Sorry, your browser doesn't support speech recognition. Try Chrome on Android or desktop.`);
    return;
  }
  if (_srActive) { stopVoiceBecky(); return; }

  _srActive = true;
  var micBtn = document.getElementById(`b-mic-btn`);
  if (micBtn) { micBtn.style.background = `var(--red)`; micBtn.textContent = `🔴 Listening...`; }
  setSt(`bst`, `i`, `🎤 Listening... speak now`);

  _srRecognizer = new SpeechRecognition();
  _srRecognizer.lang = `en-US`;
  _srRecognizer.interimResults = false;
  _srRecognizer.maxAlternatives = 1;
  _srRecognizer.continuous = false;

  _srRecognizer.onresult = function(event) {
    var transcript = event.results[0][0].transcript;
    stopVoiceBecky();
    // Put transcript into Becky input and send
    var inp = document.getElementById(`bin`);
    if (inp) inp.value = transcript;
    bSendVoice(transcript);
  };

  _srRecognizer.onerror = function(e) {
    stopVoiceBecky();
    setSt(`bst`, `e`, `Mic error: ` + (e.error || `unknown`));
  };

  _srRecognizer.onend = function() {
    if (_srActive) stopVoiceBecky();
  };

  try { _srRecognizer.start(); } catch(e) { stopVoiceBecky(); }
}

function stopVoiceBecky() {
  _srActive = false;
  if (_srRecognizer) { try { _srRecognizer.stop(); } catch(e) {} _srRecognizer = null; }
  var micBtn = document.getElementById(`b-mic-btn`);
  if (micBtn) { micBtn.style.background = ``; micBtn.textContent = `🎤`; }
  hideSt(`bst`);
}

// Send voice transcript to Becky and speak response
async function bSendVoice(transcript) {
  if (!transcript) return;
  addMsg(`YOU`, transcript, `user`);
  var inp = document.getElementById(`bin`);
  if (inp) inp.value = ``;
  setSt(`bst`, `i`, `Becky is thinking...`);
  ttsStop();

  // Push to history before call
  bHistoryPush(`user`, transcript);

  // Uses BECKY_SYSTEM_PROMPT + last 4 messages + voice-concise override
  var voiceSys = BECKY_SYSTEM_PROMPT + `\n\n## VOICE MODE\nJohn is speaking to you via mic. Reply in under 80 words. Conversational, warm, clear. This will be read aloud via text-to-speech.`;

  try {
    // For voice we pass a modified system but still use history
    var reply = await groqCall(transcript, voiceSys, true);
    addMsg(`BECKY`, reply, `becky`);
    hideSt(`bst`);
    bHistoryPush(`assistant`, reply);
    ttsSpeak(reply, 0.92, 1.05);
  } catch(err) {
    hideSt(`bst`);
    setSt(`bst`, `e`, `Error: ` + (err.message || `groqCall failed`));
  }
}

// Ensure voices are loaded (Chrome async quirk)
if (window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = function() { window.speechSynthesis.getVoices(); };
}
// ═══════════════════════════════════════════════════════════════════════════
// AUTO-PUBLISH PIPELINE — Phase 4 Full Loop
// Idea → Groq Script → ElevenLabs Voice → FreeStack Video Video → YouTube/TikTok
// ═══════════════════════════════════════════════════════════════════════════

// ── Key helpers ──────────────────────────────────────────────────────────
function apGetKey(name)      { return (localStorage.getItem(`hev4_ap_${esc(name)}`) || ``).trim(); }
function apSetKey(name, val) { localStorage.setItem(`hev4_ap_${esc(name)}`, val); }

function apSaveKey(service) {
  var map = {
    el:  { keys:[`el_key`,`el_voice`],  inps:[`el-key-inp`,`el-voice-inp`],   stId:`el-key-st`, label:`ElevenLabs` },
    ss:  { keys:[`ss_key`,`ss_env`],    inps:[`ss-key-inp`,`ss-env-inp`],     stId:`ss-key-st`, label:`FreeStack Video` },
    yt:  { keys:[`yt_key`,`yt_chan`],   inps:[`yt-key-inp`,`yt-channel-inp`], stId:`yt-key-st`, label:`YouTube` },
    tt:  { keys:[`tt_key`],             inps:[`tt-key-inp`],                  stId:`tt-key-st`, label:`TikTok` },
    ig:  { keys:[`ig_key`,`ig_acct`],   inps:[`ig-key-inp`,`ig-acct-inp`],   stId:`ig-key-st`, label:`Instagram` },
    fb:  { keys:[`fb_key`,`fb_page`],   inps:[`fb-key-inp`,`fb-page-inp`],   stId:`fb-key-st`, label:`Facebook` }
  };
  var cfg = map[service];
  if (!cfg) return;
  cfg.keys.forEach((k,i) => { var el = document.getElementById(cfg.inps[i]); if (el && el.value.trim()) apSetKey(k, el.value.trim()); });
  setSt(cfg.stId, `k`, `${esc(cfg.label)} key saved!`);
  apCheckStatus();
}

// Load saved keys into settings fields
function apLoadKeys() {
  var pairs = [
    [`el-key-inp`,`el_key`],[`el-voice-inp`,`el_voice`],
    [`ss-key-inp`,`ss_key`],[`ss-env-inp`,`ss_env`],
    [`yt-key-inp`,`yt_key`],[`yt-channel-inp`,`yt_chan`],
    [`tt-key-inp`,`tt_key`],
    [`ig-key-inp`,`ig_key`],[`ig-acct-inp`,`ig_acct`],
    [`fb-key-inp`,`fb_key`],[`fb-page-inp`,`fb_page`]
  ];
  pairs.forEach(([id,k]) => { var el=document.getElementById(id); var v=apGetKey(k); if(el&&v) el.placeholder=`Saved ✅ (hidden)`; });
}


// ── Status checker ────────────────────────────────────────────────────────
function apCheckStatus() {
  var checks = [
    { id:`apst-groq-dot`, key:`hev4_groq`,          label:`Ready ✅`, fail:`Missing — add in Settings` },
    { id:`apst-el-dot`,   key:`hev4_ap_el_key`,      label:`Ready ✅`, fail:`Missing — add key below` },
    { id:`apst-ss-dot`,   key:`hev4_ap_ss_key`,      label:`Ready ✅`, fail:`No key needed` },
    { id:`apst-yt-dot`,   key:`hev4_ap_yt_key`,      label:`Ready ✅`, fail:`Pending setup` }
  ];
  checks.forEach(c => {
    var el  = document.getElementById(c.id);
    var box = el ? el.parentElement : null;
    var ok  = !!localStorage.getItem(c.key);
    if (el)  { el.textContent = ok ? c.label : c.fail; el.style.color = ok ? `var(--green)` : `var(--red)`; }
    if (box) { box.style.borderColor = ok ? `rgba(52,211,153,.5)` : `var(--border)`; }
  });
}

// ── Step UI helpers ───────────────────────────────────────────────────────
function apStep(n, status, msg) {
  // status: 'running' | 'done' | 'error' | 'pending'
  var colors  = { running:`var(--blue)`, done:`var(--green)`, error:`var(--red)`, pending:`var(--border)` };
  var badges  = { running:`⏳ Running`, done:`✅ Done`, error:`❌ Failed`, pending:`Pending` };
  var bgBadge = { running:`rgba(79,142,247,.15)`, done:`rgba(52,211,153,.15)`, error:`rgba(248,113,113,.15)`, pending:`rgba(148,163,184,.1)` };
  var txtBadge= { running:`var(--blue)`, done:`var(--green)`, error:`var(--red)`, pending:`var(--muted)` };

  var wrap  = document.getElementById(`apstep-${esc(n)}`);
  var msgEl = document.getElementById(`apstep-${esc(n)}-msg`);
  var badge = document.getElementById(`apstep-${esc(n)}-badge`);

  if (wrap)  wrap.style.borderLeftColor = colors[status] || colors.pending;
  if (msgEl) msgEl.textContent = msg || ``;
  if (badge) {
    badge.textContent   = badges[status] || status;
    badge.style.background = bgBadge[status] || bgBadge.pending;
    badge.style.color      = txtBadge[status] || txtBadge.pending;
  }
}

function apResetSteps() {
  [1,2,3,4].forEach(n => apStep(n, `pending`, `Waiting...`));
}

function apReset() {
  document.getElementById(`ap-pipeline-wrap`).style.display = `none`;
  document.getElementById(`ap-result-wrap`).style.display   = `none`;
  document.getElementById(`ap-idea`).value = ``;
  document.getElementById(`ap-go-btn`).disabled = false;
  document.getElementById(`ap-go-btn`).textContent = `🚀 Becky — Write · Voice · Build · Post`;
  apResetSteps();
}

// ── STEP 1 — Groq script generation ──────────────────────────────────────
async function apStep1_Script(idea, type) {
  apStep(1, `running`, `Becky is writing your script...`);

  var typeMap = {
    podcast:  `Lisa (Host, smooth and engaging) + Susan (Guest, confident expert). Natural podcast conversation.`,
    podcast2: `Paul (Host, trustworthy grandfatherly voice) + Alisha (Guest, charismatic and energetic). Warm podcast style.`,
    affiliate:`Becky Host + Becky Guest (British female, warm and authentic). FTC disclosure required at the start: "This video contains affiliate links."`,
    business: `Susan (Host, professional and authoritative) + Alisha (Guest, charismatic and persuasive). Business explainer style.`
  };
  var team = typeMap[type] || typeMap.podcast;

  var sys = BECKY_SYSTEM_PROMPT;
  var prompt = `Write a COMPLETE video package for auto-publishing. Topic: "${esc(idea)}"
Team: ${esc(team)}

Return EXACTLY this format with these exact labels:

TITLE:
[YouTube/TikTok optimized title, under 70 chars, includes keyword]

DESCRIPTION:
[150-word YouTube description. Hook sentence. 3 key points. CTA to subscribe. #AffiliateMediaHub at end.]

TAGS:
[20 comma-separated YouTube tags related to the topic]

SCRIPT:
[Full 75-second spoken script. Label each line HOST: or GUEST:. Include natural [PAUSE] markers. Hook in first 5 seconds. Strong CTA at end. Write exactly what is spoken — no stage directions.]

CAPTION:
[TikTok caption. 2 punchy lines. 5 hashtags.]

Make everything publish-ready. No placeholders.`;

  var raw = await groqCall(prompt, sys);

  var get = (label) => {
    var m = raw.match(new RegExp(label + `:\\s*([\\s\\S]*?)(?=TITLE:|DESCRIPTION:|TAGS:|SCRIPT:|CAPTION:|$)`, `i`));
    return m ? m[1].trim() : ``;
  };

  return {
    title:       get(`TITLE`),
    description: get(`DESCRIPTION`),
    tags:        get(`TAGS`),
    script:      get(`SCRIPT`),
    caption:     get(`CAPTION`),
    raw
  };
}

// ── STEP 2 — ElevenLabs voice generation ─────────────────────────────────
async function apStep2_Voice(script) {
  apStep(2, `running`, `ElevenLabs generating voice MP3...`);

  var elKey   = apGetKey(`el_key`);
  var voiceId = apGetKey(`el_voice`) || `exsUS4vynmxd379XN4yO`;

  if (!elKey) throw new Error(`ElevenLabs API key missing — add it in Settings`);

  var cleanScript = script
    .replace(/^(HOST|GUEST|BECKY HOST|BECKY GUEST|LISA|SUSAN|PAUL|ALISHA):\s*/gim, ``)
    .replace(/\[PAUSE\]/gi, ` `)
    .replace(/\[.*?\]/g, ``)
    .trim();

  var res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${esc(voiceId)}`, {
    method: `POST`,
    headers: {
      'xi-api-key': elKey,
      'Content-Type': `application/json`,
      'Accept': `audio/mpeg`
    },
    body: JSON.stringify({
      text: cleanScript,
      model_id: `eleven_monolingual_v1`,
      voice_settings: { stability: 0.5, similarity_boost: 0.8, style: 0.2, use_speaker_boost: true }
    })
  });

  if (!res.ok) {
    var err = await res.text();
    throw new Error(`ElevenLabs error: ${esc(res.status)} — ${esc(err.substring(0,120))}`);
  }

  // Keep as Blob — we will upload it to FreeStack Video ingest in Step 3
  var audioBlob = await res.blob();
  apStep(2, `done`, `Voice MP3 ready (${esc(Math.round(audioBlob.size/1024))}KB) — uploading to FreeStack Video...`);
  return audioBlob; // Return raw Blob, not a blob: URL
}

// ═══════════════════════════════════════════════════════════════════════════
// HUB ENGINE VIDEO BUILDER — Zero-Cost Sandbox
// FreeStack Video — Self-hosted render API (replaces FreeStack Video)
// $0/month · No watermark · No limits · AffiliateMediaHub Studio
// ═══════════════════════════════════════════════════════════════════════════

var HE_CONFIG = {
  ENV:       `production`,
  EDIT_URL:  `https://freestack-video.onrender.com`,
  INGEST_URL:`https://freestack-video.onrender.com`,
  LIMITS: { monthlyVideoMinutes:999999, monthlyImages:999999, requestsPerMonth:999999, maxRenderSeconds:600, hasWatermark:false }
};

var HE_USAGE_KEY = `hubengine_usage`;
function heGetUsage() {
  var u = JSON.parse(localStorage.getItem(HE_USAGE_KEY) || `{"renders":0,"lastReset":${esc(Date.now())}}`);
  if (Date.now() - u.lastReset > 30*24*60*60*1000) { u = {renders:0,lastReset:Date.now()}; localStorage.setItem(HE_USAGE_KEY,JSON.stringify(u)); }
  return u;
}
function heIncUsage() {
  var u = heGetUsage(); u.renders++;
  localStorage.setItem(HE_USAGE_KEY, JSON.stringify(u));
}

// Upload audio Blob to FreeStack Video using the correct signed URL flow:
// Step 1: POST /ingest/stage/upload → get signed S3 URL + source ID
// Step 2: PUT the file to the signed S3 URL
// Step 3: Poll /ingest/stage/sources/{id} until status = ready
// Step 4: Return data.attributes.source (the real https:// audio URL)
async function heHostAudio(audioBlob, ssKey) {
  apStep(3, `running`, `Getting FreeStack Video upload URL...`);

  // STEP 1 — Get signed upload URL
  var uploadRes = await fetch(`${esc(HE_CONFIG.INGEST_URL)}/upload`, {
    method: `POST`,
    headers: {
      'x-api-key': ssKey,
      'Accept': `application/json`
    }
  });

  if (!uploadRes.ok) {
    var e = await uploadRes.text();
    throw new Error(`FreeStack Video upload init failed ${esc(uploadRes.status)}: ${esc(e.substring(0,200))}`);
  }

  var uploadData = await uploadRes.json();
  var signedUrl  = uploadData.data?.attributes?.url;
  var sourceId   = uploadData.data?.attributes?.id || uploadData.data?.id;

  if (!signedUrl) throw new Error(`FreeStack Video did not return a signed upload URL. Got: ${esc(JSON.stringify(uploadData).substring(0,150))}`);

  apStep(3, `running`, `Uploading voice MP3 to FreeStack Video (${esc(Math.round(audioBlob.size/1024))}KB)...`);

  // STEP 2 — PUT the audio file directly to the signed S3 URL
  var putRes = await fetch(signedUrl, {
    method: `PUT`,
    headers: { 'Content-Type': `audio/mpeg` },
    body: audioBlob
  });

  if (!putRes.ok) {
    throw new Error(`FreeStack Video S3 upload failed ${esc(putRes.status)}`);
  }

  apStep(3, `running`, `Upload complete — waiting for FreeStack Video to process audio...`);

  // STEP 3 — Poll until source is ready
  for (var i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 3000));
    var pollRes  = await fetch(`${esc(HE_CONFIG.INGEST_URL)}/sources/${esc(sourceId)}`, {
      headers: { 'x-api-key': ssKey }
    });
    var pd      = await pollRes.json();
    var status  = pd.data?.attributes?.status;
    var fileUrl = pd.data?.attributes?.source || pd.data?.attributes?.url;

    apStep(3, `running`, `Audio status: ${esc(status)} (check ${esc(i+1)}/20)...`);

    if (fileUrl && (status === `ready` || status === `processed` || status === `imported`)) {
      apStep(3, `running`, `Audio ready — building video timeline...`);
      return fileUrl;
    }
    if (status === `failed`) throw new Error(`FreeStack Video audio processing failed`);
  }
  throw new Error(`FreeStack Video audio timed out after 60 seconds`);
}
// STEP 3 — HubEngine Video Assembly
async function apStep3_Video(audioBlob, title, description) {
  apStep(3, `running`, `HubEngine: uploading voice to FreeStack Video...`);
  var ssKey = apGetKey(`ss_key`);
  if (!ssKey) throw new Error(`HubEngine API key missing — add it in Settings`);
  heIncUsage();
  var usage = heGetUsage();
  apStep(3, `running`, `Render ${esc(usage.renders)} of 20 free this month — uploading audio...`);

  var audioUrl = await heHostAudio(audioBlob, ssKey);
  var safeTitle = title.replace(/['"<>]/g, ``).substring(0, 55);

  apStep(3, `running`, `Building video timeline...`);

  var timeline = {
    soundtrack: { src: audioUrl, effect: `fadeOut`, volume: 1 },
    background: `#0c0f1a`,
    tracks: [
      { clips: [{ asset:{ type:`html`, html:`<p style="background:#0c0f1a;width:1080px;height:1920px"></p>`, width:1080, height:1920 }, start:0, length:90, fit:`cover` }] },
      { clips: [{ asset:{ type:`html`, html:`<p style="font-family:Georgia,serif;color:#00d4aa;font-size:30px;font-weight:900;text-align:center;letter-spacing:3px;padding:0 20px">AffiliateMediaHub Studio</p>`, width:1000, height:80 }, start:0, length:90, position:`top`, offset:{x:0,y:-0.42}, transition:{in:`fade`,out:`fade`} }] },
      { clips: [{ asset:{ type:`html`, html:`<p style="font-family:Georgia,serif;font-size:38px;font-weight:900;color:#ffffff;text-align:center;padding:0 40px;line-height:1.3">${esc(safeTitle)}</p>`, width:1000, height:300 }, start:0.5, length:4.5, position:`center`, transition:{in:`slideUp`,out:`fade`} }] },
      { clips: [{ asset:{ type:`html`, html:`<p style="font-family:Georgia,serif;font-size:28px;color:#f5c518;font-weight:700;text-align:center;padding:10px 30px;background:rgba(0,0,0,.65);border-radius:10px">Becky AI · Your Studio Director</p>`, width:900, height:90 }, start:6, length:78, position:`bottom`, offset:{x:0,y:0.1}, transition:{in:`fade`,out:`fade`} }] },
      { clips: [{ asset:{ type:`html`, html:`<p style="font-family:Georgia,serif;font-size:34px;font-weight:900;color:#00d4aa;text-align:center;padding:20px">Subscribe for More<br><span style="font-size:20px;color:#fff;opacity:.85">AffiliateMediaHub Studio</span><br><span style="font-size:18px;color:#f5c518">👇 Link in Bio</span></p>`, width:900, height:260 }, start:82, length:8, position:`center`, transition:{in:`slideUp`,out:`fade`} }] }
    ]
  };

  var output = { format:`mp4`, resolution:`hd`, aspectRatio:`9:16`, fps:25, size:{width:1080,height:1920} };

  apStep(3, `running`, `Submitting to HubEngine render queue...`);
  var submitRes = await fetch(`${esc(HE_CONFIG.EDIT_URL)}/render`, {
    method: `POST`,
    headers: { 'x-api-key': ssKey, 'Content-Type': `application/json` },
    body: JSON.stringify({ timeline, output })
  });
  if (!submitRes.ok) {
    var eText = await submitRes.text();
    throw new Error(`HubEngine render submit failed ${esc(submitRes.status)}: ${esc(eText.substring(0,200))}`);
  }
  var submitData = await submitRes.json();
  var renderId   = submitData.response?.id || submitData.id;
  if (!renderId) throw new Error(`HubEngine: no render ID. Got: ${esc(JSON.stringify(submitData).substring(0,200))}`);

  apStep(3, `running`, `Render queued (${esc(renderId.substring(0,8))}) — checking every 10 sec...`);
  for (var poll = 0; poll < 30; poll++) {
    await new Promise(r => setTimeout(r, 10000));
    var pollRes  = await fetch(`${esc(HE_CONFIG.EDIT_URL)}/render/${esc(renderId)}`, { headers:{} });
    var pollData = await pollRes.json();
    var rStatus  = pollData.response?.status || pollData.status;
    var rUrl     = pollData.response?.url    || pollData.url;
    apStep(3, `running`, `Status: ${esc(rStatus)} (${esc(poll+1)}/30 checks)`);
    if (rStatus === `done`)   { if (!rUrl) throw new Error(`Render done but no URL returned`); return rUrl; }
    if (rStatus === `failed`) { throw new Error(`HubEngine render failed: ${pollData.response?.error || `unknown`}`); }
  }
  throw new Error(`HubEngine render timed out — check your FreeStack Video dashboard for render ID: ${esc(renderId)}`);
}


// ── YouTube OAuth via HubEngine Backend (Render) ──────────────────────────
// Backend URL — handles OAuth server-side so Google restrictions don't apply
var HE_BACKEND = `https://hubengine-backend.onrender.com`;

function ytStartOAuth() {
  var clientId = document.getElementById(`yt-client-id-inp`)?.value.trim() || apGetKey(`yt_client_id`);
  var secret   = document.getElementById(`yt-client-secret-inp`)?.value.trim() || apGetKey(`yt_client_secret`);
  if (!clientId) { setSt(`yt-key-st`,`e`,`Enter your Google OAuth Client ID first.`); return; }
  apSetKey(`yt_client_id`, clientId);
  if (secret) apSetKey(`yt_client_secret`, secret);
  setSt(`yt-key-st`,`i`,`Opening Google sign-in... After you approve, copy the code shown and paste it below.`);
  // Open backend redirect — backend sends user to Google
  window.open(`${esc(HE_BACKEND)}/youtube/auth-url-redirect?client_id=${esc(encodeURIComponent(clientId))}`, `_blank`);
  // Show code input after short delay
  setTimeout(ytShowCodeInput, 1000);
}

function ytShowCodeInput() {
  var wrap = document.getElementById('yt-connect-wrap');
  if (!wrap) return;
  if (document.getElementById('yt-code-inp')) return;
  var html = '<div style="margin-top:12px">'
    + '<div style="font-size:11px;font-weight:700;color:var(--muted);margin-bottom:6px">PASTE AUTHORIZATION CODE</div>'
    + '<div style="font-size:11px;color:var(--muted);margin-bottom:6px">After signing in to Google, copy the code shown on the page and paste it here.</div>'
    + '<input id="yt-code-inp" type="text" placeholder="4/0AX4XfWh..." style="width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:10px 14px;color:var(--txt);font-size:13px;outline:none;margin-bottom:8px">'
    + '<button class="btn w100" style="background:#ff4444;color:#fff;border:none;border-radius:8px;padding:12px;font-weight:700;cursor:pointer" onclick="ytExchangeCode()">Complete YouTube Connection</button>'
    + '</div>';
  wrap.insertAdjacentHTML('beforeend', html);
}

// Step 2 — Exchange auth code via HubEngine backend
async function ytExchangeCode() {
  var code   = document.getElementById(`yt-code-inp`)?.value.trim();
  var id     = apGetKey(`yt_client_id`);
  var secret = apGetKey(`yt_client_secret`);
  if (!code || !id || !secret) { setSt(`yt-key-st`,`e`,`Need auth code, client ID and secret.`); return; }
  setSt(`yt-key-st`,`i`,`Connecting to YouTube via HubEngine backend...`);
  try {
    var res  = await fetch(`${esc(HE_BACKEND)}/youtube/token`, {
      method: `POST`,
      headers: { 'Content-Type':`application/json` },
      body: JSON.stringify({ code, client_id:id, client_secret:secret })
    });
    var data = await res.json();
    if (data.error) { setSt(`yt-key-st`,`e`,`Error: ${esc(data.error)}`); return; }
    apSetKey(`yt_access_token`,  data.access_token);
    apSetKey(`yt_refresh_token`, data.refresh_token);
    apSetKey(`yt_token_expiry`,  String(Date.now() + (data.expires_in * 1000)));
    apSetKey(`yt_channel_name`,  data.channel_name);
    ytShowConnected(data.channel_name);
    setSt(`yt-key-st`,`k`,`✅ YouTube connected! Ready to auto-post.`);
    apCheckStatus();
  } catch(err) {
    setSt(`yt-key-st`,`e`,`Connection failed: ${esc(err.message)}`);
  }
}

// Refresh expired access token using refresh token
async function ytRefreshToken() {
  var clientId = apGetKey(`yt_client_id`);
  var secret   = apGetKey(`yt_client_secret`);
  var refresh  = apGetKey(`yt_refresh_token`);
  if (!refresh || !clientId || !secret) throw new Error(`YouTube not connected — go to Settings and connect your channel.`);
  var res  = await fetch(`https://oauth2.googleapis.com/token`, {
    method: `POST`,
    headers: { 'Content-Type':`application/x-www-form-urlencoded` },
    body: `refresh_token=${esc(encodeURIComponent(refresh))}&client_id=${esc(encodeURIComponent(clientId))}&client_secret=${esc(encodeURIComponent(secret))}&grant_type=refresh_token`
  });
  var data = await res.json();
  if (data.error) throw new Error(`YouTube token refresh failed: ${esc(data.error_description || data.error)}`);
  apSetKey(`yt_access_token`, data.access_token);
  apSetKey(`yt_token_expiry`, String(Date.now() + (data.expires_in * 1000)));
  return data.access_token;
}

// Get valid access token (refresh if expired)
async function ytGetToken() {
  var expiry = parseInt(apGetKey(`yt_token_expiry`) || `0`);
  var token  = apGetKey(`yt_access_token`);
  if (token && Date.now() < expiry - 60000) return token; // still valid
  return await ytRefreshToken(); // refresh it
}

function ytShowConnected(name) {
  var cw = document.getElementById(`yt-connect-wrap`);
  var sw = document.getElementById(`yt-connected-wrap`);
  var cn = document.getElementById(`yt-channel-name`);
  if (cw) cw.style.display = `none`;
  if (sw) sw.style.display = `block`;
  if (cn) cn.textContent   = name;
}

function ytDisconnect() {
  // LOCKED — YouTube connection is permanent. Do not disconnect.
  // Tokens auto-refresh via ytRefreshToken(). Re-connect only if broken.
  console.log('YouTube connection is locked in. Disconnect disabled.');
}

// Check YouTube connection on settings load
function ytCheckConnected() {
  var name = apGetKey(`yt_channel_name`);
  if (name) ytShowConnected(name);
}

// ── STEP 4a — YouTube Upload using OAuth token ────────────────────────────
async function apStep4_YouTube(videoUrl, title, description, tags) {
  apStep(4, `running`, `Connecting to YouTube...`);
  var token;
  try { token = await ytGetToken(); }
  catch(e) { apStep(4, `error`, e.message); return null; }

  // Download video from FreeStack Video
  apStep(4, `running`, `Downloading finished video from FreeStack Video...`);
  var videoRes  = await fetch(videoUrl);
  var videoBlob = await videoRes.blob();

  var meta = {
    snippet: {
      title:       title.substring(0, 100),
      description: description,
      tags:        tags.split(`,`).map(t => t.trim()).filter(Boolean).slice(0,15),
      categoryId:  `22`
    },
    status: { privacyStatus:`public`, selfDeclaredMadeForKids:false }
  };

  // Initiate resumable upload
  apStep(4, `running`, `Starting YouTube upload...`);
  var initRes = await fetch(`https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status`, {
    method: `POST`,
    headers: {
      'Authorization': `Bearer ${esc(token)}`,
      'Content-Type':  `application/json`,
      'X-Upload-Content-Type': `video/mp4`,
      'X-Upload-Content-Length': String(videoBlob.size)
    },
    body: JSON.stringify(meta)
  });

  if (!initRes.ok) {
    var e = await initRes.text();
    throw new Error(`YouTube upload init failed ${esc(initRes.status)}: ${esc(e.substring(0,150))}`);
  }

  var uploadUrl = initRes.headers.get(`Location`);
  if (!uploadUrl) throw new Error(`YouTube did not return an upload URL`);

  apStep(4, `running`, `Uploading video to YouTube (${esc(Math.round(videoBlob.size/1024/1024))}MB)...`);
  var uploadRes = await fetch(uploadUrl, {
    method:  `PUT`,
    headers: { 'Content-Type':`video/mp4` },
    body: videoBlob
  });

  if (!uploadRes.ok) {
    var e2 = await uploadRes.text();
    throw new Error(`YouTube upload failed ${esc(uploadRes.status)}: ${esc(e2.substring(0,150))}`);
  }

  var uploadData = await uploadRes.json();
  var videoId    = uploadData.id;
  return videoId ? `https://youtube.com/watch?v=${esc(videoId)}` : null;
}

async function apStep4_TikTok(videoUrl, caption) {
  var ttKey = apGetKey(`tt_key`);
  if (!ttKey) return { skipped: true, reason:`TikTok API key not set — add in Settings` };
  var res = await fetch(`https://open.tiktokapis.com/v2/post/publish/video/init/`, {
    method: `POST`,
    headers: { 'Authorization': `Bearer ${esc(ttKey)}`, 'Content-Type': `application/json; charset=UTF-8` },
    body: JSON.stringify({
      post_info: { title: caption.substring(0,150), privacy_level:`PUBLIC_TO_EVERYONE`, disable_duet:false, disable_comment:false, disable_stitch:false },
      source_info: { source:`PULL_FROM_URL`, video_url: videoUrl }
    })
  });
  if (!res.ok) { var e = await res.text(); return { skipped:true, reason:`TikTok error ${esc(res.status)}: ${esc(e.substring(0,100))}` }; }
  var data = await res.json();
  return { success:true, publishId: data.data?.publish_id };
}

async function apStep4_Instagram(videoUrl, title, caption) {
  var igKey  = apGetKey(`ig_key`);
  var igAcct = apGetKey(`ig_acct`);
  if (!igKey || !igAcct) return { skipped:true, reason:`Instagram token/account ID not set — add in Settings` };

  // Step 1 — Create media container (Reel)
  var initRes = await fetch(`https://graph.facebook.com/v19.0/${esc(igAcct)}/media`, {
    method: `POST`,
    headers: { 'Content-Type':`application/json` },
    body: JSON.stringify({
      media_type:   `REELS`,
      video_url:    videoUrl,
      caption:      `${esc(title)}\n\n${esc(caption)}`.substring(0, 2200),
      share_to_feed: true,
      access_token: igKey
    })
  });
  if (!initRes.ok) { var e = await initRes.text(); return { skipped:true, reason:`Instagram init error ${esc(initRes.status)}: ${esc(e.substring(0,100))}` }; }
  var initData    = await initRes.json();
  var containerId = initData.id;
  if (!containerId) return { skipped:true, reason:`Instagram: no container ID returned` };

  // Step 2 — Poll until container is ready
  for (var i = 0; i < 15; i++) {
    await new Promise(r => setTimeout(r, 5000));
    var statusRes  = await fetch(`https://graph.facebook.com/v19.0/${esc(containerId)}?fields=status_code&access_token=${esc(igKey)}`);
    var statusData = await statusRes.json();
    if (statusData.status_code === `FINISHED`) break;
    if (statusData.status_code === `ERROR`) return { skipped:true, reason:`Instagram container processing error` };
  }

  // Step 3 — Publish the container
  var pubRes = await fetch(`https://graph.facebook.com/v19.0/${esc(igAcct)}/media_publish`, {
    method: `POST`,
    headers: { 'Content-Type':`application/json` },
    body: JSON.stringify({ creation_id: containerId, access_token: igKey })
  });
  if (!pubRes.ok) { var e2 = await pubRes.text(); return { skipped:true, reason:`Instagram publish error ${esc(pubRes.status)}: ${esc(e2.substring(0,100))}` }; }
  var pubData = await pubRes.json();
  return { success:true, mediaId: pubData.id };
}

async function apStep4_Facebook(videoUrl, title, description) {
  var fbKey  = apGetKey(`fb_key`);
  var fbPage = apGetKey(`fb_page`);
  if (!fbKey || !fbPage) return { skipped:true, reason:`Facebook token/page ID not set — add in Settings` };

  var res = await fetch(`https://graph.facebook.com/v19.0/${esc(fbPage)}/videos`, {
    method: `POST`,
    headers: { 'Content-Type':`application/json` },
    body: JSON.stringify({
      file_url:     videoUrl,
      title:        title.substring(0,254),
      description:  description.substring(0,999),
      published:    true,
      access_token: fbKey
    })
  });
  if (!res.ok) { var e = await res.text(); return { skipped:true, reason:`Facebook error ${esc(res.status)}: ${esc(e.substring(0,100))}` }; }
  var data = await res.json();
  return { success:true, videoId: data.id };
}

// ── HISTORY ───────────────────────────────────────────────────────────────
function apGetHistory()     { try { return JSON.parse(localStorage.getItem(`hev4_ap_history`) || `[]`); } catch(e) { return []; } }
function apSaveHistory(arr) { localStorage.setItem(`hev4_ap_history`, JSON.stringify(arr)); }

function apAddHistory(entry) {
  var hist = apGetHistory();
  hist.unshift({ ...entry, date: new Date().toLocaleString() });
  if (hist.length > 50) hist = hist.slice(0, 50);
  apSaveHistory(hist);
  apRenderHistory();
}

function apRenderHistory() {
  var el   = document.getElementById(`ap-history-list`);
  if (!el) return;
  var hist = apGetHistory();
  if (!hist.length) { el.innerHTML = `<div style="font-size:13px;color:var(--muted);text-align:center;padding:20px">No videos published yet.</div>`; return; }
  var html = ``;
  hist.forEach(h => {
    var statusColor = h.status === `published` ? `var(--green)` : h.status === `generated` ? `var(--gold)` : `var(--red)`;
    html += `<div style="background:var(--bg3);border-radius:8px;padding:12px 14px;margin-bottom:8px;border-left:3px solid ${esc(statusColor)}">`;
    html += `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">`;
    html += `<div style="font-weight:700;font-size:13px">${h.title||h.idea||`Untitled`}</div>`;
    html += `<div style="font-size:11px;font-weight:700;color:${esc(statusColor)}">${h.status?.toUpperCase()}</div>`;
    html += `</div>`;
    html += `<div style="font-size:11px;color:var(--muted);margin-bottom:6px">${esc(h.date)} · ${h.type||``}</div>`;
    if (h.youtubeUrl) html += `<a href="${esc(h.youtubeUrl)}" target="_blank" class="btn btn-ghost btn-xs" style="margin-right:6px" rel="noopener noreferrer">▶ YouTube</a>`;
    if (h.tiktokId)   html += `<span class="badge b-teal" style="font-size:10px">TikTok ✅</span>`;
    html += `</div>`;
  });
  el.innerHTML = html;
}

// ── MAIN LAUNCHER ─────────────────────────────────────────────────────────
async function apLaunch() {
  var idea = (document.getElementById(`ap-idea`)?.value || ``).trim();
  var type = document.getElementById(`ap-type`)?.value || `podcast`;
  var plat = document.getElementById(`ap-platform`)?.value || `youtube`;

  if (!idea) {
    document.getElementById(`ap-idea`).style.outline = `2px solid var(--red)`;
    setTimeout(() => document.getElementById(`ap-idea`).style.outline = ``, 1500);
    return;
  }

  // Check minimum keys
  var groqKey = localStorage.getItem(`hev4_groq`);
  var elKey   = apGetKey(`el_key`);
  var ssKey   = apGetKey(`ss_key`);
  if (!groqKey) { alert(`Groq API key missing — go to Settings and add it first.`); return; }
  if (!elKey)   { alert(`ElevenLabs API key missing — go to Settings and add it first.`); nav(`settings`); return; }
  if (!ssKey)   { alert(`HubEngine API key missing — go to Settings and add your FreeStack Video sandbox key first.`); nav(`settings`); return; }

  // Lock UI
  var btn = document.getElementById(`ap-go-btn`);
  btn.disabled = true;
  btn.innerHTML = `⏳ Pipeline Running...`;

  // Show pipeline
  document.getElementById(`ap-pipeline-wrap`).style.display = `block`;
  document.getElementById(`ap-result-wrap`).style.display   = `none`;
  apResetSteps();

  var content, audioDataUrl, videoUrl, ytUrl, ttResult;

  try {
    // STEP 1 — Script
    content = await apStep1_Script(idea, type);
    if (!content.script) throw new Error(`Groq returned empty script — try again`);
    apStep(1, `done`, `Script ready: "${esc(content.title.substring(0,50))}..."`);

    // STEP 2 — Voice
    audioDataUrl = await apStep2_Voice(content.script);
    // audioDataUrl is now a Blob (not a URL) — named for legacy compat
    apStep(2, `done`, `Voice ready — sending to FreeStack Video...`);

    // STEP 3 — Video
    videoUrl = await apStep3_Video(audioDataUrl, content.title, content.description);
    apStep(3, `done`, `Video assembled: ${esc(videoUrl.substring(0,50))}...`);

    // STEP 4 — Post to all selected platforms
    var posted = false;
    var igResult, fbResult;

    if (plat === `youtube` || plat === `all`) {
      ytUrl = await apStep4_YouTube(videoUrl, content.title, content.description, content.tags);
      if (ytUrl) { apStep(4, `running`, `YouTube ✅ — posting to next platform...`); posted = true; }
    }

    if (plat === `tiktok` || plat === `all`) {
      ttResult = await apStep4_TikTok(videoUrl, content.caption);
      if (ttResult?.success) { apStep(4, `running`, `TikTok ✅ — posting to next platform...`); posted = true; }
    }

    if (plat === `instagram` || plat === `all`) {
      igResult = await apStep4_Instagram(videoUrl, content.title, content.caption);
      if (igResult?.success) { apStep(4, `running`, `Instagram ✅ — posting to next platform...`); posted = true; }
    }

    if (plat === `facebook` || plat === `all`) {
      fbResult = await apStep4_Facebook(videoUrl, content.title, content.description);
      if (fbResult?.success) { posted = true; }
    }

    if (plat === `none`) {
      apStep(4, `done`, `Video ready — download below. No auto-post selected.`);
    } else {
      var doneMsg = [
        ytUrl           ? `YouTube ✅`              : ``,
        ttResult?.success ? `TikTok ✅`             : ``,
        igResult?.success ? `Instagram ✅`          : ``,
        fbResult?.success ? `Facebook ✅`           : ``
      ].filter(Boolean).join(` · `);
      apStep(4, posted ? `done` : `error`, posted ? `Posted: ${esc(doneMsg)}` : `All platforms skipped — check API keys in Settings`);
    }

    // Show result
    var linksHtml = ``;
    if (ytUrl)             linksHtml += `<a href="${esc(ytUrl)}" target="_blank" class="btn btn-ghost" style="border-color:#ff4444;color:#ff4444" rel="noopener noreferrer">▶ YouTube</a> `;
    if (ttResult?.success) linksHtml += `<span class="badge b-teal" style="padding:8px 12px">TikTok ✅</span> `;
    if (igResult?.success) linksHtml += `<span class="badge" style="padding:8px 12px;background:rgba(225,48,108,.15);color:#E1306C">Instagram ✅</span> `;
    if (fbResult?.success) linksHtml += `<span class="badge" style="padding:8px 12px;background:rgba(24,119,242,.15);color:#1877F2">Facebook ✅</span> `;
    linksHtml += `<a href="${esc(videoUrl)}" target="_blank" class="btn btn-ghost btn-sm" rel="noopener noreferrer">⬇ Download MP4</a>`;

    document.getElementById(`ap-result-links`).innerHTML = linksHtml;
    document.getElementById(`ap-result-script`).textContent = content.script;
    document.getElementById(`ap-result-wrap`).style.display = `block`;
    document.getElementById(`ap-result-wrap`).style.borderColor = `var(--green)`;

    apAddHistory({
      idea, type,
      title:       content.title,
      status:      posted ? `published` : `generated`,
      youtubeUrl:  ytUrl || null,
      tiktokId:    ttResult?.publishId || null,
      instagramId: igResult?.mediaId   || null,
      facebookId:  fbResult?.videoId   || null,
      videoUrl
    });

    btn.disabled = false;
    btn.innerHTML = `🚀 Becky — Write · Voice · Build · Post`;

  } catch(err) {
    // Mark current running step as failed
    [1,2,3,4].forEach(n => {
      if (document.getElementById(`apstep-${esc(n)}-badge`)?.textContent === `⏳ Running`) {
        apStep(n, `error`, `Error: ${esc(err.message)}`);
      }
    });
    btn.disabled = false;
    btn.innerHTML = `🚀 Retry`;

    apAddHistory({ idea, type, status:`failed`, error: err.message });
  }
}

// ── Init on page open ─────────────────────────────────────────────────────
var _navForAP = nav; // Safe wrapper
nav = function(id) {
  _navForAP(id);
  if (id === `settings`) { apLoadKeys(); ytCheckConnected(); }
};

// Run on first load
document.addEventListener(`DOMContentLoaded`, () => { initApp(); refreshKeyStatus(); });
