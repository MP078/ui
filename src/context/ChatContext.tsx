import type { ChatListItem, ChatMessage, ChatMessageUI } from "../types/chat";
import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from "react";
import { createChatSubscription } from "../services/cableService";
import { api } from "../lib/api";
import type { Subscription } from "@rails/actioncable";
import { useContext as useReactContext } from "react";
import { UserContext } from "./UserContext";

interface ChatContextType {
  chatList: ChatListItem[];
  selectedChat: string | null;
  setSelectedChat: React.Dispatch<React.SetStateAction<string | null>>;
  messages: ChatMessageUI[];
  sendMessage: (chatId: string, message: string) => void;
  markAsRead: (chatId: string) => void;
  currentUserId: string;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chatList, setChatList] = useState<ChatListItem[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessageUI[]>([]);
  const subscriptionsRef = useRef<
    Record<
      string,
      Subscription & {
        sendMessage?: (data: object) => void;
        markAsRead?: () => void;
      }
    >
  >({});
  const { user } = useReactContext(UserContext);
  const currentUserId = user?.id || "";

  // Fetch chat list from backend on mount (GET /conversations)
  useEffect(() => {
    api.get("/conversations").then((res: { data: ChatListItem[] }) => {
      setChatList(res.data);
      if (!selectedChat && res.data.length > 0) {
        setSelectedChat(res.data[0].id);
      }
    });
    // eslint-disable-next-line
  }, []);

  // Fetch messages for selected chat (GET /conversations/:id)
  useEffect(() => {
    if (!selectedChat) return;
    api
      .get(`/conversations/${selectedChat}`)
      .then((res: { data: { messages: ChatMessage[] } }) => {
        setMessages(
          (res.data.messages || []).map((msg) => ({
            id: msg.id,
            content: msg.content,
            timestamp: msg.created_at,
            sender: {
              id: msg.user_id,
              name:
                msg.user_id === user?.id
                  ? user?.name || "You"
                  : chatList.find((c) => c.id === selectedChat)?.other_user
                      .name || "",
              avatar:
                msg.user_id === user?.id
                  ? user?.image_url || "/avatars/1.png"
                  : chatList.find((c) => c.id === selectedChat)?.other_user
                      .avatar_url || "/avatars/1.png",
            },
            isOwn: msg.user_id === user?.id,
            status: msg.read ? "read" : "delivered",
          }))
        );
      });
  }, [selectedChat, chatList, user]);

  // Subscribe to ActionCable for real-time updates for selected chat only
  useEffect(() => {
    if (!selectedChat) return;
    // Unsubscribe previous
    Object.values(subscriptionsRef.current).forEach(
      (sub) => sub.unsubscribe && sub.unsubscribe()
    );
    subscriptionsRef.current = {};
    const subscription = createChatSubscription(
      selectedChat,
      (data: unknown) => {
        // Type guard for expected data shape
        if (typeof data === "object" && data !== null && "action" in data) {
          const action = (data as { action: string }).action;
          if (action === "messages_read") {
            setMessages((prev) =>
              prev.map((msg) => (msg.isOwn ? msg : { ...msg, status: "read" }))
            );
            return;
          }
        }
        // Assume it's a new message
        const chatMessage = data as ChatMessage;
        setMessages((prev) => [
          ...prev,
          {
            id: chatMessage.id,
            content: chatMessage.content,
            timestamp: chatMessage.created_at,
            sender: {
              id: chatMessage.user_id,
              name:
                chatMessage.user_id === user?.id
                  ? user?.name || "You"
                  : chatList.find((c) => c.id === selectedChat)?.other_user
                      .name || "",
              avatar:
                chatMessage.user_id === user?.id
                  ? user?.image_url || "/avatars/1.png"
                  : chatList.find((c) => c.id === selectedChat)?.other_user
                      .avatar_url || "/avatars/1.png",
            },
            isOwn: chatMessage.user_id === user?.id,
            status: chatMessage.read ? "read" : "delivered",
          },
        ]);
      }
    );
    subscriptionsRef.current[selectedChat] = subscription;
    return () => {
      Object.values(subscriptionsRef.current).forEach(
        (sub) => sub.unsubscribe && sub.unsubscribe()
      );
      subscriptionsRef.current = {};
    };
  }, [selectedChat, chatList, user]);

  const sendMessage = (chatId: string, message: string) => {
    const subscription = subscriptionsRef.current[chatId];
    if (subscription && typeof subscription.sendMessage === "function") {
      subscription.sendMessage({ content: message });
    }
  };

  const markAsRead = (chatId: string) => {
    const subscription = subscriptionsRef.current[chatId];
    if (subscription && typeof subscription.markAsRead === "function") {
      subscription.markAsRead();
    }
  };

  return (
    <ChatContext.Provider
      value={{
        chatList,
        selectedChat,
        setSelectedChat,
        messages,
        sendMessage,
        markAsRead,
        currentUserId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
