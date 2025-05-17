import { useEffect, useState } from "react";
import { ConnectButton } from "./ui/connect-button";
import { api } from "../lib/api";
import { TravelerCardProps } from "./explore/TravelerCard";
import { getAvatarNumber } from "../context/UserContext";
import { Link } from "react-router-dom";

export default function SuggestedBuddies() {
  const [buddies, setBuddies] = useState<TravelerCardProps[]>([]);

  const fetchTravelers = async () => {
    try {
      const res = await api.get("/users?all=true");
      const data = res.data.data;

      const travelers = data.map((user: any) => ({
        id: user.id,
        username: user.username,
        name: user.name,
        image: user.profile_image || "https://via.placeholder.com/150",
        location: user.location || "Unknown",
        mutualConnections: user.connections || 0,
        interests: user.interests || [],
        isOnline: false, // You can improve this if you have online status
        lastActive: "Recently", // No info in API, default
        connectionStatus: user.friendship_status || "none",
      }));

      return travelers;
    } catch (error) {
      console.error("Failed to fetch travelers:", error);
      return [];
    }
  };

  const handleConnect = (userId: string) => {
    setBuddies((prev) =>
      prev.map((buddy) =>
        buddy.id.toString() === userId
          ? { ...buddy, connectionStatus: "sent" }
          : buddy
      )
    );
  };

  const handleDisconnect = (userId: string) => {
    setBuddies((prev) =>
      prev.map((buddy) =>
        buddy.id.toString() === userId
          ? { ...buddy, connectionStatus: "none" }
          : buddy
      )
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const travelers = await fetchTravelers();
      setBuddies(travelers);
    };
    fetchData();
  }, []);
  return (
    <div className="bg-white rounded-lg p-4 mt-4">
      <h3 className="font-semibold mb-4">Suggested Travel Buddies</h3>
      {buddies.slice(0, 3).map((buddy) => (
        <div key={buddy.id} className="flex items-center justify-between mb-4">
          <Link to={buddy.username}>
            <div className="flex items-center gap-3">
              <img
                src={
                  buddy.image &&
                  !buddy.image.startsWith("https://via.placeholder.com") &&
                  buddy.image.trim() !== ""
                    ? buddy.image
                    : `/avatars/${getAvatarNumber(String(buddy.id))}.png`
                }
                alt={buddy.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-medium">{buddy.name}</div>
                <div className="text-sm text-gray-600">{buddy.location}</div>
              </div>
            </div>
          </Link>
          <ConnectButton
            name={buddy.name || "Unknown"}
            username={buddy.username}
            status={buddy.connectionStatus}
            size="sm"
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
            onCancel={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      ))}
    </div>
  );
}
