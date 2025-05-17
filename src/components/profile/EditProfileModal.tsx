import React, { useState, useContext, useEffect, useRef } from "react";
import {
  X,
  Camera,
  MapPin,
  Globe2,
  Mail,
  Phone,
  AlertTriangle,
} from "lucide-react";
import { Button } from "../ui/button";
import { ConfirmationDialog } from "../ui/confirmation-dialog";
import { api } from "../../lib/api"; // Make sure this import exists
import { UserContext } from "../../context/UserContext";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProfileFormData) => void;
}

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  bio: string;
  languages: string[];
  interests: string[];
  certifications: string[];
}

const availableLanguages = [
  "English",
  "French",
  "Spanish",
  "German",
  "Chinese",
  "Japanese",
  "Korean",
  "Nepali",
];
const availableInterests = [
  "Hiking",
  "Photography",
  "Culture",
  "Adventure",
  "Nature",
  "Food",
  "History",
  "Art",
];

export function EditProfileModal({
  isOpen,
  onClose,
  onSave,
}: EditProfileModalProps) {
  const { user, setUser } = useContext(UserContext);
  const [showUnsavedChanges, setShowUnsavedChanges] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    bio: "",
    languages: [],
    interests: [],
    certifications: [],
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync form with user context
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        website: user.website || "",
        bio: user.bio || "",
        languages: user.languages || [],
        interests: user.interests || [],
        certifications: user.certifications || [],
      });
      setAvatarPreview(user.image_url || null);
      setAvatarFile(null);
    }
  }, [user, isOpen]);

  const handleClose = () => {
    setShowUnsavedChanges(true);
  };

  const handleConfirmClose = () => {
    setShowUnsavedChanges(false);
    onClose();
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => formDataToSend.append(`${key}[]`, v));
        } else {
          formDataToSend.append(key, value as string);
        }
      });
      if (avatarFile) {
        formDataToSend.append("profile_image", avatarFile);
      }

      const res = await api.patch("/users", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const backendUser = res.data.data || res.data;
      // Defensive: always set image_url and verified
      setUser && setUser({
        ...user,
        ...formData,
        image_url:
          backendUser.profile_image || backendUser.image_url || (user?.image_url ?? ""),
        verified: backendUser.verified ?? (user?.verified ?? false),
      });
      onSave(formData);
      onClose();
    } catch (error) {
      alert("Failed to update profile. Please try again.");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-3xl mx-4 max-h-[90vh] flex flex-col">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold">Edit Profile</h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {/* Profile Picture */}
            <div className="flex items-center gap-6 mb-8">
              <div className="relative">
                <img
                  src={avatarPreview || "/avatars/1.png"}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border"
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setAvatarFile(file);
                      setAvatarPreview(URL.createObjectURL(file));
                    }
                  }}
                />
                <button
                  type="button"
                  className="absolute bottom-0 right-0 p-2 bg-brand-orange text-white rounded-full"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Change profile photo"
                >
                  <Camera className="w-4 h-4" />
                </button>
                {avatarFile && (
                  <button
                    type="button"
                    className="absolute -top-2 -right-2 bg-white border border-gray-300 text-gray-500 rounded-full p-1 shadow"
                    onClick={() => {
                      setAvatarFile(null);
                      setAvatarPreview(user?.image_url || null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    aria-label="Remove selected photo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div>
                <h3 className="font-medium">Profile Photo</h3>
                <p className="text-sm text-gray-500">
                  Upload a new profile photo. Recommended size: 400x400px
                </p>
              </div>
            </div>

            {/* Basic Information */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <div className="relative">
                    <Globe2 className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Languages
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableLanguages.map((language) => (
                    <button
                      key={language}
                      onClick={() => {
                        const newLanguages = formData.languages.includes(
                          language
                        )
                          ? formData.languages.filter((l) => l !== language)
                          : [...formData.languages, language];
                        setFormData({ ...formData, languages: newLanguages });
                      }}
                      className={`px-3 py-1 rounded-full text-sm ${
                        formData.languages.includes(language)
                          ? "bg-brand-orange text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interests
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableInterests.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => {
                        const newInterests = formData.interests.includes(
                          interest
                        )
                          ? formData.interests.filter((i) => i !== interest)
                          : [...formData.interests, interest];
                        setFormData({ ...formData, interests: newInterests });
                      }}
                      className={`px-3 py-1 rounded-full text-sm ${
                        formData.interests.includes(interest)
                          ? "bg-brand-orange text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certifications
                </label>
                <div className="space-y-2">
                  {formData.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={cert}
                        onChange={(e) => {
                          const newCerts = [...formData.certifications];
                          newCerts[index] = e.target.value;
                          setFormData({
                            ...formData,
                            certifications: newCerts,
                          });
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                      />
                      <button
                        onClick={() => {
                          const newCerts = formData.certifications.filter(
                            (_, i) => i !== index
                          );
                          setFormData({
                            ...formData,
                            certifications: newCerts,
                          });
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        certifications: [...formData.certifications, ""],
                      });
                    }}
                  >
                    Add Certification
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 p-6 border-t">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={showUnsavedChanges}
        onClose={() => setShowUnsavedChanges(false)}
        onConfirm={handleConfirmClose}
        title="Discard Changes"
        message="Are you sure you want to discard your changes? Any unsaved changes will be lost."
        confirmText="Discard"
        type="warning"
      />
    </>
  );
}
