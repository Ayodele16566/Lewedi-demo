import { ArrowRight, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import Reveal from '../components/Reveal';

export default function Contact() {
  const [sent, setSent] = useState(false);
  return <section className="page-section contact-page"><div className="contact-intro"><p className="eyebrow">Get in touch</p><h1>Let us start a <em>conversation.</em></h1><p className="lede">Whether you want to partner, volunteer, share your story or simply learn more, we would love to hear from you.</p><div className="contact-details"><p><Mail size={18} /><a href="mailto:hello@lewedi.org">hello@lewedi.org</a></p><p><Phone size={18} /><a href="tel:+256700123456">+256 700 123 456</a></p></div></div><Reveal><form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}><label>Your name<input required type="text" placeholder="How should we call you?" /></label><label>Email address<input required type="email" placeholder="you@example.com" /></label><label>How can we help?<select defaultValue=""><option value="" disabled>Select an option</option><option>Partnership</option><option>Volunteering</option><option>Sharing my story</option><option>General question</option></select></label><label>Your message<textarea required rows="5" placeholder="Tell us a little more..."></textarea></label><button className="button" type="submit">{sent ? 'Message received' : 'Send message'} <ArrowRight size={17} /></button>{sent && <p className="form-success">Thank you. We will be in touch soon.</p>}</form></Reveal></section>;
}
