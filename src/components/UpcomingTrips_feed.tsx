import React from 'react';
import { Calendar } from 'lucide-react';

interface TripProps {
  title: string;
  date: string;
  people: number;
}

const trips: TripProps[] = [
  {
    title: 'Everest Base Camp Trek',
    date: 'March 15 - March 28',
    people: 12,
  },
  {
    title: 'Mardi Trek',
    date: 'April 1 - April 5',
    people: 8,
  },
  {
    title: 'Lumbini',
    date: 'May 15 - May 20',
    people: 5,
  },
];

export default function UpcomingTrips() {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm w-full max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-medium text-gray-800">Upcoming Trips</h2>
        <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
          More...
        </button>
      </div>
      <ul className="space-y-3">
        {trips.map((trip, index) => (
          <li key={index} className="flex items-start gap-3">
            {/* Icon Container */}
            <div className="bg-gray-100 text-gray-600 p-2 rounded-md">
              <Calendar className="w-4 h-4 text-brand-orange" />
            </div>

            {/* Trip Details */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800">
                {trip.title}
              </h3>
              <p className="text-xs text-gray-500">{trip.date}</p>
              <p className="text-xs text-gray-500">{trip.people} people</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
