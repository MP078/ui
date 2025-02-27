import React from 'react';
import { X } from 'lucide-react';
import { ReviewForm } from './ReviewForm';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripDetails: {
    buddyName: string;
    location: string;
    startDate: string;
    endDate: string;
    buddyImage: string;
  };
  onSubmit: (review: any) => void;
}

export function ReviewModal({ isOpen, onClose, tripDetails, onSubmit }: ReviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 relative">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Review your travel buddy</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <ReviewForm
            tripDetails={tripDetails}
            onSubmit={(review) => {
              onSubmit(review);
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}