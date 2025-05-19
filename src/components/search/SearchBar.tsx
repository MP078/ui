import React, { useState, useRef, useEffect } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SearchSuggestion {
  id: string;
  title: string;
  type: 'trip' | 'user' | 'location';
  subtitle?: string;
}

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void
  onSearch?: (query: string) => void;
  onSelect?: (suggestion: SearchSuggestion) => void;
  className?: string;
}

export function SearchBar({
  placeholder = 'Search trips...',
  onSearch,
  onSelect,
  className
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock suggestions - replace with actual API call
  const fetchSuggestions = (searchQuery: string) => {
    const mockSuggestions: SearchSuggestion[] = [
      { id: '1', title: 'Everest Base Camp Trek', type: 'trip', subtitle: 'Nepal' },
      { id: '2', title: 'Annapurna Circuit', type: 'trip', subtitle: 'Nepal' },
      { id: '3', title: 'Sarah Chen', type: 'user', subtitle: 'Trip Leader' },
    ];
    
    return mockSuggestions.filter(suggestion =>
      suggestion.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim()) {
      setSuggestions(fetchSuggestions(value));
    } else {
      setSuggestions([]);
    }
    
    onSearch?.(value);
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    onSearch?.('');
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.title);
    setSuggestions([]);
    onSelect?.(suggestion);
    setIsFocused(false);
  };

  return (
    <div
      ref={searchRef}
      className={cn(
        'relative',
        className
      )}
    >
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          className="w-full h-9 pl-9 pr-8 bg-gray-100 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-brand-orange/50
                   text-sm transition-all duration-200"
          aria-label="Search"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full
                     hover:bg-gray-200 transition-colors duration-200"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isFocused && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg
                      border border-gray-200 max-h-60 overflow-y-auto z-50">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex flex-col"
            >
              <span className="font-medium">{suggestion.title}</span>
              {suggestion.subtitle && (
                <span className="text-sm text-gray-500">{suggestion.subtitle}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}