'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, AuthState, HARDCODED_USERS } from './types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false
  });
  const router = useRouter();

  useEffect(() => {
    // Check for stored auth data on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setAuthState({
        user: JSON.parse(storedUser),
        isAuthenticated: true
      });
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call with hardcoded users
    const user = HARDCODED_USERS.find(u => u.email === email && u.password === password);
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      setAuthState({
        user: userWithoutPassword,
        isAuthenticated: true
      });
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false
    });
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout
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