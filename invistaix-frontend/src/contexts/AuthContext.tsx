import React, { createContext, useContext, useState, useEffect } from 'react';

type UserType = 'ADMIN' | 'GESTOR' | 'PROPRIETARIO';

interface User {
  id: string;
  email: string;
  username: string;
  userType: UserType;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  userType: UserType | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  token: string | null;
  validateSession: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook que retorna o contexto de autenticação, lançando erro se utilizado fora do AuthProvider
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);

  // Função para limpar dados de autenticação
  const clearAuthData = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Função para validar token no backend
  const validateTokenWithBackend = async (tokenToValidate: string): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:8080/api/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${tokenToValidate}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        const updatedUser: User = {
          id: userData.id,
          email: userData.email,
          username: userData.username,
          userType: userData.userType,
        };
        
        setUser(updatedUser);
        setToken(tokenToValidate);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        localStorage.setItem('token', tokenToValidate);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Erro ao validar token:', error);
      return false;
    }
  };

  // Função pública para validar sessão
  const validateSession = async (): Promise<boolean> => {
    if (!token) return false;
    return await validateTokenWithBackend(token);
  };

  // Efeito para validar token ao inicializar
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      
      try {
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        
        if (savedToken && savedUser) {
          const userData = JSON.parse(savedUser);
          
          const isValid = await validateTokenWithBackend(savedToken);
          
          if (!isValid) {
            clearAuthData();
          }
        }
      } catch (error) {
        console.error('Erro ao recuperar dados de autenticação:', error);
        clearAuthData();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const userData: User = {
          id: data.user.id,
          email: data.user.email,
          username: data.user.username,
          userType: data.user.userType,
        };

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(userData));

        setUser(userData);
        setToken(data.token);

        return { success: true };
      } else {
        return { 
          success: false, 
          error: data.message || 'Usuário ou senha inválidos' 
        };
      }
    } catch (error) {
      console.error('Erro na conexão:', error);
      return { 
        success: false, 
        error: 'Erro na conexão com o servidor' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearAuthData();
  };

  const isAuthenticated = !!user && !!token;
  const userType = user?.userType || null;

  const value: AuthContextType = {
    user,
    isAuthenticated,
    userType,
    loading,
    login,
    logout,
    token,
    validateSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useToken = () => {
  const { token } = useAuth();
  return token;
};

// Hook para requisições autenticadas com validação automática
export const useAuthenticatedFetch = () => {
  const { token, logout } = useAuth();
  
  const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
    if (!token) {
      throw new Error('Token não encontrado');
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401) {
      logout();
      throw new Error('Sessão expirada');
    }

    return response;
  };

  return authenticatedFetch;
};