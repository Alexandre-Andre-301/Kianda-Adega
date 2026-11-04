import { useMemo, useRef, useState } from 'react';
import type { MouseEvent as ReactMouse } from 'react';
import { Link } from 'react-router-dom';
import { useVinhos, removeVinho, resetVinhos } from '../../store';
import { fmtKz } from '../../util';
import { ConfirmDialog } from '../../ui/ConfirmDialog';
import { useToast } from '../../ui/toast-context';
import type { Wine } from '../../types';
import { WineForm } from './WineForm';

type Confirmo =
  | { tipo: 'remover'; vinho: Wine }
  | { tipo: 'repor' }
  | null;

export function AdminPanel({ onLogout }: { onLogout: () => void }) {
  const wines = useVinhos();
  const notificar = useToast();
  const [q, setQ] = useState('');
  // undefined = fechado | null = novo | Wine = editar
  const [editing, setEditing] = useState<Wine | null | undefined>(undefined);
  const [confirmo, setConfirmo] = useState<Confirmo>(null);
  const [gatilho, setGatilho] = useState<HTMLElement | null>(null);
  const addRef = useRef<HTMLButtonElement>(null);

  const abrirForm = (e: ReactMouse<HTMLElement>, vinho: Wine | null) => {
    setGatilho(e.currentTarget);
    setEditing(vinho);
  };
  const abrirConfirmo = (e: ReactMouse<HTMLElement>, c: NonNullable<Confirmo>) => {
    setGatilho(e.currentTarget);
    setConfirmo(c);
  };

  const filtrados = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return wines;
    return wines.filter(v => (v.nome + ' ' + v.tipo + ' ' + v.coluna).toLowerCase().includes(s));
  }, [wines, q]);

  const executarConfirmo = () => {
    if (confirmo?.tipo === 'remover') {
      removeVinho(confirmo.vinho.id);
      notificar({ variante: 'ok', titulo: 'Vinho removido', descricao: confirmo.vinho.nome });
    }
    if (confirmo?.tipo === 'repor') {
      resetVinhos();
      notificar({ variante: 'ok', titulo: 'Demo reposta', descricao: 'A adega voltou aos 27 vinhos originais.' });
    }
    setConfirmo(null);
  };

  return (
    <div className="admin">
      <aside className="sidebar">
        <div className="side-brand">
          <div className="wordmark">KIANDA<span>·Admin</span></div>
          <div className="side-sub">Gestão da Adega</div>
        </div>
        <button ref={addRef} className="add-btn" onClick={e => abrirForm(e, null)}>+ Adicionar vinho</button>
        <nav className="side-nav"><a className="active">Inventário</a></nav>
        <div className="side-foot">
          <Link className="side-link" to="/">Ver site público</Link>
          <button className="side-link" onClick={e => abrirConfirmo(e, { tipo: 'repor' })}>Repor demo</button>
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
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Procurar por nome, tipo ou região…" aria-label="Procurar vinho no inventário" />
        </div>

        <p className="wcount" aria-live="polite">{filtrados.length} de {wines.length} vinhos</p>

        <div className="wtable-wrap">
          <table className="wtable">
            <caption className="sr-only">Inventário de vinhos com preço, disponibilidade, localização e ações</caption>
            <thead>
              <tr><th>Vinho</th><th>Preço</th><th>Disponível</th><th>Localização</th><th><span className="sr-only">Ações</span></th></tr>
            </thead>
            <tbody>
              {filtrados.map(v => (
                <tr key={v.id}>
                  <td data-th="Vinho"><div className="wnome">{v.nome}</div><div className="wtipo">{v.tipo}</div></td>
                  <td data-th="Preço" className="wprice">Kz {fmtKz(v.preco)}</td>
                  <td data-th="Disponível"><span className={`badge ${v.disponivel ? 'badge-ok' : 'badge-out'}`}>{v.disponivel ? 'Disponível' : 'Esgotado'}</span></td>
                  <td data-th="Local" className="wloc">{v.coluna} · Linha {v.linha}</td>
                  <td data-th="Ações" className="wactions">
                    <button className="mini" onClick={e => abrirForm(e, v)}>Editar</button>
                    <button className="mini danger" onClick={e => abrirConfirmo(e, { tipo: 'remover', vinho: v })}>Remover</button>
                  </td>
                </tr>
              ))}
              {filtrados.length === 0 && (
                <tr><td colSpan={5} className="wempty">
                  Nenhum vinho corresponde a “{q}”.
                  <button className="limpar" onClick={() => setQ('')}>Limpar procura</button>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {editing !== undefined && <WineForm wine={editing} onMudar={setEditing} gatilho={gatilho} />}

      <ConfirmDialog
        aberto={confirmo !== null}
        titulo={confirmo?.tipo === 'repor' ? 'Repor a demonstração?' : 'Remover vinho?'}
        descricao={confirmo?.tipo === 'repor'
          ? 'Todos os vinhos voltam ao elenco original de 27 e as tuas alterações são apagadas.'
          : `“${confirmo?.tipo === 'remover' ? confirmo.vinho.nome : ''}” sai da adega. Não há como anular.`}
        textoConfirmar={confirmo?.tipo === 'repor' ? 'Repor tudo' : 'Remover'}
        gatilho={gatilho}
        alternativo={() => addRef.current}
        onConfirmar={executarConfirmo}
        onCancelar={() => setConfirmo(null)}
      />
    </div>
  );
}
