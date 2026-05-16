"use client";
import { useState, useEffect } from 'react';
import config from '@/data/config.json';
import { Sliders, Music4, MessageSquare, Link2, Sparkles, CheckCircle2 } from 'lucide-react';

export default function CustomizePage() {
  const [mounted, setMounted] = useState(false);
  const [trackUrl, setTrackUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSendToWhatsApp = (e) => {
    e.preventDefault();
    setError('');

    if (!trackUrl.trim()) {
      setError('Please paste a link first / कृपया पहले लिंक पेस्ट करें।');
      return;
    }

    const baseMessage = `Hello Pratham Karaoke Studio, I want to order a customized karaoke track. Here are my reference details:\n\n🔗 Track/Reference Link: ${trackUrl.trim()}\n\nPlease guide me with the pitch verification, scaling metrics, and pricing. Thanks!`;
    const encodedMessage = encodeURIComponent(baseMessage);
    
    window.open(`https://wa.me/${config.contact.whatsapp}?text=${encodedMessage}`, '_blank');
  };

  if (!mounted) return <div className="h-[calc(100vh-68px)] w-full bg-[#070A11]"></div>;

  return (
    <div className="h-auto lg:h-[calc(100vh-68px)] min-h-[500px] w-full flex items-center text-white font-sans tracking-normal relative overflow-hidden py-8 lg:py-0 px-4 sm:px-6 md:px-12 bg-gradient-to-r from-[#070A11] via-[#1A2332] to-[#1A2332]">
      
      {/* Carbon Fiber Background Grid Overlay */}
      <div className="absolute inset-0 right-[40%] opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay"></div>
      
      {/* Decorative Radial Backdrop Lights */}
      <div className="absolute left-[-10%] top-[-10%] w-[35%] h-[45%] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* LEFT SIDE: Tailored Content Panel (Rebalanced to 6 cols) */}
        <div className="order-2 lg:order-1 lg:col-span-6 space-y-4 text-left">
          
          {/* Micro Glassmorphic Badge Tag */}
          <div className="inline-flex items-center gap-1.5 bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            <Sliders className="text-blue-400 shrink-0 animate-pulse" size={12} />
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-300">
              Custom Engineering Board
            </span>
          </div>

          {/* Condensed Headline Block */}
          <div className="leading-none space-y-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
              Can’t find your track?
            </h1>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase text-[#738CB7]">
              We will craft it exclusively.
            </h1>
          </div>

          {/* Compact Dual Description Blocks */}
          <div className="space-y-3 text-slate-300 font-normal text-xs sm:text-sm leading-relaxed">
            <p>
              Whether it is a rare traditional <span className="text-white font-semibold">Religious Bhajan, energetic Garba loop, regional folk, old school retro classic, or a Bollywood chartbuster</span>—our sound designers will build it from scratch.
            </p>
            <p className="font-hindi text-xs sm:text-sm font-bold text-slate-100 leading-normal border-l border-slate-700/80 pl-3">
              चाहे कोई धार्मिक भजन हो, नवरात्रि स्पेशल गरबा ट्रैक, लोकगीत हो, या बॉलीवुड का कोई नया-पुराना गाना—अगर वह लिस्ट में नहीं है, तो हमारे इंजीनियर्स उसे आपके वोकल स्केल पर तैयार करेंगे।
            </p>
          </div>

          {/* Micro-Deck Propositions Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-700/40">
            <div className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-blue-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-white font-bold text-xs leading-none">Perfect Pitch Modification</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Male, Female or custom chorus pitch.</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-blue-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-white font-bold text-xs leading-none">Studio Mastering Grade</p>
                <p className="text-[10px] text-slate-400 mt-0.5">320kbps MP3 & pristine WAV masters.</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Expanded, Larger Submit Console Box (Increased to 6 cols) */}
        <div className="order-1 lg:order-2 lg:col-span-6 w-full flex justify-center lg:justify-end animate-[slideUp_0.8s_ease-out] mt-4 lg:mt-0">
          <div className="w-full max-w-[540px] bg-[#121926]/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group transition-all">
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-500/10 blur-[60px] rounded-full pointer-events-none mix-blend-screen"></div>

            <div className="space-y-5 relative z-10">
              <div className="flex items-center justify-between border-b border-slate-700/40 pb-4">
                <div>
                  <h2 className="text-base font-black text-white tracking-tight uppercase">Submit Reference</h2>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">YouTube / Drive / Audio URLs</p>
                </div>
                <div className="w-9 h-9 bg-[#070A11]/40 border border-white/5 rounded-xl flex items-center justify-center text-blue-400 shadow-inner">
                  <Music4 size={15} />
                </div>
              </div>

              {/* Form Input Module */}
              <form onSubmit={handleSendToWhatsApp} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Paste your link here to customize
                  </label>
                  <div className="relative flex items-center">
                    <Link2 className="absolute left-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={15} />
                    <input 
                      type="url"
                      required
                      placeholder="https://youtube.com/watch?v=... or any audio reference link"
                      value={trackUrl}
                      onChange={(e) => setTrackUrl(e.target.value)}
                      className="w-full bg-white rounded-xl border border-slate-200 focus:border-blue-500 py-3.5 pl-12 pr-4 text-sm font-semibold text-slate-800 placeholder:text-slate-400 outline-none focus:ring-4 focus:ring-blue-500/5 transition-all tracking-tight"
                    />
                  </div>
                  {error && (
                    <p className="text-red-400 text-[11px] font-bold pt-0.5">{error}</p>
                  )}
                </div>

                {/* Expanded Instructions Hint Box */}
                <div className="bg-[#070A11]/30 border border-white/5 p-4 rounded-xl space-y-2 shadow-inner">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                    <Sparkles size={12} className="text-yellow-500" />
                    <span>How it works / यह कैसे काम करता है:</span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">
                    Paste your link above. Clicking the action button below will package a clean reference metadata block and automatically launch WhatsApp to finalize your scales, tempo shifts, and custom delivery timelines directly with our studio panel.
                  </p>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 hover:brightness-110 active:scale-98"
                >
                  <MessageSquare size={14} fill="white" /> Send to WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>

      {/* Global CSS Embedded Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: scale(0.99) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}