import React, { useState } from 'react';
import { ConnectButton } from './ui/connect-button';

interface BuddyProps {
  id: number;
  name: string;
  image: string;
  location: string;
  connectionStatus: 'none' | 'requested' | 'connected';
}

const initialBuddies: BuddyProps[] = [
  {
    id: 1,
    name: 'Rachel Green',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    location: 'Boston, USA',
    connectionStatus: 'none'
  },
  {
    id: 2,
    name: 'Raj Bhandari',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    location: 'Mumbai, India',
    connectionStatus: 'none'
  },
];

export default function SuggestedBuddies() {
  const [buddies, setBuddies] = useState(initialBuddies);

  const handleConnect = (userId: string) => {
    setBuddies(prev => prev.map(buddy => 
      buddy.id.toString() === userId 
        ? { ...buddy, connectionStatus: 'requested' }
        : buddy
    ));
  };

  const handleDisconnect = (userId: string) => {
    setBuddies(prev => prev.map(buddy => 
      buddy.id.toString() === userId 
        ? { ...buddy, connectionStatus: 'none' }
        : buddy
    ));
  };

  return (
    <div className="bg-white rounded-lg p-4 mt-4">
      <h3 className="font-semibold mb-4">Suggested Travel Buddies</h3>
      {buddies.map((buddy) => (
        <div
          key={buddy.id}
          className="flex items-center justify-between mb-4"
        >
          <div className="flex items-center gap-3">
            <img
              src={buddy.image}
              alt={buddy.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="font-medium">{buddy.name}</div>
              <div className="text-sm text-gray-600">{buddy.location}</div>
            </div>
          </div>
          <ConnectButton
            userId={buddy.id.toString()}
            userName={buddy.name}
            status={buddy.connectionStatus}
            size="sm"
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
          />
        </div>
      ))}
    </div>
  );
}