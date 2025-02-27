import React from 'react';
import { FeedPost } from '../feed/FeedPost';

const posts = [
  {
    user: {
      name: 'Anne Frank',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      location: 'Pokhara, Nepal'
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
      name: 'Anne Frank',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      location: 'Kathmandu, Nepal'
    },
    content: {
      text: "Exploring the ancient temples of Kathmandu Durbar Square. The architecture and history here is simply incredible!",
      images: ['https://images.unsplash.com/photo-1582654454409-778f6619ddc6'],
      timestamp: '2 days ago'
    },
    engagement: {
      likes: 500,
      comments: 100,
      shares: 100
    }
  }
];

export default function ProfilePosts() {
  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <FeedPost key={index} {...post} />
      ))}
    </div>
  );
}