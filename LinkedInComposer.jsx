// LinkedInComposer.jsx
// Hub Engine v3 — LinkedIn Post Composer
//
// John's daily post workspace:
//   - Pick a theme (past-to-present, factory background, learning AI, etc.)
//   - Write the post
//   - Continuous autosave (debounced 800ms + on unmount/unload)
//   - Attach research from Perplexity (or paste from any AI)
//   - Send to Becky for tone polish
//   - Mark ready/posted

import React, { useState } from 'react';
import {
  todayKey, loadDay, saveDay, updateDayField, getOrCreateToday, LINKEDIN_THEMES,
} from './dailyStore.js';
import { useAutosave, formatSaveTime } from './useAutosave.js';
import { callPerplexity } from './perplexityService.js';
import { beckyRewrite } from './beckyService.js';

export default function LinkedInComposer({ perplexityKey, groqKey }) {
  const today = todayKey();

  // Ensure today exists
  useState(() => { getOrCreateToday(); });

  // Draft text — continuous autosave
  const [draft, setDraft, { saveNow, lastSavedAt, saving }] = useAutosave({
    load: () => loadDay(today)?.linkedinPost?.draft || '',
    save: (value) => {
      const day = loadDay(today) || getOrCreateToday();
      day.linkedinPost.draft = value;
      day.linkedinPost.lastSaved = Date.now();
      day.linkedinPost.wordCount = value.trim().split(/\s+/).filter(Boolean).length;
      day.checklist.linkedinDrafted = value.trim().length > 50;
      day.checklist.draftSaved = true;
      saveDay(day);
    },
    debounceMs: 800,
  });

  const [theme, setTheme] = useState(() => loadDay(today)?.linkedinPost?.theme || '');
  const [attachedResearch, setAttachedResearch] = useState(() => loadDay(today)?.linkedinPost?.attachedResearch || []);
  const [beckyVersion, setBeckyVersion] = useState(() => loadDay(today)?.linkedinPost?.beckyRewriteVersion || null);
  const [status, setStatus] = useState(() => loadDay(today)?.linkedinPost?.status || 'draft');

  // Research sub-form
  const [researchQuery, setResearchQuery] = useState('');
  const [researchLoading, setResearchLoading] = useState(false);
  const [researchError, setResearchError] = useState(null);
  const [rewriting, setRewriting] = useState(false);

  const wordCount = draft.trim().split(/\s+/).filter(Boolean).length;
  const charCount = draft.length;

  // ------- Theme selection -------
  const pickTheme = (key) => {
    setTheme(key);
    updateDayField(today, 'linkedinPost.theme', key);
  };

  // ------- Research attachment -------
  const addResearch = async () => {
    if (!researchQuery.trim() || researchLoading) return;
    setResearchLoading(true);
    setResearchError(null);
    try {
      const result = await callPerplexity(researchQuery, 'research', perplexityKey);
      const entry = {
        id: Date.now(),
        source: 'Perplexity',
        query: researchQuery,
        content: result.content,
        citations: result.citations || [],
        addedAt: Date.now(),
      };
      const next = [...attachedResearch, entry];
      setAttachedResearch(next);
      updateDayField(today, 'linkedinPost.attachedResearch', next);

      // mark checklist flag
      const day = loadDay(today);
      day.checklist.researchAttached = true;
      saveDay(day);

      setResearchQuery('');
    } catch (err) {
      setResearchError(err.message);
    } finally {
      setResearchLoading(false);
    }
  };

  const removeResearch = (id) => {
    const next = attachedResearch.filter(r => r.id !== id);
    setAttachedResearch(next);
    updateDayField(today, 'linkedinPost.attachedResearch', next);
  };

  // ------- Becky rewrite -------
  const polishWithBecky = async () => {
    if (!draft.trim() || rewriting) return;
    saveNow(); // snapshot current draft first
    setRewriting(true);
    try {
      const intent = `Polish this LinkedIn post in AffiliateMediaHub Studio voice. Theme: ${theme ? LINKEDIN_THEMES[theme].label : 'general'}. Keep it honest, simple, forward-looking. Not overconfident. Real progress, not pretending to know everything.`;
      const payload = {
        sourceName: 'John\'s draft',
        content: draft,
        citations: attachedResearch.flatMap(r => r.citations),
      };
      const rewritten = await beckyRewrite(payload, intent, groqKey);
      setBeckyVersion(rewritten);
      updateDayField(today, 'linkedinPost.beckyRewriteVersion', rewritten);
    } catch (err) {
      alert('Becky polish failed: ' + err.message);
    } finally {
      setRewriting(false);
    }
  };

  const useBeckyVersion = () => {
    if (!beckyVersion) return;
    setDraft(beckyVersion);
  };

  // ------- Status changes -------
  const updateStatus = (newStatus) => {
    setStatus(newStatus);
    updateDayField(today, 'linkedinPost.status', newStatus);
  };

  // ------- Copy to clipboard -------
  const copyPost = () => {
    navigator.clipboard.writeText(draft).then(() => {
      alert('Post copied. Paste into LinkedIn when ready.');
    });
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={styles.dateLabel}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
          <h2 style={styles.title}>✍️ Today's LinkedIn Post</h2>
          <div style={styles.subtitle}>Honest, simple, forward-looking. Real progress.</div>
        </div>
        <div style={styles.saveStatus}>
          <div style={styles.saveDot(saving)} />
          {saving ? 'Saving...' : formatSaveTime(lastSavedAt)}
        </div>
      </div>

      {/* Theme picker */}
      <div style={styles.themeSection}>
        <div style={styles.sectionLabel}>Today's Theme</div>
        <div style={styles.themeGrid}>
          {Object.entries(LINKEDIN_THEMES).map(([key, t]) => (
            <button
              key={key}
              onClick={() => pickTheme(key)}
              style={{ ...styles.themeCard, ...(theme === key ? styles.themeCardActive : {}) }}
            >
              <div style={styles.themeLabel}>{t.label}</div>
              <div style={styles.themeHint}>{t.hint}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Composer */}
      <div style={styles.composerSection}>
        <div style={styles.sectionLabel}>Your Post</div>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={
            theme
              ? `Write your post about: ${LINKEDIN_THEMES[theme].hint}\n\nStart with something real. End with what's next.`
              : 'Start writing. I\'ll save every word as you go.'
          }
          style={styles.textarea}
          rows={14}
        />
        <div style={styles.metrics}>
          <span>{wordCount} words · {charCount} characters</span>
          <span style={styles.charTarget}>{charCount > 1300 ? '⚠ Over LinkedIn recommended' : charCount > 800 ? 'Good length' : 'Room to add more'}</span>
        </div>
      </div>

      {/* Research attachments */}
      <div style={styles.researchSection}>
        <div style={styles.sectionLabel}>🔍 Attached Research</div>
        <div style={styles.researchAdd}>
          <input
            value={researchQuery}
            onChange={(e) => setResearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addResearch()}
            placeholder="Research something to back up today's post..."
            style={styles.researchInput}
          />
          <button
            onClick={addResearch}
            disabled={researchLoading || !researchQuery.trim()}
            style={{ ...styles.researchBtn, ...(researchLoading || !researchQuery.trim() ? styles.disabled : {}) }}
          >
            {researchLoading ? '...' : 'Add Research'}
          </button>
        </div>
        {researchError && <div style={styles.error}>{researchError}</div>}

        {attachedResearch.length === 0 ? (
          <div style={styles.emptyResearch}>
            No research attached yet. Add a quick Perplexity search to back up your point.
          </div>
        ) : (
          <div style={styles.researchList}>
            {attachedResearch.map(r => (
              <div key={r.id} style={styles.researchItem}>
                <div style={styles.researchHeader}>
                  <strong>{r.query}</strong>
                  <button onClick={() => removeResearch(r.id)} style={styles.removeBtn}>×</button>
                </div>
                <div style={styles.researchContent}>{r.content.slice(0, 300)}{r.content.length > 300 ? '...' : ''}</div>
                {r.citations.length > 0 && (
                  <div style={styles.researchCitations}>
                    {r.citations.slice(0, 3).map((c, i) => (
                      <a key={i} href={c} target="_blank" rel="noopener noreferrer" style={styles.citeLink}>
                        Source {i+1}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={styles.actionsBar}>
        <button
          onClick={polishWithBecky}
          disabled={rewriting || !draft.trim()}
          style={{ ...styles.beckyBtn, ...(rewriting || !draft.trim() ? styles.disabled : {}) }}
        >
          {rewriting ? '💜 Becky polishing...' : '💜 Polish with Becky'}
        </button>

        <div style={styles.statusPicker}>
          <span style={styles.statusLabel}>Status:</span>
          {['draft', 'ready', 'posted'].map(s => (
            <button
              key={s}
              onClick={() => updateStatus(s)}
              style={{ ...styles.statusBtn, ...(status === s ? styles.statusBtnActive : {}) }}
            >
              {s}
            </button>
          ))}
        </div>

        <button onClick={copyPost} style={styles.copyBtn}>📋 Copy</button>
      </div>

      {/* Becky's version */}
      {beckyVersion && (
        <div style={styles.beckyBox}>
          <div style={styles.beckyHeader}>
            💜 Becky's Polish
            <button onClick={useBeckyVersion} style={styles.useBtn}>Use this version</button>
          </div>
          <div style={styles.beckyContent}>{beckyVersion}</div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: '24px', maxWidth: '900px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' },
  dateLabel: { fontSize: '12px', color: '#6b7280', fontWeight: '500', marginBottom: '2px' },
  title: { fontSize: '24px', margin: '0 0 4px 0', color: '#1a1a2e' },
  subtitle: { fontSize: '14px', color: '#6b7280' },
  saveStatus: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#6b7280', padding: '6px 12px', background: '#f9fafb', borderRadius: '20px', border: '1px solid #e5e7eb' },
  saveDot: (saving) => ({ width: '8px', height: '8px', borderRadius: '50%', background: saving ? '#f59e0b' : '#10b981', transition: 'background 0.2s' }),
  sectionLabel: { fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' },
  themeSection: { marginBottom: '24px' },
  themeGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '8px' },
  themeCard: { padding: '12px', background: '#fff', border: '2px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer', textAlign: 'left' },
  themeCardActive: { borderColor: '#6366f1', background: '#eef2ff' },
  themeLabel: { fontSize: '13px', fontWeight: '700', color: '#1f2937', marginBottom: '4px' },
  themeHint: { fontSize: '11px', color: '#6b7280', lineHeight: '1.4' },
  composerSection: { marginBottom: '24px' },
  textarea: { width: '100%', padding: '16px', fontSize: '15px', lineHeight: '1.6', border: '2px solid #e0e0e0', borderRadius: '10px', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' },
  metrics: { display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '12px', color: '#9ca3af' },
  charTarget: { color: '#6366f1', fontWeight: '500' },
  researchSection: { marginBottom: '24px', padding: '16px', background: '#f9fafb', borderRadius: '10px' },
  researchAdd: { display: 'flex', gap: '8px', marginBottom: '12px' },
  researchInput: { flex: 1, padding: '10px 12px', fontSize: '14px', border: '1px solid #d1d5db', borderRadius: '8px' },
  researchBtn: { padding: '10px 16px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' },
  disabled: { opacity: 0.5, cursor: 'not-allowed' },
  error: { padding: '8px 12px', background: '#fef2f2', color: '#b91c1c', borderRadius: '6px', fontSize: '13px', marginBottom: '8px' },
  emptyResearch: { padding: '16px', textAlign: 'center', color: '#9ca3af', fontSize: '13px', fontStyle: 'italic' },
  researchList: { display: 'flex', flexDirection: 'column', gap: '8px' },
  researchItem: { padding: '12px', background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' },
  researchHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', fontSize: '13px', color: '#374151' },
  removeBtn: { background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#9ca3af', padding: 0, lineHeight: 1 },
  researchContent: { fontSize: '12px', color: '#6b7280', lineHeight: '1.5', marginBottom: '6px' },
  researchCitations: { display: 'flex', gap: '8px' },
  citeLink: { fontSize: '11px', color: '#6366f1', textDecoration: 'none', padding: '2px 8px', background: '#eef2ff', borderRadius: '4px' },
  actionsBar: { display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', padding: '16px', background: '#f9fafb', borderRadius: '10px', marginBottom: '16px' },
  beckyBtn: { padding: '10px 18px', background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  statusPicker: { display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto' },
  statusLabel: { fontSize: '12px', color: '#6b7280' },
  statusBtn: { padding: '6px 12px', background: '#fff', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', textTransform: 'capitalize' },
  statusBtnActive: { background: '#6366f1', color: '#fff', borderColor: '#6366f1' },
  copyBtn: { padding: '10px 16px', background: '#fff', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', fontWeight: '500' },
  beckyBox: { padding: '20px', background: 'linear-gradient(135deg, #faf5ff 0%, #eef2ff 100%)', borderRadius: '12px', border: '2px solid #c4b5fd' },
  beckyHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', fontSize: '15px', fontWeight: '700', color: '#6d28d9' },
  useBtn: { padding: '6px 12px', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' },
  beckyContent: { fontSize: '14px', lineHeight: '1.6', color: '#1f2937', whiteSpace: 'pre-wrap' },
};
