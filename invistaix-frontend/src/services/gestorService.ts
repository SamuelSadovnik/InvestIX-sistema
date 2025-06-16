const API_URL = 'http://localhost:8080/api';

export interface Gestor {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
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
