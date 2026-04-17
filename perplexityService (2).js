// perplexityService.js
// Hub Engine v3 — Perplexity API Integration
//
// Two modes:
//   1. research(query) — fast web search with citations (sonar-pro)
//   2. draft(prompt)   — long-form reasoning and drafting (sonar-reasoning-pro)
//
// Both return { content, citations, model } — UI can render citations inline.

import { PROVIDERS, sanitizeKey } from './providers.js';

const provider = PROVIDERS.perplexity;

/**
 * Call Perplexity with specified mode.
 * @param {string} prompt - User query/prompt
 * @param {string} mode - 'research' | 'draft'
 * @param {string} apiKey - Perplexity API key (will be sanitized)
 * @returns {Promise<{content, citations, model}>}
 */
export async function callPerplexity(prompt, mode = 'research', apiKey) {
  const cleanKey = sanitizeKey(apiKey);
  if (!cleanKey) {
    throw new Error('Perplexity API key missing. Add PERPLEXITY_API_KEY to your env vars.');
  }

  const model = mode === 'draft' ? provider.modelDraft : provider.model;

  const systemPrompt = mode === 'draft'
    ? 'You are a professional writer and researcher. Produce well-structured, thorough long-form content with citations.'
    : 'You are a research assistant. Provide accurate, up-to-date information with clear source citations.';

  const body = {
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt },
    ],
    temperature: mode === 'draft' ? 0.7 : 0.2,
    max_tokens: mode === 'draft' ? 4000 : 2000,
    return_citations: true,
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
    const errText = await response.text();
    throw new Error(`Perplexity API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || '';
  const citations = data.citations || [];

  return { content, citations, model };
}

export const perplexityShortcuts = {
  research: (query, key) => callPerplexity(query, 'research', key),
  draft: (prompt, key) => callPerplexity(prompt, 'draft', key),
};
