// src/utils/trackHelper.js
import tracksData from '@/data/tracks.json';

export const getTracksByCategory = (categoryName, limit = 10, offset = 0) => {
  // Case-insensitive filtering for multi-category support
  const filtered = tracksData.filter(track => 
    track.categories.some(cat => cat.toLowerCase() === categoryName.toLowerCase())
  );
  
  return {
    tracks: filtered.slice(0, offset + limit),
    total: filtered.length,
    hasMore: offset + limit < filtered.length
  };
};