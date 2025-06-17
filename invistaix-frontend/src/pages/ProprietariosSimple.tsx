import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

export default function ProprietariosSimple() {
  const { userType } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
            <Users className="h-6 w-6 sm:h-8 sm:w-8" />
            Proprietários
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Gerencie os proprietários dos imóveis
          </p>
        </div>
        
        {userType === 'ADMIN' && (
          <Button className="invistaix-gradient">
            <Plus className="h-4 w-4 mr-2" />
            Cadastrar Proprietário
          </Button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, email ou documento..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle>João Silva</CardTitle>
            <CardDescription>Pessoa Física</CardDescription>
          </CardHeader>
          <CardContent>
            <p>CPF: 123.456.789-00</p>
            <p>Email: joao@example.com</p>
            <p>Telefone: (11) 99999-8888</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
