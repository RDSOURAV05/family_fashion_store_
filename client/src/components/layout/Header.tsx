import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { InstagramIcon } from '../common/InstagramIcon';
import { STORE_WHATSAPP_NUMBER, STORE_INSTAGRAM_URL } from '../../utils/whatsapp';
import { MobileNav } from './MobileNav';
import { SearchModal } from '../common/SearchModal';
import { ThemeToggle } from '../common/ThemeToggle';

interface HeaderProps {
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems, setIsDrawerOpen } = useCart();
  const { wishlist } = useWishlist();
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop All', path: '/shop' },
    { label: 'Sarees', path: '/shop?category=Sarees' },
    { label: 'Kurtas & Sets', path: '/shop?category=Kurtas%20%26%20Kurta%20Sets' },
    { label: 'Ethnic Wear', path: '/shop?category=Ethnic%20Wear' },
    { label: 'Dresses & Tops', path: '/shop?category=Dresses%20%26%20Tops' },
    { label: 'New Arrivals', path: '/shop?category=New%20Arrivals' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname + location.search === path;
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-cream-200/80 shadow-soft transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-22">
            
            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile navigation menu"
                className="p-2 -ml-2 text-charcoal-800 hover:text-burgundy-700 transition"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex-1 lg:flex-none flex justify-center lg:justify-start">
              <Link to="/" className="group flex flex-col items-center lg:items-start text-center">
                <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] font-medium text-burgundy-900 group-hover:text-burgundy-700 transition uppercase">
                  CHIC STORE
                </span>
                <span className="text-[9px] tracking-[0.35em] text-charcoal-700 font-sans uppercase -mt-1 font-light">
                  Women's Boutique
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`text-xs xl:text-sm tracking-wide font-medium transition-all relative py-1 ${
                    isActive(link.path)
                      ? 'text-burgundy-800 font-semibold'
                      : 'text-charcoal-700 hover:text-burgundy-700'
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-burgundy-800 rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Actions & Brand Socials */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Official Instagram Icon */}
              <a
                href={STORE_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                title="Follow Chic Store on Instagram"
                aria-label="Follow Chic Store on Instagram"
                className="hidden sm:flex p-2 rounded-full text-charcoal-700 hover:text-[#E1306C] hover:bg-rose-50 transition"
              >
                <InstagramIcon size={19} className="fill-current" />
              </a>

              {/* Official WhatsApp Icon */}
              <a
                href={`https://wa.me/${STORE_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Chat with Chic Store on WhatsApp (+91 82816 10328)"
                aria-label="Contact Chic Store on WhatsApp (+91 82816 10328)"
                className="hidden sm:flex p-2 rounded-full text-[#25D366] hover:bg-emerald-50 transition"
              >
                <WhatsAppIcon size={19} className="fill-current" />
              </a>

              {/* Theme Toggle (Bright / Dark Mode) */}
              <ThemeToggle variant="icon" />

              {/* Search Icon */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search collection"
                className="p-2 text-charcoal-700 hover:text-burgundy-800 hover:bg-cream-100 rounded-full transition"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Icon */}
              <Link
                to="/wishlist"
                aria-label="View Wishlist"
                className="p-2 text-charcoal-700 hover:text-burgundy-800 hover:bg-cream-100 rounded-full transition relative"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Icon */}
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                aria-label="View Shopping Bag"
                className="p-2 text-charcoal-700 hover:text-burgundy-800 hover:bg-cream-100 rounded-full transition relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-burgundy-800 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scaleIn">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navLinks}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
};
