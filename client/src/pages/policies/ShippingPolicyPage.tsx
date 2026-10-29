import React from 'react';
import { AlertCircle, Truck } from 'lucide-react';
import { STORE_PHONE_DISPLAY } from '../../utils/whatsapp';

export const ShippingPolicyPage: React.FC = () => {
  return (
    <div className="bg-cream-50 min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-cream-200 shadow-soft space-y-8">
          
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-serif text-burgundy-700 block mb-1">
              Store Governance
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
              Shipping & Delivery Policy
            </h1>
            <p className="text-xs text-charcoal-700 mt-1">Last Updated: October 2026</p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-700" />
            <div>
              <strong>Notice to Store Owner:</strong> Please review and finalize delivery timeframes and courier partner specifics according to your boutique's operational setup.
            </div>
          </div>

          <div className="space-y-6 text-sm text-charcoal-700 leading-relaxed font-light">
            <section className="space-y-2">
              <h2 className="font-serif text-lg font-semibold text-charcoal-900">1. Delivery Coverage</h2>
              <p>
                Chic Store dispatches orders across India to serviceable PIN codes. Orders are packaged carefully in protective boutique packaging to ensure your sarees, kurtas, and garments arrive in pristine condition.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-semibold text-charcoal-900">2. Processing & Dispatch Timeline</h2>
              <p>
                In-stock items are typically prepared and dispatched within 2 to 4 business days of order confirmation on WhatsApp. Customized outfits, blouse stitching, or festive pre-orders may require additional tailoring time, which will be communicated prior to finalization.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-semibold text-charcoal-900">3. Shipping Charges</h2>
              <p>
                We offer complimentary standard boutique shipping on website orders. Any express courier requests or special regional logistics charges will be clearly communicated during WhatsApp order review.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-semibold text-charcoal-900">4. Tracking & Delivery Updates</h2>
              <p>
                Once your parcel is handed over to our courier partner, we will share the tracking number and consignment link directly with you on WhatsApp.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-semibold text-charcoal-900">5. Delivery Queries</h2>
              <p>
                For questions regarding dispatch status or address updates, contact us directly on WhatsApp or phone at <strong>{STORE_PHONE_DISPLAY}</strong>.
              </p>
            </section>
          </div>

        </div>

      </div>
    </div>
  );
};
