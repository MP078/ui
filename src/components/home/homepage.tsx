import { Search, Star, User, Users, MapPin, Twitter, Facebook, Instagram } from 'lucide-react';
import { Button } from '../ui/button';

export function Homepage() {
  return (
    <div className="min-h-screen bg-brand-beige">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-bold flex items-center">
              <span className="text-brand-dark-gray">Travel</span>
              <span className="text-brand-orange">Buddy</span>
              <div className="w-2 h-2 bg-brand-orange rounded-full ml-1"></div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-brand-dark-gray hover:text-brand-orange transition-colors">Home</a>
              <a href="#" className="text-brand-dark-gray hover:text-brand-orange transition-colors">Destinations</a>
              <a href="#" className="text-brand-dark-gray hover:text-brand-orange transition-colors">Find Buddies</a>
              <a href="#" className="text-brand-dark-gray hover:text-brand-orange transition-colors">My Trips</a>
            </nav>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline">Login</Button>
            <Button>Register</Button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative h-[600px]">
        <img
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000"
          alt="Nepal Landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl md:text-5xl text-white font-bold text-center mb-8">
            Find Your Perfect Travel Companion in Nepal
          </h1>
          <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Where do you want to go?"
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/50"
                />
              </div>
              <div className="flex-1 relative">
                <input
                  type="date"
                  className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/50"
                />
              </div>
              <Button size="lg">Search</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <section className="py-16 px-4">
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
                <Button className="w-full">View More</Button>
              </div>
            </div>
          ))}
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
              <Button className="w-full">Connect</Button>
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