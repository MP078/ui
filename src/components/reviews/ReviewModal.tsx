
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ReviewForm } from './ReviewForm';

import { getAvatarUrl } from '../../utils/avatar';
import { travelHistory } from '../../data/upcomingtrips';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: any; // Pass the full trip object
  currentUserId: string; // Or currentUsername
  onSubmit: (reviewData: any) => void;
}

export function ReviewModal({ isOpen, onClose, trip, currentUserId, onSubmit }: ReviewModalProps) {
  const [selectedBuddyIndex, setSelectedBuddyIndex] = useState<number | null>(null);

  // Reset selection when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setSelectedBuddyIndex(null);
    }
  }, [isOpen]);

  if (!isOpen || !trip) return null;

  // Combine members and organizers, remove duplicates, filter out current user
  // Also ensure we have image and username for each member
  const allMembers = [
    ...((trip.members || []).map((m: any) => ({
      id: m.id,
      name: m.name || m.username || m.displayName || 'Unknown',
      username: m.username || '',
      image: m.avatar_url
    }))),
    ...((trip.organizers || []).map((m: any) => ({
      id: m.id,
      name: m.name || m.username || m.displayName || 'Unknown',
      username: m.username || '',
      image: getAvatarUrl({
        id: m.id,
        username: m.username || m.name || '',
        image_url: m.image_url,
        profile_image: m.image
      })
    })))
  ];
  // Remove duplicates by id and filter out current user
  const uniqueMembers = allMembers.filter(
    (member, idx, arr) =>
      arr.findIndex(m => m.id === member.id) === idx && member.id !== currentUserId
  );

  const handleSubmit = async (reviewData: any) => {
    if (selectedBuddyIndex === null || !uniqueMembers[selectedBuddyIndex]) {
      console.error('No travel buddy selected');
      return;
    }

    try {
      await onSubmit({
        ...reviewData,
        buddyName: uniqueMembers[selectedBuddyIndex].name,
        buddyImage: uniqueMembers[selectedBuddyIndex].image,
        buddyUsername: uniqueMembers[selectedBuddyIndex].username
      });
      onClose();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-lg w-full max-w-2xl mx-4 my-8 relative flex flex-col"
        style={{ maxHeight: '90vh', height: 'auto', minHeight: 320 }}
      >
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b rounded-t-lg">
          <h2 id="modal-title" className="text-xl font-semibold">Review Travel Buddy</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {/* Buddy Selection */}
          {selectedBuddyIndex === null ? (
            <div className="space-y-4">
              <h3 className="font-medium text-lg mb-4">Select a travel buddy to review</h3>
              {uniqueMembers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2">
                  {uniqueMembers.map((buddy, index) => (
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
            trip && uniqueMembers[selectedBuddyIndex] && (
              <>
                {/* Selected Buddy Info */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg mb-6">
                  <img
                    src={uniqueMembers[selectedBuddyIndex].image}
                    alt={uniqueMembers[selectedBuddyIndex].name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium">
                      {uniqueMembers[selectedBuddyIndex].name}
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
                <ReviewForm
                  type="buddy"
                  tripDetails={{
                    tripId: trip.tripId,
                    destination: trip.destination,
                    startDate: trip.startDate,
                    endDate: trip.endDate,
                    buddyName: uniqueMembers[selectedBuddyIndex].name,
                    buddyImage: uniqueMembers[selectedBuddyIndex].image,
                    buddyUsername: uniqueMembers[selectedBuddyIndex].username
                  }}
                  onSubmit={handleSubmit}
                />
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
}