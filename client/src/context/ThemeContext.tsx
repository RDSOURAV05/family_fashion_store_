import React, { createContext, useContext, useState, useEffect } from 'react';

export type ColorPalette = 'emerald' | 'wine' | 'noir' | 'dark';

interface ThemeContextType {
  palette: ColorPalette;
  isDark: boolean;
  setPalette: (palette: ColorPalette) => void;
  toggleDarkMode: () => void;
  cyclePalette: () => void;
}

const PALETTE_STORAGE_KEY = 'chic_store_color_palette';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [palette, setPaletteState] = useState<ColorPalette>(() => {
    try {
      const saved = localStorage.getItem(PALETTE_STORAGE_KEY) as ColorPalette | null;
      if (saved && ['emerald', 'wine', 'noir', 'dark'].includes(saved)) {
        return saved;
      }
    } catch (e) {
      // Ignore
    }
    // Default to the new fresh, high-contrast Royal Emerald & Gold combination!
    return 'emerald';
  });

  const isDark = palette === 'dark';

  // Apply palette to document root
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-palette', palette);
    root.classList.remove('dark', 'palette-emerald', 'palette-wine', 'palette-noir', 'palette-dark');
    root.classList.add(`palette-${palette}`);

    if (palette === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.style.colorScheme = 'light';
    }
  }, [palette]);

  const setPalette = (newPalette: ColorPalette) => {
    setPaletteState(newPalette);
    try {
      localStorage.setItem(PALETTE_STORAGE_KEY, newPalette);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleDarkMode = () => {
    if (isDark) {
      setPalette('emerald');
    } else {
      setPalette('dark');
    }
  };

  const cyclePalette = () => {
    const order: ColorPalette[] = ['emerald', 'wine', 'noir', 'dark'];
    const nextIdx = (order.indexOf(palette) + 1) % order.length;
    setPalette(order[nextIdx]);
  };

  return (
    <ThemeContext.Provider
      value={{
        palette,
        isDark,
        setPalette,
        toggleDarkMode,
        cyclePalette
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
