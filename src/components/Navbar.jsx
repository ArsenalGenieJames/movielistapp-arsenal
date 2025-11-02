import React from 'react';

// Functional Component receiving props
const Navbar = ({ onSearch, searchQuery, onClose }) => {
  
  // Handler for search input changes
  const handleSearchChange = (e) => {
  if (onSearch) {
    onSearch(e.target.value);
  }
  };
  
  return (
  <nav className="bg-gray-900 text-white shadow-lg border-b border-gray-700">
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      {/* Logo - Left Side - Clickable */}
      <div className="flex-shrink-0">
      <h1 
        onClick={onClose}
        className="text-2xl font-bold text-red-500 cursor-pointer hover:text-red-400 transition-colors"
      >
        Bossgen
      </h1>
      </div>
      
      {/* Right Side - Search Bar */}
      <div className="flex items-center gap-4">
      {/* Search Bar */}
      <div className="relative hidden sm:block">
        <input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="bg-gray-800 text-white px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-48 md:w-64"
        />
        {/* Search Icon */}
        <svg 
        className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" 
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
      </div>
    </div>
    </div>
  </nav>
  );
};

export default Navbar;