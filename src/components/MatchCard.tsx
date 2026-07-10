import type { Wine } from '../types';
import { fmtKz } from '../util';
import { Bottle } from './Bottle';

export function MatchCard({ wine }: { wine: Wine }) {
  return (
    <>
      <div className="sec-label">Resultado principal</div>
      <div className="match">
        <div className="photo">
          <Bottle wine={wine} />
          <div className={`stockbadge ${wine.disponivel ? '' : 'out'}`}>
            <i />{wine.disponivel ? 'Disponível' : 'Esgotado'}
          </div>
        </div>
        <div>
          <div className="m-head">
            <div>
              <h2 className="m-name">{wine.nome}</h2>
              <div className="m-meta">{wine.tipo.toUpperCase()} · {wine.coluna}</div>
            </div>
            <div className="m-price"><span className="cur">Kz</span>{fmtKz(wine.preco)}</div>
          </div>

          <div className="coord-label">Localização na adega</div>
          <div className="coords loc2">
            <div className="coord"><div className="k">Coluna (região)</div><div className="v vsm">{wine.coluna}</div></div>
            <div className="coord"><div className="k">Linha</div><div className="v">{wine.linha}</div></div>
          </div>

          <div className="hint">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" /><circle cx="12" cy="9" r="2.4" />
            </svg>
            Vá à coluna <b>{wine.coluna}</b> e procure na <b>linha {wine.linha}</b> — a contar de baixo (a de baixo é a 0).
          </div>
        </div>
      </div>
    </>
  );
}