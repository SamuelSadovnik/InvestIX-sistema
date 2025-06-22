import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { TipoImovel } from '@/utils/imovelUtils';

interface Imovel {
  id: number;
  nomeImovel: string;
  tipoImovel: TipoImovel;
  endereco: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
  valorAluguelAtual: number;
  valorVendaEstimado: number;
  numQuartos: number;
  area: number;
  fotoImovel?: string;
}

export default function useImoveis() {
  const { user } = useAuth();
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state
        
        // Verificar se o usuário está logado
        if (!user) {
          throw new Error('Usuário não autenticado');
        }

        const token = localStorage.getItem('token');
        console.log('JWT Token:', token); // Debug token
        if (!token) {
          throw new Error('Token de autenticação não encontrado');
        }
        
        // Decode token to inspect claims
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          console.log('Token payload:', payload);
        } catch (e) {
          console.error('Error decoding token:', e);
        }

        const url = '/api/imoveis';
        
        let response: Response;
        let retryCount = 0;
        const maxRetries = 2;
        
        while (retryCount <= maxRetries) {
          try {
            response = await fetch(url, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
            
            console.log('Response status:', response.status); // Debug

            if (!response.ok) {
              // Handle specific errors
              if (response.status === 403) {
                throw new Error('Acesso negado. Verifique suas permissões.');
              } else if (response.status === 401) {
                throw new Error('Token de autenticação inválido ou expirado.');
              } else {
                // Try to get error details from response
                const errorBody = await response.text();
                console.error(`Backend error details: ${errorBody}`);
                throw new Error(`Erro ${response.status}: ${response.statusText}`);
              }
            }

            const data = await response.json();
            setImoveis(data);
            return; // Exit on success
          } catch (error) {
            if (retryCount === maxRetries) {
              throw error; // Rethrow after last retry
            }
            retryCount++;
            console.warn(`Retrying request (${retryCount}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s before retry
          }
        }
      } catch (err) {
        console.error('Erro ao carregar imóveis:', err); // Debug
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchImoveis();
    }
  }, [user]);

  return { imoveis, loading, error };
}