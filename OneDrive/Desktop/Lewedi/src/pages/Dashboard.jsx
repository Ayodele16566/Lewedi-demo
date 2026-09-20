import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('lewedi_user');
    const token = localStorage.getItem('lewedi_token');

    if (!token) {
      navigate('/signin', { replace: true });
      return;
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
      return;
    }

    fetch('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) throw new Error('Session invalid');
        const data = await response.json();
        setUser(data.user);
        localStorage.setItem('lewedi_user', JSON.stringify(data.user));
      })
      .catch(() => {
        localStorage.removeItem('lewedi_token');
        localStorage.removeItem('lewedi_user');
        navigate('/signin', { replace: true });
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  function signOut() {
    localStorage.removeItem('lewedi_token');
    localStorage.removeItem('lewedi_user');
    navigate('/');
  }

  if (loading) {
    return <section className="page-section"><p className="eyebrow">Account</p><h1>Loading your profile...</h1></section>;
  }

  return (
    <section className="page-section interior-hero">
      <p className="eyebrow">Dashboard</p>
      <h1>Welcome back, {user?.name || 'member'}.</h1>
      <p className="lede">This placeholder dashboard confirms the user is signed in and the profile is active.</p>

      <div className="about-text" style={{ maxWidth: '760px', marginTop: '2rem' }}>
        <p><strong>Name:</strong> {user?.name || 'Not available'}</p>
        <p><strong>Email:</strong> {user?.email || 'Not available'}</p>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <button type="button" className="button" onClick={signOut}>Sign out</button>
          <Link className="button button-outline" to="/">Back home</Link>
        </div>
      </div>
    </section>
  );
}
