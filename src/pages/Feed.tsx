import { useState, useEffect } from "react";
import { StoryRow } from "../components/story/StoryRow";
import PostInput from "../components/PostInput";
import { FeedPost, FeedPostProps } from "../components/feed/FeedPost";
import { ConfirmationDialog } from "../components/ui/confirmation-dialog";
import SuggestedBuddies from "../components/SuggestedBuddies";
import TrendingDestinations from "../components/TrendingDestinations";
import UpcomingTrips_feed from "../components/UpcomingTrips_feed";
import { SearchBar } from "../components/search/SearchBar";
import { FloatingActionButton } from "../components/ui/floating-action-button";
import { api } from "../lib/api";

export type PostType = {
  id: string;
  user: {
    id: string;
    name: string;
    profile_image: string;
    verified: boolean;
  };
  destination: string;
  content: string;
  images: { image: string }[];
  created_at: string;
  likes: number;
  comments_count: number;
  liked: boolean | false;
};

export default function Feed() {
  const [feedPosts, setFeedPosts] = useState<FeedPostProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [showConnectConfirmation, setShowConnectConfirmation] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{ name: string } | null>(
    null
  );

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts?all=true");
      const data = res.data;

      const transformed = data.data.map((post: unknown) => {
        const typedPost = post as PostType;
        return {
          id: typedPost.id,
          user: {
            id: typedPost.user.id,
            name: typedPost.user.name,
            image: typedPost.user.profile_image,
            location: typedPost.destination,
            verified: typedPost.user.verified,
          },
          content: {
            text: typedPost.content,
            images: typedPost.images.map((img) => img.image),
            timestamp: new Date(typedPost.created_at).toLocaleString(),
          },
          engagement: {
            likes: typedPost.likes,
            comments: typedPost.comments_count,
            shares: 0,
          },
          liked: typedPost.liked,
        };
      });

      setFeedPosts(transformed);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch feed:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleConnect = (user: { name: string }) => {
    setSelectedUser(user);
    setShowConnectConfirmation(true);
  };

  return (
    <div className="max-w-[1200px] mx-auto grid grid-cols-12 gap-6 px-4">
      <div className="col-span-8">
        <div className="bg-white rounded-lg p-4 mb-4">
          <StoryRow />
        </div>

        <div className="mb-4">
          <PostInput onPostSuccess={fetchPosts} />
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : (
            feedPosts.map((post) => <FeedPost key={post.id} {...post} />)
          )}
        </div>
      </div>

      <div className="col-span-4">
        <SearchBar
          placeholder="Search destinations or..."
          onSearch={(query) => console.log("Searching:", query)}
          className="mb-4"
        />
        <UpcomingTrips_feed />
        <SuggestedBuddies />
        <TrendingDestinations />
      </div>

      <ConfirmationDialog
        isOpen={showConnectConfirmation}
        onClose={() => setShowConnectConfirmation(false)}
        onConfirm={() => {
          console.log("Connecting with:", selectedUser?.name);
          setShowConnectConfirmation(false);
        }}
        title="Connect with Traveler"
        message={`Would you like to connect with ${selectedUser?.name}? They will be notified of your request.`}
        confirmText="Send Request"
        type="info"
      />

      <FloatingActionButton />
    </div>
  );
}
