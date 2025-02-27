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

// Dummy chat data
const chats = [
  {
    id: '1',
    name: 'Alex Andrew',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
    lastMessage: "Let's plan our trip!",
    isOnline: true,
    unreadCount: 2,
    lastActive: 'Active now',
    messages: [
      {
        id: '1-1',
        content: "Hey there! I saw your post about planning a trip to Nepal. I'm thinking of going there next month too!",
        timestamp: '10:30 AM',
        sender: {
          id: '1',
          name: 'Alex Andrew',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'
        },
        isOwn: false,
        status: 'read',
        reactions: []
      },
      {
        id: '1-2',
        content: "That's awesome! I'm planning to visit Kathmandu and then trek to Everest Base Camp. What's your itinerary?",
        timestamp: '10:32 AM',
        sender: {
          id: 'me',
          name: 'You',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
        },
        isOwn: true,
        status: 'read',
        reactions: []
      },
      {
        id: '1-3',
        content: "I'm thinking of doing the Annapurna Circuit instead. Have you done that one before?",
        timestamp: '10:33 AM',
        sender: {
          id: '1',
          name: 'Alex Andrew',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'
        },
        isOwn: false,
        status: 'read',
        reactions: [{ emoji: '👍', count: 1, users: ['me'] }]
      },
      {
        id: '1-4',
        content: "No, but I've heard it's amazing! Maybe we could coordinate our trips and meet up in Pokhara afterwards?",
        timestamp: '10:35 AM',
        sender: {
          id: 'me',
          name: 'You',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
        },
        isOwn: true,
        status: 'delivered',
        reactions: []
      },
      {
        id: '1-5',
        content: "That sounds like a great plan! Let's do it. I'll send you my detailed itinerary later today.",
        timestamp: '10:36 AM',
        sender: {
          id: '1',
          name: 'Alex Andrew',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'
        },
        isOwn: false,
        status: 'sent',
        reactions: [{ emoji: '❤️', count: 1, users: ['me'] }]
      }
    ]
  },
  {
    id: '2',
    name: 'Sarah Chen',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    lastMessage: 'The view from Everest Base Camp!',
    isOnline: false,
    unreadCount: 0,
    lastActive: '2h ago',
    messages: [
      {
        id: '2-1',
        content: "Hi there! Just wanted to share some photos from my recent trip to Everest Base Camp. The views were absolutely breathtaking!",
        timestamp: 'Yesterday',
        sender: {
          id: '2',
          name: 'Sarah Chen',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
        },
        isOwn: false,
        status: 'read',
        reactions: []
      },
      {
        id: '2-2',
        content: "Wow, those are amazing! How difficult was the trek? I'm planning to go there next year.",
        timestamp: 'Yesterday',
        sender: {
          id: 'me',
          name: 'You',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
        },
        isOwn: true,
        status: 'read',
        reactions: []
      },
      {
        id: '2-3',
        content: "It was challenging but definitely worth it! The key is to acclimatize properly. I spent two days in Namche Bazaar which helped a lot.",
        timestamp: 'Yesterday',
        sender: {
          id: '2',
          name: 'Sarah Chen',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
        },
        isOwn: false,
        status: 'read',
        reactions: [{ emoji: '🙏', count: 1, users: ['me'] }]
      },
      {
        id: '2-4',
        content: "Thanks for the tip! I'll make sure to plan for that. Did you hire a guide or did you go with a group?",
        timestamp: 'Yesterday',
        sender: {
          id: 'me',
          name: 'You',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
        },
        isOwn: true,
        status: 'read',
        reactions: []
      },
      {
        id: '2-5',
        content: "I went with a small group of 6 people. It was a good balance - not too crowded but enough people to make it fun. I can recommend the company if you'd like!",
        timestamp: 'Yesterday',
        sender: {
          id: '2',
          name: 'Sarah Chen',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
        },
        isOwn: false,
        status: 'read',
        reactions: []
      }
    ]
  },
  {
    id: '3',
    name: 'Mike Johnson',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    lastMessage: 'Let me know your travel dates!',
    isOnline: true,
    unreadCount: 1,
    lastActive: 'Active now',
    messages: [
      {
        id: '3-1',
        content: "Hey, I heard you're planning a trip to Bali next month?",
        timestamp: '3 days ago',
        sender: {
          id: '3',
          name: 'Mike Johnson',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
        },
        isOwn: false,
        status: 'read',
        reactions: []
      },
      {
        id: '3-2',
        content: "Yes! I'm so excited. Going to spend two weeks exploring the island.",
        timestamp: '3 days ago',
        sender: {
          id: 'me',
          name: 'You',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
        },
        isOwn: true,
        status: 'read',
        reactions: []
      },
      {
        id: '3-3',
        content: "That's awesome! I'll be there from the 15th to the 25th. Maybe we could meet up?",
        timestamp: '3 days ago',
        sender: {
          id: '3',
          name: 'Mike Johnson',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
        },
        isOwn: false,
        status: 'read',
        reactions: [{ emoji: '😄', count: 1, users: ['me'] }]
      },
      {
        id: '3-4',
        content: "Definitely! I'll be there from the 10th to the 24th, so we have plenty of overlap. Where are you staying?",
        timestamp: '3 days ago',
        sender: {
          id: 'me',
          name: 'You',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
        },
        isOwn: true,
        status: 'read',
        reactions: []
      },
      {
        id: '3-5',
        content: "I'll be in Ubud for the first few days, then heading to Seminyak. Let me know your travel dates and we can plan something!",
        timestamp: '2 days ago',
        sender: {
          id: '3',
          name: 'Mike Johnson',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
        },
        isOwn: false,
        status: 'sent',
        reactions: []
      }
    ]
  }
];

// Add message request data to the chats array
const messageRequests = [
  {
    id: '4',
    name: 'John Doe',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    lastMessage: 'Hi! I saw your Everest Base Camp photos...',
    isOnline: false,
    unreadCount: 1,
    lastActive: '2 hours ago',
    messages: [
      {
        id: '4-1',
        content: "Hi! I saw your Everest Base Camp photos and they're amazing! I'm planning to go there next month. Would you mind sharing some tips?",
        timestamp: '2 hours ago',
        sender: {
          id: '4',
          name: 'John Doe',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
        },
        isOwn: false,
        status: 'read',
        reactions: []
      }
    ]
  },
  {
    id: '5',
    name: 'Sarah Wilson',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    lastMessage: 'Would love to join your next trek!',
    isOnline: true,
    unreadCount: 1,
    lastActive: 'Active now',
    messages: [
      {
        id: '5-1',
        content: "Hello! I noticed you're planning a trek to Annapurna next month. Would love to join your group if there's still space available!",
        timestamp: '1 day ago',
        sender: {
          id: '5',
          name: 'Sarah Wilson',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
        },
        isOwn: false,
        status: 'read',
        reactions: []
      }
    ]
  }
];

export function ChatInterface({ onOpenSidePanel, onContextMenu }: ChatInterfaceProps) {
  const [selectedChat, setSelectedChat] = useState<string | null>('1'); // Default to first chat
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [allChats, setAllChats] = useState([...chats]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat]);

  // Get the current chat data
  const currentChat = allChats.find(chat => chat.id === selectedChat);

  // Filter chats based on search query
  const filteredChats = allChats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (message: string) => {
    console.log('Sending message:', message, 'to chat:', selectedChat);
    // In a real app, you would add the message to the chat and send it to the server
  };

  const handleSelectRequestChat = (chatId: string) => {
    // Find the request in messageRequests
    const request = messageRequests.find(req => req.id === chatId);
    
    if (request) {
      // Check if this request is already in allChats
      const existingChat = allChats.find(chat => chat.id === chatId);
      
      if (!existingChat) {
        // Add the request to allChats
        setAllChats(prev => [...prev, {
          id: request.id,
          name: request.name,
          image: request.image,
          lastMessage: request.lastMessage,
          isOnline: request.isOnline || false,
          unreadCount: request.unreadCount || 0,
          lastActive: request.lastActive || '',
          messages: request.messages || []
        }]);
      }
      
      // Select the chat
      setSelectedChat(chatId);
      setShowRequests(false);
    }
  };

  const handleAddReaction = (messageId: string, emoji: string) => {
    if (!currentChat) return;
    
    setAllChats(prevChats => 
      prevChats.map(chat => {
        if (chat.id !== currentChat.id) return chat;
        
        return {
          ...chat,
          messages: chat.messages.map(message => {
            if (message.id !== messageId) return message;
            
            // Check if user already reacted with this emoji
            const existingReaction = message.reactions.find(r => r.emoji === emoji && r.users.includes('me'));
            
            if (existingReaction) {
              // Remove user's reaction if they already reacted with this emoji
              if (existingReaction.count === 1) {
                return {
                  ...message,
                  reactions: message.reactions.filter(r => r.emoji !== emoji)
                };
              } else {
                return {
                  ...message,
                  reactions: message.reactions.map(r => 
                    r.emoji === emoji 
                      ? { ...r, count: r.count - 1, users: r.users.filter(u => u !== 'me') }
                      : r
                  )
                };
              }
            } else {
              // Add new reaction or update existing one
              const existingEmojiIndex = message.reactions.findIndex(r => r.emoji === emoji);
              
              if (existingEmojiIndex >= 0) {
                const updatedReactions = [...message.reactions];
                updatedReactions[existingEmojiIndex] = {
                  ...updatedReactions[existingEmojiIndex],
                  count: updatedReactions[existingEmojiIndex].count + 1,
                  users: [...updatedReactions[existingEmojiIndex].users, 'me']
                };
                return { ...message, reactions: updatedReactions };
              } else {
                return {
                  ...message,
                  reactions: [...message.reactions, { emoji, count: 1, users: ['me'] }]
                };
              }
            }
          })
        };
      })
    );
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
              <MessageRequests onSelectChat={handleSelectRequestChat} />
            ) : (
              <div className="p-4 space-y-2">
                {filteredChats.map((chat) => (
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
                        className="w-12 h-12 rounded-full object-cover"
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
        {currentChat && (
          <div className="flex items-center justify-between p-4 border-b bg-white">
            <div className="flex items-center gap-3">
              <img
                src={currentChat.image}
                alt={currentChat.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-medium">{currentChat.name}</h3>
                <p className="text-sm text-gray-500">{currentChat.lastActive}</p>
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
        )}

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {currentChat && currentChat.messages.map((message) => (
            <Message
              key={message.id}
              id={message.id}
              content={message.content}
              timestamp={message.timestamp}
              sender={message.sender}
              isOwn={message.isOwn}
              status={message.status}
              reactions={message.reactions}
              onAddReaction={(emoji) => handleAddReaction(message.id, emoji)}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white border-t">
          <MessageInput
            onSend={handleSendMessage}
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
