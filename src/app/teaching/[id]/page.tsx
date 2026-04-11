import PublicNavbar from '@/components/public/PublicNavbar';
import Footer from '@/components/public/Footer';
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
    <div className="min-h-screen bg-cream">
      <PublicNavbar />

      <article className="pt-40 pb-32 px-6 md:px-16 max-w-4xl mx-auto space-y-12">
        <Link href="/browse" className="inline-flex items-center gap-2 text-terracotta-500 font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all">
          <ArrowLeft className="w-4 h-4" /> Back to Wisdom
        </Link>

        {item.cover_image_url && (
          <div className="relative aspect-[21/9] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
            <img src={item.cover_image_url} className="w-full h-full object-cover" alt={item.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-sage-900/40 via-transparent to-transparent"></div>
          </div>
        )}

        <div className="space-y-8">
          <div className="flex flex-wrap items-center gap-6 text-sage-500 text-[11px] font-bold uppercase tracking-widest">
            <span className="px-4 py-1.5 bg-sage-50 text-terracotta-600 rounded-full border border-sage-100">
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

          <h1 className="text-5xl md:text-6xl font-bold text-sage-900 tracking-tight leading-tight">{item.title}</h1>
          <div className="w-16 h-1 bg-terracotta-500 rounded-full"></div>

          <div
            className="prose prose-lg md:prose-xl prose-stone max-w-none pt-8"
            dangerouslySetInnerHTML={{ __html: item.content_text || '' }}
          />
        </div>
      </article>

      <Footer />
    </div>
  );
}
