import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { WhatsAppIcon } from './WhatsAppIcon';
import { getProductEnquiryWhatsAppUrl } from '../../utils/whatsapp';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 'Free Size');
      setSelectedColor(product.colors[0] || 'Classic');
      setActiveImageIndex(0);
      setQuantity(1);
      setErrorMsg('');
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setErrorMsg('Please select a size');
      return;
    }
    addItem(product, selectedSize, selectedColor, quantity);
    onClose();
  };

  const isFavorited = isInWishlist(product.id);
  const currentImage = product.images[activeImageIndex] || product.images[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-charcoal-700 hover:text-burgundy-700 p-2 rounded-full hover:bg-cream-100 transition z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Gallery Column */}
          <div className="flex flex-col gap-3">
            <div className="aspect-[3/4] w-full rounded-xl overflow-hidden bg-cream-100 shadow-inner">
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition ${
                      activeImageIndex === idx ? 'border-burgundy-700' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover object-top" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Column */}
          <div className="flex flex-col">
            <span className="text-xs font-semibold tracking-widest uppercase text-burgundy-700 mb-1">
              {product.category}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-semibold mb-2">
              {product.name}
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-serif text-2xl sm:text-3xl font-semibold text-burgundy-900">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-sm text-charcoal-700 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-rose-100 text-burgundy-700">
                    {product.discountPercent}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-sm text-charcoal-700 mb-6 line-clamp-3 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-800 mb-2">
                Size: <span className="text-burgundy-800">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setErrorMsg('');
                    }}
                    className={`px-4 py-2 text-xs font-medium rounded-xl border transition ${
                      selectedSize === size
                        ? 'border-burgundy-700 bg-rose-50 text-burgundy-900 font-semibold shadow-sm'
                        : 'border-cream-300 text-charcoal-700 hover:border-charcoal-700 bg-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-800 mb-2">
                  Color: <span className="text-burgundy-800">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 text-xs rounded-lg border transition ${
                        selectedColor === color
                          ? 'border-burgundy-700 bg-cream-100 text-burgundy-900 font-medium'
                          : 'border-cream-300 text-charcoal-700 hover:border-charcoal-700 bg-white'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-800">
                Quantity:
              </span>
              <div className="flex items-center border border-cream-300 rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-charcoal-700 hover:bg-cream-100"
                >
                  -
                </button>
                <span className="px-4 py-1 text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-charcoal-700 hover:bg-cream-100"
                >
                  +
                </button>
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-red-600 mb-3">{errorMsg}</p>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 py-3.5 px-6 rounded-full bg-burgundy-700 hover:bg-burgundy-800 disabled:bg-charcoal-400 text-white font-medium text-sm transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {product.inStock ? 'Add to Bag' : 'Out of Stock'}
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  aria-label="Wishlist toggle"
                  className={`p-3.5 rounded-full border transition ${
                    isFavorited
                      ? 'bg-rose-50 border-rose-300 text-rose-600'
                      : 'border-cream-300 hover:border-rose-400 text-charcoal-700 hover:text-rose-600 bg-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* WhatsApp Enquiry Button */}
              <a
                href={getProductEnquiryWhatsAppUrl(product, selectedSize, selectedColor)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-medium text-sm transition flex items-center justify-center gap-2 shadow-md"
              >
                <WhatsAppIcon size={18} className="fill-current text-white" />
                <span>Enquire via WhatsApp</span>
              </a>

              <Link
                to={`/product/${product.slug}`}
                onClick={onClose}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-charcoal-700 hover:text-burgundy-700 pt-2 transition"
              >
                <span>View Full Product Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
