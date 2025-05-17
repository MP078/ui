import React, { useState, useRef } from "react";
import {
  X,
  Image as ImageIcon,
  Camera,
  Music2,
  MapPin,
  Text,
  Share2,
} from "lucide-react";
import { Button } from "../ui/button";
import { api } from "../../lib/api";

interface AddStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (storyData: StoryData) => void;
}

interface StoryData {
  file: File;
  type: "image" | "video";
  caption?: string;
  location?: string;
  music?: {
    title: string;
    artist: string;
  };
  duration?: number;
  shareToFeed?: boolean;
  visibility?: "public" | "friends" | "close-friends";
}

const musicOptions = [
  { title: "Mountain Vibes", artist: "Nature Sounds" },
  { title: "Travel Dreams", artist: "Wanderlust" },
  { title: "Adventure Awaits", artist: "Journey" },
];

const visibilityOptions = [
  { value: "public", label: "Everyone" },
  { value: "friends", label: "Friends" },
  { value: "close-friends", label: "Close Friends" },
];

export function AddStoryModal({
  isOpen,
  onClose,
  onSubmit,
}: AddStoryModalProps) {
  const [storyData, setStoryData] = useState<StoryData>({
    file: null as unknown as File,
    type: "image",
    caption: "",
    duration: 5000,
    visibility: "public",
    shareToFeed: false,
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [showMusicSelector, setShowMusicSelector] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setStoryData((prev) => ({ ...prev, file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (storyData.file) {
      // Prepare FormData for Rails API
      const formData = new FormData();
      formData.append("image", storyData.file);
      if (storyData.caption) formData.append("caption", storyData.caption);
      if (storyData.location) formData.append("location", storyData.location);
      try {
        await api.post("/stories", formData);
        onSubmit(storyData); // Optionally pass back the storyData
        // onClose();
      } catch (e) {
        alert("Failed to upload story." + e);
        // onClose();
      }
    }
  };

  const resetForm = () => {
    setStoryData({
      file: null as unknown as File,
      type: "image",
      caption: "",
      duration: 5000,
      visibility: "public",
      shareToFeed: false,
    });
    setPreview(null);
    setShowMusicSelector(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-sm mx-4 max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-3 border-b">
          <h2 className="text-base font-semibold">Create Story</h2>
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {preview ? (
            <div className="relative aspect-[9/16] mb-4 rounded-lg overflow-hidden">
              <img
                src={preview}
                alt="Story preview"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => {
                  setStoryData((prev) => ({
                    ...prev,
                    file: null as unknown as File,
                  }));
                  setPreview(null);
                }}
                className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full text-white hover:bg-black/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="aspect-[9/16] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-brand-orange transition-colors mb-4 bg-gray-50"
            >
              <ImageIcon className="w-10 h-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 font-medium">
                Add to your story
              </p>
              <p className="text-xs text-gray-500">or drag and drop</p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Story Options */}
          <div className="space-y-2">
            {/* Caption Input */}
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2.5 focus-within:ring-1 focus-within:ring-brand-orange/50">
              <Text className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Add a caption..."
                value={storyData.caption}
                onChange={(e) =>
                  setStoryData((prev) => ({ ...prev, caption: e.target.value }))
                }
                className="flex-1 bg-transparent border-none focus:outline-none text-sm"
              />
            </div>

            {/* Location Input */}
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2.5 focus-within:ring-1 focus-within:ring-brand-orange/50">
              <MapPin className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Add location..."
                value={storyData.location}
                onChange={(e) =>
                  setStoryData((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
                className="flex-1 bg-transparent border-none focus:outline-none text-sm"
              />
            </div>

            {/* Music Selector */}
            <div className="space-y-1">
              <button
                onClick={() => setShowMusicSelector(!showMusicSelector)}
                className="flex items-center gap-2 bg-gray-50 rounded-lg p-2.5 w-full hover:bg-gray-100 transition-colors"
              >
                <Music2 className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {storyData.music
                    ? `${storyData.music.title} - ${storyData.music.artist}`
                    : "Add music"}
                </span>
              </button>

              {showMusicSelector && (
                <div className="bg-gray-50 rounded-lg p-1">
                  {musicOptions.map((music, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setStoryData((prev) => ({ ...prev, music }));
                        setShowMusicSelector(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <div className="text-sm font-medium">{music.title}</div>
                      <div className="text-xs text-gray-500">
                        {music.artist}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Share to Feed Toggle */}
            <label className="flex items-center gap-2 bg-gray-50 rounded-lg p-2.5 cursor-pointer">
              <Share2 className="w-4 h-4 text-gray-400" />
              <span className="text-sm flex-1">Share to Feed</span>
              <input
                type="checkbox"
                checked={storyData.shareToFeed}
                onChange={(e) =>
                  setStoryData((prev) => ({
                    ...prev,
                    shareToFeed: e.target.checked,
                  }))
                }
                className="rounded text-brand-orange focus:ring-brand-orange"
              />
            </label>
          </div>
        </div>

        <div className="p-4 border-t">
          <div className="flex gap-2 mb-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Gallery
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                console.log("Open camera");
              }}
            >
              <Camera className="w-4 h-4 mr-2" />
              Camera
            </Button>
          </div>

          <Button
            className="w-full"
            disabled={!storyData.file}
            onClick={handleSubmit}
          >
            Share Story
          </Button>
        </div>
      </div>
    </div>
  );
}
