import React from 'react';

const photos = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
    location: 'Everest Base Camp',
    likes: 245
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1582654454409-778f6619ddc6',
    location: 'Kathmandu Durbar Square',
    likes: 189
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1585938389612-a552a28d6914',
    location: 'Pokhara Lake',
    likes: 320
  }
];

export default function ProfilePhotos() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {photos.map(photo => (
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