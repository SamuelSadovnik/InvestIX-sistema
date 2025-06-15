import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userType: 'admin' | 'gestor' | 'proprietario' | null;
  login: (email: string, password: string) => Promise<boolean>;
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tipo = localStorage.getItem('userType');
    if (token && tipo) {
      setIsAuthenticated(true);
      setUserType(tipo as 'admin' | 'gestor' | 'proprietario');
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      const tipo = data.user.userType.toLowerCase() as 'admin' | 'gestor' | 'proprietario';
      localStorage.setItem('token', data.token);
      localStorage.setItem('userType', tipo);
      localStorage.setItem('email', email);

      setIsAuthenticated(true);
      setUserType(tipo);
      return true;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false;
    }
  };

  const logout = () => {
  setIsAuthenticated(false);
  setUserType(null);
  localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
