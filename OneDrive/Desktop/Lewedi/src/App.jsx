import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Stories from './pages/Stories';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';
import Dashboard from './pages/Dashboard';

function ProtectedRoute({ children }) {
  const isAuthenticated = Boolean(localStorage.getItem('lewedi_token'));
  return isAuthenticated ? children : <Navigate to="/signin" replace />;
}

export default function App() {
  return <><Navbar /><main><Routes><Route path="/" element={<Home />} /><Route path="/about" element={<About />} /><Route path="/stories" element={<Stories />} /><Route path="/contact" element={<Contact />} /><Route path="/privacy-policy" element={<PrivacyPolicy />} /><Route path="/cookie-policy" element={<CookiePolicy />} /><Route path="/signin" element={<Auth mode="signin" />} /><Route path="/signup" element={<Auth mode="signup" />} /><Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /></Routes></main><Footer /></>;
}