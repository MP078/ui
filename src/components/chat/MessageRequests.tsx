import React from 'react';
import { User } from 'lucide-react';

interface MessageRequest {
  id: string;
  name: string;
  image: string;
  message: string;
  time: string;
  messages?: {
    id: string;
    content: string;
    timestamp: string;
    sender: {
      id: string;
      name: string;
      avatar: string;
    };
    isOwn: boolean;
    status: 'sent' | 'delivered' | 'read';
  }[];
}

interface MessageRequestsProps {
  onSelectChat?: (chatId: string) => void;
}

const messageRequests: MessageRequest[] = [
  {
    id: '4',
    name: 'John Doe',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    message: 'Hi! I saw your Everest Base Camp photos...',
    time: '2 hours ago',
    messages: [
      {
        id: '4-1',
        content: "Hi! I saw your Everest Base Camp photos and they're amazing! I'm planning to go there next month. Would you mind sharing some tips?",
        timestamp: '2 hours ago',
        sender: {
          id: '4',
          name: 'John Doe',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
        },
        isOwn: false,
        status: 'read'
      }
    ]
  },
  {
    id: '5',
    name: 'Sarah Wilson',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    message: 'Would love to join your next trek!',
    time: '1 day ago',
    messages: [
      {
        id: '5-1',
        content: "Hello! I noticed you're planning a trek to Annapurna next month. Would love to join your group if there's still space available!",
        timestamp: '1 day ago',
        sender: {
          id: '5',
          name: 'Sarah Wilson',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
        },
        isOwn: false,
        status: 'read'
      }
    ]
  },
  {
    id: '6',
    name: 'Emma Thompson',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    message: 'Hello! I noticed we\'re both planning trips to Bali next month...',
    time: '3 days ago',
    messages: [
      {
        id: '6-1',
        content: "Hello! I noticed we're both planning trips to Bali next month. Maybe we could meet up and explore some places together?",
        timestamp: '3 days ago',
        sender: {
          id: '6',
          name: 'Emma Thompson',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb'
        },
        isOwn: false,
        status: 'read'
      }
    ]
  },
  {
    id: '7',
    name: 'David Kim',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    message: 'Hey there! I\'m organizing a group trek to Annapurna, would you be interested?',
    time: '5 days ago',
    messages: [
      {
        id: '7-1',
        content: "Hey there! I'm organizing a group trek to Annapurna Circuit in October. Looking for experienced trekkers to join. Would you be interested?",
        timestamp: '5 days ago',
        sender: {
          id: '7',
          name: 'David Kim',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
        },
        isOwn: false,
        status: 'read'
      }
    ]
  }
];

export function MessageRequests({ onSelectChat }: MessageRequestsProps) {
  return (
    <div className="border-b border-gray-200">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Message Requests</h3>
          <span className="text-sm text-brand-orange">{messageRequests.length} new</span>
        </div>
        <div className="space-y-4">
          {messageRequests.map((request) => (
            <div 
              key={request.id} 
              className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
              onClick={() => onSelectChat && onSelectChat(request.id)}
            >
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
      </div>
    </div>
  );
}
