import { useState, useRef, useEffect } from "react";
import { Phone, MoreVertical, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Message } from "./Message";
import { MessageInput } from "./MessageInput";
import { SearchBar } from "../search/SearchBar";
import { useChat } from "../../context/ChatContext";
import { api } from "../../lib/api";

export function ChatInterface() {
  const { chatList, selectedChat, setSelectedChat, messages, sendMessage } =
    useChat();
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentChat = chatList.find((chat) => chat.id === selectedChat);
  const filteredChats = chatList.filter((chat) =>
    chat.other_user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat, messages]);

  const handleSendMessage = async (message: string) => {
    if (!selectedChat) return;
    try {
      // Use the shared api instance for POST
      await api.post(`/conversations/${selectedChat}/messages`, {
        message: { content: message },
      });
      sendMessage(selectedChat, message);
    } catch {
      // Optionally show error to user
    }
  };

  return (
    <div className="flex h-full bg-brand-beige">
      {/* Left Panel - Chat List */}
      <div className="w-[320px] bg-white border-r border-gray-200">
        <div className="h-full flex flex-col">
          <div className="p-4 border-b">
            <SearchBar
              placeholder="Search in messages..."
              value={searchQuery}
              onChange={setSearchQuery}
              className="w-full mb-4"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-2">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer ${
                    selectedChat === chat.id ? "bg-gray-50" : ""
                  }`}
                >
                  <div className="relative">
                    <img
                      src={chat.other_user.avatar_url || "/avatars/1.png"}
                      alt={chat.other_user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        {chat.other_user.name}
                      </span>
                      <span className="text-xs text-brand-gray">
                        {chat.last_message?.created_at
                          ? new Date(
                              chat.last_message.created_at
                            ).toLocaleTimeString()
                          : ""}
                      </span>
                    </div>
                    <p className="text-sm text-brand-gray truncate">
                      {chat.last_message?.content || "No messages yet"}
                    </p>
                  </div>
                  {chat.unread_count > 0 && (
                    <div className="ml-2 bg-brand-orange text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {chat.unread_count}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Chat Window */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        {currentChat && (
          <div className="flex items-center justify-between p-4 border-b bg-white">
            <div className="flex items-center gap-3">
              <img
                src={currentChat.other_user.avatar_url || "/avatars/1.png"}
                alt={currentChat.other_user.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-medium">{currentChat.other_user.name}</h3>
                <p className="text-sm text-gray-500">
                  @{currentChat.other_user.username}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Phone className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {messages.map((message) => (
            <Message
              key={message.id}
              id={message.id}
              content={message.content}
              timestamp={message.timestamp}
              sender={message.sender}
              isOwn={message.isOwn}
              status={message.status}
              reactions={message.reactions}
              onAddReaction={() => {}}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white border-t">
          <MessageInput
            onSend={handleSendMessage}
            onAttachment={() => {}}
            onVoice={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
