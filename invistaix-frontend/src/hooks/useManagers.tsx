import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8080/api/gestores';

export interface Manager {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  properties: number[];
}

export const useManagers = () => {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all managers
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          setError(`Erro ao carregar gestores: ${response.status} ${errorText}`);
          setLoading(false);
          return;
        }

        const data = await response.json();
        setManagers(data);
        setLoading(false);
      } catch (err) {
        setError('Erro na comunicação com o servidor');
        setLoading(false);
        console.error(err);
      }
    };

    fetchManagers();
  }, []);

  // Add a new manager
  const addManager = async (newManager: Omit<Manager, 'id'>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify(newManager),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao adicionar gestor: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      setManagers(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message || 'Erro ao adicionar gestor');
      console.error(err);
      throw err;
    }
  };

  // Update a manager
  const updateManager = async (id: number, updatedManager: Partial<Manager>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify(updatedManager),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao atualizar gestor: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      setManagers(prev => 
        prev.map(manager => 
          manager.id === id ? data : manager
        )
      );
      return data;
    } catch (err) {
      setError(err.message || 'Erro ao atualizar gestor');
      console.error(err);
      throw err;
    }
  };

  // Delete a manager
  const deleteManager = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao remover gestor: ${response.status} ${errorText}`);
      }

      setManagers(prev => prev.filter(manager => manager.id !== id));
    } catch (err) {
      setError(err.message || 'Erro ao remover gestor');
      console.error(err);
      throw err;
    }
  };

  return {
    managers,
    loading,
    error,
    addManager,
    updateManager,
    deleteManager,
  };
};
