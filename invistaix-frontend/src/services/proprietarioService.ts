const API_URL = 'http://localhost:8080/api';

export interface Proprietario {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpfCnpj: string;
  quantidadeImoveis: number;
}

export const listarProprietarios = async (): Promise<Proprietario[]> => {
  try {
    const response = await fetch(`${API_URL}/proprietarios`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao buscar proprietários');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};

export const criarProprietario = async (proprietarioData) => {
  try {
    const response = await fetch(`${API_URL}/proprietarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(proprietarioData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao cadastrar proprietário');
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
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao deletar proprietário');
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};

export async function atualizarProprietario(id: number, dadosAtualizados: any) {
  const response = await fetch(`${API_URL}/proprietarios/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dadosAtualizados),
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar proprietário');
  }

  return await response.json();
}