import { useEffect, useState, useContext } from "react";
import { Calendar } from "lucide-react";
import { formatDate } from "../utils/date";
import { api } from "../lib/api";
import { UserContext } from "../context/UserContext";

function UpcomingTripsFeed() {
  const [showAll, setShowAll] = useState(false);
  const [feed, setFeed] = useState<any[]>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    // Fetch upcoming trips for the current user
    const fetchUpcomingTrips = async () => {
      if (!user?.username) return;
      try {
        const response = await api.get("/trips", {
          params: {
            username: user.username,
          },
        });
        let trips: any[] = [];
        if (Array.isArray(response.data)) {
          trips = response.data;
        } else if (Array.isArray(response.data.data)) {
          trips = response.data.data;
        } else {
          trips = [];
        }
        // Filter for upcoming trips (end_date >= today)
        const currentDate = new Date();
        const upcoming = trips.filter((trip: any) => {
          const end = trip.end_date || trip.endDate;
          return end && new Date(end) >= currentDate;
        });
        setFeed(upcoming);
      } catch (error) {
        console.error("Error fetching upcoming trips:", error);
        setFeed([]);
      }
    };
    fetchUpcomingTrips();
  }, [user]);

  // Only use backend data
  const displayedTrips = showAll ? feed : feed.slice(0, 3);

  // Normalize API data to match display fields
  const normalizedTrips = displayedTrips.map((trip) => ({
    id: trip.id || trip.tripId,
    title: trip.title || trip.destination,
    location: trip.location,
    startDate: trip.start_date || trip.startDate,
    endDate: trip.end_date || trip.endDate,
    totalTravelers: trip.members_count || trip.totalTravelers || 0,
    coverImage: trip.cover_image_url || trip.coverImage || null,
  }));

  const isScrollable = showAll && normalizedTrips.length > 8;

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm w-full max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-medium text-gray-800">Upcoming Trips</h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          {showAll ? "Less" : "More..."}
        </button>
      </div>

      <ul
        className={`space-y-3 ${
          isScrollable ? "max-h-[480px] overflow-y-auto pr-1" : ""
        }`}
      >
        {normalizedTrips.length === 0 ? (
          <li className="text-sm text-gray-500">No upcoming trips found.</li>
        ) : (
          normalizedTrips.map((trip) => (
            <li key={trip.id} className="flex items-start gap-3">
              {/* Icon Container */}
              <div className="bg-gray-100 text-gray-600 p-2 rounded-md">
                <Calendar className="w-4 h-4 text-brand-orange" />
              </div>

              {/* Trip Details */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  {trip.title}
                </h3>
                <p className="text-xs text-gray-500">
                  {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                </p>
                <p className="text-xs text-gray-500">
                  {trip.totalTravelers} people
                </p>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default UpcomingTripsFeed;
