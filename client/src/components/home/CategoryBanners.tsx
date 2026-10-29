import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface CategoryItem {
  name: string;
  query: string;
  image: string;
  subtitle: string;
}

const categories: CategoryItem[] = [
  {
    name: 'Sarees',
    query: 'Sarees',
    subtitle: 'Pure Mulmul, Chanderi & Festive Drapes',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Kurtas & Sets',
    query: 'Kurtas & Kurta Sets',
    subtitle: 'Everyday Straight-Cuts & 3-Piece Sets',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Ethnic Wear',
    query: 'Ethnic Wear',
    subtitle: 'Graceful Traditional Ensembles',
    image: 'https://images.unsplash.com/photo-1610030469668-93510cb076fb?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Dresses',
    query: 'Dresses',
    subtitle: 'Flared Anarkalis & Modern Silhouettes',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Tops & Tunics',
    query: 'Tops & Tunics',
    subtitle: 'Everyday Comfort & Workwear Chic',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Co-ord Sets',
    query: 'Co-ord Sets',
    subtitle: 'Matching Pants & Collared Sets',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Festive Collection',
    query: 'Festive Collection',
    subtitle: 'Zari Weaves & Celebration Outfits',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'New Arrivals',
    query: 'New Arrivals',
    subtitle: 'Fresh Weekly Boutique Drops',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
  }
];

export const CategoryBanners: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-burgundy-700 block mb-2 font-serif">
            Curated For You
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
            Shop by Category
          </h2>
          <div className="w-12 h-[1px] bg-rose-400 mx-auto mt-4" />
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/shop?category=${encodeURIComponent(cat.query)}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-cream-200 shadow-soft hover:shadow-elevated transition-all duration-500"
            >
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

              {/* Text Information */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col justify-end text-white">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-medium tracking-wide">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-cream-200 font-light opacity-90 line-clamp-1 mt-0.5">
                      {cat.subtitle}
                    </p>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-burgundy-900 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
