import { Search, Star, User, Users, MapPin, Twitter, Facebook, Instagram, Globe, Camera, Compass } from 'lucide-react';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function Homepage() {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState('');
  const [searchDate, setSearchDate] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchLocation && searchDate) {
      navigate('/login');
    }
  };

  // Expanded destinations data
  const destinations = [
    {
      name: 'Everest Base Camp',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600',
      type: 'Trekking',
      rating: 4.9
    },
    {
      name: 'Annapurna Circuit',
      image: 'https://images.unsplash.com/photo-1585938389612-a552a28d6914?auto=format&fit=crop&w=600',
      type: 'Trekking',
      rating: 4.8
    },
    {
      name: 'Lumbini',
      image: 'https://images.unsplash.com/photo-1558862107-d49ef2a04d72?auto=format&fit=crop&w=600',
      type: 'Cultural',
      rating: 4.7
    },
    {
      name: 'Nagarkot',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600',
      type: 'Scenic',
      rating: 4.6
    },
    {
      name: 'Chitwan National Park',
      image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=600',
      type: 'Wildlife',
      rating: 4.8
    },
    {
      name: 'Pokhara',
      image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=600',
      type: 'Adventure',
      rating: 4.9
    },
    {
      name: 'Mustang Valley',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600',
      type: 'Cultural',
      rating: 4.7
    },
    {
      name: 'Langtang Valley',
      image: 'https://images.unsplash.com/photo-1585938389612-a552a28d6914?auto=format&fit=crop&w=600',
      type: 'Trekking',
      rating: 4.8
    }
  ];

  const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0);
  const destinationsPerPage = 4;

  const handlePrevDestinations = () => {
    setCurrentDestinationIndex(prev => 
      prev === 0 ? destinations.length - destinationsPerPage : prev - destinationsPerPage
    );
  };

  const handleNextDestinations = () => {
    setCurrentDestinationIndex(prev => 
      prev + destinationsPerPage >= destinations.length ? 0 : prev + destinationsPerPage
    );
  };

  const visibleDestinations = destinations.slice(
    currentDestinationIndex,
    currentDestinationIndex + destinationsPerPage
  );

  return (
    <div className="min-h-screen bg-brand-beige">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            
            <div className="text-2xl font-bold flex items-center">
              <MapPin className="text-brand-orange" />
              <span className="text-brand-dark-gray">Travel</span>
              <span className="text-brand-orange">Buddy</span>
              
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#top" className="text-brand-dark-gray hover:text-brand-orange transition-colors">Home</a>
              <a href="#destinations" className="text-brand-dark-gray hover:text-brand-orange transition-colors">Destinations</a>
              <a href="#find-buddies" className="text-brand-dark-gray hover:text-brand-orange transition-colors">Find Buddies</a>
            </nav>
          </div>
          <div className="flex space-x-4">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div id="top" className="relative h-[600px]">
        <img
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000"
          alt="Nepal Landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl md:text-5xl text-white font-bold text-center mb-8">
            Find Your Perfect Travel Companion in Nepal
          </h1>
          <form onSubmit={handleSearch} className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Where do you want to go?"
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/50"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  required
                />
              </div>
              <div className="flex-1 relative">
                <input
                  type="date"
                  className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/50"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  required
                />
              </div>
              <Button size="lg" type="submit">Search</Button>
            </div>
          </form>
        </div>
      </div>

      {/* Popular Destinations */}
      <section id="destinations" className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Destinations in Nepal</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Pokhara',
              image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=600&h=400',
              description: 'Paradise with Mountain Views',
              travelers: 245
            },
            {
              name: 'Kathmandu',
              image: 'https://images.unsplash.com/photo-1582654454409-778f6619ddc6?auto=format&fit=crop&w=600&h=400',
              description: 'Cultural Heart of Nepal',
              travelers: 312
            },
            {
              name: 'Chitwan',
              image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=600&h=400',
              description: 'Wildlife Safari Adventure',
              travelers: 178
            }
          ].map((destination, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
                <p className="text-brand-gray mb-4">{destination.description}</p>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-brand-gray">{destination.travelers} Travelers</span>
                </div>
                <Link to="/login">
                  <Button className="w-full">View More</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Expanded Destinations Section */}
        <div className="container mx-auto mt-16">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-semibold">Explore More Destinations</h3>
            <div className="flex gap-2">
              <button 
                onClick={handlePrevDestinations}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <button 
                onClick={handleNextDestinations}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {visibleDestinations.map((destination, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 text-xs font-medium">
                    {destination.type}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-medium">{destination.name}</h4>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm ml-1">{destination.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/login">
              <Button variant="outline" className="px-6">
                View All Destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: User,
              title: 'Create Profile',
              description: 'Sign up and fill out your travel preferences'
            },
            {
              icon: Users,
              title: 'Find Buddies',
              description: 'Connect with travelers sharing your interests'
            },
            {
              icon: MapPin,
              title: 'Plan Together',
              description: 'Collaborate on itineraries and travel plans'
            }
          ].map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-brand-orange rounded-full flex items-center justify-center mb-6">
                <step.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-brand-gray">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Find Travel Buddies Section */}
      <section id="find-buddies" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Find Your Perfect Travel Buddy</h2>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Match with like-minded travelers</h3>
                <p className="text-gray-600 mb-6">
                  Our smart matching algorithm connects you with travelers who share your interests, 
                  travel style, and destination preferences. Find the perfect companion for your next adventure!
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <h4 className="font-medium">Destination Matching</h4>
                      <p className="text-sm text-gray-500">Find travelers heading to the same places</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center">
                      <Camera className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <h4 className="font-medium">Interest Alignment</h4>
                      <p className="text-sm text-gray-500">Connect based on shared travel interests</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center">
                      <Compass className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <h4 className="font-medium">Travel Style Compatibility</h4>
                      <p className="text-sm text-gray-500">Match with travelers who travel like you do</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Link to="/register">
                    <Button size="lg">Find Your Match</Button>
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300" 
                  alt="Traveler" 
                  className="rounded-lg h-40 object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300" 
                  alt="Traveler" 
                  className="rounded-lg h-40 object-cover mt-8"
                />
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300" 
                  alt="Traveler" 
                  className="rounded-lg h-40 object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300" 
                  alt="Traveler" 
                  className="rounded-lg h-40 object-cover mt-8"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-orange"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <h3 className="text-lg font-semibold">Group Travel</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Join existing travel groups or create your own. Perfect for solo travelers looking for company.
              </p>
              <Link to="/register">
                <Button variant="outline" className="w-full">Join a Group</Button>
              </Link>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-orange"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <h3 className="text-lg font-semibold">Local Guides</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Connect with experienced local guides who can show you the hidden gems of Nepal.
              </p>
              <Link to="/register">
                <Button variant="outline" className="w-full">Find Guides</Button>
              </Link>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-orange"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path><path d="M8 7h6"></path><path d="M8 11h8"></path><path d="M8 15h6"></path></svg>
                </div>
                <h3 className="text-lg font-semibold">Travel Stories</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Read authentic travel experiences and tips from fellow travelers who've been there.
              </p>
              <Link to="/register">
                <Button variant="outline" className="w-full">Read Stories</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Fellow Travelers */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Fellow Travelers</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Sarah Chen',
              image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200',
              destination: 'Planning trip to Everest Base Camp',
              interests: 'Hiking, Photography, Culture'
            },
            {
              name: 'Mike Johnson',
              image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200',
              destination: 'Exploring Kathmandu Valley',
              interests: 'Architecture, Food, History'
            },
            {
              name: 'Emma Wilson',
              image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200',
              destination: 'Visiting Pokhara',
              interests: 'Adventure Sports, Nature, Yoga'
            }
          ].map((traveler, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <img
                  src={traveler.image}
                  alt={traveler.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">{traveler.name}</h3>
                  <p className="text-brand-gray text-sm">{traveler.destination}</p>
                </div>
              </div>
              <p className="text-brand-gray mb-4">{traveler.interests}</p>
              <Link to="/login">
                <Button className="w-full">Connect</Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark-gray text-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">About TravelBuddy</h3>
            <p className="text-gray-300 mb-4">
              Connecting travelers and creating unforgettable adventures together in Nepal.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">How It Works</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Safety</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Support</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: hello@travelbuddy.com</li>
              <li>Phone: +977 1234567890</li>
              <li>Address: Thamel, Kathmandu, Nepal</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-300 text-sm">
            © 2025 TravelBuddy. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}