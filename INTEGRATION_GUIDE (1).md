# Hub Engine v3 — Becky-First Architecture + Perplexity + Draft Persistence

## The hierarchy (this is the important part)

**Becky is the Main Studio AI.** She is the primary writer, planner, and creative director for the studio. She is the first AI John goes to for almost everything.

**Everyone else is Secondary.** Perplexity, Ollama, and (when activated) Gemini, Claude, Qwen, ChatGPT, ChatLLM, DeepSeek, DeepLearning.AI — these are research helpers and second opinions. They exist to support Becky, not replace her.

**The bridge:** When a secondary AI returns something useful, the "Send to Becky" button hands it off so Becky can rewrite it in AffiliateMediaHub Studio voice. The studio voice always has the final word.

---

## Files in this package (8 total)

| File | Role |
|---|---|
| `providers.js` | Registry of all AIs, with full Becky system prompt |
| `beckyService.js` | Becky's chat + rewrite functions |
| `perplexityService.js` | Perplexity research + drafting |
| `useDraft.js` | Universal draft persistence hook |
| `AIDashboard.jsx` | The hero screen — Becky big, everyone else small |
| `PerplexityTab.jsx` | Full research/drafting tab with "Send to Becky" button |
| `PerplexityInline.jsx` | Compact research widget that drops into any tab |
| `INTEGRATION_GUIDE.md` | This file |

---

## Becky's full role (baked into her system prompt)

Becky handles all 9 areas defined by John:

1. **Podcast content** — scripts, show notes, episode planning
2. **Affiliate content** — copy, product angles, promos
3. **Video production** — scripts for Susan, Alisha, Lisa, Paul Baby Boss
4. **Job search** — resume edits, cover letters, LinkedIn copy
5. **Social captions** — platform-specific short-form
6. **Content calendars** — weekly/monthly planning
7. **Brand voice** — keeping everything sounding like the studio
8. **Prompt writing** — turning rough ideas into polished prompts
9. **Workflow organization** — keeping projects moving

Tone: helpful, smart, warm, practical, confident. Never robotic. Never too formal.

Becky knows the team (John/Claude/Becky), the mission ("Three Minds. One Mission. Zero Cost."), and each video host's voice. All of this is in her system prompt — nothing is lost between conversations in terms of brand identity.

---

## Step 1: Add environment variables to Vercel

Go to Vercel → project-cj1zx → Settings → Environment Variables:

| Name | Where to get it | Status |
|---|---|---|
| `GROQ_API_KEY` | Already have it (Becky uses this) | ✅ Active |
| `PERPLEXITY_API_KEY` | https://perplexity.ai/settings/api | New |
| `GEMINI_API_KEY` | https://aistudio.google.com/apikey | Later |
| `ANTHROPIC_API_KEY` | https://console.anthropic.com | Later |
| `OPENAI_API_KEY` | https://platform.openai.com/api-keys | Later |
| `DEEPSEEK_API_KEY` | https://platform.deepseek.com | Later |
| `QWEN_API_KEY` | https://dashscope.console.aliyun.com | Later |
| `ABACUS_API_KEY` | https://abacus.ai | Later |

If calling any of these from client-side code, prefix with `NEXT_PUBLIC_` (e.g., `NEXT_PUBLIC_GROQ_API_KEY`).

---

## Step 2: Use the AI Dashboard as your home tab

```jsx
import AIDashboard from './AIDashboard.jsx';

<div className="tab-content" style={{ display: activeTab === 'home' ? 'flex' : 'none' }}>
  <AIDashboard
    activeId={activeTab}
    onSelect={(id) => setActiveTab(id)}
  />
</div>
```

This shows Becky as the big front-and-center card with all secondary AIs grouped below. It enforces the hierarchy visually every time John opens the app.

---

## Step 3: Wire the "Send to Becky" bridge in Perplexity

```jsx
import PerplexityTab from './PerplexityTab.jsx';

<PerplexityTab
  perplexityKey={process.env.NEXT_PUBLIC_PERPLEXITY_API_KEY}
  groqKey={process.env.NEXT_PUBLIC_GROQ_API_KEY}
  onSendToBecky={(payload) => {
    // Optional: drop the rewritten version into Becky's chat thread
    addMessageToBeckyChat({
      role: 'assistant',
      content: payload.beckyRewrite,
      meta: { source: 'perplexity-rewrite', originalQuery: payload.originalQuery },
    });
    setActiveTab('becky'); // jump John to Becky's tab
  }}
/>
```

User flow:
1. John asks Perplexity to research something
2. Perplexity returns the answer with citations
3. John clicks "💜 Send to Becky to rewrite in studio voice"
4. Becky rewrites it — warm, practical, on-brand
5. (Optional) Becky's version auto-lands in her chat thread

---

## Step 4: Retrofit Becky's chat with draft persistence + the updated system prompt

In your Becky chat component:

```jsx
import { useDraft } from './useDraft.js';
import { chatWithBecky } from './beckyService.js';

function BeckyChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput, clearInput] = useDraft('becky-chat');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    const next = [...messages, userMsg];
    setMessages(next);
    clearInput(); // clear saved draft
    setLoading(true);
    try {
      const reply = await chatWithBecky(next, process.env.NEXT_PUBLIC_GROQ_API_KEY);
      setMessages([...next, { role: 'assistant', content: reply }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* ... messages ... */}
      <textarea value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={send} disabled={loading}>Send</button>
    </div>
  );
}
```

The `chatWithBecky` function automatically includes Becky's full system prompt (all 9 capabilities, brand voice, team identity, host voices) — you don't have to pass it in manually.

---

## Step 5: Suggest secondary AIs from inside Becky

Since Becky's system prompt tells her to suggest Perplexity/Gemini/Claude when research is needed, she'll naturally do this in her responses. You can also add a helper button to any Becky message that looks research-worthy:

```jsx
{message.content.match(/latest|current|today|202[4-6]|statistic/i) && (
  <button onClick={() => {
    setActiveTab('perplexity');
    // pre-fill Perplexity with context
    localStorage.setItem('hubengine_draft_perplexity-tab-input',
      `Based on this question from my chat with Becky: "${lastUserMessage}"`);
  }}>
    🔍 Fact-check with Perplexity
  </button>
)}
```

---

## Step 6: Draft persistence — how it works everywhere

One line per input:

```jsx
const [draft, setDraft, clearDraft] = useDraft('unique-key-for-this-input');
```

Keys already claimed:
- `becky-chat` — Becky's main chat
- `perplexity-tab-input` — Perplexity tab
- `perplexity-inline-{id}` — each inline widget

When you add Gemini: `useDraft('gemini-chat')`. When you add the Qwen tab: `useDraft('qwen-chat')`. Every input gets its own slot, no collisions.

Saves trigger on:
- Switching tabs (component unmount)
- Browser tab goes background
- Closing tab / refresh / navigation

Restores on every mount. Clears automatically when empty or when you call `clearDraft()` after a successful send.

---

## Step 7: Activating a planned AI later

Say Google sends you a Gemini key next month. Here's what you do:

**1.** Add `GEMINI_API_KEY` to Vercel env vars.

**2.** In `providers.js`, change `status: 'planned'` to `status: 'active'` for gemini.

**3.** Create `geminiService.js` — copy `perplexityService.js` as a template. The main differences: Gemini uses a different request body format (see their docs) and the response shape is `candidates[0].content.parts[0].text` instead of `choices[0].message.content`.

**4.** Create `GeminiTab.jsx` — copy `PerplexityTab.jsx` as a template. Keep the "Send to Becky" button — Becky should rewrite Gemini's output too.

**5.** Done. The dashboard picks up the change automatically because it reads from `getSecondaryActive()`.

Same process for Claude, ChatGPT, DeepSeek, Qwen, ChatLLM, DeepLearning.AI.

---

## Monthly cost snapshot

| Service | Current | After this update |
|---|---|---|
| Abacus.AI | $20 | $20 |
| ElevenLabs | $5 | $5 |
| Groq (Becky) | $0 | $0 |
| Vercel | $0 | $0 |
| **Perplexity** | — | **~$5–15** |
| **Total** | **$25** | **~$30–40** |

Perplexity pricing: Sonar Pro is about $1 per 1000 searches + token costs. For your volume (research + some drafting), $5–15/month is a realistic range. You can cap spend in their dashboard.

---

## The mental model to keep

Becky is the studio. She's the voice, the editor, the operator. Everything else — Perplexity, Gemini, Claude, whoever — is a consultant she calls when she needs fresh facts or a second opinion. The consultants give raw material. Becky turns it into finished work.

The UI reinforces this every time John opens the app: Becky is huge in the center; the rest is a row of tools underneath.

---

## Quick test checklist before deploying

- [ ] `GROQ_API_KEY` and `PERPLEXITY_API_KEY` both set in Vercel
- [ ] AI Dashboard shows Becky big, secondary AIs small, planned AIs grayed
- [ ] Type in Becky's chat → switch to Perplexity → come back → draft is there
- [ ] Run a Perplexity research query → click "Send to Becky" → get rewrite in studio voice
- [ ] Becky's responses sound warm/practical/confident (not robotic)
- [ ] Becky knows the video hosts by name and voice when asked
- [ ] Tab navigation still uses `display:none !important` / `display:flex !important`

---

## One note on Ollama

`providers.js` has Ollama pointed at `http://localhost:11434/api/chat`. This only works when the browser is running on the same machine as Ollama — so Ollama will work in local dev (`npm run dev`) but not on deployed Vercel. That's expected. Tell me if you want a different setup (e.g., host Ollama on a tunneled URL) and I'll wire it.
