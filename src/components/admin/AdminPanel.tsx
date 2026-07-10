import { useMemo, useState } from 'react';
import { useVinhos, removeVinho, resetVinhos } from '../../store';
import type { Wine } from '../../types';
import { WineForm } from './WineForm';

export function AdminPanel({ onLogout }: { onLogout: () => void }) {
  const wines = useVinhos();
  const [q, setQ] = useState('');
  // undefined = fechado | null = novo | Wine = editar
  const [editing, setEditing] = useState<Wine | null | undefined>(undefined);

  const fmtKz = (value: number) => value.toLocaleString('pt-PT');

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return wines;
    return wines.filter(v => (v.nome + ' ' + v.tipo + ' ' + v.coluna).toLowerCase().includes(s));
  }, [wines, q]);

  return (
    <div className="admin">
      <aside className="sidebar">
        <div className="side-brand">
          <div className="wordmark">KIANDA<span>·Admin</span></div>
          <div className="side-sub">Gestão da Adega</div>
        </div>
        <button className="add-btn" onClick={() => setEditing(null)}>+ Adicionar vinho</button>
        <nav className="side-nav"><a className="active">Inventário</a></nav>
        <div className="side-foot">
          <button className="side-link" onClick={() => { if (confirm('Repor os vinhos de demonstração? As alterações serão apagadas.')) resetVinhos(); }}>
            Repor demo
          </button>
          <button className="side-link" onClick={onLogout}>Sair</button>
        </div>
      </aside>

      <main className="admin-main">
        <h1 className="admin-title">Gestão de Vinhos</h1>
        <p className="admin-desc">Cadastre vinhos, defina a coluna (região) e a linha, e marque se está disponível.</p>

        <div className="searchbar admin-search">
          <svg className="mag" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" /><path d="m20 20-3.2-3.2" />
          </svg>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Procurar por nome, tipo ou região…" />
        </div>

        <div className="wtable-wrap">
          <table className="wtable">
            <thead>
              <tr><th>Vinho</th><th>Preço</th><th>Disponível</th><th>Localização</th><th></th></tr>
            </thead>
            <tbody>
              {filtered.map(v => (
                <tr key={v.id}>
                  <td><div className="wnome">{v.nome}</div><div className="wtipo">{v.tipo}</div></td>
                  <td className="wprice">Kz {fmtKz(v.preco)}</td>
                  <td><span className={`badge ${v.disponivel ? 'badge-ok' : 'badge-out'}`}>{v.disponivel ? 'Disponível' : 'Esgotado'}</span></td>
                  <td className="wloc">{v.coluna} · Linha {v.linha}</td>
                  <td className="wactions">
                    <button className="mini" onClick={() => setEditing(v)}>Editar</button>
                    <button className="mini danger" onClick={() => { if (confirm(`Remover "${v.nome}"?`)) removeVinho(v.id); }}>Remover</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={5} className="wempty">Nenhum vinho encontrado.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="wcount">{filtered.length} de {wines.length} vinhos</div>
      </main>

      {editing !== undefined && <WineForm wine={editing} onClose={() => setEditing(undefined)} />}
    </div>
  );
}