export interface UserProfile {
    id?: string;
    name?: string;
    username?: string;
    email?: string;
    image_url: string;
    verified: boolean | false;
    total_trips: number | 0;
    travel_days: number | 0;
    connections: number | 0;
    member_since: string | "";
    interests: string[] | [];
    languages: string[] | [];
    website: string | "";
    certifications: string[] | [];
    bio: string | "";
    about: string | "";
    location: string | "";
    phone: string | "";
    friendship_status: string
}

export interface UserPost {
    id: string;
    user: {
        name: string;
        image: string;
        location: string;
        verified?: boolean;
    };
    content: {
        text: string;
        images?: string[];
        timestamp: string;
    };
    engagement: {
        likes: number;
        comments: number;
        shares: number;
    };
}

export interface UserPhoto {
    id: number;
    url: string;
    location: string;
    likes: number;
}

export interface UserReview {
  id: string;
  reviewer: {
    id: string;
    username: string;
    name: string;
  };
  value: number;
  overall_experience: number;
  communication: number;
  reliability: number;
  travel_compatibility: number;
  respect_consideration: number;
  review: string;
  recommend: boolean;
  image_urls: string[];
  created_at: string;
}

export interface UserGuide {
    id: number;
    title: string;
    description: string;
    location: string;
    duration: string;
    groupSize: string;
    image: string;
    downloads: number;
}