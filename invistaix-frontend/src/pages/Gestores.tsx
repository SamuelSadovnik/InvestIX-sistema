import React, { useEffect, useState } from 'react';
import { 
  UserPlus, 
  Plus, 
  Search,
  Building,
  Edit,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { properties } from '@/data/mockData';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
} from '@/components/ui/dialog';
import { AddManagerForm } from '@/components/gestores/AddManagerForm';
import { EditManagerDialog } from '@/components/gestores/EditManagerDialog';
import { ManagerDetailsDialog } from '@/components/gestores/ManagerDetailsDialog';
import { DeleteManagerDialog } from '@/components/gestores/DeleteManagerDialog';
import { Gestor, atualizarGestor, deletarGestor } from '@/hooks/useGestor';
import { useGestores } from '@/hooks/useGestor';
import { toast } from 'sonner';

export default function Gestores() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editDialog, setEditDialog] = useState<{ isOpen: boolean; manager: any }>({
    isOpen: false,
    manager: null,
  });
  const [detailsDialog, setDetailsDialog] = useState<{ isOpen: boolean; manager: any }>({
    isOpen: false,
    manager: null,
  });
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; managerId: string; managerName: string }>({
    isOpen: false,
    managerId: '',
    managerName: '',
  });
    // Usar o hook useGestores para obter os gestores e funções para manipulá-los
  const { gestores: managers, isLoading, error, buscarGestores, criarGestor } = useGestores();

  // Não precisamos mais deste useEffect, pois o hook já carrega os gestores automaticamente
  
  const addManager = async (data: Gestor) => {
    try {
      await criarGestor(data);
      toast.success('Gestor cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar gestor:', error);
      toast.error('Erro ao cadastrar gestor');
    }
  };

  const updateManager = async (id: number, data: Gestor) => {
    try {
      await atualizarGestor(id, data);
      await buscarGestores(); // Recarrega a lista após atualização
      toast.success(`Gestor atualizado com sucesso.`);
    } catch (error) {
      console.error('Erro ao atualizar gestor:', error);
      toast.error('Erro ao atualizar gestor');
    }
  };
  const deleteManager = async (id: string) => {
    try {
      // Converter o ID para número, se necessário
      const numericId = parseInt(id, 10);
      if (isNaN(numericId)) throw new Error('ID inválido');
      
      await deletarGestor(numericId);
      toast.success('Gestor removido com sucesso');
    } catch (error) {
      console.error('Erro ao remover gestor:', error);
      toast.error('Erro ao remover gestor');
    }
  };

  const filteredManagers = managers.filter(manager => {
    const matchesSearch = manager.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           manager.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });
  const handleAddSuccess = () => {
    buscarGestores(); // Recarregar a lista de gestores após adicionar um novo
  };

  const handleEditClick = (manager: any) => {
    setEditDialog({ isOpen: true, manager });
  };

  const handleDetailsClick = (manager: any) => {
    setDetailsDialog({ isOpen: true, manager });
  };

  const handleDeleteClick = (managerId: string, managerName: string) => {
    setDeleteDialog({ isOpen: true, managerId, managerName });
  };

  const handleUpdateManager = (data: any) => {
    updateManager(editDialog.manager.id, data);
    setEditDialog({ isOpen: false, manager: null });
  };

  const handleDeleteConfirm = () => {
    deleteManager(deleteDialog.managerId);
    setDeleteDialog({ isOpen: false, managerId: '', managerName: '' });
    toast.success(`${deleteDialog.managerName} foi removido com sucesso.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Gestores</h1>
          <p className="text-muted-foreground">Gerencie a equipe de gestores</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="invistaix-gradient">
              <Plus className="h-4 w-4 mr-2" />
              Cadastrar Gestor
            </Button>
          </DialogTrigger>          
          <DialogContent className="sm:max-w-[600px] max-w-[95vw] max-h-[90vh] overflow-y-auto">
            <DialogHeader className="pb-2 sm:pb-4">
              <DialogTitle className="text-lg sm:text-xl">Cadastrar Novo Gestor</DialogTitle>
              <DialogDescription className="text-sm">
                Preencha os dados do gestor para adicioná-lo à equipe.
              </DialogDescription>
            </DialogHeader>            <AddManagerForm 
              onCancel={() => setIsAddDialogOpen(false)}
              onSuccess={handleAddSuccess}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou email..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Imóveis Gerenciados</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredManagers.length > 0 ? (              filteredManagers.map((manager) => {
                // Remover a referência às propriedades por enquanto, pois não está no tipo Gestor
                // const managerProperties = properties.filter(p => 
                //   (manager.properties || []).includes(p.id)
                // );
                return (
                  <TableRow key={manager.id}>
                    <TableCell className="font-medium">{manager.nome}</TableCell>
                    <TableCell>{manager.email}</TableCell>
                    <TableCell>{manager.telefone}</TableCell>                    <TableCell>
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>0</span> {/* Temporariamente fixo até implementar a relação */}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDetailsClick(manager)}
                        >
                          Ver Detalhes
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditClick(manager)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive"
                          onClick={() => handleDeleteClick(manager.id.toString(), manager.nome)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  <div className="flex flex-col items-center justify-center">
                    <UserPlus className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium">Nenhum gestor encontrado</h3>
                    <p className="text-muted-foreground mt-1">
                      Tente ajustar sua busca ou cadastre um novo gestor.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {editDialog.manager && (
        <EditManagerDialog
          isOpen={editDialog.isOpen}
          onClose={() => setEditDialog({ isOpen: false, manager: null })}
          manager={editDialog.manager}
          onUpdate={handleUpdateManager}
        />
      )}      {detailsDialog.manager && (
        <ManagerDetailsDialog
          isOpen={detailsDialog.isOpen}
          onClose={() => setDetailsDialog({ isOpen: false, manager: null })}
          manager={detailsDialog.manager}
          managedPropertiesIds={[]} // Temporariamente vazio até implementar a relação
        />
      )}

      <DeleteManagerDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, managerId: '', managerName: '' })}
        onConfirm={handleDeleteConfirm}
        managerName={deleteDialog.managerName}
      />
    </div>
  );
}