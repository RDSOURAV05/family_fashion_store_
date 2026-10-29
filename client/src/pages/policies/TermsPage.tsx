import React from 'react';
import { AlertCircle } from 'lucide-react';
import { STORE_PHONE_DISPLAY } from '../../utils/whatsapp';

export const TermsPage: React.FC = () => {
  return (
    <div className="bg-cream-50 min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-cream-200/80 shadow-soft space-y-8">
          
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-serif text-burgundy-700 block mb-1">
              Store Governance
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
              Terms & Conditions
            </h1>
            <p className="text-xs text-charcoal-700 mt-1">Last Updated: October 2026</p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-700" />
            <div>
              <strong>Notice to Store Owner:</strong> These standard terms govern website use and WhatsApp order processing. Store management can update these terms through the administration portal.
            </div>
          </div>

          <div className="space-y-6 text-sm text-charcoal-700 leading-relaxed font-light">
            <section className="space-y-2">
              <h2 className="font-serif text-lg font-semibold text-charcoal-900">1. Acceptance of Terms</h2>
              <p>
                By visiting, browsing, and initiating order inquiries on Chic Store, you agree to these Terms and Conditions. If you disagree with any part of these terms, please contact us for clarification.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-semibold text-charcoal-900">2. WhatsApp Order Submission & Confirmation</h2>
              <p>
                All orders generated through our website are structured as order requests transmitted via WhatsApp. An order is formally confirmed only once our boutique team confirms piece availability, delivery timeframe, and payment completion with you directly.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-semibold text-charcoal-900">3. Garment Colors & Product Photography</h2>
              <p>
                We strive to present garment colors, weaves, and embellishments as authentically as possible. However, due to variations in mobile device screens, monitor calibrations, and natural artisanal dye batches, slight hue variations may occasionally occur.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-semibold text-charcoal-900">4. Pricing & Stock Availability</h2>
              <p>
                Prices are listed in Indian Rupees (₹) and are subject to update. In the rare event an item is sold out before order finalization, our team will notify you promptly and offer suitable boutique alternatives or cancellations.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-semibold text-charcoal-900">5. Contact Information</h2>
              <p>
                For questions regarding terms, orders, or support, please contact Chic Store at <strong>{STORE_PHONE_DISPLAY}</strong>.
              </p>
            </section>
          </div>

        </div>

      </div>
    </div>
  );
};
