import { useState, useEffect, useCallback } from 'react';

const usePropertyDetails = (id: string | undefined) => {
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPropertyDetails = useCallback(async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Usuário não autenticado');
      
      const response = await fetch(`/api/imoveis/properties/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Acesso negado. Você não tem permissão para visualizar este imóvel');
        }
        throw new Error('Erro ao carregar dados do imóvel');
      }
      
      const data = await response.json();
      setPropertyDetails(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPropertyDetails();
  }, [fetchPropertyDetails]);

  const refetch = () => {
    fetchPropertyDetails();
  };

  return { propertyDetails, loading, error, refetch };
};

export default usePropertyDetails;