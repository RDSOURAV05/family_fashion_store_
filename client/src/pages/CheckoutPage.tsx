import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, CheckCircle2, AlertCircle, CreditCard, ExternalLink } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CustomerDetails } from '../types';
import { formatCurrency } from '../utils/formatters';
import { api } from '../utils/api';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { getCartOrderWhatsAppUrl, STORE_PHONE_DISPLAY } from '../utils/whatsapp';

export const CheckoutPage: React.FC = () => {
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    email: '',
    deliveryAddress: '',
    city: '',
    state: '',
    pinCode: '',
    orderNotes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [orderPrepared, setOrderPrepared] = useState<{ orderNumber: string; waUrl: string } | null>(null);

  if (items.length === 0 && !orderPrepared) {
    return (
      <div className="min-h-[60vh] bg-cream-50 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md bg-white p-8 rounded-3xl border border-cream-200">
          <ShoppingBag className="w-12 h-12 mx-auto text-charcoal-700 opacity-40 mb-4" />
          <h2 className="font-serif text-2xl text-charcoal-900 mb-2">No Items to Checkout</h2>
          <p className="text-sm text-charcoal-700 mb-6">Please add some pieces to your bag before proceeding to checkout.</p>
          <Link to="/shop" className="px-6 py-2.5 bg-burgundy-800 text-white rounded-full text-xs font-semibold uppercase tracking-wider">
            Shop Catalog
          </Link>
        </div>
      </div>
    );
  }

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    
    // Indian 10-digit mobile number validation
    const cleanPhone = formData.phone.replace(/[\s\-\+\(\)]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.deliveryAddress.trim()) errs.deliveryAddress = 'Delivery address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.state.trim()) errs.state = 'State is required';

    // 6-digit PIN code validation
    const cleanPin = formData.pinCode.replace(/\s/g, '');
    if (!cleanPin || !/^\d{6}$/.test(cleanPin)) {
      errs.pinCode = 'Please enter a valid 6-digit Indian PIN code';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleWhatsAppOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    setSubmitting(true);
    try {
      // Record order in backend database
      const orderRecord = await api.createOrder({
        customer: formData,
        items: items.map(i => ({
          productId: i.productId,
          name: i.name,
          image: i.image,
          size: i.size,
          color: i.color,
          quantity: i.quantity,
          price: i.price,
          lineTotal: i.price * i.quantity
        })),
        subtotal,
        shipping,
        total
      });

      const waUrl = getCartOrderWhatsAppUrl(
        items,
        formData,
        subtotal,
        shipping,
        total,
        orderRecord.orderNumber
      );

      setOrderPrepared({
        orderNumber: orderRecord.orderNumber,
        waUrl
      });

      // Clear the local cart items
      clearCart();

      // Open WhatsApp in a new tab
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error(err);
      // Fallback: still generate WhatsApp url directly
      const waUrl = getCartOrderWhatsAppUrl(items, formData, subtotal, shipping, total);
      setOrderPrepared({
        orderNumber: `CHIC-${Date.now().toString().slice(-6)}`,
        waUrl
      });
      clearCart();
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-cream-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation back */}
        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-xs font-semibold text-burgundy-800 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Shopping Bag</span>
          </Link>
        </div>

        {/* Order Prepared Success Modal/Section */}
        {orderPrepared ? (
          <div className="max-w-2xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-cream-200 shadow-soft text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#25D366] flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-burgundy-700 font-semibold font-serif">
                Order Request Prepared
              </span>
              <h2 className="font-serif text-3xl text-charcoal-900 mt-1">
                Order Ref: {orderPrepared.orderNumber}
              </h2>
            </div>

            <div className="p-4 rounded-2xl bg-cream-50 text-xs sm:text-sm text-charcoal-700 space-y-2 text-left border border-cream-200">
              <p className="font-semibold text-charcoal-900">Next Step: Send Message in WhatsApp</p>
              <p>
                We have formatted your order summary and delivery address. Your WhatsApp should have opened in a new window. Please click <strong>"Send"</strong> in WhatsApp to deliver your order to our boutique team.
              </p>
              <p className="text-charcoal-700 italic text-xs">
                (Note: Your order is confirmed once reviewed and confirmed by our boutique on WhatsApp.)
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={orderPrepared.waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-medium text-sm transition shadow-md active:scale-95"
              >
                <WhatsAppIcon size={20} className="fill-current text-white" />
                <span>Re-open WhatsApp Message</span>
              </a>

              <button
                onClick={() => navigate('/shop')}
                className="px-6 py-4 rounded-full bg-cream-100 text-charcoal-800 text-xs font-semibold uppercase tracking-wider hover:bg-cream-200 transition"
              >
                Return to Shop
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Customer Details Form (7 cols) */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-cream-200/80 shadow-soft">
              
              <div className="pb-6 border-b border-cream-200 mb-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-burgundy-700 font-serif">
                  Step 1 of 2
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-900 mt-1">
                  Delivery Information
                </h2>
                <p className="text-xs text-charcoal-700 mt-1">
                  Please enter your accurate delivery details for WhatsApp order dispatch.
                </p>
              </div>

              <form onSubmit={handleWhatsAppOrder} className="space-y-4">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-800 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Priya Sharma"
                    className={`w-full py-3 px-4 rounded-xl border text-base sm:text-sm text-charcoal-900 bg-cream-50/50 focus:outline-none focus:ring-1 transition ${
                      errors.fullName ? 'border-red-400 focus:ring-red-400' : 'border-cream-300 focus:border-burgundy-700 focus:ring-burgundy-700'
                    }`}
                  />
                  {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-800 mb-1.5">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className={`w-full py-3 px-4 rounded-xl border text-base sm:text-sm text-charcoal-900 bg-cream-50/50 focus:outline-none focus:ring-1 transition ${
                        errors.phone ? 'border-red-400 focus:ring-red-400' : 'border-cream-300 focus:border-burgundy-700 focus:ring-burgundy-700'
                      }`}
                    />
                    {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-800 mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full py-3 px-4 rounded-xl border border-cream-300 text-base sm:text-sm text-charcoal-900 bg-cream-50/50 focus:outline-none focus:border-burgundy-700 focus:ring-1 focus:ring-burgundy-700 transition"
                    />
                  </div>
                </div>

                {/* Street Address */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-800 mb-1.5">
                    Delivery Address (House No, Street, Landmark) *
                  </label>
                  <textarea
                    rows={3}
                    value={formData.deliveryAddress}
                    onChange={e => setFormData({ ...formData, deliveryAddress: e.target.value })}
                    placeholder="Flat / House No., Apartment, Street name, Nearby Landmark..."
                    className={`w-full py-3 px-4 rounded-xl border text-base sm:text-sm text-charcoal-900 bg-cream-50/50 focus:outline-none focus:ring-1 transition ${
                      errors.deliveryAddress ? 'border-red-400 focus:ring-red-400' : 'border-cream-300 focus:border-burgundy-700 focus:ring-burgundy-700'
                    }`}
                  />
                  {errors.deliveryAddress && <p className="text-xs text-red-600 mt-1">{errors.deliveryAddress}</p>}
                </div>

                {/* City, State, PIN */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-800 mb-1.5">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Kochi"
                      className={`w-full py-3 px-4 rounded-xl border text-base sm:text-sm text-charcoal-900 bg-cream-50/50 focus:outline-none focus:ring-1 transition ${
                        errors.city ? 'border-red-400 focus:ring-red-400' : 'border-cream-300 focus:border-burgundy-700 focus:ring-burgundy-700'
                      }`}
                    />
                    {errors.city && <p className="text-xs text-red-600 mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-800 mb-1.5">
                      State *
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={e => setFormData({ ...formData, state: e.target.value })}
                      placeholder="e.g. Kerala"
                      className={`w-full py-3 px-4 rounded-xl border text-base sm:text-sm text-charcoal-900 bg-cream-50/50 focus:outline-none focus:ring-1 transition ${
                        errors.state ? 'border-red-400 focus:ring-red-400' : 'border-cream-300 focus:border-burgundy-700 focus:ring-burgundy-700'
                      }`}
                    />
                    {errors.state && <p className="text-xs text-red-600 mt-1">{errors.state}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-800 mb-1.5">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={formData.pinCode}
                      onChange={e => setFormData({ ...formData, pinCode: e.target.value })}
                      placeholder="e.g. 682001"
                      className={`w-full py-3 px-4 rounded-xl border text-base sm:text-sm text-charcoal-900 bg-cream-50/50 focus:outline-none focus:ring-1 transition ${
                        errors.pinCode ? 'border-red-400 focus:ring-red-400' : 'border-cream-300 focus:border-burgundy-700 focus:ring-burgundy-700'
                      }`}
                    />
                    {errors.pinCode && <p className="text-xs text-red-600 mt-1">{errors.pinCode}</p>}
                  </div>
                </div>

                {/* Optional Order Notes */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-800 mb-1.5">
                    Order Notes / Special Requests (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.orderNotes}
                    onChange={e => setFormData({ ...formData, orderNotes: e.target.value })}
                    placeholder="e.g. Please deliver after 5 PM / Gift packaging requested"
                    className="w-full py-2.5 px-4 rounded-xl border border-cream-300 text-sm text-charcoal-900 bg-cream-50/50 focus:outline-none focus:border-burgundy-700 transition"
                  />
                </div>

                {/* Primary WhatsApp Order Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-medium text-base transition shadow-lg flex items-center justify-center gap-3 active:scale-95 disabled:opacity-75"
                  >
                    <WhatsAppIcon size={24} className="fill-current text-white shrink-0" />
                    <span>{submitting ? 'Preparing WhatsApp Order...' : 'Order via WhatsApp (+91 82816 10328)'}</span>
                  </button>
                  <p className="text-[11px] text-charcoal-700 text-center mt-2 font-light">
                    Clicking generates a formatted WhatsApp order summary for your manual review and submission.
                  </p>
                </div>

              </form>

              {/* Online Payment Gateway Readiness Notice */}
              <div className="mt-8 pt-6 border-t border-cream-200">
                <div className="p-4 rounded-2xl bg-cream-100/70 border border-cream-200/80 flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-burgundy-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-charcoal-700 space-y-1">
                    <p className="font-semibold text-charcoal-900">
                      Online Payment Gateway (Razorpay / UPI Integration)
                    </p>
                    <p>
                      The system architecture is prepared for direct online card and UPI checkout. Currently, all orders are processed via <strong>WhatsApp ordering</strong> for personal boutique verification. To enable automated online payments in production, configure the Razorpay API credentials in environment settings.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Order Items Review (5 cols) */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-cream-200/80 shadow-soft space-y-6">
              
              <h3 className="font-serif text-xl font-semibold text-charcoal-900 pb-4 border-b border-cream-200">
                Order Review ({items.length} {items.length === 1 ? 'item' : 'items'})
              </h3>

              {/* Items scroll */}
              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3 py-2 border-b border-cream-100 last:border-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 object-cover object-top rounded-lg bg-cream-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm font-medium text-charcoal-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-charcoal-700 mt-0.5">
                        Size: <strong>{item.size}</strong> | Color: <strong>{item.color}</strong>
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-charcoal-700">Qty: {item.quantity}</span>
                        <span className="font-serif text-sm font-semibold text-burgundy-900">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Financial Totals */}
              <div className="space-y-2 pt-4 border-t border-cream-200 text-sm text-charcoal-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-charcoal-900">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-emerald-700 font-medium">Free Boutique Delivery</span>
                </div>
                <div className="flex justify-between text-base font-semibold text-charcoal-900 pt-3 border-t border-cream-200">
                  <span className="font-serif">Total Payable</span>
                  <span className="font-serif text-2xl text-burgundy-900">{formatCurrency(total)}</span>
                </div>
              </div>

              <div className="p-3 bg-cream-50 rounded-xl border border-cream-200/80 text-[11px] text-charcoal-700">
                <span className="font-semibold text-burgundy-900">WhatsApp Boutique Support: </span>
                Our boutique team ({STORE_PHONE_DISPLAY}) will review your delivery pin-code and confirm dispatch details directly on WhatsApp.
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
