import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import { ProductCard } from '../common/ProductCard';
import { QuickViewModal } from '../common/QuickViewModal';

interface FeaturedSectionProps {
  products: Product[];
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const featured = products.filter(p => p.isFeatured).slice(0, 4);
  const displayList = featured.length > 0 ? featured : products.slice(0, 4);

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-burgundy-700 block mb-2 font-serif">
              Timeless Selections
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
              Featured Boutique Pieces
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-burgundy-800 hover:text-burgundy-950 transition mt-4 sm:mt-0 group"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
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

      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};
