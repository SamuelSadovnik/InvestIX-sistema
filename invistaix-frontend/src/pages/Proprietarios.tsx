import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search,
  Building,
  UserCheck,
  Mail,
  Phone,
  Edit,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { properties } from '@/data/mockData';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger
} from '@/components/ui/dialog';
import AddOwnerForm from '@/components/proprietarios/AddOwnerForm';
import { EditOwnerDialog } from '@/components/proprietarios/EditOwnerDialog';
import { OwnerDetailsDialog } from '@/components/proprietarios/OwnerDetailsDialog';
import { DeleteOwnerDialog } from '@/components/proprietarios/DeleteOwnerDialog';
import { useOwners } from '@/hooks/useOwners';
import { toast } from 'sonner';

export default function Proprietarios() {
  const [searchTerm, setSearchTerm] = useState('');
  const [ownerType, setOwnerType] = useState<string | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editDialog, setEditDialog] = useState<{ isOpen: boolean; owner: any }>({
    isOpen: false,
    owner: null,
  });
  const [detailsDialog, setDetailsDialog] = useState<{ isOpen: boolean; owner: any }>({
    isOpen: false,
    owner: null,
  });
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; ownerId: string; ownerName: string }>({
    isOpen: false,
    ownerId: '',
    ownerName: '',
  });
  
  const { owners, addOwner, updateOwner, deleteOwner } = useOwners();
  
  const filteredOwners = owners.filter(owner => {
    const matchesSearch = owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          owner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          owner.document.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !ownerType || owner.type === ownerType;
    
    return matchesSearch && matchesType;
  });

  const handleFormSuccess = () => {
    setIsDialogOpen(false);
  };

  const handleTypeChange = (value: string) => {
    setOwnerType(value === 'all' ? undefined : value);
  };

  const handleEditClick = (owner: any) => {
    setEditDialog({ isOpen: true, owner });
  };

  const handleDetailsClick = (owner: any) => {
    setDetailsDialog({ isOpen: true, owner });
  };

  const handleDeleteClick = (ownerId: string, ownerName: string) => {
    setDeleteDialog({ isOpen: true, ownerId, ownerName });
  };

  const handleUpdateOwner = (data: any) => {
    updateOwner(editDialog.owner.id, data);
    setEditDialog({ isOpen: false, owner: null });
  };

  const handleDeleteConfirm = () => {
    deleteOwner(deleteDialog.ownerId);
    setDeleteDialog({ isOpen: false, ownerId: '', ownerName: '' });
    toast.success('Proprietário excluído com sucesso!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Proprietários</h1>
          <p className="text-muted-foreground">Gerencie os proprietários de imóveis</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="invistaix-gradient">
              <Plus className="h-4 w-4 mr-2" />
              Cadastrar Proprietário
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Proprietário</DialogTitle>
              <DialogDescription>
                Preencha os dados do proprietário e associe os imóveis que pertencem a ele.
              </DialogDescription>
            </DialogHeader>
            <AddOwnerForm onSuccess={handleFormSuccess} />
          </DialogContent>
        </Dialog>
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
        <div className="flex gap-2">
          <Select value={ownerType || 'all'} onValueChange={handleTypeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo de pessoa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value="PF">Pessoa Física</SelectItem>
              <SelectItem value="PJ">Pessoa Jurídica</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredOwners.length > 0 ? (
          filteredOwners.map((owner) => {
            const ownerProperties = properties.filter(p => p.owner === owner.id);
            return (
              <Card key={owner.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{owner.name}</CardTitle>
                    <Badge 
                      className={owner.type === 'PF' ? 'bg-invistaix-100 text-invistaix-400 hover:bg-invistaix-100' : 'bg-blue-100 text-blue-700 hover:bg-blue-100'}
                    >
                      {owner.type === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center mt-1">
                    <Building className="h-3 w-3 mr-1" />
                    {ownerProperties.length} imóvel(is)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <UserCheck className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">{owner.document}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">{owner.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">{owner.phone}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDetailsClick(owner)}
                  >
                    Ver Detalhes
                  </Button>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEditClick(owner)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteClick(owner.id, owner.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            );
          })
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium">Nenhum proprietário encontrado</h3>
            <p className="text-muted-foreground mt-1">
              Tente ajustar seus filtros ou cadastre um novo proprietário.
            </p>
          </div>
        )}
      </div>

      {editDialog.owner && (
        <EditOwnerDialog
          isOpen={editDialog.isOpen}
          onClose={() => setEditDialog({ isOpen: false, owner: null })}
          owner={editDialog.owner}
          onUpdate={handleUpdateOwner}
        />
      )}

      {detailsDialog.owner && (
        <OwnerDetailsDialog
          isOpen={detailsDialog.isOpen}
          onClose={() => setDetailsDialog({ isOpen: false, owner: null })}
          owner={detailsDialog.owner}
        />
      )}

      <DeleteOwnerDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, ownerId: '', ownerName: '' })}
        onConfirm={handleDeleteConfirm}
        ownerName={deleteDialog.ownerName}
      />
    </div>
  );
}
