import type { Wine } from '../types';
import { Bottle } from './Bottle';

interface Props {
  list: Wine[];
  label: string;
  onSelect: (w: Wine) => void;
  acao?: { texto: string; onClick: () => void };
}

export function Suggestions({ list, label, onSelect, acao }: Props) {
  return (
    <>
      <div className="sec-label" id="sugestoes">
        {label}
        {acao && (
          <button type="button" className="right" onClick={acao.onClick}>{acao.texto}</button>
        )}
      </div>
      <div className="sugs">
        {list.map(v => (
          <button key={v.id} className="sug" onClick={() => onSelect(v)}>
            <div className="thumb"><Bottle wine={v} /></div>
            <div className="body">
              <div className={`st ${v.disponivel ? '' : 'low'}`}>{v.disponivel ? 'Disponível' : 'Esgotado'}</div>
              <div className="nm">{v.nome}</div>
              <div className="loc">{v.coluna} · Linha {v.linha}</div>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
