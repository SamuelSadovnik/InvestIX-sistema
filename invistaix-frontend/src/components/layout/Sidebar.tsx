import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { 
  LayoutDashboard, 
  Home,
  Users, 
  UserPlus, 
  DollarSign, 
  BarChart3,
  Settings,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const { logout, userType } = useAuth();
  
  const allMenuItems = [
    { 
      title: "Dashboard", 
      path: "/dashboard", 
      icon: <LayoutDashboard className="h-5 w-5" />,
      allowedUsers: ['admin', 'gestor', 'proprietario']
    },
    { 
      title: "Imóveis", 
      path: "/dashboard/imoveis", 
      icon: <Home className="h-5 w-5" />,
      allowedUsers: ['admin', 'gestor', 'proprietario']
    },
    { 
      title: "Proprietários", 
      path: "/dashboard/proprietarios", 
      icon: <Users className="h-5 w-5" />,
      allowedUsers: ['admin', 'gestor']
    },
    { 
      title: "Gestores", 
      path: "/dashboard/gestores", 
      icon: <UserPlus className="h-5 w-5" />,
      allowedUsers: ['admin']
    },
    { 
      title: "Financeiro", 
      path: "/dashboard/financeiro", 
      icon: <DollarSign className="h-5 w-5" />,
      allowedUsers: ['admin', 'gestor', 'proprietario']
    },
    { 
      title: "Performance", 
      path: "/dashboard/performance", 
      icon: <BarChart3 className="h-5 w-5" />,
      allowedUsers: ['admin', 'gestor', 'proprietario']
    }
  ];

  // Filtrar itens de menu baseado no tipo de usuário
  const menuItems = allMenuItems.filter(item => 
    item.allowedUsers.includes(userType || '')
  );

  const handleLogout = () => {
    logout();
    toast.success('Logout realizado com sucesso!');
  };
  
  return (
    <aside className="bg-sidebar w-64 min-h-screen flex flex-col fixed left-0 top-0 bottom-0 z-30 shadow-lg">
      <div className="p-4">
        <div className="flex items-center justify-center md:justify-start">
          <span className="text-sidebar-foreground text-2xl font-bold">InvistaIX</span>
        </div>
      </div>
      
      <nav className="mt-6 flex-1">
        <ul className="space-y-1 px-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 text-sm rounded-md transition-colors",
                  location.pathname === item.path
                    ? "bg-sidebar-accent text-sidebar-primary font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <Link
          to="/dashboard/configuracoes"
          className={cn(
            "flex items-center px-4 py-3 text-sm rounded-md transition-colors mb-2",
            location.pathname === "/dashboard/configuracoes"
              ? "bg-sidebar-accent text-sidebar-primary font-medium"
              : "text-sidebar-foreground hover:bg-sidebar-accent/50"
          )}
        >
          <Settings className="h-5 w-5" />
          <span className="ml-3">Configurações</span>
        </Link>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 text-sm rounded-md transition-colors text-sidebar-foreground hover:bg-sidebar-accent/50"
        >
          <LogOut className="h-5 w-5" />
          <span className="ml-3">Sair</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
