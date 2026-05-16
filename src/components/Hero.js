"use client";
import { useState, useEffect } from 'react';
import config from '@/data/config.json';
import Link from 'next/link';
import { Play, MessageSquare, Globe2 } from 'lucide-react';
import Image from 'next/image';

const Counter = ({ target, prefix = "", suffix = "+" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let animationFrameId;
    const startTime = performance.now();
    const duration = 1200; // Snappier countdown animation

    const updateCount = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      
      if (elapsedTime >= duration) {
        setCount(target);
      } else {
        const progress = elapsedTime / duration;
        setCount(Math.floor(progress * target));
        animationFrameId = requestAnimationFrame(updateCount);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[calc(100vh-68px)] w-full bg-[#0B0F19]"></div>;

  return (
    <section className="relative h-auto lg:h-[calc(100vh-68px)] min-h-[550px] w-full flex items-center overflow-hidden px-4 sm:px-6 md:px-12 py-8 lg:py-0 font-sans tracking-tight bg-gradient-to-r from-[#070A11] via-[#1A2332] to-[##1A2332]">
      {/* Carbon Fiber Background Grid Overlay */}
      <div className="absolute inset-0 right-[40%] opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay"></div>
      
      {/* Decorative Radial Backdrop Lights */}
      <div className="absolute left-[-10%] top-[-10%] w-[40%] h-[50%] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
        
        {/* Left Side: Tight Content Panel */}
        <div className="order-2 lg:order-1 lg:col-span-7 space-y-4 lg:max-w-2xl text-left">
          
          {/* Micro Glassmorphic Badge Tag */}
          <div className="inline-flex items-center gap-1.5 bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            <Globe2 className="text-blue-400 shrink-0 animate-pulse" size={12} />
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-300 block truncate">
              Devotional & Regional Customization Available
            </span>
          </div>
          
          {/* Condensed Headline Block */}
          <div className="leading-none space-y-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase">
              Your Voice.
            </h1>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase text-[#738CB7]">
              Our Studio Sound.
            </h1>
          </div>
          
          {/* Compact Dual Description Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start pt-1">
            <p className="text-slate-400 font-medium text-xs leading-relaxed">
              Premium, studio-mastered personalized karaoke tracks with scrolling lyrics. We craft pristine backing tracks for <span className="text-white font-semibold">Bollywood, high-energy Garba, and soulful Shiv Bhajans</span> across custom scales.
            </p>
            <p className="text-slate-300 font-bold text-xs sm:text-sm leading-relaxed sm:border-l border-slate-700/80 sm:pl-4 font-hindi">
              आपकी पसंद, भाषा और पिच के अनुसार बेहतरीन स्टूडियो-क्वालिटी कराओके। बॉलीवुड गानों, डांडिया-गरबा से लेकर शिव भजनों संगीत के स्पेशल ट्रैक्स कस्टमाइज़्ड।
            </p>
          </div>

          {/* Clean Quick Action Elements */}
          <div className="flex flex-row items-center gap-3 pt-1">
            <Link 
              href="/customize" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5 shrink-0 hover:brightness-110"
            >
              <Play size={12} fill="white" /> Start Singing
            </Link>
            <a 
              href={`https://wa.me/${config.contact.whatsapp}`} 
              className="bg-transparent border border-slate-600 hover:border-slate-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shrink-0 hover:bg-white/5"
            >
              <MessageSquare size={12} /> WhatsApp
            </a>
          </div>

          {/* Micro-Deck Metrics Panel */}
          <div className="bg-[#121926]/40 backdrop-blur-md border border-white/5 rounded-xl p-3.5 shadow-xl max-w-md grid grid-cols-3 gap-2 mt-2">
            <div className="text-left pl-1">
              <p className="text-base sm:text-lg font-black text-white tracking-tight leading-none">
                <Counter target={1200} suffix="+" />
              </p>
              <p className="text-[8px] font-bold uppercase tracking-wider text-slate-500 mt-1">Tracks</p>
            </div>
            <div className="text-left border-x border-slate-800/60 px-3">
              <p className="text-base sm:text-lg font-black text-white tracking-tight leading-none">
                <Counter target={4000} suffix="+" />
              </p>
              <p className="text-[8px] font-bold uppercase tracking-wider text-slate-500 mt-1">Delivered</p>
            </div>
            <div className="text-left pl-2">
              <p className="text-base sm:text-lg font-black text-emerald-400 tracking-tight leading-none">
                <Counter target={500} prefix="₹" suffix="" />
              </p>
              <p className="text-[8px] font-bold uppercase tracking-wider text-slate-500 mt-1">From ₹500</p>
            </div>
          </div>
        </div>

        {/* Right Side: Showcase Glass Frame and Curved Overlay */}
        <div className="order-1 lg:order-2 lg:col-span-5 relative w-full h-[22vh] sm:h-[28vh] lg:h-[45vh] flex items-center justify-center lg:justify-end group mt-4 lg:mt-0">
          
          {/* Curved Background Separation Layer */}
          <div className="hidden lg:block absolute right-[-20%] inset-y-0 w-[140%] bg-[#EAECEF] rounded-l-[80px] transform translate-x-24 -z-10 shadow-xl"></div>
          
          {/* Soft Blue Radial Back-Glow Behind Logo */}
          <div className="absolute top-1/2 left-1/2 lg:left-3/4 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-blue-500/15 blur-[70px] rounded-full pointer-events-none mix-blend-screen"></div>

          {/* Multiple Layer Stacked Frame */}
          <div className="relative w-full h-full max-w-[200px] sm:max-w-[260px] lg:max-w-[340px] aspect-square transition-all duration-700 transform group-hover:scale-[1.01]">
            <div className="absolute inset-0 bg-slate-300/20 rounded-[24px] translate-y-2 translate-x-2 blur-xs -z-10"></div>
            
            <Image 
              src="/logo.jpeg"
              alt="Pratham Karaoke Logo"
              fill
              sizes="(max-w-7xl) 100vw, 340px"
              className="object-contain rounded-[24px] bg-[#F1F3F5] p-6 border border-white/80 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)]"
              priority={true}
            />
          </div>
        </div>

      </div>
    </section>
  );
}