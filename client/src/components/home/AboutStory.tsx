import React from 'react';
import { Heart, Sparkles, Feather } from 'lucide-react';

interface AboutStoryProps {
  aboutText?: string;
}

export const AboutStory: React.FC<AboutStoryProps> = ({
  aboutText = 'At Chic Store, we believe every outfit tells a story. From graceful traditional wear to effortlessly modern styles, discover pieces that bring comfort, confidence, and elegance to your wardrobe.'
}) => {
  return (
    <section className="py-20 sm:py-28 bg-white border-t border-cream-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-rose-50 text-burgundy-800">
          <Feather className="w-6 h-6" />
        </div>

        <div className="space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-burgundy-700 font-serif block">
            Our Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
            About Chic Store
          </h2>
          <div className="w-12 h-[1px] bg-rose-300 mx-auto mt-4" />
        </div>

        <p className="font-serif text-xl sm:text-2xl text-charcoal-800 leading-relaxed font-normal italic max-w-3xl mx-auto">
          "{aboutText}"
        </p>

        {/* Core Values Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-8 border-t border-cream-200">
          <div className="p-4 rounded-xl bg-cream-50/70 border border-cream-200/60">
            <h4 className="font-serif text-base font-semibold text-burgundy-900 mb-1">
              Breathable Fabrics
            </h4>
            <p className="text-xs text-charcoal-700 leading-relaxed">
              Curated pure mulmuls, chanderis, and natural cottons tailored for all-day comfort in tropical weather.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-cream-50/70 border border-cream-200/60">
            <h4 className="font-serif text-base font-semibold text-burgundy-900 mb-1">
              Timeless Aesthetics
            </h4>
            <p className="text-xs text-charcoal-700 leading-relaxed">
              Silhouettes that gracefully balance traditional Indian heritage with contemporary minimalist cuts.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-cream-50/70 border border-cream-200/60">
            <h4 className="font-serif text-base font-semibold text-burgundy-900 mb-1">
              Personalized Boutique Care
            </h4>
            <p className="text-xs text-charcoal-700 leading-relaxed">
              Direct, warm WhatsApp shopping assistance to help you pick the right fit, color, and styling.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
