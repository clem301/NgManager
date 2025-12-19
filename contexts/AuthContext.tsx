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
  // Charger immédiatement depuis localStorage pour éviter le flash
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      return getCurrentUser();
    }
    return null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Confirmer le chargement
    console.log('AuthContext: User loaded:', user);
    setLoading(false);
  }, [user]);

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
