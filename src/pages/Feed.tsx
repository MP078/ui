import React, { useState } from 'react';
import { StoryRow } from '../components/story/StoryRow';
import PostInput from '../components/PostInput';
import { FeedPost } from '../components/feed/FeedPost';
import { ConfirmationDialog } from '../components/ui/confirmation-dialog';
import SuggestedBuddies from '../components/SuggestedBuddies';
import TrendingDestinations from '../components/TrendingDestinations';
import UpcomingTrips_feed from '../components/UpcomingTrips_feed';
import { SearchBar } from '../components/search/SearchBar';
import { FloatingActionButton } from '../components/ui/floating-action-button';

const feedPosts = [
  {
    user: {
      name: 'Alex Andrew',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      location: 'Pokhara, Nepal',
      verified: true,
    },
    content: {
      text: 'Just experienced the most breathtaking sunrise over Phewa lake! The reflection of the Annapurna range on the crystal clear water was absolutely magical.',
      images: ['https://images.unsplash.com/photo-1544735716-392fe2489ffa'],
      timestamp: '2 hours ago',
    },
    engagement: {
      likes: 250,
      comments: 30,
      shares: 10,
    },
  },
  {
    user: {
      name: 'Richard Philip',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
      location: 'Kathmandu, Nepal',
      verified: true,
    },
    content: {
      text: 'Exploring the ancient temples of Kathmandu Durbar Square. The architecture and history here is simply incredible!',
      images: ['https://images.unsplash.com/photo-1582654454409-778f6619ddc6'],
      timestamp: '2 hours ago',
    },
    engagement: {
      likes: 500,
      comments: 100,
      shares: 100,
    },
  },
];

export default function Feed() {
  const [showConnectConfirmation, setShowConnectConfirmation] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{ name: string } | null>(
    null
  );

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
          {feedPosts.map((post, index) => (
            <FeedPost key={index} {...post} />
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="col-span-4">
        {/* Search */}
        <SearchBar
          placeholder="Search destinations or..."
          onSearch={(query) => console.log('Searching:', query)}
          className="mb-4"
        />

        {/* Upcoming Trips */}
        <UpcomingTrips_feed />

        {/* Suggested Travel Buddies */}
        <SuggestedBuddies />

        {/* Trending Destinations */}
        <TrendingDestinations />
      </div>

      {/* Connect Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showConnectConfirmation}
        onClose={() => setShowConnectConfirmation(false)}
        onConfirm={() => {
          console.log('Connecting with:', selectedUser?.name);
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