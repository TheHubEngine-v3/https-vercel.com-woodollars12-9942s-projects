// providers.js
// Hub Engine v3 — AI Provider Registry
//
// TIER STRUCTURE:
//   - PRIMARY: Becky (the main studio AI — first stop for almost everything)
//   - SECONDARY: Perplexity, Gemini, Claude, etc. (research, fact-check, second opinions)
//
// Becky takes secondary AI outputs and rewrites them in the AffiliateMediaHub Studio voice.
//
// CRITICAL: All API keys are sanitized with sanitizeKey() before use to strip
// any invisible Unicode characters that break HTTP headers.

export const sanitizeKey = (key) => {
  if (!key) return '';
  return String(key).replace(/[^\x20-\x7E]/g, '').trim();
};

// ============================================================
// BECKY'S SYSTEM PROMPT — the studio's brand voice
// ============================================================

export const BECKY_SYSTEM_PROMPT = `You are Becky, the AI Creative Director and main AI operator for AffiliateMediaHub Studio.

IDENTITY & RELATIONSHIP
You are John Lanter's creative partner and friend, not a generic chatbot.
John is the CEO. Claude is the Developer. You are the Creative Director.
Mission: Three Minds. One Mission. Zero Cost.
Greet John warmly when starting a new session: "Hello John, how is your day going?"

YOUR ROLE
You are the primary writer, planner, and creative director for the studio. You are the first AI John goes to for almost everything. You are not just a chatbot — you are the main AI operator for the whole studio.

WHAT YOU HELP WITH
- Podcast content (scripts, show notes, episode planning)
- Affiliate marketing content (copy, product angles, promos)
- Video production (scripts for Susan, Alisha, Lisa, and Paul Baby Boss)
- Job search materials (resume edits, cover letters, LinkedIn copy)
- Social captions (short-form content for every platform)
- Content calendars (weekly and monthly planning)
- Brand voice (keeping everything sounding like AffiliateMediaHub Studio)
- Prompt writing (turning rough ideas into polished prompts)
- Workflow organization (keeping projects moving)

BRAND VOICE
Helpful. Smart. Warm. Practical. Confident.
Never overly robotic. Never too formal. Clear and conversational.
Useful and easy to use. Turn rough ideas into polished output.

WORKING WITH OTHER AIS
If a question needs extra fact-checking, current research, or a different perspective, suggest John check a secondary AI — Perplexity (best for current facts and citations), Gemini, Claude, or another assistant. You can say something like: "This one's worth double-checking with Perplexity for the latest numbers — want me to draft the query?"

When John brings back a result from another AI, your job is to rewrite or organize it in the AffiliateMediaHub Studio voice. You are the editor and the final word on style.

VIDEO HOSTS YOU WRITE FOR
- Susan (Mon) — professional, confident, late 30s-40s
- Alisha (Wed) — charismatic, persuasive, 40s
- Paul Baby Boss (Thu) — trustworthy grandfather figure, 60s, gravelly
- Lisa (Fri + Sat affiliate promos) — smooth, engaging

Match each host's voice when writing their scripts.

HOW TO RESPOND
Lead with the answer, not the caveats. Give John something usable every time. If you need more info to do the job well, ask one sharp question — don't pile up questionnaires. Keep it practical.`;

// Special prompt used when Becky is rewriting output from a secondary AI
export const BECKY_REWRITE_PROMPT = `You are Becky, Creative Director at AffiliateMediaHub Studio.

John just got a result from another AI (Perplexity, Gemini, Claude, etc.). Your job is to rewrite it in the AffiliateMediaHub Studio voice: helpful, smart, warm, practical, confident. Never robotic. Never overly formal.

Keep the facts and citations intact. Change the tone, structure, and flow so it sounds like it came from the studio. If the original was a research dump, turn it into something John can actually use — a script, a caption, a draft, a summary, whatever fits what he asked for.

If the research is thin or there are gaps, say so plainly and suggest what to check next.`;

// ============================================================
// PROVIDERS
// ============================================================

export const PROVIDERS = {
  // ---------- PRIMARY TIER ----------

  becky: {
    id: 'becky',
    name: 'Becky',
    role: 'Main Studio AI — Creative Director & Operator',
    tier: 'primary',
    status: 'active',
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'llama-3.3-70b-versatile',
    apiKeyEnv: 'GROQ_API_KEY',
    voiceId: 'exsUS4vynmxd379XN4yO', // British Female
    systemPrompt: BECKY_SYSTEM_PROMPT,
    rewritePrompt: BECKY_REWRITE_PROMPT,
    capabilities: [
      'podcast-scripts',
      'affiliate-copy',
      'video-scripts',
      'job-search',
      'social-captions',
      'content-calendar',
      'brand-voice',
      'prompt-writing',
      'workflow',
    ],
    icon: '💜',
    tagline: 'Your first stop for almost everything',
  },

  // ---------- SECONDARY TIER — Research & Second Opinion ----------

  perplexity: {
    id: 'perplexity',
    name: 'Perplexity',
    role: 'Research & Fact-Checking',
    tier: 'secondary',
    status: 'active',
    endpoint: 'https://api.perplexity.ai/chat/completions',
    model: 'sonar-pro',
    modelDraft: 'sonar-reasoning-pro',
    apiKeyEnv: 'PERPLEXITY_API_KEY',
    capabilities: ['research', 'citations', 'current-info', 'web-search'],
    icon: '🔍',
    tagline: 'Current facts with citations — then Becky rewrites in studio voice',
  },

  ollama: {
    id: 'ollama',
    name: 'Ollama',
    role: 'Local Private AI',
    tier: 'secondary',
    status: 'active',
    endpoint: 'http://localhost:11434/api/chat',
    model: 'llama3.2',
    apiKeyEnv: null,
    capabilities: ['chat', 'local', 'private', 'offline'],
    icon: '🦙',
    tagline: 'Runs on your machine — private, free, no limits',
  },

  // ---------- PLANNED — activate when keys arrive ----------

  gemini: {
    id: 'gemini',
    name: 'Gemini',
    role: 'Second Opinion (Google)',
    tier: 'secondary',
    status: 'planned',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    model: 'gemini-2.0-flash',
    apiKeyEnv: 'GEMINI_API_KEY',
    capabilities: ['chat', 'multimodal', 'long-context'],
    icon: '✨',
    tagline: 'Different angle, multimodal, long context',
  },

  claude: {
    id: 'claude',
    name: 'Claude',
    role: 'Second Opinion (Anthropic)',
    tier: 'secondary',
    status: 'planned',
    endpoint: 'https://api.anthropic.com/v1/messages',
    model: 'claude-opus-4-7',
    apiKeyEnv: 'ANTHROPIC_API_KEY',
    capabilities: ['chat', 'reasoning', 'long-form', 'code'],
    icon: '🟣',
    tagline: 'Deep reasoning and long-form analysis',
  },

  qwen: {
    id: 'qwen',
    name: 'Qwen',
    role: 'Second Opinion (Alibaba)',
    tier: 'secondary',
    status: 'planned',
    endpoint: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
    model: 'qwen-max',
    apiKeyEnv: 'QWEN_API_KEY',
    capabilities: ['chat', 'multilingual', 'code'],
    icon: '🐉',
    tagline: 'Strong multilingual and code capability',
  },

  chatgpt: {
    id: 'chatgpt',
    name: 'ChatGPT',
    role: 'Second Opinion (OpenAI)',
    tier: 'secondary',
    status: 'planned',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4o',
    apiKeyEnv: 'OPENAI_API_KEY',
    capabilities: ['chat', 'vision', 'tools'],
    icon: '🟢',
    tagline: 'Popular second opinion, vision + tools',
  },

  chatllm: {
    id: 'chatllm',
    name: 'ChatLLM',
    role: 'Abacus.AI Workflows',
    tier: 'secondary',
    status: 'planned',
    endpoint: 'https://api.abacus.ai/v0/chat',
    model: 'chatllm',
    apiKeyEnv: 'ABACUS_API_KEY',
    capabilities: ['chat', 'agents', 'video'],
    icon: '🎬',
    tagline: 'Same platform as your AI Video Maker',
  },

  deepseek: {
    id: 'deepseek',
    name: 'DeepSeek',
    role: 'Second Opinion (Reasoning)',
    tier: 'secondary',
    status: 'planned',
    endpoint: 'https://api.deepseek.com/chat/completions',
    model: 'deepseek-chat',
    apiKeyEnv: 'DEEPSEEK_API_KEY',
    capabilities: ['chat', 'reasoning', 'code'],
    icon: '🔷',
    tagline: 'Strong at reasoning and code',
  },

  deeplearning: {
    id: 'deeplearning',
    name: 'DeepLearning.AI',
    role: 'Learning Workflows',
    tier: 'secondary',
    status: 'planned',
    endpoint: null,
    model: null,
    apiKeyEnv: 'DEEPLEARNING_API_KEY',
    capabilities: ['learning', 'prompts', 'agents'],
    icon: '🎓',
    tagline: 'Prompt engineering and agent workflows',
  },
};

// ============================================================
// HELPERS
// ============================================================

export const getPrimary = () =>
  Object.values(PROVIDERS).filter(p => p.tier === 'primary' && p.status === 'active');

export const getSecondaryActive = () =>
  Object.values(PROVIDERS).filter(p => p.tier === 'secondary' && p.status === 'active');

export const getSecondaryPlanned = () =>
  Object.values(PROVIDERS).filter(p => p.tier === 'secondary' && p.status === 'planned');

export const getActiveProviders = () =>
  Object.values(PROVIDERS).filter(p => p.status === 'active');

export const getProvider = (id) => PROVIDERS[id];
