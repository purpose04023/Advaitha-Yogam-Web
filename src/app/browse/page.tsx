'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import PublicNavbar from '@/components/public/PublicNavbar';
import { Search, BookOpen, PenSquare, ArrowRight, Loader2, Calendar, Eye } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';
import { useSearchParams } from 'next/navigation';

function BrowseContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') || 'All';
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [type, setType] = useState(initialType);
  const [category, setCategory] = useState('All');

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
    <section className="pt-48 pb-20 px-12 max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 pb-12 border-b border-[#E8873A]/10">
        <div className="space-y-6">
          <h1 className="text-6xl font-black text-[#2D5016] tracking-tighter leading-none">The <span className="text-[#E8873A]">Library</span> of Peace.</h1>
          <p className="text-gray-500 text-lg font-medium max-w-xl">Browse our complete collection of digital books and spiritual teachings.</p>
        </div>

        <div className="flex bg-white p-2.5 rounded-[2rem] border border-gray-100 shadow-xl shadow-[#E8873A]/5">
           {['All', 'book', 'concept'].map((t) => (
             <button
               key={t}
               onClick={() => setType(t)}
               className={`px-8 py-3 rounded-[1.5rem] text-xs font-black transition-all uppercase tracking-widest ${
                 type === t ? 'bg-[#E8873A] text-white shadow-xl shadow-[#E8873A]/20' : 'text-gray-400 hover:text-gray-600'
               }`}
             >
               {t === 'book' ? 'Digital Books' : t === 'concept' ? 'Teachings' : 'All Wisdom'}
             </button>
           ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="lg:w-72 flex-shrink-0 space-y-12">
          <div className="space-y-4">
             <label className="text-[10px] font-black text-[#E8873A] uppercase tracking-[0.3em] px-2">Search Library</label>
             <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search titles..."
                  className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-[2rem] focus:ring-4 focus:ring-[#E8873A]/10 outline-none font-bold text-[#2D5016] text-sm shadow-xl shadow-[#E8873A]/5 transition-all"
                />
             </div>
          </div>

          <div className="space-y-6">
             <label className="text-[10px] font-black text-[#E8873A] uppercase tracking-[0.3em] px-2">Categories</label>
             <div className="flex flex-col gap-3">
                {['All', 'Advaita Vedanta', 'Pranayama', 'Philosophy', 'Meditation'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`text-left px-6 py-4 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all border-2 ${
                      category === cat
                        ? 'bg-[#2D5016] border-[#2D5016] text-white shadow-2xl shadow-[#2D5016]/20'
                        : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
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
              <Loader2 className="w-12 h-12 text-[#E8873A] animate-spin mx-auto mb-4" />
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Accessing Knowledge...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-10">
              {filteredItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.type === 'book' ? item.file_url : `/teaching/${item.id}`}
                  target={item.type === 'book' ? "_blank" : "_self"}
                  className="bg-white rounded-[3rem] shadow-xl shadow-[#E8873A]/5 border border-gray-100 overflow-hidden flex flex-col group hover:shadow-2xl transition-all hover:scale-[1.02] relative"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={item.cover_image_url || 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=2070&auto=format&fit=crop'} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" />
                    <div className="absolute top-6 left-6">
                      <span className="px-5 py-2 bg-white/90 backdrop-blur-md text-[#E8873A] text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-2xl shadow-[#E8873A]/10 border border-[#E8873A]/10">
                        {item.category_name}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-6 right-6 flex items-center justify-center p-4 bg-[#E8873A] text-white rounded-2xl shadow-2xl shadow-[#E8873A]/20 scale-0 group-hover:scale-100 transition-transform">
                       {item.type === 'book' ? <BookOpen className="w-6 h-6" /> : <ArrowRight className="w-6 h-6" />}
                    </div>
                  </div>

                  <div className="p-10 flex-grow space-y-6">
                    <div className="space-y-3">
                       <div className="flex items-center gap-2 text-[#E8873A] text-[10px] font-black uppercase tracking-widest">
                         {item.type === 'book' ? <><BookOpen className="w-3 h-3" /> Digital Book</> : <><PenSquare className="w-3 h-3" /> Article</>}
                       </div>
                       <h3 className="text-3xl font-black text-[#2D5016] line-clamp-2 leading-[1.1] tracking-tighter">{item.title}</h3>
                    </div>
                    <p className="text-gray-500 text-sm font-medium line-clamp-3 leading-relaxed">{item.description || item.content_text?.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...'}</p>

                    <div className="pt-6 border-t border-gray-50 flex items-center gap-6 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(item.created_at), 'MMM d, yyyy')}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Eye className="w-3 h-3" />
                        {item.view_count || 0} Views
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && filteredItems.length === 0 && (
            <div className="py-32 text-center border-4 border-dashed border-gray-100 rounded-[4rem] flex flex-col items-center gap-6">
              <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center text-gray-200">
                 <BookOpen className="w-12 h-12" />
              </div>
              <div>
                 <h3 className="text-3xl font-black text-[#2D5016] tracking-tighter mb-2">Knowledge is waiting...</h3>
                 <p className="text-gray-400 font-medium text-lg">Try changing your search or filters to find what you seek.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function BrowsePage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <PublicNavbar />
      <Suspense fallback={
        <div className="pt-48 pb-20 px-12 text-center">
          <Loader2 className="w-12 h-12 text-[#E8873A] animate-spin mx-auto mb-4" />
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading Wisdom...</p>
        </div>
      }>
        <BrowseContent />
      </Suspense>

      {/* Public Footer */}
      <footer className="py-20 px-12 bg-[#2D5016] text-white text-center">
         <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-4xl font-black tracking-tight flex items-center justify-center gap-4">
              <div className="w-10 h-10 bg-[#E8873A] rounded-2xl rotate-45 flex items-center justify-center">
                <span className="text-white -rotate-45 font-black">A</span>
              </div>
              Advaitha Yogam
            </h2>
            <div className="w-24 h-1.5 bg-[#E8873A] rounded-full mx-auto"></div>
            <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.4em] leading-relaxed">© 2025 Eternal Rights Reserved</p>
         </div>
      </footer>
    </div>
  );
}
