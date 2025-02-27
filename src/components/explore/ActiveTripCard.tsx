import React, { useState } from 'react';
import { Users, Calendar, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { ConfirmationDialog } from '../ui/confirmation-dialog';

interface ActiveTripCardProps {
  trip: {
    id: string;
    title: string;
    location: string;
    startDate: string;
    duration: string;
    participants: number;
    maxParticipants: number;
    image: string;
    status: 'open' | 'full' | 'in-progress';
  };
  onJoinRequest: (id: string) => void;
}

export function ActiveTripCard({ trip, onJoinRequest }: ActiveTripCardProps) {
  const [showJoinConfirmation, setShowJoinConfirmation] = useState(false);
  const isJoinable = trip.status === 'open' && trip.participants < trip.maxParticipants;

  return (
    <>
      <div className="bg-white rounded-lg overflow-hidden shadow-sm">
        <div className="relative">
          <img
            src={trip.image}
            alt={trip.title}
            className="w-full h-48 object-cover"
          />
          <div className={`
            absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium
            ${trip.status === 'open' ? 'bg-green-100 text-green-800' :
              trip.status === 'full' ? 'bg-red-100 text-red-800' :
              'bg-blue-100 text-blue-800'}
          `}>
            {trip.status === 'open' ? 'Open' :
             trip.status === 'full' ? 'Full' : 'In Progress'}
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-semibold text-lg mb-2">{trip.title}</h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{trip.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{trip.startDate} • {trip.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-4 h-4" />
              <span>{trip.participants}/{trip.maxParticipants} participants</span>
            </div>
          </div>

          <Button
            onClick={() => isJoinable && setShowJoinConfirmation(true)}
            disabled={!isJoinable}
            className="w-full"
          >
            {isJoinable ? 'Request to Join' :
             trip.status === 'full' ? 'Trip Full' : 'In Progress'}
          </Button>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={showJoinConfirmation}
        onClose={() => setShowJoinConfirmation(false)}
        onConfirm={() => onJoinRequest(trip.id)}
        title="Join Trip Request"
        message={`Would you like to request to join "${trip.title}"? The trip organizer will review your request.`}
        confirmText="Send Request"
        type="info"
      />
    </>
  );
}