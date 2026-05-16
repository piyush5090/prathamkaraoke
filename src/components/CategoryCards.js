"use client";
import categoriesData from '@/data/categories.json';
import CategoryCard from './CategoryCard';

export default function CategoryCards() {
  return (
    <section className="py-20 px-6 md:px-12 bg-[#0B0F17] relative overflow-hidden font-sans tracking-tight">
      {/* Background Matrix Mesh Accent */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-slate-800/60 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-[1.5px] w-6 bg-blue-500"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Studio Archives</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-[950] text-white tracking-[-0.04em]">
              Browse By <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Genre.</span>
            </h2>
          </div>
          <p className="text-sm font-semibold text-slate-400 max-w-xs md:text-right leading-relaxed">
            Select your musical ecosystem and discover professionally engineered backing tracks.
          </p>
        </div>
        
        {/* Clean loop using the standalone component */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {categoriesData.categories.map((cat) => (
            <CategoryCard key={cat.id} cat={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}