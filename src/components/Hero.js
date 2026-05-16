"use client";
import { useState, useEffect } from 'react';
import config from '@/data/config.json';
import Link from 'next/link';
import { Play, MessageSquare, Disc3, Globe2 } from 'lucide-react';
import Image from 'next/image';

const Counter = ({ target, prefix = "", suffix = "+" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-[calc(100vh-68px)] bg-[#0B0F17]"></div>;

  return (
    <section className="relative min-h-[calc(100vh-68px)] w-full flex items-center bg-[#0B0F17] px-4 sm:px-6 md:px-12 py-12 lg:py-0 font-sans tracking-tight">
      {/* Background Studio Grids */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      <div className="absolute top-0 right-0 w-full lg:w-[50%] h-full bg-gradient-to-b lg:bg-gradient-to-l from-blue-600/10 via-transparent to-transparent pointer-events-none blur-3xl"></div>
      
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10">
        
        {/* Left Side: Professional Service Info Content Panel */}
        <div className="order-2 lg:order-1 lg:col-span-7 space-y-6 text-left">
          
          {/* Compact Tags */}
          <div className="inline-flex items-center gap-2 bg-[#161D2B] border border-slate-800/80 px-3 py-1.5 rounded-xl shadow-inner max-w-full">
            <Globe2 className="text-blue-400 shrink-0 animate-pulse" size={12} />
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-400 block truncate">
              Devotional & Regional Customization Available
            </span>
          </div>
          
          {/* Responsive Title Fitted Safely For Any Viewport Screen */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-[950] text-white leading-[1.1] tracking-[-0.04em]">
            Your Voice. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Our Studio Sound.</span>
          </h1>
          
          {/* Balanced Descriptions - English & Hindi */}
          <div className="max-w-xl space-y-4 text-slate-400 font-medium text-xs sm:text-sm md:text-base leading-relaxed">
            <p>
              Premium, studio-mastered personalized karaoke tracks with perfectly synced scrolling lyrics. We craft pristine backing tracks for <span className="text-white font-bold">Bollywood hits, high-energy Garba, soulful Shiv Bhajans</span>, and regional tracks across any custom scale or pitch.
            </p>
            <p className="font-hindi text-base sm:text-lg md:text-xl text-slate-200 font-bold leading-normal border-l-2 border-slate-400 pl-3">
              आपकी पसंद, भाषा और पिच के अनुसार बेहतरीन स्टूडियो-क्वालिटी कराओके। बॉलीवुड गानों, डांडिया-गरबा नाइट्स से लेकर शिव भजनों और भक्ति संगीत के स्पेशल ट्रैक्स आपके लिए कस्टमाइज़्ड।
            </p>
          </div>

          {/* Quick Actions Interactive Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link 
              href="/customize" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-xl shadow-blue-950/50 border border-blue-400/10 w-full sm:w-auto"
            >
              <Play size={14} fill="white" /> Start Singing
            </Link>
            <a 
              href={`https://wa.me/${config.contact.whatsapp}`} 
              className="bg-[#161D2B] border border-slate-800 hover:border-slate-700 text-slate-300 px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.02] flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <MessageSquare size={14} /> WhatsApp Inquiry
            </a>
          </div>

          {/* Fixed Non-Overflowing Counter Stats Grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-6 border-t border-slate-800/60 max-w-lg">
            <div>
              <p className="text-lg sm:text-xl md:text-2xl font-[950] text-white tracking-tight">
                <Counter target={1200} suffix="+" />
              </p>
              <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-500 mt-0.5">Tracks Collection</p>
            </div>
            <div>
              <p className="text-lg sm:text-xl md:text-2xl font-[950] text-white tracking-tight">
                <Counter target={4000} suffix="+" />
              </p>
              <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-500 mt-0.5">Karaoke Delivered</p>
            </div>
            <div>
              <p className="text-lg sm:text-xl md:text-2xl font-[950] text-green-400 tracking-tight">
                <Counter target={500} prefix="₹" suffix=" Only" />
              </p>
              <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-500 mt-0.5">Starting Price</p>
            </div>
          </div>
        </div>

        {/* Right Side: Proportioned Responsive Logo Box Slot */}
        <div className="order-1 lg:order-2 lg:col-span-5 relative w-full h-[25vh] sm:h-[35vh] lg:h-[50vh] flex items-center justify-center lg:justify-end group">
          {/* Glass depth glow background element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-blue-500/5 blur-[80px] lg:blur-[100px] rounded-full pointer-events-none"></div>

          {/* Local Logo Wrapper */}
          <div className="relative w-full h-full max-w-[280px] sm:max-w-[360px] lg:max-w-[450px] aspect-square transition-all duration-700 group-hover:scale-[1.02]">
            <Image 
              src="/logo.jpeg"
              alt="Pratham Karaoke Logo"
              fill
              sizes="(max-w-7xl) 100vw, 450px"
              className="object-contain rounded-2xl"
              priority={true}
            />
          </div>
        </div>

      </div>
    </section>
  );
}