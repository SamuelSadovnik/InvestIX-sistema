import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { Gestor } from '@/services/gestorService';

const formSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  telefone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  cpf: z.string().min(11, 'CPF deve ter pelo menos 11 dígitos'),
  senha: z.string().min(6,  "Senha deve ter pelo menos 6 caracteres." ),
});

type FormData = z.infer<typeof formSchema>;

interface EditManagerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  manager: Gestor;
  onUpdate: (data: FormData) => void;
}

export const EditManagerDialog: React.FC<EditManagerDialogProps> = ({
  isOpen,
  onClose,
  manager,
  onUpdate,
}) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: manager.nome,
      email: manager.email,
      telefone: manager.telefone,
      cpf: manager.cpf,
      senha: manager.senha
    },
  });

  const onSubmit = (data: FormData) => {
    onUpdate(data);
    toast.success('Gestor atualizado com sucesso!');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Editar Gestor</DialogTitle>
          <DialogDescription>
            Altere os dados do gestor conforme necessário.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do gestor" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input placeholder="000.000.000-00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@exemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telefone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="(00) 00000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="senha"
                render={({ field }) => (
                <FormItem className="form-field-container">
                  <FormLabel className="text-sm">Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Digite uma senha segura"
                      {...field}
                      className="text-sm"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Senha com pelo menos 6 caracteres
                  </FormDescription>
                  <FormMessage />
                </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">Salvar Alterações</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};