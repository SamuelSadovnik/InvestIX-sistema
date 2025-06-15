const API_URL = 'http://localhost:8080/api';

export interface Proprietario {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpfCnpj: string;
  quantidadeImoveis: number;
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
