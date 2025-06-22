const API_URL = 'http://localhost:8080/api';

export interface Imposto {
  id: number;
  date: string;
  imovelId: string;
  descricao: string;
  tipo: string;
  valor: string;
}

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
}

// 🔥 Listar todos os impostos
export const listarImpostos = async (): Promise<Imposto[]> => {
  const response = await fetch(`${API_URL}/impostos`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    console.error('Erro na requisição:', response.status, response.statusText);
    throw new Error(`Erro ${response.status}: ${response.statusText}`);
  }

  return await response.json();
};

// 🔥 Criar imposto
export const criarImposto = async (impostoData: Omit<Imposto, 'id'>): Promise<Imposto> => {
  const response = await fetch(`${API_URL}/impostos`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(impostoData),
  });

  if (!response.ok) {
    console.error('Erro na requisição:', response.status, response.statusText);
    throw new Error(`Erro ${response.status}: ${response.statusText}`);
  }

  return await response.json();
};

// 🔥 Deletar imposto
export const deletarImposto = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/impostos/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    console.error('Erro na requisição:', response.status, response.statusText);
    throw new Error(`Erro ${response.status}: ${response.statusText}`);
  }
};

// 🔥 Atualizar imposto
export const atualizarImposto = async (id: number, dadosAtualizados: Partial<Imposto>): Promise<Imposto> => {
  const response = await fetch(`${API_URL}/impostos/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(dadosAtualizados),
  });

  if (!response.ok) {
    console.error('Erro na requisição:', response.status, response.statusText);
    throw new Error(`Erro ${response.status}: ${response.statusText}`);
  }

  return await response.json();
};
