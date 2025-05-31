import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Property } from '@/data/mockData';

const formSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  type: z.enum(['Casa', 'Apartamento', 'Comercial', 'Terreno'], {
    required_error: 'Selecione um tipo de imóvel',
  }),
  address: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres'),
  matriculaValue: z.number().min(1, 'Valor da matrícula deve ser maior que 0'),
  matriculaDate: z.string().min(1, 'Data da matrícula é obrigatória'),
  rentValue: z.number().optional(),
  saleValue: z.number().optional(),
  taxValue: z.number().min(0, 'Valor do imposto não pode ser negativo'),
  rooms: z.number().optional(),
  bathrooms: z.number().optional(),
  area: z.number().optional(),
  owner: z.string().min(1, 'Proprietário é obrigatório'),
});

type FormData = z.infer<typeof formSchema>;

interface AddPropertyFormProps {
  onSuccess: () => void;
}

const AddPropertyForm = ({ onSuccess }: AddPropertyFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      matriculaValue: 0,
      matriculaDate: '',
      rentValue: 0,
      saleValue: 0,
      taxValue: 0,
      rooms: 0,
      bathrooms: 0,
      area: 0,
      owner: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Simular criação do imóvel
      const newProperty: Property = {
        id: Date.now().toString(),
        name: data.name,
        type: data.type,
        address: data.address,
        matriculaValue: data.matriculaValue,
        matriculaDate: data.matriculaDate,
        rentValue: data.rentValue,
        saleValue: data.saleValue,
        taxValue: data.taxValue,
        rooms: data.rooms,
        bathrooms: data.bathrooms,
        area: data.area,
        owner: data.owner,
        performance: {
          percentage: 0,
          isPositive: true
        }
      };

      console.log('Novo imóvel criado:', newProperty);
      toast.success('Imóvel cadastrado com sucesso!');
      form.reset();
      onSuccess();
    } catch (error) {
      toast.error('Erro ao cadastrar imóvel');
      console.error('Erro:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Imóvel</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Apartamento Centro" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
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
                    <SelectItem value="Casa">Casa</SelectItem>
                    <SelectItem value="Apartamento">Apartamento</SelectItem>
                    <SelectItem value="Comercial">Comercial</SelectItem>
                    <SelectItem value="Terreno">Terreno</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Endereço</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Av. Paulista, 1000, São Paulo - SP" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="matriculaValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor da Matrícula (R$)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="350000" 
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="matriculaDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data da Matrícula</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rentValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor do Aluguel (R$)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="2500" 
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="saleValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor de Venda (R$)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="420000" 
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="taxValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor do Imposto (R$)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="2100" 
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="owner"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proprietário</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do proprietário" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quartos</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="2" 
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bathrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Banheiros</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="2" 
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Área (m²)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="75" 
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="submit" disabled={isSubmitting} className="invistaix-gradient">
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar Imóvel'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddPropertyForm;
