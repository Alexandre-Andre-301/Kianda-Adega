export type WineType =
  | 'Tinto' | 'Branco' | 'Verde' | 'Rosé' | 'Espumante' | 'Porto' | 'Generoso';

export type Regiao =
  | 'Trás-os-Montes' | 'Porto' | 'Douro' | 'Dão' | 'Bairrada' | 'Beira Interior'
  | 'Lisboa' | 'Tejo' | 'Setúbal' | 'Alentejo' | 'Algarve' | 'Madeira' | 'Açores';

export interface Wine {
  id: string;
  nome: string;
  tipo: WineType;
  preco: number;        // Kwanza
  disponivel: boolean;  // tem ou não (sem quantidade)
  coluna: Regiao;       // uma das 13 colunas
  linha: number;        // 0 = linha de baixo
}