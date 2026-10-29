import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, ChevronDown, SlidersHorizontal, RotateCcw, Search } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { FloatingWhatsApp } from '../components/layout/FloatingWhatsApp';
import { api } from '../utils/api';
import { fallbackProducts } from '../data/initialProducts';
import { formatCurrency } from '../utils/formatters';

const CATEGORIES = [
  'All',
  'Sarees',
  'Kurtas',
  'Kurta Sets',
  'Ethnic Wear',
  'Dresses',
  'Tops & Tunics',
  'Co-ord Sets',
  'Festive Wear',
  'New Arrivals'
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'];
const COLORS = ['Pink', 'Peach', 'Blue', 'Green', 'Burgundy', 'Yellow', 'White', 'Cream', 'Sage', 'Teal', 'Navy'];

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [loading, setLoading] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter States from URL or Defaults
  const categoryParam = searchParams.get('category') || 'All';
  const searchParam = searchParams.get('search') || '';
  const sortParam = searchParams.get('sort') || 'featured';
  const sizeParam = searchParams.get('size') ? searchParams.get('size')!.split(',') : [];
  const colorParam = searchParams.get('color') ? searchParams.get('color')!.split(',') : [];
  const maxPriceParam = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 6000;
  const inStockOnly = searchParams.get('inStock') === 'true';
  const newArrivalsOnly = searchParams.get('isNewArrival') === 'true';

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    api.getProducts().then(res => {
      if (res.data) setProducts(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // Update query params helper
  const updateParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(searchParams);
    if (value === null || value === '' || value === 'All') {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next);
  };

  const handleCategoryChange = (cat: string) => {
    updateParam('category', cat === 'All' ? null : cat);
  };

  const handleSizeToggle = (size: string) => {
    let nextSizes = [...sizeParam];
    if (nextSizes.includes(size)) {
      nextSizes = nextSizes.filter(s => s !== size);
    } else {
      nextSizes.push(size);
    }
    updateParam('size', nextSizes.length > 0 ? nextSizes.join(',') : null);
  };

  const handleColorToggle = (color: string) => {
    let nextColors = [...colorParam];
    if (nextColors.includes(color)) {
      nextColors = nextColors.filter(c => c !== color);
    } else {
      nextColors.push(color);
    }
    updateParam('color', nextColors.length > 0 ? nextColors.join(',') : null);
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  // Filter & sort logic applied synchronously
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category
    if (categoryParam && categoryParam !== 'All') {
      const cat = categoryParam.toLowerCase();
      if (cat === 'new arrivals') {
        list = list.filter(p => p.isNewArrival);
      } else if (cat === 'festive collection' || cat === 'festive wear') {
        list = list.filter(p => p.category === 'Festive Wear' || p.tags?.some(t => t.toLowerCase().includes('festive')));
      } else if (cat === 'kurtas & kurta sets' || cat === 'kurtas & sets') {
        list = list.filter(p => p.category === 'Kurtas' || p.category === 'Kurta Sets');
      } else if (cat === 'dresses & tops') {
        list = list.filter(p => p.category === 'Dresses' || p.category === 'Tops & Tunics');
      } else {
        list = list.filter(p => p.category.toLowerCase() === cat);
      }
    }

    // Search
    if (searchParam) {
      const q = searchParam.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q))
      );
    }

    // Max Price
    if (maxPriceParam < 6000) {
      list = list.filter(p => p.price <= maxPriceParam);
    }

    // Sizes
    if (sizeParam.length > 0) {
      list = list.filter(p =>
        p.sizes.some(s => sizeParam.map(x => x.toLowerCase()).includes(s.toLowerCase()))
      );
    }

    // Colors
    if (colorParam.length > 0) {
      list = list.filter(p =>
        p.colors.some(col => colorParam.some(cp => col.toLowerCase().includes(cp.toLowerCase())))
      );
    }

    // Stock
    if (inStockOnly) {
      list = list.filter(p => p.inStock && p.stockCount > 0);
    }

    // New Arrivals Toggle
    if (newArrivalsOnly) {
      list = list.filter(p => p.isNewArrival);
    }

    // Sorting
    switch (sortParam) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'featured':
      default:
        list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return list;
  }, [products, categoryParam, searchParam, maxPriceParam, sizeParam, colorParam, inStockOnly, newArrivalsOnly, sortParam]);

  const hasActiveFilters = categoryParam !== 'All' || searchParam || sizeParam.length > 0 || colorParam.length > 0 || maxPriceParam < 6000 || inStockOnly || newArrivalsOnly;

  return (
    <div className="bg-cream-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.25em] font-serif text-burgundy-700 block mb-1">
            Boutique Collection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
            {categoryParam === 'All' ? 'Shop All Collections' : categoryParam}
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-700 mt-2 font-light">
            Discover graceful sarees, kurtas, and women's clothing designed with elegance and comfort.
          </p>
        </div>

        {/* Toolbar: Filter Toggles & Sorting */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 px-5 rounded-2xl bg-white border border-cream-200/80 shadow-soft mb-8">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cream-100 text-charcoal-900 text-xs font-medium hover:bg-cream-200 transition"
            >
              <SlidersHorizontal className="w-4 h-4 text-burgundy-700" />
              <span>Filters ({hasActiveFilters ? 'Active' : 'All'})</span>
            </button>

            <span className="text-xs text-charcoal-700">
              Showing <strong className="text-charcoal-900 font-semibold">{filteredProducts.length}</strong> items
            </span>
          </div>

          {/* Active Filter Chips */}
          <div className="flex items-center gap-4">
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center gap-1.5 text-xs text-burgundy-700 hover:text-burgundy-900 font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-charcoal-700 hidden sm:inline">Sort:</span>
              <select
                value={sortParam}
                onChange={e => updateParam('sort', e.target.value)}
                className="py-1.5 px-3 bg-cream-50 border border-cream-300 rounded-xl text-xs font-medium text-charcoal-900 focus:outline-none focus:border-burgundy-700"
              >
                <option value="featured">Featured Pieces</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

        </div>

        {/* Layout Grid: Sidebar Filters + Products */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="p-6 bg-white rounded-2xl border border-cream-200/80 shadow-soft space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-cream-200">
                <h3 className="font-serif text-lg font-semibold text-charcoal-900 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-burgundy-700" />
                  <span>Filters</span>
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-burgundy-800 hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal-800 mb-3">
                  Categories
                </h4>
                <div className="space-y-1.5">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`w-full text-left py-1.5 px-2.5 rounded-lg text-xs transition flex justify-between items-center ${
                        categoryParam === cat
                          ? 'bg-rose-50 text-burgundy-900 font-semibold'
                          : 'text-charcoal-700 hover:bg-cream-100 hover:text-charcoal-900'
                      }`}
                    >
                      <span>{cat}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="pt-4 border-t border-cream-200">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal-800">
                    Max Price
                  </h4>
                  <span className="text-xs font-semibold text-burgundy-800">
                    {formatCurrency(maxPriceParam)}
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="6000"
                  step="250"
                  value={maxPriceParam}
                  onChange={e => updateParam('maxPrice', e.target.value)}
                  className="w-full accent-burgundy-700 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-charcoal-700 mt-1">
                  <span>₹500</span>
                  <span>₹6,000+</span>
                </div>
              </div>

              {/* Sizes Filter */}
              <div className="pt-4 border-t border-cream-200">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal-800 mb-3">
                  Available Sizes
                </h4>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map(size => {
                    const active = sizeParam.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => handleSizeToggle(size)}
                        className={`px-3 py-1.5 text-xs rounded-xl border transition ${
                          active
                            ? 'border-burgundy-700 bg-rose-50 text-burgundy-900 font-semibold'
                            : 'border-cream-300 text-charcoal-700 hover:border-charcoal-700 bg-white'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color Tones Filter */}
              <div className="pt-4 border-t border-cream-200">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal-800 mb-3">
                  Color Tones
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {COLORS.map(col => {
                    const active = colorParam.includes(col);
                    return (
                      <button
                        key={col}
                        onClick={() => handleColorToggle(col)}
                        className={`px-2.5 py-1 text-[11px] rounded-lg border transition ${
                          active
                            ? 'border-burgundy-700 bg-rose-100 text-burgundy-900 font-semibold'
                            : 'border-cream-200 text-charcoal-700 hover:border-charcoal-700 bg-cream-50'
                        }`}
                      >
                        {col}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Toggles */}
              <div className="pt-4 border-t border-cream-200 space-y-3">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-charcoal-800">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={e => updateParam('inStock', e.target.checked ? 'true' : null)}
                    className="rounded border-cream-300 text-burgundy-700 focus:ring-burgundy-700"
                  />
                  <span>In Stock Only</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-charcoal-800">
                  <input
                    type="checkbox"
                    checked={newArrivalsOnly}
                    onChange={e => updateParam('isNewArrival', e.target.checked ? 'true' : null)}
                    className="rounded border-cream-300 text-burgundy-700 focus:ring-burgundy-700"
                  />
                  <span>New Arrivals Only</span>
                </label>
              </div>

            </div>
          </aside>

          {/* Products Grid Column */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-20">
                <p className="text-charcoal-700 font-serif">Curating boutique catalog...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 px-4 bg-white rounded-2xl border border-cream-200">
                <h3 className="font-serif text-2xl text-charcoal-900 mb-2">No matching products found</h3>
                <p className="text-xs sm:text-sm text-charcoal-700 max-w-sm mx-auto mb-6">
                  Try clearing some filters or exploring another category to discover our collection.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-burgundy-800 text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-burgundy-900 transition"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={prod => setSelectedProduct(prod)}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-charcoal-900/60 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
          <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-white shadow-2xl flex flex-col z-10">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-cream-200">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-burgundy-700" />
                <h3 className="font-serif text-lg font-semibold text-charcoal-900">Filters</h3>
                {hasActiveFilters && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-burgundy-800 font-semibold">Active</span>
                )}
              </div>
              <button 
                onClick={() => setMobileFiltersOpen(false)} 
                className="p-1.5 text-charcoal-600 hover:text-charcoal-900 rounded-lg hover:bg-cream-100"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Filters Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Category Filter */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal-800 mb-2.5">Categories</h4>
                <div className="grid grid-cols-2 gap-1.5">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`text-left py-2 px-3 rounded-xl text-xs transition ${
                        categoryParam === cat ? 'bg-rose-100 text-burgundy-900 font-semibold border border-burgundy-300' : 'text-charcoal-700 bg-cream-50 hover:bg-cream-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="pt-4 border-t border-cream-200">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal-800">Max Price</h4>
                  <span className="text-xs font-semibold text-burgundy-800">{formatCurrency(maxPriceParam)}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="6000"
                  step="250"
                  value={maxPriceParam}
                  onChange={e => updateParam('maxPrice', e.target.value)}
                  className="w-full accent-burgundy-700 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-charcoal-600 mt-1">
                  <span>₹500</span>
                  <span>₹6,000+</span>
                </div>
              </div>

              {/* Sizes Filter */}
              <div className="pt-4 border-t border-cream-200">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal-800 mb-2.5">Available Sizes</h4>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map(size => {
                    const active = sizeParam.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => handleSizeToggle(size)}
                        className={`px-3 py-1.5 text-xs rounded-xl border transition ${
                          active
                            ? 'border-burgundy-700 bg-rose-50 text-burgundy-900 font-semibold shadow-sm'
                            : 'border-cream-300 text-charcoal-700 bg-white'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color Tones Filter */}
              <div className="pt-4 border-t border-cream-200">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal-800 mb-2.5">Color Tones</h4>
                <div className="flex flex-wrap gap-1.5">
                  {COLORS.map(col => {
                    const active = colorParam.includes(col);
                    return (
                      <button
                        key={col}
                        onClick={() => handleColorToggle(col)}
                        className={`px-2.5 py-1 text-xs rounded-lg border transition ${
                          active
                            ? 'border-burgundy-700 bg-rose-100 text-burgundy-900 font-semibold'
                            : 'border-cream-200 text-charcoal-700 bg-cream-50'
                        }`}
                      >
                        {col}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Toggles */}
              <div className="pt-4 border-t border-cream-200 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer text-xs text-charcoal-800">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={e => updateParam('inStock', e.target.checked ? 'true' : null)}
                    className="w-4 h-4 rounded border-cream-300 text-burgundy-700 focus:ring-burgundy-700"
                  />
                  <span>In Stock Only</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer text-xs text-charcoal-800">
                  <input
                    type="checkbox"
                    checked={newArrivalsOnly}
                    onChange={e => updateParam('isNewArrival', e.target.checked ? 'true' : null)}
                    className="w-4 h-4 rounded border-cream-300 text-burgundy-700 focus:ring-burgundy-700"
                  />
                  <span>New Arrivals Only</span>
                </label>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-cream-200 bg-cream-50 space-y-2">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full py-3 bg-burgundy-800 text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-burgundy-900 transition shadow-md"
              >
                View {filteredProducts.length} Results
              </button>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="w-full py-2 bg-transparent text-charcoal-700 hover:text-burgundy-800 text-xs font-medium"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <FloatingWhatsApp />
    </div>
  );
};
