import { useEffect, useState } from "react";
import { Users, Check, X, Clock } from "lucide-react";
import { SearchBar } from "../components/search/SearchBar";
import { ConfirmationDialog } from "../components/ui/confirmation-dialog";
import { api } from "../lib/api";
import { timeAgo } from "../utils/timeago";

interface ConnectionRequest {
  id: string;
  user: {
    id: string;
    name: string;
    image: string;
    location: string;
    mutualFriends: number;
    timestamp: string;
    username: string;
  };
  status: "pending" | "accepted" | "rejected";
  type: "received" | "sent";
}

interface ApiRequestItem {
  id: string;
  sender_id?: string;
  receiver_id?: string;
  name: string;
  avatar_url: string;
  location: string;
  mutual_friends?: number;
  created_at: string;
  username: string;
  status: "pending" | "accepted" | "rejected";
}

export default function ConnectionRequests() {
  const [activeTab, setActiveTab] = useState<"received" | "sent">("received");
  const [searchQuery, setSearchQuery] = useState("");
  const [receivedRequests, setReceivedRequests] = useState<ConnectionRequest[]>(
    []
  );
  const [sentRequests, setSentRequests] = useState<ConnectionRequest[]>([]);
  const [selectedRequest, setSelectedRequest] =
    useState<ConnectionRequest | null>(null);
  const [showAcceptDialog, setShowAcceptDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const [receivedRes, sentRes] = await Promise.all([
          api.get<{ data: ApiRequestItem[] }>("/friendships/received_requests"),
          api.get<{ data: ApiRequestItem[] }>("/friendships/sent_requests"),
        ]);

        const mapData = (items: ApiRequestItem[], type: "received" | "sent") =>
          items.map((item) => ({
            id: item.id,
            user: {
              id: item.sender_id ?? item.receiver_id ?? "",
              name: item.name,
              image: item.avatar_url,
              location: item.location,
              mutualFriends: item.mutual_friends || 0,
              timestamp: item.created_at,
              username: item.username,
            },
            status: item.status,
            type,
          }));

        setReceivedRequests(mapData(receivedRes.data.data, "received"));
        setSentRequests(mapData(sentRes.data.data, "sent"));
      } catch (error) {
        console.error("Error fetching connection requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const allRequests =
    activeTab === "received" ? receivedRequests : sentRequests;

  const filteredRequests = allRequests.filter((request) => {
    const matchesSearch =
      request.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.user.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch && request.status === "pending";
  });

  const handleAccept = (request: ConnectionRequest) => {
    setSelectedRequest(request);
    setShowAcceptDialog(true);
  };

  const handleReject = (request: ConnectionRequest) => {
    setSelectedRequest(request);
    setShowRejectDialog(true);
  };

  const handleCancel = (request: ConnectionRequest) => {
    setSelectedRequest(request);
    setShowCancelDialog(true);
  };

  const confirmAccept = async () => {
    if (selectedRequest) {
      try {
        await api.post(`/friendships/${selectedRequest.user.username}/accept`);
        removeRequest(selectedRequest.id, "received");
      } catch (error) {
        console.error("Failed to accept request:", error);
      } finally {
        setShowAcceptDialog(false);
        setSelectedRequest(null);
      }
    }
  };

  const confirmReject = async () => {
    if (selectedRequest) {
      try {
        await api.delete(`/friendships/${selectedRequest.user.username}`);
        removeRequest(selectedRequest.id, "received");
      } catch (error) {
        console.error("Failed to reject request:", error);
      } finally {
        setShowRejectDialog(false);
        setSelectedRequest(null);
      }
    }
  };

  const confirmCancel = async () => {
    if (selectedRequest) {
      try {
        await api.post(`/friendships/${selectedRequest.user.username}/cancel`);
        removeRequest(selectedRequest.id, "sent");
      } catch (error) {
        console.error("Failed to cancel request:", error);
      } finally {
        setShowCancelDialog(false);
        setSelectedRequest(null);
      }
    }
  };

  const removeRequest = (id: string, type: "received" | "sent") => {
    if (type === "received") {
      setReceivedRequests((prev) => prev.filter((r) => r.id !== id));
    } else {
      setSentRequests((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const getPendingCount = (type: "received" | "sent") =>
    (type === "received" ? receivedRequests : sentRequests).filter(
      (r) => r.status === "pending"
    ).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-semibold mb-2">Connection Requests</h1>
          <p className="text-gray-600">Manage your connection requests</p>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab("received")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "received"
                    ? "bg-brand-orange text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Users className="w-5 h-5" />
                Received
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
                  {getPendingCount("received")}
                </span>
              </button>
              <button
                onClick={() => setActiveTab("sent")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "sent"
                    ? "bg-brand-orange text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Clock className="w-5 h-5" />
                Sent
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
                  {getPendingCount("sent")}
                </span>
              </button>
            </div>
            <SearchBar
              placeholder="Search by name or location..."
              value={searchQuery}
              onChange={setSearchQuery}
              className="w-64"
            />
          </div>

          <div className="space-y-4">
            {filteredRequests.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 text-lg">
                  {searchQuery
                    ? "No requests found matching your search"
                    : `No ${activeTab} requests found`}
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
                      <p className="text-sm text-gray-600">
                        {request.user.location}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Users className="w-3 h-3" />
                        {request.user.mutualFriends} mutual connections
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">
                      {timeAgo(request.user.timestamp)}
                    </span>
                    {request.type === "received" ? (
                      <div className="flex gap-2">
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
                      </div>
                    ) : (
                      <button
                        onClick={() => handleCancel(request)}
                        className="flex items-center gap-1 border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Cancel Request
                      </button>
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
        title="Accept Connection Request"
        message={`Are you sure you want to accept the connection request from ${selectedRequest?.user.name}?`}
        confirmText="Accept"
        type="info"
      />

      <ConfirmationDialog
        isOpen={showRejectDialog}
        onClose={() => setShowRejectDialog(false)}
        onConfirm={confirmReject}
        title="Reject Connection Request"
        message={`Are you sure you want to reject the connection request from ${selectedRequest?.user.name}?`}
        confirmText="Reject"
        type="warning"
      />

      <ConfirmationDialog
        isOpen={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        onConfirm={confirmCancel}
        title="Cancel Connection Request"
        message={`Are you sure you want to cancel your connection request to ${selectedRequest?.user.name}?`}
        confirmText="Cancel Request"
        type="danger"
      />
    </div>
  );
}
