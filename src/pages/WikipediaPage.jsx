import React from 'react';
import { Download, ArrowLeft, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../layouts/MainLayout';
import SEO from '../components/SEO';

const WikipediaPage = ({ title, category, author, date, content, pdfUrl }) => {
  const { user } = useAuth();

  return (
    <MainLayout>
      <SEO
        title={title}
        description={`Read about ${title} in our scholarly archive. From Editorial Spiritual Excellence, the digital encyclopedia of Advaita Vedanta.`}
        url="/article/mithya"
        article={true}
      />
      <div className="max-w-4xl mx-auto px-8 py-12 bg-white shadow-sm border border-outline-variant/30 my-8 rounded-sm">
        <div className="flex justify-between items-start border-b border-outline-variant/50 pb-6 mb-8">
          <div>
            <Link to="/articles" className="text-secondary hover:underline flex items-center gap-2 text-sm mb-4">
              <ArrowLeft className="w-4 h-4" /> Back to Archive
            </Link>
            <h1 className="font-headline text-5xl text-on-surface font-bold mb-2">{title}</h1>
            <p className="text-outline italic">From Editorial Spiritual Excellence, the digital encyclopedia of Advaita Vedanta</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="bg-primary/5 text-primary px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest">{category}</span>
            {pdfUrl && (
              user ? (
                <a
                  href={pdfUrl}
                  download
                  className="flex items-center gap-2 bg-secondary-container text-on-secondary-container px-4 py-2 rounded-md font-bold text-sm hover:opacity-90 transition-all"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </a>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 bg-surface-container-high text-outline px-4 py-2 rounded-md font-bold text-sm hover:bg-surface-container transition-all"
                >
                  <Lock className="w-4 h-4" /> Login to Download
                </Link>
              )
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-3 space-y-8 font-body text-on-surface-variant leading-relaxed">
            <div className="p-4 bg-surface-container rounded-sm border-l-4 border-primary">
              <p className="italic font-headline text-lg">
                "This article explores the scholarly interpretations of {title} according to the tradition of Adi Shankara."
              </p>
            </div>
            {content.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className="font-headline text-2xl text-on-surface font-bold border-b border-outline-variant/30 pb-2">{section.heading}</h2>
                <div className="space-y-4">
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="border border-outline-variant/50 p-4 bg-surface-container-low rounded-sm">
              <h3 className="font-headline font-bold text-on-surface mb-4 border-b border-outline-variant/30 pb-2">Article Info</h3>
              <div className="space-y-4 text-xs">
                <div>
                  <p className="text-outline uppercase tracking-widest font-bold mb-1">Author</p>
                  <p className="text-on-surface font-medium">{author}</p>
                </div>
                <div>
                  <p className="text-outline uppercase tracking-widest font-bold mb-1">Date Published</p>
                  <p className="text-on-surface font-medium">{date}</p>
                </div>
                <div>
                  <p className="text-outline uppercase tracking-widest font-bold mb-1">Related Topics</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['Upanishads', 'Shankaracharya', 'Mithya'].map(tag => (
                      <span key={tag} className="bg-white border border-outline-variant/30 px-2 py-1 rounded-sm text-[10px]">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default WikipediaPage;
