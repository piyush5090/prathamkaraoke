"use client";
import categoriesData from '@/data/categories.json';
import CategoryCard from './CategoryCard';

export default function CategoryCards() {
  return (
    <section 
      id="categories" // Link anchor id matching header navigation updates
      className="relative py-20 px-4 sm:px-6 md:px-12 overflow-hidden font-sans tracking-normal bg-gradient-to-r from-[#070A11] via-[#1A2332] to-[#EAECEF]"
    >
      {/* Carbon Fiber Background Grid Overlay - Restricted to Left Side */}
      <div className="absolute inset-0 right-[40%] opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay"></div>
      
      {/* Decorative Blur Back-Light Accent */}
      <div className="absolute bottom-[-10%] left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-700/50 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-[1.5px] w-5 bg-blue-500"></span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Studio Archives</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">
              Browse By
            </h2>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-[#738CB7]">
              Genre.
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-medium text-black max-w-xs md:text-right leading-relaxed">
            Select your musical ecosystem and discover professionally engineered backing tracks.
          </p>
        </div>
        
        {/* Clean Responsive Grid Loop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoriesData.categories.map((cat) => (
            <div 
              key={cat.id}
              className="bg-[#121926]/40 backdrop-blur-md border border-white/5 rounded-2xl p-1 shadow-xl hover:border-white/10 transition-all duration-300 hover:scale-[1.01]"
            >
              <CategoryCard cat={cat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}