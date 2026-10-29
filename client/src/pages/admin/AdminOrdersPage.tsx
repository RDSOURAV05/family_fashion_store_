import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Phone, MapPin, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Order } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { WhatsAppIcon } from '../../components/common/WhatsAppIcon';

const ORDER_STATUSES: Order['status'][] = [
  'Pending',
  'Contacted on WhatsApp',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled'
];

export const AdminOrdersPage: React.FC = () => {
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    fetchOrders();
  }, [isAuthenticated, navigate]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(r => r.json());
      if (res.success) setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o)));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = orders.filter(o => {
    if (selectedStatus === 'All') return true;
    return o.status === selectedStatus;
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
              WhatsApp Orders & Inquiries
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-charcoal-700">Filter Status:</span>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="py-2 px-3 rounded-xl border border-cream-300 text-xs text-charcoal-900 bg-white"
            >
              <option value="All">All Statuses ({orders.length})</option>
              {ORDER_STATUSES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Orders Listing */}
        {loading ? (
          <div className="text-center py-20 text-xs text-charcoal-700">Loading orders...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-cream-200 text-center text-xs text-charcoal-700">
            No orders found for the selected status.
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map(order => {
              // Direct WhatsApp link to customer
              const cleanCustomerPhone = order.customer.phone.replace(/[\s\-\+\(\)]/g, '');
              const waCustomerUrl = `https://wa.me/${cleanCustomerPhone}?text=${encodeURIComponent(
                `Hi ${order.customer.fullName}! Thank you for your order (${order.orderNumber}) at Chic Store. We are reviewing your order now.`
              )}`;

              return (
                <div key={order.id} className="bg-white rounded-3xl border border-cream-200 shadow-soft p-6 space-y-6">
                  
                  {/* Order Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-cream-100">
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-lg font-bold text-burgundy-900">
                        {order.orderNumber}
                      </span>
                      <span className="text-xs text-charcoal-700">
                        {formatDate(order.createdAt)}
                      </span>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cream-100 text-charcoal-800 font-medium">
                        Channel: WhatsApp Checkout
                      </span>
                    </div>

                    {/* Status Changer */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-charcoal-700 font-medium">Status:</span>
                      <select
                        value={order.status}
                        disabled={updatingId === order.id}
                        onChange={e => handleStatusChange(order.id, e.target.value as Order['status'])}
                        className="py-1.5 px-3 rounded-xl border border-cream-300 text-xs font-semibold text-charcoal-900 bg-cream-50 focus:outline-none focus:border-burgundy-800"
                      >
                        {ORDER_STATUSES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    
                    {/* Customer Info (5 cols) */}
                    <div className="md:col-span-5 bg-cream-50/70 p-4 rounded-2xl border border-cream-200/60 space-y-3 text-xs">
                      <h4 className="font-semibold text-charcoal-900 uppercase tracking-wider text-[11px] font-serif">
                        Customer & Delivery Details
                      </h4>
                      <div>
                        <p className="font-semibold text-charcoal-900 text-sm">{order.customer.fullName}</p>
                        <p className="text-charcoal-700 mt-0.5">Phone: <strong>{order.customer.phone}</strong></p>
                        {order.customer.email && <p className="text-charcoal-700">Email: {order.customer.email}</p>}
                      </div>

                      <div className="pt-2 border-t border-cream-200">
                        <span className="text-charcoal-700 font-medium block">Address:</span>
                        <p className="text-charcoal-900 leading-relaxed mt-0.5">
                          {order.customer.deliveryAddress}<br />
                          {order.customer.city}, {order.customer.state} - {order.customer.pinCode}
                        </p>
                      </div>

                      {order.customer.orderNotes && (
                        <div className="p-2 bg-amber-50 rounded-lg text-amber-900 text-[11px]">
                          <strong>Customer Note:</strong> {order.customer.orderNotes}
                        </div>
                      )}

                      <div className="pt-2">
                        <a
                          href={waCustomerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#25D366] text-white font-medium hover:bg-[#1EBE5D] transition text-[11px]"
                        >
                          <WhatsAppIcon size={14} className="fill-current text-white" />
                          <span>Message Customer on WhatsApp</span>
                        </a>
                      </div>
                    </div>

                    {/* Ordered Items (7 cols) */}
                    <div className="md:col-span-7 space-y-3">
                      <h4 className="font-semibold text-charcoal-900 uppercase tracking-wider text-[11px] font-serif">
                        Garments Ordered ({order.items.length})
                      </h4>

                      <div className="divide-y divide-cream-100 max-h-56 overflow-y-auto">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-3">
                              <img src={item.image} alt="" className="w-10 h-12 object-cover object-top rounded-lg bg-cream-100" />
                              <div>
                                <h5 className="font-medium text-charcoal-900">{item.name}</h5>
                                <span className="text-[10px] text-charcoal-700">
                                  Size: <strong>{item.size}</strong> | Color: <strong>{item.color}</strong> | Qty: {item.quantity}
                                </span>
                              </div>
                            </div>
                            <span className="font-serif font-semibold text-charcoal-900">
                              {formatCurrency(item.lineTotal)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-cream-200 flex justify-between items-center text-sm font-semibold">
                        <span className="font-serif text-charcoal-800">Total Order Amount:</span>
                        <span className="font-serif text-base text-burgundy-900">
                          {formatCurrency(order.total)}
                        </span>
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
