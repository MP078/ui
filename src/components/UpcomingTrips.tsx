import React from 'react';
import { Calendar, Users } from 'lucide-react';

interface TripProps {
  title: string;
  date: string;
  people: number;
  image: string;
}

const trips: TripProps[] = [
  {
    title: 'Everest Base Camp Trek',
    date: 'March 15 - March 28',
    people: 15,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa'
  },
  {
    title: 'Mardi Trek',
    date: 'April 1 - April 8',
    people: 10,
    image: 'https://images.unsplash.com/photo-1585938389612-a552a28d6914'
  },
  {
    title: 'Lumbini',
    date: 'May 15 - May 20',
    people: 5,
    image: 'https://images.unsplash.com/photo-1582654454409-778f6619ddc6'
  }
];

export default function UpcomingTrips() {
  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Upcoming Trips</h2>
        <button className="text-gray-500 text-sm">More...</button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {trips.map((trip, index) => (
          <div key={index} className="min-w-[280px] bg-white rounded-lg overflow-hidden border">
            <img 
              src={trip.image} 
              alt={trip.title} 
              className="w-full h-36 object-cover"
            />
            <div className="p-4">
              <h3 className="font-medium text-lg">{trip.title}</h3>
              <div className="flex items-center gap-2 text-gray-600 mt-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{trip.date}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 mt-1">
                <Users className="w-4 h-4" />
                <span className="text-sm">{trip.people} People</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}