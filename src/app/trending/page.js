"use client";
import { useState, useEffect } from 'react';
import tracksData from '@/data/tracks.json';
import TrackCard from '@/components/TrackCard';
import { Flame, Disc3, Music4, Sparkles, Sliders, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function TrendingPage() {
  const [mounted, setMounted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10); 
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter only tracks matching "isTrending": true
  const trendingTracks = tracksData.filter(track => track.isTrending === true);

  // Dynamic pagination metrics calculation
  const remainingTracks = trendingTracks.length - visibleCount;
  const nextLoadAmount = remainingTracks > 10 ? 10 : remainingTracks;

  // Handles smooth loader timeout before revealing elements
  const loadMoreTracks = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 10);
      setIsLoadingMore(false);
    }, 600); // Snappy studio pagination loader effect
  };

  if (!mounted) return <div className="h-[calc(100vh-68px)] w-full bg-[#070A11]"></div>;

  return (
    <div className="min-h-[calc(100vh-68px)] text-white font-sans tracking-normal relative overflow-hidden pb-24 bg-gradient-to-r from-[#070A11] via-[#1A2332] to-[#1A2332]">
      
      {/* Carbon Fiber Background Grid Overlay */}
      <div className="absolute inset-0 right-[40%] opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay"></div>
      
      {/* Background Studio Ambience Core Glows */}
      <div className="absolute left-[-10%] top-[-10%] w-[35%] h-[45%] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* 1. Compact Header Section */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 pt-8 pb-8 border-b border-slate-700/40 relative z-10 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          
          <div className="space-y-4 animate-[fadeIn_0.6s_ease-out] lg:max-w-2xl">
            {/* Glassmorphic Badge Tag */}
            <div className="inline-flex items-center gap-1.5 bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.1)] mx-auto md:mx-0">
              <Flame size={12} className="text-orange-400 animate-bounce" /> 
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-300">Hot Mastering Charts</span>
            </div>
            
            {/* Condensed Headline Block */}
            <div className="leading-none space-y-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
                Trending
              </h1>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase text-[#738CB7]">
                Backing Tracks.
              </h1>
            </div>
            
            {/* Compact Description Copy */}
            <div className="space-y-2 text-slate-300 font-normal text-xs sm:text-sm leading-relaxed">
              <p>
                Explore the absolute most requested studio masters currently dominating live stages, kirtans, and festive grounds across the country.
              </p>
              <p className="font-hindi text-xs sm:text-sm font-bold text-slate-100 leading-normal border-l border-slate-700 pl-3">
                इस समय मंच, कीर्तन और उत्सवों में सबसे ज़्यादा गाए जाने वाले सुपरहिट स्टूडियो-मास्टर्ड कराओके ट्रैक्स की लाइव सूची।
              </p>
            </div>
          </div>

          {/* Quick Stats Metric Badge */}
          <div className="shrink-0 flex justify-center md:justify-end animate-[slideUp_0.7s_ease-out]">
            <div className="bg-[#121926]/40 backdrop-blur-md border border-white/5 p-4 rounded-2xl flex items-center gap-4 shadow-xl">
              <div className="w-10 h-10 bg-orange-500/10 border border-orange-400/20 rounded-xl flex items-center justify-center text-orange-400">
                <Disc3 className="animate-[spin_20s_linear_infinite]" size={20} />
              </div>
              <div className="text-left">
                <p className="text-xl font-black leading-none text-white">{trendingTracks.length}</p>
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500 mt-1.5">Tracks Live Now</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Main Grid Output Section */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 pt-10 relative z-10">
        {trendingTracks.length === 0 ? (
          <div className="text-center py-16 bg-[#121926]/20 backdrop-blur-md rounded-2xl border border-white/5">
            <Music4 className="text-slate-600 mx-auto mb-3" size={28} />
            <h3 className="text-sm font-bold text-slate-400">No tracks are currently marked as trending.</h3>
            <p className="text-xs text-slate-500 mt-0.5">Check back later or customize your preferred scale directly.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {trendingTracks.slice(0, visibleCount).map((track, idx) => (
                <div 
                  key={`${track.id}-${idx}`} 
                  className="animate-[cardEnter_0.5s_ease-out_both] bg-[#121926]/40 backdrop-blur-md border border-white/5 rounded-2xl p-1 shadow-xl hover:border-white/10 transition-all"
                  style={{ animationDelay: `${(idx % 10) * 0.04}s` }} 
                >
                  <TrackCard track={track} />
                </div>
              ))}
            </div>

            {/* Pagination Controls Wrapper */}
            {visibleCount < trendingTracks.length && (
              <div className="text-center mt-12 flex flex-col items-center gap-2">
                <button 
                  onClick={loadMoreTracks}
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
                  Viewing {visibleCount} of {trendingTracks.length} Total Trending Masters
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* 3. Bottom Conversion Interceptor Container */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 mt-16 relative z-10">
        <div className="w-full bg-[#121926]/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
          <div className="space-y-1.5 text-center md:text-left relative z-10">
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-[11px] font-bold text-slate-400">
              <Sparkles size={12} className="text-yellow-500" />
              <span>Looking for another viral hit? / क्या कोई दूसरा ट्रेंडिंग गाना चाहिए?</span>
            </div>
            <h4 className="text-lg md:text-xl font-extrabold text-white tracking-tight">
              Get any viral song mixed exactly to your vocal scale parameters.
            </h4>
          </div>

          <Link 
            href="/customize"
            className="w-full md:w-auto shrink-0 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-center transition-all shadow-md flex items-center justify-center gap-1.5 hover:brightness-110"
          >
            <Sliders size={12} /> Customize Now
          </Link>
        </div>
      </div>

      {/* Embedded High-Fidelity Performance Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: scale(0.99) translateY(12px); }
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