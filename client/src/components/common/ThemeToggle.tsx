import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Sparkles, Smartphone, Check } from 'lucide-react';
import { useTheme, ThemeMode } from '../../context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'icon' | 'dropdown' | 'drawer-selector';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = 'icon', className = '' }) => {
  const { mode, effectiveTheme, isDark, setThemeMode, toggleDarkMode } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      return () => document.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [dropdownOpen]);

  // Variant 1: Quick 1-tap Sun/Moon icon in header
  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={toggleDarkMode}
        aria-label={isDark ? 'Switch to Bright Light Mode' : 'Switch to Midnight Dark Mode'}
        title={isDark ? 'Switch to Bright Light Mode' : 'Switch to Midnight Dark Mode'}
        className={`p-2 rounded-full text-charcoal-700 hover:text-burgundy-800 hover:bg-cream-100 transition relative flex items-center justify-center ${className}`}
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-90" />
        ) : (
          <Moon className="w-5 h-5 text-charcoal-800 transition-transform duration-300 hover:-rotate-12" />
        )}
      </button>
    );
  }

  // Variant 2: Header dropdown selector
  if (variant === 'dropdown') {
    const options: { id: ThemeMode; label: string; icon: React.ReactNode; desc: string }[] = [
      { id: 'light', label: 'Warm Boutique', icon: <Sparkles className="w-4 h-4 text-rose-500" />, desc: 'Classic ivory & rose' },
      { id: 'bright', label: 'Bright Daylight', icon: <Sun className="w-4 h-4 text-amber-500" />, desc: 'Crisp high-contrast' },
      { id: 'dark', label: 'Midnight Dark', icon: <Moon className="w-4 h-4 text-purple-400" />, desc: 'Luxury dark theme' },
      { id: 'system', label: 'System Match', icon: <Smartphone className="w-4 h-4 text-blue-500" />, desc: 'Matches device setting' },
    ];

    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          aria-label="Change color theme"
          className="p-2 rounded-full text-charcoal-700 hover:text-burgundy-800 hover:bg-cream-100 transition flex items-center gap-1"
        >
          {isDark ? (
            <Moon className="w-4 h-4 text-purple-400" />
          ) : mode === 'bright' ? (
            <Sun className="w-4 h-4 text-amber-500" />
          ) : (
            <Sparkles className="w-4 h-4 text-rose-500" />
          )}
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-cream-200 py-2 z-50 animate-scaleIn">
            <div className="px-4 py-2 border-b border-cream-200/60">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-700 block">
                Reading Theme & Contrast
              </span>
            </div>
            <div className="p-1.5 space-y-1">
              {options.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setThemeMode(opt.id);
                    setDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition ${
                    mode === opt.id
                      ? 'bg-rose-50 text-burgundy-900 font-semibold'
                      : 'text-charcoal-800 hover:bg-cream-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {opt.icon}
                    <div className="text-left">
                      <div className="font-medium">{opt.label}</div>
                      <div className="text-[10px] text-charcoal-600">{opt.desc}</div>
                    </div>
                  </div>
                  {mode === opt.id && <Check className="w-4 h-4 text-burgundy-700" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Variant 3: Drawer Selector (for MobileNav)
  const mobileOptions: { id: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { id: 'bright', label: '☀️ Bright', icon: null },
    { id: 'dark', label: '🌙 Dark', icon: null },
    { id: 'light', label: '🌸 Warm', icon: null },
    { id: 'system', label: '📱 Auto', icon: null },
  ];

  return (
    <div className={`p-4 rounded-2xl bg-cream-100 border border-cream-200 space-y-2.5 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-900 flex items-center gap-1.5">
          {isDark ? <Moon className="w-3.5 h-3.5 text-purple-400" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
          <span>Display Mode & Contrast</span>
        </span>
        <span className="text-[10px] text-charcoal-700 capitalize font-medium">
          {mode === 'system' ? `Auto (${effectiveTheme})` : mode}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-1.5">
        {mobileOptions.map(opt => {
          const active = mode === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setThemeMode(opt.id)}
              className={`py-2 px-1 rounded-xl text-xs font-medium text-center transition flex flex-col items-center justify-center ${
                active
                  ? 'bg-burgundy-900 text-white shadow-sm font-semibold'
                  : 'bg-white text-charcoal-800 border border-cream-200 hover:bg-cream-50'
              }`}
            >
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
      <p className="text-[10px] text-charcoal-700 leading-tight">
        Tip: Switch to <strong>Bright</strong> for sunny outdoor reading or <strong>Dark</strong> for midnight browsing.
      </p>
    </div>
  );
};
