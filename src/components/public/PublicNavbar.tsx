import Link from 'next/link';
import { Menu } from 'lucide-react';

export default function PublicNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDFBF7]/80 backdrop-blur-xl border-b border-[#E8873A]/10 px-8 py-6 flex items-center justify-between">
      <Link href="/" className="text-3xl font-black text-[#2D5016] flex items-center gap-3 group">
        <div className="w-10 h-10 bg-[#E8873A] rounded-2xl rotate-45 flex items-center justify-center group-hover:rotate-90 transition-all duration-500 shadow-xl shadow-[#E8873A]/20">
          <span className="text-white -rotate-45 font-black text-xl">A</span>
        </div>
        <span className="tracking-tighter">Advaitha Yogam</span>
      </Link>

      <div className="hidden md:flex items-center gap-12">
        <Link href="/browse" className="text-sm font-black text-[#2D5016] uppercase tracking-widest hover:text-[#E8873A] transition-colors">Digital Library</Link>
        <Link href="/browse?type=concept" className="text-sm font-black text-[#2D5016] uppercase tracking-widest hover:text-[#E8873A] transition-colors">Teachings</Link>
        <Link href="/admin/login" className="text-sm font-black text-[#E8873A] uppercase tracking-widest border-2 border-[#E8873A] px-6 py-2.5 rounded-full hover:bg-[#E8873A] hover:text-white transition-all shadow-xl shadow-[#E8873A]/10">Admin Access</Link>
      </div>

      <button className="md:hidden p-2 text-[#2D5016]">
        <Menu className="w-6 h-6" />
      </button>
    </nav>
  );
}
