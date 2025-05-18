export interface MapPosition {
  lat: number;
  lng: number;
}

export interface MapMarker extends MapPosition {
  id: string;
  title: string;
  description?: string;
}

export interface MapViewport {
  center: MapPosition;
  zoom: number;
}

export interface GeocodingResult {
  display_name: string;
  lat: string;
  lon: string;
  boundingbox?: [string, string, string, string];
  importance?: number;
  place_id?: number;
}

export interface RoutePoint {
  lat: number;
  lng: number;
  name?: string;
}

export interface RouteData {
  coordinates: [number, number][];
  distance: number;
  duration: number;
}

export interface MapEventHandlers {
  onMapClick?: (position: MapPosition) => void;
  onMarkerClick?: (marker: MapMarker) => void;
  onViewportChanged?: (viewport: MapViewport) => void;
}

export const DEFAULT_VIEWPORT: MapViewport = {
  center: { lat: 51.505, lng: -0.09 }, // London as default
  zoom: 13,
};