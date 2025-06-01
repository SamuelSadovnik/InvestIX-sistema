import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userType: 'admin' | 'gestor' | 'proprietario' | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userType, setUserType] = useState<'admin' | 'gestor' | 'proprietario' | null>(null);

  //   useEffect(() => {
  //     const savedAuth = localStorage.getItem('isAuthenticated');
  //     const savedType = localStorage.getItem('userType');
  //     if (savedAuth === 'true' && savedType) {
  //       setIsAuthenticated(true);
  //       setUserType(savedType as any);
  //     }
  //   }, []);

  const login = (username: string, password: string): boolean => {
    if (username === 'admin' && password === 'Admin123') {
      setIsAuthenticated(true);
      setUserType('admin');
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userType', 'admin');
      localStorage.setItem('username', 'admin');
      return true;
    }
    if (username === 'gestor' && password === 'Gestor123') {
      setIsAuthenticated(true);
      setUserType('gestor');
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userType', 'gestor');
      localStorage.setItem('username', 'gestor');
      return true;
    }
    if (username === 'proprietario' && password === 'Proprietario123') {
      setIsAuthenticated(true);
      setUserType('proprietario');
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userType', 'proprietario');
      localStorage.setItem('username', 'proprietario');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
