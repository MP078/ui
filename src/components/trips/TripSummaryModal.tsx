import { X, Calendar, DollarSign, ImageOff } from "lucide-react";
import { useEffect } from "react";

interface TripSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  total_days: number;
  total_cost: number;
  highlights: string[];
  photos: string[];
  tripDestination: string;
}

export function TripSummaryModal({
  isOpen,
  onClose,
  total_days,
  total_cost,
  highlights,
  photos,
  tripDestination,
}: TripSummaryModalProps) {
  // Handle ESC key press
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

  if (!isOpen) return null;

  // Close when clicking outside the modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4 sm:p-6"
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg w-full max-w-md md:max-w-lg max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b sticky top-0 bg-white">
          <h2
            id="modal-title"
            className="text-lg sm:text-xl font-semibold truncate"
          >
            Trip Summary: {tripDestination || "Unknown Destination"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-brand-orange flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Duration</p>
                <p className="font-medium text-sm sm:text-base">
                  {total_days > 0
                    ? `${total_days} Days`
                    : "Duration not specified"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-brand-orange flex-shrink-0" />
              <div className="flex flex-col items-start w-full">
                <p className="text-xs sm:text-sm text-gray-500">Total Cost</p>
                <p className="font-medium text-sm sm:text-base break-words text-left w-full  max-w-[180px] sm:max-w-[240px]">
                  {total_cost === 0 ? "Cost not specified" : `${total_cost}`}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2 sm:mb-3">Trip Highlights</h3>
            {highlights.length > 0 ? (
              <ul className="list-disc list-inside space-y-1.5 text-gray-600 text-sm sm:text-base">
                {highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm italic py-2">
                No highlights have been added for this trip.
              </p>
            )}
          </div>

          <div>
            <h3 className="font-medium mb-2 sm:mb-3">Photos</h3>
            {photos.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {photos.filter((photo) => typeof photo === 'string' && photo.trim() !== '').map((photo, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden bg-gray-100"
                  >
                    <img
                      src={photo}
                      alt={`Trip photo ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        if (e.currentTarget.src !== window.location.origin + '/placeholder/trip.png') {
                          e.currentTarget.src = '/placeholder/trip.png';
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-center justify-center">
                <ImageOff className="w-10 h-10 text-gray-400 mb-2" />
                <p className="text-gray-500 text-sm text-center">
                  No photos available for this trip
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
