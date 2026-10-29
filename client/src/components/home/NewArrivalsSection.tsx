import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { ProductCard } from '../common/ProductCard';
import { QuickViewModal } from '../common/QuickViewModal';

interface NewArrivalsSectionProps {
  products: Product[];
}

export const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const arrivals = products.filter(p => p.isNewArrival).slice(0, 4);
  const displayList = arrivals.length > 0 ? arrivals : products.slice(0, 4);

  return (
    <section className="py-16 sm:py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] font-semibold text-burgundy-700 mb-2 font-serif">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Fresh From The Atelier</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
            New Arrivals
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-700 font-light mt-2 max-w-md mx-auto">
            Discover the latest weekly additions crafted in breathable cottons, rich georgettes, and artisanal weaves.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {displayList.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={prod => setSelectedProduct(prod)}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            to="/shop?category=New%20Arrivals"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white border border-burgundy-800 text-burgundy-800 hover:bg-burgundy-800 hover:text-white transition-all duration-300 text-xs font-semibold uppercase tracking-wider shadow-sm hover:shadow"
          >
            <span>Explore All New Arrivals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      <QuickViewModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};
