import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'icon' | 'drawer-selector' | 'dropdown' | 'button';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = 'icon', className = '' }) => {
  const { theme, isDark, toggleTheme, setTheme } = useTheme();

  // Variant 1: Quick 1-tap Sun/Moon icon in header and admin
  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        className={`p-2 rounded-full text-charcoal-700 hover:text-burgundy-800 hover:bg-cream-100 transition relative flex items-center justify-center ${className}`}
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-amber-400 transition-transform duration-300 hover:rotate-90" />
        ) : (
          <Moon className="w-5 h-5 text-charcoal-800 transition-transform duration-300 hover:-rotate-12" />
        )}
      </button>
    );
  }

  // Variant 2: Drawer Selector (for MobileNav drawer)
  if (variant === 'drawer-selector') {
    return (
      <div className={`p-4 rounded-2xl bg-white border border-cream-200 shadow-sm space-y-2.5 ${className}`}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-900 flex items-center gap-1.5">
            {isDark ? <Moon className="w-4 h-4 text-purple-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
            <span>Display Appearance</span>
          </span>
          <span className="text-[11px] font-semibold capitalize text-burgundy-800 bg-rose-50 px-2.5 py-0.5 rounded-full">
            {theme} Mode
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={() => setTheme('light')}
            className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition flex items-center justify-center gap-2 ${
              !isDark
                ? 'border-burgundy-800 bg-burgundy-800 text-white shadow-sm'
                : 'border-cream-200 bg-cream-50 text-charcoal-800 hover:bg-cream-100'
            }`}
          >
            <Sun className="w-4 h-4 text-amber-400" />
            <span>Light Mode</span>
          </button>

          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition flex items-center justify-center gap-2 ${
              isDark
                ? 'border-burgundy-800 bg-burgundy-800 text-white shadow-sm'
                : 'border-cream-200 bg-cream-50 text-charcoal-800 hover:bg-cream-100'
            }`}
          >
            <Moon className="w-4 h-4 text-purple-400" />
            <span>Dark Mode</span>
          </button>
        </div>

        <p className="text-[10px] text-charcoal-700 leading-tight">
          Select <strong>Light</strong> for daytime shopping or <strong>Dark</strong> for comfortable night browsing.
        </p>
      </div>
    );
  }

  // Variant 3: Footer button / toggle
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`inline-flex items-center gap-2 py-1.5 px-3 rounded-full border border-cream-300 bg-white hover:bg-cream-100 text-xs text-charcoal-800 font-medium transition shadow-sm ${className}`}
    >
      {isDark ? (
        <>
          <Sun className="w-3.5 h-3.5 text-amber-400" />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <Moon className="w-3.5 h-3.5 text-charcoal-700" />
          <span>Dark Mode</span>
        </>
      )}
    </button>
  );
};
