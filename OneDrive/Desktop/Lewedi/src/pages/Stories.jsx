import { ArrowRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import StoryCard from '../components/StoryCard';
import { stories } from '../data/stories';

export default function Stories() {
  return <><section className="page-section interior-hero stories-hero"><p className="eyebrow">Our stories</p><h1>Change has a <em>human face.</em></h1><p className="lede">These are stories of courage, connection and the everyday work of building a safer, more equal future.</p></section><section className="page-section stories-list"><div className="stories-list-intro"><p className="eyebrow">Field notes</p><p>There is no single way to create change. Every story begins with someone deciding that things can be different.</p></div><div className="story-grid">{stories.map((story) => <Reveal key={story.title}><StoryCard story={story} /></Reveal>)}</div></section><section className="story-callout"><div className="page-section"><span>✦</span><h2>Your story belongs in the future we are building.</h2><a className="text-link light-link" href="mailto:stories@lewedi.org">Share your story <ArrowRight size={16} /></a></div></section></>;
}
