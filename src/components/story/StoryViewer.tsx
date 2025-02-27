import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const stories = [
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

export default function StoryViewer() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Find the current user's stories
  const userStories = stories.find(story => story.id === userId);
  
  useEffect(() => {
    if (!userStories) {
      navigate(-1);
      return;
    }

    const currentStory = userStories.stories[currentStoryIndex];
    if (!currentStory) return;

    const duration = currentStory.duration;
    const interval = 50;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          // Move to next story or close
          if (currentStoryIndex < userStories.stories.length - 1) {
            setCurrentStoryIndex(prev => prev + 1);
            return 0;
          } else {
            navigate(-1);
            return 100;
          }
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [currentStoryIndex, userStories, navigate]);

  if (!userStories) return null;

  const currentStory = userStories.stories[currentStoryIndex];

  const handlePrevStory = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
      setProgress(0);
    }
  };

  const handleNextStory = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentStoryIndex < userStories.stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      setProgress(0);
    } else {
      navigate(-1);
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-white z-50 p-2 hover:bg-white/10 rounded-full"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Progress bars */}
      <div className="absolute top-4 left-4 right-4 flex gap-1">
        {userStories.stories.map((story, index) => (
          <div
            key={story.id}
            className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden"
          >
            <div
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{
                width: index === currentStoryIndex ? `${progress}%` : 
                      index < currentStoryIndex ? '100%' : '0%'
              }}
            />
          </div>
        ))}
      </div>

      {/* Story content */}
      <div className="relative w-full max-w-lg aspect-[9/16] bg-black">
        <img
          src={currentStory.image}
          alt={userStories.name}
          className="w-full h-full object-contain"
        />
        
        {/* User info */}
        <div className="absolute bottom-4 left-4 flex items-center gap-3">
          <img
            src={userStories.image}
            alt={userStories.name}
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <span className="text-white font-medium">{userStories.name}</span>
        </div>
      </div>

      {/* Navigation buttons */}
      <div 
        className="absolute inset-0 flex items-center justify-between px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-1/2 h-full flex items-center" onClick={handlePrevStory}>
          {currentStoryIndex > 0 && (
            <button className="p-2 hover:bg-white/10 rounded-full">
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
          )}
        </div>
        <div className="w-1/2 h-full flex items-center justify-end" onClick={handleNextStory}>
          {currentStoryIndex < userStories.stories.length - 1 && (
            <button className="p-2 hover:bg-white/10 rounded-full">
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}