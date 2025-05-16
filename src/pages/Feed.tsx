import { useState, useEffect } from "react";
import { StoryRow } from "../components/story/StoryRow";
import PostInput from "../components/PostInput";
import { FeedPost } from "../components/feed/FeedPost";
import { ConfirmationDialog } from "../components/ui/confirmation-dialog";
import SuggestedBuddies from "../components/SuggestedBuddies";
import TrendingDestinations from "../components/TrendingDestinations";
import UpcomingTrips_feed from "../components/UpcomingTrips_feed";
import { SearchBar } from "../components/search/SearchBar";
import { FloatingActionButton } from "../components/ui/floating-action-button";
import { api } from "../lib/api";

export default function Feed() {
  const [feedPosts, setFeedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConnectConfirmation, setShowConnectConfirmation] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{ name: string } | null>(
    null
  );

  useEffect(() => {
    api
      .get("/posts")
      .then((res) => {
        const data = res.data;
        const transformed = data.data.map((post: unknown) => ({
          user: {
            name: post.user.name,
            image: post.user.profile_image,
            location: post.destination,
            verified: post.user.verified,
          },
          content: {
            text: post.content,
            images: post.images.map((img: any) => img.image),
            timestamp: new Date(post.created_at).toLocaleString(),
          },
          engagement: {
            likes: post.likes,
            comments: post.comments_count,
            shares: 0, // assuming you don’t have shares yet
          },
        }));

        setFeedPosts(transformed);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch feed:", err);
        setLoading(false);
      });
  }, []);

  const handleConnect = (user: { name: string }) => {
    setSelectedUser(user);
    setShowConnectConfirmation(true);
  };

  return (
    <div className="max-w-[1200px] mx-auto grid grid-cols-12 gap-6 px-4">
      <div className="col-span-8">
        {/* Stories */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <StoryRow />
        </div>

        {/* Post Input */}
        <div className="mb-4">
          <PostInput />
        </div>

        {/* Feed Posts */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : (
            feedPosts.map((post, index) => <FeedPost key={index} {...post} />)
          )}
        </div>
      </div>

      {/* Right Sidebar */}
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
