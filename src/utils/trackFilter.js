import tracks from '@/data/tracks.json';

export const getTracksByCategory = (categoryId, limit = 10, offset = 0) => {
  // Category match logic (case-insensitive)
  const filtered = tracks.filter(track => 
    track.categories.some(cat => cat.toLowerCase() === categoryId.toLowerCase())
  );
  
  return {
    data: filtered.slice(0, offset + limit),
    hasMore: filtered.length > offset + limit
  };
};

export const searchTracks = (query) => {
  const searchTerm = query.toLowerCase();
  return tracks.filter(track => 
    track.songName.toLowerCase().includes(searchTerm) || 
    track.singer.toLowerCase().includes(searchTerm)
  );
};