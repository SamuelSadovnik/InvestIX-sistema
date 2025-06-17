import React from 'react';
import {
  Home,
  Users,
  UserPlus,
  ArrowUpRight,
  DollarSign,
  TrendingUp,
  LineChart,
  Building
} from 'lucide-react';
import { normalizeUserType } from '@/lib/utils';
import DashboardCard from '@/components/dashboard/DashboardCard';
import PerformanceChart from '@/components/charts/PerformanceChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

import { 
  properties, 
  owners, 
  managers, 
  transactions, 
  performanceData, 
  incomeData, 
  expenseData, 
  resultData
} from '@/data/mockData';


const Dashboard = () => {
  const { userType } = useAuth();
  const normalizedUserType = normalizeUserType(userType);
  
  let welcomeTitle = '';
  let welcomeDesc = '';
  let boxClass = 'bg-green-50 border border-green-200';
  if (normalizedUserType === 'ADMIN') {
    welcomeTitle = 'Bem-vindo, Administrador!';
    welcomeDesc = 'Você possui controle total do sistema.';
  } else if (normalizedUserType === 'GESTOR') {
    welcomeTitle = 'Bem-vindo, Gestor!';
    welcomeDesc = 'Gerencie imóveis, receitas e despesas.';
  } else if (normalizedUserType === 'PROPRIETARIO') {
    welcomeTitle = 'Bem-vindo, Proprietário!';
    welcomeDesc = 'Veja seus imóveis e receitas.';
  }

  const totalProperties = properties.length;
  const totalOwners = owners.length;
  const totalManagers = managers.length;
  
  const totalRentIncome = transactions
    .filter(t => t.type === 'income' && t.category === 'Aluguel')
    .reduce((acc, curr) => acc + curr.value, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.value, 0);
  
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.value, 0);
  
  const result = totalIncome - totalExpenses;
  
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  return (
    <div className="space-y-6">
      <div className={`rounded-lg p-6 mb-6 ${boxClass}`}> 
        <h2 className="text-2xl font-semibold mb-1">{welcomeTitle}</h2>
        <p className="text-muted-foreground">{welcomeDesc}</p>
      </div>      <div className={`grid gap-4 ${
        userType === 'PROPRIETARIO' 
          ? 'md:grid-cols-2' 
          : userType === 'GESTOR'
          ? 'md:grid-cols-4'
          : 'md:grid-cols-2 lg:grid-cols-4'
      }`}>
        <div className={userType === 'GESTOR' ? 'md:col-span-2' : ''}>
          <DashboardCard
            title="Total de Imóveis"
            value={totalProperties}
            description="Imóveis registrados no sistema"
            icon={<Home />}
            trend={{ value: 20, isPositive: true }}
          />
        </div>
        {normalizedUserType !== 'PROPRIETARIO' && (
          <DashboardCard
            title="Total de Proprietários"
            value={totalOwners}
            description="Proprietários cadastrados"
            icon={<Users />}
            trend={{ value: 5, isPositive: true }}
          />
        )}
        {normalizedUserType === 'ADMIN' && (
          <DashboardCard
            title="Total de Gestores"
            value={totalManagers}
            description="Gestores ativos"
            icon={<UserPlus />}
            trend={{ value: 0, isPositive: true }}
          />
        )}
        <DashboardCard
          title="Resultado Financeiro"
          value={`R$ ${result.toLocaleString()}`}
          description="Receitas - Despesas (mês atual)"
          icon={<ArrowUpRight />}
          trend={{ value: 12, isPositive: true }}
        />
      </div>
      
      <div className="grid gap-6">
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <DollarSign className="h-5 w-5 text-green-600" />
              Resumo Financeiro
            </CardTitle>
            <CardDescription>Visão geral do mês atual</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Receitas</span>
                <span className="font-semibold text-green-600">R$ {totalIncome.toLocaleString()}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Despesas</span>
                <span className="font-semibold text-red-600">R$ {totalExpenses.toLocaleString()}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full" 
                  style={{ width: `${(totalExpenses / totalIncome) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Resultado</span>
                <span className="font-semibold text-blue-600">R$ {result.toLocaleString()}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" 
                  style={{ width: `${(result / totalIncome) * 100}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <PerformanceChart 
          title="Performance dos Imóveis" 
          description="Valorização com base no índice INCC"
          data={performanceData}
          color="#3b82f6"
        />
        <PerformanceChart 
          title="Resultado Financeiro" 
          description="Receitas - Despesas"
          data={resultData}
          color="#22c55e"
        />
      </div>
      
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <LineChart className="h-5 w-5 text-purple-600" />
            Transações Recentes
          </CardTitle>
          <CardDescription>Últimas movimentações financeiras registradas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-gray-50">
                  <TableHead className="font-semibold">Data</TableHead>
                  <TableHead className="font-semibold">Imóvel</TableHead>
                  <TableHead className="font-semibold">Descrição</TableHead>
                  <TableHead className="font-semibold">Categoria</TableHead>
                  <TableHead className="text-right font-semibold">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((transaction) => {
                  const property = properties.find(p => p.id === transaction.propertyId);
                  return (
                    <TableRow key={transaction.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="font-medium">{new Date(transaction.date).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>{property?.name || 'N/A'}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={transaction.type === 'income' ? 'default' : 'outline'} 
                          className={
                            transaction.type === 'income' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-100 border-green-200' 
                              : 'text-red-800 border-red-200 bg-red-50 hover:bg-red-50'
                          }
                        >
                          {transaction.category}
                        </Badge>
                      </TableCell>
                      <TableCell className={`text-right font-semibold ${
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
          </div>
          <div className="mt-6 text-center">
            <Button variant="outline" className="hover:bg-gray-50">
              Ver todas as transações
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
