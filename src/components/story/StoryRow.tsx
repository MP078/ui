import { useState, useEffect, useCallback } from "react";
import { ChevronRight } from "lucide-react";
import { StoryCircle } from "./StoryCircle";
import { AddStoryModal } from "./AddStoryModal";
import { StoryViewerModal } from "./StoryViewer";
import { api } from "../../lib/api";
import { getAvatarNumber } from "../../context/UserContext";

// Define a type for normalized story
interface UserStory {
  id: string;
  name: string;
  image: string;
  stories: Array<{
    id: string;
    image: string;
    caption?: string;
    location?: string;
    music?: { title: string; artist: string };
    duration?: number;
  }>;
}

// Type for Add Story button
interface AddStory {
  id: "add";
  name: string;
  image: string;
  isAdd: true;
}

type StoryRowItem =
  | AddStory
  | { id: string | number; name: string; image: string };

export function StoryRow() {
  const [isAddStoryModalOpen, setIsAddStoryModalOpen] = useState(false);
  const [userStories, setUserStories] = useState<UserStory[]>([]);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [activeUserStory, setActiveUserStory] = useState<UserStory | null>(
    null
  );

  // Fetch stories from backend
  // Define types for API response inline
  interface APIUser {
    id: string;
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
  const fetchStories = useCallback(async () => {
    try {
      const res = await api.get("/stories");
      const normalized: UserStory[] = (res.data || []).map(
        (entry: { user: APIUser; stories: APIStory[] }) => ({
          id: entry.user.id,
          name: entry.user.name,
          image:
            typeof entry.user.avatar_url === "string" && entry.user.avatar_url
              ? entry.user.avatar_url
              : `/avatars/${getAvatarNumber(entry.user.id.toString())}.png`, // fallback to local avatar if falsey
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
      setUserStories(normalized);
    } catch {
      setUserStories([]);
    }
  }, []);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const handleStoryClick = (story: StoryRowItem) => {
    if ("isAdd" in story && story.isAdd) {
      setIsAddStoryModalOpen(true);
    } else {
      const userStory = userStories.find((u) => u.id === story.id);
      if (userStory) {
        setActiveUserStory(userStory);
        setViewerOpen(true);
      }
    }
  };

  // After successful upload, refetch stories
  const handleAddStory = () => {
    setIsAddStoryModalOpen(false);
    fetchStories();
  };

  // Compose all stories for the row (add button + user stories)
  const allStories: StoryRowItem[] = [
    { id: "add", name: "Add Story", image: "", isAdd: true },
    ...userStories.map((user) => ({
      id: user.id,
      name: user.name,
      image: user.image,
    })),
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
              isAdd={"isAdd" in story && story.isAdd}
              onClick={handleStoryClick.bind(null, story)}
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
      <StoryViewerModal
        isOpen={viewerOpen}
        onClose={() => {
          setViewerOpen(false);
          setActiveUserStory(null);
        }}
        userStories={userStories}
        initialUserId={activeUserStory?.id}
      />
    </div>
  );
}
