import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger
} from '@/components/ui/dialog';
import AddOwnerForm from '@/components/proprietarios/AddOwnerForm';
import { useOwners } from '@/hooks/useOwners';
import { useAuth } from '@/contexts/AuthContext';

export default function ProprietariosStepByStep() {
  const { userType } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { owners } = useOwners();

  const handleFormSuccess = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
            <Users className="h-6 w-6 sm:h-8 sm:w-8" />
            Proprietários
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Gerencie os proprietários dos imóveis ({owners.length} total)
          </p>
        </div>
        
        {userType === 'admin' && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="invistaix-gradient">
                <Plus className="h-4 w-4 mr-2" />
                Cadastrar Proprietário
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-w-[95vw] max-h-[90vh] overflow-y-auto">
              <DialogHeader className="pb-2 sm:pb-4">
                <DialogTitle className="text-lg sm:text-xl">Cadastrar Novo Proprietário</DialogTitle>
                <DialogDescription className="text-sm">
                  Preencha os dados do proprietário para adicioná-lo ao sistema.
                </DialogDescription>
              </DialogHeader>
              <AddOwnerForm onSuccess={handleFormSuccess} />
            </DialogContent>
          </Dialog>
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

      <div className="text-center py-8">
        <p>Página carregada com sucesso! Formulário funcional.</p>
      </div>
    </div>
  );
}
