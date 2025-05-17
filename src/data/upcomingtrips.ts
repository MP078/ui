import { Trip, TripSummary } from '../types/trip';

export const upcomingTrips: Trip[] = [
    {
        id: 'T2024-001',
        location: 'Everest Base Camp Trek',
        startDate: '2024-03-15',
        endDate: '2024-03-28',
        status: 'upcoming',
        tripStatus: 'open',
        description: 'Experience the ultimate trek to Everest Base Camp with breathtaking Himalayan views.',
        reviewStatus: 'not_required',
        imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
        totalTravelers: 15,
        highlights: ['Reach Base Camp at 5,364m', 'Immerse in Sherpa traditions', 'Visit ancient monasteries'],
        cost: { amount: 2800, currency: 'USD' },
        createdBy: 'sarahchen',
        organizers: [
            {
                name: 'Sarah Chen',
                username: 'sarahchen',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
                role: 'creator',
                joinedAt: '2024-01-15'
            },
            {
                name: 'Mike Johnson',
                username: 'mikej',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
                role: 'organizer',
                joinedAt: '2024-02-01'
            }
        ],
        organizerRequests: [
            {
                name: 'Emma Wilson',
                username: 'emmaw',
                image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
                requestedAt: '2024-02-15',
                status: 'pending'
            }
        ],
        travelBuddies: [
            {
                name: 'Sarah Chen',
                username: 'sarahchen',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
            },
            {
                name: 'Mike Johnson',
                username: 'mikej',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
            }
        ],
        difficulty: 'difficult',
        summary: {
            totalDays: 14,
            totalCost: 2800,
            highlights: [
                'Will reach Everest Base Camp at 5,364m',
                'Will explore Sherpa villages and monasteries',
                'Will witness stunning Himalayan sunrises',
                'Will experience local culture and cuisine',
                'Will trek through diverse landscapes'
            ],
            photos: [
                'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
                'https://images.unsplash.com/photo-1585938389612-a552a28d6914',
                'https://images.unsplash.com/photo-1605640840605-14ac1855827b'
            ]
        }
    },
    {
        id: 'T2024-002',
        locatoin: 'Mardi Himal Trek',
        startDate: '2024-04-01',
        endDate: '2024-04-08',
        status: 'upcoming',
        tripStatus: 'open',
        description: 'A beautiful trek offering stunning views of the Annapurna range.',
        reviewStatus: 'not_required',
        imageUrl: 'https://images.unsplash.com/photo-1585938389612-a552a28d6914',
        totalTravelers: 10,
        highlights: ['View Annapurna panorama', 'Experience high camp sunrise', 'Stay in traditional teahouses'],
        cost: { amount: 1500, currency: 'USD' },
        createdBy: 'emmaw',
        organizers: [
            {
                name: 'Emma Wilson',
                username: 'emmaw',
                image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
                role: 'creator',
                joinedAt: '2024-02-01'
            }
        ],
        travelBuddies: [
            {
                name: 'Emma Wilson',
                username: 'emmaw',
                image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb'
            }
        ],
        difficulty: 'moderate',
        summary: {
            totalDays: 8,
            totalCost: 1500,
            highlights: [
                'Will see panoramic views of Annapurna range',
                'Will experience high camp sunrise',
                'Will stay in traditional teahouses',
                'Will trek through rhododendron forests',
                'Will encounter local villages'
            ],
            photos: [
                'https://images.unsplash.com/photo-1585938389612-a552a28d6914',
                'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
                'https://images.unsplash.com/photo-1605640840605-14ac1855827b'
            ]
        }
    },
    {
        id: 'T2024-003',
        locatoin: 'Santorini, Greece',
        startDate: '2024-05-10',
        endDate: '2024-05-17',
        status: 'upcoming',
        tripStatus: 'open',
        description: 'Explore the iconic white-washed buildings and stunning sunsets of Santorini.',
        reviewStatus: 'not_required',
        imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
        totalTravelers: 8,
        highlights: ['Watch Oia sunset', 'Visit ancient ruins', 'Sail to volcanic islands'],
        cost: { amount: 2200, currency: 'USD' },
        createdBy: 'lisab',
        organizers: [
            {
                name: 'Lisa Brown',
                username: 'lisab',
                image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
                role: 'creator',
                joinedAt: '2024-02-10'
            }
        ],
        organizerRequests: [
            {
                name: 'Sarah Chen',
                username: 'sarahchen',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
                requestedAt: '2024-02-20',
                status: 'pending'
            }
        ],
        travelBuddies: [
            {
                name: 'Lisa Brown',
                username: 'lisab',
                image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9'
            }
        ],
        difficulty: 'easy',
        summary: {
            totalDays: 8,
            totalCost: 2200,
            highlights: [
                'Will watch sunset in Oia',
                'Will explore ancient Thera ruins',
                'Will sail to volcanic islands',
                'Will taste local wines',
                'Will visit black sand beaches'
            ],
            photos: [
                'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
                'https://images.unsplash.com/photo-1519046904884-53103b34b206'
            ]
        }
    }
];

export const travelHistory: Trip[] = [
    {
        id: 'T2024-007',
        locatoin: 'Tokyo, Japan',
        startDate: '2024-03-10',
        endDate: '2024-03-20',
        status: 'ongoing',
        tripStatus: 'in-progress',
        description: 'Immersing in Japanese culture, from ancient temples to modern technology, while savoring authentic Japanese cuisine.',
        reviewStatus: 'not_required',
        imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
        totalTravelers: 3,
        highlights: ['Navigate Shibuya Crossing', 'View Mount Fuji', 'Visit Senso-ji Temple'],
        cost: { amount: 3500, currency: 'USD' },
        createdBy: 'mikej',
        organizers: [
            {
                name: 'Mike Johnson',
                username: 'mikej',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
                role: 'creator',
                joinedAt: '2024-01-15'
            }
        ],
        travelBuddies: [
            {
                name: 'Mike Johnson',
                username: 'mikej',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
            }
        ],
        difficulty: 'moderate',
        summary: {
            totalDays: 11,
            totalCost: 3500,
            highlights: [
                'Will explore ancient temples in Tokyo',
                'Will experience Mount Fuji views',
                'Will navigate Shibuya Crossing',
                'Will enjoy authentic sushi experiences',
                'Will visit traditional gardens'
            ],
            photos: [
                'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
                'https://images.unsplash.com/photo-1542051841857-5f90071e7989',
                'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e'
            ]
        }
    },
    {
        id: 'T2023-052',
        locatoin: 'Bali, Indonesia',
        startDate: '2023-12-01',
        endDate: '2023-12-10',
        status: 'completed',
        tripStatus: 'full',
        description: 'A tropical paradise getaway featuring pristine beaches, ancient temples, and luxurious spa treatments.',
        reviewStatus: 'pending',
        imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
        totalTravelers: 4,
        highlights: ['Visit Uluwatu Temple', 'See Ubud Rice Terraces', 'Relax at Nusa Dua Beach'],
        cost: { amount: 2800, currency: 'USD' },
        createdBy: 'alexyt',
        organizers: [
            {
                name: 'Alexy Thompson',
                username: 'alexyt',
                image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
                role: 'creator',
                joinedAt: '2023-11-01'
            },
            {
                name: 'Alex Thompson',
                username: 'alext',
                image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
                role: 'organizer',
                joinedAt: '2023-11-15'
            }
        ],
        travelBuddies: [
            {
                name: 'Alexy Thompson',
                username: 'alexyt',
                image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'
            },
            {
                name: 'Alex Thompson',
                username: 'alext',
                image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'
            }
        ],
        difficulty: 'easy',
        summary: {
            totalDays: 10,
            totalCost: 2800,
            highlights: [
                'Will explore ancient temples in Ubud',
                'Will take surfing lessons at Nusa Dua Beach',
                'Will attend traditional cooking class',
                'Will trek to Mount Batur at sunrise',
                'Will enjoy spa day at luxury resort'
            ],
            photos: [
                'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
                'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b',
                'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1'
            ]
        }
    }
];