import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Bell, Users, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NotificationDropdown } from './notifications/NotificationDropdown';
import { FriendRequestDropdown } from './notifications/FriendRequestDropdown';
import { ConfirmationDialog } from './ui/confirmation-dialog';
import { cn } from '../lib/utils';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFriendRequests, setShowFriendRequests] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileNotifications, setShowMobileNotifications] = useState(false);
  const [showMobileFriendRequests, setShowMobileFriendRequests] = useState(false);
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

  // Close mobile menu when route changes
  useEffect(() => {
    setShowMobileMenu(false);
    setShowMobileNotifications(false);
    setShowMobileFriendRequests(false);
  }, [location.pathname]);

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/');
  };

  const navItems = [
    { path: '/feed', label: 'Feed', icon: 'home' },
    { path: '/explore', label: 'Explore', icon: 'compass' },
    { path: '/messages', label: 'Messages', icon: 'message-circle' },
    { path: '/trips', label: 'My Trips', icon: 'map' },
  ];

  return (
    <>
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-1">
            <MapPin className="text-brand-orange" />
            <div className="text-2xl font-bold flex items-center">
              <span className="text-brand-dark-gray">Travel</span>
              <span className="text-brand-orange">Buddy</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`flex items-center gap-1 ${
                  location.pathname === item.path ? 'text-brand-orange' : 'text-gray-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? (
            <X className="w-6 h-6 text-gray-600" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600" />
          )}
        </button>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
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
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-200",
          showMobileMenu ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setShowMobileMenu(false)}
      >
        <div
          className={cn(
            "fixed inset-y-0 left-0 w-64 bg-white transform transition-transform duration-200 ease-in-out",
            showMobileMenu ? "translate-x-0" : "-translate-x-full"
          )}
          onClick={e => e.stopPropagation()}
        >
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between mb-8">
              <Link to="/" className="flex items-center gap-1">
                <MapPin className="text-brand-orange" />
                <span className="text-xl font-bold">TravelBuddy</span>
              </Link>
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-1">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "block px-4 py-2 rounded-lg transition-colors",
                    location.pathname === item.path
                      ? "bg-brand-orange text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Notifications Button */}
              <button
                className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
                onClick={() => {
                  setShowMobileNotifications(!showMobileNotifications);
                  setShowMobileFriendRequests(false);
                }}
              >
                <span className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notifications
                </span>
                <span className="bg-brand-orange text-white text-xs px-2 py-1 rounded-full">
                  2
                </span>
              </button>

              {/* Mobile Friend Requests Button */}
              <button
                className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
                onClick={() => {
                  setShowMobileFriendRequests(!showMobileFriendRequests);
                  setShowMobileNotifications(false);
                }}
              >
                <span className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Connection Requests
                </span>
                <span className="bg-brand-orange text-white text-xs px-2 py-1 rounded-full">
                  3
                </span>
              </button>
            </nav>

            {/* Mobile Notifications Panel */}
            {showMobileNotifications && (
              <div className="mt-4 border-t pt-4">
                <h3 className="font-medium mb-2">Recent Notifications</h3>
                <NotificationDropdown
                  isOpen={true}
                  onClose={() => setShowMobileNotifications(false)}
                />
              </div>
            )}

            {/* Mobile Friend Requests Panel */}
            {showMobileFriendRequests && (
              <div className="mt-4 border-t pt-4">
                <h3 className="font-medium mb-2">Connection Requests</h3>
                <FriendRequestDropdown
                  isOpen={true}
                  onClose={() => setShowMobileFriendRequests(false)}
                />
              </div>
            )}

            {/* Mobile Profile Section */}
            <div className="border-t pt-4 mt-4">
              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <div className="font-medium">Your Profile</div>
                  <div className="text-sm text-gray-500">View and edit profile</div>
                </div>
              </Link>

              <button
                onClick={() => setShowLogoutConfirmation(true)}
                className="w-full mt-2 px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

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