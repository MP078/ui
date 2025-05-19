import { UserProfile, UserPost, UserPhoto, UserReview, UserGuide } from '../types/user';

// Mock data for demonstration purposes
const mockUsers: Record<string, UserProfile> = {
  '1': {
    id: '1',
    name: 'Sarah Chen',
    username: 'sarahchen',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
    location: 'San Francisco, CA',
    bio: 'Adventure seeker | Photography Enthusiast | Mountain Lover',
    verified: true,
    isOnline: false,
    lastActive: '2 hours ago',
    email: 'sarah.chen@example.com',
    website: 'www.sarahchen.travel',
    languages: ['English (Native)', 'French (Fluent)', 'Nepali (Basic)'],
    interests: ['Mountain Trekking', 'Travel Photography', 'Cultural Exploration', 'Adventure Sports', 'Local Cuisine'],
    certifications: [
      'Certified Mountain Guide - IFMGA',
      'Wilderness First Responder',
      'Advanced Photography - National Geographic'
    ],
    stats: {
      trips: 45,
      guides: 10,
      travelDays: 100,
      places: 13,
      connections: 5000
    }
  },
  '2': {
    id: '2',
    name: 'Mike Johnson',
    username: 'mikej',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    coverImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800',
    location: 'London, UK',
    bio: 'Travel writer | Food enthusiast | History buff',
    verified: true,
    isOnline: true,
    languages: ['English (Native)', 'Spanish (Conversational)'],
    interests: ['Urban Exploration', 'Food Tourism', 'Historical Sites', 'Museums', 'Architecture'],
    stats: {
      trips: 32,
      guides: 5,
      travelDays: 78,
      places: 9,
      connections: 3200
    }
  }
};

// Mock connections data with status
interface ConnectionStatus {
  status: 'connected' | 'requested' | 'none';
  timestamp: string;
}

const mockConnectionStatuses: Record<string, Record<string, ConnectionStatus>> = {
  '1': {
    '2': { status: 'connected', timestamp: '2024-03-15' },
    '3': { status: 'requested', timestamp: '2024-03-16' }
  },
  '2': {
    '1': { status: 'connected', timestamp: '2024-03-15' },
    '4': { status: 'requested', timestamp: '2024-03-17' }
  }
};

const mockPosts: Record<string, UserPost[]> = {
  '1': [
    {
      id: '1',
      user: {
        name: 'Sarah Chen',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        location: 'Pokhara, Nepal',
        verified: true
      },
      content: {
        text: "Just experienced the most breathtaking sunrise over Phewa lake! The reflection of the Annapurna range on the crystal clear water was absolutely magical.",
        images: ['https://images.unsplash.com/photo-1544735716-392fe2489ffa'],
        timestamp: '2 hours ago'
      },
      engagement: {
        likes: 250,
        comments: 30,
        shares: 10
      }
    },
    {
      id: '2',
      user: {
        name: 'Sarah Chen',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        location: 'Kathmandu, Nepal',
        verified: true
      },
      content: {
        text: "Exploring the ancient temples of Kathmandu Durbar Square. The architecture and history here is simply incredible!",
        images: ['https://images.unsplash.com/photo-1582654454409-778f6619ddc6'],
        timestamp: '2 days ago'
      },
      engagement: {
        likes: 500,
        comments: 100,
        shares: 100
      }
    }
  ],
  '2': [
    {
      id: '1',
      user: {
        name: 'Mike Johnson',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
        location: 'Rome, Italy',
        verified: true
      },
      content: {
        text: "The Colosseum at sunset is an experience everyone should have at least once. The history here is palpable.",
        images: ['https://images.unsplash.com/photo-1552832230-c0197dd311b5'],
        timestamp: '1 day ago'
      },
      engagement: {
        likes: 320,
        comments: 45,
        shares: 15
      }
    }
  ]
};

const mockPhotos: Record<string, UserPhoto[]> = {
  '1': [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
      location: 'Everest Base Camp',
      likes: 245
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1582654454409-778f6619ddc6',
      location: 'Kathmandu Durbar Square',
      likes: 189
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1585938389612-a552a28d6914',
      location: 'Pokhara Lake',
      likes: 320
    }
  ],
  '2': [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
      location: 'Rome Colosseum',
      likes: 310
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1499678329028-101435549a4e',
      location: 'Venice Canals',
      likes: 275
    }
  ]
};

const mockReviews: Record<string, UserReview[]> = {
  '1': [
    {
      id: 1,
      destination: 'Everest Base Camp Trek',
      rating: 5,
      comment: "An incredible journey with breathtaking views. The guide was extremely knowledgeable and helpful.",
      date: "March 15, 2024",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa"
    },
    {
      id: 2,
      destination: 'Annapurna Circuit',
      rating: 4,
      comment: "Beautiful trek with amazing mountain views. Well organized and great support team.",
      date: "February 1, 2024",
      image: "https://images.unsplash.com/photo-1585938389612-a552a28d6914"
    }
  ],
  '2': [
    {
      id: 1,
      destination: 'Rome City Tour',
      rating: 5,
      comment: "Incredible historical sites and amazing food. The local guide was very knowledgeable.",
      date: "April 10, 2024",
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5"
    }
  ]
};

const mockGuides: Record<string, UserGuide[]> = {
  '1': [
    {
      id: 1,
      title: "Ultimate Everest Base Camp Guide",
      description: "A comprehensive guide to preparing and completing the EBC trek",
      location: "Everest Region",
      duration: "14 days",
      groupSize: "8-12 people",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
      downloads: 1200
    },
    {
      id: 2,
      title: "Annapurna Circuit Adventure",
      description: "Complete guide to trekking the Annapurna Circuit",
      location: "Annapurna Region",
      duration: "12-15 days",
      groupSize: "6-10 people",
      image: "https://images.unsplash.com/photo-1585938389612-a552a28d6914",
      downloads: 850
    }
  ],
  '2': [
    {
      id: 1,
      title: "Rome in 3 Days",
      description: "The perfect itinerary to see the best of Rome in a short time",
      location: "Rome, Italy",
      duration: "3 days",
      groupSize: "Any",
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
      downloads: 950
    }
  ]
};

const mockActivities: Record<string, { id: string; text: string; timestamp: string }[]> = {
  '1': [
    { id: '1', text: 'Completed Everest Base Camp Trek', timestamp: '2 days ago' },
    { id: '2', text: 'Added 15 new photos', timestamp: '5 days ago' },
    { id: '3', text: 'Published a new guide', timestamp: '1 week ago' }
  ],
  '2': [
    { id: '1', text: 'Visited Rome Colosseum', timestamp: '1 day ago' },
    { id: '2', text: 'Added 8 new photos', timestamp: '3 days ago' }
  ]
};

const mockAchievements: Record<string, { id: string; icon: string; name: string }[]> = {
  '1': [
    { id: '1', icon: '🏔️', name: 'Summit Seeker' },
    { id: '2', icon: '📸', name: 'Photo Pro' },
    { id: '3', icon: '🌏', name: 'Globe Trotter' }
  ],
  '2': [
    { id: '1', icon: '🏛️', name: 'History Buff' },
    { id: '2', icon: '🍕', name: 'Food Explorer' },
    { id: '3', icon: '🌍', name: 'Euro Tripper' }
  ]
};

// Simulate API calls with delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const userService = {
  // Get user profile
  getUserProfile: async (userId: string): Promise<UserProfile> => {
    await delay(800);
    const user = mockUsers[userId];
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },

  // Get user posts
  getUserPosts: async (userId: string): Promise<UserPost[]> => {
    await delay(1000);
    return mockPosts[userId] || [];
  },

  // Get user photos
  getUserPhotos: async (userId: string): Promise<UserPhoto[]> => {
    await delay(1000);
    return mockPhotos[userId] || [];
  },

  // Get user reviews
  getUserReviews: async (userId: string): Promise<UserReview[]> => {
    await delay(1000);
    return mockReviews[userId] || [];
  },

  // Get user guides
  getUserGuides: async (userId: string): Promise<UserGuide[]> => {
    await delay(1000);
    return mockGuides[userId] || [];
  },

  // Get user activities
  getUserActivities: async (userId: string): Promise<{ id: string; text: string; timestamp: string }[]> => {
    await delay(800);
    return mockActivities[userId] || [];
  },

  // Get user achievements
  getUserAchievements: async (userId: string): Promise<{ id: string; icon: string; name: string }[]> => {
    await delay(800);
    return mockAchievements[userId] || [];
  },

  // Updated connection status check
  checkConnectionStatus: async (userId: string): Promise<{ status: 'connected' | 'requested' | 'none' }> => {
    await delay(500);
    const currentUserId = '1'; // This would normally come from auth context
    const status = mockConnectionStatuses[currentUserId]?.[userId]?.status || 'none';
    return { status };
  },

  // Updated connect with user
  connectWithUser: async (userId: string): Promise<{ success: boolean; message: string }> => {
    await delay(1000);
    const currentUserId = '1'; // This would normally come from auth context
    
    if (!mockConnectionStatuses[currentUserId]) {
      mockConnectionStatuses[currentUserId] = {};
    }
    
    mockConnectionStatuses[currentUserId][userId] = {
      status: 'requested',
      timestamp: new Date().toISOString()
    };
    
    return { success: true, message: 'Connection request sent successfully' };
  },

  // New method to disconnect from user
  disconnectFromUser: async (userId: string): Promise<{ success: boolean; message: string }> => {
    await delay(1000);
    const currentUserId = '1'; // This would normally come from auth context
    
    if (mockConnectionStatuses[currentUserId]?.[userId]) {
      delete mockConnectionStatuses[currentUserId][userId];
    }
    
    return { success: true, message: 'Disconnected successfully' };
  },

  // Send message to user
  sendMessage: async (userId: string, message: string): Promise<{ success: boolean; message: string }> => {
    await delay(1000);
    return { success: true, message: 'Message sent successfully' };
  }
};