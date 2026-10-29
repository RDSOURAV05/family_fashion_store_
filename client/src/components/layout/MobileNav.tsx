import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Phone, Heart, ShoppingBag, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { InstagramIcon } from '../common/InstagramIcon';
import { ThemeToggle } from '../common/ThemeToggle';
import { STORE_PHONE_DISPLAY, STORE_WHATSAPP_NUMBER, STORE_INSTAGRAM_URL, STORE_TEL_LINK } from '../../utils/whatsapp';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; path: string }[];
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose, links }) => {
  const location = useLocation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-charcoal-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-2xl flex flex-col z-10 animate-slideRight">
        {/* Header */}
        <div className="p-5 border-b border-cream-200 flex items-center justify-between bg-cream-50">
          <div>
            <span className="font-serif text-xl tracking-[0.2em] font-medium text-burgundy-900 uppercase">
              CHIC STORE
            </span>
            <span className="block text-[9px] tracking-widest text-charcoal-700 uppercase">
              Women's Boutique
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 text-charcoal-700 hover:text-burgundy-800 rounded-full hover:bg-cream-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4 px-5 space-y-1">
          {links.map((link) => {
            const active = location.pathname + location.search === link.path || (link.path === '/' && location.pathname === '/');
            return (
              <Link
                key={link.label}
                to={link.path}
                onClick={onClose}
                className={`block py-3 px-3 rounded-xl text-sm font-medium transition ${
                  active
                    ? 'bg-rose-50 text-burgundy-900 font-semibold'
                    : 'text-charcoal-800 hover:bg-cream-100 hover:text-burgundy-800'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Display & Contrast Mode Selector */}
          <div className="pt-3 pb-1">
            <ThemeToggle variant="drawer-selector" />
          </div>

          <div className="pt-3 border-t border-cream-200 mt-2 space-y-1">
            <Link
              to="/wishlist"
              onClick={onClose}
              className="flex items-center gap-3 py-2.5 px-3 rounded-xl text-sm text-charcoal-700 hover:bg-cream-100"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Wishlist</span>
            </Link>
            <Link
              to="/cart"
              onClick={onClose}
              className="flex items-center gap-3 py-2.5 px-3 rounded-xl text-sm text-charcoal-700 hover:bg-cream-100"
            >
              <ShoppingBag className="w-4 h-4 text-burgundy-700" />
              <span>Shopping Bag</span>
            </Link>
            <Link
              to="/contact"
              onClick={onClose}
              className="flex items-center gap-3 py-2.5 px-3 rounded-xl text-sm text-charcoal-700 hover:bg-cream-100"
            >
              <Phone className="w-4 h-4 text-charcoal-700" />
              <span>Contact Boutique</span>
            </Link>
          </div>
        </div>

        {/* Official Social Contact Buttons in Mobile Menu */}
        <div className="p-5 border-t border-cream-200 bg-cream-50 space-y-3">
          <a
            href={`https://wa.me/${STORE_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact Chic Store on WhatsApp (+91 82816 10328)"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#25D366] text-white text-xs font-semibold shadow-sm hover:bg-[#1EBE5D] transition"
          >
            <WhatsAppIcon size={16} className="fill-current text-white" />
            <span>WhatsApp Us (+91 82816 10328)</span>
          </a>

          <a
            href={STORE_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Chic Store on Instagram"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white text-xs font-semibold shadow-sm hover:opacity-95 transition"
          >
            <InstagramIcon size={15} className="fill-current text-white" />
            <span>Follow @_chicstore.in</span>
          </a>

          <a
            href={STORE_TEL_LINK}
            className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-xl border border-cream-300 bg-white text-charcoal-700 text-xs font-medium hover:border-burgundy-700 transition"
          >
            <Phone className="w-3.5 h-3.5 text-burgundy-700" />
            <span>Call: {STORE_PHONE_DISPLAY}</span>
          </a>

          <div className="pt-2">
            <Link
              to="/admin/login"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-burgundy-900 text-cream-100 hover:bg-burgundy-950 text-xs font-semibold tracking-wide shadow-sm transition"
            >
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>Administrator Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
