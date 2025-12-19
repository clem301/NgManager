'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, getCurrentUser, logout as authLogout, refreshUserRole } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger l'utilisateur depuis localStorage uniquement
    const currentUser = getCurrentUser();
    console.log('AuthContext: Loading user from localStorage:', currentUser);
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  const refreshUser = async () => {
    if (user) {
      const updatedUser = await refreshUserRole(user.id);
      if (updatedUser) {
        setUser(updatedUser);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
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
