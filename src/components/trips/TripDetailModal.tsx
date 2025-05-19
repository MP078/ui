import React, { useState } from 'react';
import { X, Calendar, Users, MapPin, DollarSign } from 'lucide-react';
// --- MapSection: Client-only dynamic import for react-leaflet/leaflet ---
function MapSection() {
  const [leaflet, setLeaflet] = React.useState<any>(null);
  const [reactLeaflet, setReactLeaflet] = React.useState<any>(null);
  const [ready, setReady] = React.useState(false);

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

  if (!ready || !leaflet || !reactLeaflet) return null;
  const { MapContainer, TileLayer, Marker, Polyline, Popup } = reactLeaflet;
  const L = leaflet;

  // Mocked pins (lat/lng, label)
  const pins = [
    { lat: 28.6139, lng: 77.209, label: 'Start' },
    { lat: 28.7041, lng: 77.1025, label: 'Waypoint 1' },
    { lat: 28.5355, lng: 77.391, label: 'End' },
  ];

  // Helper to calculate total distance (km) between pins
  function getTotalDistance(coords: { lat: number; lng: number }[]) {
    let total = 0;
    for (let i = 1; i < coords.length; i++) {
      const a = L.latLng(coords[i - 1].lat, coords[i - 1].lng);
      const b = L.latLng(coords[i].lat, coords[i].lng);
      total += a.distanceTo(b);
    }
    return total / 1000; // meters to km
  }

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

  // Polyline route
  const routeCoords = pins.map(p => [p.lat, p.lng]);
  const totalDistance = getTotalDistance(pins).toFixed(2);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Route Preview</h3>
      <div className="w-full h-72 rounded-lg overflow-hidden mb-2 border border-gray-200">
        <MapContainer center={center} zoom={10} style={{ width: '100%', height: '100%' }} scrollWheelZoom={false} dragging={true} zoomControl={true} attributionControl={false}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Polyline positions={routeCoords} color="#ff6600" weight={4} />
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
      <div className="text-gray-700 text-sm">Total Distance: <span className="font-semibold">{totalDistance} km</span></div>
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
                  <ul className="grid grid-cols-1 md:grid-cols-1 gap-3">
                    {trip.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1 text-brand-orange">•</div>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="md:w-1/2">
                <MapSection />
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