import type { Wine } from '../types';
import { Bottle } from './Bottle';

interface Props {
  list: Wine[];
  label: string;
  onSelect: (w: Wine) => void;
}

export function Suggestions({ list, label, onSelect }: Props) {
  return (
    <>
      <div className="sec-label">{label} <a className="right">Ver todos</a></div>
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