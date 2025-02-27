import React from 'react';
import { User } from 'lucide-react';

interface MessageRequest {
  id: string;
  name: string;
  image: string;
  message: string;
  time: string;
}

const messageRequests: MessageRequest[] = [
  {
    id: '1',
    name: 'John Doe',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    message: 'Hi! I saw your Everest Base Camp photos...',
    time: '2 hours ago'
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    message: 'Would love to join your next trek!',
    time: '1 day ago'
  }
];

export function MessageRequests() {
  return (
    <div className="border-b border-gray-200">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Message Requests</h3>
          <span className="text-sm text-brand-orange">{messageRequests.length} new</span>
        </div>
        <div className="space-y-4">
          {messageRequests.map((request) => (
            <div key={request.id} className="flex items-start gap-3">
              <img
                src={request.image}
                alt={request.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{request.name}</span>
                  <span className="text-xs text-gray-500">{request.time}</span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-1">{request.message}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full text-center text-brand-orange text-sm mt-4">
          See all requests
        </button>
      </div>
    </div>
  );
}