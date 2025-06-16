import React from 'react';
import { useOwners } from '@/hooks/useProprietarios';

export default function ProprietariosDebug() {
  const { owners } = useOwners();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Debug - Proprietários</h1>
      <p>Total de proprietários: {owners.length}</p>
      <pre>{JSON.stringify(owners, null, 2)}</pre>
    </div>
  );
}
