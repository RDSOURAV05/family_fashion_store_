import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import { Product, Order, ContactMessage, StoreSettings, AdminUser } from '../types.js';
import { sampleProducts, initialSettings } from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const DB_FILE = path.join(DATA_DIR, 'store.json');

interface DatabaseSchema {
  products: Product[];
  orders: Order[];
  contactMessages: ContactMessage[];
  settings: StoreSettings;
  adminUsers: AdminUser[];
}

class StoreDatabase {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.initialize();
  }

  private initialize(): DatabaseSchema {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        // Ensure all required collections exist
        return {
          products: parsed.products || sampleProducts,
          orders: parsed.orders || [],
          contactMessages: parsed.contactMessages || [],
          settings: parsed.settings || initialSettings,
          adminUsers: parsed.adminUsers && parsed.adminUsers.length > 0 ? parsed.adminUsers : this.getDefaultAdminUsers()
        };
      } catch (err) {
        console.error('Error reading database file, recreating defaults:', err);
      }
    }

    // Default initial data
    const defaultData: DatabaseSchema = {
      products: [...sampleProducts],
      orders: [],
      contactMessages: [],
      settings: { ...initialSettings },
      adminUsers: this.getDefaultAdminUsers()
    };

    this.saveData(defaultData);
    return defaultData;
  }

  private getDefaultAdminUsers(): AdminUser[] {
    // Default admin: chicadmin / ChicStore@2026!
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync('ChicStore@2026!', salt);
    return [
      {
        id: 'admin-1',
        username: 'chicadmin',
        passwordHash,
        name: 'Store Manager',
        role: 'admin'
      }
    ];
  }

  private saveData(dataToSave: DatabaseSchema = this.data) {
    try {
      const tempPath = `${DB_FILE}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(dataToSave, null, 2), 'utf-8');
      fs.renameSync(tempPath, DB_FILE);
    } catch (err) {
      console.error('Failed to save database file:', err);
    }
  }

  // --- Products ---
  public getProducts(): Product[] {
    return this.data.products;
  }

  public getProductById(id: string): Product | undefined {
    return this.data.products.find(p => p.id === id);
  }

  public getProductBySlug(slug: string): Product | undefined {
    return this.data.products.find(p => p.slug === slug);
  }

  public createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product {
    const now = new Date().toISOString();
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: now,
      updatedAt: now
    };
    this.data.products.unshift(newProduct);
    this.saveData();
    return newProduct;
  }

  public updateProduct(id: string, updates: Partial<Omit<Product, 'id' | 'createdAt'>>): Product | null {
    const index = this.data.products.findIndex(p => p.id === id);
    if (index === -1) return null;

    const updated: Product = {
      ...this.data.products[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.data.products[index] = updated;
    this.saveData();
    return updated;
  }

  public deleteProduct(id: string): boolean {
    const initialLength = this.data.products.length;
    this.data.products = this.data.products.filter(p => p.id !== id);
    if (this.data.products.length !== initialLength) {
      this.saveData();
      return true;
    }
    return false;
  }

  // --- Orders ---
  public getOrders(): Order[] {
    return this.data.orders;
  }

  public getOrderById(id: string): Order | undefined {
    return this.data.orders.find(o => o.id === id);
  }

  public createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Order {
    const now = new Date().toISOString();
    const orderNumber = `CHIC-${Date.now().toString().slice(-6)}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: now,
      updatedAt: now
    };
    this.data.orders.unshift(newOrder);
    this.saveData();
    return newOrder;
  }

  public updateOrderStatus(id: string, status: Order['status']): Order | null {
    const order = this.data.orders.find(o => o.id === id);
    if (!order) return null;
    order.status = status;
    order.updatedAt = new Date().toISOString();
    this.saveData();
    return order;
  }

  // --- Contact Messages ---
  public getContactMessages(): ContactMessage[] {
    return this.data.contactMessages;
  }

  public createContactMessage(msg: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>): ContactMessage {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      status: 'Unread',
      createdAt: new Date().toISOString()
    };
    this.data.contactMessages.unshift(newMsg);
    this.saveData();
    return newMsg;
  }

  public updateContactMessageStatus(id: string, status: ContactMessage['status']): ContactMessage | null {
    const msg = this.data.contactMessages.find(m => m.id === id);
    if (!msg) return null;
    msg.status = status;
    this.saveData();
    return msg;
  }

  // --- Settings ---
  public getSettings(): StoreSettings {
    return this.data.settings;
  }

  public updateSettings(updates: Partial<StoreSettings>): StoreSettings {
    this.data.settings = {
      ...this.data.settings,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.saveData();
    return this.data.settings;
  }

  // --- Admin ---
  public findAdminByUsername(username: string): AdminUser | undefined {
    return this.data.adminUsers.find(u => u.username.toLowerCase() === username.toLowerCase());
  }

  public findAdminById(id: string): AdminUser | undefined {
    return this.data.adminUsers.find(u => u.id === id);
  }
}

export const db = new StoreDatabase();
