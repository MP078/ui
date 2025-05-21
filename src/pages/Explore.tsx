import { useState, useEffect } from "react";

import { ExploreSearch } from "../components/explore/ExploreSearch";
import { FilterChips } from "../components/explore/FilterChips";
import { TravelerCard } from "../components/explore/TravelerCard";
import { ActiveTripCard } from "../components/explore/ActiveTripCard";
import {
  DestinationDetailModal,
  Destination,
} from "../components/explore/DestinationDetailModal";
import { ConfirmationDialog } from "../components/ui/confirmation-dialog";
import { api } from "../lib/api";
import { getAvatarNumber } from "../context/UserContext";

type TabType = "destinations" | "travelers" | "trips";

const tabs: { id: TabType; label: string }[] = [
  { id: "destinations", label: "Destinations" },
  { id: "travelers", label: "Travelers" },
  { id: "trips", label: "Active Trips" },
];

const filters = {
  destinations: ["Popular", "Nearby", "Recommended", "Trending"],
  travelers: ["Online", "Recently Active", "Mutual Friends", "New"],
  trips: ["Starting Soon", "Open", "Popular", "Weekend"],
};

export default function Explore() {
  const [activeTab, setActiveTab] = useState<TabType>("destinations");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);
  const [showPlanTripConfirmation, setShowPlanTripConfirmation] =
    useState(false);

  const currentFilters = filters[activeTab].map((filter) => ({
    id: filter.toLowerCase(),
    label: filter,
    active: filter.toLowerCase() === activeFilter,
  }));

  const handleFilterToggle = (id: string) => {
    setActiveFilter(activeFilter === id ? "" : id);
  };

  const handleViewDestinationDetails = (destination: Destination) => {
    setSelectedDestination(destination);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedDestination(null);
    document.body.style.overflow = "unset";
  };

  const handlePlanTrip = (destinationId: string) => {
    setShowPlanTripConfirmation(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <ExploreSearch
          placeholder={`Search ${activeTab}...`}
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </div>

      <div className="flex border-b mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setActiveFilter("");
            }}
            className={`px-6 py-3 font-medium text-sm relative whitespace-nowrap
              ${
                activeTab === tab.id
                  ? "text-brand-orange"
                  : "text-gray-600 hover:text-gray-900"
              }
            `}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange" />
            )}
          </button>
        ))}
      </div>

      <div className="mb-6 overflow-x-auto">
        <FilterChips filters={currentFilters} onToggle={handleFilterToggle} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === "destinations" && (
          <DestinationsList
            filter={activeFilter}
            onViewDetails={handleViewDestinationDetails}
          />
        )}
        {activeTab === "travelers" && <TravelersList filter={activeFilter} />}
        {activeTab === "trips" && <ActiveTripsList filter={activeFilter} />}
      </div>

      {selectedDestination && (
        <DestinationDetailModal
          isOpen={!!selectedDestination}
          onClose={handleCloseModal}
          destination={selectedDestination}
        />
      )}

      <ConfirmationDialog
        isOpen={showPlanTripConfirmation}
        onClose={() => setShowPlanTripConfirmation(false)}
        onConfirm={() => {
          setShowPlanTripConfirmation(false);
          window.location.href = `/trips/create?destination=${selectedDestination?.name}`;
        }}
        title="Plan a Trip"
        message={`Would you like to create a new trip to ${selectedDestination?.name}? You'll be able to customize your itinerary and invite travel buddies.`}
        confirmText="Create Trip"
        type="info"
      />
    </div>
  );
}

const fetchDestinations = async (): Promise<Destination[]> => {
  try {
    const res = await api.get("/destinations");
    const data = res.data.data;
    // console.log(res.data);

    const destinations: Destination[] = data.map((item: any) => ({
      id: item.id,
      name: item.name,
      image: item.cover_image_url,
      location: item.location,
      rating: item.rating,
      description: item.description,
      popularity: item.popularity,
      difficulty: item.difficulty,
      bestTimeToVisit: item.best_time_to_visit,
      activities: item.activities || [],
      highlights: item.highlights || [],
      averageCost: item.average_cost,
      travelTips: item.travel_tips || [],
      lat: item.lat, // <-- use item.lat
      lng: item.lng, // <-- use item.lng
      // Optionally, also map latitude/longitude for compatibility:
    }));

    return destinations;
  } catch (error) {
    console.error("Failed to fetch destinations:", error);
    return [];
  }
};

const fetchTravelers = async () => {
  try {
    const res = await api.get("/users?all=true");
    const data = res.data.data;

    const travelers = data.map((user: any) => ({
      id: user.username,
      name: user.name,
      image: user.profile_image || `/avatars/${getAvatarNumber(user.id)}.png`,
      location: user.location || "Unknown",
      mutualConnections: user.connections || 0,
      interests: user.interests || [],
      isOnline: false, // You can improve this if you have online status
      lastActive: "Recently", // No info in API, default
      connectionStatus: user.friendship_status || "none",
    }));

    return travelers;
  } catch (error) {
    console.error("Failed to fetch travelers:", error);
    return [];
  }
};

function DestinationsList({
  filter,
  onViewDetails,
}: {
  filter: string;
  onViewDetails: (destination: Destination) => void;
}) {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    const loadDestinations = async () => {
      const fetched = await fetchDestinations();
      setDestinations(fetched);
    };
    loadDestinations();
  }, []);

  return (
    <>
      {destinations.map((destination) => (
        <div
          key={destination.id}
          className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="relative">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-medium">
              {destination.difficulty}
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-1">{destination.name}</h3>
            <div className="flex items-center gap-1 mb-2 text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-map-pin"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{destination.location}</span>
            </div>
            <div className="flex items-center gap-1 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-star fill-yellow-400 text-yellow-400"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="font-medium">{destination.rating}</span>
            </div>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {destination.description}
            </p>
            <button
              className="w-full bg-brand-orange text-white py-2 rounded-lg hover:bg-brand-orange/90 transition-colors"
              onClick={() => onViewDetails(destination)}
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

function TravelersList({ filter }: { filter: string }) {
  const [travelers, setTravelers] = useState<any[]>([]);

  useEffect(() => {
    const loadTravelers = async () => {
      const fetched = await fetchTravelers();
      setTravelers(fetched);
    };
    loadTravelers();
  }, []);

  const handleStatusChange = async (
    id: string,
    newStatus: "none" | "sent" | "received" | "friends"
  ) => {
    try {
      if (newStatus === "sent") {
        // Send friend request
        await api.post(`/friendships/${id}`);
      } else if (newStatus === "none") {
        // Cancel or remove friendship
        await api.delete(`/friendships/${id}`);
      } else if (newStatus === "friends") {
        // Accept friend request (example)
        await api.post(`/friendships/${id}/accept`);
      }
      // Update state locally after success
      setTravelers((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, connectionStatus: newStatus } : t
        )
      );
    } catch (err) {
      console.error("Failed to update friendship status:", err);
    }
  };

  return (
    <>
      {travelers.map((traveler) => (
        <TravelerCard
          key={traveler.id}
          traveler={traveler}
          onStatusChange={handleStatusChange}
          username={traveler.username}
          id={traveler.id}
          image={traveler.image}
          name={traveler.name}
          location={traveler.location}
          connectionStatus={traveler.connectionStatus}
        />
      ))}
    </>
  );
}


const fetchTrips = async () => {
  try {
    const res = await api.get("/trips", {
      params: {
        upcoming: true,
        user_trips: false,
      },
    });
    const data = res.data.data;

    const trips = data.map((trip: any) => ({
      tripId: trip.id,
      destination: trip.title,
      startDate: trip.start_date,
      endDate: trip.end_date,
      tripStatus: "open",
      totalTravelers: trip.members_count || 0,
      maxParticipants: trip.maximum_participants,
      imageUrl:
        typeof trip.cover_image_url === "string"
          ? trip.cover_image_url
          : "/placeholders/trip.png",
      summary: trip.description,
      can_join: trip.can_join,
    }));

    return trips;
  } catch (error) {
    console.error("Failed to fetch trips:", error);
    return [];
  }
};

function ActiveTripsList({ filter }: { filter: string }) {
  const [trips, setTrips] = useState<any[]>([]);

  useEffect(() => {
    const loadTrips = async () => {
      const fetched = await fetchTrips();
      setTrips(fetched);
    };
    loadTrips();
  }, []);

  return (
    <>
      {trips.map((trip) => (
        <ActiveTripCard
          key={trip.tripId}
          trip={trip}
          onJoinRequest={(id) => console.log("Join request:", id)}
        />
      ))}
    </>
  );
}
