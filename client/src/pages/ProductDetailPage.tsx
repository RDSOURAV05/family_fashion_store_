import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, ShieldCheck, Truck, RefreshCw, Ruler, Check, AlertCircle } from 'lucide-react';
import { Product } from '../types';
import { api } from '../utils/api';
import { formatCurrency } from '../utils/formatters';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/common/ProductCard';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { SizeGuideModal } from '../components/common/SizeGuideModal';
import { FloatingWhatsApp } from '../components/layout/FloatingWhatsApp';
import { getProductEnquiryWhatsAppUrl, STORE_PHONE_DISPLAY } from '../utils/whatsapp';

export const ProductDetailPage: React.FC = () => {
  const { idOrSlug } = useParams<{ idOrSlug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setValidationError(null);
    setAddedToast(false);

    if (idOrSlug) {
      api.getProduct(idOrSlug)
        .then(res => {
          setProduct(res.data);
          setRelated(res.related || []);
          if (res.data.sizes && res.data.sizes.length > 0) {
            setSelectedSize(res.data.sizes[0]);
          }
          if (res.data.colors && res.data.colors.length > 0) {
            setSelectedColor(res.data.colors[0]);
          }
          setActiveImageIndex(0);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [idOrSlug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-cream-50">
        <p className="font-serif text-charcoal-700">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-cream-50 px-4 text-center">
        <h2 className="font-serif text-2xl text-charcoal-900 mb-2">Product Not Found</h2>
        <p className="text-sm text-charcoal-700 mb-6">The requested garment could not be found in our current catalog.</p>
        <Link to="/shop" className="px-6 py-2.5 bg-burgundy-800 text-white rounded-full text-xs font-semibold uppercase tracking-wider">
          Back to Shop
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const currentImage = product.images[activeImageIndex] || product.images[0];

  const validateSelections = (): boolean => {
    if (!selectedSize) {
      setValidationError('Please select a size before proceeding.');
      return false;
    }
    if (!selectedColor && product.colors && product.colors.length > 0) {
      setValidationError('Please select a color option.');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleAddToCart = () => {
    if (!validateSelections()) return;
    addItem(product, selectedSize, selectedColor, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const handleBuyNow = () => {
    if (!validateSelections()) return;
    addItem(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  const whatsappUrl = getProductEnquiryWhatsAppUrl(product, selectedSize, selectedColor);

  return (
    <div className="bg-cream-50 py-10 sm:py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-charcoal-700 mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-burgundy-800">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-burgundy-800">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-burgundy-800">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-charcoal-900 font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white p-6 sm:p-10 rounded-3xl border border-cream-200/80 shadow-soft">
          
          {/* Gallery Column (5 cols) */}
          <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4">
            
            {/* Thumbnails list */}
            {product.images.length > 1 && (
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[550px] shrink-0 pb-2 sm:pb-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 transition ${
                      activeImageIndex === idx
                        ? 'border-burgundy-800 shadow-sm'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover object-top" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Active Image with Zoom */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-cream-100 group shadow-inner">
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                {product.isNewArrival && (
                  <span className="px-3 py-1 text-xs font-semibold tracking-wide uppercase rounded-full bg-rose-500 text-white shadow-sm">
                    New Arrival
                  </span>
                )}
                {product.discountPercent && product.discountPercent > 0 && (
                  <span className="px-3 py-1 text-xs font-semibold tracking-wide rounded-full bg-burgundy-800 text-white shadow-sm">
                    {product.discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Wishlist Floating Button */}
              <button
                onClick={() => toggleWishlist(product)}
                aria-label="Toggle Wishlist"
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md shadow-md transition ${
                  isFavorited
                    ? 'bg-rose-500 text-white'
                    : 'bg-white/90 text-charcoal-700 hover:text-rose-500 hover:bg-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

          </div>

          {/* Product Meta Column (7 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Stock */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy-700 font-serif">
                  {product.category}
                </span>

                {product.inStock ? (
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    In Stock ({product.stockCount} left)
                  </span>
                ) : (
                  <span className="text-xs text-red-600 font-medium bg-red-50 px-2.5 py-1 rounded-full">
                    Temporarily Out of Stock
                  </span>
                )}
              </div>

              {/* Product Title */}
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-charcoal-900 font-normal tracking-tight mb-3">
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 pb-6 border-b border-cream-200">
                <span className="font-serif text-3xl font-semibold text-burgundy-900">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-base text-charcoal-700 line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-rose-100 text-burgundy-800">
                      Save {formatCurrency(product.originalPrice - product.price)}
                    </span>
                  </>
                )}
                <span className="text-xs text-charcoal-700 ml-auto font-light">Taxes included</span>
              </div>

              {/* Description */}
              <div className="py-6 border-b border-cream-200 text-sm text-charcoal-700 leading-relaxed space-y-3 font-light">
                <p>{product.description}</p>
                {product.fabricDetails && (
                  <p><strong>Fabric & Weave:</strong> {product.fabricDetails}</p>
                )}
                {product.careInstructions && (
                  <p><strong>Care:</strong> {product.careInstructions}</p>
                )}
              </div>

              {/* Size Selection */}
              <div className="py-5 border-b border-cream-200">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-800">
                    Select Size: <span className="text-burgundy-800 font-bold">{selectedSize}</span>
                  </label>
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs text-burgundy-800 hover:underline font-medium"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>View Size Guide</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setValidationError(null);
                      }}
                      className={`px-5 py-2.5 text-xs font-medium rounded-xl border transition ${
                        selectedSize === size
                          ? 'border-burgundy-800 bg-rose-50 text-burgundy-900 font-semibold shadow-sm ring-1 ring-burgundy-800'
                          : 'border-cream-300 text-charcoal-700 hover:border-charcoal-700 bg-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="py-5 border-b border-cream-200">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-800 mb-3">
                    Select Color: <span className="text-burgundy-800 font-bold">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map(col => (
                      <button
                        key={col}
                        onClick={() => {
                          setSelectedColor(col);
                          setValidationError(null);
                        }}
                        className={`px-4 py-2 text-xs rounded-xl border transition ${
                          selectedColor === col
                            ? 'border-burgundy-800 bg-cream-100 text-burgundy-900 font-semibold shadow-sm'
                            : 'border-cream-300 text-charcoal-700 hover:border-charcoal-700 bg-white'
                        }`}
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="py-5 flex items-center gap-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-800">
                  Quantity:
                </span>
                <div className="flex items-center border border-cream-300 rounded-xl bg-white shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-1.5 text-charcoal-700 hover:bg-cream-100 transition rounded-l-xl"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-sm font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-1.5 text-charcoal-700 hover:bg-cream-100 transition rounded-r-xl"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Validation Error Message */}
              {validationError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Toast for Add To Bag */}
              {addedToast && (
                <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl animate-fadeIn">
                  <Check className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Added to your bag! Open bag to view summary.</span>
                </div>
              )}

              {/* Primary Action Buttons */}
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="w-full py-4 px-6 rounded-full bg-burgundy-800 hover:bg-burgundy-900 disabled:bg-charcoal-300 text-white font-medium text-sm transition shadow-md flex items-center justify-center gap-2 active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Shopping Bag</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    disabled={!product.inStock}
                    className="w-full py-4 px-6 rounded-full bg-charcoal-900 hover:bg-black disabled:bg-charcoal-300 text-white font-medium text-sm transition shadow-md flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>Buy Now & Checkout</span>
                  </button>
                </div>

                {/* WhatsApp Product Enquiry Button (Mandatory Official WhatsApp Logo) */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Enquire about this product on WhatsApp (+91 82816 10328)"
                  className="w-full py-4 px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-medium text-sm transition shadow-md flex items-center justify-center gap-2.5 active:scale-95"
                >
                  <WhatsAppIcon size={20} className="fill-current text-white shrink-0" />
                  <span>Enquire on WhatsApp (+91 82816 10328)</span>
                </a>
              </div>

              {/* Boutique Assurance Cards */}
              <div className="grid grid-cols-3 gap-3 pt-4 text-center">
                <div className="p-3 rounded-xl bg-cream-50 border border-cream-200/60">
                  <Truck className="w-4 h-4 mx-auto text-burgundy-700 mb-1" />
                  <span className="block text-[10px] font-medium text-charcoal-800">Complimentary Shipping</span>
                </div>
                <div className="p-3 rounded-xl bg-cream-50 border border-cream-200/60">
                  <RefreshCw className="w-4 h-4 mx-auto text-burgundy-700 mb-1" />
                  <span className="block text-[10px] font-medium text-charcoal-800">Easy Exchange</span>
                </div>
                <div className="p-3 rounded-xl bg-cream-50 border border-cream-200/60">
                  <ShieldCheck className="w-4 h-4 mx-auto text-burgundy-700 mb-1" />
                  <span className="block text-[10px] font-medium text-charcoal-800">100% Authentic Quality</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Related Products Grid */}
        {related.length > 0 && (
          <div className="mt-16 sm:mt-24">
            <div className="text-center mb-10">
              <span className="text-xs uppercase tracking-[0.25em] font-serif text-burgundy-700 block mb-1">
                Complete Your Look
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal">
                You May Also Admire
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {related.map(item => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        category={product.category}
      />

      <FloatingWhatsApp />
    </div>
  );
};
