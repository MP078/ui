import React from 'react';
import { MapPin, Users, Calendar } from 'lucide-react';
import { UserGuide } from '../../types/user';

interface UserGuidesProps {
  guides: UserGuide[];
  isLoading?: boolean;
  error?: string;
}

export function UserGuides({ guides, isLoading, error }: UserGuidesProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-600">
        <p>Error loading guides: {error}</p>
      </div>
    );
  }

  if (guides.length === 0) {
    return (
      <div className="bg-white rounded-lg p-8 text-center">
        <p className="text-gray-500">No guides to display</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      {guides.map((guide) => (
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