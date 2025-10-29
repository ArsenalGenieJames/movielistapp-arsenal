import React from 'react';

const VideoPlayer = ({ videoUrl, title, description, onClose, movie }) => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="relative bg-black rounded-lg overflow-hidden shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-lg z-10 hover:bg-red-700 transition-colors"
        >
          ✖ Close
        </button>
        <iframe
          className="w-full h-[600px]"
          src={videoUrl}
          title={movie?.title || title}
          allowFullScreen
        ></iframe>
        <div className="p-6 text-white">
          <h2 className="text-3xl font-bold mb-2">{movie?.title || title}</h2>
          <p className="text-gray-300">{movie?.description || description}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
