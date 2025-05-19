import React, { useState } from 'react';
import { X, Calendar, Users, MapPin, DollarSign } from 'lucide-react';
// --- MapSection: Client-only dynamic import for react-leaflet/leaflet ---
function MapSection({ pins }: { pins: Array<{ lat: number; lng: number; label?: string }> }) {
  // All hooks at the top
  const [leaflet, setLeaflet] = React.useState<any>(null);
  const [reactLeaflet, setReactLeaflet] = React.useState<any>(null);
  const [ready, setReady] = React.useState(false);
  const [routeGeometry, setRouteGeometry] = React.useState<Array<[number, number]>>([]);
  const [routeDistance, setRouteDistance] = React.useState<number>(0);

  // Always call hooks, then do conditional logic
  React.useEffect(() => {
    let mounted = true;
    Promise.all([
      import('leaflet'),
      import('react-leaflet'),
    ]).then(([L, RL]) => {
      if (mounted) {
        setLeaflet(L);
        setReactLeaflet(RL);
        setReady(true);
      }
    });
    return () => { mounted = false; };
  }, []);

  // Fetch OSM route when pins change
  React.useEffect(() => {
    async function fetchRouteOSRM(start: [number, number], end: [number, number]) {
      const url = `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`;
      const res = await fetch(url);
      if (!res.ok) return null;
      const data = await res.json();
      if (data.routes && data.routes.length > 0) {
        return {
          geometry: data.routes[0].geometry.coordinates.map(([lng, lat]: [number, number]) => [lat, lng]),
          distance: data.routes[0].distance / 1000
        };
      }
      return null;
    }

    async function fetchMultiSegmentRoute(pins: { lat: number; lng: number }[]) {
      let totalDistance = 0;
      let allGeometry: [number, number][] = [];
      for (let i = 0; i < pins.length - 1; i++) {
        const start: [number, number] = [pins[i].lat, pins[i].lng];
        const end: [number, number] = [pins[i + 1].lat, pins[i + 1].lng];
        const route = await fetchRouteOSRM(start, end);
        if (route) {
          if (allGeometry.length > 0) {
            allGeometry = allGeometry.concat(route.geometry.slice(1));
          } else {
            allGeometry = route.geometry;
          }
          totalDistance += route.distance;
        }
      }
      setRouteGeometry(allGeometry);
      setRouteDistance(totalDistance);
    }

    if (pins.length >= 2) {
      fetchMultiSegmentRoute(pins);
    } else {
      setRouteGeometry([]);
      setRouteDistance(0);
    }
  }, [JSON.stringify(pins)]);

  // Only after all hooks, do conditional rendering
  if (!ready || !leaflet || !reactLeaflet) {
    return <div className="w-full h-72 flex items-center justify-center bg-gray-100 rounded-lg">Loading map...</div>;
  }

  const { MapContainer, TileLayer, Marker, Polyline, Popup } = reactLeaflet;
  const L = leaflet;



  // Custom numbered pin icon
  function numberedIcon(number: number) {
    return L.divIcon({
      className: 'custom-pin',
      html: `<div style="background:#ff6600;color:#fff;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1rem;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.15);">${number}</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  }

  // Center map on first pin, fallback to India
  const center = pins.length > 0 ? [pins[0].lat, pins[0].lng] : [20.5937, 78.9629];


  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Route Preview</h3>
      <div className="w-full h-72 rounded-lg overflow-hidden mb-2 border border-gray-200">
        <MapContainer center={center} zoom={10} style={{ width: '100%', height: '100%' }} scrollWheelZoom={false} dragging={true} zoomControl={true} attributionControl={false}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {/* Draw OSRM route if available */}
          {routeGeometry.length > 1 && (
            <Polyline positions={routeGeometry} color="#ff6600" weight={4} />
          )}
          {pins.map((pin, idx) => (
            <Marker
              key={idx}
              position={[pin.lat, pin.lng]}
              icon={numberedIcon(idx + 1)}
            >
              <Popup>
                <span>{pin.label}</span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className="text-gray-700 text-sm">Total Distance: <span className="font-semibold">{routeDistance.toFixed(2)} km</span></div>
    </div>
  );
}
import { Trip } from '../../types/trip';
import { formatDate } from '../../utils/date';
import { Button } from '../ui/button';
import { ConfirmationDialog } from '../ui/confirmation-dialog';
import { TripOrganizers } from './TripOrganizers';

interface TripDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip;
}

export function TripDetailModal({ isOpen, onClose, trip }: TripDetailModalProps) {
  const [showLeaveConfirmation, setShowLeaveConfirmation] = useState(false);
  const [showOrganizerSection, setShowOrganizerSection] = useState(false);
  const currentUser = 'sarahchen'; // This would normally come from auth context
  //
  //
  //
  //

  ///
  //
  //
  //
  
  const handleLeaveTrip = () => {
    setShowLeaveConfirmation(true);
  };

  const confirmLeaveTrip = () => {
    console.log('Leaving trip:', trip.tripId);
    setShowLeaveConfirmation(false);
    onClose();
  };

  const handleRequestOrganizer = () => {
    console.log('Requesting to be organizer for trip:', trip.tripId);
  };

  const handleAcceptRequest = (username: string) => {
    console.log('Accepting organizer request from:', username);
  };

  const handleRejectRequest = (username: string) => {
    console.log('Rejecting organizer request from:', username);
  };

  const handleRemoveOrganizer = (username: string) => {
    console.log('Removing organizer:', username);
  };

  const isOrganizer = trip.organizers?.some(org => org.username === currentUser);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl relative max-h-[90vh] flex flex-col overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable content including image and details */}
        <div className="flex-1 overflow-y-auto">
          {/* Hero Image */}
          <div className="h-64 relative">
            <img
              src={trip.imageUrl}
              alt={trip.destination}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-6 text-white">
              <h2 className="text-2xl font-semibold mb-2">{trip.destination}</h2>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Trip ID: {trip.tripId}</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Trip Details */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Duration</span>
                </div>
                <p className="font-medium">
                  {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Travelers</span>
                </div>
                <p className="font-medium">{trip.totalTravelers} People</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm">Total Cost</span>
                </div>
                <p className="font-medium">
                  {trip.cost?.currency} {trip.cost?.amount}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-gray-600">{trip.description}</p>
            </div>

            {/* About */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">About</h3>
              <p className="text-gray-700 leading-relaxed">{trip.description}</p>
            </div>

            {/* Highlights & Route Preview side by side */}
            <div className="mb-8 flex flex-col md:flex-row md:gap-8">
              {trip.highlights && trip.highlights.length > 0 && (
                <div className="md:w-1/2 mb-6 md:mb-0">
                  <h3 className="text-xl font-semibold mb-3">Trip Highlights</h3>
                  <ul className="space-y-2">
                    {trip.highlights.map((highlight, index) => (
                      <li key={index} className="flex gap-2 items-center align-middle">
                        <span className="text-brand-orange flex items-center justify-center text-lg">•</span>
                        <span className="flex items-center text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="md:w-1/2">
                <MapSection
                  pins={
                    trip.pins && trip.pins.length > 0
                      ? trip.pins.map((p, idx) => ({
                          lat: p.latitude,
                          lng: p.longitude,
                          label: p.label || `Pin ${idx + 1}`
                        }))
                      : []
                  }
                />
              </div>
            </div>

            {/* Organizers & Travel Buddies Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Trip Members</h3>
                {isOrganizer && (
                  <Button
                    variant="outline"
                    onClick={() => setShowOrganizerSection(!showOrganizerSection)}
                  >
                    {showOrganizerSection ? 'View Members' : 'Manage Organizers'}
                  </Button>
                )}
              </div>

              {showOrganizerSection && isOrganizer ? (
                <TripOrganizers
                  organizers={trip.organizers || []}
                  organizerRequests={trip.organizerRequests || []}
                  travelBuddies={trip.travelBuddies || []}
                  createdBy={trip.createdBy}
                  currentUser={currentUser}
                  onRequestOrganizer={handleRequestOrganizer}
                  onAcceptRequest={handleAcceptRequest}
                  onRejectRequest={handleRejectRequest}
                  onRemoveOrganizer={handleRemoveOrganizer}
                />
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {/* Organizers */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Organizers</h4>
                    {trip.organizers?.map((organizer, index) => (
                      <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg mb-2">
                        <img
                          src={organizer.image}
                          alt={organizer.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium">{organizer.name}</p>
                          <p className="text-sm text-gray-600">
                            {organizer.role === 'creator' ? 'Creator' : 'Organizer'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Travel Buddies */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Travel Buddies</h4>
                    {trip.travelBuddies?.map((buddy, index) => (
                      <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg mb-2">
                        <img
                          src={buddy.image}
                          alt={buddy.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium">{buddy.name}</p>
                          <p className="text-sm text-gray-600">Travel Partner</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center border-t pt-6">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <div className="flex gap-4">
                {trip.status === 'completed' && trip.reviewStatus === 'pending' && (
                  <Button>Write Review</Button>
                )}
                {trip.status === 'upcoming' && (
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
        <ConfirmationDialog
          isOpen={showLeaveConfirmation}
          onClose={() => setShowLeaveConfirmation(false)}
          onConfirm={confirmLeaveTrip}
          title="Leave Trip"
          message={`Are you sure you want to leave the trip to ${trip.destination}? This action cannot be undone.`}
          confirmText="Leave Trip"
          type="danger"
        />
      </div>
    </div>
  );
}