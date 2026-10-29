import React, { useState, useRef, useEffect } from 'react';
import { Palette, Sun, Moon, Check, Sparkles } from 'lucide-react';
import { useTheme, ColorPalette } from '../../context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'icon' | 'dropdown' | 'drawer-selector';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = 'icon', className = '' }) => {
  const { palette, isDark, setPalette, toggleDarkMode, cyclePalette } = useTheme();
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

  const paletteOptions: { id: ColorPalette; label: string; previewColor: string; desc: string; icon: string }[] = [
    {
      id: 'emerald',
      label: 'Royal Emerald',
      previewColor: 'bg-[#0C3E30]',
      desc: 'Deep emerald & champagne gold',
      icon: '🌿'
    },
    {
      id: 'wine',
      label: 'Ruby Wine',
      previewColor: 'bg-[#581121]',
      desc: 'Velvet wine & rose gold',
      icon: '🍷'
    },
    {
      id: 'noir',
      label: 'Luxe Noir',
      previewColor: 'bg-[#18181B]',
      desc: 'Haute couture monochrome & gold',
      icon: '🖤'
    },
    {
      id: 'dark',
      label: 'Midnight Dark',
      previewColor: 'bg-[#0E1210]',
      desc: 'Velvet noir with luminous gold',
      icon: '🌙'
    },
  ];

  // Variant 1: Quick 1-tap cycle or toggle in header
  if (variant === 'icon') {
    return (
      <div className="flex items-center gap-1">
        {/* Quick Dark Mode Flip */}
        <button
          type="button"
          onClick={toggleDarkMode}
          aria-label={isDark ? 'Switch to Royal Emerald Theme' : 'Switch to Midnight Dark Mode'}
          title={isDark ? 'Switch to Royal Emerald Theme' : 'Switch to Midnight Dark Mode'}
          className={`p-2 rounded-full text-charcoal-700 hover:text-burgundy-800 hover:bg-cream-100 transition relative flex items-center justify-center ${className}`}
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-amber-400 transition-transform duration-300 hover:rotate-90" />
          ) : (
            <Moon className="w-5 h-5 text-charcoal-800 transition-transform duration-300 hover:-rotate-12" />
          )}
        </button>

        {/* Quick Palette Cycle */}
        <button
          type="button"
          onClick={cyclePalette}
          aria-label="Cycle colour combinations"
          title={`Active Theme: ${palette.toUpperCase()} (Click to cycle)`}
          className="p-2 rounded-full text-charcoal-700 hover:text-burgundy-800 hover:bg-cream-100 transition flex items-center justify-center"
        >
          <Palette className="w-4 h-4 text-burgundy-700" />
        </button>
      </div>
    );
  }

  // Variant 2: Dropdown selector (Footer or desktop)
  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          aria-label="Change boutique colour palette"
          className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full border border-cream-300 bg-white hover:bg-cream-100 text-xs text-charcoal-800 font-medium transition shadow-sm"
        >
          <Palette className="w-3.5 h-3.5 text-burgundy-700" />
          <span className="capitalize">{palette} Theme</span>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 bottom-full mb-2 w-64 rounded-2xl bg-white shadow-2xl border border-cream-200 py-2 z-50 animate-scaleIn">
            <div className="px-4 py-2 border-b border-cream-200">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-900 block">
                Boutique Colour Combination
              </span>
            </div>
            <div className="p-1.5 space-y-1">
              {paletteOptions.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setPalette(opt.id);
                    setDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition ${
                    palette === opt.id
                      ? 'bg-cream-100 font-semibold'
                      : 'text-charcoal-800 hover:bg-cream-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-4 h-4 rounded-full ${opt.previewColor} border border-white/40 shadow-sm shrink-0`} />
                    <div className="text-left">
                      <div className="font-semibold text-charcoal-900">{opt.icon} {opt.label}</div>
                      <div className="text-[10px] text-charcoal-700 font-normal">{opt.desc}</div>
                    </div>
                  </div>
                  {palette === opt.id && <Check className="w-4 h-4 text-burgundy-700" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Variant 3: Drawer Selector (for MobileNav)
  return (
    <div className={`p-4 rounded-2xl bg-white border border-cream-200 shadow-sm space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-900 flex items-center gap-1.5">
          <Palette className="w-4 h-4 text-burgundy-700" />
          <span>Colour Combination</span>
        </span>
        <span className="text-[11px] font-medium capitalize text-burgundy-800 bg-rose-50 px-2.5 py-0.5 rounded-full">
          {palette}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {paletteOptions.map(opt => {
          const active = palette === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setPalette(opt.id)}
              className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2.5 ${
                active
                  ? 'border-burgundy-700 bg-cream-100 shadow-sm ring-1 ring-burgundy-700 font-semibold'
                  : 'border-cream-200 bg-white text-charcoal-800 hover:bg-cream-50'
              }`}
            >
              <span className={`w-4 h-4 rounded-full ${opt.previewColor} shrink-0 border border-white/60 shadow-sm`} />
              <div className="truncate">
                <span className="text-xs block truncate font-medium text-charcoal-900">{opt.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-[10px] text-charcoal-700 leading-tight">
        Tip: Switch to <strong>Royal Emerald</strong> or <strong>Luxe Noir</strong> for high-contrast reading.
      </p>
    </div>
  );
};
