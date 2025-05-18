import React from 'react';
import { MapPin, Layers, Plus, Minus, Compass } from 'lucide-react';

interface MapControlsProps {
  onLocateMe: () => void;
  isLoading: boolean;
}

export const MapControls: React.FC<MapControlsProps> = ({ onLocateMe, isLoading }) => {
  return (
    <div className="absolute bottom-6 left-6 z-[1000]">
      <div className="flex flex-col space-y-2">
        <button
          onClick={onLocateMe}
          disabled={isLoading}
          className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          title="Find my location"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Compass size={20} className="text-blue-600" />
          )}
        </button>
      </div>
    </div>
  );
};