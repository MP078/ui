

import { useEffect, useState, useContext } from "react";
import { Calendar, Users } from "lucide-react";
import { formatDate } from "../utils/date";
import { api } from "../lib/api";
import { UserContext } from "../context/UserContext";

export default function UpcomingTrips() {
  const [trips, setTrips] = useState<any[]>([]);
  const { user } = useContext(UserContext);


  useEffect(() => {
    const fetchUpcomingTrips = async () => {
      if (!user?.username) return;
      try {
        const response = await api.get("/trips", {
          params: {
            username: user.username,
          },
        });
        let data: any[] = [];
        if (Array.isArray(response.data)) {
          data = response.data;
        } else if (Array.isArray(response.data.data)) {
          data = response.data.data;
        } else {
          data = [];
        }
        // Filter for upcoming trips (end_date >= today)
        const currentDate = new Date();
        const upcoming = data.filter((trip: any) => {
          const end = trip.end_date || trip.endDate;
          return end && new Date(end) >= currentDate;
        });
        setTrips(upcoming);
      } catch (error) {
        console.error("Error fetching upcoming trips:", error);
        setTrips([]);
      }
    };
    fetchUpcomingTrips();
  }, [user]);

  // Normalize API data to match display fields
  const normalizedTrips = trips.map((trip) => ({
    id: trip.id || trip.tripId,
    title: trip.title || trip.destination,
    destination: trip.destination || trip.title,
    startDate: trip.start_date || trip.startDate,
    endDate: trip.end_date || trip.endDate,
    totalTravelers: trip.members_count || trip.total_traveler || trip.totalTravelers || 0,
    maximumParticipants: trip.maximum_participants || trip.maximumParticipants || trip.maxParticipants || null,
    imageUrl: trip.cover_image_url || trip.coverImage || trip.image_url || null,
  }));

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Upcoming Trips</h2>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {normalizedTrips.length === 0 ? (
          <div className="text-sm text-gray-500">No upcoming trips found.</div>
        ) : (
          normalizedTrips.map((trip) => (
            <div
              key={trip.id}
              className="min-w-[280px] bg-white rounded-lg overflow-hidden border"
            >
              <img
                src={trip.imageUrl || "/placeholders/trip.png"}
                alt={trip.destination}
                className="w-full h-36 object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium text-lg">{trip.destination}</h3>
                <div className="flex items-center gap-2 text-gray-600 mt-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">
                    {trip.totalTravelers}
                    {trip.maximumParticipants ? (
                      <>/{trip.maximumParticipants}</>
                    ) : null} people
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
