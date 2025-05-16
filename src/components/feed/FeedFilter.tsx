import React from 'react';
import { Button } from '../ui/button';

const filters = ['All', 'Following', 'Popular', 'Recent'];

export function FeedFilter() {
  return (
    <div className="flex gap-2 mb-6">
      {filters.map((filter) => (
        <Button
          key={filter}
          variant={filter === 'All' ? 'default' : 'outline'}
          size="sm"
        >
          {filter}
        </Button>
      ))}
    </div>
  );
}