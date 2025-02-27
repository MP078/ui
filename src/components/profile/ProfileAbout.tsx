import React from 'react';
import { Globe2, Mail, MapPin, Phone } from 'lucide-react';

const aboutData = {
  bio: `Hi, I'm Anne! I'm a passionate traveler and photographer based in Paris, France. 
        I've been exploring the Himalayas for the past 5 years and love sharing my experiences 
        with fellow adventurers.`,
  location: 'Paris, France',
  email: 'anne.frank@example.com',
  phone: '+33 123 456 789',
  website: 'www.annefrank.travel',
  languages: ['French (Native)', 'English (Fluent)', 'Nepali (Basic)'],
  interests: [
    'Mountain Trekking',
    'Travel Photography',
    'Cultural Exploration',
    'Adventure Sports',
    'Local Cuisine'
  ],
  certifications: [
    'Certified Mountain Guide - IFMGA',
    'Wilderness First Responder',
    'Advanced Photography - National Geographic'
  ]
};

export default function ProfileAbout() {
  return (
    <div className="bg-white rounded-lg p-8 shadow-sm">
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">About Me</h2>
        <p className="text-gray-600">{aboutData.bio}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-600">
            <MapPin className="w-5 h-5" />
            <span>{aboutData.location}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Mail className="w-5 h-5" />
            <span>{aboutData.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Phone className="w-5 h-5" />
            <span>{aboutData.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Globe2 className="w-5 h-5" />
            <span>{aboutData.website}</span>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Languages</h2>
        <div className="flex flex-wrap gap-2">
          {aboutData.languages.map(language => (
            <span
              key={language}
              className="bg-gray-100 px-3 py-1 rounded-full text-gray-600"
            >
              {language}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Interests</h2>
        <div className="flex flex-wrap gap-2">
          {aboutData.interests.map(interest => (
            <span
              key={interest}
              className="bg-gray-100 px-3 py-1 rounded-full text-gray-600"
            >
              {interest}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Certifications</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          {aboutData.certifications.map(cert => (
            <li key={cert}>{cert}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}