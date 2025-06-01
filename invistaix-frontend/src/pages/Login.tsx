import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { LogIn, Building2, Lock, User } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, login } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 1000));

    const success = login(username, password);
    
    if (success) {
      toast.success('Login realizado com sucesso!');
    } else {
      toast.error('Credenciais inválidas');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Fundo com linhas diagonais mais organizadas */}
      <svg className="absolute inset-0 w-full h-full z-0" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#6ee7b7" strokeWidth="2" opacity="0.16">
          <line x1="0" y1="0" x2="100%" y2="100%" />
          <line x1="0" y1="100%" x2="100%" y2="0" />
          <line x1="20%" y1="0" x2="100%" y2="80%" />
          <line x1="0" y1="80%" x2="80%" y2="100%" />
          <line x1="40%" y1="0" x2="100%" y2="60%" />
          <line x1="0" y1="60%" x2="60%" y2="100%" />
          <line x1="60%" y1="0" x2="100%" y2="40%" />
          <line x1="0" y1="40%" x2="40%" y2="100%" />
          <line x1="80%" y1="0" x2="100%" y2="20%" />
          <line x1="0" y1="20%" x2="20%" y2="100%" />
        </g>
      </svg>
      <div className="w-full max-w-md relative z-10">
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-xl ring-1 ring-white/20">
          <CardHeader className="text-center space-y-6 pb-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg ring-4 ring-green-100">
              <Building2 className="h-10 w-10 text-white" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-2">
                InvistaIX
              </CardTitle>
              <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-400 mx-auto mt-3 rounded-full"></div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700 font-semibold flex items-center gap-2">
                  <User className="h-4 w-4 text-green-600" />
                  Usuário
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Digite seu usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="h-12 border-2 border-gray-200 focus:border-green-500 focus:ring-green-200 transition-all duration-200 bg-white/90"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-semibold flex items-center gap-2">
                  <Lock className="h-4 w-4 text-green-600" />
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 border-2 border-gray-200 focus:border-green-500 focus:ring-green-200 transition-all duration-200 bg-white/90"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 border-0"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Entrando...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <LogIn className="w-5 h-5" />
                    Entrar no Sistema
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
