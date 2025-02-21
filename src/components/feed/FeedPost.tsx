import React from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/button';

interface FeedPostProps {
  user: {
    name: string;
    image: string;
    location: string;
  };
  content: {
    text: string;
    images?: string[];
    timestamp: string;
  };
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
}

export function FeedPost({ user, content, engagement }: FeedPostProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <h3 className="font-medium text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.location} • {content.timestamp}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="w-5 h-5 text-gray-500" />
        </Button>
      </div>
      
      <p className="text-gray-800 mb-4">{content.text}</p>
      
      {content.images && content.images.length > 0 && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <img src={content.images[0]} alt="Post content" className="w-full h-64 object-cover" />
        </div>
      )}
      
      <div className="flex items-center justify-between pt-4 border-t">
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Heart className="w-5 h-5" />
          <span>{engagement.likes}</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <span>{engagement.comments}</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Share2 className="w-5 h-5" />
          <span>{engagement.shares}</span>
        </Button>
      </div>
    </div>
  );
}