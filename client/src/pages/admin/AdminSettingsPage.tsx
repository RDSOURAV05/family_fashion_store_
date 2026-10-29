import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { StoreSettings } from '../../types';

export const AdminSettingsPage: React.FC = () => {
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [settings, setSettings] = useState<StoreSettings>({
    storeName: 'Chic Store',
    phone: '+91 82816 10328',
    whatsappNumber: '918281610328',
    instagramUrl: 'https://www.instagram.com/_chicstore.in?rpxt=MTdnY3F6YjV2YWRiNg==',
    announcementBarText: 'Discover Your Everyday Elegance',
    heroHeadline: 'Elegance, Woven Into Every Look.',
    heroSupportingText: 'Discover timeless sarees, beautiful kurtas, and styles that celebrate you.',
    aboutText: 'At Chic Store, we believe every outfit tells a story. From graceful traditional wear to effortlessly modern styles, discover pieces that bring comfort, confidence, and elegance to your wardrobe.',
    updatedAt: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    fetch('/api/settings')
      .then(r => r.json())
      .then(data => {
        if (data.success) setSettings(data.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isAuthenticated, navigate]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Failed to update settings');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      setError(err.message || 'Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header Breadcrumb */}
        <div>
          <Link to="/admin/dashboard" className="inline-flex items-center gap-1.5 text-xs text-burgundy-800 hover:underline mb-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="font-serif text-3xl text-charcoal-900 font-semibold">
            Boutique Information & Banner Configuration
          </h1>
          <p className="text-xs text-charcoal-700 mt-1">
            Update customer-facing announcements, editorial headlines, and boutique brand text.
          </p>
        </div>

        {success && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Settings updated successfully! Changes are live on the boutique storefront.</span>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white p-6 sm:p-10 rounded-3xl border border-cream-200 shadow-soft space-y-6">
          
          {/* Announcement Bar */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-800">
              Top Announcement Bar Message
            </label>
            <input
              type="text"
              value={settings.announcementBarText}
              onChange={e => setSettings({ ...settings, announcementBarText: e.target.value })}
              className="w-full py-2.5 px-4 rounded-xl border border-cream-300 text-sm text-charcoal-900 focus:outline-none focus:border-burgundy-800"
            />
            <p className="text-[11px] text-charcoal-700">
              Appears at the very top of all pages (e.g. "Discover Your Everyday Elegance").
            </p>
          </div>

          {/* Hero Banner Section */}
          <div className="pt-6 border-t border-cream-200 space-y-4">
            <h3 className="font-serif text-lg font-semibold text-charcoal-900">
              Homepage Hero Banner Copy
            </h3>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-800 mb-1">
                Main Headline
              </label>
              <input
                type="text"
                value={settings.heroHeadline}
                onChange={e => setSettings({ ...settings, heroHeadline: e.target.value })}
                className="w-full py-2.5 px-4 rounded-xl border border-cream-300 text-sm text-charcoal-900 focus:outline-none focus:border-burgundy-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-800 mb-1">
                Supporting Text
              </label>
              <textarea
                rows={2}
                value={settings.heroSupportingText}
                onChange={e => setSettings({ ...settings, heroSupportingText: e.target.value })}
                className="w-full py-2.5 px-4 rounded-xl border border-cream-300 text-sm text-charcoal-900 focus:outline-none focus:border-burgundy-800"
              />
            </div>
          </div>

          {/* About Chic Store Section */}
          <div className="pt-6 border-t border-cream-200 space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-800">
              About Chic Store Brand Story Copy
            </label>
            <textarea
              rows={4}
              value={settings.aboutText}
              onChange={e => setSettings({ ...settings, aboutText: e.target.value })}
              className="w-full py-2.5 px-4 rounded-xl border border-cream-300 text-sm text-charcoal-900 focus:outline-none focus:border-burgundy-800 leading-relaxed font-light"
            />
            <p className="text-[11px] text-charcoal-700">
              Featured on the homepage philosophy section.
            </p>
          </div>

          {/* Locked Brand Info Section */}
          <div className="pt-6 border-t border-cream-200 bg-cream-50/60 p-4 rounded-2xl border border-cream-200/60 space-y-3">
            <h4 className="font-serif text-sm font-semibold text-charcoal-900">
              Official Store Brand Identifiers
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-charcoal-700 block">WhatsApp Number:</span>
                <strong className="text-charcoal-900">+91 82816 10328 (wa.me/918281610328)</strong>
              </div>
              <div>
                <span className="text-charcoal-700 block">Official Instagram Profile:</span>
                <strong className="text-charcoal-900">@_chicstore.in</strong>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3.5 rounded-full bg-burgundy-800 hover:bg-burgundy-900 disabled:opacity-75 text-white font-medium text-xs uppercase tracking-wider transition shadow-md flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Settings'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
