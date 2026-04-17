// useAutosave.js
// Hub Engine v3 — Continuous Autosave Hook
//
// Stronger than useDraft — saves continuously while typing (debounced),
// AND on page unload, AND on tab switch, AND on component unmount.
//
// Use this for the LinkedIn post composer and any other "work in progress" field
// where you absolutely cannot afford to lose content.
//
// USAGE:
//   const [post, setPost, saveNow] = useAutosave({
//     initialValue: '',
//     load: () => loadDay(today).linkedinPost.draft,
//     save: (value) => updateDayField(today, 'linkedinPost.draft', value),
//     debounceMs: 800,
//   });

import { useState, useEffect, useRef, useCallback } from 'react';

export function useAutosave({ initialValue = '', load, save, debounceMs = 800 }) {
  // Hydrate from load() on mount
  const [value, setValue] = useState(() => {
    try {
      const loaded = load ? load() : null;
      return loaded ?? initialValue;
    } catch {
      return initialValue;
    }
  });

  const [lastSavedAt, setLastSavedAt] = useState(null);
  const [saving, setSaving] = useState(false);
  const timerRef = useRef(null);
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  // The actual save function
  const doSave = useCallback(() => {
    try {
      setSaving(true);
      save(valueRef.current);
      setLastSavedAt(Date.now());
      setSaving(false);
    } catch (err) {
      console.warn('[useAutosave] save failed:', err);
      setSaving(false);
    }
  }, [save]);

  // Debounced save on value change
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      doSave();
    }, debounceMs);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [value, debounceMs, doSave]);

  // Save on unmount / unload / visibility change
  useEffect(() => {
    const handleUnload = () => doSave();
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') doSave();
    };
    window.addEventListener('beforeunload', handleUnload);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      doSave(); // unmount save
      window.removeEventListener('beforeunload', handleUnload);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [doSave]);

  // Manual save trigger
  const saveNow = useCallback(() => doSave(), [doSave]);

  return [value, setValue, { saveNow, lastSavedAt, saving }];
}

// Format "saved 3 seconds ago" style timestamps
export const formatSaveTime = (timestamp) => {
  if (!timestamp) return 'Not saved yet';
  const diff = Date.now() - timestamp;
  if (diff < 2000) return 'Saved just now';
  if (diff < 60000) return `Saved ${Math.floor(diff / 1000)}s ago`;
  if (diff < 3600000) return `Saved ${Math.floor(diff / 60000)}m ago`;
  return `Saved at ${new Date(timestamp).toLocaleTimeString()}`;
};
