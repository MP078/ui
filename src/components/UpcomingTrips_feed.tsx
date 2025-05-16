import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { upcomingTrips } from '../data/upcomingtrips';
import { formatDate } from '../utils/date';

export default function UpcomingTrips() {
  const [showAll, setShowAll] = useState(false);

  const displayedTrips = showAll ? upcomingTrips : upcomingTrips.slice(0, 3);

  const isScrollable = showAll && upcomingTrips.length > 8;

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm w-full max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-medium text-gray-800">Upcoming Trips</h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          {showAll ? 'Less' : 'More...'}
        </button>
      </div>

      <ul
        className={`space-y-3 ${isScrollable ? 'max-h-[480px] overflow-y-auto pr-1' : ''}`}
      >
        {displayedTrips.map((trip) => (
          <li key={trip.tripId} className="flex items-start gap-3">
            {/* Icon Container */}
            <div className="bg-gray-100 text-gray-600 p-2 rounded-md">
              <Calendar className="w-4 h-4 text-brand-orange" />
            </div>

            {/* Trip Details */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800">
                {trip.destination}
              </h3>
              <p className="text-xs text-gray-500">
                {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
              </p>
              <p className="text-xs text-gray-500">{trip.totalTravelers} people</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
