import React, { useState, useEffect } from 'react';
import { HeroBanner } from '../components/home/HeroBanner';
import { CategoryBanners } from '../components/home/CategoryBanners';
import { FeaturedSection } from '../components/home/FeaturedSection';
import { NewArrivalsSection } from '../components/home/NewArrivalsSection';
import { EditorialBanner } from '../components/home/EditorialBanner';
import { AboutStory } from '../components/home/AboutStory';
import { InstagramFeed } from '../components/home/InstagramFeed';
import { FloatingWhatsApp } from '../components/layout/FloatingWhatsApp';
import { Product, StoreSettings } from '../types';
import { api } from '../utils/api';
import { fallbackProducts, fallbackSettings } from '../data/initialProducts';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [settings, setSettings] = useState<StoreSettings>(fallbackSettings);

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    // Fetch live products
    api.getProducts().then(res => {
      if (res.data && res.data.length > 0) {
        setProducts(res.data);
      }
    });

    // Fetch store settings
    api.getSettings().then(res => {
      if (res) setSettings(res);
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Editorial Hero Section */}
      <HeroBanner
        headline={settings.heroHeadline}
        supportingText={settings.heroSupportingText}
      />

      {/* Shop by Category Banners */}
      <CategoryBanners />

      {/* Featured Products Grid */}
      <FeaturedSection products={products} />

      {/* Seasonal / Festive Editorial Highlight Banner */}
      <EditorialBanner />

      {/* New Arrivals Section */}
      <NewArrivalsSection products={products} />

      {/* About Chic Store Brand Story */}
      <AboutStory aboutText={settings.aboutText} />

      {/* Follow on Instagram Feed with Brand Logo */}
      <InstagramFeed />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />
    </div>
  );
};
