import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { WhatsAppButton } from '../common/WhatsAppIcon';
import { getGeneralWhatsAppUrl } from '../../utils/whatsapp';

export const EditorialBanner: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden festive-editorial-banner shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
            {/* Visual Column */}
            <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-auto">
              <img
                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85"
                alt="Festive Heritage Edit at Chic Store"
                className="w-full h-full object-cover object-center filter brightness-[0.92]"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-transparent to-transparent" />
            </div>

            {/* Content Column */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center gap-2 text-gold-400 text-xs uppercase tracking-[0.25em] font-serif font-semibold">
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span>The Festive Heritage Edit</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-white drop-shadow-sm">
                Grace in Every Thread, Royalty in Every Fold.
              </h2>

              <p className="text-sm sm:text-base text-white/90 font-normal leading-relaxed">
                Step into celebration season with our handpicked festive sarees, embellished chanderi sets, and rich silk silhouettes. Tailored to make every festival, pooja, and wedding ceremony unforgettable.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/shop?category=Festive%20Collection"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-cream-50 text-charcoal-900 font-bold text-xs uppercase tracking-wider transition shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                >
                  <span>Explore Festive Edit</span>
                  <ArrowRight className="w-4 h-4 text-burgundy-800" />
                </Link>

                <WhatsAppButton
                  href={getGeneralWhatsAppUrl('Hi Chic Store! I would like to see festive outfits and saree recommendations.')}
                  label="Enquire Festive Outfits"
                  size="md"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
