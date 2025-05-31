
import React from 'react';
import { User, Settings, LogOut } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Topbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logout realizado com sucesso!');
  };

  const handleConfigClick = () => {
    navigate('/dashboard/configuracoes');
  };

  return (
    <header className="border-b bg-background px-4 py-3 flex items-center justify-end">
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-accent">
              <Avatar className="h-9 w-9">
                <AvatarImage src="" alt="Admin" />
                <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-white font-semibold">
                  AD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt="Admin" />
                    <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-white text-sm">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium leading-none">Administrator</p>
                    <p className="text-xs leading-none text-muted-foreground mt-1">
                      admin@invistaix.com
                    </p>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  <p>Usuário: ADMIN</p>
                  <p>Tipo: Administrador</p>
                  <p>Status: Ativo</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleConfigClick} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Topbar;
