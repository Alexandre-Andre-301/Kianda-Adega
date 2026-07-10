import { useMemo, useState } from 'react';
import { Navbar } from './Navbar';
import { SearchBar } from './SearchBar';
import { MatchCard } from './MatchCard';
import { Suggestions } from './Suggestions';
import { NotFound, EmptyPrompt } from './StateViews';
import { Footer } from './footer';
import { GrapeBackground } from './GrapeBackground';
import { getResults, suggestionsFor } from '../util';
import { useVinhos } from '../store';
import type { Filtro } from '../data';
import type { Wine } from '../types';

export function Cliente() {
  const wines = useVinhos();
  const [q, setQ] = useState('');
  const [filtro, setFiltro] = useState<Filtro>('Todos');

  const { primary } = useMemo(() => getResults(wines, q, filtro), [wines, q, filtro]);
  const sugs = useMemo(() => suggestionsFor(wines, primary), [wines, primary]);
  const trimmed = q.trim();

  const selectWine = (w: Wine) => { setQ(w.nome); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <>
      <GrapeBackground />
      <Navbar />
      <div className="shell">
        <div className="hero">
          <div className="eyebrow">Supermercado Kianda · Adega</div>
          <h1>Encontre o seu vinho</h1>
        </div>

        <SearchBar q={q} setQ={setQ} filtro={filtro} setFiltro={setFiltro} />

        <div>
          {!trimmed ? <EmptyPrompt /> : primary ? <MatchCard wine={primary} /> : <NotFound />}
        </div>

        <hr className="div" />

        <Suggestions
          list={sugs}
          onSelect={selectWine}
          label={trimmed && primary ? 'Também poderá gostar' : 'Sugestões para si'}
        />
      </div>
      <Footer />
    </>
  );
}