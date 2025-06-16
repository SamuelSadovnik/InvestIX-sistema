
import { useState } from 'react';
import { owners as initialOwners } from '@/data/mockData';

export interface Owner {
  id: string;
  name: string;
  type: 'PF' | 'PJ';
  document: string;
  email: string;
  phone: string;
}

export const useOwners = () => {
  const [owners, setOwners] = useState<Owner[]>(initialOwners);

  const addOwner = (newOwner: Omit<Owner, 'id'>) => {
    const owner: Owner = {
      ...newOwner,
      id: Date.now().toString(),
    };
    setOwners(prev => [...prev, owner]);
  };

  const updateOwner = (id: string, updatedOwner: Partial<Owner>) => {
    setOwners(prev => 
      prev.map(owner => 
        owner.id === id ? { ...owner, ...updatedOwner } : owner
      )
    );
  };

  const deleteOwner = (id: string) => {
    setOwners(prev => prev.filter(owner => owner.id !== id));
  };

  return {
    owners,
    addOwner,
    updateOwner,
    deleteOwner,
  };
};
