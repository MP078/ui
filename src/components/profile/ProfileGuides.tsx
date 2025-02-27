import React from 'react';
import { MapPin, Users, Calendar } from 'lucide-react';

const guides = [
  {
    id: 1,
    title: "Ultimate Everest Base Camp Guide",
    description: "A comprehensive guide to preparing and completing the EBC trek",
    location: "Everest Region",
    duration: "14 days",
    groupSize: "8-12 people",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
    downloads: 1200
  },
  {
    id: 2,
    title: "Annapurna Circuit Adventure",
    description: "Complete guide to trekking the Annapurna Circuit",
    location: "Annapurna Region",
    duration: "12-15 days",
    groupSize: "6-10 people",
    image: "https://images.unsplash.com/photo-1585938389612-a552a28d6914",
    downloads: 850
  }
];

export default function ProfileGuides() {
  return (
    <div className="grid grid-cols-2 gap-6">
      {guides.map(guide => (
        <div key={guide.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
          <img
            src={guide.image}
            alt={guide.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="font-medium text-lg">{guide.title}</h3>
            <p className="text-gray-600 mt-2">{guide.description}</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{guide.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{guide.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-4 h-4" />
                <span>{guide.groupSize}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gray-500">{guide.downloads} downloads</span>
              <button className="bg-brand-orange text-white px-4 py-2 rounded-full text-sm">
                Download Guide
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}