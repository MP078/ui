import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '../ui/button';

interface ReviewFormProps {
  tripDetails: {
    buddyName: string;
    location: string;
    startDate: string;
    endDate: string;
    buddyImage: string;
  };
  onSubmit: (review: ReviewData) => void;
}

interface ReviewData {
  communication: number;
  reliability: number;
  friendliness: number;
  travelCompatibility: number;
  overallExperience: number;
  comment: string;
  photos?: File[];
}

export function ReviewForm({ tripDetails, onSubmit }: ReviewFormProps) {
  const [review, setReview] = useState<ReviewData>({
    communication: 0,
    reliability: 0,
    friendliness: 0,
    travelCompatibility: 0,
    overallExperience: 0,
    comment: '',
    photos: []
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ReviewData, string>>>({});

  const categories = [
    { key: 'communication' as const, label: 'Communication' },
    { key: 'reliability' as const, label: 'Reliability' },
    { key: 'friendliness' as const, label: 'Friendliness' },
    { key: 'travelCompatibility' as const, label: 'Travel compatibility' },
    { key: 'overallExperience' as const, label: 'Overall experience' }
  ];

  const handleRatingChange = (category: keyof ReviewData, rating: number) => {
    setReview(prev => ({ ...prev, [category]: rating }));
    if (errors[category]) {
      setErrors(prev => ({ ...prev, [category]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: Partial<Record<keyof ReviewData, string>> = {};
    categories.forEach(({ key }) => {
      if (review[key] === 0) {
        newErrors[key] = 'Please provide a rating';
      }
    });

    if (review.comment.trim().length < 10) {
      newErrors.comment = 'Please provide a detailed review (minimum 10 characters)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(review);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setReview(prev => ({ ...prev, photos: [...(prev.photos || []), ...files] }));
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={tripDetails.buddyImage}
          alt={tripDetails.buddyName}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">{tripDetails.buddyName}</h3>
          <p className="text-gray-600">{tripDetails.location}</p>
          <p className="text-sm text-gray-500">
            {tripDetails.startDate} - {tripDetails.endDate}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {categories.map(({ key, label }) => (
          <div key={key} className="space-y-2">
            <div className="flex items-center justify-between">
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
                        star <= review[key]
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            {errors[key] && (
              <p className="text-sm text-red-500">{errors[key]}</p>
            )}
          </div>
        ))}

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Your review
          </label>
          <textarea
            value={review.comment}
            onChange={(e) => setReview(prev => ({ ...prev, comment: e.target.value }))}
            placeholder="Share your experience travelling with Alex..."
            maxLength={500}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
          />
          {errors.comment && (
            <p className="text-sm text-red-500">{errors.comment}</p>
          )}
          <p className="text-sm text-gray-500">
            {review.comment.length}/500 characters
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('photo-upload')?.click()}
            className="flex items-center gap-2"
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
          <Button type="submit">
            Submit review
          </Button>
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
      </form>
    </div>
  );
}