import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">
            © {currentYear} Bossgen Movie App. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs">
            Powered by{' '}
            <a 
              href="https://www.themoviedb.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-400 transition-colors"
            >
              TMDb API
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
