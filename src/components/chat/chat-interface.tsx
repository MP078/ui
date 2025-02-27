import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Paperclip, Mic, Phone, Video, MoreVertical, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { MessageRequests } from './MessageRequests';
import { ChatSidePanel } from './ChatSidePanel';
import { ChatContextMenu } from './ChatContextMenu';
import { Message } from './Message';
import { MessageInput } from './MessageInput';
import { TypingIndicator } from './TypingIndicator';
import { SearchBar } from '../search/SearchBar';

interface ChatInterfaceProps {
  onOpenSidePanel?: () => void;
  onContextMenu?: (e: React.MouseEvent, chatId: string) => void;
}

export function ChatInterface({ onOpenSidePanel, onContextMenu }: ChatInterfaceProps) {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chats = [
    {
      id: '1',
      name: 'Alex Andrew',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
      lastMessage: "Let's plan our trip!",
      isOnline: true,
      unreadCount: 2,
      lastActive: 'Active now'
    },
    {
      id: '2',
      name: 'Sarah Chen',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      lastMessage: 'The view from Everest Base Camp!',
      isOnline: false,
      unreadCount: 0,
      lastActive: '2h ago'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div className="flex h-full bg-brand-beige">
      {/* Left Panel - Chat List */}
      <div className="w-[320px] bg-white border-r border-gray-200">
        <div className="h-full flex flex-col">
          <div className="p-4 border-b">
            <SearchBar
              placeholder="Search in messages..."
              className="w-full mb-4"
            />
            <div className="flex gap-4">
              <button
                onClick={() => setShowRequests(false)}
                className={`flex-1 py-2 text-center rounded-lg transition-colors ${
                  !showRequests ? 'bg-brand-orange text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Chats
              </button>
              <button
                onClick={() => setShowRequests(true)}
                className={`flex-1 py-2 text-center rounded-lg transition-colors ${
                  showRequests ? 'bg-brand-orange text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Requests
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {showRequests ? (
              <MessageRequests />
            ) : (
              <div className="p-4 space-y-2">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className={`flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer ${
                      selectedChat === chat.id ? 'bg-gray-50' : ''
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={chat.image}
                        alt={chat.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                        chat.isOnline ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{chat.name}</span>
                        <span className="text-xs text-brand-gray">{chat.lastActive}</span>
                      </div>
                      <p className="text-sm text-brand-gray truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unreadCount > 0 && (
                      <div className="ml-2 bg-brand-orange text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {chat.unreadCount}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel - Chat Window */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <div className="flex items-center gap-3">
            <img
              src={chats[0].image}
              alt={chats[0].name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-medium">{chats[0].name}</h3>
              <p className="text-sm text-gray-500">{chats[0].lastActive}</p>
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
              <Video className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidePanelOpen(true)}
            >
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Existing messages implementation */}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white border-t">
          <MessageInput
            onSend={(message) => console.log('Sending:', message)}
            onAttachment={(file) => console.log('Attachment:', file)}
            onVoice={(blob) => console.log('Voice:', blob)}
          />
        </div>
      </div>

      {/* Side Panel */}
      <ChatSidePanel
        isOpen={sidePanelOpen}
        onClose={() => setSidePanelOpen(false)}
        chatId={selectedChat || ''}
      />
    </div>
  );
}