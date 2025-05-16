import React, { useContext, useEffect, useState } from "react";
import { X, Send } from "lucide-react";
import { Button } from "../ui/button";
import { api } from "../../lib/api";
import { UserContext } from "../../context/UserContext";

interface Comment {
  id: string;
  user: {
    name: string;
    profile_image: string;
  };
  body: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

interface CommentModalProps {
  commentCount: number;
  postId: string;
  isOpen: boolean;
  onClose: () => void;
  onComment: (text: string) => void;
}

export function CommentModal({
  commentCount,
  postId,
  isOpen,
  onClose,
  onComment,
}: CommentModalProps) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log("Fetching comments for post:", postId);
    if (commentCount > 0) {
      api.get(`/posts/${postId}/comments`).then((response) => {
        setComments(response.data.data);
      });
    }
  }, [commentCount, postId]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newEntry: Comment = {
        id: Date.now().toString(),
        user: {
          name: user?.name ?? "Anonymous",
          profile_image: user?.image_url ?? "",
        },
        body: newComment.trim(),
        timestamp: new Date().toLocaleString(),
        likes: 0,
        replies: [],
      };

      setComments((prev) => [newEntry, ...prev]); // Optimistically update UI
      onComment(newComment.trim());
      setNewComment("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 flex flex-col h-[80vh]">
        {/* Header */}
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
              <div key={comment.id}>
                <CommentItem comment={comment} level={0} />
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

// Recursive Comment Item
function CommentItem({ comment, level }: { comment: Comment; level: number }) {
  return (
    <div className={`flex gap-3 mb-4 ml-${level * 6}`}>
      <img
        src={comment.user.profile_image}
        alt={comment.user.name}
        className="w-8 h-8 rounded-full"
      />
      <div className="flex-1">
        <div className="bg-gray-100 rounded-lg p-3">
          <div className="font-medium">{comment.user.name}</div>
          <p className="text-gray-700">{comment.body}</p>
        </div>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
          <span>{comment.timestamp}</span>
          <button className="hover:text-gray-700">{comment.likes} likes</button>
          <button className="hover:text-gray-700">Reply</button>
        </div>

        {/* Render replies recursively */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 space-y-3 ml-6">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
