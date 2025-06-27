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
  
  // Debug logging on mount and when story changes
  console.log('=== STORY DISPLAY DEBUG ===');
  console.log('Story prop received:', story);
  console.log('Images in story:', {
    hasImages: !!story.images,
    imagesLength: story.images?.length || 0,
    imagesArray: story.images,
    imagePrompts: story.imagePrompts
  });
  
  if (story.images && story.images.length > 0) {
    story.images.forEach((img, index) => {
      console.log(`Story Display - Image ${index + 1}:`, {
        exists: !!img,
        type: typeof img,
        length: img?.length || 0,
        first50: img?.substring(0, 50) || 'null'
      });
    });
  }
  console.log('=== END STORY DISPLAY DEBUG ===');

  // Map 6 pages to 3 images: beginning (pages 0-1), middle (pages 2-3), end (pages 4-5)
  const getImageForPage = (pageIndex: number, totalPages: number, images: string[]) => {
    if (images.length === 0) return '';
    
    // If we have 3 images for 6 pages
    if (images.length === 3 && totalPages >= 6) {
      if (pageIndex <= 1) return images[0]; // Beginning
      if (pageIndex <= 3) return images[1]; // Middle
      return images[2]; // End
    }
    
    // Fallback: distribute images evenly
    const imageIndex = Math.floor((pageIndex / totalPages) * images.length);
    return images[Math.min(imageIndex, images.length - 1)];
  };

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
        {/* Story Image - Map pages to our 3 key images */}
        {(() => {
          const currentImage = story.images && story.images.length > 0 ? 
            getImageForPage(currentPage, story.pages.length, story.images) : null;
          
          console.log(`Rendering page ${currentPage + 1}, image:`, {
            hasCurrentImage: !!currentImage,
            currentImageLength: currentImage?.length || 0,
            currentImageFirst50: currentImage?.substring(0, 50) || 'null'
          });
          
          return null;
        })()}
        {story.images && story.images.length > 0 ? (
          <div className="mb-6 rounded-lg overflow-hidden shadow-md">
            <img 
              src={getImageForPage(currentPage, story.pages.length, story.images)} 
              alt={`Page ${currentPage + 1} illustration`}
              className="w-full h-auto"
            />
          </div>
        ) : (
          <div className="mb-6 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg p-8 text-center">
            <div className="text-6xl mb-2">🎨</div>
            <p className="text-sm text-gray-600 italic">
              Image: {story.imagePrompts[Math.min(currentPage, story.imagePrompts.length - 1)]}
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