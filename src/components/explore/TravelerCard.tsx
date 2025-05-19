import React from "react";
import { MapPin, Users } from "lucide-react";
import { ConnectButton } from "../ui/connect-button";
import { Link } from "react-router-dom";

export interface TravelerCardProps {
  username: string;
  id: string;
  image: string | undefined;
  name: string | undefined;
  location: string;
  connectionStatus: "none" | "sent" | "friends" | "received";
  traveler: {
    username: string;
    id: string;
    name: string;
    image: string;
    location: string;
    mutualConnections: number;
    interests: string[];
    isOnline: boolean;
    lastActive?: string;
    connectionStatus: "none" | "sent" | "friends" | "received";
  };
  onStatusChange: (
    id: string,
    newStatus: "none" | "sent" | "received" | "friends"
  ) => void;
}

export const TravelerCard: React.FC<TravelerCardProps> = ({
  traveler,
  onStatusChange,
}) => {
  const {
    id,
    name,
    image,
    location,
    mutualConnections,
    interests,
    isOnline,
    lastActive,
    connectionStatus,
  } = traveler;

  const handleConnect = () => onStatusChange(id, "sent");
  const handleCancel = () => onStatusChange(id, "none");
  const handleDisconnect = () => onStatusChange(id, "none");

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="relative cursor-pointer">
          <Link to={`/${id}`}>
            <img
              src={image}
              alt={name}
              className="w-16 h-16 rounded-full object-cover"
            />
          </Link>
          <div
            className={`absolute bottom-0 right-0 w-4 h-4 border-2 border-white rounded-full ${
              isOnline ? "bg-green-500" : "bg-gray-400"
            }`}
          />
        </div>
        <div className="flex-1">
          <Link to={`/${id}`}>
            <h3 className="font-semibold text-lg cursor-pointer hover:text-brand-orange">
              {name}
            </h3>
          </Link>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <Users className="w-4 h-4" />
            <span>{mutualConnections} connections</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {interests.map((interest, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
          >
            {interest}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {isOnline ? "Online" : `Last seen ${lastActive}`}
        </span>
        <ConnectButton
          username={id}
          name={name}
          status={connectionStatus}
          className={
            connectionStatus === "none"
              ? "bg-orange-500 text-white hover:bg-orange-600"
              : ""
          }
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};
