'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  email: string;
  role: 'student' | 'instructor' | 'admin';
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded credentials for demo
const DEMO_USERS = [
  { email: 'admin@gmail.com', password: 'password', role: 'admin' },
  { email: 'instructor@gmail.com', password: 'password', role: 'instructor' },
  { email: 'student@gmail.com', password: 'password', role: 'student' },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check for stored user data on mount
    const userCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('user='));
    if (userCookie) {
      const userData = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));
      setUser(userData);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const foundUser = DEMO_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const userData = {
        email: foundUser.email,
        role: foundUser.role as User['role'],
      };
      setUser(userData);
      // Set cookie with 7 days expiry
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7);
      document.cookie = `user=${encodeURIComponent(JSON.stringify(userData))}; expires=${expiryDate.toUTCString()}; path=/`;
 // Redirect based on role
      if(foundUser?.role === 'admin'){
        router.push('/admin/dashboard');
      } else if(foundUser?.role === 'instructor'){
        router.push('/instructor/dashboard');
      } else {
        router.push('/student/dashboard');
      }
     
      
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}