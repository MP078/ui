import React, { useState, useEffect } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Share2,
  Heart,
  Send,
} from "lucide-react";
import axios from "axios";

interface Story {
  id: string | number;
  image: string;
  caption?: string;
  location?: string;
  music?: { title: string; artist: string };
  duration?: number;
}
interface UserStories {
  id: string | number;
  name: string;
  image: string;
  stories: Story[];
}

export interface StoryViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  userStory?: UserStories;
  userId?: string | number;
}

// Types for API normalization
interface APIUser {
  id: string | number;
  name: string;
  avatar_url?: string | false;
}
interface APIStory {
  id: string | number;
  image_url?: string;
  caption?: string;
  location?: string;
  music?: { title: string; artist: string };
}

export function StoryViewerModal({
  isOpen,
  onClose,
  userStory,
  userId,
}: StoryViewerModalProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused] = useState(false);
  const [userStories, setUserStories] = useState<UserStories | null>(
    userStory || null
  );

  // Always use the userStory prop if present
  useEffect(() => {
    if (userStory) {
      setUserStories(userStory);
      setCurrentStoryIndex(0);
      setProgress(0);
    } else if (!userStories && userId) {
      // Only fetch if userStory is not provided
      const fetchStories = async () => {
        try {
          const res = await axios.get("/stories");
          const normalized: UserStories[] = (res.data || []).map(
            (entry: { user: APIUser; stories: APIStory[] }) => ({
              id: entry.user.id,
              name: entry.user.name,
              image:
                typeof entry.user.avatar_url === "string" &&
                entry.user.avatar_url
                  ? entry.user.avatar_url
                  : `/avatars/${(Number(entry.user.id) % 10) + 1}.png`,
              stories: (entry.stories || []).map((story) => ({
                id: story.id,
                image: story.image_url || "",
                caption: story.caption,
                location: story.location,
                music: story.music,
                duration: 5000,
              })),
            })
          );
          const found = normalized.find((u) => String(u.id) === String(userId));
          if (found) setUserStories(found);
        } catch {
          // Silently fail if fetch fails (modal just doesn't show)
        }
      };
      fetchStories();
    }
    // eslint-disable-next-line
  }, [userStory, userId]);

  // Reset story index and progress when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setCurrentStoryIndex(0);
      setProgress(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!userStories) return;
    const currentStory = userStories.stories[currentStoryIndex];
    if (!currentStory) return;
    const duration = currentStory.duration || 5000;
    const interval = 50;
    const step = (interval / duration) * 100;
    if (!isPaused) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            if (currentStoryIndex < userStories.stories.length - 1) {
              setCurrentStoryIndex((prev) => prev + 1);
              return 0;
            } else {
              onClose();
              return 100;
            }
          }
          return prev + step;
        });
      }, interval);
      return () => clearInterval(timer);
    }
  }, [currentStoryIndex, userStories, isPaused, onClose]);

  if (!isOpen || !userStories) return null;
  const currentStory = userStories.stories[currentStoryIndex];

  const handlePrevStory = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prev) => prev - 1);
      setProgress(0);
    }
  };
  const handleNextStory = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentStoryIndex < userStories.stories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-[380px] aspect-[9/16] bg-black overflow-hidden rounded-2xl">
        <img
          src={currentStory.image}
          alt={userStories.name}
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
                      width:
                        index === currentStoryIndex
                          ? `${progress}%`
                          : index < currentStoryIndex
                          ? "100%"
                          : "0%",
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <img
                src={userStories.image}
                alt={userStories.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-white font-semibold text-sm">
                {userStories.name}
              </span>
            </div>
          </div>
          <button
            className="absolute top-4 right-4 text-white"
            onClick={onClose}
          >
            <X />
          </button>
          <button
            className="absolute top-1/2 left-2 -translate-y-1/2 text-white"
            onClick={handlePrevStory}
          >
            <ChevronLeft />
          </button>
          <button
            className="absolute top-1/2 right-2 -translate-y-1/2 text-white"
            onClick={handleNextStory}
          >
            <ChevronRight />
          </button>
        </div>
        {/* Story content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-2">
          {currentStory.caption && (
            <div className="text-white text-base font-medium mb-1">
              {currentStory.caption}
            </div>
          )}
          {currentStory.location && (
            <div className="text-white text-xs flex items-center gap-1">
              <span>
                <MoreVertical size={14} />
              </span>
              <span>{currentStory.location}</span>
            </div>
          )}
          {/* Add music, reactions, etc. here if needed */}
          <div className="flex items-center gap-4 mt-2">
            <Heart className="text-white" />
            <Send className="text-white" />
            <Share2 className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoryViewerModal;
