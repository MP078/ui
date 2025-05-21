import React, { useState, useEffect } from 'react';
import { Star, X } from 'lucide-react';
import clsx from 'clsx';
import { Dialog } from '@headlessui/react';
import { api } from '../../lib/api';
import { getAvatarNumber } from '../../context/UserContext';
import { ImageCarousel } from './ImageCarousel';

function getAvatarUrl({ id, username, image_url, profile_image }: { id?: string; username?: string; image_url?: string; profile_image?: string }) {
  if (image_url) return image_url;
  if (profile_image) return profile_image;
  if (id) return `/avatars/${getAvatarNumber(id.toString())}.png`;
  if (username) return `/avatars/${getAvatarNumber(username)}.png`;
  return 'https://via.placeholder.com/64';
}

interface Reviewer {
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
  const [selectedReview, setSelectedReview] = useState<UserReview | null>(null);
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reviewerAvatars, setReviewerAvatars] = useState<Record<string, string>>({});
  const [fetchingAvatars, setFetchingAvatars] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!username) return;
    setLoading(true);
    setError(null);
    api
      .get(`/ratings?username=${encodeURIComponent(username)}`)
      .then((res) => {
        const reviewsArr = Array.isArray(res.data) ? res.data : res.data?.data || [];
        setReviews(reviewsArr);
      })
      .catch((err) => setError(err.message || 'Failed to fetch reviews'))
      .finally(() => setLoading(false));
  }, [username]);

  useEffect(() => {
    const uniqueReviewers = Array.from(new Set(reviews.map(r => r.reviewer?.username).filter(Boolean)));
    uniqueReviewers.forEach((reviewerUsername) => {
      if (!reviewerUsername || reviewerAvatars[reviewerUsername] || fetchingAvatars[reviewerUsername]) return;
      setFetchingAvatars(prev => ({ ...prev, [reviewerUsername]: true }));
      api.get(`/users/${encodeURIComponent(reviewerUsername)}`)
        .then(res => {
          const user = res.data?.data || {};
          setReviewerAvatars(prev => ({
            ...prev,
            [reviewerUsername]: getAvatarUrl({
              id: user.id,
              username: user.username,
              image_url: user.image_url,
              profile_image: user.profile_image,
            })
          }));
        })
        .catch(() => {
          setReviewerAvatars(prev => ({
            ...prev,
            [reviewerUsername]: getAvatarUrl({ username: reviewerUsername })
          }));
        })
        .finally(() => {
          setFetchingAvatars(prev => ({ ...prev, [reviewerUsername]: false }));
        });
    });
  }, [reviews]);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      {reviews.length === 0 && <div className="text-gray-500">No reviews found.</div>}
      {reviews.map((review) => {
        const reviewerUsername = review.reviewer?.username;
        const avatarUrl = reviewerUsername ? reviewerAvatars[reviewerUsername] : undefined;
        const image = avatarUrl || 'https://via.placeholder.com/64';

        return (
          <div
            key={review.id}
            className="bg-white rounded-xl p-4 shadow-md cursor-pointer transition-all hover:shadow-lg"
            onClick={() => setSelectedReview(review)}
          >
            <div className="flex gap-4 items-start">
              <img
                src={image}
                alt="User avatar"
                className="w-16 h-16 rounded-full object-cover border border-gray-200"
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
                      className={`w-4 h-4 ${i < review.value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>

                <p className="text-gray-600 mt-2">
                  {`${review.review.slice(0, 100)}${review.review.length > 100 ? '...' : ''}`}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        );
      })}

      {/* MODAL */}
      <Dialog open={!!selectedReview} onClose={() => setSelectedReview(null)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel
            className="bg-white max-w-2xl w-full rounded-2xl shadow-xl p-0 relative"
            style={{ maxHeight: '80vh', minHeight: '320px', display: 'flex', flexDirection: 'column' }}
          >
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black z-10"
            >
              <X className="w-6 h-6" />
            </button>
            {selectedReview && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Reviewer Avatar + Name */}
                <div className="flex items-center gap-3">
                  <img
                    src={reviewerAvatars[selectedReview.reviewer.username] || 'https://via.placeholder.com/64'}
                    alt="Reviewer"
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                  <div className="text-sm font-semibold text-gray-700">
                    {selectedReview.reviewer.name || selectedReview.reviewer.username}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <span className="text-gray-500 text-xs flex items-center gap-1">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(selectedReview.created_at).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                  <span
                    className={clsx(
                      'inline-block text-xs font-medium px-3 py-1 rounded-full',
                      selectedReview.recommend
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    )}
                  >
                    {selectedReview.recommend ? 'Recommended' : 'Not Recommended'}
                  </span>
                </div>

                <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line">{selectedReview.review}</p>

                {/* Ratings */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 bg-gray-50 rounded-lg p-4">
                  {[
                    { label: 'Overall', value: selectedReview.overall_experience },
                    { label: 'Communication', value: selectedReview.communication },
                    { label: 'Reliability', value: selectedReview.reliability },
                    { label: 'Compatibility', value: selectedReview.travel_compatibility },
                    { label: 'Respect', value: selectedReview.respect_consideration },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center gap-3">
                      <span className="w-28 text-gray-700 font-medium">{label}</span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Image Carousel */}
                <ImageCarousel imageUrls={selectedReview.image_urls} />
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
