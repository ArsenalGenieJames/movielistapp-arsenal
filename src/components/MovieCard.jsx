import { useState } from 'react';
import { motion } from 'framer-motion';

const MovieCard = ({ movie, onMovieClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const handleCardClick = () => {
    if (onMovieClick) {
      onMovieClick(movie);
    }
  };

  // Get poster URL
  const getPosterUrl = () => {
    if (!movie || !movie.poster_path || imageError) {
      return 'https://via.placeholder.com/500x750/1f2937/ffffff?text=No+Poster';
    }
    return `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  };

  // Get release year
  const getYear = () => {
    const date = movie.release_date || movie.first_air_date;
    return date ? date.split('-')[0] : 'N/A';
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  return (
    <motion.div 
      className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] overflow-hidden bg-gray-700">
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
            <div className="animate-pulse text-gray-500">Loading...</div>
          </div>
        )}

        <img 
          src={getPosterUrl()} 
          alt={movie.title || movie.name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
        
        {/* Year Badge */}
        <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          {getYear()}
        </div>

        {/* Hover Overlay */}
        {isHovered && (
          <motion.div 
            className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button 
              className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </div>
      
      {/* Movie Info */}
      <div className="p-4 bg-gray-800">
        <h3 className="text-white font-bold text-base mb-1 truncate" title={movie.title || movie.name}>
          {movie.title || movie.name}
        </h3>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
          <span>{movie.media_type === 'tv' ? 'TV Series' : 'Movie'}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;