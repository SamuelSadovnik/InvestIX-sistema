
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Home, MapPin, Calendar, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { properties } from '@/data/mockData';
import DashboardCard from '@/components/dashboard/DashboardCard';
import PerformanceChart from '@/components/charts/PerformanceChart';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const property = properties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Home className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Imóvel não encontrado</h2>
        <p className="text-muted-foreground mb-4">O imóvel solicitado não existe ou foi removido.</p>
        <Link to="/dashboard/imoveis">
          <Button>Voltar para Imóveis</Button>
        </Link>
      </div>
    );
  }

  // Dados simulados para performance mensal
  const monthlyPerformance = [
    { name: 'Jan', value: property.matriculaValue },
    { name: 'Fev', value: property.matriculaValue * 1.01 },
    { name: 'Mar', value: property.matriculaValue * 1.02 },
    { name: 'Abr', value: property.matriculaValue * 1.015 },
    { name: 'Mai', value: property.matriculaValue * 1.03 },
    { name: 'Jun', value: property.saleValue || property.matriculaValue * 1.05 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link to="/dashboard/imoveis">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold">{property.name}</h1>
            <Badge variant="outline">{property.type}</Badge>
            {property.performance && (
              <Badge 
                variant={property.performance.isPositive ? "default" : "destructive"}
                className={property.performance.isPositive ? "bg-green-500" : "bg-destructive"}
              >
                {property.performance.isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {property.performance.isPositive ? "+" : ""}{property.performance.percentage}%
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {property.address}
          </p>
        </div>
      </div>

      {/* Cards de métricas principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Valor da Matrícula"
          value={`R$ ${property.matriculaValue.toLocaleString()}`}
          description={`Registrado em ${new Date(property.matriculaDate).toLocaleDateString()}`}
          icon={<Calendar className="h-4 w-4" />}
        />
        
        {property.rentValue && (
          <DashboardCard
            title="Aluguel Mensal"
            value={`R$ ${property.rentValue.toLocaleString()}`}
            description="Valor atual do aluguel"
            icon={<DollarSign className="h-4 w-4" />}
          />
        )}
        
        {property.saleValue && (
          <DashboardCard
            title="Valor de Venda"
            value={`R$ ${property.saleValue.toLocaleString()}`}
            description="Valor estimado atual"
            icon={<Home className="h-4 w-4" />}
          />
        )}
        
        <DashboardCard
          title="Impostos Anuais"
          value={`R$ ${property.taxValue.toLocaleString()}`}
          description="IPTU e taxas"
          icon={<DollarSign className="h-4 w-4" />}
        />
      </div>      {/* Valorização do Imóvel - Expandido para tela cheia */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl">Valorização do Imóvel</CardTitle>
          <CardDescription>
            Evolução do valor ao longo dos meses com análise de desempenho
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <PerformanceChart
              title=""
              description=""
              data={monthlyPerformance}
              color="#12d87e"
            />
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted/30 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Valorização Total</p>
              <p className="text-lg font-semibold text-primary">{property.performance?.percentage || 5}%</p>
            </div>
            <div className="bg-muted/30 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Valor Inicial</p>
              <p className="text-lg font-semibold">R$ {property.matriculaValue.toLocaleString()}</p>
            </div>
            <div className="bg-muted/30 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Valor Atual</p>
              <p className="text-lg font-semibold">R$ {(property.saleValue || property.matriculaValue * 1.05).toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Características do imóvel - Redesenhado e expandido */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl">Características do Imóvel</CardTitle>
          <CardDescription>Detalhes e especificações completas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-muted/20 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Informações Básicas</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tipo:</span>
                  <span className="font-medium">{property.type}</span>
                </div>
                {property.area && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Área Total:</span>
                    <span className="font-medium">{property.area}m²</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Endereço:</span>
                  <span className="font-medium truncate max-w-[180px]">{property.address}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/20 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Especificações</h3>
              <div className="space-y-3">
                {property.rooms && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quartos:</span>
                    <span className="font-medium">{property.rooms}</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Banheiros:</span>
                    <span className="font-medium">{property.bathrooms}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Matrícula:</span>
                  <span className="font-medium">{id?.slice(-6).toUpperCase() || 'N/A'}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/20 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Responsáveis</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Proprietário:</span>
                  <span className="font-medium">{property.owner}</span>
                </div>
                {property.manager && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gestor:</span>
                    <span className="font-medium">{property.manager}</span>
                  </div>                )}
              </div>
            </div></div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyDetail;
