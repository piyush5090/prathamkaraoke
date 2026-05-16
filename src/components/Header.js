"use client";
import { useState, useEffect, useRef } from 'react';
import config from '@/data/config.json';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Disc3, Menu, X, Sliders } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (mobileMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        if (!event.target.closest('button')) {
          setMobileMenuOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [mobileMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Trending', href: '/trending' },
    { label: 'Customize', href: '/customize' },
    { label: 'Categories', href: '/#categories', isAnchor: true },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
  ];

  // Custom click interceptor to run native smooth scrolling mechanics
  const handleNavigation = (e, link) => {
    if (link.isAnchor && pathname === '/') {
      e.preventDefault();
      setMobileMenuOpen(false);
      
      const targetElement = document.getElementById('categories');
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        // Update browser URL query string without causing a hard route refresh
        window.history.pushState(null, '', link.href);
      }
    }
  };

  return (
    <header className={`sticky top-0 z-[100] w-full transition-all duration-300 font-sans tracking-normal ${
      scrolled 
        ? 'py-2.5 bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/80' 
        : 'py-4 bg-slate-50'
    }`}>
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 z-[110]">
          <div className="w-7 h-7 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
            <Disc3 className="text-white animate-[spin_16s_linear_infinite]" size={14} />
          </div>
          <span className="text-sm font-extrabold tracking-[-0.03em] text-slate-900 uppercase whitespace-nowrap">
            {config.brandName}<span className="text-blue-600">.</span>
          </span>
        </Link>

        {/* Desktop Links Menu Layout */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href}
                href={link.href} 
                onClick={(e) => handleNavigation(e, link)}
                className={`text-sm font-normal transition-colors py-1 ${
                  isActive 
                    ? 'text-blue-600 font-medium' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Block */}
        <div className="flex items-center gap-2 shrink-0">
          {/* <Link 
            href="/customize" 
            className="hidden md:flex bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-[0.12em] items-center gap-1 hover:bg-slate-800 transition-all shadow-sm"
          >
            <Sliders size={11} /> Customize
          </Link> */}

          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 z-[110] active:bg-slate-100 transition-colors shadow-sm"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
          </button>
        </div>
      </div>

      {/* --- Mobile Offcanvas Drawers Panel --- */}
      <div 
        ref={menuRef}
        className={`fixed inset-y-0 right-0 w-64 bg-white border-l border-slate-200 shadow-xl z-[100] transition-transform duration-300 ease-in-out pt-24 px-6 md:hidden flex flex-col gap-6 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-1 border-b border-slate-100 pb-4">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-600">Navigation</p>
          <p className="text-xs font-bold text-slate-800">Studio Menu</p>
        </div>

        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href}
                href={link.href} 
                onClick={(e) => {
                  handleNavigation(e, link);
                  if (!link.isAnchor || pathname !== '/') setMobileMenuOpen(false);
                }}
                className={`text-sm font-bold py-2.5 border-b border-slate-50 flex justify-between items-center transition-colors ${
                  isActive 
                    ? 'text-blue-600 font-medium' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.label} <span className={`text-xs ${isActive ? 'text-blue-600' : 'text-slate-300'}`}>→</span>
              </Link>
            );
          })}
          
          <Link 
            href="/customize" 
            onClick={() => setMobileMenuOpen(false)}
            className="bg-slate-900 text-white px-4 py-3.5 rounded-xl text-xs font-black uppercase tracking-[0.12em] text-center flex items-center justify-center gap-2 mt-4 shadow-sm hover:bg-slate-800 transition-all"
          >
            <Sliders size={12} /> Customize Track
          </Link>
        </nav>
      </div>

      {/* Backdrop Screen Mask Blur Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-xs z-[90] md:hidden transition-opacity duration-300" 
          onClick={() => setMobileMenuOpen(false)} 
        />
      )}
    </header>
  );
}