import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';

interface AssessmentFormModalProps {
  propertyId: number;
  isOpen: boolean;
  onClose: () => void;
  onAssessmentAdded: () => void;
}

const AssessmentFormModal = ({ propertyId, isOpen, onClose, onAssessmentAdded }: AssessmentFormModalProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [assessor, setAssessor] = useState('');
  const [value, setValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/avaliacoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: date ? date.toISOString().split('T')[0] : '', // Format as YYYY-MM-DD
          avaliador: assessor,
          valorAvaliacao: parseFloat(value),
          imovel: { id: propertyId }
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar avaliação');
      }

      toast({
        title: 'Sucesso',
        description: 'Avaliação adicionada com sucesso',
        variant: 'default',
      });

      onAssessmentAdded();
      onClose();
    } catch (error) {
      toast({
        title: 'Erro',
        description: error.message || 'Ocorreu um erro ao adicionar a avaliação',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Avaliação</DialogTitle>
          <DialogDescription>Preencha os detalhes da nova avaliação do imóvel</DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="date">Data da Avaliação</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="assessor">Avaliador</Label>
            <Input
              id="assessor"
              value={assessor}
              onChange={(e) => setAssessor(e.target.value)}
              placeholder="Nome do avaliador"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="value">Valor (R$)</Label>
            <Input
              id="value"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Valor da avaliação"
              min="0"
              step="0.01"
              required
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar Avaliação'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AssessmentFormModal;