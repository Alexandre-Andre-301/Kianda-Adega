import { useSyncExternalStore } from 'react';
import type { Wine, Regiao } from './types';
import { SEED } from './data';

const KEY = 'kianda:vinhos:v1';

const genId = () =>
  (typeof crypto !== 'undefined' && crypto.randomUUID)
    ? crypto.randomUUID()
    : 'id-' + Date.now() + '-' + Math.random().toString(36).slice(2);

function loadInitial(): Wine[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) { const p = JSON.parse(raw); if (Array.isArray(p)) return p as Wine[]; }
  } catch { /* ignora */ }
  localStorage.setItem(KEY, JSON.stringify(SEED));
  return SEED;
}

let vinhos: Wine[] = loadInitial();
const listeners = new Set<() => void>();
const emit = () => listeners.forEach(l => l());
const persist = () => { try { localStorage.setItem(KEY, JSON.stringify(vinhos)); } catch { /* ignora */ } };

export function subscribe(cb: () => void) { listeners.add(cb); return () => { listeners.delete(cb); }; }
export function getSnapshot() { return vinhos; }
export function useVinhos() { return useSyncExternalStore(subscribe, getSnapshot); }

window.addEventListener('storage', (e) => {
  if (e.key !== KEY) return;
  try {
    const p = e.newValue ? JSON.parse(e.newValue) : null;
    if (Array.isArray(p)) { vinhos = p as Wine[]; emit(); }
  } catch { /* ignora */ }
});

export function countInLine(coluna: Regiao, linha: number, exceptId?: string) {
  return vinhos.filter(v => v.coluna === coluna && v.linha === linha && v.id !== exceptId).length;
}
export function addVinho(data: Omit<Wine, 'id'>) { vinhos = [{ id: genId(), ...data }, ...vinhos]; persist(); emit(); }
export function updateVinho(id: string, patch: Partial<Omit<Wine, 'id'>>) {
  vinhos = vinhos.map(v => (v.id === id ? { ...v, ...patch } : v)); persist(); emit();
}
export function removeVinho(id: string) { vinhos = vinhos.filter(v => v.id !== id); persist(); emit(); }
export function resetVinhos() { vinhos = SEED.map(v => ({ ...v })); persist(); emit(); }