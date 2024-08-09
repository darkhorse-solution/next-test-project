// context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  user: { email: string } | null;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);

  const login = (email: string) => {
    setUser({ email });
    // You can also store the user info in local storage or cookies here
  };

  const logout = () => {
    setUser(null);
    // Clear user info from local storage or cookies here
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
