import React from 'react';

interface FilterChip {
  id: string;
  label: string;
  active: boolean;
}

interface FilterChipsProps {
  filters: FilterChip[];
  onToggle: (id: string) => void;
}

export function FilterChips({ filters, onToggle }: FilterChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto py-2">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onToggle(filter.id)}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
            filter.active
              ? 'bg-brand-orange text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}