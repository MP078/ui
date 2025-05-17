import { X, Calendar, DollarSign } from "lucide-react";

interface TripSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripDestination: string;
  cost: string;
  total_days: string;
  highlights: string[];
  photos: string[];
}

export function TripSummaryModal({
  isOpen,
  onClose,
  total_days,
  cost,
  tripDestination,
  highlights,
  photos,
}: TripSummaryModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg w-full max-w-lg mx-4">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 id="modal-title" className="text-xl font-semibold">
            Trip Summary: {tripDestination}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Calendar className="w-6 h-6 text-brand-orange" />
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">{total_days} Days</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-brand-orange" />
              <div>
                <p className="text-sm text-gray-500">Total Cost</p>
                <p className="font-medium">${cost}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Trip Highlights</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-3">Photos</h3>
            <div className="grid grid-cols-3 gap-2">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden"
                >
                  <img
                    src={photo}
                    alt={`Trip photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
