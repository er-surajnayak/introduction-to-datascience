'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type CarbonTheme = 'white' | 'g100';

interface ThemeContextType {
  theme: CarbonTheme;
  toggleTheme: () => void;
  setTheme: (theme: CarbonTheme) => void;
  isMounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'di_notes_carbon_theme_v1';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<CarbonTheme>('g100');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as CarbonTheme | null;
      if (stored === 'white' || stored === 'g100') {
        setThemeState(stored);
        document.documentElement.classList.remove('cds--g100', 'cds--white');
        document.documentElement.classList.add(`cds--${stored}`);
        document.documentElement.style.colorScheme = stored === 'white' ? 'light' : 'dark';
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme: CarbonTheme = prefersDark ? 'g100' : 'white';
        setThemeState(initialTheme);
        document.documentElement.classList.remove('cds--g100', 'cds--white');
        document.documentElement.classList.add(`cds--${initialTheme}`);
        document.documentElement.style.colorScheme = prefersDark ? 'dark' : 'light';
      }
    } catch (e) {
      console.warn('Could not read theme preference', e);
    }
    setIsMounted(true);
  }, []);

  const setTheme = useCallback((nextTheme: CarbonTheme) => {
    setThemeState(nextTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      document.documentElement.classList.remove('cds--g100', 'cds--white');
      document.documentElement.classList.add(`cds--${nextTheme}`);
      document.documentElement.style.colorScheme = nextTheme === 'white' ? 'light' : 'dark';
    } catch (e) {
      console.warn('Could not save theme preference', e);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'g100' ? 'white' : 'g100');
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isMounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
