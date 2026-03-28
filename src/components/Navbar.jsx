import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Pravachanam', path: '/pravachanam' },
    { name: 'Articles', path: '/articles' },
    { name: 'Books', path: '/books' },
    { name: 'Gallery', path: '/gallery' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#fff8f1] backdrop-blur-md shadow-sm h-20">
      <div className="flex justify-between items-center px-8 h-full max-w-7xl mx-auto">
        <Link to="/" className="font-headline text-2xl font-bold text-[#164491] tracking-tight">
          Editorial Spiritual Excellence
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-headline text-lg tracking-tight transition-colors duration-300 ${
                isActive(link.path)
                  ? 'text-[#164491] border-b-2 border-[#164491] pb-1 font-bold'
                  : 'text-slate-600 font-medium hover:text-[#164491]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center bg-surface-container px-4 py-2 rounded-full">
            <Search className="text-outline w-4 h-4" />
            <input
              className="bg-transparent border-none focus:ring-0 text-sm w-40 placeholder:text-outline ml-2"
              placeholder="Search archive..."
              type="text"
            />
          </div>
          {user ? (
            <div className="flex items-center gap-4">
              {isAdmin && (
                <Link to="/admin" className="text-[#164491] font-semibold text-sm hover:underline">
                  Admin
                </Link>
              )}
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white overflow-hidden">
                {user.user_metadata?.avatar_url ? (
                  <img src={user.user_metadata.avatar_url} alt="avatar" />
                ) : (
                  <User className="w-5 h-5" />
                )}
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-primary text-on-primary px-6 py-2 rounded-md font-semibold hover:opacity-90 transition-all active:scale-95 duration-150"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
