// Utility functions for property type handling
export type TipoImovel = 
  'APARTAMENTO' | 'CASA' | 'CASA_CONDOMINIO' | 'CHACARA' | 
  'COBERTURA' | 'FAZENDA' | 'GALPAO_COMERCIAL' | 'GALPAO_INDUSTRIAL' |
  'KITNET' | 'LOJA_COMERCIAL' | 'PREDIO_COMERCIAL' | 'SALA_COMERCIAL' |
  'SITIO' | 'SOBRADO' | 'STUDIO' | 'TERRENO' | 'TERRENO_INDUSTRIAL';

// Map enum values to display names
export function getTipoDisplay(tipo: TipoImovel): string {
  switch(tipo) {
    case 'APARTAMENTO': return 'Apartamento';
    case 'CASA': return 'Casa';
    case 'CASA_CONDOMINIO': return 'Casa Condomínio';
    case 'CHACARA': return 'Chácara';
    case 'COBERTURA': return 'Cobertura';
    case 'FAZENDA': return 'Fazenda';
    case 'GALPAO_COMERCIAL': return 'Galpão Comercial';
    case 'GALPAO_INDUSTRIAL': return 'Galpão Industrial';
    case 'KITNET': return 'Kitnet';
    case 'LOJA_COMERCIAL': return 'Loja Comercial';
    case 'PREDIO_COMERCIAL': return 'Prédio Comercial';
    case 'SALA_COMERCIAL': return 'Sala Comercial';
    case 'SITIO': return 'Sítio';
    case 'SOBRADO': return 'Sobrado';
    case 'STUDIO': return 'Studio';
    case 'TERRENO': return 'Terreno';
    case 'TERRENO_INDUSTRIAL': return 'Terreno Industrial';
    default: return tipo;
  }
}

// Get all property types for dropdowns
export const propertyTypes: TipoImovel[] = [
  'APARTAMENTO', 'CASA', 'CASA_CONDOMINIO', 'CHACARA', 
  'COBERTURA', 'FAZENDA', 'GALPAO_COMERCIAL', 'GALPAO_INDUSTRIAL',
  'KITNET', 'LOJA_COMERCIAL', 'PREDIO_COMERCIAL', 'SALA_COMERCIAL',
  'SITIO', 'SOBRADO', 'STUDIO', 'TERRENO', 'TERRENO_INDUSTRIAL'
];