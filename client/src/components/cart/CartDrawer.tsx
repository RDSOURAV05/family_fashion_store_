import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { getGeneralWhatsAppUrl } from '../../utils/whatsapp';

export const CartDrawer: React.FC = () => {
  const { items, totalItems, subtotal, total, isDrawerOpen, setIsDrawerOpen, removeItem, updateQuantity } = useCart();
  const navigate = useNavigate();

  if (!isDrawerOpen) return null;

  const handleCheckoutClick = () => {
    setIsDrawerOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsDrawerOpen(false)}
        className="absolute inset-0 bg-charcoal-900/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-cream-200 flex items-center justify-between bg-cream-50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-rose-100 rounded-full text-burgundy-800">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-charcoal-900">Shopping Bag</h3>
                <span className="text-xs text-charcoal-700">{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
              </div>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              aria-label="Close cart"
              className="p-2 text-charcoal-700 hover:text-burgundy-700 rounded-full hover:bg-cream-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center text-charcoal-700 mb-4">
                  <ShoppingBag className="w-8 h-8 opacity-40" />
                </div>
                <h4 className="font-serif text-xl font-medium text-charcoal-900 mb-1">Your bag is empty</h4>
                <p className="text-xs text-charcoal-700 max-w-xs mb-6">
                  Explore our curated sarees, kurtas, and dresses to add timeless elegance to your wardrobe.
                </p>
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigate('/shop');
                  }}
                  className="px-6 py-2.5 bg-burgundy-700 text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-burgundy-800 transition"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map(item => (
                <div key={item.id} className="flex gap-4 p-3 rounded-xl border border-cream-200/80 bg-cream-50/40">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover object-top rounded-lg bg-cream-100 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <Link
                          to={`/product/${item.slug}`}
                          onClick={() => setIsDrawerOpen(false)}
                          className="font-serif text-sm font-medium text-charcoal-900 hover:text-burgundy-800 line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          aria-label="Remove item"
                          className="text-charcoal-700 hover:text-red-500 transition p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-charcoal-700 mt-0.5 space-x-2">
                        <span>Size: <strong className="text-charcoal-800">{item.size}</strong></span>
                        <span>•</span>
                        <span>Color: <strong className="text-charcoal-800">{item.color}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-cream-300 rounded-lg bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-charcoal-700 hover:bg-cream-100"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-charcoal-700 hover:bg-cream-100"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-serif text-sm font-semibold text-burgundy-900">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout CTAs */}
          {items.length > 0 && (
            <div className="p-5 border-t border-cream-200 bg-cream-50/60 space-y-3">
              <div className="space-y-1.5 text-xs text-charcoal-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-charcoal-900">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Boutique Delivery</span>
                  <span className="text-emerald-700 font-medium">Complimentary (Free)</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-charcoal-900 pt-2 border-t border-cream-200">
                  <span className="font-serif">Total</span>
                  <span className="font-serif text-base text-burgundy-900">{formatCurrency(total)}</span>
                </div>
              </div>

              {/* Proceed to Full Checkout Form */}
              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 px-4 rounded-full bg-burgundy-700 hover:bg-burgundy-800 text-white font-medium text-sm transition shadow-md flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Proceed to WhatsApp Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* View full bag page link */}
              <div className="flex justify-between items-center pt-1 text-xs">
                <Link
                  to="/cart"
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-burgundy-800 hover:underline font-medium"
                >
                  View Full Cart & Summary
                </Link>
                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#25D366] hover:underline font-medium"
                >
                  <WhatsAppIcon size={14} className="fill-current" />
                  <span>Ask a Question</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
