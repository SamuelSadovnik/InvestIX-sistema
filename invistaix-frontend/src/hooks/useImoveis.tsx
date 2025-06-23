import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { TipoImovel } from '@/utils/imovelUtils';

interface Imovel {
  id: number;
  nomeImovel: string;
  tipoImovel: TipoImovel;
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
  fotoImovel?: string;
}

export default function useImoveis() {
  const { user } = useAuth();
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImoveis = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }

      const response = await fetch('/api/imoveis', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Erro ${response.status}: ${response.statusText} - ${errorBody}`);
      }

      const data = await response.json();
      setImoveis(data);
    } catch (err) {
      console.error('Erro ao carregar imóveis:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Carrega imóveis ao inicializar ou quando o user mudar
  useEffect(() => {
    if (user) {
      fetchImoveis();
    }
  }, [user, fetchImoveis]);

  return { imoveis, loading, error, reload: fetchImoveis };
}
