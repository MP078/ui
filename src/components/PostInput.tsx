import React from 'react';
import { Image, MapPin, Calendar } from 'lucide-react';

export default function PostInput() {
  return (
    <div className="bg-white rounded-lg p-6 border">
      <div className="flex items-center gap-4">
        <img 
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <input
          type="text"
          placeholder="Share your travel experiences..."
          className="flex-1 bg-gray-100 rounded-full px-6 py-3 text-gray-600"
        />
      </div>
      <div className="flex items-center gap-6 mt-4 px-14">
        <button className="flex items-center gap-2 text-gray-600">
          <Image className="w-5 h-5" />
          <span>Photo/Video</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-5 h-5" />
          <span>Location</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-5 h-5" />
          <span>Travel Plan</span>
        </button>
        <button className="ml-auto bg-brand-orange text-white px-6 py-2 rounded-full">
          Post
        </button>
      </div>
    </div>
  );
}