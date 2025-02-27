import React from 'react';
import { UserProfile } from '../../types/user';
import { Button } from '../ui/button';
import { MessageCircle } from 'lucide-react';

interface UserProfileHeaderProps {
  user: UserProfile;
  onConnect: () => void;
  onMessage: () => void;
}

export function UserProfileHeader({ user, onConnect, onMessage }: UserProfileHeaderProps) {
  return (
    <div className="relative">
      <div className="h-64 w-full">
        <img
          src={user.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute -bottom-16 left-8">
        <div className="relative">
          <img
            src={user.image}
            alt={user.name}
            className="w-32 h-32 rounded-full border-4 border-white object-cover"
          />
          {user.isOnline !== undefined && (
            <div 
              className={`absolute bottom-3 right-3 w-5 h-5 border-2 border-white rounded-full ${
                user.isOnline ? 'bg-green-500' : 'bg-gray-400'
              }`}
            />
          )}
        </div>
      </div>
      <div className="absolute bottom-4 right-4 flex gap-2">
        <Button 
          onClick={onConnect}
          className="bg-brand-orange text-white hover:bg-brand-orange/90 transition-colors"
        >
          Connect
        </Button>
        <Button 
          onClick={onMessage}
          variant="outline"
          className="bg-white text-gray-800 hover:bg-gray-100 transition-colors"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Message
        </Button>
      </div>
    </div>
  );
}