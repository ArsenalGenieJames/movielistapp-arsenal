import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-red-600 to-red-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            🎬 Bossgen Movie App
          </h1>
          <p className="text-red-100 text-sm md:text-base">
            Discover and watch your favorite movies
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
