import React from 'react';
import { Star } from 'lucide-react';

interface RatingSummaryProps {
  ratings: {
    '5': number;
    '4': number;
    '3': number;
    '2': number;
    '1': number;
  };
  totalReviews: number;
}

export function RatingSummary({ ratings, totalReviews }: RatingSummaryProps) {
  const calculatePercentage = (count: number) => {
    return (count / totalReviews) * 100;
  };

  const calculateAverageRating = () => {
    const total = Object.entries(ratings).reduce((acc, [rating, count]) => {
      return acc + Number(rating) * count;
    }, 0);
    return (total / totalReviews).toFixed(1);
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="font-semibold mb-4">Rating Summary</h3>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="text-4xl font-bold">{calculateAverageRating()}</div>
        <div>
          <div className="flex items-center gap-1 mb-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-5 h-5 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">{totalReviews} reviews</p>
        </div>
      </div>

      <div className="space-y-3">
        {[5, 4, 3, 2, 1].map((rating) => (
          <div key={rating} className="flex items-center gap-2">
            <div className="flex items-center gap-1 w-24">
              <span className="text-sm">{rating}</span>
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 rounded-full"
                style={{ width: `${calculatePercentage(ratings[rating as keyof typeof ratings])}%` }}
              />
            </div>
            <div className="w-12 text-right text-sm text-gray-500">
              {ratings[rating as keyof typeof ratings]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}