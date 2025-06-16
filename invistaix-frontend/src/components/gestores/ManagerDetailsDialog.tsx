
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Mail,
  Phone,
  User
} from 'lucide-react';

interface Manager {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  properties: number[];
}

interface ManagerDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  manager: Manager;
}

export const ManagerDetailsDialog: React.FC<ManagerDetailsDialogProps> = ({
  isOpen,
  onClose,
  manager,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{manager.name}</DialogTitle>
          <DialogDescription>
            Informações detalhadas do gestor
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm">
                <User className="h-4 w-4 mr-3 text-muted-foreground" />
                <span className="font-medium mr-2">ID:</span>
                <span>{manager.id}</span>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                <span className="font-medium mr-2">Email:</span>
                <span>{manager.email}</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                <span className="font-medium mr-2">Telefone:</span>
                <span>{manager.phone}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="font-medium mr-2">Função:</span>
                <span>{manager.role}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="font-medium mr-2">Imóveis Gerenciados:</span>
                <span>{manager.properties?.length || 0}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
