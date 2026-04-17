// beckyService.js
// Hub Engine v3 — Becky API Integration
//
// Two modes:
//   1. chatWithBecky(messages) — normal conversation
//   2. beckyRewrite(originalResult, userIntent) — takes output from another AI
//      and rewrites it in AffiliateMediaHub Studio voice
//
// Both use Groq (llama-3.3-70b-versatile) with sanitized API key.

import { PROVIDERS, sanitizeKey } from './providers.js';

const provider = PROVIDERS.becky;

/**
 * Normal Becky chat.
 * @param {Array} messages - [{role, content}, ...]
 * @param {string} apiKey - Groq API key
 * @returns {Promise<string>} - Becky's response text
 */
export async function chatWithBecky(messages, apiKey) {
  const cleanKey = sanitizeKey(apiKey);
  if (!cleanKey) {
    throw new Error('Groq API key missing. Add GROQ_API_KEY to env vars.');
  }

  const body = {
    model: provider.model,
    messages: [
      { role: 'system', content: provider.systemPrompt },
      ...messages,
    ],
    temperature: 0.8,
    max_tokens: 2000,
  };

  const response = await fetch(provider.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cleanKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Becky (Groq) error ${response.status}: ${await response.text()}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

/**
 * Becky rewrites output from another AI in studio voice.
 * @param {Object} secondaryResult - {content, citations?, sourceName}
 * @param {string} userIntent - What John originally wanted (e.g., "turn this into a podcast intro")
 * @param {string} apiKey - Groq API key
 * @returns {Promise<string>} - Rewritten content in studio voice
 */
export async function beckyRewrite(secondaryResult, userIntent, apiKey) {
  const cleanKey = sanitizeKey(apiKey);
  if (!cleanKey) {
    throw new Error('Groq API key missing. Add GROQ_API_KEY to env vars.');
  }

  const citationsText = secondaryResult.citations?.length
    ? `\n\nSources cited:\n${secondaryResult.citations.map((c, i) => `[${i+1}] ${c}`).join('\n')}`
    : '';

  const rewriteRequest = `John asked: ${userIntent || 'Take this research and make it usable.'}

Here's what ${secondaryResult.sourceName || 'the other AI'} returned:

---
${secondaryResult.content}${citationsText}
---

Rewrite this in the AffiliateMediaHub Studio voice. Keep the facts. Preserve citations if they're there. Make it something John can actually use.`;

  const body = {
    model: provider.model,
    messages: [
      { role: 'system', content: provider.rewritePrompt },
      { role: 'user', content: rewriteRequest },
    ],
    temperature: 0.75,
    max_tokens: 2500,
  };

  const response = await fetch(provider.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cleanKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Becky rewrite error ${response.status}: ${await response.text()}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}
