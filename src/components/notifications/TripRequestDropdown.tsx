import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAvatarNumber } from "../../context/UserContext";
import { api } from "../../lib/api";

interface Participant {
  id: string;
  user: {
    id: string;
    username: string;
    email: string;
    name: string;
    verified: boolean;
    certifications: string[];
    location: string;
    website: string;
    languages: string[];
    interests: string[];
    bio: string;
    about: string | null;
    phone: string | null;
    friendship_status: string;
    total_trips: number;
    travel_days: number;
    connections: number;
    profile_image: boolean;
    member_since: string;
  };
  trip: {
    id: string;
    title: string;
    location: string;
    start_date: string;
    end_date: string;
  };
}

interface TripRequestDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TripRequestDropdown({ isOpen }: TripRequestDropdownProps) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    api
      .get("/list_pending_participants")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setParticipants(res.data);
        } else if (Array.isArray(res.data.participants)) {
          setParticipants(res.data.participants);
        } else {
          setParticipants([]);
        }
      })
      .catch(() => setParticipants([]))
      .finally(() => setLoading(false));
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAccept = async (id: string, tripId: string) => {
    const prev = [...participants];
    setParticipants((p) => p.filter((item) => item.id !== id));
    try {
      await api.post(`/trips/${tripId}/trip_participations/${id}/approve`);
    } catch {
      setParticipants(prev);
    }
  };

  const handleReject = async (id: string, tripId: string) => {
    const prev = [...participants];
    setParticipants((p) => p.filter((item) => item.id !== id));
    try {
      await api.delete(`/trips/${tripId}/trip_participations/${id}`);
    } catch {
      setParticipants(prev);
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg overflow-hidden z-50">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Trip Join Requests</h3>
          <span className="text-sm text-brand-orange">
            {participants.length} new
          </span>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {loading ? (
          <div className="p-4 text-sm text-gray-500">Loading...</div>
        ) : participants.length === 0 ? (
          <div className="p-4 text-sm text-gray-500">No trip requests.</div>
        ) : (
          participants.map((p) => (
            <div
              key={p.id}
              className="p-4 border-b last:border-b-0 hover:bg-gray-50"
            >
              <div className="flex items-start gap-3">
                <Link to={`/${p.user?.username ?? ""}`}>
                  <img
                    src={
                      typeof p.user?.profile_image === "string" &&
                      p.user.profile_image
                        ? p.user.profile_image
                        : `/avatars/${getAvatarNumber(p.user.id)}.png`
                    }
                    alt={p.user?.name ?? ""}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </Link>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <Link to={`/${p.user.username}`}>
                      <h4 className="font-medium text-base">{p.user.name}</h4>
                    </Link>
                    <span className="text-xs text-gray-500">
                      {p.user.member_since}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-mono">
                      {p.trip.title}
                    </span>
                    <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">
                      {p.trip.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-500">Trip Dates:</span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-800 bg-orange-50 px-2 py-0.5 rounded-full">
                      <svg
                        className="w-3 h-3 text-orange-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <path d="M16 2v4M8 2v4M3 10h18" />
                      </svg>
                      {p.trip.start_date
                        ? new Date(p.trip.start_date).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "??"}
                      <span className="mx-1 text-gray-400">→</span>
                      {p.trip.end_date
                        ? new Date(p.trip.end_date).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "??"}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleAccept(p.id, p.trip.id)}
                      className="flex-1 bg-brand-orange text-white px-3 py-1 rounded-full text-sm hover:bg-brand-orange/90 transition-colors"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(p.id, p.trip.id)}
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
