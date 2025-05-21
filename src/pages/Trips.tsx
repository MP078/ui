import { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getAvatarNumber, UserContext } from "../context/UserContext";
import { StatCard } from "../components/stats/StatCard";
import {
  AlertTriangle,
  MessageCircle,
  MoreVertical,
  ChevronRight,
  ChevronUp,
  MapPin,
} from "lucide-react";
import { api } from "../lib/api";
import { SearchBar } from "../components/search/SearchBar";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { TripHistoryCard } from "../components/trips/TripHistoryCard";
import { TripSummaryModal } from "../components/trips/TripSummaryModal";
import { ReviewModal } from "../components/reviews/ReviewModal";
import { TripDetailModal } from "../components/trips/TripDetailModal";
import { ConfirmationDialog } from "../components/ui/confirmation-dialog";

// Helper function to format trip ID for display
const formatTripId = (tripId: string) => {
  if (!tripId) return "";
  return tripId.substring(0, 6).toUpperCase();
};

// Helper to normalize trip data
const normalizeTrip = (trip: any) => {
  // Ensure dates are consistent first
  const startDate = trip.start_date || trip.startDate;
  const endDate = trip.end_date || trip.endDate;

  // Determine status based on dates
  const currentDate = new Date();
  let derivedStatus = "upcoming";

  if (startDate && endDate) {
    const tripStartDate = new Date(startDate);
    const tripEndDate = new Date(endDate);

    if (tripEndDate < currentDate) {
      derivedStatus = "completed";
    } else if (tripStartDate <= currentDate && tripEndDate >= currentDate) {
      derivedStatus = "ongoing";
    } else {
      derivedStatus = "upcoming";
    }
  }

  // Normalize pins: always provide lat/lng as numbers if present
  let normalizedPins = [];
  if (Array.isArray(trip.pins)) {
    normalizedPins = trip.pins.map((pin: any) => {
      // Accept lat/lng or latitude/longitude, coerce to number if present
      const lat = pin.lat !== undefined ? pin.lat : pin.latitude;
      const lng = pin.lng !== undefined ? pin.lng : pin.longitude;
      return {
        ...pin,
        lat: lat !== undefined ? Number(lat) : undefined,
        lng: lng !== undefined ? Number(lng) : undefined,
      };
    });
  }

  return {
    ...trip,
    // Always use string for trip_id, use id as is
    trip_id: trip.id || "",
    displayId: formatTripId(trip.id || ""),

    // Use title as the primary field
    title: trip.title || "Untitled Trip",

    // Use location only if needed
    destination: trip.title || "Unknown Location",

    // Ensure start/end dates use consistent naming
    start_date: startDate,
    end_date: endDate,

    // Set status fields consistently - now derived from dates
    status: derivedStatus,
    tripStatus: trip.participation_status || "open",

    // Calculate days if not provided
    days:
      trip.days ||
      (startDate && endDate
        ? Math.max(
            1,
            Math.ceil(
              (new Date(endDate).getTime() - new Date(startDate).getTime()) /
                (1000 * 60 * 60 * 24)
            ) + 1
          )
        : undefined),

    // Set consistent member count
    totalTravelers: trip.totalTravelers || trip.members_count || 1,

    // Ensure difficulty is consistent
    difficulty: trip.difficulty || "moderate",

    // Default image if not provided
    imageUrl: trip.cover_image_url || "/placeholder/trip.png",

    // Initialize summary if not provided
    summary: trip.summary || {
      totalDays:
        trip.days ||
        (startDate && endDate
          ? Math.max(
              1,
              Math.ceil(
                (new Date(endDate).getTime() - new Date(startDate).getTime()) /
                  (1000 * 60 * 60 * 24)
              ) + 1
            )
          : undefined),
      highlights: trip.highlights || [],
      totalCost: (trip.cost && trip.cost.amount) || undefined,
    },

    // Normalized pins (with lat/lng as numbers)
    pins: normalizedPins,
  };
};

export default function Trips() {
  const { user } = useContext(UserContext);
  const [tripsData, setTripsData] = useState([]);
  const [connectionsData, setConnectionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  // Removed pastTrips state

  // New state variables
  const [selectedTrip, setSelectedTrip] = useState<any | null>(null);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [showDisconnectConfirmation, setShowDisconnectConfirmation] =
    useState(false);
  const [selectedConnection, setSelectedConnection] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [expandedSections, setExpandedSections] = useState({
    upcomingTrips: false,
    travelHistory: false,
  });

  const collapsedLimits = {
    upcomingTrips: 3,
    travelHistory: 3,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tripsResponse, connectionsResponse] = await Promise.all([
          api.get("/trips", {
            params: {
              username: user?.username,
            },
          }),
          api.get("/friendships"),
        ]);

        // Normalize all trips
        const processedTrips = (tripsResponse.data.data || []).map(
          normalizeTrip
        );

        setTripsData(processedTrips);
        setConnectionsData(connectionsResponse.data.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("[data-menu-trigger]")) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    fetchData();
    return () => document.removeEventListener("click", handleClickOutside);
  }, [user?.username]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleMenuClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleDisconnect = (connection: { id: number; name: string }) => {
    setSelectedConnection(connection);
    setShowDisconnectConfirmation(true);
  };

  const confirmDisconnect = () => {
    if (selectedConnection) {
      console.log(`Disconnecting from ${selectedConnection.name}`);
      // Add disconnect logic here
      setShowDisconnectConfirmation(false);
    }
  };

  const handleViewDetails = (tripId: string) => {
    const trip = tripsData.find(
      (t: any) => t.trip_id === tripId || t.id === tripId
    );
    if (trip) {
      setSelectedTrip(trip);
      setIsDetailModalOpen(true);
    }
  };

  const handleViewSummary = (tripId: string) => {
    const trip = tripsData.find(
      (t: any) => t.trip_id === tripId || t.id === tripId
    );
    if (trip) {
      setSelectedTrip(trip);
      setIsSummaryModalOpen(true);
    }
  };

  const { user: currentUser } = useContext(UserContext);
  const handleReviewTrip = (tripId: string) => {
    const trip = tripsData.find(
      (t: any) => t.trip_id === tripId || t.id === tripId
    );
    setSelectedTrip(trip || null);
    setIsReviewModalOpen(true);
  };


  // Remove a trip from state after leaving
  const handleTripLeft = (tripId: string) => {
    setTripsData((prev) => prev.filter((t: any) => t.id !== tripId && t.trip_id !== tripId));
    setIsDetailModalOpen(false);
    setSelectedTrip(null);
  };

  if (!user || loading) return <div>...Loading</div>;

  const { travel_days, total_trips, connections } = user;

  // Filter trips into upcoming and past trips
  const currentDate = new Date();
  // Upcoming: trips that are ongoing or start in the future (end_date >= today)
  const upcomingTrips = tripsData.filter(
    (trip: any) => new Date(trip.end_date) >= currentDate
  );
  // Past: trips that ended before today (end_date < today)
  const pastTrips = tripsData.filter(
    (trip: any) => new Date(trip.end_date) < currentDate
  );

  const connectionDetails = (
    <div className="space-y-4">
      {connectionsData.map((connection: any) => (
        <div
          key={connection.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <img
              src={
                connection.avatar_url ||
                `/avatars/${getAvatarNumber(connection.id)}.png`
              }
              alt={connection.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="font-medium">{connection.name}</div>
              <div className="text-sm text-gray-500">{connection.username}</div>
              <div className="text-sm text-gray-600">{connection.location}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm text-brand-orange mr-4">
              {connection.trips_together} trips together
            </div>
            <div className="relative">
              <button
                data-menu-trigger
                className={`p-2 rounded-full transition-colors ${
                  openMenuId === connection.id
                    ? "bg-gray-200"
                    : "hover:bg-gray-200"
                }`}
                onClick={(e) => handleMenuClick(connection.id, e)}
              >
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
              {openMenuId === connection.id && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => {
                      console.log("Message:", connection.name);
                      setOpenMenuId(null);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Message
                  </button>
                  <button
                    onClick={() => {
                      handleDisconnect({
                        id: connection.id,
                        name: connection.name,
                      });
                      setOpenMenuId(null);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">My Travel History</h1>
          <div className="flex items-center gap-4">
            <SearchBar
              placeholder="Search destinations or..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-[300px]"
            />
            <Link to="/trips/create">
              <Button>+ Create New Trip</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4 mb-8">
          <StatCard
            icon="📍"
            label="Total Trips"
            value={total_trips}
            details={
              <div className="space-y-4">
                <p className="text-gray-600 mb-4">
                  You've completed {total_trips} amazing journeys so far!
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">
                      {pastTrips.length}
                    </div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">
                      {upcomingTrips.length}
                    </div>
                    <div className="text-sm text-gray-600">Upcoming</div>
                  </div>
                </div>
              </div>
            }
          />
          <StatCard
            icon="📅"
            label="Travel Days"
            value={travel_days}
            details={
              <div className="space-y-4">
                {tripsData.map((trip: any) => (
                  <div key={trip.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="font-medium mb-2">{trip.title}</div>
                    <div className="text-sm text-gray-600">
                      <div>
                        From: {new Date(trip.start_date).toLocaleDateString()}
                      </div>
                      <div>
                        To: {new Date(trip.end_date).toLocaleDateString()}
                      </div>
                      <div className="mt-2 font-medium text-brand-orange">
                        {trip.days} days
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            }
          />
          <StatCard
            icon="🤝"
            label="Connections"
            value={connections}
            details={connectionDetails}
          />
        </div>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">My Upcoming Trips</h2>
            {upcomingTrips.length > collapsedLimits.upcomingTrips && (
              <Button
                variant="ghost"
                className="text-brand-orange flex items-center gap-1"
                onClick={() => toggleSection("upcomingTrips")}
              >
                {expandedSections.upcomingTrips ? (
                  <>
                    Show less
                    <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    View all
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            )}
          </div>
          <div className="grid grid-cols-3 gap-6">
            {(expandedSections.upcomingTrips
              ? upcomingTrips
              : upcomingTrips.slice(0, collapsedLimits.upcomingTrips)
            ).map((trip: any) => (
              <TripHistoryCard
                key={trip.id}
                trip={{
                  ...trip,
                  displayId: trip.displayId || formatTripId(trip.id),
                }}
                onViewDetails={() => handleViewDetails(trip.id)}
                onViewSummary={() => handleViewSummary(trip.id)}
                onReview={() => {}}
              />
            ))}
            {upcomingTrips.length === 0 && (
              <div className="col-span-3 text-center py-12 text-gray-500">
                No upcoming trips. Plan your next adventure!
              </div>
            )}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Travel History</h2>
            <Button
              variant="ghost"
              className="text-brand-orange flex items-center gap-1"
              onClick={() => toggleSection("travelHistory")}
            >
              {expandedSections.travelHistory ? (
                <>
                  Show less
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  View all
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {(expandedSections.travelHistory
              ? pastTrips
              : pastTrips.slice(0, collapsedLimits.travelHistory)
            ).map((trip: any) => (
              <TripHistoryCard
                key={trip.id}
                trip={{
                  ...trip,
                  displayId: trip.displayId || formatTripId(trip.id),
                }}
                onViewDetails={() => handleViewDetails(trip.id)}
                onViewSummary={() => handleViewSummary(trip.id)}
                onReview={() => handleReviewTrip(trip.id)}
              />
            ))}
            {pastTrips.length === 0 && (
              <div className="col-span-3 text-center py-12 text-gray-500">
                No travel history yet. Start your travel journey!
              </div>
            )}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">My Travel Map</h2>
          </div>
          <div
            className={`bg-white rounded-lg p-0 h-[400px] overflow-hidden transition-all duration-200 ${
              (isDetailModalOpen || isSummaryModalOpen || isReviewModalOpen) ? 'pointer-events-none opacity-40 select-none' : ''
            }`}
          >
            {/* OpenStreetMap with trip markers */}
            <MapContainer center={[27.7, 85.3]} zoom={4} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* Place a marker for each trip's last pin if available */}
              {tripsData.map((trip: any) => {
                const pins = trip.pins || [];
                if (!Array.isArray(pins) || pins.length === 0) return null;
                const lastPin = pins[pins.length - 1];
                if (!lastPin || typeof lastPin.lat !== 'number' || typeof lastPin.lng !== 'number') return null;
                return (
                  <Marker key={trip.id} position={[lastPin.lat, lastPin.lng]}>
                    <Popup>
                      <div className="min-w-[180px]">
                        <div className="font-semibold text-brand-orange mb-1">{trip.title}</div>
                        <div className="text-xs text-gray-700 mb-1">Trip ID: {trip.displayId}</div>
                        <div className="text-xs text-gray-500 mb-1">{trip.destination}</div>
                        <div className="text-xs text-gray-500 mb-1">{trip.start_date ? new Date(trip.start_date).toLocaleDateString() : ''} - {trip.end_date ? new Date(trip.end_date).toLocaleDateString() : ''}</div>
                        <div className="text-xs text-gray-500">{trip.totalTravelers} travelers</div>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>
        </section>
      </div>

      {selectedTrip && (
        <>
          <TripDetailModal
            isOpen={isDetailModalOpen}
            onClose={() => setIsDetailModalOpen(false)}
            trip={selectedTrip}
            onTripLeft={handleTripLeft}
          />
          {selectedTrip.summary && (
            <TripSummaryModal
              highlights={selectedTrip.highlights}
              photos={selectedTrip.image_urls}
              isOpen={isSummaryModalOpen}
              onClose={() => setIsSummaryModalOpen(false)}
              total_days={
                selectedTrip.start_date && selectedTrip.end_date
                  ? Math.max(
                      1,
                      Math.ceil(
                        (new Date(selectedTrip.end_date).getTime() -
                          new Date(selectedTrip.start_date).getTime()) /
                          (1000 * 60 * 60 * 24)
                      ) + 1
                    )
                  : 0
              }
              total_cost={selectedTrip.cost}
              tripDestination={selectedTrip.destination}
            />
          )}
          <ReviewModal
            isOpen={isReviewModalOpen}
            onClose={() => setIsReviewModalOpen(false)}
            trip={selectedTrip}
            currentUserId={currentUser?.id}
            onSubmit={() => setIsReviewModalOpen(false)}
          />
        </>
      )}

      <ConfirmationDialog
        isOpen={showDisconnectConfirmation}
        onClose={() => setShowDisconnectConfirmation(false)}
        onConfirm={confirmDisconnect}
        title="Confirm Disconnect"
        message={
          selectedConnection
            ? `Are you sure you want to disconnect from ${selectedConnection.name}? This action cannot be undone.`
            : ""
        }
        confirmText="Disconnect"
        type="danger"
      />
    </>
  );
}
