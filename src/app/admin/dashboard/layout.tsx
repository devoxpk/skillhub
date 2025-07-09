'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Users, BookOpen, Star, CreditCard, LogOut } from 'lucide-react';
import ProtectedRoute from '@/app/components/auth/ProtectedRoute';
import toast, { Toaster } from 'react-hot-toast';

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const sidebarItems: SidebarItem[] = [
  { name: 'General',     href: '/admin/dashboard',            icon: LayoutGrid },
  { name: 'Users',       href: '/admin/dashboard/users',      icon: Users },
  { name: 'Collections', href: '/admin/dashboard/collections',icon: BookOpen },
  { name: 'Reviews',     href: '/admin/dashboard/reviews',    icon: Star },
  { name: 'Transactions',href: '/admin/dashboard/transactions',icon: CreditCard },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    
      <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 ${isSidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transform transition-all duration-200 ease-in-out`}
        >
          <div className="h-16 flex items-center ${isSidebarOpen ? 'justify-between px-4' : 'justify-center'} border-b border-gray-200">
            {isSidebarOpen && <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md hover:bg-gray-100"
              aria-label="Toggle sidebar"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isSidebarOpen ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
                />
              </svg>
            </button>
          </div>

          <nav className="mt-5 px-2">
            <div className="space-y-1">
              {sidebarItems.map(item => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${isSidebarOpen ? '' : 'justify-center'} ${isActive ? 'bg-teal-50 text-teal-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                  >
                    <item.icon
                      className={`mr-4 h-6 w-6 flex-shrink-0 ${isSidebarOpen ? '' : 'mr-0'} ${isActive ? 'text-teal-600' : 'text-gray-400 group-hover:text-gray-500'}`}
                    />
                    {isSidebarOpen && item.name}
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 ${isSidebarOpen ? '' : 'flex justify-center'}">
            <button
              onClick={() => toast('Logged out successfully')}
              className={`w-full flex items-center px-2 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md ${isSidebarOpen ? '' : 'justify-center'}`}
            >
              <LogOut className={`h-6 w-6 text-gray-400 ${isSidebarOpen ? 'mr-4' : ''}`} />
              {isSidebarOpen && 'Logout'}
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main
          className={`flex-1 transition-all duration-200 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}
        >
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>

        <Toaster position="top-right" />
      </div>
   
  );
}
