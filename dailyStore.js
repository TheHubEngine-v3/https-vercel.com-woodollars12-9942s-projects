// dailyStore.js
// Hub Engine v3 — Daily Workstation Data Store
//
// Central localStorage schema for Becky's daily assistant workflow.
// Everything keyed by date (YYYY-MM-DD) so history is preserved and queryable.
//
// SCHEMA PER DAY:
//   hubengine_day_{date} = {
//     date, checklist, linkedinPost, videoLog, research, notes
//   }
//
// INDEX:
//   hubengine_days_index = [date1, date2, ...]  // sorted, most recent first

const DAY_PREFIX = 'hubengine_day_';
const INDEX_KEY = 'hubengine_days_index';

// ============================================================
// DATE HELPERS
// ============================================================

export const todayKey = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export const formatDate = (dateKey) => {
  const [y, m, d] = dateKey.split('-');
  return new Date(+y, +m - 1, +d).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });
};

// ============================================================
// DEFAULT DAY STRUCTURE
// ============================================================

export const createEmptyDay = (date = todayKey()) => ({
  date,
  createdAt: Date.now(),
  updatedAt: Date.now(),

  // Daily checklist — 7 required actions per day
  checklist: {
    jobPosts: [],        // [{title, company, url, notes, addedAt}]
    companyPages: [],    // [{name, url, notes, addedAt}]
    founderPosts: [],    // [{author, postUrl, takeaway, addedAt}]
    linkedinDrafted: false,
    draftSaved: false,
    researchAttached: false,
    dayReviewed: false,
  },

  // LinkedIn post composer
  linkedinPost: {
    draft: '',
    theme: '',                    // one of the theme keys below
    attachedResearch: [],         // [{source, query, content, citations, addedAt}]
    lastSaved: null,
    status: 'draft',              // 'draft' | 'ready' | 'posted'
    wordCount: 0,
    beckyRewriteVersion: null,    // latest Becky-rewritten version
  },

  // Video troubleshooting log
  videoLog: {
    host: '',                     // Susan | Alisha | Paul Baby Boss | Lisa
    scheduledFor: '',             // which day this was planned for
    scriptText: '',
    voiceGeneration: {
      status: 'not-started',      // not-started | in-progress | success | failed
      voiceId: '',
      notes: '',
      errors: '',
    },
    avatarGeneration: {
      status: 'not-started',
      platform: '',               // Abacus.AI | Remotion | etc
      notes: '',
      errors: '',
    },
    export: {
      status: 'not-started',
      format: '',
      notes: '',
      errors: '',
    },
    missingSteps: [],             // [{description, noticedAt}]
    whatWorked: [],               // [{description, addedAt}]
    whatFailed: [],               // [{description, addedAt}]
  },

  // Free-form research pool (independent of LinkedIn post attachments)
  research: [],                   // [{id, query, source, content, citations, savedAt, tags}]

  // End-of-day notes / reflections
  notes: '',
});

// LinkedIn post themes matching John's brief
export const LINKEDIN_THEMES = {
  'past-to-present': {
    label: 'From Past to Present',
    hint: '20+ years in manufacturing → now building with AI. How far you\'ve come.',
  },
  'factory-background': {
    label: 'Factory / Maintenance Background',
    hint: 'What decades of plant floor discipline teaches you that transfers to any job.',
  },
  'learning-ai': {
    label: 'Learning AI & Internet Skills',
    hint: 'Real progress learning AI and online work as a 59-year-old — no pretending.',
  },
  'building-app': {
    label: 'Building Hub Engine',
    hint: 'Building your own AI assistant app with Claude as the developer partner.',
  },
  'video-trading-courses': {
    label: 'Studying Video & Trading',
    hint: 'What you\'re learning from video production and trading courses.',
  },
  'honest-progress': {
    label: 'Honest Progress',
    hint: 'Showing real steps forward without pretending to be an expert.',
  },
};

// ============================================================
// STORAGE OPERATIONS
// ============================================================

export const loadDay = (date = todayKey()) => {
  try {
    const raw = localStorage.getItem(DAY_PREFIX + date);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.warn('[dailyStore] loadDay failed:', err);
    return null;
  }
};

export const saveDay = (day) => {
  try {
    day.updatedAt = Date.now();
    localStorage.setItem(DAY_PREFIX + day.date, JSON.stringify(day));
    addToIndex(day.date);
    return true;
  } catch (err) {
    console.warn('[dailyStore] saveDay failed:', err);
    return false;
  }
};

export const getOrCreateToday = () => {
  const existing = loadDay(todayKey());
  if (existing) return existing;
  const fresh = createEmptyDay();
  saveDay(fresh);
  return fresh;
};

export const addToIndex = (date) => {
  try {
    const raw = localStorage.getItem(INDEX_KEY);
    const index = raw ? JSON.parse(raw) : [];
    if (!index.includes(date)) {
      index.unshift(date); // most recent first
      localStorage.setItem(INDEX_KEY, JSON.stringify(index));
    }
  } catch (err) {
    console.warn('[dailyStore] addToIndex failed:', err);
  }
};

export const getAllDays = () => {
  try {
    const raw = localStorage.getItem(INDEX_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const getRecentDays = (n = 7) => {
  return getAllDays().slice(0, n).map(loadDay).filter(Boolean);
};

// ============================================================
// FIELD-LEVEL UPDATES (autosave-friendly)
// ============================================================

export const updateDayField = (date, path, value) => {
  const day = loadDay(date) || createEmptyDay(date);
  const parts = path.split('.');
  let target = day;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!target[parts[i]]) target[parts[i]] = {};
    target = target[parts[i]];
  }
  target[parts[parts.length - 1]] = value;
  return saveDay(day);
};

// ============================================================
// PROGRESS CALCULATION
// ============================================================

export const calculateProgress = (day) => {
  if (!day) return { pct: 0, done: 0, total: 7 };

  const checks = [
    day.checklist.jobPosts.length >= 5,
    day.checklist.companyPages.length >= 5,
    day.checklist.founderPosts.length >= 5,
    day.linkedinPost.draft.trim().length > 50,
    day.linkedinPost.status === 'ready' || day.linkedinPost.status === 'posted',
    day.linkedinPost.attachedResearch.length > 0,
    day.checklist.dayReviewed,
  ];

  const done = checks.filter(Boolean).length;
  return { pct: Math.round((done / checks.length) * 100), done, total: checks.length };
};
