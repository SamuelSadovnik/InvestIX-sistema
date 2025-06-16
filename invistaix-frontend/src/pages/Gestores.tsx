
import React, { useState } from 'react';
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
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useManagers } from '@/hooks/useManagers';
import { AddManagerForm } from '@/components/gestores/AddManagerForm';
import { EditManagerDialog } from '@/components/gestores/EditManagerDialog';
import { ManagerDetailsDialog } from '@/components/gestores/ManagerDetailsDialog';
import { DeleteManagerDialog } from '@/components/gestores/DeleteManagerDialog';
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
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; managerId: number; managerName: string }>({
    isOpen: false,
    managerId: 0,
    managerName: '',
  });
  
  const { managers, loading, error, addManager, updateManager, deleteManager } = useManagers();
  
  const filteredManagers = managers.filter(manager => {
    const name = manager.name || '';
    const email = manager.email || '';
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const handleAddManager = async (data: any) => {
    try {
      await addManager(data);
      setIsAddDialogOpen(false);
      toast.success(`${data.name} foi adicionado com sucesso.`);
    } catch (err) {
      toast.error('Erro ao adicionar gestor');
    }
  };

  const handleEditClick = (manager: any) => {
    setEditDialog({ isOpen: true, manager });
  };

  const handleDetailsClick = (manager: any) => {
    setDetailsDialog({ isOpen: true, manager });
  };

  const handleDeleteClick = (managerId: number, managerName: string) => {
    setDeleteDialog({
      isOpen: true,
      managerId,
      managerName,
    });
  };

  const handleUpdateManager = async (data: any) => {
    try {
      await updateManager(editDialog.manager.id, data);
      setEditDialog({ isOpen: false, manager: null });
    } catch (err) {
      toast.error('Erro ao atualizar gestor');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteManager(deleteDialog.managerId);
      setDeleteDialog({ isOpen: false, managerId: 0, managerName: '' });
      toast.success(`${deleteDialog.managerName} foi removido com sucesso.`);
    } catch (err) {
      toast.error('Erro ao remover gestor');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Gestores</h1>
            <p className="text-muted-foreground">Gerencie a equipe de gestores</p>
          </div>
          <Button className="invistaix-gradient" disabled>
            <Plus className="h-4 w-4 mr-2" />
            Cadastrar Gestor
          </Button>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {[...Array(6)].map((_, i) => (
                    <TableHead key={i}>
                      <Skeleton className="h-4 w-24" />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    {[...Array(6)].map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Gestores</h1>
            <p className="text-muted-foreground">Gerencie a equipe de gestores</p>
          </div>
          <Button className="invistaix-gradient">
            <Plus className="h-4 w-4 mr-2" />
            Cadastrar Gestor
          </Button>
        </div>
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          <p>{error}</p>
        </div>
      </div>
    );
  }

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
            </DialogHeader>
            <AddManagerForm
              onSubmit={handleAddManager}
              onCancel={() => setIsAddDialogOpen(false)}
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
              <TableHead>Imóveis</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredManagers.length > 0 ? (
              filteredManagers.map((manager) => {
                return (
                  <TableRow key={manager.id}>
                    <TableCell className="font-medium">{manager.name || 'N/A'}</TableCell>
                    <TableCell>{manager.email || 'N/A'}</TableCell>
                    <TableCell>{manager.phone || 'N/A'}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{manager.properties?.length || 0}</span>
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
                          onClick={() => handleDeleteClick(manager.id, manager.name)}
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
      )}

      {detailsDialog.manager && (
        <ManagerDetailsDialog
          isOpen={detailsDialog.isOpen}
          onClose={() => setDetailsDialog({ isOpen: false, manager: null })}
          manager={detailsDialog.manager}
        />
      )}

      <DeleteManagerDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, managerId: 0, managerName: '' })}
        onConfirm={handleDeleteConfirm}
        managerName={deleteDialog.managerName}
      />
    </div>
  );
}
