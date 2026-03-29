import PublicNavbar from '@/components/public/PublicNavbar';
import { createClient } from '@/lib/supabase-server';
import { format } from 'date-fns';
import { Calendar, Eye, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function TeachingPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: item, error } = await supabase
    .from('teachings')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !item) {
    notFound();
  }

  // Increment view count
  await supabase.rpc('increment_view_count', { row_id: params.id });

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <PublicNavbar />

      <article className="pt-48 pb-32 px-12 max-w-4xl mx-auto space-y-12">
        <Link href="/browse" className="inline-flex items-center gap-3 text-[#E8873A] font-black uppercase tracking-widest text-xs hover:gap-6 transition-all">
          <ArrowLeft className="w-5 h-5" /> Back to Wisdom
        </Link>

        {item.cover_image_url && (
          <div className="relative aspect-[21/9] rounded-[4rem] overflow-hidden shadow-2xl shadow-[#2D5016]/10 border-8 border-white">
            <img src={item.cover_image_url} className="w-full h-full object-cover" alt={item.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D5016]/60 via-transparent to-transparent"></div>
          </div>
        )}

        <div className="space-y-10">
          <div className="flex flex-wrap items-center gap-6 text-[#E8873A] text-[10px] font-black uppercase tracking-widest">
            <span className="px-5 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-2xl shadow-[#E8873A]/10 border border-[#E8873A]/10">
              {item.category_name}
            </span>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {format(new Date(item.created_at), 'MMMM d, yyyy')}
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              {item.view_count || 0} Views
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-black text-[#2D5016] tracking-tighter leading-none">{item.title}</h1>
          <div className="w-24 h-2 bg-[#E8873A] rounded-full"></div>

          <div
            className="prose prose-2xl prose-stone prose-headings:font-black prose-headings:text-[#2D5016] prose-p:text-gray-600 prose-p:leading-relaxed prose-p:font-medium max-w-none space-y-8 pt-8"
            dangerouslySetInnerHTML={{ __html: item.content_text || '' }}
          />
        </div>
      </article>

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
