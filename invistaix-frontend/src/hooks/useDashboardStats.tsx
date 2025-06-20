import { useState, useEffect } from 'react';

interface DashboardStats {
  totalProprietarios: number;
  totalGestores: number;
  totalImoveis: number;
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProprietarios: 0,
    totalGestores: 0,
    totalImoveis: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };      // Buscar dados dos proprietários
      const proprietariosResponse = await fetch('http://localhost:8080/api/proprietarios', { headers });
      
      // Buscar dados dos gestores  
      const gestoresResponse = await fetch('http://localhost:8080/api/gestores', { headers });

      // Buscar dados dos imóveis
      const imoveisResponse = await fetch('http://localhost:8080/api/imoveis', { headers });

      if (proprietariosResponse.ok && gestoresResponse.ok && imoveisResponse.ok) {
        const proprietarios = await proprietariosResponse.json();
        const gestores = await gestoresResponse.json();
        const imoveis = await imoveisResponse.json();

        setStats({
          totalProprietarios: Array.isArray(proprietarios) ? proprietarios.length : 0,
          totalGestores: Array.isArray(gestores) ? gestores.length : 0,
          totalImoveis: Array.isArray(imoveis) ? imoveis.length : 0
        });
      } else {
        throw new Error('Erro ao buscar dados da dashboard');
      }
    } catch (error) {
      console.error('Erro ao conectar com a API:', error);
      setError('Erro ao carregar dados da dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const refreshStats = () => {
    fetchStats();
  };

  return {
    stats,
    loading,
    error,
    refreshStats
  };
}
