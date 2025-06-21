import React, { useState, useEffect, useRef } from 'react';
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Property } from '@/data/mockData';
import { listarProprietarios, Proprietario } from '@/hooks/useProprietario';
import { listarGestores, Gestor } from '@/hooks/useGestor';

const formSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  type: z.enum(['Casa', 'Apartamento', 'Comercial', 'Terreno'], {
    required_error: 'Selecione um tipo de imóvel',
  }),
  rua: z.string().min(2, 'Rua é obrigatória'),
  numero: z.string().min(1, 'Número é obrigatório'),
  complemento: z.string().optional(),
  bairro: z.string().min(2, 'Bairro é obrigatório'),
  cidade: z.string().min(2, 'Cidade é obrigatória'),
  estado: z.string().min(2, 'Estado é obrigatório'),
  cep: z.string().min(8, 'CEP é obrigatório'),
  matriculaValue: z.number().min(1, 'Valor da matrícula deve ser maior que 0'),
  matriculaDate: z.string().min(1, 'Data da matrícula é obrigatória'),
  rentValue: z.number().optional(),
  saleValue: z.number().optional(),
  taxValue: z.number().min(0, 'Valor do imposto não pode ser negativo'),
  rooms: z.number().optional(),
  bathrooms: z.number().optional(),
  area: z.number().optional(),
  owner: z.string().min(1, 'Proprietário é obrigatório'),
  manager: z.string().min(1, 'Gestor é obrigatório'),
  foto: z.any().refine(file => file instanceof File && file.size > 0, {
    message: "A foto do imóvel é obrigatória",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface AddPropertyFormProps {
  onSuccess: () => void;
  currentUser: any; // TODO: Replace with proper User type
}

const FormularioImovel = (props: AddPropertyFormProps) => {
  const { onSuccess, currentUser } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [proprietarios, setProprietarios] = useState<Proprietario[]>([]);
  const [isLoadingProprietarios, setIsLoadingProprietarios] = useState(true);
  const [gestores, setGestores] = useState<Gestor[]>([]);
  const [isLoadingGestores, setIsLoadingGestores] = useState(true);
  const [isManager, setIsManager] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (props.currentUser) {
      setIsManager(props.currentUser.userType === 'GESTOR');
      setIsAdmin(props.currentUser.userType === 'ADMIN');
    }
  }, [props.currentUser]);

  useEffect(() => {
    const carregarDados = async () => {
      setIsLoadingProprietarios(true);
      setIsLoadingGestores(true);
      
      try {
        // Carregar proprietários com filtro baseado no tipo de usuário
        let proprietariosData = await listarProprietarios();
        
        if (isManager && currentUser) {
          // Filter owners managed by current manager
          // Temporary solution until API supports filtering
          // For now, show all owners with a toast notification
          toast.info('Filtragem de proprietários por gestor ainda não implementada');
        }
        
        setProprietarios(proprietariosData);
      } catch (error) {
        toast.error('Erro ao carregar proprietários');
        console.error('Erro ao carregar proprietários:', error);
      } finally {
        setIsLoadingProprietarios(false);
      }
      
      try {
        // Carregar gestores apenas para administradores
        if (isAdmin) {
          const gestoresData = await listarGestores();
          setGestores(gestoresData);
        } else {
          // For managers, set themselves as the only option
          if (isManager && currentUser) {
            setGestores([{
              id: currentUser.id,
              nome: currentUser.name,
              cpf: currentUser.cpf,
              email: currentUser.email,
              telefone: currentUser.telefone || '',
              senha: ''
            }]);
          } else {
            setGestores([]);
          }
        }
      } catch (error) {
        toast.error('Erro ao carregar gestores');
        console.error('Erro ao carregar gestores:', error);
      } finally {
        setIsLoadingGestores(false);
      }
    };

    carregarDados();
  }, [isManager, isAdmin, currentUser]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      rua: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
      matriculaValue: 0,
      matriculaDate: '',
      rentValue: 0,
      saleValue: 0,
      taxValue: 0,
      rooms: 0,
      bathrooms: 0,
      area: 0,
      owner: '',
      manager: '',
      foto: null,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Map property type to backend values
      const tipoMap: Record<string, string> = {
        'Casa': 'CASA',
        'Apartamento': 'APARTAMENTO',
        'Comercial': 'COMERCIAL',
        'Terreno': 'TERRENO'
      };
      
      const backendData = {
        nomeImovel: data.name,
        tipoImovel: tipoMap[data.type] || data.type,
        endereco: {
          rua: data.rua,
          numero: data.numero,
          complemento: data.complemento || '',
          bairro: data.bairro,
          cidade: data.cidade,
          estado: data.estado,
          cep: data.cep
        },
        valorMatricula: data.matriculaValue,
        dataRegistroMatricula: data.matriculaDate,
        valorAluguelAtual: data.rentValue,
        valorVendaEstimado: data.saleValue,
        valorIptu: data.taxValue,
        numQuartos: data.rooms,
        area: data.area,
        proprietario: {
          id: parseInt(data.owner)
        },
        gestor: {
          id: parseInt(data.manager)
        }
      };

      // Enviar dados para o backend
      const formData = new FormData();
      formData.append('imovel', JSON.stringify(backendData));
      formData.append('foto', data.foto);

      const response = await fetch('/api/imoveis', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        throw new Error(`Erro ${response.status}: ${errorResponse}`);
      }

      toast.success('Imóvel cadastrado com sucesso!');
      form.reset();
      onSuccess();
    } catch (error: any) {
      toast.error(`Erro ao cadastrar imóvel: ${error.message}`);
      console.error('Erro detalhado:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Informações do Imóvel</CardTitle>
            <CardDescription>Dados básicos do imóvel</CardDescription>
          </CardHeader>
          <CardContent>
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
                name="rua"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rua</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Av. Paulista" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numero"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 1000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="complemento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complemento</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Apt 101" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bairro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Bela Vista" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: São Paulo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="estado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: SP" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cep"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CEP</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 01310-100" {...field} />
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

              <FormField
                control={form.control}
                name="foto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Foto do Imóvel (Obrigatória)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Seção de Proprietários */}
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Proprietário do Imóvel</CardTitle>
            <CardDescription>Selecione o proprietário deste imóvel</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="owner"
              render={({ field }) => (
                <FormItem>
                  {isLoadingProprietarios ? (
                    <div className="text-sm text-muted-foreground">Carregando proprietários...</div>
                  ) : proprietarios.length === 0 ? (
                    <div className="text-sm text-muted-foreground">Nenhum proprietário encontrado</div>
                  ) : (
                    <div className="max-h-48 overflow-y-auto custom-scrollbar">
                      {proprietarios.map((proprietario) => (
                        <FormItem
                          key={proprietario.id}
                          className="flex flex-row items-start space-x-3 space-y-0 mb-3"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value === proprietario.id.toString()}
                              onCheckedChange={() => {
                                field.onChange(proprietario.id.toString());
                              }}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-medium">
                              {proprietario.nome}
                            </FormLabel>
                            <p className="text-xs text-muted-foreground">
                              {proprietario.cpfCnpj} - {proprietario.email}
                            </p>
                          </div>
                        </FormItem>
                      ))}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Seção de Gestores */}
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Gestor do Imóvel</CardTitle>
            <CardDescription>Selecione o gestor deste imóvel</CardDescription>
          </CardHeader>
          <CardContent>
            {isManager ? (
              <div className="p-3 border rounded-md bg-muted/50">
                <p className="text-sm font-medium">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground">
                  Você é o gestor responsável por este imóvel
                </p>
                <input type="hidden" {...form.register('manager')} value={currentUser.id} />
              </div>
            ) : (
              <FormField
                control={form.control}
                name="manager"
                render={({ field }) => (
                  <FormItem>
                    {isLoadingGestores ? (
                      <div className="text-sm text-muted-foreground">Carregando gestores...</div>
                    ) : gestores.length === 0 ? (
                      <div className="text-sm text-muted-foreground">Nenhum gestor encontrado</div>
                    ) : (
                      <div className="max-h-48 overflow-y-auto custom-scrollbar">
                        {gestores.map((gestor) => (
                          <FormItem
                            key={gestor.id}
                            className="flex flex-row items-start space-x-3 space-y-0 mb-3"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value === gestor.id.toString()}
                                onCheckedChange={() => {
                                  field.onChange(gestor.id.toString());
                                }}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-sm font-medium">
                                {gestor.nome}
                              </FormLabel>
                              <p className="text-xs text-muted-foreground">
                                {gestor.cpf} - {gestor.email}
                              </p>
                            </div>
                          </FormItem>
                        ))}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="submit" disabled={isSubmitting} className="invistaix-gradient">
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar Imóvel'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormularioImovel;
