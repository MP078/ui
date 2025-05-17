import React, { useState, useEffect } from "react";
import { X, Calendar, Users, MapPin, DollarSign } from "lucide-react";
import { Trip } from "../../types/trip";
import { formatDate } from "../../utils/date";
import { Button } from "../ui/button";
import { ConfirmationDialog } from "../ui/confirmation-dialog";
// Import TripOrganizers if needed in future
// import { TripOrganizers } from "./TripOrganizers";

interface TripDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip;
}

export function TripDetailModal({
  isOpen,
  onClose,
  trip,
}: TripDetailModalProps) {
  const [showLeaveConfirmation, setShowLeaveConfirmation] = useState(false);
  const [showOrganizerSection, setShowOrganizerSection] = useState(false);

  // ESC key handler
  useEffect(() => {
    if (!isOpen) return;

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscKey);

    // Prevent scrolling on the background
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Click outside handler
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleLeaveTrip = () => {
    setShowLeaveConfirmation(true);
  };

  const confirmLeaveTrip = () => {
    console.log("Leaving trip:", trip.id);
    setShowLeaveConfirmation(false);
    onClose();
  };

  const currentUser = "current_username"; // Replace with actual current user
  const isOrganizer = trip.organizers?.some(
    (org) => org.username === currentUser
  );

  if (!isOpen) return null;

  // Ensure trip data or provide defaults
  const tripId = trip.id
    ? String(trip.id).substring(0, 6).toUpperCase()
    : "??????";
  const tripDestination =
    trip.destination || trip.title || "Unknown Destination";
  const tripDescription =
    trip.description || "No description provided for this trip.";
  const tripHighlights = trip.highlights || [];
  const tripCost = trip.cost || "Not specified";
  const tripMembersCount = trip.members_count || 0;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6 overflow-y-auto"
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto my-auto mx-auto relative">
          <div className="sticky top-0 z-10 flex justify-end p-4 bg-gradient-to-b from-black/50 to-transparent">
            <button
              onClick={onClose}
              className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Hero Image */}
          <div className="h-full sm:h-64 relative">
            <img
              src={trip.cover_image_url || `/placeholders/trip.png`}
              alt={tripDestination}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-6 text-white">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                {tripDestination}
              </h2>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Trip ID: T{tripId}</span>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {/* Trip Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Duration</span>
                </div>
                {trip.start_date && trip.end_date ? (
                  <p className="font-medium">
                    {formatDate(trip.start_date)} - {formatDate(trip.end_date)}
                  </p>
                ) : (
                  <p className="text-gray-500 italic text-sm">
                    Dates not specified
                  </p>
                )}
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Travelers</span>
                </div>
                <p className="font-medium">
                  {tripMembersCount > 0
                    ? `${tripMembersCount} People`
                    : "No travelers yet"}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm">Total Cost</span>
                </div>
                <p className="font-medium">{tripCost}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-gray-600">{tripDescription}</p>
            </div>

            {/* Highlights */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Trip Highlights</h3>
              {tripHighlights.length > 0 ? (
                <ul className="list-disc list-inside text-gray-600">
                  {tripHighlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">
                  No highlights have been added for this trip.
                </p>
              )}
            </div>

            {/* Organizers & Travel Buddies Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Trip Members</h3>
                {isOrganizer && (
                  <Button
                    variant="outline"
                    onClick={() =>
                      setShowOrganizerSection(!showOrganizerSection)
                    }
                  >
                    {showOrganizerSection
                      ? "View Members"
                      : "Manage Organizers"}
                  </Button>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center border-t pt-6">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <div className="flex gap-4">
                {trip.status === "completed" &&
                  trip.review_status === "pending" && (
                    <Button>Write Review</Button>
                  )}
                {trip.status === "upcoming" && (
                  <Button
                    variant="outline"
                    className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
                    onClick={handleLeaveTrip}
                  >
                    Leave Trip
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={showLeaveConfirmation}
        onClose={() => setShowLeaveConfirmation(false)}
        onConfirm={confirmLeaveTrip}
        title="Leave Trip"
        message={`Are you sure you want to leave the trip to ${tripDestination}? This action cannot be undone.`}
        confirmText="Leave Trip"
        type="danger"
      />
    </>
  );
}
