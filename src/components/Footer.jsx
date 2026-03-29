import React from 'react';
import { useLanguage } from '../utils/i18n/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-surface-container-highest pt-24 pb-12 border-t border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <h2 className="font-headline text-3xl font-bold text-primary tracking-tight">Advaitha Yogam</h2>
            <p className="text-on-surface-variant max-w-md leading-relaxed">
              A digital haven for those seeking the ultimate truth through the traditional lens of Advaitha Yogam and the scholarly works of ancient masters.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'YouTube', 'Instagram', 'LinkedIn'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-current mask-icon" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-headline font-bold text-on-surface mb-6 uppercase tracking-widest text-xs">Resources</h4>
            <ul className="space-y-4 text-on-surface-variant text-sm">
              <li><a href="/articles" className="hover:text-primary transition-colors">{t('articles')}</a></li>
              <li><a href="/pravachanam" className="hover:text-primary transition-colors">{t('pravachanam')}</a></li>
              <li><a href="/books" className="hover:text-primary transition-colors">Digital Library</a></li>
              <li><a href="/gallery" className="hover:text-primary transition-colors">Manuscript Archive</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold text-on-surface mb-6 uppercase tracking-widest text-xs">Organization</h4>
            <ul className="space-y-4 text-on-surface-variant text-sm">
              <li><a href="/" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="/articles" className="hover:text-primary transition-colors">Our Scholars</a></li>
              <li><a href="/gallery" className="hover:text-primary transition-colors">Events</a></li>
              <li><a href="/" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-outline-variant/30 flex flex-col md:row justify-between items-center gap-6">
          <p className="text-outline text-xs uppercase tracking-widest">
            © {new Date().getFullYear()} Advaitha Yogam. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-xs text-outline uppercase tracking-widest">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
