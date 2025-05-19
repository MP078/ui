import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { Button } from '../ui/button';

interface Comment {
  id: string;
  user: {
    name: string;
    image: string;
  };
  text: string;
  timestamp: string;
  likes: number;
}

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComment: (text: string) => void;
  comments?: Comment[];
}

export function CommentModal({ isOpen, onClose, onComment, comments = [] }: CommentModalProps) {
  const [newComment, setNewComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onComment(newComment.trim());
      setNewComment('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 flex flex-col h-[80vh]">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Comments</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <img
                  src={comment.user.image}
                  alt={comment.user.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="font-medium">{comment.user.name}</div>
                    <p className="text-gray-700">{comment.text}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>{comment.timestamp}</span>
                    <button className="hover:text-gray-700">
                      {comment.likes} likes
                    </button>
                    <button className="hover:text-gray-700">Reply</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              No comments yet. Be the first to comment!
            </div>
          )}
        </div>

        {/* Comment Input */}
        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-2"
            />
            <Button
              type="submit"
              disabled={!newComment.trim()}
              className="rounded-full"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}