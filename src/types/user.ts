export interface UserProfile {
  id: string;
  name: string;
  username?: string;
  image: string;
  coverImage: string;
  location: string;
  bio: string;
  verified: boolean;
  isOnline?: boolean;
  lastActive?: string;
  email?: string;
  phone?: string;
  website?: string;
  languages?: string[];
  interests?: string[];
  certifications?: string[];
  stats: {
    trips: number;
    guides: number;
    travelDays: number;
    places: number;
    connections: number;
  };
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
  id: number;
  destination: string;
  rating: number;
  comment: string;
  date: string;
  image: string;
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