import { ArrowRight, LockKeyhole } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Auth({ mode }) {
  const signup = mode === 'signup';
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  async function submit(event) {
    event.preventDefault();
    setMessage('');

    try {
      const response = await fetch(`/api/auth/${signup ? 'signup' : 'signin'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Something went wrong');

      localStorage.setItem('lewedi_token', data.token);
      localStorage.setItem('lewedi_user', JSON.stringify(data.user || { name: form.name || 'Member', email: form.email }));
      navigate('/dashboard');
    } catch (error) {
      setMessage(error.message + (error.message.includes('fetch') ? ' Start the API with npm run server.' : ''));
    }
  }

  return <section className="auth-page"><div className="auth-art"><img src="/logo.png" alt="Lewedi" /><p>When women rise,<br /><em>communities flourish.</em></p></div><div className="auth-panel"><LockKeyhole size={20} /><p className="eyebrow">{signup ? 'Join Lewedi' : 'Welcome back'}</p><h1>{signup ? 'Be part of the circle.' : 'Good to see you again.'}</h1><p className="auth-subtitle">{signup ? 'Create an account to stay close to the work.' : 'Sign in to your Lewedi account.'}</p><form onSubmit={submit}>{signup && <label>Full name<input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></label>}<label>Email address<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></label><label>Password<input required minLength="8" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="8 characters minimum" /></label><button className="button" type="submit">{signup ? 'Create account' : 'Sign in'} <ArrowRight size={17} /></button>{message && <p className="form-error">{message}</p>}</form><p className="auth-switch">{signup ? 'Already a member?' : 'New to Lewedi?'} <Link to={signup ? '/signin' : '/signup'}>{signup ? 'Sign in' : 'Create an account'}</Link></p></div></section>;
}
