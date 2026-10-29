-- =======================================================
-- Chic Store — Database Schema (PostgreSQL / MySQL)
-- =======================================================

-- 1. Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id VARCHAR(64) PRIMARY KEY,
  username VARCHAR(64) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(128) NOT NULL,
  role VARCHAR(32) DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Store Settings Table
CREATE TABLE IF NOT EXISTS store_settings (
  id SERIAL PRIMARY KEY,
  store_name VARCHAR(128) NOT NULL DEFAULT 'Chic Store',
  phone VARCHAR(32) NOT NULL DEFAULT '+91 82816 10328',
  whatsapp_number VARCHAR(32) NOT NULL DEFAULT '918281610328',
  instagram_url VARCHAR(255) NOT NULL DEFAULT 'https://www.instagram.com/_chicstore.in?rpxt=MTdnY3F6YjV2YWRiNg==',
  announcement_bar_text TEXT NOT NULL DEFAULT 'Discover Your Everyday Elegance',
  hero_headline VARCHAR(255) NOT NULL DEFAULT 'Elegance, Woven Into Every Look.',
  hero_supporting_text TEXT NOT NULL DEFAULT 'Discover timeless sarees, beautiful kurtas, and styles that celebrate you.',
  about_text TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Products Table
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  category VARCHAR(64) NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  original_price NUMERIC(10, 2),
  discount_percent INTEGER,
  description TEXT NOT NULL,
  fabric_details TEXT,
  care_instructions TEXT,
  images JSONB NOT NULL DEFAULT '[]',
  sizes JSONB NOT NULL DEFAULT '["Free Size"]',
  colors JSONB NOT NULL DEFAULT '["Classic"]',
  in_stock BOOLEAN DEFAULT TRUE,
  stock_count INTEGER DEFAULT 10,
  is_featured BOOLEAN DEFAULT FALSE,
  is_new_arrival BOOLEAN DEFAULT FALSE,
  tags JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(64) PRIMARY KEY,
  order_number VARCHAR(64) UNIQUE NOT NULL,
  customer_full_name VARCHAR(128) NOT NULL,
  customer_phone VARCHAR(32) NOT NULL,
  customer_email VARCHAR(128),
  customer_address TEXT NOT NULL,
  customer_city VARCHAR(64) NOT NULL,
  customer_state VARCHAR(64) NOT NULL,
  customer_pincode VARCHAR(16) NOT NULL,
  order_notes TEXT,
  items JSONB NOT NULL,
  subtotal NUMERIC(10, 2) NOT NULL,
  shipping NUMERIC(10, 2) DEFAULT 0.00,
  total NUMERIC(10, 2) NOT NULL,
  status VARCHAR(32) DEFAULT 'Pending',
  channel VARCHAR(32) DEFAULT 'WhatsApp',
  payment_method VARCHAR(64) DEFAULT 'WhatsApp Order / Manual Confirmation',
  payment_status VARCHAR(32) DEFAULT 'Pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Contact Inquiries Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(128) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  email VARCHAR(128),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(32) DEFAULT 'Unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for fast lookup
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_new_arrival ON products(is_new_arrival);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_messages(status);
