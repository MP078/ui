import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ChevronRight, Eye, Star, X, AlertTriangle, MoreVertical, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { SearchBar } from '../components/search/SearchBar';
import { TripHistoryCard } from '../components/trips/TripHistoryCard';
import { TripSummaryModal } from '../components/trips/TripSummaryModal';
import { ReviewModal } from '../components/reviews/ReviewModal';
import { TripDetailModal } from '../components/trips/TripDetailModal';
import { Trip, TripSummary } from '../types/trip';
import { StatCard } from '../components/stats/StatCard';
import { ConfirmationDialog } from '../components/ui/confirmation-dialog';

const statistics = {
  totalTrips: 45,
  places: 13,
  travelGroups: 10,
  travelDays: 100,
  connections: 5000
};

const statisticsDetails = {
  places: [
    { id: '1', name: 'Everest Base Camp', country: 'Nepal', visitDate: '2024-01-15' },
    { id: '2', name: 'Annapurna Circuit', country: 'Nepal', visitDate: '2023-12-10' },
    { id: '3', name: 'Pokhara', country: 'Nepal', visitDate: '2023-11-20' },
    { id: '4', name: 'Kathmandu', country: 'Nepal', visitDate: '2023-10-05' },
  ],
  travelGroups: [
    { id: '1', name: 'Adventure Seekers', members: 12, tripCount: 5 },
    { id: '2', name: 'Culture Explorers', members: 8, tripCount: 3 },
    { id: '3', name: 'Mountain Lovers', members: 15, tripCount: 7 },
  ],
  travelDays: [
    { id: '1', trip: 'Everest Base Camp', startDate: '2024-01-15', endDate: '2024-01-28', days: 14 },
    { id: '2', trip: 'Annapurna Circuit', startDate: '2023-12-10', endDate: '2023-12-22', days: 13 },
    { id: '3', trip: 'Pokhara Trip', startDate: '2023-11-20', endDate: '2023-11-25', days: 6 },
  ],
  connections: [
    { 
      id: '1', 
      name: 'Sarah Chen', 
      username: '@sarahchen',
      location: 'San Francisco, USA', 
      tripsTogether: 3,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
    },
    { 
      id: '2', 
      name: 'Mike Johnson', 
      username: '@mikej',
      location: 'London, UK', 
      tripsTogether: 2,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
    },
    { 
      id: '3', 
      name: 'Raj Patel', 
      username: '@rajpatel',
      location: 'Mumbai, India', 
      tripsTogether: 4,
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'
    },
    { 
      id: '4', 
      name: 'Emma Wilson', 
      username: '@emmaw',
      location: 'Sydney, Australia', 
      tripsTogether: 1,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb'
    }
  ]
};

const upcomingTrips = [
  {
    id: '1',
    title: 'Everest Base Camp Trek',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
    date: 'March 15 - March 28',
    people: 15,
    difficulty: 'difficult'
  },
  {
    id: '2',
    title: 'Mardi Himal Trek',
    image: 'https://images.unsplash.com/photo-1585938389612-a552a28d6914',
    date: 'March 15 - March 28',
    people: 10,
    difficulty: 'moderate'
  },
  {
    id: '3',
    title: 'Everest Base Camp Trek',
    image: 'https://images.unsplash.com/photo-1582654454409-778f6619ddc6',
    date: 'March 15 - March 28',
    people: 8,
    difficulty: 'easy'
  }
];

const travelGroups = [
  {
    name: 'Adventure Seekers',
    members: 12,
    lastTrip: '2 Weeks ago',
    upcomingTrips: 1,
    image: 'https://images.unsplash.com/photo-1527525443983-6e60c75fff46'
  },
  {
    name: 'Culture Explorers',
    members: 8,
    lastTrip: '2 Weeks ago',
    upcomingTrips: 2,
    image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3'
  },
  {
    name: 'Adventure Seekers',
    members: 15,
    lastTrip: '2 Weeks ago',
    upcomingTrips: 3,
    image: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0'
  },
  {
    name: 'Nature lovers',
    members: 5,
    lastTrip: '2 Weeks ago',
    upcomingTrips: 3,
    image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b'
  }
];

const sampleTrips:Trip[] = [
  {
    tripId: 'T2024-002',
    destination: 'Tokyo, Japan',
    startDate: '2024-03-10',
    endDate: '2024-03-20',
    status: 'ongoing',
    description: 'Immersing in Japanese culture, from ancient temples to modern technology, while savoring authentic Japanese cuisine.',
    reviewStatus: 'not_required',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
    totalTravelers: 3,
    highlights: ['Shibuya Crossing', 'Mount Fuji', 'Senso-ji Temple'],
    cost: { amount: 3500, currency: 'USD' },
    travelBuddy: {
      name: 'Mike Johnson',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
    },
    difficulty: 'moderate'
  },
  {
    tripId: 'T2023-052',
    destination: 'Bali, Indonesia',
    startDate: '2023-12-01',
    endDate: '2023-12-10',
    status: 'completed',
    description: 'A tropical paradise getaway featuring pristine beaches, ancient temples, and luxurious spa treatments.',
    reviewStatus: 'pending',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    totalTravelers: 4,
    highlights: ['Uluwatu Temple', 'Ubud Rice Terraces', 'Nusa Dua Beach'],
    cost: { amount: 2800, currency: 'USD' },
    travelBuddy: {
      name: 'Alex Thompson',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'
    },
    difficulty: 'easy'
  }
];

const sampleSummary = {
  totalDays: 10,
  totalCost: 2800,
  highlights: [
    'Explored ancient temples in Ubud',
    'Surfing lessons at Nusa Dua Beach',
    'Traditional cooking class',
    'Sunrise trek to Mount Batur',
    'Spa day at luxury resort'
  ],
  photos: [
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b',
    'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1'
  ]
};

export default function Trips() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [showDisconnectConfirmation, setShowDisconnectConfirmation] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState<{id: string, name: string} | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-menu-trigger]')) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleMenuClick = (connectionId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenMenuId(openMenuId === connectionId ? null : connectionId);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleViewDetails = (tripId: string) => {
    const trip = [...sampleTrips, ...upcomingTrips.map(t => ({
      tripId: t.id,
      destination: t.title,
      startDate: t.date.split(' - ')[0],
      endDate: t.date.split(' - ')[1],
      status: 'upcoming' as const,
      description: '',
      reviewStatus: 'not_required' as const,
      imageUrl: t.image,
      totalTravelers: t.people,
      difficulty: t.difficulty as 'easy' | 'moderate' | 'difficult'
    }))].find(t => t.tripId === tripId);
    
    if (trip) {
      setSelectedTrip(trip);
      setIsDetailModalOpen(true);
    }
  };

  const handleViewSummary = (tripId: string) => {
    const trip = sampleTrips.find(t => t.tripId === tripId);
    if (trip) {
      setSelectedTrip(trip);
      setIsSummaryModalOpen(true);
    }
  };

  const handleReviewTrip = (tripId: string) => {
    const trip = sampleTrips.find(t => t.tripId === tripId);
    if (trip) {
      setSelectedTrip(trip);
      setIsReviewModalOpen(true);
    }
  };

  const handleDisconnect = (connection: {id: string, name: string}) => {
    setSelectedConnection(connection);
    setShowDisconnectConfirmation(true);
  };

  const confirmDisconnect = () => {
    if (selectedConnection) {
      console.log('Disconnecting from:', selectedConnection.name);
      // Add disconnect logic here
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'difficult':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const connectionDetails = (
    <div className="space-y-4">
      {statisticsDetails.connections.map(connection => (
        <div key={connection.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <img
              src={connection.image}
              alt={connection.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="font-medium">{connection.name}</div>
              <div className="text-sm text-gray-500">{connection.username}</div>
              <div className="text-sm text-gray-600">{connection.location}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm text-brand-orange mr-4">
              {connection.tripsTogether} trips together
            </div>
            <div className="relative">
              <button 
                data-menu-trigger
                className={`p-2 rounded-full transition-colors ${
                  openMenuId === connection.id ? 'bg-gray-200' : 'hover:bg-gray-200'
                }`}
                onClick={(e) => handleMenuClick(connection.id, e)}
              >
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
              {openMenuId === connection.id && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => {
                      console.log('Message:', connection.name);
                      setOpenMenuId(null);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Message
                  </button>
                  <button
                    onClick={() => {
                      handleDisconnect({ id: connection.id, name: connection.name });
                      setOpenMenuId(null);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">My Travel History</h1>
          <div className="flex items-center gap-4">
            <SearchBar
              placeholder="Search destinations or..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-[300px]"
            />
            <Link to="/trips/create">
              <Button>+ Create New Trip</Button>
            </Link>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <StatCard
            icon="📍"
            label="Total Trips"
            value={statistics.totalTrips}
            details={
              <div className="space-y-4">
                <p className="text-gray-600 mb-4">
                  You've completed {statistics.totalTrips} amazing journeys so far!
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">15</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">3</div>
                    <div className="text-sm text-gray-600">Upcoming</div>
                  </div>
                </div>
              </div>
            }
          />
          <StatCard
            icon="🌎"
            label="Places"
            value={statistics.places}
            details={
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  {statisticsDetails.places.map(place => (
                    <div key={place.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{place.name}</div>
                        <div className="text-sm text-gray-600">{place.country}</div>
                      </div>
                      <div className="text-sm text-gray-500">
                        Visited: {new Date(place.visitDate).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }
          />
          <StatCard
            icon="👥"
            label="Travel Groups"
            value={statistics.travelGroups}
            details={
              <div className="space-y-4">
                {statisticsDetails.travelGroups.map(group => (
                  <div key={group.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="font-medium text-lg mb-2">{group.name}</div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Members: </span>
                        <span className="font-medium">{group.members}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Trips: </span>
                        <span className="font-medium">{group.tripCount}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            }
          />
          <StatCard
            icon="📅"
            label="Travel Days"
            value={statistics.travelDays}
            details={
              <div className="space-y-4">
                {statisticsDetails.travelDays.map(trip => (
                  <div key={trip.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="font-medium mb-2">{trip.trip}</div>
                    <div className="text-sm text-gray-600">
                      <div>From: {new Date(trip.startDate).toLocaleDateString()}</div>
                      <div>To: {new Date(trip.endDate).toLocaleDateString()}</div>
                      <div className="mt-2 font-medium text-brand-orange">
                        {trip.days} days
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            }
          />
          <StatCard
            icon="🤝"
            label="Connections"
            value={statistics.connections}
            details={connectionDetails}
          />
        </div>

        {/* Upcoming Trips */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">My Upcoming Trips</h2>
            <Button variant="ghost" className="text-brand-orange">
              View all
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {upcomingTrips.map(trip => (
              <UpcomingTripCard 
                key={trip.id} 
                {...trip} 
                onViewDetails={() => handleViewDetails(trip.id)}
              />
            ))}
          </div>
        </section>

        {/* Travel History */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Travel History</h2>
            <Button variant="ghost" className="text-brand-orange">
              View all
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {sampleTrips.map(trip => (
              <TripHistoryCard
                key={trip.tripId}
                trip={trip}
                onViewDetails={handleViewDetails}
                onViewSummary={handleViewSummary}
                onReview={handleReviewTrip}
              />
            ))}
          </div>
        </section>

        {/* Travel Groups */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">My Travel Groups</h2>
            <Button variant="ghost" className="text-brand-orange">
              View all
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {travelGroups.map((group, index) => (
              <TravelGroupCard key={index} {...group} />
            ))}
          </div>
        </section>

        {/* Map Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">My Travel Map</h2>
          </div>
          <div className="bg-white rounded-lg p-4 h-[400px] flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium mb-2">Map Coming Soon</p>
              <p>Integration with map API is in progress</p>
            </div>
          </div>
        </section>

        {/* Modals */}
        {selectedTrip && (
          <>
            <TripDetailModal
              isOpen={isDetailModalOpen}
              onClose={() => setIsDetailModalOpen(false)}
              trip={selectedTrip}
            />
            <TripSummaryModal
              isOpen={isSummaryModalOpen}
              onClose={() => setIsSummaryModalOpen(false)}
              summary={sampleSummary}
              tripDestination={selectedTrip.destination}
            />
            {selectedTrip.travelBuddy && (
              <ReviewModal
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
                tripDetails={{
                  buddyName: selectedTrip.travelBuddy.name,
                  location: selectedTrip.destination,
                  startDate: selectedTrip.startDate,
                  endDate: selectedTrip.endDate,
                  buddyImage: selectedTrip.travelBuddy.image
                }}
                onSubmit={() => setIsReviewModalOpen(false)}
              />
            )}
          </>
        )}
      </div>

      <ConfirmationDialog
        isOpen={showDisconnectConfirmation}
        onClose={() => setShowDisconnectConfirmation(false)}
        onConfirm={confirmDisconnect}
        title="Confirm Disconnect"
        message={selectedConnection ? `Are you sure you want to disconnect from ${selectedConnection.name}? This action cannot be undone.` : ''}
        confirmText="Disconnect"
        type="danger"
      />
    </>
  );
}

function UpcomingTripCard({ 
  title, 
  image, 
  date, 
  people, 
  difficulty,
  onViewDetails 
}: {
  title: string;
  image: string;
  date: string;
  people: number;
  difficulty: string;
  onViewDetails: () => void;
}) {
  const difficultyColor = {
    easy: 'bg-green-100 text-green-800',
    moderate: 'bg-yellow-100 text-yellow-800',
    difficult: 'bg-red-100 text-red-800'
  }[difficulty] || 'bg-gray-100 text-gray-800';

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${difficultyColor}`}>
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg mb-2">{title}</h3>
        <div className="flex items-center gap-2 text-gray-600 mb-1">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{date}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Users className="w-4 h-4" />
          <span className="text-sm">{people} People</span>
        </div>
        <Button className="w-full mt-4" onClick={onViewDetails}>
          View Full Details
        </Button>
      </div>
    </div>
  );
}

function TravelGroupCard({ name, members, lastTrip, upcomingTrips, image }: {
  name: string;
  members: number;
  lastTrip: string;
  upcomingTrips: number;
  image: string;
}) {
  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="h-32 relative">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <h3 className="absolute bottom-2 left-4 text-white font-medium">{name}</h3>
      </div>
      <div className="p-4">
        <div className="text-sm text-gray-600 mb-4">
          <div>{members} members</div>
          <div>Last trip: {lastTrip}</div>
        </div>
        <div className="text-brand-orange text-sm">
          {upcomingTrips} Upcoming {upcomingTrips === 1 ? 'trip' : 'trips'}
        </div>
      </div>
    </div>
  );
}