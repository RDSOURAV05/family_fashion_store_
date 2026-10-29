import React from 'react';
import { Sparkles } from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { InstagramIcon } from '../common/InstagramIcon';
import { STORE_WHATSAPP_NUMBER, STORE_INSTAGRAM_URL } from '../../utils/whatsapp';

interface AnnouncementBarProps {
  text?: string;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  text = 'Discover Your Everyday Elegance'
}) => {
  return (
    <div className="bg-burgundy-900 text-cream-100 text-xs py-2 px-4 border-b border-burgundy-800 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Quick Social Icons */}
        <div className="hidden sm:flex items-center gap-4 text-cream-200">
          <a
            href={`https://wa.me/${STORE_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat with Chic Store on WhatsApp"
            aria-label="Contact Chic Store on WhatsApp (+91 82816 10328)"
            className="flex items-center gap-1.5 hover:text-white transition"
          >
            <WhatsAppIcon size={14} className="text-[#25D366] fill-current" />
            <span className="text-[11px] font-medium tracking-wide">+91 82816 10328</span>
          </a>
          <span className="text-burgundy-700">|</span>
          <a
            href={STORE_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Follow Chic Store on Instagram"
            aria-label="Follow Chic Store on Instagram"
            className="flex items-center gap-1.5 hover:text-white transition"
          >
            <InstagramIcon size={13} className="text-rose-300 fill-current" />
            <span className="text-[11px] font-medium tracking-wide">@_chicstore.in</span>
          </a>
        </div>

        {/* Center: Configurable Announcement Message */}
        <div className="flex-1 text-center flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-gold-400 shrink-0" />
          <span className="tracking-wider uppercase font-serif text-[11px] sm:text-xs font-medium">
            {text}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-gold-400 shrink-0" />
        </div>

        {/* Right: Boutique Assurance */}
        <div className="hidden md:flex items-center text-[11px] text-cream-300 tracking-wider font-light">
          <span>Premium Indian Ethnic & Contemporary Wear</span>
        </div>
      </div>
    </div>
  );
};
