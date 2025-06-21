import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Home, MapPin, Calendar, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { properties } from '@/data/mockData';
import DashboardCard from '@/components/dashboard/DashboardCard';
import PerformanceChart from '@/components/charts/PerformanceChart';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const DetalhesImovel = () => {
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
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Gráfico de Performance */}
        <PerformanceChart
          title="Valorização do Imóvel"
          description="Evolução do valor ao longo dos meses"
          data={monthlyPerformance}
          color="#9b87f5"
        />

        {/* Espaço para Mapa */}
        <Card>
          <CardHeader>
            <CardTitle>Localização</CardTitle>
            <CardDescription>Mapa da propriedade e região</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/25">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground">Mapa da Localização</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Integração com mapa será implementada aqui
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {property.address}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detalhes do imóvel */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Características */}
        <Card>
          <CardHeader>
            <CardTitle>Características</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tipo:</span>
                <span className="font-medium">{property.type}</span>
              </div>
              {property.area && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Área:</span>
                  <span className="font-medium">{property.area}m²</span>
                </div>
              )}
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
                <span className="text-muted-foreground">Proprietário:</span>
                <span className="font-medium">{property.owner}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Histórico de Avaliações */}
        {property.assessments && property.assessments.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Avaliações</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Avaliador</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {property.assessments.map((assessment, index) => (
                    <TableRow key={index}>
                      <TableCell>{new Date(assessment.date).toLocaleDateString()}</TableCell>
                      <TableCell>{assessment.assessor}</TableCell>
                      <TableCell className="text-right font-medium">
                        R$ {assessment.value.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DetalhesImovel;