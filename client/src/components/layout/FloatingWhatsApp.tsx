import React, { useState } from 'react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { getGeneralWhatsAppUrl, STORE_PHONE_DISPLAY } from '../../utils/whatsapp';

export const FloatingWhatsApp: React.FC<{ bottomOffset?: string }> = ({
  bottomOffset = 'bottom-6 sm:bottom-6'
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className={`fixed right-4 sm:right-6 z-40 flex items-center ${bottomOffset}`}>
      {/* Tooltip */}
      {showTooltip && (
        <div className="mr-3 py-1.5 px-3 rounded-lg bg-charcoal-900 text-white text-xs font-medium shadow-lg hidden sm:block whitespace-nowrap animate-fadeIn">
          Chat with Chic Store ({STORE_PHONE_DISPLAY})
        </div>
      )}

      {/* Floating Button */}
      <a
        href={getGeneralWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Contact Chic Store on WhatsApp (+91 82816 10328)"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 whatsapp-pulse-btn"
      >
        <WhatsAppIcon size={30} className="fill-current text-white" />
      </a>
    </div>
  );
};
