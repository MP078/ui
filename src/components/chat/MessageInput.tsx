import React, { useState, useRef } from 'react';
import { Smile, Paperclip, Mic, Send, Image, MapPin, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface MessageInputProps {
  onSend: (message: string) => void;
  onAttachment?: (file: File) => void;
  onVoice?: (blob: Blob) => void;
}

export function MessageInput({ onSend, onAttachment, onVoice }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onAttachment) {
      onAttachment(file);
    }
  };

  const toggleVoiceRecording = () => {
    setIsRecording(!isRecording);
    // Implement actual voice recording logic here
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      {/* Attachment Options */}
      {showAttachments && (
        <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg border p-2">
          <div className="flex gap-2">
            <button
              type="button"
              className="p-2 hover:bg-gray-100 rounded-lg flex flex-col items-center"
              onClick={() => fileInputRef.current?.click()}
            >
              <Image className="w-6 h-6 text-blue-500" />
              <span className="text-xs mt-1">Photo</span>
            </button>
            <button
              type="button"
              className="p-2 hover:bg-gray-100 rounded-lg flex flex-col items-center"
            >
              <MapPin className="w-6 h-6 text-red-500" />
              <span className="text-xs mt-1">Location</span>
            </button>
          </div>
        </div>
      )}

      <div className="flex items-end gap-2 bg-white border rounded-lg p-2">
        {/* Emoji Button */}
        <button
          type="button"
          className="p-2 hover:bg-gray-100 rounded-full"
          aria-label="Add emoji"
        >
          <Smile className="w-5 h-5 text-gray-500" />
        </button>

        {/* Attachment Button */}
        <button
          type="button"
          className="p-2 hover:bg-gray-100 rounded-full"
          onClick={() => setShowAttachments(!showAttachments)}
          aria-label="Add attachment"
        >
          <Paperclip className="w-5 h-5 text-gray-500" />
        </button>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileSelect}
          accept="image/*"
        />

        {/* Message Input */}
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 max-h-32 px-2 py-1 resize-none bg-transparent focus:outline-none"
          rows={1}
        />

        {/* Voice Message Button */}
        <button
          type="button"
          className={cn(
            'p-2 rounded-full transition-colors',
            isRecording ? 'bg-red-500 text-white' : 'hover:bg-gray-100'
          )}
          onClick={toggleVoiceRecording}
          aria-label={isRecording ? 'Stop recording' : 'Start voice message'}
        >
          {isRecording ? (
            <X className="w-5 h-5" />
          ) : (
            <Mic className="w-5 h-5 text-gray-500" />
          )}
        </button>

        {/* Send Button */}
        <button
          type="submit"
          className={cn(
            'p-2 rounded-full transition-colors',
            message.trim() ? 'bg-brand-orange text-white' : 'text-gray-400'
          )}
          disabled={!message.trim()}
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}