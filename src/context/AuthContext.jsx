'use client';
import React, { createContext, useContext } from 'react';
import { authClient } from '../lib/auth-client.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user || null;
  const isAdmin = Boolean(user?.role === 'admin');

  return (
    <AuthContext.Provider value={{ user, session, isPending, isAdmin, authClient }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used within AuthProvider');
  return value;
}
