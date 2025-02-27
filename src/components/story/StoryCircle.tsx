import React from 'react';

interface StoryCircleProps {
  image: string;
  name: string;
  isAdd?: boolean;
  onClick?: () => void;
}

export function StoryCircle({ image, name, isAdd = false, onClick }: StoryCircleProps) {
  return (
    <button 
      className="flex flex-col items-center gap-1"
      onClick={onClick}
    >
      <div className={`w-16 h-16 rounded-full ${isAdd ? 'bg-gray-100' : 'border-2 border-orange-500'} p-0.5`}>
        <div className="w-full h-full rounded-full overflow-hidden">
          {isAdd ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-2xl text-gray-600">+</span>
            </div>
          ) : (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          )}
        </div>
      </div>
      <span className="text-xs text-gray-600">{name}</span>
    </button>
  );
}