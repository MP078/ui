import React from 'react';
import { Bell, MapPin, Calendar, MessageCircle } from 'lucide-react';

interface Notification {
  id: string;
  type: 'trip' | 'message' | 'connection';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'trip',
    title: 'Trip Reminder',
    description: 'Your Everest Base Camp trek starts in 3 days',
    time: '2 hours ago',
    read: false
  },
  {
    id: '2',
    type: 'message',
    title: 'New Message',
    description: 'Rachel sent you a message about the upcoming trip',
    time: '5 hours ago',
    read: false
  },
  {
    id: '3',
    type: 'connection',
    title: 'New Connection',
    description: 'Alex accepted your connection request',
    time: '1 day ago',
    read: true
  }
];

const NotificationIcon = ({ type }: { type: Notification['type'] }) => {
  switch (type) {
    case 'trip':
      return <Calendar className="w-4 h-4 text-brand-orange" />;
    case 'message':
      return <MessageCircle className="w-4 h-4 text-blue-500" />;
    case 'connection':
      return <MapPin className="w-4 h-4 text-green-500" />;
  }
};

export function NotificationDropdown({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Notifications</h3>
          <button className="text-sm text-brand-orange">Mark all as read</button>
        </div>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 hover:bg-gray-50 cursor-pointer ${
              !notification.read ? 'bg-orange-50' : ''
            }`}
          >
            <div className="flex gap-3">
              <div className="mt-1">
                <NotificationIcon type={notification.type} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t text-center">
        <button className="text-sm text-brand-orange">View All Notifications</button>
      </div>
    </div>
  );
}