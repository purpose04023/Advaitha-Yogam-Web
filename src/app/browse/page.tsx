'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import PublicNavbar from '@/components/public/PublicNavbar';
import Footer from '@/components/public/Footer';
import { Search, BookOpen, PenSquare, ArrowRight, Loader2, Calendar, Eye } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { motion, Variants } from 'framer-motion';

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

function BrowseContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialSearch);
  const [type, setType] = useState(initialType);
  const [category, setCategory] = useState('All');

  // Sync search state with URL parameters
  useEffect(() => {
    const querySearch = searchParams.get('search');
    if (querySearch !== null) {
      setSearch(querySearch);
    }

    const queryType = searchParams.get('type');
    if (queryType !== null) {
      setType(queryType);
    }
  }, [searchParams]);

  const fetchContent = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from('teachings')
      .select('*')
      .order('created_at', { ascending: false });

    if (type !== 'All') query = query.eq('type', type === 'book' ? 'book' : 'concept');
    if (category !== 'All') query = query.eq('category_name', category);

    const { data, error } = await query;
    if (!error) setItems(data || []);
    setLoading(false);
  }, [type, category]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-40 pb-20 px-6 md:px-16 max-w-7xl mx-auto space-y-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-12 pb-12 border-b border-sage-100"
      >
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-sage-900 tracking-tight leading-tight">The <span className="text-terracotta-500">Library</span> of Peace.</h1>
          <p className="text-sage-600 text-lg font-medium max-w-xl">Browse our complete collection of digital books and spiritual teachings.</p>
        </div>

        <div className="flex bg-sage-50 p-1.5 rounded-full border border-sage-100">
           {['All', 'book', 'concept'].map((t) => (
             <button
               key={t}
               onClick={() => setType(t)}
               className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all uppercase tracking-widest ${
                 type === t ? 'bg-terracotta-500 text-white shadow-md shadow-terracotta-500/20' : 'text-sage-400 hover:text-sage-600'
               }`}
             >
               {t === 'book' ? 'Books' : t === 'concept' ? 'Articles' : 'All'}
             </button>
           ))}
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Sidebar Filters */}
        <aside className="lg:w-64 flex-shrink-0 space-y-12">
          <div className="space-y-4">
             <label className="text-[11px] font-bold text-sage-400 uppercase tracking-widest px-2">Search Library</label>
             <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Titles..."
                  className="w-full pl-11 pr-4 py-3 bg-white border border-sage-200 rounded-xl focus:ring-2 focus:ring-terracotta-500/20 outline-none font-medium text-sage-900 text-sm transition-all"
                />
             </div>
          </div>

          <div className="space-y-6">
             <label className="text-[11px] font-bold text-sage-400 uppercase tracking-widest px-2">Categories</label>
             <div className="flex flex-col gap-2">
                {['All', 'Advaita Vedanta', 'Pranayama', 'Philosophy', 'Meditation'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                      category === cat
                        ? 'bg-sage-100 text-sage-900'
                        : 'text-sage-500 hover:bg-sage-50 hover:text-sage-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
             </div>
          </div>
        </aside>

        {/* Main Grid */}
        <div className="flex-grow">
          {loading ? (
            <div className="py-20 text-center">
              <Loader2 className="w-10 h-10 text-terracotta-500 animate-spin mx-auto mb-4" />
              <p className="text-sage-400 font-bold uppercase tracking-widest text-[10px]">Accessing Knowledge...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial="initial"
                  animate="animate"
                  variants={fadeInUp}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.type === 'book' ? item.file_url : `/teaching/${item.id}`}
                    target={item.type === 'book' ? "_blank" : "_self"}
                    className="bg-white rounded-xl shadow-sm border border-sage-100 overflow-hidden flex flex-col group hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={item.cover_image_url || 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=2070&auto=format&fit=crop'}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-sage-700 text-[10px] font-bold uppercase tracking-wider rounded-md border border-sage-100">
                          {item.category_name}
                        </span>
                      </div>
                    </div>

                    <div className="p-8 flex-grow space-y-4">
                      <div className="space-y-2">
                         <div className="flex items-center gap-2 text-terracotta-500 text-[10px] font-bold uppercase tracking-wider">
                           {item.type === 'book' ? <><BookOpen className="w-3 h-3" /> Digital Book</> : <><PenSquare className="w-3 h-3" /> Article</>}
                         </div>
                         <h3 className="text-2xl font-bold text-sage-900 line-clamp-2 leading-tight tracking-tight">{item.title}</h3>
                      </div>
                      <p className="text-sage-500 text-sm font-medium line-clamp-3 leading-relaxed">{item.description || item.content_text?.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...'}</p>

                      <div className="pt-6 border-t border-sage-50 flex items-center justify-between text-sage-400 text-[10px] font-bold uppercase tracking-wider">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(item.created_at), 'MMM d, yyyy')}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Eye className="w-3 h-3" />
                            {item.view_count || 0}
                          </div>
                        </div>
                        <div className="text-terracotta-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                          Read More <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && filteredItems.length === 0 && (
            <div className="py-20 text-center border-2 border-dashed border-sage-100 rounded-3xl flex flex-col items-center gap-6">
              <div className="w-16 h-16 bg-sage-50 rounded-full flex items-center justify-center text-sage-200">
                 <BookOpen className="w-8 h-8" />
              </div>
              <div>
                 <h3 className="text-xl font-bold text-sage-900 tracking-tight mb-1">No wisdom found</h3>
                 <p className="text-sage-400 font-medium">Try changing your search or filters to find what you seek.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BrowsePage() {
  return (
    <div className="min-h-screen bg-cream selection:bg-terracotta-200">
      <PublicNavbar />
      <Suspense fallback={
        <div className="pt-48 pb-20 px-12 text-center">
          <Loader2 className="w-10 h-10 text-terracotta-500 animate-spin mx-auto mb-4" />
          <p className="text-sage-400 font-bold uppercase tracking-widest text-xs">Loading Wisdom...</p>
        </div>
      }>
        <BrowseContent />
      </Suspense>

      <Footer />
    </div>
  );
}
