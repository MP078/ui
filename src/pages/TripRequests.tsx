import { useEffect, useState } from "react";
import { Users, Check, X, Clock } from "lucide-react";
import { SearchBar } from "../components/search/SearchBar";
import { ConfirmationDialog } from "../components/ui/confirmation-dialog";
import { api } from "../lib/api";
import { getAvatarNumber } from "../context/UserContext";

interface TripRequest {
  id: string;
  user: {
    id: string;
    name: string;
    image: string;
    location: string;
    username: string;
  };
  trip: {
    id: string;
    title: string;
    location: string;
    start_date: string;
    end_date: string;
  };
  status: "pending" | "accepted" | "rejected";
  created_at: string;
}

export default function TripRequests() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tripRequests, setTripRequests] = useState<TripRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<TripRequest | null>(null);
  const [showAcceptDialog, setShowAcceptDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const res = await api.get("/trip_participations/pending");
        let data = Array.isArray(res.data) ? res.data : res.data.participants;
        if (!Array.isArray(data)) data = [];
        // Map to TripRequest shape (API only returns user_id, not user object)
        setTripRequests(
          data.map((item: any) => ({
            id: item.id,
            user: {
              id: item.user_id,
              name: item.user_id, // Placeholder, since no name is provided
              image: `/avatars/${getAvatarNumber(item.user_id)}.png`,
              location: "", // No location in response
              username: item.user_id, // Placeholder
            },
            trip: {
              id: item.trip?.id || "",
              title: item.trip?.title || "",
              location: item.trip?.location || "",
              start_date: item.trip?.start_date || "",
              end_date: item.trip?.end_date || "",
            },
            status: item.approved === true ? "accepted" : item.approved === false ? "pending" : "pending",
            created_at: item.created_at || "",
          }))
        );
      } catch (error) {
        setTripRequests([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const filteredRequests = tripRequests.filter((request) => {
    const matchesSearch =
      request.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.user.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.trip.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch && request.status === "pending";
  });

  const handleAccept = (request: TripRequest) => {
    setSelectedRequest(request);
    setShowAcceptDialog(true);
  };

  const handleReject = (request: TripRequest) => {
    setSelectedRequest(request);
    setShowRejectDialog(true);
  };

  const confirmAccept = async () => {
    if (selectedRequest) {
      try {
        await api.post(`/trips/${selectedRequest.trip.id}/trip_participations/${selectedRequest.id}/approve`);
        removeRequest(selectedRequest.id);
      } catch (error) {
        // Optionally show error
      } finally {
        setShowAcceptDialog(false);
        setSelectedRequest(null);
      }
    }
  };

  const confirmReject = async () => {
    if (selectedRequest) {
      try {
        await api.delete(`/trips/${selectedRequest.trip.id}/trip_participations/${selectedRequest.id}`);
        removeRequest(selectedRequest.id);
      } catch (error) {
        // Optionally show error
      } finally {
        setShowRejectDialog(false);
        setSelectedRequest(null);
      }
    }
  };

  const removeRequest = (id: string) => {
    setTripRequests((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-semibold mb-2">Trip Join Requests</h1>
          <p className="text-gray-600">Manage your trip participation requests</p>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <SearchBar
              placeholder="Search by name, location, or trip..."
              value={searchQuery}
              onChange={setSearchQuery}
              className="w-64"
            />
          </div>
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : filteredRequests.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 text-lg">
                  {searchQuery
                    ? "No requests found matching your search"
                    : `No trip join requests found`}
                </p>
              </div>
            ) : (
              filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={request.user.image}
                      alt={request.user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{request.user.name}</h3>
                      <p className="text-sm text-gray-600">{request.user.location}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Trip: <span className="font-semibold text-brand-orange">{request.trip.title}</span> in {request.trip.location}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {request.trip.start_date} - {request.trip.end_date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {request.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleAccept(request)}
                          className="flex items-center gap-1 bg-brand-orange text-white px-3 py-1.5 rounded-lg text-sm hover:bg-brand-orange/90 transition-colors"
                        >
                          <Check className="w-4 h-4" />
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(request)}
                          className="flex items-center gap-1 border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <ConfirmationDialog
        isOpen={showAcceptDialog}
        onClose={() => setShowAcceptDialog(false)}
        onConfirm={confirmAccept}
        title="Accept Trip Join Request"
        message={`Are you sure you want to accept the trip join request from ${selectedRequest?.user.name}?`}
        confirmText="Accept"
        type="info"
      />
      <ConfirmationDialog
        isOpen={showRejectDialog}
        onClose={() => setShowRejectDialog(false)}
        onConfirm={confirmReject}
        title="Reject Trip Join Request"
        message={`Are you sure you want to reject the trip join request from ${selectedRequest?.user.name}?`}
        confirmText="Reject"
        type="warning"
      />
    </div>
  );
}
