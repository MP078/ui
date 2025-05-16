import React, { useState } from 'react';
import { MapPin, Users } from 'lucide-react';
import { ConnectButton } from '../ui/connect-button';

export interface TravelerCardProps {
  traveler: {
    id: string;
    name: string;
    image: string;
    location: string;
    mutualConnections: number;
    interests: string[];
    isOnline: boolean;
    lastActive?: string;
    connectionStatus?: 'none' | 'requested' | 'connected';
  };
}

export const TravelerCard: React.FC<TravelerCardProps> = ({ traveler }) => {
  const [status, setStatus] = useState<'none' | 'requested' | 'connected'>(
    traveler.connectionStatus || 'none'
  );

  const handleConnect = (id: string) => {
    if (id === traveler.id) {
      setStatus('requested');
    }
  };

  const handleDisconnect = (id: string) => {
    if (id === traveler.id) {
      setStatus('none');
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="relative cursor-pointer">
          <img
            src={traveler.image}
            alt={traveler.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div
            className={`absolute bottom-0 right-0 w-4 h-4 border-2 border-white rounded-full ${
              traveler.isOnline ? 'bg-green-500' : 'bg-gray-400'
            }`}
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg cursor-pointer hover:text-brand-orange">
            {traveler.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{traveler.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <Users className="w-4 h-4" />
            <span>{traveler.mutualConnections} mutual connections</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {traveler.interests.map((interest, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
          >
            {interest}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {traveler.isOnline ? 'Online' : `Last seen ${traveler.lastActive}`}
        </span>
        <ConnectButton
          userId={traveler.id}
          userName={traveler.name}
          status={status}
          className={traveler.status === 'none' ? 'bg-orange-500 text-white hover:bg-orange-600' : ''}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
        />
      </div>
    </div>
  );
};