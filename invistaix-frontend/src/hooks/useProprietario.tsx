import { useState, useEffect } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';

const API_URL = 'http://localhost:8080/api';

export interface Proprietario {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpfCnpj: string;
  senha: string;
}

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
}

export const listarProprietarios = async (): Promise<Proprietario[]> => {
  try {
    const response = await fetch(`${API_URL}/proprietarios`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    console.log(localStorage.getItem('token'));
    throw error;
  }
};

export const criarProprietario = async (proprietarioData): Promise<Proprietario> => {
  try {
    const response = await fetch(`${API_URL}/proprietarios`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(proprietarioData),
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

export const deletarProprietario = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/proprietarios/${id}`, {
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

export const atualizarProprietario = async (id: number, dadosAtualizados: any): Promise<Proprietario> => {
  try {
    const response = await fetch(`${API_URL}/proprietarios/${id}`, {
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

export function useProprietarios() {
  const [proprietarios, setProprietarios] = useState<Proprietario[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { refreshStats } = useDashboard();

  const buscarProprietarios = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const dados = await listarProprietarios();
      setProprietarios(dados);
    } catch (error) {
      console.error('Erro ao buscar proprietários:', error);
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };  const criarNovoProprietario = async (dadosProprietario: any) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Chamar a função de criação externa (não recursiva)
      const response = await fetch(`${API_URL}/proprietarios`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(dadosProprietario),
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const novoProprietario = await response.json();
      
      // Atualizar a lista local
      await buscarProprietarios();
      
      // Atualizar os stats da dashboard
      refreshStats();
      
      return novoProprietario;
    } catch (error) {
      console.error('Erro ao criar proprietário:', error);
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const deletarProprietarioById = async (id: number) => {
    try {
      setIsLoading(true);
      setError(null);

      // Chamar a API diretamente
      const response = await fetch(`${API_URL}/proprietarios/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      // Atualizar a lista local
      await buscarProprietarios();

      // Atualizar os stats da dashboard
      refreshStats();
    } catch (error) {
      console.error('Erro ao deletar proprietário:', error);
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const atualizarProprietarioById = async (id: number, dadosAtualizados: any) => {
    try {
      setIsLoading(true);
      setError(null);

      // Chamar a API diretamente
      const response = await fetch(`${API_URL}/proprietarios/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(dadosAtualizados),
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const proprietarioAtualizado = await response.json();

      // Atualizar a lista local
      await buscarProprietarios();

      // Atualizar os stats da dashboard
      refreshStats();

      return proprietarioAtualizado;
    } catch (error) {
      console.error('Erro ao atualizar proprietário:', error);
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    buscarProprietarios();
  }, []);

  return {
    proprietarios,
    isLoading,
    error,
    buscarProprietarios,
    criarProprietario: criarNovoProprietario,
    deletarProprietario: deletarProprietarioById,
    atualizarProprietario: atualizarProprietarioById
  };
}