import React from 'react';

interface Activity {
  id: string;
  text: string;
  timestamp: string;
}

interface UserActivityProps {
  activities: Activity[];
  isLoading?: boolean;
  error?: string;
}

export function UserActivity({ activities, isLoading, error }: UserActivityProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6 animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-gray-200"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-600 mb-6">
        <p>Error loading activities: {error}</p>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <h3 className="font-semibold mb-4">Recent Activity</h3>
        <p className="text-gray-500 text-center py-2">No recent activity</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
      <h3 className="font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className="w-2 h-2 mt-2 rounded-full bg-brand-orange"></div>
            <div>
              <p className="text-sm">{activity.text}</p>
              <p className="text-xs text-gray-500">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}