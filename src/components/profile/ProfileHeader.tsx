import { useEffect, useState } from "react";
import { EditProfileModal } from "./EditProfileModal";

export default function ProfileHeader({ image_url }: { image_url: string }) {
  const [showEditProfile, setShowEditProfile] = useState(false);

  useEffect(() => {}, []);

  const handleSaveProfile = (data: unknown) => {
    console.log("Saving profile data:", data);
  };

  return (
    <div className="relative">
      <div className="h-64 w-full">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute -bottom-16 left-8">
        <img
          src={image_url}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-white"
        />
      </div>
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          onClick={() => setShowEditProfile(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors"
        >
          Edit Profile
        </button>
        <button className="bg-white text-gray-800 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors">
          Message
        </button>
      </div>

      <EditProfileModal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
