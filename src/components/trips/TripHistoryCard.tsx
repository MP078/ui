import { Calendar, Users, ChevronRight, Eye, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Trip } from "../../types/trip";

interface TripHistoryCardProps {
  trip: Trip;
  onViewDetails: (tripId: string) => void;
  onViewSummary: (tripId: string) => void;
  onReview: (tripId: string) => void;
}

export function TripHistoryCard({
  trip,
  onViewDetails,
  onViewSummary,
  onReview,
}: TripHistoryCardProps) {
  const showReviewButton =
    trip.status === "completed";

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "moderate":
        return "bg-yellow-100 text-yellow-800";
      case "difficult":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:border-brand-orange/50 hover:shadow-md transition-all duration-200">
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <img
          src={trip.cover_image_url || `/placeholders/trip.png`}
          alt={trip.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              trip.status === "ongoing"
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
          </span>
          {trip.difficulty && (
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                trip.difficulty
              )}`}
            >
              {trip.difficulty.charAt(0).toUpperCase() +
                trip.difficulty.slice(1)}
            </span>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">{trip.title}</h3>
            <p className="text-sm text-gray-500 mb-2">
              Trip ID: T{trip.id.slice(0, 6).toUpperCase()}
            </p>
          </div>
          {(trip.status === "upcoming" || trip.status === "ongoing") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewSummary(trip.id)}
              aria-label="View trip summary"
            >
              <Eye className="w-4 h-4" />
            </Button>
          )}
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">
              {new Date(trip.start_date).toLocaleDateString()} -{" "}
              {new Date(trip.end_date).toLocaleDateString()}
            </span>
          </div>
          {trip.total_traveler && (
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-4 h-4" />
              <span className="text-sm">{trip.total_traveler} Travelers</span>
            </div>
          )}
        </div>

        {/* Travel Buddies Preview */}
        {/* {trip.travel_buddies && trip.travel_buddies.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex -space-x-2">
              {trip.travel_buddies.slice(0, 3).map((buddy, index) => (
                <img
                  key={index}
                  src={buddy.image}
                  alt={buddy.name}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  title={buddy.name}
                />
              ))}
              {trip.travel_buddies.length > 3 && (
                <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-600">
                  +{trip.travel_buddies.length - 3}
                </div>
              )}
            </div>
            <span className="text-sm text-gray-600">Travel Buddies</span>
          </div>
        )} */}

        <p className="text-gray-600 text-sm mb-6 line-clamp-2">
          {trip.description}
        </p>

        <div className="flex items-center justify-between">
          <Button
            onClick={() => onViewDetails(trip.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-full"
          >
            View Full Details
            <ChevronRight className="w-4 h-4" />
          </Button>

          {showReviewButton && (
            <Button
              variant="ghost"
              onClick={() => onReview(trip.id)}
              className="flex items-center justify-center w-10 h-10 p-0 rounded-full border border-orange-200 text-orange-600 bg-orange-50 hover:bg-orange-100 hover:text-orange-700 shadow-sm transition-all duration-150"
              aria-label="Review this trip"
            >
              <Star className="w-5 h-5 text-orange-500" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
