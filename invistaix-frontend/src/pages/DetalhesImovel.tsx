import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Home, MapPin, Calendar, DollarSign, TrendingUp, TrendingDown, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DashboardCard from '@/components/dashboard/DashboardCard';
import PerformanceChart from '@/components/charts/PerformanceChart';

const DetalhesImovel = () => {
  const { id } = useParams<{ id: string }>();
  const { propertyDetails, loading, error, refetch } = usePropertyDetails(id);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { user } = useAuth();

  // Função para formatar o endereço
  const formatAddress = (endereco) => {
    if (typeof endereco === 'string') {
      return endereco;
    }
    
    if (typeof endereco === 'object' && endereco !== null) {
      const { rua, numero, bairro, cidade, estado } = endereco;
      return `${rua || ''} ${numero || ''}, ${bairro || ''}, ${cidade || ''} - ${estado || ''}`.trim();
    }
    
    return 'Endereço não disponível';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Home className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Erro ao carregar imóvel</h2>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Link to="/dashboard/imoveis">
          <Button>Voltar para Imóveis</Button>
        </Link>
      </div>
    );
  }

  if (!propertyDetails) {
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

  const { imovel, proprietarioNome, valorAtualizadoINCC, avaliacoes } = propertyDetails;
  
  // Calculate appreciation percentage
  const appreciationPercentage = ((valorAtualizadoINCC - imovel.valorMatricula) / imovel.valorMatricula * 100).toFixed(2);
  const isPositive = parseFloat(appreciationPercentage) > 0;
  
  // Generate monthly performance data
  const monthlyPerformance = [
    { name: 'Jan', value: imovel.valorMatricula },
    { name: 'Fev', value: imovel.valorMatricula * 1.01 },
    { name: 'Mar', value: imovel.valorMatricula * 1.02 },
    { name: 'Abr', value: imovel.valorMatricula * 1.015 },
    { name: 'Mai', value: imovel.valorMatricula * 1.03 },
    { name: 'Jun', value: valorAtualizadoINCC },
  ];
  
  const handleAddAssessment = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAssessmentAdded = () => {
    refetch();
  };

  return (
    <div className="space-y-6">
      <AssessmentFormModal
        propertyId={imovel.id}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAssessmentAdded={handleAssessmentAdded}
      />
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link to="/dashboard/imoveis">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">            <h1 className="text-2xl md:text-3xl font-bold">{imovel.nomeImovel}</h1>
            <Badge variant="outline">{imovel.tipoImovel}</Badge>
            <Badge
              variant={isPositive ? "default" : "destructive"}
              className={isPositive ? "bg-green-500" : "bg-destructive"}
            >
              {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {isPositive ? "+" : ""}{appreciationPercentage}%
            </Badge>
          </div>
          <p className="text-muted-foreground flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {formatAddress(imovel.endereco)}
          </p>
        </div>
      </div>

      {/* Cards de métricas principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Valor da Matrícula"
          value={`R$ ${imovel.valorMatricula.toLocaleString()}`}
          description={`Registrado em ${new Date(imovel.dataRegistroMatricula).toLocaleDateString()}`}
          icon={<Calendar className="h-4 w-4" />}
        />
        
        {imovel.valorAluguelAtual && (
          <DashboardCard
            title="Aluguel Mensal"
            value={`R$ ${imovel.valorAluguelAtual.toLocaleString()}`}
            description="Valor atual do aluguel"
            icon={<DollarSign className="h-4 w-4" />}
          />
        )}
        
        {imovel.valorVendaEstimado && (
          <DashboardCard
            title="Valor de Venda"
            value={`R$ ${imovel.valorVendaEstimado.toLocaleString()}`}
            description="Valor estimado atual"
            icon={<Home className="h-4 w-4" />}
          />
        )}
        
        <DashboardCard
          title="Impostos Anuais"
          value={`R$ ${imovel.valorIptu.toLocaleString()}`}
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

export default DetalhesImovel;