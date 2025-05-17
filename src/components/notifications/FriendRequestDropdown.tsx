import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";
interface FriendRequest {
  id: string;
  status: string;
  created_at: string;
  updated_at: string;
  sender_id: string;
  username: string;
  avatar_url: string;
  name: string;
  location: string;
}

interface FriendRequestDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FriendRequestDropdown({
  isOpen,
  onClose,
}: FriendRequestDropdownProps) {
  const [requests, setRequests] = useState<FriendRequest[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    api
      .get<{ data: FriendRequest[] }>(`/friendships/received_requests`)
      .then((res) => {
        const data = res.data.data.map((item) => ({
          id: item.id,
          status: item.status,
          created_at: item.created_at,
          updated_at: item.updated_at,
          sender_id: item.sender_id,
          username: item.username,
          avatar_url: item.avatar_url,
          name: item.name,
          location: item.location,
        }));
        setRequests(data);
      });
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAccept = async (username: string) => {
    const previousRequests = [...requests];
    setRequests((prev) => prev.filter((r) => r.username !== username));

    try {
      await api.post(`/friendships/${username}/accept`);
    } catch {
      console.error("Accept failed. Rolling back.");
      setRequests(previousRequests);
    }
  };

  const handleReject = async (username: string) => {
    const previousRequests = [...requests];
    setRequests((prev) => prev.filter((r) => r.username !== username));

    try {
      await api.delete(`/friendships/${username}`);
    } catch {
      console.error("Reject failed. Rolling back.");
      setRequests(previousRequests);
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Connection Requests</h3>
          <span className="text-sm text-brand-orange">
            {requests.length} new
          </span>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {requests.map((request) => (
          <div
            key={request.id}
            className="p-4 border-b last:border-b-0 hover:bg-gray-50"
          >
            <div className="flex items-start gap-3">
              <img
                src={request.avatar_url}
                alt={request.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{request.name}</h4>
                  <span className="text-xs text-gray-500">
                    {(() => {
                      const createdAt = new Date(request.created_at);
                      const now = new Date();
                      const diffMs = now.getTime() - createdAt.getTime();
                      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                      const diffDays = Math.floor(
                        diffMs / (1000 * 60 * 60 * 24)
                      );
                      const diffYears =
                        now.getFullYear() - createdAt.getFullYear();

                      if (diffYears > 0) {
                        return `${diffYears} year${
                          diffYears > 1 ? "s" : ""
                        } ago`;
                      } else if (diffDays > 0) {
                        return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
                      } else if (diffHours > 0) {
                        return `${diffHours} hour${
                          diffHours > 1 ? "s" : ""
                        } ago`;
                      } else {
                        return "Just now";
                      }
                    })()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{request.location}</p>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleAccept(request.username)}
                    className="flex-1 bg-brand-orange text-white px-3 py-1 rounded-full text-sm hover:bg-brand-orange/90 transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(request.username)}
                    className="flex-1 border border-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-50 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t text-center">
        <Link
          to="/connections/requests"
          className="text-sm text-brand-orange hover:text-brand-orange/90"
          onClick={onClose}
        >
          View All Requests
        </Link>
      </div>
    </div>
  );
}
