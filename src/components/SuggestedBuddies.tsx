import React, { useState } from 'react';
import { ConfirmationDialog } from '../components/ui/confirmation-dialog';
// Make sure to import the ConfirmationDialog component

interface BuddyProps {
  id: number;
  name: string;
  image: string;
  location: string;
}

const buddies: BuddyProps[] = [
  {
    id: 1,
    name: 'Rachel Green',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    location: 'Boston, USA',
  },
  {
    id: 2,
    name: 'Raj Bhandari',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    location: 'Mumbai, India',
  },
];

export default function SuggestedBuddies() {
  const [showConnectConfirmation, setShowConnectConfirmation] = useState(false);
  const [selectedTraveler, setSelectedTraveler] = useState<BuddyProps | null>(
    null
  );

  const onConnect = (travelerId: number) => {
    console.log(`Connecting with traveler ${travelerId}`);
    setShowConnectConfirmation(false); // Hide dialog after confirming
  };

  return (
    <>
      <div className="bg-white rounded-lg p-4 mt-4">
        <h3 className="font-semibold mb-4">Suggested Travel Buddies</h3>
        {buddies.map((buddy) => (
          <div
            key={buddy.id}
            className="flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-3">
              <img
                src={buddy.image}
                alt={buddy.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-medium">{buddy.name}</div>
                <div className="text-sm text-gray-600">{buddy.location}</div>
              </div>
            </div>
            <button
              className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm"
              onClick={() => {
                setSelectedTraveler(buddy); // Set the selected traveler
                setShowConnectConfirmation(true); // Show confirmation dialog
              }}
            >
              Connect
            </button>
          </div>
        ))}
      </div>

      {selectedTraveler && (
        <ConfirmationDialog
          isOpen={showConnectConfirmation}
          onClose={() => setShowConnectConfirmation(false)}
          onConfirm={() => onConnect(selectedTraveler.id)}
          title="Connect with Traveler"
          message={`Would you like to connect with ${selectedTraveler.name}? They will be notified of your request.`}
          confirmText="Send Request"
          type="info"
        />
      )}
    </>
  );
}
