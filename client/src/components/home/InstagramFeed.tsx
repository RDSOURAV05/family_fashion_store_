import React from 'react';
import { InstagramIcon, InstagramFollowButton } from '../common/InstagramIcon';
import { STORE_INSTAGRAM_URL } from '../../utils/whatsapp';

interface GalleryItem {
  id: string;
  image: string;
  alt: string;
}

const galleryImages: GalleryItem[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    alt: 'Chic Store handcrafted floral saree aesthetic'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80',
    alt: 'Pastel straight-cut kurta set style'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
    alt: 'Festive silk saree with traditional pallu'
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80',
    alt: 'Floral maxi dress and contemporary silhouette'
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    alt: 'Relaxed linen co-ord set styling'
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
    alt: 'Everyday printed cotton kurta outfit'
  }
];

export const InstagramFeed: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-cream-50 border-t border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center justify-center gap-2 p-2 px-4 rounded-full bg-white shadow-sm border border-cream-200 mb-3">
            <InstagramIcon size={18} className="text-[#E1306C] fill-current" />
            <span className="text-xs font-semibold uppercase tracking-widest text-charcoal-800">
              @_chicstore.in
            </span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
            Follow Our Style on Instagram
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-700 font-light mt-2">
            Join our community for daily outfit inspirations, drape tutorials, and new boutique arrivals.
          </p>
        </div>

        {/* Visual Instagram Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-10">
          {galleryImages.map((item) => (
            <a
              key={item.id}
              href={STORE_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${item.alt} on Chic Store Instagram`}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-cream-200 shadow-soft block"
            >
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-charcoal-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white backdrop-blur-[2px]">
                <div className="p-2.5 rounded-full bg-white/20 backdrop-blur-md">
                  <InstagramIcon size={22} className="fill-current text-white" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <InstagramFollowButton label="Follow Chic Store on Instagram" />
        </div>

      </div>
    </section>
  );
};
