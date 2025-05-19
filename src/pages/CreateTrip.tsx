/**
 * CreateTrip page: Full-featured trip creation form for TravelBuddy
 *
 * Features:
 * - Enter trip details (title, location, dates, participants, description, activities, difficulty, image, highlights, cost)
 * - Add pins to a map by clicking or searching (OpenStreetMap/Nominatim)
 * - Visualize the route between pins using real road routing (OSRM API)
 * - Show total and segment distances
 * - Remove pins by clicking their marker
 * - Pins are visually numbered in order
 * - Enter travel methods for each segment
 * - Form validation and submission logic
 *
 * This file contains all logic and UI for the trip creation workflow.
 */
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

/**
 * Fetches a route between two points using the OSRM API.
 * @param start [lat, lng] of the start point
 * @param end [lat, lng] of the end point
 * @returns { geometry: [lat, lng][], distance: number } or null if failed
 */
async function fetchRouteOSRM(start: [number, number], end: [number, number]) {
  // OSRM expects lon,lat order in the URL
  const url = `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  if (data.routes && data.routes.length > 0) {
    // Convert [lng, lat] to [lat, lng] for Leaflet
    return {
      geometry: data.routes[0].geometry.coordinates.map(([lng, lat]: [number, number]) => [lat, lng]),
      distance: data.routes[0].distance / 1000 // distance in kilometers
    };
  }
  return null;
}

/**
 * Fetches the full route and total distance for a list of pins (multi-segment trip).
 * Calls OSRM for each segment and concatenates the geometry.
 * @param pins Array of { latitude, longitude }
 * @returns { geometry: [lat, lng][], distance: number }
 */
async function fetchMultiSegmentRoute(pins: { latitude: number; longitude: number }[]) {
  let totalDistance = 0;
  let allGeometry: [number, number][] = [];
  for (let i = 0; i < pins.length - 1; i++) {
    const start = [pins[i].latitude, pins[i].longitude] as [number, number];
    const end = [pins[i + 1].latitude, pins[i + 1].longitude] as [number, number];
    const route = await fetchRouteOSRM(start, end);
    if (route) {
      // Avoid duplicate points between segments
      if (allGeometry.length > 0) {
        allGeometry = allGeometry.concat(route.geometry.slice(1));
      } else {
        allGeometry = route.geometry;
      }
      totalDistance += route.distance;
    }
  }
  return { geometry: allGeometry, distance: totalDistance };
}
import 'leaflet/dist/leaflet.css';

/**
 * React-leaflet helper component: Adds a pin to the map when the user clicks on the map.
 * Calls the provided onAddPin callback with the clicked coordinates.
 */
function AddPinOnMap({ onAddPin }: { onAddPin: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e: any) => {
      onAddPin(e.latlng.lat, e.latlng.lng); // Add pin at clicked location
    }
  });
  return null;
}

/**
 * Fetches location suggestions from OSM Nominatim API for the location search box.
 * @param query Search string
 * @returns Array of location suggestion objects
 */
async function fetchLocationSuggestions(query: string): Promise<Array<{ display_name: string; lat: string; lon: string; type: string; class: string; address?: any; boundingbox?: string[] }>> {
  if (!query) return [];
  const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=8&dedupe=1&q=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: {
      'Accept-Language': 'en',
      'User-Agent': 'TravelBuddy/1.0 (your@email.com)'
    }
  });
  if (!res.ok) return [];
  return res.json();
}
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Image as ImageIcon, Clock, DollarSign, Plus, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Trip } from '../types/trip';

interface Pin {
  latitude: number;
  longitude: number;
}

interface TripFormData {
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  description: string;
  activities: string[];
  difficulty: 'easy' | 'moderate' | 'difficult';
  image: string;
  highlights: string[];
  cost: {
    amount: number;
    currency: string;
  };
  summary: {
    totalDays: number;
    totalCost: number;
    highlights: string[];
    photos: string[];
  };
  pins: Pin[];
  method: string[];
}

const defaultFormData: TripFormData = {
  title: '',
  location: '',
  startDate: '',
  endDate: '',
  maxParticipants: 1,
  description: '',
  activities: [],
  difficulty: 'easy',
  image: '',
  highlights: [],
  cost: {
    amount: 0,
    currency: 'USD'
  },
  summary: {
    totalDays: 0,
    totalCost: 0,
    highlights: [],
    photos: []
  },
  pins: [],
  method: []
};

const availableActivities = [
  'Trekking',
  'Photography',
  'Cultural Tours',
  'Adventure Sports',
  'Wildlife',
  'Camping',
  'Local Cuisine',
  'Meditation'
];

const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR', 'NPR'];

// Main CreateTrip component
export default function CreateTrip() {
  const location = useLocation();
  const navigate = useNavigate();
  const destinationDetails = location.state?.destination;
  // Submission/loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Error state for travel method validation
  const [methodError, setMethodError] = useState<string | null>(null);
  // State for new trip highlight input
  const [newHighlight, setNewHighlight] = useState('');

  // Main form state for all trip fields
  const [formData, setFormData] = useState<TripFormData>(() => {
    // If navigated from a destination, prefill some fields
    if (destinationDetails) {
      return {
        ...defaultFormData,
        title: `Trip to ${destinationDetails.name}`,
        location: destinationDetails.location,
        description: destinationDetails.description || '',
        difficulty: destinationDetails.difficulty?.toLowerCase() || 'easy',
        image: destinationDetails.image || '',
        activities: destinationDetails.activities || [],
        highlights: destinationDetails.highlights || [],
        summary: {
          ...defaultFormData.summary,
          highlights: destinationDetails.highlights || []
        }
      };
    }
    // Otherwise, use blank defaults
    return defaultFormData;
  });

  // Ensure page scroll is enabled on mount/unmount
  useEffect(() => {
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);


  // Update total trip days in summary when start/end date changes
  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setFormData(prev => ({
        ...prev,
        summary: {
          ...prev.summary,
          totalDays
        }
      }));
    }
  }, [formData.startDate, formData.endDate]);



  // Location search state for pin search box
  const [locationSearch, setLocationSearch] = useState('');
  // Location search results from OSM
  const [locationResults, setLocationResults] = useState<Array<{ display_name: string; lat: string; lon: string; type?: string; class?: string; address?: any; boundingbox?: string[] }>>([]);
  // Loading state for location search
  const [isLocLoading, setIsLocLoading] = useState(false);
  // Whether the location search results are expanded
  const [showLocationResults, setShowLocationResults] = useState(false);
  // Ref for the location search container
  const locationSearchRef = useRef<HTMLDivElement>(null);
  // Debounce timer for search
  const searchTimeout = useRef<any>(null);

  // Debounced effect: fetch OSM location suggestions as user types
  useEffect(() => {
    if (!locationSearch) {
      setLocationResults([]);
      setShowLocationResults(false);
      return;
    }
    setIsLocLoading(true);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(async () => {
      const results = await fetchLocationSuggestions(locationSearch);
      setLocationResults(results);
      setIsLocLoading(false);
      setShowLocationResults(true);
    }, 400);
    // eslint-disable-next-line
  }, [locationSearch]);

  // Collapse location search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (locationSearchRef.current && !locationSearchRef.current.contains(event.target as Node)) {
        setShowLocationResults(false);
      }
    }
    if (showLocationResults) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLocationResults]);

  /**
   * Removes a pin by index from the pins array in formData.
   * Used by clicking a marker on the map.
   */
  const removePin = (index: number) => {
    setFormData((prev: TripFormData) => ({
      ...prev,
      pins: prev.pins.filter((_: Pin, i: number) => i !== index)
    }));
  };

  // Log pins array to console whenever it changes
  useEffect(() => {
    console.log('Current pins:', formData.pins);
  }, [formData.pins]);


  // State for route geometry and distance (multi-segment)
  const [routeGeometry, setRouteGeometry] = useState<Array<[number, number]>>([]);
  const [routeDistance, setRouteDistance] = useState<number>(0);

  // Fetch multi-segment route from OSRM when pins change
  useEffect(() => {
    async function getRoute() {
      if (formData.pins.length < 2) {
        setRouteGeometry([]);
        setRouteDistance(0);
        return;
      }
      const route = await fetchMultiSegmentRoute(formData.pins);
      if (route) {
        setRouteGeometry(route.geometry);
        setRouteDistance(route.distance);
      } else {
        setRouteGeometry([]);
        setRouteDistance(0);
      }
    }
    getRoute();
  }, [formData.pins]);

  // (Removed unused addMethod function)

  // Remove a travel method by index from method array (no longer used, safe to remove)

  // Handle form submission
  /**
   * Handles form submission for creating a trip.
   * Validates that all travel methods are filled if pins >= 2.
   * Prepares trip data and (in real app) would send to backend.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMethodError(null);

    // Validation: If method bar is available (pins >= 2), all methods must be non-empty
    if (formData.pins.length > 1) {
      const requiredMethods = formData.pins.length - 1;
      const hasEmpty = formData.method.length !== requiredMethods || formData.method.some(m => !m || m.trim() === '');
      if (hasEmpty) {
        setMethodError('Please fill in all travel methods between pins.');
        return;
      }
    }

    setIsSubmitting(true);
    try {
      // Prepare the trip data for submission
      const tripData: Partial<Trip> = {
        tripId: `T${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
        destination: formData.title,
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: 'upcoming',
        description: formData.description,
        reviewStatus: 'not_required',
        imageUrl: formData.image,
        totalTravelers: 0, // Will be updated as people join
        highlights: formData.highlights,
        cost: formData.cost,
        difficulty: formData.difficulty,
        summary: formData.summary,
        createdBy: 'currentUser', // This would come from auth context
        travelBuddies: [],
        organizers: []
      };

      console.log('Creating trip:', tripData);
      // Here you would make an API call to create the trip
      
      navigate('/trips');
    } catch (error) {
      console.error('Error creating trip:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handles changes to all form fields (including nested cost fields)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'cost.amount') {
      setFormData(prev => ({
        ...prev,
        cost: { ...prev.cost, amount: Number(value) }
      }));
    } else if (name === 'cost.currency') {
      setFormData(prev => ({
        ...prev,
        cost: { ...prev.cost, currency: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Toggles an activity in the activities array
  const toggleActivity = (activity: string) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }));
  };

  // Adds a new highlight to the highlights array
  const addHighlight = () => {
    if (newHighlight.trim()) {
      setFormData(prev => ({
        ...prev,
        highlights: [...prev.highlights, newHighlight.trim()],
        summary: {
          ...prev.summary,
          highlights: [...prev.summary.highlights, newHighlight.trim()]
        }
      }));
      setNewHighlight('');
    }
  };

  // Removes a highlight by index from highlights and summary
  const removeHighlight = (index: number) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
      summary: {
        ...prev.summary,
        highlights: prev.summary.highlights.filter((_, i) => i !== index)
      }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-semibold mb-6">Create New Trip</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900">Basic Information</h2>
            
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Trip Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                placeholder="Enter trip title"
                required
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                  placeholder="Enter location"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Participants
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  id="maxParticipants"
                  name="maxParticipants"
                  min="1"
                  max="50"
                  value={formData.maxParticipants}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900">Trip Details</h2>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                placeholder="Describe your trip..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activities
              </label>
              <div className="flex flex-wrap gap-2">
                {availableActivities.map(activity => (
                  <button
                    key={activity}
                    type="button"
                    onClick={() => toggleActivity(activity)}
                    className={`px-4 py-2 rounded-full text-sm ${
                      formData.activities.includes(activity)
                        ? 'bg-brand-orange text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {activity}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty Level
              </label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                required
              >
                <option value="easy">Easy</option>
                <option value="moderate">Moderate</option>
                <option value="difficult">Difficult</option>
              </select>
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Cover Image URL
              </label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                  placeholder="Enter image URL"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trip Highlights
              </label>
              <div className="space-y-2">
                {formData.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="flex-1 bg-gray-50 px-4 py-2 rounded-lg">{highlight}</span>
                    <button
                      type="button"
                      onClick={() => removeHighlight(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    placeholder="Add a highlight..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                  />
                  <Button
                    type="button"
                    onClick={addHighlight}
                    disabled={!newHighlight.trim()}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cost.amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Cost Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    id="cost.amount"
                    name="cost.amount"
                    value={formData.cost.amount}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="cost.currency" className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <select
                  id="cost.currency"
                  name="cost.currency"
                  value={formData.cost.currency}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                  required
                >
                  {currencies.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Location Search UI (for adding pins) */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900">Add Pins (by clicking map or searching location)</h2>
            <div className="flex flex-col gap-2" ref={locationSearchRef}>
              <input
                type="text"
                value={locationSearch}
                onChange={e => setLocationSearch(e.target.value)}
                onFocus={() => locationResults.length > 0 && setShowLocationResults(true)}
                placeholder="Search for a location to drop a pin..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
              />
              {isLocLoading && <div className="text-xs text-gray-500">Searching...</div>}
              {showLocationResults && locationResults.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg shadow max-h-60 overflow-y-auto z-10">
                  {locationResults.map((loc, idx) => (
                    <div
                      key={idx}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex flex-col"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          pins: [...prev.pins, { latitude: parseFloat(loc.lat), longitude: parseFloat(loc.lon) }]
                        }));
                        setLocationSearch('');
                        setLocationResults([]);
                        setShowLocationResults(false);
                      }}
                    >
                      <span className="font-medium text-gray-800 truncate">{loc.display_name.split(',')[0]}</span>
                      <span className="text-xs text-gray-500 truncate">{loc.display_name}</span>
                      {loc.address && (
                        <span className="text-xs text-gray-400">{Object.values(loc.address).join(', ')}</span>
                      )}
                      <span className="text-xs text-gray-400">{loc.type} ({loc.class})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Method Array Section */}
          {/* OSM Map Section with Polyline and Distance */}
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-gray-900">Map (Add pins by clicking or search above)</h2>
            <div style={{ width: '100%', height: '350px' }}>
              <MapContainer center={[28.2096, 83.9856]} zoom={13} style={{ width: '100%', height: '100%' }}>
                <TileLayer
                  // @ts-ignore
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <AddPinOnMap onAddPin={(lat, lng) => setFormData(prev => ({ ...prev, pins: [...prev.pins, { latitude: lat, longitude: lng }] }))} />
                {/* Render a numbered marker for each pin. Clicking removes the pin. */}
                {formData.pins.map((pin, idx) => {
                  // Create a custom numbered icon for each pin
                  const icon = L.divIcon({
                    className: 'custom-pin-label',
                    html: `<div style="background: #fff; border: 2px solid #f97316; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #f97316; font-size: 1.1rem; box-shadow: 0 2px 6px rgba(0,0,0,0.15);">${idx + 1}</div>`,
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                    popupAnchor: [0, -32]
                  });
                  return (
                    <Marker
                      key={idx}
                      position={[pin.latitude, pin.longitude]}
                      icon={icon}
                      eventHandlers={{
                        click: () => {
                          // Remove pin on marker click
                          setFormData(prev => ({
                            ...prev,
                            pins: prev.pins.filter((_, i) => i !== idx)
                          }));
                        }
                      }}
                    />
                  );
                })}
                {/* Polyline for actual route between pins (from OSRM) */}
                {/* Polyline for the actual route between pins (follows roads, not straight lines) */}
                {routeGeometry.length > 1 && (
                  <Polyline
                    positions={routeGeometry}
                    pathOptions={{ color: 'orange', weight: 4 }}
                  />
                )}
              </MapContainer>
            </div>
            {/* Show total route distance if available */}
            {routeGeometry.length > 1 && (
              <div className="text-sm text-gray-700 font-medium">
                Route distance: {routeDistance.toFixed(2)} km
              </div>
            )}
            <div className="text-xs text-gray-500">
              Click on the map or use the search above to add a pin. Path and distance will be shown on the map.
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900">Travel Methods (Between Pins)</h2>
            <div className="space-y-2">
              {formData.pins.length < 2 ? (
                <div className="text-gray-500 text-sm">You must enter a travel method for the segment between two pins.</div>
              ) : (
                <>
                  {methodError && (
                    <div className="text-red-500 text-xs mb-2">{methodError}</div>
                  )}
                  <div className="flex flex-col gap-2">
                    {formData.pins.slice(0, -1).map((_, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="bg-gray-50 px-2 py-1 rounded text-xs text-gray-700">
                          {`Pin ${idx + 1} → Pin ${idx + 2}`}
                        </span>
                        <input
                          type="text"
                          value={formData.method[idx] || ''}
                          onChange={e => {
                            const value = e.target.value;
                            setFormData(prev => {
                              const updated = [...prev.method];
                              updated[idx] = value;
                              return { ...prev, method: updated };
                            });
                          }}
                          placeholder={`Method between Pin ${idx + 1} and Pin ${idx + 2}`}
                          className={`flex-1 px-4 py-2 border ${methodError && (!formData.method[idx] || formData.method[idx].trim() === '') ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange`}
                        />
                        {formData.method[idx] && (
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => {
                                const updated = [...prev.method];
                                updated.splice(idx, 1);
                                return { ...prev, method: updated };
                              });
                            }}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Trip'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}