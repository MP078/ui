import { useState } from "react";
import { MapPin, Users, Calendar, Eye } from "lucide-react";
import { Button } from "../ui/button";
import { ConfirmationDialog } from "../ui/confirmation-dialog";
import { TripSummaryModal } from "../trips/TripSummaryModal";

interface ActiveTripCardProps {
  trip: {
    tripId: string;
    destination: string;
    startDate: string;
    endDate: string;
    tripStatus: "open" | "full";
    totalTravelers: number;
    maxParticipants: number;
    imageUrl: string;
    highlights: string[];
    cost: string;
    photo_urls: string[];
  };
  onJoinRequest: (id: string) => void;
}

export function ActiveTripCard({ trip, onJoinRequest }: ActiveTripCardProps) {
  const [showJoinConfirmation, setShowJoinConfirmation] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [isRequested, setIsRequested] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  const duration = Math.ceil(
    (new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const isJoinable = () => {
    return (
      trip.tripStatus === "open" && trip.totalTravelers < trip.maxParticipants
    );
  };

  const handleJoinClick = () => {
    if (isRequested) {
      setShowCancelConfirmation(true);
    } else {
      setShowJoinConfirmation(true);
    }
  };

  const handleConfirmJoin = () => {
    setIsRequested(true);
    onJoinRequest(trip.tripId);
    setShowJoinConfirmation(false);
  };

  const handleConfirmCancel = () => {
    setIsRequested(false);
    onJoinRequest(trip.tripId); // Assuming same function handles cancel logic
    setShowCancelConfirmation(false);
  };

  const getButtonText = () => {
    if (isRequested) return "Cancel Request";
    if (!isJoinable()) return "Trip Full";
    return "Request to Join";
  };

  const getButtonStyle = () => {
    if (isRequested) {
      return "hover:bg-red-50 hover:text-red-600 hover:border-red-200";
    }
    return "";
  };

  return (
    <>
      <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:border-orange-500/50 hover:shadow-md transition-all duration-200">
        <div className="relative h-48">
          <img
            src={trip.imageUrl}
            alt={`Image of ${trip.destination}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                isJoinable()
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {isJoinable() ? "Open" : "Full"}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-semibold text-lg mb-2">{trip.destination}</h3>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>Trip ID: T{trip.tripId.slice(0, 6).toUpperCase()}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(trip.startDate).toLocaleDateString()} • {duration}{" "}
                days
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-4 h-4" />
              <span>
                {trip.totalTravelers}/{trip.maxParticipants} participants
              </span>
            </div>
          </div>

          {trip && (
            <div className="mb-4">
              <Button
                variant="ghost"
                onClick={() => setShowSummaryModal(true)}
                className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors p-0 h-auto"
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm">View Highlights</span>
              </Button>
            </div>
          )}

          <Button
            onClick={handleJoinClick}
            disabled={!isJoinable() && !isRequested}
            variant={isRequested ? "outline" : "default"}
            className={`w-full ${getButtonStyle()}`}
          >
            {getButtonText()}
          </Button>
        </div>
      </div>

      {trip && (
        <TripSummaryModal
          isOpen={showSummaryModal}
          onClose={() => setShowSummaryModal(false)}
          tripDestination={trip.destination}
          total_days={duration}
          total_cost={trip.totalTravelers}
          highlights={[]}
          photos={[]}
        />
      )}

      <ConfirmationDialog
        isOpen={showJoinConfirmation}
        onClose={() => setShowJoinConfirmation(false)}
        onConfirm={handleConfirmJoin}
        title="Join Trip Request"
        message={`Would you like to request to join "${trip.destination}"? The trip organizer will review your request.`}
        confirmText="Send Request"
        type="info"
      />

      <ConfirmationDialog
        isOpen={showCancelConfirmation}
        onClose={() => setShowCancelConfirmation(false)}
        onConfirm={handleConfirmCancel}
        title="Cancel Join Request"
        message={`Are you sure you want to cancel your request to join "${trip.destination}"?`}
        confirmText="Cancel Request"
        type="warning"
      />
    </>
  );
}
