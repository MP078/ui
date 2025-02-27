import React, { useState } from 'react';
import { X, Camera, MapPin, Globe2, Mail, Phone, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';
import { ConfirmationDialog } from '../ui/confirmation-dialog';

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

const availableLanguages = ['English', 'French', 'Spanish', 'German', 'Chinese', 'Japanese', 'Korean', 'Nepali'];
const availableInterests = ['Hiking', 'Photography', 'Culture', 'Adventure', 'Nature', 'Food', 'History', 'Art'];

export function EditProfileModal({ isOpen, onClose, onSave }: EditProfileModalProps) {
  const [showUnsavedChanges, setShowUnsavedChanges] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: 'Anne Frank',
    email: 'anne.frank@example.com',
    phone: '+33 123 456 789',
    location: 'Paris, France',
    website: 'www.annefrank.travel',
    bio: "HI, I'm Anne! I'm a passionate traveler and photographer based in Paris, France. I've been exploring the Himalayas for the past 5 years and love sharing my experiences with fellow adventurers.",
    languages: ['French', 'English', 'Nepali'],
    interests: ['Mountain Trekking', 'Travel Photography', 'Cultural Exploration'],
    certifications: [
      'Certified Mountain Guide - IFMGA',
      'Wilderness First Responder',
      'Advanced Photography - National Geographic'
    ]
  });

  const handleClose = () => {
    setShowUnsavedChanges(true);
  };

  const handleConfirmClose = () => {
    setShowUnsavedChanges(false);
    onClose();
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
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
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 p-2 bg-brand-orange text-white rounded-full">
                  <Camera className="w-4 h-4" />
                </button>
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
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
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
                        const newLanguages = formData.languages.includes(language)
                          ? formData.languages.filter((l) => l !== language)
                          : [...formData.languages, language];
                        setFormData({ ...formData, languages: newLanguages });
                      }}
                      className={`px-3 py-1 rounded-full text-sm ${
                        formData.languages.includes(language)
                          ? 'bg-brand-orange text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                        const newInterests = formData.interests.includes(interest)
                          ? formData.interests.filter((i) => i !== interest)
                          : [...formData.interests, interest];
                        setFormData({ ...formData, interests: newInterests });
                      }}
                      className={`px-3 py-1 rounded-full text-sm ${
                        formData.interests.includes(interest)
                          ? 'bg-brand-orange text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                          setFormData({ ...formData, certifications: newCerts });
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                      />
                      <button
                        onClick={() => {
                          const newCerts = formData.certifications.filter((_, i) => i !== index);
                          setFormData({ ...formData, certifications: newCerts });
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
                        certifications: [...formData.certifications, '']
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
            <Button onClick={handleSave}>
              Save Changes
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