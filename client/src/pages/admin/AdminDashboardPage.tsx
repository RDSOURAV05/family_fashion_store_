import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, ShoppingBag, MessageSquare, Settings, LogOut, Plus, ExternalLink, TrendingUp, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Product, Order, ContactMessage } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { fallbackProducts } from '../../data/initialProducts';

export const AdminDashboardPage: React.FC = () => {
  const { admin, token, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [prodRes, ordRes, msgRes] = await Promise.all([
          fetch('/api/products').then(r => r.json()).catch(() => null),
          fetch('/api/orders', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()).catch(() => null),
          fetch('/api/contact', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()).catch(() => null)
        ]);

        if (prodRes && prodRes.success) {
          setProducts(prodRes.data);
        } else {
          try {
            const saved = localStorage.getItem('chic_store_custom_products');
            setProducts(saved ? JSON.parse(saved) : fallbackProducts);
          } catch {
            setProducts(fallbackProducts);
          }
        }

        if (ordRes && ordRes.success) {
          setOrders(ordRes.data);
        } else {
          try {
            const saved = localStorage.getItem('chic_store_orders');
            setOrders(saved ? JSON.parse(saved) : []);
          } catch {
            setOrders([]);
          }
        }

        if (msgRes && msgRes.success) {
          setMessages(msgRes.data);
        } else {
          try {
            const saved = localStorage.getItem('chic_contact_inquiries');
            setMessages(saved ? JSON.parse(saved) : []);
          } catch {
            setMessages([]);
          }
        }
      } catch (err) {
        console.error('Error fetching admin data', err);
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, token, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const unreadMessages = messages.filter(m => m.status === 'Unread').length;

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">
      {/* Admin Top Navigation */}
      <header className="bg-white border-b border-cream-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link to="/" className="font-serif text-xl tracking-[0.2em] font-semibold text-burgundy-900 uppercase">
              CHIC STORE
            </Link>
            <span className="px-2 py-0.5 rounded-full bg-rose-100 text-burgundy-800 text-[10px] font-semibold tracking-wider uppercase">
              Admin Portal
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-charcoal-700 hidden sm:inline">
              Signed in as <strong className="text-charcoal-900">{admin?.username || 'Store Admin'}</strong>
            </span>
            <Link
              to="/"
              target="_blank"
              className="text-xs text-burgundy-800 hover:underline flex items-center gap-1 hidden md:flex"
            >
              <span>View Live Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cream-300 text-xs font-medium text-charcoal-700 hover:bg-cream-100 transition"
            >
              <LogOut className="w-3.5 h-3.5 text-red-600" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Sub Navigation Bar */}
        <div className="border-t border-cream-200 bg-cream-50/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-6 overflow-x-auto py-2 text-xs font-medium">
            <Link to="/admin/dashboard" className="text-burgundy-800 font-semibold border-b-2 border-burgundy-800 pb-1">
              Dashboard Overview
            </Link>
            <Link to="/admin/products" className="text-charcoal-700 hover:text-burgundy-800 pb-1">
              Products Catalogue ({products.length})
            </Link>
            <Link to="/admin/orders" className="text-charcoal-700 hover:text-burgundy-800 pb-1">
              WhatsApp Orders ({orders.length})
            </Link>
            <Link to="/admin/settings" className="text-charcoal-700 hover:text-burgundy-800 pb-1">
              Store Banners & Info
            </Link>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        
        {/* Welcome Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-cream-200 shadow-soft">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-semibold">
              Boutique Overview
            </h1>
            <p className="text-xs text-charcoal-700 mt-1">
              Manage inventory, update garment prices, track customer WhatsApp inquiries, and manage announcements.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-burgundy-800 hover:bg-burgundy-900 text-white text-xs font-semibold uppercase tracking-wider transition shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Garment</span>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-2xl bg-white border border-cream-200 shadow-soft flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-charcoal-700 font-medium">Total Products</span>
              <h3 className="font-serif text-3xl font-semibold text-charcoal-900 mt-1">{products.length}</h3>
              <span className="text-[11px] text-emerald-700 mt-1 block">Active in boutique catalog</span>
            </div>
            <div className="p-3 rounded-2xl bg-cream-100 text-burgundy-800">
              <Package className="w-6 h-6" />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-cream-200 shadow-soft flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-charcoal-700 font-medium">WhatsApp Orders</span>
              <h3 className="font-serif text-3xl font-semibold text-charcoal-900 mt-1">{orders.length}</h3>
              <span className="text-[11px] text-amber-700 mt-1 block">{pendingOrders} awaiting confirmation</span>
            </div>
            <div className="p-3 rounded-2xl bg-rose-50 text-rose-700">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-cream-200 shadow-soft flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-charcoal-700 font-medium">Order Submissions</span>
              <h3 className="font-serif text-3xl font-semibold text-burgundy-900 mt-1">{formatCurrency(totalRevenue)}</h3>
              <span className="text-[11px] text-charcoal-700 mt-1 block">Prepared for WhatsApp</span>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50 text-amber-700">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-cream-200 shadow-soft flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-charcoal-700 font-medium">Contact Inquiries</span>
              <h3 className="font-serif text-3xl font-semibold text-charcoal-900 mt-1">{messages.length}</h3>
              <span className="text-[11px] text-burgundy-700 mt-1 block">{unreadMessages} unread messages</span>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700">
              <MessageSquare className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Quick Management Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Recent Orders Submitted */}
          <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200">
              <h2 className="font-serif text-lg font-semibold text-charcoal-900">
                Recent WhatsApp Orders
              </h2>
              <Link to="/admin/orders" className="text-xs text-burgundy-800 hover:underline">
                View all ({orders.length}) &rarr;
              </Link>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-10 text-xs text-charcoal-700">
                No orders submitted yet. Orders submitted via checkout will be listed here.
              </div>
            ) : (
              <div className="divide-y divide-cream-100">
                {orders.slice(0, 5).map(o => (
                  <div key={o.id} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-burgundy-900">{o.orderNumber}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cream-100 text-charcoal-700">
                          {o.status}
                        </span>
                      </div>
                      <p className="text-xs text-charcoal-800 mt-0.5">
                        {o.customer.fullName} • {o.customer.phone}
                      </p>
                      <span className="text-[10px] text-charcoal-700">{formatDate(o.createdAt)}</span>
                    </div>
                    <span className="font-serif font-semibold text-sm text-burgundy-900">
                      {formatCurrency(o.total)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Products Overview */}
          <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200">
              <h2 className="font-serif text-lg font-semibold text-charcoal-900">
                Current Garment Inventory
              </h2>
              <Link to="/admin/products" className="text-xs text-burgundy-800 hover:underline">
                Manage all ({products.length}) &rarr;
              </Link>
            </div>

            <div className="divide-y divide-cream-100">
              {products.slice(0, 5).map(p => (
                <div key={p.id} className="py-2.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={p.images[0]} alt="" className="w-10 h-12 object-cover rounded-lg bg-cream-100 shrink-0" />
                    <div className="min-w-0">
                      <h4 className="font-serif text-xs font-medium text-charcoal-900 truncate">{p.name}</h4>
                      <span className="text-[10px] text-charcoal-700 block">{p.category} • Stock: {p.stockCount}</span>
                    </div>
                  </div>
                  <span className="font-serif font-semibold text-xs text-burgundy-900 shrink-0">
                    {formatCurrency(p.price)}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
};
