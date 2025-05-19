export interface Trip {
  tripId: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  tripStatus: 'open' | 'full' | 'in-progress';
  description: string;
  reviewStatus: 'pending' | 'completed' | 'not_required';
  imageUrl?: string;
  totalTravelers?: number;
  highlights?: string[];
  cost?: {
    amount: number;
    currency: string;
  };
  travelBuddies?: TravelBuddy[];
  organizers?: Organizer[];
  organizerRequests?: OrganizerRequest[];
  createdBy: string;
  difficulty?: 'easy' | 'moderate' | 'difficult';
  summary?: TripSummary;
  /**
   * Pins for the trip route (used in map route preview). Optional.
   * Each pin should have latitude, longitude, and optional label.
   */
  pins?: Array<{ latitude: number; longitude: number; label?: string }>;

  /**
   * Travel methods between pins (e.g., walk, drive, bus). Optional.
   * Should be pins.length - 1 in length if present.
   */
  method?: string[];

  /**
   * Precomputed route geometry as an array of [lat, lng] pairs (for map polyline)
   */
  routeGeometry?: Array<[number, number]>;

  /**
   * Precomputed total route distance in kilometers
   */
  routeDistance?: number;
}

export interface TravelBuddy {
  name: string;
  username: string;
  image: string;
}

export interface Organizer extends TravelBuddy {
  role: 'creator' | 'organizer';
  joinedAt: string;
}

export interface OrganizerRequest extends TravelBuddy {
  requestedAt: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export type TripStatus = Trip['status'];

export interface TripSummary {
  totalDays: number;
  totalCost: number;
  highlights: string[];
  photos: string[];
}