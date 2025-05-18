import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";
import { timeAgo } from "../../utils/timeago";
import { getAvatarNumber } from "../../context/UserContext";

interface TripRequest {
  id: string;
  status: string;
  created_at: string;
  updated_at: string;
  trip_id: string;
  username: string;
  avatar_url: string;
  name: string;
  location: string;
}

interface TripRequestDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TripRequestDropdown({ isOpen, onClose }: TripRequestDropdownProps) {
  const [requests, setRequests] = useState<TripRequest[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    api
      .get<{ data: TripRequest[] }>(`/trips/requests/received`)
      .then((res) => {
        const data = res.data.data.map((item) => ({
          id: item.id,
          status: item.status,
          created_at: item.created_at,
          updated_at: item.updated_at,
          trip_id: item.trip_id,
          username: item.username,
          avatar_url: item.avatar_url,
          name: item.name,
          location: item.location,
        }));
        setRequests(data);
      });
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAccept = async (id: string) => {
    const previousRequests = [...requests];
    setRequests((prev) => prev.filter((r) => r.id !== id));
    try {
      await api.post(`/trips/requests/${id}/accept`);
    } catch {
      setRequests(previousRequests);
    }
  };

  const handleReject = async (id: string) => {
    const previousRequests = [...requests];
    setRequests((prev) => prev.filter((r) => r.id !== id));
    try {
      await api.delete(`/trips/requests/${id}`);
    } catch {
      setRequests(previousRequests);
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Trip Requests</h3>
          <span className="text-sm text-brand-orange">{requests.length} new</span>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {requests.length === 0 ? (
          <div className="p-4 text-sm text-gray-500">No trip requests.</div>
        ) : (
          requests.map((request) => (
            <div
              key={request.id}
              className="p-4 border-b last:border-b-0 hover:bg-gray-50"
            >
              <div className="flex items-start gap-3">
                <Link to={`/${request.username}`} key={request.id}>
                  <img
                    src={
                      request.avatar_url ||
                      `/avatars/${getAvatarNumber(request.username)}.png`
                    }
                    alt={request.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </Link>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <Link to={`/${request.username}`} key={request.id}>
                      <h4 className="font-medium">{request.name}</h4>
                    </Link>
                    <span className="text-xs text-gray-500">
                      {timeAgo(request.created_at)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{request.location}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleAccept(request.id)}
                      className="flex-1 bg-brand-orange text-white px-3 py-1 rounded-full text-sm hover:bg-brand-orange/90 transition-colors"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(request.id)}
                      className="flex-1 border border-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-50 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      </div>
  );
}
