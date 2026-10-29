import { CartItem, CustomerDetails, Product } from '../types';

export const STORE_PHONE_DISPLAY = '+91 82816 10328';
export const STORE_WHATSAPP_NUMBER = '918281610328';
export const STORE_INSTAGRAM_URL = 'https://www.instagram.com/_chicstore.in?rpxt=MTdnY3F6YjV2YWRiNg==';
export const STORE_TEL_LINK = 'tel:+918281610328';

/**
 * Returns the general WhatsApp chat link
 */
export const getGeneralWhatsAppUrl = (customMessage?: string): string => {
  const message = customMessage || 'Hi Chic Store! I would like to know more about your collection.';
  return `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

/**
 * Formats a WhatsApp link for a specific product enquiry
 */
export const getProductEnquiryWhatsAppUrl = (
  product: Product,
  selectedSize?: string,
  selectedColor?: string
): string => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://chicstore.in/product/${product.slug}`;
  
  const lines = [
    '🌸 *Chic Store — Product Enquiry*',
    '',
    `Hello! I am interested in:`,
    `*${product.name}*`,
    `• *Price:* ₹${product.price.toLocaleString('en-IN')}`,
    selectedSize ? `• *Selected Size:* ${selectedSize}` : null,
    selectedColor ? `• *Selected Color:* ${selectedColor}` : null,
    `• *Product Link:* ${currentUrl}`,
    '',
    'Could you please assist me with availability, delivery timeline, and placing an order? Thank you!'
  ].filter(Boolean);

  return `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
};

/**
 * Formats a complete WhatsApp order message from cart and customer checkout form
 */
export const getCartOrderWhatsAppUrl = (
  items: CartItem[],
  customer: CustomerDetails,
  subtotal: number,
  shipping: number,
  total: number,
  orderNumber?: string
): string => {
  const orderRef = orderNumber ? ` (${orderNumber})` : '';

  const itemLines = items.map((item, index) => {
    return `${index + 1}. *${item.name}*\n   Size: ${item.size} | Color: ${item.color} | Qty: ${item.quantity}\n   Price: ₹${(item.price * item.quantity).toLocaleString('en-IN')}`;
  });

  const messageLines = [
    `🌸 *CHIC STORE — NEW ORDER REQUEST${orderRef}*`,
    '────────────────────────',
    '',
    '*CUSTOMER DETAILS*',
    `• *Name:* ${customer.fullName}`,
    `• *Phone:* ${customer.phone}`,
    customer.email ? `• *Email:* ${customer.email}` : null,
    `• *Delivery Address:*`,
    `  ${customer.deliveryAddress}`,
    `  ${customer.city}, ${customer.state} - ${customer.pinCode}`,
    customer.orderNotes ? `• *Notes:* ${customer.orderNotes}` : null,
    '',
    '────────────────────────',
    '*ITEMS ORDERED*',
    ...itemLines,
    '────────────────────────',
    `• *Subtotal:* ₹${subtotal.toLocaleString('en-IN')}`,
    `• *Shipping:* ${shipping === 0 ? 'Free Shipping (Boutique Special)' : `₹${shipping.toLocaleString('en-IN')}`}`,
    `• *Total Amount:* ₹${total.toLocaleString('en-IN')}`,
    '────────────────────────',
    '',
    'Please confirm my order and share payment/delivery details. Looking forward to your reply!'
  ].filter(Boolean);

  return `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(messageLines.join('\n'))}`;
};
