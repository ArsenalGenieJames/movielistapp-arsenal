import React from 'react';
import MovieCard from './MovieCard';
import { motion } from 'framer-motion';

const MovieList = ({ movies, onMovieClick, loading }) => {
  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
          <p className="text-white mt-4 text-lg">Loading movies...</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (!movies || movies.length === 0) {
    return (
      <motion.div 
        className="text-center py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <svg className="w-24 h-24 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        </svg>
        <p className="text-gray-400 text-xl font-semibold mb-2">No movies found 😢</p>
        <p className="text-gray-500">Try searching for something else</p>
      </motion.div>
    );
  }

  // Container variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <div className="py-8">
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {movies.map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onMovieClick={onMovieClick} 
          />
        ))}
      </motion.div>
    </div>
  );
};

export default MovieList;
