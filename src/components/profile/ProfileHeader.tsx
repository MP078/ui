import React, { useState } from 'react';
import { EditProfileModal } from './EditProfileModal';

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
  const [showEditProfile, setShowEditProfile] = useState(false);

  const handleSaveProfile = (data: any) => {
    console.log('Saving profile data:', data);
    // Implement save logic here
  };

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
        <button
          onClick={() => setShowEditProfile(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors"
        >
          Edit Profile
        </button>
        <button className="bg-white text-gray-800 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors">
          Message
        </button>
      </div>

      <EditProfileModal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        onSave={handleSaveProfile}
      />
    </div>
  );
}