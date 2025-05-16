import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { StoryCircle } from './StoryCircle';
import { AddStoryModal } from './AddStoryModal';
import { useNavigate, useLocation } from 'react-router-dom';
import { stories } from '../../data/stories';

export function StoryRow() {
  const [isAddStoryModalOpen, setIsAddStoryModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleStoryClick = (story: typeof stories[0] | { id: 'add', isAdd: true }) => {
    if ('isAdd' in story) {
      setIsAddStoryModalOpen(true);
    } else {
      navigate(`/stories/${story.id}`, {
        state: { backgroundLocation: location }
      });
    }
  };

  const handleAddStory = (file: File) => {
    console.log('Uploading story:', file);
    setIsAddStoryModalOpen(false);
  };

  const allStories = [
    { id: 'add', name: 'Add Story', image: '', isAdd: true as const },
    ...stories.map(story => ({
      id: story.id,
      name: story.user.name,
      image: story.user.image
    }))
  ];

  return (
    <div className="relative">
      <div className="flex items-center gap-4 py-4">
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          {allStories.map((story) => (
            <StoryCircle
              key={story.id}
              image={story.image}
              name={story.name}
              isAdd={'isAdd' in story}
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