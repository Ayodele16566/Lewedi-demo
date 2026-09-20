import { Camera, Globe, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return <footer className="site-footer">
    <div className="footer-main">
      <div className="footer-identity"><img src="/logo.png" alt="Lewedi logo" /><p>Safer communities.<br /><em>Stronger women.</em></p></div>
      <div className="footer-links"><div><p className="footer-label">Explore</p><Link to="/about">About Lewedi</Link><Link to="/stories">Stories</Link><Link to="/contact">Contact us</Link><Link to="/privacy-policy">Privacy policy</Link><Link to="/cookie-policy">Cookie policy</Link></div><div><p className="footer-label">Connect</p><a href="mailto:hello@lewedi.org">hello@lewedi.org</a><a href="tel:+256700123456">+256 700 123 456</a><div className="socials"><a href="#" aria-label="Instagram"><Camera size={18} /></a><a href="#" aria-label="LinkedIn"><Globe size={18} /></a><a href="mailto:hello@lewedi.org" aria-label="Email"><Mail size={18} /></a></div></div></div>
    </div>
    <div className="footer-bottom"><span>© 2026 Lewedi Development Initiative. All rights reserved.</span><span>Building safer communities everywhere</span></div>
  </footer>;
}
