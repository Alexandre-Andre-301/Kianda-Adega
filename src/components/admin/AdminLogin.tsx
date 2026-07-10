import { useState } from 'react';

export function AdminLogin({ onOk }: { onOk: () => void }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState(false);
  const submit = () => { if (pw === 'kianda') onOk(); else setErr(true); };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="wordmark">KIANDA<span>·Admin</span></div>
        <p className="login-sub">Área de gestão da adega</p>
        <input
          className="login-input" type="password" placeholder="Palavra-passe" value={pw}
          onChange={e => { setPw(e.target.value); setErr(false); }}
          onKeyDown={e => e.key === 'Enter' && submit()}
        />
        {err && <div className="login-err">Palavra-passe incorreta.</div>}
        <button className="btn btn-primary login-btn" onClick={submit}>Entrar</button>
        <div className="login-hint">Demo: a palavra-passe é <b>kianda</b></div>
      </div>
    </div>
  );
}