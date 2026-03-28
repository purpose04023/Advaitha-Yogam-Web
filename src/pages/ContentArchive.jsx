import React from 'react';
import MainLayout from '../layouts/MainLayout';
import SEO from '../components/SEO';
import { Search, Filter } from 'lucide-react';

const ContentArchive = ({ title, description, items = [] }) => {
  return (
    <MainLayout>
      <SEO
        title={title}
        description={description}
        url={`/${title.toLowerCase()}`}
      />

      <div className="bg-surface-container-low py-16 border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="font-headline text-5xl text-primary font-bold mb-4">{title}</h1>
          <p className="text-outline text-lg max-w-2xl">{description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
            <input
              type="text"
              placeholder={`Search ${title.toLowerCase()}...`}
              className="w-full pl-12 pr-4 py-3 bg-surface-container rounded-lg border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 border border-outline-variant/50 rounded-lg font-bold text-on-surface hover:bg-surface-container transition-all">
            <Filter className="w-5 h-5" /> Filter Results
          </button>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {items.map((item, idx) => (
              <div key={idx} className="bg-white border border-outline-variant/20 rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group">
                <div className="aspect-video bg-slate-200 relative overflow-hidden">
                   <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
                   {item.image && <img src={item.image} alt={item.title} className="w-full h-full object-cover" />}
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-secondary uppercase tracking-widest">{item.category}</span>
                  <h3 className="font-headline text-xl font-bold text-on-surface mt-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-sm text-outline mt-3 line-clamp-2">{item.excerpt}</p>
                  <div className="mt-6 pt-4 border-t border-outline-variant/30 flex justify-between items-center text-xs text-outline">
                    <span>{item.date}</span>
                    <span className="font-bold text-primary">Read More →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border-2 border-dashed border-outline-variant/30 rounded-2xl">
            <p className="text-outline italic">No items found in this section yet. Our scholars are working on uploading more content soon.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ContentArchive;
