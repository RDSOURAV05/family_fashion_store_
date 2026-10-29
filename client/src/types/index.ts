export type ProductCategory =
  | 'Sarees'
  | 'Kurtas'
  | 'Kurta Sets'
  | 'Ethnic Wear'
  | 'Dresses'
  | 'Tops & Tunics'
  | 'Co-ord Sets'
  | 'Festive Wear'
  | 'New Arrivals';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
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

export interface CartItem {
  id: string; // unique composite key: `${productId}-${size}-${color}`
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  slug: string;
  category: string;
}

export interface CustomerDetails {
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
  customer: CustomerDetails;
  items: {
    productId: string;
    name: string;
    image: string;
    size: string;
    color?: string;
    quantity: number;
    price: number;
    lineTotal: number;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
  status: 'Pending' | 'Contacted on WhatsApp' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  channel: 'WhatsApp';
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
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
