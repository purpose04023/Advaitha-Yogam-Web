import PublicNavbar from '@/components/public/PublicNavbar';
import { Heart, ArrowRight, BookOpen, PenSquare, Eye } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] selection:bg-[#E8873A] selection:text-white">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-12 overflow-hidden flex flex-col items-center text-center">
        {/* Abstract Background Shapes */}
        <div className="absolute top-24 -left-32 w-[32rem] h-[32rem] bg-[#E8873A]/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute -bottom-12 -right-32 w-[40rem] h-[40rem] bg-[#2D5016]/5 rounded-full blur-[100px] -z-10"></div>

        <div className="max-w-4xl space-y-10 relative z-10">
          <div className="inline-flex items-center gap-4 px-6 py-2 bg-white rounded-full border border-[#E8873A]/10 shadow-2xl shadow-[#E8873A]/5 animate-bounce-subtle">
            <div className="w-2 h-2 bg-[#E8873A] rounded-full"></div>
            <p className="text-[10px] font-black text-[#E8873A] uppercase tracking-[0.3em]">Eternal Wisdom of the Guru</p>
          </div>

          <h1 className="text-7xl md:text-8xl font-black text-[#2D5016] tracking-tighter leading-[0.9]">
            The Journey of <span className="text-[#E8873A]">Advaitha</span> Yogam.
          </h1>

          <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Exploring the timeless teachings of non-duality and spiritual realization through modern research and ancient wisdom.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8">
            <Link href="/browse" className="px-12 py-5 bg-[#2D5016] text-white text-lg font-black rounded-3xl hover:bg-[#E8873A] transition-all shadow-2xl shadow-[#2D5016]/20 flex items-center gap-4 hover:scale-105 active:scale-95 group">
              Begin Your Journey <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link href="/browse?type=book" className="px-12 py-5 bg-white text-[#2D5016] text-lg font-black rounded-3xl hover:border-[#E8873A] border-2 border-gray-100 transition-all flex items-center gap-4 hover:scale-105 active:scale-95 shadow-xl shadow-[#E8873A]/5">
              Digital Library <BookOpen className="w-6 h-6 text-[#E8873A]" />
            </Link>
          </div>
        </div>

        <div className="mt-32 w-full max-w-6xl">
           <div className="relative aspect-[21/9] rounded-[4rem] overflow-hidden shadow-2xl shadow-[#2D5016]/10 border-8 border-white group">
              <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2040&auto=format&fit=crop" alt="Yoga Practice" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D5016]/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
                <div className="text-left">
                   <p className="text-white/70 text-xs font-black uppercase tracking-widest mb-2">Featured Publication</p>
                   <h3 className="text-3xl font-black text-white leading-none">The Essence of Self</h3>
                </div>
                <div className="flex gap-4">
                   <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                      <Eye className="text-white w-6 h-6" />
                   </div>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="py-32 px-12 bg-white">
         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="space-y-12">
               <div className="space-y-6">
                 <h2 className="text-5xl font-black text-[#2D5016] tracking-tighter leading-none">Modern Library of <span className="text-[#E8873A]">Ancient</span> Scripts.</h2>
                 <p className="text-gray-500 text-lg font-medium leading-relaxed">We maintain a digital repository of rare books, authentic translations, and commentary that were previously inaccessible to the modern seeker.</p>
               </div>
               <div className="space-y-6">
                  <div className="flex items-start gap-8 p-10 bg-[#FDFBF7] rounded-[3rem] border border-[#E8873A]/10 hover:border-[#E8873A] transition-all hover:shadow-2xl shadow-[#E8873A]/5 group">
                     <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                        <BookOpen className="w-8 h-8 text-[#E8873A]" />
                     </div>
                     <div className="space-y-2">
                        <h4 className="text-2xl font-black text-[#2D5016]">Research Manuscripts</h4>
                        <p className="text-gray-500 font-medium">Access over 500 hand-picked PDFs of traditional scriptures and guru-shishya parampara teachings.</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-8 p-10 bg-[#FDFBF7] rounded-[3rem] border border-[#E8873A]/10 hover:border-[#E8873A] transition-all hover:shadow-2xl shadow-[#E8873A]/5 group">
                     <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                        <PenSquare className="w-8 h-8 text-[#E8873A]" />
                     </div>
                     <div className="space-y-2">
                        <h4 className="text-2xl font-black text-[#2D5016]">Teaching Guides</h4>
                        <p className="text-gray-500 font-medium">Simplified concepts of Pranayama, Yoga Philosophy, and Advaita Vedanta for everyday living.</p>
                     </div>
                  </div>
               </div>
            </div>
            <div className="relative">
               <div className="sticky top-48 aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl shadow-[#2D5016]/10 group">
                  <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop" alt="Meditation" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" />
                  <div className="absolute inset-0 bg-[#2D5016]/10"></div>
                  <div className="absolute top-12 left-12">
                     <div className="p-8 bg-white/90 backdrop-blur-md rounded-[2.5rem] shadow-2xl space-y-2 border-l-8 border-[#E8873A]">
                        <p className="text-[#E8873A] text-[10px] font-black uppercase tracking-widest leading-none">Daily Quote</p>
                        <p className="text-xl font-black text-[#2D5016] leading-snug italic">&quot;That which you seek, is that with which you are seeking.&quot;</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-12 bg-[#2D5016] text-white text-center">
         <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-4xl font-black tracking-tight flex items-center justify-center gap-4">
              <div className="w-10 h-10 bg-[#E8873A] rounded-2xl rotate-45 flex items-center justify-center">
                <span className="text-white -rotate-45 font-black">A</span>
              </div>
              Advaitha Yogam
            </h2>
            <div className="w-24 h-1.5 bg-[#E8873A] rounded-full mx-auto"></div>
            <p className="text-white/50 text-sm font-bold uppercase tracking-[0.4em] leading-relaxed">The Eternal Sanctuary of Spiritual Knowledge</p>
            <div className="flex justify-center gap-12 text-sm font-black uppercase tracking-widest text-white/70">
               <Link href="/browse" className="hover:text-white transition-colors">Digital Library</Link>
               <Link href="/browse?type=concept" className="hover:text-white transition-colors">Articles</Link>
               <Link href="/admin/login" className="hover:text-white transition-colors">Admin Portal</Link>
            </div>
            <div className="pt-12 border-t border-white/10 flex flex-col items-center gap-6">
               <p className="text-xs text-white/30 font-bold uppercase tracking-widest flex items-center gap-2">
                 Made with <Heart className="w-3 h-3 text-[#E8873A] fill-[#E8873A]" /> by seekers for seekers
               </p>
               <p className="text-[10px] text-white/20 font-medium">© 2025 Advaitha Yogam. All traditional rights reserved.</p>
            </div>
         </div>
      </footer>
    </div>
  );
}
