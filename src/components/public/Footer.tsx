import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="pt-24 pb-12 px-6 md:px-16 bg-sage-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-terracotta-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-serif italic text-lg">A</span>
              </div>
              <span className="text-2xl font-bold tracking-tight">Advaitha Yogam</span>
            </div>
            <p className="text-sage-400 font-medium max-w-sm">
              A non-profit foundation dedicated to preserving and sharing the eternal wisdom of Advaitha and the path of Yoga.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-sage-400 font-medium text-sm">
              <li><Link href="/browse" className="hover:text-terracotta-400 transition-colors">Digital Library</Link></li>
              <li><Link href="/browse?type=concept" className="hover:text-terracotta-400 transition-colors">Spiritual Articles</Link></li>
              <li><Link href="/browse?type=book" className="hover:text-terracotta-400 transition-colors">PDF Collections</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Foundation</h4>
            <ul className="space-y-4 text-sage-400 font-medium text-sm">
              <li><Link href="/admin/login" className="hover:text-terracotta-400 transition-colors">Admin Access</Link></li>
              <li><Link href="#" className="hover:text-terracotta-400 transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-terracotta-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-sage-500 font-medium tracking-wider uppercase">
            © 2025 Advaitha Yogam Foundation. All traditional rights reserved.
          </p>
          <p className="text-xs text-sage-600 font-medium flex items-center gap-2">
            Made with <Heart className="w-3 h-3 text-terracotta-500 fill-terracotta-500" /> for seekers of truth
          </p>
        </div>
      </div>
    </footer>
  );
}
