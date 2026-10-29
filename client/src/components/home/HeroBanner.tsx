import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { STORE_WHATSAPP_NUMBER } from '../../utils/whatsapp';

interface HeroBannerProps {
  headline?: string;
  supportingText?: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  headline = 'Elegance, Woven Into Every Look.',
  supportingText = 'Discover timeless sarees, beautiful kurtas, and styles that celebrate you.'
}) => {
  return (
    <section className="relative overflow-hidden bg-cream-100 min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center">
      {/* Background Hero Image with Subtle Tint */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1800&q=85"
          alt="Chic Store Women's Fashion Collection"
          className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.02]"
        />
        {/* Soft luxury gradients */}
        <div className="absolute inset-0 hero-gradient-overlay sm:w-3/4 lg:w-3/5" />
        <div className="absolute inset-0 bg-burgundy-950/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-xl lg:max-w-2xl space-y-6">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-cream-200 text-burgundy-800 text-xs font-medium shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span className="tracking-widest uppercase font-serif">Handcrafted Boutique Elegance</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-charcoal-900 leading-[1.15] tracking-tight">
            {headline}
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg text-charcoal-700 leading-relaxed max-w-lg font-light">
            {supportingText}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-burgundy-800 hover:bg-burgundy-900 text-white font-medium text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:translate-y-[-1px] active:scale-95"
            >
              <span>Shop Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/shop?category=New%20Arrivals"
              className="inline-flex items-center justify-center px-7 py-4 rounded-full bg-white/90 hover:bg-white text-charcoal-900 font-medium text-sm border border-cream-300 hover:border-burgundy-700 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow"
            >
              Explore New Arrivals
            </Link>
          </div>

          {/* Direct WhatsApp Quick Help */}
          <div className="pt-4 flex items-center gap-3">
            <a
              href={`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Chic Store! I would like some styling recommendations.')}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Direct WhatsApp styling assistance"
              className="inline-flex items-center gap-2 text-xs text-charcoal-800 hover:text-burgundy-800 transition"
            >
              <span className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-sm">
                <WhatsAppIcon size={14} className="fill-current text-white" />
              </span>
              <span className="font-medium">Need sizing or custom assistance? Chat on WhatsApp</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
