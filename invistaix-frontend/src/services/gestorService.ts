const API_URL = 'http://localhost:8080/api/gestores';

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

export async function listarGestores() {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error('Erro ao buscar gestores');
  // const data = await response.json();
  // console.log('Dados recebidos da API:', data); // 👈 Adicione isso
  // return data;
  return await response.json();
}

export async function criarGestor(data: any) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Erro ao criar gestor');
  return await response.json();
}

export async function atualizarGestor(id: string, data: any) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Erro ao atualizar gestor');
  return await response.json();
}

export async function removerGestor(id: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error('Erro ao remover gestor');
}
