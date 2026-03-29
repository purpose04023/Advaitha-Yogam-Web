'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/layouts/admin/AdminLayout';
import { Search, BookOpen, PenSquare, Eye, Edit, Trash2, Calendar, Loader2, FolderOpen } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';

interface ContentItem {
  id: string;
  title: string;
  type: 'book' | 'concept';
  category_name: string;
  cover_image_url: string;
  view_count: number;
  created_at: string;
}

export default function ManageContentPage() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('teachings')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setItems(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to remove "${title}"? This cannot be undone.`)) {
      const { error } = await supabase.from('teachings').delete().eq('id', id);
      if (!error) fetchContent();
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || item.category_name === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <AdminLayout userEmail="Admin">
      <div className="p-12 max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gray-100">
          <div>
            <h1 className="text-4xl font-black text-[#2D5016] tracking-tight mb-2">Manage Content</h1>
            <p className="text-gray-500 text-lg font-medium">Browse, edit, or remove your published teachings and books.</p>
          </div>
          <div className="flex bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
             {['All', 'Advaita Vedanta', 'Pranayama', 'Philosophy', 'Meditation'].map((cat) => (
               <button
                 key={cat}
                 onClick={() => setCategory(cat)}
                 className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                   category === cat ? 'bg-[#E8873A] text-white' : 'text-gray-400 hover:text-gray-600'
                 }`}
               >
                 {cat}
               </button>
             ))}
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title..."
            className="w-full pl-16 pr-6 py-6 bg-white border border-gray-100 rounded-[2rem] focus:ring-4 focus:ring-[#E8873A]/10 outline-none font-bold text-[#2D5016] text-lg shadow-sm transition-all"
          />
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-12 h-12 text-[#E8873A] animate-spin mx-auto mb-4" />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading Wisdom...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-2xl transition-all hover:scale-[1.02] border-b-8 hover:border-b-[#E8873A]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={item.cover_image_url || '/placeholder.jpg'} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-[#E8873A] text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                      {item.category_name}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    {item.type === 'book' ? (
                      <div className="p-2 bg-blue-500/90 text-white rounded-xl shadow-lg">
                        <BookOpen className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="p-2 bg-green-500/90 text-white rounded-xl shadow-lg">
                        <PenSquare className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-8 flex-grow space-y-4">
                  <h3 className="text-xl font-black text-[#2D5016] line-clamp-2 leading-tight">{item.title}</h3>
                  <div className="flex items-center gap-4 text-gray-400 text-xs font-bold uppercase tracking-widest">
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

                <div className="p-4 bg-gray-50 flex items-center gap-2 border-t border-gray-100">
                  <button className="flex-grow py-3 bg-white text-[#2D5016] font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#E8873A] hover:text-white transition-all border border-gray-100 flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" /> Preview
                  </button>
                  <button className="p-3 bg-white text-gray-400 hover:text-blue-500 rounded-xl transition-all border border-gray-100 shadow-sm">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    className="p-3 bg-white text-gray-400 hover:text-red-500 rounded-xl transition-all border border-gray-100 shadow-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredItems.length === 0 && (
          <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-[3rem]">
            <FolderOpen className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">No content found</h3>
            <p className="text-gray-400 font-medium">Try changing your search or category filter.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
