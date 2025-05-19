import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { X, MapPin, Star, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

export interface Destination {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  description: string;
  popularity: string;
  difficulty: string;
  bestTimeToVisit?: string;
  activities?: string[];
  highlights?: string[];
  averageCost?: string;
  travelTips?: string[];
  lat?: number;
  lng?: number;
// End of Destination interface
}

interface DestinationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: Destination;
}

export function DestinationDetailModal({ 
  isOpen, 
  onClose, 
  destination
}: DestinationDetailModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handlePlanTrip = () => {
    navigate('/trips/create', {
      state: { destination }
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'challenging':
      case 'difficult':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };



// OSM map with a single pin at the given lat/lng
function OSMSinglePinMap({ lat, lng }: { lat: number; lng: number }) {
  // Custom marker icon (fixes missing default icon in Leaflet)
  const markerIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
  });
  return (
    <div style={{ width: '100%', height: '100%', minHeight: 180, minWidth: 180 }}>
      <MapContainer
        center={[lat, lng]}
        zoom={11}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
        dragging={true}
        doubleClickZoom={true}
        zoomControl={true}
        attributionControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        <Marker position={[lat, lng]} icon={markerIcon} />
      </MapContainer>
    </div>
  );
}

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl relative max-h-[90vh] flex flex-col overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* The image header is now inside the scrollable area, so it scrolls away with content */}
        <div className="flex-1 overflow-y-auto">
          <div className="h-80 relative">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="text-3xl font-bold mb-2">{destination.name}</h2>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{destination.location}</span>
              </div>
            </div>
            <div className="absolute top-6 right-16 flex gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(destination.difficulty)}`}>
                {destination.difficulty}
              </span>
              <span className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                {destination.popularity} Popularity
              </span>
            </div>
          </div>




          <div className="p-6">
            {/* Title, rating, and location */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-5 h-5 ${
                      star <= Math.floor(destination.rating) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              <span className="font-medium text-lg">{destination.rating}</span>
            </div>


            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">About</h3>
              <p className="text-gray-700 leading-relaxed">{destination.description}</p>
            </div>

            <div className="mb-8 flex flex-col md:flex-row md:gap-8">
              {destination.highlights && (
                <div className="md:w-1/2 mb-6 md:mb-0">
                  <h3 className="text-xl font-semibold mb-3">Highlights</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-1 gap-3">
                    {destination.highlights.map((highlight: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1 text-brand-orange">•</div>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="md:w-1/2 flex flex-col items-center justify-center">
                <h3 className="text-xl font-semibold mb-3">Destination Location</h3>
                <div className="w-full h-72 rounded-lg overflow-hidden mb-2 border border-gray-200 flex items-center justify-center bg-gray-100">
                  {/* Show OSM map if coordinates are available, else fallback to pin icon */}
                  {typeof destination.lat === 'number' && typeof destination.lng === 'number' ? (
                    <OSMSinglePinMap lat={destination.lat} lng={destination.lng} />
                  ) : (
                    <span className="text-brand-orange text-4xl">
                      <MapPin className="w-10 h-10 mx-auto" />
                    </span>
                  )}
                </div>
                <div className="text-gray-700 text-sm text-center">{destination.location}</div>
              </div>
            </div>

            {destination.activities && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3">Activities</h3>
                <div className="flex flex-wrap gap-2">
                  {destination.activities.map((activity: string, index: number) => (
                    <span 
                      key={index} 
                      className="bg-gray-100 px-3 py-1 rounded-full text-gray-700"
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {destination.bestTimeToVisit && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-brand-orange" />
                    <h4 className="font-medium">Best Time to Visit</h4>
                  </div>
                  <p className="text-gray-700">{destination.bestTimeToVisit}</p>
                </div>
              )}
              
              {destination.averageCost && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-orange"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
                    <h4 className="font-medium">Average Cost</h4>
                  </div>
                  <p className="text-gray-700">{destination.averageCost}</p>
                </div>
              )}
            </div>

            {destination.travelTips && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3">Travel Tips</h3>
                <ul className="space-y-2">
                  {destination.travelTips.map((tip: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="mt-1 text-brand-orange">•</div>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end items-center mt-6">
              <Button 
                onClick={handlePlanTrip}
                className="flex items-center gap-2"
              >
                <span>Plan a Trip</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}