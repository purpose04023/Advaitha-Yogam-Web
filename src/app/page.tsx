'use client';

import PublicNavbar from '@/components/public/PublicNavbar';
import Footer from '@/components/public/Footer';
import { ArrowRight, BookOpen, PenSquare, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  },
  viewport: { once: true } as any
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream selection:bg-terracotta-200 selection:text-terracotta-900 font-sans">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 md:px-16 overflow-hidden flex flex-col items-center">
        {/* Soft Background Elements */}
        <div className="absolute top-24 -left-32 w-[32rem] h-[32rem] bg-sage-100/50 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-40 -right-32 w-[32rem] h-[32rem] bg-terracotta-100/30 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-8 text-left"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-sage-50 rounded-full border border-sage-100">
              <Sparkles className="w-4 h-4 text-terracotta-500" />
              <p className="text-[11px] font-bold text-sage-600 uppercase tracking-[0.2em]">Ancient Wisdom for Modern Life</p>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-sage-900 leading-[1.1] tracking-tight">
               <span className="block font-telugu text-4xl mb-4 text-terracotta-600" lang="te">మార్గం</span>
               Advaitha Yogam
            </h1>

            <p className="text-lg md:text-xl text-sage-600 font-medium leading-relaxed max-w-lg">
              A foundation dedicated to the exploration of non-duality and spiritual realization through authentic teachings and modern research.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <Link href="/browse" className="w-full sm:w-auto px-10 py-4 bg-terracotta-500 text-white font-bold rounded-full hover:bg-terracotta-600 transition-all shadow-lg shadow-terracotta-500/20 flex items-center justify-center gap-3 hover:translate-y-[-2px]">
                Explore Library <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/browse?type=concept" className="w-full sm:w-auto px-10 py-4 bg-white text-sage-700 font-bold rounded-full border border-sage-200 hover:border-terracotta-500 transition-all flex items-center justify-center gap-3 hover:translate-y-[-2px]">
                Start Learning
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2040&auto=format&fit=crop"
                alt="Lord Shiva - Spiritual Essence"
                className="w-full h-full object-cover grayscale-[20%] brightness-[1.05] contrast-[0.95]"
              />
              <div className="absolute inset-0 bg-white/10 backdrop-none"></div>
              {/* Optional soft-wash overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-sage-900/40 via-transparent to-transparent"></div>
            </div>
            {/* Abstract Shape behind image */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-terracotta-100 rounded-full -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* Daily Reflection Section */}
      <section className="py-24 bg-sage-50">
        <motion.div
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto px-6 text-center space-y-8"
        >
          <div className="w-12 h-1 bg-terracotta-500 mx-auto rounded-full"></div>
          <h2 className="text-xs font-bold text-terracotta-600 uppercase tracking-[0.4em]">Daily Reflection</h2>
          <blockquote className="font-serif italic text-3xl md:text-4xl text-sage-800 leading-snug">
            "That which you seek, is that with which you are seeking. The silence within is the loudest answer you will ever hear."
          </blockquote>
          <p className="text-sage-500 font-medium">— Sri Advaitha Guru</p>
        </motion.div>
      </section>

      {/* Content Sections */}
      <section className="py-32 px-6 md:px-16 bg-cream">
         <div className="max-w-6xl mx-auto space-y-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
               <motion.div
                 initial="initial"
                 whileInView="whileInView"
                 viewport={{ once: true }}
                 variants={fadeInUp}
                 className="space-y-8"
               >
                 <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-sage-900 tracking-tight leading-tight">Digital Repository of <span className="text-terracotta-500">Ancient Scripts</span>.</h2>
                    <p className="text-sage-600 text-lg font-medium leading-relaxed">We maintain a curated collection of rare books, authentic translations, and commentary that were previously inaccessible to the modern seeker.</p>
                 </div>
                 <div className="grid grid-cols-1 gap-6">
                    <div className="flex items-start gap-6 p-8 bg-white rounded-2xl border border-sage-100 hover:border-terracotta-200 transition-all hover:shadow-xl hover:translate-y-[-4px] group">
                       <div className="w-12 h-12 bg-terracotta-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-terracotta-100 transition-colors">
                          <BookOpen className="w-6 h-6 text-terracotta-500" />
                       </div>
                       <div className="space-y-1">
                          <h4 className="text-xl font-bold text-sage-900">Research Manuscripts</h4>
                          <p className="text-sage-500 text-sm font-medium">Access over 500 hand-picked PDFs of traditional scriptures and guru-shishya parampara teachings.</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-6 p-8 bg-white rounded-2xl border border-sage-100 hover:border-terracotta-200 transition-all hover:shadow-xl hover:translate-y-[-4px] group">
                       <div className="w-12 h-12 bg-sage-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-sage-100 transition-colors">
                          <PenSquare className="w-6 h-6 text-sage-600" />
                       </div>
                       <div className="space-y-1">
                          <h4 className="text-xl font-bold text-sage-900">Teaching Guides</h4>
                          <p className="text-sage-500 text-sm font-medium">Simplified concepts of Pranayama, Yoga Philosophy, and Advaita Vedanta for everyday living.</p>
                       </div>
                    </div>
                 </div>
               </motion.div>

               <motion.div
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 1 }}
                 className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white"
               >
                  <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop" alt="Meditation Practice" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-sage-900/10"></div>
               </motion.div>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
}
