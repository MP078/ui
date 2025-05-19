import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MoreVertical, Share2, Heart, Send } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { stories } from '../../data/stories';

export default function StoryViewer() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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

    if (!isPaused) {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
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
    }
  }, [currentStoryIndex, userStories, navigate, isPaused]);

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
      <div className="relative w-full max-w-[380px] aspect-[9/16] bg-black overflow-hidden rounded-2xl">
        <img
          src={currentStory.image}
          alt={userStories.user.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60">
          <div className="absolute top-0 left-0 right-0 p-4">
            <div className="flex gap-1 mb-4">
              {userStories.stories.map((story, index) => (
                <div
                  key={story.id}
                  className="h-0.5 flex-1 bg-white/30 rounded-full overflow-hidden"
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

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={userStories.user.image}
                  alt={userStories.user.name}
                  className="w-8 h-8 rounded-full border border-white"
                />
                <div>
                  <p className="text-white font-medium text-sm">{userStories.user.name}</p>
                  <p className="text-white/70 text-xs">
                    {currentStory.location || userStories.user.timestamp}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-white hover:bg-white/10 p-1.5 rounded-full transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleClose} 
                  className="text-white hover:bg-white/10 p-1.5 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {currentStory.caption && (
            <div className="absolute bottom-20 left-4 right-4">
              <p className="text-white text-sm">{currentStory.caption}</p>
            </div>
          )}

          {currentStory.music && (
            <div className="absolute bottom-28 left-4 right-4 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                <span className="text-white text-lg">🎵</span>
              </div>
              <div>
                <p className="text-white text-sm font-medium">{currentStory.music.title}</p>
                <p className="text-white/70 text-xs">{currentStory.music.artist}</p>
              </div>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-4">
            <input
              type="text"
              placeholder="Send message"
              className="flex-1 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 rounded-full px-4 py-2 text-sm border border-white/20 focus:outline-none focus:border-white/40"
            />
            <button className="text-white hover:bg-white/10 p-2 rounded-full transition-colors">
              <Heart className="w-6 h-6" />
            </button>
            <button className="text-white hover:bg-white/10 p-2 rounded-full transition-colors">
              <Share2 className="w-6 h-6" />
            </button>
            <button className="text-white hover:bg-white/10 p-2 rounded-full transition-colors">
              <Send className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-between px-4" onClick={(e) => e.stopPropagation()}>
          <div className="w-1/2 h-full flex items-center" onClick={handlePrevStory}>
            {currentStoryIndex > 0 && (
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
            )}
          </div>
          <div className="w-1/2 h-full flex items-center justify-end" onClick={handleNextStory}>
            {currentStoryIndex < userStories.stories.length - 1 && (
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}