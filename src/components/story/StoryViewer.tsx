import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Share2,
  Heart,
  Send,
  MapPin,
} from "lucide-react";

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
  userStories: UserStories[];
  initialUserId?: string;
}

export function StoryViewerModal({
  isOpen,
  onClose,
  userStories,
  initialUserId,
}: StoryViewerModalProps) {
  // Flatten all stories for navigation
  const [allStories, setAllStories] = useState<
    {
      user: UserStories;
      story: Story;
    }[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused] = useState(false);

  // Build flat array and set initial index
  useEffect(() => {
    if (!userStories || userStories.length === 0) return;
    const flat: { user: UserStories; story: Story }[] = [];
    userStories.forEach((user) => {
      user.stories.forEach((story) => {
        flat.push({ user, story });
      });
    });
    setAllStories(flat);
    // Find the index of the first story for the selected user
    let startIdx = 0;
    if (initialUserId) {
      const idx = flat.findIndex(
        (s) => String(s.user.id) === String(initialUserId)
      );
      if (idx !== -1) startIdx = idx;
    }
    setCurrentIndex(startIdx);
    setProgress(0);
  }, [userStories, initialUserId]);

  // Find all stories for the current user and the index of the current story among them
  const { user, story } = allStories[currentIndex] || {
    user: null,
    story: null,
  };
  const userStoriesArr = useMemo(
    () => (user ? allStories.filter((s) => s.user.id === user.id) : []),
    [user, allStories]
  );
  const userStoryIdx = userStoriesArr.findIndex(
    (s) => s.story.id === (story && story.id)
  );

  // Memoized helpers for navigation
  const getNextStoryIndexForUser = useCallback(() => {
    if (!user || !userStoriesArr.length) return null;
    if (userStoryIdx < userStoriesArr.length - 1) {
      const nextStoryId = userStoriesArr[userStoryIdx + 1].story.id;
      return allStories.findIndex(
        (s) => s.story.id === nextStoryId && s.user.id === user.id
      );
    } else {
      const nextUserIdx = userStories.findIndex((u) => u.id === user.id) + 1;
      if (nextUserIdx < userStories.length) {
        const nextUser = userStories[nextUserIdx];
        return allStories.findIndex((s) => s.user.id === nextUser.id);
      }
    }
    return null;
  }, [user, userStoriesArr, userStoryIdx, allStories, userStories]);

  const getPrevStoryIndexForUser = useCallback(() => {
    if (!user || !userStoriesArr.length) return null;
    if (userStoryIdx > 0) {
      const prevStoryId = userStoriesArr[userStoryIdx - 1].story.id;
      return allStories.findIndex(
        (s) => s.story.id === prevStoryId && s.user.id === user.id
      );
    } else {
      const prevUserIdx = userStories.findIndex((u) => u.id === user.id) - 1;
      if (prevUserIdx >= 0) {
        const prevUser = userStories[prevUserIdx];
        return allStories.findIndex(
          (s) =>
            s.user.id === prevUser.id &&
            s.story.id === prevUser.stories[prevUser.stories.length - 1].id
        );
      }
    }
    return null;
  }, [user, userStoriesArr, userStoryIdx, allStories, userStories]);

  // Progress bar logic
  useEffect(() => {
    if (!isOpen || allStories.length === 0) return;
    const current = allStories[currentIndex];
    if (!current) return;
    const duration = current.story.duration || 5000;
    const interval = 50;
    const step = (interval / duration) * 100;
    if (!isPaused) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            const nextIndex = getNextStoryIndexForUser();
            if (nextIndex !== null) {
              setCurrentIndex(nextIndex);
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
  }, [
    currentIndex,
    allStories,
    isPaused,
    isOpen,
    onClose,
    getNextStoryIndexForUser,
  ]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setCurrentIndex(0);
      setProgress(0);
    }
  }, [isOpen]);

  if (!isOpen || allStories.length === 0 || !user || !story) return null;

  const handlePrevStory = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIdx = getPrevStoryIndexForUser();
    if (prevIdx !== null && prevIdx >= 0) {
      setCurrentIndex(prevIdx);
      setProgress(0);
    }
  };
  const handleNextStory = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = getNextStoryIndexForUser();
    if (nextIdx !== null && nextIdx >= 0) {
      setCurrentIndex(nextIdx);
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
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-around z-50"
      onClick={handleBackdropClick}
    >
      {/* Navigation arrows outside the image container */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-black/40 hover:bg-black/60 rounded-full p-2 text-white"
        style={{ left: 0 }}
        onClick={handlePrevStory}
        aria-label="Previous story"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-black/40 hover:bg-black/60 rounded-full p-2 text-white"
        style={{ right: 0 }}
        onClick={handleNextStory}
        aria-label="Next story"
      >
        <ChevronRight size={32} />
      </button>
      <div className="relative w-full max-w-[380px] aspect-[9/16] bg-black overflow-hidden rounded-2xl">
        <img
          src={story.image}
          alt={user.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60">
          <div className="absolute top-0 left-0 right-0 p-4">
            <div className="flex gap-1 mb-4">
              {userStoriesArr.map((s, idx) => (
                <div
                  key={s.story.id}
                  className="h-0.5 flex-1 bg-white/30 rounded-full overflow-hidden"
                >
                  <div
                    className="h-full bg-white transition-all duration-100 ease-linear"
                    style={{
                      width:
                        idx === userStoryIdx
                          ? `${progress}%`
                          : idx < userStoryIdx
                          ? "100%"
                          : "0%",
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <img
                src={user.image}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-white font-semibold text-sm">
                {user.name}
              </span>
            </div>
          </div>
          <button
            className="absolute top-4 right-4 text-white"
            onClick={onClose}
          >
            <X />
          </button>
        </div>
        {/* Story content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-2">
          {story.caption && (
            <div className="text-white text-base font-medium mb-1">
              {story.caption}
            </div>
          )}
          {story.location && (
            <div className="text-white text-xs flex items-center gap-1">
              <span>
                <MapPin />
              </span>
              <span>{story.location}</span>
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
