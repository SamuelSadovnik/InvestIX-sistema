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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (username && password) {
      alert('Login realizado com sucesso!');
    } else {
      toast.error('Credenciais inválidas');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Fundo com linhas diagonais animadas e com efeitos */}
      <svg className="absolute inset-0 w-full h-full z-0" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Gradiente para as linhas */}
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#6ee7b7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.2" />
          </linearGradient>
          
          {/* Filtro de brilho */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <g stroke="url(#lineGradient)" strokeWidth="2" filter="url(#glow)">
          {/* Linhas principais com animação */}
          <line x1="0" y1="0" x2="100%" y2="100%">
            <animate attributeName="stroke-opacity" values="0.1;0.4;0.1" dur="4s" repeatCount="indefinite" />
          </line>
          <line x1="0" y1="100%" x2="100%" y2="0%">
            <animate attributeName="stroke-opacity" values="0.4;0.1;0.4" dur="4s" repeatCount="indefinite" />
          </line>
          
          {/* Linhas secundárias com animação alternada */}
          <line x1="20%" y1="0" x2="100%" y2="80%">
            <animate attributeName="stroke-opacity" values="0.05;0.3;0.05" dur="6s" repeatCount="indefinite" begin="1s" />
          </line>
          <line x1="0" y1="80%" x2="80%" y2="100%">
            <animate attributeName="stroke-opacity" values="0.3;0.05;0.3" dur="6s" repeatCount="indefinite" begin="1s" />
          </line>
          
          <line x1="40%" y1="0" x2="100%" y2="60%">
            <animate attributeName="stroke-opacity" values="0.08;0.25;0.08" dur="5s" repeatCount="indefinite" begin="2s" />
          </line>
          <line x1="0" y1="60%" x2="60%" y2="100%">
            <animate attributeName="stroke-opacity" values="0.25;0.08;0.25" dur="5s" repeatCount="indefinite" begin="2s" />
          </line>
          
          <line x1="60%" y1="0" x2="100%" y2="40%">
            <animate attributeName="stroke-opacity" values="0.06;0.2;0.06" dur="7s" repeatCount="indefinite" begin="3s" />
          </line>
          <line x1="0" y1="40%" x2="40%" y2="100%">
            <animate attributeName="stroke-opacity" values="0.2;0.06;0.2" dur="7s" repeatCount="indefinite" begin="3s" />
          </line>
          
          <line x1="80%" y1="0" x2="100%" y2="20%">
            <animate attributeName="stroke-opacity" values="0.04;0.15;0.04" dur="8s" repeatCount="indefinite" begin="4s" />
          </line>
          <line x1="0" y1="20%" x2="20%" y2="100%">
            <animate attributeName="stroke-opacity" values="0.15;0.04;0.15" dur="8s" repeatCount="indefinite" begin="4s" />
          </line>
          
          <line x1="10%" y1="0" x2="90%" y2="100%">
            <animate attributeName="stroke-opacity" values="0.03;0.18;0.03" dur="9s" repeatCount="indefinite" begin="1.5s" />
          </line>
          <line x1="90%" y1="0" x2="10%" y2="100%">
            <animate attributeName="stroke-opacity" values="0.18;0.03;0.18" dur="9s" repeatCount="indefinite" begin="1.5s" />
          </line>
          
          <line x1="50%" y1="0" x2="100%" y2="50%">
            <animate attributeName="stroke-opacity" values="0.05;0.22;0.05" dur="6.5s" repeatCount="indefinite" begin="2.5s" />
          </line>
          <line x1="0" y1="50%" x2="50%" y2="100%">
            <animate attributeName="stroke-opacity" values="0.22;0.05;0.22" dur="6.5s" repeatCount="indefinite" begin="2.5s" />
          </line>
          
          <line x1="30%" y1="0" x2="70%" y2="100%">
            <animate attributeName="stroke-opacity" values="0.04;0.16;0.04" dur="10s" repeatCount="indefinite" begin="3.5s" />
          </line>
          <line x1="70%" y1="0" x2="30%" y2="100%">
            <animate attributeName="stroke-opacity" values="0.16;0.04;0.16" dur="10s" repeatCount="indefinite" begin="3.5s" />
          </line>
          
          <line x1="15%" y1="0" x2="100%" y2="85%">
            <animate attributeName="stroke-opacity" values="0.02;0.12;0.02" dur="11s" repeatCount="indefinite" begin="5s" />
          </line>
          <line x1="0" y1="85%" x2="85%" y2="100%">
            <animate attributeName="stroke-opacity" values="0.12;0.02;0.12" dur="11s" repeatCount="indefinite" begin="5s" />
          </line>
        </g>
        
        {/* Partículas flutuantes */}
        <g fill="#6ee7b7" opacity="0.3">
          <circle cx="10%" cy="20%" r="2">
            <animate attributeName="cy" values="20%;80%;20%" dur="15s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.1;0.6;0.1" dur="15s" repeatCount="indefinite" />
          </circle>
          <circle cx="90%" cy="70%" r="1.5">
            <animate attributeName="cy" values="70%;10%;70%" dur="12s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0.5;0.2" dur="12s" repeatCount="indefinite" />
          </circle>
          <circle cx="30%" cy="90%" r="1">
            <animate attributeName="cy" values="90%;30%;90%" dur="18s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.1;0.4;0.1" dur="18s" repeatCount="indefinite" />
          </circle>
          <circle cx="70%" cy="15%" r="1.8">
            <animate attributeName="cy" values="15%;85%;15%" dur="14s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.15;0.45;0.15" dur="14s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
      
      <div className="w-full max-w-md relative z-10">
        <Card className="border-0 bg-white/95 backdrop-blur-xl ring-1 ring-white/20 relative
          shadow-[0_0_50px_rgba(16,185,129,0.15),0_20px_40px_rgba(0,0,0,0.1),0_0_0_1px_rgba(255,255,255,0.2)]
          hover:shadow-[0_0_80px_rgba(16,185,129,0.25),0_30px_60px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.3)]
          transition-all duration-500 transform hover:scale-[1.02]">
          
          {/* Brilho suave ao redor da caixa */}
          <div className="absolute -inset-1 bg-gradient-to-r from-green-400/20 via-emerald-400/20 to-green-400/20 rounded-lg blur-xl opacity-60 animate-pulse"></div>
          
          <div className="relative">
            <CardHeader className="text-center space-y-6 pb-8">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg ring-4 ring-green-100 relative">
                {/* Brilho do ícone */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-md opacity-50 animate-pulse"></div>
                <Building2 className="h-10 w-10 text-white relative z-10" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-2">
                  InvistaIX
                </CardTitle>
                <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-400 mx-auto mt-3 rounded-full shadow-sm"></div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-6">
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
                    className="h-12 border-2 border-gray-200 focus:border-green-500 focus:ring-green-200 transition-all duration-200 bg-white/90
                      focus:shadow-[0_0_20px_rgba(16,185,129,0.1)] hover:border-green-300"
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
                    className="h-12 border-2 border-gray-200 focus:border-green-500 focus:ring-green-200 transition-all duration-200 bg-white/90
                      focus:shadow-[0_0_20px_rgba(16,185,129,0.1)] hover:border-green-300"
                  />
                </div>
                <Button
                  onClick={handleSubmit}
                  className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 
                    text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 border-0
                    hover:shadow-[0_10px_30px_rgba(16,185,129,0.3)] active:scale-95"
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
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
