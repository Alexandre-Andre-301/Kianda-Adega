import { useMemo, useState } from 'react';
import { Navbar } from './Navbar';
import { SearchBar } from './SearchBar';
import { MatchCard } from './MatchCard';
import { Suggestions } from './Suggestions';
import { NotFound, EmptyPrompt } from './StateViews';
import { Footer } from './footer';
import { GrapeBackground } from './GrapeBackground';
import { belongs, getResults, suggestionsFor } from '../util';
import { useVinhos } from '../store';
import type { Filtro } from '../data';
import type { Wine } from '../types';

export function Cliente() {
  const wines = useVinhos();
  const [q, setQ] = useState('');
  const [filtro, setFiltro] = useState<Filtro>('Todos');
  const [verTodos, setVerTodos] = useState(false);

  const { primary, list } = useMemo(() => getResults(wines, q, filtro), [wines, q, filtro]);
  const pool = useMemo(() => wines.filter(v => belongs(v, filtro)), [wines, filtro]);
  const demais = useMemo(() => list.filter(v => v.id !== primary?.id), [list, primary]);
  const sugs = useMemo(() => suggestionsFor(wines, primary, filtro), [wines, primary, filtro]);
  const trimmed = q.trim();

  const selectWine = (w: Wine) => { setQ(w.nome); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const restantes = trimmed && demais.length > 0;
  const anuncio = !trimmed
    ? ''
    : primary
      ? `${list.length} ${list.length === 1 ? 'resultado' : 'resultados'} para ${trimmed}`
      : `Nenhum vinho para ${trimmed}. Veja as sugestões abaixo.`;
  const sugestoes = restantes
    ? { list: demais, label: `Outros resultados (${demais.length})`, acao: undefined }
    : {
        list: verTodos ? pool : sugs,
        label: primary
          ? 'Também poderá gostar'
          : verTodos ? `Adega completa (${pool.length})` : 'Sugestões para si',
        acao: verTodos
          ? { texto: 'Ver menos', onClick: () => setVerTodos(false) }
          : { texto: `Ver todos (${pool.length})`, onClick: () => setVerTodos(true) },
      };

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

        <p className="sr-only" aria-live="polite">{anuncio}</p>

        <div>
          {!trimmed ? <EmptyPrompt /> : primary ? <MatchCard wine={primary} /> : <NotFound />}
        </div>

        <hr className="div" />

        <Suggestions {...sugestoes} onSelect={selectWine} />
      </div>
      <Footer />
    </>
  );
}
