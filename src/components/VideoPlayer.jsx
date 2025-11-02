import { useState } from 'react';
import Navbar from './Navbar';

const VideoPlayer = ({ videoUrl, title, description, onClose, movie, type = 'movie', season, episode, searchQuery, onSearch }) => {
  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);

  // Build embed URLs for different sources
  const buildEmbedSources = () => {
    if (!movie?.id) return [];
    
    return [
      type === 'tv' 
        ? `https://vidsrc.cc/v2/embed/tv/${movie.id}/${season}/${episode}?autoPlay=false`
        : `https://vidsrc.cc/v2/embed/movie/${movie.id}?autoPlay=false`,
      type === 'tv'
        ? `https://www.2embed.to/embed/tmdb/tv?id=${movie.id}&s=${season}&e=${episode}`
        : `https://www.2embed.to/embed/tmdb/movie?id=${movie.id}`,
      type === 'tv'
        ? `https://multiembed.mov/?video_id=${movie.id}&tmdb=1&s=${season}&e=${episode}`
        : `https://multiembed.mov/?video_id=${movie.id}&tmdb=1`
    ];
  };

  const embedSources = buildEmbedSources();
  const isVideoAvailable = embedSources.length > 0;

  const loadPlayer = (index) => {
    setCurrentSourceIndex(index);
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Navbar Component */}
      <Navbar onSearch={onSearch} searchQuery={searchQuery} onClose={onClose} />

      {/* Video Player Content */}
      <div className="flex-1 overflow-y-auto bg-gray-900">
        <div className="w-full max-w-7xl mx-auto p-4">
          <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
        
        {isVideoAvailable ? (
          <div>
            {/* Video Player */}
            <div className="relative bg-black">
              <iframe
                className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]"
                src={embedSources[currentSourceIndex]}
                title={`Watch ${movie?.title || movie?.name || title}`}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                scrolling="no"
              ></iframe>
            </div>
            
            {/* Server Selection Bar */}
            <div className="bg-gray-800 p-4 border-t border-gray-700">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-white text-sm sm:text-base font-semibold">
                  <span className="text-gray-400">Current Server:</span> Server {currentSourceIndex + 1}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <button 
                    onClick={() => loadPlayer(0)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentSourceIndex === 0 
                        ? 'bg-red-600 text-white shadow-lg scale-105' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Server 1
                  </button>
                  <button 
                    onClick={() => loadPlayer(1)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentSourceIndex === 1 
                        ? 'bg-red-600 text-white shadow-lg scale-105' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Server 2
                  </button>
                  <button 
                    onClick={() => loadPlayer(2)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentSourceIndex === 2 
                        ? 'bg-red-600 text-white shadow-lg scale-105' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Server 3
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-[500px] flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="text-center px-8 max-w-md">
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-red-500 opacity-20 blur-3xl rounded-full"></div>
                <svg className="w-32 h-32 mx-auto mb-4 text-red-600 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Video Not Available</h3>
              <p className="text-gray-300 text-lg mb-2">
                The {type === 'tv' ? 'episode' : 'movie'} content is currently unavailable.
              </p>
              <p className="text-gray-500 text-sm">
                Please check back later or search for other titles.
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Movie/Show Details */}
      <div className="mt-6 bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Poster */}
          {movie?.poster_path && (
            <div className="flex-shrink-0">
              <img 
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie?.title || movie?.name}
                className="w-32 h-48 object-cover rounded-lg shadow-md"
              />
            </div>
          )}
          
          {/* Info */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-3">
              {movie?.title || movie?.name || title}
              {type === 'tv' && season && episode && (
                <span className="text-xl text-gray-400 ml-2">
                  S{season}E{episode}
                </span>
              )}
            </h2>
            
            {/* Meta Info */}
            <div className="flex flex-wrap gap-3 mb-4">
              {movie?.release_date && (
                <span className="bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-300">
                  📅 {new Date(movie.release_date).getFullYear()}
                </span>
              )}
              {movie?.vote_average && (
                <span className="bg-yellow-600 px-3 py-1 rounded-full text-sm text-white font-semibold">
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>
              )}
              {movie?.runtime && (
                <span className="bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-300">
                  ⏱️ {movie.runtime} min
                </span>
              )}
            </div>
            
            {/* Overview */}
            <p className="text-gray-300 leading-relaxed">
              {movie?.overview || description || 'No description available.'}
            </p>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
