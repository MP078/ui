import { Send, Smile, Paperclip, Mic, Phone, Video, MoreVertical } from 'lucide-react';
import { Button } from '../ui/button';

export function ChatInterface() {
  return (
    <div className="flex h-screen bg-brand-beige">
      {/* Left Panel */}
      <div className="w-1/4 bg-white border-r border-gray-200">
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages"
              className="w-full px-4 py-2 bg-gray-100 rounded-md"
            />
          </div>
          
          <div className="mt-6">
            <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                  alt="Alex Andrew"
                  className="w-12 h-12 rounded-full"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-brand-orange rounded-full border-2 border-white" />
              </div>
              <div className="ml-3">
                <div className="flex items-center">
                  <span className="font-medium">Alex Andrew</span>
                  <span className="ml-2 text-xs text-brand-gray">Active now</span>
                </div>
                <p className="text-sm text-brand-gray">Let's plan our trip!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
              alt="Alex Andrew"
              className="w-12 h-12 rounded-full"
            />
            <div className="ml-3">
              <div className="font-medium">Alex Andrew</div>
              <div className="text-sm text-brand-gray">Active now</div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Video className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            <div className="flex justify-end">
              <div className="bg-brand-orange text-white rounded-lg p-3 max-w-md">
                <p>Hey! I was thinking about our Nepal trip. Have you seen this view?</p>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="bg-brand-orange text-white rounded-lg p-3">
                <img
                  src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600"
                  alt="Mountain view"
                  className="rounded-lg w-72"
                />
                <p className="mt-2">The view from Everest Base Camp!</p>
              </div>
            </div>

            <div className="flex">
              <div className="bg-white rounded-lg p-3 max-w-md shadow-sm">
                <p>Wow, that's breathtaking! When are you planning to go?</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Smile className="w-6 h-6" />
            </Button>
            <input
              type="text"
              placeholder="Message..."
              className="flex-1 px-4 py-2 bg-brand-beige rounded-md focus:outline-none"
            />
            <Button variant="ghost" size="sm">
              <Paperclip className="w-6 h-6" />
            </Button>
            <Button variant="ghost" size="sm">
              <Mic className="w-6 h-6" />
            </Button>
            <Button>
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}