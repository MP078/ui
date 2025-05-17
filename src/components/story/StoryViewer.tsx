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
import { useNavigate, useParams } from "react-router-dom";
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
// Types for backend response
interface BackendStory {
  id: string | number;
  image_url?: string;
  caption?: string;
  location?: string;
  music?: { title: string; artist: string };
  duration?: number;
}
interface BackendUser {
  id: string | number;
  name: string;
  image_url?: string;
  avatar_url?: string;
  stories?: BackendStory[];
}

export default function StoryViewer() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused] = useState(false); // Remove setIsPaused
  const [userStories, setUserStories] = useState<UserStories | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axios.get("/stories");
        const users: BackendUser[] = res.data.users_with_stories || res.data;
        const normalized: UserStories[] = users.map((user) => ({
          id: user.id,
          name: user.name,
          image: user.image_url || user.avatar_url || "",
          stories: (user.stories || []).map((story: BackendStory) => ({
            id: story.id,
            image: story.image_url || "",
            caption: story.caption,
            location: story.location,
            music: story.music,
            duration: story.duration || 5000,
          })),
        }));
        const found = normalized.find((u) => String(u.id) === String(userId));
        if (!found) {
          navigate(-1);
        } else {
          setUserStories(found);
        }
      } catch {
        navigate(-1);
      }
    };
    fetchStories();
  }, [userId, navigate]);

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
              {/* Add more info if needed */}
            </div>
          </div>
          <button
            className="absolute top-4 right-4 text-white"
            onClick={handleClose}
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
