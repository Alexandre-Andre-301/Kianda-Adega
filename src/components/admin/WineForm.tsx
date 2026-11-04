import * as Dialog from '@radix-ui/react-dialog';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { TIPOS, REGIOES, MAX_POR_LINHA, MAX_LINHAS } from '../../data';
import { addVinho, updateVinho, countInLine } from '../../store';
import { UiSelect } from '../../ui/Select';
import { useToast } from '../../ui/toast-context';
import type { Wine, WineType, Regiao } from '../../types';

interface Props {
  wine: Wine | null;
  onMudar: (w: Wine | null | undefined) => void;
  gatilho: HTMLElement | null;
}

export function WineForm({ wine, onMudar, gatilho }: Props) {
  const notificar = useToast();
  const editing = wine !== null;
  const [nome, setNome] = useState(wine?.nome ?? '');
  const [tipo, setTipo] = useState<WineType>(wine?.tipo ?? 'Tinto');
  const [preco, setPreco] = useState<string>(wine ? String(wine.preco) : '');
  const [disponivel, setDisponivel] = useState<boolean>(wine ? wine.disponivel : true);
  const [coluna, setColuna] = useState<Regiao>(wine?.coluna ?? 'Douro');
  const [linha, setLinha] = useState<string>(wine ? String(wine.linha) : '0');
  const [erro, setErro] = useState('');
  const nomeRef = useRef<HTMLInputElement>(null);

  const fechar = () => onMudar(undefined);

  const aoEntrar = (e: ReactKeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      salvar();
    }
  };

  const salvar = () => {
    const nomeT = nome.trim();
    const precoT = preco.trim();
    const linhaT = linha.trim();
    const precoN = Number(precoT);
    const linhaN = Math.trunc(Number(linhaT));
    if (!nomeT) return setErro('Indique o nome do vinho.');
    if (!precoT || !Number.isFinite(precoN) || precoN < 0) return setErro('Preço inválido: indique um valor em Kz, 0 ou mais.');
    if (!linhaT || !Number.isInteger(linhaN) || linhaN < 0 || linhaN >= MAX_LINHAS)
      return setErro(`A linha deve ser um número entre 0 e ${MAX_LINHAS - 1}.`);
    if (countInLine(coluna, linhaN, wine?.id) >= MAX_POR_LINHA)
      return setErro(`A linha ${linhaN} da coluna ${coluna} já tem ${MAX_POR_LINHA} vinhos.`);

    const data = { nome: nomeT, tipo, preco: precoN, disponivel, coluna, linha: linhaN };
    if (editing && wine) {
      updateVinho(wine.id, data);
      notificar({ variante: 'ok', titulo: 'Alterações guardadas', descricao: nomeT });
    } else {
      addVinho(data);
      notificar({ variante: 'ok', titulo: 'Vinho adicionado', descricao: `${nomeT} · ${coluna} · Linha ${linhaN}` });
    }
    fechar();
  };

  return (
    <Dialog.Root open onOpenChange={(o) => { if (!o) fechar(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay" />
        <Dialog.Content
          className="modal-card modal-radix"
          onOpenAutoFocus={e => { e.preventDefault(); nomeRef.current?.focus(); }}
          onCloseAutoFocus={e => { e.preventDefault(); gatilho?.focus(); }}
          onKeyDown={aoEntrar}
        >
          <div className="modal-head">
            <Dialog.Title>{editing ? 'Editar vinho' : 'Adicionar vinho'}</Dialog.Title>
            <Dialog.Close className="modal-x" aria-label="Fechar">×</Dialog.Close>
          </div>

          <div className="field">
            <label htmlFor="f-nome">Nome</label>
            <input id="f-nome" ref={nomeRef} value={nome} onChange={e => setNome(e.target.value)} placeholder="ex: Quinta do Crasto Tinto" />
          </div>

          <div className="field-row">
            <div className="field">
              <label>Tipo</label>
              <UiSelect
                ariaLabel="Tipo de vinho"
                valor={tipo}
                onValor={setTipo}
                opcoes={TIPOS.map(t => ({ valor: t, texto: t }))}
              />
            </div>
            <div className="field">
              <label htmlFor="f-preco">Preço (Kz)</label>
              <input id="f-preco" type="number" min={0} step="any" value={preco} onChange={e => setPreco(e.target.value)} placeholder="ex: 14500" />
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label>Coluna (região)</label>
              <UiSelect
                ariaLabel="Coluna ou região"
                valor={coluna}
                onValor={setColuna}
                opcoes={REGIOES.map(r => ({ valor: r, texto: r }))}
              />
            </div>
            <div className="field">
              <label htmlFor="f-linha">Linha (0 é a de baixo)</label>
              <input id="f-linha" type="number" min={0} max={MAX_LINHAS - 1} value={linha} onChange={e => setLinha(e.target.value)} />
            </div>
          </div>

          <div className="field">
            <label>Disponibilidade</label>
            <ToggleGroup.Root
              type="single"
              className="toggle-row"
              value={disponivel ? 'sim' : 'nao'}
              onValueChange={v => { if (v) setDisponivel(v === 'sim'); }}
              aria-label="Disponibilidade"
            >
              <ToggleGroup.Item className={`toggle ${disponivel ? 'on' : ''}`} value="sim">Disponível</ToggleGroup.Item>
              <ToggleGroup.Item className={`toggle ${!disponivel ? 'on-out' : ''}`} value="nao">Esgotado</ToggleGroup.Item>
            </ToggleGroup.Root>
          </div>

          {erro && <div className="form-err" role="alert">{erro}</div>}

          <div className="form-actions">
            <Dialog.Close className="btn btn-ghost">Cancelar</Dialog.Close>
            <button className="btn btn-primary" onClick={salvar}>{editing ? 'Guardar alterações' : 'Adicionar vinho'}</button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
