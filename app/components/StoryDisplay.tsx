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

  // Map pages to images: 1:1 when possible, distribute evenly otherwise
  const getImageForPage = (pageIndex: number, totalPages: number, images: string[]) => {
    if (images.length === 0) return '';
    
    // If we have equal or more images than pages, use 1:1 mapping
    if (images.length >= totalPages) {
      return images[pageIndex] || images[0];
    }
    
    // Legacy support: If we have 3 images for 6 pages (from old stories)
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
      <h2 className="text-4xl font-serif font-bold text-center mb-8 text-purple-800 drop-shadow-lg">
        {story.title}
      </h2>

      <div className="card-elevated p-8 mb-6 animate-fadeIn">
        {/* Story Image - Show unique image per page when available */}
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
          <div className="mb-6 bg-gradient-to-br from-teal-50 to-rose-50 rounded-xl p-8 text-center border border-gray-100">
            <div className="text-6xl mb-2">🎨</div>
            <p className="text-sm text-gray-500 italic font-medium">
              Image: {story.imagePrompts[Math.min(currentPage, story.imagePrompts.length - 1)]}
            </p>
          </div>
        )}

        {/* Story text */}
        <p className="text-lg leading-relaxed text-gray-700 mb-6 font-serif">
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
          className="btn btn-secondary px-6 py-2"
        >
          ← Previous
        </button>

        <button
          onClick={nextPage}
          disabled={currentPage === story.pages.length - 1}
          className="btn btn-secondary px-6 py-2"
        >
          Next →
        </button>
      </div>

      {/* New story button */}
      <div className="text-center">
        <button
          onClick={onNewStory}
          className="btn btn-primary px-6 py-2 gradient-warm"
        >
          Create New Story ✨
        </button>
      </div>
    </div>
  );
}