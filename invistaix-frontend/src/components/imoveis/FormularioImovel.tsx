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
import { TipoImovel, propertyTypes, getTipoDisplay } from '@/utils/imovelUtils';

const formSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  type: z.enum(propertyTypes as [string, ...string[]], {
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
  foto: z.any().optional(), // Opcional no modo de edição
});

type FormData = z.infer<typeof formSchema>;

interface AddPropertyFormProps {
  onSuccess: () => void;
  currentUser: any; // TODO: Replace with proper User type
  imovel?: any; // O imóvel a ser editado, se for modo de edição
}

const FormularioImovel = (props: AddPropertyFormProps) => {  const { onSuccess, currentUser, imovel } = props;
  const isEditMode = !!imovel; // Verifica se estamos no modo de edição
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [proprietarios, setProprietarios] = useState<Proprietario[]>([]);
  const [isLoadingProprietarios, setIsLoadingProprietarios] = useState(true);
  const [gestores, setGestores] = useState<Gestor[]>([]);
  const [isLoadingGestores, setIsLoadingGestores] = useState(true);
  const [isManager, setIsManager] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Carregamento de proprietários e gestores
  useEffect(() => {
    const carregarProprietarios = async () => {
      try {
        setIsLoadingProprietarios(true);
        const data = await listarProprietarios();
        setProprietarios(data);
      } catch (error) {
        console.error('Erro ao carregar proprietários:', error);
        toast.error('Erro ao carregar proprietários');
      } finally {
        setIsLoadingProprietarios(false);
      }
    };

    const carregarGestores = async () => {
      try {
        setIsLoadingGestores(true);
        const data = await listarGestores();
        setGestores(data);
      } catch (error) {
        console.error('Erro ao carregar gestores:', error);
        toast.error('Erro ao carregar gestores');
      } finally {
        setIsLoadingGestores(false);
      }
    };

    carregarProprietarios();
    carregarGestores();
  }, []);

  // Função para criar o schema do formulário dinamicamente
  function createFormSchema(isEditMode: boolean) {
    if (isEditMode) {
      // No modo de edição, a foto é opcional
      return formSchema;
    } else {
      // No modo de criação, a foto é obrigatória
      return formSchema.extend({
        foto: z
          .any()
          .refine((file) => file instanceof File && file.size > 0, {
            message: 'A foto do imóvel é obrigatória',
          }),
      });
    }
  }
  
  const form = useForm<FormData>({
      resolver: zodResolver(createFormSchema(isEditMode)),
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

  // Carregar proprietários
  useEffect(() => {
    async function carregarProprietarios() {
      try {
        setIsLoadingProprietarios(true);
        const dados = await listarProprietarios();
        setProprietarios(dados);
      } catch (error) {
        console.error("Erro ao carregar proprietários:", error);
        toast.error("Não foi possível carregar os proprietários");
      } finally {
        setIsLoadingProprietarios(false);
      }
    }
    carregarProprietarios();
  }, []);

  // Carregar gestores
  useEffect(() => {
    async function carregarGestores() {
      try {
        setIsLoadingGestores(true);
        const dados = await listarGestores();
        setGestores(dados);
      } catch (error) {
        console.error("Erro ao carregar gestores:", error);
        toast.error("Não foi possível carregar os gestores");
      } finally {
        setIsLoadingGestores(false);
      }
    }
      // Verificar se o usuário atual é gestor
    if (props.currentUser) {
      setIsManager(props.currentUser.userType === 'GESTOR');
      setIsAdmin(props.currentUser.userType === 'ADMIN');
    }
    
    carregarGestores();
  }, [props.currentUser, isManager]);

  // Carregar dados do imóvel quando estiver no modo de edição
  useEffect(() => {
    if (imovel) {
      // Preencher o formulário com os dados do imóvel existente
      form.reset({
        name: imovel.nomeImovel || '',
        type: imovel.tipoImovel || '',
        rua: imovel.endereco?.rua || '',
        numero: imovel.endereco?.numero || '',
        complemento: imovel.endereco?.complemento || '',
        bairro: imovel.endereco?.bairro || '',
        cidade: imovel.endereco?.cidade || '',
        estado: imovel.endereco?.estado || '',
        cep: imovel.endereco?.cep || '',
        matriculaValue: imovel.valorMatricula || 0,
        matriculaDate: imovel.dataRegistroMatricula ? new Date(imovel.dataRegistroMatricula).toISOString().split('T')[0] : '',
        rentValue: imovel.valorAluguelAtual || 0,
        saleValue: imovel.valorVendaEstimado || 0,
        taxValue: imovel.valorIptu || 0,
        rooms: imovel.numQuartos || 0,
        bathrooms: imovel.numBanheiros || 0,
        area: imovel.area || 0,
        owner: imovel.proprietario?.id?.toString() || '',
        manager: imovel.gestor?.id?.toString() || '',
        // Foto será selecionada pelo usuário novamente
        foto: null,
      });
    }
  }, [imovel, form]);
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Validação para foto (obrigatória apenas para novos cadastros)
      if (!isEditMode && (!data.foto || !(data.foto instanceof File) || data.foto.size === 0)) {
        throw new Error('A foto do imóvel é obrigatória para novos cadastros');
      }
      
      // Map property type to backend values
      const backendData = {
        ...(isEditMode && { id: imovel.id }), // Incluir ID no caso de edição
        nomeImovel: data.name,
        tipoImovel: data.type,
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
        numBanheiros: data.bathrooms || 0,
        area: data.area,
        proprietario: {
          id: parseInt(data.owner)
        },
        gestor: {
          id: parseInt(data.manager)
        }
      };

      // Enviar dados para o backend usando FormData
      const formData = new FormData();
      formData.append('imovel', new Blob([JSON.stringify(backendData)], {
        type: 'application/json'
      }));
      
      // Só envia foto se uma nova foto foi selecionada ou estamos em modo de criação
      if (data.foto instanceof File && data.foto.size > 0) {
        formData.append('foto', data.foto);
      } else if (!isEditMode) {
        // No modo de criação, a foto é obrigatória
        throw new Error('A foto do imóvel é obrigatória');
      }

      // Definir o método HTTP e URL com base no modo
      let method = 'POST';
      let url = '/api/imoveis';
      
      if (isEditMode) {
        method = 'PUT';
        url = `/api/imoveis/${imovel.id}`;
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        throw new Error(`Erro ${response.status}: ${errorResponse}`);
      }

      toast.success(isEditMode ? 'Imóvel atualizado com sucesso!' : 'Imóvel cadastrado com sucesso!');
      if (!isEditMode) {
        form.reset(); // Limpar formulário apenas em criação
      }
      onSuccess();
    } catch (error: any) {
      toast.error(`Erro ao ${isEditMode ? 'atualizar' : 'cadastrar'} imóvel: ${error.message}`);
      console.error('Erro detalhado:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Form {...form}>      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Informações do Imóvel</CardTitle>
            <CardDescription>
              {isEditMode 
                ? 'Altere os dados do imóvel conforme necessário'
                : 'Dados básicos do imóvel'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Linha 1: Nome do Imóvel (3/4) e Tipo (1/4) */}
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Imóvel</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ex: Apartamento Centro" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {propertyTypes.map((tipo) => (
                              <SelectItem key={tipo} value={tipo}>
                                {getTipoDisplay(tipo)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>              {/* Linha 2: Rua (3/4) e Número (1/4) */}
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-3">
                  <FormField
                    control={form.control}
                    name="rua"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rua</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ex: Av. Paulista" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="numero"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ex: 1000" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Linha 3: Complemento (1/2) e Bairro (1/2) */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="complemento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Complemento</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ex: Apt 101" 
                          {...field}
                        />
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
                        <Input 
                          placeholder="Ex: Bela Vista" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Linha 4: Cidade (2/4), Estado (1/4), CEP (1/4) */}
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="cidade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ex: São Paulo" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="estado"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ex: SP" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="cep"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CEP</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ex: 01310-100" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>              {/* Linha 5: Valor da Matrícula (3/4) e Data da Matrícula (1/4) */}
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-3">
                  <FormField
                    control={form.control}
                    name="matriculaValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor da Matrícula</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-2 text-muted-foreground">R$</span>
                            <Input
                              type="number"
                              placeholder="350.000"
                              className="pl-8"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="matriculaDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Data da Matrícula</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Valores e Características</CardTitle>
            <CardDescription>Informações adicionais e financeiras</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Linha 1: Valor do Aluguel (1/3), Valor de Venda (1/3), IPTU (1/3) */}
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="rentValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor do Aluguel</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-muted-foreground">R$</span>
                          <Input
                            type="number"
                            placeholder="2.000"
                            className="pl-8"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            // Sempre editável, pois está na lista de campos permitidos
                          />
                        </div>
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
                      <FormLabel>Valor de Venda</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-muted-foreground">R$</span>
                          <Input
                            type="number"
                            placeholder="450.000"
                            className="pl-8"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            // Sempre editável, pois está na lista de campos permitidos
                          />
                        </div>
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
                      <FormLabel>IPTU (Anual)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-muted-foreground">R$</span>
                          <Input
                            type="number"
                            placeholder="1.200"
                            className="pl-8"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            // Sempre editável, pois está na lista de campos permitidos
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Linha 2: Quartos (1/3), Banheiros (1/3), Área (1/3) */}
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="rooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de Quartos</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="3"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          // Sempre editável, pois está na lista de campos permitidos
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
                      <FormLabel>Número de Banheiros</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="2"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          // Sempre editável, pois está na lista de campos permitidos
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
                          // Sempre editável, pois está na lista de campos permitidos
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>        </Card>        {/* Linha 3: Proprietário (1/2) e Gestor (1/2) */}
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Proprietário e Gestor</CardTitle>
            <CardDescription>Selecione o proprietário e gestor deste imóvel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="owner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proprietário</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger disabled={isLoadingProprietarios}>
                          <SelectValue placeholder="Selecione um proprietário" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoadingProprietarios ? (
                          <SelectItem value="loading" disabled>Carregando proprietários...</SelectItem>
                        ) : proprietarios.length === 0 ? (
                          <SelectItem value="empty" disabled>Nenhum proprietário encontrado</SelectItem>
                        ) : (
                          proprietarios.map((proprietario) => (
                            <SelectItem key={proprietario.id} value={proprietario.id.toString()}>
                              {proprietario.nome}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="manager"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gestor</FormLabel>
                    {isManager ? (
                      <div className="p-3 border rounded-md bg-muted/50">
                        <p className="text-sm font-medium">{currentUser.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Você é o gestor responsável por este imóvel
                        </p>
                        <input type="hidden" {...form.register('manager')} value={currentUser.id} />
                      </div>
                    ) : (
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoadingGestores}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um gestor" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {isLoadingGestores ? (
                            <SelectItem value="loading" disabled>Carregando gestores...</SelectItem>
                          ) : gestores.length === 0 ? (
                            <SelectItem value="empty" disabled>Nenhum gestor encontrado</SelectItem>
                          ) : (
                            gestores.map((gestor) => (
                              <SelectItem key={gestor.id} value={gestor.id.toString()}>
                                {gestor.nome}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Linha 4: Upload de Foto */}
        <div>
          <FormField
            control={form.control}
            name="foto"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Foto do Imóvel</FormLabel>
                <FormControl>
                  <div className="flex flex-col space-y-2">
                    <Input
                      {...fieldProps}
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          onChange(file);
                        }
                      }}
                      // Sempre editável, pois está na lista de campos permitidos
                    />
                    {isEditMode && !value && (
                      <p className="text-sm text-muted-foreground">
                        Manteremos a foto atual caso nenhuma nova seja selecionada
                      </p>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button 
            type="submit" 
            className="invistaix-gradient" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <><span className="animate-spin mr-2">↻</span> Enviando...</>
            ) : (
              isEditMode ? 'Atualizar Imóvel' : 'Cadastrar Imóvel'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormularioImovel;