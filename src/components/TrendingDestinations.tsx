import React from 'react';

interface DestinationProps {
  name: string;
  image: string;
  description: string;
}

const destinations: DestinationProps[] = [
  {
    name: 'Annapurna Circuit',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
    description: 'The Ultimate Himalayan Trek'
  },
  {
    name: 'Kathmandu Valley',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
    description: 'Ancient Temples & Culture'
  }
];

export default function TrendingDestinations() {
  return (
    <div className="bg-white rounded-lg p-4 mt-4">
      <h3 className="font-semibold mb-4">Trending Destinations</h3>
      {destinations.map(dest => (
        <div key={dest.name} className="mb-4">
          <img src={dest.image} alt={dest.name} className="w-full h-24 object-cover rounded-lg mb-2" />
          <h4 className="font-medium">{dest.name}</h4>
          <p className="text-sm text-gray-600">{dest.description}</p>
        </div>
      ))}
    </div>
  );
}