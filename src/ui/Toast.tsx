import * as Toast from '@radix-ui/react-toast';
import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { ToastContext, type Aviso } from './toast-context';

export function ToastProvider({ children }: { children: ReactNode }) {
  const [avisos, setAvisos] = useState<Aviso[]>([]);

  const notificar = useCallback((a: Omit<Aviso, 'id'>) => {
    setAvisos(atual => [...atual, { ...a, id: Date.now() + Math.random() }]);
  }, []);

  const fechar = (id: number) => setAvisos(atual => atual.filter(a => a.id !== id));

  const valor = useMemo(() => notificar, [notificar]);

  return (
    <ToastContext.Provider value={valor}>
      <Toast.Provider swipeDirection="right" duration={4000}>
        {children}
        {avisos.map(a => (
          <Toast.Root key={a.id} className={`toast toast-${a.variante}`} open onOpenChange={() => fechar(a.id)}>
            <Toast.Title className="toast-titulo">{a.titulo}</Toast.Title>
            {a.descricao && <Toast.Description className="toast-desc">{a.descricao}</Toast.Description>}
            <Toast.Close className="toast-x" aria-label="Fechar aviso">×</Toast.Close>
          </Toast.Root>
        ))}
        <Toast.Viewport className="toast-viewport" aria-label="Avisos" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
}
