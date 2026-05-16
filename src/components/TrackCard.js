"use client";
import config from '@/data/config.json';
import { Phone, MessageCircle } from 'lucide-react';

export default function TrackCard({ track }) {
  // Build dynamic WhatsApp text string
  const wpMessage = encodeURIComponent(`Hi Pratham Karaoke, I am interested in: ${track.songName} (${track.categories[0]})`);
  const whatsappUrl = `https://wa.me/${config.contact.whatsapp.replace('+', '')}?text=${wpMessage}`;

  return (
    <div className="w-full bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[24px] overflow-hidden shadow-xl transition-all duration-300 hover:border-white/20 hover:scale-[1.01] group flex flex-col h-full">
      
      {/* YouTube Embedded Video Display Player */}
      <div className="aspect-video w-full relative overflow-hidden bg-slate-950/40">
        <iframe
          src={track.youtubeUrl}
          title={track.songName}
          className="w-full h-full opacity-95 group-hover:opacity-100 transition-opacity"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      {/* Track Metric Information Panel */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Headline Title and Type Tag Layout */}
          <div className="flex justify-between items-start gap-3 mb-1.5">
            <h3 className="font-bold text-base text-white tracking-tight leading-tight line-clamp-1">
              {track.songName}
            </h3>
            <span className="bg-white/10 border border-white/10 text-slate-300 text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider whitespace-nowrap shrink-0">
              {track.categories[0]}
            </span>
          </div>
          
          {/* Singer Subtitle */}
          <p className="text-slate-400 text-xs font-medium tracking-normal mb-3">
            Singer: {track.singer}
          </p>
          
          {/* Social Proof Metric Badge */}
          <div className="flex items-center gap-2 mb-5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
              ✓ {track.deliveredCount}+ Delivered
            </span>
          </div>
        </div>

        {/* Action Button Controls Grid */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
          {/* WhatsApp Redirect Action */}
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:brightness-105"
          >
            <MessageCircle size={13} /> WhatsApp
          </a>

          {/* Native Phone Call Interface Trigger */}
          <a 
            href={`tel:${config.contact.call}`}
            className="flex items-center justify-center gap-1.5 bg-white/5 border border-white/10 hover:border-white/20 text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all hover:bg-white/10 shadow-sm"
          >
            <Phone size={12} /> Call Now
          </a>
        </div>
      </div>
    </div>
  );
}