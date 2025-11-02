import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import VideoPlayer from './components/VideoPlayer';
import Footer from './components/Footer';
import './App.css';

function App() {
  const TMDB_API_KEY = '5311371d6c5f1bf83718e50f58f8f076';
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeTab, setActiveTab] = useState('movies');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when search or tab changes
    if (!searchQuery.trim()) {
      fetchTrendingContent(1);
      return;
    }
    const delayDebounce = setTimeout(() => {
      searchContent(searchQuery, 1);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery, activeTab]);

  const fetchTrendingContent = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      let endpoint = '';
      
      switch (activeTab) {
        case 'movies':
          endpoint = `/trending/movie/day?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`;
          break;
        case 'tv':
          endpoint = `/trending/tv/day?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`;
          break;
        case 'anime':
          endpoint = `/discover/tv?api_key=${TMDB_API_KEY}&with_genres=16&with_keywords=210024&language=en-US&page=${page}`;
          break;
        default:
          endpoint = `/trending/movie/day?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`;
      }
      
      const response = await fetch(`${TMDB_BASE_URL}${endpoint}`);
      if (!response.ok) throw new Error('Failed to fetch content');
      const data = await response.json();
      setMovies(data.results);
      setTotalPages(Math.min(data.total_pages, 500)); // TMDB limits to 500 pages
      setCurrentPage(page);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const searchContent = async (query, page = 1) => {
    try {
      setLoading(true);
      setError(null);
      let endpoint = '';
      
      switch (activeTab) {
        case 'movies':
          endpoint = `/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;
          break;
        case 'tv':
          endpoint = `/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;
          break;
        case 'anime':
          endpoint = `/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&with_genres=16&page=${page}`;
          break;
        default:
          endpoint = `/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;
      }
      
      const response = await fetch(`${TMDB_BASE_URL}${endpoint}`);
      if (!response.ok) throw new Error('Failed to search');
      const data = await response.json();
      setMovies(data.results);
      setTotalPages(Math.min(data.total_pages, 500)); // TMDB limits to 500 pages
      setCurrentPage(page);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      if (searchQuery.trim()) {
        searchContent(searchQuery, page);
      } else {
        fetchTrendingContent(page);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const maxVisiblePages = 10;
    let startPage, endPage;

    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const halfVisible = Math.floor(maxVisiblePages / 2);
      if (currentPage <= halfVisible) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage + halfVisible >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - halfVisible;
        endPage = currentPage + halfVisible;
      }
    }

    const pages = [];
    
    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 mx-1 rounded ${
          currentPage === 1
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-gray-800 text-white hover:bg-gray-700'
        }`}
      >
        ‹
      </button>
    );

    // First page
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-3 py-2 mx-1 rounded bg-gray-800 text-white hover:bg-gray-700"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis1" className="px-2 text-gray-500">...</span>);
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 mx-1 rounded ${
            currentPage === i
              ? 'bg-red-600 text-white'
              : 'bg-gray-800 text-white hover:bg-gray-700'
          }`}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis2" className="px-2 text-gray-500">...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-2 mx-1 rounded bg-gray-800 text-white hover:bg-gray-700"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 mx-1 rounded ${
          currentPage === totalPages
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-gray-800 text-white hover:bg-gray-700'
        }`}
      >
        ›
      </button>
    );

    return (
      <div className="flex justify-center items-center py-8">
        <div className="flex flex-wrap justify-center">
          {pages}
        </div>
      </div>
    );
  };

  const getTabTitle = () => {
    const titles = {
      movies: searchQuery ? `Movie Results for "${searchQuery}"` : 'Trending Movies',
      tv: searchQuery ? `TV Series Results for "${searchQuery}"` : 'Trending TV Series',
      anime: searchQuery ? `Anime Results for "${searchQuery}"` : 'Popular Anime'
    };
    return titles[activeTab];
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar onSearch={setSearchQuery} searchQuery={searchQuery} />
      {selectedMovie && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center overflow-y-auto">
          <VideoPlayer 
            movie={selectedMovie} 
            title={selectedMovie.title || selectedMovie.name} 
            description={selectedMovie.overview} 
            onClose={() => setSelectedMovie(null)}
            type={activeTab === 'movies' ? 'movie' : 'tv'}
            searchQuery={searchQuery}
            onSearch={setSearchQuery}
          />
        </div>
      )}
      <main className="flex-grow container mx-auto px-4">
        {/* Tab Navigation */}
        <div className="flex justify-center py-6">
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('movies')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'movies'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Movies
            </button>
            <button
              onClick={() => setActiveTab('tv')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'tv'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              TV Series
            </button>
            <button
              onClick={() => setActiveTab('anime')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'anime'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Anime
            </button>
          </div>
        </div>
        
        <div className="py-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {getTabTitle()}
          </h2>
        </div>
        
        {error && (
          <div className="text-center py-20">
            <p className="text-red-500 text-xl mb-4">⚠️ Error: {error}</p>
            <button onClick={() => fetchTrendingContent(1)} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg">Try Again</button>
          </div>
        )}
        {!error && <MovieList movies={movies.slice(0, 18)} onMovieClick={setSelectedMovie} loading={loading} />}
        
        {/* Pagination */}
        {!error && !loading && renderPagination()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
