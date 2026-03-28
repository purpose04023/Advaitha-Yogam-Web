import React, { useState } from 'react';
import { Mail, MessageSquare, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { subscribeToNewsletter } from '../utils/newsletter';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsSubscribing(true);
    setMessage('');

    try {
      const result = await subscribeToNewsletter(email);
      if (result.success) {
        setMessage('Successfully subscribed to the newsletter!');
        setEmail('');
      } else {
        setMessage(result.error || 'Failed to subscribe. Please try again.');
      }
    } catch (err) {
      setMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-[#1f1b11] py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 px-12 items-center max-w-7xl mx-auto gap-8">
        <div className="space-y-4">
          <div className="font-headline text-2xl text-white">Editorial Spiritual Excellence</div>
          <p className="font-body text-slate-400 text-sm max-w-sm">
            A digital haven for those seeking the ultimate truth through the traditional lens of Advaita Vedanta and the scholarly works of ancient masters.
          </p>
          <div className="flex gap-4 pt-4">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              <MessageSquare className="w-5 h-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              <Play className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="flex flex-col md:items-end space-y-6">
          <form onSubmit={handleSubscribe} className="flex gap-2 w-full max-w-sm">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Join our newsletter"
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              required
            />
            <button
              type="submit"
              disabled={isSubscribing}
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all disabled:opacity-50"
            >
              {isSubscribing ? '...' : 'Join'}
            </button>
          </form>
          {message && <p className="text-[10px] text-primary italic">{message}</p>}

          <div className="flex flex-wrap gap-8 justify-start md:justify-end">
            <Link to="/privacy" className="font-label text-xs uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="font-label text-xs uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/contact" className="font-label text-xs uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Contact Us</Link>
            <Link to="/archive" className="font-label text-xs uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Archive</Link>
          </div>
          <div className="font-label text-xs uppercase tracking-widest text-slate-400">
            © 2024 Editorial Spiritual Excellence. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
