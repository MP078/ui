import React from "react";
import { MapPin, Navigation, X } from "lucide-react";
import { MapMarker, GeocodingResult } from "../../types/map";

interface InfoPanelProps {
  marker: MapMarker;
  locationInfo: GeocodingResult;
  onRemoveMarker: (markerId: string) => void;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({
  marker,
  locationInfo,
  onRemoveMarker,
}) => {
  return (
    <div className="mt-4 bg-white rounded-lg border p-4">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold flex items-center">
          <MapPin size={18} className="text-red-500 mr-1" />
          Location Details
        </h3>
        <button
          onClick={() => onRemoveMarker(marker.id)}
          className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
          aria-label="Remove marker"
        >
          <X size={18} />
        </button>
      </div>

      <div className="mt-3">
        <p className="text-sm font-medium">{locationInfo.display_name}</p>

        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div>
            <span className="block text-gray-500">Latitude</span>
            <span className="font-medium">{marker.lat.toFixed(6)}</span>
          </div>
          <div>
            <span className="block text-gray-500">Longitude</span>
            <span className="font-medium">{marker.lng.toFixed(6)}</span>
          </div>
        </div>

        <div className="mt-4 flex space-x-2">
          <a
            href={`https://www.openstreetmap.org/?mlat=${marker.lat}&mlon=${marker.lng}#map=16/${marker.lat}/${marker.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-full flex items-center transition-colors"
          >
            <Navigation size={14} className="mr-1" />
            View on OSM
          </a>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${marker.lat},${marker.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-green-50 text-green-600 hover:bg-green-100 px-3 py-1.5 rounded-full flex items-center transition-colors"
          >
            <Navigation size={14} className="mr-1" />
            View on Google Maps
          </a>
        </div>
      </div>
    </div>
  );
};
