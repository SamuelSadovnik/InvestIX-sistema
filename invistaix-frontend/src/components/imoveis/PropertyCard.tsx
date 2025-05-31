
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, MapPin, Bed, Bath, Square } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PropertyCardProps {
  id: string;
  name: string;
  type: string;
  address: string;
  rentValue?: number;
  saleValue?: number;
  rooms?: number;
  bathrooms?: number;
  area?: number;
  imageUrl?: string;
  performance?: {
    percentage: number;
    isPositive: boolean;
  };
  className?: string;
}

const PropertyCard = ({
  id,
  name,
  type,
  address,
  rentValue,
  saleValue,
  rooms,
  bathrooms,
  area,
  imageUrl,
  performance,
  className,
}: PropertyCardProps) => {
  return (
    <Link to={`/dashboard/imoveis/${id}`}>
      <Card className={cn("overflow-hidden hover-scale", className)}>
        <div className="relative h-48 w-full">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <Home className="h-12 w-12 text-muted-foreground/50" />
            </div>
          )}
          <Badge 
            className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm text-foreground"
          >
            {type}
          </Badge>
        </div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{name}</CardTitle>
            {performance && (
              <Badge 
                variant={performance.isPositive ? "default" : "destructive"}
                className={cn(
                  "ml-auto",
                  performance.isPositive ? "bg-green-500" : "bg-destructive"
                )}
              >
                {performance.isPositive ? "+" : ""}{performance.percentage}%
              </Badge>
            )}
          </div>
          <CardDescription className="flex items-center text-xs">
            <MapPin className="h-3 w-3 mr-1" />
            {address}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between text-sm">
            {rentValue && (
              <div>
                <p className="text-xs text-muted-foreground">Aluguel</p>
                <p className="font-medium">R$ {rentValue.toLocaleString()}</p>
              </div>
            )}
            {saleValue && (
              <div>
                <p className="text-xs text-muted-foreground">Venda</p>
                <p className="font-medium">R$ {saleValue.toLocaleString()}</p>
              </div>
            )}
          </div>
        </CardContent>
        {(rooms || bathrooms || area) && (
          <CardFooter className="flex items-center gap-4 text-xs text-muted-foreground pt-0">
            {rooms && (
              <div className="flex items-center">
                <Bed className="h-3 w-3 mr-1" />
                {rooms} quartos
              </div>
            )}
            {bathrooms && (
              <div className="flex items-center">
                <Bath className="h-3 w-3 mr-1" />
                {bathrooms} banheiros
              </div>
            )}
            {area && (
              <div className="flex items-center">
                <Square className="h-3 w-3 mr-1" />
                {area}m²
              </div>
            )}
          </CardFooter>
        )}
      </Card>
    </Link>
  );
};

export default PropertyCard;
