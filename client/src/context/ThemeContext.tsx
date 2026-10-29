import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

export type ThemeMode = 'light' | 'dark' | 'bright' | 'system';

interface ThemeContextType {
  mode: ThemeMode;
  effectiveTheme: 'light' | 'dark' | 'bright';
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  toggleDarkMode: () => void;
  cycleTheme: () => void;
}

const THEME_STORAGE_KEY = 'chic_store_theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
      if (saved && ['light', 'dark', 'bright', 'system'].includes(saved)) {
        return saved;
      }
    } catch (e) {
      // Ignore
    }
    return 'system';
  });

  const [systemIsDark, setSystemIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Listen to OS dark/light mode changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      setSystemIsDark(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, []);

  const effectiveTheme: 'light' | 'dark' | 'bright' = useMemo(() => {
    if (mode === 'system') {
      return systemIsDark ? 'dark' : 'light';
    }
    return mode;
  }, [mode, systemIsDark]);

  const isDark = effectiveTheme === 'dark';

  // Apply to document element
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'theme-dark', 'theme-bright', 'theme-light');
    root.removeAttribute('data-theme');

    if (effectiveTheme === 'dark') {
      root.classList.add('dark', 'theme-dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else if (effectiveTheme === 'bright') {
      root.classList.add('theme-bright');
      root.setAttribute('data-theme', 'bright');
      root.style.colorScheme = 'light';
    } else {
      root.classList.add('theme-light');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }
  }, [effectiveTheme]);

  const setThemeMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newMode);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleDarkMode = () => {
    // Quick 1-click toggle between light and dark
    if (isDark) {
      setThemeMode('light');
    } else {
      setThemeMode('dark');
    }
  };

  const cycleTheme = () => {
    // Cycle through: light -> dark -> bright -> system -> light
    const order: ThemeMode[] = ['light', 'dark', 'bright', 'system'];
    const nextIdx = (order.indexOf(mode) + 1) % order.length;
    setThemeMode(order[nextIdx]);
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        effectiveTheme,
        isDark,
        setThemeMode,
        toggleDarkMode,
        cycleTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
