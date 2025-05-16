import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Bell, Users } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NotificationDropdown } from './notifications/NotificationDropdown';
import { FriendRequestDropdown } from './notifications/FriendRequestDropdown';
import { ConfirmationDialog } from './ui/confirmation-dialog';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFriendRequests, setShowFriendRequests] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const friendRequestRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (friendRequestRef.current && !friendRequestRef.current.contains(event.target as Node)) {
        setShowFriendRequests(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/');
  };

  return (
    <>
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b">
        <div className="flex items-center justify-between w-full max-w-[1400px] mx-auto">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-1 shrink-0">
              <MapPin className="text-brand-orange" />
              <div className="text-2xl font-bold flex items-center">
                <span className="text-brand-dark-gray">Travel</span>
                <span className="text-brand-orange">Buddy</span>
              </div>
            </Link>
            <nav className="flex items-center gap-8 overflow-x-auto no-scrollbar">
              <Link 
                to="/feed" 
                className={`flex items-center gap-1 whitespace-nowrap ${location.pathname === '/feed' ? 'text-brand-orange' : 'text-gray-600'}`}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Feed
              </Link>
              <Link 
                to="/explore" 
                className={`flex items-center gap-1 whitespace-nowrap ${location.pathname === '/explore' ? 'text-brand-orange' : 'text-gray-600'}`}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94" />
                </svg>
                Explore
              </Link>
              <Link 
                to="/messages" 
                className={`flex items-center gap-1 whitespace-nowrap ${location.pathname === '/messages' ? 'text-brand-orange' : 'text-gray-600'}`}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                </svg>
                Messages
              </Link>
              <Link 
                to="/trips" 
                className={`flex items-center gap-1 whitespace-nowrap ${location.pathname === '/trips' ? 'text-brand-orange' : 'text-gray-600'}`}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                My Trips
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative" ref={friendRequestRef}>
              <button 
                className="relative"
                onClick={() => {
                  setShowFriendRequests(!showFriendRequests);
                  setShowNotifications(false);
                }}
              >
                <Users className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-orange text-white rounded-full text-xs flex items-center justify-center">
                  3
                </span>
              </button>
              <FriendRequestDropdown 
                isOpen={showFriendRequests} 
                onClose={() => setShowFriendRequests(false)} 
              />
            </div>

            <div className="relative" ref={notificationRef}>
              <button 
                className="relative"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowFriendRequests(false);
                }}
              >
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-orange text-white rounded-full text-xs flex items-center justify-center">
                  2
                </span>
              </button>
              <NotificationDropdown 
                isOpen={showNotifications} 
                onClose={() => setShowNotifications(false)} 
              />
            </div>

            <div className="relative" ref={profileDropdownRef}>
              <button 
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                  alt="Profile"
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
              </button>
              
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    Profile
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setShowProfileDropdown(false);
                      setShowLogoutConfirmation(true);
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <ConfirmationDialog
        isOpen={showLogoutConfirmation}
        onClose={() => setShowLogoutConfirmation(false)}
        onConfirm={handleLogout}
        title="Confirm Logout"
        message="Are you sure you want to log out? You will need to sign in again to access your account."
        confirmText="Logout"
        type="warning"
      />
    </>
  );
}