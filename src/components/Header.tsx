'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, User, LogOut, ArrowRight, Zap, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedIn = localStorage.getItem('isLoggedIn');
      const email = localStorage.getItem('userEmail');

      if (loggedIn === 'true' && email) {
        setIsAuthenticated(true);
        setUserEmail(email);
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
    setUserEmail('');
    router.push('/');
  };

  const navigation = [
    { name: 'HOME', href: '/' },
    { name: 'UNIVERSITIES', href: '/universities' },
    { name: 'COURSES', href: '/courses' },
    { name: 'SERVICES', href: '/services' },
    { name: 'GALLERY', href: '/gallery' },
    { name: 'STUDY CENTER', href: '/blog' },
    { name: 'ABOUT', href: '/about' },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <header className={`fixed top-2.5 left-2.5 right-2.5 z-[100] rounded-[20px] shadow-[0_3px_10px_rgba(0,0,0,0.12)] transition-colors ${isScrolled || isMenuOpen ? 'bg-white' : 'bg-white/95'}`}>
      <div className="px-5 lg:px-8 xl:px-14">
        <div className="flex justify-between items-center h-[69px]">
          {/* Logo Cluster */}
          <Link href="/" className="flex items-center shrink-0">
            <img 
              src="/edbell-logo-indigo.png"
              alt="EdBell Edusolutions"
              className="h-[58px] w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = document.getElementById('logo-fallback-header');
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            {/* Fallback text - only shown if image fails */}
            <div id="logo-fallback-header" className="hidden items-center space-x-2 ml-1">
              <span className="text-2xl font-bold text-brand-700">EdBell</span>
              <span className="hidden sm:block text-sm text-brand-700">edusolutions</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-stretch h-[69px] shrink-0">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-2 xl:px-3 font-heading text-[14px] xl:text-[16px] font-semibold flex items-center transition-colors ${
                    isActive ? 'text-brand-700' : 'text-brand-900 hover:text-brand-700'
                  }`}
                >
                  <span className="lowercase first-letter:uppercase">{item.name}</span>
                  <span className={`hidden ${
                    isActive ? '' : ''
                  }`}></span>
                </Link>
              );
            })}
          </nav>

          {/* Action Cluster */}
          <div className="flex items-center gap-2 shrink-0">
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center space-x-2 sm:space-x-4">
                <Link
                  href="/admin"
                  className="flex items-center gap-2 px-4 py-2 rounded-[20px] bg-brand-700 font-heading text-[15px] font-semibold text-white hover:bg-brand-900"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden 2xl:inline">DASHBOARD</span>
                  <span className="2xl:hidden">ADMIN</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full text-brand-900 hover:bg-brand-50 flex items-center justify-center"
                >
                  <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2 sm:space-x-4">
                <Link
                  href="/login"
                  className="px-2 font-heading text-[14px] xl:text-[16px] font-semibold text-brand-900 hover:text-brand-700 flex items-center"
                >
                  LOGIN
                </Link>
                <Link
                  href="/contact"
                  className="px-4 xl:px-6 bg-brand-700 rounded-[20px] text-white font-heading text-[14px] xl:text-[15px] font-semibold hover:bg-brand-900 transition-colors flex items-center !min-h-[39px]"
                >
                  <div className="hidden"></div>
                  <span className="flex items-center whitespace-nowrap">
                    GET STARTED <ArrowRight className="ml-2 h-4 w-4 hidden xl:block" />
                  </span>
                </Link>
              </div>
            )}

            {/* Mobile Interface Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 text-brand-900 flex items-center justify-center"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dynamic Interface */}
        {isMenuOpen && (
          <div className="fixed -top-2.5 -left-2.5 w-[calc(100vw+10px)] z-[150] h-[100dvh]">
            <div className="absolute inset-0 bg-black/40" onClick={() => setIsMenuOpen(false)}></div>

            <div className="absolute top-0 right-0 w-full max-w-sm h-full bg-[#1E1286] flex flex-col p-6 gap-6 overflow-y-auto">
              <div className="flex justify-between items-center">
                <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center">
                  <img 
                    src="/edbell-logo-white.png"
                    alt="EdBell Edusolutions"
                    className="h-16 w-auto object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </Link>
                <button onClick={() => setIsMenuOpen(false)} className="p-2.5 text-white">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 flex flex-col">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="py-3 border-b border-white/30 font-heading text-lg font-semibold text-white hover:bg-[#0E0848] px-2"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="space-y-4">
                {isAuthenticated ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-white rounded-[15px]">
                      <div className="w-11 h-11 bg-brand-900 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                        {userEmail[0]}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm text-gray-600">Active Session</p>
                        <p className="text-sm font-bold text-gray-900 truncate">{userEmail}</p>
                      </div>
                    </div>
                    <Link
                      href="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full flex items-center justify-center py-3 bg-white rounded-[10px] text-brand-900 font-semibold"
                    >
                      Go to Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full py-3 bg-white text-red-700 rounded-[10px] font-semibold"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Link
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full flex items-center justify-center py-3 bg-white rounded-[10px] text-brand-900 font-semibold"
                    >
                      Auth Terminal
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full flex items-center justify-center py-3 bg-brand-900 rounded-[10px] text-white font-semibold"
                    >
                      GET STARTED
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
