// SettingsPanel.jsx
// Hub Engine v3 — Settings
//
// Shows all AI tools with their current key status.
// Read-only display (keys are set via Vercel env vars, not edited in-app for security).

import React from 'react';
import { PROVIDERS } from './providers.js';

export default function SettingsPanel() {
  const allTools = Object.values(PROVIDERS);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>⚙️ Settings</h2>
      <p style={styles.subtitle}>
        API keys are managed in Vercel environment variables for security.
        This page shows which tools are configured and ready to use.
      </p>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>AI Tool Status</h3>
        <div style={styles.list}>
          {allTools.map(tool => (
            <ToolRow key={tool.id} tool={tool} />
          ))}
        </div>
      </div>

      <div style={styles.helpBox}>
        <h4 style={styles.helpTitle}>How to activate a tool</h4>
        <ol style={styles.helpList}>
          <li>Sign up at the tool's website and generate an API key</li>
          <li>Open Vercel dashboard → your project → Settings → Environment Variables</li>
          <li>Add the variable name shown below (e.g. <code>GEMINI_API_KEY</code>)</li>
          <li>Paste in your key and save</li>
          <li>Redeploy the app — the tool will show as "Ready"</li>
        </ol>
      </div>
    </div>
  );
}

function ToolRow({ tool }) {
  const isExternal = tool.type === 'external';
  const needsKey = tool.apiKeyEnv && !isExternal;
  const isReady = tool.status === 'active';

  return (
    <div style={styles.row}>
      <div style={styles.rowLeft}>
        <span style={styles.rowIcon}>{tool.icon}</span>
        <div>
          <div style={styles.rowName}>{tool.name}</div>
          <div style={styles.rowRole}>{tool.role}</div>
        </div>
      </div>

      <div style={styles.rowRight}>
        {isReady && <span style={styles.badgeReady}>✓ Ready</span>}
        {!isReady && !isExternal && (
          <span style={styles.badgeSetup}>Setup needed</span>
        )}
        {isExternal && <span style={styles.badgeExternal}>Link-out only</span>}

        {needsKey && (
          <code style={styles.envVar}>{tool.apiKeyEnv}</code>
        )}
        {tool.externalUrl && (
          <a
            href={tool.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.externalLink}
          >
            Open →
          </a>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '24px', maxWidth: '900px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' },
  title: { fontSize: '24px', margin: '0 0 4px 0', color: '#1a1a2e' },
  subtitle: { fontSize: '14px', color: '#6b7280', marginBottom: '24px', lineHeight: '1.5' },
  section: { marginBottom: '24px' },
  sectionTitle: { fontSize: '16px', margin: '0 0 12px 0', color: '#374151' },
  list: { display: 'flex', flexDirection: 'column', gap: '6px' },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 14px',
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    gap: '12px',
  },
  rowLeft: { display: 'flex', alignItems: 'center', gap: '12px', flex: 1 },
  rowIcon: { fontSize: '24px' },
  rowName: { fontSize: '14px', fontWeight: '700', color: '#1f2937' },
  rowRole: { fontSize: '12px', color: '#6b7280' },
  rowRight: { display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' },
  badgeReady: {
    padding: '3px 10px',
    background: '#dcfce7',
    color: '#16a34a',
    borderRadius: '10px',
    fontSize: '11px',
    fontWeight: '700',
  },
  badgeSetup: {
    padding: '3px 10px',
    background: '#fef3c7',
    color: '#92400e',
    borderRadius: '10px',
    fontSize: '11px',
    fontWeight: '700',
  },
  badgeExternal: {
    padding: '3px 10px',
    background: '#dbeafe',
    color: '#1e40af',
    borderRadius: '10px',
    fontSize: '11px',
    fontWeight: '700',
  },
  envVar: {
    padding: '3px 8px',
    background: '#f3f4f6',
    color: '#4b5563',
    borderRadius: '6px',
    fontSize: '11px',
    fontFamily: 'monospace',
  },
  externalLink: {
    fontSize: '12px',
    color: '#6366f1',
    textDecoration: 'none',
    fontWeight: '600',
  },
  helpBox: {
    marginTop: '24px',
    padding: '16px',
    background: '#f0f9ff',
    border: '1px solid #bae6fd',
    borderRadius: '10px',
  },
  helpTitle: { fontSize: '14px', margin: '0 0 8px 0', color: '#075985' },
  helpList: { margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#0c4a6e', lineHeight: '1.7' },
};
