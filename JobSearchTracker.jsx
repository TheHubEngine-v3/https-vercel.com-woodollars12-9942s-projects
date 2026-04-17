// JobSearchTracker.jsx
// Hub Engine v3 — Daily Job Search Tracker
//
// Three lists, 5 items each:
//   - Job posts (role, company, url, notes)
//   - Company pages (name, url, notes)
//   - Founder posts (author, url, takeaway)

import React, { useState } from 'react';
import { todayKey, loadDay, saveDay, getOrCreateToday } from './dailyStore.js';

export default function JobSearchTracker() {
  const today = todayKey();
  useState(() => { getOrCreateToday(); });

  const [day, setDay] = useState(() => loadDay(today));

  const persist = (updated) => {
    saveDay(updated);
    setDay({ ...updated });
  };

  // ---------- Job posts ----------
  const addJobPost = (entry) => {
    const updated = loadDay(today);
    updated.checklist.jobPosts.push({ ...entry, addedAt: Date.now() });
    persist(updated);
  };
  const removeJobPost = (i) => {
    const updated = loadDay(today);
    updated.checklist.jobPosts.splice(i, 1);
    persist(updated);
  };

  // ---------- Company pages ----------
  const addCompany = (entry) => {
    const updated = loadDay(today);
    updated.checklist.companyPages.push({ ...entry, addedAt: Date.now() });
    persist(updated);
  };
  const removeCompany = (i) => {
    const updated = loadDay(today);
    updated.checklist.companyPages.splice(i, 1);
    persist(updated);
  };

  // ---------- Founder posts ----------
  const addFounder = (entry) => {
    const updated = loadDay(today);
    updated.checklist.founderPosts.push({ ...entry, addedAt: Date.now() });
    persist(updated);
  };
  const removeFounder = (i) => {
    const updated = loadDay(today);
    updated.checklist.founderPosts.splice(i, 1);
    persist(updated);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>💼 Daily Job Search</h2>
        <p style={styles.subtitle}>5 job posts · 5 company pages · 5 founder posts</p>
      </div>

      {/* Progress pills */}
      <div style={styles.progressRow}>
        <ProgressPill label="Job Posts" count={day.checklist.jobPosts.length} target={5} />
        <ProgressPill label="Companies" count={day.checklist.companyPages.length} target={5} />
        <ProgressPill label="Founders" count={day.checklist.founderPosts.length} target={5} />
      </div>

      {/* JOB POSTS */}
      <CollectionBlock
        title="💼 Job Posts"
        hint="Operations Coordinator, Warehouse Supervisor, Logistics — Southeast Texas"
        items={day.checklist.jobPosts}
        target={5}
        renderItem={(item, i) => (
          <>
            <div style={styles.itemMain}>
              <strong>{item.title}</strong>
              <span style={styles.itemSub}>{item.company}</span>
            </div>
            {item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" style={styles.itemLink}>View →</a>}
            {item.notes && <div style={styles.itemNotes}>{item.notes}</div>}
          </>
        )}
        formFields={[
          { key: 'title', label: 'Job title', required: true },
          { key: 'company', label: 'Company', required: true },
          { key: 'url', label: 'Link to posting' },
          { key: 'notes', label: 'Quick notes (optional)' },
        ]}
        onAdd={addJobPost}
        onRemove={removeJobPost}
      />

      {/* COMPANIES */}
      <CollectionBlock
        title="🏢 Company Pages"
        hint="Companies you could see yourself at — culture, location, size"
        items={day.checklist.companyPages}
        target={5}
        renderItem={(item, i) => (
          <>
            <div style={styles.itemMain}>
              <strong>{item.name}</strong>
            </div>
            {item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" style={styles.itemLink}>View →</a>}
            {item.notes && <div style={styles.itemNotes}>{item.notes}</div>}
          </>
        )}
        formFields={[
          { key: 'name', label: 'Company name', required: true },
          { key: 'url', label: 'LinkedIn or website' },
          { key: 'notes', label: 'Why this one?' },
        ]}
        onAdd={addCompany}
        onRemove={removeCompany}
      />

      {/* FOUNDERS */}
      <CollectionBlock
        title="👤 Founder Posts"
        hint="People you'd learn from. Save posts that catch your eye."
        items={day.checklist.founderPosts}
        target={5}
        renderItem={(item) => (
          <>
            <div style={styles.itemMain}>
              <strong>{item.author}</strong>
            </div>
            {item.postUrl && <a href={item.postUrl} target="_blank" rel="noopener noreferrer" style={styles.itemLink}>Open post →</a>}
            {item.takeaway && <div style={styles.itemNotes}>Takeaway: {item.takeaway}</div>}
          </>
        )}
        formFields={[
          { key: 'author', label: 'Author name', required: true },
          { key: 'postUrl', label: 'Post link' },
          { key: 'takeaway', label: 'What stood out?' },
        ]}
        onAdd={addFounder}
        onRemove={removeFounder}
      />
    </div>
  );
}

// ============================================================
// SUBCOMPONENTS
// ============================================================

function ProgressPill({ label, count, target }) {
  const done = count >= target;
  return (
    <div style={{ ...styles.pill, ...(done ? styles.pillDone : {}) }}>
      <div style={styles.pillCount}>{count}/{target}</div>
      <div style={styles.pillLabel}>{label}</div>
    </div>
  );
}

function CollectionBlock({ title, hint, items, target, renderItem, formFields, onAdd, onRemove }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({});

  const submit = () => {
    const required = formFields.filter(f => f.required);
    if (required.some(f => !form[f.key]?.trim())) {
      alert('Please fill the required fields.');
      return;
    }
    onAdd(form);
    setForm({});
    setShowForm(false);
  };

  return (
    <div style={styles.block}>
      <div style={styles.blockHeader}>
        <div>
          <h3 style={styles.blockTitle}>{title}</h3>
          <div style={styles.blockHint}>{hint}</div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{ ...styles.addBtn, ...(items.length >= target ? styles.addBtnFull : {}) }}
        >
          {showForm ? '× Close' : `+ Add (${items.length}/${target})`}
        </button>
      </div>

      {showForm && (
        <div style={styles.form}>
          {formFields.map(field => (
            <div key={field.key} style={styles.formRow}>
              <label style={styles.formLabel}>
                {field.label} {field.required && <span style={styles.required}>*</span>}
              </label>
              {field.key === 'notes' || field.key === 'takeaway' ? (
                <textarea
                  value={form[field.key] || ''}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  style={styles.formTextarea}
                  rows={2}
                />
              ) : (
                <input
                  value={form[field.key] || ''}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  style={styles.formInput}
                />
              )}
            </div>
          ))}
          <button onClick={submit} style={styles.submitBtn}>Save</button>
        </div>
      )}

      {items.length === 0 ? (
        <div style={styles.empty}>Nothing here yet. Add your first one.</div>
      ) : (
        <div style={styles.itemsList}>
          {items.map((item, i) => (
            <div key={i} style={styles.item}>
              <div style={styles.itemBody}>{renderItem(item, i)}</div>
              <button onClick={() => onRemove(i)} style={styles.itemRemove}>×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: '24px', maxWidth: '900px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' },
  header: { marginBottom: '16px' },
  title: { fontSize: '24px', margin: '0 0 4px 0', color: '#1a1a2e' },
  subtitle: { fontSize: '14px', color: '#6b7280', margin: 0 },
  progressRow: { display: 'flex', gap: '12px', marginBottom: '24px' },
  pill: { flex: 1, padding: '12px 16px', background: '#f9fafb', borderRadius: '10px', textAlign: 'center', border: '1px solid #e5e7eb' },
  pillDone: { background: '#f0fdf4', borderColor: '#86efac' },
  pillCount: { fontSize: '22px', fontWeight: '700', color: '#1f2937' },
  pillLabel: { fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' },
  block: { marginBottom: '24px', padding: '20px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px' },
  blockHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' },
  blockTitle: { fontSize: '17px', margin: '0 0 4px 0', color: '#1f2937' },
  blockHint: { fontSize: '12px', color: '#6b7280' },
  addBtn: { padding: '8px 14px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap' },
  addBtnFull: { background: '#10b981' },
  form: { padding: '16px', background: '#f9fafb', borderRadius: '8px', marginBottom: '12px' },
  formRow: { marginBottom: '10px' },
  formLabel: { display: 'block', fontSize: '12px', color: '#374151', fontWeight: '600', marginBottom: '4px' },
  required: { color: '#dc2626' },
  formInput: { width: '100%', padding: '8px 10px', fontSize: '14px', border: '1px solid #d1d5db', borderRadius: '6px', boxSizing: 'border-box' },
  formTextarea: { width: '100%', padding: '8px 10px', fontSize: '14px', border: '1px solid #d1d5db', borderRadius: '6px', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical' },
  submitBtn: { padding: '8px 16px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' },
  empty: { padding: '20px', textAlign: 'center', color: '#9ca3af', fontSize: '13px', fontStyle: 'italic' },
  itemsList: { display: 'flex', flexDirection: 'column', gap: '8px' },
  item: { display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '12px', background: '#f9fafb', borderRadius: '8px' },
  itemBody: { flex: 1 },
  itemMain: { display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '4px' },
  itemSub: { fontSize: '12px', color: '#6b7280' },
  itemLink: { fontSize: '12px', color: '#6366f1', textDecoration: 'none', display: 'inline-block', marginBottom: '4px' },
  itemNotes: { fontSize: '12px', color: '#4b5563', fontStyle: 'italic' },
  itemRemove: { background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#9ca3af', padding: 0, lineHeight: 1 },
};
