"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Music, Disc, Heart, Flame, Radio, Sparkles, Layers, Sliders, PlayCircle } from 'lucide-react';

const getCategoryIcon = (iconName) => {
  const iconProps = { className: "transition-transform duration-700", size: 20 };
  
  switch (iconName) {
    case "disc": return <Disc {...iconProps} className="text-blue-400 group-hover:rotate-[360deg]" />;
    case "flame": return <Flame {...iconProps} className="text-orange-400 animate-pulse" />;
    case "heart": return <Heart {...iconProps} className="text-red-400" />;
    case "sparkles": return <Sparkles {...iconProps} className="text-yellow-400" />;
    case "layers": return <Layers {...iconProps} className="text-pink-400" />;
    case "radio": return <Radio {...iconProps} className="text-purple-400" />;
    case "music": return <Music {...iconProps} className="text-emerald-400" />;
    case "sliders": return <Sliders {...iconProps} className="text-indigo-400" />;
    case "play-circle": return <PlayCircle {...iconProps} className="text-cyan-400" />;
    default: return <Music {...iconProps} className="text-blue-400" />;
  }
};

export default function CategoryCard({ cat }) {
  const coverImage = cat.image || "/categories/default.jpeg";

  return (
    <Link 
      href={`/category/${cat.id}`}
      className="group flex flex-col bg-[#161D2B] rounded-[2.2rem] overflow-hidden border border-slate-800/80 shadow-[0_16px_50px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_25px_70px_rgba(59,130,246,0.18)] hover:border-slate-700/60 h-[490px]"
    >
      
      {/* Upper Block: Bigger, Clearer, High-Resolution Image View */}
      <div className="relative w-full h-56 bg-[#0B0F17] overflow-hidden shrink-0 border-b border-slate-800/40">
        <Image
          src={coverImage}
          alt={`${cat.name} Premium Visual`}
          fill
          sizes="(max-w-7xl) 33vw, 400px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Floating Executive Vector Icon Badge */}
        <div className="absolute top-5 left-5 z-20">
          <div className="w-11 h-11 bg-[#0B0F17]/90 backdrop-blur-md rounded-xl flex items-center justify-center border border-slate-800 shadow-2xl transition-colors duration-500 group-hover:bg-blue-600 group-hover:border-blue-400/30">
            <div className="group-hover:text-white transition-colors duration-500">
              {getCategoryIcon(cat.icon)}
            </div>
          </div>
        </div>
      </div>

      {/* Lower Block: Deep Content & Language Metadata Area */}
      <div className="p-6 flex flex-col justify-between flex-1 bg-[#161D2B]">
        
        {/* Content Description Stack */}
        <div className="space-y-4">
          <div>
            <h3 className="font-[950] text-xl md:text-2xl text-white tracking-tight group-hover:text-blue-400 transition-colors duration-300 line-clamp-1">
              {cat.name}
            </h3>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mt-1.5">
              Studio Mastering Grade
            </p>
          </div>
          
          {/* Enhanced Text Spacing for Dual Languages */}
          <div className="space-y-3 pt-2 border-t border-slate-800/50">
            <p className="text-sm font-semibold text-slate-400 leading-relaxed line-clamp-2">
              {cat.banner}
            </p>
            <p className="font-hindi text-base md:text-lg font-bold text-slate-200 leading-normal line-clamp-2 group-hover:text-slate-400 transition-colors">
              {cat.bannerHindi}
            </p>
          </div>
        </div>

        {/* Bottom Premium Action Tab */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800/30">
          <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 group-hover:text-white transition-colors">
            Explore Collection
          </span>
          <div className="w-9 h-9 rounded-xl bg-[#0B0F17] border border-slate-800 flex items-center justify-center text-sm text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-400/30 transition-all transform group-hover:translate-x-1">
            →
          </div>
        </div>

      </div>
    </Link>
  );
}