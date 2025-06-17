import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { deletarProprietario } from '@/hooks/useProprietario';

interface DeleteOwnerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  ownerId: number | null;
  ownerName: string;
  onAfterDelete?: () => void;
}

export const DeleteOwnerDialog: React.FC<DeleteOwnerDialogProps> = ({
  isOpen,
  onClose,
  ownerId,
  ownerName,
  onAfterDelete,
}) => {
  const handleConfirm = async () => {
    try {
      await deletarProprietario(ownerId);
      if (onAfterDelete) onAfterDelete(); // para atualizar a lista, se necessário
      onClose();
    } catch (error) {
      console.error('Erro ao excluir proprietário:', error);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir o proprietário "{ownerName}"? Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
