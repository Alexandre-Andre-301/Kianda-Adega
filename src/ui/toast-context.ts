import { createContext, useContext } from 'react';

export type VarianteToast = 'ok' | 'erro';

export interface Aviso {
  id: number;
  titulo: string;
  descricao?: string;
  variante: VarianteToast;
}

export const ToastContext = createContext<(a: Omit<Aviso, 'id'>) => void>(() => {});

export const useToast = () => useContext(ToastContext);
