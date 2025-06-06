export interface Trip {
    destination: string | undefined;
    id: string;
    title?: string;
    location: string;
    start_date: string;
    end_date: string;
    maximum_participants?: number;
    activities?: string[];
    description: string;
    difficulty?: 'easy' | 'moderate' | 'difficult';
    created_at?: string;
    updated_at?: string;
    can_join?: boolean;
    members_count?: number;
    cover_image_url?: string;
    participation_status?: string;
    status: 'upcoming' | 'ongoing' | 'completed';
    trip_status: 'open' | 'full' | 'in-progress';
    review_status: 'pending' | 'completed' | 'not_required';
    image_url?: string;
    total_traveler?: number;
    highlights?: string[];
    cost: string;
    travel_buddies?: TravelBuddy[];
    organizers?: Organizer[];
    organizer_requests?: OrganizerRequest[];
    created_by: string;
    image_urls?: string[];
    /**
     * Pins for the trip route. Each pin is a lat/lng point, optionally with a label.
     * Accepts both {lat, lng, label?} and {latitude, longitude, label?} for backend compatibility.
     */
    /**
     * Travel methods for each segment between pins (e.g., 'car', 'walk', 'train').
     * Should have length = pins.length - 1 if pins are present.
     */
    methods?: string[];
}

export interface TravelBuddy {
    name: string;
    username: string;
    image: string;
}

export interface Organizer extends TravelBuddy {
    role: 'creator' | 'organizer';
    joined_at: string;
}

export interface OrganizerRequest extends TravelBuddy {
    requested_at: string;
    status: 'pending' | 'accepted' | 'rejected';
}

export type TripStatus = Trip['status'];

export interface TripSummary {
    total_days: number;
    total_cost: number;
    highlights: string[];
    photos: string[];
}