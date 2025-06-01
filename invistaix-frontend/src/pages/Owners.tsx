
import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search,
  Filter,
  Building,
  UserCheck,
  Mail,
  Phone
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
import { owners, properties } from '@/data/mockData';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';

const Owners = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ownerType, setOwnerType] = useState<string | undefined>(undefined);
  
  const filteredOwners = owners.filter(owner => {
    const matchesSearch = owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          owner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          owner.document.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !ownerType || owner.type === ownerType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Proprietários</h1>
          <p className="text-muted-foreground">Gerencie os proprietários de imóveis</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="invistaix-gradient">
              <Plus className="h-4 w-4 mr-2" />
              Cadastrar Proprietário
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Proprietário</DialogTitle>
              <DialogDescription>
                Preencha os dados do proprietário para adicioná-lo ao sistema.
              </DialogDescription>
            </DialogHeader>
            <div className="p-4">
              <p className="text-center text-muted-foreground">
                Formulário de cadastro seria implementado aqui
              </p>
            </div>
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
          <Select value={ownerType} onValueChange={setOwnerType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo de pessoa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos os tipos</SelectItem>
              <SelectItem value="PF">Pessoa Física</SelectItem>
              <SelectItem value="PJ">Pessoa Jurídica</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredOwners.length > 0 ? (
          filteredOwners.map((owner) => {
            const ownerProperties = properties.filter(p => p.owner === owner.id);
            return (
              <Card key={owner.id} className="hover-scale">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{owner.name}</CardTitle>
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
                      <span>{owner.document}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{owner.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{owner.phone}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Ver Detalhes</Button>
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
    </div>
  );
};

export default Owners;
