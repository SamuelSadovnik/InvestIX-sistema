
import React, { useState } from 'react';
import { 
  ImageIcon, 
  Plus, 
  Search,
  Filter,
  MapPin,
  Calendar,
  Eye
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

const Previews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [previewType, setPreviewType] = useState<string | undefined>(undefined);
  
  const filteredPreviews = properties.map(property => ({
    ...property,
    lastVisit: new Date(2025, 3, Math.floor(Math.random() * 15) + 1).toLocaleDateString('pt-BR'),
    nextVisit: new Date(2025, 4, Math.floor(Math.random() * 30) + 1).toLocaleDateString('pt-BR'),
    status: Math.random() > 0.5 ? 'Agendada' : 'Pendente'
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Vistorias</h1>
          <p className="text-muted-foreground">Gerencie as vistorias dos imóveis</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="invistaix-gradient">
              <Plus className="h-4 w-4 mr-2" />
              Agendar Vistoria
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Agendar Nova Vistoria</DialogTitle>
              <DialogDescription>
                Preencha os dados para agendar uma nova vistoria.
              </DialogDescription>
            </DialogHeader>
            <div className="p-4">
              <p className="text-center text-muted-foreground">
                Formulário de agendamento seria implementado aqui
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por imóvel ou endereço..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={previewType} onValueChange={setPreviewType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos</SelectItem>
              <SelectItem value="Agendada">Agendada</SelectItem>
              <SelectItem value="Pendente">Pendente</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPreviews.map((preview) => (
          <Card key={preview.id} className="hover-scale">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{preview.name}</CardTitle>
                <Badge 
                  className={preview.status === 'Agendada' ? 
                    'bg-green-100 text-green-800 hover:bg-green-100' : 
                    'bg-amber-100 text-amber-700 hover:bg-amber-100'}
                >
                  {preview.status}
                </Badge>
              </div>
              <CardDescription className="flex items-center mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                {preview.address}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Última vistoria: {preview.lastVisit}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Próxima vistoria: {preview.nextVisit}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                Ver Detalhes
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Previews;
