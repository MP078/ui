import { Calendar, Users } from "lucide-react";
import { upcomingTrips } from "../data/upcomingtrips";
import { formatDate } from "../utils/date";

export default function UpcomingTrips() {
  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Upcoming Trips</h2>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {upcomingTrips.map((trip) => (
          <div
            key={trip.id}
            className="min-w-[280px] bg-white rounded-lg overflow-hidden border"
          >
            <img
              src={trip.image_url}
              alt={trip.destination}
              className="w-full h-36 object-cover"
            />
            <div className="p-4">
              <h3 className="font-medium text-lg">{trip.destination}</h3>
              <div className="flex items-center gap-2 text-gray-600 mt-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  {formatDate(trip.start_date)} - {formatDate(trip.end_date)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 mt-1">
                <Users className="w-4 h-4" />
                <span className="text-sm">{trip.total_traveler} People</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
