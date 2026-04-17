// AIDashboard.jsx
// Hub Engine v3 — AI Tools Dashboard
//
// Tier structure:
//   - Becky (Main Studio AI) — huge card up top
//   - Chat AIs (API-backed research & second opinion)
//   - Creative AIs (image / video generation)
//   - External Tools (link-out to their apps — NotebookLM, Substack)
//
// Clicking an API-backed card sets it as active. External tools open in new tab.

import React from 'react';
import {
  getPrimary,
  getChatTools,
  getCreativeTools,
  getExternalTools,
} from './providers.js';

export default function AIDashboard({ onSelect, activeId }) {
  const primary = getPrimary();
  const chat = getChatTools();
  const creative = getCreativeTools();
  const external = getExternalTools();

  return (
    <div style={styles.container}>

      {/* Hero banner */}
      <div style={styles.hero}>
        <div style={styles.heroTitle}>Three Minds. One Mission. Zero Cost.</div>
        <div style={styles.heroSubtitle}>
          AffiliateMediaHub Studio · John (CEO) · Becky (Creative Director) · Claude (Developer)
        </div>
      </div>

      {/* PRIMARY: Becky */}
      <div style={styles.section}>
        <div style={styles.sectionLabel}>Main Studio AI</div>
        <div style={styles.primaryRow}>
          {primary.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelect(p.id)}
              style={{
                ...styles.primaryCard,
                ...(activeId === p.id ? styles.primaryCardActive : {}),
              }}
            >
              <div style={styles.primaryIcon}>{p.icon}</div>
              <div style={styles.primaryName}>{p.name}</div>
              <div style={styles.primaryRole}>{p.role}</div>
              <div style={styles.primaryTagline}>{p.tagline}</div>
              <div style={styles.capabilitiesList}>
                {p.capabilities.slice(0, 6).map(cap => (
                  <span key={cap} style={styles.capTag}>{formatCap(cap)}</span>
                ))}
              </div>
              <div style={styles.openBtn}>Open Becky →</div>
            </button>
          ))}
        </div>
      </div>

      {/* CHAT AIs */}
      <ToolSection
        label="Chat & Research AIs"
        sub="For fact-checking, current info, or a different style of answer. Becky rewrites results in studio voice."
        tools={chat}
        onSelect={onSelect}
        activeId={activeId}
      />

      {/* CREATIVE AIs */}
      <ToolSection
        label="Creative & Generation"
        sub="Image and video generation for thumbnails, posters, B-roll, and visuals."
        tools={creative}
        onSelect={onSelect}
        activeId={activeId}
      />

      {/* EXTERNAL TOOLS */}
      <ToolSection
        label="External Tools"
        sub="Workflow tools without standard APIs. Open in a new tab."
        tools={external}
        onSelect={onSelect}
        activeId={activeId}
        externalOnly
      />
    </div>
  );
}

// ============================================================
// Subcomponents
// ============================================================

function ToolSection({ label, sub, tools, onSelect, activeId, externalOnly }) {
  if (tools.length === 0) return null;
  return (
    <div style={styles.section}>
      <div style={styles.sectionLabel}>{label}</div>
      <div style={styles.sectionSub}>{sub}</div>
      <div style={styles.grid}>
        {tools.map((p) => (
          <ToolCard
            key={p.id}
            tool={p}
            onSelect={onSelect}
            isActive={activeId === p.id}
            externalOnly={externalOnly}
          />
        ))}
      </div>
    </div>
  );
}

function ToolCard({ tool, onSelect, isActive, externalOnly }) {
  const isPlanned = tool.status === 'planned';
  const isExternal = tool.type === 'external' || externalOnly;

  const handleClick = () => {
    if (isExternal && tool.externalUrl) {
      window.open(tool.externalUrl, '_blank', 'noopener,noreferrer');
    } else if (!isPlanned) {
      onSelect(tool.id);
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        ...styles.toolCard,
        ...(isActive ? styles.toolCardActive : {}),
        ...(isPlanned && !isExternal ? styles.toolCardPlanned : {}),
      }}
    >
      <div style={styles.toolHeader}>
        <span style={styles.toolIcon}>{tool.icon}</span>
        {isPlanned && !isExternal && (
          <span style={styles.plannedBadge}>Setup needed</span>
        )}
        {isExternal && (
          <span style={styles.externalBadge}>Opens in new tab</span>
        )}
      </div>
      <div style={styles.toolName}>{tool.name}</div>
      <div style={styles.toolRole}>{tool.role}</div>
      <div style={styles.toolTagline}>{tool.tagline}</div>
    </button>
  );
}

function formatCap(cap) {
  return cap.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
}

// ============================================================
// Styles
// ============================================================

const styles = {
  container: {
    padding: '24px',
    maxWidth: '1100px',
    margin: '0 auto',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  hero: {
    textAlign: 'center',
    padding: '28px 20px',
    background: 'linear-gradient(135deg, #faf5ff 0%, #eef2ff 100%)',
    borderRadius: '16px',
    marginBottom: '32px',
    border: '1px solid #e9d5ff',
  },
  heroTitle: {
    fontSize: '26px',
    fontWeight: '700',
    color: '#4c1d95',
    marginBottom: '8px',
    letterSpacing: '-0.5px',
  },
  heroSubtitle: { fontSize: '13px', color: '#6d28d9', fontWeight: '500' },
  section: { marginBottom: '32px' },
  sectionLabel: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '4px',
  },
  sectionSub: { fontSize: '14px', color: '#9ca3af', marginBottom: '16px', lineHeight: '1.5' },
  primaryRow: { display: 'flex', gap: '16px' },
  primaryCard: {
    flex: 1,
    padding: '28px',
    background: 'linear-gradient(135deg, #faf5ff 0%, #ede9fe 50%, #e0e7ff 100%)',
    border: '2px solid #c4b5fd',
    borderRadius: '16px',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s',
    boxShadow: '0 4px 16px rgba(139, 92, 246, 0.12)',
  },
  primaryCardActive: { borderColor: '#7c3aed', boxShadow: '0 6px 24px rgba(124, 58, 237, 0.25)' },
  primaryIcon: { fontSize: '48px', marginBottom: '8px' },
  primaryName: { fontSize: '32px', fontWeight: '800', color: '#4c1d95', marginBottom: '4px' },
  primaryRole: { fontSize: '14px', color: '#6d28d9', fontWeight: '600', marginBottom: '8px' },
  primaryTagline: { fontSize: '15px', color: '#374151', marginBottom: '16px' },
  capabilitiesList: { display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' },
  capTag: {
    padding: '3px 10px',
    background: '#fff',
    border: '1px solid #c4b5fd',
    borderRadius: '12px',
    fontSize: '11px',
    color: '#6d28d9',
    fontWeight: '500',
  },
  openBtn: {
    display: 'inline-block',
    padding: '8px 16px',
    background: '#7c3aed',
    color: '#fff',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '12px',
  },
  toolCard: {
    padding: '16px',
    background: '#fff',
    border: '2px solid #e5e7eb',
    borderRadius: '10px',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.15s',
  },
  toolCardActive: { borderColor: '#6366f1', background: '#f5f3ff' },
  toolCardPlanned: { opacity: 0.85, background: '#fafafa' },
  toolHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  toolIcon: { fontSize: '28px' },
  plannedBadge: {
    padding: '2px 8px',
    background: '#fef3c7',
    color: '#92400e',
    borderRadius: '10px',
    fontSize: '10px',
    fontWeight: '600',
    letterSpacing: '0.3px',
    textTransform: 'uppercase',
  },
  externalBadge: {
    padding: '2px 8px',
    background: '#dbeafe',
    color: '#1e40af',
    borderRadius: '10px',
    fontSize: '10px',
    fontWeight: '600',
    letterSpacing: '0.3px',
    textTransform: 'uppercase',
  },
  toolName: { fontSize: '16px', fontWeight: '700', color: '#1f2937', marginBottom: '2px' },
  toolRole: { fontSize: '12px', color: '#6b7280', fontWeight: '500', marginBottom: '6px' },
  toolTagline: { fontSize: '12px', color: '#9ca3af', lineHeight: '1.4' },
};
