import { useState } from 'react';
import { FILTROS } from '../data';
import type { Filtro } from '../data';

interface Props {
  q: string;
  setQ: (s: string) => void;
  filtro: Filtro;
  setFiltro: (f: Filtro) => void;
}

export function SearchBar({ q, setQ, filtro, setFiltro }: Props) {
  const [showFilters, setShowFilters] = useState(false);
  return (
    <>
      <div className="searchbar" role="search" aria-label="Pesquisar e filtrar vinhos">
        <svg className="mag" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" /><path d="m20 20-3.2-3.2" />
        </svg>
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          type="search"
          placeholder="Escreva o nome, tipo ou região…  ex: Barca Velha, Porto, Alentejo"
          autoComplete="off"
          aria-label="Pesquisar vinho"
        />
        <button className="filterbtn" aria-expanded={showFilters} aria-label="Filtrar por tipo"
          onClick={() => setShowFilters(s => !s)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round">
            <path d="M4 6h16M7 12h10M10 18h4" />
          </svg>
        </button>
      </div>
      {showFilters && (
        <div className="chips" role="group" aria-label="Filtrar por tipo">
          {FILTROS.map(f => (
            <button key={f} className="chip" aria-pressed={filtro === f} onClick={() => setFiltro(f)}>
              {f}
            </button>
          ))}
        </div>
      )}
    </>
  );
}