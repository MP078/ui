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