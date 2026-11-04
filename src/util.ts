import type { Wine } from './types';
import type { Filtro } from './data';
import { FEATURED } from './data';

export const fmtKz = (n: number) => n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export const belongs = (v: Wine, f: Filtro) => (f === 'Todos' ? true : v.tipo === f);

const scoreWine = (v: Wine, q: string) => {
  const n = v.nome.toLowerCase();
  if (n === q) return 100;
  if (n.startsWith(q)) return 80;
  if (n.includes(q)) return 60;
  if ((v.tipo + ' ' + v.coluna).toLowerCase().includes(q)) return 30;
  return -1;
};

export function getResults(wines: Wine[], query: string, filtro: Filtro) {
  const q = query.trim().toLowerCase();
  const pool = wines.filter(v => belongs(v, filtro));
  if (!q) return { primary: null as Wine | null, list: pool };
  const scored = pool
    .map(v => ({ v, s: scoreWine(v, q) }))
    .filter(x => x.s > 0)
    .sort((a, b) => b.s - a.s || a.v.nome.localeCompare(b.v.nome));
  return { primary: scored.length ? scored[0].v : null, list: scored.map(x => x.v) };
}

export function suggestionsFor(wines: Wine[], primary: Wine | null, filtro: Filtro): Wine[] {
  const pool = wines.filter(v => belongs(v, filtro));
  if (primary) {
    return pool
      .filter(v => v.id !== primary.id)
      .map(v => ({ v, s: (v.coluna === primary.coluna ? 2 : 0) + (v.tipo === primary.tipo ? 1 : 0) }))
      .sort((a, b) => b.s - a.s)
      .slice(0, 3)
      .map(x => x.v);
  }
  const feat = FEATURED.map(nm => pool.find(v => v.nome === nm)).filter((v): v is Wine => Boolean(v));
  return [...feat, ...pool.filter(v => !feat.includes(v))].slice(0, 3);
}