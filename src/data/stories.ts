export interface Story {
  id: string;
  user: {
    id: string;
    name: string;
    image: string;
    timestamp?: string;
    location?: string;
  };
  stories: Array<{
    id: string;
    image: string;
    duration: number;
    type: 'image';
    caption?: string;
    location?: string;
    music?: {
      title: string;
      artist: string;
    };
  }>;
}

export const stories: Story[] = [
  {
    id: '1',
    user: {
      id: '1',
      name: 'Nancy_drew',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      timestamp: '2h ago',
      location: 'Everest Base Camp'
    },
    stories: [
      {
        id: '1-1',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
        duration: 5000,
        type: 'image',
        caption: 'Beautiful sunrise at Base Camp! 🏔️',
        location: 'Everest Base Camp, Nepal',
        music: {
          title: 'Mountain Vibes',
          artist: 'Nature Sounds'
        }
      },
      {
        id: '1-2',
        image: 'https://images.unsplash.com/photo-1585938389612-a552a28d6914',
        duration: 5000,
        type: 'image',
        caption: 'The journey continues...',
        location: 'Everest Base Camp, Nepal'
      }
    ]
  },
  {
    id: '2',
    user: {
      id: '2',
      name: 'Joshua_98',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      timestamp: '3h ago',
      location: 'Pokhara'
    },
    stories: [
      {
        id: '2-1',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
        duration: 5000,
        type: 'image',
        caption: 'Paradise found! 🌄',
        location: 'Pokhara, Nepal'
      },
      {
        id: '2-2',
        image: 'https://images.unsplash.com/photo-1585938389612-a552a28d6914',
        duration: 5000,
        type: 'image',
        caption: 'Sunset vibes',
        location: 'Pokhara Lake'
      }
    ]
  },
  {
    id: '3',
    user: {
      id: '3',
      name: 'Simone123',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
      timestamp: '5h ago',
      location: 'Kathmandu'
    },
    stories: [
      {
        id: '3-1',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
        duration: 5000,
        type: 'image',
        caption: 'Temple hopping in Kathmandu 🏯',
        location: 'Kathmandu, Nepal',
        music: {
          title: 'Nepal Beats',
          artist: 'Traditional'
        }
      }
    ]
  }
];