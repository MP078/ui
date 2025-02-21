import React from 'react';
import { Calendar, MapPin, Users, ChevronRight } from 'lucide-react';

interface Trip {
  id: string;
  title: string;
  location: string;
  date: string;
  duration: string;
  image: string;
  participants: number;
  maxParticipants: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  description: string;
  activities: string[];
}

const trips: Trip[] = [
  {
    id: '1',
    title: 'Everest Base Camp Trek',
    location: 'Solukhumbu, Nepal',
    date: 'March 15 - March 28, 2024',
    duration: '14 days',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
    participants: 8,
    maxParticipants: 12,
    status: 'upcoming',
    description: 'Experience the ultimate Himalayan adventure with a trek to Everest Base Camp.',
    activities: ['Trekking', 'Photography', 'Camping']
  },
  {
    id: '2',
    title: 'Annapurna Circuit',
    location: 'Manang, Nepal',
    date: 'April 1 - April 15, 2024',
    duration: '15 days',
    image: 'https://images.unsplash.com/photo-1585938389612-a552a28d6914',
    participants: 6,
    maxParticipants: 10,
    status: 'upcoming',
    description: 'Complete the famous Annapurna Circuit trek through diverse landscapes.',
    activities: ['Trekking', 'Cultural Tours', 'Hot Springs']
  }
];

function TripCard({ trip }: { trip: Trip }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative">
        <img src={trip.image} alt={trip.title} className="w-full h-48 object-cover" />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium">
          {trip.status === 'upcoming' && 'Upcoming'}
          {trip.status === 'ongoing' && 'Ongoing'}
          {trip.status === 'completed' && 'Completed'}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold">{trip.title}</h3>
        
        <div className="mt-2 space-y-2">
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{trip.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">{trip.date}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {trip.participants}/{trip.maxParticipants} participants
            </span>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-gray-600">{trip.description}</p>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {trip.activities.map((activity, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
            >
              {activity}
            </span>
          ))}
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <button className="text-brand-orange hover:text-brand-orange/90 flex items-center">
            View Details
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
          <button className="bg-brand-orange text-white px-4 py-2 rounded-full text-sm">
            Join Trip
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Trips() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">My Trips</h1>
        <button className="bg-brand-orange text-white px-6 py-2 rounded-full">
          Create New Trip
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
}