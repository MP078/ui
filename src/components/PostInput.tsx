import React, { useState, useRef } from 'react';
import { Image, MapPin, Calendar, X, Smile, Users, Tag } from 'lucide-react';
import { cn } from '../lib/utils';

interface PostInputState {
  text: string;
  photos: File[];
  location?: string;
  travelPlan?: {
    startDate: string;
    endDate: string;
    destination: string;
  };
  tags?: string[];
}

export default function PostInput() {
  const [post, setPost] = useState<PostInputState>({
    text: '',
    photos: [],
    tags: []
  });
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [showTravelPlan, setShowTravelPlan] = useState(false);
  const [showTagInput, setShowTagInput] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setPost(prev => ({
      ...prev,
      photos: [...prev.photos, ...files]
    }));

    // Create preview URLs
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
  };

  const removePhoto = (index: number) => {
    setPost(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (tagInput.trim() && !post.tags?.includes(tagInput.trim())) {
      setPost(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setPost(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== tag)
    }));
  };

  const handleSubmit = () => {
    // Handle post submission
    console.log('Submitting post:', post);
    
    // Reset form
    setPost({ text: '', photos: [], tags: [] });
    setPreviewUrls([]);
    setShowLocationInput(false);
    setShowTravelPlan(false);
    setShowTagInput(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && showTagInput) {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center gap-3 mb-3">
        <img 
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <input
          type="text"
          placeholder="Share your travel experiences..."
          className="flex-1 bg-gray-50 rounded-full px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-brand-orange/30"
          value={post.text}
          onChange={(e) => setPost(prev => ({ ...prev, text: e.target.value }))}
        />
      </div>

      {/* Photo Previews */}
      {previewUrls.length > 0 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <button
                onClick={() => removePhoto(index)}
                className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full p-1 shadow-md hover:bg-gray-700 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Location Input */}
      {showLocationInput && (
        <div className="mt-3 flex items-center gap-2 bg-gray-50 rounded-lg p-2.5">
          <MapPin className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Add location"
            className="flex-1 bg-transparent border-none outline-none text-sm"
            value={post.location || ''}
            onChange={(e) => setPost(prev => ({ ...prev, location: e.target.value }))}
          />
          <button
            onClick={() => setShowLocationInput(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Travel Plan Input */}
      {showTravelPlan && (
        <div className="mt-3 space-y-2 bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-orange" />
              <span>Travel Plan</span>
            </h4>
            <button
              onClick={() => setShowTravelPlan(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <input
            type="text"
            placeholder="Destination"
            className="w-full rounded-lg px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-1 focus:ring-brand-orange/30"
            value={post.travelPlan?.destination || ''}
            onChange={(e) => setPost(prev => ({
              ...prev,
              travelPlan: { ...prev.travelPlan, destination: e.target.value } as any
            }))}
          />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Start Date</label>
              <input
                type="date"
                className="rounded-lg px-3 py-2 text-sm border border-gray-200 w-full focus:outline-none focus:ring-1 focus:ring-brand-orange/30"
                value={post.travelPlan?.startDate || ''}
                onChange={(e) => setPost(prev => ({
                  ...prev,
                  travelPlan: { ...prev.travelPlan, startDate: e.target.value } as any
                }))}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">End Date</label>
              <input
                type="date"
                className="rounded-lg px-3 py-2 text-sm border border-gray-200 w-full focus:outline-none focus:ring-1 focus:ring-brand-orange/30"
                value={post.travelPlan?.endDate || ''}
                onChange={(e) => setPost(prev => ({
                  ...prev,
                  travelPlan: { ...prev.travelPlan, endDate: e.target.value } as any
                }))}
              />
            </div>
          </div>
        </div>
      )}

      {/* Tag Input */}
      {showTagInput && (
        <div className="mt-3 flex flex-col gap-2">
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2.5">
            <Tag className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Add tags (press Enter to add)"
              className="flex-1 bg-transparent border-none outline-none text-sm"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={addTag}
              className="text-brand-orange hover:text-brand-orange/80 font-medium text-xs px-2 py-1 bg-brand-orange/10 rounded-md"
            >
              Add
            </button>
            <button
              onClick={() => setShowTagInput(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {post.tags.map((tag, index) => (
                <div key={index} className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700 flex items-center gap-1">
                  <span>#{tag}</span>
                  <button onClick={() => removeTag(tag)} className="text-gray-500 hover:text-gray-700">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple
            accept="image/*"
            onChange={handlePhotoUpload}
          />
          <button
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => fileInputRef.current?.click()}
            title="Add Photo"
          >
            <Image className="w-5 h-5" />
          </button>
          <button
            className={cn(
              "p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors",
              showLocationInput && "text-brand-orange bg-brand-orange/10"
            )}
            onClick={() => setShowLocationInput(!showLocationInput)}
            title="Add Location"
          >
            <MapPin className="w-5 h-5" />
          </button>
          <button
            className={cn(
              "p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors",
              showTravelPlan && "text-brand-orange bg-brand-orange/10"
            )}
            onClick={() => setShowTravelPlan(!showTravelPlan)}
            title="Add Travel Plan"
          >
            <Calendar className="w-5 h-5" />
          </button>
          <button
            className={cn(
              "p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors",
              showTagInput && "text-brand-orange bg-brand-orange/10"
            )}
            onClick={() => setShowTagInput(!showTagInput)}
            title="Add Tags"
          >
            <Tag className="w-5 h-5" />
          </button>
        </div>
        <button
          className={cn(
            "bg-brand-orange text-white px-4 py-1.5 rounded-full text-sm transition-colors",
            (!post.text.trim() && post.photos.length === 0) ? "opacity-50 cursor-not-allowed" : "hover:bg-brand-orange/90"
          )}
          onClick={handleSubmit}
          disabled={!post.text.trim() && post.photos.length === 0}
        >
          Post
        </button>
      </div>
    </div>
  );
}