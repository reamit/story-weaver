'use client';

import { useState } from 'react';

interface StoryDisplayProps {
  story: {
    title: string;
    pages: string[];
    imagePrompts: string[];
    images?: string[];
  };
  onNewStory: () => void;
}

export default function StoryDisplay({ story, onNewStory }: StoryDisplayProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    if (currentPage < story.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-purple-800">
        {story.title}
      </h2>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        {/* Story Image */}
        {story.images && story.images[currentPage] ? (
          <div className="mb-6 rounded-lg overflow-hidden shadow-md">
            <img 
              src={story.images[currentPage]} 
              alt={`Page ${currentPage + 1} illustration`}
              className="w-full h-auto"
            />
          </div>
        ) : (
          <div className="mb-6 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg p-8 text-center">
            <div className="text-6xl mb-2">🎨</div>
            <p className="text-sm text-gray-600 italic">
              Image: {story.imagePrompts[currentPage]}
            </p>
          </div>
        )}

        {/* Story text */}
        <p className="text-lg leading-relaxed text-gray-800 mb-6">
          {story.pages[currentPage]}
        </p>

        {/* Page number */}
        <p className="text-center text-sm text-gray-500">
          Page {currentPage + 1} of {story.pages.length}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          ← Previous
        </button>

        <button
          onClick={nextPage}
          disabled={currentPage === story.pages.length - 1}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Next →
        </button>
      </div>

      {/* New story button */}
      <div className="text-center">
        <button
          onClick={onNewStory}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Create New Story ✨
        </button>
      </div>
    </div>
  );
}