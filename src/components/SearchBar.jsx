import React from 'react';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="bg-gray-800 py-6 px-4 sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto">
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-gray-900 text-white px-6 py-4 pr-12 rounded-full border-2 border-gray-700 focus:outline-none focus:border-red-500 transition-colors text-lg"
          />
          <svg 
            className="absolute right-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
        {searchQuery && (
          <p className="text-center text-gray-400 mt-3 text-sm">
            Searching for: <span className="text-white font-semibold">{searchQuery}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
