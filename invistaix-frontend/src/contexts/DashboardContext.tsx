import { createContext, useContext, ReactNode } from 'react';
import { useDashboardStats } from '@/hooks/useDashboardStats';

interface DashboardContextType {
  stats: {
    totalProprietarios: number;
    totalGestores: number;
    totalImoveis: number;
  };
  loading: boolean;
  error: string | null;
  refreshStats: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const dashboardData = useDashboardStats();

  return (
    <DashboardContext.Provider value={dashboardData}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard deve ser usado dentro de um DashboardProvider');
  }
  return context;
}
