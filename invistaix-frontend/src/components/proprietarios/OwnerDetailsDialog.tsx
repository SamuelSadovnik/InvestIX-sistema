import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Building, 
  Mail, 
  Phone, 
  UserCheck,
  MapPin
} from 'lucide-react';
import { properties } from '@/data/mockData';

interface Owner {
  id: string;
  nome: string;
  tipoDocumento: 'CPF' | 'CNPJ';
  documento: string;
  email: string;
  telefone: string;
}

interface OwnerDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  owner: Owner;
}

export const OwnerDetailsDialog: React.FC<OwnerDetailsDialogProps> = ({
  isOpen,
  onClose,
  owner,
}) => {
  if (!owner) return null;
  const ownerProperties = properties.filter(p => p.owner === owner.id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {owner.nome}
            <Badge 
              className={owner.type === 'PF' ? 'bg-invistaix-100 text-invistaix-400 hover:bg-invistaix-100' : 'bg-blue-100 text-blue-700 hover:bg-blue-100'}
            >
              {owner.type === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Informações detalhadas do proprietário
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm">
                <UserCheck className="h-4 w-4 mr-3 text-muted-foreground" />
                <span className="font-medium mr-2">Documento:</span>
                <span>{owner.tipoDocumento}</span>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                <span className="font-medium mr-2">Email:</span>
                <span>{owner.email}</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                <span className="font-medium mr-2">Telefone:</span>
                <span>{owner.telefone}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Imóveis ({ownerProperties.length})
              </CardTitle>
              <CardDescription>
                Imóveis associados a este proprietário
              </CardDescription>
            </CardHeader>
            <CardContent>
              {ownerProperties.length > 0 ? (
                <div className="space-y-3">
                  {ownerProperties.map((property) => (
                    <div key={property.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{property.name}</h4>
                        <Badge variant="outline">{property.type}</Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{property.address}</span>
                      </div>
                      <div className="mt-2 text-sm">
                        <span className="font-medium">Valor de Matrícula: </span>
                        <span>R$ {property.matriculaValue.toLocaleString('pt-BR')}</span>
                      </div>
                      {property.rentValue && (
                        <div className="mt-1 text-sm">
                          <span className="font-medium">Aluguel: </span>
                          <span>R$ {property.rentValue.toLocaleString('pt-BR')}</span>
                        </div>
                      )}
                      {property.saleValue && (
                        <div className="mt-1 text-sm">
                          <span className="font-medium">Valor de Venda: </span>
                          <span>R$ {property.saleValue.toLocaleString('pt-BR')}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  Nenhum imóvel associado a este proprietário.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
