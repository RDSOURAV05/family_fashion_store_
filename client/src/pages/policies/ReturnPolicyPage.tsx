import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { STORE_PHONE_DISPLAY } from '../../utils/whatsapp';

export const ReturnPolicyPage: React.FC = () => {
  return (
    <div className="bg-cream-50 min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-cream-200 shadow-soft space-y-8">
          
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-serif text-burgundy-700 block mb-1">
              Store Governance
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
              Return & Exchange Policy
            </h1>
            <p className="text-xs text-charcoal-700 mt-1">Last Updated: October 2026</p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-700" />
            <div>
              <strong>Notice to Store Owner:</strong> Please review and adapt exchange window periods, condition checks, and reverse logistics terms to reflect your boutique's operational standards.
            </div>
          </div>

          <div className="space-y-6 text-sm text-charcoal-700 leading-relaxed font-light">
            <section className="space-y-2">
              <h2 className="font-serif text-lg font-semibold text-charcoal-900">1. Sizing Exchange Assistance</h2>
              <p>
                We want you to feel confident and graceful in your Chic Store outfit. If an item you received does not fit as expected, we are happy to assist you with a size exchange for the same design, subject to stock availability.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-semibold text-charcoal-900">2. Exchange Window & Notification</h2>
              <p>
                To request an exchange or report any discrepancy, please notify us on WhatsApp at <strong>{STORE_PHONE_DISPLAY}</strong> within 48 hours of parcel delivery. Please share photos of the garment and tags intact.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-semibold text-charcoal-900">3. Garment Condition Criteria</h2>
              <p>
                Items eligible for exchange must meet the following criteria:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Garment must be unused, unwashed, and unworn</li>
                <li>Original boutique tags and labels must remain attached</li>
                <li>Free of any perfume scents, makeup marks, or alterations</li>
                <li>In its original neat folding and protective packaging</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-semibold text-charcoal-900">4. Non-Exchangeable Items</h2>
              <p>
                Customized garments, custom-stitched blouses, and sale items marked as clearance are considered final sale and cannot be exchanged unless received in a damaged condition.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-semibold text-charcoal-900">5. How to Initiate an Exchange</h2>
              <p>
                Simply message us on WhatsApp at <strong>{STORE_PHONE_DISPLAY}</strong> with your order reference number and a brief note about the size replacement you require. Our team will guide you through the return dispatch steps.
              </p>
            </section>
          </div>

        </div>

      </div>
    </div>
  );
};
