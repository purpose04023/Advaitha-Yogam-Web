import React from 'react';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import SEO from '../components/SEO';
import MainLayout from '../layouts/MainLayout';
import { useLanguage } from '../utils/i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';

const WikipediaPage = ({ title, category, author, date, pdfUrl, content }) => {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <MainLayout>
      <SEO
        title={title}
        description={`Read about ${title} in our scholarly archive. From Advaitha Yogam, the digital encyclopedia of spiritual wisdom.`}
        url="/article/mithya"
      />

      <div className="bg-white min-h-screen pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-8">
          {/* Article Header */}
          <header className="border-b border-slate-200 pb-8 mb-12">
            <h1 className="font-headline text-5xl font-bold text-slate-900 mb-4 tracking-tight">{title}</h1>
            <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
              <span className="bg-slate-100 px-3 py-1 rounded-full">{category}</span>
              <span>•</span>
              <span>By {author}</span>
              <span>•</span>
              <span>{date}</span>
            </div>
            <p className="text-outline italic mt-4">{t('editorial_text')}</p>
          </header>

          {/* Table of Contents - Quick access */}
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl mb-12 max-w-sm">
            <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Contents</h4>
            <ul className="space-y-2">
              {content.map((section, idx) => (
                <li key={idx}>
                  <a href={`#section-${idx}`} className="text-primary hover:underline text-sm font-medium">
                    {idx + 1}. {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Content */}
          <article className="prose prose-slate prose-lg max-w-none">
            {content.map((section, idx) => (
              <div key={idx} id={`#section-${idx}`} className="mb-12">
                <h2 className="font-headline text-3xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">
                  {section.heading}
                </h2>
                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="text-slate-700 leading-relaxed mb-6 text-lg">
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </article>

          {/* Footer Actions */}
          <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between items-center">
            <div className="text-sm text-slate-500">
              Last modified: {date}
            </div>
            {user ? (
              <a
                href={pdfUrl}
                className="bg-[#164491] text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all active:scale-95"
              >
                Download PDF Version
              </a>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 bg-slate-100 text-slate-600 px-6 py-3 rounded-lg font-bold hover:bg-slate-200 transition-all active:scale-95"
              >
                <Lock className="w-4 h-4" />
                Login to Download
              </Link>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default WikipediaPage;
