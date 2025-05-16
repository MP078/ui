import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface UserNavProps {
  userId: string;
}

export function UserNav({ userId }: UserNavProps) {
  const location = useLocation();
  
  const navItems = [
    { path: `/user/${userId}`, label: 'Posts' },
    { path: `/user/${userId}/photos`, label: 'Photos' },
    { path: `/user/${userId}/reviews`, label: 'Reviews' },
    { path: `/user/${userId}/guides`, label: 'Guides' },
    { path: `/user/${userId}/about`, label: 'About' },
  ];

  return (
    <div className="bg-white border-t border-b mt-8">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <nav className="flex gap-8 overflow-x-auto no-scrollbar">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`py-4 px-2 font-medium relative whitespace-nowrap ${
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