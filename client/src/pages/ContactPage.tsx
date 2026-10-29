import React, { useState } from 'react';
import { Phone, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { InstagramIcon } from '../components/common/InstagramIcon';
import { STORE_PHONE_DISPLAY, STORE_WHATSAPP_NUMBER, STORE_INSTAGRAM_URL, STORE_TEL_LINK } from '../utils/whatsapp';
import { api } from '../utils/api';
import { FloatingWhatsApp } from '../components/layout/FloatingWhatsApp';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Saree / Outfit Inquiry',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your name, phone number, and message.');
      return;
    }

    setLoading(true);
    try {
      await api.sendContactMessage(formData);
      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: 'General Saree / Outfit Inquiry',
        message: ''
      });
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.message || 'Unable to submit message at this moment. Please reach out to us directly on WhatsApp.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-cream-50 min-h-screen py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-serif text-burgundy-700 block mb-1">
            We Are Here For You
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
            Contact Chic Store
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-700 mt-2 font-light">
            Have questions regarding saree weaves, sizing fits, custom orders, or shipping? Connect with our boutique team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Official Contact Channels Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct WhatsApp Box */}
            <div className="p-6 rounded-3xl bg-white border border-cream-200 shadow-soft space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md">
                  <WhatsAppIcon size={24} className="fill-current text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-charcoal-900">
                    WhatsApp Boutique Support
                  </h3>
                  <span className="text-xs text-charcoal-700">Instant Chat & Recommendations</span>
                </div>
              </div>

              <p className="text-xs text-charcoal-700 leading-relaxed font-light">
                Message us for quick drape photos, fabric videos, stock checks, or custom WhatsApp order placement.
              </p>

              <a
                href={`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Chic Store! I would like to get in touch with you regarding your collection.')}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Chic Store on WhatsApp (+91 82816 10328)"
                className="w-full py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-medium text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm"
              >
                <WhatsAppIcon size={18} className="fill-current text-white" />
                <span>Chat on WhatsApp (+91 82816 10328)</span>
              </a>
            </div>

            {/* Direct Phone Call Box */}
            <div className="p-6 rounded-3xl bg-white border border-cream-200 shadow-soft space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-burgundy-800 text-white flex items-center justify-center shadow-md">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-charcoal-900">
                    Direct Phone Call
                  </h3>
                  <span className="text-xs text-charcoal-700">{STORE_PHONE_DISPLAY}</span>
                </div>
              </div>

              <p className="text-xs text-charcoal-700 leading-relaxed font-light">
                Prefer speaking directly with our customer advisor? Feel free to call us during store hours.
              </p>

              <a
                href={STORE_TEL_LINK}
                aria-label={`Call Chic Store at ${STORE_PHONE_DISPLAY}`}
                className="w-full py-3.5 px-6 rounded-full bg-charcoal-900 hover:bg-black text-white font-medium text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now: {STORE_PHONE_DISPLAY}</span>
              </a>
            </div>

            {/* Official Instagram Profile Box */}
            <div className="p-6 rounded-3xl bg-white border border-cream-200 shadow-soft space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white flex items-center justify-center shadow-md">
                  <InstagramIcon size={24} className="fill-current text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-charcoal-900">
                    Instagram Community
                  </h3>
                  <span className="text-xs text-charcoal-700">@_chicstore.in</span>
                </div>
              </div>

              <p className="text-xs text-charcoal-700 leading-relaxed font-light">
                Follow our official page for styling reels, client customer photos, and daily stories.
              </p>

              <a
                href={STORE_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Chic Store Instagram Profile"
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-medium text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm hover:opacity-95"
              >
                <InstagramIcon size={18} className="fill-current text-white" />
                <span>Visit Instagram Profile</span>
              </a>
            </div>

          </div>

          {/* Contact Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-cream-200 shadow-soft">
            <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-900 mb-2">
              Send an Inquiry
            </h2>
            <p className="text-xs text-charcoal-700 mb-6 font-light">
              Submit your inquiry and our team will get back to you via phone or WhatsApp.
            </p>

            {submitted && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm space-y-2 mb-6">
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Inquiry Received Successfully!</span>
                </div>
                <p>
                  Thank you for reaching out to Chic Store. Our team will contact you at your provided phone number or via WhatsApp shortly.
                </p>
              </div>
            )}

            {errorMessage && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2 mb-6">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-800 mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full py-2.5 px-4 rounded-xl border border-cream-300 text-sm text-charcoal-900 bg-white focus:outline-none focus:border-burgundy-700 focus:ring-1 focus:ring-burgundy-700 transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-800 mb-1.5">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 9876543210"
                    className="w-full py-2.5 px-4 rounded-xl border border-cream-300 text-sm text-charcoal-900 bg-white focus:outline-none focus:border-burgundy-700 focus:ring-1 focus:ring-burgundy-700 transition"
                  />
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
                    className="w-full py-2.5 px-4 rounded-xl border border-cream-300 text-sm text-charcoal-900 bg-white focus:outline-none focus:border-burgundy-700 focus:ring-1 focus:ring-burgundy-700 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-800 mb-1.5">
                  Subject *
                </label>
                <select
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full py-2.5 px-4 rounded-xl border border-cream-300 text-sm text-charcoal-900 bg-white focus:outline-none focus:border-burgundy-700 focus:ring-1 focus:ring-burgundy-700 transition"
                >
                  <option value="General Saree / Outfit Inquiry">General Saree / Outfit Inquiry</option>
                  <option value="Sizing & Fit Advice">Sizing & Fit Advice</option>
                  <option value="Custom Order / Bulk Festive Orders">Custom Order / Bulk Festive Orders</option>
                  <option value="Existing Order Status">Existing Order Status</option>
                  <option value="Other Questions">Other Questions</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-800 mb-1.5">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How may we assist you today? Feel free to ask about fabric textures, delivery timelines, etc."
                  className="w-full py-2.5 px-4 rounded-xl border border-cream-300 text-sm text-charcoal-900 bg-white focus:outline-none focus:border-burgundy-700 focus:ring-1 focus:ring-burgundy-700 transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-full bg-burgundy-800 hover:bg-burgundy-900 disabled:opacity-75 text-white font-medium text-sm transition shadow-md flex items-center justify-center gap-2 active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Submitting Message...' : 'Send Message to Chic Store'}</span>
              </button>
            </form>
          </div>

        </div>

      </div>

      <FloatingWhatsApp />
    </div>
  );
};
