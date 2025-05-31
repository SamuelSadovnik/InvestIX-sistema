
import React from 'react';
import { 
  FileText,
  Download,
  Filter,
  Calendar,
  BarChart,
  DollarSign,
  Users,
  Home
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Reports = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Relatórios</h1>
          <p className="text-muted-foreground">Relatórios e análises detalhadas</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="current">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Mês Atual</SelectItem>
              <SelectItem value="last">Mês Anterior</SelectItem>
              <SelectItem value="quarter">Trimestre</SelectItem>
              <SelectItem value="year">Ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="hover-scale">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Relatório Financeiro</CardTitle>
              <div className="p-2 rounded-full bg-purple-100 text-purple-800">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
            <CardDescription>Análise financeira completa</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Atualizado em 15/04/2025</span>
              </div>
              <div className="flex items-center text-sm">
                <BarChart className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>12 indicadores analisados</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Baixar PDF
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover-scale">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Relatório de Ocupação</CardTitle>
              <div className="p-2 rounded-full bg-blue-100 text-blue-800">
                <Home className="h-5 w-5" />
              </div>
            </div>
            <CardDescription>Status dos imóveis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Atualizado em 15/04/2025</span>
              </div>
              <div className="flex items-center text-sm">
                <BarChart className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>8 métricas analisadas</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Baixar PDF
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover-scale">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Relatório de Clientes</CardTitle>
              <div className="p-2 rounded-full bg-green-100 text-green-800">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <CardDescription>Análise de proprietários e gestores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Atualizado em 15/04/2025</span>
              </div>
              <div className="flex items-center text-sm">
                <BarChart className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>6 métricas analisadas</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Baixar PDF
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover-scale">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Relatório de Performance</CardTitle>
              <div className="p-2 rounded-full bg-amber-100 text-amber-800">
                <BarChart className="h-5 w-5" />
              </div>
            </div>
            <CardDescription>Métricas de desempenho</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Atualizado em 15/04/2025</span>
              </div>
              <div className="flex items-center text-sm">
                <BarChart className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>10 indicadores analisados</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Baixar PDF
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
