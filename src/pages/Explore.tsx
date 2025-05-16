import React, { useState } from 'react';
import { ExploreSearch } from '../components/explore/ExploreSearch';
import { FilterChips } from '../components/explore/FilterChips';
import { TravelerCard } from '../components/explore/TravelerCard';
import { ActiveTripCard } from '../components/explore/ActiveTripCard';
import { DestinationDetailModal, Destination } from '../components/explore/DestinationDetailModal';
import { ConfirmationDialog } from '../components/ui/confirmation-dialog';
import { activeTrips } from '../data/activetrips';

type TabType = 'destinations' | 'travelers' | 'trips';

const tabs: { id: TabType; label: string }[] = [
  { id: 'destinations', label: 'Destinations' },
  { id: 'travelers', label: 'Travelers' },
  { id: 'trips', label: 'Active Trips' }
];

const filters = {
  destinations: ['Popular', 'Nearby', 'Recommended', 'Trending'],
  travelers: ['Online', 'Recently Active', 'Mutual Friends', 'New'],
  trips: ['Starting Soon', 'Open', 'Popular', 'Weekend']
};

export default function Explore() {
  const [activeTab, setActiveTab] = useState<TabType>('destinations');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [showPlanTripConfirmation, setShowPlanTripConfirmation] = useState(false);

  const currentFilters = filters[activeTab].map(filter => ({
    id: filter.toLowerCase(),
    label: filter,
    active: filter.toLowerCase() === activeFilter
  }));

  const handleFilterToggle = (id: string) => {
    setActiveFilter(activeFilter === id ? '' : id);
  };

  const handleViewDestinationDetails = (destination: Destination) => {
    setSelectedDestination(destination);
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedDestination(null);
    // Re-enable body scroll when modal is closed
    document.body.style.overflow = 'unset';
  };

  const handlePlanTrip = (destinationId: string) => {
    setShowPlanTripConfirmation(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <ExploreSearch
          placeholder={`Search ${activeTab}...`}
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </div>

      <div className="flex border-b mb-6 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setActiveFilter('');
            }}
            className={`
              px-6 py-3 font-medium text-sm relative whitespace-nowrap
              ${activeTab === tab.id
                ? 'text-brand-orange'
                : 'text-gray-600 hover:text-gray-900'
              }
            `}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange" />
            )}
          </button>
        ))}
      </div>

      <div className="mb-6 overflow-x-auto">
        <FilterChips
          filters={currentFilters}
          onToggle={handleFilterToggle}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === 'destinations' && <DestinationsList filter={activeFilter} onViewDetails={handleViewDestinationDetails} />}
        {activeTab === 'travelers' && <TravelersList filter={activeFilter} />}
        {activeTab === 'trips' && <ActiveTripsList filter={activeFilter} />}
      </div>

      {selectedDestination && (
        <DestinationDetailModal
          isOpen={!!selectedDestination}
          onClose={handleCloseModal}
          destination={selectedDestination}
          onPlanTrip={handlePlanTrip}
        />
      )}

      <ConfirmationDialog
        isOpen={showPlanTripConfirmation}
        onClose={() => setShowPlanTripConfirmation(false)}
        onConfirm={() => {
          setShowPlanTripConfirmation(false);
          window.location.href = `/trips/create?destination=${selectedDestination?.name}`;
        }}
        title="Plan a Trip"
        message={`Would you like to create a new trip to ${selectedDestination?.name}? You'll be able to customize your itinerary and invite travel buddies.`}
        confirmText="Create Trip"
        type="info"
      />
    </div>
  );
}

function DestinationsList({ filter, onViewDetails }: { filter: string, onViewDetails: (destination: Destination) => void }) {
  const destinations: Destination[] = [
    {
      id: '1',
      name: 'Everest Base Camp',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
      location: 'Solukhumbu, Nepal',
      rating: 4.8,
      description: "The ultimate trekking destination with breathtaking views of the world's highest peak. The journey to Everest Base Camp takes you through stunning Sherpa villages, ancient monasteries, and dramatic mountain landscapes. This iconic trek offers a perfect blend of natural beauty, cultural immersion, and personal challenge.",
      popularity: 'High',
      difficulty: 'Challenging',
      bestTimeToVisit: 'March-May and September-November',
      activities: ['Trekking', 'Photography', 'Cultural Exploration', 'Mountain Viewing'],
      highlights: [
        'Panoramic views of Mount Everest and surrounding peaks',
        'Visit to Tengboche Monastery',
        'Sherpa culture and hospitality',
        'Stunning sunrise from Kala Patthar',
        'Crossing suspension bridges over deep gorges'
      ],
      averageCost: '$1,500 - $3,000 USD (excluding flights)',
      travelTips: [
        'Acclimatize properly to avoid altitude sickness',
        'Pack layers for varying temperatures',
        'Train physically before the trek',
        'Bring a good camera for spectacular photos',
        'Respect local customs and traditions'
      ]
    },
    {
      id: '2',
      name: 'Annapurna Circuit',
      image: 'https://images.unsplash.com/photo-1585938389612-a552a28d6914',
      location: 'Annapurna Region, Nepal',
      rating: 4.7,
      description: "A classic trek that circles the entire Annapurna massif, offering incredible diversity in landscapes, cultures, and ecosystems. From subtropical forests to arid high-altitude deserts, this trek takes you through some of the most beautiful mountain scenery in the world, including the challenging Thorong La Pass at 5,416m.",
      popularity: 'High',
      difficulty: 'Moderate',
      bestTimeToVisit: 'October-November and March-April',
      activities: ['Trekking', 'Hot Springs', 'Cultural Immersion', 'Wildlife Spotting'],
      highlights: [
        'Crossing the challenging Thorong La Pass (5,416m)',
        'Diverse landscapes from jungles to alpine zones',
        'Muktinath Temple - sacred to both Hindus and Buddhists',
        'Stunning views of Annapurna and Dhaulagiri ranges',
        'Traditional villages of various ethnic groups'
      ],
      averageCost: '$1,200 - $2,500 USD (excluding flights)',
      travelTips: [
        'Get a TIMS card and ACAP permit before starting',
        'Consider hiring a local guide for cultural insights',
        'Bring water purification tablets to reduce plastic waste',
        'Pack microspikes if trekking during shoulder seasons',
        'Try local apple products in Marpha village'
      ]
    },
    {
      id: '3',
      name: 'Pokhara',
      image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b',
      location: 'Gandaki Province, Nepal',
      rating: 4.9,
      description: "A beautiful lakeside city with stunning views of the Annapurna range. Known as the gateway to the Annapurna Circuit, Pokhara offers a perfect blend of adventure and relaxation. With its tranquil lakes, adventure activities, and vibrant restaurant scene, it's the ideal place to prepare for or recover from Himalayan treks.",
      popularity: 'High',
      difficulty: 'Easy',
      bestTimeToVisit: 'September-November and February-April',
      activities: ['Boating', 'Paragliding', 'Hiking', 'Yoga', 'Meditation'],
      highlights: [
        'Boating on serene Phewa Lake',
        'Sunrise views from Sarangkot',
        'Paragliding with mountain views',
        'Peace Pagoda (Shanti Stupa)',
        "Devi's Falls and Gupteshwor Cave"
      ],
      averageCost: '$30 - $100 USD per day',
      travelTips: [
        'Book paragliding in advance during peak season',
        'Visit early morning for the clearest mountain views',
        'Try local Newari cuisine',
        'Rent a bicycle to explore the lakeside area',
        'Take a day trip to nearby Begnas or Rupa Lake for a quieter experience'
      ]
    }
  ];

  return (
    <>
      {destinations.map(destination => (
        <div key={destination.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="relative">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-medium">
              {destination.difficulty}
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-1">{destination.name}</h3>
            <div className="flex items-center gap-1 mb-2 text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>{destination.location}</span>
            </div>
            <div className="flex items-center gap-1 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star fill-yellow-400 text-yellow-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <span className="font-medium">{destination.rating}</span>
            </div>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{destination.description}</p>
            <button 
              className="w-full bg-brand-orange text-white py-2 rounded-lg hover:bg-brand-orange/90 transition-colors"
              onClick={() => onViewDetails(destination)}
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

function TravelersList({ filter }: { filter: string }) {
  const travelers = [
    {
      id: '1',
      name: 'Sarah Chen',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      location: 'San Francisco, CA',
      mutualConnections: 12,
      interests: ['Hiking', 'Photography', 'Culture'],
      isOnline: true,
      lastActive: '2 hours ago',
      connectionStatus: 'none'
    },
    {
      id: '2',
      name: 'Mike Johnson',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      location: 'London, UK',
      mutualConnections: 8,
      interests: ['Adventure', 'Food', 'History'],
      isOnline: false,
      lastActive: '1 day ago',
      connectionStatus: 'requested'
    },
    {
      id: '3',
      name: 'Emma Wilson',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
      location: 'Sydney, Australia',
      mutualConnections: 5,
      interests: ['Yoga', 'Beaches', 'Meditation'],
      isOnline: true,
      lastActive: 'Just now',
      connectionStatus: 'connected'
    }
  ];

  return (
    <>
      {travelers.map((traveler) => (
        <TravelerCard key={traveler.id} traveler={traveler} />
      ))}
    </>
  );
}

function ActiveTripsList({ filter }: { filter: string }) {
  return (
    <>
      {activeTrips.map((trip) => (
        <ActiveTripCard
          key={trip.tripId}
          trip={{
            tripId: trip.tripId,
            destination: trip.destination,
            startDate: trip.startDate,
            endDate: trip.endDate,
            tripStatus: trip.tripStatus || 'open', // fallback if undefined
            totalTravelers: trip.totalTravelers || 0,
            maxParticipants: trip.maxParticipants || 12,
            imageUrl: trip.imageUrl || '',
            summary: trip.summary,
          }}
          onJoinRequest={(id) => console.log('Join request:', id)}
        />
      ))}
    </>
  );
}