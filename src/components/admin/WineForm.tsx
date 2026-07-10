import { useState } from 'react';
import { TIPOS, REGIOES, MAX_POR_LINHA } from '../../data';
import { addVinho, updateVinho, countInLine } from '../../store';
import type { Wine, WineType, Regiao } from '../../types';

export function WineForm({ wine, onClose }: { wine: Wine | null; onClose: () => void }) {
  const editing = wine !== null;
  const [nome, setNome] = useState(wine?.nome ?? '');
  const [tipo, setTipo] = useState<WineType>(wine?.tipo ?? 'Tinto');
  const [preco, setPreco] = useState<string>(wine ? String(wine.preco) : '');
  const [disponivel, setDisponivel] = useState<boolean>(wine ? wine.disponivel : true);
  const [coluna, setColuna] = useState<Regiao>(wine?.coluna ?? 'Douro');
  const [linha, setLinha] = useState<string>(wine ? String(wine.linha) : '0');
  const [erro, setErro] = useState('');

  const salvar = () => {
    const nomeT = nome.trim();
    const precoN = Number(preco);
    const linhaN = Math.trunc(Number(linha));
    if (!nomeT) return setErro('Indique o nome do vinho.');
    if (!Number.isFinite(precoN) || precoN < 0) return setErro('Preço inválido.');
    if (!Number.isInteger(linhaN) || linhaN < 0) return setErro('A linha deve ser 0 ou mais.');
    if (countInLine(coluna, linhaN, wine?.id) >= MAX_POR_LINHA)
      return setErro(`A linha ${linhaN} da coluna ${coluna} já tem ${MAX_POR_LINHA} vinhos.`);

    const data = { nome: nomeT, tipo, preco: precoN, disponivel, coluna, linha: linhaN };
    if (editing && wine) updateVinho(wine.id, data); else addVinho(data);
    onClose();
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <h2>{editing ? 'Editar vinho' : 'Adicionar vinho'}</h2>
          <button className="modal-x" onClick={onClose} aria-label="Fechar">×</button>
        </div>

        <div className="field">
          <label>Nome</label>
          <input value={nome} onChange={e => setNome(e.target.value)} placeholder="ex: Quinta do Crasto Tinto" autoFocus />
        </div>

        <div className="field-row">
          <div className="field">
            <label>Tipo</label>
            <select value={tipo} onChange={e => setTipo(e.target.value as WineType)}>
              {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Preço (Kz)</label>
            <input type="number" min={0} value={preco} onChange={e => setPreco(e.target.value)} placeholder="ex: 14500" />
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label>Coluna (região)</label>
            <select value={coluna} onChange={e => setColuna(e.target.value as Regiao)}>
              {REGIOES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Linha (de baixo, começa em 0)</label>
            <input type="number" min={0} value={linha} onChange={e => setLinha(e.target.value)} />
          </div>
        </div>

        <div className="field">
          <label>Disponibilidade</label>
          <div className="toggle-row">
            <button type="button" className={`toggle ${disponivel ? 'on' : ''}`} onClick={() => setDisponivel(true)}>Disponível</button>
            <button type="button" className={`toggle ${!disponivel ? 'on-out' : ''}`} onClick={() => setDisponivel(false)}>Esgotado</button>
          </div>
        </div>

        {erro && <div className="form-err">{erro}</div>}

        <div className="form-actions">
          <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={salvar}>{editing ? 'Guardar alterações' : 'Adicionar vinho'}</button>
        </div>
      </div>
    </div>
  );
}