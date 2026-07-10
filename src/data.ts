import type { Wine, WineType, Regiao } from './types';

export const REGIOES: Regiao[] = [
  'Trás-os-Montes', 'Porto', 'Douro', 'Dão', 'Bairrada', 'Beira Interior',
  'Lisboa', 'Tejo', 'Setúbal', 'Alentejo', 'Algarve', 'Madeira', 'Açores',
];

export const TIPOS: WineType[] = ['Tinto', 'Branco', 'Verde', 'Rosé', 'Espumante', 'Porto', 'Generoso'];

export const GLOW: Record<WineType, string> = {
  Tinto: '#7a1522', Branco: '#b59a4e', Verde: '#5f7d3a', Rosé: '#b85f78',
  Espumante: '#c2ad63', Porto: '#7a3b1e', Generoso: '#9a5a1f',
};

export const FILTROS = ['Todos', 'Tinto', 'Branco', 'Verde', 'Rosé', 'Espumante', 'Porto', 'Generoso'] as const;
export type Filtro = typeof FILTROS[number];

export const MAX_POR_LINHA = 8;

export const FEATURED = ['Barca Velha', "Blandy's Bual 5 Anos", 'Periquita Tinto'];

const RAW: Omit<Wine, 'id'>[] = [
  { nome: 'Valle Pradinhos Tinto', tipo: 'Tinto', preco: 8500, disponivel: true, coluna: 'Trás-os-Montes', linha: 0 },
  { nome: 'Quinta do Sobreiró de Cima', tipo: 'Tinto', preco: 12000, disponivel: true, coluna: 'Trás-os-Montes', linha: 1 },
  { nome: 'Sandeman Porto Ruby', tipo: 'Porto', preco: 11900, disponivel: true, coluna: 'Porto', linha: 0 },
  { nome: "Graham's Tawny 10 Anos", tipo: 'Porto', preco: 28500, disponivel: true, coluna: 'Porto', linha: 1 },
  { nome: "Taylor's LBV", tipo: 'Porto', preco: 15500, disponivel: false, coluna: 'Porto', linha: 2 },
  { nome: 'Quinta do Crasto Tinto', tipo: 'Tinto', preco: 14500, disponivel: true, coluna: 'Douro', linha: 0 },
  { nome: 'Barca Velha', tipo: 'Tinto', preco: 320000, disponivel: true, coluna: 'Douro', linha: 3 },
  { nome: 'Duas Quintas Ramos Pinto', tipo: 'Tinto', preco: 9900, disponivel: true, coluna: 'Douro', linha: 1 },
  { nome: 'Grão Vasco Tinto', tipo: 'Tinto', preco: 5500, disponivel: true, coluna: 'Dão', linha: 0 },
  { nome: 'Quinta dos Roques Reserva', tipo: 'Tinto', preco: 16900, disponivel: true, coluna: 'Dão', linha: 1 },
  { nome: 'Luís Pato Vinha Barrosa', tipo: 'Tinto', preco: 22000, disponivel: true, coluna: 'Bairrada', linha: 0 },
  { nome: 'Sidónio de Sousa Bruto', tipo: 'Espumante', preco: 14000, disponivel: true, coluna: 'Bairrada', linha: 1 },
  { nome: 'Quinta dos Currais Touriga', tipo: 'Tinto', preco: 7500, disponivel: false, coluna: 'Beira Interior', linha: 0 },
  { nome: 'AdegaMãe Reserva', tipo: 'Tinto', preco: 8900, disponivel: true, coluna: 'Lisboa', linha: 0 },
  { nome: "Quinta de Sant'Ana Riesling", tipo: 'Branco', preco: 12500, disponivel: true, coluna: 'Lisboa', linha: 1 },
  { nome: 'Quinta da Alorna Reserva', tipo: 'Tinto', preco: 6900, disponivel: true, coluna: 'Tejo', linha: 0 },
  { nome: 'Falua Branco', tipo: 'Branco', preco: 4800, disponivel: true, coluna: 'Tejo', linha: 0 },
  { nome: 'Periquita Tinto', tipo: 'Tinto', preco: 5900, disponivel: true, coluna: 'Setúbal', linha: 0 },
  { nome: 'Moscatel de Setúbal', tipo: 'Generoso', preco: 8900, disponivel: true, coluna: 'Setúbal', linha: 1 },
  { nome: 'Monte Velho Tinto', tipo: 'Tinto', preco: 6500, disponivel: true, coluna: 'Alentejo', linha: 0 },
  { nome: 'Esporão Reserva Tinto', tipo: 'Tinto', preco: 18900, disponivel: true, coluna: 'Alentejo', linha: 1 },
  { nome: 'Pêra-Manca Tinto', tipo: 'Tinto', preco: 145000, disponivel: false, coluna: 'Alentejo', linha: 3 },
  { nome: 'Morgado do Quintão Clarete', tipo: 'Tinto', preco: 9900, disponivel: true, coluna: 'Algarve', linha: 0 },
  { nome: "Blandy's Bual 5 Anos", tipo: 'Generoso', preco: 16500, disponivel: true, coluna: 'Madeira', linha: 0 },
  { nome: 'Henriques & Henriques Malmsey 10', tipo: 'Generoso', preco: 24000, disponivel: true, coluna: 'Madeira', linha: 1 },
  { nome: 'Azores Wine Co. Terrantez', tipo: 'Branco', preco: 21000, disponivel: true, coluna: 'Açores', linha: 0 },
  { nome: 'Insula Branco Açores', tipo: 'Branco', preco: 8500, disponivel: true, coluna: 'Açores', linha: 0 },
];

export const SEED: Wine[] = RAW.map((v, i) => ({ id: `seed-${i + 1}`, ...v }));