import React, { useEffect, useState } from 'react';
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
import { atualizarProprietario, listarProprietarios, Proprietario } from '@/services/proprietarioService';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export default function Proprietarios() {
  const { userType } = useAuth();
  const [owners, setOwners] = useState<Proprietario[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [ownerType, setOwnerType] = useState<string | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [editDialog, setEditDialog] = useState<{ isOpen: boolean; owner: any }>({
    isOpen: false,
    owner: null,
  });
  const [detailsDialog, setDetailsDialog] = useState<{ isOpen: boolean; owner: any }>({
    isOpen: false,
    owner: null,
  });
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; ownerId: number | null; ownerName: string }>({
    isOpen: false,
    ownerId: null,
    ownerName: '',
  });

  const carregarProprietarios = async () => {
      setIsLoading(true);
      try {
        const data = await listarProprietarios();
        setOwners(data);
      } catch (error) {
        toast.error('Erro ao carregar proprietários');
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      carregarProprietarios();
    }, []);


  // Função para inferir o tipo baseado no CPF/CNPJ
  function getOwnerType(cpfCnpj: string | undefined): string | undefined {
    if (!cpfCnpj) return undefined;
    const digits = cpfCnpj.replace(/\D/g, '');
    if (digits.length === 11) return 'PF';
    if (digits.length === 14) return 'PJ';
    return undefined;
  }

  const lowerSearchTerm = searchTerm.toLowerCase();

  const filteredOwners = owners.filter(owner => {
    const nome = owner.nome?.toLowerCase() || "";
    const email = owner.email?.toLowerCase() || "";
    const cpfCnpj = owner.cpfCnpj?.toLowerCase() || "";

    const matchesSearch =
      nome.includes(lowerSearchTerm) ||
      email.includes(lowerSearchTerm) ||
      cpfCnpj.includes(lowerSearchTerm);

    const type = getOwnerType(owner.cpfCnpj);
    const matchesType = !ownerType || type === ownerType;

    return matchesSearch && matchesType;
  });


  const handleFormSuccess = () => {
    setIsDialogOpen(false);
    carregarProprietarios();
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

  const handleUpdateOwner = async (data: any) => {
  if (!editDialog.owner) return;

  try {
    await atualizarProprietario(editDialog.owner.id, data);
    toast.success('Proprietário atualizado com sucesso!');
    setEditDialog({ isOpen: false, owner: null });
    await carregarProprietarios();
  } catch (error) {
    toast.error('Erro ao atualizar proprietário');
  }
};


  const handleAfterDelete = async () => {
  toast.success('Proprietário excluído com sucesso!');
  setDeleteDialog({ isOpen: false, ownerId: null, ownerName: '' });
  const data = await carregarProprietarios();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Proprietários</h1>
          <p className="text-muted-foreground">Gerencie os proprietários de imóveis</p>
        </div>
        {userType === 'admin' && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="invistaix-gradient">
                <Plus className="h-4 w-4 mr-2" />
                Cadastrar Proprietário
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] lg:max-w-[900px] max-w-[95vw] max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col p-0">
              <div className="px-6 py-4 border-b">
                <DialogHeader>
                  <DialogTitle className="text-xl sm:text-2xl">Cadastrar Novo Proprietário</DialogTitle>
                  <DialogDescription className="text-sm sm:text-base">
                    Preencha os dados do proprietário e associe os imóveis que pertencem a ele.
                  </DialogDescription>
                </DialogHeader>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar-form">
                <AddOwnerForm onSuccess={handleFormSuccess} />
              </div>
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
            const type = getOwnerType(owner.cpfCnpj);
            return (
              <Card key={owner.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{owner.nome}</CardTitle>
                    <Badge 
                      className={type === 'PF' ? 'bg-invistaix-100 text-invistaix-400 hover:bg-invistaix-100' : 'bg-blue-100 text-blue-700 hover:bg-blue-100'}
                    >
                      {type === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center mt-1">
                    <Building className="h-3 w-3 mr-1" />
                    {ownerProperties.length > 0 
                      ? `${ownerProperties.length} imóvel(is)` 
                      : 'Nenhum imóvel cadastrado'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <UserCheck className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">{owner.cpfCnpj}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">{owner.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">{owner.telefone}</span>
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
                      onClick={() => handleDeleteClick(owner.id, owner.nome)}
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
        )}      </div>
      
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

      {deleteDialog.ownerId !== null && (
        <DeleteOwnerDialog
          isOpen={deleteDialog.isOpen}
          onClose={() =>
            setDeleteDialog({ isOpen: false, ownerId: null, ownerName: '' })
          }
          onConfirm={handleAfterDelete}
          ownerId={deleteDialog.ownerId}
          ownerName={deleteDialog.ownerName}
          onAfterDelete={carregarProprietarios}
        />
      )}
    </div>
  );
}
