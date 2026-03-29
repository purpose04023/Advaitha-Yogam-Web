import { ReactNode } from 'react';
import AIAssistant from '@/components/admin/AIAssistant';
import { Home, Upload, PenSquare, FolderOpen, LogOut, Heart } from 'lucide-react';
import Link from 'next/link';

interface AdminLayoutProps {
  children: ReactNode;
  userEmail: string;
}

export default function AdminLayout({ children, userEmail }: AdminLayoutProps) {
  const NavItem = ({ href, icon: Icon, label }: { href: string, icon: any, label: string }) => (
    <Link
      href={href}
      className="flex items-center gap-4 px-6 py-4 text-[#2D5016] font-bold hover:bg-[#E8873A]/5 transition-all group border-l-4 border-transparent hover:border-[#E8873A]"
    >
      <Icon className="w-5 h-5 group-hover:text-[#E8873A] transition-colors" />
      <span className="text-sm uppercase tracking-widest">{label}</span>
    </Link>
  );

  return (
    <div className="flex h-screen bg-[#FDFBF7] overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-white border-r border-gray-100 flex flex-col shadow-sm relative z-20">
        <div className="p-8 border-b border-gray-50 bg-[#FDFBF7]">
          <h1 className="text-2xl font-bold text-[#2D5016] flex items-center gap-2">
            <div className="w-8 h-8 bg-[#E8873A] rounded-lg rotate-45 flex items-center justify-center">
              <span className="text-white -rotate-45">A</span>
            </div>
            Advaitha
          </h1>
          <p className="text-[10px] text-[#E8873A] font-bold uppercase tracking-widest mt-2">Admin Portal</p>
        </div>

        <nav className="flex-grow py-6 overflow-y-auto">
          <NavItem href="/admin" icon={Home} label="Dashboard" />
          <NavItem href="/admin/upload" icon={Upload} label="Upload Book" />
          <NavItem href="/admin/write" icon={PenSquare} label="Write Teaching" />
          <NavItem href="/admin/manage" icon={FolderOpen} label="Manage Content" />
        </nav>

        <div className="p-6 mt-auto bg-[#FDFBF7] border-t border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#2D5016]/10 rounded-full flex items-center justify-center font-bold text-[#2D5016]">
              {userEmail[0].toUpperCase()}
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-xs font-bold text-gray-800 truncate">{userEmail}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Administrator</p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#FDFBF7] text-red-500 font-bold rounded-xl border border-red-50 hover:bg-red-50 transition-all text-xs uppercase tracking-widest">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col relative overflow-hidden">
        <div className="flex-grow overflow-y-auto bg-gray-50/30">
          {children}
        </div>

        {/* Footer for Admin Portal */}
        <div className="p-6 bg-white border-t border-gray-100 text-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            Made with <Heart className="w-3 h-3 text-[#E8873A] fill-[#E8873A]" /> for our Guruji
          </p>
        </div>
      </main>

      {/* AI Assistant Sidebar */}
      <aside className="w-96 hidden xl:block shadow-2xl relative z-10">
        <AIAssistant />
      </aside>
    </div>
  );
}
