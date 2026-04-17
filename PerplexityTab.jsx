// PerplexityTab.jsx
// Hub Engine v3 — Perplexity Research & Drafting Tab
//
// Secondary AI. Research and drafting with citations.
// "Send to Becky" button takes the result and has Becky rewrite it in studio voice.

import React, { useState } from 'react';
import { useDraft } from './useDraft.js';
import { callPerplexity } from './perplexityService.js';
import { beckyRewrite } from './beckyService.js';

export default function PerplexityTab({ perplexityKey, groqKey, onSendToBecky }) {
  const [mode, setMode] = useState('research');
  const [input, setInput, clearInput] = useDraft('perplexity-tab-input');
  const [result, setResult] = useState(null);
  const [beckyVersion, setBeckyVersion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rewriting, setRewriting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    setError(null);
    setBeckyVersion(null);
    try {
      const res = await callPerplexity(input, mode, perplexityKey);
      res.sourceName = 'Perplexity';
      res.userIntent = input;
      setResult(res);
      clearInput();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendToBecky = async () => {
    if (!result || rewriting) return;
    setRewriting(true);
    setError(null);
    try {
      const rewritten = await beckyRewrite(result, result.userIntent, groqKey);
      setBeckyVersion(rewritten);
      // Also notify parent if it wants to drop this into Becky's chat thread
      if (onSendToBecky) {
        onSendToBecky({
          originalQuery: result.userIntent,
          perplexityResult: result,
          beckyRewrite: rewritten,
        });
      }
    } catch (err) {
      setError('Becky rewrite failed: ' + err.message);
    } finally {
      setRewriting(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>🔍 Perplexity</h2>
        <p style={styles.subtitle}>
          Research & fact-checking. Becky can rewrite results in studio voice.
        </p>
        <div style={styles.tierBadge}>Secondary AI · Research helper</div>
      </div>

      <div style={styles.modeToggle}>
        <button
          onClick={() => setMode('research')}
          style={{ ...styles.modeBtn, ...(mode === 'research' ? styles.modeBtnActive : {}) }}
        >
          🔎 Research
        </button>
        <button
          onClick={() => setMode('draft')}
          style={{ ...styles.modeBtn, ...(mode === 'draft' ? styles.modeBtnActive : {}) }}
        >
          ✍️ Draft
        </button>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={
          mode === 'research'
            ? "Ask anything — I'll search the web and cite sources..."
            : 'Describe what you want drafted (article, email, pitch, etc.)...'
        }
        style={styles.textarea}
        rows={mode === 'draft' ? 6 : 4}
      />

      <div style={styles.actions}>
        <button
          onClick={handleSubmit}
          disabled={loading || !input.trim()}
          style={{
            ...styles.submitBtn,
            ...(loading || !input.trim() ? styles.submitBtnDisabled : {}),
          }}
        >
          {loading ? 'Working...' : mode === 'research' ? 'Research' : 'Draft'}
        </button>
        {input && (
          <button onClick={clearInput} style={styles.clearBtn}>Clear</button>
        )}
      </div>

      {error && (
        <div style={styles.error}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div style={styles.result}>
          <div style={styles.resultHeader}>
            <span style={styles.resultLabel}>
              {mode === 'research' ? '🔍 Perplexity Result' : '🔍 Perplexity Draft'}
            </span>
            <span style={styles.resultModel}>{result.model}</span>
          </div>
          <div style={styles.resultContent}>{result.content}</div>

          {result.citations && result.citations.length > 0 && (
            <div style={styles.citations}>
              <h4 style={styles.citationsTitle}>Sources</h4>
              <ol style={styles.citationsList}>
                {result.citations.map((cite, i) => (
                  <li key={i} style={styles.citation}>
                    <a href={cite} target="_blank" rel="noopener noreferrer" style={styles.citationLink}>
                      {cite}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div style={styles.beckyBridge}>
            <button
              onClick={handleSendToBecky}
              disabled={rewriting}
              style={{
                ...styles.beckyBtn,
                ...(rewriting ? styles.beckyBtnDisabled : {}),
              }}
            >
              {rewriting ? '💜 Becky is rewriting...' : '💜 Send to Becky to rewrite in studio voice'}
            </button>
          </div>
        </div>
      )}

      {beckyVersion && (
        <div style={styles.beckyResult}>
          <div style={styles.beckyHeader}>
            <span style={styles.beckyLabel}>💜 Becky's Rewrite — Studio Voice</span>
          </div>
          <div style={styles.resultContent}>{beckyVersion}</div>
          <div style={styles.beckyFooter}>
            Original research from Perplexity · Rewritten by Becky in AffiliateMediaHub Studio voice
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: '20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' },
  header: { marginBottom: '20px' },
  title: { fontSize: '28px', margin: '0 0 6px 0', color: '#1a1a2e' },
  subtitle: { fontSize: '14px', color: '#666', margin: '0 0 8px 0' },
  tierBadge: {
    display: 'inline-block',
    padding: '3px 10px',
    background: '#e0e7ff',
    color: '#4338ca',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '600',
    letterSpacing: '0.3px',
    textTransform: 'uppercase',
  },
  modeToggle: { display: 'flex', gap: '8px', marginBottom: '16px' },
  modeBtn: {
    padding: '10px 20px',
    border: '2px solid #e0e0e0',
    background: '#fff',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
  },
  modeBtnActive: { borderColor: '#6366f1', background: '#eef2ff', color: '#4338ca' },
  textarea: {
    width: '100%',
    padding: '14px',
    fontSize: '15px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    resize: 'vertical',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  },
  actions: { display: 'flex', gap: '8px', marginTop: '12px' },
  submitBtn: {
    padding: '12px 24px',
    background: '#6366f1',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  submitBtnDisabled: { background: '#c7c7c7', cursor: 'not-allowed' },
  clearBtn: { padding: '12px 16px', background: '#f3f4f6', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' },
  error: { marginTop: '16px', padding: '12px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#b91c1c' },
  result: { marginTop: '24px', padding: '20px', background: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' },
  resultHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
  resultLabel: { fontWeight: '600', color: '#374151' },
  resultModel: { fontSize: '12px', color: '#9ca3af', fontFamily: 'monospace' },
  resultContent: { fontSize: '15px', lineHeight: '1.6', color: '#1f2937', whiteSpace: 'pre-wrap' },
  citations: { marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' },
  citationsTitle: { fontSize: '14px', margin: '0 0 8px 0', color: '#374151' },
  citationsList: { paddingLeft: '20px', margin: 0 },
  citation: { fontSize: '13px', marginBottom: '4px' },
  citationLink: { color: '#6366f1', textDecoration: 'none', wordBreak: 'break-all' },
  beckyBridge: { marginTop: '20px', paddingTop: '16px', borderTop: '2px dashed #e5e7eb' },
  beckyBtn: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(99, 102, 241, 0.25)',
  },
  beckyBtnDisabled: { opacity: 0.6, cursor: 'not-allowed' },
  beckyResult: {
    marginTop: '20px',
    padding: '20px',
    background: 'linear-gradient(135deg, #faf5ff 0%, #eef2ff 100%)',
    borderRadius: '12px',
    border: '2px solid #c4b5fd',
  },
  beckyHeader: { marginBottom: '12px' },
  beckyLabel: { fontWeight: '700', color: '#6d28d9', fontSize: '16px' },
  beckyFooter: {
    marginTop: '16px',
    paddingTop: '12px',
    borderTop: '1px solid #ddd6fe',
    fontSize: '12px',
    color: '#7c3aed',
    fontStyle: 'italic',
  },
};
