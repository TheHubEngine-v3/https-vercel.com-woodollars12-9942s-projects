// DailyDashboard.jsx
// Hub Engine v3 — Becky's Daily Workstation
//
// John's home base. Shows:
//   - Today's date + progress bar
//   - 7-item daily checklist with counts
//   - Quick links to composer, job search, video log
//   - Becky's encouragement / next action

import React, { useState, useEffect } from 'react';
import {
  getOrCreateToday, saveDay, formatDate, calculateProgress, todayKey, getRecentDays,
} from './dailyStore.js';

export default function DailyDashboard({ onNavigate }) {
  const [day, setDay] = useState(() => getOrCreateToday());
  const [progress, setProgress] = useState(() => calculateProgress(day));

  // Refresh when tab regains focus (in case edits happened elsewhere)
  useEffect(() => {
    const refresh = () => {
      const fresh = getOrCreateToday();
      setDay(fresh);
      setProgress(calculateProgress(fresh));
    };
    window.addEventListener('focus', refresh);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') refresh();
    });
    return () => window.removeEventListener('focus', refresh);
  }, []);

  const toggleReviewed = () => {
    const updated = { ...day };
    updated.checklist.dayReviewed = !updated.checklist.dayReviewed;
    saveDay(updated);
    setDay(updated);
    setProgress(calculateProgress(updated));
  };

  const nextAction = getNextAction(day);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={styles.date}>{formatDate(day.date)}</div>
          <h1 style={styles.title}>💜 Good to see you, John</h1>
          <div style={styles.subtitle}>Here's your day with Becky.</div>
        </div>
        <div style={styles.progressRing}>
          <div style={styles.progressBig}>{progress.pct}%</div>
          <div style={styles.progressLabel}>{progress.done}/{progress.total} done</div>
        </div>
      </div>

      {/* Becky's next-action card */}
      <div style={styles.nextAction}>
        <div style={styles.nextActionLabel}>Becky says</div>
        <div style={styles.nextActionText}>{nextAction.text}</div>
        {nextAction.tab && (
          <button style={styles.nextActionBtn} onClick={() => onNavigate(nextAction.tab)}>
            {nextAction.btnLabel} →
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div style={styles.progressBarWrap}>
        <div style={{ ...styles.progressBarFill, width: `${progress.pct}%` }} />
      </div>

      {/* Daily checklist */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Today's Checklist</h2>
          <span style={styles.sectionHint}>7 actions for a complete day</span>
        </div>

        <div style={styles.checklist}>
          <ChecklistRow
            icon="💼"
            label="Collect 5 job posts"
            count={day.checklist.jobPosts.length}
            target={5}
            onClick={() => onNavigate('jobSearch')}
          />
          <ChecklistRow
            icon="🏢"
            label="Collect 5 company pages"
            count={day.checklist.companyPages.length}
            target={5}
            onClick={() => onNavigate('jobSearch')}
          />
          <ChecklistRow
            icon="👤"
            label="Collect 5 founder posts"
            count={day.checklist.founderPosts.length}
            target={5}
            onClick={() => onNavigate('jobSearch')}
          />
          <ChecklistRow
            icon="✍️"
            label="Draft today's LinkedIn post"
            count={day.linkedinPost.draft.trim().length > 50 ? 1 : 0}
            target={1}
            onClick={() => onNavigate('linkedinComposer')}
          />
          <ChecklistRow
            icon="🔍"
            label="Attach research to the post"
            count={day.linkedinPost.attachedResearch.length}
            target={1}
            minToSatisfy={1}
            onClick={() => onNavigate('linkedinComposer')}
          />
          <ChecklistRow
            icon="✅"
            label="Mark post ready to publish"
            count={(day.linkedinPost.status === 'ready' || day.linkedinPost.status === 'posted') ? 1 : 0}
            target={1}
            onClick={() => onNavigate('linkedinComposer')}
          />
          <ChecklistRow
            icon="📝"
            label="Review the day"
            count={day.checklist.dayReviewed ? 1 : 0}
            target={1}
            onClick={toggleReviewed}
          />
        </div>
      </div>

      {/* Quick tool links */}
      <div style={styles.toolsGrid}>
        <ToolCard
          icon="✍️"
          title="LinkedIn Composer"
          sub="Draft, attach research, autosave"
          status={day.linkedinPost.status}
          wordCount={day.linkedinPost.wordCount}
          onClick={() => onNavigate('linkedinComposer')}
        />
        <ToolCard
          icon="💼"
          title="Job Search Tracker"
          sub={`${day.checklist.jobPosts.length + day.checklist.companyPages.length + day.checklist.founderPosts.length} items today`}
          onClick={() => onNavigate('jobSearch')}
        />
        <ToolCard
          icon="🎬"
          title="Video Troubleshooter"
          sub={day.videoLog.host ? `Working on: ${day.videoLog.host}` : 'Log video issues'}
          onClick={() => onNavigate('videoLog')}
        />
        <ToolCard
          icon="💜"
          title="Talk to Becky"
          sub="Open chat for any question"
          onClick={() => onNavigate('becky')}
        />
      </div>

      {/* Recent days */}
      <RecentDaysStrip />
    </div>
  );
}

// ============================================================
// SUBCOMPONENTS
// ============================================================

function ChecklistRow({ icon, label, count, target, onClick, minToSatisfy }) {
  const threshold = minToSatisfy ?? target;
  const done = count >= threshold;
  return (
    <button style={{ ...styles.checkRow, ...(done ? styles.checkRowDone : {}) }} onClick={onClick}>
      <span style={styles.checkIcon}>{icon}</span>
      <span style={styles.checkLabel}>{label}</span>
      <span style={{ ...styles.checkCount, ...(done ? styles.checkCountDone : {}) }}>
        {count}/{target}
      </span>
      <span style={styles.checkStatus}>{done ? '✓' : '○'}</span>
    </button>
  );
}

function ToolCard({ icon, title, sub, onClick, status }) {
  return (
    <button style={styles.toolCard} onClick={onClick}>
      <div style={styles.toolIcon}>{icon}</div>
      <div style={styles.toolTitle}>{title}</div>
      <div style={styles.toolSub}>{sub}</div>
      {status && <div style={styles.toolStatus}>Status: {status}</div>}
    </button>
  );
}

function RecentDaysStrip() {
  const recent = getRecentDays(7).slice(1); // skip today
  if (recent.length === 0) return null;
  return (
    <div style={styles.recentStrip}>
      <div style={styles.sectionHeader}>
        <h3 style={styles.recentTitle}>Past 7 Days</h3>
      </div>
      <div style={styles.recentRow}>
        {recent.map(d => {
          const p = calculateProgress(d);
          return (
            <div key={d.date} style={styles.recentDay}>
              <div style={styles.recentDate}>
                {new Date(d.date + 'T00:00').toLocaleDateString('en-US', {
                  month: 'short', day: 'numeric',
                })}
              </div>
              <div style={styles.recentPct}>{p.pct}%</div>
              <div style={styles.recentBar}>
                <div style={{ ...styles.recentBarFill, width: `${p.pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// BECKY'S NEXT-ACTION LOGIC
// ============================================================

function getNextAction(day) {
  if (day.checklist.jobPosts.length < 5)
    return { text: "Let's start with job posts. Grab 5 that match what you're looking for — operations, warehouse, logistics.", tab: 'jobSearch', btnLabel: 'Open Job Tracker' };
  if (day.checklist.companyPages.length < 5)
    return { text: "Next up: 5 company pages you could see yourself at. Southeast Texas preferred.", tab: 'jobSearch', btnLabel: 'Open Job Tracker' };
  if (day.checklist.founderPosts.length < 5)
    return { text: "Grab 5 founder posts — people you'd learn from. Don't overthink it, just save the ones that catch your eye.", tab: 'jobSearch', btnLabel: 'Open Job Tracker' };
  if (day.linkedinPost.draft.trim().length < 50)
    return { text: "Time for today's LinkedIn post. I've got the themes ready — pick one and we'll build it together.", tab: 'linkedinComposer', btnLabel: 'Open Composer' };
  if (day.linkedinPost.attachedResearch.length === 0)
    return { text: "Nice draft. Want to attach a bit of research from Perplexity to make it stronger?", tab: 'linkedinComposer', btnLabel: 'Open Composer' };
  if (day.linkedinPost.status === 'draft')
    return { text: "Read it back once more. If it feels honest and forward-looking, mark it ready.", tab: 'linkedinComposer', btnLabel: 'Open Composer' };
  if (!day.checklist.dayReviewed)
    return { text: "You're nearly done. Review the day — what worked, what to carry over to tomorrow.", tab: null, btnLabel: null };
  return { text: "Great day, John. Everything checked off. Rest well. 💜", tab: null, btnLabel: null };
}

// ============================================================
// STYLES
// ============================================================

const styles = {
  container: { padding: '24px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' },
  date: { fontSize: '13px', color: '#6b7280', marginBottom: '4px', fontWeight: '500' },
  title: { fontSize: '28px', margin: '0 0 4px 0', color: '#1a1a2e' },
  subtitle: { fontSize: '15px', color: '#6b7280' },
  progressRing: { textAlign: 'center', padding: '12px 20px', background: 'linear-gradient(135deg, #faf5ff 0%, #eef2ff 100%)', borderRadius: '12px', border: '2px solid #c4b5fd' },
  progressBig: { fontSize: '32px', fontWeight: '800', color: '#6d28d9', lineHeight: 1 },
  progressLabel: { fontSize: '11px', color: '#7c3aed', marginTop: '4px', fontWeight: '600' },
  nextAction: { background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)', borderRadius: '14px', padding: '20px', marginBottom: '20px', border: '1px solid #fcd34d' },
  nextActionLabel: { fontSize: '11px', fontWeight: '700', color: '#92400e', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' },
  nextActionText: { fontSize: '16px', color: '#78350f', lineHeight: '1.5', marginBottom: '12px' },
  nextActionBtn: { padding: '8px 16px', background: '#92400e', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  progressBarWrap: { height: '6px', background: '#f3f4f6', borderRadius: '3px', marginBottom: '28px', overflow: 'hidden' },
  progressBarFill: { height: '100%', background: 'linear-gradient(90deg, #a855f7, #6366f1)', transition: 'width 0.4s ease' },
  section: { marginBottom: '28px' },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' },
  sectionTitle: { fontSize: '18px', margin: 0, color: '#1f2937' },
  sectionHint: { fontSize: '12px', color: '#9ca3af' },
  checklist: { display: 'flex', flexDirection: 'column', gap: '8px' },
  checkRow: { display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', cursor: 'pointer', textAlign: 'left', width: '100%', transition: 'all 0.15s' },
  checkRowDone: { background: '#f0fdf4', borderColor: '#86efac' },
  checkIcon: { fontSize: '20px' },
  checkLabel: { flex: 1, fontSize: '14px', color: '#374151', fontWeight: '500' },
  checkCount: { fontSize: '13px', color: '#9ca3af', fontWeight: '600', fontFamily: 'monospace', padding: '2px 8px', background: '#f3f4f6', borderRadius: '8px' },
  checkCountDone: { background: '#dcfce7', color: '#16a34a' },
  checkStatus: { fontSize: '18px', color: '#9ca3af', width: '24px', textAlign: 'center' },
  toolsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '28px' },
  toolCard: { padding: '18px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' },
  toolIcon: { fontSize: '28px', marginBottom: '6px' },
  toolTitle: { fontSize: '15px', fontWeight: '700', color: '#1f2937', marginBottom: '4px' },
  toolSub: { fontSize: '12px', color: '#6b7280', lineHeight: '1.4' },
  toolStatus: { marginTop: '8px', fontSize: '11px', color: '#6366f1', fontWeight: '600', textTransform: 'uppercase' },
  recentStrip: { marginTop: '20px', padding: '16px', background: '#f9fafb', borderRadius: '12px' },
  recentTitle: { fontSize: '14px', margin: 0, color: '#6b7280', fontWeight: '600' },
  recentRow: { display: 'flex', gap: '8px', overflowX: 'auto', paddingTop: '8px' },
  recentDay: { minWidth: '80px', padding: '10px', background: '#fff', borderRadius: '8px', textAlign: 'center', border: '1px solid #e5e7eb' },
  recentDate: { fontSize: '11px', color: '#6b7280', marginBottom: '4px' },
  recentPct: { fontSize: '16px', fontWeight: '700', color: '#374151' },
  recentBar: { marginTop: '6px', height: '3px', background: '#e5e7eb', borderRadius: '2px', overflow: 'hidden' },
  recentBarFill: { height: '100%', background: '#6366f1' },
};
