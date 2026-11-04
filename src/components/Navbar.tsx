import * as Dialog from '@radix-ui/react-dialog';
import { Link } from 'react-router-dom';

const IconeMenu = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const Item = ({ to, hash, children }: { to?: string; hash?: string; children: string }) => (
  <Dialog.Close asChild>
    {to ? <Link to={to}>{children}</Link> : <a href={hash}>{children}</a>}
  </Dialog.Close>
);

export function Navbar() {
  return (
    <nav>
      <div className="wordmark">KIANDA<span>·Adega</span></div>

      <div className="navlinks">
        <Link to="/" className="active">Vinhos</Link>
        <a href="#sugestoes">Sugestões</a>
        <Link to="/admin">Admin</Link>
      </div>

      <div className="navicons">
        <Dialog.Root>
          <Dialog.Trigger className="menu-btn" aria-label="Abrir menu">
            <IconeMenu />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="overlay" />
            <Dialog.Content className="menu-sheet">
              <Dialog.Title className="menu-titulo">Navegação</Dialog.Title>
              <div className="menu-ligacoes">
                <Item to="/">Vinhos</Item>
                <Item hash="#sugestoes">Sugestões</Item>
                <Item to="/admin">Admin</Item>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </nav>
  );
}
