import React from 'react';
import { X, Search, Bell, Shield, Image as ImageIcon } from 'lucide-react';

interface ChatSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  chatId: string;
}

export function ChatSidePanel({ isOpen, onClose, chatId }: ChatSidePanelProps) {
  return (
    <div
      className={`fixed inset-y-0 right-0 w-80 bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Chat Info</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 border-b">
            <h4 className="font-medium mb-2">Shared Media</h4>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center"
                >
                  <ImageIcon className="w-6 h-6 text-gray-400" />
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 space-y-4">
            <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-lg">
              <Search className="w-5 h-5 text-gray-400" />
              <span>Search in Conversation</span>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-lg">
              <Bell className="w-5 h-5 text-gray-400" />
              <span>Notifications</span>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-lg">
              <Shield className="w-5 h-5 text-gray-400" />
              <span>Privacy & Support</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}