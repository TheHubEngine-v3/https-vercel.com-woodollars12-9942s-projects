// PerplexityInline.jsx
// Hub Engine v3 — Inline Perplexity Widget
//
// Compact version that drops into ANY existing tab (Becky, Home, etc.).
// Use this when you want a "quick research" button inside another interface.
//
// USAGE in any tab:
//   <PerplexityInline apiKey={PERPLEXITY_KEY} onResult={(r) => insertIntoChat(r.content)} />

import React, { useState } from 'react';
import { useDraft } from './useDraft.js';
import { callPerplexity } from './perplexityService.js';

export default function PerplexityInline({ apiKey, onResult, placeholder, instanceId = 'default' }) {
  const [expanded, setExpanded] = useState(false);
  const [input, setInput, clearInput] = useDraft(`perplexity-inline-${instanceId}`);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await callPerplexity(input, 'research', apiKey);
      if (onResult) onResult(res);
      clearInput();
      setExpanded(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!expanded) {
    return (
      <button onClick={() => setExpanded(true)} style={styles.triggerBtn}>
        🔍 Quick Research
      </button>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.label}>🔍 Perplexity Research</span>
        <button onClick={() => setExpanded(false)} style={styles.closeBtn}>×</button>
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
        placeholder={placeholder || 'What do you want to research?'}
        style={styles.input}
        autoFocus
      />
      <div style={styles.actions}>
        <button
          onClick={handleSubmit}
          disabled={loading || !input.trim()}
          style={{
            ...styles.submitBtn,
            ...(loading || !input.trim() ? styles.disabled : {}),
          }}
        >
          {loading ? '...' : 'Search'}
        </button>
      </div>
      {error && <div style={styles.error}>{error}</div>}
    </div>
  );
}

const styles = {
  triggerBtn: {
    padding: '8px 14px',
    background: '#eef2ff',
    color: '#4338ca',
    border: '1px solid #c7d2fe',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500',
  },
  container: {
    padding: '12px',
    background: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    marginTop: '8px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  label: { fontSize: '13px', fontWeight: '600', color: '#4338ca' },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#9ca3af',
    padding: 0,
    lineHeight: 1,
  },
  input: {
    width: '100%',
    padding: '8px 10px',
    fontSize: '14px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    boxSizing: 'border-box',
  },
  actions: { marginTop: '8px', display: 'flex', justifyContent: 'flex-end' },
  submitBtn: {
    padding: '6px 14px',
    background: '#6366f1',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500',
  },
  disabled: { background: '#c7c7c7', cursor: 'not-allowed' },
  error: {
    marginTop: '8px',
    fontSize: '12px',
    color: '#b91c1c',
  },
};
