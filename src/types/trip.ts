export interface Trip {
  tripId: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  description: string;
  reviewStatus: 'pending' | 'completed' | 'not_required';
  imageUrl?: string;
  totalTravelers?: number;
  highlights?: string[];
  cost?: {
    amount: number;
    currency: string;
  };
  travelBuddy?: {
    name: string;
    image: string;
  };
  difficulty?: 'easy' | 'moderate' | 'difficult';
}

export type TripStatus = Trip['status'];

export interface TripSummary {
  totalDays: number;
  totalCost: number;
  highlights: string[];
  photos: string[];
}