import React, { useEffect, useState } from 'react';
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
import useImoveis from '@/hooks/useImoveis';
import { listarProprietarios } from '@/hooks/useProprietario';
import { listarGestores } from '@/hooks/useGestor';

import { 
  properties, 
  transactions, 
  performanceData, 
  incomeData, 
  expenseData, 
  resultData
} from '@/data/mockData';

const API_RECEITAS = '/api/rendimentos';
const API_DESPESAS = '/api/despesas';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

const Dashboard = () => {
  const { userType } = useAuth();
  const normalizedUserType = normalizeUserType(userType);
  const { imoveis, reload: reloadImoveis } = useImoveis();
  const [owners, setOwners] = useState<any[]>([]);
  const [managers, setManagers] = useState<any[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [financialResult, setFinancialResult] = useState(0);

  useEffect(() => {
    async function fetchOwners() {
      try {
        const data = await listarProprietarios();
        setOwners(data);
      } catch {}
    }
    async function fetchManagers() {
      try {
        const data = await listarGestores();
        setManagers(data);
      } catch {}
    }
    async function fetchFinancialData() {
      try {
        const [receitasRes, despesasRes] = await Promise.all([
          fetch(API_RECEITAS, { headers: getAuthHeaders() }),
          fetch(API_DESPESAS, { headers: getAuthHeaders() })
        ]);
        const receitas = await receitasRes.json();
        const despesas = await despesasRes.json();
        const income = receitas.reduce((acc, r) => acc + Number(r.valorRendimento), 0);
        const expenses = despesas.reduce((acc, d) => acc + Number(d.valorDespesa), 0);
        setTotalIncome(income);
        setTotalExpenses(expenses);
        setFinancialResult(income - expenses);
      } catch {
        setTotalIncome(0);
        setTotalExpenses(0);
        setFinancialResult(0);
      }
    }
    fetchOwners();
    fetchManagers();
    fetchFinancialData();
    reloadImoveis();
  }, []);

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

  const totalProperties = imoveis.length;
  const totalOwners = owners.length;
  const totalManagers = managers.length;
  
  const totalRentIncome = transactions
    .filter(t => t.type === 'income' && t.category === 'Aluguel')
    .reduce((acc, curr) => acc + curr.value, 0);
  
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
                <span className="font-semibold text-blue-600">R$ {financialResult.toLocaleString()}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" 
                  style={{ width: `${(financialResult / totalIncome) * 100}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <Card className="animate-fade-in w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Performance dos Imóveis</CardTitle>
            <CardDescription className="text-base">Valorização com base no índice INCC (trimestral)</CardDescription>
          </CardHeader>
          <CardContent>
            <PerformanceChart
              title="Performance dos Imóveis"
              description="Valorização trimestral com base no índice INCC"
              data={getQuarterlyPerformanceData(performanceData)}
              color="#3b82f6"
              className="h-[420px]"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

function getQuarterlyPerformanceData(data: any[]) {
  if (!Array.isArray(data) || data.length === 0) return [];
  const quarters = [
    { name: '1º Tri', value: 0, count: 0 },
    { name: '2º Tri', value: 0, count: 0 },
    { name: '3º Tri', value: 0, count: 0 },
    { name: '4º Tri', value: 0, count: 0 },
  ];
  data.forEach((item, idx) => {
    const quarterIdx = Math.floor(idx / 3);
    if (quarters[quarterIdx]) {
      quarters[quarterIdx].value += item.value;
      quarters[quarterIdx].count += 1;
    }
  });
  return quarters.map(q => ({ name: q.name, value: q.count ? q.value / q.count : 0 }));
}

export default Dashboard;
