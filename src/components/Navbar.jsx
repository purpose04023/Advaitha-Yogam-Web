import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, Globe } from 'lucide-react';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../utils/i18n/LanguageContext';
import { languages } from '../utils/i18n/translations';

const Navbar = () => {
  const { user, isAdmin } = useAuth();
  const { language, changeLanguage, t } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('pravachanam'), path: '/pravachanam' },
    { name: t('articles'), path: '/articles' },
    { name: t('books'), path: '/books' },
    { name: t('gallery'), path: '/gallery' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#fff8f1]/90 backdrop-blur-md shadow-sm h-20">
      <div className="flex justify-between items-center px-8 h-full max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Advaitha Yogam" className="h-12 w-12 object-contain" />
          <span className="font-headline text-2xl font-bold text-[#164491] tracking-tight">
            Advaitha Yogam
          </span>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
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
          <div className="relative group">
            <button className="flex items-center gap-1 text-slate-600 hover:text-[#164491] font-medium transition-colors">
              <Globe className="w-5 h-5" />
              <span className="text-sm uppercase">{language}</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[60] py-2">
              <div className="grid grid-cols-1 max-h-[400px] overflow-y-auto">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`px-4 py-2 text-left text-sm hover:bg-slate-50 transition-colors ${
                      language === lang.code ? 'text-[#164491] font-bold bg-[#164491]/5' : 'text-slate-700'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center bg-white/50 border border-slate-200 px-4 py-2 rounded-full">
            <Search className="text-slate-400 w-4 h-4" />
            <input
              className="bg-transparent border-none focus:ring-0 text-sm w-32 placeholder:text-slate-400 ml-2"
              placeholder={t('search_placeholder')}
              type="text"
            />
          </div>
          {user ? (
            <div className="flex items-center gap-4">
              {isAdmin && (
                <Link to="/admin" className="text-[#164491] font-semibold text-sm hover:underline">
                  {t('admin')}
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
              className="bg-[#164491] text-white px-6 py-2 rounded-md font-semibold hover:opacity-90 transition-all active:scale-95 duration-150"
            >
              {t('login')}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
