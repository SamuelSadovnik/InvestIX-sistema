import React from 'react';
import { useForm } from 'react-hook-form';
import { FormDescription } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Proprietario } from '@/hooks/useProprietario';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';

const formSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  tipoDocumento: z.enum(['CPF', 'CNPJ'], {
    required_error: 'Selecione o tipo de pessoa',
  }),
  documento: z.string().min(11, 'Documento deve ter pelo menos 11 caracteres'),
  email: z.string().email('Email inválido'),
  telefone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  senha: z.string().min(6,  "Senha deve ter pelo menos 6 caracteres." ),
});

type FormData = z.infer<typeof formSchema>;

interface EditOwnerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  owner: Proprietario | null;  // Alterei para poder tratar null
  onUpdate: (data: FormData) => void;
}

export const EditOwnerDialog: React.FC<EditOwnerDialogProps> = ({
  isOpen,
  onClose,
  owner,
  onUpdate,
}) => {
  if (!owner) {
    return null; // Ou um loading spinner, se preferir
  }

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: owner.nome,
      tipoDocumento: owner.tipoDocumento,
      documento: owner.documento,
      email: owner.email,
      telefone: owner.telefone,
      senha: owner.senha,
    },
  });

  const onSubmit = (data: FormData) => {
    onUpdate(data);
    toast.success('Proprietário atualizado com sucesso!');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Editar Proprietário</DialogTitle>
          <DialogDescription>
            Altere os dados do proprietário conforme necessário.
          </DialogDescription>
        </DialogHeader>        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 proprietario-form">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 form-grid">
              <FormField
                control={form.control}
                name="tipoDocumento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="CPF">Pessoa Física</SelectItem>
                        <SelectItem value="CNPJ">Pessoa Jurídica</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do proprietário" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="documento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF/CNPJ</FormLabel>
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
                  <FormItem className="md:col-span-2">
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
              <Button type="submit">
                Salvar Alterações
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
