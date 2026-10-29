# Chic Store — Premium Women's Fashion Boutique

A modern, elegant, fully responsive e-commerce web platform built for **Chic Store**, specializing in curated sarees, kurtas, kurta sets, ethnic wear, dresses, tops, and contemporary women's clothing.

Designed with warm ivory tones, blush pink accents, deep burgundy highlights, and seamless WhatsApp ordering tailored for the Indian boutique market.

---

## 🌟 Brand Information & Official Social Channels

- **Brand Name:** Chic Store
- **Business:** Women's Fashion & Clothing Boutique
- **Market:** India | **Currency:** Indian Rupees (₹)
- **Official WhatsApp Number:** `+91 82816 10328`
  - Direct WhatsApp URL: [https://wa.me/918281610328](https://wa.me/918281610328)
- **Official Instagram Profile:** [@_chicstore.in](https://www.instagram.com/_chicstore.in?rpxt=MTdnY3F6YjV2YWRiNg==)
  - Profile URL: [https://www.instagram.com/_chicstore.in?rpxt=MTdnY3F6YjV2YWRiNg==](https://www.instagram.com/_chicstore.in?rpxt=MTdnY3F6YjV2YWRiNg==)
- **Direct Phone Contact:** `+91 82816 10328` (`tel:+918281610328`)

---

## 📱 Official WhatsApp & Instagram Features (Mandatory Requirements)

### Official WhatsApp Integration:
1. **Floating WhatsApp Button:** Fixed at the bottom-right corner of shopping pages with green brand bubble (`#25D366`), white handset icon, hover pulse, and prefilled boutique greeting.
2. **Top Announcement Bar:** Direct WhatsApp click-to-chat with phone number.
3. **Product Detail Enquiry Button:** Dedicated button featuring the official WhatsApp brand icon that auto-formats a prefilled message containing the garment name, selected size, selected color, price, and exact product URL.
4. **Shopping Bag & Checkout WhatsApp Order:** Primary checkout method generating an itemized message with:
   - Order Reference Number (`CHIC-XXXXXX`)
   - Customer Full Name, Mobile Number, Delivery Address, City, State, PIN Code
   - Product breakdown with sizes, colors, quantities, and line totals
   - Subtotal, shipping, and grand total
5. **Contact Page:** Direct WhatsApp chat card for personalized styling assistance.

### Official Instagram Integration:
1. **Header Icon:** Clickable official brand logo in top navigation.
2. **Mobile Menu:** Dedicated Instagram action button in drawer.
3. **Homepage Instagram Showcase:** Section titled *"Follow Our Style on Instagram"* featuring an authentic gradient button and a curated fashion photo gallery.
4. **Footer:** Official Instagram icon linked with secure external attributes.
5. **Contact Page:** Community card with direct profile link.

---

## 🏗️ Technology Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS, Lucide React, React Icons (`FaWhatsapp`, `FaInstagram`), React Router DOM v6, Vite.
- **Backend:** Node.js, Express, TypeScript (executed via `tsx`), CORS, JSON Web Tokens (JWT), Bcrypt.js.
- **Database:**
  - **Out-of-the-box:** High-performance, zero-daemon JSON file persistence with atomic writes in `server/data/store.json`.
  - **SQL Schema:** Full PostgreSQL and MySQL relational schema provided in `server/schema.sql` for enterprise database deployment.
- **Authentication:** Server-side JWT authentication with Bcrypt password hashing for protected admin routes.

---

## 🚀 Quick Start & Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### 1. Install Dependencies
Run the following in the project root:
```bash
# Install root, server, and client packages
npm run install:all
```
Or manually:
```bash
npm install
npm install --prefix server
npm install --prefix client
```

### 2. Configure Environment Variables
Copy the example environment configuration:
```bash
# Windows PowerShell
Copy-Item .env.example .env

# macOS / Linux
cp .env.example .env
```

### 3. Run Development Server
Start both the Express backend (`http://localhost:5000`) and the Vite frontend (`http://localhost:5173`) concurrently:
```bash
npm run dev
```

Open your browser at:
👉 **[http://localhost:5173](http://localhost:5173)**

---

## 🔐 Administrator Dashboard

Chic Store includes a password-protected administration portal for boutique owners to manage inventory, update prices, track WhatsApp orders, and edit announcements.

- **Admin URL:** [http://localhost:5173/admin/login](http://localhost:5173/admin/login)
- **Default Username:** `chicadmin`
- **Default Password:** `ChicStore@2026!`

*(You can change credentials and JWT secret in `.env` and via the database).*

### Admin Features:
- **Product Management:** Add new garments, edit descriptions, adjust prices and discounts, upload image URLs, set sizes/colors, manage stock count, and toggle Featured / New Arrival status.
- **WhatsApp Orders Management:** Review orders placed through the website, inspect customer delivery addresses, update order statuses (*Pending*, *Contacted on WhatsApp*, *Processing*, *Shipped*, *Delivered*, *Cancelled*), and click directly to WhatsApp message the customer.
- **Store Configuration:** Update the top announcement bar text, homepage hero banner headline, and brand story.
- **Customer Messages:** View inquiries submitted through the contact page form.

---

## 👗 Sample Boutique Garments Included

1. **Elegant Floral Cotton Saree** — Pure Mulmul Cotton with woven zari border (₹1,899)
2. **Classic Festive Silk-Style Saree** — Premium Art Silk with heavy woven zari border (₹3,499)
3. **Everyday Printed Kurta** — 100% Breathable Combed Cotton (₹999)
4. **Elegant Straight-Cut Kurta Set** — 3-Piece ensemble with organza dupatta (₹2,299)
5. **Embroidered Festive Kurta Set** — Pure Chanderi Silk with metallic threadwork (₹3,899)
6. **Floral Anarkali Dress** — Flowy Georgette 32-kali flare silhouette (₹2,799)
7. **Minimal Everyday Tunic** — Slub Rayon with mandarin collar (₹849)
8. **Contemporary Women's Co-ord Set** — Structured Linen-Cotton shirt & wide-leg trousers (₹2,499)

*(Clearly marked as development sample inventory. Real boutique stock can be updated anytime in the admin dashboard).*

---

## 💳 Future Online Payment Gateway (Razorpay) Integration Guide

The checkout architecture is designed to accommodate online payments (UPI, Cards, Netbanking):
1. Register for a merchant account on [Razorpay](https://razorpay.com).
2. Obtain your `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`.
3. Add these credentials to your `.env` file.
4. Mount the Razorpay payment verification route in `server/src/routes/orders.ts` and initialize the Razorpay checkout script on `CheckoutPage.tsx`.

---

## 📦 Production Build & Deployment

To build the client application for production:
```bash
npm run build
```
This generates optimized static production assets in `client/dist`.

To run the production server:
```bash
npm start
```
The Express server serves the static frontend alongside the API from a single unified port (`PORT=5000`).

---

## 📄 License & Ownership
Created for **Chic Store — Women's Fashion Boutique**. All rights reserved.
