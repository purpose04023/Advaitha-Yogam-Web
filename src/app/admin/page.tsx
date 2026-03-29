import { createClient } from '@/lib/supabase-server';
import AdminLayout from '@/layouts/admin/AdminLayout';
import { Upload, PenSquare, FolderOpen, Bot, TrendingUp, Calendar, BookOpen, Layers } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  // Mock stats for UI
  const stats = [
    { label: 'Books Published', value: 8, icon: BookOpen, color: 'text-blue-500' },
    { label: 'Teachings Written', value: 15, icon: PenSquare, color: 'text-green-500' },
    { label: 'Total Categories', value: 6, icon: Layers, color: 'text-orange-500' },
    { label: 'Latest Upload', value: 'Today', icon: Calendar, color: 'text-purple-500' },
  ];

  return (
    <AdminLayout userEmail={session?.user.email || 'Admin'}>
      <div className="p-12 max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gray-100">
          <div>
            <h1 className="text-4xl font-black text-[#2D5016] tracking-tight mb-2 flex items-center gap-3">
              <span className="w-1.5 h-12 bg-[#E8873A] rounded-full inline-block"></span>
              Namaste, Administrator
            </h1>
            <p className="text-gray-500 text-lg font-medium">Welcome back to the sanctuary of knowledge. What would you like to share today?</p>
          </div>
          <div className="bg-[#E8873A]/5 px-6 py-4 rounded-2xl border border-[#E8873A]/10 flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <TrendingUp className="w-6 h-6 text-[#E8873A]" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">Total View Count</p>
              <p className="text-2xl font-black text-[#2D5016]">1,284</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 group hover:border-[#E8873A]/20 transition-all hover:shadow-xl hover:scale-[1.02] relative overflow-hidden">
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-[#E8873A]/10 transition-colors mb-4">
                  <stat.icon className={`w-8 h-8 ${stat.color} group-hover:text-[#E8873A] transition-colors`} />
                </div>
                <p className="text-3xl font-black text-[#2D5016] mb-1">{stat.value}</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{stat.label}</p>
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <stat.icon className="w-24 h-24" />
              </div>
            </div>
          ))}
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          <Link href="/admin/upload" className="group">
            <div className="bg-[#2D5016] p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden h-full group-hover:scale-[1.01] transition-all">
              <div className="relative z-10 space-y-6">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Upload className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white mb-2 tracking-tight">Upload a Book</h3>
                  <p className="text-white/60 font-medium">Share your PDF books and manuscripts with the world. AI will help you with details.</p>
                </div>
                <div className="pt-4">
                  <span className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#2D5016] font-black rounded-2xl group-hover:bg-[#E8873A] group-hover:text-white transition-all shadow-xl">
                    Begin Upload <span className="text-lg">→</span>
                  </span>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
              <div className="absolute top-12 left-12 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
            </div>
          </Link>

          <Link href="/admin/write" className="group">
            <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 relative overflow-hidden h-full group-hover:scale-[1.01] transition-all">
              <div className="relative z-10 space-y-6">
                <div className="w-20 h-20 bg-[#E8873A]/10 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <PenSquare className="w-10 h-10 text-[#E8873A]" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-[#2D5016] mb-2 tracking-tight">Write a Teaching</h3>
                  <p className="text-gray-400 font-medium">Draft articles, concepts, or daily wisdom using our spiritual editor.</p>
                </div>
                <div className="pt-4">
                  <span className="inline-flex items-center gap-2 px-8 py-4 bg-[#2D5016] text-white font-black rounded-2xl group-hover:bg-[#E8873A] transition-all shadow-xl">
                    Start Writing <span className="text-lg">→</span>
                  </span>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#E8873A]/5 rounded-full blur-3xl"></div>
            </div>
          </Link>
        </div>

        {/* AI Callout Section */}
        <div className="bg-[#FDFBF7] p-10 rounded-[3rem] border border-[#E8873A]/10 flex flex-col md:flex-row items-center gap-10">
          <div className="w-24 h-24 bg-white rounded-[2rem] shadow-xl flex items-center justify-center flex-shrink-0 relative">
             <Bot className="w-12 h-12 text-[#E8873A]" />
             <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
          </div>
          <div className="flex-grow text-center md:text-left">
             <h4 className="text-2xl font-black text-[#2D5016] mb-2 tracking-tight">Your AI Assistant is Online</h4>
             <p className="text-gray-500 font-medium">Look at the sidebar on your right. I can help you generate titles, descriptions, and even suggest images as you work. Just ask me in plain English!</p>
          </div>
          <Link href="/admin/manage" className="flex items-center gap-3 font-bold text-[#E8873A] hover:underline uppercase tracking-widest text-sm flex-shrink-0">
             <FolderOpen className="w-5 h-5" /> Manage All Content
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
