import { Product, StoreSettings, Order } from '../types';
import { fallbackProducts, fallbackSettings } from '../data/initialProducts';

const API_BASE = '/api';

export const api = {
  // Products
  async getProducts(params?: Record<string, string>): Promise<{ data: Product[]; count: number }> {
    try {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      const res = await fetch(`${API_BASE}/products${query}`);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      return { data: data.data, count: data.count };
    } catch (err) {
      console.warn('API error, using initial catalog data:', err);
      // Client-side fallback filtering
      let list = [...fallbackProducts];
      if (params?.category && params.category !== 'All' && params.category !== 'Shop All') {
        const cat = params.category.toLowerCase();
        if (cat === 'new arrivals') {
          list = list.filter(p => p.isNewArrival);
        } else if (cat === 'festive collection' || cat === 'festive wear') {
          list = list.filter(p => p.category === 'Festive Wear' || p.tags?.includes('festive'));
        } else if (cat === 'kurtas & kurta sets' || cat === 'kurtas & sets') {
          list = list.filter(p => p.category === 'Kurtas' || p.category === 'Kurta Sets');
        } else if (cat === 'dresses & tops') {
          list = list.filter(p => p.category === 'Dresses' || p.category === 'Tops & Tunics');
        } else {
          list = list.filter(p => p.category.toLowerCase() === cat);
        }
      }
      if (params?.search) {
        const q = params.search.toLowerCase();
        list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
      }
      return { data: list, count: list.length };
    }
  },

  async getProduct(idOrSlug: string): Promise<{ data: Product; related: Product[] }> {
    try {
      const res = await fetch(`${API_BASE}/products/${idOrSlug}`);
      if (!res.ok) throw new Error('Product not found');
      return await res.json();
    } catch (err) {
      const found = fallbackProducts.find(p => p.id === idOrSlug || p.slug === idOrSlug) || fallbackProducts[0];
      const related = fallbackProducts.filter(p => p.id !== found.id && p.category === found.category).slice(0, 4);
      return { data: found, related };
    }
  },

  // Settings
  async getSettings(): Promise<StoreSettings> {
    try {
      const res = await fetch(`${API_BASE}/settings`);
      if (!res.ok) throw new Error('Failed to load settings');
      const data = await res.json();
      return data.data;
    } catch {
      return fallbackSettings;
    }
  },

  // Create Order (WhatsApp Checkout recording)
  async createOrder(orderPayload: any): Promise<Order> {
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('Could not record order on server, proceed with WhatsApp:', err);
      return {
        id: `local-${Date.now()}`,
        orderNumber: `CHIC-${Date.now().toString().slice(-6)}`,
        customer: orderPayload.customer,
        items: orderPayload.items,
        subtotal: orderPayload.subtotal,
        shipping: orderPayload.shipping || 0,
        total: orderPayload.total,
        status: 'Pending',
        channel: 'WhatsApp',
        paymentMethod: 'WhatsApp Order',
        paymentStatus: 'Pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
  },

  // Send Contact Message
  async sendContactMessage(payload: { name: string; phone: string; email?: string; subject: string; message: string }) {
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to submit contact message');
      }
      return await res.json();
    } catch (err: any) {
      // Save locally if running in static mode (e.g. GitHub Pages)
      try {
        const saved = JSON.parse(localStorage.getItem('chic_contact_inquiries') || '[]');
        saved.unshift({ ...payload, id: `msg-${Date.now()}`, createdAt: new Date().toISOString() });
        localStorage.setItem('chic_contact_inquiries', JSON.stringify(saved));
      } catch (e) {
        console.error(e);
      }
      return {
        success: true,
        message: 'Thank you for reaching out to Chic Store! We have received your message.'
      };
    }
  }
};
