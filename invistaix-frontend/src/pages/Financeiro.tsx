import React, { useState, useEffect, useCallback } from 'react';
import { 
  DollarSign, 
  Plus, 
  ArrowUpRight,
  ArrowDownRight,
  BarChart,
  Download,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import PerformanceChart from '@/components/charts/PerformanceChart';
import { AddTransactionForm } from '@/components/financeiro/AddTransactionForm';
import useImoveis from '@/hooks/useImoveis';

const API_RECEITAS = '/api/rendimentos';
const API_DESPESAS = '/api/despesas';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

export default function Financeiro() {
  const { imoveis, loading: loadingImoveis } = useImoveis();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Buscar receitas e despesas do backend
  const fetchTransactions = useCallback(async () => {
    try {
      const [receitasRes, despesasRes] = await Promise.all([
        fetch(API_RECEITAS, { headers: getAuthHeaders() }),
        fetch(API_DESPESAS, { headers: getAuthHeaders() })
      ]);
      const receitas = await receitasRes.json();
      const despesas = await despesasRes.json();
      // Unificar e normalizar para a tabela
      const receitasFormatadas = receitas.map((r: any) => ({
        id: r.id,
        date: r.dataRendimento,
        propertyId: r.imoveis && r.imoveis.length > 0 ? String(r.imoveis[0].id) : '',
        description: r.descricao,
        category: 'Receita',
        type: 'income',
        value: r.valorRendimento
      }));
      const despesasFormatadas = despesas.map((d: any) => ({
        id: d.id,
        date: d.dataDespesa,
        propertyId: d.imoveis && d.imoveis.length > 0 ? String(d.imoveis[0].id) : '',
        description: d.descricao,
        category: 'Despesa',
        type: 'expense',
        value: d.valorDespesa
      }));
      setTransactions([...receitasFormatadas, ...despesasFormatadas].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } catch (err) {
      setTransactions([]);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Calcula totais
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + Number(curr.value), 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + Number(curr.value), 0);
  const result = totalIncome - totalExpenses;

  // Dados para gráficos (simples: soma por mês)
  function getChartData(type: 'income' | 'expense' | 'result') {
    // Agrupa por mês/ano presente nos dados
    const monthMap: { [key: string]: { name: string; value: number } } = {};
    transactions.forEach(t => {
      const date = new Date(t.date);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      const name = `${date.toLocaleString('pt-BR', { month: 'short' })}/${date.getFullYear()}`;
      if (!monthMap[key]) monthMap[key] = { name, value: 0 };
      if (type === 'income' && t.type === 'income') monthMap[key].value += Number(t.value);
      if (type === 'expense' && t.type === 'expense') monthMap[key].value += Number(t.value);
      if (type === 'result') {
        if (t.type === 'income') monthMap[key].value += Number(t.value);
        if (t.type === 'expense') monthMap[key].value -= Number(t.value);
      }
    });
    // Ordena por data
    return Object.values(monthMap).sort((a, b) => {
      const [am, ay] = a.name.split('/');
      const [bm, by] = b.name.split('/');
      // Converter mês abreviado para número
      const monthNames = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
      const aMonthIdx = monthNames.indexOf(am.toLowerCase());
      const bMonthIdx = monthNames.indexOf(bm.toLowerCase());
      if (ay !== by) return Number(ay) - Number(by);
      return aMonthIdx - bMonthIdx;
    });
  }

  async function handleAddTransaction(data: any) {
    setIsLoading(true);
    const isIncome = data.type === 'income';
    const endpoint = isIncome ? API_RECEITAS : API_DESPESAS;
    // Usar description ou category como fallback
    const descricao = data.description || data.category || '';
    const payload = isIncome
      ? {
          valorRendimento: Number(data.value),
          dataRendimento: data.date,
          descricao,
          imoveis: [{ id: Number(data.propertyId) }]
        }
      : {
          valorDespesa: Number(data.value),
          dataDespesa: data.date,
          descricao,
          imoveis: [{ id: Number(data.propertyId) }]
        };
    await fetch(endpoint, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    setIsDialogOpen(false);
    setIsLoading(false);
    fetchTransactions();
  }

  // Adaptar imóveis para o formato do formulário
  const propertyOptions = imoveis.map(imovel => ({ id: String(imovel.id), name: imovel.nomeImovel }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-primary" />
            Financeiro
          </h1>
          <p className="text-muted-foreground">Gestão financeira da sua carteira de imóveis</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Filtros Financeiros</DialogTitle>
                <DialogDescription>
                  Selecione os filtros para visualizar os dados financeiros.
                </DialogDescription>
              </DialogHeader>
              <div className="p-4">
                <p className="text-center text-muted-foreground">
                  Filtros seriam implementados aqui
                </p>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="invistaix-gradient">
                <Plus className="h-4 w-4 mr-2" />
                Nova Transação
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Registrar Nova Transação</DialogTitle>
                <DialogDescription>
                  Preencha os dados da transação financeira.
                </DialogDescription>
              </DialogHeader>
              <div className="p-4">
                <AddTransactionForm 
                  properties={propertyOptions}
                  onSubmit={handleAddTransaction}
                  isLoading={isLoading}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Receitas</CardTitle>
            <ArrowUpRight className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              R$ {totalIncome.toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground">Total acumulado no período</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Despesas</CardTitle>
            <ArrowDownRight className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">
              R$ {totalExpenses.toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground">Total acumulado no período</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Resultado</CardTitle>
            <BarChart className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              R$ {result.toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground">Receitas - Despesas no período</p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="transacoes" className="w-full mt-6">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="transacoes">Transações</TabsTrigger>
          <TabsTrigger value="graficos">Gráficos</TabsTrigger>
        </TabsList>
        <TabsContent value="transacoes">
          <div className="w-full">
            <Card>
              <CardHeader>
                <CardTitle>Transações Financeiras</CardTitle>
                <CardDescription>Receitas e despesas de todos os imóveis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Imóvel</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Valor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.length === 0 ? (
                        <TableRow><TableCell colSpan={5}>Nenhuma transação encontrada.</TableCell></TableRow>
                      ) : (
                        transactions.map((t, idx) => {
                          const imovel = imoveis.find(i => String(i.id) === t.propertyId);
                          return (
                            <TableRow key={idx}>
                              <TableCell>{new Date(t.date).toLocaleDateString('pt-BR')}</TableCell>
                              <TableCell>{imovel?.nomeImovel || 'Imóvel não encontrado'}</TableCell>
                              <TableCell>{t.description}</TableCell>
                              <TableCell>
                                <Badge variant={t.type === 'income' ? 'default' : 'destructive'}>
                                  {t.category}
                                </Badge>
                              </TableCell>
                              <TableCell className={t.type === 'income' ? 'text-green-700' : 'text-red-700'}>
                                {t.type === 'income' ? '+' : '-'}R$ {Number(t.value).toLocaleString('pt-BR')}
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar CSV
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="graficos">
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Receitas</CardTitle>
                  <CardDescription>Evolução das receitas ao longo do tempo</CardDescription>
                </CardHeader>
                <CardContent>
                  <PerformanceChart
                    title="Receitas"
                    data={getChartData('income')}
                    color="green"
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Despesas</CardTitle>
                  <CardDescription>Evolução das despesas ao longo do tempo</CardDescription>
                </CardHeader>
                <CardContent>
                  <PerformanceChart
                    title="Despesas"
                    data={getChartData('expense')}
                    color="red"
                  />
                </CardContent>
              </Card>
            </div>
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resultado Financeiro</CardTitle>
                  <CardDescription>Receitas - Despesas</CardDescription>
                </CardHeader>
                <CardContent>
                  <PerformanceChart
                    title="Resultado Financeiro"
                    data={getChartData('result')}
                    color="purple"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
