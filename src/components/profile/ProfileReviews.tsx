import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    destination: 'Everest Base Camp Trek',
    rating: 5,
    comment: "An incredible journey with breathtaking views. The guide was extremely knowledgeable and helpful.",
    date: "March 15, 2024",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa"
  },
  {
    id: 2,
    destination: 'Annapurna Circuit',
    rating: 4,
    comment: "Beautiful trek with amazing mountain views. Well organized and great support team.",
    date: "February 1, 2024",
    image: "https://images.unsplash.com/photo-1585938389612-a552a28d6914"
  }
];

export default function ProfileReviews() {
  return (
    <div className="space-y-6">
      {reviews.map(review => (
        <div key={review.id} className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex gap-4">
            <img
              src={review.image}
              alt={review.destination}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-medium text-lg">{review.destination}</h3>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mt-2">{review.comment}</p>
              <p className="text-sm text-gray-500 mt-2">{review.date}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}