import React, { useState } from 'react';
import { Home, Plus, Search, Filter, Trash2, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useImoveis, { deletarImovel, Imovel } from '@/hooks/useImoveis';
import CardImovel from '@/components/imoveis/CardImovel';
import FormularioImovel from '@/components/imoveis/FormularioImovel';
import DeleteImovelDialog from '@/components/imoveis/DeleteImovelDialog';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useAuth } from '@/contexts/AuthContext';
import { TipoImovel, getTipoDisplay, propertyTypes } from '@/utils/imovelUtils';
import { toast } from 'sonner';

const Imoveis = () => {
  const { user, userType } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState<TipoImovel | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImovel, setSelectedImovel] = useState<Imovel | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [imovelToDelete, setImovelToDelete] = useState<Imovel | null>(null);

  const { imoveis, loading, error, reload } = useImoveis();

  const filteredProperties = imoveis.filter((property) => {
    const propertyAddress = `${property.endereco.rua}, ${property.endereco.numero} - ${property.endereco.bairro}`;
    const matchesSearch =
      property.nomeImovel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      propertyAddress.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !propertyType || property.tipoImovel === propertyType;

    return matchesSearch && matchesType;
  });

  const handleFormSuccess = () => {
    setIsDialogOpen(false);
    setSelectedImovel(null);
    reload();
  };

  const handleTypeChange = (value: string) => {
    setPropertyType(value === 'all' ? undefined : (value as TipoImovel));
  };

  const handleDelete = async () => {
    if (!imovelToDelete) return;
    try {
      await deletarImovel(imovelToDelete.id);
      toast.success('Imóvel deletado com sucesso');
      setIsDeleteOpen(false);
      setImovelToDelete(null);
      reload();
    } catch (error) {
      toast.error('Erro ao deletar imóvel');
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Imóveis</h1>
          <p className="text-muted-foreground">Gerencie sua carteira de imóveis</p>
        </div>
        {userType !== 'PROPRIETARIO' && (
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              if (!open) setSelectedImovel(null);
              setIsDialogOpen(open);
            }}
          >
            <DialogTrigger asChild>
              <Button className="invistaix-gradient">
                <Plus className="h-4 w-4 mr-2" />
                Cadastrar Imóvel
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {selectedImovel ? 'Editar Imóvel' : 'Cadastrar Novo Imóvel'}
                </DialogTitle>
                <DialogDescription>
                  {selectedImovel
                    ? 'Altere os dados do imóvel.'
                    : 'Preencha os detalhes do imóvel para adicioná-lo à sua carteira.'}
                </DialogDescription>
              </DialogHeader>
              <FormularioImovel
                onSuccess={handleFormSuccess}
                currentUser={user}
                imovel={selectedImovel}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou endereço..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={propertyType || 'all'} onValueChange={handleTypeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo de imóvel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              {propertyTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {getTipoDisplay(type)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="col-span-full text-center py-12 text-destructive">
            {error}
          </div>
        ) : filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <CardImovel
              key={property.id.toString()}
              id={property.id.toString()}
              name={property.nomeImovel}
              type={property.tipoImovel}
              address={`${property.endereco.rua}, ${property.endereco.numero} - ${property.endereco.bairro}`}
              rentValue={property.valorAluguelAtual}
              saleValue={property.valorVendaEstimado}
              rooms={property.numQuartos}
              bathrooms={0}
              area={property.area || 0}
              imageUrl={
                property.fotoImovel
                  ? `data:image/jpeg;base64,${property.fotoImovel}`
                  : undefined
              }
              actions={
                userType !== 'PROPRIETARIO' && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSelectedImovel(property);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        setImovelToDelete(property);
                        setIsDeleteOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )
              }
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <Home className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium">Nenhum imóvel encontrado</h3>
            <p className="text-muted-foreground mt-1">
              Tente ajustar seus filtros ou cadastre um novo imóvel.
            </p>
          </div>
        )}
      </div>

      {imovelToDelete && (
        <DeleteImovelDialog
          isOpen={isDeleteOpen}
          onClose={() => {
            setIsDeleteOpen(false);
            setImovelToDelete(null);
          }}
          onConfirm={handleDelete}
          imovelName={imovelToDelete.nomeImovel}
        />
      )}
    </div>
  );
};

export default Imoveis;
