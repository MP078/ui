import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import clsx from 'clsx';
import { api } from '../../lib/api';

interface Reviewer {
  id: string;
  username: string;
  name: string;
}

interface UserReview {
  id: string;
  reviewer: Reviewer;
  value: number;
  overall_experience: number;
  communication: number;
  reliability: number;
  travel_compatibility: number;
  respect_consideration: number;
  review: string;
  recommend: boolean;
  image_urls: string[];
  created_at: string;
}



interface UserReviewsProps {
  username: string;
}

export function UserReviews({ username }: UserReviewsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;
    setLoading(true);
    setError(null);
    api.get(`/ratings?username=${encodeURIComponent(username)}`)
      .then((res) => {
        // Accept both array and {data: array} API responses
        const reviewsArr = Array.isArray(res.data) ? res.data : res.data?.data || [];
        setReviews(reviewsArr);
      })
      .catch((err) => setError(err.message || 'Failed to fetch reviews'))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      {reviews.length === 0 && <div className="text-gray-500">No reviews found.</div>}
      {reviews.map((review) => {
        const isExpanded = expandedId === review.id;
        const image = review.image_urls?.[0];

        return (
          <div
            key={review.id}
            className="bg-white rounded-xl p-4 shadow-md cursor-pointer transition-all hover:shadow-lg"
            onClick={() => setExpandedId(isExpanded ? null : review.id)}
          >
            <div className="flex gap-4 items-start">
              <img
                src={image || 'https://via.placeholder.com/64'}
                alt="User avatar"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-md font-semibold">
                    {review.reviewer?.name || review.reviewer?.username || 'Anonymous'}
                  </h3>
                  <span
                    className={clsx(
                      'text-sm font-semibold px-2 py-1 rounded-full',
                      review.recommend
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    )}
                  >
                    {review.recommend ? 'Recommended' : 'Not Recommended'}
                  </span>
                </div>

                <div className="flex gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-600 mt-2">
                  {isExpanded ? review.review : `${review.review.slice(0, 100)}...`}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(review.created_at).toLocaleDateString()}
                </p>

                {isExpanded && (
                  <div className="text-sm text-gray-700 mt-3 space-y-1">
                    <p><strong>Overall Experience:</strong> {review.overall_experience}/5</p>
                    <p><strong>Communication:</strong> {review.communication}/5</p>
                    <p><strong>Reliability:</strong> {review.reliability}/5</p>
                    <p><strong>Travel Compatibility:</strong> {review.travel_compatibility}/5</p>
                    <p><strong>Respect & Consideration:</strong> {review.respect_consideration}/5</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
