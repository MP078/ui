import React from 'react';
import { MapPin, Users, Calendar } from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'destination' | 'traveler' | 'trip';
  title: string;
  subtitle: string;
  image: string;
  meta?: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  onSelect: (result: SearchResult) => void;
}

export function SearchResults({ results, onSelect }: SearchResultsProps) {
  const getIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'destination':
        return <MapPin className="w-4 h-4" />;
      case 'traveler':
        return <Users className="w-4 h-4" />;
      case 'trip':
        return <Calendar className="w-4 h-4" />;
    }
  };

  if (results.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No results found
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-lg mt-2 overflow-hidden z-50">
      {results.map((result) => (
        <button
          key={result.id}
          onClick={() => onSelect(result)}
          className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
        >
          <img
            src={result.image}
            alt={result.title}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="flex-1 text-left">
            <div className="font-medium">{result.title}</div>
            <div className="text-sm text-gray-600 flex items-center gap-1">
              {getIcon(result.type)}
              <span>{result.subtitle}</span>
            </div>
          </div>
          {result.meta && (
            <span className="text-sm text-gray-500">{result.meta}</span>
          )}
        </button>
      ))}
    </div>
  );
}