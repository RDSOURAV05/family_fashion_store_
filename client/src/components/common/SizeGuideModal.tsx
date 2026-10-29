import React from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, category }) => {
  if (!isOpen) return null;

  const isSaree = category?.toLowerCase().includes('saree');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close size guide"
          className="absolute top-5 right-5 text-charcoal-800 hover:text-burgundy-700 transition p-1 rounded-full hover:bg-cream-100"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-6 border-b border-cream-200 pb-4">
          <div className="p-2.5 rounded-full bg-rose-100 text-burgundy-700">
            <Ruler className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-2xl text-charcoal-900 font-semibold">Chic Store Size Guide</h3>
            <p className="text-sm text-charcoal-700">Indian boutique standard body measurements (in inches)</p>
          </div>
        </div>

        {isSaree ? (
          <div className="space-y-4 text-sm text-charcoal-800">
            <div className="p-4 rounded-xl bg-cream-100 border border-cream-200">
              <h4 className="font-serif text-base font-semibold text-burgundy-800 mb-2">Saree Dimensions</h4>
              <ul className="space-y-2 list-disc list-inside text-charcoal-700">
                <li><strong>Saree Length:</strong> 5.5 meters standard drape length</li>
                <li><strong>Blouse Piece:</strong> 0.8 meters unstitched running fabric included</li>
                <li><strong>Width:</strong> 44 to 45 inches</li>
              </ul>
            </div>
            <p className="text-xs text-charcoal-700 italic">
              Note: Chic Store sarees are Free Size and adapt gracefully to all body types.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-cream-100 border-b border-cream-300 text-burgundy-800 font-serif">
                    <th className="py-3 px-4 font-semibold">Size</th>
                    <th className="py-3 px-4 font-semibold">Bust</th>
                    <th className="py-3 px-4 font-semibold">Waist</th>
                    <th className="py-3 px-4 font-semibold">Hip</th>
                    <th className="py-3 px-4 font-semibold">Shoulder</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-200">
                  <tr className="hover:bg-cream-50">
                    <td className="py-3 px-4 font-medium text-burgundy-900">XS</td>
                    <td className="py-3 px-4">32" - 33"</td>
                    <td className="py-3 px-4">26" - 27"</td>
                    <td className="py-3 px-4">35" - 36"</td>
                    <td className="py-3 px-4">13.5"</td>
                  </tr>
                  <tr className="hover:bg-cream-50">
                    <td className="py-3 px-4 font-medium text-burgundy-900">S</td>
                    <td className="py-3 px-4">34" - 35"</td>
                    <td className="py-3 px-4">28" - 29"</td>
                    <td className="py-3 px-4">37" - 38"</td>
                    <td className="py-3 px-4">14"</td>
                  </tr>
                  <tr className="hover:bg-cream-50">
                    <td className="py-3 px-4 font-medium text-burgundy-900">M</td>
                    <td className="py-3 px-4">36" - 37"</td>
                    <td className="py-3 px-4">30" - 31"</td>
                    <td className="py-3 px-4">39" - 40"</td>
                    <td className="py-3 px-4">14.5"</td>
                  </tr>
                  <tr className="hover:bg-cream-50">
                    <td className="py-3 px-4 font-medium text-burgundy-900">L</td>
                    <td className="py-3 px-4">38" - 39"</td>
                    <td className="py-3 px-4">32" - 33"</td>
                    <td className="py-3 px-4">41" - 42"</td>
                    <td className="py-3 px-4">15"</td>
                  </tr>
                  <tr className="hover:bg-cream-50">
                    <td className="py-3 px-4 font-medium text-burgundy-900">XL</td>
                    <td className="py-3 px-4">40" - 42"</td>
                    <td className="py-3 px-4">34" - 36"</td>
                    <td className="py-3 px-4">43" - 45"</td>
                    <td className="py-3 px-4">15.5"</td>
                  </tr>
                  <tr className="hover:bg-cream-50">
                    <td className="py-3 px-4 font-medium text-burgundy-900">XXL</td>
                    <td className="py-3 px-4">43" - 45"</td>
                    <td className="py-3 px-4">37" - 39"</td>
                    <td className="py-3 px-4">46" - 48"</td>
                    <td className="py-3 px-4">16"</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-cream-100/80 p-4 rounded-xl border border-cream-200 text-xs text-charcoal-700 space-y-1.5">
              <p className="font-semibold text-charcoal-900">Measuring Tips:</p>
              <p>• <strong>Bust:</strong> Measure around the fullest part of your chest with measuring tape level.</p>
              <p>• <strong>Waist:</strong> Measure around your natural waistline, where your trousers or skirts sit.</p>
              <p>• <strong>Hips:</strong> Stand with feet together and measure around the widest part of your hips.</p>
              <p>• <strong>Between sizes?</strong> If you prefer a relaxed ethnic fit, we recommend sizing up.</p>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-burgundy-700 text-white rounded-full font-medium hover:bg-burgundy-800 transition"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
