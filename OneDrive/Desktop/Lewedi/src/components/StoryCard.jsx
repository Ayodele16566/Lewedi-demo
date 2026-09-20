import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StoryCard({ story }) {
  return <article className={`story-card ${story.accent}`}><div className="story-card-top"><span>{story.category}</span><span>{story.date}</span></div><div><h3>{story.title}</h3><p>{story.excerpt}</p><Link to="/stories" className="text-link">Read story <ArrowUpRight size={16} /></Link></div></article>;
}
