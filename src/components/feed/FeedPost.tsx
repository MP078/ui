import { useEffect, useState } from "react";
import { Heart, MessageCircle, Share2, MoreHorizontal, X } from "lucide-react";
import { Button } from "../ui/button";
import { CommentModal } from "../comments/CommentModal";
import { api } from "../../lib/api";
import { getAvatarNumber } from "../../context/UserContext";
import { Link } from "react-router-dom";

export interface FeedPostProps {
  id: string;
  user: {
    id: string;
    name: string;
    image: string;
    location: string;
    verified?: boolean;
    username: string;
  };
  content: {
    text: string;
    images?: string[];
    timestamp: string;
  };
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
  liked?: boolean | false;
}

export function FeedPost({
  liked,
  user,
  content,
  engagement: initialEngagement,
  id,
}: FeedPostProps) {
  const [isLiked, setIsLiked] = useState(liked || false);
  const [engagement, setEngagement] = useState(initialEngagement);
  const [showComments, setShowComments] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showComments) setShowComments(false);
        if (showShareModal) setShowShareModal(false);
      }
    };
    if (showComments || showShareModal) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [showComments, showShareModal]);

  const handleLike = async () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setEngagement((prev) => ({
      ...prev,
      likes: prev.likes + (newLikedState ? 1 : -1),
    }));

    try {
      await api.post(`/posts/${id}/like`, {
        like: newLikedState,
      });
    } catch (error) {
      console.error("Failed to update like status:", error);
      setIsLiked(!newLikedState);
      setEngagement((prev) => ({
        ...prev,
        likes: prev.likes + (newLikedState ? -1 : 1),
      }));
    }
  };

  const handleUnlike = async () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setEngagement((prev) => ({
      ...prev,
      likes: prev.likes + (newLikedState ? 1 : -1),
    }));

    try {
      await api.delete(`/posts/${id}/unlike`);
    } catch (error) {
      console.error("Failed to update like status:", error);
      setIsLiked(!newLikedState);
      setEngagement((prev) => ({
        ...prev,
        likes: prev.likes + (newLikedState ? -1 : 1),
      }));
    }
  };

  const handleComment = (text: string) => {
    setEngagement((prev) => ({
      ...prev,
      comments: prev.comments + 1,
    }));
    console.log("New comment:", text);
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={user.image || `/avatars/${getAvatarNumber(user.id)}.png`}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-1">
              <Link
                to={`/${user.username}`}
                className="font-semibold text-gray-800"
              >
                <span className="font-medium">{user.name}</span>
              </Link>
              {user.verified && <span className="text-brand-orange">✓</span>}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{user.location}</span>
              <span>•</span>
              <span>{content.timestamp}</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="w-5 h-5 text-gray-500" />
        </Button>
      </div>

      <p className="text-gray-800 mb-4">{content.text}</p>

      {content.images && content.images.length > 0 && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <img
            src={content.images[0]}
            alt="Post content"
            className="w-full h-64 object-cover"
          />
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t">
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center gap-2 ${isLiked ? "text-red-500" : ""}`}
          onClick={isLiked ? handleUnlike : handleLike}
        >
          <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
          <span>{engagement.likes}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => setShowComments(true)}
        >
          <MessageCircle className="w-5 h-5" />
          <span>{engagement.comments}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2"
          onClick={handleShare}
        >
          <Share2 className="w-5 h-5" />
          <span>{engagement.shares}</span>
        </Button>
      </div>

      <CommentModal
        commentCount={engagement.comments}
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        onComment={handleComment}
        postId={id}
      />

      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Share Post</h3>
              <button onClick={() => setShowShareModal(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100">
                Share to Feed
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100">
                Share via Message
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100">
                Copy Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
