import React from 'react';
import { MapPin } from 'lucide-react';

interface ProfileData {
  name: string;
  verified: boolean;
  bio: string;
  languages: string[];
  memberSince: string;
  interests: string[];
  stats: Array<{
    value: number;
    label: string;
  }>;
}

const profileData: ProfileData = {
  name: 'Anne Frank',
  verified: true,
  bio: 'Adventure seeker | Photography Enthusiast | Mountain Lover',
  languages: ['French', 'English', 'Nepali'],
  memberSince: 'March 2023',
  interests: ['#Hiking', '#Photography', '#Culture', '#Adventure', '#Nature'],
  stats: [
    { value: 45, label: 'Total Trips' },
    { value: 10, label: 'Total Guides' },
    { value: 100, label: 'Travel Days' },
    { value: 13, label: 'Places' },
    { value: 5000, label: 'Connections' },
  ]
};

export default function ProfileInfo() {
  return (
    <div className="pt-20 px-8">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold">{profileData.name}</h1>
        {profileData.verified && <span className="text-blue-500">✓</span>}
      </div>
      <p className="text-gray-600 mt-1">{profileData.bio}</p>
      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
        <span>{profileData.languages.join(', ')}</span>
        <span>•</span>
        <span>Member since {profileData.memberSince}</span>
      </div>
      <div className="flex gap-2 mt-3">
        {profileData.interests.map(tag => (
          <span key={tag} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between mt-8">
        <div className="flex gap-16">
          {profileData.stats.map(stat => (
            <div key={stat.label} className="text-center">
              <div className="font-semibold text-xl">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}