
import { useState } from 'react';
import { managers as initialManagers } from '@/data/mockData';

export interface Manager {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  properties: string[];
  isOwner?: boolean;
}

export const useManagers = () => {
  const [managers, setManagers] = useState<Manager[]>(initialManagers);

  const addManager = (newManager: Omit<Manager, 'id' | 'properties' | 'isOwner'>) => {
    const manager: Manager = {
      ...newManager,
      id: Date.now().toString(),
      properties: [],
      isOwner: false,
    };
    setManagers(prev => [...prev, manager]);
  };

  const updateManager = (id: string, updatedManager: Partial<Manager>) => {
    setManagers(prev => 
      prev.map(manager => 
        manager.id === id ? { ...manager, ...updatedManager } : manager
      )
    );
  };

  const deleteManager = (id: string) => {
    setManagers(prev => prev.filter(manager => manager.id !== id));
  };

  return {
    managers,
    addManager,
    updateManager,
    deleteManager,
  };
};
