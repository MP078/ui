import React, { useState, useCallback } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { searchLocations } from '../../services/mapService';
import { GeocodingResult } from '../../types/map';
import { debounce } from '../../utils/debounce';

interface SearchPanelProps {
  onResultSelect: (result: GeocodingResult) => void;
}

export const SearchPanel: React.FC<SearchPanelProps> = ({ onResultSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchResults = useCallback(
    debounce(async (searchQuery: string) => {
      if (!searchQuery || searchQuery.length < 3) {
        setResults([]);
        return;
      }

      setIsSearching(true);
      setError(null);

      try {
        const searchResults = await searchLocations(searchQuery);
        setResults(searchResults);
      } catch (err) {
        setError('Search failed. Please try again.');
        console.error('Search error:', err);
      } finally {
        setIsSearching(false);
      }
    }, 500),
    []
  );

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    fetchResults(newQuery);
  };

  const handleClearSearch = () => {
    setQuery('');
    setResults([]);
    setError(null);
  };

  const handleResultClick = (result: GeocodingResult) => {
    onResultSelect(result);
    setResults([]);
  };

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Search Locations</h2>
      <div className="relative">
        <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-300 transition">
          <Search size={18} className="ml-3 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search for a place..."
            className="w-full py-2 px-2 focus:outline-none"
          />
          {query && (
            <button
              onClick={handleClearSearch}
              className="p-2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {isSearching && (
          <div className="flex justify-center items-center p-4">
            <Loader2 size={24} className="text-blue-500 animate-spin" />
          </div>
        )}

        {error && (
          <div className="mt-2 p-2 text-sm text-red-600 bg-red-50 rounded">
            {error}
          </div>
        )}

        {results.length > 0 && (
          <div className="absolute w-full bg-white mt-1 rounded-lg shadow-lg border z-10 max-h-60 overflow-y-auto">
            <ul>
              {results.map((result, index) => (
                <li
                  key={index}
                  className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                  onClick={() => handleResultClick(result)}
                >
                  <div className="text-sm font-medium">{result.display_name}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Lat: {parseFloat(result.lat).toFixed(6)}, Lng:{' '}
                    {parseFloat(result.lon).toFixed(6)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};