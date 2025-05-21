
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
      const res = await api.get("/users?suggested=true");
      const data = res.data.data;

      const travelers = data.map((user: any) => ({
        id: user.id,
        username: user.username,
        name: user.name,
        image: user.profile_image || `/avatars/${getAvatarNumber(user.id)}.png`,
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



  // Connect logic using username (not id)
  const handleConnect = async (username: string) => {
    setBuddies((prev) =>
      prev.map((buddy) =>
        buddy.username === username
          ? { ...buddy, connectionStatus: "sent" }
          : buddy
      )
    );
    try {
      await api.post(`/friendships/${username}`);
    } catch (error) {
      // Rollback UI if failed
      setBuddies((prev) =>
        prev.map((buddy) =>
          buddy.username === username
            ? { ...buddy, connectionStatus: "none" }
            : buddy
        )
      );
      console.error("Failed to send connection request:", error);
    }
  };

  const handleDisconnect = async (username: string) => {
    setBuddies((prev) =>
      prev.map((buddy) =>
        buddy.username === username
          ? { ...buddy, connectionStatus: "none" }
          : buddy
      )
    );
    try {
      await api.delete(`/friendships/${username}`);
    } catch (error) {
      // Rollback UI if failed
      setBuddies((prev) =>
        prev.map((buddy) =>
          buddy.username === username
            ? { ...buddy, connectionStatus: "friends" }
            : buddy
        )
      );
      console.error("Failed to disconnect:", error);
    }
  };

  const handleCancel = async (username: string) => {
    setBuddies((prev) =>
      prev.map((buddy) =>
        buddy.username === username
          ? { ...buddy, connectionStatus: "none" }
          : buddy
      )
    );
    try {
      await api.delete(`/friendships/${username}`);
    } catch (error) {
      // Rollback UI if failed
      setBuddies((prev) =>
        prev.map((buddy) =>
          buddy.username === username
            ? { ...buddy, connectionStatus: "sent" }
            : buddy
        )
      );
      console.error("Failed to cancel request:", error);
    }
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
      {buddies.length === 0 ? (
        <div className="text-gray-500 text-sm italic">
          Fill your details to let others know about you.
        </div>
      ) : (
        buddies.slice(0, 3).map((buddy) => (
          <div
            key={buddy.id}
            className="flex items-center justify-between mb-4"
          >
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
              onCancel={handleCancel}
            />
          </div>
        ))
      )}
    </div>
  );
}
