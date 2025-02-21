import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Filter, ChevronDown } from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  price: string;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  category: 'Trekking' | 'Cultural' | 'Adventure' | 'Nature';
  description: string;
}

const destinations: Destination[] = [
  {
    id: '1',
    name: 'Everest Base Camp Trek',
    location: 'Solukhumbu, Nepal',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
    rating: 4.8,
    reviews: 128,
    price: '$1,200',
    duration: '14 days',
    difficulty: 'Hard',
    category: 'Trekking',
    description: 'Experience the ultimate Himalayan adventure with a trek to Everest Base Camp.'
  },
  {
    id: '2',
    name: 'Kathmandu Cultural Tour',
    location: 'Kathmandu Valley, Nepal',
    image: 'https://images.unsplash.com/photo-1582654454409-778f6619ddc6',
    rating: 4.6,
    reviews: 95,
    price: '$400',
    duration: '5 days',
    difficulty: 'Easy',
    category: 'Cultural',
    description: 'Explore the rich cultural heritage of Kathmandu Valley.'
  },
  {
    id: '3',
    name: 'Annapurna Circuit',
    location: 'Manang, Nepal',
    image: 'https://images.unsplash.com/photo-1585938389612-a552a28d6914',
    rating: 4.9,
    reviews: 156,
    price: '$900',
    duration: '12 days',
    difficulty: 'Moderate',
    category: 'Trekking',
    description: 'Complete the famous Annapurna Circuit trek through diverse landscapes.'
  }
];

const categories = ['All', 'Trekking', 'Cultural', 'Adventure', 'Nature'];
const difficulties = ['All', 'Easy', 'Moderate', 'Hard'];
const durations = ['All', '1-3 days', '4-7 days', '8-14 days', '15+ days'];

export default function Explore() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDestinations = destinations.filter(dest => {
    if (selectedCategory !== 'All' && dest.category !== selectedCategory) return false;
    if (selectedDifficulty !== 'All' && dest.difficulty !== selectedDifficulty) return false;
    if (searchQuery && !dest.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search destinations..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-5 h-5" />
            Filters
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {showFilters && (
          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-md"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-md"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-md"
                >
                  {durations.map(duration => (
                    <option key={duration} value={duration}>{duration}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDestinations.map(destination => (
          <div
            key={destination.id}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium">
                {destination.category}
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{destination.name}</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-sm">{destination.rating}</span>
                  <span className="text-sm text-gray-500">({destination.reviews})</span>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{destination.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">{destination.duration}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{destination.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-brand-orange">{destination.price}</span>
                <button className="bg-brand-orange text-white px-4 py-2 rounded-full text-sm hover:bg-brand-orange/90 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}