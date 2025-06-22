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
import { TipoImovel, getTipoDisplay } from '@/utils/imovelUtils';

interface PropertyCardProps {
  id: string;
  name: string;
  type: TipoImovel;
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

const CardImovel = ({
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
  const displayType = getTipoDisplay(type);
  return (
    <Link to={`/dashboard/imoveis/${id}`}>
      <Card className={cn("overflow-hidden hover-scale", className)}>
        <div className="relative h-48 w-full">
          {imageUrl ? (
            // Handle both URL and base64 images
            <img
              src={imageUrl.startsWith('data:image') ? imageUrl : imageUrl}
              alt={name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.parentElement!.innerHTML = `
                  <div class="w-full h-full bg-muted flex items-center justify-center">
                    <Home class="h-12 w-12 text-muted-foreground/50" />
                  </div>
                `;
              }}
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <Home className="h-12 w-12 text-muted-foreground/50" />
            </div>
          )}
          <Badge
            className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm text-foreground"
          >
            {displayType}
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
        <CardFooter className="grid grid-cols-3 gap-2 text-xs text-muted-foreground pt-0 px-0">
          {rooms > 0 && (
            <div className="flex flex-col items-center justify-center">
              <Bed className="h-4 w-4" />
              <span className="mt-1">{rooms} quarto{rooms > 1 ? 's' : ''}</span>
            </div>
          )}
          {bathrooms > 0 && (
            <div className="flex flex-col items-center justify-center">
              <Bath className="h-4 w-4" />
              <span className="mt-1">{bathrooms} banheiro{bathrooms > 1 ? 's' : ''}</span>
            </div>
          )}
          {area > 0 && (
            <div className="flex flex-col items-center justify-center">
              <Square className="h-4 w-4" />
              <span className="mt-1">{area}m²</span>
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CardImovel;
