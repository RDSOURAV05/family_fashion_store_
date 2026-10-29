export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'Sarees' | 'Kurtas' | 'Kurta Sets' | 'Ethnic Wear' | 'Dresses' | 'Tops & Tunics' | 'Co-ord Sets' | 'Festive Wear' | 'New Arrivals';
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  description: string;
  fabricDetails?: string;
  careInstructions?: string;
  images: string[];
  sizes: string[];
  colors: string[];
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  size: string;
  color?: string;
  quantity: number;
  price: number;
  lineTotal: number;
}

export interface OrderCustomer {
  fullName: string;
  phone: string;
  email?: string;
  deliveryAddress: string;
  city: string;
  state: string;
  pinCode: string;
  orderNotes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: 'Pending' | 'Contacted on WhatsApp' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  channel: 'WhatsApp';
  paymentMethod: 'WhatsApp Order / Manual Confirmation';
  paymentStatus: 'Pending';
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  status: 'Unread' | 'Replied' | 'Archived';
  createdAt: string;
}

export interface StoreSettings {
  storeName: string;
  phone: string;
  whatsappNumber: string;
  instagramUrl: string;
  announcementBarText: string;
  heroHeadline: string;
  heroSupportingText: string;
  aboutText: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  username: string;
  passwordHash: string;
  name: string;
  role: 'admin';
}
