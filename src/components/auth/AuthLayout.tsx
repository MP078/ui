import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, X } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-brand-beige flex">
      {/* Left side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <MapPin className="text-brand-orange" />
              <span className="text-2xl font-bold">
                <span className="text-brand-dark-gray">Travel</span>
                <span className="text-brand-orange">Buddy</span>
              </span>
            </div>
            <Link to="/">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-brand-dark-gray mb-2">{title}</h1>
          <p className="text-brand-gray mb-8">{subtitle}</p>
          {children}
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa"
          alt="Travel"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}