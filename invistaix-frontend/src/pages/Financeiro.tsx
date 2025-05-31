
import React, { useState } from 'react';
import { 
  DollarSign, 
  Plus, 
  ArrowUpRight,
  ArrowDownRight,
  BarChart,
  FileText,
  Download,
  Filter,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

// Mock data simplificado para evitar dependências externas
const transactions = [
  { 
    id: '1', 
    date: '2025-05-15', 
    propertyId: '1', 
    description: 'Aluguel Mensal', 
    category: 'Aluguel', 
    type: 'income', 
    value: 2500 
  },
  { 
    id: '2', 
    date: '2025-05-10', 
    propertyId: '1', 
    description: 'Manutenção', 
    category: 'Reparo', 
    type: 'expense', 
    value: 300 
  },
  { 
    id: '3', 
    date: '2025-05-08', 
    propertyId: '2', 
    description: 'Aluguel Mensal', 
    category: 'Aluguel', 
    type: 'income', 
    value: 3200 
  }
];

const properties = [
  { id: '1', name: 'Apartamento Centro' },
  { id: '2', name: 'Casa Jardins' }
];

const incomeData = [
  { name: 'Jan', value: 8500 },
  { name: 'Fev', value: 8200 },
  { name: 'Mar', value: 9100 },
  { name: 'Abr', value: 8800 },
  { name: 'Mai', value: 9500 },
  { name: 'Jun', value: 8700 }
];

const expenseData = [
  { name: 'Jan', value: 2100 },
  { name: 'Fev', value: 1800 },
  { name: 'Mar', value: 2400 },
  { name: 'Abr', value: 2000 },
  { name: 'Mai', value: 2300 },
  { name: 'Jun', value: 1900 }
];

const resultData = [
  { name: 'Jan', value: 6400 },
  { name: 'Fev', value: 6400 },
  { name: 'Mar', value: 6700 },
  { name: 'Abr', value: 6800 },
  { name: 'Mai', value: 7200 },
  { name: 'Jun', value: 6800 }
];

export default function Financeiro() {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.value, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.value, 0);
  
  const result = totalIncome - totalExpenses;

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
          
          <Dialog>
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
                <p className="text-center text-muted-foreground">
                  Formulário de transação seria implementado aqui
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Receitas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">R$ {totalIncome.toLocaleString()}</div>
              <div className="p-2 rounded-full bg-green-100 text-green-800">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Total acumulado no período</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Despesas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">R$ {totalExpenses.toLocaleString()}</div>
              <div className="p-2 rounded-full bg-red-100 text-red-800">
                <ArrowDownRight className="h-5 w-5" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Total acumulado no período</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Resultado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className={`text-2xl font-bold ${result >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                R$ {result.toLocaleString()}
              </div>
              <div className={`p-2 rounded-full ${
                result >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                <BarChart className="h-5 w-5" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Receitas - Despesas no período</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="transactions">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transactions">Transações</TabsTrigger>
          <TabsTrigger value="charts">Gráficos</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transactions" className="pt-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Transações Financeiras</CardTitle>
                <CardDescription>Receitas e despesas de todos os imóveis</CardDescription>
              </div>
              <Button variant="outline" className="w-full sm:w-auto">
                <Download className="h-4 w-4 mr-2" />
                Exportar CSV
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Imóvel</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => {
                    const property = properties.find(p => p.id === transaction.propertyId);
                    return (
                      <TableRow key={transaction.id}>
                        <TableCell>{new Date(transaction.date).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>{property?.name || 'N/A'}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={transaction.type === 'income' ? 'default' : 'outline'} 
                            className={
                              transaction.type === 'income' 
                                ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                                : 'text-red-800 border-red-200 bg-red-50'
                            }
                          >
                            {transaction.category}
                          </Badge>
                        </TableCell>
                        <TableCell className={`text-right font-medium ${
                          transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'income' ? '+' : '-'}
                          R$ {transaction.value.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="charts" className="space-y-6 pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <PerformanceChart 
              title="Receitas" 
              description="Evolução das receitas ao longo do tempo"
              data={incomeData}
              color="#10b981"
            />
            <PerformanceChart 
              title="Despesas" 
              description="Evolução das despesas ao longo do tempo"
              data={expenseData}
              color="#ef4444"
            />
          </div>
          <PerformanceChart 
            title="Resultado Financeiro" 
            description="Receitas - Despesas"
            data={resultData}
            color="#8b5cf6"
          />
        </TabsContent>
        
        <TabsContent value="reports" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Financeiros</CardTitle>
              <CardDescription>Relatórios detalhados de desempenho financeiro</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                <Card className="hover-scale">
                  <CardHeader>
                    <CardTitle className="text-lg">Relatório Mensal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-muted-foreground mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">Maio 2025</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Resumo detalhado de receitas, despesas e performance do mês.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Gerar Relatório
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="hover-scale">
                  <CardHeader>
                    <CardTitle className="text-lg">Relatório Trimestral</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-muted-foreground mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">Jan - Mar 2025</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Análise comparativa do desempenho financeiro trimestral.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Gerar Relatório
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="hover-scale">
                  <CardHeader>
                    <CardTitle className="text-lg">Relatório Anual</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-muted-foreground mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">2024</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Resumo consolidado de todo o ano com indicadores de performance.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Gerar Relatório
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
