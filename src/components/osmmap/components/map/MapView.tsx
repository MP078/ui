import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, ZoomControl, Polyline } from 'react-leaflet';
import { MapMarker, MapPosition, MapViewport, RouteData } from '../../types/map';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';

const defaultIcon = icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapEvents: React.FC<{
  onMapClick?: (position: MapPosition) => void;
  onViewportChanged?: (viewport: MapViewport) => void;
}> = ({ onMapClick, onViewportChanged }) => {
  const map = useMap();

  useMapEvents({
    click: (e) => {
      if (onMapClick) {
        onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
      }
    },
    moveend: () => {
      if (onViewportChanged) {
        const center = map.getCenter();
        onViewportChanged({
          center: { lat: center.lat, lng: center.lng },
          zoom: map.getZoom(),
        });
      }
    },
    zoomend: () => {
      if (onViewportChanged) {
        const center = map.getCenter();
        onViewportChanged({
          center: { lat: center.lat, lng: center.lng },
          zoom: map.getZoom(),
        });
      }
    },
  });

  return null;
};

const ChangeView: React.FC<{ center: MapPosition; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView([center.lat, center.lng], zoom);
  }, [center, zoom, map]);
  
  return null;
};

interface MapViewProps {
  viewport: MapViewport;
  markers: MapMarker[];
  selectedMarker: MapMarker | null;
  routeData?: RouteData;
  onViewportChanged: (viewport: MapViewport) => void;
  onMapClick?: (position: MapPosition) => void;
  onMarkerClick?: (marker: MapMarker) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  viewport,
  markers,
  selectedMarker,
  routeData,
  onViewportChanged,
  onMapClick,
  onMarkerClick,
}) => {
  return (
    <MapContainer
      center={[viewport.center.lat, viewport.center.lng]}
      zoom={viewport.zoom}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
      attributionControl={true}
      doubleClickZoom={true}
      scrollWheelZoom={true}
      dragging={true}
      easeLinearity={0.35}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" />
      
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={[marker.lat, marker.lng]}
          icon={defaultIcon}
          eventHandlers={{
            click: () => onMarkerClick && onMarkerClick(marker),
          }}
        >
          <Popup>
            <div>
              <h3 className="font-medium">{marker.title}</h3>
              {marker.description && <p>{marker.description}</p>}
              <p className="text-xs text-gray-500 mt-1">
                Lat: {marker.lat.toFixed(6)}, Lng: {marker.lng.toFixed(6)}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}

      {routeData && (
        <Polyline
          positions={routeData.coordinates}
          color="#3B82F6"
          weight={4}
          opacity={0.8}
        />
      )}
      
      <ChangeView center={viewport.center} zoom={viewport.zoom} />
      <MapEvents onMapClick={onMapClick} onViewportChanged={onViewportChanged} />
    </MapContainer>
  );
};