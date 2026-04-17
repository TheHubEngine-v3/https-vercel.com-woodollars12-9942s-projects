// VideoTroubleshooter.jsx
// Hub Engine v3 — Video Production Troubleshooting Log
//
// Helps John figure out why videos aren't being made properly.
// Tracks each stage (script, voice, avatar, export) and captures
// missing steps, what worked, what failed.
//
// Becky can read this log and suggest what to check next.

import React, { useState } from 'react';
import { todayKey, loadDay, saveDay, updateDayField, getOrCreateToday } from './dailyStore.js';
import { chatWithBecky } from './beckyService.js';

const HOSTS = [
  { id: 'susan', name: 'Susan', schedule: 'Mon', voice: 'Professional, confident' },
  { id: 'alisha', name: 'Alisha', schedule: 'Wed', voice: 'Charismatic, persuasive' },
  { id: 'paul', name: 'Paul Baby Boss', schedule: 'Thu', voice: 'Trustworthy grandfather, gravelly' },
  { id: 'lisa', name: 'Lisa', schedule: 'Fri + Sat', voice: 'Smooth, engaging' },
];

const STATUS_OPTIONS = [
  { value: 'not-started', label: 'Not started', color: '#9ca3af' },
  { value: 'in-progress', label: 'In progress', color: '#f59e0b' },
  { value: 'success', label: 'Success', color: '#10b981' },
  { value: 'failed', label: 'Failed', color: '#ef4444' },
];

export default function VideoTroubleshooter({ groqKey }) {
  const today = todayKey();
  useState(() => { getOrCreateToday(); });

  const [log, setLog] = useState(() => loadDay(today)?.videoLog || {});
  const [beckyAdvice, setBeckyAdvice] = useState('');
  const [askingBecky, setAskingBecky] = useState(false);

  const update = (path, value) => {
    updateDayField(today, `videoLog.${path}`, value);
    const fresh = loadDay(today)?.videoLog;
    setLog({ ...fresh });
  };

  const addToList = (listName, description) => {
    if (!description.trim()) return;
    const current = log[listName] || [];
    const next = [...current, { description, noticedAt: Date.now() }];
    update(listName, next);
  };

  const removeFromList = (listName, i) => {
    const current = log[listName] || [];
    const next = current.filter((_, idx) => idx !== i);
    update(listName, next);
  };

  const askBecky = async () => {
    setAskingBecky(true);
    setBeckyAdvice('');
    try {
      const logSummary = buildLogSummary(log);
      const messages = [
        {
          role: 'user',
          content: `I'm troubleshooting a video that's not coming out right. Here's what I've logged today:\n\n${logSummary}\n\nWhat do you think I should check next? Give me practical steps, not a lecture.`,
        },
      ];
      const reply = await chatWithBecky(messages, groqKey);
      setBeckyAdvice(reply);
    } catch (err) {
      setBeckyAdvice('Becky couldn\'t reach Groq right now: ' + err.message);
    } finally {
      setAskingBecky(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>🎬 Video Troubleshooter</h2>
        <p style={styles.subtitle}>Track what's breaking. Figure out why.</p>
      </div>

      {/* Host & schedule */}
      <div style={styles.hostSection}>
        <div style={styles.sectionLabel}>Which host today?</div>
        <div style={styles.hostGrid}>
          {HOSTS.map(h => (
            <button
              key={h.id}
              onClick={() => update('host', h.name)}
              style={{ ...styles.hostCard, ...(log.host === h.name ? styles.hostCardActive : {}) }}
            >
              <div style={styles.hostName}>{h.name}</div>
              <div style={styles.hostSchedule}>{h.schedule}</div>
              <div style={styles.hostVoice}>{h.voice}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Script */}
      <div style={styles.stage}>
        <div style={styles.stageHeader}>
          <h3 style={styles.stageTitle}>1. Script</h3>
        </div>
        <textarea
          value={log.scriptText || ''}
          onChange={(e) => update('scriptText', e.target.value)}
          placeholder="Paste or type today's script here..."
          style={styles.stageTextarea}
          rows={5}
        />
      </div>

      {/* Voice generation */}
      <StageBlock
        number="2"
        title="Voice Generation"
        subtitle="ElevenLabs"
        data={log.voiceGeneration || {}}
        extraFields={[
          { key: 'voiceId', label: 'Voice ID used' },
        ]}
        onUpdate={(field, value) => update(`voiceGeneration.${field}`, value)}
      />

      {/* Avatar / video generation */}
      <StageBlock
        number="3"
        title="Avatar / Video Generation"
        subtitle="Abacus.AI, Remotion, or other"
        data={log.avatarGeneration || {}}
        extraFields={[
          { key: 'platform', label: 'Platform used' },
        ]}
        onUpdate={(field, value) => update(`avatarGeneration.${field}`, value)}
      />

      {/* Export / publish */}
      <StageBlock
        number="4"
        title="Export / Publish"
        subtitle="Vmake, download, upload"
        data={log.export || {}}
        extraFields={[
          { key: 'format', label: 'Output format' },
        ]}
        onUpdate={(field, value) => update(`export.${field}`, value)}
      />

      {/* Missing steps / worked / failed */}
      <ListBlock
        title="🧩 Missing Steps"
        hint="Things you noticed are missing from the workflow"
        items={log.missingSteps || []}
        onAdd={(desc) => addToList('missingSteps', desc)}
        onRemove={(i) => removeFromList('missingSteps', i)}
        color="#f59e0b"
      />

      <ListBlock
        title="✅ What Worked"
        hint="Steps that went right — so you don't lose them"
        items={log.whatWorked || []}
        onAdd={(desc) => addToList('whatWorked', desc)}
        onRemove={(i) => removeFromList('whatWorked', i)}
        color="#10b981"
      />

      <ListBlock
        title="❌ What Failed"
        hint="Steps that broke — with enough detail to remember"
        items={log.whatFailed || []}
        onAdd={(desc) => addToList('whatFailed', desc)}
        onRemove={(i) => removeFromList('whatFailed', i)}
        color="#ef4444"
      />

      {/* Ask Becky */}
      <div style={styles.beckySection}>
        <button
          onClick={askBecky}
          disabled={askingBecky}
          style={{ ...styles.askBeckyBtn, ...(askingBecky ? styles.disabled : {}) }}
        >
          {askingBecky ? '💜 Becky is thinking...' : '💜 Ask Becky what to check next'}
        </button>
        {beckyAdvice && (
          <div style={styles.beckyAdvice}>
            <div style={styles.beckyAdviceLabel}>💜 Becky's Take</div>
            <div style={styles.beckyAdviceText}>{beckyAdvice}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// SUBCOMPONENTS
// ============================================================

function StageBlock({ number, title, subtitle, data, extraFields = [], onUpdate }) {
  return (
    <div style={styles.stage}>
      <div style={styles.stageHeader}>
        <h3 style={styles.stageTitle}>
          {number}. {title}
          <span style={styles.stageSub}>· {subtitle}</span>
        </h3>
        <StatusDropdown value={data.status || 'not-started'} onChange={(v) => onUpdate('status', v)} />
      </div>

      {extraFields.map(f => (
        <input
          key={f.key}
          value={data[f.key] || ''}
          onChange={(e) => onUpdate(f.key, e.target.value)}
          placeholder={f.label}
          style={styles.stageInput}
        />
      ))}

      <textarea
        value={data.notes || ''}
        onChange={(e) => onUpdate('notes', e.target.value)}
        placeholder="Notes — what settings, what you tried"
        style={styles.stageTextarea}
        rows={2}
      />

      <textarea
        value={data.errors || ''}
        onChange={(e) => onUpdate('errors', e.target.value)}
        placeholder="Errors or problems (if any) — paste error messages here"
        style={{ ...styles.stageTextarea, background: data.errors ? '#fef2f2' : '#fff', borderColor: data.errors ? '#fecaca' : '#d1d5db' }}
        rows={2}
      />
    </div>
  );
}

function StatusDropdown({ value, onChange }) {
  return (
    <div style={styles.statusRow}>
      {STATUS_OPTIONS.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          style={{
            ...styles.statusOpt,
            ...(value === opt.value ? { ...styles.statusOptActive, background: opt.color, borderColor: opt.color } : {}),
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function ListBlock({ title, hint, items, onAdd, onRemove, color }) {
  const [input, setInput] = useState('');
  const submit = () => {
    if (!input.trim()) return;
    onAdd(input);
    setInput('');
  };
  return (
    <div style={styles.listBlock}>
      <div style={{ ...styles.listHeader, borderLeftColor: color }}>
        <h3 style={styles.listTitle}>{title}</h3>
        <div style={styles.listHint}>{hint}</div>
      </div>
      <div style={styles.listAdd}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="Add an entry..."
          style={styles.listInput}
        />
        <button onClick={submit} style={{ ...styles.listAddBtn, background: color }}>Add</button>
      </div>
      {items.length === 0 ? (
        <div style={styles.listEmpty}>None logged yet.</div>
      ) : (
        <ul style={styles.listItems}>
          {items.map((item, i) => (
            <li key={i} style={styles.listItem}>
              <span>{item.description}</span>
              <button onClick={() => onRemove(i)} style={styles.listRemove}>×</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function buildLogSummary(log) {
  const parts = [];
  if (log.host) parts.push(`Host: ${log.host}`);
  if (log.scriptText) parts.push(`Script (${log.scriptText.length} chars): ${log.scriptText.slice(0, 200)}${log.scriptText.length > 200 ? '...' : ''}`);
  ['voiceGeneration', 'avatarGeneration', 'export'].forEach(stage => {
    const s = log[stage] || {};
    if (s.status && s.status !== 'not-started') {
      let line = `${stage}: ${s.status}`;
      if (s.notes) line += ` — ${s.notes}`;
      if (s.errors) line += ` [ERRORS: ${s.errors}]`;
      parts.push(line);
    }
  });
  if (log.whatFailed?.length) parts.push(`Failed: ${log.whatFailed.map(f => f.description).join('; ')}`);
  if (log.whatWorked?.length) parts.push(`Worked: ${log.whatWorked.map(f => f.description).join('; ')}`);
  if (log.missingSteps?.length) parts.push(`Missing: ${log.missingSteps.map(f => f.description).join('; ')}`);
  return parts.join('\n');
}

const styles = {
  container: { padding: '24px', maxWidth: '900px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' },
  header: { marginBottom: '20px' },
  title: { fontSize: '24px', margin: '0 0 4px 0', color: '#1a1a2e' },
  subtitle: { fontSize: '14px', color: '#6b7280', margin: 0 },
  sectionLabel: { fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' },
  hostSection: { marginBottom: '24px' },
  hostGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' },
  hostCard: { padding: '12px', background: '#fff', border: '2px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer', textAlign: 'left' },
  hostCardActive: { borderColor: '#6366f1', background: '#eef2ff' },
  hostName: { fontSize: '14px', fontWeight: '700', color: '#1f2937' },
  hostSchedule: { fontSize: '11px', color: '#6366f1', fontWeight: '600', marginTop: '2px' },
  hostVoice: { fontSize: '11px', color: '#6b7280', marginTop: '4px' },
  stage: { marginBottom: '16px', padding: '16px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px' },
  stageHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' },
  stageTitle: { fontSize: '15px', margin: 0, color: '#1f2937', fontWeight: '700' },
  stageSub: { fontSize: '12px', color: '#9ca3af', fontWeight: '400', marginLeft: '6px' },
  stageInput: { width: '100%', padding: '8px 10px', fontSize: '13px', border: '1px solid #d1d5db', borderRadius: '6px', marginBottom: '8px', boxSizing: 'border-box' },
  stageTextarea: { width: '100%', padding: '8px 10px', fontSize: '13px', border: '1px solid #d1d5db', borderRadius: '6px', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box', marginBottom: '8px' },
  statusRow: { display: 'flex', gap: '4px' },
  statusOpt: { padding: '4px 10px', background: '#fff', border: '1px solid #d1d5db', borderRadius: '12px', fontSize: '11px', cursor: 'pointer', color: '#6b7280' },
  statusOptActive: { color: '#fff', fontWeight: '600' },
  listBlock: { marginBottom: '16px', padding: '16px', background: '#f9fafb', borderRadius: '10px' },
  listHeader: { borderLeft: '4px solid', paddingLeft: '12px', marginBottom: '12px' },
  listTitle: { fontSize: '14px', margin: '0 0 2px 0', color: '#1f2937' },
  listHint: { fontSize: '11px', color: '#6b7280' },
  listAdd: { display: 'flex', gap: '6px', marginBottom: '8px' },
  listInput: { flex: 1, padding: '8px 10px', fontSize: '13px', border: '1px solid #d1d5db', borderRadius: '6px' },
  listAddBtn: { padding: '8px 14px', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' },
  listEmpty: { fontSize: '12px', color: '#9ca3af', fontStyle: 'italic', padding: '8px 0' },
  listItems: { listStyle: 'none', padding: 0, margin: 0 },
  listItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#fff', borderRadius: '6px', marginBottom: '4px', fontSize: '13px', color: '#374151' },
  listRemove: { background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '18px', lineHeight: 1, padding: 0 },
  beckySection: { marginTop: '24px', padding: '20px', background: 'linear-gradient(135deg, #faf5ff 0%, #eef2ff 100%)', borderRadius: '12px', border: '2px solid #c4b5fd' },
  askBeckyBtn: { width: '100%', padding: '14px', background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' },
  disabled: { opacity: 0.6, cursor: 'not-allowed' },
  beckyAdvice: { marginTop: '16px', padding: '16px', background: '#fff', borderRadius: '10px' },
  beckyAdviceLabel: { fontSize: '13px', fontWeight: '700', color: '#6d28d9', marginBottom: '8px' },
  beckyAdviceText: { fontSize: '14px', lineHeight: '1.6', color: '#1f2937', whiteSpace: 'pre-wrap' },
};
