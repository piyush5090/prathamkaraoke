"use client";
import config from '@/data/config.json';

export default function TrackCard({ track }) {
  // WhatsApp message build karein
  const wpMessage = encodeURIComponent(`Hi Pratham Karaoke, I am interested in: ${track.songName} (${track.categories[0]})`);
  const whatsappUrl = `https://wa.me/${config.contact.whatsapp.replace('+', '')}?text=${wpMessage}`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md border dark:border-gray-700 hover:shadow-xl transition-shadow">
      {/* YouTube Demo Player */}
      <div className="aspect-video w-full">
        <iframe
          src={track.youtubeUrl}
          title={track.songName}
          className="w-full h-full"
          allowFullScreen
        ></iframe>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg leading-tight line-clamp-1">{track.songName}</h3>
          <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
            {track.categories[0]}
          </span>
        </div>
        
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Singer: {track.singer}</p>
        
        <div className="flex items-center gap-2 mb-5">
          <span className="text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
            ✅ {track.deliveredCount}+ Delivered
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <a 
            href={whatsappUrl}
            target="_blank"
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg text-sm font-bold transition"
          >
            WhatsApp
          </a>
          <a 
            href={`tel:${config.contact.call}`}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-bold transition"
          >
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
}