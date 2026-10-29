import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatters';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { getProductEnquiryWhatsAppUrl } from '../utils/whatsapp';
import { FloatingWhatsApp } from '../components/layout/FloatingWhatsApp';

export const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  const handleMoveToCart = (product: any) => {
    const size = selectedSizes[product.id] || product.sizes[0] || 'Free Size';
    const color = product.colors[0] || 'Classic';
    addItem(product, size, color, 1);
    removeFromWishlist(product.id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] bg-cream-50 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center bg-white p-8 sm:p-12 rounded-3xl border border-cream-200 shadow-soft">
          <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center mx-auto text-rose-500 mb-6">
            <Heart className="w-10 h-10 fill-current opacity-40" />
          </div>
          <h1 className="font-serif text-3xl text-charcoal-900 mb-2">Your Wishlist is Empty</h1>
          <p className="text-sm text-charcoal-700 mb-8 font-light">
            Save your favorite sarees, kurtas, and dresses here to purchase or enquire via WhatsApp anytime.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-burgundy-800 text-white rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-burgundy-900 transition shadow-md"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-serif text-burgundy-700 block mb-1">
            Curated Favorites
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
            My Wishlist ({wishlist.length})
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-700 mt-2 font-light">
            Items saved to your personal collection. Move to bag or enquire on WhatsApp.
          </p>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map(product => {
            const currentSize = selectedSizes[product.id] || product.sizes[0] || 'Free Size';

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden border border-cream-200 shadow-soft flex flex-col justify-between group"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] bg-cream-100 overflow-hidden">
                  <Link to={`/product/${product.slug}`}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    aria-label="Remove from wishlist"
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-charcoal-700 hover:text-red-600 transition shadow-sm backdrop-blur-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <span className="absolute bottom-3 left-3 px-2.5 py-1 text-[11px] font-semibold rounded-full bg-white/90 text-burgundy-800 backdrop-blur-sm">
                    {formatCurrency(product.price)}
                  </span>
                </div>

                {/* Details & Actions */}
                <div className="p-4 flex flex-col flex-grow justify-between space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-burgundy-700 tracking-wider">
                      {product.category}
                    </span>
                    <Link
                      to={`/product/${product.slug}`}
                      className="font-serif text-base font-medium text-charcoal-900 hover:text-burgundy-800 line-clamp-1 block mt-0.5"
                    >
                      {product.name}
                    </Link>

                    {/* Sizing dropdown if multiple */}
                    {product.sizes.length > 1 && (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs text-charcoal-700">Size:</span>
                        <select
                          value={currentSize}
                          onChange={e => setSelectedSizes({ ...selectedSizes, [product.id]: e.target.value })}
                          className="py-1 px-2 text-xs border border-cream-300 rounded-lg bg-cream-50"
                        >
                          {product.sizes.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 pt-2 border-t border-cream-100">
                    <button
                      onClick={() => handleMoveToCart(product)}
                      className="w-full py-2.5 px-4 rounded-xl bg-burgundy-800 hover:bg-burgundy-900 text-white font-medium text-xs transition flex items-center justify-center gap-2 shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>

                    <a
                      href={getProductEnquiryWhatsAppUrl(product, currentSize)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-4 rounded-xl border border-cream-300 hover:border-[#25D366] text-charcoal-700 hover:text-[#25D366] text-xs font-semibold transition flex items-center justify-center gap-1.5"
                    >
                      <WhatsAppIcon size={14} className="fill-current text-[#25D366]" />
                      <span>Enquire on WhatsApp</span>
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      <FloatingWhatsApp />
    </div>
  );
};
