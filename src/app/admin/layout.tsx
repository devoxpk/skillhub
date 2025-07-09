'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';

const adminRoutes = [
  { path: '/admin/dashboard', label: 'General Table Layout' },
  { path: '/admin/users', label: 'Users' },
  { path: '/admin/collections', label: 'Collections' },
  { path: '/admin/reviews', label: 'Reviews' },
  { path: '/admin/transactions', label: 'Transactions' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/login');
    }
  }, [user, router]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <div className="hidden sm:flex sm:space-x-4">
                {adminRoutes.map((route) => (
                  <Link
                    key={route.path}
                    href={route.path}
                    className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-blue-600"
                  >
                    {route.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{user.email}</span>
              <Button
                onClick={logout}
                variant="outline"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
