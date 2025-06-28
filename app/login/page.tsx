'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '../components/Logo';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/dashboard');
      } else {
        setError(data.error || 'Failed to login');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-rose-50">
      <div className="card-elevated p-8 w-full max-w-md animate-scaleIn">
        <div className="flex justify-center mb-8">
          <Logo linkToHome={false} />
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="parent@example.com"
              className="input text-base"
              required
              disabled={loading}
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center animate-fadeIn">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn btn-primary py-3 text-base font-semibold gradient-primary"
          >
            {loading ? 'Logging in...' : 'Continue'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Enter your email to access your parent account
        </p>
      </div>
    </div>
  );
}