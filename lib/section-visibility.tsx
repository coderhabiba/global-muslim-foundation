'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const VISIBILITY_STORAGE_KEY = 'gmcf:section_visibility_v1';

interface SectionVisibilityContextType {
  visibilityMap: Record<string, boolean>;
  isSectionVisible: (sectionId: string, defaultVisible?: boolean) => boolean;
  toggleSectionVisibility: (sectionId: string, currentVal?: boolean) => boolean;
  setSectionVisibility: (sectionId: string, isVisible: boolean) => void;
  resetVisibility: () => void;
}

const SectionVisibilityContext = createContext<SectionVisibilityContextType | undefined>(undefined);

export function SectionVisibilityProvider({ children }: { children: React.ReactNode }) {
  const [visibilityMap, setVisibilityMap] = useState<Record<string, boolean>>({});

  // 1. Initial load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(VISIBILITY_STORAGE_KEY);
      if (stored) {
        setVisibilityMap(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load section visibility:', e);
    }

    const handleSync = () => {
      try {
        const updated = localStorage.getItem(VISIBILITY_STORAGE_KEY);
        if (updated) {
          setVisibilityMap(JSON.parse(updated));
        }
      } catch (e) {
        console.error(e);
      }
    };

    window.addEventListener('gmcf:visibility_updated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('gmcf:visibility_updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const saveToStorage = useCallback((newMap: Record<string, boolean>) => {
    setVisibilityMap(newMap);
    try {
      localStorage.setItem(VISIBILITY_STORAGE_KEY, JSON.stringify(newMap));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('gmcf:visibility_updated'));
      }
    } catch (e) {
      console.error('Failed to save section visibility:', e);
    }
  }, []);

  const isSectionVisible = useCallback(
    (sectionId: string, defaultVisible = true) => {
      if (visibilityMap[sectionId] !== undefined) {
        return visibilityMap[sectionId];
      }
      return defaultVisible;
    },
    [visibilityMap]
  );

  const toggleSectionVisibility = useCallback(
    (sectionId: string, currentVal?: boolean) => {
      const current = currentVal !== undefined ? currentVal : (visibilityMap[sectionId] ?? true);
      const nextVal = !current;
      const updated = { ...visibilityMap, [sectionId]: nextVal };
      saveToStorage(updated);
      return nextVal;
    },
    [visibilityMap, saveToStorage]
  );

  const setSectionVisibility = useCallback(
    (sectionId: string, isVisible: boolean) => {
      const updated = { ...visibilityMap, [sectionId]: isVisible };
      saveToStorage(updated);
    },
    [visibilityMap, saveToStorage]
  );

  const resetVisibility = useCallback(() => {
    saveToStorage({});
  }, [saveToStorage]);

  return (
    <SectionVisibilityContext.Provider
      value={{
        visibilityMap,
        isSectionVisible,
        toggleSectionVisibility,
        setSectionVisibility,
        resetVisibility,
      }}
    >
      {children}
    </SectionVisibilityContext.Provider>
  );
}

export function useSectionVisibility() {
  const context = useContext(SectionVisibilityContext);
  if (!context) {
    return {
      visibilityMap: {},
      isSectionVisible: () => true,
      toggleSectionVisibility: () => true,
      setSectionVisibility: () => {},
      resetVisibility: () => {},
    };
  }
  return context;
}
