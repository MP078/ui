import React, { useState } from 'react';
import { MoreHorizontal, Check, Heart, Reply, Forward, Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface MessageProps {
  id: string;
  content: string;
  timestamp: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  isOwn: boolean;
  status: 'sent' | 'delivered' | 'read';
  reactions?: Array<{
    emoji: string;
    count: number;
    users: string[];
  }>;
  replyTo?: {
    id: string;
    content: string;
    sender: string;
  };
  onAddReaction?: (emoji: string) => void;
}

const emojiOptions = ['👍', '❤️', '😂', '😮', '😢', '👏', '🙏'];

export function Message({
  id,
  content,
  timestamp,
  sender,
  isOwn,
  status,
  reactions = [],
  replyTo,
  onAddReaction
}: MessageProps) {
  const [showActions, setShowActions] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout>();

  const handleMouseDown = () => {
    const timer = setTimeout(() => {
      setShowActions(true);
    }, 500);
    setLongPressTimer(timer);
  };

  const handleMouseUp = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'sent':
        return <Check className="w-4 h-4 text-gray-400" />;
      case 'delivered':
        return <div className="flex"><Check className="w-4 h-4 text-gray-400" /><Check className="w-4 h-4 -ml-2 text-gray-400" /></div>;
      case 'read':
        return <div className="flex"><Check className="w-4 h-4 text-blue-500" /><Check className="w-4 h-4 -ml-2 text-blue-500" /></div>;
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    if (onAddReaction) {
      onAddReaction(emoji);
    }
    setShowEmojiPicker(false);
  };

  return (
    <div
      className={cn(
        'group relative flex items-end gap-2 mb-4',
        isOwn ? 'flex-row-reverse' : 'flex-row'
      )}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      {!isOwn && (
        <img
          src={sender.avatar}
          alt={sender.name}
          className="w-8 h-8 rounded-full"
        />
      )}

      <div className={cn(
        'relative max-w-[70%]',
        isOwn ? 'items-end' : 'items-start'
      )}>
        {/* Reply Thread */}
        {replyTo && (
          <div className={cn(
            'text-sm rounded-lg px-3 py-1 mb-1',
            isOwn ? 'bg-gray-100' : 'bg-gray-50'
          )}>
            <p className="font-medium text-xs text-gray-500">{replyTo.sender}</p>
            <p className="text-gray-600 truncate">{replyTo.content}</p>
          </div>
        )}

        {/* Message Content */}
        <div className={cn(
          'rounded-2xl px-4 py-2',
          isOwn ? 'bg-brand-orange text-white' : 'bg-white border'
        )}>
          <p>{content}</p>
        </div>

        {/* Timestamp and Status */}
        <div className={cn(
          'flex items-center gap-1 mt-1 text-xs text-gray-500',
          isOwn ? 'justify-end' : 'justify-start'
        )}>
          <span>{timestamp}</span>
          {isOwn && getStatusIcon()}
        </div>

        {/* Reactions */}
        {reactions.length > 0 && (
          <div className={cn(
            'flex gap-1 mt-1',
            isOwn ? 'justify-end' : 'justify-start'
          )}>
            {reactions.map((reaction, index) => (
              <div
                key={index}
                className="bg-white border rounded-full px-2 py-0.5 text-sm flex items-center gap-1 cursor-pointer hover:bg-gray-50"
                onClick={() => onAddReaction && onAddReaction(reaction.emoji)}
              >
                <span>{reaction.emoji}</span>
                <span className="text-xs text-gray-500">{reaction.count}</span>
              </div>
            ))}
          </div>
        )}

        {/* Message Actions */}
        {showActions && (
          <div className={cn(
            'absolute bottom-full mb-2 bg-white rounded-lg shadow-lg border p-1 flex gap-1',
            isOwn ? 'right-0' : 'left-0'
          )}>
            <button 
              className="p-2 hover:bg-gray-100 rounded-lg" 
              aria-label="React"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Heart className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg" aria-label="Reply">
              <Reply className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg" aria-label="Forward">
              <Forward className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg text-red-500" aria-label="Delete">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className={cn(
            'absolute bottom-full mb-12 bg-white rounded-lg shadow-lg border p-2',
            isOwn ? 'right-0' : 'left-0'
          )}>
            <div className="flex gap-1">
              {emojiOptions.map(emoji => (
                <button
                  key={emoji}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full text-lg"
                  onClick={() => handleEmojiSelect(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
