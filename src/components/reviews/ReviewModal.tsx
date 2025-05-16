import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ReviewForm } from './ReviewForm';
import { travelHistory } from '../../data/upcomingtrips';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripId?: string;
  onSubmit: (reviewData: any) => void;
}

export function ReviewModal({ isOpen, onClose, tripId, onSubmit }: ReviewModalProps) {
  const [selectedBuddyIndex, setSelectedBuddyIndex] = useState<number | null>(null);

  // Reset selection when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setSelectedBuddyIndex(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const trip = travelHistory.find(t => t.tripId === tripId);
  const travelBuddies = trip?.travelBuddies || [];

  const handleSubmit = async (reviewData: any) => {
    if (selectedBuddyIndex === null || !travelBuddies[selectedBuddyIndex]) {
      console.error('No travel buddy selected');
      return;
    }

    try {
      await onSubmit({
        ...reviewData,
        buddyName: travelBuddies[selectedBuddyIndex].name,
        buddyImage: travelBuddies[selectedBuddyIndex].image,
        buddyUsername: travelBuddies[selectedBuddyIndex].username
      });
      onClose();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto"
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 my-8 relative">
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b rounded-t-lg">
          <h2 id="modal-title" className="text-xl font-semibold">Review Travel Buddy</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          {/* Buddy Selection */}
          {selectedBuddyIndex === null ? (
            <div className="space-y-4">
              <h3 className="font-medium text-lg mb-4">Select a travel buddy to review</h3>
              {travelBuddies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2">
                  {travelBuddies.map((buddy, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedBuddyIndex(index)}
                      className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-brand-orange/50 hover:bg-gray-50 transition-all text-left"
                    >
                      <img
                        src={buddy.image}
                        alt={buddy.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium">{buddy.name}</div>
                        <div className="text-sm text-gray-500">Travel Partner</div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No travel buddies available to review.</p>
              )}
            </div>
          ) : (
            trip && travelBuddies[selectedBuddyIndex] && (
              <>
                {/* Selected Buddy Info */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg mb-6">
                  <img
                    src={travelBuddies[selectedBuddyIndex].image}
                    alt={travelBuddies[selectedBuddyIndex].name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium">
                      {travelBuddies[selectedBuddyIndex].name}
                    </div>
                    <div className="text-sm text-gray-500">Travel Partner</div>
                  </div>
                  <button
                    onClick={() => setSelectedBuddyIndex(null)}
                    className="ml-auto text-sm text-brand-orange hover:text-brand-orange/80"
                  >
                    Change
                  </button>
                </div>

                {/* Review Form */}
                <div className="overflow-y-auto">
                  <ReviewForm
                    type="buddy"
                    tripDetails={{
                      tripId: trip.tripId,
                      destination: trip.destination,
                      startDate: trip.startDate,
                      endDate: trip.endDate,
                      buddyName: travelBuddies[selectedBuddyIndex].name,
                      buddyImage: travelBuddies[selectedBuddyIndex].image,
                      buddyUsername: travelBuddies[selectedBuddyIndex].username
                    }}
                    onSubmit={handleSubmit}
                  />
                </div>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
}