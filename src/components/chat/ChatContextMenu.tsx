import React from 'react';
import { Bell, Archive, Circle, UserMinus, Ban } from 'lucide-react';

interface ChatContextMenuProps {
  isOpen: boolean;
  onClose: () => void;
  position: { x: number; y: number };
  onAction: (action: string) => void;
}

export function ChatContextMenu({
  isOpen,
  onClose,
  position,
  onAction
}: ChatContextMenuProps) {
  if (!isOpen) return null;

  const menuItems = [
    { id: 'mute', icon: Bell, label: 'Mute Conversation' },
    { id: 'archive', icon: Archive, label: 'Archive Chat' },
    { id: 'unread', icon: Circle, label: 'Mark as Unread' },
    { id: 'unfriend', icon: UserMinus, label: 'Unfriend', danger: true },
    { id: 'block', icon: Ban, label: 'Block User', danger: true }
  ];

  return (
    <>
      <div
        className="fixed inset-0"
        onClick={onClose}
      />
      <div
        className="absolute bg-white rounded-lg shadow-lg py-1 w-56 z-50"
        style={{
          top: position.y,
          left: position.x
        }}
      >
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              onAction(item.id);
              onClose();
            }}
            className={`
              w-full flex items-center gap-2 px-4 py-2 text-sm
              ${item.danger
                ? 'text-red-600 hover:bg-red-50'
                : 'text-gray-700 hover:bg-gray-50'
              }
            `}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
}