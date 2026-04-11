'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function PublicNavbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/browse?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-sage-100 px-6 md:px-16 py-5 flex items-center justify-between transition-all duration-300">
      <Link href="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 bg-terracotta-500 rounded-xl flex items-center justify-center group-hover:bg-terracotta-600 transition-colors duration-300 shadow-lg shadow-terracotta-500/20">
          <span className="text-white font-serif italic text-2xl">A</span>
        </div>
        <span className="text-2xl font-bold tracking-tight text-sage-900">Advaitha Yogam</span>
      </Link>

      <div className="hidden md:flex items-center gap-10">
        <Link href="/browse" className="text-sm font-semibold text-sage-700 hover:text-terracotta-500 transition-colors">Digital Library</Link>
        <Link href="/browse?type=concept" className="text-sm font-semibold text-sage-700 hover:text-terracotta-500 transition-colors">Teachings</Link>

        <div className="flex items-center gap-6 border-l border-sage-200 ml-4 pl-10">
          <div className="relative flex items-center">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.form
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 240, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  onSubmit={handleSearch}
                  className="absolute right-0 flex items-center"
                >
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search wisdom..."
                    className="w-full bg-sage-50 border border-sage-200 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500/20"
                  />
                  <button type="submit" className="absolute right-3 text-sage-400 hover:text-terracotta-500">
                    <Search className="w-4 h-4" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            {!isSearchOpen ? (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-sage-600 hover:text-terracotta-500 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 text-sage-600 hover:text-terracotta-500 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <Link
            href="/admin/login"
            className="bg-terracotta-500 text-white px-8 py-2.5 rounded-full text-sm font-bold hover:bg-terracotta-600 transition-all shadow-md shadow-terracotta-500/20 active:scale-95"
          >
            Login
          </Link>
        </div>
      </div>

      <button className="md:hidden p-2 text-sage-900">
        <Menu className="w-6 h-6" />
      </button>
    </nav>
  );
}
