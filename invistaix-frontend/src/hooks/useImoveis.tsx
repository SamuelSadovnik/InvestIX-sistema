import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { TipoImovel } from '@/utils/imovelUtils';

export interface Imovel {
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

const API_URL = '/api/imoveis';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
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

      if (!user) throw new Error('Usuário não autenticado');

      const response = await fetch(API_URL, {
        headers: getAuthHeaders(),
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

  useEffect(() => {
    if (user) fetchImoveis();
  }, [user, fetchImoveis]);

  return { imoveis, loading, error, reload: fetchImoveis };
}

export const criarImovel = async (imovelData): Promise<Imovel> => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(imovelData),
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};

export const deletarImovel = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};

export const atualizarImovel = async (id: number, dadosAtualizados: any): Promise<Imovel> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(dadosAtualizados),
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};
