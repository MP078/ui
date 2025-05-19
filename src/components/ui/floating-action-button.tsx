import React from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FloatingActionButton() {
  return (
    <Link
      to="/trips/create"
      className="fixed bottom-8 right-8 bg-brand-orange text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-brand-orange/90 transition-colors z-50"
      aria-label="Create new trip"
    >
      <Plus className="w-6 h-6" />
    </Link>
  );
}