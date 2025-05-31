import React from "react";
import { BarChart3, TrendingUp, TrendingDown, Activity, Target, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PerformanceChart from '@/components/charts/PerformanceChart';

const liquidityData = [
  { name: 'Jan', value: 85 },
  { name: 'Fev', value: 78 },
  { name: 'Mar', value: 92 },
  { name: 'Abr', value: 88 },
  { name: 'Mai', value: 95 },
  { name: 'Jun', value: 82 }
];

const marketData = [
  { name: 'Jan', value: 120 },
  { name: 'Fev', value: 132 },
  { name: 'Mar', value: 145 },
  { name: 'Abr', value: 128 },
  { name: 'Mai', value: 155 },
  { name: 'Jun', value: 167 }
];

export default function Performance() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-primary" />
          Performance & Liquidez
        </h1>
        <p className="text-muted-foreground">
          Acompanhe indicadores-chave e análises de liquidez dos imóveis em sua carteira.
        </p>
      </div>

      {/* KPIs de Performance */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Liquidez Média
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">87%</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              +5% vs mês anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Target className="h-4 w-4" />
              Tempo Médio de Venda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45 dias</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <TrendingDown className="h-4 w-4 mr-1" />
              -8 dias vs mês anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              ROI Médio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">12.5%</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              +2.1% vs mês anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Score de Mercado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">A+</div>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Badge variant="outline" className="text-xs">Excelente</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos de Performance */}
      <div className="grid gap-6 md:grid-cols-2">
        <PerformanceChart 
          title="Índice de Liquidez" 
          description="Evolução da liquidez dos imóveis ao longo do tempo"
          data={liquidityData}
          color="#10b981"
        />
        <PerformanceChart 
          title="Valorização de Mercado" 
          description="Índice de valorização baseado no mercado regional"
          data={marketData}
          color="#3b82f6"
        />
      </div>

      {/* Análise Detalhada por Imóvel */}
      <Card>
        <CardHeader>
          <CardTitle>Análise de Liquidez por Imóvel</CardTitle>
          <CardDescription>Performance individual dos imóveis em carteira</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'Apartamento Centro - SP', liquidez: 95, tendencia: 'up', roi: '15.2%', tempo: '30 dias' },
              { name: 'Casa Jardins - SP', liquidez: 88, tendencia: 'up', roi: '12.8%', tempo: '45 dias' },
              { name: 'Cobertura Barra - RJ', liquidez: 82, tendencia: 'down', roi: '10.5%', tempo: '60 dias' },
              { name: 'Loft Vila Madalena - SP', liquidez: 90, tendencia: 'up', roi: '13.7%', tempo: '35 dias' }
            ].map((imovel, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <h4 className="font-semibold">{imovel.name}</h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span>Tempo médio: {imovel.tempo}</span>
                    <span>ROI: {imovel.roi}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg font-bold">{imovel.liquidez}%</div>
                    <div className="text-xs text-muted-foreground">Liquidez</div>
                  </div>
                  <div className={`p-2 rounded-full ${
                    imovel.tendencia === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {imovel.tendencia === 'up' ? 
                      <TrendingUp className="h-4 w-4" /> : 
                      <TrendingDown className="h-4 w-4" />
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights e Recomendações */}
      <Card>
        <CardHeader>
          <CardTitle>Insights & Recomendações</CardTitle>
          <CardDescription>Análises automatizadas para otimizar sua carteira</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <h4 className="font-semibold text-green-800">Oportunidade</h4>
              </div>
              <p className="text-sm text-green-700">
                Imóveis no Centro de SP estão com alta demanda. Considere aumentar o preço em 5-8%.
              </p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-blue-600" />
                <h4 className="font-semibold text-blue-800">Estratégia</h4>
              </div>
              <p className="text-sm text-blue-700">
                Cobertura na Barra precisa de renovação para melhorar liquidez. ROI estimado: +20%.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
