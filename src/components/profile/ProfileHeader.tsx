import React from 'react';

interface ProfileStat {
  value: number;
  label: string;
}

const ProfileStats: ProfileStat[] = [
  { value: 45, label: 'Total Trips' },
  { value: 10, label: 'Total Guides' },
  { value: 100, label: 'Travel Days' },
  { value: 13, label: 'Places' },
  { value: 5000, label: 'Connections' },
];

export default function ProfileHeader() {
  return (
    <div className="relative">
      <div className="h-64 w-full">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute -bottom-16 left-8">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-white"
        />
      </div>
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button className="bg-orange-500 text-white px-4 py-2 rounded-full">Edit Profile</button>
        <button className="bg-white text-gray-800 px-4 py-2 rounded-full">Message</button>
      </div>
    </div>
  );
}