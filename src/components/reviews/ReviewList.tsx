import React from 'react';
import { Star, Heart, Share2, Flag } from 'lucide-react';

interface Review {
  id: string;
  author: {
    name: string;
    image: string;
    date: string;
  };
  rating: number;
  comment: string;
  likes: number;
  shares: number;
}

interface ReviewListProps {
  reviews: Review[];
  onLike: (id: string) => void;
  onShare: (id: string) => void;
  onReport: (id: string) => void;
}

export function ReviewList({ reviews, onLike, onShare, onReport }: ReviewListProps) {
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img
                src={review.author.image}
                alt={review.author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-medium">{review.author.name}</h4>
                <p className="text-sm text-gray-500">{review.author.date}</p>
              </div>
            </div>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="text-gray-700 mb-4">{review.comment}</p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onLike(review.id)}
              className="flex items-center gap-2 text-gray-600 hover:text-brand-orange"
            >
              <Heart className="w-5 h-5" />
              <span>{review.likes}</span>
            </button>
            <button
              onClick={() => onShare(review.id)}
              className="flex items-center gap-2 text-gray-600 hover:text-brand-orange"
            >
              <Share2 className="w-5 h-5" />
              <span>{review.shares}</span>
            </button>
            <button
              onClick={() => onReport(review.id)}
              className="flex items-center gap-2 text-gray-600 hover:text-red-500 ml-auto"
            >
              <Flag className="w-5 h-5" />
              <span>Report</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}