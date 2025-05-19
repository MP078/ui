import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/profile', label: 'Posts' },
  { path: '/profile/photos', label: 'Photos' },
  { path: '/profile/reviews', label: 'Reviews' },
  { path: '/profile/guides', label: 'Guides' },
  { path: '/profile/about', label: 'About' },
];

export default function ProfileNav() {
  const location = useLocation();

  return (
    <div className="bg-white border-t border-b mt-8">
      <div className="max-w-7xl mx-auto px-8">
        <nav className="flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`py-4 px-2 font-medium relative ${
                location.pathname === item.path
                  ? 'text-brand-orange'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {item.label}
              {location.pathname === item.path && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange" />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}