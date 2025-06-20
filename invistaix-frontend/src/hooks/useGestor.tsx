import { useState, useEffect } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';

const API_URL = 'http://localhost:8080/api';

export interface Gestor {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  senha: string;
}

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
}

export const listarGestores = async (): Promise<Gestor[]> => {
  try {
    const response = await fetch(`${API_URL}/gestores`, {
      method: 'GET',
      headers: getAuthHeaders(),
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

export const criarGestor = async (gestorData): Promise<Gestor> => {
  try {
    const response = await fetch(`${API_URL}/gestores`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(gestorData),
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

export const deletarGestor = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/gestores/${id}`, {
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

export const atualizarGestor = async (id: number, dadosAtualizados: any): Promise<Gestor> => {
  try {
    const response = await fetch(`${API_URL}/gestores/${id}`, {
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

export function useGestores() {
  const [gestores, setGestores] = useState<Gestor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { refreshStats } = useDashboard();

  const buscarGestores = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await listarGestores();
      setGestores(data);
    } catch (error) {
      console.error('Erro ao buscar gestores:', error);
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };
  const criarNovoGestor = async (dadosGestor: any) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Chamar a API diretamente
      const response = await fetch(`${API_URL}/gestores`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(dadosGestor),
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const novoGestor = await response.json();
      
      // Atualizar a lista local
      await buscarGestores();
      
      // Atualizar os stats da dashboard
      refreshStats();
      
      return novoGestor;
    } catch (error) {
      console.error('Erro ao criar gestor:', error);
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    buscarGestores();
  }, []);

  return {
    gestores,
    isLoading,
    error,
    buscarGestores,
    criarGestor: criarNovoGestor
  };
}