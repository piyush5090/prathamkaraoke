"use client";
import { useState, useEffect, useRef } from 'react';
import config from '@/data/config.json';
import Link from 'next/link';
import { Search, Disc3, Menu, X, Sliders } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle outside clicks to close the drawer smoothly
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        mobileMenuOpen && 
        menuRef.current && 
        !menuRef.current.contains(event.target)
      ) {
        const target = event.target;
        if (!target.closest('button')) {
          setMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [mobileMenuOpen]);

  // Lock body scrolling when mobile side navigation drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <header className={`sticky top-0 z-[100] w-full transition-all duration-300 font-sans tracking-tight ${
      scrolled 
        ? 'py-2.5 bg-[#0B0F17]/95 backdrop-blur-md shadow-xl border-b border-slate-800/60' 
        : 'py-4 bg-[#0B0F17]'
    }`}>
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 z-[110]">
          <div className="w-7 h-7 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
            <Disc3 className="text-white animate-[spin_16s_linear_infinite]" size={14} />
          </div>
          <span className="text-xs sm:text-sm font-extrabold tracking-[-0.03em] text-white uppercase whitespace-nowrap">
            {config.brandName}<span className="text-blue-500">.</span>
          </span>
        </Link>

        {/* Central Search Input - Desktop Viewports (Hidden on Mobile) */}
        <div className="hidden md:flex flex-1 max-w-[340px] relative group items-center mx-4">
          <div className="absolute inset-0 bg-[#161D2B] rounded-xl border border-slate-800/80 transition-all group-within:bg-[#1E293B] group-within:border-blue-500/20"></div>
          <Search className="absolute left-4 text-slate-500" size={14} />
          <input 
            type="text" 
            placeholder="Search tracks, artists..." 
            className="relative z-10 w-full bg-transparent border-none py-1.5 px-11 focus:ring-0 outline-none text-xs font-semibold text-slate-200 placeholder:text-slate-500"
          />
        </div>

        {/* Action Elements Column Group */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Mobile Search Icon Trigger Button (Always visible on mobile right away) */}
          <button 
            type="button"
            onClick={() => {
              setMobileSearchOpen(!mobileSearchOpen);
              setMobileMenuOpen(false);
            }}
            className="md:hidden w-8 h-8 bg-[#161D2B] border border-slate-800/80 rounded-lg flex items-center justify-center text-slate-400 active:bg-slate-800 transition-colors"
            aria-label="Toggle Search"
          >
            <Search size={14} />
          </button>

          {/* Inline Link Options - Desktop Viewports (Hidden on Mobile) */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/trending" className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 hover:text-white transition-colors">
              Trending
            </Link>
            <Link href="/customize" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-[0.12em] border border-blue-400/10 flex items-center gap-1 hover:brightness-110 transition-all">
              <Sliders size={11} /> Customize
            </Link>
          </nav>

          {/* Hamburger Bar Icon Interface Toggle (Always visible on mobile right away) */}
          <button 
            type="button"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              setMobileSearchOpen(false);
            }}
            className="md:hidden w-8 h-8 bg-[#161D2B] border border-slate-800/80 rounded-lg flex items-center justify-center text-slate-400 z-[110] active:bg-slate-800 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
          </button>

        </div>
      </div>

      {/* --- Responsive Subcomponents Modules --- */}

      {/* Dropdown Mobile Search Shelf Layout */}
      {mobileSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0B0F17] border-b border-slate-800 px-4 py-3 md:hidden z-40 transition-all duration-200">
          <div className="relative flex items-center w-full">
            <div className="absolute inset-0 bg-[#161D2B] rounded-xl border border-slate-800"></div>
            <Search className="absolute left-4 text-slate-500" size={14} />
            <input 
              type="text" 
              autoFocus
              placeholder="Search tracks, genres..." 
              className="relative z-10 w-full bg-transparent border-none py-2.5 px-11 focus:ring-0 outline-none text-xs font-semibold text-slate-200 placeholder:text-slate-500"
            />
          </div>
        </div>
      )}

      {/* Right Lateral Offcanvas Navigation Drawer */}
      <div 
        ref={menuRef}
        className={`fixed inset-y-0 right-0 w-64 bg-[#0B0F17] border-l border-slate-800/80 shadow-2xl z-[100] transition-transform duration-300 ease-in-out pt-24 px-6 md:hidden flex flex-col gap-6 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-1 border-b border-slate-800 pb-4">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500">Navigation</p>
          <p className="text-xs font-bold text-slate-400">Studio Dashboard</p>
        </div>

        <nav className="flex flex-col gap-4">
          <Link 
            href="/trending" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs font-bold uppercase tracking-[0.12em] text-slate-300 hover:text-white py-2 border-b border-slate-900/60 flex justify-between items-center transition-colors"
          >
            Trending Tracks <span className="text-blue-500 text-sm">→</span>
          </Link>
          <Link 
            href="/customize" 
            onClick={() => setMobileMenuOpen(false)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3.5 rounded-xl text-xs font-black uppercase tracking-[0.12em] text-center flex items-center justify-center gap-2 mt-2 shadow-md hover:brightness-105 transition-all"
          >
            <Sliders size={12} /> Customize Track
          </Link>
        </nav>
      </div>

      {/* Backdrop Fog Screen Mask overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[90] md:hidden transition-opacity duration-300" 
          onClick={() => setMobileMenuOpen(false)} 
        />
      )}
    </header>
  );
}