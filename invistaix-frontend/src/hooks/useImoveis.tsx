import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface Imovel {
  id: number;
  nomeImovel: string;
  tipoImovel: string;
  endereco: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
  valorAluguelAtual: number;
  valorVendaEstimado: number;
  numQuartos: number;
  area: number;
}

export default function useImoveis() {
  const { user } = useAuth();
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        
        if (user?.userType === 'GESTOR') {
          params.append('gestorId', user.id.toString());
        } else if (user?.userType === 'PROPRIETARIO') {
          params.append('proprietarioId', user.id.toString());
        }

        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }
        
        const response = await fetch(`/api/imoveis?${params.toString()}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Erro ao carregar imóveis');
        }

        const data = await response.json();
        setImoveis(data);
      } catch (err) {
        setError(err.message || 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchImoveis();
  }, [user]);

  return { imoveis, loading, error };
}