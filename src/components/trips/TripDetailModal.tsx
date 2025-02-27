import React from 'react';
import { X, Calendar, Users, MapPin, DollarSign } from 'lucide-react';
import { Trip } from '../../types/trip';
import { formatDate } from '../../utils/date';
import { Button } from '../ui/button';

interface TripDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip;
}

export function TripDetailModal({ isOpen, onClose, trip }: TripDetailModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl mx-4 relative">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Image */}
        <div className="h-64 relative">
          <img
            src={trip.imageUrl}
            alt={trip.destination}
            className="w-full h-full object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-6 text-white">
            <h2 className="text-2xl font-semibold mb-2">{trip.destination}</h2>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4" />
              <span>Trip ID: {trip.tripId}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Trip Details */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Duration</span>
              </div>
              <p className="font-medium">
                {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-sm">Travelers</span>
              </div>
              <p className="font-medium">{trip.totalTravelers} People</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm">Total Cost</span>
              </div>
              <p className="font-medium">
                {trip.cost?.currency} {trip.cost?.amount}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-gray-600">{trip.description}</p>
          </div>

          {/* Highlights */}
          {trip.highlights && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">Trip Highlights</h3>
              <ul className="list-disc list-inside text-gray-600">
                {trip.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Travel Buddy */}
          {trip.travelBuddy && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">Travel Buddy</h3>
              <div className="flex items-center gap-3">
                <img
                  src={trip.travelBuddy.image}
                  alt={trip.travelBuddy.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium">{trip.travelBuddy.name}</p>
                  <p className="text-sm text-gray-600">Travel Partner</p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            {trip.status === 'completed' && trip.reviewStatus === 'pending' && (
              <Button>Write Review</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}