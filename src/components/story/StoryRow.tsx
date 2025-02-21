import React from 'react';
import { ChevronRight } from 'lucide-react';
import { StoryCircle } from './StoryCircle';

const stories = [
  { id: 'add', name: 'Add Story', image: '', isAdd: true },
  { id: '1', name: 'Nancy_drew', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
  { id: '2', name: 'Joshua_98', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e' },
  { id: '3', name: 'Simone123', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb' },
  { id: '4', name: 'Christian_07', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde' }
];

export function StoryRow() {
  return (
    <div className="relative flex items-center gap-4 py-4">
      <div className="flex gap-4 overflow-x-auto no-scrollbar">
        {stories.map((story) => (
          <StoryCircle
            key={story.id}
            image={story.image}
            name={story.name}
            isAdd={story.isAdd}
          />
        ))}
      </div>
      <button className="absolute right-0 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}