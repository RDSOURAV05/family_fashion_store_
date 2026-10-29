import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Search, ArrowLeft, X, Check, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Product } from '../../types';
import { formatCurrency } from '../../utils/formatters';

const CATEGORIES = [
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

export const AdminProductsPage: React.FC = () => {
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Sarees',
    price: '',
    originalPrice: '',
    description: '',
    fabricDetails: '',
    careInstructions: '',
    images: '',
    sizes: 'XS, S, M, L, XL',
    colors: 'Classic, Pastel',
    stockCount: '10',
    inStock: true,
    isFeatured: false,
    isNewArrival: true,
    tags: 'saree, ethnic, boutique'
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    fetchProducts();
  }, [isAuthenticated, navigate]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products').then(r => r.json());
      if (res.success) setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'Sarees',
      price: '',
      originalPrice: '',
      description: '',
      fabricDetails: '',
      careInstructions: '',
      images: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      sizes: 'Free Size',
      colors: 'Dusty Rose, Blush Pink',
      stockCount: '15',
      inStock: true,
      isFeatured: false,
      isNewArrival: true,
      tags: 'saree, boutique'
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      category: p.category,
      price: p.price.toString(),
      originalPrice: p.originalPrice ? p.originalPrice.toString() : '',
      description: p.description,
      fabricDetails: p.fabricDetails || '',
      careInstructions: p.careInstructions || '',
      images: p.images.join(',\n'),
      sizes: p.sizes.join(', '),
      colors: p.colors.join(', '),
      stockCount: p.stockCount.toString(),
      inStock: p.inStock,
      isFeatured: !!p.isFeatured,
      isNewArrival: !!p.isNewArrival,
      tags: p.tags ? p.tags.join(', ') : ''
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}" from the boutique catalogue?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setProducts(prev => prev.filter(p => p.id !== id));
      } else {
        alert(data.message || 'Failed to delete product');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting product');
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.name.trim() || !formData.price || !formData.description.trim()) {
      setFormError('Please fill in product name, price, and description.');
      return;
    }

    setSaving(true);
    try {
      const imagesArray = formData.images
        .split(/[\n,]/)
        .map(s => s.trim())
        .filter(Boolean);

      const sizesArray = formData.sizes
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      const colorsArray = formData.colors
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      const tagsArray = formData.tags
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      const payload = {
        name: formData.name.trim(),
        category: formData.category,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        description: formData.description.trim(),
        fabricDetails: formData.fabricDetails.trim(),
        careInstructions: formData.careInstructions.trim(),
        images: imagesArray.length > 0 ? imagesArray : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'],
        sizes: sizesArray.length > 0 ? sizesArray : ['Free Size'],
        colors: colorsArray.length > 0 ? colorsArray : ['Classic'],
        stockCount: Number(formData.stockCount) || 10,
        inStock: formData.inStock,
        isFeatured: formData.isFeatured,
        isNewArrival: formData.isNewArrival,
        tags: tagsArray
      };

      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to save product');
      }

      setIsModalOpen(false);
      fetchProducts();
    } catch (err: any) {
      setFormError(err.message || 'Error saving product');
    } finally {
      setSaving(false);
    }
  };

  const filtered = products.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-cream-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link to="/admin/dashboard" className="inline-flex items-center gap-1.5 text-xs text-burgundy-800 hover:underline mb-2">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="font-serif text-3xl text-charcoal-900 font-semibold">
              Product Catalogue Manager
            </h1>
          </div>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-burgundy-800 hover:bg-burgundy-900 text-white text-xs font-semibold uppercase tracking-wider transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="p-4 bg-white rounded-2xl border border-cream-200 shadow-soft flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-charcoal-700 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search garments by name or category..."
              className="w-full py-2 pl-9 pr-4 rounded-xl border border-cream-300 text-xs text-charcoal-900 focus:outline-none focus:border-burgundy-800"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-charcoal-700">Category:</span>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="py-1.5 px-3 rounded-xl border border-cream-300 text-xs text-charcoal-900 bg-cream-50"
            >
              <option value="All">All Categories ({products.length})</option>
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-3xl border border-cream-200 shadow-soft overflow-hidden">
          {loading ? (
            <div className="text-center py-20 text-xs text-charcoal-700">
              Loading garments...
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-xs text-charcoal-700">
              No products found matching your filter.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-cream-50 border-b border-cream-200 text-charcoal-700 uppercase tracking-wider font-serif">
                    <th className="py-3 px-4 font-semibold">Garment</th>
                    <th className="py-3 px-4 font-semibold">Category</th>
                    <th className="py-3 px-4 font-semibold">Price</th>
                    <th className="py-3 px-4 font-semibold">Stock</th>
                    <th className="py-3 px-4 font-semibold">Tags</th>
                    <th className="py-3 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-100">
                  {filtered.map(p => (
                    <tr key={p.id} className="hover:bg-cream-50/50 transition">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img src={p.images[0]} alt="" className="w-12 h-16 object-cover object-top rounded-lg bg-cream-100 shrink-0" />
                        <div>
                          <h4 className="font-serif text-sm font-medium text-charcoal-900">{p.name}</h4>
                          <span className="text-[10px] text-charcoal-700">Sizes: {p.sizes.join(', ')}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-charcoal-800 font-medium">{p.category}</td>
                      <td className="py-3 px-4">
                        <span className="font-serif font-semibold text-burgundy-900">{formatCurrency(p.price)}</span>
                        {p.originalPrice && (
                          <span className="block text-[10px] text-charcoal-700 line-through">
                            {formatCurrency(p.originalPrice)}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          p.inStock ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
                        }`}>
                          {p.inStock ? `${p.stockCount} in stock` : 'Out of stock'}
                        </span>
                      </td>
                      <td className="py-3 px-4 space-x-1">
                        {p.isFeatured && (
                          <span className="px-1.5 py-0.5 text-[9px] rounded bg-rose-100 text-burgundy-800 font-semibold uppercase">
                            Featured
                          </span>
                        )}
                        {p.isNewArrival && (
                          <span className="px-1.5 py-0.5 text-[9px] rounded bg-amber-100 text-amber-900 font-semibold uppercase">
                            New
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 rounded-lg text-charcoal-700 hover:text-burgundy-800 hover:bg-cream-100 transition"
                          title="Edit Product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-1.5 rounded-lg text-charcoal-700 hover:text-red-600 hover:bg-red-50 transition"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-cream-200 mb-6">
              <h3 className="font-serif text-2xl text-charcoal-900 font-semibold">
                {editingProduct ? 'Edit Garment Details' : 'Add New Garment to Boutique'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-charcoal-700 hover:text-burgundy-800 rounded-full hover:bg-cream-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase tracking-wider text-charcoal-800 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Handcrafted Banarasi Silk Saree"
                  className="w-full py-2 px-3 rounded-xl border border-cream-300 text-sm text-charcoal-900 focus:outline-none focus:border-burgundy-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-charcoal-800 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full py-2 px-3 rounded-xl border border-cream-300 text-xs text-charcoal-900 bg-white focus:outline-none focus:border-burgundy-800"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-charcoal-800 mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                    placeholder="1899"
                    className="w-full py-2 px-3 rounded-xl border border-cream-300 text-sm text-charcoal-900 focus:outline-none focus:border-burgundy-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-charcoal-800 mb-1">
                    Original Price (₹) (Optional)
                  </label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={e => setFormData({ ...formData, originalPrice: e.target.value })}
                    placeholder="2499"
                    className="w-full py-2 px-3 rounded-xl border border-cream-300 text-sm text-charcoal-900 focus:outline-none focus:border-burgundy-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-charcoal-800 mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the silhouette, drape, craft story, and occasion..."
                  className="w-full py-2 px-3 rounded-xl border border-cream-300 text-xs text-charcoal-900 focus:outline-none focus:border-burgundy-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-charcoal-800 mb-1">
                    Fabric Details
                  </label>
                  <input
                    type="text"
                    value={formData.fabricDetails}
                    onChange={e => setFormData({ ...formData, fabricDetails: e.target.value })}
                    placeholder="100% Pure Mulmul Cotton / Chanderi"
                    className="w-full py-2 px-3 rounded-xl border border-cream-300 text-xs text-charcoal-900 focus:outline-none focus:border-burgundy-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-charcoal-800 mb-1">
                    Care Instructions
                  </label>
                  <input
                    type="text"
                    value={formData.careInstructions}
                    onChange={e => setFormData({ ...formData, careInstructions: e.target.value })}
                    placeholder="Dry clean recommended for first wash."
                    className="w-full py-2 px-3 rounded-xl border border-cream-300 text-xs text-charcoal-900 focus:outline-none focus:border-burgundy-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-charcoal-800 mb-1">
                  Product Image URLs (comma or newline separated)
                </label>
                <textarea
                  rows={2}
                  value={formData.images}
                  onChange={e => setFormData({ ...formData, images: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full py-2 px-3 rounded-xl border border-cream-300 text-xs text-charcoal-900 focus:outline-none focus:border-burgundy-800 font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-charcoal-800 mb-1">
                    Sizes (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.sizes}
                    onChange={e => setFormData({ ...formData, sizes: e.target.value })}
                    placeholder="XS, S, M, L, XL"
                    className="w-full py-2 px-3 rounded-xl border border-cream-300 text-xs text-charcoal-900 focus:outline-none focus:border-burgundy-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-charcoal-800 mb-1">
                    Colors (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.colors}
                    onChange={e => setFormData({ ...formData, colors: e.target.value })}
                    placeholder="Rose Pink, Ivory"
                    className="w-full py-2 px-3 rounded-xl border border-cream-300 text-xs text-charcoal-900 focus:outline-none focus:border-burgundy-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-charcoal-800 mb-1">
                    Stock Count
                  </label>
                  <input
                    type="number"
                    value={formData.stockCount}
                    onChange={e => setFormData({ ...formData, stockCount: e.target.value })}
                    placeholder="10"
                    className="w-full py-2 px-3 rounded-xl border border-cream-300 text-xs text-charcoal-900 focus:outline-none focus:border-burgundy-800"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={e => setFormData({ ...formData, inStock: e.target.checked })}
                    className="rounded border-cream-300 text-burgundy-800 focus:ring-burgundy-800"
                  />
                  <span>Mark as In-Stock</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded border-cream-300 text-burgundy-800 focus:ring-burgundy-800"
                  />
                  <span>Featured on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isNewArrival}
                    onChange={e => setFormData({ ...formData, isNewArrival: e.target.checked })}
                    className="rounded border-cream-300 text-burgundy-800 focus:ring-burgundy-800"
                  />
                  <span>Mark as New Arrival</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-cream-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-cream-300 text-charcoal-700 hover:bg-cream-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-full bg-burgundy-800 hover:bg-burgundy-900 text-white font-medium shadow-sm"
                >
                  {saving ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
