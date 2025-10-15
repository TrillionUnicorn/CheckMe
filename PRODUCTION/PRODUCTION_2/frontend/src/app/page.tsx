'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      console.log('Submitted:', email);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">CheckMe</div>
            <div className="space-x-4">
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Universal Identity Verification
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            70-90% cheaper than competitors. Open source. Developer-first.
            Verify identities in seconds with our AI-powered platform.
          </p>

          <div className="flex justify-center gap-4 mb-12">
            <Link
              href="/verify"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700"
            >
              Start Free Verification
            </Link>
            <Link
              href="/docs"
              className="bg-gray-200 text-gray-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-300"
            >
              View Documentation
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-blue-600">100K+</div>
              <div className="text-gray-600">Verifications</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">99.2%</div>
              <div className="text-gray-600">Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">&lt;2s</div>
              <div className="text-gray-600">Avg Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose CheckMe?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">70-90% Cheaper</h3>
              <p className="text-gray-600">
                Starting at $0.10 per verification vs $1-10 from competitors
              </p>
            </div>

            <div className="p-6 border rounded-lg">
              <div className="text-4xl mb-4">🔓</div>
              <h3 className="text-xl font-bold mb-2">Open Source</h3>
              <p className="text-gray-600">
                MIT licensed. No vendor lock-in. Full transparency.
              </p>
            </div>

            <div className="p-6 border rounded-lg">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Developer First</h3>
              <p className="text-gray-600">
                10+ SDKs, excellent docs, integrate in minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free */}
            <div className="border rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Free</h3>
              <div className="text-4xl font-bold mb-4">$0</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  1,000 verifications/month
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  All core features
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Community support
                </li>
              </ul>
              <Link
                href="/signup"
                className="block text-center bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300"
              >
                Get Started
              </Link>
            </div>

            {/* Starter */}
            <div className="border-2 border-blue-600 rounded-lg p-8 relative">
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-lg text-sm">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-4">Starter</h3>
              <div className="text-4xl font-bold mb-4">
                $49<span className="text-lg text-gray-600">/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  5,000 verifications/month
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  $0.10 each additional
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Email support
                </li>
              </ul>
              <Link
                href="/signup"
                className="block text-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                Get Started
              </Link>
            </div>

            {/* Professional */}
            <div className="border rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Professional</h3>
              <div className="text-4xl font-bold mb-4">
                $199<span className="text-lg text-gray-600">/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  20,000 verifications/month
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  $0.08 each additional
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Priority support
                </li>
              </ul>
              <Link
                href="/signup"
                className="block text-center bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join the Waitlist</h2>
          <p className="text-xl text-blue-100 mb-8">
            Be the first to know when we launch new features
          </p>

          {submitted ? (
            <div className="bg-white text-green-600 px-6 py-4 rounded-lg font-semibold">
              ✓ Thanks! We&apos;ll be in touch soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              />
              <button
                type="submit"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
              >
                Join
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">CheckMe</div>
              <p className="text-gray-400">Universal identity verification platform</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/verify" className="hover:text-white">
                    Verification
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-white">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            © 2024 CheckMe. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

