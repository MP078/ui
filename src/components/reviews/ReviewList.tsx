
import React from 'react';
import { Star, Heart, Share2, Flag } from 'lucide-react';
import { getAvatarNumber } from '../../context/UserContext';


interface Review {
  id: string;
  author: {
    id: string;
    name: string;
    image: string;
    date: string;
  };
  value: number; // rating value (1-5)
  images?: string[]; // optional image URLs
}

interface ReviewListProps {
  reviews: Review[];
  onLike: (id: string) => void;
  onShare: (id: string) => void;
  onReport: (id: string) => void;
}

export function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img
                src={
                  review.author.image && review.author.image.trim() !== ''
                    ? review.author.image
                    : `/avatars/${getAvatarNumber(
                        review.author.id || review.author.name || '1'
                      )}.png`
                }
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
                    i < review.value
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {review.images && review.images.length > 0 && (
            <div className="flex gap-2 mb-4">
              {review.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Review image ${idx + 1}`}
                  className="w-20 h-20 object-cover rounded-lg border"
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}