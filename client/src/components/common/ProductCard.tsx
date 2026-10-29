import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { WhatsAppIcon } from './WhatsAppIcon';
import { getProductEnquiryWhatsAppUrl } from '../../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Free Size');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || 'Classic');
  const [isHovered, setIsHovered] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const primaryImage = product.images[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';
  const secondaryImage = product.images[1] || primaryImage;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, selectedSize, selectedColor, 1);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  return (
    <div 
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-cream-200/80 shadow-soft hover:shadow-elevated transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full bg-cream-100 overflow-hidden">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={isHovered ? secondaryImage : primaryImage}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isNewArrival && (
            <span className="px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase rounded-full bg-rose-500 text-white shadow-sm">
              New Arrival
            </span>
          )}
          {product.discountPercent && product.discountPercent > 0 && (
            <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-full bg-burgundy-700 text-white shadow-sm">
              {product.discountPercent}% OFF
            </span>
          )}
          {!product.inStock && (
            <span className="px-2.5 py-1 text-[11px] font-medium tracking-wide rounded-full bg-charcoal-800 text-white shadow-sm">
              Sold Out
            </span>
          )}
        </div>

        {/* Action Buttons Overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={handleWishlistToggle}
            aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`p-2.5 rounded-full transition-all duration-300 backdrop-blur-md shadow-md ${
              isFavorited
                ? 'bg-rose-500 text-white'
                : 'bg-white/80 text-charcoal-700 hover:text-rose-500 hover:bg-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>

          {onQuickView && (
            <button
              onClick={handleQuickViewClick}
              aria-label="Quick preview"
              className="p-2.5 rounded-full bg-white/80 text-charcoal-700 hover:text-burgundy-700 hover:bg-white transition-all duration-300 backdrop-blur-md shadow-md opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}

          {/* Quick WhatsApp enquiry */}
          <a
            href={getProductEnquiryWhatsAppUrl(product, selectedSize, selectedColor)}
            target="_blank"
            rel="noopener noreferrer"
            title="Enquire on WhatsApp"
            aria-label="Enquire on WhatsApp for this product"
            className="p-2.5 rounded-full bg-white/80 text-whatsapp hover:bg-[#25D366] hover:text-white transition-all duration-300 backdrop-blur-md shadow-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
          >
            <WhatsAppIcon size={16} className="fill-current" />
          </a>
        </div>

        {/* Quick Add To Cart Button On Image Hover */}
        {product.inStock && (
          <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hidden sm:block z-10">
            <button
              onClick={handleAddToCart}
              className="w-full py-2.5 px-4 bg-white/95 hover:bg-burgundy-700 text-charcoal-900 hover:text-white rounded-xl text-xs font-semibold uppercase tracking-wider backdrop-blur-sm shadow-md transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Quick Add
            </button>
          </div>
        )}
      </div>

      {/* Details Container */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <span className="text-[11px] font-medium uppercase tracking-wider text-charcoal-700/80 mb-1 block">
            {product.category}
          </span>
          <Link
            to={`/product/${product.slug}`}
            className="font-serif text-base font-medium text-charcoal-900 hover:text-burgundy-700 line-clamp-1 transition-colors"
          >
            {product.name}
          </Link>

          {/* Sizes preview */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2 overflow-x-auto py-0.5">
              {product.sizes.slice(0, 5).map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`text-[10px] px-1.5 py-0.5 rounded border transition ${
                    selectedSize === size
                      ? 'border-burgundy-700 bg-rose-50 text-burgundy-800 font-semibold'
                      : 'border-cream-300 text-charcoal-700 hover:border-charcoal-700'
                  }`}
                >
                  {size}
                </button>
              ))}
              {product.sizes.length > 5 && (
                <span className="text-[10px] text-charcoal-700">+{product.sizes.length - 5}</span>
              )}
            </div>
          )}
        </div>

        {/* Price & Mobile Add */}
        <div className="mt-3 pt-3 border-t border-cream-200/60 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg font-semibold text-burgundy-900">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-charcoal-700 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Mobile direct add button */}
          <button
            onClick={handleAddToCart}
            aria-label="Add to cart"
            className="sm:hidden p-2 rounded-lg bg-burgundy-700 text-white hover:bg-burgundy-800 transition active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
