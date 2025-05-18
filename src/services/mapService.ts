import { GeocodingResult, MapPosition, RouteData } from '../types/map';

const NOMINATIM_API = 'https://nominatim.openstreetmap.org';
const OSRM_API = 'https://router.project-osrm.org/route/v1';

/**
 * Search for locations by query string
 */
export const searchLocations = async (query: string): Promise<GeocodingResult[]> => {
    const params = new URLSearchParams({
        format: 'json',
        q: query,
        limit: '5',
    });

    try {
        const response = await fetch(`${NOMINATIM_API}/search?${params}`, {
            headers: {
                'Accept-Language': 'en-US,en;q=0.9',
                'User-Agent': 'MapApp/1.0',
            },
        });

        if (!response.ok) {
            throw new Error(`Search failed: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error searching locations:', error);
        return [];
    }
};

/**
 * Reverse geocode a position to get address information
 */
export const reverseGeocode = async (position: MapPosition): Promise<GeocodingResult | null> => {
    const params = new URLSearchParams({
        format: 'json',
        lat: position.lat.toString(),
        lon: position.lng.toString(),
    });

    try {
        const response = await fetch(`${NOMINATIM_API}/reverse?${params}`, {
            headers: {
                'Accept-Language': 'en-US,en;q=0.9',
                'User-Agent': 'MapApp/1.0',
            },
        });

        if (!response.ok) {
            throw new Error(`Reverse geocoding failed: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error reverse geocoding:', error);
        return null;
    }
};

/**
 * Get the user's current position using browser geolocation
 */
export const getCurrentPosition = (): Promise<MapPosition> => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (error) => {
                reject(error);
            }
        );
    });
};

/**
 * Get route data between multiple coordinates using OSRM
 */
export const getRouteData = async (coordinates: [number, number][]): Promise<RouteData> => {
    if (coordinates.length < 2) {
        throw new Error('At least 2 coordinates are required for routing');
    }

    const coordinateString = coordinates
        .map(coord => `${coord[1]},${coord[0]}`)
        .join(';');

    try {
        const response = await fetch(
            `${OSRM_API}/driving/${coordinateString}?overview=full&geometries=geojson`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch route data');
        }

        const data = await response.json();
        const route = data.routes[0];

        return {
            coordinates: route.geometry.coordinates.map(coord => [coord[1], coord[0]]),
            distance: route.distance,
            duration: route.duration
        };
    } catch (error) {
        console.error('Error fetching route:', error);
        throw error;
    }
};