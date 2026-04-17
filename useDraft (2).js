// useDraft.js
// Hub Engine v3 — Universal Draft Persistence
//
// Saves drafts when the user leaves a page/tab, restores them when they come back.
// Works for ANY textarea/input in the app. Each input gets a unique key so drafts
// don't collide.
//
// USAGE:
//   const [draft, setDraft] = useDraft('becky-chat');
//   const [research, setResearch] = useDraft('perplexity-research');
//
// Saves trigger on:
//   - Page unload (closing tab, refresh, navigation away)
//   - Tab becoming hidden (switching to another browser tab)
//   - Component unmount (switching tabs inside Hub Engine)
//
// Restores automatically on mount.

import { useState, useEffect, useRef } from 'react';

const STORAGE_PREFIX = 'hubengine_draft_';

export function useDraft(key, initialValue = '') {
  const storageKey = STORAGE_PREFIX + key;

  // Hydrate from localStorage on first render
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved !== null ? saved : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Keep a ref to latest value so event handlers see current state
  const valueRef = useRef(value);
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  // Save function — only writes if there's actual content
  const save = () => {
    try {
      const current = valueRef.current;
      if (current && current.trim().length > 0) {
        localStorage.setItem(storageKey, current);
      } else {
        // empty draft — clean up storage
        localStorage.removeItem(storageKey);
      }
    } catch (err) {
      console.warn('[useDraft] save failed:', err);
    }
  };

  // Attach save triggers
  useEffect(() => {
    const handleBeforeUnload = () => save();
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') save();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Save on unmount (tab switch inside Hub Engine)
    return () => {
      save();
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  // Clear helper — call after successful send/submit
  const clear = () => {
    try {
      localStorage.removeItem(storageKey);
      setValue('');
    } catch (err) {
      console.warn('[useDraft] clear failed:', err);
    }
  };

  return [value, setValue, clear];
}
