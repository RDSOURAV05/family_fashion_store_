import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Heart, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { InstagramIcon } from '../common/InstagramIcon';
import { STORE_PHONE_DISPLAY, STORE_WHATSAPP_NUMBER, STORE_INSTAGRAM_URL, STORE_TEL_LINK } from '../../utils/whatsapp';
import { ThemeToggle } from '../common/ThemeToggle';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-cream-100 border-t border-cream-300 pt-16 pb-12 text-charcoal-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-cream-200">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-2xl tracking-[0.25em] font-medium text-burgundy-900 uppercase">
                CHIC STORE
              </span>
              <span className="block text-[9px] tracking-[0.35em] text-charcoal-700 uppercase -mt-0.5">
                Women's Boutique
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-charcoal-700 max-w-sm">
              Discover timeless sarees, elegant kurtas, ethnic sets, and contemporary dresses designed for women who appreciate graceful sophistication and comfortable elegance.
            </p>

            {/* Official Social Links with Logos */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={`https://wa.me/${STORE_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp Chic Store"
                aria-label="Contact Chic Store on WhatsApp (+91 82816 10328)"
                className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:bg-[#1EBE5D] transition shadow-sm hover:scale-105"
              >
                <WhatsAppIcon size={20} className="fill-current text-white" />
              </a>

              <a
                href={STORE_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                title="Follow Chic Store on Instagram"
                aria-label="Follow Chic Store on Instagram"
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white flex items-center justify-center hover:opacity-90 transition shadow-sm hover:scale-105"
              >
                <InstagramIcon size={19} className="fill-current text-white" />
              </a>

              <a
                href={STORE_TEL_LINK}
                title="Call Chic Store"
                aria-label="Call Chic Store (+91 82816 10328)"
                className="w-10 h-10 rounded-full bg-white border border-cream-300 text-charcoal-700 flex items-center justify-center hover:border-burgundy-700 hover:text-burgundy-800 transition shadow-sm hover:scale-105"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Shop Links */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-charcoal-900 mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/shop?category=Sarees" className="hover:text-burgundy-800 transition">
                  Sarees
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Kurtas%20%26%20Kurta%20Sets" className="hover:text-burgundy-800 transition">
                  Kurtas & Kurta Sets
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Ethnic%20Wear" className="hover:text-burgundy-800 transition">
                  Ethnic Wear
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Dresses" className="hover:text-burgundy-800 transition">
                  Dresses
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Tops%20%26%20Tunics" className="hover:text-burgundy-800 transition">
                  Tops & Tunics
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Co-ord%20Sets" className="hover:text-burgundy-800 transition">
                  Co-ord Sets
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Festive%20Collection" className="hover:text-burgundy-800 transition">
                  Festive Collection
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service & Policies */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-charcoal-900 mb-4">
              Boutique Care
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/contact" className="hover:text-burgundy-800 transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:text-burgundy-800 transition">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="hover:text-burgundy-800 transition">
                  Return & Exchange
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-burgundy-800 transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-burgundy-800 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-burgundy-800 transition">
                  My Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-charcoal-900 mb-4">
              Connect Directly
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-charcoal-700 font-medium">
                  Direct Inquiries & WhatsApp
                </span>
                <a
                  href={`https://wa.me/${STORE_WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-burgundy-900 hover:underline flex items-center gap-1.5 mt-0.5"
                >
                  <WhatsAppIcon size={14} className="text-[#25D366] fill-current" />
                  <span>{STORE_PHONE_DISPLAY}</span>
                </a>
              </div>

              <div>
                <span className="block text-[11px] uppercase tracking-wider text-charcoal-700 font-medium">
                  Official Instagram
                </span>
                <a
                  href={STORE_INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-burgundy-900 hover:underline flex items-center gap-1.5 mt-0.5"
                >
                  <InstagramIcon size={14} className="text-rose-500 fill-current" />
                  <span>@_chicstore.in</span>
                </a>
              </div>

              <div className="pt-2">
                <Link
                  to="/admin/login"
                  className="inline-flex items-center gap-1 text-xs text-charcoal-700 hover:text-burgundy-800 hover:underline"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-700 gap-4">
          <div className="flex items-center gap-4">
            <p>© {new Date().getFullYear()} Chic Store. All rights reserved.</p>
            <ThemeToggle variant="button" />
          </div>
          <p className="text-[11px] text-charcoal-700 text-center sm:text-right">
            Curated Women's Fashion • WhatsApp Ordering • Standard Indian Boutique Care
          </p>
        </div>
      </div>
    </footer>
  );
};
