import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { SearchResults } from './SearchResults';

interface SearchProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const mockResults = [
  {
    id: '1',
    type: 'destination' as const,
    title: 'Everest Base Camp',
    subtitle: 'Solukhumbu, Nepal',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
    meta: '4.8 ★'
  },
  {
    id: '2',
    type: 'traveler' as const,
    title: 'Sarah Chen',
    subtitle: 'Adventure Photographer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    meta: 'Online'
  },
  {
    id: '3',
    type: 'trip' as const,
    title: 'Annapurna Circuit Trek',
    subtitle: 'Starting Mar 15',
    image: 'https://images.unsplash.com/photo-1585938389612-a552a28d6914',
    meta: '8 spots left'
  }
];

export function ExploreSearch({ placeholder, value, onChange }: SearchProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState(mockResults);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFocus = () => setIsFocused(true);
  const handleClear = () => {
    onChange('');
    setIsFocused(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          className="w-full pl-12 pr-10 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        )}
      </div>

      {isFocused && (
        <SearchResults
          results={results}
          onSelect={(result) => {
            console.log('Selected:', result);
            setIsFocused(false);
          }}
        />
      )}
    </div>
  );
}