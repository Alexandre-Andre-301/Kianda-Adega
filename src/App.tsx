import { useEffect, useState } from 'react';
import { Cliente } from './components/Cliente';
import { Admin } from './components/admin/Admin';

export default function App() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const f = () => setHash(window.location.hash);
    window.addEventListener('hashchange', f);
    return () => window.removeEventListener('hashchange', f);
  }, []);

  return hash.startsWith('/admin') ? <Admin /> : <Cliente />;
}