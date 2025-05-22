import { useEffect, useState } from "react";
import { Users, Clock, X, Check } from "lucide-react";
import { TripSummaryModal } from "../components/trips/TripSummaryModal";
import { SearchBar } from "../components/search/SearchBar";
import { ConfirmationDialog } from "../components/ui/confirmation-dialog";
import { api } from "../lib/api";
//import { getAvatarNumber } from "../context/UserContext";


export default function TripRequests() {
  const [receivedRequests, setReceivedRequests] = useState<TripRequest[]>([]);
  const [sentRequests, setSentRequests] = useState<TripRequest[]>([]);
  const [activeTab, setActiveTab] = useState<"received" | "sent">("received");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedRequest, setSelectedRequest] = useState<TripRequest | null>(null);
  const [dialogType, setDialogType] = useState<"accept" | "reject" | "cancel" | null>(null);

  const [tripSummaryData, setTripSummaryData] = useState<any>(null);
  const [showTripSummary, setShowTripSummary] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const receivedRes = await api.get("/list_pending_participants");
        let receivedData = Array.isArray(receivedRes.data)
          ? receivedRes.data
          : receivedRes.data.participants;

        receivedData = receivedData || [];

        setReceivedRequests(
          receivedData.map((item: any) => ({
            id: item.id,
            user: {
              id: item.user?.id || item.user_id || "",
              name: item.user?.name || item.user?.username || "Unknown",
              image: item.user?.profile_image || `/avatars/${getAvatarNumber(item.user?.id || "")}.png`,
              location: item.user?.location || "Unknown",
              username: item.user?.username || "",
            },
            trip: {
              id: item.trip?.id || "",
              title: item.trip?.title || "",
              location: item.trip?.location || "",
              start_date: item.trip?.start_date || "",
              end_date: item.trip?.end_date || "",
            },
            status:
              item.approved === true
                ? "accepted"
                : item.approved === false
                ? "rejected"
                : "pending",
            created_at: item.created_at || "",
          }))
        );

        const sentRes = await api.get("/trip_participations/pending");
        let sentData = Array.isArray(sentRes.data)
          ? sentRes.data
          : sentRes.data.participants;

        sentData = sentData || [];

        setSentRequests(
          sentData.map((item: any) => ({
            id: item.id,
            user: {
              id: "",
              name: "",
              image: "",
              location: "",
              username: "",
            },
            trip: {
              id: item.trip?.id || "",
              title: item.trip?.title || "",
              location: item.trip?.location || "",
              start_date: item.trip?.start_date || "",
              end_date: item.trip?.end_date || "",
              image: item.trip?.image || "/placeholders/trip.png",
            },
            status:
              item.approved === true
                ? "accepted"
                : item.approved === false
                ? "rejected"
                : "pending",
            created_at: item.created_at || "",
          }))
        );
      } catch (err) {
        console.error("Error fetching trip requests", err);
        setReceivedRequests([]);
        setSentRequests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // For received: show pending count. For sent: show total count.
  const getPendingCount = (type: "received" | "sent") =>
    type === "received"
      ? receivedRequests.filter((r) => r.status === "pending").length
      : sentRequests.length;

  const allRequests = activeTab === "received" ? receivedRequests : sentRequests;

  const filteredRequests = allRequests.filter((request) => {
    const matchesSearch =
      request.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.user?.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.trip?.title?.toLowerCase().includes(searchQuery.toLowerCase());
    // Only filter by status for received tab; show all for sent
    return matchesSearch && (activeTab === "received" ? request.status === "pending" : true);
  });

  const handleDialog = (type: "accept" | "reject" | "cancel", request: TripRequest) => {
    setSelectedRequest(request);
    setDialogType(type);
  };

  const confirmAction = async () => {
    if (!selectedRequest || !dialogType) return;
    try {
      if (dialogType === "accept") {
        await api.post(
          `/trips/${selectedRequest.trip.id}/trip_participations/${selectedRequest.id}/approve`
        );
        removeRequest(selectedRequest.id, "received");
      } else if (dialogType === "reject") {
        await api.delete(
          `/trips/${selectedRequest.trip.id}/trip_participations/${selectedRequest.id}`
        );
        removeRequest(selectedRequest.id, "received");
      } else if (dialogType === "cancel") {
        await api.delete(`/trips/${selectedRequest.trip.id}/leave`);
        removeRequest(selectedRequest.id, "sent");
      }
    } catch (err) {
      console.error(`Failed to ${dialogType} request`, err);
    } finally {
      setDialogType(null);
      setSelectedRequest(null);
    }
  };

  const removeRequest = (id: string, type: "received" | "sent") => {
    if (type === "received") {
      setReceivedRequests((prev) => prev.filter((r) => r.id !== id));
    } else {
      setSentRequests((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-semibold mb-2">Trip Join Requests</h1>
          <p className="text-gray-600">Manage your trip participation requests</p>
        </div>

        <div className="p-6">
          <div className="flex justify-between mb-6">
            <div className="flex gap-4">
              {["received", "sent"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as "received" | "sent")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    activeTab === tab
                      ? "bg-brand-orange text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {tab === "received" ? <Users className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
                    {getPendingCount(tab as "received" | "sent")}
                  </span>
                </button>
              ))}
            </div>
            <SearchBar
              placeholder="Search by name, location, or trip..."
              value={searchQuery}
              onChange={setSearchQuery}
              className="w-64"
            />
          </div>

          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : filteredRequests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              {searchQuery
                ? "No requests found matching your search."
                : `No ${activeTab} requests found.`}
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                {activeTab === "sent" ? (
                  <div className="flex items-center gap-4 w-full">
                    <img
                      src={request.trip.image}
                      alt={request.trip.title}
                      className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-brand-orange">
                        <button
                          onClick={() => {
                            setTripSummaryData({
                              total_days: 0,
                              total_cost: 0,
                              highlights: [],
                              photos: request.trip.image ? [request.trip.image] : [],
                              tripDestination: request.trip.title,
                            });
                            setShowTripSummary(true);
                          }}
                          className="hover:underline text-left"
                        >
                          {request.trip.title}
                        </button>
                      </h3>
                      <p className="text-sm text-gray-600">{request.trip.location}</p>
                      <p className="text-xs text-gray-500">
                        {request.trip.start_date} – {request.trip.end_date}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDialog("cancel", request)}
                      className="border border-gray-300 px-3 py-1.5 rounded-lg text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <X className="w-4 h-4 inline" /> Cancel Request
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 w-full">
                    <img
                      src={request.user.image}
                      alt={request.user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{request.user.name}</h3>
                      <p className="text-sm text-gray-600">{request.user.location}</p>
                      <p className="text-xs text-gray-500">
                        Trip:{" "}
                        <span className="font-semibold text-brand-orange">
                          {request.trip.title}
                        </span>{" "}
                        in {request.trip.location}
                      </p>
                      <p className="text-xs text-gray-500">
                        {request.trip.start_date} – {request.trip.end_date}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleDialog("accept", request)}
                        className="bg-brand-orange text-white px-3 py-1.5 rounded-lg text-sm hover:bg-brand-orange/90"
                      >
                        <Check className="w-4 h-4 inline" /> Accept
                      </button>
                      <button
                        onClick={() => handleDialog("reject", request)}
                        className="border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-100"
                      >
                        <X className="w-4 h-4 inline" /> Reject
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}

          {/* Modals */}
          {dialogType && selectedRequest && (
            <ConfirmationDialog
              isOpen={!!dialogType}
              onClose={() => setDialogType(null)}
              onConfirm={confirmAction}
              title={
                dialogType === "accept"
                  ? "Accept Trip Join Request"
                  : dialogType === "reject"
                  ? "Reject Trip Join Request"
                  : "Cancel Trip Join Request"
              }
              message={
                dialogType === "cancel"
                  ? `Are you sure you want to cancel your request to join "${selectedRequest.trip.title}"?`
                  : `Are you sure you want to ${dialogType} the request from ${selectedRequest.user.name}?`
              }
              confirmText={
                dialogType === "accept"
                  ? "Accept"
                  : dialogType === "reject"
                  ? "Reject"
                  : "Cancel Request"
              }
              type={
                dialogType === "accept"
                  ? "info"
                  : dialogType === "reject"
                  ? "warning"
                  : "danger"
              }
            />
          )}

          {showTripSummary && tripSummaryData && (
            <TripSummaryModal
              isOpen={true}
              onClose={() => setShowTripSummary(false)}
              {...tripSummaryData}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Helpers
function getAvatarNumber(id: string): number {
  const numericId = [...id].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return (numericId % 10) + 1;
}

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
    image?: string;
  };
  status: "pending" | "accepted" | "rejected";
  created_at: string;
}
