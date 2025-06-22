const API_URL = 'http://localhost:8080/api';

export interface Proprietario {
  id: number;
  nome: string;
  tipoDocumento: string;
  email: string;
  telefone: string;
  documento: string;
  senha: string;
  quantidadeImoveis?: number;
}

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
}

export const listarProprietariosPorGestor = async (): Promise<Proprietario[]> => {
  try {
    const response = await fetch(`${API_URL}/proprietarios/gestor`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Proprietario[];
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};

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

export const getPropertiesByOwner = async (ownerId: number): Promise<any[]> => {
  try {
    const response = await fetch(`${API_URL}/imoveis?proprietarioId=${ownerId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar imóveis:', error);
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