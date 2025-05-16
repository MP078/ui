import React from 'react';
import { Globe2, Mail, MapPin, Phone } from 'lucide-react';
import { UserProfile } from '../../types/user';

interface UserAboutProps {
  user: UserProfile;
  isLoading?: boolean;
  error?: string;
}

export function UserAbout({ user, isLoading, error }: UserAboutProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg p-8 shadow-sm animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-8 w-3/4"></div>
        
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3 mb-8">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
        
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="flex flex-wrap gap-2 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 bg-gray-200 rounded w-24"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-600">
        <p>Error loading profile information: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-8 shadow-sm">
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">About Me</h2>
        <p className="text-gray-600">{user.bio}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-600">
            <MapPin className="w-5 h-5" />
            <span>{user.location}</span>
          </div>
          {user.email && (
            <div className="flex items-center gap-3 text-gray-600">
              <Mail className="w-5 h-5" />
              <span>{user.email}</span>
            </div>
          )}
          {user.phone && (
            <div className="flex items-center gap-3 text-gray-600">
              <Phone className="w-5 h-5" />
              <span>{user.phone}</span>
            </div>
          )}
          {user.website && (
            <div className="flex items-center gap-3 text-gray-600">
              <Globe2 className="w-5 h-5" />
              <span>{user.website}</span>
            </div>
          )}
        </div>
      </section>

      {user.languages && user.languages.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Languages</h2>
          <div className="flex flex-wrap gap-2">
            {user.languages.map(language => (
              <span
                key={language}
                className="bg-gray-100 px-3 py-1 rounded-full text-gray-600"
              >
                {language}
              </span>
            ))}
          </div>
        </section>
      )}

      {user.interests && user.interests.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Interests</h2>
          <div className="flex flex-wrap gap-2">
            {user.interests.map(interest => (
              <span
                key={interest}
                className="bg-gray-100 px-3 py-1 rounded-full text-gray-600"
              >
                {interest}
              </span>
            ))}
          </div>
        </section>
      )}

      {user.certifications && user.certifications.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Certifications</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            {user.certifications.map(cert => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}