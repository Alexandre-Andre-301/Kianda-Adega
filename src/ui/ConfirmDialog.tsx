import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { type ReactNode } from 'react';

interface Props {
  aberto: boolean;
  titulo: string;
  descricao: ReactNode;
  textoConfirmar: string;
  gatilho: HTMLElement | null;
  alternativo: () => HTMLElement | null;
  onConfirmar: () => void;
  onCancelar: () => void;
}

export function ConfirmDialog({ aberto, titulo, descricao, textoConfirmar, gatilho, alternativo, onConfirmar, onCancelar }: Props) {
  return (
    <AlertDialog.Root open={aberto} onOpenChange={(o) => { if (!o) onCancelar(); }}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="overlay" />
        <AlertDialog.Content
          className="alerta"
          role="alertdialog"
          onCloseAutoFocus={e => {
            e.preventDefault();
            const alvo = gatilho?.isConnected ? gatilho : alternativo();
            alvo?.focus();
          }}
        >
          <AlertDialog.Title className="alerta-titulo">{titulo}</AlertDialog.Title>
          <AlertDialog.Description className="alerta-desc">{descricao}</AlertDialog.Description>
          <div className="alerta-acc">
            <AlertDialog.Cancel className="btn btn-ghost">Cancelar</AlertDialog.Cancel>
            <AlertDialog.Action className="btn btn-danger" onClick={onConfirmar}>{textoConfirmar}</AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
