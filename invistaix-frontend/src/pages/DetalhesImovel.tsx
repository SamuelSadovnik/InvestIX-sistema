import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Home, MapPin, Calendar, DollarSign, TrendingUp, TrendingDown, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import { useAuth } from '@/contexts/AuthContext';
import AssessmentFormModal from '@/components/imoveis/AssessmentFormModal';
import usePropertyDetails from '@/hooks/usePropertyDetails';

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
                  {formatAddress(imovel.endereco)}
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
                <span className="font-medium">{imovel.tipoImovel}</span>
              </div>
              {imovel.area && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Área:</span>
                  <span className="font-medium">{imovel.area}m²</span>
                </div>
              )}
              {imovel.numQuartos && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quartos:</span>
                  <span className="font-medium">{imovel.numQuartos}</span>
                </div>
              )}
              {imovel.numBanheiros && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Banheiros:</span>
                  <span className="font-medium">{imovel.numBanheiros}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Proprietário:</span>
                <span className="font-medium">{proprietarioNome}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Histórico de Avaliações */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Histórico de Avaliações</CardTitle>
              <Button size="sm" onClick={handleAddAssessment}>
                <Plus className="h-4 w-4 mr-1" /> Adicionar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {avaliacoes && avaliacoes.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Avaliador</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {avaliacoes.map((avaliacao, index) => (
                    <TableRow key={index}>
                      <TableCell>{new Date(avaliacao.data).toLocaleDateString()}</TableCell>
                      <TableCell>{avaliacao.avaliador}</TableCell>
                      <TableCell className="text-right font-medium">
                        R$ {avaliacao.valorAvaliacao.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground text-center py-4">Nenhuma avaliação registrada</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DetalhesImovel;