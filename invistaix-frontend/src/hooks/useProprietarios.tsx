const API_URL = 'http://localhost:8080/api';

export interface Proprietario {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpfCnpj: string;
  senha?: string;
}

export const listarProprietarios = async (): Promise<Proprietario[]> => {
  try {
    // Get token from local storage
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/proprietarios`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = 'Erro ao buscar proprietários';
      try {
        if (errorText) {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        }
      } catch (e) {
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    // Handle empty response (204 No Content)
    if (response.status === 204) {
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw new Error('Falha na comunicação com o servidor');
  }
};

export const criarProprietario = async (proprietarioData: Proprietario) => {
  const token = localStorage.getItem('token');
  
  // Create payload with required fields
  const payload = {
    nome: proprietarioData.nome,
    cpfCnpj: proprietarioData.cpfCnpj,
    email: proprietarioData.email,
    telefone: proprietarioData.telefone,
    senha: proprietarioData.senha
  };
  
  const response = await fetch(`${API_URL}/proprietarios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = 'Erro ao cadastrar proprietário';
    try {
      if (errorText) {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorMessage;
      }
    } catch (e) {
      errorMessage = errorText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  // Handle empty response (204 No Content)
  if (response.status === 204) {
    return;
  }

  // Handle JSON response
  const responseText = await response.text();
  if (responseText) {
    return JSON.parse(responseText);
  }
};

export const deletarProprietario = async (id: number): Promise<void> => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/proprietarios/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = 'Erro ao deletar proprietário';
      try {
        if (errorText) {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        }
      } catch (e) {
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};

export async function atualizarProprietario(id: number, dadosAtualizados: Proprietario) {
  const token = localStorage.getItem('token');
  
  // Create payload with required fields
  const payload = {
    nome: dadosAtualizados.nome,
    cpfCnpj: dadosAtualizados.cpfCnpj,
    email: dadosAtualizados.email,
    telefone: dadosAtualizados.telefone,
    senha: dadosAtualizados.senha
  };
  
  const response = await fetch(`${API_URL}/proprietarios/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = 'Erro ao atualizar proprietário';
    try {
      if (errorText) {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorMessage;
      }
    } catch (e) {
      errorMessage = errorText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  // Handle empty response (204 No Content)
  if (response.status === 204) {
    return;
  }

  // Handle JSON response
  const responseText = await response.text();
  if (responseText) {
    return JSON.parse(responseText);
  }
}