import React, { useState } from 'react';

interface ImageCarouselProps {
  imageUrls: string[];
}

export function ImageCarousel({ imageUrls }: ImageCarouselProps) {
  const [showAll, setShowAll] = useState(false);

  if (!imageUrls || imageUrls.length === 0) return null;

  const visibleImages = showAll ? imageUrls : imageUrls.slice(0, 3);
  const hasMore = imageUrls.length > 3;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {visibleImages.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Review image ${index + 1}`}
            className="w-full h-40 object-cover rounded-lg shadow-sm border border-gray-200"
          />
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-2">
          {!showAll ? (
            <button
              onClick={() => setShowAll(true)}
              className="px-4 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium shadow border border-gray-200 transition-all duration-150"
              style={{ fontSize: 15, letterSpacing: 0.2 }}
            >
              View all images ({imageUrls.length})
            </button>
          ) : (
            <button
              onClick={() => setShowAll(false)}
              className="px-4 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium shadow border border-gray-200 transition-all duration-150"
              style={{ fontSize: 15, letterSpacing: 0.2 }}
            >
              Show less
            </button>
          )}
        </div>
      )}
    </div>
  );
}
