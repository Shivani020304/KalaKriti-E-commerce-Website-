# 🌿 KalaKriti — Handcrafted Mandala Art Store

A complete e-commerce website for handcrafted Lippen Art — clay-based mandala art embedded with real mirrors.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your actual Razorpay key and WhatsApp number

# 3. Start development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── layout/       # Navbar, Footer
│   ├── ui/           # Button, Badge, StarRating, Loader
│   ├── home/         # Hero, Featured, About, Stats, Testimonials
│   ├── shop/         # ProductCard, ProductGrid, Filters, Sort
│   ├── product/      # ImageGallery, ProductInfo, Reviews
│   ├── cart/         # CartDrawer, CartItem
│   └── common/       # WhatsApp, BackToTop, ScrollProgress
├── pages/            # Route pages
├── context/          # Cart & Wishlist state management
├── data/             # Product catalog & reviews
├── hooks/            # Custom React hooks
└── utils/            # Razorpay, formatting, file upload
```

## 🎨 Design System

- **Theme**: "Nature's Canvas" — Fresh, calm, organic
- **Primary**: Forest Green `#2D6A4F`
- **Accent**: Warm Gold `#D4A843`
- **Fonts**: Playfair Display (headings) + DM Sans (body)

## 💳 Payment Integration

This project uses **Razorpay** for payments. To enable:

1. Create a Razorpay account at [razorpay.com](https://razorpay.com)
2. Get your test/live API key
3. Add it to `.env` as `VITE_RAZORPAY_KEY`

## 📱 Features

- 🏪 18 products across 6 categories
- 🛒 Cart with localStorage persistence
- ❤️ Wishlist functionality
- 🔍 Filter & sort products
- 📷 Image gallery with zoom & lightbox
- 📱 Fully responsive (mobile-first)
- ✨ Framer Motion animations
- 💬 WhatsApp integration
- 🎨 Custom order form with image upload
- 💳 Razorpay payment gateway
- ⭐ Customer reviews & ratings

## 🛠 Tech Stack

- React 18 + Vite
- React Router v6
- Tailwind CSS 3
- Framer Motion
- Lucide React Icons
- React Hook Form
- React Hot Toast
- Yet Another React Lightbox

## 📦 Build for Production

```bash
npm run build
npm run preview
```

## 📄 License

© 2024 KalaKriti. All rights reserved.
