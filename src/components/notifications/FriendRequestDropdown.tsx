import React from 'react';
import { Check, X, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FriendRequest {
  id: string;
  user: {
    name: string;
    image: string;
    location: string;
    mutualFriends: number;
    timestamp: string;
  };
}

interface FriendRequestDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const requests: FriendRequest[] = [
  {
    id: '1',
    user: {
      name: 'Alex Thompson',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
      location: 'London, UK',
      mutualFriends: 5,
      timestamp: '2 hours ago'
    }
  },
  {
    id: '2',
    user: {
      name: 'Sarah Wilson',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      location: 'Sydney, Australia',
      mutualFriends: 3,
      timestamp: '5 hours ago'
    }
  },
  {
    id: '3',
    user: {
      name: 'Mike Chen',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      location: 'Toronto, Canada',
      mutualFriends: 8,
      timestamp: '1 day ago'
    }
  }
];

export function FriendRequestDropdown({ isOpen, onClose }: FriendRequestDropdownProps) {
  if (!isOpen) return null;

  const handleAccept = (requestId: string) => {
    console.log('Accepting request:', requestId);
    // Add accept logic here
  };

  const handleReject = (requestId: string) => {
    console.log('Rejecting request:', requestId);
    // Add reject logic here
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Connection Requests</h3>
          <span className="text-sm text-brand-orange">{requests.length} new</span>
        </div>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {requests.map((request) => (
          <div
            key={request.id}
            className="p-4 border-b last:border-b-0 hover:bg-gray-50"
          >
            <div className="flex items-start gap-3">
              <img
                src={request.user.image}
                alt={request.user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{request.user.name}</h4>
                  <span className="text-xs text-gray-500">{request.user.timestamp}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{request.user.location}</p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {request.user.mutualFriends} mutual connections
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleAccept(request.id)}
                    className="flex-1 bg-brand-orange text-white px-3 py-1 rounded-full text-sm hover:bg-brand-orange/90 transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
                    className="flex-1 border border-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-50 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t text-center">
        <Link
          to="/connections/requests"
          className="text-sm text-brand-orange hover:text-brand-orange/90"
          onClick={onClose}
        >
          View All Requests
        </Link>
      </div>
    </div>
  );
}