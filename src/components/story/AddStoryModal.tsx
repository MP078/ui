import React, { useState, useRef } from 'react';
import { X, Image as ImageIcon, Camera } from 'lucide-react';
import { Button } from '../ui/button';

interface AddStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (file: File) => void;
}

export function AddStoryModal({ isOpen, onClose, onSubmit }: AddStoryModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onSubmit(selectedFile);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Add New Story</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {preview ? (
            <div className="relative aspect-[9/16] mb-4">
              <img
                src={preview}
                alt="Story preview"
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={() => {
                  setSelectedFile(null);
                  setPreview(null);
                }}
                className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="aspect-[9/16] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-brand-orange mb-4"
            >
              <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
              <p className="text-gray-600">Click to upload a photo</p>
              <p className="text-sm text-gray-500">or drag and drop</p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon className="w-5 h-5 mr-2" />
              Choose File
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                // Add camera functionality here
                console.log('Open camera');
              }}
            >
              <Camera className="w-5 h-5 mr-2" />
              Take Photo
            </Button>
          </div>

          <Button
            className="w-full mt-4"
            disabled={!selectedFile}
            onClick={handleSubmit}
          >
            Share Story
          </Button>
        </div>
      </div>
    </div>
  );
}