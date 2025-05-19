import React from 'react';
import { UserPhoto } from '../../types/user';

interface UserPhotosProps {
  photos: UserPhoto[];
  isLoading?: boolean;
  error?: string;
}

export function UserPhotos({ photos, isLoading, error }: UserPhotosProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-600">
        <p>Error loading photos: {error}</p>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="bg-white rounded-lg p-8 text-center">
        <p className="text-gray-500">No photos to display</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {photos.map((photo) => (
        <div key={photo.id} className="relative group">
          <img
            src={photo.url}
            alt={photo.location}
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
            <div className="text-white text-center">
              <p className="font-medium">{photo.location}</p>
              <p className="text-sm">{photo.likes} likes</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}