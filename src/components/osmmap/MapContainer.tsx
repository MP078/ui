import React, { useState, useEffect } from "react";
import { MapView } from "./MapView";
import { SearchPanel } from "./SearchPanel";
import { InfoPanel } from "./InfoPanel";
import {
  MapMarker,
  MapPosition,
  MapViewport,
  GeocodingResult,
  RouteData,
} from "../../types/map";
import {
  getCurrentPosition,
  reverseGeocode,
  getRouteData,
} from "../../services/mapService";
import { MapControls } from "./MapControls";

const MapContainer: React.FC = () => {
  const [viewport, setViewport] = useState<MapViewport>({
    center: { lat: 51.505, lng: -0.09 },
    zoom: 13,
  });
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [locationInfo, setLocationInfo] = useState<GeocodingResult | null>(
    null
  );
  const [routeData, setRouteData] = useState<RouteData | undefined>(undefined);
  // Store user inputs for marker pairs
  const [userInputs, setUserInputs] = useState<string[]>([]);

  useEffect(() => {
    // Log coordinates whenever markers change
    const coordinates = markers.map((marker) => ({
      lat: marker.lat,
      lng: marker.lng,
    }));
    console.log("Marker coordinates:", coordinates);

    // For every n markers, take only new input for the new marker pair and save all past inputs
    if (markers.length >= 2) {
      if (userInputs.length < markers.length - 1) {
        // Only ask for the new input
        const input = window.prompt(
          `Enter input for marker pair ${userInputs.length + 1}:`
        );
        setUserInputs((prev) => [...prev, input ?? ""]);
        console.log(`User inputs for ${markers.length} markers:`, [
          ...userInputs,
          input ?? "",
        ]);
      } else {
        // No new input needed, just log
        console.log(`User inputs for ${markers.length} markers:`, userInputs);
      }
    } else if (markers.length < 2 && userInputs.length > 0) {
      // Reset userInputs if less than 2 markers
      setUserInputs([]);
    }

    if (markers.length >= 2) {
      const routeCoordinates = markers.map(
        (marker) => [marker.lat, marker.lng] as [number, number]
      );
      fetchRouteData(routeCoordinates);
    } else {
      setRouteData(undefined);
    }
  }, [markers]);

  const fetchRouteData = async (coordinates: [number, number][]) => {
    try {
      const data = await getRouteData(coordinates);
      setRouteData(data);
    } catch (err) {
      console.error("Failed to fetch route data:", err);
      setError("Failed to calculate route");
    }
  };

  const handleMapClick = async (position: MapPosition) => {
    setIsLoading(true);
    try {
      const info = await reverseGeocode(position);
      const newMarker: MapMarker = {
        id: Date.now().toString(),
        lat: position.lat,
        lng: position.lng,
        title: info?.display_name || "New Location",
      };

      setMarkers([...markers, newMarker]);
      setSelectedMarker(newMarker);
      setLocationInfo(info);
    } catch (err) {
      setError("Failed to get location info");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkerClick = async (marker: MapMarker) => {
    setSelectedMarker(marker);
    setIsLoading(true);

    try {
      const info = await reverseGeocode({ lat: marker.lat, lng: marker.lng });
      setLocationInfo(info);
    } catch (err) {
      setError("Failed to get location info");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocateMe = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const position = await getCurrentPosition();
      setViewport({
        center: position,
        zoom: 16,
      });
    } catch (err) {
      setError("Could not determine your location");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveMarker = (markerId: string) => {
    const newMarkers = markers.filter((marker) => marker.id !== markerId);
    setMarkers(newMarkers);
    // If a marker is removed, also remove the corresponding user input if needed
    if (newMarkers.length < userInputs.length + 1) {
      setUserInputs(userInputs.slice(0, newMarkers.length - 1));
    }
    if (selectedMarker?.id === markerId) {
      setSelectedMarker(null);
      setLocationInfo(null);
    }
  };

  const handleSearchResultSelect = (result: GeocodingResult) => {
    const position = {
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
    };

    setViewport({
      center: position,
      zoom: 16,
    });

    const newMarker: MapMarker = {
      id: Date.now().toString(),
      lat: position.lat,
      lng: position.lng,
      title: result.display_name,
    };

    setMarkers([...markers, newMarker]);
    setSelectedMarker(newMarker);
    setLocationInfo(result);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col md:flex-row h-full">
        <div className="w-full md:w-3/4 h-full relative">
          <MapView
            viewport={viewport}
            markers={markers}
            selectedMarker={selectedMarker}
            routeData={routeData}
            onViewportChanged={setViewport}
            onMapClick={handleMapClick}
            onMarkerClick={handleMarkerClick}
          />
          <MapControls onLocateMe={handleLocateMe} isLoading={isLoading} />
        </div>
        <div className="w-full md:w-1/4 bg-white shadow-lg overflow-y-auto">
          <div className="p-4">
            <SearchPanel onResultSelect={handleSearchResultSelect} />
            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
                {error}
              </div>
            )}
            {selectedMarker && locationInfo && (
              <InfoPanel
                marker={selectedMarker}
                locationInfo={locationInfo}
                onRemoveMarker={handleRemoveMarker}
              />
            )}
            {routeData && (
              <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                <h3 className="text-blue-700 font-medium">Route Information</h3>
                <p className="text-sm text-blue-600 mt-2">
                  Distance: {(routeData.distance / 1000).toFixed(2)} km
                </p>
                <p className="text-sm text-blue-600">
                  Duration: {Math.round(routeData.duration / 60)} minutes
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapContainer;
