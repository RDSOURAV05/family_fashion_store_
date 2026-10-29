import React from 'react';
import { AlertCircle } from 'lucide-react';
import { STORE_PHONE_DISPLAY } from '../../utils/whatsapp';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-cream-50 min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-cream-200 shadow-soft space-y-8">
          
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-serif text-burgundy-700 block mb-1">
              Store Governance
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
              Privacy Policy
            </h1>
            <p className="text-xs text-charcoal-700 mt-1">Last Updated: October 2026</p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-700" />
            <div>
              <strong>Notice to Store Owner:</strong> This privacy policy contains standard Indian e-commerce boutique guidelines. Specific details, data retention schedules, or third-party processor declarations can be customized via the Admin Dashboard.
            </div>
          </div>

          <div className="space-y-6 text-sm text-charcoal-700 leading-relaxed font-light">
            <section className="space-y-2">
              <h2 className="font-serif text-lg font-semibold text-charcoal-900">1. Information We Collect</h2>
              <p>
                When you browse our catalogue, communicate with us on WhatsApp, or place an order through our checkout system, we collect personal information necessary to fulfill your request:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Full Name</li>
                <li>WhatsApp phone number and contact details</li>
                <li>Delivery address, city, state, and postal PIN code</li>
                <li>Selected garment sizes, colors, and order notes</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-semibold text-charcoal-900">2. How We Use Your Information</h2>
              <p>
                Chic Store uses customer data strictly for:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Formatting and executing your WhatsApp boutique orders</li>
                <li>Coordinating shipping and dispatch with Indian courier partners</li>
                <li>Answering sizing, availability, and fabric care inquiries</li>
                <li>Improving our boutique catalogue and customer experience</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-semibold text-charcoal-900">3. Data Protection & Non-Sharing</h2>
              <p>
                We value your trust. We do not sell, rent, or trade your personal information to third parties. Customer details are shared only with logistics carriers directly involved in delivering your parcel.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-semibold text-charcoal-900">4. Contacting Us Regarding Your Data</h2>
              <p>
                If you have questions about your personal data or wish to request deletion of your inquiry records, please reach out to Chic Store via WhatsApp or phone at <strong>{STORE_PHONE_DISPLAY}</strong>.
              </p>
            </section>
          </div>

        </div>

      </div>
    </div>
  );
};
