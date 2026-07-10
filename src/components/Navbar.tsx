export function Navbar() {
  return (
    <nav>
      <div className="wordmark">KIANDA<span>·Adega</span></div>
      <div className="navlinks">
        <a className="active">Vinhos</a>
        <a>Sugestões</a>
        <a>Ajuda</a>
        <a href="/admin">Admin</a>
      </div>
      <div className="navicons">
        <button title="Ajuda" aria-label="Ajuda">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .8-1 1.7" />
            <circle cx="12" cy="17" r=".6" fill="currentColor" />
          </svg>
        </button>
      </div>
    </nav>
  );
}