import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { AuthProvider } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Skillhub - signup - page',
  description: 'Learn and grow with Skillhub',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <AuthProvider>{children}</AuthProvider>
          <Toaster />
      </body>
    </html>
  );
}
