import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, AlertCircle, ArrowLeft, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          login(data.token, data.admin);
          navigate('/admin/dashboard');
          return;
        }
      }
      
      // Fallback for static hosting (e.g. GitHub Pages)
      if (username === 'chicadmin' && password === 'ChicStore@2026!') {
        login('gh_pages_admin_token_2026', {
          id: 'admin-1',
          username: 'chicadmin',
          name: 'Store Manager',
          role: 'admin'
        });
        navigate('/admin/dashboard');
        return;
      }

      throw new Error('Invalid username or password');
    } catch (err: any) {
      // If server unreachable, check credentials for static demo
      if (username === 'chicadmin' && password === 'ChicStore@2026!') {
        login('gh_pages_admin_token_2026', {
          id: 'admin-1',
          username: 'chicadmin',
          name: 'Store Manager',
          role: 'admin'
        });
        navigate('/admin/dashboard');
        return;
      }
      setError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-block mb-4">
          <span className="font-serif text-3xl tracking-[0.25em] font-medium text-burgundy-900 uppercase">
            CHIC STORE
          </span>
          <span className="block text-[9px] tracking-[0.35em] text-charcoal-700 uppercase">
            Staff & Boutique Admin
          </span>
        </Link>
        <h2 className="font-serif text-2xl text-charcoal-900">
          Administrator Login
        </h2>
        <p className="text-xs text-charcoal-700 mt-1">
          Manage products, orders, inventory, and boutique settings
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-elevated rounded-3xl border border-cream-200">
          
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="mb-6 p-3 rounded-xl bg-rose-50 border border-rose-200/60 text-[11px] text-charcoal-800">
            <span className="font-semibold text-burgundy-800">Initial Setup Credentials:</span>
            <div className="mt-1 font-mono text-[11px]">
              User: <span className="text-burgundy-900 font-semibold">chicadmin</span><br />
              Pass: <span className="text-burgundy-900 font-semibold">ChicStore@2026!</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-800 mb-1.5">
                Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-charcoal-700 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="chicadmin"
                  className="w-full py-2.5 pl-10 pr-4 rounded-xl border border-cream-300 text-sm text-charcoal-900 bg-cream-50/50 focus:outline-none focus:border-burgundy-700 focus:ring-1 focus:ring-burgundy-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-800 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-charcoal-700 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full py-2.5 pl-10 pr-4 rounded-xl border border-cream-300 text-sm text-charcoal-900 bg-cream-50/50 focus:outline-none focus:border-burgundy-700 focus:ring-1 focus:ring-burgundy-700"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-full bg-burgundy-800 hover:bg-burgundy-900 disabled:opacity-75 text-white font-medium text-sm transition shadow-md flex items-center justify-center gap-2 mt-2"
            >
              <Shield className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-charcoal-700 hover:text-burgundy-800">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Boutique</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};
