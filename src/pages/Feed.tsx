import React from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Image, MapPin, Calendar } from 'lucide-react';
import { StoryCircle } from '../components/story/StoryCircle';

const stories = [
  { id: 'add', name: 'Add Story', image: '', isAdd: true },
  { id: '1', name: 'Nancy_drew', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
  { id: '2', name: 'Joshua_98', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e' },
  { id: '3', name: 'Simone123', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb' },
  { id: '4', name: 'Christian_97', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde' }
];

const feedPosts = [
  {
    user: {
      name: 'Alex Andrew',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      location: 'Pokhara, Nepal',
      verified: true
    },
    content: {
      text: "Just experienced the most breathtaking sunrise over Phewa lake! The reflection of the Annapurna range on the crystal clear water was absolutely magical.",
      images: ['https://images.unsplash.com/photo-1544735716-392fe2489ffa'],
      timestamp: '2 hours ago'
    },
    engagement: {
      likes: 250,
      comments: 30,
      shares: 10
    }
  },
  {
    user: {
      name: 'Richard Philip',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
      location: 'Kathmandu, Nepal',
      verified: true
    },
    content: {
      text: "Exploring the ancient temples of Kathmandu Durbar Square. The architecture and history here is simply incredible!",
      images: ['https://images.unsplash.com/photo-1582654454409-778f6619ddc6'],
      timestamp: '2 hours ago'
    },
    engagement: {
      likes: 500,
      comments: 100,
      shares: 100
    }
  }
];

export default function Feed() {
  return (
    <div className="max-w-[1200px] mx-auto grid grid-cols-12 gap-6 px-4">
      <div className="col-span-8">
        {/* Stories */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="flex gap-4 overflow-x-auto no-scrollbar">
            {stories.map((story) => (
              <StoryCircle
                key={story.id}
                image={story.image}
                name={story.name}
                isAdd={story.isAdd}
              />
            ))}
          </div>
        </div>

        {/* Post Input */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <input
              type="text"
              placeholder="Share your travel experiences..."
              className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-sm"
            />
          </div>
          <div className="flex gap-4 mt-3 px-14">
            <button className="flex items-center gap-2 text-gray-600 text-sm">
              <Image className="w-5 h-5" />
              Photo/Video
            </button>
            <button className="flex items-center gap-2 text-gray-600 text-sm">
              <MapPin className="w-5 h-5" />
              Location
            </button>
            <button className="flex items-center gap-2 text-gray-600 text-sm">
              <Calendar className="w-5 h-5" />
              Travel Plan
            </button>
            <button className="ml-auto bg-brand-orange text-white px-6 py-1.5 rounded-full text-sm">
              Post
            </button>
          </div>
        </div>

        {/* Feed Posts */}
        <div className="space-y-4">
          {feedPosts.map((post, index) => (
            <div key={index} className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={post.user.image}
                    alt={post.user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{post.user.name}</span>
                      {post.user.verified && (
                        <span className="text-brand-orange">•</span>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{post.content.timestamp}</span>
                    </div>
                  </div>
                </div>
                <button>
                  <MoreHorizontal className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <p className="text-gray-800 mb-4">{post.content.text}</p>
              
              <img
                src={post.content.images[0]}
                alt="Post content"
                className="w-full rounded-lg mb-4"
              />
              
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-gray-600">
                  <Heart className="w-5 h-5" />
                  <span>{post.engagement.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600">
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.engagement.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600">
                  <Share2 className="w-5 h-5" />
                  <span>{post.engagement.shares}</span>
                </button>
                <button className="ml-auto">
                  <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="col-span-4">
        {/* Search */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search destinations or..."
            className="w-full bg-white rounded-lg px-4 py-2.5 pl-10"
          />
          <svg
            className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </div>

        {/* Upcoming Trips */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Upcoming Trips</h3>
            <button className="text-gray-500 text-sm">More...</button>
          </div>
          <div className="space-y-3">
            {[
              {
                title: 'Everest Base Camp Trek',
                date: 'March 15 - March 28',
                people: '12 people'
              },
              {
                title: 'Mardi Trek',
                date: 'April 1 - April 5',
                people: '8 people'
              },
              {
                title: 'Lumbini',
                date: 'May 15 - May 20',
                people: '5 people'
              }
            ].map((trip, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">{trip.title}</h4>
                  <div className="text-xs text-gray-500">
                    {trip.date}
                    <br />
                    {trip.people}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Travel Buddies */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Suggested Travel Buddies</h3>
            <button className="text-gray-500 text-sm">More...</button>
          </div>
          <div className="space-y-4">
            {[
              {
                name: 'Rachel Green',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
                plan: 'Planning: Everest Base Camp'
              },
              {
                name: 'Raj Bhandari',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
                plan: 'Planning: Annapurna Circuit'
              }
            ].map((buddy, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={buddy.image}
                    alt={buddy.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-sm">{buddy.name}</span>
                      <span className="text-brand-orange">•</span>
                    </div>
                    <p className="text-xs text-gray-500">{buddy.plan}</p>
                  </div>
                </div>
                <button className="bg-brand-orange text-white px-4 py-1.5 rounded-full text-sm">
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Destinations */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Trending Destinations</h3>
            <button className="text-gray-500 text-sm">More...</button>
          </div>
          <div className="space-y-4">
            {[
              {
                name: 'Annapurna Circuit',
                image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
                travelers: '482 travelers this month'
              },
              {
                name: 'Kathmandu Valley',
                image: 'https://images.unsplash.com/photo-1582654454409-778f6619ddc6',
                travelers: '600 travelers this month'
              }
            ].map((dest, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-24 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 p-3 flex flex-col justify-end">
                  <h4 className="text-white font-medium">{dest.name}</h4>
                  <p className="text-white text-sm opacity-90">{dest.travelers}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}