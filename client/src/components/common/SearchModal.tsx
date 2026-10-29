import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import { api } from '../../utils/api';
import { formatCurrency } from '../../utils/formatters';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.getProducts({ search: query.trim() });
        setResults(res.data.slice(0, 6));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const handleSelectProduct = (slug: string) => {
    onClose();
    navigate(`/product/${slug}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-charcoal-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-cream-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-cream-200 p-4">
          <Search className="w-5 h-5 text-charcoal-700 ml-2" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search sarees, kurtas, anarkalis, dresses..."
            className="w-full py-2 px-4 text-base focus:outline-none placeholder:text-charcoal-700/60 font-sans"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-charcoal-700 hover:text-charcoal-900 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-charcoal-700 hover:text-burgundy-700 rounded-lg hover:bg-cream-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </form>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {loading && (
            <div className="text-center py-8 text-sm text-charcoal-700">
              Searching Chic Store catalog...
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="text-center py-8">
              <p className="text-charcoal-800 font-serif text-lg">No matching fashion pieces found</p>
              <p className="text-xs text-charcoal-700 mt-1">Try searching for "Saree", "Kurta", "Dress", or "Cotton"</p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wider text-charcoal-700 px-2 mb-2 font-medium">
                Products ({results.length})
              </p>
              {results.map(prod => (
                <div
                  key={prod.id}
                  onClick={() => handleSelectProduct(prod.slug)}
                  className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-cream-100/80 cursor-pointer transition group"
                >
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-14 h-16 object-cover object-top rounded-lg bg-cream-200"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-semibold text-burgundy-700 tracking-wider">
                      {prod.category}
                    </span>
                    <h4 className="font-serif text-sm font-medium text-charcoal-900 group-hover:text-burgundy-800 truncate">
                      {prod.name}
                    </h4>
                    <span className="text-xs font-semibold text-burgundy-900">
                      {formatCurrency(prod.price)}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-charcoal-700 group-hover:text-burgundy-700 group-hover:translate-x-1 transition" />
                </div>
              ))}

              <div className="pt-3 border-t border-cream-200 text-center">
                <button
                  onClick={handleSearchSubmit}
                  className="text-xs font-semibold text-burgundy-800 hover:text-burgundy-900 inline-flex items-center gap-1"
                >
                  View all results for "{query}" &rarr;
                </button>
              </div>
            </div>
          )}

          {!query && (
            <div className="py-6 px-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-3">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {['Sarees', 'Kurta Sets', 'Festive Silk', 'Cotton Kurta', 'Floral Anarkali', 'Co-ord Sets'].map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 rounded-full bg-cream-100 hover:bg-rose-100 text-charcoal-800 text-xs font-medium transition"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
