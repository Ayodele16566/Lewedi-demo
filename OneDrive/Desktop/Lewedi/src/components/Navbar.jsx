import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('lewedi_token')));
  const links = [['About us', '/about'], ['Our stories', '/stories'], ['Get involved', '/contact']];

  useEffect(() => {
    const syncAuthState = () => setIsAuthenticated(Boolean(localStorage.getItem('lewedi_token')));
    syncAuthState();
    window.addEventListener('storage', syncAuthState);
    return () => window.removeEventListener('storage', syncAuthState);
  }, []);

  function signOut() {
    localStorage.removeItem('lewedi_token');
    localStorage.removeItem('lewedi_user');
    setIsAuthenticated(false);
    setOpen(false);
    navigate('/');
  }

  return (
    <header className="site-header">
      <Link className="brand" to="/" onClick={() => setOpen(false)}><img src="/logo.png" alt="Lewedi logo" /><span>LEWEDI</span></Link>
      <button className="menu-button" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav className={open ? 'nav-links open' : 'nav-links'}>
        {links.map(([label, path]) => <NavLink key={path} to={path} onClick={() => setOpen(false)}>{label}</NavLink>)}
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
            <button type="button" className="button button-small button-outline" onClick={signOut}>Sign out</button>
          </>
        ) : (
          <>
            <Link className="button button-small button-outline" to="/signin" onClick={() => setOpen(false)}>Sign in</Link>
            <Link className="button button-small" to="/signup" onClick={() => setOpen(false)}>Sign up <span>↗</span></Link>
          </>
        )}
      </nav>
    </header>
  );
}
