import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2, ArrowLeft, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatters';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { FloatingWhatsApp } from '../components/layout/FloatingWhatsApp';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';

export const CartPage: React.FC = () => {
  const { items, totalItems, subtotal, shipping, total, removeItem, updateQuantity } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-cream-50 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center bg-white p-8 sm:p-12 rounded-3xl border border-cream-200 shadow-soft">
          <div className="w-20 h-20 rounded-full bg-cream-100 flex items-center justify-center mx-auto text-charcoal-700 mb-6">
            <ShoppingBag className="w-10 h-10 opacity-30" />
          </div>
          <h1 className="font-serif text-3xl text-charcoal-900 mb-2">Your Bag is Empty</h1>
          <p className="text-sm text-charcoal-700 mb-8 font-light">
            You haven't added any boutique pieces yet. Explore our curated sarees, kurtas, and dresses.
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
        
        {/* Page Title */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-serif text-burgundy-700 block mb-1">
              Your Selections
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
              Shopping Bag ({totalItems} {totalItems === 1 ? 'item' : 'items'})
            </h1>
          </div>
          <Link
            to="/shop"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-burgundy-800 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Items Table / Cards (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {items.map(item => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-2xl border border-cream-200 shadow-soft"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-32 sm:w-28 sm:h-36 object-cover object-top rounded-xl bg-cream-100 shrink-0 self-start"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-burgundy-700 font-semibold font-serif">
                          {item.category}
                        </span>
                        <Link
                          to={`/product/${item.slug}`}
                          className="font-serif text-lg font-medium text-charcoal-900 hover:text-burgundy-800 line-clamp-1"
                        >
                          {item.name}
                        </Link>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove item"
                        className="text-charcoal-700 hover:text-red-600 p-1 rounded-lg hover:bg-cream-100 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-2 text-xs text-charcoal-700">
                      <span>Size: <strong className="text-charcoal-900">{item.size}</strong></span>
                      <span>Color: <strong className="text-charcoal-900">{item.color}</strong></span>
                      <span>Unit Price: <strong>{formatCurrency(item.price)}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-cream-100">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-cream-300 rounded-lg bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-charcoal-700 hover:bg-cream-100 transition"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-charcoal-700 hover:bg-cream-100 transition"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-charcoal-700 block">Subtotal</span>
                      <span className="font-serif text-lg font-semibold text-burgundy-900">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary (4 cols) */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-soft space-y-6">
            <h3 className="font-serif text-xl font-semibold text-charcoal-900 pb-4 border-b border-cream-200">
              Order Summary
            </h3>

            <div className="space-y-3 text-sm text-charcoal-700">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-medium text-charcoal-900">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping & Handling</span>
                <span className="text-emerald-700 font-medium">Free (Boutique Special)</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-charcoal-900 pt-3 border-t border-cream-200">
                <span className="font-serif">Total Amount</span>
                <span className="font-serif text-xl text-burgundy-900">{formatCurrency(total)}</span>
              </div>
              <p className="text-[11px] text-charcoal-700 font-light pt-1">
                Prices inclusive of applicable taxes. Delivery arranged via WhatsApp.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 px-6 rounded-full bg-burgundy-800 hover:bg-burgundy-900 text-white font-medium text-sm transition shadow-md flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Proceed to WhatsApp Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={getGeneralWhatsAppUrl('Hi Chic Store! I have a question about the items in my cart.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-6 rounded-full border border-cream-300 hover:border-[#25D366] text-charcoal-800 hover:text-[#25D366] text-xs font-semibold transition flex items-center justify-center gap-2 bg-cream-50"
              >
                <WhatsAppIcon size={16} className="fill-current text-[#25D366]" />
                <span>Ask Question on WhatsApp</span>
              </a>
            </div>

            <div className="pt-4 border-t border-cream-200 space-y-2 text-xs text-charcoal-700">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-burgundy-800 shrink-0" />
                <span>Dispatches from boutique across India</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-burgundy-800 shrink-0" />
                <span>Verified boutique quality & fabrics</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      <FloatingWhatsApp />
    </div>
  );
};
