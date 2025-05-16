import React, { useState } from 'react';
import { MoreVertical, Clock, Check, X, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { ConfirmationDialog } from '../ui/confirmation-dialog';
import { Organizer, OrganizerRequest, TravelBuddy } from '../../types/trip';

interface TripOrganizersProps {
  organizers: Organizer[];
  organizerRequests: OrganizerRequest[];
  travelBuddies: TravelBuddy[];
  createdBy: string;
  currentUser: string;
  onRequestOrganizer: () => void;
  onAcceptRequest: (username: string) => void;
  onRejectRequest: (username: string) => void;
  onRemoveOrganizer: (username: string) => void;
}

export function TripOrganizers({
  organizers,
  organizerRequests,
  travelBuddies,
  createdBy,
  currentUser,
  onRequestOrganizer,
  onAcceptRequest,
  onRejectRequest,
  onRemoveOrganizer
}: TripOrganizersProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedAction, setSelectedAction] = useState<{
    type: 'remove' | 'accept' | 'reject';
    username: string;
    name: string;
  } | null>(null);

  const isCreator = currentUser === createdBy;
  const isOrganizer = organizers.some(org => org.username === currentUser);
  const hasRequestedOrganizer = organizerRequests.some(
    req => req.username === currentUser && req.status === 'pending'
  );

  const handleAction = (type: 'remove' | 'accept' | 'reject', username: string, name: string) => {
    setSelectedAction({ type, username, name });
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    if (!selectedAction) return;

    switch (selectedAction.type) {
      case 'remove':
        onRemoveOrganizer(selectedAction.username);
        break;
      case 'accept':
        onAcceptRequest(selectedAction.username);
        break;
      case 'reject':
        onRejectRequest(selectedAction.username);
        break;
    }

    setShowConfirmation(false);
    setSelectedAction(null);
  };

  const getConfirmationMessage = () => {
    if (!selectedAction) return '';

    switch (selectedAction.type) {
      case 'remove':
        return `Are you sure you want to remove ${selectedAction.name} as an organizer?`;
      case 'accept':
        return `Accept ${selectedAction.name}'s request to become an organizer?`;
      case 'reject':
        return `Reject ${selectedAction.name}'s request to become an organizer?`;
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Organizers */}
      <div>
        <h3 className="text-lg font-medium mb-4">Trip Organizers</h3>
        <div className="space-y-3">
          {organizers.map((organizer) => (
            <div
              key={organizer.username}
              className="flex items-center justify-between bg-white p-4 rounded-lg border"
            >
              <div className="flex items-center gap-3">
                <img
                  src={organizer.image}
                  alt={organizer.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium flex items-center gap-2">
                    {organizer.name}
                    {organizer.role === 'creator' && (
                      <span className="text-xs bg-brand-orange/10 text-brand-orange px-2 py-0.5 rounded-full">
                        Creator
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Joined {new Date(organizer.joinedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              {isCreator && organizer.role !== 'creator' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleAction('remove', organizer.username, organizer.name)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Organizer Requests */}
      {isCreator && organizerRequests.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-4">Pending Requests</h3>
          <div className="space-y-3">
            {organizerRequests
              .filter(request => request.status === 'pending')
              .map((request) => (
                <div
                  key={request.username}
                  className="flex items-center justify-between bg-white p-4 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={request.image}
                      alt={request.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium">{request.name}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Requested {new Date(request.requestedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleAction('accept', request.username, request.name)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAction('reject', request.username, request.name)}
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Request to be Organizer Button */}
      {!isCreator && !isOrganizer && !hasRequestedOrganizer && (
        <Button
          onClick={onRequestOrganizer}
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
        >
          <Shield className="w-4 h-4" />
          Request to be an Organizer
        </Button>
      )}

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showConfirmation}
        onClose={() => {
          setShowConfirmation(false);
          setSelectedAction(null);
        }}
        onConfirm={handleConfirm}
        title={`Confirm ${selectedAction?.type === 'remove' ? 'Remove' : 
                        selectedAction?.type === 'accept' ? 'Accept' : 'Reject'}`}
        message={getConfirmationMessage()}
        confirmText={selectedAction?.type === 'remove' ? 'Remove' : 
                    selectedAction?.type === 'accept' ? 'Accept' : 'Reject'}
        type={selectedAction?.type === 'accept' ? 'info' : 'warning'}
      />
    </div>
  );
}