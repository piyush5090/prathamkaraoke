"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import tracksData from '@/data/tracks.json';
import categoriesData from '@/data/categories.json';
import TrackCard from '@/components/TrackCard';
import config from '@/data/config.json';
import Link from 'next/link';
import { HelpCircle, Disc, ChevronDown, ListMusic, Music4, MessageSquare, Sliders } from 'lucide-react';

export default function CategoryPage() {
  const { id } = useParams();
  const [visibleCount, setVisibleCount] = useState(12); // Multiples of 3 or 4 for perfect grids
  const [mounted, setMounted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

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

  const loadMore = () => setVisibleCount(prev => prev + 12);

  if (!mounted) return <div className="min-h-screen bg-[#0B0F17]"></div>;
  if (!categoryInfo) return <div className="p-20 text-center text-slate-400 font-bold bg-[#0B0F17] h-screen">Console Archive Error: Category not found.</div>;

  return (
    <div className="bg-[#0B0F17] min-h-screen text-white font-sans tracking-tight relative overflow-hidden pb-24">
      
      {/* Background Ambience Layers */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none"></div>

      {/* 1. Cinematic Wide Banner Area (Split Layout) */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-slate-800/60 relative z-10">
        
        {/* Left Elements: Text Parameters */}
        <div className="lg:col-span-7 space-y-6 animate-[fadeIn_0.6s_ease-out]">
          <div className="flex items-center gap-2.5">
            <div className="bg-blue-600/10 border border-blue-500/20 px-3 py-1 rounded-lg text-blue-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
              <Disc size={12} className="animate-spin" /> Studio Playlist Hub
            </div>
          </div>
          
          <h1 className="text-4xl md:text-[4.5rem] font-[950] text-white leading-none tracking-[-0.04em]">
            {categoryInfo.name}
          </h1>

          {/* Deep Description Space */}
          <div className="space-y-4 pt-2">
            <p className="text-base md:text-lg font-medium text-slate-300 leading-relaxed max-w-2xl border-l-2 border-blue-500 pl-4">
              {categoryInfo.pageDescriptionEng || categoryInfo.banner}
            </p>
            <p className="font-hindi text-lg md:text-xl font-bold text-slate-400 leading-normal max-w-2xl bg-slate-900/40 p-4 rounded-xl border border-slate-800/40 shadow-inner">
              {categoryInfo.pageDescriptionHindi || categoryInfo.bannerHindi}
            </p>
          </div>
        </div>

        {/* Right Elements: Ultra-Clean Full Showcase Picture Container */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end animate-[slideUp_0.8s_ease-out]">
          <div className="relative w-full max-w-[380px] aspect-square rounded-[2.5rem] bg-[#161D2B] border border-slate-800 shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden group">
            <Image 
              src={categoryInfo.image || "/categories/default.jpeg"}
              alt={`${categoryInfo.name} Banner visual`}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* 2. Tracks Playlist Execution Grid Section */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 relative z-10">
        <div className="flex items-center gap-3 mb-10">
          <ListMusic size={22} className="text-blue-500" />
          <h2 className="text-xl md:text-2xl font-[950] text-white tracking-tight uppercase">
            Available Backing Tracks ({filteredTracks.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredTracks.slice(0, visibleCount).map((track, idx) => (
            <div 
              key={track.id} 
              className="animate-[cardEnter_0.5s_ease-out_both]"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <TrackCard track={track} />
            </div>
          ))}
        </div>

        {/* High-Readability Load More Metric Button */}
        {visibleCount < filteredTracks.length && (
          <div className="text-center mt-16 flex flex-col items-center gap-3">
            <button 
              onClick={loadMore}
              className="bg-[#161D2B] border border-slate-800 text-white px-10 py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#1E293B] hover:border-slate-700 transition-all hover:scale-[1.02] active:scale-98 shadow-xl"
            >
              Show Next {nextLoadAmount} Tracks
            </button>
            <p className="text-[11px] font-bold text-slate-500 tracking-wide uppercase">
              Viewing {visibleCount} of {filteredTracks.length} Available Masters
            </p>
          </div>
        )}
      </div>

      {/* 3. Premium Approaching Section for Customized Tracks */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-28 relative z-10">
        <div className="w-full bg-gradient-to-br from-[#161D2B] to-[#121824] border border-slate-800/80 rounded-[2.5rem] p-8 md:p-12 lg:p-16 relative overflow-hidden group shadow-2xl">
          {/* Decorative Internal Glow Accent */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] group-hover:bg-blue-600/15 transition-colors duration-700"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Context Details Text Block */}
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 bg-[#0B0F17] border border-slate-800/60 px-3.5 py-1.5 rounded-xl">
                <Sliders className="text-blue-400" size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">On-Demand Audio Tailoring</span>
              </div>
              
              <h3 className="text-3xl md:text-5xl font-[950] text-white tracking-[-0.03em] leading-tight">
                Didn't find your specific track scale? <br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Let’s engineer it custom.</span>
              </h3>
              
              <div className="space-y-3 max-w-3xl text-sm md:text-base font-semibold text-slate-400 leading-relaxed">
                <p>
                  If your favorite Bhajan, Garba loop, or Bollywood song is missing from the catalog, don't worry. Our studio engineers will craft a premium customized backing track tailored perfectly to your preferred <span className="text-white font-bold">Vocal Pitch, Scale, Tempo, and Language settings.</span>
                </p>
                <p className="font-hindi text-base md:text-lg font-bold text-slate-500 leading-normal border-l-2 border-slate-800 pl-4">
                  क्या आपको अपने पसंदीदा भजन, गरबा या बॉलीवुड गाने का सही स्केल नहीं मिला? चिंता न करें! हमारे स्टूडियो इंजीनियर्स आपकी आवाज़ की पिच, टेम्पो और पसंद की भाषा के अनुसार विशेष कस्टमाइज़्ड कराओके ट्रैक तैयार कर देंगे।
                </p>
              </div>
            </div>

            {/* Functional Call To Action Buttons */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 w-full lg:w-auto lg:items-end justify-end">
              <Link 
                href="/customize" 
                className="w-full sm:w-auto lg:w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest text-center transition-all hover:scale-[1.03] shadow-lg shadow-blue-950/40 border border-blue-400/20 flex items-center justify-center gap-2"
              >
                <Music4 size={14} /> Request Custom Scale
              </Link>
              <a 
                href={`https://wa.me/${config.contact.whatsapp}`} 
                className="w-full sm:w-auto lg:w-full bg-[#0B0F17] border border-slate-800 hover:border-slate-700 text-slate-300 px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest text-center transition-all hover:scale-[1.03] flex items-center justify-center gap-2"
              >
                <MessageSquare size={14} /> Talk on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Executive Studio Accordion FAQs Block */}
      <div className="mt-28 border-t border-slate-800/60 pt-20 max-w-4xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center gap-3 mb-12 text-center">
          <div className="w-12 h-12 bg-[#161D2B] border border-slate-800 rounded-2xl flex items-center justify-center text-blue-400 shadow-md">
            <HelpCircle size={22} />
          </div>
          <h2 className="text-2xl md:text-4xl font-[950] text-white tracking-tight">Frequently Asked Questions</h2>
          <p className="text-sm font-semibold text-slate-500">Everything you need to know about our custom track delivery loops.</p>
        </div>

        <div className="space-y-4">
          {categoryInfo.faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index} 
                className="bg-[#161D2B] border border-slate-800/80 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full text-left p-6 flex justify-between items-center gap-4 group hover:bg-[#1E293B]/40 transition-colors"
                >
                  <h4 className="font-extrabold text-base text-white tracking-tight group-hover:text-blue-400 transition-colors">
                    {faq.q}
                  </h4>
                  <ChevronDown 
                    size={18} 
                    className={`text-slate-500 group-hover:text-white transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-blue-400' : ''}`} 
                  />
                </button>
                
                <div 
                  className={`transition-all duration-500 ease-in-out overflow-hidden border-slate-800/60 ${
                    isOpen ? 'max-h-40 border-t p-6 bg-[#0B0F17]/30' : 'max-h-0'
                  }`}
                >
                  <p className="text-sm font-medium text-slate-400 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Embedded High-Fidelity Custom Animation Injector Frame */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: scale(0.98) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes cardEnter {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </div>
  );
}