import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { StoryCircle } from './StoryCircle';
import { AddStoryModal } from './AddStoryModal';
import { useNavigate, useLocation } from 'react-router-dom';

const stories = [
  { 
    id: 'add', 
    name: 'Add Story', 
    image: '', 
    isAdd: true 
  },
  { 
    id: '1', 
    name: 'Nancy_drew', 
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    stories: [
      {
        id: '1-1',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
        duration: 5000
      },
      {
        id: '1-2',
        image: 'https://images.unsplash.com/photo-1585938389612-a552a28d6914',
        duration: 5000
      }
    ]
  },
  { 
    id: '2', 
    name: 'Joshua_98', 
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    stories: [
      {
        id: '2-1',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
        duration: 5000
      },
      {
        id: '2-2',
        image: 'https://images.unsplash.com/photo-1585938389612-a552a28d6914',
        duration: 5000
      }
    ]
  },
  { 
    id: '3', 
    name: 'Simone123', 
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    stories: [
      {
        id: '3-1',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
        duration: 5000
      }
    ]
  }
];

export function StoryRow() {
  const [isAddStoryModalOpen, setIsAddStoryModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleStoryClick = (story: typeof stories[0]) => {
    if (story.isAdd) {
      setIsAddStoryModalOpen(true);
    } else {
      // Navigate to story viewer with current location as background
      navigate(`/stories/${story.id}`, {
        state: { backgroundLocation: location }
      });
    }
  };

  const handleAddStory = (file: File) => {
    // Handle the story upload here
    console.log('Uploading story:', file);
    setIsAddStoryModalOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-4 py-4">
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          {stories.map((story) => (
            <StoryCircle
              key={story.id}
              image={story.image}
              name={story.name}
              isAdd={story.isAdd}
              onClick={() => handleStoryClick(story)}
            />
          ))}
        </div>
        <button className="absolute right-0 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <AddStoryModal
        isOpen={isAddStoryModalOpen}
        onClose={() => setIsAddStoryModalOpen(false)}
        onSubmit={handleAddStory}
      />
    </div>
  );
}