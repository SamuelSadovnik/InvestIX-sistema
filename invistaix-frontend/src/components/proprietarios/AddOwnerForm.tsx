import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { criarProprietario } from '@/hooks/useProprietario';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const formSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  cpfCnpj: z.string().min(11, 'Documento deve ter pelo menos 11 caracteres'),
  email: z.string().email('Email inválido'),
  telefone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  senha: z.string().min(6,  "Senha deve ter pelo menos 6 caracteres." ),
});

interface AddOwnerFormProps {
  onSuccess: () => void;
}

const AddOwnerForm = ({ onSuccess }: AddOwnerFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      cpfCnpj: '',
      email: '',
      telefone: '',
      senha: '',
    },
  });
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      await criarProprietario(values);
      form.reset();
      toast.success('Proprietário cadastrado com sucesso!');
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || 'Erro ao cadastrar proprietário');
      console.error('Erro:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 sm:space-y-6 proprietario-form">
        <Card>          
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl">Informações Pessoais</CardTitle>
            <CardDescription className="text-sm">Dados básicos do proprietário</CardDescription>
          </CardHeader>          
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 form-grid">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem className="form-field-container sm:col-span-2">
                    <FormLabel className="text-sm">Nome completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do proprietário" {...field} className="text-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cpfCnpj"
                render={({ field }) => (
                  <FormItem className="form-field-container">
                    <FormLabel className="text-sm">CPF/CNPJ</FormLabel>
                    <FormControl>
                      <Input placeholder="000.000.000-00" {...field} className="text-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="form-field-container">
                    <FormLabel className="text-sm">Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@exemplo.com" {...field} className="text-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telefone"
                render={({ field }) => (
                  <FormItem className="form-field-container">
                    <FormLabel className="text-sm">Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="(00) 00000-0000" {...field} className="text-sm" />
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
          </CardContent>        </Card>
 
        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-2 sm:pt-4 pb-4">
          <Button type="button" variant="outline" onClick={onSuccess} className="w-full sm:w-auto text-sm">
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto bg-primary invistaix-gradient text-sm">
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar Proprietário'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddOwnerForm;
