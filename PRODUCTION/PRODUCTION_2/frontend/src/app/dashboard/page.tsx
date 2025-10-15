'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Stats {
  totalVerifications: number;
  thisMonth: number;
  successRate: number;
  avgResponseTime: number;
}

interface Verification {
  id: string;
  type: string;
  value: string;
  status: string;
  riskScore: number;
  date: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({
    totalVerifications: 1247,
    thisMonth: 342,
    successRate: 98.5,
    avgResponseTime: 1.8,
  });

  const [recentVerifications] = useState<Verification[]>([
    {
      id: '1',
      type: 'Email',
      value: 'user@example.com',
      status: 'Valid',
      riskScore: 95,
      date: '2024-10-14 10:30',
    },
    {
      id: '2',
      type: 'Phone',
      value: '+1234567890',
      status: 'Valid',
      riskScore: 88,
      date: '2024-10-14 09:15',
    },
    {
      id: '3',
      type: 'Identity',
      value: 'John Doe',
      status: 'Valid',
      riskScore: 92,
      date: '2024-10-14 08:45',
    },
    {
      id: '4',
      type: 'Document',
      value: 'ABC123456',
      status: 'Invalid',
      riskScore: 45,
      date: '2024-10-13 16:20',
    },
    {
      id: '5',
      type: 'Email',
      value: 'test@test.com',
      status: 'Valid',
      riskScore: 78,
      date: '2024-10-13 14:10',
    },
  ]);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const getStatusColor = (status: string) => {
    return status === 'Valid' ? 'text-green-600' : 'text-red-600';
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              CheckMe
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/verify" className="text-gray-600 hover:text-gray-900">
                New Verification
              </Link>
              <Link href="/settings" className="text-gray-600 hover:text-gray-900">
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here&apos;s your verification overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-2">Total Verifications</div>
            <div className="text-3xl font-bold text-gray-900">
              {stats.totalVerifications.toLocaleString()}
            </div>
            <div className="text-sm text-green-600 mt-2">↑ All time</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-2">This Month</div>
            <div className="text-3xl font-bold text-gray-900">{stats.thisMonth}</div>
            <div className="text-sm text-green-600 mt-2">↑ 12% from last month</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-2">Success Rate</div>
            <div className="text-3xl font-bold text-gray-900">{stats.successRate}%</div>
            <div className="text-sm text-green-600 mt-2">↑ 0.5% improvement</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-2">Avg Response Time</div>
            <div className="text-3xl font-bold text-gray-900">{stats.avgResponseTime}s</div>
            <div className="text-sm text-green-600 mt-2">↓ 0.2s faster</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link
              href="/verify"
              className="flex items-center justify-center bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700"
            >
              <span className="text-2xl mr-2">+</span>
              New Verification
            </Link>
            <Link
              href="/api-keys"
              className="flex items-center justify-center bg-gray-200 text-gray-900 px-6 py-4 rounded-lg hover:bg-gray-300"
            >
              <span className="text-2xl mr-2">🔑</span>
              API Keys
            </Link>
            <Link
              href="/analytics"
              className="flex items-center justify-center bg-gray-200 text-gray-900 px-6 py-4 rounded-lg hover:bg-gray-300"
            >
              <span className="text-2xl mr-2">📊</span>
              Analytics
            </Link>
            <Link
              href="/docs"
              className="flex items-center justify-center bg-gray-200 text-gray-900 px-6 py-4 rounded-lg hover:bg-gray-300"
            >
              <span className="text-2xl mr-2">📚</span>
              Documentation
            </Link>
          </div>
        </div>

        {/* Recent Verifications */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Recent Verifications</h2>
              <Link href="/verifications" className="text-blue-600 hover:text-blue-700">
                View All →
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Risk Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentVerifications.map((verification) => (
                  <tr key={verification.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                        {verification.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {verification.value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${getStatusColor(verification.status)}`}>
                        {verification.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${getRiskColor(verification.riskScore)}`}>
                        {verification.riskScore}/100
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {verification.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-blue-600 hover:text-blue-700 mr-3">View</button>
                      <button className="text-gray-600 hover:text-gray-700">Download</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Usage & Billing */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold mb-4">Monthly Usage</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Verifications Used</span>
                  <span className="font-medium">342 / 1,000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '34.2%' }}></div>
                </div>
              </div>
              <div className="text-sm text-gray-600">658 verifications remaining this month</div>
              <Link
                href="/upgrade"
                className="block text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Upgrade Plan
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold mb-4">Current Plan</h3>
            <div className="space-y-4">
              <div>
                <div className="text-2xl font-bold text-gray-900">Free Plan</div>
                <div className="text-gray-600">1,000 verifications/month</div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  All core features
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Community support
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  API access
                </li>
              </ul>
              <Link
                href="/pricing"
                className="block text-center bg-gray-200 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                View All Plans
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

