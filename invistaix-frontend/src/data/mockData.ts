export interface Property {
  id: string;
  name: string;
  type: 'Casa' | 'Apartamento' | 'Comercial' | 'Terreno';
  address: string;
  matriculaValue: number;
  matriculaDate: string;
  rentValue?: number;
  saleValue?: number;
  taxValue: number;
  imageUrl?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  rooms?: number;
  bathrooms?: number;
  area?: number;
  assessments?: Array<{
    date: string;
    value: number;
    assessor: string;
  }>;
  owner: string;
  performance?: {
    percentage: number;
    isPositive: boolean;
  };
}

export interface Owner {
  id: string;
  name: string;
  type: 'PF' | 'PJ';
  document: string;
  email: string;
  phone: string;
  properties: string[];
}

export interface Manager {
  id: string;
  name: string;
  document: string;
  email: string;
  phone: string;
  role: string;
  properties: string[];
  isOwner?: boolean;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'income' | 'expense';
  category: string;
  value: number;
  propertyId: string;
  description: string;
}

// Mock Properties
export const properties: Property[] = [
  {
    id: '1',
    name: 'Apartamento Centro',
    type: 'Apartamento',
    address: 'Av. Paulista, 1000, São Paulo - SP',
    matriculaValue: 350000,
    matriculaDate: '2022-01-15',
    rentValue: 2500,
    saleValue: 420000,
    taxValue: 2100,
    rooms: 2,
    bathrooms: 2,
    area: 75,
    owner: '1',
    performance: {
      percentage: 3.2,
      isPositive: true
    },
    assessments: [
      { date: '2023-01-20', value: 380000, assessor: 'Carlos Mendes' },
      { date: '2024-01-25', value: 420000, assessor: 'Ana Silva' }
    ]
  },
  {
    id: '2',
    name: 'Casa Jardins',
    type: 'Casa',
    address: 'R. Alameda Santos, 500, São Paulo - SP',
    matriculaValue: 850000,
    matriculaDate: '2021-06-10',
    rentValue: 5500,
    saleValue: 980000,
    taxValue: 4800,
    rooms: 4,
    bathrooms: 3,
    area: 220,
    owner: '2',
    performance: {
      percentage: 4.8,
      isPositive: true
    },
    assessments: [
      { date: '2022-06-15', value: 900000, assessor: 'Carlos Mendes' },
      { date: '2023-06-20', value: 950000, assessor: 'Ana Silva' },
      { date: '2024-03-10', value: 980000, assessor: 'Carlos Mendes' }
    ]
  },
  {
    id: '3',
    name: 'Sala Comercial',
    type: 'Comercial',
    address: 'Av. Paulista, 1500, São Paulo - SP',
    matriculaValue: 250000,
    matriculaDate: '2020-11-05',
    rentValue: 3800,
    saleValue: 320000,
    taxValue: 1850,
    area: 45,
    owner: '3',
    performance: {
      percentage: 1.5,
      isPositive: false
    },
    assessments: [
      { date: '2021-11-10', value: 270000, assessor: 'Carlos Mendes' },
      { date: '2022-11-15', value: 300000, assessor: 'Ana Silva' },
      { date: '2023-11-20', value: 320000, assessor: 'Carlos Mendes' }
    ]
  },
  {
    id: '4',
    name: 'Terreno Industrial',
    type: 'Terreno',
    address: 'Rod. Anhanguera, km 15, São Paulo - SP',
    matriculaValue: 1200000,
    matriculaDate: '2019-03-20',
    saleValue: 1800000,
    taxValue: 8500,
    area: 5000,
    owner: '2',
    performance: {
      percentage: 6.2,
      isPositive: true
    },
    assessments: [
      { date: '2020-03-25', value: 1350000, assessor: 'Carlos Mendes' },
      { date: '2022-03-30', value: 1600000, assessor: 'Ana Silva' },
      { date: '2024-02-15', value: 1800000, assessor: 'Carlos Mendes' }
    ]
  }
];

// Mock Owners
export const owners: Owner[] = [
  {
    id: '1',
    name: 'João Silva',
    type: 'PF',
    document: '123.456.789-00',
    email: 'joao@example.com',
    phone: '(11) 99999-8888',
    properties: ['1']
  },
  {
    id: '2',
    name: 'Imobiliária XYZ Ltda',
    type: 'PJ',
    document: '12.345.678/0001-00',
    email: 'contato@xyz.com',
    phone: '(11) 3333-4444',
    properties: ['2', '4']
  },
  {
    id: '3',
    name: 'Maria Oliveira',
    type: 'PF',
    document: '987.654.321-00',
    email: 'maria@example.com',
    phone: '(11) 98888-7777',
    properties: ['3']
  }
];

// Mock Managers
export const managers: Manager[] = [
  {
    id: '1',
    name: 'Carlos Mendes',
    document: '111.222.333-44',
    email: 'carlos@invistaix.com',
    phone: '(11) 97777-6666',
    role: 'Gestor Sênior',
    properties: ['1', '2', '4']
  },
  {
    id: '2',
    name: 'Ana Silva',
    document: '555.666.777-88',
    email: 'ana@invistaix.com',
    phone: '(11) 96666-5555',
    role: 'Gestora de Portfólio',
    properties: ['3'],
    isOwner: true
  }
];

// Mock Transactions
export const transactions: Transaction[] = [
  {
    id: '1',
    date: '2024-03-10',
    type: 'income',
    category: 'Aluguel',
    value: 2500,
    propertyId: '1',
    description: 'Aluguel Apartamento Centro - Março 2024'
  },
  {
    id: '2',
    date: '2024-03-05',
    type: 'expense',
    category: 'Condomínio',
    value: 650,
    propertyId: '1',
    description: 'Condomínio Apartamento Centro - Março 2024'
  },
  {
    id: '3',
    date: '2024-03-15',
    type: 'income',
    category: 'Aluguel',
    value: 5500,
    propertyId: '2',
    description: 'Aluguel Casa Jardins - Março 2024'
  },
  {
    id: '4',
    date: '2024-02-28',
    type: 'expense',
    category: 'Manutenção',
    value: 1200,
    propertyId: '2',
    description: 'Reparo no telhado'
  },
  {
    id: '5',
    date: '2024-03-07',
    type: 'income',
    category: 'Aluguel',
    value: 3800,
    propertyId: '3',
    description: 'Aluguel Sala Comercial - Março 2024'
  },
  {
    id: '6',
    date: '2024-03-03',
    type: 'expense',
    category: 'IPTU',
    value: 1850,
    propertyId: '3',
    description: 'IPTU Sala Comercial - 2024 (Parcela 1)'
  },
  {
    id: '7',
    date: '2024-02-20',
    type: 'expense',
    category: 'Água',
    value: 120,
    propertyId: '1',
    description: 'Conta de água - Fevereiro 2024'
  },
  {
    id: '8',
    date: '2024-02-22',
    type: 'expense',
    category: 'Luz',
    value: 250,
    propertyId: '1',
    description: 'Conta de luz - Fevereiro 2024'
  }
];

// Performance chart data
export const performanceData = [
  { name: 'Jan', value: 100000 },
  { name: 'Fev', value: 100500 },
  { name: 'Mar', value: 101200 },
  { name: 'Abr', value: 102000 },
  { name: 'Mai', value: 103500 },
  { name: 'Jun', value: 104800 },
  { name: 'Jul', value: 106000 },
  { name: 'Ago', value: 107300 },
  { name: 'Set', value: 109000 },
  { name: 'Out', value: 110500 },
  { name: 'Nov', value: 112000 },
  { name: 'Dez', value: 113800 },
];

export const incomeData = [
  { name: 'Jan', value: 12500 },
  { name: 'Fev', value: 11800 },
  { name: 'Mar', value: 12700 },
  { name: 'Abr', value: 12800 },
  { name: 'Mai', value: 11900 },
  { name: 'Jun', value: 13200 },
  { name: 'Jul', value: 13500 },
  { name: 'Ago', value: 14100 },
  { name: 'Set', value: 14300 },
  { name: 'Out', value: 14500 },
  { name: 'Nov', value: 14700 },
  { name: 'Dez', value: 15000 },
];

export const expenseData = [
  { name: 'Jan', value: 5300 },
  { name: 'Fev', value: 4800 },
  { name: 'Mar', value: 5200 },
  { name: 'Abr', value: 6100 },
  { name: 'Mai', value: 4900 },
  { name: 'Jun', value: 5300 },
  { name: 'Jul', value: 5500 },
  { name: 'Ago', value: 5400 },
  { name: 'Set', value: 5600 },
  { name: 'Out', value: 6200 },
  { name: 'Nov', value: 5800 },
  { name: 'Dez', value: 6500 },
];

export const resultData = incomeData.map((item, index) => ({
  name: item.name,
  value: item.value - expenseData[index].value
}));

// INCC index data
export const inccData = [
  { month: 'Jan/24', value: 0.34 },
  { month: 'Fev/24', value: 0.43 },
  { month: 'Mar/24', value: 0.39 },
  { month: 'Abr/24', value: 0.41 },
  { month: 'Previsão Mai/24', value: 0.38 },
];
