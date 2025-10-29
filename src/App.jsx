import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar.jsx';
import MovieCard from './components/MovieCard.jsx';
import VideoPlayer from './components/VideoPlayer.jsx';

function App() {
  // OMDb API configuration
  const OMDB_API_KEY = '8cf14f61';
  const OMDB_BASE_URL = 'https://www.omdbapi.com/';
  
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  
  // Movie trailers mapping (sample videos for different movies)
  const movieTrailers = {
    'The Dark Knight': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'Inception': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'Interstellar': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    'The Matrix': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    'Pulp Fiction': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    'The Shawshank Redemption': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    'Forrest Gump': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    'Fight Club': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    'Goodfellas': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    'The Godfather': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    'Avengers Endgame': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
    'Spider-Man': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4'
  };
  
  // useEffect to fetch popular movies on component mount
  useEffect(() => {
    const fetchPopularMovies = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const popularMovieTitles = [
          'The Dark Knight',
          'Inception',
          'Interstellar',
          'The Matrix',
          'Pulp Fiction',
          'The Shawshank Redemption',
          'Forrest Gump',
          'Fight Club',
          'Goodfellas',
          'The Godfather',
          'Avengers Endgame',
          'Spider-Man'
        ];
        
        const moviePromises = popularMovieTitles.map(title =>
          fetch(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(title)}`)
            .then(res => res.json())
        );
        
        const movieResults = await Promise.all(moviePromises);
        
        const formattedMovies = movieResults
          .filter(movie => movie.Response === 'True')
          .map(movie => ({
            id: movie.imdbID,
            title: movie.Title,
            poster: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450/374151/ffffff?text=No+Poster',
            rating: movie.imdbRating !== 'N/A' ? parseFloat(movie.imdbRating) : 0,
            year: movie.Year,
            genre: movie.Genre,
            description: movie.Plot,
            director: movie.Director,
            actors: movie.Actors,
            runtime: movie.Runtime,
            videoUrl: movieTrailers[movie.Title] || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          }));
        
        setMovies(formattedMovies);
        setFilteredMovies(formattedMovies);
        if (formattedMovies.length > 0) {
          setFeaturedMovie(formattedMovies[0]);
        }
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to load movies. Please try again later.');
        setIsLoading(false);
      }
    };
    
    fetchPopularMovies();
  }, []);
  
  // useEffect to search movies from OMDb API
  useEffect(() => {
    const searchMovies = async () => {
      if (searchQuery.trim() === '') {
        setFilteredMovies(movies);
        return;
      }
      
      setIsLoading(true);
      
      try {
        const response = await fetch(
          `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(searchQuery)}`
        );
        const data = await response.json();
        
        if (data.Response === 'True') {
          const detailPromises = data.Search.slice(0, 8).map(movie =>
            fetch(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&i=${movie.imdbID}`)
              .then(res => res.json())
          );
          
          const detailedResults = await Promise.all(detailPromises);
          
          const formattedResults = detailedResults
            .filter(movie => movie.Response === 'True')
            .map(movie => ({
              id: movie.imdbID,
              title: movie.Title,
              poster: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450/374151/ffffff?text=No+Poster',
              rating: movie.imdbRating !== 'N/A' ? parseFloat(movie.imdbRating) : 0,
              year: movie.Year,
              genre: movie.Genre,
              description: movie.Plot,
              director: movie.Director,
              actors: movie.Actors,
              runtime: movie.Runtime,
              videoUrl: movieTrailers[movie.Title] || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
            }));
          
          setFilteredMovies(formattedResults);
        } else {
          setFilteredMovies([]);
        }
        setIsLoading(false);
      } catch (err) {
        console.error('Error searching movies:', err);
        setFilteredMovies([]);
        setIsLoading(false);
      }
    };
    
    const timeoutId = setTimeout(() => {
      searchMovies();
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);
  
  const handleMovieClick = (movie) => {
    console.log('Movie clicked:', movie.title, 'Video URL:', movie.videoUrl);
    setSelectedMovie(movie);
  };

  const handleCloseVideo = () => {
    setSelectedMovie(null);
  };
  
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar 
        onSearch={handleSearch}
        searchQuery={searchQuery}
      />
      
      {selectedMovie ? (
        <div className="p-4">
          <VideoPlayer 
            videoUrl={selectedMovie.videoUrl}
            title={selectedMovie.title}
            description={selectedMovie.description}
            movie={selectedMovie}
            onClose={handleCloseVideo}
          />
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          {!searchQuery && featuredMovie && (
            <div className="mb-12 relative overflow-hidden rounded-lg">
              <div className="relative h-[500px] bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent">
                <img 
                  src={featuredMovie.poster} 
                  alt={featuredMovie.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-12 lg:px-16">
                  <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                    {featuredMovie.title}
                  </h1>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded font-semibold">
                      ⭐ {featuredMovie.rating}
                    </span>
                    <span className="text-gray-300">{featuredMovie.year}</span>
                    <span className="text-gray-300">{featuredMovie.runtime}</span>
                  </div>
                  <p className="text-gray-300 text-lg max-w-2xl mb-6">
                    {featuredMovie.description}
                  </p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => handleMovieClick(featuredMovie)}
                      className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                    >
                      ▶ Play Trailer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-300 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-white text-2xl animate-pulse">Loading movies...</div>
            </div>
          ) : (
            <>
              {searchQuery && (
                <div className="mb-6">
                  <p className="text-gray-300 text-lg">
                    Found {filteredMovies.length} result(s) for "{searchQuery}"
                  </p>
                </div>
              )}

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">
                  {searchQuery ? 'Search Results' : 'Featured Movies'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredMovies.length > 0 ? (
                    filteredMovies.map((movie) => (
                      <MovieCard 
                        key={movie.id}
                        movie={movie}
                        onMovieClick={handleMovieClick}
                      />
                    ))
                  ) : (
                    <div className="col-span-full text-center text-gray-400 text-xl py-12">
                      No movies found. Try a different search term.
                    </div>
                  )}
                </div>
              </section>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
