"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import tracksData from '@/data/tracks.json';
import categoriesData from '@/data/categories.json';
import TrackCard from '@/components/TrackCard';
import config from '@/data/config.json';
import Link from 'next/link';
import { HelpCircle, Disc, ChevronDown, ListMusic, Music4, MessageSquare, Sliders, Loader2 } from 'lucide-react';

export default function CategoryPage() {
  const { id } = useParams();
  const [visibleCount, setVisibleCount] = useState(12); 
  const [mounted, setMounted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categoryInfo = categoriesData.categories.find(
    cat => cat.id.toLowerCase() === id.toLowerCase() || cat.name.toLowerCase() === id.toLowerCase()
  );

  const filteredTracks = tracksData.filter(track => 
    track.categories.some(c => c.toLowerCase() === id.toLowerCase() || c.toLowerCase() === categoryInfo?.name.toLowerCase())
  );

  const remainingTracks = filteredTracks.length - visibleCount;
  const nextLoadAmount = remainingTracks > 12 ? 12 : remainingTracks;

  // Handles smooth loader timeout before revealing elements
  const loadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 12);
      setIsLoadingMore(false);
    }, 600); // Quick 600ms studio loading transition look
  };

  if (!mounted) return <div className="min-h-screen bg-[#070A11]"></div>;
  if (!categoryInfo) return <div className="p-20 text-center text-slate-700 font-bold bg-slate-50 h-screen">Console Archive Error: Category not found.</div>;

  return (
    <div className="min-h-screen font-sans tracking-normal relative overflow-hidden pb-24 bg-gradient-to-r from-[#070A11] via-[#1A2332] to-[#1A2332]">
      
      {/* Carbon Fiber Background Grid Overlay - Balanced Density */}
      <div className="absolute inset-0 right-[40%] opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay"></div>
      
      {/* Radial Atmospheric Highlights */}
      <div className="absolute left-[-10%] top-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* 1. Cinematic Banner Area */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 pt-12 pb-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Elements: Titles & Multi-language Descriptions */}
        <div className="lg:col-span-7 space-y-6 animate-[fadeIn_0.6s_ease-out]">
          
          {/* Glassmorphic Badge Tag */}
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            <Disc size={13} className="text-blue-400 animate-[spin_12s_linear_infinite]" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
              Studio Playlist Hub
            </span>
          </div>
          
          {/* Headline Typography Matching the Image Style Guide */}
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase leading-none">
              {categoryInfo.name}
            </h1>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight uppercase text-[#738CB7]">
              Selected Collection
            </h2>
          </div>

          {/* Structured Text Descriptions Block */}
          <div className="space-y-4 pt-2">
            <p className="text-sm sm:text-base md:text-lg font-medium text-slate-300 leading-relaxed max-w-2xl border-l-2 border-[#738CB7] pl-4">
              {categoryInfo.pageDescriptionEng || categoryInfo.banner}
            </p>
            <p className="font-hindi text-base sm:text-lg md:text-xl font-bold text-slate-100 leading-normal max-w-2xl">
              {categoryInfo.pageDescriptionHindi || categoryInfo.bannerHindi}
            </p>
          </div>
        </div>

        {/* Right Elements: Stacked Frame Showcase Container */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end animate-[slideUp_0.8s_ease-out]">
          <div className="relative w-full max-w-[340px] md:max-w-[380px] aspect-square rounded-[32px] transition-all duration-700 transform hover:scale-[1.01] group">
            <div className="absolute inset-0 bg-slate-900/40 rounded-[32px] translate-y-3 translate-x-3 blur-xs -z-10"></div>
            
            <Image 
              src={categoryInfo.image || "/categories/default.jpeg"}
              alt={`${categoryInfo.name} Banner visual`}
              fill
              sizes="(max-w-7xl) 100vw, 380px"
              className="object-cover rounded-[32px] p-2 bg-[#F1F3F5]/10 border border-white/10 shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>

      {/* 2. Tracks Playlist Execution Grid Section */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 pt-16 relative z-10">
        <div className="flex items-center gap-3 mb-10 border-b border-slate-700/40 pb-4">
          <ListMusic size={20} className="text-blue-400" />
          <h2 className="text-lg md:text-xl font-black text-white tracking-tight uppercase">
            Available Backing Tracks ({filteredTracks.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredTracks.slice(0, visibleCount).map((track, idx) => (
            <div 
              key={track.id} 
              className="animate-[cardEnter_0.5s_ease-out_both] bg-[#121926]/40 backdrop-blur-md border border-white/5 rounded-2xl p-1 shadow-xl hover:border-white/10 transition-all"
              style={{ animationDelay: `${idx * 0.04}s` }}
            >
              <TrackCard track={track} />
            </div>
          ))}
        </div>

        {/* Dynamic Loader & Trigger Button Configuration */}
        {visibleCount < filteredTracks.length && (
          <div className="text-center mt-16 flex flex-col items-center gap-3">
            <button 
              onClick={loadMore}
              disabled={isLoadingMore}
              className="bg-transparent border border-slate-600 hover:border-slate-500 text-white min-w-[240px] h-12 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 hover:bg-white/5 shadow-md active:scale-98 disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed"
            >
              {isLoadingMore ? (
                <>
                  <Loader2 size={14} className="animate-spin text-blue-400" />
                  <span>Engineering...</span>
                </>
              ) : (
                <span>Show Next {nextLoadAmount} Tracks</span>
              )}
            </button>
            <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">
              Viewing {visibleCount} of {filteredTracks.length} Available Masters
            </p>
          </div>
        )}
      </div>

      {/* 3. On-Demand Custom Track Tailoring Container */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 mt-28 relative z-10">
        <div className="w-full bg-[#121926]/40 backdrop-blur-md border border-white/5 rounded-[32px] p-6 sm:p-10 lg:p-12 relative overflow-hidden group shadow-2xl">
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full shadow-inner">
                <Sliders className="text-blue-400" size={12} />
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-300">On-Demand Audio Tailoring</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight uppercase leading-none">
                Didn't find your scale? <br/>
                <span className="text-[#738CB7]">Let’s engineer it custom.</span>
              </h3>
              
              <div className="space-y-3 max-w-3xl text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
                <p>
                  If your favorite Bhajan, Garba loop, or Bollywood song is missing from the catalog, don't worry. Our studio engineers will craft a premium customized backing track tailored perfectly to your preferred <span className="text-white font-semibold">Vocal Pitch, Scale, Tempo, and Language settings.</span>
                </p>
                <p className="font-hindi text-sm sm:text-base font-bold text-slate-300 leading-normal border-l border-slate-700 pl-4">
                  क्या आपको अपने पसंदीदा भजन, गरबा या बॉलीवुड गाने का सही स्केल नहीं मिला? चिंता न करें! हमारे स्टूडियो इंजीनियर्स आपकी आवाज़ की पिच, टेम्पो और पसंद की भाषा के अनुसार विशेष कस्टमाइज़्ड कराओके ट्रैक तैयार कर देंगे।
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto lg:items-end justify-end">
              <Link 
                href="/customize" 
                className="w-full sm:w-auto lg:w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-center transition-all shadow-md flex items-center justify-center gap-2 hover:brightness-110"
              >
                <Music4 size={12} /> Request Custom Scale
              </Link>
              <a 
                href={`https://wa.me/${config.contact.whatsapp}`} 
                className="w-full sm:w-auto lg:w-full bg-transparent border border-slate-600 hover:border-slate-500 text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 hover:bg-white/5"
              >
                <MessageSquare size={12} /> Talk on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Glass Accordion FAQs Block */}
      <div className="mt-28 border-t border-slate-700/40 pt-20 max-w-4xl mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center gap-2 mb-12 text-center">
          <div className="w-10 h-10 bg-[#121926]/40 border border-white/5 rounded-xl flex items-center justify-center text-blue-400 shadow-md">
            <HelpCircle size={20} />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase">Frequently Asked Questions</h2>
          <p className="text-xs sm:text-sm font-medium text-slate-400">Everything you need to know about our custom track delivery loops.</p>
        </div>

        <div className="space-y-4">
          {categoryInfo.faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index} 
                className="bg-[#121926]/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full text-left p-5 flex justify-between items-center gap-4 group hover:bg-white/[0.02] transition-colors"
                >
                  <h4 className="font-bold text-sm sm:text-base text-white tracking-normal group-hover:text-blue-400 transition-colors">
                    {faq.q}
                  </h4>
                  <ChevronDown 
                    size={16} 
                    className={`text-slate-500 group-hover:text-white transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-blue-400' : ''}`} 
                  />
                </button>
                
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-40 border-t border-white/5 p-5 bg-[#070A11]/20' : 'max-h-0'
                  }`}
                >
                  <p className="text-xs sm:text-sm font-medium text-slate-400 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Embedded Next.js Scoping Styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: scale(0.99) translateY(16px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes cardEnter {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </div>
  );
}