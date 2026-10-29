import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminInfo {
  id: string;
  username: string;
  name: string;
  role: string;
}

interface AuthContextType {
  token: string | null;
  admin: AdminInfo | null;
  isAuthenticated: boolean;
  login: (token: string, admin: AdminInfo) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('chic_admin_token'));
  const [admin, setAdmin] = useState<AdminInfo | null>(() => {
    try {
      const saved = localStorage.getItem('chic_admin_info');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (newToken: string, adminInfo: AdminInfo) => {
    setToken(newToken);
    setAdmin(adminInfo);
    localStorage.setItem('chic_admin_token', newToken);
    localStorage.setItem('chic_admin_info', JSON.stringify(adminInfo));
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('chic_admin_token');
    localStorage.removeItem('chic_admin_info');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        admin,
        isAuthenticated: !!token,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
