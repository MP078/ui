import React from 'react';

interface Achievement {
  id: string;
  icon: string;
  name: string;
}

interface UserAchievementsProps {
  achievements: Achievement[];
  isLoading?: boolean;
  error?: string;
}

export function UserAchievements({ achievements, isLoading, error }: UserAchievementsProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-600">
        <p>Error loading achievements: {error}</p>
      </div>
    );
  }

  if (achievements.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="font-semibold mb-4">Travel Achievements</h3>
        <p className="text-gray-500 text-center py-2">No achievements yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="font-semibold mb-4">Travel Achievements</h3>
      <div className="grid grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-orange-100 rounded-full flex items-center justify-center">
              {achievement.icon}
            </div>
            <p className="text-xs">{achievement.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}