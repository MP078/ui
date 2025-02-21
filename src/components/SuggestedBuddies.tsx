import React from 'react';

interface BuddyProps {
  name: string;
  image: string;
  location: string;
}

const buddies: BuddyProps[] = [
  {
    name: 'Rachel Green',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    location: 'Boston, USA'
  },
  {
    name: 'Raj Bhandari',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    location: 'Mumbai, India'
  }
];

export default function SuggestedBuddies() {
  return (
    <div className="bg-white rounded-lg p-4 mt-4">
      <h3 className="font-semibold mb-4">Suggested Travel Buddies</h3>
      {buddies.map(buddy => (
        <div key={buddy.name} className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img src={buddy.image} alt={buddy.name} className="w-10 h-10 rounded-full" />
            <div>
              <div className="font-medium">{buddy.name}</div>
              <div className="text-sm text-gray-600">{buddy.location}</div>
            </div>
          </div>
          <button className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm">
            Connect
          </button>
        </div>
      ))}
    </div>
  );
}