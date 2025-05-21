import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import { api } from '../../lib/api';

interface ReviewFormProps {
  type: 'buddy';
  tripDetails: {
    tripId: string;
    destination: string;
    startDate: string;
    endDate: string;
    buddyName: string;
    buddyImage: string;
    buddyUsername: string;
  };
  onSubmit: (review: ReviewData) => void;
}

interface ReviewData {
  type: 'buddy';
  tripId: string;
  buddyUsername: string;
  ratings: Record<string, number>;
  comment: string;
  photos?: File[];
  recommendation?: boolean;
}

const ratingCategories = [
  { key: 'overall', label: 'Overall Experience' },
  { key: 'communication', label: 'Communication' },
  { key: 'reliability', label: 'Reliability' },
  { key: 'compatibility', label: 'Travel Compatibility' },
  { key: 'respect', label: 'Respect & Consideration' }
];

export function ReviewForm({ type, tripDetails, onSubmit }: ReviewFormProps) {
  const [review, setReview] = useState<ReviewData>({
    type,
    tripId: tripDetails.tripId,
    buddyUsername: tripDetails.buddyUsername,
    ratings: {},
    comment: '',
    photos: [],
    recommendation: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Check ratings
    ratingCategories.forEach(category => {
      if (!review.ratings[category.key]) {
        newErrors[`rating_${category.key}`] = `Please rate ${category.label}`;
      }
    });

    // Check comment
    if (review.comment.length < 2) {
      newErrors.comment = 'Please provide a more detailed review (minimum 2 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('rateable_type', 'User');
    formData.append('rateable_id', review.buddyUsername); // must be the username
    formData.append('value', review.ratings['overall'] ? String(review.ratings['overall']) : '');
    formData.append('overall_experience', review.ratings['overall'] ? String(review.ratings['overall']) : '');
    formData.append('communication', review.ratings['communication'] ? String(review.ratings['communication']) : '');
    formData.append('reliability', review.ratings['reliability'] ? String(review.ratings['reliability']) : '');
    formData.append('travel_compatibility', review.ratings['compatibility'] ? String(review.ratings['compatibility']) : '');
    formData.append('respect_consideration', review.ratings['respect'] ? String(review.ratings['respect']) : '');
    formData.append('review', review.comment);
    formData.append('recommend', review.recommendation === true ? 'true' : 'false');
    if (review.photos && review.photos.length > 0) {
      review.photos.forEach((file) => formData.append('images[]', file));
    }

    try {
      // Use centralized api if available, otherwise fallback to fetch
      let response;
      if (api && typeof api.post === 'function') {
        response = await api.post('/ratings', formData, {
          headers: { 'Content-Type': undefined }, // Let browser set boundary for FormData
          withCredentials: true,
        });
        if (response.status && response.status >= 400) {
          throw new Error(response.data?.error || (response.data?.errors && response.data.errors[0]) || 'Failed to submit review');
        }
      } else {
        response = await fetch('/ratings', {
          method: 'POST',
          credentials: 'include',
          body: formData
        });
        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error || (data.errors && data.errors[0]) || 'Failed to submit review');
        }
      }
      onSubmit(review);
    } catch (error) {
      console.error('Error submitting review:', error);
      setErrors(prev => ({ ...prev, submit: 'Failed to submit review. Please try again.' }));
    }
  };

  const handleRatingChange = (category: string, rating: number) => {
    setReview(prev => {
      const updated = {
        ...prev,
        ratings: {
          ...prev.ratings,
          [category]: rating
        }
      };
      // Log the review state as JSON after each rating change
      console.log('Review JSON:', {
        ...updated,
        photos: updated.photos ? updated.photos.map(f => f.name) : []
      });
      return updated;
    });
    if (errors[`rating_${category}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`rating_${category}`];
        return newErrors;
      });
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setReview(prev => {
      const updated = {
        ...prev,
        photos: [...(prev.photos || []), ...files]
      };
      // Log the review state as JSON after photo upload
      console.log('Review JSON:', {
        ...updated,
        photos: updated.photos ? updated.photos.map(f => f.name) : []
      });
      return updated;
    });
  };

  // Log the review state as JSON on every input change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setReview(prev => {
      const updated = { ...prev, comment: value };
      console.log('Review JSON:', {
        ...updated,
        photos: updated.photos ? updated.photos.map(f => f.name) : []
      });
      return updated;
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Trip Info */}
      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <div>
          <h3 className="font-medium">{tripDetails.destination}</h3>
          <p className="text-sm text-gray-600">
            {tripDetails.startDate} - {tripDetails.endDate}
          </p>
        </div>
      </div>

      {/* Rating Categories */}
      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-4">
        {ratingCategories.map(({ key, label }) => (
          <div key={key}>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">{label}</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(key, star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= (review.ratings[key] || 0)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            {errors[`rating_${key}`] && (
              <p className="text-sm text-red-500">{errors[`rating_${key}`]}</p>
            )}
          </div>
        ))}
      </div>

      {/* Review Text */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Review
        </label>
        <textarea
          value={review.comment}
          onChange={handleInputChange}
          placeholder="Share your experience traveling with this buddy..."
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
        />
        {errors.comment && (
          <p className="text-sm text-red-500 mt-1">{errors.comment}</p>
        )}
      </div>

      {/* Recommendation */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Would you recommend traveling with this buddy again?
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setReview(prev => {
              const updated = { ...prev, recommendation: true };
              console.log('Review JSON:', {
                ...updated,
                photos: updated.photos ? updated.photos.map(f => f.name) : []
              });
              return updated;
            })}
            className={`flex-1 py-2 rounded-lg border transition-colors ${
              review.recommendation
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 hover:border-green-500/50'
            }`}
          >
            Yes, I recommend
          </button>
          <button
            type="button"
            onClick={() => setReview(prev => {
              const updated = { ...prev, recommendation: false };
              console.log('Review JSON:', {
                ...updated,
                photos: updated.photos ? updated.photos.map(f => f.name) : []
              });
              return updated;
            })}
            className={`flex-1 py-2 rounded-lg border transition-colors ${
              review.recommendation === false
                ? 'border-red-500 bg-red-50 text-red-700'
                : 'border-gray-200 hover:border-red-500/50'
            }`}
          >
            No, I don't recommend
          </button>
        </div>
      </div>

      {/* Photo Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add Photos (optional)
        </label>
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('photo-upload')?.click()}
          >
            Add Photos
          </Button>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handlePhotoUpload}
          />
        </div>
        {review.photos && review.photos.length > 0 && (
          <div className="flex gap-2 mt-4">
            {review.photos.map((photo, index) => (
              <div key={index} className="relative w-20 h-20">
                <img
                  src={URL.createObjectURL(photo)}
                  alt={`Review photo ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {errors.submit && (
        <p className="text-sm text-red-500 text-center">{errors.submit}</p>
      )}

      {/* Submit Button */}
      <Button type="submit" className="w-full">
        Submit Review
      </Button>
    </form>
  );
}