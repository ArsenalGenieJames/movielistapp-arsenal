import React, { useState } from 'react';

// Functional Component receiving props from parent
const MovieCard = ({ movie, onMovieClick }) => {
  // useState hook to manage hover state
  const [isHovered, setIsHovered] = useState(false);
  
  // Handler for clicking the movie card
  const handleCardClick = () => {
    if (onMovieClick) {
      onMovieClick(movie);
    }
  };
  
  return (
    <div 
      className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Movie Poster */}
      <div className="relative">
        <img 
          src={movie.poster} 
          alt={movie.title}
          className="w-full h-64 sm:h-80 object-cover"
        />
        
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-sm font-bold">
          ⭐ {movie.rating ? movie.rating.toFixed(1) : 'N/A'}
        </div>
        
        {/* Runtime Badge */}
        {movie.runtime && (
          <div className="absolute top-2 left-2 bg-gray-900 bg-opacity-75 text-white px-2 py-1 rounded text-xs font-medium">
            {movie.runtime}
          </div>
        )}
        
        {/* Play Button Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <button className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 transform transition-transform hover:scale-110">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>
      
      {/* Movie Info */}
      <div className="p-4">
        <h3 className="text-white font-bold text-lg mb-2 truncate" title={movie.title}>
          {movie.title}
        </h3>
        <div className="flex items-center justify-between text-gray-400 text-sm mb-2">
          <span>{movie.year}</span>
          <span className="bg-gray-700 px-2 py-1 rounded text-xs truncate max-w-[120px]" title={movie.genre}>
            {movie.genre ? movie.genre.split(',')[0] : 'Unknown'}
          </span>
        </div>
        
        {/* Actors/Cast */}
        {movie.actors && (
          <p className="text-gray-500 text-xs mb-1 truncate">
            Cast: {movie.actors}
          </p>
        )}
        
        {/* Description */}
        <p className="text-gray-300 text-sm line-clamp-2" title={movie.description}>
          {movie.description}
        </p>
        
        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-4">
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full">
            Watch Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;