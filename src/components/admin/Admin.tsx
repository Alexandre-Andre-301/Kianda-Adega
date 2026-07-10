import { useState } from 'react';
import { AdminLogin } from './AdminLogin';
import { AdminPanel } from './AdminPanel';

export function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('kianda:admin') === '1');

  if (!authed) {
    return <AdminLogin onOk={() => { sessionStorage.setItem('kianda:admin', '1'); setAuthed(true); }} />;
  }
  return (
    <AdminPanel
      onLogout={() => { sessionStorage.removeItem('kianda:admin'); setAuthed(false); window.location.hash = ''; }}
    />
  );
}